import React, { lazy, Suspense } from 'react'
import { Link, Route, Routes } from 'react-router-dom'

// Components
import Navbar from './components/Navbar'
import Footer from './components/Footer'
import ScrollToTop from './components/ScrolltoTop'
import CustomCursor from './components/CustomCursor'

const Home = lazy(() => import('./pages/Home'))
const About = lazy(() => import('./pages/About'))
const Services = lazy(() => import('./pages/Services'))
const Annualplan = lazy(() => import('./services/Annualplan'))
const Qleague = lazy(() => import('./services/Qleague'))
const Sponsor = lazy(() => import('./components/Sponsor'))
const Gallery = lazy(() => import('./pages/Gallery'))
const Clients = lazy(() => import('./pages/Clients'))
const Contact = lazy(() => import('./pages/Contact'))
const Titlesponsor = lazy(() => import('./sponsor/Titlesponsor'))
const Cosponsor = lazy(() => import('./sponsor/Cosponsor'))
const Stallpartner = lazy(() => import('./sponsor/Stallpatner'))
const Merchandisepartner = lazy(() => import('./sponsor/Merchandisepartner'))
const Sponsor1 = lazy(() => import('./sponsors/Sponsor1'))
const Sponsor2 = lazy(() => import('./sponsors/Sponsor2'))
const Sponsor3 = lazy(() => import('./sponsors/Sponsor3'))
const Sponsor4 = lazy(() => import('./sponsors/Sponsor4'))
const Sponsor5 = lazy(() => import('./sponsors/Sponsor5'))

const NotFound = () => (
  <main className="section-shell flex min-h-[60vh] flex-col items-center justify-center gap-4 text-center">
    <p className="text-sm font-bold uppercase tracking-[0.3em] text-red-500">404 — Page not found</p>
    <h1 className="text-5xl text-white">This page doesn’t exist.</h1>
    <Link to="/" className="btn-primary mt-2">
      Back to home
    </Link>
  </main>
)

const App = () => {
  return (
    <div>
      <CustomCursor />
      <Navbar />
      <div>
        <ScrollToTop />   
        <Suspense
          fallback={
            <div className="section-shell flex min-h-[60vh] items-center justify-center" role="status">
              Loading page…
            </div>
          }
        >
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/about" element={<About />} />
            <Route path="/services" element={<Services />} />
            <Route path="/services/annualpackage" element={<Annualplan />} />
            <Route path="/services/quarterly" element={<Qleague />} />
            <Route path="/sponsor" element={<Sponsor />} />
            <Route path="/gallery" element={<Gallery />} />
            <Route path="/clients" element={<Clients />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/sponsor/titlesponser" element={<Titlesponsor />} />
            <Route path="/sponsor/cosponser" element={<Cosponsor />} />
            <Route path="/sponsor/stallsponser" element={<Stallpartner />} />
            <Route path="/sponsor/merchandisepartner" element={<Merchandisepartner />} />
            <Route path="/sponsors/sponsor1" element={<Sponsor1 />} />
            <Route path="/sponsors/sponsor2" element={<Sponsor2 />} />
            <Route path="/sponsors/sponsor3" element={<Sponsor3 />} />
            <Route path="/sponsors/sponsor4" element={<Sponsor4 />} />
            <Route path="/sponsors/sponsor5" element={<Sponsor5 />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </Suspense>
      </div>
      <Footer />
    </div>
  )
}

export default App
