import React from "react";
import { motion } from 'framer-motion'
import { CheckCircle, Trophy, ArrowRight } from 'lucide-react'
import { Link } from 'react-router-dom'
import Cricket from '../assets/cricket.png'
import Badminton from '../assets/badminton.png'
import Football from '../assets/football.png'
import Multi from "../assets/multisports.png";

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
  return (
    <div className="relative bg-white overflow-hidden">

      <section className="py-20 relative overflow-hidden">

        {/* Max-width container for content */}
        <div className="max-w-7xl mx-auto px-6 text-center relative z-10">
          {/* Header */}
          <motion.div
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="text-center max-w-5xl mx-auto space-y-8"
          >
              {/* Badge */}
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-linear-to-r from-red-50 to-orange-50 border border-red-100">
                <div className="w-2 h-2 rounded-full bg-red-500 animate-pulse" />
                <span className="text-sm font-semibold text-red-600">Quarterly Tournaments</span>
              </div>

              <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight leading-tight">
                  Q-League —{' '}
                  <span className="bg-linear-to-r from-red-600 via-red-500 to-orange-500 bg-clip-text text-transparent">
                    Compete. Connect. Conquer.
                  </span>
              </h1>
              <p className="text-base sm:text-lg text-gray-600 leading-relaxed max-w-4xl mx-auto">
                  Every quarter, <span className="font-bold text-gray-900">HAKIRUSH</span> brings together{' '}
                  <span className="font-bold text-red-600">10+ companies</span> for high-energy corporate tournaments — each event focusing on one iconic sport.
              </p>
          </motion.div>
        </div>
      </section>

      {/* Timeline Cards */}
      <section className="py-20 relative overflow-hidden">

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
              <span className="text-sm font-semibold text-red-600">4 Quarters. 4 Sports.</span>
            </div>
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-gray-900 mb-4">
              Quarterly{' '}
              <span className="bg-linear-to-r from-red-600 to-orange-500 bg-clip-text text-transparent">
                Tournament Calendar
              </span>
            </h2>
            <p className="text-base text-gray-600 max-w-3xl mx-auto">
              Four epic tournaments throughout the year, each bringing companies together for competitive excellence
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {quarters.map((item, index) => (
              <motion.div 
                key={item.id}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ 
                  duration: 0.5,
                  delay: index * 0.1
                }}
                viewport={{ once: true }}
                whileHover={{ y: -8, scale: 1.02 }}
                className="group relative rounded-2xl overflow-hidden bg-white shadow-xl hover:shadow-2xl transition-all duration-500 cursor-pointer"
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
                    <div className="flex items-center gap-2 px-4 py-2 rounded-full bg-red-600 shadow-lg">
                      <Trophy className="w-4 h-4 text-white" />
                      <span className="text-sm font-bold text-white uppercase">{item.quarter}</span>
                    </div>
                  </div>

                  {/* Content */}
                  <div className="absolute bottom-0 left-0 right-0 p-6 text-white">
                    <h3 className="text-2xl font-extrabold mb-2 group-hover:text-red-300 transition-colors">{item.name}</h3>
                    <p className="text-sm text-gray-200 font-semibold">{item.sport}</p>
                  </div>

                  {/* Hover Border Effect */}
                  <div className="absolute inset-0 border-2 border-transparent group-hover:border-red-500 rounded-2xl transition-colors duration-300 pointer-events-none" />
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </section>

      {/* What's Included + Benefits */}
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
        
        <motion.div 
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          whileHover={{ y: -8 }}
          transition={{ 
            type: 'spring', 
            stiffness: 200,
            delay: 0
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
              <CheckCircle className="w-5 h-5 text-white" />
              <span className="text-sm font-bold text-white">What's Included</span>
            </div>

            <ul className="space-y-4">
              {features.map((text, i) => (
                <li key={i} className="flex items-start gap-3 text-gray-700">
                  <CheckCircle className="w-6 h-6 text-red-600 shrink-0 mt-0.5" />
                  <span className="text-base leading-relaxed">{text}</span>
                </li>
              ))}
            </ul>
          </div>
        </motion.div>

        <motion.div 
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          whileHover={{ y: -8 }}
          transition={{ 
            type: 'spring', 
            stiffness: 200,
            delay: 0.1
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
              <Trophy className="w-5 h-5 text-white" />
              <span className="text-sm font-bold text-white">Benefits</span>
            </div>

            <ul className="space-y-4">
              {benefits.map((text, i) => (
                <li key={i} className="flex items-start gap-3 text-gray-700">
                  <CheckCircle className="w-6 h-6 text-red-600 shrink-0 mt-0.5" />
                  <span className="text-base leading-relaxed">{text}</span>
                </li>
              ))}
            </ul>
          </div>
        </motion.div>
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
              <span className="relative z-10">Register for Quarterly Package</span>
              <ArrowRight className="w-6 h-6 relative z-10 transform group-hover:translate-x-1 transition-transform" />
              {/* Shimmer effect */}
              <div className="absolute inset-0 bg-white/20 -translate-x-full group-hover:translate-x-full transition-transform duration-700" />
            </motion.button>
          </Link>
        </div>
      </section>
    </div>
  );
};

export default QLeague;
