import { useParams } from "react-router-dom"
import { useCartStore } from "../store/useCartStore"
import { books } from '../utilities/books'
import { useEffect, useRef, useState } from "react"
import { PayMethods } from "../types/payMethods.d"
import { initMercadoPago, Wallet } from '@mercadopago/sdk-react'
import { FormData } from "../types/formData.d"
import mercadoPagoIcon from '../images/mercado-pago.png'
import payPalIcon from '../images/paypal.png'
import { MERCADO_PAGO_PUBLIC_KEY } from "../constants/frontConfig"




export function PaySection() {
    const setPreferenceIdNull = useCartStore(state => state.setPreferenceIdNull)
    useEffect(() => {
        setPreferenceIdNull()
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])
    initMercadoPago(MERCADO_PAGO_PUBLIC_KEY, {
        locale: "es-AR"
    })








    const setFormData = useCartStore(state => state.setFormData)
    const cart = useCartStore(state => state.cart)
    const { name, qtyP } = useParams()
    const qty = qtyP ?? 1

    const preferenceId = useCartStore(state => state.preferenceId)
    const book = books.find((b: { title: string | undefined }) => b.title === name)
    const price = useCartStore(state => state.price)
    const buyItem = useCartStore(state => state.buyItem)
    const buyCartItems = useCartStore(state => state.buyCartItems)
    const [payMethod, setPayMethod] = useState<PayMethods>(PayMethods.MERCADO_PAGO)
    const [error, setError] = useState<null | string>(null)
    const nombreRef = useRef('')
    const mailRef = useRef('')
    const provinciaRef = useRef('')
    const localidadRef = useRef('')
    const calleRef = useRef('')
    const numeroRef = useRef('')
    const pisoRef = useRef('')
    const telefonoRef = useRef('')
    const indicacionesRef = useRef('')

    async function handleButtonClick() {
        const formData: FormData = {
            nombre: nombreRef.current,
            telefono: Number(telefonoRef.current),
            provincia: provinciaRef.current,
            localidad: localidadRef.current,
            calle: calleRef.current,
            numero: Number(numeroRef.current),
            piso: pisoRef.current || undefined,
            email: mailRef.current,
            indicaciones: indicacionesRef.current || undefined,
        }

        setFormData(formData)

        if (name && book) {
            buyItem(book, payMethod, Number(qty ?? 1))
        } else if (!name && !book && cart.length > 0) {
            buyCartItems(payMethod)
        }
        setError(null)

        const formInputs = document.querySelectorAll<HTMLInputElement>('.buy-form-direction input');

        formInputs.forEach(input => {
            input.disabled = true;
        })
    }

    return (
        <main className="payment-main">
            <div className="buy-separator">
                <div className="buy-form-direction">
                    <div>
                        <label htmlFor="form-name">Nombre y apellido</label>
                        <input onChange={(e) => {
                            nombreRef.current = e.target.value
                        }} id="form-name" type="text" placeholder="Tal cual figure en el dni" />
                    </div>
                    <div>
                        <label htmlFor="form-number">Telefono</label>
                        <input type="text" onChange={(e) => {
                            telefonoRef.current = e.target.value
                        }} id="form-number" />
                    </div>
                    <div>
                        <label htmlFor="form-email">Mail</label>
                        <input onChange={(e) => {
                            mailRef.current = e.target.value
                        }} id="form-email" type="text" placeholder="el de la cuenta de pago" />
                    </div>
                    <div>
                        <label htmlFor="form-provincia">Provincia</label>
                        <input onChange={(e) => {
                            provinciaRef.current = e.target.value
                        }} type="text" id="form-provincia" />
                    </div>
                    <div>
                        <label htmlFor="form-localidad">Localidad</label>
                        <input onChange={(e) => {
                            localidadRef.current = e.target.value
                        }} type="text" id="form-localidad" />
                    </div>
                    <div>
                        <label htmlFor="form-calle">Calle/Avenida</label>
                        <input onChange={(e) => {
                            calleRef.current = e.target.value
                        }} type="text" id="form-calle" />
                    </div>
                    <div>
                        <label htmlFor="form-numero">Numero (de calle)</label>
                        <input onChange={(e) => {
                            numeroRef.current = e.target.value
                        }} type="text" id="form-numero" />
                    </div>
                    <div>
                        <label htmlFor="form-piso">Piso/Departamento (opcional)</label>
                        <input onChange={(e) => {
                            pisoRef.current = e.target.value
                        }} type="text" id="form-piso" />
                    </div>
                    <div>
                        <label htmlFor="form-description">Indicaciones adicionales (opcional)</label>
                        <input onChange={(e) => {
                            indicacionesRef.current = e.target.value
                        }} type="text" id="form-description" />
                    </div>
                    {
                        error ? <p style={{ color: 'red' }}>{error}</p> : undefined
                    }
                </div>
                <div className="buy-form-payment">
                    <div onClick={() => setPayMethod(PayMethods.MERCADO_PAGO)} className={payMethod === PayMethods.MERCADO_PAGO ? 'buy-payment active' : 'buy-payment'}>
                        <span className="form-circle"></span><img src={mercadoPagoIcon} alt="Mercado Pago Icon" />
                    </div>
                    <div onClick={() => setPayMethod(PayMethods.PAYPAL)} className={payMethod === PayMethods.PAYPAL ? 'buy-payment active' : 'buy-payment'}>
                        <span className="form-circle"></span><img src={payPalIcon} alt="Pay Pal Icon" />
                    </div>

                </div>
            </div>

            <section className="buy-resume">
                <strong>Resumen de compra</strong>
                <ul className="buy-resume-ul">
                    {
                        !name
                            ? cart.map(b => {
                                return (
                                    <li key={b.id}>
                                        <span>{b.title} x{b.quantity}</span>
                                        <span>AR${b.quantity ? (b.price * b.quantity).toFixed(2) : b.price}</span>
                                    </li>
                                )
                            })
                            : <ul>
                                <li>
                                    <span>{name} x{qty}</span>
                                    <span>AR${(Number(book?.price) * Number(qty)).toFixed(2)}</span>
                                </li>
                            </ul>
                    }
                    <li className="buy-resume-last-child">
                        <span>Pagas</span>
                        <span>AR${!name ? price.toFixed(2) : (Number(book?.price) * Number(qty)).toFixed(2)}</span>
                    </li>
                </ul>

            </section>
            <button onClick={async () => {
                if (nombreRef.current === '' || calleRef.current === '' || numeroRef.current === '' || mailRef.current === '' || provinciaRef.current === '' || localidadRef.current === '') {
                    setError('faltan datos requeridos')
                    window.scrollTo(0, 185)
                    return
                }

                if (!isNaN(Number(nombreRef.current))) {
                    setError('el nombre no puede contener numeros')
                    window.scrollTo(0, 185)
                    return
                }

                if (nombreRef.current.split(' ').length <= 1) {
                    setError('ponga su nombre y apellido')
                    window.scrollTo(0, 185)
                    return
                }

                if (!isNaN(Number(calleRef.current))) {
                    setError('el nombre de la calle no puede contener numeros')
                    window.scrollTo(0, 185)
                    return
                }

                if (!isNaN(Number(provinciaRef.current))) {
                    setError('el nombre de la provincia no puede contener numeros')
                    window.scrollTo(0, 185)
                    return
                }

                if (!isNaN(Number(localidadRef.current))) {
                    setError('el nombre de la localidad no puede contener numeros')
                    window.scrollTo(0, 185)
                    return
                }

                if (!mailRef.current.includes('@') && !mailRef.current.includes('.')) {
                    setError('ingresa un mail valido')
                    window.scrollTo(0, 185)
                    return
                }

                if (isNaN(Number(telefonoRef.current))) {
                    setError('el numero de telefono no puede contener letras')
                    window.scrollTo(0, 185)
                    return
                }

                handleButtonClick()
            }} id="confirm-buy-button" >COMPRAR</button>
            {
                preferenceId && payMethod === PayMethods.MERCADO_PAGO && <Wallet initialization={{ preferenceId, redirectMode: 'modal' }} />
            }

        </main>
    )
}