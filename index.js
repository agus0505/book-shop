import express from 'express'
import path from 'path'
const app = express()
import cors from 'cors'
import { MercadoPagoConfig, Preference } from "mercadopago"
import { addConfirmedBuyData, addPayData, searchMPBuy } from './database/mongodb.js'
import { HOST, PORT, PAYPAL_API, PAYPAL_API_CLIENT, PAYPAL_API_SECRET, NGROK_HOST, MERCADO_PAGO_ACCES_TOKEN } from './src/constants/config.js'
const clientMp = new MercadoPagoConfig({
    accessToken: MERCADO_PAGO_ACCES_TOKEN
})




app.use(cors())
app.use(express.json())

app.use(express.static('dist'))
app.post('/api/pay', async (req, res) => {
    
    const cart = await req.body.items;
    const payMethod = await req.body.payMethod
    const formData = await req.body.formData
    const totalPrice = await req.body.price
    const time = Date.now()
    const date = new Date(time - 10800000)


    if (payMethod === 'mercado-pago') {
        try {
            const products = []
                cart.forEach(b => {
                    const pushBook = {
                        id: b.id,
                        title: b.title,
                        quantity: b.quantity ?? 1,
                        unit_price: b.price,
                        currency_id: "ARS"
                    }
                    products.push(pushBook)
                })


            const body = {
                items: products,
                back_urls: {
                    success: "http://localhost:1234/getfeedback",
                    failure: "http://localhost:1234/getfeedback",
                    pending: "http://localhost:1234/getfeedback"
    
                },
                auto_return: "approved",
                notification_url: `${NGROK_HOST}/webhooks`,
            }
    
            const preference = new Preference(clientMp)
            const result = await preference.create({ body })

            
            const payData = {
                ID: crypto.randomUUID(),
                FORM_DATA: formData,
                PRODUCTS: cart,
                PRICE: totalPrice,
                DATE: date.toUTCString(),
                PAY_METHOD: payMethod
            }
            await addPayData(payData)
            res.json({
                id: result.id,
            })
        } catch (error) {
            console.error(error)
            res.status(500).send("Error al crear la preferencia")
        }
    }

    if (payMethod === 'paypal') {
        const products = []
        cart.forEach(b => {
            const newItem = {
                reference_id: b.id,
                name: b.title,
                quantity:b.quantity,
                amount: {
                    currency_code: "USD",
                    value: b.price * b.quantity,
                }
            }
            products.push(newItem)
        })
        try {
            const order = {
                intent: "CAPTURE",
                purchase_units: products,
                application_context: {
                    brand_name: "Learn son",
                    landing_page: "NO_PREFERENCE",
                    user_action: "PAY_NOW",
                    return_url: `${NGROK_HOST}/feedback`,
                    cancel_url: `${NGROK_HOST}/pay`
                }
            }

            const params = new URLSearchParams()
            params.append('grant_type', 'client_credentials')

            const preResponse = await fetch(`${PAYPAL_API}/v1/oauth2/token`, {
                method: 'POST',
                headers: { 
                    "Content-Type": "application/x-www-form-urlencoded",
                    "Authorization": "Basic " + btoa(`${PAYPAL_API_CLIENT}:${PAYPAL_API_SECRET}`) 
                },
                body: params.toString()
            })

            if (preResponse.ok) {
                const preData = await preResponse.json(); 
                const accessToken = await preData.access_token; 
                    if (accessToken) {
                        const response = await fetch(`${PAYPAL_API}/v2/checkout/orders`, {
                            method: "POST",
                            headers: { 
                                "Content-Type": "application/json",
                                "Authorization": `Bearer ${accessToken}`
                            },
                            body: JSON.stringify(order)
                        });
                        const data = await response.json()
                        const payData = {
                            ID: crypto.randomUUID(),
                            FORM_DATA: formData,
                            PRODUCTS: cart,
                            PRICE: totalPrice,
                            DATE: date.toUTCString(),
                            PAY_METHOD: payMethod
                        }
                        await addPayData(payData)
                        res.json(data)
                    }
              }
        } catch (error) {
            console.error(`Error: `,error)
        }
    }
});

app.get('/getfeedback', async (req, res) => {

    res.redirect(`/feedback/${req.query.merchant_order_id}/${req.query.status}`)
})

app.get(`/api/getBuy/:merchant_order_id/:status`, async (req, res) => {

    const { merchant_order_id } = req.params
    const buy = await searchMPBuy(merchant_order_id)
    res.json(buy)
})


app.post('/webhooks', async (req, res) => {
    const paymentId = req.query.id


    try {
        const response = await fetch(`https://api.mercadopago.com/v1/payments/${paymentId}`, {
            method: 'GET',
            headers: {
                'Authorization': `Bearer ${clientMp.accessToken}`
            }
        })

        if (response.ok) {
            const data = await response.json()
            const items = []


            data.additional_info.items.forEach(i => {
                const newItem = {
                    title: i.title,
                    quantity: Number(i.quantity),
                    unit_price: Number(i.unit_price)
                }
                items.push(newItem)
            })



            addConfirmedBuyData({
                ID: data.order.id,
                DATE: data.date_created,
                STATUS: data.status,
                AMOUNT: data.transaction_amount,
                EMAIL: data.payer.email,
                PAYMENT_METHOD: `${data.order.type}, ${data.payment_method_id}`,
                ITEMS: items
            })
        }
        res.sendStatus(200)
    } catch (error) {
        console.error('Error:', error)
        res.sendStatus(500)
    }
})

app.post('/capture-order-PP', async (req, res) => {
    const { token } = req.query

    const response = await fetch(`${PAYPAL_API}/v2/checkout/orders/${token}/capture`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': 'Basic ' + btoa(`${PAYPAL_API_CLIENT}:${PAYPAL_API_SECRET}`)
        },
      })
    const data = await response.json()
    res.json(data)
})
app.post('/webhooks-PP', async (req, res) => {
    try {
             
        const event = req.body;
        console.log(req.body)

        if (event.event_type === 'PAYMENT.CAPTURE.COMPLETED') {
            const captureId = event.resource.id;
            const amount = event.resource.amount.value;
            const status = event.resource.status;
            const paymentDate = new Date(event.create_time).toUTCString();

            await addConfirmedBuyData({
                ID: captureId,
                STATUS: status,
                AMOUNT: amount,
                DATE: paymentDate,
                PAYMENT_METHOD: 'paypal',
            });
        }

        res.status(200).send('Webhook procesado exitosamente');
    } catch (error) {
        console.error('Error procesando el webhook:', error);
        res.status(500).send('Error procesando el webhook');
    }
});
app.get('*', (req, res) => {
    res.sendFile(path.resolve('dist', 'index.html'))
})

app.listen(PORT, () => {
    console.log(`server listening on port ${HOST}`)
})