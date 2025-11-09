import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';

const Package = () => {
  return (
    <div className="relative bg-gradient-to-b from-white via-gray-50 to-gray-100 overflow-hidden">


      {/* Header Section */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_#ff000015,_transparent_80%),_radial-gradient(circle_at_bottom_right,_#ff660010,_transparent_90%),_radial-gradient(circle_at_top_left,_#ffffff05,_transparent_80%)]" />
      <motion.div 
        initial={{ opacity: 0, y: -60 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, ease: "easeOut" }}
        viewport={{ once: true }}
        className="text-center max-w-3xl mx-auto px-4 py-16 relative z-10"
      >
        <h1 className="text-4xl md:text-5xl font-extrabold text-[#0D1B2A] leading-tight">
          Our <span className="text-red-600">Packages</span>
        </h1>
        <p className="mt-5 text-gray-600 text-lg md:text-xl">
          Every quarter, HAKIRUSH brings together 10+ companies for high-energy corporate tournaments — each event focusing on one iconic sport.
        </p>
      </motion.div>

      {/* Package Selection Section */}
      <div className="pb-10 flex items-center justify-center relative z-10">
        <div className="flex flex-col sm:flex-row gap-6 mt-10">

          {/* Annual Subscription - Highlighted */}
          <Link to="/package/annualpackage">
            <motion.div 
              className="relative"
              initial={{ opacity: 0, y: 40, rotateX: -10 }} 
              whileInView={{ opacity: 1, y: 0, rotateX: 0 }}
              whileHover={{ scale: 1.05, rotateY: 10 }}
              transition={{ type: 'spring', stiffness: 100 }}
              viewport={{ once: true }}
            >
              <span className="absolute top-[-15px] left-1/2 transform -translate-x-1/2 px-6 py-2 bg-yellow-500 text-red-600 text-sm font-extrabold uppercase rounded-full shadow-lg z-10 whitespace-nowrap">
                Most Preferred
              </span>

              <motion.button 
                className="bg-red-600 rounded-xl font-bold text-white shadow-md p-30 hover:shadow-xl hover:shadow-red-400 transition-all cursor-pointer relative z-0"
              >
                Explore Annual Subscription
              </motion.button>
            </motion.div>
          </Link>

          {/* Quarterly Package */}
          <Link to="/package/quarterly">
            <motion.button
              initial={{ opacity: 0, y: 40, rotateX: -10 }}
              whileInView={{ opacity: 1, y: 0, rotateX: 0 }}
              whileHover={{ scale: 1.05, rotateY: 10 }}
              transition={{ type: 'spring', stiffness: 200 }}
              viewport={{ once: true }} 
              className="bg-white rounded-xl shadow-md font-bold text-red-600 p-30 hover:shadow-xl hover:shadow-red-400 transition-all cursor-pointer"
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
