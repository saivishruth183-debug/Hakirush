import { Menu, X, Linkedin, Instagram, Youtube, Facebook, Zap } from 'lucide-react'
import React, { useState, useEffect } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'

const Navbar = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const { pathname } = useLocation()

  // Handle scroll effect for glassmorphism
  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20)
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const navigation = [
    { name: 'Home', href: '/' },
    { name: 'About', href: '/about' },
    { name: 'Services', href: '/services' },                                          
    { name: 'Gallery', href: '/gallery' },
    { name: 'Clients', href: '/clients' },
  ];

  const TwitterIcon = ({ className }) => (
    <svg viewBox="0 0 1200 1227" fill="currentColor" className={className} xmlns="http://www.w3.org/2000/svg" width="1em" height="1em">
      <path d="M714.2 519.1L1160.9 0H1055.7L667.1 450.2L358.1 0H0L468.6 681.8L0 1226.4H105.3L515.8 750.8L842 1226.4H1200L714.2 519.1ZM570.9 687.5L523.4 620.1L146.7 79.7H311.5L615.4 520.2L662.9 587.6L1055.7 1146.7H890.9L570.9 687.5Z" />
    </svg>
  );

  const socialmedia = [
    { icon: Facebook, href: "https://www.facebook.com/share/1DKbJRWQtq/" },
    { icon: Instagram, href: 'https://www.instagram.com/hakirush.sports_events/?hl=en' },
    { icon: Linkedin, href: 'https://linkedin.com/company/hakirush' },
    { icon: TwitterIcon, href: 'https://x.com/Hakirush_sports' },
  ];

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-[100] transition-all duration-500 font-sans ${
        scrolled 
          ? 'py-2 bg-[#05070a]/95 backdrop-blur-xl border-b border-white/10 shadow-lg' 
          : 'py-2 bg-[#05070a]'
      }`}
    >
      <nav className="px-9 sm:px-15">
        <div className="flex justify-between items-center h-16">
          {/* LOGO AREA */}
          <Link to="/" className="flex items-center gap-3 group">
            <div className="relative flex items-center justify-center h-12 w-12">
              <div className="absolute inset-0 bg-red-600 rounded-2xl blur-lg opacity-0 group-hover:opacity-60 transition-opacity duration-500" />
              <img src="/favicon.png" alt="Logo" className="relative h-10 w-10 object-contain drop-shadow-lg" />
            </div>
            <span className="hidden sm:block text-2xl font-extrabold tracking-tight text-white group-hover:text-red-600 transition-colors uppercase">
              Haki<span className="text-red-600 group-hover:text-white transition-colors">rush</span>
            </span>
          </Link>

          {/* DESKTOP NAV */}
          <div className="hidden md:flex items-center bg-white/5 border border-white/10 rounded-2xl px-2 py-1 shadow-sm">
            {navigation.map((item) => {
              const isActive = pathname === item.href;
              return (
                <Link
                  key={item.name}
                  to={item.href}
                  className={`relative px-5 py-2 text-sm font-bold uppercase tracking-wide transition-all duration-300 rounded-xl overflow-hidden group ${
                    isActive ? 'text-red-600' : 'text-slate-200 hover:text-red-600'
                  }`}
                >
                  <span className="relative z-10">{item.name}</span>
                  {isActive && (
                    <motion.div 
                      layoutId="nav-active"
                      className="absolute inset-0 bg-red-900/20 rounded-xl z-0"
                      transition={{ type: "spring", stiffness: 380, damping: 30 }}
                    />
                  )}
                  {!isActive && (
                    <div className="absolute bottom-1 left-1/2 -translate-x-1/2 w-0 h-1 bg-red-600 rounded-full transition-all group-hover:w-4" />
                  )}
                </Link>
              );
            })}
          </div>

          {/* RIGHT ACTION AREA */}
          <div className="flex items-center gap-3">
            <div className="hidden lg:flex items-center gap-2 border-r border-white/10 pr-4 mr-2">
              {socialmedia.map((item, index) => (
                <motion.a
                  key={index}
                  href={item.href}
                  whileHover={{ y: -2, color: '#C21807' }}
                  className="p-2 text-slate-400 hover:text-red-600 transition-colors"
                  target="_blank" rel="noopener noreferrer"
                >
                  {item.icon === TwitterIcon ? <TwitterIcon className="w-5 h-5" /> : <item.icon size={20} />}
                </motion.a>
              ))}
            </div>

            {/* "Join Now" CTA */}
            <Link to="/contact">
              <motion.button
                whileHover={{ scale: 1.07 }}
                whileTap={{ scale: 0.97 }}
                className="hidden sm:flex items-center gap-2 px-5 py-2.5 bg-red-600 text-white rounded-xl font-bold text-xs uppercase tracking-widest shadow-md hover:bg-red-700 transition-colors cursor-pointer"
              >
                <Zap size={16} className="fill-current" />
                Join Us
              </motion.button>
            </Link>

            {/* Mobile Toggle */}
            <button
              className="md:hidden p-3 rounded-xl bg-white/10 border border-white/10 text-white shadow-sm"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              aria-label="Toggle menu"
            >
              {isMobileMenuOpen ? <X size={22} /> : <Menu size={22} />}
            </button>
          </div>
        </div>
      </nav>

      {/* MOBILE OVERLAY */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden bg-[#05070a] backdrop-blur-2xl border-b border-white/10 overflow-hidden shadow-lg"
          >
            <div className="p-6 space-y-4">
              {navigation.map((item) => (
                <Link
                  key={item.name}
                  to={item.href}
                  onClick={() => setIsMobileMenuOpen(false)}
                  className={`block text-xl font-bold uppercase tracking-tight italic py-2 px-2 rounded-lg transition-colors ${
                    pathname === item.href ? 'text-red-600 bg-white/5' : 'text-white hover:text-red-600 hover:bg-white/5'
                  }`}
                >
                  {item.name}
                </Link>
              ))}
              <div className="pt-6 border-t border-white/10 flex gap-6 justify-center">
                {socialmedia.map((item, i) => (
                  <a key={i} href={item.href} className="text-slate-400 hover:text-red-600 transition-colors" target="_blank" rel="noopener noreferrer">{item.icon === TwitterIcon ? <TwitterIcon className="w-6 h-6" /> : <item.icon size={24} />}</a>
                ))}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  )
}

export default Navbar;