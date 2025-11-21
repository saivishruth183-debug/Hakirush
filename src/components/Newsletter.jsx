import React from "react";
// eslint-disable-next-line no-unused-vars
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { Zap } from "lucide-react";

const Newsletter = () => {
  return (
    <section className="relative py-16 bg-gray-50 overflow-hidden">
      
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
        className="max-w-6xl mx-auto px-4 sm:px-6 relative z-10"
      >
        <div className="relative bg-white rounded-3xl shadow-2xl hover:shadow-[0_12px_35px_rgba(248,113,113,0.45)] transition-all duration-500 overflow-hidden cursor-pointer border-2 border-gray-100 hover:border-[#C21807]/20">

          <div className="relative py-8 sm:py-10 px-6 sm:px-10 lg:px-16 flex flex-col md:flex-row items-center justify-between gap-8">
            {/* Text Section */}
            <div className="flex flex-col gap-4 text-center md:text-left flex-1">
              {/* Badge */}
              <div className="inline-flex items-center gap-1.5 sm:gap-2 px-3 py-2 sm:px-5 sm:py-2.5 rounded-full bg-gradient-to-r from-[#C21807]/10 to-[#A01506]/10 border border-[#C21807]/30 w-fit mx-auto md:mx-0 shadow-lg backdrop-blur-sm">
                <Zap className="w-4 h-4 text-[#C21807]" />
                <span className="text-sm font-bold text-[#C21807]">Get Started Today</span>
              </div>

              <h2 className="text-2xl sm:text-3xl lg:text-4xl font-black text-gray-900 leading-tight tracking-tight">
                Ready to Transform Your{' '}
                <span className="bg-gradient-to-r from-[#C21807] via-[#A01506] to-[#C21807] bg-clip-text text-transparent drop-shadow-sm">
                  Workplace
                </span>?
              </h2>

              <p className="text-xs sm:text-sm lg:text-base text-gray-700 max-w-2xl mx-auto md:mx-0 leading-relaxed font-medium">
                Join{" "}
                <span className="font-bold text-[#C21807]">
                  50+ leading companies
                </span>
                {" "}who trust{' '}
                <span className="font-bold text-gray-900">HAKIRUSH</span> to boost employee morale and build stronger teams through sports
              </p>
            </div>

            {/* Button */}
            <div className="shrink-0 w-full md:w-auto">
              <Link to="/contact">
                <motion.button
                  whileHover={{ scale: 1.05, y: -2 }}
                  whileTap={{ scale: 0.98 }}
                  transition={{ type: "spring", stiffness: 300 }}
                  className="w-full md:w-auto px-6 py-2.5 sm:px-8 sm:py-3 rounded-lg bg-[#C21807] text-white font-bold text-base sm:text-lg shadow-xl hover:shadow-2xl hover:shadow-[#C21807]/50 transition-all duration-300 cursor-pointer relative overflow-hidden group focus:outline-none focus-visible:ring-4 focus-visible:ring-[#C21807]/30"
                >
                  <span className="relative z-10">Book a Free Consultation</span>
                  {/* Shimmer effect */}
                  <div className="absolute inset-0 bg-white/20 -translate-x-full group-hover:translate-x-full transition-transform duration-700" />
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
