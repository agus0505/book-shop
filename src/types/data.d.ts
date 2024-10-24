import { Book } from "./books.d";
import { PayMethods } from "./payMethods.d";

interface PayData {
    ID: string;
    FORM_DATA: FormData; 
    PRODUCTS: Book[]; 
    PRICE: number;
    DATE: string; 
    PAY_METHOD: PayMethods;
}

interface ConfirmedBuyData {
    ID: string;
    DATE: string;
    STATUS: string;
    AMOUNT: number;
    EMAIL: string;
    PAYMENT_METHOD: PayMethods; 
    ITEMS: { title: string, quantity: number, unit_price: number }[]; 
}