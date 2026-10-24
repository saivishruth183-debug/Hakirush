import React, { useMemo, useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import {
  motion,
  useMotionTemplate,
  useMotionValue,
  useReducedMotion,
  useScroll,
  useSpring,
  useTransform,
} from 'framer-motion'
import { Mail, Phone, MapPin, Linkedin, Instagram, Youtube, Facebook, ArrowUp } from 'lucide-react'

/* ------------------------------------------------------------------ */
/*  DESIGN TOKENS + DATA                                               */
/* ------------------------------------------------------------------ */
const RED_LIGHT = '#F87171'
const RED = '#DC2626'
const RED_DARK = '#7F1D1D'
const INK = '#05070a'

const SPRING = { type: 'spring', stiffness: 400, damping: 30 }
const TILT_SPRING = { stiffness: 260, damping: 22, mass: 0.6 }
const EASE_OUT = [0.22, 1, 0.36, 1]

const XIcon = ({ size = 18 }) => (
  <svg viewBox="0 0 1200 1227" width={size} height={size} fill="currentColor" aria-hidden="true">
    <path d="M714.2 519.1L1160.9 0H1055.7L667.1 450.2L358.1 0H0L468.6 681.8L0 1226.4H105.3L515.8 750.8L842 1226.4H1200L714.2 519.1ZM570.9 687.5L523.4 620.1L146.7 79.7H311.5L615.4 520.2L662.9 587.6L1055.7 1146.7H890.9L570.9 687.5Z" />
  </svg>
)

const FOOTER_LINKS = [
  { name: 'Home', href: '/' },
  { name: 'About', href: '/about' },
  { name: 'Services', href: '/services' },
  { name: 'Gallery', href: '/gallery' },
  { name: 'Clients', href: '/clients' },
]

const SOCIALS = [
  { icon: Facebook, label: 'Facebook', href: 'https://www.facebook.com/share/1DKbJRWQtq/' },
  { icon: Instagram, label: 'Instagram', href: 'https://www.instagram.com/hakirush.sports_events/?hl=en' },
  { icon: Linkedin, label: 'LinkedIn', href: 'https://linkedin.com/company/hakirush' },
  { icon: XIcon, label: 'X / Twitter', href: 'https://x.com/Hakirush_sports' },
  { icon: Youtube, label: 'YouTube', href: 'https://www.youtube.com/@HakirushSportsEvents' },
]

const ADDRESS = 'No. 472/7 Balaji Arcade, A.V.S. Compound, Ejipura, Koramangala, Bengaluru - 560095.'

const CONTACTS = [
  { icon: Mail, label: 'support@hakirush.com', href: 'mailto:support@hakirush.com' },
  { icon: Phone, label: '+91 7997110210', href: 'tel:+917997110210' },
  {
    icon: MapPin,
    label: ADDRESS,
    href: `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(ADDRESS)}`,
    external: true,
    small: true,
  },
]

const MARQUEE_ITEMS = ['CRICKET', 'BADMINTON', 'FOOTBALL', 'CORPORATE WELLNESS', 'PAN-INDIA LEAGUES']

/* ------------------------------------------------------------------ */
/*  HOOK — cursor-driven 3D tilt (same physics as the navbar)          */
/* ------------------------------------------------------------------ */
function useTilt({ max = 10 } = {}) {
  const reduce = useReducedMotion()
  const mx = useMotionValue(0)
  const my = useMotionValue(0)

  const rotateX = useSpring(useTransform(my, [-0.5, 0.5], [max, -max]), TILT_SPRING)
  const rotateY = useSpring(useTransform(mx, [-0.5, 0.5], [-max, max]), TILT_SPRING)
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

  return { rotateX, rotateY, gx, gy, onMouseMove, reset }
}

/* ------------------------------------------------------------------ */
/*  AMBIENT PARTICLES — drifting red embers at different depths        */
/* ------------------------------------------------------------------ */
const AmbientParticles = () => {
  const reduce = useReducedMotion()
  const particles = useMemo(
    () =>
      Array.from({ length: 22 }, (_, i) => ({
        id: i,
        left: Math.random() * 100,
        top: Math.random() * 100,
        size: 1 + Math.random() * 2.5,
        duration: 8 + Math.random() * 10,
        delay: Math.random() * 6,
        drift: 14 + Math.random() * 26,
      })),
    []
  )

  if (reduce) return null

  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden">
      {particles.map((p) => (
        <motion.span
          key={p.id}
          className="absolute rounded-full"
          style={{
            left: `${p.left}%`,
            top: `${p.top}%`,
            width: p.size,
            height: p.size,
            background: RED,
            boxShadow: `0 0 ${4 + p.size * 3}px 1px ${RED}`,
          }}
          animate={{ y: [0, -p.drift, 0], opacity: [0.1, 0.6, 0.1], scale: [1, 1.4, 1] }}
          transition={{ duration: p.duration, delay: p.delay, repeat: Infinity, ease: 'easeInOut' }}
        />
      ))}
    </div>
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
/*  EXTRUDED LOGO — stacked layers give the favicon real thickness      */
/* ------------------------------------------------------------------ */
const LOGO_DEPTH = 8

const Logo3D = () => {
  const reduce = useReducedMotion()

  return (
    <Link to="/" aria-label="Hakirush home" className="group flex shrink-0 items-center gap-3">
      <motion.span
        className="relative block h-16 w-16"
        style={{ transformPerspective: 600, transformStyle: 'preserve-3d' }}
        animate={reduce ? undefined : { y: [0, -4, 0], rotateY: [0, 16, 0, -16, 0] }}
        transition={{ duration: 7, repeat: Infinity, ease: 'easeInOut' }}
        whileHover={reduce ? undefined : { rotateY: 360, scale: 1.1, transition: { duration: 0.9, ease: EASE_OUT } }}
      >
        {Array.from({ length: LOGO_DEPTH }).map((_, i) => (
          <img
            key={i}
            src="/favicon.png"
            alt=""
            aria-hidden="true"
            className="absolute inset-0 h-full w-full object-contain"
            style={{
              transform: `translateZ(${-(i + 1) * 1.6}px)`,
              filter: `brightness(${0.45 - i * 0.04}) saturate(1.4)`,
            }}
          />
        ))}
        <img
          src="/favicon.png"
          alt=""
          className="absolute inset-0 h-full w-full object-contain drop-shadow-[0_0_18px_rgba(239,68,68,0.5)]"
          style={{ transform: 'translateZ(1px)' }}
        />
      </motion.span>

      <span
        className="text-4xl font-black uppercase italic leading-none tracking-[-0.08em] text-white transition-transform duration-300 group-hover:-translate-y-1"
        style={{
          textShadow:
            '0 1px 0 #3f0d0d, 0 2px 0 #350b0b, 0 3px 0 #2b0909, 0 4px 0 #210707, 0 10px 22px rgba(239,68,68,0.25)',
        }}
      >
        Haki<span style={{ color: RED_LIGHT }}>rush</span>
      </span>
    </Link>
  )
}

/* ------------------------------------------------------------------ */
/*  CHAMPION SEAL — a real 3D coin: front, back and a solid rim         */
/* ------------------------------------------------------------------ */
const SealFace = ({ id }) => (
  <svg viewBox="0 0 200 200" className="h-full w-full">
    <defs>
      <linearGradient id={`${id}-grad`} x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor={RED_LIGHT} />
        <stop offset="50%" stopColor={RED} />
        <stop offset="100%" stopColor={RED_DARK} />
      </linearGradient>
    </defs>
    <circle cx="100" cy="100" r="94" fill="none" stroke={`url(#${id}-grad)`} strokeWidth="3" />
    <circle cx="100" cy="100" r="80" fill="none" stroke={`url(#${id}-grad)`} strokeWidth="1" strokeDasharray="1.5 5" opacity="0.8" />
    <path id={`${id}-path`} d="M 100,100 m -62,0 a 62,62 0 1,1 124,0 a 62,62 0 1,1 -124,0" fill="none" />
    <text fontSize="10.5" fontWeight="800" letterSpacing="3.2" fill={`url(#${id}-grad)`}>
      <textPath href={`#${id}-path`} startOffset="0%">
        HAKIRUSH • CORPORATE SPORTS • HAKIRUSH • CORPORATE SPORTS •
      </textPath>
    </text>
    <g transform="translate(100,102)" fill={`url(#${id}-grad)`}>
      <path d="M-19,-24 L19,-24 L15,-3 Q15,10 0,15 Q-15,10 -15,-3 Z" />
      <rect x="-4.5" y="15" width="9" height="10" />
      <rect x="-15" y="25" width="30" height="4" rx="2" />
      <path d="M-19,-22 Q-30,-22 -30,-10 Q-30,2 -19,-2" fill="none" stroke={`url(#${id}-grad)`} strokeWidth="2.5" />
      <path d="M19,-22 Q30,-22 30,-10 Q30,2 19,-2" fill="none" stroke={`url(#${id}-grad)`} strokeWidth="2.5" />
    </g>
  </svg>
)

const COIN_RIM = 12
const COIN_HALF = 5 // px — half the coin thickness

const ChampionSeal = () => {
  const reduce = useReducedMotion()
  const face = {
    background: 'radial-gradient(circle at 35% 30%, #2a0b0b, #0b0507 72%)',
    boxShadow: `inset 0 0 0 1px ${RED}55, inset 0 -6px 14px rgba(0,0,0,0.6)`,
  }

  return (
    <div className="shrink-0" style={{ perspective: 700 }}>
      <motion.div
        className="relative h-20 w-20 md:h-24 md:w-24"
        style={{ transformStyle: 'preserve-3d', filter: `drop-shadow(0 0 18px ${RED}55)` }}
        animate={reduce ? { rotateY: -20 } : { rotateY: 360 }}
        transition={reduce ? undefined : { duration: 14, repeat: Infinity, ease: 'linear' }}
      >
        {/* solid rim — stacked discs between the two faces */}
        {Array.from({ length: COIN_RIM }).map((_, i) => {
          const z = -COIN_HALF + (i * (COIN_HALF * 2)) / (COIN_RIM - 1)
          return (
            <span
              key={i}
              aria-hidden="true"
              className="absolute inset-0 rounded-full"
              style={{
                transform: `translateZ(${z}px)`,
                background: `linear-gradient(135deg, ${RED}, ${RED_DARK})`,
                filter: `brightness(${0.75 + (i % 3) * 0.12})`,
              }}
            />
          )
        })}

        {/* front */}
        <div
          className="absolute inset-0 rounded-full [backface-visibility:hidden]"
          style={{ ...face, transform: `translateZ(${COIN_HALF + 0.5}px)` }}
        >
          <SealFace id="seal-front" />
        </div>

        {/* back */}
        <div
          className="absolute inset-0 rounded-full [backface-visibility:hidden]"
          style={{ ...face, transform: `rotateY(180deg) translateZ(${COIN_HALF + 0.5}px)` }}
        >
          <SealFace id="seal-back" />
        </div>
      </motion.div>
    </div>
  )
}

/* ------------------------------------------------------------------ */
/*  3D TILE — extruded square used for socials + contact icons          */
/* ------------------------------------------------------------------ */
const TILE_DEPTH = 5

// Purely visual: pointer-events-none means the moving/tilting tile can never
// "steal" the click from the link around it (the cause of the dead icons).
const Tile3D = ({ icon: Icon, active, pressed = false, size = 'md', rotateX, rotateY }) => {
  const reduce = useReducedMotion()
  const dims = size === 'lg' ? 'h-12 w-12' : 'h-11 w-11'

  return (
    <motion.span
      className={`pointer-events-none relative block shrink-0 ${dims}`}
      style={{ rotateX, rotateY, transformPerspective: 500, transformStyle: 'preserve-3d' }}
      animate={{ y: active ? -5 : 0, scale: pressed ? 0.9 : 1 }}
      transition={SPRING}
    >
      {/* extrusion */}
      {Array.from({ length: TILE_DEPTH }).map((_, i) => (
        <span
          key={i}
          aria-hidden="true"
          className="absolute inset-0 rounded-2xl transition-colors duration-300"
          style={{
            transform: `translateZ(${-(i + 1) * 2}px)`,
            background: active ? RED_DARK : '#0b0d12',
            filter: `brightness(${1 - i * 0.12})`,
          }}
        />
      ))}

      {/* face */}
      <span
        aria-hidden="true"
        className="absolute inset-0 rounded-2xl border transition-all duration-300"
        style={{
          background: active
            ? `linear-gradient(145deg, ${RED_LIGHT}, ${RED} 45%, ${RED_DARK})`
            : 'linear-gradient(145deg, #1c2029, #0d1015)',
          borderColor: active ? 'rgba(255,255,255,0.25)' : 'rgba(255,255,255,0.08)',
          boxShadow: active ? `0 16px 30px -10px ${RED}aa` : '0 12px 24px -12px rgba(0,0,0,0.8)',
        }}
      />

      {/* gloss */}
      <span
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-1 top-0 h-1/2 rounded-t-2xl bg-gradient-to-b from-white/20 to-transparent"
        style={{ transform: 'translateZ(1px)' }}
      />

      {/* icon floats above the face and flips in */}
      <motion.span
        className="absolute inset-0 grid place-items-center"
        style={{ z: 14 }}
        animate={{ rotateY: active && !reduce ? 360 : 0 }}
        transition={{ duration: 0.6, ease: EASE_OUT }}
      >
        <span
          className="transition-colors duration-300"
          style={{ color: active ? '#fff7ed' : size === 'lg' ? RED : '#cbd5e1' }}
        >
          <Icon size={size === 'lg' ? 20 : 18} />
        </span>
      </motion.span>
    </motion.span>
  )
}

const SocialTile = ({ item }) => {
  const tilt = useTilt({ max: 22 })
  const [hover, setHover] = useState(false)
  const [pressed, setPressed] = useState(false)

  return (
    <a
      href={item.href}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={`${item.label} (opens in a new tab)`}
      title={item.label}
      onMouseEnter={() => setHover(true)}
      onMouseMove={tilt.onMouseMove}
      onMouseLeave={() => {
        setHover(false)
        setPressed(false)
        tilt.reset()
      }}
      onPointerDown={() => setPressed(true)}
      onPointerUp={() => setPressed(false)}
      onPointerCancel={() => setPressed(false)}
      onFocus={() => setHover(true)}
      onBlur={() => setHover(false)}
      // the link itself never moves, scales or tilts — so press and release always land on it
      className="relative block h-11 w-11 shrink-0 rounded-2xl outline-none focus-visible:ring-2 focus-visible:ring-red-500"
    >
      <Tile3D icon={item.icon} active={hover} pressed={pressed} rotateX={tilt.rotateX} rotateY={tilt.rotateY} />
    </a>
  )
}

const ContactRow = ({ item }) => {
  const tilt = useTilt({ max: 20 })
  const [hover, setHover] = useState(false)

  return (
    <a
      href={item.href}
      {...(item.external ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => {
        setHover(false)
        tilt.reset()
      }}
      onFocus={() => setHover(true)}
      onBlur={() => setHover(false)}
      className={`group flex gap-4 rounded-2xl outline-none focus-visible:ring-2 focus-visible:ring-red-500 ${
        item.small ? 'items-start' : 'items-center'
      }`}
    >
      <span className="shrink-0" onMouseMove={tilt.onMouseMove}>
        <Tile3D icon={item.icon} size="lg" active={hover} rotateX={tilt.rotateX} rotateY={tilt.rotateY} />
      </span>
      <motion.span
        animate={{ x: hover ? 4 : 0 }}
        transition={SPRING}
        className={`transition-colors duration-300 ${
          item.small
            ? 'pt-1 text-sm font-medium leading-relaxed text-slate-300 group-hover:text-slate-100'
            : 'text-base font-semibold tracking-wide text-slate-300 group-hover:text-white'
        }`}
      >
        {item.label}
      </motion.span>
    </a>
  )
}

/* ------------------------------------------------------------------ */
/*  QUICK LINK — cube-roll word + growing red dash                      */
/* ------------------------------------------------------------------ */
const FooterLink3D = ({ link }) => {
  const [hover, setHover] = useState(false)

  return (
    <li>
      <Link
        to={link.href}
        onMouseEnter={() => setHover(true)}
        onMouseLeave={() => setHover(false)}
        onFocus={() => setHover(true)}
        onBlur={() => setHover(false)}
        className="inline-block rounded outline-none focus-visible:ring-2 focus-visible:ring-red-500"
      >
        <motion.span
          animate={{ x: hover ? 6 : 0 }}
          transition={SPRING}
          className={`flex items-center gap-3 text-sm font-bold uppercase tracking-[0.2em] transition-colors duration-300 ${
            hover ? 'text-white' : 'text-slate-300'
          }`}
        >
          <motion.span
            className="h-[2px] rounded-full"
            style={{ background: RED, boxShadow: hover ? `0 0 10px ${RED}` : 'none' }}
            animate={{ width: hover ? 22 : 10 }}
            transition={{ duration: 0.25 }}
          />
          <RollText lit={hover}>{link.name}</RollText>
        </motion.span>
      </Link>
    </li>
  )
}

/* ------------------------------------------------------------------ */
/*  MARQUEE — a 3D ribbon tilted back into the page                     */
/* ------------------------------------------------------------------ */
const MarqueeRibbon = () => {
  const reduce = useReducedMotion()
  const loop = [...MARQUEE_ITEMS, ...MARQUEE_ITEMS]
  const mask = 'linear-gradient(90deg, transparent, black 8%, black 92%, transparent)'

  return (
    <div className="relative mb-12" style={{ perspective: 800 }}>
      <div
        className="relative overflow-hidden border-y border-red-600/30 bg-gradient-to-r from-red-950/50 via-red-900/30 to-red-950/50 py-4 shadow-[0_6px_0_rgba(0,0,0,0.55),0_24px_40px_-14px_rgba(220,38,38,0.35)]"
        style={{ transform: 'rotateX(18deg) rotateZ(-1.2deg)', maskImage: mask, WebkitMaskImage: mask }}
      >
        <motion.div
          className="flex w-max gap-10 whitespace-nowrap"
          animate={reduce ? undefined : { x: ['0%', '-50%'] }}
          transition={{ duration: 22, repeat: Infinity, ease: 'linear' }}
        >
          {loop.map((item, i) => (
            <span
              key={i}
              className="flex items-center gap-10 text-xs font-black uppercase tracking-[0.3em] text-slate-300"
              style={{ textShadow: '0 2px 0 rgba(0,0,0,0.6)' }}
            >
              {item}
              <span className="h-1.5 w-1.5 rotate-45" style={{ background: RED, boxShadow: `0 0 8px ${RED}` }} />
            </span>
          ))}
        </motion.div>
      </div>
    </div>
  )
}

/* ------------------------------------------------------------------ */
/*  BACK TO TOP — small extruded slab button                            */
/* ------------------------------------------------------------------ */
const BackToTop = () => {
  const reduce = useReducedMotion()
  const tilt = useTilt({ max: 22 })
  const [hover, setHover] = useState(false)
  const [pressed, setPressed] = useState(false)

  return (
    <button
      type="button"
      aria-label="Back to top"
      onClick={() => window.scrollTo({ top: 0, behavior: reduce ? 'auto' : 'smooth' })}
      onMouseMove={tilt.onMouseMove}
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => {
        tilt.reset()
        setHover(false)
        setPressed(false)
      }}
      onPointerDown={() => setPressed(true)}
      onPointerUp={() => setPressed(false)}
      onPointerCancel={() => setPressed(false)}
      className="relative h-11 w-11 rounded-full outline-none focus-visible:ring-2 focus-visible:ring-red-500"
    >
      <motion.span
        className="pointer-events-none absolute inset-0 block"
        style={{ rotateX: tilt.rotateX, rotateY: tilt.rotateY, transformPerspective: 500, transformStyle: 'preserve-3d' }}
        animate={{ scale: pressed ? 0.9 : 1 }}
        transition={SPRING}
      >
        {Array.from({ length: 5 }).map((_, i) => (
          <span
            key={i}
            aria-hidden="true"
            className="absolute inset-0 rounded-full bg-red-900"
            style={{ transform: `translateZ(${-(i + 1) * 2}px)`, filter: `brightness(${0.9 - i * 0.12})` }}
          />
        ))}
        <span
          aria-hidden="true"
          className="absolute inset-0 rounded-full bg-gradient-to-br from-red-500 via-red-600 to-red-700 ring-1 ring-inset ring-white/25"
        />
        <span
          aria-hidden="true"
          className="absolute inset-x-1.5 top-0 h-1/2 rounded-t-full bg-gradient-to-b from-white/30 to-transparent"
          style={{ transform: 'translateZ(1px)' }}
        />
        <motion.span
          className="absolute inset-0 grid place-items-center text-white"
          style={{ z: 14 }}
          animate={{ y: hover && !reduce ? [0, -3, 0] : 0 }}
          transition={{ duration: 0.8, repeat: hover && !reduce ? Infinity : 0 }}
        >
          <ArrowUp size={18} strokeWidth={2.5} />
        </motion.span>
      </motion.span>
    </button>
  )
}

/* ------------------------------------------------------------------ */
/*  GIANT WORDMARK — carved 3D letters that stand up as you scroll in   */
/* ------------------------------------------------------------------ */
const BigWordmark = () => {
  const ref = useRef(null)
  const reduce = useReducedMotion()
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start end', 'end end'] })
  const rotateX = useTransform(scrollYProgress, [0, 1], [reduce ? 0 : 70, 0])
  const y = useTransform(scrollYProgress, [0, 1], [reduce ? 0 : 60, 0])
  const opacity = useTransform(scrollYProgress, [0, 0.6], [0, 1])

  return (
    <div ref={ref} aria-hidden="true" className="pointer-events-none mt-10 select-none" style={{ perspective: 900 }}>
      <motion.div
        style={{ rotateX, y, opacity, transformOrigin: '50% 100%' }}
        className="-mb-[0.18em] text-center text-[21vw] font-black uppercase italic leading-[0.8] tracking-[-0.06em] md:text-[16.5vw]"
      >
        <span
          style={{
            color: '#0c0f15',
            WebkitTextStroke: '1px rgba(255,255,255,0.07)',
            textShadow: `0 2px 0 #2a0a0a, 0 4px 0 #240909, 0 6px 0 #1e0707, 0 8px 0 #180606, 0 10px 0 #120404, 0 30px 60px rgba(220,38,38,0.22)`,
          }}
        >
          Haki<span style={{ color: '#13070a' }}>rush</span>
        </span>
      </motion.div>
    </div>
  )
}

/* ------------------------------------------------------------------ */
/*  FOOTER                                                              */
/* ------------------------------------------------------------------ */
const columnAnim = (delay = 0) => ({
  initial: { opacity: 0, y: 30, rotateX: -25 },
  whileInView: { opacity: 1, y: 0, rotateX: 0 },
  viewport: { once: true, margin: '-60px' },
  transition: { duration: 0.8, delay, ease: EASE_OUT },
})

const Footer = () => {
  const tilt = useTilt({ max: 3 })
  const [hovering, setHovering] = useState(false)
  const glare = useMotionTemplate`radial-gradient(700px circle at ${tilt.gx}% ${tilt.gy}%, rgba(220,38,38,0.10), transparent 45%)`

  return (
    <footer
      className="relative overflow-hidden border-t border-white/5 pt-20 font-sans text-white"
      style={{ background: INK }}
    >
      {/* ambient glows */}
      <div
        className="pointer-events-none absolute right-0 top-0 h-[500px] w-[500px] -translate-y-1/2 translate-x-1/4 rounded-full"
        style={{ background: RED, opacity: 0.07, filter: 'blur(120px)' }}
      />
      <div
        className="pointer-events-none absolute bottom-0 left-0 h-[400px] w-[400px] -translate-x-1/4 translate-y-1/2 rounded-full"
        style={{ background: RED, opacity: 0.05, filter: 'blur(110px)' }}
      />
      <AmbientParticles />

      <div className="relative z-10 mx-auto max-w-7xl px-6">
        {/* 3D panel — tilts toward the cursor, columns float at depth */}
        <motion.div
          onMouseMove={tilt.onMouseMove}
          onMouseEnter={() => setHovering(true)}
          onMouseLeave={() => {
            tilt.reset()
            setHovering(false)
          }}
          style={{
            transformStyle: 'preserve-3d',
          }}
          className="relative mb-14 rounded-3xl p-6 sm:p-10"
        >
          {/* slab underside */}
          <span
            aria-hidden="true"
            className="pointer-events-none absolute inset-0 rounded-3xl bg-black/60"
            style={{ transform: 'translateZ(-18px) translateY(8px)' }}
          />
          {/* panel face */}
          <span
            aria-hidden="true"
            className="pointer-events-none absolute inset-0 rounded-3xl border border-white/[0.07] bg-gradient-to-br from-white/[0.05] via-white/[0.015] to-transparent shadow-[0_30px_80px_-30px_rgba(0,0,0,0.9)]"
          />
          {/* moving light */}
          <motion.span
            aria-hidden="true"
            className="pointer-events-none absolute inset-0 rounded-3xl"
            style={{ background: glare }}
            animate={{ opacity: hovering ? 1 : 0 }}
          />

          <div className="relative grid grid-cols-1 gap-14 md:grid-cols-12 md:gap-10" style={{ transformStyle: 'preserve-3d' }}>
            {/* Brand */}
            {/* no preserve-3d here: nested 3D contexts confuse the browser about what's under the
                pointer, which made the social links unclickable. Logo + seal keep their own 3D. */}
            <motion.div {...columnAnim(0)} style={{ z: 40 }} className="space-y-8 md:col-span-5">
              <div className="flex items-center gap-5">
                <Logo3D />
                <ChampionSeal />
              </div>

              <p className="max-w-sm text-lg leading-relaxed text-slate-300">
                India's premier corporate sports platform. We don't just organize events; we build{' '}
                <span className="font-extrabold text-white">champions</span>.
              </p>

              <div className="flex flex-wrap gap-4">
                {SOCIALS.map((item) => (
                  <SocialTile key={item.label} item={item} />
                ))}
              </div>
            </motion.div>

            {/* Navigation */}
            <motion.div {...columnAnim(0.1)} style={{ z: 25 }} className="md:col-span-3">
              <h3 className="mb-8 text-sm font-black uppercase tracking-[0.28em] text-red-500/90">Navigation</h3>
              <ul className="space-y-4">
                {FOOTER_LINKS.map((link) => (
                  <FooterLink3D key={link.name} link={link} />
                ))}
              </ul>
            </motion.div>

            {/* Contact */}
            <motion.div {...columnAnim(0.2)} style={{ z: 32 }} className="md:col-span-4">
              <h3 className="mb-8 text-sm font-black uppercase tracking-[0.28em] text-red-500/90">Get In Touch</h3>
              <div className="space-y-6">
                {CONTACTS.map((item) => (
                  <ContactRow key={item.label} item={item} />
                ))}
              </div>
            </motion.div>
          </div>
        </motion.div>

        <MarqueeRibbon />

        {/* Bottom bar */}
        <div className="flex flex-col items-center justify-between gap-6 md:flex-row">
          <p className="text-center text-xs font-bold uppercase tracking-[0.26em] text-slate-400 md:text-left">
            &copy; {new Date().getFullYear()} <span className="text-white">HAKIRUSH</span>. Engineered for Excellence.
          </p>
          <div className="flex items-center gap-8">
            <BackToTop />
          </div>
        </div>
      </div>

      <BigWordmark />
    </footer>
  )
}

export default Footer
