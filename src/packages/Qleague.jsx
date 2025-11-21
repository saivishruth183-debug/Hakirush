import React from "react";
// eslint-disable-next-line no-unused-vars
import { motion } from 'framer-motion'
import { CheckCircle, Trophy, ArrowRight, CalendarDays, ArrowLeft } from 'lucide-react'
import { Link, useNavigate } from 'react-router-dom'
import Cricket from '../assets/Q-League/Cricket.png'
import Badminton from '../assets/Q-League/Badminton.png'
import Football from '../assets/Q-League/Football.png'
import Multi from "../assets/Q-League/multisports.png";

const quarters = [
  { id: 1, quarter: "Q1", name: "HAKIRUSH CUP", sport: "Cricket", image: Cricket },
  { id: 2, quarter: "Q2", name: "SmashFest", sport: "Badminton", image: Badminton },
  { id: 3, quarter: "Q3", name: "GoalRush", sport: "Football", image: Football },
  { id: 4, quarter: "Q4", name: "Battle of Corporates", sport: "Multi-Sport Festival", image: Multi },
];

const features = [
  "Full-scale tournament management",
  "Umpires, referees, and match fixtures",
  "On-ground branding & sponsor booths",
  "Photography, reels, and highlight coverage",
  "Awards, medals, and digital badges",
];

const benefits = [
  "Build inter-company connections",
  "Engage employees with competitive excitement",
  "Strengthen your brand presence",
  "Attract sponsors and PR coverage",
];

const QLeague = () => {
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

      <section className="py-12 md:py-24 relative overflow-hidden bg-gray-50">

        {/* Max-width container for content */}
        <div className="max-w-7xl mx-auto px-6 text-center relative z-10">
          {/* Header */}
          <motion.div
              initial={{ opacity: 0, y: -40 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 1.2, ease: "easeOut" }}
              viewport={{ once: true }}
              className="text-center max-w-4xl mx-auto space-y-6 md:space-y-8"
          >
              {/* Badge */}
              <div className="inline-flex items-center gap-1.5 sm:gap-2 px-3 py-2 sm:px-5 sm:py-2.5 rounded-full bg-linear-to-r from-[#C21807]/10 to-[#A01506]/10 border border-[#C21807]/30 shadow-lg backdrop-blur-sm">
                <Trophy className="w-4 h-4 text-[#C21807]" />
                <span className="text-sm font-bold text-[#C21807]">Quarterly Tournaments</span>
              </div>

              <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black tracking-tight leading-tight">
                  Q-League —{' '}
                  <span className="bg-linear-to-r from-[#C21807] via-[#A01506] to-[#C21807] bg-clip-text text-transparent drop-shadow-sm">
                    Compete. Connect. Conquer.
                  </span>
              </h1>
              <p className="text-sm sm:text-base lg:text-lg text-gray-700 leading-relaxed max-w-3xl mx-auto font-medium">
                  Every quarter, <span className="font-bold text-gray-900">HAKIRUSH</span> brings together{' '}
                  <span className="font-bold text-[#C21807]">
                    10+ companies
                  </span> for high-energy corporate tournaments — each event focusing on one iconic sport.
              </p>
          </motion.div>
        </div>
      </section>

      {/* Timeline Cards */}
      <section className="py-10 md:py-12 relative overflow-hidden bg-gray-50">

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
              <CalendarDays className="w-4 h-4 text-[#C21807]" />
              <span className="text-sm font-bold text-[#C21807]">4 Quarters. 4 Sports.</span>
            </div>
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-black text-gray-900 mb-4">
              Quarterly{' '}
              <span className="bg-linear-to-r from-[#C21807] via-[#A01506] to-[#C21807] bg-clip-text text-transparent drop-shadow-sm">
                Tournament Calendar
              </span>
            </h2>
            <p className="text-sm sm:text-base lg:text-lg text-gray-700 max-w-3xl mx-auto">
              Four epic tournaments throughout the year, each bringing companies together for competitive excellence
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {quarters.map((item, index) => (
              <motion.div 
                key={item.id}
                initial={{ opacity: 0, y: 60 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ 
                  type: 'spring',
                  stiffness: 100,
                  damping: 20,
                  delay: index * 0.1
                }}
                viewport={{ once: true }}
                whileHover={{ y: -8, scale: 1.02 }}
                className="group relative rounded-2xl overflow-hidden bg-white shadow-xl hover:shadow-[0_12px_35px_rgba(248,113,113,0.45)] transition-all duration-500 cursor-pointer"
              >
                <div className="relative h-80 overflow-hidden">
                  <img 
                    src={item.image} 
                    alt={item.name} 
                    loading="lazy"
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                  />
                  
                  {/* Gradient Overlay */}
                  <div className="absolute inset-0 bg-linear-to-b from-black/40 via-transparent to-black/80" />
                  
                  {/* Quarter Badge */}
                  <div className="absolute top-4 left-4">
                    <div className="flex items-center gap-2 px-4 py-2 rounded-full bg-linear-to-r from-[#C21807] to-[#A01506] text-white shadow-lg">
                      <Trophy className="w-4 h-4 text-white" />
                      <span className="text-sm font-bold uppercase">{item.quarter}</span>
                    </div>
                  </div>

                  {/* Content */}
                  <div className="absolute bottom-0 left-0 right-0 p-6 text-white">
                    <h3 className="text-xl sm:text-2xl font-extrabold mb-2 group-hover:text-[#C21807]/70 transition-colors">{item.name}</h3>
                    <p className="text-sm text-gray-200 font-semibold">{item.sport}</p>
                  </div>

                  {/* Hover Border Effect */}
                  <div className="absolute inset-0 border-2 border-transparent group-hover:border-[#C21807] rounded-2xl transition-colors duration-300 pointer-events-none" />
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </section>

      {/* What's Included + Benefits */}
      <section className="py-10 md:py-12 relative overflow-hidden bg-gray-50">
        <div className="hidden" aria-hidden="true"></div>

        <div className="max-w-7xl mx-auto px-6 relative z-10">
          <div className="grid md:grid-cols-2 gap-8 md:gap-16">
        
        <motion.div 
          initial={{ opacity: 0, x: -60 }}
          whileInView={{ opacity: 1, x: 0 }}
          whileHover={{ y: -8 }}
          transition={{ 
            type: 'spring', 
            stiffness: 100,
            damping: 20,
            delay: 0
          }}
          viewport={{ once: true }}
          className="group relative bg-white rounded-3xl shadow-xl hover:shadow-[0_12px_35px_rgba(248,113,113,0.45)] transition-all duration-500 overflow-hidden cursor-pointer"
        >
          {/* Decorative Background removed for pure white */}
          <div className="hidden" aria-hidden="true" />
          <div className="hidden" aria-hidden="true" />

          <div className="relative p-8">
            {/* Icon Badge */}
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-linear-to-r from-[#C21807] to-[#A01506] text-white shadow-md mb-6">
              <CheckCircle className="w-5 h-5 text-white" />
              <span className="text-sm font-bold">What's Included</span>
            </div>

            <ul className="space-y-4">
              {features.map((text, i) => (
                <li key={i} className="flex items-start gap-3 text-gray-700">
                  <CheckCircle className="w-5 h-5 sm:w-6 sm:h-6 text-[#C21807] shrink-0 mt-0.5" />
                  <span className="text-sm sm:text-base leading-relaxed">{text}</span>
                </li>
              ))}
            </ul>
          </div>
        </motion.div>

        <motion.div 
          initial={{ opacity: 0, x: 60 }}
          whileInView={{ opacity: 1, x: 0 }}
          whileHover={{ y: -8 }}
          transition={{ 
            type: 'spring', 
            stiffness: 100,
            damping: 20,
            delay: 0.1
          }}
          viewport={{ once: true }}
          className="group relative bg-white rounded-3xl shadow-xl hover:shadow-[0_12px_35px_rgba(248,113,113,0.45)] transition-all duration-500 overflow-hidden cursor-pointer"
        >
          {/* Decorative Background removed for pure white */}
          <div className="hidden" aria-hidden="true" />
          <div className="hidden" aria-hidden="true" />

          <div className="relative p-8">
            {/* Icon Badge */}
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-linear-to-r from-[#C21807] to-[#A01506] text-white shadow-md mb-6">
              <Trophy className="w-5 h-5 text-white" />
              <span className="text-sm font-bold">Benefits</span>
            </div>

            <ul className="space-y-4">
              {benefits.map((text, i) => (
                <li key={i} className="flex items-start gap-3 text-gray-700">
                  <CheckCircle className="w-5 h-5 sm:w-6 sm:h-6 text-[#C21807] shrink-0 mt-0.5" />
                  <span className="text-sm sm:text-base leading-relaxed">{text}</span>
                </li>
              ))}
            </ul>
          </div>
        </motion.div>
          </div>
        </div>
        
        <div className="text-center mt-12 md:mt-24 px-6">
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
              <span className="relative z-10">Register for Quarterly Package</span>
              <ArrowRight className="w-5 h-5 sm:w-6 sm:h-6 relative z-10 transform transition-transform duration-300 group-hover/btn:translate-x-1" />
              {/* Shimmer effect */}
              <div className="absolute inset-0 bg-white/20 -translate-x-full group-hover/btn:translate-x-full transition-transform duration-700" />
            </motion.button>
          </Link>
        </div>
      </section>
    </div>
  );
};

export default QLeague;
