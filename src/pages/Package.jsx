import React from 'react'
import { Link } from 'react-router-dom'
import { motion } from 'framer-motion' // Ensure motion is imported for animations
import { Star, CalendarDays, Trophy, ArrowRight } from 'lucide-react'

const Package = () => {
  return (
    <div className="relative bg-gray-50 overflow-hidden">
      <div className="relative z-10">

        {/* Hero Section */}
        <section className="py-18 relative overflow-hidden">

          <div className="max-w-7xl mx-auto px-6 text-center relative z-10">
            <motion.div
              initial={{ opacity: 0, y: -40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1.2, ease: "easeOut" }}
              viewport={{ once: true }}
              className="space-y-6"
            >
              {/* Badge */}
              <div className="inline-flex items-center gap-1.5 sm:gap-2 px-3 py-2 sm:px-5 sm:py-2.5 rounded-full bg-linear-to-r from-[#C21807]/10 to-[#A01506]/10 border border-[#C21807]/30 shadow-lg backdrop-blur-sm">
                <Star className="w-4 h-4 text-[#C21807]" fill='#C21807' />
                <span className="text-sm font-bold text-[#C21807]">Our Packages</span>
              </div>

              <h1 className="text-3xl sm:text-4xl md:text-5xl font-black tracking-tight leading-tight">
                Choose Your{' '}
                <span className="bg-linear-to-r from-[#C21807] via-[#A01506] to-[#C21807] bg-clip-text text-transparent drop-shadow-sm">
                  Perfect Package
                </span>
              </h1>

              <p className="text-sm sm:text-base lg:text-lg text-gray-700 max-w-4xl mx-auto leading-relaxed font-medium">
                Every quarter, <span className="font-bold text-gray-900">HAKIRUSH</span> brings together{" "}
                <span className="font-bold text-[#C21807]">
                  10+ companies
                </span>
                {" "}for high-energy corporate tournaments — each event focusing on one iconic sport
              </p>
            </motion.div>
          </div>
        </section>

        {/* Card Section */}
        <motion.section 
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.2, ease: "easeOut" }}
          viewport={{ once: true }}
          className="py-10 relative overflow-hidden">

          <div className="relative z-10 flex items-center justify-center px-4">
            <div className="flex flex-col lg:flex-row gap-10 w-full max-w-6xl">

              {/* Annual Subscription Card */}
              <Link to="/package/annualpackage" className="w-full lg:w-1/2">
                <motion.div 
                  className="relative h-full group"
                  initial={{ opacity: 0, y: 60, rotateX: 10 }}
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
                  {/* Most Preferred Badge - responsive sizing and positioning */}
                  <div className="absolute -top-4 md:-top-5 left-1/2 -translate-x-1/2 z-30 px-2 md:px-0">
                    <div className="flex items-center gap-1.5 md:gap-2 px-3 md:px-5 py-1.5 md:py-2 bg-linear-to-r from-yellow-400 to-yellow-500 rounded-full shadow-lg">
                      <Star className="w-3.5 h-3.5 md:w-4 md:h-4 text-[#1a2332] shrink-0" fill="#1a2332" />
                      <span className="text-xs md:text-sm font-bold text-[#1a2332] uppercase tracking-wide whitespace-nowrap">Most Preferred</span>
                    </div>
                  </div>

                  {/* Card */}
                  <div className="relative h-full bg-[#C21807] rounded-3xl shadow-2xl overflow-hidden cursor-pointer hover:shadow-[0_12px_35px_rgba(248,113,113,0.45)] transition-all duration-500">
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
                      <p className="text-xs sm:text-sm lg:text-base text-white/90 mb-8 max-w-md">
                        12 months of unlimited sports events and team building activities
                      </p>
                      <motion.div
                        whileHover={{ scale: 1.05, y: -2 }}
                        whileTap={{ scale: 0.98 }}
                        transition={{ type: "spring", stiffness: 300 }}
                        className="inline-flex items-center gap-2 px-6 py-2.5 sm:px-8 sm:py-3 bg-white text-[#C21807] rounded-lg font-bold text-base sm:text-lg shadow-xl hover:shadow-2xl transition-all duration-300 cursor-pointer relative overflow-hidden group/btn focus:outline-none focus-visible:ring-4 focus-visible:ring-white/30"
                      >
                        <span className="relative z-10">Explore Details</span>
                        <ArrowRight className="w-5 h-5 relative z-10 transform transition-transform duration-300 group-hover/btn:translate-x-1" />
                        {/* Shimmer effect */}
                        <div className="absolute inset-0 bg-[#C21807]/20 -translate-x-full group-hover/btn:translate-x-full transition-transform duration-700" />
                      </motion.div>
                    </div>
                  </div>
                </motion.div>
              </Link>

              {/* Quarterly Card */}
              <Link to="/package/quarterly" className="w-full lg:w-1/2">
                <motion.div
                  initial={{ opacity: 0, y: 60, rotateX: 10 }}
                  whileInView={{ opacity: 1, y: 0, rotateX: 0 }}
                  transition={{ 
                    type: 'spring', 
                    stiffness: 100,
                    damping: 20
                  }}
                  viewport={{ once: true }}
                  whileHover={{ 
                    scale: window.innerWidth >= 768 ? 1.03 : 1,
                    y: window.innerWidth >= 768 ? -8 : 0
                  }}
                  className="relative h-full group cursor-pointer"
                >
                  {/* Card */}
                  <div className="relative h-full bg-white rounded-3xl shadow-2xl border-2 border-gray-100 hover:border-[#C21807]/20 overflow-hidden hover:shadow-[0_12px_35px_rgba(248,113,113,0.45)] transition-all duration-500">
                    
                    <div className="relative h-full flex flex-col items-center justify-center p-10 sm:p-16 lg:p-20 text-center">
                      {/* Icon and Title in Row */}
                      <div className="flex items-center justify-center gap-4 mb-6">
                        <Trophy className="w-10 h-10 sm:w-12 sm:h-12 text-[#C21807] shrink-0" />
                        <h3 className="text-xl sm:text-2xl lg:text-3xl font-extrabold bg-linear-to-r from-[#C21807] via-[#A01506] to-[#C21807] bg-clip-text text-transparent whitespace-nowrap">
                          Quarterly Tournaments
                        </h3>
                      </div>
                      <p className="text-xs sm:text-sm lg:text-base text-gray-600 mb-8 max-w-md">
                        High-energy competitive events every 3 months with multiple companies
                      </p>
                      <motion.div
                        whileHover={{ scale: 1.05, y: -2 }}
                        whileTap={{ scale: 0.98 }}
                        transition={{ type: "spring", stiffness: 300 }}
                        className="inline-flex items-center gap-2 px-6 py-2.5 sm:px-8 sm:py-3 bg-[#C21807] text-white rounded-lg font-bold text-base sm:text-lg shadow-xl hover:shadow-2xl hover:shadow-[#C21807]/50 transition-all duration-300 cursor-pointer relative overflow-hidden group/btn focus:outline-none focus-visible:ring-4 focus-visible:ring-[#C21807]/30"
                      >
                        <span className="relative z-10">Explore Details</span>
                        <ArrowRight className="w-5 h-5 relative z-10 transform transition-transform duration-300 group-hover/btn:translate-x-1" />
                        {/* Shimmer effect */}
                        <div className="absolute inset-0 bg-white/20 -translate-x-full group-hover/btn:translate-x-full transition-transform duration-700" />
                      </motion.div>
                    </div>
                  </div>
                </motion.div>
              </Link>

            </div>
          </div>
        </motion.section>

      </div>
    </div>
  )
}

export default Package