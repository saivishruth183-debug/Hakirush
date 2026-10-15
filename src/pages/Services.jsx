import React, { useEffect, useState } from 'react'
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
import { Star, CalendarDays, ArrowRight, Zap, Trophy, MessageCircle } from 'lucide-react'
import PageBackground from '../components/PageBackground'
import backgroundImage from '../assets/Hero/Backimage.png'

/* ------------------------------------------------------------------ */
/*  DESIGN TOKENS — same red system as Navbar, Footer and About        */
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
/*  PACKAGES                                                           */
/* ------------------------------------------------------------------ */
const PACKAGES = [
  {
    to: '/services/annualpackage',
    number: '01',
    icon: CalendarDays,
    title: 'Annual Subscription',
    description: '12 months of unlimited sports events, premium networking, and team building activities.',
    featured: true,
    badge: 'Most Preferred',
  },
  {
    to: '/services/quarterly',
    number: '02',
    icon: Trophy,
    title: 'Quarterly League',
    description: "High-energy competitive events every 3 months. Perfect for testing your team's spirit.",
    featured: false,
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
/*  3D BUILDING BLOCKS                                                 */
/* ------------------------------------------------------------------ */

// Letters flip up one by one, then hop on hover. Words never break mid-word.
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
                  transition={{ delay: delay + i * 0.04, duration: 0.7, ease: EASE_OUT }}
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

// Extruded icon tile
const IconTile = ({ icon: Icon, size = 80, featured = true }) => (
  <span className="relative block shrink-0" style={{ width: size, height: size, transformStyle: 'preserve-3d' }}>
    {Array.from({ length: 8 }).map((_, i) => (
      <span
        key={i}
        aria-hidden="true"
        className="absolute inset-0 rounded-3xl"
        style={{
          transform: `translateZ(${-(i + 1) * 2}px)`,
          background: featured ? RED_DARK : '#1a1d26',
          filter: `brightness(${0.9 - i * 0.08})`,
        }}
      />
    ))}
    <span
      aria-hidden="true"
      className="absolute inset-0 rounded-3xl ring-1 ring-inset ring-white/20"
      style={{
        background: featured
          ? `linear-gradient(145deg, ${RED_LIGHT}, ${RED} 45%, ${RED_DARK})`
          : 'linear-gradient(145deg, #2a2f3d, #151925 60%, #0b0d12)',
      }}
    />
    <span
      aria-hidden="true"
      className="absolute inset-x-1.5 top-0 h-1/2 rounded-t-3xl bg-linear-to-b from-white/30 to-transparent"
      style={{ transform: 'translateZ(1px)' }}
    />
    <span
      className="absolute inset-0 grid place-items-center"
      style={{ transform: 'translateZ(16px)', color: featured ? '#fff' : RED_LIGHT }}
    >
      <Icon size={Math.round(size * 0.46)} strokeWidth={2} />
    </span>
  </span>
)

// Thick 3D button face (the whole card is the link, so this is a visual)
const SlabButton = ({ hover, featured }) => (
  <motion.span
    className="relative inline-block"
    style={{ transformStyle: 'preserve-3d' }}
    animate={{ z: hover ? 14 : 0 }}
    transition={SPRING}
  >
    {Array.from({ length: 6 }).map((_, i) => (
      <span
        key={i}
        aria-hidden="true"
        className="absolute inset-0 rounded-2xl"
        style={{
          transform: `translateZ(${-(i + 1) * 2}px)`,
          background: featured ? '#7f1d1d' : '#1a1d26',
          filter: `brightness(${0.95 - i * 0.1})`,
        }}
      />
    ))}
    <span
      aria-hidden="true"
      className={`absolute inset-0 rounded-2xl ring-1 ring-inset transition-colors duration-300 ${
        featured ? 'ring-white/25' : hover ? 'ring-red-500' : 'ring-red-500/50'
      }`}
      style={{
        background: featured ? `linear-gradient(135deg, ${RED_LIGHT}, ${RED} 45%, ${RED_DARK})` : hover ? '#1f0a0d' : '#0f1219',
      }}
    />
    <span
      aria-hidden="true"
      className="absolute inset-x-2 top-0 h-1/2 rounded-t-2xl bg-linear-to-b from-white/25 to-transparent"
      style={{ transform: 'translateZ(1px)' }}
    />
    <span
      className="relative flex items-center gap-3 px-8 py-4 font-bold text-white"
      style={{ transform: 'translateZ(14px)', textShadow: '0 2px 6px rgba(0,0,0,0.35)' }}
    >
      Explore Details
      <motion.span animate={{ x: hover ? 5 : 0 }} transition={SPRING}>
        <ArrowRight className="h-5 w-5" />
      </motion.span>
    </span>
  </motion.span>
)

// "Most Preferred" tag — a small 3D slab that floats above the card
const BadgeTag = ({ children }) => {
  const reduce = useReducedMotion()
  return (
    <motion.div
      className="absolute -top-5 right-8 z-20 sm:right-10"
      style={{ transform: 'translateZ(80px)', transformStyle: 'preserve-3d' }}
    >
      <motion.div
        animate={reduce ? undefined : { rotate: [-2, 2, -2], y: [0, -3, 0] }}
        transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
        className="relative"
        style={{ transformStyle: 'preserve-3d' }}
      >
        {Array.from({ length: 4 }).map((_, i) => (
          <span
            key={i}
            aria-hidden="true"
            className="absolute inset-0 rounded-full bg-red-950"
            style={{ transform: `translateZ(${-(i + 1) * 2}px)` }}
          />
        ))}
        <span
          aria-hidden="true"
          className="absolute inset-0 rounded-full ring-1 ring-inset ring-white/25 shadow-[0_12px_30px_-6px_rgba(220,38,38,0.8)]"
          style={{ background: `linear-gradient(135deg, ${RED}, ${RED_DARK})` }}
        />
        <span className="relative flex items-center gap-2 px-4 py-2 text-[10px] font-black uppercase tracking-widest text-white">
          <Zap className="h-3 w-3 fill-yellow-300 text-yellow-300" />
          {children}
        </span>
      </motion.div>
    </motion.div>
  )
}

/* ------------------------------------------------------------------ */
/*  PACKAGE PASS — the 3D card                                         */
/* ------------------------------------------------------------------ */
const CARD_DEPTH = 8

const PackagePass = ({ pkg, index }) => {
  const reduce = useReducedMotion()
  const tilt = useTilt({ max: 9 })
  const [hover, setHover] = useState(false)
  const { featured } = pkg
  const glare = useMotionTemplate`radial-gradient(600px circle at ${tilt.gx}% ${tilt.gy}%, ${
    featured ? 'rgba(248,113,113,0.22)' : 'rgba(255,255,255,0.10)'
  }, transparent 45%)`

  const fromLeft = index === 0

  return (
    <motion.div
      initial={{ opacity: 0, y: 60, rotateX: -30, rotateY: fromLeft ? 25 : -25 }}
      whileInView={{ opacity: 1, y: 0, rotateX: 0, rotateY: 0 }}
      viewport={{ once: true, margin: '-60px' }}
      transition={{ duration: 1, delay: index * 0.12, ease: EASE_OUT }}
      style={{ transformPerspective: 1400 }}
      className="w-full lg:w-1/2"
    >
      <Link
        to={pkg.to}
        aria-label={`${pkg.title} — explore details`}
        onMouseMove={tilt.onMouseMove}
        onMouseEnter={() => setHover(true)}
        onMouseLeave={() => {
          tilt.reset()
          setHover(false)
        }}
        onFocus={() => setHover(true)}
        onBlur={() => setHover(false)}
        className="block h-full rounded-[2.5rem] outline-none focus-visible:ring-2 focus-visible:ring-red-500 focus-visible:ring-offset-4 focus-visible:ring-offset-slate-950"
      >
        <motion.div
          style={{ rotateX: tilt.rotateX, rotateY: tilt.rotateY, transformPerspective: 1200, transformStyle: 'preserve-3d' }}
          animate={{ y: hover ? -10 : 0 }}
          transition={SPRING}
          className="relative h-full min-h-[440px]"
        >
          {/* card thickness */}
          {Array.from({ length: CARD_DEPTH }).map((_, i) => (
            <span
              key={i}
              aria-hidden="true"
              className="absolute inset-0 rounded-[2.5rem]"
              style={{
                transform: `translateZ(${-(i + 1) * 2.5}px)`,
                background: featured ? RED_DARK : '#0b0d12',
                filter: `brightness(${0.85 - i * 0.08})`,
              }}
            />
          ))}

          {/* animated light rim on the featured card */}
          {featured && (
            <span aria-hidden="true" className="absolute -inset-[2px] overflow-hidden rounded-[2.6rem]">
              <motion.span
                className="absolute left-1/2 top-1/2 h-[220%] w-[220%]"
                style={{
                  x: '-50%',
                  y: '-50%',
                  background: `conic-gradient(from 0deg, transparent 0 55%, ${RED_LIGHT}, ${RED}, transparent 85%)`,
                }}
                animate={reduce ? undefined : { rotate: 360 }}
                transition={{ duration: 6, repeat: Infinity, ease: 'linear' }}
              />
            </span>
          )}

          {/* face */}
          <span
            aria-hidden="true"
            className="absolute inset-0 rounded-[2.5rem] border border-white/10"
            style={{
              background: featured
                ? 'linear-gradient(160deg, #1f0a0e, #0b0d12 55%, #05070a)'
                : 'linear-gradient(160deg, #161a26, #0b0d12 60%, #05070a)',
              boxShadow: hover
                ? `0 40px 80px -30px ${featured ? 'rgba(220,38,38,0.6)' : 'rgba(0,0,0,0.9)'}`
                : '0 30px 60px -30px rgba(0,0,0,0.9)',
            }}
          />

          {/* fine diagonal texture */}
          <span
            aria-hidden="true"
            className="absolute inset-0 rounded-[2.5rem] opacity-[0.04]"
            style={{ background: 'repeating-linear-gradient(135deg, #fff 0 1px, transparent 1px 14px)' }}
          />

          {/* red top edge */}
          <span
            aria-hidden="true"
            className="absolute inset-x-10 top-0 h-[3px] rounded-full"
            style={{ background: `linear-gradient(90deg, transparent, ${RED}, transparent)`, boxShadow: `0 0 14px ${RED}` }}
          />

          {/* corner glow */}
          <span
            aria-hidden="true"
            className="absolute right-0 top-0 h-64 w-64 rounded-full blur-[80px] transition-transform duration-700"
            style={{ background: `${RED}${featured ? '40' : '1f'}`, transform: hover ? 'scale(1.5)' : 'scale(1)' }}
          />

          {/* moving light */}
          <motion.span
            aria-hidden="true"
            className="absolute inset-0 rounded-[2.5rem]"
            style={{ background: glare }}
            animate={{ opacity: hover ? 1 : 0 }}
          />

          {featured && pkg.badge && <BadgeTag>{pkg.badge}</BadgeTag>}

          {/* content floats above the face */}
          <div
            className="relative flex h-full flex-col items-center px-8 py-12 text-center sm:px-12 md:py-16"
            style={{ transform: 'translateZ(40px)', transformStyle: 'preserve-3d' }}
          >
            <span
              aria-hidden="true"
              className="absolute right-8 top-6 select-none font-serif text-6xl font-black"
              style={{
                color: featured ? '#200b0f' : '#161a24',
                textShadow: '0 1px 0 #2a0909, 0 2px 0 #220707, 0 3px 0 #1a0505, 0 4px 0 #120404',
                transform: 'translateZ(-20px)',
              }}
            >
              {pkg.number}
            </span>

            <motion.div
              className="mb-8"
              style={{ transformStyle: 'preserve-3d' }}
              animate={{
                z: hover ? 50 : 0,
                rotateY: hover && !reduce ? 360 : 0,
                y: reduce ? 0 : hover ? -4 : [0, -6, 0],
              }}
              transition={{
                z: SPRING,
                rotateY: { duration: 0.9, ease: EASE_OUT },
                y: hover || reduce ? SPRING : { duration: 3.5, repeat: Infinity, ease: 'easeInOut' },
              }}
            >
              <IconTile icon={pkg.icon} featured={featured} />
            </motion.div>

            <h3
              className="mb-4 font-serif text-3xl font-black text-white md:text-4xl"
              style={{ textShadow: featured ? EXTRUDE_RED : EXTRUDE_WHITE, transform: 'translateZ(20px)' }}
            >
              {pkg.title}
            </h3>

            <p className="mx-auto mb-10 max-w-sm font-medium leading-relaxed text-slate-300">{pkg.description}</p>

            <div className="mt-auto" style={{ transform: 'translateZ(30px)', transformStyle: 'preserve-3d' }}>
              <SlabButton hover={hover} featured={featured} />
            </div>
          </div>
        </motion.div>
      </Link>
    </motion.div>
  )
}

/* ------------------------------------------------------------------ */
/*  DIVIDER — moving 3D kit stripe                                     */
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
/*  PAGE                                                               */
/* ------------------------------------------------------------------ */
const Package = () => {
  const tilt = useTilt({ max: 6 })

  return (
    <div className="relative min-h-screen overflow-hidden text-white">
      <PageBackground />
      <ParallaxBackground image={backgroundImage} />

      <div className="relative z-10 mx-auto max-w-6xl px-4 pb-24 pt-32 sm:px-6 md:pt-36">
        {/* HEADER — tilts gently with the mouse, layers at different depths */}
        <div onMouseMove={tilt.onMouseMove} onMouseLeave={tilt.reset} style={{ perspective: 1200 }}>
          <motion.div
            style={{ rotateX: tilt.rotateX, rotateY: tilt.rotateY, transformStyle: 'preserve-3d' }}
            className="relative mb-4 text-center"
          >
            <span
              aria-hidden="true"
              className="pointer-events-none absolute left-1/2 -top-14 select-none font-serif text-[9rem] font-black leading-none tracking-tighter sm:-top-20 sm:text-[13rem] md:text-[16rem]"
              style={{
                transform: 'translateX(-50%) translateZ(-140px)',
                color: 'transparent',
                WebkitTextStroke: '2px rgba(255,255,255,0.07)',
                textShadow: '0 0 60px rgba(220,38,38,0.15)',
              }}
            >
              VIP
            </span>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, ease: EASE_OUT }}
              className="mb-6 inline-flex items-center gap-2 rounded-full border border-red-500/30 bg-red-950/40 px-4 py-1.5 shadow-[0_4px_0_rgba(0,0,0,0.5),0_12px_30px_-10px_rgba(220,38,38,0.5)] backdrop-blur-sm"
              style={{ transform: 'translateZ(40px)' }}
            >
              <Star className="h-3.5 w-3.5 text-red-400" fill="currentColor" />
              <span className="text-[10px] font-black uppercase tracking-[0.3em] text-white">Premium Tiers</span>
            </motion.div>

            <h1
              className="mb-6 font-serif text-4xl font-black leading-[1.05] tracking-tight sm:text-5xl md:text-6xl"
              style={{ transform: 'translateZ(70px)', transformStyle: 'preserve-3d' }}
            >
              <span className="sr-only">Choose Your Perfect Package</span>
              <Letters3D text="Choose Your" color="#ffffff" extrude={EXTRUDE_WHITE} />{' '}
              <Letters3D text="Perfect Package" color={RED} extrude={EXTRUDE_RED} delay={0.35} />
            </h1>

            <motion.div
              initial={{ scaleX: 0 }}
              animate={{ scaleX: 1 }}
              transition={{ duration: 0.8, delay: 0.9, ease: EASE_OUT }}
              className="mx-auto mb-6 h-1 w-20 rounded-full"
              style={{ background: `linear-gradient(90deg, ${RED_DARK}, ${RED}, ${RED_LIGHT})`, boxShadow: `0 0 16px ${RED}` }}
            />

            <motion.p
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1, duration: 0.7 }}
              className="mx-auto max-w-2xl text-lg font-medium text-slate-300"
              style={{ transform: 'translateZ(30px)' }}
            >
              Elevate your company culture through high-energy corporate tournaments and exclusive sporting experiences.
            </motion.p>
          </motion.div>
        </div>

        <StripeDivider />

        {/* PACKAGE CARDS */}
        <div className="mt-10 flex flex-col items-stretch justify-center gap-12 lg:flex-row lg:gap-10">
          {PACKAGES.map((pkg, i) => (
            <PackagePass key={pkg.to} pkg={pkg} index={i} />
          ))}
        </div>

        {/* gentle nudge for undecided visitors */}
        <motion.p
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mt-14 text-center text-sm font-medium text-slate-400"
        >
          Not sure which one fits your team?{' '}
          <Link
            to="/contact"
            className="group inline-flex items-center gap-1.5 font-bold text-red-400 outline-none transition-colors hover:text-red-300 focus-visible:underline"
          >
            <MessageCircle className="h-4 w-4" />
            Talk to us
            <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-1" />
          </Link>
        </motion.p>
      </div>
    </div>
  )
}

export default Package