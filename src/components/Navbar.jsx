import { Linkedin, Instagram, Facebook, Zap, Home as HomeIcon, Info, Briefcase, Image as ImageIcon, Users, Mail } from 'lucide-react'
import React, { useState, useEffect, useRef } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion'

const useTilt = (strength = 16) => {
  const ref = useRef(null)
  const [isHovered, setIsHovered] = useState(false)
  const x = useMotionValue(0)
  const y = useMotionValue(0)

  const rotateX = useSpring(useTransform(y, [-0.5, 0.5], [strength, -strength]), {
    stiffness: 300,
    damping: 22,
  })
  const rotateY = useSpring(useTransform(x, [-0.5, 0.5], [-strength, strength]), {
    stiffness: 300,
    damping: 22,
  })

  const handleMouseMove = (e) => {
    if (!ref.current) return
    const rect = ref.current.getBoundingClientRect()
    x.set((e.clientX - rect.left) / rect.width - 0.5)
    y.set((e.clientY - rect.top) / rect.height - 0.5)
  }

  const handleMouseLeave = () => {
    x.set(0)
    y.set(0)
    setIsHovered(false)
  }

  return { ref, x, y, rotateX, rotateY, isHovered, setIsHovered, handleMouseMove, handleMouseLeave }
}

/* ------------------------------------------------------------------ */
/*  LOGO — plain, no 3D treatment                                      */
/* ------------------------------------------------------------------ */
const Logo3D = () => {
  return (
    <Link to="/" className="flex items-center gap-2 group">
      <div className="relative flex items-center justify-center h-20 w-20 sm:h-14 sm:w-14 md:h-16 md:w-16 lg:h-18 lg:w-18 transition-all duration-300">
        <div className="absolute inset-0 bg-red-600 rounded-2xl blur-lg opacity-0 group-hover:opacity-60 transition-opacity duration-500" />
        <img
          src="/favicon.png"
          alt="Logo"
          className="relative z-10 h-16 w-16 sm:h-10 sm:w-10 md:h-12 md:w-12 lg:h-18 lg:w-18 object-contain drop-shadow-xl transition-all duration-300"
        />
      </div>

      <span className="hidden sm:block text-2xl md:text-3xl font-extrabold tracking-tight text-white group-hover:text-red-600 transition-colors uppercase drop-shadow-md">
        Haki<span className="text-red-600 group-hover:text-white transition-colors">rush</span>
      </span>
    </Link>
  )
}

/* ------------------------------------------------------------------ */
/*  3D NAV LINK — pill lifts and tilts toward the cursor on hover      */
/* ------------------------------------------------------------------ */
const NavLink3D = ({ item, isActive }) => {
  const { ref, rotateX, rotateY, isHovered, setIsHovered, handleMouseMove, handleMouseLeave } = useTilt(10)

  return (
    <div style={{ perspective: 400 }}>
      <Link
        to={item.href}
        ref={ref}
        onMouseMove={handleMouseMove}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={handleMouseLeave}
      >
        <motion.div
          style={{
            rotateX: isHovered ? rotateX : 0,
            rotateY: isHovered ? rotateY : 0,
            transformStyle: 'preserve-3d',
          }}
          animate={{ y: isHovered ? -3 : 0, z: isHovered ? 10 : 0 }}
          transition={{ type: 'spring', stiffness: 300, damping: 20 }}
          className={`relative px-5 py-2 text-sm font-bold uppercase tracking-wide rounded-xl overflow-hidden ${
            isActive ? 'text-red-600' : 'text-slate-200 hover:text-red-600'
          }`}
        >
          <span className="relative z-10" style={{ transform: 'translateZ(6px)' }}>
            {item.name}
          </span>
          {isActive && (
            <motion.div
              layoutId="nav-active"
              className="absolute inset-0 bg-red-900/20 rounded-xl z-0"
              transition={{ type: 'spring', stiffness: 380, damping: 30 }}
            />
          )}
          {!isActive && (
            <div className="absolute bottom-1 left-1/2 -translate-x-1/2 w-0 h-1 bg-red-600 rounded-full transition-all group-hover:w-4" />
          )}
          {/* subtle hover sheen */}
          <motion.div
            className="absolute inset-0 rounded-xl bg-gradient-to-b from-white/10 to-transparent pointer-events-none"
            animate={{ opacity: isHovered ? 1 : 0 }}
            style={{ transform: 'translateZ(4px)' }}
          />
        </motion.div>
      </Link>
    </div>
  )
}

/* ------------------------------------------------------------------ */
/*  3D SOCIAL ICON — small pop + tilt toward cursor                    */
/* ------------------------------------------------------------------ */
const SocialIcon3D = ({ item }) => {
  const { ref, rotateX, rotateY, isHovered, setIsHovered, handleMouseMove, handleMouseLeave } = useTilt(24)
  const Icon = item.icon

  return (
    <div style={{ perspective: 300 }}>
      <motion.a
        ref={ref}
        href={item.href}
        target="_blank"
        rel="noopener noreferrer"
        onMouseMove={handleMouseMove}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={handleMouseLeave}
        style={{
          rotateX: isHovered ? rotateX : 0,
          rotateY: isHovered ? rotateY : 0,
          transformStyle: 'preserve-3d',
        }}
        animate={{ y: isHovered ? -3 : 0, scale: isHovered ? 1.15 : 1 }}
        transition={{ type: 'spring', stiffness: 320, damping: 18 }}
        className="relative block p-2 text-slate-400 hover:text-red-600 transition-colors"
      >
        <span style={{ transform: 'translateZ(10px)', display: 'block' }}>
          <Icon size={20} />
        </span>
      </motion.a>
    </div>
  )
}

/* ------------------------------------------------------------------ */
/*  3D CTA — extruded slab button, idle bob, tilt + gloss on hover     */
/* ------------------------------------------------------------------ */
const JoinUsButton3D = () => {
  const { ref, x, y, rotateX, rotateY, isHovered, setIsHovered, handleMouseMove, handleMouseLeave } = useTilt(18)
  const DEPTH_LAYERS = 8

  const glow = useTransform([x, y], ([xv, yv]) =>
    `radial-gradient(circle at ${(xv + 0.5) * 100}% ${(yv + 0.5) * 100}%, rgba(255,255,255,0.5), transparent 55%)`
  )

  return (
    <Link to="/contact" style={{ perspective: 800 }}>
      <motion.div
        ref={ref}
        onMouseMove={handleMouseMove}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={handleMouseLeave}
        whileTap={{ scale: 0.94 }}
        animate={
          isHovered
            ? {}
            : { rotateY: [0, 6, 0, -6, 0], y: [0, -2, 0, -2, 0] }
        }
        transition={
          isHovered
            ? {}
            : { duration: 6, repeat: Infinity, ease: 'easeInOut' }
        }
        style={{
          rotateX: isHovered ? rotateX : undefined,
          rotateY: isHovered ? rotateY : undefined,
          transformStyle: 'preserve-3d',
          cursor: 'pointer',
        }}
        className="relative flex items-center justify-center"
      >
        {Array.from({ length: DEPTH_LAYERS }).map((_, i) => (
          <span
            key={i}
            className="absolute inset-0 rounded-xl bg-gradient-to-br from-red-700 via-red-800 to-red-950"
            style={{
              transform: `translateZ(${-2 - i * 2}px)`,
              filter: `brightness(${1 - i * 0.05})`,
            }}
          />
        ))}

        <span
          className="absolute inset-0 rounded-xl bg-gradient-to-br from-red-500 via-red-600 to-red-700 shadow-[0_10px_30px_rgba(194,24,7,0.5)]"
          style={{ transform: 'translateZ(2px)' }}
        />

        <motion.span
          className="absolute inset-0 rounded-xl pointer-events-none transition-opacity duration-300"
          style={{ background: glow, opacity: isHovered ? 1 : 0, transform: 'translateZ(3px)' }}
        />

        <span
          className="absolute inset-x-0 top-0 h-1/2 rounded-t-xl bg-gradient-to-b from-white/30 to-transparent pointer-events-none"
          style={{ transform: 'translateZ(3px)' }}
        />

        <motion.span
          className="absolute -bottom-3 left-1 right-1 h-3 rounded-full bg-black/40 blur-md pointer-events-none"
          animate={{ opacity: isHovered ? 0.85 : 0.5, scaleX: isHovered ? 1.08 : 1 }}
          style={{ transform: 'translateZ(-40px)' }}
        />

        <span
          className="absolute inset-0 rounded-xl border transition-colors duration-300 pointer-events-none"
          style={{
            borderColor: isHovered ? 'rgba(255,255,255,0.3)' : 'rgba(255,255,255,0.08)',
            transform: 'translateZ(4px)',
          }}
        />

        <span
          className="relative z-10 flex items-center gap-2 px-4 py-2 font-bold text-xs uppercase tracking-widest text-white"
          style={{ transform: 'translateZ(20px)' }}
        >
          <Zap size={16} className="fill-current drop-shadow-sm" />
          Join Us
        </span>
      </motion.div>
    </Link>
  )
}

const BottomNav = ({ items }) => {
  const { pathname } = useLocation()

  return (
    <div className="md:hidden fixed bottom-4 inset-x-0 z-[100] flex justify-center px-4 pointer-events-none">
      <div className="pointer-events-auto flex items-center gap-0.5 px-2 py-2 rounded-full bg-[#0b0e14]/90 backdrop-blur-xl border border-white/10 shadow-[0_10px_40px_rgba(0,0,0,0.5)]">
        {items.map((item) => {
          const isActive = pathname === item.href
          const Icon = item.icon
          return (
            <Link
              key={item.name}
              to={item.href}
              aria-label={item.name}
              className="relative flex items-center justify-center w-11 h-11 rounded-full"
            >
              {isActive && (
                <motion.span
                  layoutId="bottom-nav-active"
                  className="absolute inset-0 rounded-full bg-red-600/15 ring-1 ring-red-600/50"
                  transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                />
              )}
              <Icon
                size={19}
                strokeWidth={isActive ? 2.5 : 2}
                className={`relative z-10 transition-colors duration-200 ${
                  isActive ? 'text-red-500' : 'text-slate-400'
                }`}
              />
            </Link>
          )
        })}
      </div>
    </div>
  )
}

/* ------------------------------------------------------------------ */
/*  MAIN NAVBAR                                                        */
/* ------------------------------------------------------------------ */
const Navbar = () => {
  const [scrolled, setScrolled] = useState(false)
  const { pathname } = useLocation()

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
  ]

  // Same destinations as `navigation`, plus Contact — icon-mapped for the bottom nav.
  const bottomNavItems = [
    { name: 'Home', href: '/', icon: HomeIcon },
    { name: 'About', href: '/about', icon: Info },
    { name: 'Services', href: '/services', icon: Briefcase },
    { name: 'Gallery', href: '/gallery', icon: ImageIcon },
    { name: 'Clients', href: '/clients', icon: Users },
  ]

  const TwitterIcon = ({ className }) => (
    <svg viewBox="0 0 1200 1227" fill="currentColor" className={className} xmlns="http://www.w3.org/2000/svg" width="1em" height="1em">
      <path d="M714.2 519.1L1160.9 0H1055.7L667.1 450.2L358.1 0H0L468.6 681.8L0 1226.4H105.3L515.8 750.8L842 1226.4H1200L714.2 519.1ZM570.9 687.5L523.4 620.1L146.7 79.7H311.5L615.4 520.2L662.9 587.6L1055.7 1146.7H890.9L570.9 687.5Z" />
    </svg>
  )

  const socialmedia = [
    { icon: Facebook, href: 'https://www.facebook.com/share/1DKbJRWQtq/' },
    { icon: Instagram, href: 'https://www.instagram.com/hakirush.sports_events/?hl=en' },
    { icon: Linkedin, href: 'https://linkedin.com/company/hakirush' },
    { icon: TwitterIcon, href: 'https://x.com/Hakirush_sports' },
  ]

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-[100] transition-all duration-500 font-sans ${
          scrolled
            ? 'py-2 bg-[#05070a]/95 backdrop-blur-xl border-b border-white/10 shadow-lg'
            : 'py-2 bg-[#05070a]'
        }`}
      >
        <nav className="px-9 sm:px-15">
          <div className="flex justify-between items-center h-16">
            {/* LOGO — full 3D extruded badge */}
            <Logo3D />

            {/* DESKTOP NAV — each pill tilts toward the cursor */}
            <div className="hidden md:flex items-center bg-white/5 border border-white/10 rounded-2xl px-2 py-1 shadow-sm">
              {navigation.map((item) => (
                <NavLink3D key={item.name} item={item} isActive={pathname === item.href} />
              ))}
            </div>

            {/* RIGHT ACTION AREA */}
            <div className="flex items-center gap-3">
              <div className="hidden lg:flex items-center gap-2 border-r border-white/10 pr-4 mr-2">
                {socialmedia.map((item, index) => (
                  <SocialIcon3D key={index} item={item} />
                ))}
              </div>

              <JoinUsButton3D />
            </div>
          </div>
        </nav>
      </header>

      <BottomNav items={bottomNavItems} />
    </>
  )
}

export default Navbar