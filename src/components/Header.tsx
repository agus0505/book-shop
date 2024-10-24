import { useState } from 'react'
import primaryIcon from '../images/primary-icon.png'
import { NavLink } from '../utilities/NavLink'
import { useNavigate } from 'react-router-dom'
import menuIcon from '../images/menu.png'
import closeIcon from '../images/close (1).png'
import { useCartStore } from '../store/useCartStore'
import { DOLAR_PRICE } from '../constants/frontConfig'

export function Header() {
    const price = useCartStore(state => state.price)
    const [inputValue, setInputValue] = useState('')
    const navigate = useNavigate()
    function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
        event.preventDefault()
        const inputValueTrim = inputValue.trim()
        if (inputValueTrim !== '') navigate(`/libros?s=${inputValueTrim}`)
        setInputValue('')
    }

    function handleToggleMenu(event: React.ChangeEvent<HTMLInputElement>) {
        if (event.target.checked === true) {
            document.querySelector('#open-menu')?.classList.add('hidden')
            document.querySelector('#close-menu')?.classList.remove('hidden')
            document.querySelector('.links-list')?.classList.add('active')
            return
        }
        document.querySelector('#open-menu')?.classList.remove('hidden')
        document.querySelector('#close-menu')?.classList.add('hidden')
        document.querySelector('.links-list')?.classList.remove('active')
    }
    return (
        <header>
            <div>
                <h1>
                    <img src={primaryIcon} alt="Primary Icon" />
                    Learn son
                </h1>
                <form onSubmit={handleSubmit}>
                    <input value={inputValue} onChange={(e) => setInputValue(e.target.value)} id='books-search' type="text" placeholder='Habitos atomicos, padre rico padre pobre...' />
                    <button id='search-button' type='submit'>Buscar</button>
                </form>
            </div>



            <nav>
                <ul className='links-list'>
                    <li><NavLink to='/'>Inicio</NavLink></li>
                    <li><NavLink to='/Libros'>Libros</NavLink></li>
                    <li><NavLink to='/Catalogo'>Catalogo</NavLink></li>
                    <li>{
                        price > 0 ? <NavLink to='/pay'>AR${price.toFixed(2)} / US${(price / DOLAR_PRICE).toFixed(2)}</NavLink>
                            : `US$${Math.round(price).toString()} / AR$${(Math.round(price * 1000)).toString()}`
                    }</li>
                    <li><NavLink to='/ayuda'>Ayuda</NavLink></li>
                </ul>
            </nav>

            <label id='open-menu' className='label-toggle-menu' htmlFor="toggle-menu">
                <img src={menuIcon} alt="Menu icon" />
            </label>
            <input hidden onChange={handleToggleMenu} type="checkbox" id='toggle-menu' />
            <label hidden id='close-menu' className='label-toggle-menu hidden' htmlFor="toggle-menu">
                <img src={closeIcon} alt="Close icon" />
            </label>
        </header>
    )
}