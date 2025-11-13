import React from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";

const Newsletter = () => {
  return (
    <section className="relative py-20 bg-white overflow-hidden">

      <motion.div
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        viewport={{ once: true }}
        className="max-w-6xl mx-auto px-4 sm:px-6 relative z-10"
      >
        <div className="relative bg-white rounded-3xl shadow-2xl overflow-hidden">

          <div className="relative py-12 sm:py-16 px-6 sm:px-10 lg:px-16 flex flex-col md:flex-row items-center justify-between gap-10">
            {/* Text Section */}
            <div className="flex flex-col gap-6 text-center md:text-left flex-1">
              {/* Badge */}
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-linear-to-r from-red-50 to-orange-50 border border-red-100 w-fit mx-auto md:mx-0">
                <div className="w-2 h-2 rounded-full bg-red-500 animate-pulse" />
                <span className="text-sm font-semibold text-red-600">Get Started Today</span>
              </div>

              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-gray-900 leading-tight">
                Ready to Transform Your{' '}
                <span className="bg-linear-to-r from-red-600 via-red-500 to-orange-500 bg-clip-text text-transparent">
                  Workplace
                </span>?
              </h2>

              <p className="text-sm sm:text-base lg:text-lg text-gray-600 max-w-2xl mx-auto md:mx-0 leading-relaxed">
                Join <span className="font-bold text-red-600">50+ leading companies</span> who trust{' '}
                <span className="font-bold text-gray-900">HAKIRUSH</span> to boost employee morale and build stronger teams through sports
              </p>
            </div>

            {/* Button */}
            <div className="flex-shrink-0 w-full md:w-auto">
              <Link to="/contact">
                <motion.button
                  whileHover={{ scale: 1.05, y: -2 }}
                  whileTap={{ scale: 0.98 }}
                  transition={{ type: "spring", stiffness: 300 }}
                  className="w-full md:w-auto px-10 py-5 rounded-xl bg-linear-to-r from-red-600 to-orange-500 text-white font-bold text-lg shadow-xl hover:shadow-2xl hover:shadow-red-500/50 transition-all duration-300 cursor-pointer relative overflow-hidden group"
                >
                  <span className="relative z-10">Book a Free Consultation</span>
                  {/* Shimmer effect */}
                  <div className="absolute inset-0 bg-white/20 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700" />
                </motion.button>
              </Link>
            </div>
          </div>
        </div>
      </motion.div>
    </section>
  );
};

export default Newsletter;
