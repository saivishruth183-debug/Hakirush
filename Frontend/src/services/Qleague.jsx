import React, { useEffect, useRef, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import {
  animate,
  motion,
  useInView,
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
  Trophy,
  ArrowRight,
  ArrowLeft,
  ChevronLeft,
  ChevronRight,
  Activity,
  Target,
  CircleDot,
  Star,
  Dumbbell,
  Flag,
} from 'lucide-react'
import backgroundImage from '../assets/Hero/Backimage.png'

import Cricket from '../assets/Q-League/Cricket.png'
import Badminton from '../assets/Q-League/Badminton.png'
import Football from '../assets/Q-League/Football.png'
import Multi from '../assets/Q-League/multilevel.png'

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
const CUBE_SPRING = { type: 'spring', stiffness: 60, damping: 16 }
const EASE_OUT = [0.22, 1, 0.36, 1]

const EXTRUDE_WHITE =
  '0 1px 0 #3a0c0c, 0 2px 0 #320a0a, 0 3px 0 #2a0909, 0 4px 0 #220707, 0 5px 0 #1a0505, 0 6px 0 #120404, 0 18px 30px rgba(0,0,0,0.6)'
const EXTRUDE_RED =
  '0 1px 0 #7f1d1d, 0 2px 0 #6b1818, 0 3px 0 #571313, 0 4px 0 #430f0f, 0 5px 0 #2f0a0a, 0 6px 0 #1f0606, 0 18px 34px rgba(220,38,38,0.35)'

/* ------------------------------------------------------------------ */
/*  CONTENT                                                            */
/* ------------------------------------------------------------------ */
const quarters = [
  { id: 1, quarter: 'Q1', name: 'HAKIRUSH CUP', sport: 'Cricket', image: Cricket },
  { id: 2, quarter: 'Q2', name: 'SmashFest', sport: 'Badminton', image: Badminton },
  { id: 3, quarter: 'Q3', name: 'GoalRush', sport: 'Football', image: Football },
  { id: 4, quarter: 'Q4', name: 'Battle of Corporates', sport: 'Multi-Sport Festival', image: Multi },
]

const features = [
  'Full-scale tournament management',
  'Umpires, referees, and match fixtures',
  'On-ground branding & sponsor booths',
  'Photography, reels, and highlight coverage',
  'Awards, medals, and digital badges',
]

const benefits = [
  'Build inter-company connections',
  'Engage employees with competitive excitement',
  'Strengthen your brand presence',
  'Attract sponsors and PR coverage',
]

const tickerIcons = [Trophy, Activity, Target, CircleDot, Star, Dumbbell, Flag]

const STEP = 360 / quarters.length // 90° per side of the cube

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

const RoundButton = ({ onClick, label, children }) => (
  <motion.button
    type="button"
    onClick={onClick}
    aria-label={label}
    whileHover={{ y: -2 }}
    whileTap={{ y: 2, scale: 0.95 }}
    className="grid h-11 w-11 place-items-center rounded-full border border-white/15 bg-[#14161A] text-white shadow-[0_4px_0_rgba(0,0,0,0.7)] outline-none transition-colors hover:border-red-500/70 hover:text-red-400 focus-visible:ring-2 focus-visible:ring-red-500"
  >
    {children}
  </motion.button>
)

/* ------------------------------------------------------------------ */
/*  TOURNAMENT CUBE — one quarter on each side                          */
/* ------------------------------------------------------------------ */
function useCubeSize() {
  const get = () =>
    typeof window !== 'undefined' && window.innerWidth < 640 ? { w: 250, h: 330 } : { w: 310, h: 410 }
  const [size, setSize] = useState(get)
  useEffect(() => {
    const onResize = () => setSize(get())
    window.addEventListener('resize', onResize)
    return () => window.removeEventListener('resize', onResize)
  }, [])
  return size
}

const CubeFace = ({ item, index, rot, w, h, active }) => {
  const angle = index * STEP
  const shade = useTransform(rot, (r) => {
    const a = ((((angle + r) % 360) + 540) % 360) - 180
    return Math.min(Math.abs(a) / 90, 1) * 0.7
  })

  return (
    <div
      className="absolute left-1/2 top-1/2 overflow-hidden rounded-xl border [backface-visibility:hidden]"
      style={{
        width: w,
        height: h,
        marginLeft: -w / 2,
        marginTop: -h / 2,
        transform: `rotateY(${angle}deg) translateZ(${w / 2}px)`,
        background: '#14161A',
        borderColor: active ? `${RED}cc` : 'rgba(255,255,255,0.1)',
      }}
    >
      <img
        src={item.image}
        alt=""
        draggable="false"
        className={`absolute inset-0 h-full w-full object-cover opacity-85 transition-transform duration-1000 ${active ? 'scale-110' : 'scale-100'}`}
      />
      <div className="absolute inset-0 bg-linear-to-t from-[#0B0C0E] via-[#0B0C0E]/45 to-[#0B0C0E]/10" />

      <span
        aria-hidden="true"
        className="pointer-events-none absolute -right-2 -top-3 select-none leading-none text-white/[0.1]"
        style={{ fontFamily: DISPLAY, fontSize: '7.5rem' }}
      >
        {item.quarter}
      </span>

      <span
        className="absolute left-5 top-5 rounded-md bg-red-600 px-3 py-1 text-xs text-white shadow-[0_3px_0_#7f1d1d]"
        style={{ fontFamily: DISPLAY, letterSpacing: '0.05em' }}
      >
        ROUND {item.id}
      </span>

      <div className="absolute bottom-6 left-6 right-6">
        <span className="text-[11px] font-bold uppercase tracking-[0.25em] text-red-400">{item.sport}</span>
        <h3
          className="mt-2 leading-[1.05] text-white"
          style={{ fontFamily: DISPLAY, fontSize: 'clamp(1.4rem, 3vw, 1.8rem)', letterSpacing: '0.01em', textShadow: '0 2px 10px rgba(0,0,0,0.6)' }}
        >
          {item.name}
        </h3>
        <span
          className="mt-3 block h-[3px] rounded-full bg-red-600 transition-all duration-500"
          style={{ width: active ? 56 : 32, boxShadow: active ? `0 0 12px ${RED}` : 'none' }}
        />
      </div>

      <motion.span aria-hidden="true" className="pointer-events-none absolute inset-0 bg-black" style={{ opacity: shade }} />
    </div>
  )
}

const TournamentCube = () => {
  const reduce = useReducedMotion()
  const { w, h } = useCubeSize()

  const rot = useMotionValue(0)
  const [active, setActive] = useState(0)
  const [hovering, setHovering] = useState(false)
  const lastInteract = useRef(0)
  const panStart = useRef(0)
  const stageRef = useRef(null)
  const inView = useInView(stageRef, { margin: '-20% 0px' })

  const n = quarters.length
  const indexFromRot = (r) => ((Math.round(-r / STEP) % n) + n) % n

  useMotionValueEvent(rot, 'change', (v) => {
    const i = indexFromRot(v)
    setActive((prev) => (prev === i ? prev : i))
  })

  const spin = (target) => animate(rot, target, reduce ? { duration: 0 } : CUBE_SPRING)

  const goTo = (i) => {
    lastInteract.current = Date.now()
    const base = -i * STEP
    const k = Math.round((rot.get() - base) / 360)
    spin(base + k * 360)
  }

  const step = (dir, manual = true) => {
    if (manual) lastInteract.current = Date.now()
    spin(Math.round(rot.get() / STEP) * STEP - dir * STEP)
  }

  useEffect(() => {
    if (reduce || hovering || !inView) return
    const id = setInterval(() => {
      if (Date.now() - lastInteract.current > 6000) step(1, false)
    }, 3800)
    return () => clearInterval(id)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [reduce, hovering, inView])

  const current = quarters[active]

  return (
    <div className="grid items-center gap-10 lg:grid-cols-[1.1fr_1fr] lg:gap-16">
      {/* screen-reader version */}
      <ol className="sr-only">
        {quarters.map((q) => (
          <li key={q.id}>
            {q.quarter}: {q.name} — {q.sport}
          </li>
        ))}
      </ol>

      {/* ---------- the cube ---------- */}
      <motion.div
        ref={stageRef}
        aria-hidden="true"
        onMouseEnter={() => setHovering(true)}
        onMouseLeave={() => setHovering(false)}
        onPanStart={() => {
          panStart.current = rot.get()
          lastInteract.current = Date.now()
        }}
        onPan={(_, info) => rot.set(panStart.current + info.offset.x * 0.35)}
        onPanEnd={(_, info) => {
          lastInteract.current = Date.now()
          const projected = rot.get() + info.velocity.x * 0.06
          spin(Math.round(projected / STEP) * STEP)
        }}
        className="relative cursor-grab select-none active:cursor-grabbing"
        style={{ height: h + 120, perspective: 1400, touchAction: 'pan-y' }}
      >
        {/* floor glow + shadow */}
        <div
          className="pointer-events-none absolute bottom-4 left-1/2 h-12 rounded-[100%] blur-2xl"
          style={{ width: w * 1.4, marginLeft: -w * 0.7, background: `${RED}55` }}
        />
        <div
          className="absolute inset-0"
          style={{ transformStyle: 'preserve-3d', transform: `translateZ(${-w / 2}px) rotateX(-12deg) rotateY(-20deg)` }}
        >
          <motion.div className="absolute inset-0" style={{ rotateY: rot, transformStyle: 'preserve-3d' }}>
            {quarters.map((item, i) => (
              <CubeFace key={item.id} item={item} index={i} rot={rot} w={w} h={h} active={active === i} />
            ))}

            {/* top cap */}
            <div
              className="absolute left-1/2 top-1/2 rounded-sm"
              style={{
                width: w,
                height: w,
                marginLeft: -w / 2,
                marginTop: -w / 2,
                transform: `rotateX(90deg) translateZ(${h / 2}px)`,
                background: `radial-gradient(circle, ${RED}55, #1a0a0d 55%, #0d0f14)`,
                boxShadow: `inset 0 0 0 1px ${RED}66`,
              }}
            >
              <div className="grid h-full place-items-center">
                <Trophy className="h-16 w-16 text-red-500/60" strokeWidth={1.2} />
              </div>
            </div>
          </motion.div>
        </div>
      </motion.div>

      {/* ---------- details for the side facing you ---------- */}
      <div className="text-center lg:text-left">
        <div aria-live="polite">
          <p className="text-[11px] font-bold uppercase tracking-[0.3em] text-white/40">
            Round {current.id} of {quarters.length}
          </p>
          <motion.div
            key={current.id}
            initial={reduce ? false : { opacity: 0, rotateX: -60, y: 20 }}
            animate={{ opacity: 1, rotateX: 0, y: 0 }}
            transition={{ duration: 0.6, ease: EASE_OUT }}
            style={{ transformPerspective: 800, transformOrigin: '50% 100%' }}
          >
            <p
              className="mt-2 leading-none text-red-600"
              style={{ fontFamily: DISPLAY, fontSize: 'clamp(4rem, 10vw, 7rem)', textShadow: EXTRUDE_RED }}
            >
              {current.quarter}
            </p>
            <h3
              className="mt-3 text-[#F4F2ED]"
              style={{ fontFamily: DISPLAY, fontSize: 'clamp(1.8rem, 4vw, 2.6rem)', lineHeight: 1.05, textShadow: EXTRUDE_WHITE }}
            >
              {current.name}
            </h3>
            <p className="mt-2 text-sm font-bold uppercase tracking-[0.25em] text-red-400">{current.sport}</p>
          </motion.div>
        </div>

        {/* quarter selector */}
        <div className="mt-8 flex items-center justify-center gap-3 lg:justify-start">
          <RoundButton onClick={() => step(-1)} label="Previous quarter">
            <ChevronLeft className="h-5 w-5" />
          </RoundButton>
          <div className="flex gap-2">
            {quarters.map((q, i) => {
              const on = active === i
              return (
                <button
                  key={q.id}
                  type="button"
                  onClick={() => goTo(i)}
                  aria-pressed={on}
                  aria-label={`${q.quarter}: ${q.name}`}
                  className={`rounded-xl px-4 py-2.5 text-sm outline-none transition-all duration-300 focus-visible:ring-2 focus-visible:ring-red-500 ${
                    on
                      ? '-translate-y-0.5 bg-red-600 text-white shadow-[0_5px_0_#7f1d1d,0_12px_24px_-6px_rgba(220,38,38,0.8)]'
                      : 'bg-white/[0.05] text-white/50 shadow-[0_5px_0_rgba(0,0,0,0.6)] hover:-translate-y-0.5 hover:bg-white/[0.09] hover:text-white'
                  }`}
                  style={{ fontFamily: DISPLAY, letterSpacing: '0.05em' }}
                >
                  {q.quarter}
                </button>
              )
            })}
          </div>
          <RoundButton onClick={() => step(1)} label="Next quarter">
            <ChevronRight className="h-5 w-5" />
          </RoundButton>
        </div>

        <p className="mt-5 text-xs font-medium text-white/35">Drag the cube or pick a quarter</p>
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
          className="relative flex items-center gap-3 px-8 py-5 text-base text-white sm:px-10 sm:text-lg"
          style={{ fontFamily: DISPLAY, letterSpacing: '0.03em', transform: 'translateZ(20px)', textShadow: '0 2px 6px rgba(0,0,0,0.35)' }}
        >
          REGISTER FOR Q-LEAGUE
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
const infoCards = [
  { id: 1, label: 'The Kit', title: "What's Included", icon: CheckCircle2, items: features },
  { id: 2, label: 'The Payoff', title: 'Core Benefits', icon: Trophy, items: benefits },
]

const QLeague = () => {
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
        <section className="px-4 pb-16 pt-12 text-center sm:px-6" onMouseMove={tilt.onMouseMove} onMouseLeave={tilt.reset}>
          <div className="mx-auto max-w-4xl" style={{ perspective: 1200 }}>
            <motion.div style={{ rotateX: tilt.rotateX, rotateY: tilt.rotateY, transformStyle: 'preserve-3d' }} className="relative">
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
                VS
              </span>

              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                className="mb-6 inline-flex items-center gap-2 rounded-full border border-red-500/40 bg-red-950/40 px-4 py-1.5 shadow-[0_4px_0_rgba(0,0,0,0.5),0_12px_30px_-10px_rgba(220,38,38,0.5)] backdrop-blur-sm"
                style={{ transform: 'translateZ(40px)' }}
              >
                <Trophy className="h-3.5 w-3.5 text-red-400" />
                <span className="text-[11px] font-bold uppercase tracking-[0.2em] text-red-200">Quarterly Tournaments</span>
              </motion.div>

              <h1
                className="text-5xl leading-[1.05] sm:text-6xl md:text-7xl"
                style={{ fontFamily: DISPLAY, letterSpacing: '0.01em', transform: 'translateZ(70px)', transformStyle: 'preserve-3d' }}
              >
                <span className="sr-only">Q-League — Compete. Connect. Conquer.</span>
                <Letters3D text="Q-LEAGUE —" color="#F4F2ED" extrude={EXTRUDE_WHITE} />
                <br />
                <Letters3D text="COMPETE. CONNECT. CONQUER." color={RED} extrude={EXTRUDE_RED} delay={0.4} />
              </h1>

              <motion.p
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 1.1, duration: 0.7 }}
                className="mx-auto mt-7 max-w-md text-base leading-relaxed text-white/65"
                style={{ transform: 'translateZ(30px)' }}
              >
                Every quarter, <span className="font-semibold text-[#F4F2ED]">HAKIRUSH</span> brings{' '}
                <span className="font-semibold text-red-500">10+ companies</span> together for high-octane corporate showdowns.
              </motion.p>
            </motion.div>
          </div>
        </section>

        {/* THE FOUR ROUNDS */}
        <section className="px-4 pb-24 sm:px-6">
          <div className="mx-auto max-w-7xl">
            <div className="mb-6 flex flex-wrap items-end justify-between gap-4">
              <motion.h2
                initial={{ opacity: 0, rotateX: -50, y: 20 }}
                whileInView={{ opacity: 1, rotateX: 0, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, ease: EASE_OUT }}
                style={{ fontFamily: DISPLAY, fontSize: '1.85rem', textShadow: EXTRUDE_WHITE, transformPerspective: 800, transformOrigin: '50% 100%' }}
                className="text-[#F4F2ED]"
              >
                THE FOUR ROUNDS
              </motion.h2>
              <span className="text-sm font-medium text-white/40">4 tournaments · one calendar year</span>
            </div>

            <TournamentCube />
          </div>
        </section>

        {/* KIT & PAYOFF */}
        <section className="px-4 pb-24 sm:px-6">
          <div className="mx-auto grid max-w-7xl gap-8 md:grid-cols-2">
            {infoCards.map((card, ci) => (
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
            <span className="mb-6 text-xs font-bold uppercase tracking-[0.3em] text-white/40">Four rounds. One champion.</span>
            <CTAButton3D />
          </motion.div>
        </section>
      </div>
    </div>
  )
}

export default QLeague