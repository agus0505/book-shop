import './App.css'
import { Book } from './components/Book'
import { Books } from './components/Books'
import { Catalogo } from './components/Catalogo'
import { Footer } from './components/Footer'
import { Header } from './components/Header'
import { Routes, Route } from 'react-router-dom'
import { Home } from './components/Home'
import { Cart } from './components/Cart'
import { PaySection } from './components/PaySection'
import { HelpSection } from './components/HelpSection'
import { Feedback } from './components/Feedback'

function App() {

  return (
    <>
      <Cart />
      <Header />

      <Routes>
        <Route path='/' element={<Home />}></Route>
        <Route path='/Libros' element={<Books />}></Route>
        <Route path='/Catalogo' element={<Catalogo />}></Route>
        <Route path='/libros/:name' element={<Book />}></Route>
        <Route path='/pay/:name/:qty' element={<PaySection />}></Route>
        <Route path='/pay/:name' element={<PaySection />}></Route>
        <Route path='/pay' element={<PaySection />}></Route>
        <Route path='/ayuda' element={<HelpSection />}></Route>
        <Route path='/feedback/:merchant_order_id/:status' element={<Feedback />}></Route>
      </Routes>

      <Footer />


    </>
  )
}

export default App
