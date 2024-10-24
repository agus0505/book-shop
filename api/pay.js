import express from 'express';
import { MercadoPagoConfig, Preference } from "mercadopago";
import { addPayData } from '../database/mongodb.js';
import { MERCADO_PAGO_ACCES_TOKEN, NGROK_HOST } from '../constants/config.js';

const router = express.Router();
const clientMp = new MercadoPagoConfig({ accessToken: MERCADO_PAGO_ACCES_TOKEN });

router.post('/', async (req, res) => {
    
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