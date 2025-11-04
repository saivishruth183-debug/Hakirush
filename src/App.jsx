import React from 'react'
import { Route, Routes } from 'react-router-dom'
import Navbar from './components/Navbar'
import Home from './pages/Home'
import Footer from './components/Footer'
import Annualplan from './pages/Annualplan'
import Qleague from './pages/Qleague'
import Sponsorship from './pages/Sponsorship'

const App = () => {
  return (
    <div>
      <Navbar />
      <div className='pt-16'>
        <Routes >
          <Route path='/' element={<Home />} />
          <Route path='/annualplan' element={<Annualplan />} />
          <Route path='/qleague' element={<Qleague />} />
          <Route path='/sponsorship' element={<Sponsorship />} />
        </Routes>
      </div>
      <Footer />
    </div>
  )
}

export default App
