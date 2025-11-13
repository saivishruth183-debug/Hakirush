import React from 'react'
import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'

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
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-linear-to-r from-red-50 to-orange-50 border border-red-100">
                <div className="w-2 h-2 rounded-full bg-red-500 animate-pulse" />
                <span className="text-sm font-semibold text-red-600">Our Packages</span>
              </div>

              <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight">
                Choose Your{' '}
                <span className="bg-linear-to-r from-red-600 via-red-500 to-orange-500 bg-clip-text text-transparent">
                  Perfect Package
                </span>
              </h1>

              <p className="text-sm sm:text-base lg:text-lg text-gray-600 max-w-4xl mx-auto leading-relaxed">
                Every quarter, <span className="font-bold text-gray-900">HAKIRUSH</span> brings together{' '}
                <span className="font-bold text-red-600">10+ companies</span> for high-energy corporate tournaments — each event focusing on one iconic sport
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
                  initial={{ opacity: 0, y: 40 }} 
                  animate={{ opacity: 1, y: 0 }}
                  whileHover={{ y: -8, scale: 1.02 }}
                  transition={{ type: 'spring', stiffness: 200 }}
                >
                  {/* Most Preferred Badge */}
                  <div className="absolute -top-5 left-1/2 -translate-x-1/2 z-30">
                    <div className="flex items-center gap-2 px-5 py-2 bg-linear-to-r from-yellow-400 to-yellow-500 rounded-full shadow-lg">
                      <svg className="w-4 h-4 text-red-700" fill="currentColor" viewBox="0 0 20 20">
                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                      </svg>
                      <span className="text-sm font-bold text-red-700 uppercase tracking-wide">Most Preferred</span>
                    </div>
                  </div>

                  {/* Card */}
                  <div className="relative h-full bg-linear-to-br from-red-600 to-orange-500 rounded-3xl shadow-2xl overflow-hidden cursor-pointer">
                    {/* Decorative elements */}
                    <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(255,255,255,0.1),transparent_50%)]" />
                    <div className="absolute -top-20 -right-20 w-60 h-60 bg-white/10 rounded-full blur-3xl" />
                    <div className="absolute -bottom-20 -left-20 w-60 h-60 bg-white/10 rounded-full blur-3xl" />
                    
                    <div className="relative h-full flex flex-col items-center justify-center p-10 sm:p-16 lg:p-20 text-center">
                      {/* Icon and Title in Row */}
                      <div className="flex items-center justify-center gap-4 mb-6">
                        <svg className="w-10 h-10 sm:w-12 sm:h-12 text-white/90 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                        </svg>
                        <h3 className="text-xl sm:text-2xl lg:text-3xl font-extrabold text-white whitespace-nowrap">
                          Annual Subscription
                        </h3>
                      </div>
                      <p className="text-sm sm:text-base text-white/90 mb-8 max-w-md">
                        12 months of unlimited sports events and team building activities
                      </p>
                      <div className="inline-flex items-center gap-2 px-6 py-3 bg-white text-red-600 rounded-xl font-bold text-lg group-hover:scale-105 transition-transform duration-300">
                        <span>Explore Details</span>
                        <svg className="w-5 h-5 transform group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                        </svg>
                      </div>
                    </div>
                  </div>
                </motion.div>
              </Link>

              {/* Quarterly Card */}
              <Link to="/package/quarterly" className="w-full lg:w-1/2">
                <motion.div
                  initial={{ opacity: 0, y: 40 }}
                  animate={{ opacity: 1, y: 0 }}
                  whileHover={{ y: -8, scale: 1.02 }}
                  transition={{ type: 'spring', stiffness: 200 }}
                  className="relative h-full group cursor-pointer"
                >
                  {/* Card */}
                  <div className="relative h-full bg-white rounded-3xl shadow-2xl border border-gray-200 overflow-hidden">
                    
                    <div className="relative h-full flex flex-col items-center justify-center p-10 sm:p-16 lg:p-20 text-center">
                      {/* Icon and Title in Row */}
                      <div className="flex items-center justify-center gap-4 mb-6">
                        <svg className="w-10 h-10 sm:w-12 sm:h-12 text-red-600 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v13m0-13V6a2 2 0 112 2h-2zm0 0V5.5A2.5 2.5 0 109.5 8H12zm-7 4h14M5 12a2 2 0 110-4h14a2 2 0 110 4M5 12v7a2 2 0 002 2h10a2 2 0 002-2v-7" />
                        </svg>
                        <h3 className="text-xl sm:text-2xl lg:text-3xl font-extrabold bg-linear-to-r from-red-600 to-orange-500 bg-clip-text text-transparent whitespace-nowrap">
                          Quarterly Tournaments
                        </h3>
                      </div>
                      <p className="text-xs sm:text-sm text-gray-600 mb-8 max-w-md">
                        High-energy competitive events every 3 months with multiple companies
                      </p>
                      <div className="inline-flex items-center gap-2 px-6 py-3 bg-linear-to-r from-red-600 to-orange-500 text-white rounded-xl font-bold text-lg group-hover:scale-105 transition-transform duration-300 shadow-lg">
                        <span>Explore Details</span>
                        <svg className="w-5 h-5 transform group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                        </svg>
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
