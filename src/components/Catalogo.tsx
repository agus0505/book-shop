import { useEffect } from "react"
import { genres } from "../constants/genres"
import { Link } from "react-router-dom"
import { authors } from "../constants/authors"
import { publishers } from "../constants/publishers"

export function Catalogo() {
    useEffect(() => {
        window.scrollTo(0, 0)
    }, [])
    return (
        <main className="catalogo">
            <section>
                <h2>I. Buscar por genero/categoria</h2>
                <ul className="catalogo-list">
                    {
                        genres.map(genreObject => {
                            if (genreObject.value === 'All') return
                            return (
                                <li key={genreObject.value}>
                                    <Link to={`/libros?genero=${genreObject.value}`}>{genreObject.label}</Link>
                                </li>
                            )
                        })
                    }
                </ul>
            </section>
            <section>
                <h2>II. Buscar por autor</h2>
                <ul className="catalogo-list">
                    {
                        authors.map(authorObject => {
                            if (authorObject.value === 'All') return
                            return (
                                <li key={authorObject.value}>
                                    <Link to={`/libros?autor=${authorObject.value}`}>{authorObject.label}</Link>
                                </li>
                            )
                        })
                    }
                </ul>
            </section>
            <section>
                <h2>III. Buscar por editorial</h2>
                <ul className="catalogo-list">
                    {
                        publishers.map(publisherObject => {
                            if (publisherObject.value === 'All') return
                            return (
                                <li key={publisherObject.value}>
                                    <Link to={`/libros?editorial=${publisherObject.value}`}>{publisherObject.label}</Link>
                                </li>
                            )
                        })
                    }
                </ul>
            </section>
            <section>
                <h2>IV. Buscar por años</h2>
                <ul className="catalogo-list">
                    <li><Link to={`/libros?maxYear=1800`}>-1800</Link></li>
                    <li><Link to={`/libros?minYear=1800&maxYear=1850`}>1800-1850</Link></li>
                    <li><Link to={`/libros?minYear=1850&maxYear=1900`}>1850-1900</Link></li>
                    <li><Link to={`/libros?minYear=1900&maxYear=1950`}>1900-1950</Link></li>
                    <li><Link to={`/libros?minYear=1950&maxYear=2000`}>1950-2000</Link></li>
                    <li><Link to={`/libros?minYear=2000`}>+2000</Link></li>

                </ul>
            </section>
        </main>
    )
}