import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Link } from "react-router-dom";

import Cricket from "../assets/cricket.webp";
import Badminton from "../assets/badminton.jpg";
import Football from "../assets/football.webp";
import Yoga from "../assets/yoga.jpg";

const heroSlides = [
  { id: 1, image: Cricket, title: "Cricket Championship Finals" },
  { id: 2, image: Badminton, title: "Badminton Tournament" },
  { id: 3, image: Football, title: "Football League Match" },
  { id: 4, image: Yoga, title: "Yoga" },
];


const Hero = () => {
  const [currentSlide, setCurrentSlide] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % heroSlides.length);
    }, 10000);
    return () => clearInterval(interval);
  }, []);

  return (
    <section className="relative min-h-screen flex items-center py-20 bg-[#FAF6F4]">
      <div className="absolute inset-0 bg-gradient-to-b from-[#FAF6F4] to-red-50/30" />

      <div className="relative z-10 max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">

          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.7 }}
            className="text-left"
          >
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-[#0A1A2F] leading-tight">
              <span className="text-[#C21807]">UNLEASHING</span><br />
              TEAM SPIRIT THROUGH SPORTS
            </h1>

            <p className="text-lg text-gray-600 mt-6 max-w-lg">
              Corporate sports experiences that keep your teams active, engaged, and connected — all year round.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 mt-10">
              <Link to="/annualpackage">
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
                    className='bg-red-600 rounded-xl font-bold text-white shadow-md pt-12 pb-8 px-10 hover:shadow-xl hover:shadow-red-400 transition-all cursor-pointer relative z-0'
                  >
                    Explore Annual Subscription
                  </motion.button>
                </motion.div>
              </Link>
              <Link to="/quarterly">
                <motion.button
                  initial={{ opacity: 0, y: 40, rotateX: -10 }}
                  animate={{ opacity: 1, y: 0, rotateX: 0 }}
                  whileHover={{ scale: 1.05, rotateY: 10 }}
                  transition={{ type: 'spring', stiffness: 200 }}
                  viewport={{ once: true }} 
                  className='bg-white rounded-xl shadow-md font-bold text-red-600 p-10 hover:shadow-xl hover:shadow-red-400 transition-all cursor-pointer'>
                  Explore Quarterly Tournaments
                </motion.button>
              </Link>
            </div>
          </motion.div>

          <motion.div
            className="relative h-72 sm:h-96 md:h-[500px] rounded-3xl overflow-hidden shadow-xl"
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.7 }}
          >
            <AnimatePresence mode="wait">
              <motion.img
                key={currentSlide}
                src={heroSlides[currentSlide].image}
                alt={heroSlides[currentSlide].title}
                initial={{ opacity: 0, scale: 1.07 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 1.05 }}
                transition={{ duration: 0.6 }}
                className="w-full h-full object-cover"
              />
            </AnimatePresence>

            <div className="absolute bottom-5 left-1/2 -translate-x-1/2 bg-blur backdrop-blur-sm px-4 py-2 rounded-lg text-center text-[#C21807] font-bold shadow-sm">
              {heroSlides[currentSlide].title}
            </div>
          </motion.div>
        </div>

        <div className="mt-20 grid grid-cols-1 sm:grid-cols-3 gap-8 text-center max-w-6xl mx-auto">
          {[
            { icon: "🏢", label: "Companies Engaged", value: 20 },
            { icon: "⚽", label: "Events Organized", value: 50 },
            { icon: "🎖", label: "Employees Impacted", value: 1000 },
          ].map((stat, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 40, rotateX: -10 }}
              animate={{ opacity: 1, y: 0, rotateX: 0 }}
              whileHover={{ scale: 1.05, rotateY: 10 }}
              transition={{ type: 'spring', stiffness: 200 }}
              viewport={{ once: true }}
              className=" bg-white rounded-xl shadow-md border border-gray-100 py-10 hover:shadow-xl hover:shadow-red-400 transition-all cursor-pointer"
            >
              <div className="text-4xl mb-2 group-hover:text-white transition-colors">
                {stat.icon}
              </div>

              <div className="text-3xl font-bold text-[#C21807] transition-colors">
                {stat.value}+
              </div>

              <p className="text-sm mt-1 text-gray-600 transition-colors">
                {stat.label}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Hero;
