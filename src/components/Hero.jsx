import React, { useState, useEffect } from "react";
// eslint-disable-next-line no-unused-vars
import { motion, AnimatePresence } from "framer-motion";
import { Link } from "react-router-dom";
import { Sparkles } from "lucide-react";

import Cricket from "../assets/Hero/cricket.png";
import Badminton from "../assets/Hero/badminton.png";
import Football from "../assets/Hero/Football.png";
import Yoga from "../assets/Hero/Yoga.png";

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
    }, 4000);
    return () => clearInterval(interval);
  }, []);

  return (
    <section className="py-12 relative overflow-hidden min-h-screen flex items-center bg-white">

      <div className="relative z-10 max-w-7xl mx-auto px-6 w-full">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">

          {/* Left Content - Enhanced */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="text-left space-y-8"
          >
            {/* Badge */}
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="inline-flex items-center gap-1.5 md:gap-2 bg-gradient-to-r from-[#C21807]/10 to-[#A01506]/10 text-[#C21807] px-3 md:px-5 py-2 md:py-2.5 rounded-full text-xs md:text-sm font-bold shadow-lg border border-[#C21807]/30 backdrop-blur-sm whitespace-nowrap"
            >
              <Sparkles className="w-3.5 h-3.5 md:w-4 md:h-4 text-[#C21807] shrink-0" />
              <span>India's Premier Corporate Sports Platform</span>
            </motion.div>

            {/* Main Heading with Gradient */}
            <h1 className="text-3xl sm:text-4xl lg:text-5xl xl:text-6xl font-black leading-[1.1] tracking-tight">
              <motion.span 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.3 }}
                className="block bg-gradient-to-r from-[#C21807] via-[#A01506] to-[#C21807] bg-clip-text text-transparent drop-shadow-sm"
              >
                UNLEASHING
              </motion.span>
              <motion.span 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.4 }}
                className="block text-[#1a2332] mt-2"
              >
                TEAM SPIRIT
              </motion.span>
              <motion.span 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.5 }}
                className="block text-gray-700 mt-2"
              >
                THROUGH SPORTS
              </motion.span>
            </h1>

            {/* Description */}
            <motion.p 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.6 }}
              className="text-base sm:text-lg lg:text-xl text-gray-600 leading-relaxed max-w-xl font-medium"
            >
              Corporate sports experiences that keep your teams{" "}
              <span className="font-bold text-[#C21807]">
                active
              </span>
              ,{" "}
              <span className="font-bold text-[#C21807]">
                engaged
              </span>
              , and{" "}
              <span className="font-bold text-[#C21807]">
                connected
              </span>
              {" "}— all year round.
            </motion.p>
          </motion.div>

          {/* Right Image Section - Enhanced */}
          <motion.div
            className="relative"
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
          >
            {/* Main Image Container with subtle continuous zoom */}
            <motion.div
              animate={{ scale: [1, 1.03, 1] }}
              transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
              className="relative h-72 sm:h-96 md:h-[550px] rounded-3xl overflow-hidden shadow-2xl ring-4 ring-[#C21807]/20"
            >
              <AnimatePresence mode="wait">
                <motion.img
                  key={currentSlide}
                  src={heroSlides[currentSlide].image}
                  alt={heroSlides[currentSlide].title}
                  loading="lazy"
                  initial={{ opacity: 0, scale: 1.1 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  transition={{ duration: 0.7 }}
                  className="w-full h-full object-cover"
                />
              </AnimatePresence>

              {/* Image Title Badge */}
              <div className="absolute bottom-4 md:bottom-6 left-1/2 -translate-x-1/2 bg-white/95 backdrop-blur-md px-3 py-1.5 md:px-6 md:py-3 rounded-full text-center shadow-xl border border-[#C21807]/30 whitespace-nowrap">
                <span className="text-[#C21807] font-bold text-xs md:text-base">
                  {heroSlides[currentSlide].title}
                </span>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default Hero;