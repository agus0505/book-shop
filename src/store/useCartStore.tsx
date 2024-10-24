import { create } from "zustand";
import {
    Book,
    //PartialBook 
} from "../types/books.d";
import { persist } from "zustand/middleware";
import { FormData } from "../types/formData.d";
import { PayMethods } from "../types/payMethods.d";
import { Buy } from "../types/buy";


interface State {
    cart: Book[]
    price: number
    preferenceId: string | null
    formData: FormData
    removeFromCart: (id: string) => void
    clearCart: () => void
    addToCart: (book: Book, optionalQty: number | null | undefined) => void
    moreQty: (id: string) => void
    lessQty: (id: string) => void
    buyCartItems: (payMethod: PayMethods) => void
    buyItem: (book: Book, payMethod: PayMethods, qty: number) => void
    setFormData: (data: FormData) => void
    setPreferenceIdNull: () => void
    buys: Buy[]
    addBuy: (data: Buy) => void

}

export const useCartStore = create<State>()(
    persist((set, get) => ({
        cart: [],
        price: 0,
        preferenceId: null,
        formData: undefined,
        buys: [],
        addBuy: (data: Buy) => {
            const { buys } = get()
            const newBuys = structuredClone(buys)
            newBuys.push(data)
            set({ buys: newBuys })
        },

        removeFromCart: (id: string) => {
            const { cart, price } = get();
            const newCart = structuredClone(cart);
            const book = newCart.find(b => b.id === id);
            if (!book || book.quantity === undefined) return;

            const newPrice = price - book.price * book.quantity;
            const filterCart = newCart.filter(b => b.id !== id);
            set({ cart: filterCart, price: newPrice });
        },

        clearCart: () => {
            set({ cart: [], price: 0 });
        },

        setFormData: (data: FormData) => {
            set({
                formData: data
            })
        },

        addToCart: (book: Book, optionalQty: number | null | undefined) => {
            const { cart, price } = get();
            const qty = optionalQty ?? 1;
            const newPrice = price + book.price * qty;

            const productInCartIndex = cart.findIndex(b => b.id === book.id);
            if (productInCartIndex < 0) {
                set({
                    cart: [...structuredClone(cart), { ...book, quantity: qty }],
                    price: newPrice,
                    preferenceId: null
                });
                return;
            }

            const newCart = structuredClone(cart);
            if (newCart[productInCartIndex].quantity === undefined) return;
            newCart[productInCartIndex].quantity += qty;

            set({ cart: newCart, price: newPrice });
        },

        moreQty: (id: string) => {
            const { cart, price } = get();
            const bookIndex = cart.findIndex(b => b.id === id);
            if (bookIndex === -1 || cart[bookIndex].quantity === undefined) return;

            const newCart = structuredClone(cart);
            const newPrice = price + cart[bookIndex].price;
            if (newCart[bookIndex].quantity === undefined) return

            newCart[bookIndex].quantity++;

            set({ cart: newCart, price: newPrice });
        },

        lessQty: (id: string) => {
            const { cart, price, removeFromCart } = get();
            const bookIndex = cart.findIndex(b => b.id === id);
            if (bookIndex === -1 || cart[bookIndex].quantity === undefined) return;

            if (cart[bookIndex].quantity <= 1) {
                removeFromCart(id);
                return;
            }

            const newCart = structuredClone(cart);
            const newPrice = price - cart[bookIndex].price;
            if (newCart[bookIndex].quantity === undefined) return
            newCart[bookIndex].quantity--;

            set({ cart: newCart, price: newPrice });
        },

        buyCartItems: async (payMethod: PayMethods) => {
            const { cart } = get();
            if (cart.length <= 0) {
                return
            }

            const { price } = get()
            const { formData } = get()

            if (payMethod === PayMethods.MERCADO_PAGO) {
                const backData = {
                    items: cart,
                    formData,
                    price,
                    payMethod
                }

                try {
                    const response = await fetch('/api/pay', {
                        method: "post",
                        body: JSON.stringify(backData),
                        headers: { "Content-Type": "application/json" }
                    });

                    if (!response.ok) {
                        console.error('Error in payment request');
                        return;
                    }
                    const data = await response.json()
                    const { id } = data

                    set({
                        preferenceId: id
                    });


                } catch (error) {
                    console.error('Error during the buyCartItems process:', error);
                }
            }

            if (payMethod === PayMethods.PAYPAL) {

                const backData = {
                    items: cart,
                    formData,
                    price,
                    payMethod
                }

                try {
                    const response = await fetch('/api/pay', {
                        method: "post",
                        body: JSON.stringify(backData),
                        headers: { "Content-Type": "application/json" }
                    });

                    if (response.ok) {
                        const data = await response.json()
                        window.location.href = data.links[1].href
                    }
                } catch (error) {
                    console.error('Error during the buyCartItems process:', error);
                }
            }


        },

        buyItem: async (book: Book, payMethod: PayMethods, qty: number) => {
            const { formData } = get()

            const backData = {
                items: [{
                    ...book,
                    quantity: Number(qty ?? 1)
                }],
                formData,
                payMethod,
                price: Number(book.price) * Number(qty ?? 1)

            }

            if (payMethod === PayMethods.MERCADO_PAGO) {
                try {
                    const response = await fetch('/api/pay', {
                        method: "post",
                        body: JSON.stringify(backData),
                        headers: { "Content-Type": "application/json" }
                    });

                    if (!response.ok) {
                        console.error('Error in payment request');
                        return;
                    }
                    const data = await response.json()
                    const { id } = data

                    set({
                        preferenceId: id
                    });
                } catch (error) {
                    console.error('Error during the buy item process:', error);
                }
            }

            if (payMethod === PayMethods.PAYPAL) {
                try {
                    const response = await fetch('/api/pay', {
                        method: "post",
                        body: JSON.stringify(backData),
                        headers: { "Content-Type": "application/json" }
                    });

                    if (response.ok) {
                        const data = await response.json()
                        window.location.href = data.links[1].href
                    }
                } catch (error) {
                    console.error('Error during the buyCartItems process:', error);
                }
            }
        },
        setPreferenceIdNull: () => {
            set({ preferenceId: null })
        }
    }), {
        name: 'cart'
    })
);