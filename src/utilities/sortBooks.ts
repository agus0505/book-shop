import { Book } from "../types/books.d";
import { Sort } from "../types/sorts.d";

export function sortBooks(sort: Sort | string, books: Book[]){
    if(!books || books.length <= 0) return [] 
    if (sort === Sort.MOST_RELEVANT) return books
    if (sort === Sort.LESS_PRICE) return books.sort((a, b) => Number(a.price) - Number(b.price))
    if (sort === Sort.MORE_PRICE) return books.sort((a, b) => Number(b.price) - Number(a.price)) 
    if (sort === Sort.YOUNGER) return books.sort((a, b) => Number(b.year) - Number(a.year))
    if (sort === Sort.OLDER) return books.sort((a, b) => Number(a.year) - Number(b.year)) 
    if (sort === Sort.ALPHABETIC_ORDER) return books.sort((a, b) => a.title.localeCompare(b.title))
    if (sort === Sort.DESC_ALPHABETIC_ORDER) return books.sort((a, b) => b.title.localeCompare(a.title))
}