import React, { useEffect, useRef } from 'react'
import { motion, useMotionValue, useSpring, useTransform, useScroll } from 'framer-motion'
import {
  CheckCircle2, Zap, ArrowRight, ArrowLeft,
  Trophy, Activity, Target, CircleDot, Star, Dumbbell, Flag
} from 'lucide-react'
import { useNavigate, Link } from 'react-router-dom'
import backgroundImage from '../assets/Hero/Backimage.png'

// Asset imports
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

// --- AMBIENT SCOREBOARD BACKGROUND -------------------------------------
const ScoreboardBackground = () => (
  <div className="fixed inset-0 overflow-hidden pointer-events-none -z-20 bg-[#0B0C0E]">
    {/* corner glows */}
    <div className="absolute top-[-15%] left-[-10%] w-[55%] h-[55%] bg-[#D4142A]/10 blur-[140px] rounded-full" />
    <div className="absolute bottom-[-15%] right-[-10%] w-[45%] h-[45%] bg-[#E8B923]/[0.06] blur-[140px] rounded-full" />

    {/* faint scoreboard grid */}
    <div
      className="absolute inset-0 opacity-[0.05]"
      style={{
        backgroundImage:
          'linear-gradient(#F4F2ED 1px, transparent 1px), linear-gradient(90deg, #F4F2ED 1px, transparent 1px)',
        backgroundSize: '64px 64px',
      }}
    />

    {/* drifting icon marquee, single restrained row */}
    <div className="flex absolute top-[8%] opacity-[0.05] w-full overflow-hidden">
      <motion.div
        initial={{ x: 0 }}
        animate={{ x: '-50%' }}
        transition={{ duration: 55, repeat: Infinity, ease: 'linear' }}
        className="flex gap-28 pr-28 whitespace-nowrap flex-nowrap"
      >
        {[...tickerIcons, ...tickerIcons, ...tickerIcons].map((Icon, i) => (
          <Icon key={i} size={64} className="text-[#F4F2ED]" strokeWidth={1} />
        ))}
      </motion.div>
    </div>
  </div>
)

// --- PARALLAX HERO IMAGE -------------------------------------------------
const ParallaxImageBackground = ({ image }) => {
  const containerRef = useRef(null)
  const mouseX = useMotionValue(0)
  const mouseY = useMotionValue(0)
  const springConfig = { damping: 30, stiffness: 80, mass: 0.6 }
  const smoothX = useSpring(mouseX, springConfig)
  const smoothY = useSpring(mouseY, springConfig)
  const translateX = useTransform(smoothX, [-1, 1], [-24, 24])
  const translateY = useTransform(smoothY, [-1, 1], [-16, 16])
  const scale = useTransform(smoothX, [-1, 1], [1.06, 1.1])
  const { scrollY } = useScroll()
  const scrollTranslateY = useTransform(scrollY, [0, 1500], [0, 150])

  useEffect(() => {
    const handleMouseMove = (e) => {
      mouseX.set((e.clientX / window.innerWidth) * 2 - 1)
      mouseY.set((e.clientY / window.innerHeight) * 2 - 1)
    }
    window.addEventListener('mousemove', handleMouseMove)
    return () => window.removeEventListener('mousemove', handleMouseMove)
  }, [mouseX, mouseY])

  return (
    <div
      ref={containerRef}
      className="fixed left-0 w-full overflow-hidden -z-10"
      style={{ top: '-10vh', height: '125vh' }}
    >
      <motion.img
        src={image}
        alt=""
        style={{
          x: translateX,
          y: useTransform([translateY, scrollTranslateY], ([ty, sy]) => ty + sy),
          scale,
        }}
        className="w-full h-full object-cover object-center will-change-transform grayscale-[25%]"
      />
      {/* onyx wash instead of a flat black tint — keeps hue consistent with the rest of the page */}
      <div className="absolute inset-0 bg-gradient-to-b from-[#0B0C0E]/60 via-[#0B0C0E]/70 to-[#0B0C0E]" />
    </div>
  )
}

// --- MATCH TICKET CARD ----------------------------------------------------
const MatchTicket = ({ item, index }) => (
  <motion.div
    initial={{ opacity: 0, y: 24 }}
    whileInView={{ opacity: 1, y: 0 }}
    transition={{ delay: (index % 4) * 0.08, duration: 0.5 }}
    viewport={{ once: true, margin: '-60px' }}
    whileHover={{ y: -6 }}
    className="group relative rounded-2xl overflow-hidden border border-white/10 bg-[#14161A]"
  >
    {/* giant translucent squad number */}
    <span
      className="pointer-events-none absolute -top-6 -left-2 select-none font-black text-[#F4F2ED]/[0.06] leading-none z-0"
      style={{ fontFamily: '"Anton", sans-serif', fontSize: '9rem' }}
    >
      {item.no}
    </span>

    {/* photo window */}
    <div className="relative h-44 mx-4 mt-4 rounded-xl overflow-hidden">
      <img
        src={item.image}
        alt={item.title}
        className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-108"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-[#14161A]/50 via-transparent to-transparent" />
    </div>

    {/* torn-stub divider */}
    <div className="relative flex items-center px-4 py-2 z-10">
      <div className="flex-1 border-t border-dashed border-white/15" />
      <span
        className="mx-3 text-[11px] font-bold tracking-[0.25em] uppercase"
        style={{ color: '#E8B923' }}
      >
        {item.month}
      </span>
      <div className="flex-1 border-t border-dashed border-white/15" />
    </div>

    <div className="relative px-5 pb-6 pt-1 z-10">
      <h3
        className="text-[#F4F2ED] leading-[1.05]"
        style={{ fontFamily: '"Anton", sans-serif', fontSize: '1.5rem', letterSpacing: '0.01em' }}
      >
        {item.title}
      </h3>
      <div className="mt-3 h-[3px] w-8 bg-[#D4142A] rounded-full transition-all duration-500 group-hover:w-14" />
    </div>
  </motion.div>
)

const Annualplan = () => {
  const navigate = useNavigate()

  return (
    <div className="relative min-h-screen overflow-hidden" style={{ fontFamily: '"Manrope", sans-serif' }}>
      <ScoreboardBackground />
      <ParallaxImageBackground image={backgroundImage} />

      <div className="relative z-10 w-full">
        {/* Navigation */}
        <nav className="max-w-7xl mx-auto px-6 pt-10">
          <motion.button
            onClick={() => navigate(-1)}
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            className="group flex items-center gap-2 px-4 py-2 rounded-full bg-white/[0.06] backdrop-blur-md border border-white/15 text-[#F4F2ED] hover:border-[#D4142A]/60 hover:text-white transition-all cursor-pointer"
          >
            <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
            <span className="text-sm font-semibold">Back to Services</span>
          </motion.button>
        </nav>

        {/* Hero */}
        <section className="pt-14 pb-20 px-6">
          <div className="max-w-4xl mx-auto text-center">
            <motion.div
              initial={{ opacity: 0, y: -8 }}
              animate={{ opacity: 1, y: 0 }}
              className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-[#D4142A]/40 bg-[#D4142A]/10 mb-6"
            >
              <span className="w-1 h-1 rounded-full bg-[#D4142A] animate-pulse" />
              <span className="text-[10px] font-bold text-[#E8B923] uppercase tracking-[0.25em]">
                2026 Season Pass
              </span>
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="text-[#F4F2ED] leading-[1.05] text-6xl font-bold"
            >
              12 MONTHS 12 FIXTURES.<br />
              <span className="text-[#D4142A]">ONE TEAM.</span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.3 }}
              className="mt-8 text-white/60 text-lg max-w-xl mx-auto leading-relaxed"
            >
              A year-long fixture list built for organizations that treat team
              connection like training — <span className="text-[#D4142A] font-bold">consistent</span>,
              not occasional.
            </motion.p>
          </div>
        </section>

        {/* Fixture grid */}
        <section className="pb-24 px-6">
          <div className="max-w-7xl mx-auto">
            <div className="flex items-end justify-between mb-8 flex-wrap gap-4">
              <h2
                className="text-[#F4F2ED]"
                style={{ fontSize: '1.85rem' }}
              >
                THE FIXTURE LIST
              </h2>
              <span className="text-sm text-white/40 font-medium">12 events · every month covered</span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
              {plans.map((item, index) => (
                <MatchTicket key={item.month} item={item} index={index} />
              ))}
            </div>
          </div>
        </section>

        {/* Details */}
        <section className="pb-24 px-6">
          <div className="max-w-7xl mx-auto grid md:grid-cols-2 gap-6">
            {details.map((card) => {
              const Icon = card.icon
              return (
                <motion.div
                  key={card.id}
                  whileHover={{ y: -4 }}
                  className="relative bg-[#14161A] p-8 md:p-10 rounded-3xl border border-white/10 overflow-hidden"
                >
                  <div
                    className="absolute -bottom-8 -right-4 select-none font-black text-white/[0.03] leading-none pointer-events-none"
                    style={{ fontFamily: '"Anton", sans-serif', fontSize: '10rem' }}
                  >
                    0{card.id}
                  </div>

                  <div className="relative z-10">
                    <span className="text-[11px] font-bold uppercase tracking-[0.3em] text-[#E8B923]">
                      {card.label}
                    </span>
                    <div className="flex items-center gap-3 mt-3 mb-8">
                      <div className="p-2.5 bg-[#D4142A] rounded-xl">
                        <Icon className="w-5 h-5 text-white" strokeWidth={2.5} />
                      </div>
                      <h3
                        className="text-[#F4F2ED]"
                        style={{ fontSize: '1.4rem' }}
                      >
                        {card.title}
                      </h3>
                    </div>
                    <ul className="space-y-4">
                      {card.items.map((text, i) => (
                        <li key={i} className="flex gap-3 items-start text-white/65">
                          <div className="mt-2 w-1 h-1 rounded-full bg-[#D4142A] shrink-0" />
                          <span className="text-[15px] leading-relaxed">{text}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </motion.div>
              )
            })}
          </div>

          {/* CTA */}
          <div className="mt-16 flex flex-col items-center text-center">
            <span className="text-xs font-bold uppercase tracking-[0.3em] text-white/40 mb-4">
              Ready to draft your season?
            </span>
            <Link to="/contact">
              <motion.button
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.97 }}
                className="inline-flex items-center gap-3 px-10 py-5 bg-[#D4142A] text-white font-bold text-lg rounded-2xl shadow-[0_20px_60px_-15px_rgba(212,20,42,0.5)] hover:bg-[#B5102380] transition-colors cursor-pointer"
                style={{ fontFamily: '"Anton", sans-serif', letterSpacing: '0.02em' }}
              >
                SUBSCRIBE TO ANNUAL PACKAGE
                <ArrowRight className="w-5 h-5" />
              </motion.button>
            </Link>
          </div>
        </section>
      </div>
    </div>
  )
}

export default Annualplan