import express from 'express';
import fetch from 'node-fetch'; // Si no lo tienes, instálalo
import { addConfirmedBuyData } from '../database/mongodb.js';
import { MercadoPagoConfig } from "mercadopago";
import { MERCADO_PAGO_ACCES_TOKEN } from '../src/constants/config.js';

const router = express.Router();
const clientMp = new MercadoPagoConfig({ accessToken: MERCADO_PAGO_ACCES_TOKEN });

router.post('/', async (req, res) => {
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

export default router;