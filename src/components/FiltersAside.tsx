import { useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { authors } from "../constants/authors";
import { genres } from "../constants/genres";
import { publishers } from "../constants/publishers";
import closeMenuIcon from '../images/close (2).png'

export function FiltersAside() {
    const navigate = useNavigate()
    const [params, setParams] = useSearchParams()
    const minPrice = params.get('minPrice') ?? ''
    const maxPrice = params.get('maxPrice') ?? ''
    const genre = params.get('genero') ?? 'All'
    const publisher = params.get('editorial') ?? 'All'
    const minYear = params.get('minYear') ?? ''
    const maxYear = params.get('maxYear') ?? ''
    const author = params.get('autor') ?? 'All'
    const [newMinPrice, setNewMinPrice] = useState<string | null>(null)
    const [newMaxPrice, setNewMaxPrice] = useState<string | null>(null)
    const [newMinYear, setNewMinYear] = useState<string | null>(null)
    const [newMaxYear, setNewMaxYear] = useState<string | null>(null)

    function handleParamsPriceButton() {
        const newParams = new URLSearchParams(params)
        if (newMinPrice && newMaxPrice) {
            newParams.set('minPrice', newMinPrice)
            newParams.set('maxPrice', newMaxPrice)
        } else {
            if (newMinPrice) {
                newParams.set('minPrice', newMinPrice)
                newParams.delete('maxPrice')
            }
            else if (newMaxPrice) {
                newParams.set('maxPrice', newMaxPrice)
                newParams.delete('minPrice')
            } else {
                newParams.delete('minPrice')
                newParams.delete('maxPrice')
            }
        }
        setParams(newParams)
    }

    function handleParamsYearButton() {
        const newParams = new URLSearchParams(params)
        if (newMinYear && newMaxYear) {
            newParams.set('minYear', newMinYear)
            newParams.set('maxYear', newMaxYear)
        } else {
            if (newMinYear) {
                newParams.set('minYear', newMinYear)
                newParams.delete('maxYear')
            }
            else if (newMaxYear) {
                newParams.set('maxYear', newMaxYear)
                newParams.delete('minYear')
            } else {
                newParams.delete('minYear')
                newParams.delete('maxYear')
            }
        }
        setParams(newParams)
    }

    function handleChangePublisher(value: string) {
        const newParams = new URLSearchParams(params)
        if (value === 'All') newParams.delete('editorial')
        else if (!params.get('editorial') || value !== params.get('editorial')) newParams.set('editorial', value)
        setParams(newParams)
    }

    function handleChangeCategories(value: string) {
        const newParams = new URLSearchParams(params)
        if (value === 'All') newParams.delete('genero')
        else if (!params.get('genero') || value !== params.get('genero')) newParams.set('genero', value)
        setParams(newParams)
    }

    function handleChangeAuthor(value: string) {
        const newParams = new URLSearchParams(params)
        if (value === 'All') newParams.delete('autor')
        else if (!params.get('autor') || value !== params.get('autor')) newParams.set('autor', value)
        setParams(newParams)
    }

    function clearFilters() {
        navigate('/libros')
        location.reload()

    }



    return (
        <aside>
            <label hidden id='close-aside' className='label-toggle-aside hidden' htmlFor="toggle-aside">
                <img src={closeMenuIcon} alt="Close icon" />
            </label>
            <button onClick={clearFilters} className="clear-filters-button">LIMPIAR FILTROS</button>
            <div>
                <strong>FILTRAR POR PRECIO</strong>
                <div className="range-filter">
                    <input placeholder="0" onChange={(e) => setNewMinPrice(e.target.value)} type="number" defaultValue={minPrice} />
                    -
                    <input placeholder="99999" onChange={(e) => setNewMaxPrice(e.target.value)} type="number" defaultValue={maxPrice} />
                    <button onClick={handleParamsPriceButton}>IR</button>
                </div>
            </div>
            <div>
                <strong>FILTRAR POR AÑO</strong>
                <div className="range-filter">
                    <input placeholder="0" onChange={(e) => setNewMinYear(e.target.value)} type="number" defaultValue={minYear} />
                    -
                    <input placeholder="2025" onChange={(e) => setNewMaxYear(e.target.value)} type="number" defaultValue={maxYear} />
                    <button onClick={handleParamsYearButton}>IR</button>
                </div>
            </div>
            <div>
                <strong>FILTRAR POR EDITORIAL</strong>
                <select className="select-filter" defaultValue={publisher} onChange={(e) => handleChangePublisher(e.target.value)} name="publisher" id="publisher">
                    {
                        publishers.map(publisherObject => {
                            return (
                                <option key={publisherObject.value} value={publisherObject.value}>{publisherObject.label}</option>
                            )
                        })
                    }
                </select>
            </div>
            <div>
                <strong>FILTRAR POR GENERO</strong>
                <select className="select-filter" defaultValue={genre} onChange={(e) => handleChangeCategories(e.target.value)} name="categories" id="categories">
                    {
                        genres.map(genreObject => {
                            return (
                                <option key={genreObject.value} value={genreObject.value}>{genreObject.label}</option>
                            )
                        })
                    }
                </select>
            </div>
            <div>
                <strong>FILTRAR POR AUTOR</strong>
                <select className="select-filter" onChange={(e) => handleChangeAuthor(e.target.value)} defaultValue={author} name="authors">
                    {
                        authors.map(authorObject => {
                            return (
                                <option key={authorObject.value} value={authorObject.value}>{authorObject.label}</option>
                            )
                        })
                    }
                </select>
            </div>
        </aside>
    )
}