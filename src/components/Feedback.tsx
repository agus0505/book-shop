import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Link } from "react-router-dom";

interface Item {
    title: string;
    quantity: number;
    unit_price: number;
}

export interface Purchase {
    _id: string;
    ID: string;
    DATE: string;
    STATUS: string;
    AMOUNT: number;
    EMAIL: string;
    PAYMENT_METHOD: string;
    ITEMS: Item[];
}

export function Feedback() {
    const { merchant_order_id, status } = useParams()
    const [buy, setBuy] = useState<null | Purchase>(null)
    useEffect(() => {
        async function getResponse() {
            const response = await fetch(`http://localhost:1234/api/getBuy/${merchant_order_id}/${status}`)
            if (!response.ok) {
                throw new Error(`Error: ${response.statusText}`);
            }
            const json = await response.json()
            setBuy(json)
        }

        getResponse()

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [merchant_order_id])

    return (
        <main>
            <div className="feedback">
                <h1>Felicidades!</h1>
                <h3>Acaba de comprar:</h3>
                <ul className="feedback-items-list">
                    {
                        buy?.ITEMS.map(p => {
                            return (
                                <li>
                                    <p>{p.title} <strong>x{p.quantity}</strong></p>
                                    <p>AR${(Number(p.unit_price) * Number(p.quantity)).toFixed(2)}</p>
                                </li>
                            )
                        })
                    }
                </ul>
                <p>Precio total: ${buy?.AMOUNT}</p>
                <p>Fecha: {buy?.DATE}</p>
                <p>Mail: {buy?.EMAIL}</p>
                <p>Metodo de pago: {buy?.PAYMENT_METHOD}</p>
                <p>Status de compra: {buy?.STATUS}</p>
                <p>Id de compra: {buy?.ID}</p>
                <strong>Se le estara notificando el estado de su compra por mail</strong>
                <div className="feedback-links">
                    <Link to={'/Libros'}>Seguir buscando libros</Link>
                    <Link to={'/Ayuda'}>Consultas sobre tu compra</Link>

                </div>
            </div>




        </main>
    );
}