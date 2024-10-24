import { useEffect, useState } from 'react'
import { Link, useSearchParams } from 'react-router-dom'
import { FiltersAside } from './FiltersAside'
import openMenuIcon from '../images/filter.png'
import { AddToCartIcon, RemoveFromCartIcon } from '../icons'
import { useCartStore } from '../store/useCartStore'
import { books } from '../utilities/books'
import { BooksPagination } from './BooksPagination'
import { sortBooks } from '../utilities/sortBooks'
import { Sort } from '../types/sorts.d'

export function Books() {
    useEffect(() => {
        window.scrollTo(0, 0)
    }, [])
    const [sorter, setSorter] = useState<string | Sort>(Sort.MOST_RELEVANT)
    const addToCart = useCartStore(state => state.addToCart)
    const cart = useCartStore(state => state.cart)
    const removeFromCart = useCartStore(state => state.removeFromCart)
    const [page, setPage] = useState<number>(1)
    const perPage = 15


    const [params] = useSearchParams()

    const minPrice = params.get('minPrice') ?? 0
    const maxPrice = params.get('maxPrice') ?? 9999999
    const genre = params.get('genero') ?? 'All'
    const publisher = params.get('editorial') ?? 'All'
    const minYear = params.get('minYear') ?? 0
    const maxYear = params.get('maxYear') ?? 9999999
    const author = params.get('autor') ?? 'All'
    const search = params.get('s') ?? 'All'


    const filterBooksGenre = books.filter(b => b.categories.some(c => c.toLowerCase() === genre.toLowerCase() || genre === 'All'))
    const filterBooksPrice = filterBooksGenre.filter(b => b.price > Number(minPrice) && b.price < Number(maxPrice))
    const filterBooksPublisher = filterBooksPrice.filter(b => b.publisher.toLowerCase() === publisher.toLowerCase() || publisher === 'All')
    const filterBooksYear = filterBooksPublisher.filter(b => b.year > Number(minYear) && b.year < Number(maxYear))
    const filterBooksAuthor = filterBooksYear.filter(b => b.author.toLowerCase() === author.toLowerCase() || author === 'All')
    const filterBooks = filterBooksAuthor.filter(b => b.title.toLowerCase().includes(search.toLowerCase()) || search === 'All')
    const sortedBooks = sortBooks(sorter, filterBooks) ?? []
    const paginationBooks = sortedBooks.length > 0 ? sortedBooks.slice((page - 1) * perPage, (page - 1) * perPage + perPage) : []


    const max = Math.ceil(filterBooks.length / perPage)



    function handleToggleAside(event: React.ChangeEvent<HTMLInputElement>) {
        if (event.target.checked === true) {
            document.querySelector('#open-aside')?.classList.add('hidden')
            document.querySelector('#close-aside')?.classList.remove('hidden')
            document.querySelector('aside')?.classList.add('active')
            return
        }
        document.querySelector('#open-aside')?.classList.remove('hidden')
        document.querySelector('#close-aside')?.classList.add('hidden')
        document.querySelector('aside')?.classList.remove('active')
    }

    const changePage = (page: number) => {
        setPage(page)
    }

    return (
        <>
            <main className='books-primary'>
                <label id='open-aside' className='label-toggle-aside' htmlFor="toggle-aside">
                    <img src={openMenuIcon} alt="Menu icon" />
                </label>
                <input hidden onChange={handleToggleAside} type="checkbox" id='toggle-aside' />
                <FiltersAside />
                {

                    paginationBooks.length <= 0 ? (
                        <p style={{ color: 'red', display: 'flex', justifyContent: 'center', alignItems: 'center', padding: '32px' }}>
                            No se han encontrado libros para tu búsqueda
                        </p>
                    ) : (
                        <div className='books-main-separator'>
                            <div className='books-sorter-container'>
                                <label htmlFor="books-sorter">Ordenar por:</label>
                                <select onChange={(e) => {
                                    setPage(1)
                                    setSorter(e.target.value)
                                }} name="Sorter" id="books-sorter">
                                    <option value={Sort.MOST_RELEVANT}>Mas relevantes</option>
                                    <option value={Sort.LESS_PRICE}>Menor precio</option>
                                    <option value={Sort.MORE_PRICE}>Mayor precio</option>
                                    <option value={Sort.YOUNGER}>Mas recientes</option>
                                    <option value={Sort.OLDER}>Mas antiguos</option>
                                    <option value={Sort.ALPHABETIC_ORDER}>Orden alfabetico</option>
                                    <option value={Sort.DESC_ALPHABETIC_ORDER}>Alfabetico alrevez</option>
                                </select>
                            </div>
                            <ul className='books-container'>
                                {paginationBooks.map(book => {
                                    const isBookInCart = cart.findIndex(b => b.id === book.id) >= 0;
                                    return (
                                        <Link key={book.title} style={{ color: '#4E342E' }} to={book.title}>
                                            <li className='book'>
                                                <h2>{book.title}</h2>
                                                <img src={book.image_link} alt={`imagen de ${book.title}`} />
                                                <h4>{book.year} - {book.author}</h4>
                                                <p>${book.price}</p>
                                                {book.stock < 0 ? <span>Sin stock</span>
                                                    : isBookInCart ? (
                                                        <span
                                                            title='Eliminar del carrito'
                                                            onClick={() => removeFromCart(book.id)}
                                                            className='removefromcart-container'
                                                        >
                                                            <RemoveFromCartIcon />
                                                        </span>
                                                    ) : (
                                                        <span
                                                            title='Añadir al carrito'
                                                            className='addtocart-container'
                                                            onClick={() => addToCart(book, null)}
                                                        >
                                                            <AddToCartIcon />
                                                        </span>
                                                    )}
                                            </li>
                                        </Link>
                                    );
                                })}
                            </ul>
                            <BooksPagination page={page} setPage={changePage} max={max} />
                        </div>
                    )
                }
            </main >
        </>
    )
}