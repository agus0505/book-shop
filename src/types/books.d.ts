import { ReactNode } from "react";

export interface Books {
    books: Book[];
}

export interface Book {
    id:               string;
    title:            string;
    year:             number;
    publication_date: ReactNode;
    pages:            number;
    author:           string;
    image_link:       string;
    categories:       string[];
    weight:           string;
    price:            number;
    description:      string;
    publisher:        string;
    quantity?:        number;
    stock:            number
}

// Converts JSON strings to/from your types
export class Convert {
    public static toBooks(json: string): Books {
        return JSON.parse(json);
    }

    public static booksToJson(value: Books): string {
        return JSON.stringify(value);
    }
}

export interface PartialBook{
    id: string
    title: string
    quantity: number
    unit_price: number
    currency_id: string
}

export interface PartialBookPP{
    amount: {
        currency_code: string,
        value: number
    }
}
