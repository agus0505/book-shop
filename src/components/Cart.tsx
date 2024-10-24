import { CartIcon, ClearCartIcon, RemoveFromCartIcon } from "../icons"
import { useCartStore } from "../store/useCartStore"
import { Link } from "react-router-dom"
import closeIcon from '../images/close (2).png'
import { DOLAR_PRICE } from "../constants/frontConfig"

export function Cart() {
    const cart = useCartStore(state => state.cart)
    const clearCart = useCartStore(state => state.clearCart)
    const moreQty = useCartStore(state => state.moreQty)
    const lessQty = useCartStore(state => state.lessQty)
    const removeFromCart = useCartStore(state => state.removeFromCart)
    const setPreferenceIdNull = useCartStore(state => state.setPreferenceIdNull)
    const price = useCartStore(state => state.price)

    return (
        <>
            <span className="open-cart" onClick={() => {
                document.querySelector('.cart')?.classList.add('active')
            }}>
                <CartIcon />
            </span>
            <div className="cart">
                {
                    cart.length > 0 ? <Link to={'/pay'}><button onClick={() => {
                        document.querySelector('.cart')?.classList.remove('active')
                        setPreferenceIdNull()
                        const formInputs = document.querySelectorAll<HTMLInputElement>('.buy-form-direction input');

                        formInputs.forEach(input => {
                            input.disabled = false;
                        })
                    }} className="cart-buy-button"><span>COMPRAR</span> AR${(price).toFixed(2)} / <span>US${(price / DOLAR_PRICE).toFixed(2)}  </span></button></Link>
                        : <Link to={'/libros'}><button onClick={() => {
                            document.querySelector('.cart')?.classList.remove('active')
                        }} className="cart-buy-button"><span>EMPIEZA A</span><span>COMPRAR LIBROS</span></button></Link>
                }
                <span className="clearcart-container" onClick={clearCart}>
                    <ClearCartIcon />
                </span>
                <span onClick={() => {
                    document.querySelector('.cart')?.classList.remove('active')
                }} className="close-cart">
                    <img src={closeIcon} alt="Close icon" />
                </span>
                <ul className="cart-list">
                    {
                        cart.map(book => {
                            return (
                                <li className="cart-item" key={book.id}>
                                    <span className="removefromcart-container" onClick={() => removeFromCart(book.id)}>
                                        <RemoveFromCartIcon />
                                    </span>
                                    <h4 style={{ fontSize: '14.5px', width: '90px' }}>{book.title}</h4>
                                    <p>${book.price}</p>
                                    <div className="cart-qty-container">
                                        <strong>x{book.quantity}</strong>
                                        <button className="cart-qty-button" onClick={() => moreQty(book.id)}>+</button>
                                        <button className="cart-qty-button" onClick={() => lessQty(book.id)}>-</button>
                                    </div>

                                </li>
                            )
                        })
                    }
                </ul>
            </div>
        </>
    )
}