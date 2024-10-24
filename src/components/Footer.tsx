import { Link } from "react-router-dom"
import footerIMG from '../images/medio_pago.png'
import instagramIcon from '../images/instagram.png'
import tiktokIcon from '../images/tik-tok.png'
import youtubeIcon from '../images/youtube.png'

export function Footer() {
    return (
        <footer>
            <div>
                <strong>Guia de compra</strong>
                <Link to='/ayuda'><p>Preguntas frecuentes</p></Link>
            </div>
            <div>
                <strong>Productos</strong>
                <Link to='/Libros'>Libros</Link>
                <Link to='/catalogo'>Catalogo</Link>
            </div>
            <div>
                <strong>Contactanos</strong>
                <p>example@gmail.com</p>
            </div>
            <div>
                <strong>Redes sociales</strong>
                <nav>
                    <ul className="social-list">
                        <li><a target="_blank" href="http://instagram.com"><img src={instagramIcon} alt="ig icon" />@example</a></li>
                        <li><a target="_blank" href="http://tiktok.com"><img src={tiktokIcon} alt="tiktok icon" />@example</a></li>
                        <li><a target="_blank" href="http://youtube.com"><img src={youtubeIcon} alt="youtube icon" />@example</a></li>
                    </ul>
                </nav>

            </div>
            <img className="pay-img" src={footerIMG} alt='Medios de pago' />
        </footer>
    )
}