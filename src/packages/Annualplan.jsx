import React from 'react'
// eslint-disable-next-line no-unused-vars
import { motion } from 'framer-motion'
import { CheckCircle, Zap, ArrowRight, ArrowLeft } from 'lucide-react'
import { useNavigate } from 'react-router-dom'

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
import { Link } from 'react-router-dom'

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
    title: "Included in the Annual Package",
    des1: "Venue, sports kits & professional umpires",
    des2: "Drone videography & monthly highlight reels",
    des3: "Certificates, medals & recognition",
    des4: "Event coverage on HAKIRUSH social media",
    des5: "Leaderboard & engagement dashboard",
  },
  {
    id: 2,
    title: "Benefits",
    des1: "12 months of seamless employee engagement",
    des2: "Morale and fitness boost across teams",
    des3: "Stronger communication and team synergy",
    des4: "Zero headaches for HR — we manage everything",
    des5: "Brand exposure & positive workplace culture",
  },
]

const Annualplan = () => {
  const navigate = useNavigate()
  
  return (
    <div className="bg-gray-50 relative overflow-hidden">
      {/* Back Button */}
      <div className="max-w-6xl mx-auto px-4 sm:px-6 pt-12 pb-3 md:pt-10 md:pb-6">
        <motion.button
          onClick={() => navigate(-1)}
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5 }}
          whileHover={{ x: -5 }}
          className="inline-flex items-center gap-1.5 sm:gap-2 px-3 py-2 sm:px-4 sm:py-2.5 rounded-lg bg-white border border-[#C21807]/30 shadow-sm hover:shadow-md text-[#C21807] hover:bg-[#C21807]/5 text-xs sm:text-sm md:text-base font-semibold transition-all cursor-pointer"
        >
          <ArrowLeft className="w-3.5 h-3.5 sm:w-4 sm:h-4 md:w-5 md:h-5 shrink-0" />
          <span className="whitespace-nowrap">Back to Packages</span>
        </motion.button>
      </div>

      {/* Background disabled for pure white */}
      <div className="hidden" />

      <section className="py-12 md:py-24 relative overflow-hidden bg-gray-50">

          {/* Max-width container for content */}
          <div className="max-w-7xl mx-auto px-6 text-center relative z-10">
            {/* Header - motion.div with new animation and reduced padding for centering */}
            <motion.div
              initial={{ opacity: 0, y: -40 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 1.2, ease: "easeOut" }}
              viewport={{ once: true }}
              className="text-center max-w-4xl mx-auto space-y-6 md:space-y-8"
            >
              {/* Badge */}
              <div className="inline-flex items-center gap-1.5 sm:gap-2 px-3 py-2 sm:px-5 sm:py-2.5 rounded-full bg-linear-to-r from-[#C21807]/10 to-[#A01506]/10 border border-[#C21807]/30 shadow-lg backdrop-blur-sm">
                <Zap className="w-4 h-4 text-[#C21807]" />
                <span className="text-sm font-bold text-[#C21807]">Annual Subscription</span>
              </div>

              <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black tracking-tight leading-tight">
                Annual Package —{' '}
                <span className="bg-linear-to-r from-[#C21807] via-[#A01506] to-[#C21807] bg-clip-text text-transparent drop-shadow-sm">
                  12 Months. 12 Sports.
                </span>{' '}
                One Unstoppable Team.
              </h1>

              <p className="text-sm sm:text-base lg:text-lg text-gray-700 leading-relaxed max-w-4xl mx-auto font-medium">
                A year-long engagement program designed for organizations that believe in{' '}
                <span className="font-bold text-gray-900">
                  consistent team connection
                </span>{' '}and{' '}
                <span className="font-bold text-[#C21807]">
                  active employee culture
                </span>.
                Each month brings a new sport, a new challenge, and a stronger team.
              </p>
            </motion.div>
          </div>
        </section>

      {/* Monthly Schedule */}
      <section className="py-8 relative overflow-hidden bg-gray-50">
        <div className="hidden" />
        <motion.div 
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="max-w-7xl mx-auto px-6 relative z-10"
        >
          {/* Section Header */}
          <div className="text-center mb-8 md:mb-12">
            <div className="inline-flex items-center gap-1.5 sm:gap-2 px-3 py-2 sm:px-5 sm:py-2.5 rounded-full bg-linear-to-r from-[#C21807]/10 to-[#A01506]/10 border border-[#C21807]/30 shadow-lg backdrop-blur-sm mb-6">
              <CheckCircle className="w-4 h-4 text-[#C21807]" />
              <span className="text-sm font-bold text-[#C21807]">12-Month Calendar</span>
            </div>
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-black text-gray-900 mb-4">
              Monthly{' '}
              <span className="bg-linear-to-r from-[#C21807] via-[#A01506] to-[#C21807] bg-clip-text text-transparent drop-shadow-sm">
                Activity Calendar
              </span>
            </h2>
            <p className="text-sm sm:text-base lg:text-lg text-gray-700 max-w-3xl mx-auto">
              A carefully curated mix of sports and wellness activities to keep your team engaged year-round
            </p>
          </div>

          <div className="grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {plans.map((item, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 60 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ 
                  type: 'spring',
                  stiffness: 100,
                  damping: 20,
                  delay: index * 0.05
                }}
                viewport={{ once: true }}
                whileHover={{ y: -8, scale: 1.02 }}
                className="group relative rounded-2xl shadow-lg overflow-hidden cursor-pointer aspect-square hover:shadow-[0_12px_35px_rgba(248,113,113,0.45)] transition-all duration-500"
              >
                {/* Image */}
                <img
                  src={item.image}
                  alt={`${item.title} - ${item.month} corporate sports event`}
                  loading="lazy"
                  className="absolute inset-0 w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                />

                {/* Gradient Overlay */}
                <div className="absolute inset-0 bg-linear-to-b from-transparent via-transparent to-black/70 group-hover:to-black/80 transition-colors duration-300" />

                {/* Content */}
                <div className="absolute bottom-0 left-0 right-0 p-4 text-white text-center transform transition-transform duration-300">
                  <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#C21807]/90 mb-2">
                    <span className="text-xs font-bold uppercase tracking-wide">{item.month}</span>
                  </div>
                  <h3 className="font-bold text-lg group-hover:text-white/90 transition-colors">{item.title}</h3>
                </div>

                {/* Hover Border Effect */}
                <div className="absolute inset-0 border-2 border-transparent group-hover:border-[#C21807] rounded-2xl transition-colors duration-300 pointer-events-none" />
              </motion.div>
            ))}
          </div>
        </motion.div>
      </section>

      {/* Benefits */}
      <section className="py-10 md:py-12 relative overflow-hidden bg-gray-50">
        <div className="hidden" />

        <motion.div 
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="max-w-7xl mx-auto px-6 relative z-10"
        >
          <div className="grid md:grid-cols-2 gap-10">
            {details.map((item, index) => (
              <motion.div 
                key={item.id} 
                initial={{ opacity: 0, x: index === 0 ? -60 : 60 }}
                whileInView={{ opacity: 1, x: 0 }}
                whileHover={{ y: -8 }}
                transition={{ 
                  type: 'spring', 
                  stiffness: 100,
                  damping: 20,
                  delay: index * 0.1
                }}
                viewport={{ once: true }}
                className="group relative bg-white rounded-3xl shadow-xl hover:shadow-[0_12px_35px_rgba(248,113,113,0.45)] transition-all duration-500 overflow-hidden cursor-pointer"
              >
                {/* Decorative Background disabled for pure white */}
                <div className="hidden" />
                <div className="hidden" />

                <div className="relative p-8">
                  {/* Icon Badge */}
                  <div className="inline-flex items-center gap-1.5 sm:gap-2 px-3 py-1.5 sm:px-4 sm:py-2 rounded-full bg-linear-to-r from-[#C21807] to-[#A01506] text-white shadow-md mb-6">
                    {item.id === 1 ? (
                      <CheckCircle className="w-5 h-5 text-white" />
                    ) : (
                      <Zap className="w-5 h-5 text-white" />
                    )}
                    <span className="text-sm font-bold">{item.title}</span>
                  </div>

                  <ul className="space-y-4">
                    {Object.values(item).slice(2).map((line, i) => (
                      <li key={i} className="flex items-start gap-3 text-gray-700">
                        <CheckCircle className="w-5 h-5 sm:w-6 sm:h-6 text-[#C21807] shrink-0 mt-0.5" />
                        <span className="text-sm sm:text-base leading-relaxed">{line}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
        
        <div className="text-center mt-10 md:mt-16 px-6">
          <Link to="/contact">
            <motion.button
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ type: "spring", stiffness: 100, damping: 20 }}
              viewport={{ once: true }}
              whileHover={{ scale: 1.05, y: -2 }}
              whileTap={{ scale: 0.98 }}
              className="flex sm:inline-flex w-full sm:w-auto max-w-sm sm:max-w-none items-center justify-center gap-2 sm:gap-3 px-5 py-3 sm:px-8 sm:py-4 md:px-10 md:py-5 bg-[#C21807] text-white font-bold text-sm sm:text-base md:text-lg rounded-xl shadow-xl hover:shadow-2xl hover:shadow-[#C21807]/50 transition-all duration-300 cursor-pointer relative overflow-hidden group/btn focus:outline-none focus-visible:ring-2 focus-visible:ring-[#C21807]/30"
            >
              <span className="relative z-10">Subscribe to Annual Package</span>
              <ArrowRight className="w-5 h-5 sm:w-6 sm:h-6 relative z-10 transform transition-transform duration-300 group-hover/btn:translate-x-1" />
              {/* Shimmer effect */}
              <div className="absolute inset-0 bg-white/20 -translate-x-full group-hover/btn:translate-x-full transition-transform duration-700" />
            </motion.button>
          </Link>
        </div>
      </section>
    </div>
  )
}

export default Annualplan
