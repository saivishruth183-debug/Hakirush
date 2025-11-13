import React from 'react'
import { motion } from 'framer-motion'
import { CheckCircle, Zap, ArrowRight } from 'lucide-react'

import Marathon from '../assets/Run.png'
import Football from '../assets/football.png'
import Badminton from '../assets/doublebadmention.png'
import Cricket from '../assets/cricket6s.png'
import Table from '../assets/Tabletennis.png'
import Yoga from '../assets/yoga.png'
import Volleyball from '../assets/volleyball.png'
import Chess from '../assets/chess.png'
import Fitness from '../assets/bootcamp.png'
import Relay from '../assets/relayrun.png'
import Olympics from '../assets/Olympics.png'
import Finale from '../assets/allstar.png'
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
  return (
    <div className="relative bg-white overflow-hidden">

      {/* Global background glow */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "radial-gradient(circle at center, rgba(255,0,0,0.06), transparent 60%), radial-gradient(circle at bottom right, rgba(255,102,0,0.05), transparent 80%), radial-gradient(circle at top left, rgba(255,255,255,0.05), transparent 90%)"
        }}
      />

      <section className="py-20 relative overflow-hidden">

          {/* Max-width container for content */}
          <div className="max-w-7xl mx-auto px-6 text-center relative z-10">
            {/* Header - motion.div with new animation and reduced padding for centering */}
            <motion.div
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="text-center max-w-5xl mx-auto space-y-8"
            >
              {/* Badge */}
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-linear-to-r from-red-50 to-orange-50 border border-red-100">
                <div className="w-2 h-2 rounded-full bg-red-500 animate-pulse" />
                <span className="text-sm font-semibold text-red-600">Annual Subscription</span>
              </div>

              <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight leading-tight">
                Annual Package —{' '}
                <span className="bg-linear-to-r from-red-600 via-red-500 to-orange-500 bg-clip-text text-transparent">
                  12 Months. 12 Sports.
                </span>{' '}
                One Unstoppable Team.
              </h1>

              <p className="text-base sm:text-lg text-gray-600 leading-relaxed max-w-4xl mx-auto">
                A year-long engagement program designed for organizations that believe in{' '}
                <span className="font-bold text-gray-900">consistent team connection</span> and{' '}
                <span className="font-bold text-red-600">active employee culture</span>.
                Each month brings a new sport, a new challenge, and a stronger team.
              </p>
            </motion.div>
          </div>
        </section>

      {/* Monthly Schedule */}
      <section className="py-20 relative overflow-hidden">
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-1/3 left-10 w-72 h-72 bg-linear-to-br from-red-200/30 to-transparent rounded-full blur-3xl" />
          <div className="absolute bottom-1/3 right-10 w-72 h-72 bg-linear-to-br from-orange-200/30 to-transparent rounded-full blur-3xl" />
        </div>

        <motion.div 
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="max-w-7xl mx-auto px-6 relative z-10"
        >
          {/* Section Header */}
          <div className="text-center mb-12">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-linear-to-r from-red-50 to-orange-50 border border-red-100 mb-6">
              <div className="w-2 h-2 rounded-full bg-red-500 animate-pulse" />
              <span className="text-sm font-semibold text-red-600">12-Month Calendar</span>
            </div>
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-gray-900 mb-4">
              Monthly{' '}
              <span className="bg-linear-to-r from-red-600 to-orange-500 bg-clip-text text-transparent">
                Activity Calendar
              </span>
            </h2>
            <p className="text-base text-gray-600 max-w-3xl mx-auto">
              A carefully curated mix of sports and wellness activities to keep your team engaged year-round
            </p>
          </div>

          <div className="grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {plans.map((item, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ 
                  duration: 0.5,
                  delay: index * 0.05
                }}
                viewport={{ once: true }}
                whileHover={{ y: -8, scale: 1.02 }}
                className="group relative rounded-2xl shadow-lg overflow-hidden cursor-pointer aspect-square"
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
                  <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-red-600/90 mb-2">
                    <span className="text-xs font-bold uppercase tracking-wide">{item.month}</span>
                  </div>
                  <h3 className="font-bold text-lg group-hover:text-red-300 transition-colors">{item.title}</h3>
                </div>

                {/* Hover Border Effect */}
                <div className="absolute inset-0 border-2 border-transparent group-hover:border-red-500 rounded-2xl transition-colors duration-300 pointer-events-none" />
              </motion.div>
            ))}
          </div>
        </motion.div>
      </section>

      {/* Benefits */}
      <section className="py-20 relative overflow-hidden bg-white">
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-1/4 right-1/4 w-96 h-96 bg-linear-to-br from-red-300/20 to-orange-300/20 rounded-full blur-3xl animate-pulse" />
        </div>

        <motion.div 
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="max-w-7xl mx-auto px-6 relative z-10"
        >
          <div className="grid md:grid-cols-2 gap-10">
            {details.map((item, index) => (
              <motion.div 
                key={item.id} 
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                whileHover={{ y: -8 }}
                transition={{ 
                  type: 'spring', 
                  stiffness: 200,
                  delay: index * 0.1
                }}
                viewport={{ once: true }}
                className="group relative bg-white rounded-3xl shadow-xl hover:shadow-2xl transition-all duration-500 overflow-hidden cursor-pointer"
              >
                {/* Decorative Background */}
                <div className="absolute inset-0 bg-linear-to-br from-red-50/50 via-transparent to-orange-50/50 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                <div className="absolute -top-20 -right-20 w-40 h-40 bg-linear-to-br from-red-200/30 to-transparent rounded-full blur-2xl" />

                <div className="relative p-8">
                  {/* Icon Badge */}
                  <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-linear-to-r from-red-600 to-orange-500 mb-6">
                    {item.id === 1 ? (
                      <CheckCircle className="w-5 h-5 text-white" />
                    ) : (
                      <Zap className="w-5 h-5 text-white" />
                    )}
                    <span className="text-sm font-bold text-white">{item.title}</span>
                  </div>

                  <ul className="space-y-4">
                    {Object.values(item).slice(2).map((line, i) => (
                      <li key={i} className="flex items-start gap-3 text-gray-700">
                        <CheckCircle className="w-6 h-6 text-red-600 shrink-0 mt-0.5" />
                        <span className="text-base leading-relaxed">{line}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
        
        <div className="text-center mt-16">
          <Link to="/contact">
            <motion.button
              whileHover={{ scale: 1.05, y: -2 }}
              whileTap={{ scale: 0.98 }}
              transition={{ type: "spring", stiffness: 300 }}
              className="inline-flex items-center justify-center gap-3 px-10 py-5 bg-linear-to-r from-red-600 to-orange-500 text-white font-bold text-lg rounded-xl shadow-xl hover:shadow-2xl hover:shadow-red-500/50 transition-all duration-300 cursor-pointer relative overflow-hidden group"
            >
              <span className="relative z-10">Subscribe to Annual Package</span>
              <ArrowRight className="w-6 h-6 relative z-10 transform group-hover:translate-x-1 transition-transform" />
              {/* Shimmer effect */}
              <div className="absolute inset-0 bg-white/20 -translate-x-full group-hover:translate-x-full transition-transform duration-700" />
            </motion.button>
          </Link>
        </div>
      </section>
    </div>
  )
}

export default Annualplan
