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
import Titlesponsor from './sponsor/Titlesponsor'
import Cosponsor from './sponsor/Cosponsor'
import Stallpartner from './sponsor/Stallpatner'
import Merchandisepartner from './sponsor/Merchandisepartner'
import Google from './clients/Google'
import Microsoft from './clients/Microsoft'
import Amazon from './clients/Amazon'
import Facebook from './clients/Facebook'
import Apple from './clients/Apple'
import Netflix from './clients/Netflix'

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
          <Route path='/sponsor/titlesponser' element={<Titlesponsor />} />
          <Route path='/sponsor/cosponser' element={<Cosponsor />} />
          <Route path='/sponsor/stallsponser' element={<Stallpartner />} />
          <Route path='/sponsor/merchandisepartner' element={<Merchandisepartner />} />
          <Route path='/client/google' element={<Google />} />
          <Route path='/client/microsoft' element={<Microsoft />} />
          <Route path='/client/amazon' element={<Amazon />} />
          <Route path='/client/facebook' element={<Facebook />} />
          <Route path='/client/apple' element={<Apple />} />
          <Route path='/client/netflix' element={<Netflix />} />
        </Routes>
      </div>
      <Footer />
    </div>
  )
}

export default App
