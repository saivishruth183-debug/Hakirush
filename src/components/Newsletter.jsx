import React from "react";
import { motion } from "framer-motion";

const Newsletter = () => {
  return (
    <section className="py-24 bg-gradient-to-r from-red-50 to-white relative overflow-hidden">
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        whileInView={{ opacity: 1, scale: 1 }}
        whileHover={{ scale: 1.05, rotateY: 5 }}
        transition={{ duration: 0.8 }}
        viewport={{ once: true }}
        className="max-w-7xl flex items-center justify-between gap-5 mx-auto px-12 py-20 rounded-xl relative z-10 bg-white shadow-xl hover:shadow-2xl hover:shadow-red-400"
      >
        <div className="flex flex-col gap-5">
             <h2 className="text-4xl font-extrabold text-gray-900">
             Ready to Transform Your{" "}
             <span className="text-red-600 px-2 rounded-lg">Workplace</span>?
           </h2>

           <p className="text-lg text-gray-700 max-w-2xl">
             Join leading companies who trust{" "}
             <span className="font-semibold text-red-600">HAKIRUSH</span> to boost
             employee morale and build stronger teams through sports.
           </p>
        </div>

        <a href="/contact">
          <motion.button
            whileHover={{
              scale: 1.1,
              rotateY: 10,
              boxShadow: "0px 0px 20px 5px rgba(255,0,0,0.3)",
            }}
            whileTap={{ scale: 0.95 }}
            transition={{ type: "spring", stiffness: 200 }}
            className="bg-red-600 text-white font-bold px-12 py-4 rounded-xl text-xl hover:bg-red-700 transition cursor-pointer"
          >
            Book a Free Consultation
          </motion.button>
        </a>
      </motion.div>
    </section>
  );
};

export default Newsletter;
