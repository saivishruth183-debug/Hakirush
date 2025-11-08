import React from 'react'
import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'

const Package = () => {
  return (
    <div className='py-10 bg-gray-300'>
        {/* Header */}
              <motion.div 
              initial={{ opacity: 0, y: -60 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, ease: "easeOut" }}
              viewport={{ once: true }}
              className="text-center max-w-3xl mx-auto px-4">
                <h1 className="text-4xl md:text-5xl font-extrabold text-[#0D1B2A]">
                  <span className="text-[#C21807]">Package</span>
                </h1>
                <p className="mt-5 text-gray-600 text-lg md:text-xl">
                  Every quarter, HAKIRUSH brings together 10+ companies for high-energy corporate tournaments — each event focusing on one iconic sport.
                </p>
              </motion.div>
              <div className='py-20 flex items-center justify-center'>
                <div className="flex flex-col sm:flex-row gap-4 mt-10">
              <Link to="/package/annualpackage">
                <motion.div 
                  className="relative "
                  initial={{ opacity: 0, y: 40, rotateX: -10 }} 
                  animate={{ opacity: 1, y: 0, rotateX: 0 }}
                  whileHover={{ scale: 1.05, rotateY: 10 }}
                  transition={{ type: 'spring', stiffness: 100 }}
                  viewport={{ once: true }}
                >
                  <span className="absolute top-[-15px] left-1/2 transform -translate-x-1/2 px-3 py-1 bg-yellow-500 text-red-600 text-xs font-extrabold uppercase rounded-full shadow-lg z-10 whitespace-nowrap">
                    Most Preferred
                  </span>
                  <motion.button 
                    className='bg-red-600 rounded-xl font-bold text-white shadow-md p-20 hover:shadow-xl hover:shadow-red-400 transition-all cursor-pointer relative z-0'
                  >
                    Explore Annual Subscription
                  </motion.button>
                </motion.div>
              </Link>
              <Link to="/package/quarterly">
                <motion.button
                  initial={{ opacity: 0, y: 40, rotateX: -10 }}
                  animate={{ opacity: 1, y: 0, rotateX: 0 }}
                  whileHover={{ scale: 1.05, rotateY: 10 }}
                  transition={{ type: 'spring', stiffness: 200 }}
                  viewport={{ once: true }} 
                  className='bg-white rounded-xl shadow-md font-bold text-red-600 p-20 hover:shadow-xl hover:shadow-red-400 transition-all cursor-pointer'>
                  Explore Quarterly Tournaments
                </motion.button>
              </Link>
            </div>
        </div>
    </div>
  )
}

export default Package
