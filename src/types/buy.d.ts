import { PayMethods } from "./payMethods";

interface MinBook{
    title: string,
    price: number
}

export interface Buy{
    payMethod: PayMethods
    products: MinBook[]
    totalPrice: number
    date: string

}