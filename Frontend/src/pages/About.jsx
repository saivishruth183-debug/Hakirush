import React, { useEffect, useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import {
  animate,
  motion,
  useInView,
  useMotionTemplate,
  useMotionValue,
  useReducedMotion,
  useScroll,
  useSpring,
  useTransform,
} from 'framer-motion'
import {
  Zap,
  Target,
  Eye,
  Crosshair,
  Lightbulb,
  Bolt,
  Quote,
  Users,
  ArrowRight,
  Star,
  Linkedin,
  RotateCcw,
} from 'lucide-react'
import PageBackground from '../components/PageBackground'

import Krishna from '../assets/Team/krishna.png'
import Arushi from '../assets/Team/arushi.png'
import Sharavanthi from '../assets/Team/sharvanthi.jpeg'
import Umesh from '../assets/Team/Umesh.jpeg'
import backgroundImage from '../assets/Hero/Backimage.png'

/* ------------------------------------------------------------------ */
/*  DESIGN TOKENS — same red system as the Navbar and Footer           */
/* ------------------------------------------------------------------ */
const RED_LIGHT = '#F87171'
const RED = '#DC2626'
const RED_DARK = '#7F1D1D'

const SPRING = { type: 'spring', stiffness: 400, damping: 30 }
const TILT_SPRING = { stiffness: 260, damping: 22, mass: 0.6 }
const EASE_OUT = [0.22, 1, 0.36, 1]

// Stacked text-shadows = solid 3D extrusion behind the letters
const EXTRUDE_WHITE =
  '0 1px 0 #3a0c0c, 0 2px 0 #320a0a, 0 3px 0 #2a0909, 0 4px 0 #220707, 0 5px 0 #1a0505, 0 6px 0 #120404, 0 18px 30px rgba(0,0,0,0.6)'
const EXTRUDE_RED =
  '0 1px 0 #7f1d1d, 0 2px 0 #6b1818, 0 3px 0 #571313, 0 4px 0 #430f0f, 0 5px 0 #2f0a0a, 0 6px 0 #1f0606, 0 18px 34px rgba(220,38,38,0.35)'

/* ------------------------------------------------------------------ */
/*  CONTENT                                                            */
/* ------------------------------------------------------------------ */
const mission = [
  {
    icon: Target,
    title: 'Mission',
    description:
      'To help organizations transform employee engagement into a continuous journey through professionally managed sports, team-building experiences, wellness initiatives and recognition programs that inspire collaboration, belonging and long-term workplace culture.',
  },
  {
    icon: Eye,
    title: 'Vision',
    description:
      "To become India's most trusted Employee Engagement Ecosystem, helping organizations build stronger workplace cultures through sports, wellness, recognition and meaningful shared experiences.",
  },
]

const founding = [
  {
    icon: Crosshair,
    title: 'Why we started',
    description:
      'To solve a real problem: disengaged teams, growing employee isolation after remote work, and HR teams stretched thin.',
  },
  {
    icon: Lightbulb,
    title: 'What we learned',
    description:
      'Small, well-run events create outsized cultural impact — trust and collaboration increase far faster than through remote initiatives.',
  },
  {
    icon: Bolt,
    title: 'How we operate',
    description: 'End-to-end delivery: strategy, venue, ops, production, content & measurement.',
  },
]

const team = [
  { image: Krishna, name: 'Krishna', role: 'Founder/CEO - Strategy & Growth', linkedin: 'https://www.linkedin.com/in/sudireddy-krishna-sai-reddy-566087192' },
  // { image: Vishruth, name: 'Vishruth', role: 'Technical Manager', linkedin: 'https://www.linkedin.com/in/sai-vishruth-89b9261b6' },
  { image: Arushi, name: 'Arushi Shreya', role: 'HR Manager', linkedin: 'https://www.linkedin.com/in/arushi-shreya/' },
  { image: Sharavanthi, name: 'Sharavanthi', role: 'Digital Marketing', linkedin: 'https://www.linkedin.com/in/d-sravanthi-21240a383' },
  { image: Umesh, name: 'Umesh', role: 'Operations Manager', linkedin: 'https://www.linkedin.com/in/umesh-alla-8435a13a7' },
]

const work = [
  { id: 1, title: 'Discovery', description: 'We understand your people, culture and KPIs.' },
  { id: 2, title: 'Design', description: 'Custom event plan, formats, schedules and branding options.' },
  { id: 3, title: 'Delivery', description: 'Venue, logistics, referees, safety and on-ground ops.' },
  { id: 4, title: 'Content & Reach', description: 'Photo, reels, streaming and social amplification.' },
  { id: 5, title: 'Measure & Scale', description: 'Feedback, participation metrics and scaling plan for next cycles.' },
]

const stats = [
  { label: 'Cities', value: '14+' },
  { label: 'Companies', value: '220+' },
  { label: 'Employees engaged', value: '40K+' },
  { label: 'Sports formats', value: '12+' },
]

/* ------------------------------------------------------------------ */
/*  HOOK — cursor-driven 3D tilt (same physics as Navbar/Footer)        */
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
/*  PARALLAX BACKGROUND                                                */
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
    <div
      aria-hidden="true"
      className="pointer-events-none fixed left-0 -z-10 w-full overflow-hidden"
      style={{ top: '-10vh', height: '130vh' }}
    >
      <motion.img
        src={image}
        alt=""
        style={{ x, y, scale }}
        className="h-full w-full object-cover object-center will-change-transform"
      />
      <div className="absolute inset-0 bg-linear-to-b from-slate-950/80 via-slate-950/65 to-slate-950/90" />
      <div className="absolute inset-0" style={{ background: `radial-gradient(ellipse at top, ${RED}26, transparent 60%)` }} />
    </div>
  )
}

/* ------------------------------------------------------------------ */
/*  SCROLL-REVEAL TEXT — words light up as you scroll                   */
/* ------------------------------------------------------------------ */
const ScrollRevealWord = ({ word, index, total, scrollYProgress }) => {
  const start = index / total
  const end = start + 1 / total
  const opacity = useTransform(scrollYProgress, [start, end], [0.25, 1])
  const color = useTransform(scrollYProgress, [start, end], ['rgba(255,255,255,0.3)', 'rgba(255,255,255,1)'])

  return (
    <motion.span style={{ opacity, color }} className="inline-block">
      {word}
      {' '}
    </motion.span>
  )
}

const ScrollRevealText = ({ text, className = '' }) => {
  const ref = useRef(null)
  const reduce = useReducedMotion()
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start 0.9', 'start 0.25'] })
  const words = text.split(' ')

  if (reduce) {
    return (
      <p ref={ref} className={className}>
        {text}
      </p>
    )
  }

  return (
    <p ref={ref} className={className}>
      {words.map((word, i) => (
        <ScrollRevealWord key={i} word={word} index={i} total={words.length} scrollYProgress={scrollYProgress} />
      ))}
    </p>
  )
}

/* ------------------------------------------------------------------ */
/*  SCOREBOARD COUNTER — digits tick up when the board comes into view  */
/* ------------------------------------------------------------------ */
const ScoreboardValue = ({ value }) => {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-10% 0px' })
  const reduce = useReducedMotion()
  const [display, setDisplay] = useState(reduce ? value : '0')

  const match = value.match(/^([\d,]+)(.*)$/)
  const numeric = match ? parseInt(match[1].replace(/,/g, ''), 10) : null
  const suffix = match ? match[2] : ''

  useEffect(() => {
    if (!inView || reduce || numeric === null) return
    const controls = animate(0, numeric, {
      duration: 1.6,
      ease: 'easeOut',
      onUpdate: (v) => setDisplay(Math.round(v).toLocaleString()),
    })
    return () => controls.stop()
  }, [inView, reduce, numeric])

  return (
    <span ref={ref} className="tabular-nums">
      {numeric === null || reduce ? value : `${display}${suffix}`}
    </span>
  )
}

/* ------------------------------------------------------------------ */
/*  3D BUILDING BLOCKS                                                 */
/* ------------------------------------------------------------------ */

// Letters drop in from flat, then hop when you hover them
const Letters3D = ({ text, color, extrude, delay = 0 }) => {
  const reduce = useReducedMotion()
  return (
    <span aria-hidden="true" className="inline-block whitespace-nowrap" style={{ transformStyle: 'preserve-3d' }}>
      {text.split('').map((ch, i) => (
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
          {ch === ' ' ? ' ' : ch}
        </motion.span>
      ))}
    </span>
  )
}

// Extruded red tile with an icon — spins on group hover
const IconTile = ({ icon: Icon, size = 56 }) => (
  <span
    className="relative block shrink-0 transition-transform duration-700 ease-out group-hover:[transform:rotateY(360deg)]"
    style={{ width: size, height: size, transformStyle: 'preserve-3d' }}
  >
    {Array.from({ length: 6 }).map((_, i) => (
      <span
        key={i}
        aria-hidden="true"
        className="absolute inset-0 rounded-2xl"
        style={{ transform: `translateZ(${-(i + 1) * 2}px)`, background: RED_DARK, filter: `brightness(${0.9 - i * 0.1})` }}
      />
    ))}
    <span
      aria-hidden="true"
      className="absolute inset-0 rounded-2xl ring-1 ring-inset ring-white/20"
      style={{ background: `linear-gradient(145deg, ${RED_LIGHT}, ${RED} 45%, ${RED_DARK})` }}
    />
    <span
      aria-hidden="true"
      className="absolute inset-x-1 top-0 h-1/2 rounded-t-2xl bg-linear-to-b from-white/30 to-transparent"
      style={{ transform: 'translateZ(1px)' }}
    />
    <span className="absolute inset-0 grid place-items-center text-white" style={{ transform: 'translateZ(12px)' }}>
      <Icon size={Math.round(size * 0.42)} strokeWidth={2.2} />
    </span>
  </span>
)

// Extruded number tile — flips in when scrolled into view
const NumberTile = ({ n }) => {
  const reduce = useReducedMotion()
  return (
    <motion.span
      className="relative block h-11 w-11 shrink-0 sm:h-14 sm:w-14"
      style={{ transformStyle: 'preserve-3d', transformPerspective: 500 }}
      initial={reduce ? false : { rotateY: -180 }}
      whileInView={{ rotateY: 0 }}
      viewport={{ once: true, margin: '-80px' }}
      transition={{ duration: 0.9, ease: EASE_OUT }}
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
      <span
        className="absolute inset-0 grid place-items-center font-serif text-base font-black text-white sm:text-lg"
        style={{ transform: 'translateZ(12px)', textShadow: '0 2px 4px rgba(0,0,0,0.4)' }}
      >
        0{n}
      </span>
    </motion.span>
  )
}

// Dark glass slab that tilts toward the cursor; children float above it
const TiltCard = ({ children, className = '', innerClassName = '', max = 8 }) => {
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
      {/* underside — gives the card real thickness */}
      <span
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 rounded-3xl bg-black/60"
        style={{ transform: 'translateZ(-16px) translateY(8px)' }}
      />
      {/* face */}
      <span
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 rounded-3xl border border-white/10 bg-linear-to-br from-slate-900/90 via-slate-950/90 to-black/90 shadow-[0_30px_60px_-25px_rgba(0,0,0,0.9)] backdrop-blur-md"
      />
      {/* red top edge */}
      <span
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-6 top-0 h-[2px] rounded-full"
        style={{ background: `linear-gradient(90deg, transparent, ${RED}, transparent)` }}
      />
      {/* moving light */}
      <motion.span
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 rounded-3xl"
        style={{ background: glare }}
        animate={{ opacity: hover ? 1 : 0 }}
      />
      <div
        className={`relative h-full ${innerClassName}`}
        style={{ transform: 'translateZ(30px)', transformStyle: 'preserve-3d' }}
      >
        {children}
      </div>
    </motion.div>
  )
}

// Big 3D slab button
const CTAButton3D = ({ to, children }) => {
  const tilt = useTilt({ max: 18 })
  const [hover, setHover] = useState(false)
  const glare = useMotionTemplate`radial-gradient(circle at ${tilt.gx}% ${tilt.gy}%, rgba(255,255,255,0.55), transparent 55%)`

  return (
    <Link to={to} className="inline-block rounded-full outline-none focus-visible:ring-2 focus-visible:ring-red-400">
      <motion.span
        onMouseMove={tilt.onMouseMove}
        onMouseEnter={() => setHover(true)}
        onMouseLeave={() => {
          tilt.reset()
          setHover(false)
        }}
        whileTap={{ scale: 0.94 }}
        style={{ rotateX: tilt.rotateX, rotateY: tilt.rotateY, transformPerspective: 700, transformStyle: 'preserve-3d' }}
        className="relative block select-none"
      >
        {Array.from({ length: 8 }).map((_, i) => (
          <span
            key={i}
            aria-hidden="true"
            className="absolute inset-0 rounded-full bg-red-900"
            style={{ transform: `translateZ(${-(i + 1) * 2}px)`, filter: `brightness(${0.95 - i * 0.08})` }}
          />
        ))}
        <span
          aria-hidden="true"
          className="absolute inset-0 rounded-full ring-1 ring-inset ring-white/25"
          style={{ background: `linear-gradient(135deg, ${RED_LIGHT}, ${RED} 45%, ${RED_DARK})` }}
        />
        <motion.span
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 rounded-full"
          style={{ background: glare, z: 1 }}
          animate={{ opacity: hover ? 1 : 0 }}
        />
        <motion.span
          aria-hidden="true"
          className="pointer-events-none absolute inset-x-3 top-0 h-1/2 rounded-t-full bg-linear-to-b from-white/30 to-transparent"
          style={{ z: 1 }}
        />
        <motion.span
          aria-hidden="true"
          className="pointer-events-none absolute -bottom-4 left-6 right-6 h-4 rounded-full bg-red-600/60 blur-lg"
          style={{ z: -30 }}
          animate={{ opacity: hover ? 1 : 0.55, scaleX: hover ? 1.12 : 1 }}
        />
        <span
          className="relative flex items-center gap-2.5 px-8 py-4 text-sm font-black uppercase tracking-[0.18em] text-white"
          style={{ transform: 'translateZ(20px)', textShadow: '0 2px 6px rgba(0,0,0,0.35)' }}
        >
          {children}
          <motion.span animate={{ x: hover ? 4 : 0 }} transition={SPRING}>
            <ArrowRight className="h-4 w-4" />
          </motion.span>
        </span>
      </motion.span>
    </Link>
  )
}

const Kicker = ({ icon: Icon, children }) => (
  <motion.div
    initial={{ opacity: 0, y: 15 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true }}
    className="mb-4 inline-flex items-center gap-2 rounded-full border border-red-500/30 bg-red-950/40 px-4 py-1.5 text-white shadow-[0_4px_0_rgba(0,0,0,0.5),0_12px_30px_-10px_rgba(220,38,38,0.5)] backdrop-blur-sm"
  >
    {Icon && <Icon className="h-3.5 w-3.5 text-red-400" />}
    <span className="text-[10px] font-black uppercase tracking-[0.3em]">{children}</span>
  </motion.div>
)

// Section title that stands up from flat as it scrolls in
const SectionHeading = ({ kicker, icon, children, accent }) => (
  <div className="mb-12 text-center md:mb-16">
    <Kicker icon={icon}>{kicker}</Kicker>
    <motion.h2
      initial={{ opacity: 0, y: 30, rotateX: -50 }}
      whileInView={{ opacity: 1, y: 0, rotateX: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.8, ease: EASE_OUT }}
      style={{ transformPerspective: 800, transformOrigin: '50% 100%', textShadow: EXTRUDE_WHITE }}
      className="font-serif text-3xl font-black tracking-tight text-white sm:text-4xl md:text-5xl"
    >
      {children}{' '}
      <span style={{ color: RED, textShadow: EXTRUDE_RED }}>{accent}</span>
    </motion.h2>
    <motion.div
      initial={{ scaleX: 0 }}
      whileInView={{ scaleX: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 0.8, delay: 0.3, ease: EASE_OUT }}
      className="mx-auto mt-5 h-1.5 w-16 rounded-full"
      style={{ background: `linear-gradient(90deg, ${RED_DARK}, ${RED}, ${RED_LIGHT})`, boxShadow: `0 0 16px ${RED}` }}
    />
  </div>
)

/* ------------------------------------------------------------------ */
/*  HERO                                                               */
/* ------------------------------------------------------------------ */
const Hero = () => {
  const tilt = useTilt({ max: 6 })

  return (
    <section className="relative pb-12 pt-32 md:pb-16 md:pt-36" onMouseMove={tilt.onMouseMove} onMouseLeave={tilt.reset}>
      <div className="mx-auto max-w-5xl px-4 text-center sm:px-6" style={{ perspective: 1200 }}>
        <motion.div style={{ rotateX: tilt.rotateX, rotateY: tilt.rotateY, transformStyle: 'preserve-3d' }} className="relative">
          {/* deep-set jersey number behind everything */}
          <span
            aria-hidden="true"
            className="pointer-events-none absolute left-1/2 -top-16 select-none font-serif text-[10rem] font-black leading-none tracking-tighter sm:-top-24 sm:text-[14rem] md:text-[18rem]"
            style={{
              transform: 'translateX(-50%) translateZ(-140px)',
              color: 'transparent',
              WebkitTextStroke: '2px rgba(255,255,255,0.07)',
              textShadow: '0 0 60px rgba(220,38,38,0.15)',
            }}
          >
            01
          </span>

          <div className="relative space-y-7" style={{ transformStyle: 'preserve-3d' }}>
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, ease: EASE_OUT }}
              className="group flex flex-col items-center justify-center gap-3 sm:flex-row sm:gap-4"
              style={{ transform: 'translateZ(40px)', transformStyle: 'preserve-3d' }}
            >
              <IconTile icon={Zap} size={52} />
              <p className="text-[11px] font-bold uppercase tracking-[0.35em] text-red-300">Employee Engagement, Elevated</p>
            </motion.div>

            <h1
              className="font-serif text-5xl font-black leading-[0.98] tracking-tight sm:text-6xl md:text-7xl"
              style={{ transform: 'translateZ(70px)', transformStyle: 'preserve-3d' }}
            >
              <span className="sr-only">About HAKIRUSH</span>
              <Letters3D text="About" color="#ffffff" extrude={EXTRUDE_WHITE} />{' '}
              <Letters3D text="HAKIRUSH" color={RED} extrude={EXTRUDE_RED} delay={0.3} />
            </h1>

            <motion.div
              initial={{ scaleX: 0 }}
              animate={{ scaleX: 1 }}
              transition={{ duration: 0.8, delay: 0.8, ease: EASE_OUT }}
              className="mx-auto h-1 w-20 rounded-full"
              style={{ background: `linear-gradient(90deg, ${RED_DARK}, ${RED}, ${RED_LIGHT})`, boxShadow: `0 0 16px ${RED}`, transform: 'translateZ(50px)' }}
            />

            <div style={{ transform: 'translateZ(30px)' }}>
              <ScrollRevealText
                className="mx-auto max-w-3xl px-2 text-base font-medium leading-relaxed text-slate-300 sm:text-lg md:text-xl"
                text="HAKIRUSH is an Employee Engagement Ecosystem designed to help organizations build stronger workplace cultures through professionally managed sports, team-building experiences, wellness initiatives and year-round engagement programs."
              />
            </div>
          </div>
        </motion.div>

        <StatsBoard />
      </div>
    </section>
  )
}

/* ------------------------------------------------------------------ */
/*  STATS — 3D stadium scoreboard                                      */
/* ------------------------------------------------------------------ */
const StatsBoard = () => (
  <motion.div
    initial={{ opacity: 0, y: 40, rotateX: -35 }}
    whileInView={{ opacity: 1, y: 0, rotateX: 0 }}
    viewport={{ once: true }}
    transition={{ duration: 0.9, delay: 0.2, ease: EASE_OUT }}
    style={{ transformPerspective: 1000, transformOrigin: '50% 100%' }}
    className="mx-auto mt-16 max-w-3xl"
  >
    <TiltCard max={6}>
      <div className="flex items-center justify-between px-5 pb-1 pt-4">
        <span className="text-[9px] font-black uppercase tracking-[0.3em] text-white/40">Live Numbers</span>
        <span className="flex items-center gap-1.5">
          <span className="relative flex h-2 w-2">
            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-red-500 opacity-75" />
            <span className="relative inline-flex h-2 w-2 rounded-full bg-red-500" />
          </span>
          <span className="text-[9px] font-black uppercase tracking-[0.3em] text-white/40">Season to date</span>
        </span>
      </div>
      <div
        className="grid grid-cols-2 divide-x divide-y divide-white/10 sm:grid-cols-4 sm:divide-y-0"
        style={{ transformStyle: 'preserve-3d' }}
      >
        {stats.map((s) => (
          <motion.div
            key={s.label}
            whileHover={{ z: 22 }}
            transition={SPRING}
            className="cursor-default px-3 py-6 text-center"
          >
            <p
              className="font-serif text-3xl font-black text-white sm:text-4xl"
              style={{ textShadow: EXTRUDE_RED }}
            >
              <ScoreboardValue value={s.value} />
            </p>
            <p className="mt-2 text-[9px] font-bold uppercase tracking-[0.15em] text-slate-400 sm:text-[10px]">{s.label}</p>
          </motion.div>
        ))}
      </div>
    </TiltCard>
  </motion.div>
)

/* ------------------------------------------------------------------ */
/*  DIVIDER — a moving 3D kit-stripe band laid back into the page       */
/* ------------------------------------------------------------------ */
const StripeDivider = () => {
  const reduce = useReducedMotion()
  const mask = 'linear-gradient(90deg, transparent, black 15%, black 85%, transparent)'
  return (
    <div aria-hidden="true" className="relative h-20 overflow-hidden" style={{ perspective: 600 }}>
      <motion.div
        className="absolute -inset-x-[10%] top-5 h-10"
        style={{
          transform: 'rotateX(55deg) skewX(-30deg)',
          background: `repeating-linear-gradient(90deg, ${RED} 0 22px, transparent 22px 44px, ${RED_DARK} 44px 66px, transparent 66px 88px)`,
          maskImage: mask,
          WebkitMaskImage: mask,
          boxShadow: `0 0 40px ${RED}55`,
        }}
        animate={reduce ? undefined : { backgroundPosition: ['0px 0px', '88px 0px'] }}
        transition={{ duration: 1.6, repeat: Infinity, ease: 'linear' }}
      />
    </div>
  )
}

/* ------------------------------------------------------------------ */
/*  TEAM — 3D ID badges on lanyards: swing, tilt, flip to the back      */
/* ------------------------------------------------------------------ */
const BADGE_DEPTH = 6

const TeamBadge = ({ member, index }) => {
  const reduce = useReducedMotion()
  const tilt = useTilt({ max: 14 })
  const [hover, setHover] = useState(false)
  const [flipped, setFlipped] = useState(false)
  const glare = useMotionTemplate`radial-gradient(circle at ${tilt.gx}% ${tilt.gy}%, rgba(255,255,255,0.35), transparent 50%)`

  const [title, subtitle] = member.role.split(' - ')
  const id = `HKR-${String(index + 1).padStart(3, '0')}`
  const still = reduce || hover || flipped
  const face = 'absolute inset-0 flex flex-col overflow-hidden rounded-2xl [backface-visibility:hidden]'

  const Barcode = () => (
    <div className="flex h-3 items-end gap-0.5">
      {[3, 1, 2, 1, 3, 2, 1, 2, 1, 3, 1, 2].map((h, i) => (
        <span key={i} className="w-0.5 bg-white/30" style={{ height: `${h * 25}%` }} />
      ))}
    </div>
  )

  return (
    <motion.div
      initial={{ opacity: 0, y: 50, rotateX: -35 }}
      whileInView={{ opacity: 1, y: 0, rotateX: 0 }}
      viewport={{ once: true, margin: '-60px' }}
      transition={{ duration: 0.9, delay: index * 0.1, ease: EASE_OUT }}
      style={{ transformPerspective: 1000 }}
      className="relative mx-auto w-full max-w-[260px]"
    >
      {/* lanyard + clip */}
      <div aria-hidden="true" className="flex flex-col items-center">
        <div className="h-8 w-2.5 rounded-b-sm sm:h-10" style={{ background: `linear-gradient(180deg, transparent, ${RED_DARK} 35%, ${RED})` }} />
        <div className="-mt-0.5 h-3 w-5 rounded-sm border-2 border-slate-400/70 bg-slate-300/20" />
      </div>

      {/* gentle swing from the clip */}
      <motion.div
        className="-mt-1"
        style={{ transformOrigin: '50% -48px' }}
        animate={still ? { rotate: 0 } : { rotate: [-1.6, 1.6, -1.6] }}
        transition={still ? { duration: 0.4 } : { duration: 4 + index * 0.5, repeat: Infinity, ease: 'easeInOut' }}
      >
        {/* tilt toward cursor */}
        <motion.div
          onMouseMove={tilt.onMouseMove}
          onMouseEnter={() => setHover(true)}
          onMouseLeave={() => {
            tilt.reset()
            setHover(false)
          }}
          style={{ rotateX: tilt.rotateX, rotateY: tilt.rotateY, transformPerspective: 900, transformStyle: 'preserve-3d' }}
          animate={{ scale: hover ? 1.04 : 1 }}
          transition={SPRING}
        >
          {/* flipping card */}
          <motion.div
            className="relative aspect-[3/4.8] w-full"
            style={{ transformStyle: 'preserve-3d' }}
            animate={{ rotateY: flipped ? 180 : 0 }}
            transition={{ duration: reduce ? 0 : 0.8, ease: EASE_OUT }}
          >
            {/* card thickness */}
            {Array.from({ length: BADGE_DEPTH }).map((_, i) => (
              <span
                key={i}
                aria-hidden="true"
                className="absolute inset-0 rounded-2xl"
                style={{
                  transform: `translateZ(${-2.5 + i}px)`,
                  background: i % 2 ? '#1a1d26' : '#0b0d12',
                }}
              />
            ))}

            {/* ---------- FRONT ---------- */}
            <div
              className={face}
              style={{
                transform: 'translateZ(3px)',
                pointerEvents: flipped ? 'none' : 'auto',
                background: 'linear-gradient(180deg, #121521, #07090d)',
                boxShadow: hover ? `0 30px 60px -20px ${RED}66` : '0 20px 40px -20px rgba(0,0,0,0.8)',
              }}
            >
              <span aria-hidden="true" className="pointer-events-none absolute inset-0 rounded-2xl ring-1 ring-inset ring-white/10" />
              <span aria-hidden="true" className="absolute inset-x-0 top-0 h-[3px]" style={{ background: `linear-gradient(90deg, ${RED_DARK}, ${RED}, ${RED_DARK})` }} />

              <div className="flex items-center justify-between px-3 pb-2 pt-3">
                <span className="text-[7px] font-black uppercase tracking-[0.2em] text-white/70 sm:text-[9px]">Hakirush</span>
                <span className="text-[7px] font-bold uppercase tracking-[0.15em] text-red-400 sm:text-[9px]">Staff</span>
              </div>

              <div className="relative mx-2.5 aspect-square overflow-hidden rounded-xl bg-slate-800 ring-1 ring-red-500/30">
                <img
                  src={member.image}
                  alt={member.name}
                  className={`h-full w-full object-cover transition-all duration-700 ${hover ? 'scale-[1.08] grayscale-0' : 'grayscale-[40%]'}`}
                />
                <div className="absolute inset-x-0 bottom-0 h-1/2 bg-linear-to-t from-slate-950/90 to-transparent" />
                <div
                  className={`absolute left-2 top-2 h-4 w-4 border-l-2 border-t-2 border-red-500 transition-opacity duration-500 ${hover ? 'opacity-100' : 'opacity-0'}`}
                />
                <div
                  className={`absolute bottom-2 right-2 h-4 w-4 border-b-2 border-r-2 border-red-500 transition-opacity duration-500 ${hover ? 'opacity-100' : 'opacity-0'}`}
                />
                <span
                  className={`absolute bottom-2 left-1/2 flex -translate-x-1/2 items-center gap-1 rounded-full bg-black/60 px-2 py-0.5 text-[8px] font-bold uppercase tracking-wider text-white backdrop-blur-sm transition-opacity duration-300 sm:text-[9px] ${
                    hover ? 'opacity-100' : 'opacity-100 sm:opacity-0'
                  }`}
                >
                  <RotateCcw className="h-2.5 w-2.5" /> Tap to flip
                </span>
              </div>

              <div className="px-3 pt-3 text-center">
                <p className="mb-1 truncate text-[8px] font-bold uppercase tracking-[0.2em] text-red-400 sm:text-[10px]">{title}</p>
                <h3
                  className="truncate font-serif text-sm font-bold tracking-wider text-white sm:text-lg"
                  style={{ textShadow: '0 1px 0 #3a0c0c, 0 2px 0 #2a0909, 0 6px 12px rgba(0,0,0,0.5)' }}
                >
                  {member.name}
                </h3>
                {subtitle && (
                  <p className="mt-0.5 truncate text-[8px] font-medium uppercase tracking-wide text-slate-400 sm:text-[11px]">{subtitle}</p>
                )}
              </div>

              <div className="mt-auto flex items-center justify-between gap-1 border-t border-white/10 px-2.5 pb-2.5 pt-2">
                <Barcode />
                <span className="font-mono text-[7px] tracking-wider text-white/40 sm:text-[9px]">{id}</span>
              </div>

              {/* holographic glare */}
              <motion.span
                aria-hidden="true"
                className="pointer-events-none absolute inset-0 rounded-2xl mix-blend-overlay"
                style={{ background: glare }}
                animate={{ opacity: hover ? 1 : 0 }}
              />

              <button
                type="button"
                onClick={() => setFlipped(true)}
                tabIndex={flipped ? -1 : 0}
                aria-label={`Show ${member.name}'s profile`}
                className="absolute inset-0 z-10 cursor-pointer rounded-2xl outline-none focus-visible:ring-2 focus-visible:ring-red-500"
              />
            </div>

            {/* ---------- BACK ---------- */}
            <div
              className={face}
              style={{
                transform: 'rotateY(180deg) translateZ(3px)',
                pointerEvents: flipped ? 'auto' : 'none',
                background: `linear-gradient(160deg, ${RED_DARK}, #2a0808 55%, #0b0507)`,
              }}
            >
              <span aria-hidden="true" className="pointer-events-none absolute inset-0 rounded-2xl ring-1 ring-inset ring-white/15" />
              <span
                aria-hidden="true"
                className="pointer-events-none absolute -bottom-6 -right-4 select-none font-serif text-7xl font-black text-white/[0.06] sm:text-8xl"
              >
                HKR
              </span>

              <button
                type="button"
                onClick={() => setFlipped(false)}
                tabIndex={flipped ? 0 : -1}
                aria-label="Flip card back"
                className="absolute right-2 top-2 z-10 grid h-7 w-7 place-items-center rounded-full bg-black/30 text-white/80 outline-none transition hover:bg-black/50 hover:text-white focus-visible:ring-2 focus-visible:ring-red-300"
              >
                <RotateCcw className="h-3.5 w-3.5" />
              </button>

              <div className="relative flex h-full flex-col items-center justify-center gap-2 px-3 text-center sm:gap-3 sm:px-4">
                <img
                  src={member.image}
                  alt=""
                  className="h-12 w-12 rounded-full object-cover ring-2 ring-red-400/60 sm:h-16 sm:w-16"
                />
                <div>
                  <h3 className="font-serif text-sm font-bold text-white sm:text-lg">{member.name}</h3>
                  <p className="mt-1 text-[9px] font-semibold uppercase leading-snug tracking-wider text-red-200/80 sm:text-[11px]">
                    {member.role}
                  </p>
                </div>
                <div className="h-px w-10 bg-red-400/40" />
                <a
                  href={member.linkedin.trim()}
                  target="_blank"
                  rel="noopener noreferrer"
                  tabIndex={flipped ? 0 : -1}
                  className="inline-flex items-center gap-1.5 rounded-full bg-white px-3 py-1.5 text-[9px] font-black uppercase tracking-wider text-red-900 shadow-[0_3px_0_#450a0a] outline-none transition hover:-translate-y-0.5 hover:shadow-[0_5px_0_#450a0a] active:translate-y-0.5 active:shadow-[0_1px_0_#450a0a] focus-visible:ring-2 focus-visible:ring-red-300 sm:px-4 sm:py-2 sm:text-[11px]"
                >
                  <Linkedin className="h-3 w-3 fill-current" /> LinkedIn
                </a>
                <span className="font-mono text-[8px] tracking-wider text-white/40 sm:text-[9px]">{id}</span>
              </div>
            </div>
          </motion.div>
        </motion.div>
      </motion.div>
    </motion.div>
  )
}

const TeamSection = () => (
  <section className="relative overflow-hidden py-16 md:py-24">
    <div
      aria-hidden="true"
      className="pointer-events-none absolute right-0 top-0 h-[500px] w-[500px] -translate-y-1/2 translate-x-1/4 rounded-full"
      style={{ background: RED, opacity: 0.08, filter: 'blur(120px)' }}
    />
    <div className="relative z-10 mx-auto max-w-6xl px-4 sm:px-6">
      <SectionHeading kicker="The Leadership" icon={Users} accent="Dream Team">
        Meet The
      </SectionHeading>
      <div className="mx-auto grid max-w-5xl grid-cols-2 gap-x-4 gap-y-10 sm:gap-6 lg:grid-cols-4">
        {team.map((member, index) => (
          <TeamBadge key={member.name} member={member} index={index} />
        ))}
      </div>
    </div>
  </section>
)

/* ------------------------------------------------------------------ */
/*  MISSION & VISION                                                   */
/* ------------------------------------------------------------------ */
const MissionSection = () => (
  <section className="py-14 md:py-20">
    <div className="mx-auto grid max-w-5xl grid-cols-1 items-stretch gap-8 px-4 sm:px-6 md:grid-cols-2">
      {mission.map((item, index) => (
        <motion.div
          key={item.title}
          initial={{ opacity: 0, y: 40, rotateY: index === 0 ? 25 : -25 }}
          whileInView={{ opacity: 1, y: 0, rotateY: 0 }}
          viewport={{ once: true, margin: '-60px' }}
          transition={{ duration: 0.9, delay: index * 0.12, ease: EASE_OUT }}
          style={{ transformPerspective: 1200 }}
          className="h-full"
        >
          <TiltCard className="h-full" innerClassName="flex flex-col p-8 sm:p-10">
            <Quote aria-hidden="true" className="absolute right-6 top-6 h-12 w-12 text-white/5" strokeWidth={1.5} />
            <div className="mb-6 flex items-center gap-5" style={{ transformStyle: 'preserve-3d' }}>
              <IconTile icon={item.icon} size={56} />
              <h3 className="font-serif text-2xl font-bold text-white sm:text-3xl" style={{ textShadow: EXTRUDE_WHITE }}>
                Our <span style={{ color: RED, textShadow: EXTRUDE_RED }}>{item.title}</span>
              </h3>
            </div>
            <p className="flex-1 text-base leading-relaxed text-slate-300 sm:text-lg">{item.description}</p>
          </TiltCard>
        </motion.div>
      ))}
    </div>
  </section>
)

/* ------------------------------------------------------------------ */
/*  STORY                                                              */
/* ------------------------------------------------------------------ */
const StorySection = () => (
  <section className="relative py-16 md:py-24">
    <div className="mx-auto max-w-6xl px-4 sm:px-6">
      <SectionHeading kicker="Our Story" icon={Star} accent="Began">
        How It All
      </SectionHeading>

      <div className="mx-auto flex max-w-2xl items-start gap-5">
        <span
          className="hidden w-[3px] shrink-0 self-stretch rounded-full sm:block"
          style={{ background: `linear-gradient(180deg, ${RED}, ${RED_DARK}, transparent)`, boxShadow: `0 0 12px ${RED}88` }}
        />
        <div>
          <Quote className="mb-3 h-8 w-8 text-red-500/70" />
          <ScrollRevealText
            className="text-lg font-medium leading-relaxed text-slate-200 sm:text-xl"
            text="HAKIRUSH began with a simple idea—to deliver effortless, professional sports experiences for corporate teams. We combine event management, digital storytelling, and scalable operations to serve both startups and enterprises."
          />
        </div>
      </div>

      <div className="mt-14 grid grid-cols-1 items-stretch gap-6 md:grid-cols-3">
        {founding.map((item, index) => (
          <motion.div
            key={item.title}
            initial={{ opacity: 0, rotateY: 60, x: 40 }}
            whileInView={{ opacity: 1, rotateY: 0, x: 0 }}
            viewport={{ once: true, margin: '-60px' }}
            transition={{ duration: 0.9, delay: index * 0.12, ease: EASE_OUT }}
            style={{ transformPerspective: 1200, transformOrigin: '0% 50%' }}
            className="h-full"
          >
            <TiltCard className="h-full" innerClassName="flex flex-col p-7 text-left sm:p-8">
              <span
                aria-hidden="true"
                className="absolute right-6 top-4 select-none font-serif text-5xl font-black"
                style={{ color: '#161a24', textShadow: '0 1px 0 #2a0909, 0 2px 0 #220707, 0 3px 0 #1a0505, 0 4px 0 #120404' }}
              >
                0{index + 1}
              </span>
              <div className="mb-5" style={{ transformStyle: 'preserve-3d' }}>
                <IconTile icon={item.icon} size={48} />
              </div>
              <h4 className="mb-2.5 font-serif text-lg font-bold text-white sm:text-xl">{item.title}</h4>
              <p className="flex-1 text-sm leading-relaxed text-slate-300 sm:text-base">{item.description}</p>
            </TiltCard>
          </motion.div>
        ))}
      </div>
    </div>
  </section>
)

/* ------------------------------------------------------------------ */
/*  PROCESS — timeline that draws itself as you scroll                 */
/* ------------------------------------------------------------------ */
const ProcessSection = () => {
  const ref = useRef(null)
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start 0.75', 'end 0.6'] })
  const line = useSpring(scrollYProgress, { stiffness: 120, damping: 30 })

  return (
    <section className="mx-auto max-w-5xl px-4 py-16 sm:px-6 md:py-24">
      <SectionHeading kicker="The Process" icon={Bolt} accent="Work">
        How We
      </SectionHeading>

      <div ref={ref} className="relative">
        {/* track + glowing progress */}
        <div className="absolute bottom-6 left-[20.5px] top-6 w-[3px] rounded-full bg-white/10 sm:left-[26.5px]" />
        <motion.div
          className="absolute bottom-6 left-[20.5px] top-6 w-[3px] origin-top rounded-full sm:left-[26.5px]"
          style={{
            scaleY: line,
            background: `linear-gradient(180deg, ${RED_LIGHT}, ${RED}, ${RED_DARK})`,
            boxShadow: `0 0 14px ${RED}`,
          }}
        />

        <div className="space-y-5">
          {work.map((step) => (
            <motion.div
              key={step.id}
              initial={{ opacity: 0, x: -40, rotateY: -25 }}
              whileInView={{ opacity: 1, x: 0, rotateY: 0 }}
              viewport={{ once: true, margin: '-80px' }}
              transition={{ duration: 0.7, ease: EASE_OUT }}
              style={{ transformPerspective: 1000 }}
              className="relative flex items-start gap-4 sm:gap-6"
            >
              <div className="relative z-10 pt-3">
                <NumberTile n={step.id} />
              </div>
              <TiltCard max={5} className="flex-1" innerClassName="p-5 sm:p-6">
                <h4 className="mb-1.5 font-serif text-lg font-bold text-white sm:text-xl">{step.title}</h4>
                <p className="text-sm font-medium text-slate-300 sm:text-base">{step.description}</p>
              </TiltCard>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}

/* ------------------------------------------------------------------ */
/*  CTA                                                                */
/* ------------------------------------------------------------------ */
const CTASection = () => (
  <section className="mx-auto max-w-4xl px-4 pb-28 sm:px-6">
    <motion.div
      initial={{ opacity: 0, y: 40, rotateX: -30 }}
      whileInView={{ opacity: 1, y: 0, rotateX: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.9, ease: EASE_OUT }}
      style={{ transformPerspective: 1200, transformOrigin: '50% 100%' }}
    >
      <TiltCard max={5} innerClassName="flex flex-col items-center gap-8 px-6 py-12 text-center sm:px-12 sm:py-16">
        <h3
          className="font-serif text-3xl font-black tracking-tight text-white sm:text-4xl"
          style={{ textShadow: EXTRUDE_WHITE, transform: 'translateZ(20px)' }}
        >
          Let's build your team of <span style={{ color: RED, textShadow: EXTRUDE_RED }}>champions</span>
        </h3>
        <div style={{ transform: 'translateZ(40px)' }}>
          <CTAButton3D to="/contact">Start a Conversation</CTAButton3D>
        </div>
      </TiltCard>
    </motion.div>
  </section>
)

/* ------------------------------------------------------------------ */
/*  PAGE                                                               */
/* ------------------------------------------------------------------ */
export default function About() {
  return (
    <div className="relative min-h-screen overflow-hidden text-white">
      <PageBackground />
      <ParallaxBackground image={backgroundImage} />

      <div className="relative z-10">
        <Hero />
        <StripeDivider />
        <TeamSection />
        <MissionSection />
        <StorySection />
        <ProcessSection />
        <CTASection />
      </div>
    </div>
  )
}