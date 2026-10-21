import React, { useEffect, useRef, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import {
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
  CheckCircle2,
  Zap,
  ArrowRight,
  ArrowLeft,
  Trophy,
  Activity,
  Target,
  CircleDot,
  Star,
  Dumbbell,
  Flag,
} from 'lucide-react'
import backgroundImage from '../assets/Hero/Backimage.png'

import Marathon from '../assets/Annual/Run.png'
import Football from '../assets/Annual/football.png'
import Badminton from '../assets/Annual/doublebadmention.png'
import Cricket from '../assets/Annual/cricket.png'
import Table from '../assets/Annual/Tabletennis.png'
import Yoga from '../assets/Annual/yoga.png'
import Volleyball from '../assets/Annual/volleyball.png'
import Chess from '../assets/Annual/chess.png'
import Fitness from '../assets/Annual/bootcamp.png'
import Relay from '../assets/Annual/relayrun.png'
import Olympics from '../assets/Annual/Olympics.png'
import Finale from '../assets/Annual/allstar.png'

/* ------------------------------------------------------------------ */
/*  DESIGN TOKENS — same red system as the rest of the site            */
/* ------------------------------------------------------------------ */
const RED_LIGHT = '#F87171'
const RED = '#DC2626'
const RED_DARK = '#7F1D1D'
const ONYX = '#0B0C0E'
const DISPLAY = '"Anton", Impact, "Arial Narrow Bold", sans-serif'

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
const plans = [
  { no: '01', month: 'Jan', title: 'Corporate Marathon', image: Marathon },
  { no: '02', month: 'Feb', title: 'Football League', image: Football },
  { no: '03', month: 'Mar', title: 'Badminton Doubles', image: Badminton },
  { no: '04', month: 'Apr', title: 'Cricket 6s', image: Cricket },
  { no: '05', month: 'May', title: 'Table Tennis Challenge', image: Table },
  { no: '06', month: 'Jun', title: 'Yoga & Wellness Day', image: Yoga },
  { no: '07', month: 'Jul', title: 'Volleyball / Throwball', image: Volleyball },
  { no: '08', month: 'Aug', title: 'Mini Olympics', image: Olympics },
  { no: '09', month: 'Sep', title: 'Indoor Games Challenge', image: Chess },
  { no: '10', month: 'Oct', title: 'Fitness Bootcamp', image: Fitness },
  { no: '11', month: 'Nov', title: 'Relay Run', image: Relay },
  { no: '12', month: 'Dec', title: 'All-Star Grand Finale', image: Finale },
]

const details = [
  {
    id: 1,
    label: 'The Kit',
    title: 'Included in the Package',
    icon: CheckCircle2,
    items: [
      'Venue, sports kits & professional umpires',
      'Drone videography & monthly highlight reels',
      'Certificates, medals & recognition',
      'Event coverage on HAKIRUSH social media',
      'Leaderboard & engagement dashboard',
    ],
  },
  {
    id: 2,
    label: 'The Payoff',
    title: 'Key Benefits',
    icon: Zap,
    items: [
      '12 months of seamless employee engagement',
      'Morale and fitness boost across teams',
      'Stronger communication and team synergy',
      'Zero headaches for HR — we manage everything',
      'Brand exposure & positive workplace culture',
    ],
  },
]

const tickerIcons = [Trophy, Activity, Target, CircleDot, Star, Dumbbell, Flag]

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

  return { rotateX, rotateY, gx, gy, onMouseMove, reset }
}

/* ------------------------------------------------------------------ */
/*  BACKGROUNDS                                                        */
/* ------------------------------------------------------------------ */
const ScoreboardBackground = () => {
  const reduce = useReducedMotion()
  return (
    <div aria-hidden="true" className="pointer-events-none fixed inset-0 -z-20 overflow-hidden" style={{ background: ONYX }}>
      <div className="absolute -left-[10%] -top-[15%] h-[55%] w-[55%] rounded-full blur-[140px]" style={{ background: `${RED}1f` }} />
      <div className="absolute -bottom-[15%] -right-[10%] h-[45%] w-[45%] rounded-full blur-[140px]" style={{ background: `${RED_DARK}26` }} />
      <div
        className="absolute inset-0 opacity-[0.05]"
        style={{
          backgroundImage: 'linear-gradient(#F4F2ED 1px, transparent 1px), linear-gradient(90deg, #F4F2ED 1px, transparent 1px)',
          backgroundSize: '64px 64px',
        }}
      />
      <div className="absolute top-[8%] flex w-full overflow-hidden opacity-[0.05]">
        <motion.div
          initial={{ x: 0 }}
          animate={reduce ? undefined : { x: '-50%' }}
          transition={{ duration: 55, repeat: Infinity, ease: 'linear' }}
          className="flex flex-nowrap gap-28 whitespace-nowrap pr-28"
        >
          {[...tickerIcons, ...tickerIcons, ...tickerIcons].map((Icon, i) => (
            <Icon key={i} size={64} className="text-[#F4F2ED]" strokeWidth={1} />
          ))}
        </motion.div>
      </div>
    </div>
  )
}

const ParallaxBackground = ({ image }) => {
  const reduce = useReducedMotion()
  const mouseX = useMotionValue(0)
  const mouseY = useMotionValue(0)
  const cfg = { damping: 30, stiffness: 80, mass: 0.6 }
  const sx = useSpring(mouseX, cfg)
  const sy = useSpring(mouseY, cfg)

  const x = useTransform(sx, [-1, 1], [-24, 24])
  const my = useTransform(sy, [-1, 1], [-16, 16])
  const scale = useTransform(sx, [-1, 1], [1.06, 1.1])
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
    <div
      aria-hidden="true"
      className="pointer-events-none fixed left-0 -z-10 w-full overflow-hidden"
      style={{ top: '-10vh', height: '125vh' }}
    >
      <motion.img
        src={image}
        alt=""
        style={{ x, y, scale }}
        className="h-full w-full object-cover object-center grayscale-[25%] will-change-transform"
      />
      <div className="absolute inset-0 bg-linear-to-b from-[#0B0C0E]/60 via-[#0B0C0E]/75 to-[#0B0C0E]" />
    </div>
  )
}

/* ------------------------------------------------------------------ */
/*  3D BUILDING BLOCKS                                                 */
/* ------------------------------------------------------------------ */

// Letters flip up one by one and hop on hover; words never split
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
                  transition={{ delay: delay + i * 0.035, duration: 0.7, ease: EASE_OUT }}
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

// Extruded red icon tile — spins on group hover
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

// Dark slab card that tilts toward the cursor
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
      animate={{ y: hover ? -6 : 0 }}
      transition={SPRING}
      className={`group relative rounded-3xl ${className}`}
    >
      <span
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 rounded-3xl bg-black/70"
        style={{ transform: 'translateZ(-16px) translateY(8px)' }}
      />
      <span
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 rounded-3xl border border-white/10 shadow-[0_30px_60px_-25px_rgba(0,0,0,0.9)]"
        style={{ background: 'linear-gradient(160deg, #171a22, #0f1116 60%, #0b0c0e)' }}
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
/*  FIXTURE TRACK — 12 match tickets in a scroll-driven 3D cover-flow   */
/* ------------------------------------------------------------------ */
const TICKET_DEPTH = 5

const Ticket = ({ item, active, shade }) => (
  <span className="relative block h-full w-full" style={{ transformStyle: 'preserve-3d' }}>
    {/* thickness */}
    {Array.from({ length: TICKET_DEPTH }).map((_, i) => (
      <span
        key={i}
        aria-hidden="true"
        className="absolute inset-0 rounded-2xl"
        style={{ transform: `translateZ(${-(i + 1) * 2}px)`, background: i % 2 ? '#181b22' : '#0d0f13' }}
      />
    ))}

    {/* face */}
    <span
      className="absolute inset-0 flex flex-col overflow-hidden rounded-2xl border text-left transition-[border-color,box-shadow] duration-500 [backface-visibility:hidden]"
      style={{
        background: 'linear-gradient(180deg, #171a22, #0d0f14)',
        borderColor: active ? `${RED}cc` : 'rgba(255,255,255,0.1)',
        boxShadow: active ? `0 30px 60px -18px ${RED}99` : '0 20px 40px -20px rgba(0,0,0,0.9)',
      }}
    >
      {/* giant squad number */}
      <span
        aria-hidden="true"
        className="pointer-events-none absolute -left-1 -top-5 select-none leading-none text-white/[0.07]"
        style={{ fontFamily: DISPLAY, fontSize: '7.5rem' }}
      >
        {item.no}
      </span>

      {/* photo window */}
      <span className="relative mx-3 mt-3 block h-[52%] overflow-hidden rounded-xl">
        <img
          src={item.image}
          alt=""
          draggable="false"
          className={`absolute inset-0 h-full w-full object-cover transition-transform duration-700 ${active ? 'scale-110' : 'scale-100'}`}
        />
        <span className="absolute inset-0 bg-linear-to-t from-[#14161A]/60 via-transparent to-transparent" />
        {active && (
          <span className="absolute left-2 top-2 rounded-full bg-red-600 px-2 py-0.5 text-[8px] font-black uppercase tracking-[0.2em] text-white shadow-[0_3px_0_#7f1d1d]">
            On deck
          </span>
        )}
      </span>

      {/* torn stub with side notches */}
      <span className="relative flex items-center px-3 py-2">
        <span aria-hidden="true" className="absolute -left-2 h-4 w-4 rounded-full" style={{ background: ONYX }} />
        <span aria-hidden="true" className="absolute -right-2 h-4 w-4 rounded-full" style={{ background: ONYX }} />
        <span className="flex-1 border-t border-dashed border-white/15" />
        <span className="mx-3 text-[11px] font-bold uppercase tracking-[0.25em] text-red-400">{item.month}</span>
        <span className="flex-1 border-t border-dashed border-white/15" />
      </span>

      <span className="relative block px-4 pb-4">
        <span
          className="block leading-[1.05] text-[#F4F2ED]"
          style={{ fontFamily: DISPLAY, fontSize: 'clamp(1.05rem, 2.4vw, 1.45rem)', letterSpacing: '0.01em' }}
        >
          {item.title}
        </span>
        <span
          className="mt-2.5 block h-[3px] rounded-full bg-red-600 transition-all duration-500"
          style={{ width: active ? 56 : 28, boxShadow: active ? `0 0 12px ${RED}` : 'none' }}
        />
      </span>

      {/* darkens tickets as they turn away */}
      <motion.span aria-hidden="true" className="pointer-events-none absolute inset-0 bg-black" style={{ opacity: shade }} />
    </span>
  </span>
)

function useCardSize() {
  const get = () =>
    typeof window !== 'undefined' && window.innerWidth < 640 ? { w: 180, h: 264 } : { w: 240, h: 330 }
  const [size, setSize] = useState(get)
  useEffect(() => {
    const onResize = () => setSize(get())
    window.addEventListener('resize', onResize)
    return () => window.removeEventListener('resize', onResize)
  }, [])
  return size
}

// One ticket on the cover-flow track. `pos` is the fractional index sitting in the centre.
const TrackCard = ({ item, index, pos, w, h, active, onSelect }) => {
  const reduce = useReducedMotion()
  const d = useTransform(pos, (p) => index - p) // distance from centre, in cards
  const spacing = w * 0.62

  const x = useTransform(d, (v) => {
    const s = Math.sign(v)
    const a = Math.abs(v)
    // centre card gets breathing room, the rest stack tighter
    return s * (a < 1 ? a * spacing * 1.15 : spacing * 1.15 + (a - 1) * spacing * 0.55)
  })
  const rotateY = useTransform(d, (v) => (reduce ? 0 : -Math.max(-1, Math.min(1, v)) * 58))
  const z = useTransform(d, (v) => -Math.min(Math.abs(v), 4) * 120)
  const zIndex = useTransform(d, (v) => 100 - Math.round(Math.abs(v) * 10))
  const opacity = useTransform(d, (v) => 1 - Math.max(0, Math.min(1, Math.abs(v) - 3.2)))
  const shade = useTransform(d, (v) => Math.min(Math.abs(v) * 0.22, 0.7))

  return (
    <motion.button
      type="button"
      tabIndex={-1}
      onClick={onSelect}
      className="absolute left-1/2 top-1/2 cursor-pointer outline-none"
      style={{ width: w, height: h, marginLeft: -w / 2, marginTop: -h / 2, x, z, rotateY, zIndex, opacity, transformStyle: 'preserve-3d' }}
    >
      <Ticket item={item} active={active} shade={shade} />
    </motion.button>
  )
}

const SeasonTrack = () => {
  const ref = useRef(null)
  const { w, h } = useCardSize()
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start start', 'end end'] })
  const progress = useSpring(scrollYProgress, { stiffness: 140, damping: 28, mass: 0.4 })
  const pos = useTransform(progress, [0, 1], [0, plans.length - 1])
  const [active, setActive] = useState(0)

  useMotionValueEvent(pos, 'change', (v) => {
    const i = Math.max(0, Math.min(plans.length - 1, Math.round(v)))
    setActive((prev) => (prev === i ? prev : i))
  })

  // scroll the page so fixture i sits in the centre
  const goTo = (i) => {
    const el = ref.current
    if (!el) return
    const top = el.getBoundingClientRect().top + window.scrollY
    const run = el.offsetHeight - window.innerHeight
    window.scrollTo({ top: top + (run * i) / (plans.length - 1) + 1, behavior: 'smooth' })
  }

  return (
    <div ref={ref} className="relative" style={{ height: `${plans.length * 55 + 100}vh` }}>
      {/* screen-reader version of the full fixture list */}
      <ol className="sr-only">
        {plans.map((p) => (
          <li key={p.month}>
            {p.month}: {p.title}
          </li>
        ))}
      </ol>

      <div className="sticky top-0 flex h-screen flex-col justify-center overflow-hidden px-4 pt-16 sm:px-6">
        {/* header row */}
        <div className="mx-auto mb-2 flex w-full max-w-7xl flex-wrap items-end justify-between gap-4">
          <div>
            <h2
              style={{ fontFamily: DISPLAY, fontSize: '1.85rem', textShadow: EXTRUDE_WHITE }}
              className="text-[#F4F2ED]"
            >
              THE FIXTURE LIST
            </h2>
            <span className="text-sm font-medium text-white/40">12 events · every month covered · scroll to play the season</span>
          </div>
          <div
            aria-live="polite"
            className="leading-none"
            style={{ fontFamily: DISPLAY, fontSize: 'clamp(2.5rem, 6vw, 4rem)' }}
          >
            <span className="text-white" style={{ textShadow: EXTRUDE_RED }}>{plans[active].no}</span>
            <span className="text-white/25"> / 12</span>
          </div>
        </div>

        {/* season progress — 12 clickable month segments */}
        <div className="mx-auto mb-4 w-full max-w-7xl">
          <div className="grid grid-cols-12 gap-1">
            {plans.map((p, i) => {
              const done = i <= active
              return (
                <button
                  key={p.month}
                  type="button"
                  onClick={() => goTo(i)}
                  aria-label={`${p.month}: ${p.title}`}
                  aria-pressed={active === i}
                  className="group flex flex-col items-center gap-1.5 outline-none focus-visible:ring-2 focus-visible:ring-red-500"
                >
                  <span
                    className="block h-1.5 w-full rounded-full transition-all duration-300"
                    style={{
                      background: done ? `linear-gradient(90deg, ${RED_DARK}, ${RED})` : 'rgba(255,255,255,0.08)',
                      boxShadow: active === i ? `0 0 12px ${RED}` : 'none',
                    }}
                  />
                  <span
                    className={`text-[8px] font-black uppercase tracking-[0.15em] transition-colors sm:text-[10px] ${
                      active === i ? 'text-red-400' : 'text-white/30 group-hover:text-white/70'
                    }`}
                  >
                    {p.month}
                  </span>
                </button>
              )
            })}
          </div>
        </div>

        {/* cover-flow stage */}
        <div className="relative mx-auto w-full" style={{ height: h + 80, perspective: 1200 }}>
          <div
            className="pointer-events-none absolute bottom-2 left-1/2 h-10 w-[60%] -translate-x-1/2 rounded-[100%] blur-2xl"
            style={{ background: `${RED}40` }}
          />
          <div className="absolute inset-0" style={{ transformStyle: 'preserve-3d' }}>
            {plans.map((item, i) => (
              <TrackCard
                key={item.month}
                item={item}
                index={i}
                pos={pos}
                w={w}
                h={h}
                active={active === i}
                onSelect={() => goTo(i)}
              />
            ))}
          </div>
        </div>

        <p className="mt-1 text-center text-sm font-semibold text-white/60">
          <span className="font-bold text-red-400">{plans[active].month}</span> — {plans[active].title}
        </p>
      </div>
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
    else navigate('/services')
  }

  return (
    <motion.button
      type="button"
      onClick={goBack}
      initial={{ opacity: 0, x: -10 }}
      animate={{ opacity: 1, x: 0 }}
      whileHover={{ y: -2 }}
      whileTap={{ y: 2 }}
      className="group flex cursor-pointer items-center gap-2 rounded-full border border-white/15 bg-white/[0.06] px-4 py-2 text-[#F4F2ED] shadow-[0_4px_0_rgba(0,0,0,0.6)] outline-none backdrop-blur-md transition-colors hover:border-red-500/60 hover:text-white focus-visible:ring-2 focus-visible:ring-red-500"
    >
      <ArrowLeft className="h-4 w-4 transition-transform group-hover:-translate-x-1" />
      <span className="text-sm font-semibold">Back to Services</span>
    </motion.button>
  )
}

/* ------------------------------------------------------------------ */
/*  CTA — big 3D slab button                                           */
/* ------------------------------------------------------------------ */
const CTAButton3D = () => {
  const tilt = useTilt({ max: 16 })
  const [hover, setHover] = useState(false)
  const glare = useMotionTemplate`radial-gradient(circle at ${tilt.gx}% ${tilt.gy}%, rgba(255,255,255,0.55), transparent 55%)`

  return (
    <Link to="/contact" className="inline-block rounded-2xl outline-none focus-visible:ring-2 focus-visible:ring-red-400">
      <motion.span
        onMouseMove={tilt.onMouseMove}
        onMouseEnter={() => setHover(true)}
        onMouseLeave={() => {
          tilt.reset()
          setHover(false)
        }}
        whileTap={{ scale: 0.95 }}
        style={{ rotateX: tilt.rotateX, rotateY: tilt.rotateY, transformPerspective: 700, transformStyle: 'preserve-3d' }}
        className="relative block select-none"
      >
        {Array.from({ length: 9 }).map((_, i) => (
          <span
            key={i}
            aria-hidden="true"
            className="absolute inset-0 rounded-2xl bg-red-900"
            style={{ transform: `translateZ(${-(i + 1) * 2}px)`, filter: `brightness(${0.95 - i * 0.08})` }}
          />
        ))}
        <span
          aria-hidden="true"
          className="absolute inset-0 rounded-2xl ring-1 ring-inset ring-white/25"
          style={{ background: `linear-gradient(135deg, ${RED_LIGHT}, ${RED} 45%, ${RED_DARK})` }}
        />
        <motion.span
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 rounded-2xl"
          style={{ background: glare, z: 1 }}
          animate={{ opacity: hover ? 1 : 0 }}
        />
        <motion.span
          aria-hidden="true"
          className="pointer-events-none absolute inset-x-3 top-0 h-1/2 rounded-t-2xl bg-linear-to-b from-white/30 to-transparent"
          style={{ z: 1 }}
        />
        <motion.span
          aria-hidden="true"
          className="pointer-events-none absolute -bottom-5 left-8 right-8 h-5 rounded-full bg-red-600/60 blur-xl"
          style={{ z: -30 }}
          animate={{ opacity: hover ? 1 : 0.55, scaleX: hover ? 1.12 : 1 }}
        />
        <span
          className="relative flex items-center gap-3 px-7 py-5 text-base text-white sm:px-10 sm:text-lg"
          style={{ fontFamily: DISPLAY, letterSpacing: '0.03em', transform: 'translateZ(20px)', textShadow: '0 2px 6px rgba(0,0,0,0.35)' }}
        >
          SUBSCRIBE TO ANNUAL PACKAGE
          <motion.span animate={{ x: hover ? 5 : 0 }} transition={SPRING}>
            <ArrowRight className="h-5 w-5" />
          </motion.span>
        </span>
      </motion.span>
    </Link>
  )
}

/* ------------------------------------------------------------------ */
/*  PAGE                                                               */
/* ------------------------------------------------------------------ */
const Annualplan = () => {
  const tilt = useTilt({ max: 6 })

  return (
    <div className="relative min-h-screen overflow-x-clip text-white" style={{ fontFamily: '"Manrope", sans-serif' }}>
      <ScoreboardBackground />
      <ParallaxBackground image={backgroundImage} />

      <div className="relative z-10 w-full">
        {/* Back — sits below the fixed navbar */}
        <div className="mx-auto max-w-7xl px-4 pt-28 sm:px-6">
          <BackButton />
        </div>

        {/* HERO */}
        <section className="px-4 pb-16 pt-12 sm:px-6" onMouseMove={tilt.onMouseMove} onMouseLeave={tilt.reset}>
          <div className="mx-auto max-w-4xl text-center" style={{ perspective: 1200 }}>
            <motion.div
              style={{ rotateX: tilt.rotateX, rotateY: tilt.rotateY, transformStyle: 'preserve-3d' }}
              className="relative"
            >
              <span
                aria-hidden="true"
                className="pointer-events-none absolute left-1/2 -top-16 select-none leading-none sm:-top-24"
                style={{
                  fontFamily: DISPLAY,
                  fontSize: 'clamp(10rem, 30vw, 20rem)',
                  transform: 'translateX(-50%) translateZ(-150px)',
                  color: 'transparent',
                  WebkitTextStroke: '2px rgba(255,255,255,0.07)',
                  textShadow: '0 0 60px rgba(220,38,38,0.15)',
                }}
              >
                12
              </span>

              <motion.div
                initial={{ opacity: 0, y: -8 }}
                animate={{ opacity: 1, y: 0 }}
                className="mb-7 inline-flex items-center gap-2 rounded-full border border-red-500/40 bg-red-950/40 px-4 py-1.5 shadow-[0_4px_0_rgba(0,0,0,0.5),0_12px_30px_-10px_rgba(220,38,38,0.5)] backdrop-blur-sm"
                style={{ transform: 'translateZ(40px)' }}
              >
                <span className="relative flex h-2 w-2">
                  <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-red-500 opacity-75" />
                  <span className="relative inline-flex h-2 w-2 rounded-full bg-red-500" />
                </span>
                <span className="text-[10px] font-bold uppercase tracking-[0.25em] text-red-200">2026 Season Pass</span>
              </motion.div>

              <h1
                className="text-5xl leading-[1.02] sm:text-6xl md:text-7xl"
                style={{ fontFamily: DISPLAY, letterSpacing: '0.01em', transform: 'translateZ(70px)', transformStyle: 'preserve-3d' }}
              >
                <span className="sr-only">12 Months 12 Fixtures. One Team.</span>
                <Letters3D text="12 MONTHS 12 FIXTURES." color="#F4F2ED" extrude={EXTRUDE_WHITE} />
                <br />
                <Letters3D text="ONE TEAM." color={RED} extrude={EXTRUDE_RED} delay={0.7} />
              </h1>

              <motion.p
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 1.1, duration: 0.7 }}
                className="mx-auto mt-8 max-w-xl text-lg leading-relaxed text-white/65"
                style={{ transform: 'translateZ(30px)' }}
              >
                A year-long fixture list built for organizations that treat team connection like training —{' '}
                <span className="font-bold text-red-500">consistent</span>, not occasional.
              </motion.p>
            </motion.div>
          </div>
        </section>

        {/* FIXTURE TRACK — pinned while you scroll through the season */}
        <section className="pb-24">
          <SeasonTrack />
        </section>

        {/* DETAILS */}
        <section className="px-4 pb-24 sm:px-6">
          <div className="mx-auto grid max-w-7xl gap-8 md:grid-cols-2">
            {details.map((card, ci) => (
              <motion.div
                key={card.id}
                initial={{ opacity: 0, y: 40, rotateY: ci === 0 ? 25 : -25 }}
                whileInView={{ opacity: 1, y: 0, rotateY: 0 }}
                viewport={{ once: true, margin: '-60px' }}
                transition={{ duration: 0.9, delay: ci * 0.12, ease: EASE_OUT }}
                style={{ transformPerspective: 1200 }}
                className="h-full"
              >
                <TiltCard className="h-full" innerClassName="p-8 md:p-10">
                  <span
                    aria-hidden="true"
                    className="pointer-events-none absolute -bottom-8 -right-2 select-none leading-none"
                    style={{
                      fontFamily: DISPLAY,
                      fontSize: '9rem',
                      color: '#15171d',
                      textShadow: '0 1px 0 #2a0909, 0 2px 0 #220707, 0 3px 0 #1a0505, 0 4px 0 #120404',
                    }}
                  >
                    0{card.id}
                  </span>

                  <div className="relative">
                    <span className="text-[11px] font-bold uppercase tracking-[0.3em] text-red-400">{card.label}</span>
                    <div className="mb-8 mt-4 flex items-center gap-4" style={{ transformStyle: 'preserve-3d' }}>
                      <IconTile icon={card.icon} size={48} />
                      <h3 className="text-[#F4F2ED]" style={{ fontFamily: DISPLAY, fontSize: '1.6rem', textShadow: EXTRUDE_WHITE }}>
                        {card.title}
                      </h3>
                    </div>
                    <ul className="space-y-4">
                      {card.items.map((text, i) => (
                        <motion.li
                          key={text}
                          initial={{ opacity: 0, x: -16 }}
                          whileInView={{ opacity: 1, x: 0 }}
                          viewport={{ once: true }}
                          transition={{ delay: 0.3 + i * 0.08, duration: 0.5, ease: EASE_OUT }}
                          className="flex items-start gap-3 text-white/70"
                        >
                          <CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0 text-red-500" strokeWidth={2.4} />
                          <span className="text-[15px] leading-relaxed">{text}</span>
                        </motion.li>
                      ))}
                    </ul>
                  </div>
                </TiltCard>
              </motion.div>
            ))}
          </div>

          {/* CTA */}
          <motion.div
            initial={{ opacity: 0, y: 30, rotateX: -30 }}
            whileInView={{ opacity: 1, y: 0, rotateX: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, ease: EASE_OUT }}
            style={{ transformPerspective: 1000, transformOrigin: '50% 100%' }}
            className="mt-20 flex flex-col items-center text-center"
          >
            <span className="mb-6 text-xs font-bold uppercase tracking-[0.3em] text-white/40">Ready to draft your season?</span>
            <CTAButton3D />
          </motion.div>
        </section>
      </div>
    </div>
  )
}

export default Annualplan