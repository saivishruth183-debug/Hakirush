import React, { useEffect, useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import {
  AnimatePresence,
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
  Star,
  Users,
  Building,
  Award,
  TrendingUp,
  Quote,
  MessageCircle,
  Handshake,
  ArrowRight,
  ExternalLink,
} from 'lucide-react'
import backgroundImage from '../assets/Hero/Backimage.png'

import Client1 from '../assets/Clients/Vessella.png'
import Client2 from '../assets/Clients/Goldsikka.png'
import Client3 from '../assets/Clients/Simplify.png'
import Client4 from '../assets/Clients/SVLA.png'

import Amit from '../assets/Terminals/Amit.png'
import Priya from '../assets/Terminals/Priya.png'
import Rajesh from '../assets/Terminals/Rajesh.png'
import Sarah from '../assets/Terminals/Sarah.png'

/* ------------------------------------------------------------------ */
/*  SWITCHES — these sections were turned off on your old page.        */
/*  Flip to true once the content is real.                              */
/* ------------------------------------------------------------------ */
const SHOW_SPONSORS = false
const SHOW_TESTIMONIALS = false

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
const stats = [
  { icon: Building, label: 'Companies Trust Us', value: '50+' },
  { icon: Users, label: 'Employees Engaged', value: '10,000+' },
  { icon: Award, label: 'Events Delivered', value: '500+' },
]

const sponsors = [
  { id: 1, href: '/sponsors/sponsor1', name: 'Sponsor 1', logo: 'https://placehold.co/150x80/e5e7eb/6b7280?text=Sponsor+1' },
  { id: 2, href: '/sponsors/sponsor2', name: 'Sponsor 2', logo: 'https://placehold.co/150x80/e5e7eb/6b7280?text=Sponsor+2' },
  { id: 3, href: '/sponsors/sponsor3', name: 'Sponsor 3', logo: 'https://placehold.co/150x80/e5e7eb/6b7280?text=Sponsor+3' },
  { id: 4, href: '/sponsors/sponsor4', name: 'Sponsor 4', logo: 'https://placehold.co/150x80/e5e7eb/6b7280?text=Sponsor+4' },
  { id: 5, href: '/sponsors/sponsor5', name: 'Sponsor 5', logo: 'https://placehold.co/150x80/e5e7eb/6b7280?text=Sponsor+5' },
]

const clients = [
  { id: 1, href: 'https://vessella.com', name: 'Vessella', logo: Client1 },
  { id: 2, href: 'https://goldsikka.com', name: 'Goldsikka', logo: Client2 },
  { id: 3, href: 'https://simplifyhome.in', name: 'Simplify', logo: Client3 },
  { id: 4, href: 'https://thesvla.com', name: 'SVLA', logo: Client4 },
]

const testimonials = [
  {
    person: 'Rajesh Kumar',
    position: 'HR Director',
    message:
      'HAKIRUSH has revolutionized our employee engagement. The biweekly tournaments have created a buzz in the office that we never had before. Team morale is at an all-time high!',
    avatar: Rajesh,
    rating: 5,
  },
  {
    person: 'Priya Sharma',
    position: 'CEO',
    message:
      'The professional organization and competitive spirit that HAKIRUSH brings has made our company culture more vibrant. Our employees look forward to every tournament!',
    avatar: Priya,
    rating: 5,
  },
  {
    person: 'Amit Patel',
    position: 'Operations Manager',
    message:
      'Outstanding service delivery! Every tournament is executed flawlessly. The branded kits, professional coverage, and seamless coordination exceed our expectations.',
    avatar: Amit,
    rating: 5,
  },
  {
    person: 'Sarah Johnson',
    position: 'Head of People Operations',
    message:
      'HAKIRUSH has transformed how our teams collaborate. The inter-department competitions have broken down silos and created lasting friendships across our organization.',
    avatar: Sarah,
    rating: 5,
  },
]

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
      <motion.img src={image} alt="" style={{ x, y, scale }} className="h-full w-full object-cover object-center will-change-transform" />
      <div className="absolute inset-0 bg-linear-to-b from-slate-950/80 via-slate-950/65 to-slate-950/90" />
      <div className="absolute inset-0" style={{ background: `radial-gradient(ellipse at top, ${RED}26, transparent 60%)` }} />
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
        className="pointer-events-none absolute inset-x-6 top-0 h-[2px] rounded-full"
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

const Kicker = ({ icon: Icon, children }) => (
  <motion.div
    initial={{ opacity: 0, y: 15 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true }}
    className="mb-5 inline-flex items-center gap-2 rounded-full border border-red-500/30 bg-red-950/40 px-4 py-1.5 text-white shadow-[0_4px_0_rgba(0,0,0,0.5),0_12px_30px_-10px_rgba(220,38,38,0.5)] backdrop-blur-sm"
  >
    {Icon && <Icon className="h-3.5 w-3.5 text-red-400" />}
    <span className="text-[10px] font-black uppercase tracking-[0.3em]">{children}</span>
  </motion.div>
)

const SectionHeading = ({ kicker, icon, children, accent }) => (
  <div className="mb-12 text-center">
    <Kicker icon={icon}>{kicker}</Kicker>
    <motion.h2
      initial={{ opacity: 0, y: 30, rotateX: -50 }}
      whileInView={{ opacity: 1, y: 0, rotateX: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.8, ease: EASE_OUT }}
      style={{ transformPerspective: 800, transformOrigin: '50% 100%', textShadow: EXTRUDE_WHITE }}
      className="font-serif text-3xl font-black tracking-tight text-white sm:text-4xl md:text-5xl"
    >
      {children} <span style={{ color: RED, textShadow: EXTRUDE_RED }}>{accent}</span>
    </motion.h2>
  </div>
)

/* ------------------------------------------------------------------ */
/*  SCOREBOARD COUNTER                                                 */
/* ------------------------------------------------------------------ */
const ScoreboardValue = ({ value }) => {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-10% 0px' })
  const reduce = useReducedMotion()
  const [display, setDisplay] = useState('0')

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
/*  HERO                                                               */
/* ------------------------------------------------------------------ */
const Hero = () => {
  const tilt = useTilt({ max: 6 })
  return (
    <section className="relative pb-14 pt-32 md:pt-36" onMouseMove={tilt.onMouseMove} onMouseLeave={tilt.reset}>
      <div className="mx-auto max-w-5xl px-6 text-center" style={{ perspective: 1200 }}>
        <motion.div style={{ rotateX: tilt.rotateX, rotateY: tilt.rotateY, transformStyle: 'preserve-3d' }} className="relative">
          <span
            aria-hidden="true"
            className="pointer-events-none absolute left-1/2 -top-24 text-white/[0.05] sm:-top-32"
            style={{ transform: 'translateX(-50%) translateZ(-140px)' }}
          >
            <Handshake strokeWidth={0.6} className="h-64 w-64 sm:h-96 sm:w-96" />
          </span>

          <div className="relative space-y-7" style={{ transformStyle: 'preserve-3d' }}>
            <div className="group flex justify-center" style={{ transform: 'translateZ(40px)', transformStyle: 'preserve-3d' }}>
              <IconTile icon={Users} size={60} />
            </div>

            <h1
              className="font-serif text-5xl font-black leading-[1.02] tracking-tight sm:text-6xl md:text-7xl"
              style={{ transform: 'translateZ(70px)', transformStyle: 'preserve-3d' }}
            >
              <span className="sr-only">Our Clients</span>
              <Letters3D text="Our" color="#ffffff" extrude={EXTRUDE_WHITE} />{' '}
              <Letters3D text="Clients" color={RED} extrude={EXTRUDE_RED} delay={0.2} />
            </h1>

            <motion.div
              initial={{ scaleX: 0 }}
              animate={{ scaleX: 1 }}
              transition={{ duration: 0.8, delay: 0.7, ease: EASE_OUT }}
              className="mx-auto h-1 w-20 rounded-full"
              style={{ background: `linear-gradient(90deg, ${RED_DARK}, ${RED}, ${RED_LIGHT})`, boxShadow: `0 0 16px ${RED}` }}
            />

            <motion.p
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.9, duration: 0.7 }}
              className="mx-auto max-w-3xl text-sm font-medium text-slate-300 sm:text-base md:text-lg"
              style={{ transform: 'translateZ(30px)' }}
            >
              Trusted by leading companies to deliver exceptional corporate sports experiences and build vibrant workplace cultures.
            </motion.p>
          </div>
        </motion.div>
      </div>
    </section>
  )
}

/* ------------------------------------------------------------------ */
/*  STATS                                                              */
/* ------------------------------------------------------------------ */
const StatsSection = () => (
  <section className="py-14">
    <div className="mx-auto max-w-7xl px-6">
      <SectionHeading kicker="Our Impact" icon={TrendingUp} accent="Numbers">
        By The
      </SectionHeading>

      <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
        {stats.map((stat, i) => (
          <motion.div
            key={stat.label}
            initial={{ opacity: 0, y: 50, rotateX: -40 }}
            whileInView={{ opacity: 1, y: 0, rotateX: 0 }}
            viewport={{ once: true, margin: '-60px' }}
            transition={{ duration: 0.9, delay: i * 0.12, ease: EASE_OUT }}
            style={{ transformPerspective: 1000, transformOrigin: '50% 100%' }}
          >
            <TiltCard innerClassName="flex flex-col items-center px-8 py-10 text-center">
              <div className="mb-6" style={{ transformStyle: 'preserve-3d' }}>
                <IconTile icon={stat.icon} size={64} />
              </div>
              <p
                className="mb-3 font-serif text-4xl font-black text-white sm:text-5xl"
                style={{ textShadow: EXTRUDE_RED, transform: 'translateZ(20px)' }}
              >
                <ScoreboardValue value={stat.value} />
              </p>
              <p className="font-medium text-slate-300">{stat.label}</p>
            </TiltCard>
          </motion.div>
        ))}
      </div>
    </div>
  </section>
)

/* ------------------------------------------------------------------ */
/*  PARTNER STRIP — continuous scrolling row of glass logo cards        */
/* ------------------------------------------------------------------ */
const MarqueeTile = ({ item, hidden }) => {
  const tilt = useTilt({ max: 16 })
  const [hover, setHover] = useState(false)
  const internal = item.href.startsWith('/')
  const props = internal ? { to: item.href } : { href: item.href, target: '_blank', rel: 'noopener noreferrer' }
  const Tag = internal ? Link : 'a'

  return (
    <Tag
      {...props}
      aria-label={hidden ? undefined : `${item.name}${internal ? '' : ' (opens in a new tab)'}`}
      aria-hidden={hidden || undefined}
      tabIndex={hidden ? -1 : undefined}
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => {
        setHover(false)
        tilt.reset()
      }}
      onFocus={() => setHover(true)}
      onBlur={() => setHover(false)}
      className="block shrink-0 rounded-2xl outline-none focus-visible:ring-2 focus-visible:ring-red-500"
    >
      <motion.span
        onMouseMove={tilt.onMouseMove}
        style={{ rotateX: tilt.rotateX, rotateY: tilt.rotateY, transformPerspective: 600, transformStyle: 'preserve-3d' }}
        animate={{ y: hover ? -8 : 0, scale: hover ? 1.05 : 1 }}
        transition={SPRING}
        className="relative block h-24 w-[150px] sm:h-28 sm:w-[190px] md:h-32 md:w-[230px]"
      >
        {/* face */}
        <span
          className="absolute inset-0 flex items-center justify-center overflow-hidden rounded-2xl border p-4 transition-[border-color,box-shadow] duration-300 sm:p-5"
          style={{
            // transparent glass card
            background: hover
              ? 'linear-gradient(160deg, rgba(220,38,38,0.18), rgba(255,255,255,0.04))'
              : 'linear-gradient(160deg, rgba(255,255,255,0.10), rgba(255,255,255,0.02))',
            backdropFilter: 'blur(10px) saturate(140%)',
            WebkitBackdropFilter: 'blur(10px) saturate(140%)',
            borderColor: hover ? `${RED}cc` : 'rgba(255,255,255,0.14)',
            boxShadow: hover
              ? `0 22px 40px -14px ${RED}99, inset 0 1px 0 rgba(255,255,255,0.18)`
              : '0 14px 28px -16px rgba(0,0,0,0.7), inset 0 1px 0 rgba(255,255,255,0.12)',
          }}
        >
          <span aria-hidden="true" className="absolute inset-x-6 top-0 h-px" style={{ background: `linear-gradient(90deg, transparent, ${RED}, transparent)` }} />
          <img src={item.logo} alt="" draggable="false" className="h-full w-full object-contain" />
        </span>
        {!internal && (
          <span
            aria-hidden="true"
            className={`absolute -right-2 -top-2 grid h-7 w-7 place-items-center rounded-full bg-red-600 text-white shadow-[0_3px_0_#7f1d1d] transition-opacity duration-300 ${
              hover ? 'opacity-100' : 'opacity-0'
            }`}
            style={{ transform: 'translateZ(20px)' }}
          >
            <ExternalLink className="h-3.5 w-3.5" />
          </span>
        )}
      </motion.span>
    </Tag>
  )
}

const PartnerMarquee = ({ data, label, icon, title, accent, speed = 6 }) => {
  const reduce = useReducedMotion()
  const [paused, setPaused] = useState(false)
  // repeat the logos so one half of the strip is always wider than the screen → no gaps
  const copies = Math.max(2, Math.ceil(10 / data.length))
  const half = Array.from({ length: copies }).flatMap(() => data)
  const loop = [...half, ...half]
  const mask = 'linear-gradient(90deg, transparent, black 10%, black 90%, transparent)'

  return (
    <section className="w-full py-14">
      <SectionHeading kicker={label} icon={icon} accent={accent}>
        {title}
      </SectionHeading>

      <div
        className="relative w-full overflow-hidden py-8"
        style={{ maskImage: mask, WebkitMaskImage: mask }}
        onMouseEnter={() => setPaused(true)}
        onMouseLeave={() => setPaused(false)}
        onFocus={() => setPaused(true)}
        onBlur={() => setPaused(false)}
      >
        <div
          className="flex w-max flex-nowrap items-center"
          style={{
            animation: reduce ? 'none' : `hakirush-partners ${half.length * speed}s linear infinite`,
            animationPlayState: paused ? 'paused' : 'running',
            willChange: 'transform',
          }}
        >
          {loop.map((item, i) => (
            <span key={`${item.id}-${i}`} className="block shrink-0 pr-6 md:pr-10">
              <MarqueeTile item={item} hidden={i >= data.length} />
            </span>
          ))}
        </div>
      </div>

      {/* translateX(-50%) lands exactly on the start of the second half, so the loop is seamless */}
      <style>{`@keyframes hakirush-partners { from { transform: translate3d(0,0,0) } to { transform: translate3d(-50%,0,0) } }`}</style>
    </section>
  )
}

/* ------------------------------------------------------------------ */
/*  TESTIMONIALS — a 3D card stack (off until SHOW_TESTIMONIALS = true)  */
/* ------------------------------------------------------------------ */
const TestimonialStack = () => {
  const reduce = useReducedMotion()
  const [current, setCurrent] = useState(0)
  const n = testimonials.length

  useEffect(() => {
    if (reduce) return
    const id = setInterval(() => setCurrent((c) => (c + 1) % n), 10000)
    return () => clearInterval(id)
  }, [reduce, n])

  return (
    <section className="py-20">
      <div className="mx-auto max-w-4xl px-6">
        <SectionHeading kicker="Success Stories" icon={MessageCircle} accent="Clients Say">
          What Our
        </SectionHeading>

        <div className="relative h-[460px] sm:h-[400px]" style={{ perspective: 1400 }}>
          {testimonials.map((t, i) => {
            const offset = (i - current + n) % n // 0 = front
            return (
              <motion.div
                key={t.person}
                aria-hidden={offset !== 0}
                animate={{
                  z: -offset * 70,
                  y: -offset * 22,
                  rotateX: offset * 4,
                  opacity: offset > 2 ? 0 : 1 - offset * 0.25,
                }}
                transition={{ duration: reduce ? 0 : 0.7, ease: EASE_OUT }}
                style={{ zIndex: n - offset, transformStyle: 'preserve-3d' }}
                className="absolute inset-0"
              >
                <div className="relative h-full overflow-hidden rounded-[2rem] border border-white/10 bg-linear-to-br from-slate-900 via-slate-950 to-black p-6 shadow-[0_40px_80px_-30px_rgba(0,0,0,0.9)] sm:p-10 md:p-14">
                  <span aria-hidden="true" className="absolute inset-x-10 top-0 h-[2px]" style={{ background: `linear-gradient(90deg, transparent, ${RED}, transparent)` }} />
                  <Quote className="absolute right-6 top-6 h-12 w-12 text-red-500/10" />
                  <div className="mb-8 flex flex-col items-center gap-6 sm:flex-row">
                    <img src={t.avatar} alt={t.person} className="h-20 w-20 shrink-0 rounded-2xl border-4 border-red-900/40 object-cover shadow-xl" />
                    <div className="text-center sm:text-left">
                      <h3 className="text-xl font-bold text-white sm:text-2xl">{t.person}</h3>
                      <p className="text-sm font-semibold text-red-400 sm:text-base">{t.position}</p>
                      <div className="mt-2 flex justify-center gap-1 sm:justify-start" aria-label={`${t.rating} out of 5 stars`}>
                        {Array.from({ length: t.rating }).map((_, s) => (
                          <Star key={s} className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                        ))}
                      </div>
                    </div>
                  </div>
                  <blockquote className="border-l-4 border-red-500 pl-5 text-base italic leading-relaxed text-slate-200 sm:text-lg md:text-xl">
                    “{t.message}”
                  </blockquote>
                </div>
              </motion.div>
            )
          })}
        </div>

        <div className="mt-8 flex justify-center gap-2">
          {testimonials.map((t, i) => (
            <button
              key={t.person}
              type="button"
              onClick={() => setCurrent(i)}
              aria-label={`Show testimonial from ${t.person}`}
              aria-pressed={current === i}
              className={`h-2.5 rounded-full outline-none transition-all duration-300 focus-visible:ring-2 focus-visible:ring-red-500 ${
                current === i ? 'w-8 bg-red-600 shadow-[0_0_10px_rgba(220,38,38,0.8)]' : 'w-2.5 bg-white/20 hover:bg-white/40'
              }`}
            />
          ))}
        </div>
      </div>
    </section>
  )
}

/* ------------------------------------------------------------------ */
/*  CTA                                                                */
/* ------------------------------------------------------------------ */
const CTAButton3D = () => {
  const tilt = useTilt({ max: 18 })
  const [hover, setHover] = useState(false)
  const glare = useMotionTemplate`radial-gradient(circle at ${tilt.gx}% ${tilt.gy}%, rgba(255,255,255,0.55), transparent 55%)`

  return (
    <Link to="/contact" className="inline-block rounded-full outline-none focus-visible:ring-2 focus-visible:ring-red-400">
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
        <motion.span aria-hidden="true" className="pointer-events-none absolute inset-0 rounded-full" style={{ background: glare, z: 1 }} animate={{ opacity: hover ? 1 : 0 }} />
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
          className="relative flex items-center gap-2.5 whitespace-nowrap px-6 py-4 text-xs font-black uppercase tracking-[0.18em] text-white sm:px-8 sm:text-sm"
          style={{ transform: 'translateZ(20px)', textShadow: '0 2px 6px rgba(0,0,0,0.35)' }}
        >
          Start a Conversation
          <motion.span animate={{ x: hover ? 4 : 0 }} transition={SPRING}>
            <ArrowRight className="h-4 w-4" />
          </motion.span>
        </span>
      </motion.span>
    </Link>
  )
}

const CTASection = () => (
  <section className="mx-auto max-w-4xl px-4 pb-28 pt-8 sm:px-6">
    <motion.div
      initial={{ opacity: 0, y: 40, rotateX: -30 }}
      whileInView={{ opacity: 1, y: 0, rotateX: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.9, ease: EASE_OUT }}
      style={{ transformPerspective: 1200, transformOrigin: '50% 100%' }}
    >
      <TiltCard max={5} innerClassName="flex flex-col items-center gap-8 px-6 py-12 text-center sm:px-12 sm:py-16">
        <h3 className="font-serif text-3xl font-black tracking-tight text-white sm:text-4xl" style={{ textShadow: EXTRUDE_WHITE }}>
          Want your team on this <span style={{ color: RED, textShadow: EXTRUDE_RED }}>list?</span>
        </h3>
        <div style={{ transform: 'translateZ(40px)' }}>
          <CTAButton3D />
        </div>
      </TiltCard>
    </motion.div>
  </section>
)

/* ------------------------------------------------------------------ */
/*  PAGE                                                               */
/* ------------------------------------------------------------------ */
export default function Clients() {
  return (
    <div className="relative min-h-screen overflow-x-clip text-white">
      <div aria-hidden="true" className="pointer-events-none fixed inset-0 -z-20 bg-slate-950" />
      <ParallaxBackground image={backgroundImage} />

      <div className="relative z-10 w-full">
        <Hero />
        <StatsSection />
        {SHOW_SPONSORS && <PartnerMarquee data={sponsors} label="Our Sponsors" icon={Building} title="Backed By Our" accent="Sponsors" />}
        <PartnerMarquee data={clients} label="Trusted By" icon={Handshake} title="Our" accent="Partners" />
        <AnimatePresence>{SHOW_TESTIMONIALS && <TestimonialStack />}</AnimatePresence>
        <CTASection />
      </div>
    </div>
  )
}