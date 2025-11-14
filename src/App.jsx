import React from 'react'
import { Route, Routes } from 'react-router-dom'

// Components
import Navbar from './components/Navbar'
import Footer from './components/Footer'
import ScrollToTop from './components/ScrolltoTop'
import AboutUs from './components/Aboutus'

// Pages
import Home from './pages/Home'
import About from './pages/About'
import Package from './pages/Package'
import Annualplan from './pages/Annualplan'
import Qleague from './pages/Qleague'
import Sponsor from './pages/Sponsor'
import Gallery from './pages/Gallery'
import Clients from './pages/Clients'
import Contact from './pages/Contact'

// Sponsor Pages
import Titlesponsor from './sponsor/Titlesponsor'
import Cosponsor from './sponsor/Cosponsor'
import Stallpartner from './sponsor/Stallpatner'
import Merchandisepartner from './sponsor/Merchandisepartner'

// Client Pages
import Google from './clients/Google'


const App = () => {
  return (
    <div>
      <Navbar />
      <div className='pt-16'>
        <ScrollToTop />   
        <Routes >
          <Route path='/' element={<Home />} />
          <Route path='/aboutus' element={<AboutUs />} />
          <Route path='/about' element={<About />} />
          <Route path='/package' element={<Package />} />
          <Route path='/package/annualpackage' element={<Annualplan />} />
          <Route path='/package/quarterly' element={<Qleague />} />
          <Route path='/sponsor' element={<Sponsor />} />
          <Route path='/gallery' element={<Gallery />} />
          <Route path='/clients' element={<Clients />} />
          <Route path='/contact' element={<Contact />} />
          <Route path='/sponsor/titlesponser' element={<Titlesponsor />} />
          <Route path='/sponsor/cosponser' element={<Cosponsor />} />
          <Route path='/sponsor/stallsponser' element={<Stallpartner />} />
          <Route path='/sponsor/merchandisepartner' element={<Merchandisepartner />} />
          <Route path='/client/google' element={<Google />} />
        </Routes>
      </div>
      <Footer />
    </div>
  )
}

export default App
