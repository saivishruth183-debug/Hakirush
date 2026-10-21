import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import {
  motion,
  useMotionTemplate,
  useMotionValue,
  useReducedMotion,
  useScroll,
  useSpring,
  useTransform,
} from 'framer-motion'
import { Users, CheckCircle, ArrowRight, Sparkles, ArrowLeft, Handshake, RotateCcw, Zap } from 'lucide-react'
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
    key: 'co',
    icon: Users,
    title: 'Co-',
    subtitle: 'Prominent logo placement, shoutouts, and banners',
    details: {
      overview:
        'As a Co-Sponsor you share strong visibility across the event — great value for brands seeking broad exposure without exclusive naming rights.',
      whatYouGet: [
        'Logo placement on banners, selected jerseys and event screens',
        'Co-branding on social posts & PR materials',
        'On-field branding and shoutouts during ceremonies',
        'Shared sponsor stall and networking access',
      ],
      why: [
        'Cost-efficient reach for brand awareness',
        'Association with other premium corporate partners',
        'Solid visibility in both digital & on-ground media',
      ],
      ctaText: 'Become a Co-Sponsor',
    },
  },
]

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
/*  PARTNER PASS — holographic 3D sponsorship card that flips          */
/* ------------------------------------------------------------------ */
const PASS_DEPTH = 8

const PartnerPass = ({ sponsor }) => {
  const reduce = useReducedMotion()
  const tilt = useTilt({ max: 16 })
  const [hover, setHover] = useState(false)
  const [flipped, setFlipped] = useState(false)

  // holographic foil shifts with the cursor
  const foilX = useTransform(tilt.mx, [-0.5, 0.5], [0, 100])
  const foilY = useTransform(tilt.my, [-0.5, 0.5], [0, 100])
  const foil = useMotionTemplate`linear-gradient(115deg, transparent 20%, rgba(255,80,80,0.35) ${foilX}%, rgba(255,200,120,0.25) calc(${foilX}% + 8%), rgba(120,180,255,0.25) calc(${foilX}% + 16%), transparent 70%)`
  const shine = useMotionTemplate`radial-gradient(circle at ${tilt.gx}% ${foilY}%, rgba(255,255,255,0.45), transparent 45%)`

  const face = 'absolute inset-0 overflow-hidden rounded-[1.6rem] [backface-visibility:hidden]'
  const Icon = sponsor.icon

  return (
    <div className="mx-auto w-full max-w-[400px]" style={{ perspective: 1200 }}>
      <motion.div
        initial={{ opacity: 0, rotateY: -60, y: 40 }}
        animate={{ opacity: 1, rotateY: 0, y: 0 }}
        transition={{ duration: 1.1, delay: 0.3, ease: EASE_OUT }}
        style={{ transformStyle: 'preserve-3d' }}
      >
        {/* idle float */}
        <motion.div
          animate={reduce || hover ? { y: 0, rotateZ: 0 } : { y: [0, -10, 0], rotateZ: [-1.5, 1.5, -1.5] }}
          transition={reduce || hover ? { duration: 0.4 } : { duration: 6, repeat: Infinity, ease: 'easeInOut' }}
          style={{ transformStyle: 'preserve-3d' }}
        >
          <motion.div
            onMouseMove={tilt.onMouseMove}
            onMouseEnter={() => setHover(true)}
            onMouseLeave={() => {
              tilt.reset()
              setHover(false)
            }}
            style={{ rotateX: tilt.rotateX, rotateY: tilt.rotateY, transformStyle: 'preserve-3d' }}
          >
            <motion.div
              className="relative aspect-[1.586/1] w-full"
              style={{ transformStyle: 'preserve-3d' }}
              animate={{ rotateY: flipped ? 180 : 0 }}
              transition={{ duration: reduce ? 0 : 0.8, ease: EASE_OUT }}
            >
              {/* card thickness */}
              {Array.from({ length: PASS_DEPTH }).map((_, i) => (
                <span
                  key={i}
                  aria-hidden="true"
                  className="absolute inset-0 rounded-[1.6rem]"
                  style={{ transform: `translateZ(${-3.5 + i}px)`, background: i % 2 ? '#5a1010' : '#3b0a0a' }}
                />
              ))}

              {/* ---------- FRONT ---------- */}
              <div
                className={face}
                style={{
                  transform: 'translateZ(4px)',
                  pointerEvents: flipped ? 'none' : 'auto',
                  background: `linear-gradient(135deg, #2a0a0e 0%, ${RED_DARK} 45%, #12060a 100%)`,
                  boxShadow: `0 40px 80px -30px ${RED}aa`,
                }}
              >
                <span aria-hidden="true" className="pointer-events-none absolute inset-0 rounded-[1.6rem] ring-1 ring-inset ring-white/15" />
                <span
                  aria-hidden="true"
                  className="pointer-events-none absolute inset-0 opacity-[0.07]"
                  style={{ background: 'repeating-linear-gradient(135deg, #fff 0 1px, transparent 1px 10px)' }}
                />
                {/* holographic foil + shine */}
                <motion.span aria-hidden="true" className="pointer-events-none absolute inset-0" style={{ background: foil }} />
                <motion.span
                  aria-hidden="true"
                  className="pointer-events-none absolute inset-0"
                  style={{ background: shine }}
                  animate={{ opacity: hover ? 1 : 0.3 }}
                />

                <div className="relative flex h-full flex-col justify-between p-5 sm:p-6">
                  <div className="flex items-start justify-between">
                    <div>
                      <p className="text-[10px] font-black uppercase tracking-[0.35em] text-white/60">Hakirush</p>
                      <p className="mt-1 text-[9px] font-bold uppercase tracking-[0.3em] text-red-300/80">Partner Pass</p>
                    </div>
                    <span className="grid h-10 w-10 place-items-center rounded-xl bg-white/10 text-white ring-1 ring-white/20">
                      <Handshake className="h-5 w-5" />
                    </span>
                  </div>

                  {/* chip */}
                  <span
                    aria-hidden="true"
                    className="block h-8 w-11 rounded-md"
                    style={{
                      background: 'linear-gradient(135deg, #f5d28a, #c9a24a 50%, #f1d793)',
                      boxShadow: 'inset 0 0 0 1px rgba(0,0,0,0.25), inset 0 0 0 4px rgba(255,255,255,0.15)',
                    }}
                  />

                  <div className="flex items-end justify-between gap-3">
                    <div>
                      <p
                        className="font-serif text-3xl font-black leading-none text-white sm:text-4xl"
                        style={{ textShadow: '0 2px 0 #450a0a, 0 4px 0 #2a0606, 0 10px 20px rgba(0,0,0,0.5)' }}
                      >
                        {sponsor.title}Sponsor
                      </p>
                      <p className="mt-2 text-[10px] font-bold uppercase tracking-[0.25em] text-white/50">Strategic Partnership</p>
                    </div>
                    <span className="flex items-center gap-1 rounded-full bg-black/30 px-2.5 py-1 text-[9px] font-black uppercase tracking-[0.2em] text-white/80">
                      <RotateCcw className="h-3 w-3" /> Flip
                    </span>
                  </div>
                </div>

                <button
                  type="button"
                  onClick={() => setFlipped(true)}
                  tabIndex={flipped ? -1 : 0}
                  aria-label="Flip the partner pass to see what it covers"
                  className="absolute inset-0 z-10 cursor-pointer rounded-[1.6rem] outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-red-300"
                />
              </div>

              {/* ---------- BACK ---------- */}
              <div
                className={face}
                style={{
                  transform: 'rotateY(180deg) translateZ(4px)',
                  pointerEvents: flipped ? 'auto' : 'none',
                  background: 'linear-gradient(160deg, #161a24, #0b0d12 60%, #05070a)',
                  boxShadow: '0 40px 80px -30px rgba(0,0,0,0.9)',
                }}
              >
                <span aria-hidden="true" className="pointer-events-none absolute inset-0 rounded-[1.6rem] ring-1 ring-inset ring-white/10" />
                {/* magnetic strip */}
                <span aria-hidden="true" className="absolute inset-x-0 top-6 h-9 bg-black/80" />
                <div className="relative flex h-full flex-col justify-end gap-3 p-5 pt-20 sm:p-6 sm:pt-20">
                  <div className="flex items-center gap-3">
                    <span className="grid h-9 w-9 shrink-0 place-items-center rounded-lg bg-red-600 text-white shadow-[0_3px_0_#7f1d1d]">
                      <Icon className="h-4 w-4" />
                    </span>
                    <p className="text-sm font-bold leading-snug text-white sm:text-base">{sponsor.subtitle}</p>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="font-mono text-[10px] tracking-[0.3em] text-white/30">HKR • CO-SPONSOR</span>
                    <button
                      type="button"
                      onClick={() => setFlipped(false)}
                      tabIndex={flipped ? 0 : -1}
                      aria-label="Flip the pass back"
                      className="flex items-center gap-1 rounded-full bg-white/10 px-2.5 py-1 text-[9px] font-black uppercase tracking-[0.2em] text-white/80 outline-none transition hover:bg-white/20 focus-visible:ring-2 focus-visible:ring-red-300"
                    >
                      <RotateCcw className="h-3 w-3" /> Back
                    </button>
                  </div>
                </div>
              </div>
            </motion.div>
          </motion.div>
        </motion.div>
      </motion.div>

      {/* floor shadow */}
      <motion.div
        aria-hidden="true"
        className="mx-auto mt-8 h-6 w-3/4 rounded-[100%] blur-xl"
        style={{ background: `${RED}66` }}
        animate={reduce || hover ? { scaleX: 1, opacity: 0.8 } : { scaleX: [1, 0.85, 1], opacity: [0.8, 0.5, 0.8] }}
        transition={reduce || hover ? { duration: 0.4 } : { duration: 6, repeat: Infinity, ease: 'easeInOut' }}
      />
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
export default function SponsorGrid() {
  const s = SPONSORS[0]
  const tilt = useTilt({ max: 5 })

  const cards = [
    { label: 'Package Includes', badgeIcon: Sparkles, title: 'What You Get', icon: CheckCircle, items: s.details.whatYouGet },
    { label: 'Key Benefits', badgeIcon: Users, title: 'Why It Matters', icon: Zap, items: s.details.why },
  ]

  return (
    <div className="relative min-h-screen overflow-x-clip text-white">
      <ParallaxBackground image={backgroundImage} />

      <div className="relative z-10">
        {/* Back — sits below the fixed navbar */}
        <div className="mx-auto max-w-6xl px-4 pt-28 sm:px-6">
          <BackButton />
        </div>

        {/* HERO — headline + partner pass */}
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
                  <Handshake strokeWidth={0.6} className="h-72 w-72 sm:h-96 sm:w-96" />
                </span>

                <motion.div
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.7, ease: EASE_OUT }}
                  className="mb-8 inline-flex items-center gap-2 rounded-full border border-red-500/30 bg-red-950/40 px-5 py-2 shadow-[0_4px_0_rgba(0,0,0,0.5),0_12px_30px_-10px_rgba(220,38,38,0.5)] backdrop-blur-sm"
                  style={{ transform: 'translateZ(40px)' }}
                >
                  <Handshake className="h-4 w-4 text-red-400" />
                  <span className="text-[11px] font-black uppercase tracking-[0.25em] text-slate-100">Strategic Partnership</span>
                </motion.div>

                <h1
                  className="font-serif text-5xl font-black leading-[1.02] tracking-tight sm:text-6xl md:text-7xl"
                  style={{ transform: 'translateZ(70px)', transformStyle: 'preserve-3d' }}
                >
                  <span className="sr-only">{s.title}Sponsor</span>
                  <Letters3D text={s.title} color="#ffffff" extrude={EXTRUDE_WHITE} />
                  <Letters3D text="Sponsor" color={RED} extrude={EXTRUDE_RED} delay={0.15} />
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

            <PartnerPass sponsor={s} />
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
            <span className="mb-6 text-xs font-bold uppercase tracking-[0.3em] text-white/40">Ready to put your brand on the field?</span>
            <CTAButton href={FORM_URL}>{s.details.ctaText}</CTAButton>
            <span className="mt-5 text-xs text-white/35">Opens our sponsorship form in a new tab</span>
          </motion.div>
        </section>
      </div>
    </div>
  )
}