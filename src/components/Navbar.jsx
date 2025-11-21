import { Menu, X, Linkedin, Instagram, Youtube, Twitter, Facebook } from 'lucide-react'
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
    { icon: Facebook, href: "https://facebook.com/company/hakirush" },
    { icon: Instagram, href: 'https://www.instagram.com/hakirush.sports_events/?hl=en' },
    { icon: Linkedin, href: 'https://linkedin.com/company/hakirush' },
    { icon: Twitter, href: 'https://x.com/Hakirush_sports?t=imr-ZZmYL7pGFek5b_8J9A&s=09' },
    { icon: Youtube, href: 'https://www.youtube.com/@HakirushSportsEvents' },
  ];

  // No scroll handling needed — header uses a permanent background.

  return (
    <header
      className="fixed top-0 left-0 right-0 z-50 transition-all duration-300 bg-black backdrop-blur-md shadow-2xl border-b border-[#C21807]/20"
    >
      <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-20">
          <Link to="/" className="group" aria-label="HAKIRUSH Home">
            <div className="flex items-center group-hover:scale-105 transition-all duration-300 gap-2">
              <div className="relative">
                <div className="absolute inset-0 bg-linear-to-br from-[#C21807] to-[#A01506] rounded-2xl blur-lg opacity-40 group-hover:opacity-70 transition-opacity duration-300" />
                <img src="/favicon3.png" alt="HAKIRUSH Logo" className="relative h-12 w-12 object-contain drop-shadow-2xl" />
              </div>
              <span className="text-2xl font-black text-yellow-500 tracking-tight" style={{ fontFamily: 'Montserrat, Arial, sans-serif' }}>
                HAKIRUSH
              </span>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-2 lg:space-x-3">
            {navigation.map((item) => (
              <Link
                key={item.name}
                to={item.href}
                className={`relative px-4 py-2.5 text-sm font-bold transition-all duration-300 rounded-lg font-sans group ${
                  pathname === item.href 
                    ? 'text-[#C21807] bg-[#C21807]/10' 
                    : 'text-gray-300 hover:text-white hover:bg-white/10 hover:scale-105'
                }`}
                aria-current={pathname === item.href ? 'page' : undefined}
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
                className="group inline-flex items-center justify-center w-10 h-10 rounded-lg bg-white/5 border border-[#C21807]/20 hover:border-[#C21807] hover:bg-[#C21807] transition-all duration-300 shadow-lg"
              >
                <item.icon className="h-4 w-4 text-gray-400 group-hover:text-white transition-colors duration-300" />
              </motion.a>
            ))}
          </div>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden p-2 rounded-lg text-white bg-white/10 hover:bg-[#C21807] transition-all duration-300 shadow-lg hover:shadow-[#C21807]/50"
            onClick={() => setIsMobileMenuOpen((s) => !s)}
            aria-label={isMobileMenuOpen ? 'Close menu' : 'Open menu'}
          >
            {isMobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>

        {/* Mobile Navigation */}
        {isMobileMenuOpen && (
          <motion.div 
            initial={{ opacity: 0, y: -20 }} 
            animate={{ opacity: 1, y: 0 }} 
            exit={{ opacity: 0, y: -20 }} 
            transition={{ duration: 0.25 }}
            className="md:hidden bg-linear-to-br from-[#0f1419] to-[#1a2332] backdrop-blur-md rounded-2xl mt-2 mb-3 p-4 shadow-2xl border border-[#C21807]/30"
          >
            <div className="flex flex-col gap-2 mb-4">
              {navigation.map((item, index) => (
                <Link
                  key={item.name}
                  to={item.href}
                  className={`block py-3 px-4 text-base font-bold rounded-lg transition-all duration-300 ${
                    pathname === item.href 
                      ? 'bg-[#C21807] text-white' 
                      : 'text-gray-300 hover:text-white hover:bg-white/10'
                  }`}
                  aria-current={pathname === item.href ? 'page' : undefined}
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
            <div className="flex items-center justify-center gap-4 mt-2">
              {socialmedia.map((item, index) => (
                <motion.a
                  key={index}
                  href={item.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  whileHover={{ scale: 1.2, rotate: 5 }}
                  whileTap={{ scale: 0.95 }}
                  className="group inline-flex items-center justify-center w-10 h-10 rounded-lg bg-white/5 border border-[#C21807]/20 hover:border-[#C21807] hover:bg-[#C21807] transition-all duration-300 shadow-lg"
                >
                  <item.icon className="h-4 w-4 text-gray-400 group-hover:text-white transition-colors duration-300" />
                </motion.a>
              ))}
            </div>
          </motion.div>
        )}
      </nav>
    </header>
  )
}

export default Navbar

