import { config } from "dotenv"
config()

export const PORT = 1234
export const HOST = `http://localhost:` + PORT
export const NGROK_HOST = `https://book-shop-mern.onrender.com/`
export const PAYPAL_API_SECRET = process.env.PAYPAL_API_SECRET
export const PAYPAL_API_CLIENT = process.env.PAYPAL_API_CLIENT
export const MERCADO_PAGO_ACCES_TOKEN = process.env.MERCADO_PAGO_ACCES_TOKEN
export const PAYPAL_API = 'https://api-m.paypal.com'
export const MONGODB_URL = process.env.MONGODB_URL

