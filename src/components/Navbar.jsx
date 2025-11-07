import { Menu, X } from 'lucide-react'
import React, { useState } from 'react'
import { Link, useLocation } from 'react-router-dom'


function smoothScrollToTop(duration = 800) {
  const start = window.scrollY;
  const startTime = performance.now();

  function scroll() {
    const now = performance.now();
    const time = Math.min(1, (now - startTime) / duration);
    // Ease-out animation curve
    const timeFunction = 1 - Math.pow(1 - time, 3);

    window.scrollTo(0, start * (1 - timeFunction));

    if (time < 1) requestAnimationFrame(scroll);
  }

  requestAnimationFrame(scroll);
}

const Navbar = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const { pathname } = useLocation()

  const navigation = [
    { name: 'Home', href: '/' },
    { name: 'About', href: '/about' },
    { name: 'Annual Package', href: '/annualpackage' },
    { name: 'Quarterly Package', href: '/quarterly' },
    { name: ' Sponsor Dashboard', href: '/sponsor' },
    { name: 'Gallery', href: '/gallery' },
    { name: 'Clients', href: '/clients' },
    { name: 'Contact', href: '/contact' },
  ]

  // No scroll handling needed — header uses a permanent background.

  return (
    <header
      className="fixed top-0 left-0 right-0 z-50 transition-all duration-300 bg-gray-900/95 backdrop-blur-md shadow-lg"
    >
      <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <Link to="/" className="flex items-center space-x-2 group">
            <img src="/favicon.ico" alt="Logo" className="h-8 w-8 object-contain group-hover:scale-110 transition-transform duration-300" />
            <span className="text-xl font-bold text-white font-sans" style={{ fontFamily: 'Montserrat, Arial, sans-serif' }}>
              HAKIRUSH
            </span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex space-x-8">
            {navigation.map((item) => (
              <Link
                key={item.name}
                to={item.href}
                onClick={() => smoothScrollToTop(1500)}
                className={`relative text-sm font-semibold transition-colors duration-300 hover:text-red-400 font-sans ${
                  pathname === item.href ? 'text-red-400' : 'text-white'
                }`}
                style={{ fontFamily: 'Montserrat, Arial, sans-serif' }}
              >
                {item.name}
                {pathname === item.href && <span className="absolute -bottom-1 left-0 right-0 h-0.5 bg-red-600" />}
              </Link>
            ))}
          </div>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden text-white"
            onClick={() => setIsMobileMenuOpen((s) => !s)}
            aria-label={isMobileMenuOpen ? 'Close menu' : 'Open menu'}
          >
            {isMobileMenuOpen ? <X /> : <Menu />}
          </button>
        </div>

        {/* Mobile Navigation */}
        {isMobileMenuOpen && (
          <div className="md:hidden bg-gray-900/95 backdrop-blur-md rounded-lg mt-2 mb-3 p-4">
            {navigation.map((item) => (
              <Link
                key={item.name}
                to={item.href}
                className={`block py-2 text-sm font-medium transition-colors duration-300 ${
                  pathname === item.href ? 'text-red-400' : 'text-gray-300'
                }`}
                onClick={() => setIsMobileMenuOpen(false)}
              >
                {item.name}
              </Link>
            ))}
          </div>
        )}
      </nav>
    </header>
  )
}

export default Navbar

