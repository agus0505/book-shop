import { config } from "dotenv"
config()

export const PORT = 1234
export const HOST = `http://localhost:` + PORT
export const NGROK_HOST = `https://e337-190-19-152-210.ngrok-free.app`
export const PAYPAL_API_SECRET = process.env.PAYPAL_API_SECRET
export const PAYPAL_API_CLIENT = process.env.PAYPAL_API_CLIENT
export const MERCADO_PAGO_ACCES_TOKEN = process.env.MERCADO_PAGO_ACCES_TOKEN
export const PAYPAL_API = 'https://api-m.sandbox.paypal.com'

