import React, { useEffect, useRef, useState } from 'react'
import axios from 'axios'
import Swal from 'sweetalert2'
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
import {
  Mail,
  Phone,
  MapPin,
  Clock,
  Send,
  MessageSquare,
  Linkedin,
  Instagram,
  Youtube,
  Facebook,
  Copy,
  Check,
  ExternalLink,
  Navigation,
} from 'lucide-react'
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

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
const API_URL = (import.meta.env.VITE_API_URL || '').replace(/\/$/, '')
const REQUEST_TIMEOUT_MS = 20000

const EXTRUDE_WHITE =
  '0 1px 0 #3a0c0c, 0 2px 0 #320a0a, 0 3px 0 #2a0909, 0 4px 0 #220707, 0 5px 0 #1a0505, 0 6px 0 #120404, 0 18px 30px rgba(0,0,0,0.6)'
const EXTRUDE_RED =
  '0 1px 0 #7f1d1d, 0 2px 0 #6b1818, 0 3px 0 #571313, 0 4px 0 #430f0f, 0 5px 0 #2f0a0a, 0 6px 0 #1f0606, 0 18px 34px rgba(220,38,38,0.35)'

/* ------------------------------------------------------------------ */
/*  CONTENT                                                            */
/* ------------------------------------------------------------------ */
const contactDetails = {
  email: 'admin@hakirush.com',
  phone: '+91 7997110210',
  whatsapp: '+91 7997110210',
  address:
    'No. 472/7 Balaji Arcade, A.V.S. Compound, 20th L Cross Road, AVS Layout, Ejipura, Koramangala, Bengaluru, Karnataka -560095',
  hours: 'Mon-Fri: 9:00 AM - 6:00 PM',
}

const MAPS_LINK = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(contactDetails.address)}`

const XIcon = ({ size = 18 }) => (
  <svg viewBox="0 0 1200 1227" width={size} height={size} fill="currentColor" aria-hidden="true">
    <path d="M714.2 519.1L1160.9 0H1055.7L667.1 450.2L358.1 0H0L468.6 681.8L0 1226.4H105.3L515.8 750.8L842 1226.4H1200L714.2 519.1ZM570.9 687.5L523.4 620.1L146.7 79.7H311.5L615.4 520.2L662.9 587.6L1055.7 1146.7H890.9L570.9 687.5Z" />
  </svg>
)

const socialLinks = [
  { icon: Facebook, label: 'Facebook', url: 'https://www.facebook.com/share/1DKbJRWQtq/' },
  { icon: Instagram, label: 'Instagram', url: 'https://www.instagram.com/hakirush.sports_events/?hl=en' },
  { icon: Linkedin, label: 'LinkedIn', url: 'https://linkedin.com/company/hakirush' },
  { icon: XIcon, label: 'X / Twitter', url: 'https://x.com/Hakirush_sports' },
  { icon: Youtube, label: 'YouTube', url: 'https://www.youtube.com/@HakirushSportsEvents' },
]

const contactRows = [
  { icon: Mail, label: 'Email', value: contactDetails.email, href: `mailto:${contactDetails.email}`, copy: true },
  { icon: Phone, label: 'Phone', value: contactDetails.phone, href: `tel:${contactDetails.phone.replace(/\s/g, '')}`, copy: true },
  {
    icon: MessageSquare,
    label: 'WhatsApp',
    value: contactDetails.whatsapp,
    href: `https://wa.me/${contactDetails.whatsapp.replace(/\D/g, '')}`,
    external: true,
  },
  { icon: MapPin, label: 'Address', value: contactDetails.address, href: MAPS_LINK, external: true, small: true },
  { icon: Clock, label: 'Hours', value: contactDetails.hours },
]

/* ------------------------------------------------------------------ */
/*  HOOK — cursor-driven 3D tilt                                       */
/* ------------------------------------------------------------------ */
function useTilt({ max = 10, disabled = false } = {}) {
  const reduce = useReducedMotion()
  const mx = useMotionValue(0)
  const my = useMotionValue(0)

  const rotateX = useSpring(useTransform(my, [-0.5, 0.5], [max, -max]), TILT_SPRING)
  const rotateY = useSpring(useTransform(mx, [-0.5, 0.5], [-max, max]), TILT_SPRING)
  const gx = useTransform(mx, (v) => (v + 0.5) * 100)
  const gy = useTransform(my, (v) => (v + 0.5) * 100)

  const reset = () => {
    mx.set(0)
    my.set(0)
  }
  const onMouseMove = (e) => {
    if (reduce || disabled) return
    const r = e.currentTarget.getBoundingClientRect()
    mx.set((e.clientX - r.left) / r.width - 0.5)
    my.set((e.clientY - r.top) / r.height - 0.5)
  }

  useEffect(() => {
    if (disabled) reset()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [disabled])

  return { rotateX, rotateY, gx, gy, onMouseMove, reset }
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
        <motion.img
          src={image}
          alt=""
          style={{ x, y, scale }}
          className="h-full w-full object-cover object-center opacity-70 will-change-transform"
        />
        <div className="absolute inset-0 bg-linear-to-b from-slate-950/75 via-slate-950/60 to-slate-950/90" />
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

const IconTile = ({ icon: Icon, size = 48, spin = false }) => (
  <span
    className={`relative block shrink-0 transition-transform duration-700 ease-out ${spin ? '[transform:rotateY(360deg)]' : ''}`}
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
      <Icon size={Math.round(size * 0.42)} strokeWidth={2.2} />
    </span>
  </span>
)

// Dark slab card; tilt can be switched off (e.g. while typing)
const TiltCard = ({ children, className = '', innerClassName = '', max = 8, tiltDisabled = false, rounded = 'rounded-3xl', flat = false }) => {
  const tilt = useTilt({ max, disabled: tiltDisabled })
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
      style={{ rotateX: tilt.rotateX, rotateY: tilt.rotateY, transformPerspective: 1200, transformStyle: 'preserve-3d' }}
      className={`group relative ${rounded} ${className}`}
    >
      <span
        aria-hidden="true"
        className={`pointer-events-none absolute inset-0 ${rounded} bg-black/60`}
        style={{ transform: 'translateZ(-16px) translateY(8px)' }}
      />
      <span
        aria-hidden="true"
        className={`pointer-events-none absolute inset-0 ${rounded} border border-white/10 bg-linear-to-br from-slate-900/90 via-slate-950/90 to-black/90 shadow-[0_30px_60px_-25px_rgba(0,0,0,0.9)] backdrop-blur-md`}
      />
      <span
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-8 top-0 h-[2px] rounded-full"
        style={{ background: `linear-gradient(90deg, transparent, ${RED}, transparent)` }}
      />
      <motion.span
        aria-hidden="true"
        className={`pointer-events-none absolute inset-0 ${rounded}`}
        style={{ background: glare }}
        animate={{ opacity: hover && !tiltDisabled ? 1 : 0 }}
      />
      <div
        className={`relative h-full ${innerClassName}`}
        style={flat ? { transform: 'translateZ(24px)' } : { transform: 'translateZ(24px)', transformStyle: 'preserve-3d' }}
      >
        {children}
      </div>
    </motion.div>
  )
}

/* ------------------------------------------------------------------ */
/*  HERO                                                               */
/* ------------------------------------------------------------------ */
const Hero = () => {
  const tilt = useTilt({ max: 6 })
  return (
    <section className="relative pb-10 pt-32 md:pt-36" onMouseMove={tilt.onMouseMove} onMouseLeave={tilt.reset}>
      <div className="mx-auto max-w-5xl px-6 text-center" style={{ perspective: 1200 }}>
        <motion.div style={{ rotateX: tilt.rotateX, rotateY: tilt.rotateY, transformStyle: 'preserve-3d' }} className="relative">
          <span
            aria-hidden="true"
            className="pointer-events-none absolute left-1/2 -top-24 text-white/[0.05] sm:-top-32"
            style={{ transform: 'translateX(-50%) translateZ(-140px)' }}
          >
            <Mail strokeWidth={0.6} className="h-64 w-64 sm:h-96 sm:w-96" />
          </span>

          <div className="relative space-y-7" style={{ transformStyle: 'preserve-3d' }}>
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, ease: EASE_OUT }}
              className="inline-flex items-center gap-2 rounded-full border border-red-500/30 bg-red-950/40 px-5 py-1.5 shadow-[0_4px_0_rgba(0,0,0,0.5),0_12px_30px_-10px_rgba(220,38,38,0.5)] backdrop-blur-sm"
              style={{ transform: 'translateZ(40px)' }}
            >
              <span className="relative flex h-2 w-2">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-red-500 opacity-75" />
                <span className="relative inline-flex h-2 w-2 rounded-full bg-red-500" />
              </span>
              <span className="text-[10px] font-black uppercase tracking-[0.3em] text-white">We're Here to Help</span>
            </motion.div>

            <div className="flex justify-center" style={{ transform: 'translateZ(50px)', transformStyle: 'preserve-3d' }}>
              <motion.div
                animate={{ y: [0, -6, 0], rotateY: [0, 18, 0, -18, 0] }}
                transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut' }}
                style={{ transformStyle: 'preserve-3d' }}
              >
                <IconTile icon={Mail} size={64} />
              </motion.div>
            </div>

            <h1
              className="font-serif text-5xl font-black leading-[1.02] tracking-tight sm:text-6xl md:text-7xl"
              style={{ transform: 'translateZ(70px)', transformStyle: 'preserve-3d' }}
            >
              <span className="sr-only">Get in Touch</span>
              <Letters3D text="Get in" color="#ffffff" extrude={EXTRUDE_WHITE} />{' '}
              <Letters3D text="Touch" color={RED} extrude={EXTRUDE_RED} delay={0.3} />
            </h1>

            <motion.div
              initial={{ scaleX: 0 }}
              animate={{ scaleX: 1 }}
              transition={{ duration: 0.8, delay: 0.7, ease: EASE_OUT }}
              className="mx-auto h-1 w-20 rounded-full"
              style={{ background: `linear-gradient(90deg, ${RED_DARK}, ${RED}, ${RED_LIGHT})`, boxShadow: `0 0 16px ${RED}` }}
            />
          </div>
        </motion.div>
      </div>
    </section>
  )
}

/* ------------------------------------------------------------------ */
/*  CONTACT ROW — 3D card with spinning icon (+ copy button)            */
/* ------------------------------------------------------------------ */
const ContactRow = ({ item, index }) => {
  const [hover, setHover] = useState(false)
  const [copied, setCopied] = useState(false)
  const Wrapper = item.href ? 'a' : 'div'
  const wrapperProps = item.href
    ? { href: item.href, ...(item.external ? { target: '_blank', rel: 'noopener noreferrer' } : {}) }
    : {}

  const copy = async (e) => {
    e.preventDefault()
    e.stopPropagation()
    try {
      await navigator.clipboard.writeText(item.value)
      setCopied(true)
      setTimeout(() => setCopied(false), 1600)
    } catch {
      /* clipboard blocked — nothing to do */
    }
  }

  return (
    <motion.div
      initial={{ opacity: 0, x: -40, rotateY: -30 }}
      whileInView={{ opacity: 1, x: 0, rotateY: 0 }}
      viewport={{ once: true, margin: '-40px' }}
      transition={{ duration: 0.7, delay: index * 0.08, ease: EASE_OUT }}
      style={{ transformPerspective: 1000 }}
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
    >
      <TiltCard max={6} rounded="rounded-2xl">
        <Wrapper
          {...wrapperProps}
          onFocus={() => setHover(true)}
          onBlur={() => setHover(false)}
          className={`flex items-center gap-5 rounded-2xl p-5 outline-none focus-visible:ring-2 focus-visible:ring-red-500 ${item.copy ? 'pr-16' : ''}`}
        >
          <span style={{ transformStyle: 'preserve-3d' }}>
            <IconTile icon={item.icon} size={48} spin={hover} />
          </span>
          <span className="min-w-0 flex-1">
            <span className="block text-xs font-bold uppercase tracking-wider text-red-400">{item.label}</span>
            <span
              className={`block font-bold leading-snug transition-colors duration-300 ${item.small ? 'text-sm' : ''} ${
                hover && item.href ? 'text-red-300' : 'text-white'
              }`}
            >
              {item.value}
            </span>
          </span>
          {item.external && <ExternalLink aria-hidden="true" className={`h-4 w-4 shrink-0 transition-colors ${hover ? 'text-red-400' : 'text-white/30'}`} />}
        </Wrapper>
        {item.copy && (
          <button
            type="button"
            onClick={copy}
            aria-label={copied ? `${item.label} copied` : `Copy ${item.label.toLowerCase()}`}
            className={`absolute right-4 top-1/2 grid h-9 w-9 -translate-y-1/2 place-items-center rounded-xl border text-white shadow-[0_3px_0_rgba(0,0,0,0.6)] outline-none transition-all focus-visible:ring-2 focus-visible:ring-red-500 ${
              copied ? 'border-green-400/50 bg-green-600' : 'border-white/10 bg-white/[0.06] hover:border-red-500/60 hover:bg-red-600'
            }`}
          >
            <AnimatePresence mode="wait" initial={false}>
              <motion.span
                key={copied ? 'ok' : 'copy'}
                initial={{ rotateY: -90, opacity: 0 }}
                animate={{ rotateY: 0, opacity: 1 }}
                exit={{ rotateY: 90, opacity: 0 }}
                transition={{ duration: 0.2 }}
              >
                {copied ? <Check className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
              </motion.span>
            </AnimatePresence>
          </button>
        )}
      </TiltCard>
    </motion.div>
  )
}

/* ------------------------------------------------------------------ */
/*  SOCIAL SLAB — red 3D panel with coin-flip icons                     */
/* ------------------------------------------------------------------ */
const SocialSlab = () => {
  const reduce = useReducedMotion()
  const tilt = useTilt({ max: 8 })

  return (
    <motion.div
      initial={{ opacity: 0, y: 30, rotateX: -30 }}
      whileInView={{ opacity: 1, y: 0, rotateX: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.8, ease: EASE_OUT }}
      style={{ transformPerspective: 1000, transformOrigin: '50% 100%' }}
    >
      <motion.div
        onMouseMove={tilt.onMouseMove}
        onMouseLeave={tilt.reset}
        style={{ rotateX: tilt.rotateX, rotateY: tilt.rotateY, transformPerspective: 1000, transformStyle: 'preserve-3d' }}
        className="relative rounded-3xl"
      >
        {Array.from({ length: 6 }).map((_, i) => (
          <span
            key={i}
            aria-hidden="true"
            className="absolute inset-0 rounded-3xl"
            style={{ transform: `translateZ(${-(i + 1) * 2.5}px)`, background: '#450a0a', filter: `brightness(${0.9 - i * 0.1})` }}
          />
        ))}
        <span
          aria-hidden="true"
          className="absolute inset-0 rounded-3xl ring-1 ring-inset ring-white/15 shadow-[0_30px_60px_-25px_rgba(220,38,38,0.6)]"
          style={{ background: `linear-gradient(135deg, ${RED}, ${RED_DARK} 60%, #3b0a0a)` }}
        />
        <span aria-hidden="true" className="absolute inset-x-4 top-0 h-1/2 rounded-t-3xl bg-linear-to-b from-white/15 to-transparent" />

        <div className="relative p-6" style={{ transform: 'translateZ(24px)' }}>
          <h3 className="mb-4 font-bold text-white" style={{ textShadow: '0 2px 0 #450a0a' }}>
            Follow Our Journey
          </h3>
          <div className="flex flex-wrap gap-3">
            {socialLinks.map(({ icon: Icon, label, url }) => (
              <motion.a
                key={label}
                href={url}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={label}
                title={label}
                whileHover={reduce ? { y: -3 } : { y: -5, rotateY: 360 }}
                whileTap={{ scale: 0.9 }}
                transition={{ duration: 0.6, ease: EASE_OUT }}
                style={{ transformPerspective: 400 }}
                className="grid h-11 w-11 place-items-center rounded-xl bg-white/10 text-white shadow-[0_4px_0_rgba(0,0,0,0.35)] outline-none transition-colors hover:bg-white hover:text-red-700 focus-visible:ring-2 focus-visible:ring-white"
              >
                <Icon size={20} />
              </motion.a>
            ))}
          </div>
        </div>
      </motion.div>
    </motion.div>
  )
}

/* ------------------------------------------------------------------ */
/*  FORM — submits contact enquiries to the backend                    */
/* ------------------------------------------------------------------ */
const fieldClass = (hasError) =>
  `w-full rounded-2xl border bg-black/40 p-4 text-white placeholder-slate-500 outline-none shadow-[inset_0_3px_8px_rgba(0,0,0,0.6)] transition-all duration-300 focus:-translate-y-0.5 focus:bg-black/60 focus:shadow-[inset_0_2px_4px_rgba(0,0,0,0.5),0_10px_24px_-10px_rgba(220,38,38,0.6)] focus:ring-2 ${
    hasError ? 'border-red-500/70 focus:ring-red-500' : 'border-white/10 focus:border-red-500/60 focus:ring-red-500/70'
  }`

function InputField({ label, name, type = 'text', value, onChange, onBlur, required, error, autoComplete, placeholder }) {
  const id = `contact-${name}`
  return (
    <div className="space-y-2">
      <label htmlFor={id} className="block text-sm font-bold text-slate-200">
        {label} {required && <span className="text-red-400">*</span>}
      </label>
      <input
        id={id}
        type={type}
        name={name}
        required={required}
        value={value}
        onChange={onChange}
        onBlur={onBlur}
        autoComplete={autoComplete}
        placeholder={placeholder}
        aria-invalid={!!error}
        aria-describedby={error ? `${id}-error` : undefined}
        className={fieldClass(!!error)}
      />
      {error && (
        <p id={`${id}-error`} className="text-xs font-semibold text-red-400">
          {error}
        </p>
      )}
    </div>
  )
}

const SendButton = ({ launched, loading }) => {
  const reduce = useReducedMotion()
  const [hover, setHover] = useState(false)

  // thickness is drawn with stacked shadows (not 3D layers) so the button is always clickable
  return (
    <motion.button
      type="submit"
      disabled={loading}
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
      animate={{ y: hover ? -2 : 0 }}
      whileTap={{ y: 4 }}
      transition={SPRING}
      className="relative block w-full cursor-pointer overflow-hidden rounded-2xl outline-none ring-1 ring-inset ring-white/25 focus-visible:ring-2 focus-visible:ring-red-300 disabled:cursor-wait disabled:opacity-70"
      style={{
        background: `linear-gradient(135deg, ${RED_LIGHT}, ${RED} 45%, ${RED_DARK})`,
        boxShadow: hover
          ? `0 8px 0 #5a1010, 0 9px 0 #3f0b0b, 0 24px 40px -12px ${RED}cc`
          : `0 6px 0 #5a1010, 0 7px 0 #3f0b0b, 0 16px 30px -14px ${RED}99`,
      }}
    >
      <span aria-hidden="true" className="pointer-events-none absolute inset-x-3 top-0 h-1/2 rounded-t-2xl bg-linear-to-b from-white/25 to-transparent" />
      <span className="relative flex items-center justify-center gap-3 py-4 font-black text-white" style={{ textShadow: '0 2px 6px rgba(0,0,0,0.35)' }}>
        <motion.span
          animate={
            launched && !reduce
              ? { x: [0, 30, 320], y: [0, -10, -120], rotate: [0, -15, -35], opacity: [1, 1, 0] }
              : { x: hover && !reduce ? 4 : 0, y: hover && !reduce ? -2 : 0, rotate: 0, opacity: 1 }
          }
          transition={launched ? { duration: 0.9, ease: 'easeIn' } : SPRING}
        >
          <Send size={20} />
        </motion.span>
        <span>{loading ? 'Sending…' : 'Send Message'}</span>
      </span>
    </motion.button>
  )
}

const ContactForm = () => {
  const empty = { name: '', email: '', company: '', phone: '', message: '', website: '' }
  const [formData, setFormData] = useState(empty)
  const [touched, setTouched] = useState({})
  const [loading, setLoading] = useState(false)
  const [launched, setLaunched] = useState(false)
  const [typing, setTyping] = useState(false)

  const errors = {
    name: !formData.name.trim() ? 'Please enter your name.' : '',
    email: !formData.email.trim()
      ? 'Please enter your email.'
      : !EMAIL_RE.test(formData.email.trim())
        ? 'That email doesn’t look right.'
        : '',
    message: !formData.message.trim() ? 'Please tell us how we can help.' : '',
  }
  const isValid = !errors.name && !errors.email && !errors.message
  const show = (k) => (touched[k] ? errors[k] : '')

  const handleInput = (e) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }
  const handleBlur = (e) => setTouched((t) => ({ ...t, [e.target.name]: true }))

  const handleSubmit = async (e) => {
    e.preventDefault()

    if (loading) return

    if (!isValid) {
      setTouched({ name: true, email: true, message: true })
      Swal.fire({
        icon: 'error',
        title: 'Please complete the form',
        text: 'Name, a valid email and a message are required.',
        background: '#0b0d12',
        color: '#fff',
        confirmButtonColor: RED,
      })
      return
    }

    setLoading(true)
    setLaunched(true)
    try {
      const { data: result } = await axios.post(
        `${API_URL}/api/contact`,
        {
          name: formData.name.trim(),
          email: formData.email.trim(),
          company: formData.company.trim(),
          phone: formData.phone.trim(),
          message: formData.message.trim(),
          website: formData.website,
        },
        { timeout: REQUEST_TIMEOUT_MS },
      )

      if (!result?.ok) {
        const fieldErrors = Object.values(result?.errors || {}).join(' ')
        throw new Error(result?.error || fieldErrors || 'The contact service could not send your message.')
      }

      Swal.fire({
        icon: 'success',
        title: 'Message sent!',
        text: 'Thanks for reaching out — our team will get back to you within one business day.',
        background: '#0b0d12',
        color: '#fff',
        confirmButtonColor: RED,
      })
      setFormData(empty)
      setTouched({})
    } catch (error) {
      const responseData = axios.isAxiosError(error) ? error.response?.data : null
      const fieldErrors = Object.values(responseData?.errors || {}).join(' ')
      const message =
        error.code === 'ECONNABORTED' || error.code === 'ETIMEDOUT'
          ? 'The server took too long to respond. Please try again.'
          : axios.isAxiosError(error) && !error.response
            ? 'Could not reach the contact service. Please try again in a moment.'
            : responseData?.error || fieldErrors || error.message || 'Please try again.'

      Swal.fire({
        icon: 'error',
        title: "Couldn't send your message",
        text: `${message} You can also email us directly at ${contactDetails.email}.`,
        background: '#0b0d12',
        color: '#fff',
        confirmButtonColor: RED,
      })
    } finally {
      setLoading(false)
      setTimeout(() => setLaunched(false), 900)
    }
  }

  return (
    <motion.div
      initial={{ opacity: 0, x: 40, rotateY: 25 }}
      whileInView={{ opacity: 1, x: 0, rotateY: 0 }}
      viewport={{ once: true, margin: '-60px' }}
      transition={{ duration: 0.9, ease: EASE_OUT }}
      style={{ transformPerspective: 1400 }}
      onFocusCapture={() => setTyping(true)}
      onBlurCapture={() => setTyping(false)}
    >
      {/* tilt switches off while someone is typing so the form holds still */}
      <TiltCard max={4} tiltDisabled={typing} rounded="rounded-[2.5rem]" innerClassName="p-8 md:p-10" flat>
        <h2 className="mb-8 font-serif text-3xl font-black text-white" style={{ textShadow: EXTRUDE_WHITE }}>
          Send a <span style={{ color: RED, textShadow: EXTRUDE_RED }}>Message</span>
        </h2>
        <form noValidate onSubmit={handleSubmit} className="space-y-5">
          <div aria-hidden="true" className="absolute -left-[9999px] h-px w-px overflow-hidden">
            <label htmlFor="contact-website">Website</label>
            <input
              id="contact-website"
              type="text"
              name="website"
              tabIndex={-1}
              autoComplete="off"
              value={formData.website}
              onChange={handleInput}
            />
          </div>
          <div className="grid gap-5 md:grid-cols-2">
            <InputField label="Name" name="name" value={formData.name} onChange={handleInput} onBlur={handleBlur} required error={show('name')} autoComplete="name" />
            <InputField label="Email" name="email" type="email" value={formData.email} onChange={handleInput} onBlur={handleBlur} required error={show('email')} autoComplete="email" />
          </div>
          <div className="grid gap-5 md:grid-cols-2">
            <InputField label="Company" name="company" value={formData.company} onChange={handleInput} autoComplete="organization" />
            <InputField label="Phone" name="phone" type="tel" value={formData.phone} onChange={handleInput} autoComplete="tel" />
          </div>
          <div className="space-y-2">
            <label htmlFor="contact-message" className="block text-sm font-bold text-slate-200">
              Message <span className="text-red-400">*</span>
            </label>
            <textarea
              id="contact-message"
              name="message"
              rows="5"
              required
              value={formData.message}
              onChange={handleInput}
              onBlur={handleBlur}
              placeholder="How can we help you?"
              aria-invalid={!!show('message')}
              aria-describedby={show('message') ? 'contact-message-error' : undefined}
              className={`${fieldClass(!!show('message'))} resize-y`}
            />
            {show('message') && (
              <p id="contact-message-error" className="text-xs font-semibold text-red-400">
                {show('message')}
              </p>
            )}
          </div>
          <div className="pt-2 pb-2">
            <SendButton launched={launched} loading={loading} />
          </div>
        </form>
      </TiltCard>
    </motion.div>
  )
}

/* ------------------------------------------------------------------ */
/*  MAP — a 3D screen that straightens as you scroll, with a live pin   */
/* ------------------------------------------------------------------ */
const MapScreen = () => {
  const ref = useRef(null)
  const reduce = useReducedMotion()
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start end', 'center center'] })
  const rotateX = useTransform(scrollYProgress, [0, 1], [reduce ? 0 : 35, 0])
  const scale = useTransform(scrollYProgress, [0, 1], [reduce ? 1 : 0.88, 1])

  return (
    <section className="mx-auto max-w-7xl px-6 pb-28 pt-16">
      <div ref={ref} style={{ perspective: 1400 }}>
        <motion.div style={{ rotateX, scale, transformStyle: 'preserve-3d', transformOrigin: '50% 100%' }} className="relative">
          {/* frame thickness */}
          {Array.from({ length: 7 }).map((_, i) => (
            <span
              key={i}
              aria-hidden="true"
              className="absolute inset-0 rounded-[3rem]"
              style={{ transform: `translateZ(${-(i + 1) * 2.5}px)`, background: i % 2 ? '#1a1d26' : '#0b0d12' }}
            />
          ))}

          <div
            className="relative overflow-hidden rounded-[3rem] border border-white/10 p-2 shadow-[0_40px_80px_-30px_rgba(0,0,0,0.9)] sm:p-3"
            style={{ background: 'linear-gradient(160deg, #1a1d26, #0b0d12)' }}
          >
            <span
              aria-hidden="true"
              className="pointer-events-none absolute inset-x-16 top-0 z-10 h-[2px] rounded-full"
              style={{ background: `linear-gradient(90deg, transparent, ${RED}, transparent)`, boxShadow: `0 0 14px ${RED}` }}
            />
            <iframe
              title="HAKIRUSH office location on Google Maps"
              className="h-[380px] w-full rounded-[2.4rem] border-0 sm:h-[450px]"
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3888.514686411516!2d77.6256!3d12.9392!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMTLCsDU2JzIxLjEiTiA3N8KwMzcnMzIuMiJF!5e0!3m2!1sen!2sin!4v1625000000000!5m2!1sen!2sin"
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            />
          </div>

          {/* floating pin */}
          <motion.div
            aria-hidden="true"
            className="pointer-events-none absolute -top-8 left-1/2 -ml-7"
            style={{ transform: 'translateZ(60px)' }}
            animate={reduce ? undefined : { y: [0, -10, 0] }}
            transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
          >
            <IconTile icon={MapPin} size={56} />
          </motion.div>

          {/* directions button */}
          <a
            href={MAPS_LINK}
            target="_blank"
            rel="noopener noreferrer"
            className="absolute bottom-6 left-6 z-10 inline-flex items-center gap-2 rounded-full bg-red-600 px-4 py-2.5 text-xs font-black uppercase tracking-wider text-white shadow-[0_4px_0_#7f1d1d,0_12px_24px_-8px_rgba(220,38,38,0.8)] outline-none transition hover:-translate-y-0.5 hover:bg-red-500 hover:shadow-[0_6px_0_#7f1d1d,0_16px_28px_-8px_rgba(220,38,38,0.9)] active:translate-y-0.5 active:shadow-[0_1px_0_#7f1d1d] focus-visible:ring-2 focus-visible:ring-white sm:bottom-8 sm:left-8"
            style={{ transform: 'translateZ(40px)' }}
          >
            <Navigation className="h-4 w-4" /> Get directions
          </a>
        </motion.div>
      </div>
    </section>
  )
}

/* ------------------------------------------------------------------ */
/*  PAGE                                                               */
/* ------------------------------------------------------------------ */
export default function Contact() {
  return (
    <div className="relative min-h-screen overflow-x-clip text-white">
      <ParallaxBackground image={backgroundImage} />

      <div className="relative z-10 w-full">
        <Hero />

        <section className="mx-auto max-w-7xl px-6 py-12">
          <div className="grid items-start gap-12 lg:grid-cols-2">
            {/* LEFT: details */}
            <div className="space-y-8">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.7, ease: EASE_OUT }}
                className="space-y-4"
              >
                <h2 className="font-serif text-3xl font-black text-white" style={{ textShadow: EXTRUDE_WHITE }}>
                  Let's <span style={{ color: RED, textShadow: EXTRUDE_RED }}>Connect</span>
                </h2>
                <p className="font-medium text-slate-300">
                  Ready to transform your workplace culture? Let's create sports experiences that inspire energy, unity &amp; performance.
                </p>
              </motion.div>

              <div className="grid gap-4">
                {contactRows.map((item, i) => (
                  <ContactRow key={item.label} item={item} index={i} />
                ))}
              </div>

              <SocialSlab />
            </div>

            {/* RIGHT: form */}
            <ContactForm />
          </div>
        </section>

        <MapScreen />
      </div>
    </div>
  )
}
