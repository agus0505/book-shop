import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { useCartStore } from "../store/useCartStore";
import { books } from "../utilities/books";
import { Link } from "react-router-dom";
import izqIcon from '../images/izquierda.png'
import { DOLAR_PRICE } from "../constants/frontConfig";

export function Book() {
    useEffect(() => {
        window.scrollTo(0, 0)
    }, [])

    const addToCart = useCartStore(state => state.addToCart)
    const [actualQuantity, setActualQuantity] = useState<number>(1)
    const { name } = useParams()
    const book = books.find(b => b.title.toLowerCase() === name?.toLowerCase())

    function handleAddButtonClick() {
        if (book === undefined) return
        addToCart(book, actualQuantity)
        setActualQuantity(1)
    }

    return (
        //loading ? <main><p>Cargando libro...</p></main> :
        !book ? <main><p style={{ color: 'red' }}>No se han encontrado libros con ese titulo</p></main> :
            <>
                <main className="book-container">
                    <span className="back-arrow">
                        <Link to={'/libros'}>
                            <img src={izqIcon} alt="Back Arrow" />
                        </Link>
                    </span>
                    <article className="book-details">
                        <section>
                            <img src={book.image_link} alt={`imagen de ${book.title}`} />
                        </section>
                        <section>
                            <h2>{book.title}</h2>
                            <h3>{book.author} - {book.year}</h3>
                            <p>{book.description}</p>
                            <p>AR$ <strong>{book.price}</strong></p>
                            <p>US$ <strong>{(book.price / DOLAR_PRICE).toFixed(2)}</strong></p>
                            <div className="buy-container">
                                <div className="quantity-container">
                                    <span onClick={() => {
                                        if (actualQuantity <= 1) return
                                        setActualQuantity(prevQuantity => prevQuantity - 1)
                                    }}>-</span>
                                    <strong>{actualQuantity}</strong>
                                    <span onClick={() => {
                                        if (actualQuantity >= 9) return
                                        setActualQuantity(prevQuantity => prevQuantity + 1)
                                    }}>+</span>
                                </div>
                                <Link to={`/pay/${book.title}/${actualQuantity}`}><button className="buy-button">COMPRAR</button></Link>
                                <button className="buy-button" onClick={handleAddButtonClick}>Añadir al carrito</button>
                            </div>
                        </section>
                    </article>
                </main>
                <section className="details-container">
                    <strong style={{ borderBottom: '1px solid #8D6E63', }}>DESCRIPCION</strong>
                    <div className="details">
                        <strong>ESPECIFICACIONES</strong>
                        <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                            <p><strong>Peso</strong>{book.weight}</p>
                            <p><strong>Fecha de publicacion</strong>{book.publication_date}</p>
                            <p><strong>Autor</strong>{book.author}</p>
                            <p><strong>Categorias</strong>{book.categories.map(c => c).join(', ')}</p>
                            <p><strong>Paginas</strong>{book.pages}</p>
                        </div>
                    </div>
                </section>
            </>
    )
}