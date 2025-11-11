import React from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";

const Newsletter = () => {
  return (
    <section className="py-14 bg-gradient-to-r from-red-50 to-white relative overflow-hidden">
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        whileInView={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.8 }}
        viewport={{ once: true }}
        className="max-w-7xl mx-auto px-4 sm:px-6 md:px-12 py-10 md:py-16 bg-white shadow-xl hover:shadow-red-400 rounded-xl flex flex-col md:flex-row items-center justify-center gap-10"
      >
        {/* Text Section */}
        <div className="flex flex-col gap-4 text-center md:text-left">
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-gray-900 leading-snug">
            Ready to Transform Your <span className="text-red-600">Workplace</span>?
          </h2>

          <p className="text-sm sm:text-base md:text-lg text-gray-700 max-w-xl mx-auto md:mx-0 leading-relaxed">
            Join leading companies who trust <span className="font-semibold text-red-600">HAKIRUSH</span> to boost
            employee morale and build stronger teams through sports.
          </p>
        </div>

        {/* Button */}
        <Link to="/contact" className="w-full md:w-auto">
          <motion.button
            whileHover={{ scale: 1.08 }}
            whileTap={{ scale: 0.95 }}
            transition={{ type: "spring", stiffness: 200 }}
            className="bg-red-600 text-white font-semibold px-8 sm:px-10 py-3 sm:py-4 rounded-xl text-base sm:text-lg hover:bg-red-700 transition w-full md:w-auto"
          >
            Book a Free Consultation
          </motion.button>
        </Link>
      </motion.div>
    </section>
  );
};

export default Newsletter;
