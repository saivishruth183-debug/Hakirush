import React from 'react'
import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'

const Package = () => {
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

      <div className="relative z-10">

        {/* Hero Section */}
        <section className="py-16 relative overflow-hidden">
          <div
            className="absolute inset-0 pointer-events-none"
            style={{
              background:
                'radial-gradient(circle at center, rgba(255,0,0,0.06), transparent 60%), radial-gradient(circle at bottom right, rgba(255,102,0,0.05), transparent 80%), radial-gradient(circle at top left, rgba(255,255,255,0.05), transparent 90%)'
            }}
          />

          <div className="max-w-7xl mx-auto px-6 text-center relative z-10">
            <motion.div
              initial={{ opacity: 0, y: 40, rotateX: -10 }}
              animate={{ opacity: 1, y: 0, rotateX: 0 }}
              transition={{ duration: 0.8 }}
            >
              <h1 className="text-5xl lg:text-6xl font-extrabold mb-6 tracking-tight">
                <span className="text-red-600">Package</span>
              </h1>

              <p className="text-xl text-gray-700 max-w-3xl mx-auto leading-relaxed">
                Every quarter, HAKIRUSH brings together 10+ companies for high-energy corporate tournaments — each event focusing on one iconic sport.
              </p>
            </motion.div>
          </div>
        </section>

        {/* Card Section */}
        <section className="py-24 relative overflow-hidden">
          <div
            className="absolute inset-0 pointer-events-none"
            style={{
              background:
                'radial-gradient(circle at left, rgba(255,0,0,0.07), transparent 60%), radial-gradient(circle at bottom right, rgba(255,102,0,0.05), transparent 80%), radial-gradient(circle at top left, rgba(255,255,255,0.03), transparent 90%)'
            }}
          />

          <div className="relative z-10 flex items-center justify-center">
            <div className="flex flex-col sm:flex-row gap-8 sm:gap-6 w-11/12 max-w-5xl">

              {/* Annual Subscription Card */}
              <Link to="/package/annualpackage" className="w-full sm:w-1/2">
                <motion.div 
                  className="relative h-full"
                  initial={{ opacity: 0, y: 40, rotateX: -10 }} 
                  animate={{ opacity: 1, y: 0, rotateX: 0 }}
                  whileHover={{ scale: 1.04, rotateY: 8 }}
                  transition={{ type: 'spring', stiffness: 100 }}
                >
                  <span className="absolute -top-4 left-1/2 -translate-x-1/2 px-4 py-1.5 
                    bg-yellow-400 text-red-700 text-xs font-extrabold uppercase 
                    rounded-full shadow-md tracking-wide z-20">
                    Most Preferred
                  </span>

                  <motion.button 
                    className="w-full h-full bg-[#C21807] rounded-2xl text-white font-bold shadow-xl 
                      transition-all cursor-pointer relative z-0  
                      p-20 text-lg 
                      sm:p-10 sm:text-xl 
                      lg:p-24 lg:text-3xl 
                      hover:shadow-2xl hover:shadow-red-400"
                  >
                    Explore Annual Subscription
                  </motion.button>
                </motion.div>
              </Link>

              {/* Quarterly Card */}
              <Link to="/package/quarterly" className="w-full sm:w-1/2">
                <motion.button
                  initial={{ opacity: 0, y: 40, rotateX: -10 }}
                  animate={{ opacity: 1, y: 0, rotateX: 0 }}
                  whileHover={{ scale: 1.04, rotateY: 8 }}
                  transition={{ type: 'spring', stiffness: 200 }}
                  className="w-full h-full bg-white rounded-2xl shadow-xl font-bold text-red-600 
                    border border-gray-200 transition-all cursor-pointer
                    p-20 text-lg
                    sm:p-10 sm:text-xl
                    lg:p-24 lg:text-3xl
                    hover:shadow-2xl hover:shadow-red-400"
                >
                  Explore Quarterly Tournaments
                </motion.button>
              </Link>

            </div>
          </div>
        </section>

      </div>
    </div>
  )
}

export default Package
