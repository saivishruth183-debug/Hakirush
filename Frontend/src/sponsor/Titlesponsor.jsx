import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import {
  AnimatePresence,
  motion,
  useMotionTemplate,
  useMotionValue,
  useReducedMotion,
  useScroll,
  useSpring,
  useTransform,
} from 'framer-motion'
import { Trophy, CheckCircle, ArrowRight, Sparkles, Crown, ArrowLeft, Star, Megaphone } from 'lucide-react'
import backgroundImage from '../assets/Hero/Backimage.png'

/* ------------------------------------------------------------------ */
/*  DESIGN TOKENS — same red system as the rest of the site            */
/* ------------------------------------------------------------------ */
const RED_LIGHT = '#F87171'
const RED = '#DC2626'
const RED_DARK = '#7F1D1D'

const SPRING = { type: 'spring', stiffness: 400, damping: 30 }
const TILT_SPRING = { stiffness: 260, damping: 22, mass: 0.6 }
const EASE_OUT = [0.22, 1, 0.36, 1]

const EXTRUDE_WHITE =
  '0 1px 0 #3a0c0c, 0 2px 0 #320a0a, 0 3px 0 #2a0909, 0 4px 0 #220707, 0 5px 0 #1a0505, 0 6px 0 #120404, 0 18px 30px rgba(0,0,0,0.6)'
const EXTRUDE_RED =
  '0 1px 0 #7f1d1d, 0 2px 0 #6b1818, 0 3px 0 #571313, 0 4px 0 #430f0f, 0 5px 0 #2f0a0a, 0 6px 0 #1f0606, 0 18px 34px rgba(220,38,38,0.35)'

/* ------------------------------------------------------------------ */
/*  CONTENT                                                            */
/* ------------------------------------------------------------------ */
const SPONSORS = [
  {
    key: 'title',
    icon: Trophy,
    title: 'Title',
    subtitle: 'Premium branding across kits, trophies, and reels',
    details: {
      overview:
        'As the Title Sponsor, your brand becomes the defining face of the tournament. This package gives you top-level naming, premium placement and exclusive brand leadership throughout the event.',
      whatYouGet: [
        'Event naming rights – e.g. "The HAKIRUSH | [Your Brand] Corporate League"',
        'Primary logo on jerseys, main-stage banners, website & major signage',
        'Stage visibility & opportunity to address audience at opening/closing',
        'Dedicated VIP area + sponsor stall',
        'Weekly social media spotlights & featured reels',
        'Mention in press releases & newsletters',
      ],
      why: [
        'Exclusive recognition among 1000+ professionals',
        'High-impact visibility across offline & online channels',
        'Long-term brand association with corporate sports culture',
      ],
      ctaText: 'Become a Title Sponsor',
    },
  },
]

const GOLD = '#F5C451'

// your logo, served from the public folder
const LOGO_SRC = '/favicon.png'

const FORM_URL =
  'https://docs.google.com/forms/d/e/1FAIpQLSfAXf50qBqTVxUhnPDSKjN0huIuy3TSXYS3xLTWqP07Nkz0kw/viewform?usp=publish-editor'

/* ------------------------------------------------------------------ */
/*  HOOK — cursor-driven 3D tilt                                       */
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

  return { mx, my, rotateX, rotateY, gx, gy, onMouseMove, reset }
}

/* ------------------------------------------------------------------ */
/*  BACKGROUND                                                         */
/* ------------------------------------------------------------------ */
const ParallaxBackground = ({ image }) => {
  const reduce = useReducedMotion()
  const mouseX = useMotionValue(0)
  const mouseY = useMotionValue(0)
  const cfg = { damping: 30, stiffness: 80, mass: 0.6 }
  const sx = useSpring(mouseX, cfg)
  const sy = useSpring(mouseY, cfg)

  const x = useTransform(sx, [-1, 1], [-30, 30])
  const my = useTransform(sy, [-1, 1], [-20, 20])
  const scale = useTransform(sx, [-1, 1], [1.08, 1.12])
  const { scrollY } = useScroll()
  const scrollShift = useTransform(scrollY, [0, 1500], [0, 150])
  const y = useTransform([my, scrollShift], ([a, b]) => a + b)

  useEffect(() => {
    if (reduce) return
    const onMove = (e) => {
      mouseX.set((e.clientX / window.innerWidth) * 2 - 1)
      mouseY.set((e.clientY / window.innerHeight) * 2 - 1)
    }
    window.addEventListener('mousemove', onMove, { passive: true })
    return () => window.removeEventListener('mousemove', onMove)
  }, [reduce, mouseX, mouseY])

  return (
    <>
      <div aria-hidden="true" className="pointer-events-none fixed inset-0 -z-20 bg-[#05070a]" />
      <div
        aria-hidden="true"
        className="pointer-events-none fixed left-0 -z-10 w-full overflow-hidden"
        style={{ top: '-10vh', height: '130vh' }}
      >
        <motion.img src={image} alt="" style={{ x, y, scale }} className="h-full w-full object-cover object-center will-change-transform" />
        <div className="absolute inset-0 bg-linear-to-b from-slate-950/80 via-slate-950/65 to-slate-950/90" />
        <div className="absolute inset-0" style={{ background: `radial-gradient(ellipse at top, ${RED}26, transparent 60%)` }} />
      </div>
    </>
  )
}

/* ------------------------------------------------------------------ */
/*  3D BUILDING BLOCKS                                                 */
/* ------------------------------------------------------------------ */
const Letters3D = ({ text, color, extrude, delay = 0 }) => {
  const reduce = useReducedMotion()
  let n = 0
  return (
    <span aria-hidden="true" style={{ transformStyle: 'preserve-3d' }}>
      {text.split(' ').map((word, w) => (
        <React.Fragment key={w}>
          {w > 0 && ' '}
          <span className="inline-block whitespace-nowrap" style={{ transformStyle: 'preserve-3d' }}>
            {word.split('').map((ch) => {
              const i = n++
              return (
                <motion.span
                  key={i}
                  className="inline-block"
                  style={{ color, textShadow: extrude, transformOrigin: '50% 100%' }}
                  initial={reduce ? false : { opacity: 0, rotateX: -90, y: 30 }}
                  animate={{ opacity: 1, rotateX: 0, y: 0 }}
                  transition={{ delay: delay + i * 0.05, duration: 0.7, ease: EASE_OUT }}
                  whileHover={
                    reduce ? undefined : { y: -10, rotateX: 25, transition: { type: 'spring', stiffness: 400, damping: 12 } }
                  }
                >
                  {ch}
                </motion.span>
              )
            })}
          </span>
        </React.Fragment>
      ))}
    </span>
  )
}

const IconTile = ({ icon: Icon, size = 48 }) => (
  <span
    className="relative block shrink-0 transition-transform duration-700 ease-out group-hover:[transform:rotateY(360deg)]"
    style={{ width: size, height: size, transformStyle: 'preserve-3d' }}
  >
    {Array.from({ length: 6 }).map((_, i) => (
      <span
        key={i}
        aria-hidden="true"
        className="absolute inset-0 rounded-xl"
        style={{ transform: `translateZ(${-(i + 1) * 2}px)`, background: RED_DARK, filter: `brightness(${0.9 - i * 0.1})` }}
      />
    ))}
    <span
      aria-hidden="true"
      className="absolute inset-0 rounded-xl ring-1 ring-inset ring-white/20"
      style={{ background: `linear-gradient(145deg, ${RED_LIGHT}, ${RED} 45%, ${RED_DARK})` }}
    />
    <span
      aria-hidden="true"
      className="absolute inset-x-1 top-0 h-1/2 rounded-t-xl bg-linear-to-b from-white/30 to-transparent"
      style={{ transform: 'translateZ(1px)' }}
    />
    <span className="absolute inset-0 grid place-items-center text-white" style={{ transform: 'translateZ(12px)' }}>
      <Icon size={Math.round(size * 0.44)} strokeWidth={2.4} />
    </span>
  </span>
)

const TiltCard = ({ children, className = '', innerClassName = '', max = 7 }) => {
  const tilt = useTilt({ max })
  const [hover, setHover] = useState(false)
  const glare = useMotionTemplate`radial-gradient(500px circle at ${tilt.gx}% ${tilt.gy}%, rgba(220,38,38,0.16), transparent 45%)`

  return (
    <motion.div
      onMouseMove={tilt.onMouseMove}
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => {
        tilt.reset()
        setHover(false)
      }}
      style={{ rotateX: tilt.rotateX, rotateY: tilt.rotateY, transformPerspective: 1000, transformStyle: 'preserve-3d' }}
      animate={{ y: hover ? -8 : 0 }}
      transition={SPRING}
      className={`group relative rounded-3xl ${className}`}
    >
      <span
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 rounded-3xl bg-black/60"
        style={{ transform: 'translateZ(-16px) translateY(8px)' }}
      />
      <span
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 rounded-3xl border border-white/10 bg-linear-to-br from-slate-900/90 via-slate-950/90 to-black/90 shadow-[0_30px_60px_-25px_rgba(0,0,0,0.9)] backdrop-blur-md"
      />
      <span
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-8 top-0 h-[2px] rounded-full"
        style={{ background: `linear-gradient(90deg, transparent, ${RED}, transparent)` }}
      />
      <motion.span
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 rounded-3xl"
        style={{ background: glare }}
        animate={{ opacity: hover ? 1 : 0 }}
      />
      <div className={`relative h-full ${innerClassName}`} style={{ transform: 'translateZ(30px)', transformStyle: 'preserve-3d' }}>
        {children}
      </div>
    </motion.div>
  )
}

/* ------------------------------------------------------------------ */
/*  NAMING-RIGHTS JUMBOTRON — type a brand and watch the league rename   */
/* ------------------------------------------------------------------ */
const MAX_BRAND = 18

// one character tile that flips like a stadium split-flap board
const FlapChar = ({ ch, index }) => {
  const reduce = useReducedMotion()
  return (
    <span className="relative inline-block" style={{ perspective: 300 }}>
      <AnimatePresence mode="popLayout" initial={false}>
        <motion.span
          key={ch + index}
          className="inline-block"
          initial={reduce ? false : { rotateX: -90, opacity: 0 }}
          animate={{ rotateX: 0, opacity: 1 }}
          exit={reduce ? undefined : { rotateX: 90, opacity: 0 }}
          transition={{ duration: 0.35, delay: index * 0.025, ease: EASE_OUT }}
          style={{ transformOrigin: '50% 50%' }}
        >
          {ch === ' ' ? ' ' : ch}
        </motion.span>
      </AnimatePresence>
    </span>
  )
}

const FlapText = ({ text, className = '', style }) => (
  <span className={`inline-block whitespace-nowrap ${className}`} style={style} aria-hidden="true">
    {text.split('').map((ch, i) => (
      <FlapChar key={i} ch={ch} index={i} />
    ))}
  </span>
)

const BOARD_DEPTH = 8

const NamingBoard = () => {
  const reduce = useReducedMotion()
  const tilt = useTilt({ max: 12 })
  const [hover, setHover] = useState(false)
  const [brand, setBrand] = useState('')
  const [showBrand, setShowBrand] = useState(false)

  const cleanBrand = brand.trim().toUpperCase().slice(0, MAX_BRAND) || 'YOUR BRAND'

  const typed = brand.trim().length > 0

  // until someone types, alternate between the plain league name and the sponsored one;
  // once a brand is typed it stays on the board
  useEffect(() => {
    if (reduce || typed) {
      setShowBrand(true)
      return
    }
    const id = setInterval(() => setShowBrand((v) => !v), 3200)
    return () => clearInterval(id)
  }, [reduce, typed])

  const glare = useMotionTemplate`radial-gradient(circle at ${tilt.gx}% ${tilt.gy}%, rgba(255,255,255,0.18), transparent 50%)`
  const ledDots = 'radial-gradient(rgba(255,255,255,0.09) 1px, transparent 1.2px)'

  return (
    <div className="mx-auto flex w-full max-w-[480px] flex-col items-center">
      <motion.div
        initial={{ opacity: 0, y: 60, rotateX: -40 }}
        animate={{ opacity: 1, y: 0, rotateX: 0 }}
        transition={{ duration: 1.1, delay: 0.3, ease: EASE_OUT }}
        style={{ perspective: 1200, transformOrigin: '50% 100%' }}
        className="relative w-full pt-12"
      >
        {/* gold crown floating above the board */}
        <motion.div
          aria-hidden="true"
          className="absolute left-1/2 top-0 z-10 -translate-x-1/2"
          animate={reduce ? undefined : { y: [0, -8, 0], rotate: [-4, 4, -4] }}
          transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
        >
          <span
            className="grid h-14 w-14 place-items-center rounded-2xl"
            style={{
              background: `linear-gradient(145deg, #fff3c4, ${GOLD} 45%, #b07d12)`,
              boxShadow: `0 5px 0 #7a5208, 0 14px 30px -6px ${GOLD}aa`,
            }}
          >
            <Crown className="h-7 w-7 text-[#5a3a05]" strokeWidth={2.4} />
          </span>
        </motion.div>

        <motion.div
          onMouseMove={tilt.onMouseMove}
          onMouseEnter={() => setHover(true)}
          onMouseLeave={() => {
            tilt.reset()
            setHover(false)
          }}
          style={{ rotateX: tilt.rotateX, rotateY: tilt.rotateY, transformStyle: 'preserve-3d' }}
          className="relative"
        >
          {/* board thickness */}
          {Array.from({ length: BOARD_DEPTH }).map((_, i) => (
            <span
              key={i}
              aria-hidden="true"
              className="absolute inset-0 rounded-3xl"
              style={{ transform: `translateZ(${-(i + 1) * 2.5}px)`, background: i % 2 ? '#1a1d26' : '#0b0d12' }}
            />
          ))}

          {/* screen */}
          <div
            className="relative overflow-hidden rounded-3xl border-4 p-5 sm:p-6"
            style={{
              borderColor: '#20242f',
              background: 'linear-gradient(160deg, #12060a, #05070a 60%, #12060a)',
              boxShadow: hover ? `0 40px 80px -25px ${RED}aa` : '0 30px 60px -25px rgba(0,0,0,0.9)',
              transition: 'box-shadow .4s',
            }}
          >
            <span aria-hidden="true" className="pointer-events-none absolute inset-0" style={{ backgroundImage: ledDots, backgroundSize: '6px 6px' }} />
            <motion.span aria-hidden="true" className="pointer-events-none absolute inset-0" style={{ background: glare }} />
            {/* running lights along the top */}
            <div aria-hidden="true" className="absolute inset-x-6 top-2 flex justify-between">
              {Array.from({ length: 14 }).map((_, i) => (
                <motion.span
                  key={i}
                  className="h-1.5 w-1.5 rounded-full bg-red-500"
                  style={{ boxShadow: `0 0 8px ${RED}` }}
                  animate={reduce ? undefined : { opacity: [0.2, 1, 0.2] }}
                  transition={{ duration: 1.4, repeat: Infinity, delay: i * 0.1 }}
                />
              ))}
            </div>

            <div className="relative mt-3 flex items-center gap-4">
              <span className="grid h-16 w-16 shrink-0 place-items-center rounded-2xl bg-white p-2 shadow-[0_5px_0_rgba(0,0,0,0.4)] sm:h-20 sm:w-20">
                <img src={LOGO_SRC} alt="Hakirush logo" draggable="false" className="h-full w-full object-contain" />
              </span>
              <div className="min-w-0 flex-1">
                <p className="text-[10px] font-black uppercase tracking-[0.3em] text-red-400">Now presenting</p>
                <div className="mt-1 flex items-center gap-1.5">
                  <span className="relative flex h-2 w-2">
                    <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-red-500 opacity-75" />
                    <span className="relative inline-flex h-2 w-2 rounded-full bg-red-500" />
                  </span>
                  <span className="text-[10px] font-bold uppercase tracking-[0.25em] text-white/40">Live</span>
                </div>
              </div>
            </div>

            {/* the league name */}
            <div
              className="relative mt-5 rounded-2xl border border-white/10 bg-black/60 px-3 py-4 text-center shadow-[inset_0_4px_12px_rgba(0,0,0,0.8)]"
              aria-live="polite"
            >
              <span className="sr-only">
                {showBrand ? `The HAKIRUSH | ${cleanBrand} Corporate League` : 'The HAKIRUSH Corporate League'}
              </span>
              <p className="text-[10px] font-black uppercase tracking-[0.35em] text-white/50">The</p>
              <div className="mt-1 flex flex-wrap items-center justify-center gap-x-2 font-mono text-lg font-black uppercase leading-tight tracking-wider text-white sm:text-2xl">
                <FlapText text="HAKIRUSH" style={{ textShadow: `0 0 12px ${RED}` }} />
                <AnimatePresence initial={false}>
                  {showBrand && (
                    <motion.span
                      key="brand"
                      initial={{ opacity: 0, width: 0 }}
                      animate={{ opacity: 1, width: 'auto' }}
                      exit={{ opacity: 0, width: 0 }}
                      transition={{ duration: 0.4, ease: EASE_OUT }}
                      className="inline-flex items-center gap-2 overflow-hidden"
                    >
                      <span className="text-red-500">|</span>
                      <FlapText text={cleanBrand} style={{ color: GOLD, textShadow: `0 0 14px ${GOLD}99` }} />
                    </motion.span>
                  )}
                </AnimatePresence>
              </div>
              <p className="mt-1 text-[10px] font-black uppercase tracking-[0.35em] text-white/50">Corporate League</p>
            </div>
          </div>
        </motion.div>

        {/* floor glow */}
        <div aria-hidden="true" className="mx-auto mt-6 h-6 w-3/4 rounded-[100%] blur-xl" style={{ background: `${RED}55` }} />
      </motion.div>

      {/* try your brand */}
      <label htmlFor="try-brand" className="mt-2 block w-full max-w-sm">
        <span className="mb-2 flex items-center justify-center gap-1.5 text-[11px] font-bold uppercase tracking-[0.25em] text-white/50">
          <Megaphone className="h-3.5 w-3.5 text-red-400" /> Try your brand on the board
        </span>
        <input
          id="try-brand"
          type="text"
          value={brand}
          maxLength={MAX_BRAND}
          onChange={(e) => setBrand(e.target.value)}
          placeholder="Type your company name"
          autoComplete="organization"
          className="w-full rounded-2xl border border-white/10 bg-black/50 px-4 py-3 text-center font-bold text-white placeholder-slate-500 shadow-[inset_0_3px_8px_rgba(0,0,0,0.6)] outline-none transition focus:border-red-500/60 focus:ring-2 focus:ring-red-500/60"
        />
      </label>
    </div>
  )
}

/* ------------------------------------------------------------------ */
/*  BACK BUTTON                                                        */
/* ------------------------------------------------------------------ */
const BackButton = () => {
  const navigate = useNavigate()
  const goBack = () => {
    if (window.history.length > 1) navigate(-1)
    else navigate('/')
  }

  return (
    <motion.button
      type="button"
      onClick={goBack}
      initial={{ opacity: 0, x: -10 }}
      animate={{ opacity: 1, x: 0 }}
      whileHover={{ y: -2 }}
      whileTap={{ y: 2 }}
      className="group inline-flex cursor-pointer items-center gap-2 rounded-full border border-white/15 bg-white/[0.06] px-4 py-2 text-[#F4F2ED] shadow-[0_4px_0_rgba(0,0,0,0.6)] outline-none backdrop-blur-md transition-colors hover:border-red-500/60 hover:text-white focus-visible:ring-2 focus-visible:ring-red-500"
    >
      <ArrowLeft className="h-4 w-4 transition-transform group-hover:-translate-x-1" />
      <span className="text-sm font-semibold">Back to Sponsorship Tiers</span>
    </motion.button>
  )
}

/* ------------------------------------------------------------------ */
/*  CTA — big 3D slab button (thickness drawn with shadows so it is     */
/*  always clickable)                                                   */
/* ------------------------------------------------------------------ */
const CTAButton = ({ href, children }) => {
  const reduce = useReducedMotion()
  const [hover, setHover] = useState(false)

  return (
    <motion.a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
      onFocus={() => setHover(true)}
      onBlur={() => setHover(false)}
      animate={{ y: hover ? -3 : 0 }}
      whileTap={{ y: 5 }}
      transition={SPRING}
      className="group relative inline-flex items-center justify-center gap-3 overflow-hidden rounded-2xl px-8 py-4 text-base font-black text-white outline-none ring-1 ring-inset ring-white/25 focus-visible:ring-2 focus-visible:ring-red-300 sm:px-12 sm:py-5 sm:text-lg"
      style={{
        background: `linear-gradient(135deg, ${RED_LIGHT}, ${RED} 45%, ${RED_DARK})`,
        boxShadow: hover
          ? `0 9px 0 #5a1010, 0 10px 0 #3f0b0b, 0 30px 50px -14px ${RED}cc`
          : `0 7px 0 #5a1010, 0 8px 0 #3f0b0b, 0 20px 40px -16px ${RED}99`,
        textShadow: '0 2px 6px rgba(0,0,0,0.35)',
      }}
    >
      <span aria-hidden="true" className="pointer-events-none absolute inset-x-3 top-0 h-1/2 rounded-t-2xl bg-linear-to-b from-white/25 to-transparent" />
      {!reduce && (
        <span
          aria-hidden="true"
          className="pointer-events-none absolute inset-y-0 -left-1/2 w-1/3 -skew-x-12 bg-linear-to-r from-transparent via-white/40 to-transparent transition-transform duration-700 ease-out group-hover:translate-x-[450%]"
        />
      )}
      <span className="relative">{children}</span>
      <motion.span className="relative" animate={{ x: hover ? 5 : 0 }} transition={SPRING}>
        <ArrowRight className="h-6 w-6" />
      </motion.span>
    </motion.a>
  )
}

/* ------------------------------------------------------------------ */
/*  PAGE                                                               */
/* ------------------------------------------------------------------ */
export default function TitleSponsor() {
  const s = SPONSORS[0]
  const tilt = useTilt({ max: 5 })

  const cards = [
    { label: 'Package Includes', badgeIcon: Sparkles, title: 'What You Get', icon: Star, items: s.details.whatYouGet },
    { label: 'Key Benefits', badgeIcon: Trophy, title: 'Why It Matters', icon: Crown, items: s.details.why },
  ]

  return (
    <div className="relative min-h-screen overflow-x-clip text-white">
      <ParallaxBackground image={backgroundImage} />

      <div className="relative z-10">
        {/* Back — sits below the fixed navbar */}
        <div className="mx-auto max-w-6xl px-4 pt-28 sm:px-6">
          <BackButton />
        </div>

        {/* HERO — headline + naming-rights board */}
        <section className="py-12 md:py-16" onMouseMove={tilt.onMouseMove} onMouseLeave={tilt.reset}>
          <div className="mx-auto grid max-w-6xl items-center gap-14 px-6 lg:grid-cols-[1.15fr_1fr]">
            <div style={{ perspective: 1200 }}>
              <motion.div
                style={{ rotateX: tilt.rotateX, rotateY: tilt.rotateY, transformStyle: 'preserve-3d' }}
                className="relative text-center lg:text-left"
              >
                <span
                  aria-hidden="true"
                  className="pointer-events-none absolute -top-16 left-1/2 text-white/[0.05] lg:left-0"
                  style={{ transform: 'translateX(-50%) translateZ(-140px)' }}
                >
                  <Trophy strokeWidth={0.6} className="h-72 w-72 sm:h-96 sm:w-96" />
                </span>

                <motion.div
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.7, ease: EASE_OUT }}
                  className="mb-8 inline-flex items-center gap-2 rounded-full border border-red-500/30 bg-red-950/40 px-5 py-2 shadow-[0_4px_0_rgba(0,0,0,0.5),0_12px_30px_-10px_rgba(220,38,38,0.5)] backdrop-blur-sm"
                  style={{ transform: 'translateZ(40px)' }}
                >
                  <Crown className="h-4 w-4 text-yellow-300" />
                  <span className="text-[11px] font-black uppercase tracking-[0.25em] text-slate-100">Premium Sponsorship Package</span>
                </motion.div>

                <h1
                  className="font-serif text-5xl font-black leading-[1.02] tracking-tight sm:text-6xl md:text-7xl"
                  style={{ transform: 'translateZ(70px)', transformStyle: 'preserve-3d' }}
                >
                  <span className="sr-only">{s.title} Sponsor</span>
                  <Letters3D text="Title" color="#ffffff" extrude={EXTRUDE_WHITE} />{' '}
                  <Letters3D text="Sponsor" color={RED} extrude={EXTRUDE_RED} delay={0.25} />
                </h1>

                <motion.div
                  initial={{ scaleX: 0 }}
                  animate={{ scaleX: 1 }}
                  transition={{ duration: 0.8, delay: 0.6, ease: EASE_OUT }}
                  className="mx-auto my-6 h-1 w-20 origin-center rounded-full lg:mx-0 lg:origin-left"
                  style={{ background: `linear-gradient(90deg, ${RED_DARK}, ${RED}, ${RED_LIGHT})`, boxShadow: `0 0 16px ${RED}` }}
                />

                <motion.p
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.8, duration: 0.7 }}
                  className="mx-auto max-w-xl text-base font-medium leading-relaxed text-slate-300 sm:text-lg lg:mx-0"
                  style={{ transform: 'translateZ(30px)' }}
                >
                  {s.details.overview}
                </motion.p>
              </motion.div>
            </div>

            <NamingBoard />
          </div>
        </section>

        {/* DETAILS */}
        <section className="pb-12">
          <div className="mx-auto grid max-w-6xl gap-10 px-6 md:grid-cols-2">
            {cards.map((card, ci) => {
              const Badge = card.badgeIcon
              return (
                <motion.div
                  key={card.title}
                  initial={{ opacity: 0, y: 40, rotateY: ci === 0 ? 25 : -25 }}
                  whileInView={{ opacity: 1, y: 0, rotateY: 0 }}
                  viewport={{ once: true, margin: '-60px' }}
                  transition={{ duration: 0.9, delay: ci * 0.12, ease: EASE_OUT }}
                  style={{ transformPerspective: 1200 }}
                  className="h-full"
                >
                  <TiltCard className="h-full" innerClassName="p-8 sm:p-10">
                    <span
                      aria-hidden="true"
                      className="pointer-events-none absolute -bottom-2 right-0 select-none font-serif text-7xl font-black leading-none"
                      style={{ color: '#151820', textShadow: '0 1px 0 #2a0909, 0 2px 0 #220707, 0 3px 0 #1a0505, 0 4px 0 #120404' }}
                    >
                      0{ci + 1}
                    </span>

                    <div className="relative">
                      <div className="mb-6 inline-flex items-center gap-1.5 rounded-full bg-linear-to-r from-red-600 to-red-800 px-4 py-2 text-white shadow-[0_3px_0_#450a0a]">
                        <Badge className="h-4 w-4" />
                        <span className="text-xs font-bold uppercase tracking-wide">{card.label}</span>
                      </div>

                      <div className="mb-8 flex items-center gap-4" style={{ transformStyle: 'preserve-3d' }}>
                        <IconTile icon={card.icon} size={48} />
                        <h3 className="font-serif text-2xl font-black text-white sm:text-3xl" style={{ textShadow: EXTRUDE_WHITE }}>
                          {card.title}
                        </h3>
                      </div>

                      <ul className="space-y-5">
                        {card.items.map((item, i) => (
                          <motion.li
                            key={item}
                            initial={{ opacity: 0, x: -16 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: 0.3 + i * 0.08, duration: 0.5, ease: EASE_OUT }}
                            className="flex items-start gap-4 text-slate-300"
                          >
                            <CheckCircle className="mt-0.5 h-5 w-5 shrink-0 text-red-500" strokeWidth={2.4} />
                            <span className="text-sm font-medium leading-relaxed sm:text-base">{item}</span>
                          </motion.li>
                        ))}
                      </ul>
                    </div>
                  </TiltCard>
                </motion.div>
              )
            })}
          </div>
        </section>

        {/* CTA */}
        <section className="px-6 pb-28 pt-8">
          <motion.div
            initial={{ opacity: 0, y: 30, rotateX: -30 }}
            whileInView={{ opacity: 1, y: 0, rotateX: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, ease: EASE_OUT }}
            style={{ transformPerspective: 1000, transformOrigin: '50% 100%' }}
            className="flex flex-col items-center text-center"
          >
            <span className="mb-6 text-xs font-bold uppercase tracking-[0.3em] text-white/40">Ready to put your name on the league?</span>
            <CTAButton href={FORM_URL}>{s.details.ctaText}</CTAButton>
            <span className="mt-5 text-xs text-white/35">Opens our sponsorship form in a new tab</span>
          </motion.div>
        </section>
      </div>
    </div>
  )
}