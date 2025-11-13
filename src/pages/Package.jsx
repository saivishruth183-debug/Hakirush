import React from 'react'
import { Link } from 'react-router-dom'
// eslint-disable-next-line no-unused-vars
import { motion } from 'framer-motion' // Ensure motion is imported for animations
import { Star, CalendarDays, Trophy, ArrowRight } from 'lucide-react'

const Package = () => {
  return (
    <div className="relative bg-white overflow-hidden">
      <div className="relative z-10">

        {/* Hero Section */}
        <section className="py-20 relative overflow-hidden">

          <div className="max-w-7xl mx-auto px-6 text-center relative z-10">
            <motion.div
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="space-y-8"
            >
              {/* Badge */}
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#C21807]/10 border border-[#C21807]/20">
                <div className="w-2 h-2 rounded-full bg-[#C21807] animate-pulse" />
                <span className="text-sm font-semibold text-[#C21807]">Our Packages</span>
              </div>

              <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight">
                Choose Your{' '}
                <span className="bg-linear-to-r from-[#C21807] via-[#A01506] to-[#C21807] bg-clip-text text-transparent">
                  Perfect Package
                </span>
              </h1>

              <p className="text-sm sm:text-base lg:text-md text-gray-600 max-w-4xl mx-auto leading-relaxed">
                Every quarter, <span className="font-bold text-gray-900">HAKIRUSH</span> brings together{' '}
                <span className="font-bold text-[#C21807]">10+ companies</span> for high-energy corporate tournaments — each event focusing on one iconic sport
              </p>
            </motion.div>
          </div>
        </section>

        {/* Card Section */}
        <section className="py-24 relative overflow-hidden">

          <div className="relative z-10 flex items-center justify-center px-4">
            <div className="flex flex-col lg:flex-row gap-10 w-full max-w-6xl">

              {/* Annual Subscription Card */}
              <Link to="/package/annualpackage" className="w-full lg:w-1/2">
                <motion.div 
                  className="relative h-full group"
                  initial={{ opacity: 0, y: 40, rotateX: -10 }}
                  whileInView={{ opacity: 1, y: 0, rotateX: 0 }}
                  transition={{ 
                    type: 'spring', 
                    stiffness: 200
                  }}
                  viewport={{ once: true }}
                  whileHover={{ 
                    scale: window.innerWidth >= 768 ? 1.03 : 1,
                    y: window.innerWidth >= 768 ? -8 : 0
                  }}
                >
                  {/* Most Preferred Badge */}
                  <div className="absolute -top-5 left-1/2 -translate-x-1/2 z-30">
                    <div className="flex items-center gap-2 px-5 py-2 bg-linear-to-r from-yellow-400 to-yellow-500 rounded-full shadow-lg">
                      <Star className="w-4 h-4 text-[#1a2332]" />
                      <span className="text-sm font-bold text-[#1a2332] uppercase tracking-wide">Most Preferred</span>
                    </div>
                  </div>

                  {/* Card */}
                  <div className="relative h-full bg-[#C21807] rounded-3xl shadow-2xl overflow-hidden cursor-pointer">
                    {/* Decorative elements */}
                    <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(255,255,255,0.1),transparent_50%)]" />
                    <div className="absolute -top-20 -right-20 w-60 h-60 bg-white/10 rounded-full blur-3xl" />
                    <div className="absolute -bottom-20 -left-20 w-60 h-60 bg-white/10 rounded-full blur-3xl" />
                    
                    <div className="relative h-full flex flex-col items-center justify-center p-10 sm:p-16 lg:p-20 text-center">
                      {/* Icon and Title in Row */}
                      <div className="flex items-center justify-center gap-4 mb-6">
                        <CalendarDays className="w-10 h-10 sm:w-12 sm:h-12 text-white/90 shrink-0" />
                        <h3 className="text-xl sm:text-2xl lg:text-3xl font-extrabold text-white whitespace-nowrap">
                          Annual Subscription
                        </h3>
                      </div>
                      <p className="text-sm sm:text-base text-white/90 mb-8 max-w-md">
                        12 months of unlimited sports events and team building activities
                      </p>
                      <div className="inline-flex items-center gap-2 px-6 py-3 bg-white text-[#C21807] rounded-lg font-bold text-lg group-hover:scale-105 transition-transform duration-300 shadow-lg">
                        <span>Explore Details</span>
                        <ArrowRight className="w-5 h-5 transform group-hover:translate-x-1 transition-transform" />
                      </div>
                    </div>
                  </div>
                </motion.div>
              </Link>

              {/* Quarterly Card */}
              <Link to="/package/quarterly" className="w-full lg:w-1/2">
                <motion.div
                  initial={{ opacity: 0, y: 40, rotateX: -10 }}
                  whileInView={{ opacity: 1, y: 0, rotateX: 0 }}
                  transition={{ 
                    type: 'spring', 
                    stiffness: 200
                  }}
                  viewport={{ once: true }}
                  whileHover={{ 
                    scale: window.innerWidth >= 768 ? 1.03 : 1,
                    y: window.innerWidth >= 768 ? -8 : 0
                  }}
                  className="relative h-full group cursor-pointer"
                >
                  {/* Card */}
                  <div className="relative h-full bg-white rounded-3xl shadow-2xl border border-gray-200 overflow-hidden">
                    
                    <div className="relative h-full flex flex-col items-center justify-center p-10 sm:p-16 lg:p-20 text-center">
                      {/* Icon and Title in Row */}
                      <div className="flex items-center justify-center gap-4 mb-6">
                        <Trophy className="w-10 h-10 sm:w-12 sm:h-12 text-[#C21807] shrink-0" />
                        <h3 className="text-xl sm:text-2xl lg:text-3xl font-extrabold bg-linear-to-r from-[#C21807] via-[#A01506] to-[#C21807] bg-clip-text text-transparent whitespace-nowrap">
                          Quarterly Tournaments
                        </h3>
                      </div>
                      <p className="text-xs sm:text-sm text-gray-600 mb-8 max-w-md">
                        High-energy competitive events every 3 months with multiple companies
                      </p>
                      <div className="inline-flex items-center gap-2 px-6 py-3 bg-[#C21807] text-white rounded-lg font-bold text-lg group-hover:scale-105 hover:shadow-xl hover:shadow-[#C21807]/50 transition-all duration-300 shadow-lg">
                        <span>Explore Details</span>
                        <ArrowRight className="w-5 h-5 transform group-hover:translate-x-1 transition-transform" />
                      </div>
                    </div>
                  </div>
                </motion.div>
              </Link>

            </div>
          </div>
        </section>

      </div>
    </div>
  )
}

export default Package