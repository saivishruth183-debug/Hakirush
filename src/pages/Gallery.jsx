import React, { useCallback, useEffect, useRef, useState } from 'react'
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
import { Camera, X, Play, ChevronLeft, ChevronRight, Film } from 'lucide-react'
import PageBackground from '../components/PageBackground'
import backgroundImage from '../assets/Hero/Backimage.png'

import Cricket from '../assets/Gallery/Annual/Cricket.mp4'
import Badminton from '../assets/Gallery/Annual/Badminton.mp4'
import Basketball from '../assets/Gallery/Quarterly/basketball.png'
import Ground from '../assets/Gallery/Quarterly/ground.png'
import Batemention from '../assets/Gallery/Quarterly/batemention.png'
import Celebration1 from '../assets/Gallery/Celebration/celeb1.JPG'
import Celebration2 from '../assets/Gallery/Celebration/celeb2.JPG'
import Celebration3 from '../assets/Gallery/Celebration/celeb3.JPG'
import Celebration4 from '../assets/Gallery/Celebration/celeb4.JPG'
import Behind1 from '../assets/Gallery/BehindTheSceans/behind1.JPG'
import Behind2 from '../assets/Gallery/BehindTheSceans/behind2.JPG'
import Behind3 from '../assets/Gallery/BehindTheSceans/behind3.JPG'
import PilotVideo from '../assets/Pilot/Video 1.mp4'

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
const galleryData = {
  annual: [
    { id: 1, type: 'video', img: Cricket },
    { id: 2, type: 'video', img: Badminton },
  ],
  quarterly: [
    { id: 4, type: 'image', img: Basketball },
    { id: 5, type: 'image', img: Ground },
    { id: 6, type: 'image', img: Batemention },
  ],
  celebration: [
    { id: 7, type: 'image', img: Celebration1 },
    { id: 8, type: 'image', img: Celebration2 },
    { id: 9, type: 'image', img: Celebration3 },
    { id: 13, type: 'image', img: Celebration4 },
  ],
  behindthescenes: [
    { id: 10, type: 'image', img: Behind1 },
    { id: 11, type: 'image', img: Behind2 },
    { id: 12, type: 'image', img: Behind3 },
  ],
}

const tabLabels = {
  annual: 'Annual Package',
  quarterly: 'Quarterly Package',
  celebration: 'Celebration',
  behindthescenes: 'Behind The Scenes',
}

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
      <motion.img src={image} alt="" style={{ x, y, scale }} className="h-full w-full object-cover object-center will-change-transform" />
      <div className="absolute inset-0 bg-linear-to-b from-slate-950/80 via-slate-950/65 to-slate-950/90" />
      <div className="absolute inset-0" style={{ background: `radial-gradient(ellipse at top, ${RED}26, transparent 60%)` }} />
    </div>
  )
}

/* ------------------------------------------------------------------ */
/*  LETTERS — flip up one by one, hop on hover                          */
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

/* ------------------------------------------------------------------ */
/*  HERO                                                               */
/* ------------------------------------------------------------------ */
const Hero = () => {
  const tilt = useTilt({ max: 6 })
  return (
    <section className="relative pb-10 pt-32 md:pt-36" onMouseMove={tilt.onMouseMove} onMouseLeave={tilt.reset}>
      <div className="mx-auto max-w-4xl px-6 text-center" style={{ perspective: 1200 }}>
        <motion.div style={{ rotateX: tilt.rotateX, rotateY: tilt.rotateY, transformStyle: 'preserve-3d' }} className="relative">
          {/* deep-set camera mark */}
          <span
            aria-hidden="true"
            className="pointer-events-none absolute left-1/2 -top-24 text-white/[0.05] sm:-top-32"
            style={{ transform: 'translateX(-50%) translateZ(-140px)' }}
          >
            <Camera strokeWidth={0.6} className="h-64 w-64 sm:h-96 sm:w-96" />
          </span>

          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease: EASE_OUT }}
            className="mb-8 inline-flex items-center gap-2 rounded-full border border-red-500/30 bg-red-950/40 px-5 py-1.5 shadow-[0_4px_0_rgba(0,0,0,0.5),0_12px_30px_-10px_rgba(220,38,38,0.5)] backdrop-blur-sm"
            style={{ transform: 'translateZ(40px)' }}
          >
            <span className="relative flex h-2 w-2">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-red-500 opacity-75" />
              <span className="relative inline-flex h-2 w-2 rounded-full bg-red-500" />
            </span>
            <span className="text-[10px] font-black uppercase tracking-[0.3em] text-white">Visual Memories</span>
          </motion.div>

          <h1
            className="font-serif text-5xl font-black leading-[1.05] tracking-tight sm:text-6xl md:text-7xl"
            style={{ transform: 'translateZ(70px)', transformStyle: 'preserve-3d' }}
          >
            <span className="sr-only">Event Gallery</span>
            <Letters3D text="Event" color="#ffffff" extrude={EXTRUDE_WHITE} />{' '}
            <Letters3D text="Gallery" color={RED} extrude={EXTRUDE_RED} delay={0.25} />
          </h1>

          <motion.div
            initial={{ scaleX: 0 }}
            animate={{ scaleX: 1 }}
            transition={{ duration: 0.8, delay: 0.7, ease: EASE_OUT }}
            className="mx-auto my-6 h-1 w-20 rounded-full"
            style={{ background: `linear-gradient(90deg, ${RED_DARK}, ${RED}, ${RED_LIGHT})`, boxShadow: `0 0 16px ${RED}` }}
          />

          <motion.p
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.9, duration: 0.7 }}
            className="mx-auto max-w-xl text-sm leading-relaxed text-slate-300 sm:text-base"
            style={{ transform: 'translateZ(30px)' }}
          >
            Relive the energy, passion, and competition from our corporate tournaments through stunning visual moments.
          </motion.p>
        </motion.div>
      </div>
    </section>
  )
}

/* ------------------------------------------------------------------ */
/*  TABS — sticky 3D segmented control                                 */
/* ------------------------------------------------------------------ */
const Tabs = ({ active, onChange }) => (
  <div className="sticky top-20 z-30 py-4">
    <div className="flex justify-center px-4">
      <div
        role="tablist"
        aria-label="Gallery categories"
        className="inline-flex max-w-full gap-1 overflow-x-auto rounded-2xl border border-white/10 bg-slate-950/75 p-1.5 shadow-[0_6px_0_rgba(0,0,0,0.55),0_20px_40px_-12px_rgba(0,0,0,0.8)] backdrop-blur-xl [scrollbar-width:none]"
      >
        {Object.keys(tabLabels).map((tab) => {
          const on = active === tab
          return (
            <button
              key={tab}
              role="tab"
              id={`tab-${tab}`}
              aria-selected={on}
              aria-controls="gallery-panel"
              onClick={() => onChange(tab)}
              className={`relative whitespace-nowrap rounded-xl px-3.5 py-2.5 text-xs font-bold outline-none transition-colors duration-300 focus-visible:ring-2 focus-visible:ring-red-500 sm:px-5 sm:text-sm ${
                on ? 'text-white' : 'text-slate-300 hover:text-white'
              }`}
            >
              {on && (
                <motion.span
                  layoutId="gallery-tab"
                  transition={SPRING}
                  className="absolute inset-0 rounded-xl ring-1 ring-inset ring-white/20 shadow-[0_4px_0_#7f1d1d,0_12px_24px_-8px_rgba(220,38,38,0.8)]"
                  style={{ background: `linear-gradient(135deg, ${RED_LIGHT}, ${RED} 45%, ${RED_DARK})` }}
                />
              )}
              <span className="relative z-10 flex items-center gap-2">
                {tabLabels[tab]}
                <span
                  className={`rounded-md px-1.5 py-0.5 text-[10px] font-black ${on ? 'bg-black/25 text-white' : 'bg-white/10 text-white/60'}`}
                >
                  {galleryData[tab].length}
                </span>
              </span>
            </button>
          )
        })}
      </div>
    </div>
  </div>
)

/* ------------------------------------------------------------------ */
/*  TILE — a thick 3D photo print that tilts toward the cursor          */
/* ------------------------------------------------------------------ */
const TILE_DEPTH = 5

const Tile = ({ item, idx, total, label, onOpen }) => {
  const reduce = useReducedMotion()
  const tilt = useTilt({ max: 12 })
  const [hover, setHover] = useState(false)
  const videoRef = useRef(null)
  const isVideo = item.type === 'video'
  const glare = useMotionTemplate`radial-gradient(circle at ${tilt.gx}% ${tilt.gy}%, rgba(255,255,255,0.28), transparent 50%)`

  // videos preview themselves on hover
  useEffect(() => {
    const v = videoRef.current
    if (!v) return
    if (hover && !reduce) v.play().catch(() => {})
    else v.pause()
  }, [hover, reduce])

  return (
    <motion.button
      type="button"
      onClick={onOpen}
      onMouseMove={tilt.onMouseMove}
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => {
        tilt.reset()
        setHover(false)
      }}
      onFocus={() => setHover(true)}
      onBlur={() => setHover(false)}
      aria-label={`Open ${isVideo ? 'video' : 'photo'} ${idx + 1} of ${total} — ${label}`}
      style={{ rotateX: tilt.rotateX, rotateY: tilt.rotateY, transformPerspective: 900, transformStyle: 'preserve-3d' }}
      animate={{ z: hover ? 30 : 0 }}
      transition={SPRING}
      className="relative block h-full w-full cursor-pointer rounded-2xl text-left outline-none focus-visible:ring-2 focus-visible:ring-red-500 focus-visible:ring-offset-2 focus-visible:ring-offset-slate-950"
    >
      {/* print thickness */}
      {Array.from({ length: TILE_DEPTH }).map((_, i) => (
        <span
          key={i}
          aria-hidden="true"
          className="absolute inset-0 rounded-2xl"
          style={{ transform: `translateZ(${-(i + 1) * 2}px)`, background: i % 2 ? '#1a1d26' : '#0b0d12' }}
        />
      ))}

      {/* photo face */}
      <span
        className="absolute inset-0 block overflow-hidden rounded-2xl border bg-slate-900 transition-[border-color,box-shadow] duration-500"
        style={{
          borderColor: hover ? `${RED}aa` : 'rgba(255,255,255,0.1)',
          boxShadow: hover ? `0 30px 60px -20px ${RED}66` : '0 18px 40px -20px rgba(0,0,0,0.9)',
        }}
      >
        {isVideo ? (
          <video
            ref={videoRef}
            src={item.img}
            className={`h-full w-full object-cover transition-transform duration-[900ms] ease-out ${hover ? 'scale-[1.08]' : 'scale-100'}`}
            preload="metadata"
            muted
            loop
            playsInline
          />
        ) : (
          <img
            src={item.img}
            alt=""
            loading="lazy"
            className={`h-full w-full object-cover transition-transform duration-[900ms] ease-out ${hover ? 'scale-[1.08]' : 'scale-100'}`}
          />
        )}
        <span
          className={`absolute inset-0 bg-linear-to-t from-slate-950/85 via-slate-950/0 to-slate-950/0 transition-opacity duration-500 ${
            hover ? 'opacity-100' : 'opacity-70'
          }`}
        />
        <motion.span
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 mix-blend-overlay"
          style={{ background: glare }}
          animate={{ opacity: hover ? 1 : 0 }}
        />
      </span>

      {/* info floats above the print */}
      <span
        className="pointer-events-none absolute inset-x-0 bottom-0 flex items-center gap-2 p-4"
        style={{ transform: 'translateZ(30px)' }}
      >
        <span
          className={`grid h-9 w-9 place-items-center rounded-full border shadow-[0_4px_0_rgba(0,0,0,0.5)] backdrop-blur-md transition-colors duration-300 ${
            hover ? 'border-red-400/60 bg-red-600 text-white' : 'border-white/20 bg-white/15 text-white'
          }`}
        >
          {isVideo ? <Play className="h-3.5 w-3.5" fill="currentColor" /> : <Camera className="h-3.5 w-3.5" />}
        </span>
        <span
          className={`text-xs font-semibold tracking-wide text-slate-100 transition-all duration-300 ${
            hover ? 'translate-y-0 opacity-100' : 'translate-y-1 opacity-0'
          }`}
        >
          {label}
        </span>
      </span>

      {isVideo && (
        <span
          className="pointer-events-none absolute left-3 top-3 flex items-center gap-1.5 rounded-full bg-black/60 px-2.5 py-1 text-[9px] font-black uppercase tracking-[0.2em] text-white backdrop-blur-sm"
          style={{ transform: 'translateZ(24px)' }}
        >
          <Film className="h-3 w-3 text-red-400" /> Video
        </span>
      )}
    </motion.button>
  )
}

/* ------------------------------------------------------------------ */
/*  LIGHTBOX — full screen viewer with 3D page-turn between items       */
/* ------------------------------------------------------------------ */
const turn = {
  enter: (dir) => ({ opacity: 0, rotateY: dir > 0 ? 65 : dir < 0 ? -65 : 0, x: dir * 120, scale: 0.9 }),
  center: { opacity: 1, rotateY: 0, x: 0, scale: 1 },
  exit: (dir) => ({ opacity: 0, rotateY: dir > 0 ? -65 : dir < 0 ? 65 : 0, x: -dir * 120, scale: 0.9 }),
}

const Lightbox = ({ items, index, dir, label, onClose, onStep }) => {
  const reduce = useReducedMotion()
  const closeRef = useRef(null)
  const item = items[index]

  // lock page scroll, move focus in, restore focus on close
  useEffect(() => {
    const prevFocus = document.activeElement
    const prevOverflow = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    closeRef.current?.focus()
    return () => {
      document.body.style.overflow = prevOverflow
      prevFocus?.focus?.()
    }
  }, [])

  useEffect(() => {
    const onKey = (e) => {
      if (e.key === 'Escape') onClose()
      if (e.key === 'ArrowLeft') onStep(-1)
      if (e.key === 'ArrowRight') onStep(1)
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [onClose, onStep])

  const NavBtn = ({ d, children, className }) => (
    <button
      type="button"
      onClick={(e) => {
        e.stopPropagation()
        onStep(d)
      }}
      aria-label={d < 0 ? 'Previous' : 'Next'}
      className={`absolute top-1/2 z-20 grid h-12 w-12 -translate-y-1/2 place-items-center rounded-full border border-white/15 bg-white/10 text-white shadow-[0_4px_0_rgba(0,0,0,0.6)] outline-none transition hover:border-red-500/60 hover:bg-red-600 focus-visible:ring-2 focus-visible:ring-red-500 ${className}`}
    >
      {children}
    </button>
  )

  return (
    <motion.div
      role="dialog"
      aria-modal="true"
      aria-label={`${label} viewer`}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-[200] flex items-center justify-center bg-slate-950/95 p-4 backdrop-blur-md"
      onClick={onClose}
    >
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0"
        style={{ background: `radial-gradient(ellipse at center, ${RED}22, transparent 60%)` }}
      />

      <button
        ref={closeRef}
        type="button"
        onClick={onClose}
        aria-label="Close"
        className="absolute right-5 top-5 z-20 grid h-12 w-12 place-items-center rounded-full border border-white/15 bg-white/10 text-white shadow-[0_4px_0_rgba(0,0,0,0.6)] outline-none transition hover:border-red-500/60 hover:bg-red-600 focus-visible:ring-2 focus-visible:ring-red-500"
      >
        <X className="h-5 w-5" />
      </button>

      {items.length > 1 && (
        <>
          <NavBtn d={-1} className="left-3 sm:left-8">
            <ChevronLeft className="h-5 w-5" />
          </NavBtn>
          <NavBtn d={1} className="right-3 sm:right-8">
            <ChevronRight className="h-5 w-5" />
          </NavBtn>
        </>
      )}

      <div className="flex max-w-[92vw] flex-col items-center" style={{ perspective: 1600 }} onClick={(e) => e.stopPropagation()}>
        <AnimatePresence mode="wait" custom={dir} initial={true}>
          <motion.div
            key={item.id}
            custom={dir}
            variants={reduce ? undefined : turn}
            initial={reduce ? false : 'enter'}
            animate="center"
            exit={reduce ? undefined : 'exit'}
            transition={{ duration: 0.4, ease: EASE_OUT }}
            drag={items.length > 1 ? 'x' : false}
            dragConstraints={{ left: 0, right: 0 }}
            dragElastic={0.35}
            onDragEnd={(_, info) => {
              if (info.offset.x < -80) onStep(1)
              else if (info.offset.x > 80) onStep(-1)
            }}
            className="relative"
            style={{ transformStyle: 'preserve-3d' }}
          >
            {item.type === 'video' ? (
              <video
                src={item.img}
                controls
                autoPlay
                playsInline
                className="max-h-[78vh] max-w-[92vw] rounded-2xl border border-white/10 shadow-[0_40px_80px_-20px_rgba(0,0,0,0.9)]"
              />
            ) : (
              <img
                src={item.img}
                alt={`${label} event photo ${index + 1}`}
                draggable="false"
                className="max-h-[78vh] max-w-[92vw] select-none rounded-2xl border border-white/10 shadow-[0_40px_80px_-20px_rgba(0,0,0,0.9)]"
              />
            )}
          </motion.div>
        </AnimatePresence>

        <div className="mt-5 flex items-center gap-3 text-xs tracking-wide text-slate-300">
          <span className="font-bold text-red-400">{label}</span>
          <span className="h-1 w-1 rounded-full bg-slate-500" />
          <span aria-live="polite">
            {index + 1} / {items.length}
          </span>
        </div>
      </div>
    </motion.div>
  )
}

/* ------------------------------------------------------------------ */
/*  PILOT VIDEO — a 3D screen that straightens up as you scroll to it   */
/* ------------------------------------------------------------------ */
const PilotScreen = () => {
  const ref = useRef(null)
  const reduce = useReducedMotion()
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start end', 'center center'] })
  const rotateX = useTransform(scrollYProgress, [0, 1], [reduce ? 0 : 32, 0])
  const scale = useTransform(scrollYProgress, [0, 1], [reduce ? 1 : 0.86, 1])
  const glow = useTransform(scrollYProgress, [0.4, 1], [0, 1])

  return (
    <div ref={ref} style={{ perspective: 1400 }}>
      <motion.div
        style={{ rotateX, scale, transformStyle: 'preserve-3d', transformOrigin: '50% 100%' }}
        className="relative mx-auto max-w-4xl"
      >
        {/* ambient light spill */}
        <motion.div
          aria-hidden="true"
          className="pointer-events-none absolute -inset-10 rounded-[48px] blur-3xl"
          style={{ opacity: glow, background: `radial-gradient(ellipse, ${RED}55, transparent 70%)`, transform: 'translateZ(-80px)' }}
        />

        {/* screen thickness */}
        {Array.from({ length: 7 }).map((_, i) => (
          <span
            key={i}
            aria-hidden="true"
            className="absolute inset-0 rounded-[28px]"
            style={{ transform: `translateZ(${-(i + 1) * 2.5}px)`, background: i % 2 ? '#1a1d26' : '#0b0d12' }}
          />
        ))}

        {/* bezel + video */}
        <div
          className="relative rounded-[28px] border border-white/10 p-2 shadow-[0_40px_80px_-30px_rgba(0,0,0,0.9)] sm:p-3"
          style={{ background: 'linear-gradient(160deg, #1a1d26, #0b0d12)' }}
        >
          <span
            aria-hidden="true"
            className="pointer-events-none absolute inset-x-12 top-0 h-[2px] rounded-full"
            style={{ background: `linear-gradient(90deg, transparent, ${RED}, transparent)`, boxShadow: `0 0 14px ${RED}` }}
          />
          <video src={PilotVideo} controls preload="metadata" playsInline className="max-h-[620px] w-full rounded-[20px] bg-black">
            Your browser does not support the video tag.
          </video>
        </div>

        {/* floating label */}
        <span
          className="absolute -top-4 left-6 flex items-center gap-2 rounded-full border border-red-500/40 bg-red-950/80 px-3 py-1.5 text-[10px] font-black uppercase tracking-[0.25em] text-white shadow-[0_4px_0_rgba(0,0,0,0.6)] backdrop-blur-md"
          style={{ transform: 'translateZ(40px)' }}
        >
          <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-red-500" />
          Pilot Event
        </span>
      </motion.div>
    </div>
  )
}

/* ------------------------------------------------------------------ */
/*  PAGE                                                               */
/* ------------------------------------------------------------------ */
const GalleryPage = () => {
  const reduce = useReducedMotion()
  const [activeTab, setActiveTab] = useState('annual')
  const [[lbIndex, lbDir], setLightbox] = useState([null, 0])

  const items = galleryData[activeTab]
  const label = tabLabels[activeTab]

  const close = useCallback(() => setLightbox([null, 0]), [])
  const stepLightbox = useCallback(
    (d) => setLightbox(([i]) => [(i + d + items.length) % items.length, d]),
    [items.length]
  )

  return (
    // overflow-x-clip (not overflow-hidden) so the sticky tab bar keeps working
    <div className="relative min-h-screen overflow-x-clip font-sans text-white">
      <PageBackground />
      <ParallaxBackground image={backgroundImage} />

      <div className="relative z-10">
        <Hero />
        <Tabs active={activeTab} onChange={setActiveTab} />

        {/* GRID */}
        <section className="pb-10 pt-6">
          <div className="mx-auto max-w-7xl px-4 sm:px-6">
            <div role="tabpanel" id="gallery-panel" aria-labelledby={`tab-${activeTab}`}>
              <AnimatePresence mode="wait">
                <motion.div
                  key={activeTab}
                  exit={{ opacity: 0, transition: { duration: 0.2 } }}
                  className="grid auto-rows-[200px] grid-cols-2 gap-4 sm:auto-rows-[220px] sm:gap-6 md:grid-cols-3 lg:grid-cols-4"
                >
                  {items.map((item, idx) => {
                    const isFeature = idx === 0 && items.length > 2
                    return (
                      <motion.div
                        key={item.id}
                        initial={reduce ? false : { opacity: 0, rotateX: -55, y: 40 }}
                        animate={{ opacity: 1, rotateX: 0, y: 0 }}
                        transition={{ delay: idx * 0.08, duration: 0.7, ease: EASE_OUT }}
                        style={{ transformPerspective: 1000, transformOrigin: '50% 100%' }}
                        className={isFeature ? 'col-span-2 row-span-2' : ''}
                      >
                        <Tile
                          item={item}
                          idx={idx}
                          total={items.length}
                          label={label}
                          onOpen={() => setLightbox([idx, 0])}
                        />
                      </motion.div>
                    )
                  })}
                </motion.div>
              </AnimatePresence>
            </div>
          </div>
        </section>

        {/* FEATURED PILOT VIDEO */}
        <section className="px-4 py-20 sm:px-6">
          <div className="mx-auto max-w-5xl">
            <div className="mb-14 text-center">
              <span className="text-[11px] font-black uppercase tracking-[0.25em] text-red-400">Featured</span>
              <motion.h2
                initial={{ opacity: 0, y: 30, rotateX: -50 }}
                whileInView={{ opacity: 1, y: 0, rotateX: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, ease: EASE_OUT }}
                style={{ transformPerspective: 800, transformOrigin: '50% 100%', textShadow: EXTRUDE_WHITE }}
                className="mt-3 font-serif text-3xl font-black tracking-tight text-white sm:text-4xl md:text-5xl"
              >
                Our Pilot Event <span style={{ color: RED, textShadow: EXTRUDE_RED }}>Highlight</span>
              </motion.h2>
              <p className="mx-auto mt-4 max-w-xl text-sm leading-relaxed text-slate-400 sm:text-base">
                Watch the highlights from our pilot event below — the best moments from the opening showcase.
              </p>
            </div>

            <PilotScreen />
          </div>
        </section>
      </div>

      <AnimatePresence>
        {lbIndex !== null && (
          <Lightbox items={items} index={lbIndex} dir={lbDir} label={label} onClose={close} onStep={stepLightbox} />
        )}
      </AnimatePresence>
    </div>
  )
}

export default GalleryPage