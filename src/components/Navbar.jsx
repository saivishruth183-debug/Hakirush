import React, { useState } from 'react'
import { Link, useLocation } from 'react-router-dom'
import {
  AnimatePresence,
  motion,
  useMotionTemplate,
  useMotionValue,
  useMotionValueEvent,
  useReducedMotion,
  useScroll,
  useSpring,
  useTransform,
} from 'framer-motion'
import {
  Facebook,
  Instagram,
  Linkedin,
  Zap,
  Home,
  Info,
  Briefcase,
  Image as ImageIcon,
  Users,
} from 'lucide-react'

/* ------------------------------------------------------------------ */
/*  DATA                                                               */
/* ------------------------------------------------------------------ */
const NAV_LINKS = [
  { name: 'Home', href: '/', icon: Home },
  { name: 'About', href: '/about', icon: Info },
  { name: 'Services', href: '/services', icon: Briefcase },
  { name: 'Gallery', href: '/gallery', icon: ImageIcon },
  { name: 'Clients', href: '/clients', icon: Users },
]

const DOCK_LINKS = [ ...NAV_LINKS]

const XIcon = ({ size = 17 }) => (
  <svg viewBox="0 0 1200 1227" width={size} height={size} fill="currentColor" aria-hidden="true">
    <path d="M714.2 519.1L1160.9 0H1055.7L667.1 450.2L358.1 0H0L468.6 681.8L0 1226.4H105.3L515.8 750.8L842 1226.4H1200L714.2 519.1ZM570.9 687.5L523.4 620.1L146.7 79.7H311.5L615.4 520.2L662.9 587.6L1055.7 1146.7H890.9L570.9 687.5Z" />
  </svg>
)

const SOCIALS = [
  { label: 'Facebook', icon: Facebook, href: 'https://www.facebook.com/share/1DKbJRWQtq/' },
  { label: 'Instagram', icon: Instagram, href: 'https://www.instagram.com/hakirush.sports_events/?hl=en' },
  { label: 'LinkedIn', icon: Linkedin, href: 'https://linkedin.com/company/hakirush' },
  { label: 'X', icon: XIcon, href: 'https://x.com/Hakirush_sports' },
]

const SPRING = { type: 'spring', stiffness: 400, damping: 32 }
const TILT_SPRING = { stiffness: 260, damping: 22, mass: 0.6 }
const EASE_OUT = [0.22, 1, 0.36, 1]

/* ------------------------------------------------------------------ */
/*  HOOKS                                                              */
/* ------------------------------------------------------------------ */

// Glass mode after 24px, hide while scrolling down
function useNavScroll() {
  const { scrollY } = useScroll()
  const [scrolled, setScrolled] = useState(false)
  const [hidden, setHidden] = useState(false)

  useMotionValueEvent(scrollY, 'change', (y) => {
    const prev = scrollY.getPrevious() ?? 0
    setScrolled(y > 24)
    setHidden(y > prev && y > 160)
  })

  return { scrolled, hidden }
}

// Cursor-driven 3D tilt (+ optional magnetic shift and glare position)
function useTilt({ max = 10, shift = 0 } = {}) {
  const reduce = useReducedMotion()
  const mx = useMotionValue(0)
  const my = useMotionValue(0)

  const rotateX = useSpring(useTransform(my, [-0.5, 0.5], [max, -max]), TILT_SPRING)
  const rotateY = useSpring(useTransform(mx, [-0.5, 0.5], [-max, max]), TILT_SPRING)
  const x = useSpring(useTransform(mx, [-0.5, 0.5], [-shift, shift]), TILT_SPRING)
  const y = useSpring(useTransform(my, [-0.5, 0.5], [-shift, shift]), TILT_SPRING)
  const gx = useTransform(mx, (v) => (v + 0.5) * 100)
  const gy = useTransform(my, (v) => (v + 0.5) * 100)

  const onMouseMove = (e) => {
    if (reduce) return
    const r = e.currentTarget.getBoundingClientRect()
    mx.set((e.clientX - r.left) / r.width - 0.5)
    my.set((e.clientY - r.top) / r.height - 0.5)
  }
  const reset = () => {
    mx.set(0)
    my.set(0)
  }

  return { rotateX, rotateY, x, y, gx, gy, onMouseMove, reset }
}

/* ------------------------------------------------------------------ */
/*  LOGO — extruded 3D badge: idle float/sway, full spin on hover       */
/* ------------------------------------------------------------------ */
const LOGO_DEPTH = 6

const Logo3D = () => {
  const reduce = useReducedMotion()

  return (
    <Link to="/" aria-label="Hakirush home" className="group flex items-center gap-3">
      <motion.span
        className="relative block h-10 w-10"
        style={{ transformPerspective: 500, transformStyle: 'preserve-3d' }}
        animate={reduce ? undefined : { y: [0, -3, 0], rotateY: [0, 14, 0, -14, 0] }}
        transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut' }}
        whileHover={
          reduce ? undefined : { rotateY: 360, scale: 1.12, transition: { duration: 0.9, ease: EASE_OUT } }
        }
      >
        {/* extrusion layers */}
        {Array.from({ length: LOGO_DEPTH }).map((_, i) => (
          <img
            key={i}
            src="/favicon.png"
            alt=""
            aria-hidden="true"
            className="absolute inset-0 h-full w-full object-contain"
            style={{
              transform: `translateZ(${-(i + 1) * 1.5}px)`,
              filter: `brightness(${0.45 - i * 0.05}) saturate(1.4)`,
            }}
          />
        ))}
        {/* face */}
        <img
          src="/favicon.png"
          alt=""
          className="absolute inset-0 h-full w-full object-contain drop-shadow-[0_6px_12px_rgba(220,38,38,0.5)]"
          style={{ transform: 'translateZ(1px)' }}
        />
      </motion.span>

      <span
        className="text-xl font-extrabold uppercase tracking-tight text-white transition-transform duration-300 group-hover:-translate-y-0.5 sm:text-2xl"
        style={{
          textShadow:
            '0 1px 0 rgba(0,0,0,0.35), 0 2px 0 rgba(0,0,0,0.3), 0 3px 0 rgba(0,0,0,0.25), 0 6px 14px rgba(0,0,0,0.5)',
        }}
      >
        Haki<span className="text-red-600">rush</span>
      </span>
    </Link>
  )
}

/* ------------------------------------------------------------------ */
/*  CUBE-ROLL TEXT — word rolls over like a 3D cube to a red face       */
/* ------------------------------------------------------------------ */
const RollText = ({ children, lit }) => (
  <span className="block h-[1.25em] leading-[1.25em]" style={{ perspective: 300 }}>
    <motion.span
      className="relative block h-full"
      style={{ transformStyle: 'preserve-3d' }}
      animate={{ rotateX: lit ? 90 : 0 }}
      transition={{ type: 'spring', stiffness: 320, damping: 26 }}
    >
      <span className="block h-full [backface-visibility:hidden]" style={{ transform: 'translateZ(0.625em)' }}>
        {children}
      </span>
      <span
        aria-hidden="true"
        className="absolute inset-0 block text-red-500 [backface-visibility:hidden]"
        style={{ transform: 'rotateX(-90deg) translateZ(0.625em)' }}
      >
        {children}
      </span>
    </motion.span>
  </span>
)

/* ------------------------------------------------------------------ */
/*  DESKTOP LINKS                                                      */
/* ------------------------------------------------------------------ */
const DesktopLinks = ({ pathname }) => {
  const [hovered, setHovered] = useState(null)

  return (
    <ul onMouseLeave={() => setHovered(null)} className="flex items-center gap-1">
      {NAV_LINKS.map((item) => {
        const active = pathname === item.href
        const isHover = hovered === item.href
        return (
          <motion.li
            key={item.href}
            className="relative"
            animate={{ y: isHover ? -2 : 0 }}
            transition={SPRING}
          >
            <Link
              to={item.href}
              onMouseEnter={() => setHovered(item.href)}
              onFocus={() => setHovered(item.href)}
              onBlur={() => setHovered(null)}
              aria-current={active ? 'page' : undefined}
              className={`relative z-10 block px-4 py-2 text-[13px] font-semibold uppercase tracking-[0.12em] outline-none transition-colors duration-200 ${
                active || isHover ? 'text-white' : 'text-white/60'
              }`}
            >
              <RollText lit={active || isHover}>{item.name}</RollText>
            </Link>

            {isHover && (
              <motion.span
                layoutId="nav-hover"
                transition={SPRING}
                className="pointer-events-none absolute inset-0 z-0 rounded-full bg-gradient-to-b from-white/[0.12] to-white/[0.04] shadow-[0_3px_0_rgba(0,0,0,0.35),0_10px_20px_-8px_rgba(0,0,0,0.6)] ring-1 ring-inset ring-white/10"
              />
            )}

            {active && (
              <motion.span
                layoutId="nav-active"
                transition={SPRING}
                style={{ x: '-50%' }}
                className="pointer-events-none absolute -bottom-1 left-1/2 h-[3px] w-5 rounded-full bg-red-600 shadow-[0_0_12px_rgba(220,38,38,0.9)]"
              />
            )}
          </motion.li>
        )
      })}
    </ul>
  )
}

/* ------------------------------------------------------------------ */
/*  SOCIALS — 3D coin flip on hover                                     */
/* ------------------------------------------------------------------ */
const Socials = () => {
  const reduce = useReducedMotion()
  return (
    <div className="hidden items-center gap-1 border-r border-white/10 pr-3 lg:flex">
      {SOCIALS.map(({ label, icon: Icon, href }) => (
        <motion.a
          key={label}
          href={href}
          target="_blank"
          rel="noopener noreferrer"
          aria-label={label}
          style={{ transformPerspective: 400 }}
          whileHover={reduce ? undefined : { rotateY: 360, y: -3 }}
          transition={{ duration: 0.6, ease: EASE_OUT }}
          className="grid h-9 w-9 place-items-center rounded-full text-white/50 transition-colors duration-200 hover:bg-white/[0.08] hover:text-red-500"
        >
          <Icon size={17} />
        </motion.a>
      ))}
    </div>
  )
}

/* ------------------------------------------------------------------ */
/*  CTA — thick extruded slab: tilt, magnetic pull, glare, press-in     */
/* ------------------------------------------------------------------ */
const CTA_DEPTH = 7

const JoinButton3D = () => {
  const tilt = useTilt({ max: 20, shift: 8 })
  const [hover, setHover] = useState(false)
  const glare = useMotionTemplate`radial-gradient(circle at ${tilt.gx}% ${tilt.gy}%, rgba(255,255,255,0.55), transparent 55%)`

  return (
    <Link to="/contact" className="block rounded-full outline-none focus-visible:ring-2 focus-visible:ring-red-400">
      <motion.div
        onMouseMove={tilt.onMouseMove}
        onMouseEnter={() => setHover(true)}
        onMouseLeave={() => {
          tilt.reset()
          setHover(false)
        }}
        style={{
          x: tilt.x,
          y: tilt.y,
          rotateX: tilt.rotateX,
          rotateY: tilt.rotateY,
          transformPerspective: 700,
          transformStyle: 'preserve-3d',
        }}
        whileTap={{ scale: 0.93 }}
        className="relative cursor-pointer select-none"
      >
        {/* slab depth */}
        {Array.from({ length: CTA_DEPTH }).map((_, i) => (
          <span
            key={i}
            aria-hidden="true"
            className="absolute inset-0 rounded-full bg-red-900"
            style={{
              transform: `translateZ(${-(i + 1) * 2}px)`,
              filter: `brightness(${0.95 - i * 0.08})`,
            }}
          />
        ))}

        {/* face */}
        <span
          aria-hidden="true"
          className="absolute inset-0 rounded-full bg-gradient-to-br from-red-500 via-red-600 to-red-700 ring-1 ring-inset ring-white/25"
        />

        {/* cursor glare */}
        <motion.span
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 rounded-full"
          style={{ background: glare, z: 1 }}
          animate={{ opacity: hover ? 1 : 0 }}
        />

        {/* top gloss */}
        <motion.span
          aria-hidden="true"
          className="pointer-events-none absolute inset-x-2 top-0 h-1/2 rounded-t-full bg-gradient-to-b from-white/30 to-transparent"
          style={{ z: 1 }}
        />

        {/* floor glow */}
        <motion.span
          aria-hidden="true"
          className="pointer-events-none absolute -bottom-3 left-3 right-3 h-3 rounded-full bg-red-600/60 blur-md"
          style={{ z: -30 }}
          animate={{ opacity: hover ? 0.95 : 0.5, scaleX: hover ? 1.12 : 1 }}
        />

        {/* label floats above the face */}
        <span
          className="relative flex items-center gap-2 px-4 py-2.5 text-xs font-bold uppercase tracking-[0.18em] text-white sm:px-5"
          style={{ transform: 'translateZ(18px)', textShadow: '0 2px 6px rgba(0,0,0,0.35)' }}
        >
          <Zap size={15} className="fill-current" />
          Join Us
        </span>
      </motion.div>
    </Link>
  )
}

/* ------------------------------------------------------------------ */
/*  MOBILE DOCK — tilted 3D shelf, raised active key, icons flip in     */
/* ------------------------------------------------------------------ */
const MobileDock = ({ pathname, hidden }) => {
  const reduce = useReducedMotion()

  return (
    <motion.nav
      aria-label="Mobile"
      initial={false}
      animate={{ y: hidden ? 140 : 0 }}
      transition={{ duration: 0.35, ease: EASE_OUT }}
      className="fixed inset-x-0 bottom-4 z-[100] flex justify-center px-4 pb-[env(safe-area-inset-bottom)] md:hidden"
    >
      <motion.ul
        style={{ transformPerspective: 800, rotateX: reduce ? 0 : 10 }}
        className="flex items-center gap-1 rounded-full border border-white/10 bg-neutral-950/80 p-1.5 shadow-[0_6px_0_rgba(0,0,0,0.5),0_24px_40px_-10px_rgba(0,0,0,0.75)] backdrop-blur-xl backdrop-saturate-150"
      >
        {DOCK_LINKS.map(({ name, href, icon: Icon }) => {
          const active = pathname === href
          return (
            <motion.li key={href} whileTap={{ scale: 0.88 }}>
              <Link
                to={href}
                aria-label={name}
                aria-current={active ? 'page' : undefined}
                className="relative flex h-11 items-center gap-2 rounded-full px-3.5"
              >
                {active && (
                  <motion.span
                    layoutId="dock-active"
                    transition={SPRING}
                    className="absolute inset-0 rounded-full bg-gradient-to-b from-red-500 to-red-700 shadow-[0_4px_0_#7f1d1d,0_10px_20px_-4px_rgba(220,38,38,0.8)] ring-1 ring-inset ring-white/20"
                  />
                )}

                <motion.span
                  className="relative z-10 block"
                  style={{ transformPerspective: 300 }}
                  animate={{ rotateY: active && !reduce ? 360 : 0, y: active ? -1 : 0 }}
                  transition={{ duration: 0.6, ease: EASE_OUT }}
                >
                  <Icon
                    size={19}
                    strokeWidth={active ? 2.4 : 2}
                    className={`transition-colors ${active ? 'text-white' : 'text-white/55'}`}
                  />
                </motion.span>

                <AnimatePresence initial={false}>
                  {active && (
                    <motion.span
                      initial={{ width: 0, opacity: 0 }}
                      animate={{ width: 'auto', opacity: 1 }}
                      exit={{ width: 0, opacity: 0 }}
                      transition={{ duration: 0.25 }}
                      className="relative z-10 overflow-hidden whitespace-nowrap text-xs font-bold uppercase tracking-wider text-white"
                    >
                      {name}
                    </motion.span>
                  )}
                </AnimatePresence>
              </Link>
            </motion.li>
          )
        })}
      </motion.ul>
    </motion.nav>
  )
}

/* ------------------------------------------------------------------ */
/*  MAIN NAVBAR — whole bar tilts toward cursor, layers sit at depths   */
/* ------------------------------------------------------------------ */
export default function Navbar() {
  const { pathname } = useLocation()
  const { scrolled, hidden } = useNavScroll()
  const reduce = useReducedMotion()
  const { scrollYProgress } = useScroll()
  const progress = useSpring(scrollYProgress, { stiffness: 120, damping: 25, mass: 0.3 })

  const tilt = useTilt({ max: 4 })
  const [hovering, setHovering] = useState(false)
  const glare = useMotionTemplate`radial-gradient(500px circle at ${tilt.gx}% ${tilt.gy}%, rgba(255,255,255,0.09), transparent 45%)`

  const shouldHide = hidden && !reduce

  return (
    <>
      <motion.header
        initial={false}
        animate={{ y: shouldHide ? '-130%' : 0 }}
        transition={{ duration: 0.35, ease: EASE_OUT }}
        className="fixed inset-x-0 top-0 z-[100] font-sans"
      >
        <div
          className={`mx-auto transition-all duration-500 ease-out ${
            scrolled ? 'mt-3 max-w-6xl px-3 sm:px-4' : 'mt-0 max-w-7xl px-0'
          }`}
        >
          <motion.nav
            aria-label="Main"
            onMouseMove={tilt.onMouseMove}
            onMouseEnter={() => setHovering(true)}
            onMouseLeave={() => {
              tilt.reset()
              setHovering(false)
            }}
            style={{
              rotateX: tilt.rotateX,
              rotateY: tilt.rotateY,
              transformPerspective: 1200,
              transformStyle: 'preserve-3d',
            }}
            className={`relative flex items-center justify-between transition-[height,padding] duration-500 ease-out ${
              scrolled ? 'h-16 px-4 sm:px-5' : 'h-20 px-5 sm:px-8'
            }`}
          >
            {/* slab underside — gives the glass bar physical thickness */}
            <span
              aria-hidden="true"
              className={`pointer-events-none absolute inset-0 rounded-2xl bg-black/50 transition-opacity duration-500 ${
                scrolled ? 'opacity-100' : 'opacity-0'
              }`}
              style={{ transform: 'translateZ(-14px) translateY(5px)' }}
            />

            {/* glass face */}
            <span
              aria-hidden="true"
              className={`pointer-events-none absolute inset-0 rounded-2xl transition-all duration-500 ${
                scrolled
                  ? 'border border-white/10 bg-neutral-950/70 shadow-[0_10px_40px_-10px_rgba(0,0,0,0.6)] backdrop-blur-xl backdrop-saturate-150'
                  : 'border border-transparent'
              }`}
            />

            {/* moving light */}
            <motion.span
              aria-hidden="true"
              className="pointer-events-none absolute inset-0 rounded-2xl"
              style={{ background: glare }}
              animate={{ opacity: hovering && scrolled ? 1 : 0 }}
            />

            {/* content floats at different depths for parallax */}
            <div style={{ transform: 'translateZ(30px)' }}>
              <Logo3D />
            </div>

            <div className="hidden md:block" style={{ transform: 'translateZ(20px)' }}>
              <DesktopLinks pathname={pathname} />
            </div>

            <div className="flex items-center gap-3" style={{ transform: 'translateZ(40px)' }}>
              <Socials />
              <motion.div
                animate={reduce ? undefined : { y: [0, -2, 0] }}
                transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
              >
                <JoinButton3D />
              </motion.div>
            </div>

            {/* scroll progress line */}
            <motion.span
              aria-hidden="true"
              style={{ scaleX: progress }}
              className={`pointer-events-none absolute inset-x-5 bottom-0 h-[2px] origin-left rounded-full bg-gradient-to-r from-red-700 via-red-500 to-orange-400 transition-opacity duration-300 ${
                scrolled ? 'opacity-100' : 'opacity-0'
              }`}
            />
          </motion.nav>
        </div>
      </motion.header>

      <MobileDock pathname={pathname} hidden={shouldHide} />
    </>
  )
}