import aurisIcon from '../images/auriculares.png'
import envioIcon from '../images/entrega.png'
import redesIcon from '../images/redes.png'
import lupaIcon from '../images/lupa.png'
import carritoIcon from '../images/carrito-de-compras.png'
import metodopagoIcon from '../images/metodo-de-pago.png'
import { Link } from 'react-router-dom'
import { useState } from 'react'
import emailjs from '@emailjs/browser'

enum Asuntos {
    INFO_BOOKS = 'info sobre libros',
    MY_BUY = 'mi compra online',
    PROBLEMS = 'problemas o sugerencias',
    CANCELS = 'cancelaciones o devoluciones',
    OTHERS = 'otros'

}

export function HelpSection() {
    const [name, setName] = useState('')
    const [mail, setMail] = useState('')
    const [asunto, setAsunto] = useState<Asuntos | string>(Asuntos.INFO_BOOKS)
    const [message, setMessage] = useState('')
    const [isSending, setIsSending] = useState(false)
    const [error, setError] = useState<null | string>(null)

    function sendMessage() {
        setIsSending(true);

        const templateParams = {
            name,
            mail,
            asunto,
            message,
        };

        emailjs
            .send(
                'service_jqpbeqc',
                'template_h0hb7wy',
                templateParams,
                'hvIcx4bVGyrWJ19bW'
            )
            // eslint-disable-next-line @typescript-eslint/no-unused-vars
            .then((_response) => {
                alert('Mensaje enviado con éxito!');
                setIsSending(false);
                setName('');
                setMail('');
                setAsunto(Asuntos.INFO_BOOKS);
                setMessage('');
            })
            .catch((error) => {
                console.error('Error al enviar el mensaje:', error);
                alert('Hubo un error al enviar tu mensaje, intenta nuevamente.');
                setIsSending(false);
            });
    }
    return (
        <main className='help'>
            <h1 className='b-dark'>Centro de ayuda</h1>
            <section className='help-section'>
                <div className='help-minsection'>
                    <img src={aurisIcon} alt="Contacto Icon" />
                    <h3 className='b-dark'>Contacto</h3>
                    <p>Para consultarnos sobre como comprar, o sobre compras ya realizadas,
                        contactanos al (54) 11 6442 8658 de lunes a sabados de 8.00 a 20.00
                        (hora argentina, -0300 UTC) o a learnson@gmail.com .</p>
                </div>
                <div className='help-minsection'>
                    <img src={envioIcon} alt='Envio Icon' />
                    <h3 className='b-dark'>Envio</h3>
                    <p>Enviamos tu compra a cualquier lugar de Argentina
                        por Correo Argentino, Urbano o Andreani</p>
                </div>
                <div className='help-minsection'>
                    <img src={redesIcon} alt='Redes Icon' />
                    <h3 className='b-dark'>Redes</h3>
                    <p>Podes encontrarnos en nuestras redes sociales</p>
                    <p>Instagram: example</p>
                    <p>Tik Tok: example</p>
                    <p>Youtube: example</p>
                </div>
            </section>
            <h2 style={{ textDecoration: 'underline #351104' }} className='b-dark'>Atencion al cliente</h2>
            <p>El <strong>horario de atención</strong> es de lunes a sábado de 9.00 a 20.00 (hora argentina, -0300 UTC)</p>
            <p><strong>Para consultas sobre tus compras en Cúspide.com</strong>, podés escribirnos a learnson@gmail.com o llamar a: (54) 11 6442 8658. </p>
            <p><strong>Por otros temas y consultas</strong>, utilizá el seguiente formulario de contacto. Podrás elegir el tema de tu consulta en «Asunto».</p>
            <form onSubmit={(e) => {
                e.preventDefault()
                if (message.length < 6 || name.length < 5 || mail.length < 4 || name.split(' ').length === 1) {
                    setError('Completa bien los datos del formulario')
                    return
                }
                setError(null)
                sendMessage()

            }}>
                <div>
                    <label htmlFor="asunto">Asunto</label>
                    <select value={asunto} onChange={(e) => setAsunto(e.target.value)} name="asunto" id="asunto">
                        <option value={Asuntos.INFO_BOOKS}>Informacion sobre libros</option>
                        <option value={Asuntos.MY_BUY}>Mi compra online</option>
                        <option value={Asuntos.PROBLEMS}>Reportar problemas o sugerencias</option>
                        <option value={Asuntos.CANCELS}>Cancelaciones o devoluciones</option>
                        <option value={Asuntos.OTHERS}>Otros</option>
                    </select>
                </div>
                <div>
                    <label htmlFor="name&surname">Nombre y apellido</label>
                    <input
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        required
                        type="text"
                        placeholder='Juan Perez'
                        id='name&surname'
                    />
                </div>
                <div>
                    <label htmlFor="gmail">Mail</label>
                    <input
                        value={mail}
                        onChange={(e) => setMail(e.target.value)}
                        required
                        type="email"
                        placeholder='JuanPerez@gmail.com'
                        id='gmail'
                    />
                </div>
                <div>
                    <label htmlFor="mensaje">Mensaje</label>
                    <textarea
                        value={message}
                        onChange={(e) => setMessage(e.target.value)}
                        placeholder='Escribe tu mensaje'
                        required
                        name="mensaje"
                        id="mensaje"
                    />
                </div>
                <button type='submit' disabled={isSending}>
                    {isSending ? 'Enviando...' : 'Enviar'}
                </button>
                {
                    error && <p style={{ color: 'red' }}>{error}</p>
                }
            </form>
            <h2 style={{ textDecoration: 'underline #351104' }} className='b-dark'>Guia de compra</h2>
            <section className='help-section2'>
                <div>
                    <a href="#search-product-help-section">
                        <img src={lupaIcon} alt="Lupa Icon" />
                        <h3>Buscar un producto</h3>
                    </a>
                </div>
                <div>
                    <a href="#buy-online-help-section">
                        <img src={carritoIcon} alt="Carrito Icon" />
                        <h3>Comprar online</h3>
                    </a>
                </div>
                <div>
                    <a href="#pay-methods-help-section">
                        <img src={metodopagoIcon} alt="Metodo Pago Icon" />
                        <h3>Metodos de pago</h3>
                    </a>
                </div>
            </section>
            <section id='search-product-help-section'>
                <div>
                    <h3 style={{ textDecoration: 'underline #351104' }}>Buscar un producto</h3>
                    <p>Se puede buscar el buscador para buscar un libro por titulo, o tambien se puede entrar a la seccion <Link to={'/libros'}><strong>Libros</strong></Link> o al <Link to={'/catalogo'}><strong>Catalogo </strong></Link>Para navegar entre diferentes categorias, autores, editoriales, etc...</p>
                </div>
                <div>
                    <h4>¿Cómo busco productos de un tema en particular?</h4>
                    <p>En la seccion de libros hay un apartado de filtros a la izquierda</p>
                </div>
            </section>
            <section id='buy-online-help-section'>

                <div>
                    <h3 style={{ textDecoration: 'underline #351104' }}>Compras Online</h3>
                    <h4>¿Donde puedo ver el estado de mis compras?</h4>
                    <p>Cuando se realize una compra, se le sera informado por el mail que haya proporcionado</p>
                </div>
                <div>
                    <h4>¿Puedo cancelar un pedido luego de realizada la compra?</h4>
                    <p>Si, Podés ingresar al formulario de contacto y elegir el asunto <strong>“Cancelaciones y devoluciones”.</strong> </p>
                </div>
                <div>
                    <h4>¿Puedo agregar un producto luego de realizada la compra?</h4>
                    <p>Te recomendamos que hagas un nuevo pedido</p>
                </div>
                <div>
                    <h4>¿Cuando llegara mi compra?</h4>
                    <p>Los pedidos salen de depósitos normalmente <strong>24hs hábiles</strong> después de la confirmación de la compra.</p>
                    <p>El <strong>tiempo de envío</strong> varía en función de la distancia desde nuestro centro de distribución.</p>
                </div>
            </section>
            <section id='pay-methods-help-section'>
                <div>
                    <h3 style={{ textDecoration: 'underline #351104' }}>Metodos de pago</h3>
                    <h4>¿Cuáles son los metodos de pago disponibles?</h4>
                    <ul style={{ listStyle: 'initial' }}>
                        <li><strong>Mercado Pago</strong></li>
                        <li><strong>Tarjetas de credito: </strong>A traves de mercado pago. Visa, Mastercard y American Express, etc...</li>
                        <li><strong>PayPal</strong></li>
                    </ul>
                </div>
            </section>
        </main>
    )
}