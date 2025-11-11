import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';

const Package = () => {
  return (
    <div className="relative bg-gradient-to-b from-white via-gray-50 to-gray-100 overflow-hidden min-h-screen">
      
      {/* Background/Gradient Section */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_#ff000015,_transparent_80%),_radial-gradient(circle_at_bottom_right,_#ff660010,_transparent_90%),_radial-gradient(circle_at_top_left,_#ffffff05,_transparent_80%)]" />
      
      {/* Header Section (Already Centered) */}
      <motion.div 
        initial={{ opacity: 0, y: -60 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, ease: "easeOut" }}
        viewport={{ once: true }}
        className="text-center max-w-xl mx-auto px-4 pt-12 pb-8 md:pt-16 md:pb-12 relative z-10"
      >
        <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-[#0D1B2A] leading-tight">
          Our <span className="text-[#C21807]">Packages</span>
        </h1>
        <p className="mt-4 text-gray-600 text-base md:text-lg px-2">
          This package offers the ultimate commitment to corporate wellness, team building, and competitive spirit throughout the year. It provides maximum value, exclusive perks, and seamless entry into all major events.
        </p>
      </motion.div>

      {/* Package Selection Section - Desktop Size Increased */}
      <div className="pb-12 md:pb-20 flex items-center justify-center relative z-10"> 
        {/* ✨ CHANGE 1: Increased max-w-lg to max-w-5xl to make cards much wider on desktop */}
        <div className="flex flex-col sm:flex-row gap-8 sm:gap-6 mt-4 w-11/12 max-w-5xl"> 

          {/* Annual Subscription - Highlighted */}
          <Link to="/package/annualpackage" className="w-full sm:w-1/2">
            <motion.div 
              className="relative h-full"
              initial={{ opacity: 0, y: 40, rotateX: -10 }} 
              whileInView={{ opacity: 1, y: 0, rotateX: 0 }}
              whileHover={{ scale: 1.03, rotateY: 0 }}
              transition={{ type: 'spring', stiffness: 100 }}
              viewport={{ once: true }}
            >
              <span className="absolute top-[-15px] left-1/2 transform -translate-x-1/2 px-4 py-1.5 bg-yellow-400 text-red-600 text-sm font-extrabold uppercase rounded-full shadow-lg z-10 whitespace-nowrap">
                Most Preferred
              </span>

              <motion.button 
                className="w-full h-full bg-red-600 rounded-xl font-bold text-white shadow-xl transition-all cursor-pointer relative z-0 
                         p-20 text-base          // Mobile (Small)
                         sm:p-8 sm:text-lg      // Tablet
                         lg:p-28 lg:text-2xl    // ✨ CHANGE 2: Increased padding and font size for HUGE desktop cards
                         hover:shadow-2xl hover:shadow-red-400"
              >
                Explore Annual Subscription
              </motion.button>
            </motion.div>
          </Link>

          {/* Quarterly Package */}
          <Link to="/package/quarterly" className="w-full sm:w-1/2">
            <motion.button
              initial={{ opacity: 0, y: 40, rotateX: -10 }}
              whileInView={{ opacity: 1, y: 0, rotateX: 0 }}
              whileHover={{ scale: 1.03, rotateY: 0 }}
              transition={{ type: 'spring', stiffness: 200 }}
              viewport={{ once: true }} 
              className="w-full h-full bg-white rounded-xl shadow-xl font-bold text-red-600 border border-gray-200 transition-all cursor-pointer
                         p-20 text-base          // Mobile (Small)
                         sm:p-8 sm:text-lg      // Tablet
                         lg:p-28 lg:text-2xl    // ✨ CHANGE 2: Increased padding and font size for HUGE desktop cards
                         hover:shadow-2xl hover:shadow-red-400"
            >
              Explore Quarterly Tournaments
            </motion.button>
          </Link>

        </div>
      </div>
    </div>
  );
};

export default Package;