import { useEffect, useState } from 'react'
import arrowIcon from '../images/arrow.png'
import backArrowIcon from '../images/back-arrow.png'

export function BooksPagination({ page, setPage, max }: { page: number, setPage: (page: number) => void, max: number }) {
    const [inputValue, setInputValue] = useState(1)

    useEffect(() => {
        setInputValue(page)
    }, [page])

    const input: HTMLInputElement | null = document.querySelector('.pagination-input')

    function handleKeyDown(e: React.KeyboardEvent<HTMLInputElement>) {
        if (e.key === 'Enter') {
            if (!isNaN(Number(inputValue)) && Number(inputValue) >= 1 && Number(inputValue) <= max) {
                setPage(Number(inputValue))
            } else {
                setInputValue(page)
            }
            if (input) input.blur()


        }
    }

    function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
        setInputValue(Number(e.target.value))
    }

    function handleBlur() {
        if (!isNaN(Number(inputValue)) && Number(inputValue) >= 1 && Number(inputValue) <= max) {
            setPage(Number(inputValue))
        } else {
            setInputValue(page)
        }
    }

    return (
        <div className='pagination'>
            <button name='Previous Page' disabled={page <= 1} onClick={() => {
                if (page <= 1) return
                setPage(page - 1)
                setInputValue(page - 1)
            }} className='arrow-icon'>
                <img src={backArrowIcon} alt="Back Arrow Icon" />
            </button>
            <input className='pagination-input' onBlur={handleBlur} onKeyDown={handleKeyDown} onChange={handleChange} value={inputValue} autoComplete='off' name='page' type="text" />
            <p>de {max}</p>
            <button name='Next Page' disabled={page >= max} onClick={() => {
                if (page >= max) return
                setPage(page + 1)
                setInputValue(page + 1)
            }} className='arrow-icon'>
                <img src={arrowIcon} alt="Arrow Icon" />
            </button>
        </div >
    )
}