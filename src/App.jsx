import React from 'react'
import { Route, Routes } from 'react-router-dom'
import Navbar from './components/Navbar'
import Home from './pages/Home'
import Footer from './components/Footer'
import Annualplan from './pages/Annualplan'
import Qleague from './pages/Qleague'
import Sponsor from './pages/Sponsor'
import About from './components/About'
import Gallery from './pages/Gallery'
import Clients from './pages/Clients'
import Contact from './pages/Contact'

const App = () => {
  return (
    <div>
      <Navbar />
      <div className='pt-16'>
        <Routes >
          <Route path='/' element={<Home />} />
          <Route path='/about' element={<About />} />
          <Route path='/annualpackage' element={<Annualplan />} />
          <Route path='/quarterly' element={<Qleague />} />
          <Route path='/sponsor' element={<Sponsor />} />
          <Route path='/gallery' element={<Gallery />} />
          <Route path='/clients' element={<Clients />} />
          <Route path='/contact' element={<Contact />} />
        </Routes>
      </div>
      <Footer />
    </div>
  )
}

export default App
