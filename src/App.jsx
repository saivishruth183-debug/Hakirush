import React from 'react'
import { Route, Routes } from 'react-router-dom'

// Components
import Navbar from './components/Navbar'
import Footer from './components/Footer'
import ScrollToTop from './components/ScrolltoTop'

// Pages
import Home from './pages/Home'
import About from './pages/About'
import Services from './pages/Services'
import Annualplan from './services/Annualplan'
import Qleague from './services/Qleague'
import Sponsor from './pages/Sponsor'
import Gallery from './pages/Gallery'
import Clients from './pages/Clients'
import Contact from './pages/Contact'

// Sponsor Pages
import Titlesponsor from './sponsor/Titlesponsor'
import Cosponsor from './sponsor/Cosponsor'
import Stallpartner from './sponsor/Stallpatner'
import Merchandisepartner from './sponsor/Merchandisepartner'

// Sponsor Pages
import Sponsor1 from './sponsors/Sponsor1'
import Sponsor2 from './sponsors/Sponsor2'
import Sponsor3 from './sponsors/Sponsor3'
import Sponsor4 from './sponsors/Sponsor4'
import Sponsor5 from './sponsors/Sponsor5'

// Client Pages
import Client1 from './clients/Client1'
import Client2 from './clients/Client2'
import Client3 from './clients/Client3'
import Client4 from './clients/Client4'
import Client5 from './clients/Client5'



const App = () => {
  return (
    <div>
      <Navbar />
      <div className='pt-16'>
        <ScrollToTop />   
        <Routes >
          <Route path='/' element={<Home />} />
          <Route path='/about' element={<About />} />
          <Route path='/services' element={<Services />} />
          <Route path='/services/annualpackage' element={<Annualplan />} />
          <Route path='/services/quarterly' element={<Qleague />} />
          <Route path='/sponsor' element={<Sponsor />} />
          <Route path='/gallery' element={<Gallery />} />
          <Route path='/clients' element={<Clients />} />
          <Route path='/contact' element={<Contact />} />
          <Route path='/sponsor/titlesponser' element={<Titlesponsor />} />
          <Route path='/sponsor/cosponser' element={<Cosponsor />} />
          <Route path='/sponsor/stallsponser' element={<Stallpartner />} />
          <Route path='/sponsor/merchandisepartner' element={<Merchandisepartner />} />
          <Route path='/sponsors/sponsor1' element={<Sponsor1 />} />
          <Route path='/sponsors/sponsor2' element={<Sponsor2 />} />
          <Route path='/sponsors/sponsor3' element={<Sponsor3 />} />
          <Route path='/sponsors/sponsor4' element={<Sponsor4 />} />
          <Route path='/sponsors/sponsor5' element={<Sponsor5 />} />
          <Route path='/clients/client1' element={<Client1 />} />
          <Route path='/clients/client2' element={<Client2 />} />
          <Route path='/clients/client3' element={<Client3 />} />
          <Route path='/clients/client4' element={<Client4 />} />
          <Route path='/clients/client5' element={<Client5 />} />
        </Routes>
      </div>
      <Footer />
    </div>
  )
}

export default App
