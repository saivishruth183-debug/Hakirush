import { Menu, X, Linkedin, Instagram, Twitter, Youtube } from 'lucide-react'
import React, { useState } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { motion } from 'framer-motion'


const Navbar = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const { pathname } = useLocation()

  const navigation = [
    { name: 'Home', href: '/' },
    { name: 'About', href: '/about' },
    { name: 'Package', href: '/package' },
    { name: ' Sponsor Dashboard', href: '/sponsor' },
    { name: 'Gallery', href: '/gallery' },
    { name: 'Clients', href: '/clients' },
    { name: 'Contact', href: '/contact' },
  ]

  const socialmedia = [
    { icon: Linkedin, href: 'https://linkedin.com/company/hakirush' },
    { icon: Instagram, href: 'https://www.instagram.com/hakirush.sports_events/?hl=en' },
    { icon: Twitter, href: 'https://x.com/Hakirush_sports?t=imr-ZZmYL7pGFek5b_8J9A&s=09' },
    { icon: Youtube, href: 'https://www.youtube.com/@HakirushSportsEvents' },
  ];

  // No scroll handling needed — header uses a permanent background.

  return (
    <header
      className="fixed top-0 left-0 right-0 z-50 transition-all duration-300 bg-linear-to-r from-gray-900 via-gray-800 to-gray-900 backdrop-blur-md shadow-2xl border-b border-red-900/20"
    >
      <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-20">
          <Link to="/" className="flex items-center space-x-3 group" aria-label="HAKIRUSH Home">
            <div className="relative">
              <div className="absolute inset-0 bg-linear-to-br from-red-500 to-orange-500 rounded-xl blur-md opacity-50 group-hover:opacity-100 transition-opacity duration-300" />
              <img src="/favicon.ico" alt="HAKIRUSH Logo" className="relative h-10 w-10 object-contain group-hover:scale-110 transition-transform duration-300" />
            </div>
            <span className="text-2xl font-extrabold bg-linear-to-r from-white via-red-100 to-orange-200 bg-clip-text text-transparent font-sans" style={{ fontFamily: 'Montserrat, Arial, sans-serif' }}>
              HAKIRUSH
            </span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-1">
            {navigation.map((item) => (
              <Link
                key={item.name}
                to={item.href}
                className={`relative px-4 py-2 text-sm font-bold transition-all duration-300 rounded-lg font-sans group ${
                  pathname === item.href 
                    ? 'bg-linear-to-r from-red-600 to-orange-500 bg-clip-text text-transparent' 
                    : 'text-gray-300 hover:text-white hover:bg-white/10'
                }`}
                style={{ fontFamily: 'Montserrat, Arial, sans-serif' }}
              >
                {item.name}
              </Link>
            ))}
          </div>
          
          {/* Social Media Icons - Desktop */}
          <div className="hidden md:flex items-center gap-3">
            {socialmedia.map((item, index) => (
              <motion.a
                key={index}
                href={item.href}
                target="_blank"
                rel="noopener noreferrer"
                whileHover={{ scale: 1.2, rotate: 5 }}
                whileTap={{ scale: 0.95 }}
                className="inline-flex items-center justify-center w-10 h-10 rounded-xl bg-white/5 border border-red-500/20 hover:border-red-500 hover:bg-linear-to-br hover:from-red-600 hover:to-orange-500 text-gray-400 hover:text-white transition-all duration-300 shadow-lg"
              >
                <item.icon className="h-4 w-4" />
              </motion.a>
            ))}
          </div>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden p-2 rounded-lg text-white bg-white/10 hover:bg-linear-to-r hover:from-red-600 hover:to-orange-500 transition-all duration-300 shadow-lg hover:shadow-red-500/50"
            onClick={() => setIsMobileMenuOpen((s) => !s)}
            aria-label={isMobileMenuOpen ? 'Close menu' : 'Open menu'}
          >
            {isMobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>

        {/* Mobile Navigation */}
        {isMobileMenuOpen && (
          <div className="md:hidden bg-linear-to-br from-gray-900 to-gray-800 backdrop-blur-md rounded-2xl mt-2 mb-3 p-4 shadow-2xl border border-red-900/30">
            {navigation.map((item, index) => (
              <Link
                key={item.name}
                to={item.href}
                className={`block py-3 px-4 mb-2 text-sm font-bold rounded-xl transition-all duration-300 ${
                  pathname === item.href 
                    ? 'bg-linear-to-r from-red-600 to-orange-500 bg-clip-text text-transparent' 
                    : 'text-gray-300 hover:text-white hover:bg-white/10'
                }`}
                onClick={() => setIsMobileMenuOpen(false)}
                style={{ 
                  animation: `slideIn 0.3s ease-out ${index * 0.05}s both`,
                  fontFamily: 'Montserrat, Arial, sans-serif'
                }}
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

