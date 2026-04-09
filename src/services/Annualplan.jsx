import React from 'react'
import { motion } from 'framer-motion'
import { CheckCircle, Zap, ArrowRight, ArrowLeft } from 'lucide-react'
import { useNavigate, Link } from 'react-router-dom'

// Asset imports (Assuming these paths are correct in your local env)
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
  { month: "January", title: "Corporate Marathon", image: Marathon },
  { month: "February", title: "Football League", image: Football },
  { month: "March", title: "Badminton Doubles", image: Badminton },
  { month: "April", title: "Cricket 6s", image: Cricket },
  { month: "May", title: "Table Tennis Challenge", image: Table },
  { month: "June", title: "Yoga & Wellness Day", image: Yoga },
  { month: "July", title: "Volleyball / Throwball", image: Volleyball },
  { month: "August", title: "Mini Olympics", image: Olympics },
  { month: "September", title: "Indoor Games Challenge", image: Chess },
  { month: "October", title: "Fitness Bootcamp", image: Fitness },
  { month: "November", title: "Relay Run", image: Relay },
  { month: "December", title: "All-Star Grand Finale", image: Finale },
]

const details = [
  {
    id: 1,
    title: "Included in the Package",
    items: [
      "Venue, sports kits & professional umpires",
      "Drone videography & monthly highlight reels",
      "Certificates, medals & recognition",
      "Event coverage on HAKIRUSH social media",
      "Leaderboard & engagement dashboard",
    ],
  },
  {
    id: 2,
    title: "Key Benefits",
    items: [
      "12 months of seamless employee engagement",
      "Morale and fitness boost across teams",
      "Stronger communication and team synergy",
      "Zero headaches for HR — we manage everything",
      "Brand exposure & positive workplace culture",
    ],
  },
]

// --- BACKGROUND COMPONENT ---
const ContinuousSportsBackground = () => {
  const row1 = [CheckCircle, Zap, ArrowRight, ArrowLeft];
  return (
    <div className="fixed inset-0 overflow-hidden bg-white pointer-events-none z-0">
      <div className="absolute top-[-10%] left-[-10%] w-[60%] h-[60%] bg-red-100/40 blur-[120px] rounded-full" />
      <div className="absolute bottom-[-10%] right-[-10%] w-[50%] h-[50%] bg-red-50/60 blur-[120px] rounded-full" />
      
      {[10, 40, 70].map((top, idx) => (
        <div key={top} className="flex absolute opacity-[0.03]" style={{ top: `${top}%` }}>
          <motion.div 
            initial={{ x: idx % 2 === 0 ? 0 : "-50%" }}
            animate={{ x: idx % 2 === 0 ? "-50%" : 0 }}
            transition={{ duration: 40 + idx * 5, repeat: Infinity, ease: "linear" }}
            className="flex gap-24 pr-24 whitespace-nowrap"
          >
            {[...row1, ...row1, ...row1, ...row1].map((Icon, i) => (
              <Icon key={i} size={80 + idx * 10} className="text-red-900" strokeWidth={0.5} />
            ))}
          </motion.div>
        </div>
      ))}
    </div>
  )
}

const Annualplan = () => {
  const navigate = useNavigate()
  
  return (
    <div className="relative min-h-screen bg-gray-50/50">
      <ContinuousSportsBackground />

      <div className="relative z-10">
        {/* Navigation Section */}
        <nav className="max-w-7xl mx-auto px-6 pt-10">
          <motion.button
            onClick={() => navigate(-1)}
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            className="group flex items-center gap-2 px-4 py-2 rounded-full bg-white/80 backdrop-blur-md border border-gray-200 text-gray-700 hover:text-[#C21807] transition-all shadow-sm cursor-pointer"
          >
            <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
            <span className="text-sm font-semibold">Back to Services</span>
          </motion.button>
        </nav>

        {/* Hero Section */}
        <section className="pt-12 pb-16 px-6">
          <div className="max-w-5xl mx-auto text-center space-y-6">
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-red-50 border border-red-100"
            >
              <Zap className="w-4 h-4 text-[#C21807]" />
              <span className="text-xs font-bold text-[#C21807] uppercase tracking-widest">Annual Subscription</span>
            </motion.div>

            <motion.h1 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-4xl md:text-6xl font-black text-gray-900 leading-tight"
            >
              12 Months. 12 Sports. <br />
              <span className="text-[#C21807]">One Unstoppable Team.</span>
            </motion.h1>

            <motion.p 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.2 }}
              className="text-gray-600 text-lg max-w-2xl mx-auto leading-relaxed"
            >
              A year-long engagement program designed for organizations that believe in 
              <span className="font-bold text-gray-900"> consistent team connection </span> 
              and an <span className="font-bold text-[#C21807]"> active workplace culture</span>.
            </motion.p>
          </div>
        </section>

        {/* Grid Section */}
        <section className="pb-20 px-6">
          <div className="max-w-7xl mx-auto">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {plans.map((item, index) => (
                <motion.div
                  key={item.month}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.05 }}
                  viewport={{ once: true }}
                  whileHover={{ y: -10 }}
                  className="group relative h-80 rounded-3xl overflow-hidden shadow-lg bg-white"
                >
                  <img
                    src={item.image}
                    alt={item.title}
                    className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent" />
                  
                  <div className="absolute bottom-0 left-0 p-6 w-full">
                    <span className="text-[#C21807] font-bold text-xs uppercase tracking-widest bg-white/90 px-3 py-1 rounded-full">
                      {item.month}
                    </span>
                    <h3 className="text-white font-bold text-xl mt-3">{item.title}</h3>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Details Section */}
        <section className="pb-24 px-6">
          <div className="max-w-7xl mx-auto grid md:grid-cols-2 gap-8">
            {details.map((card) => (
              <motion.div
                key={card.id}
                whileHover={{ scale: 1.01 }}
                className="bg-white p-8 rounded-[2rem] shadow-xl border border-gray-100"
              >
                <div className="flex items-center gap-3 mb-8">
                  <div className="p-3 bg-red-600 rounded-2xl">
                    {card.id === 1 ? <CheckCircle className="text-white" /> : <Zap className="text-white" />}
                  </div>
                  <h2 className="text-2xl font-bold text-gray-900">{card.title}</h2>
                </div>
                <ul className="space-y-4">
                  {card.items.map((text, i) => (
                    <li key={i} className="flex gap-4 items-start text-gray-600">
                      <div className="mt-1.5 w-1.5 h-1.5 rounded-full bg-[#C21807] shrink-0" />
                      <span className="text-md leading-tight">{text}</span>
                    </li>
                  ))}
                </ul>
              </motion.div>
            ))}
          </div>

          <div className="mt-16 text-center">
            <Link to="/contact">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="inline-flex items-center gap-3 px-10 py-5 bg-[#C21807] text-white font-bold text-lg rounded-2xl shadow-2xl shadow-red-200 hover:bg-[#A01506] transition-colors cursor-pointer"
              >
                Subscribe to Annual Package
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