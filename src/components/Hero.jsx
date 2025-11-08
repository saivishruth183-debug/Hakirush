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
      </div>
    </section>
  );
};

export default Hero;
