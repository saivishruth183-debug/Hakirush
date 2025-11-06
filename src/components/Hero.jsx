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

// Shared Button Styles (Improved feel — same color)
const baseButton =
  "rounded-lg px-6 py-3 text-lg font-semibold transition-all duration-300 relative overflow-hidden group";
const primaryButton =
  `${baseButton} text-white bg-[#C21807] hover:bg-[#a91206] hover:shadow-lg hover:scale-[1.03]`;
const secondaryButton =
  `${baseButton} border-2 border-[#C21807] text-[#C21807] hover:bg-[#C21807] hover:text-white hover:shadow-lg hover:scale-[1.03]`;

const Hero = () => {
  const [currentSlide, setCurrentSlide] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % heroSlides.length);
    }, 10000);
    return () => clearInterval(interval);
  }, []);

  return (
    <section className="relative min-h-screen flex items-center py-20 bg-white">
      {/* Soft clean gradient */}
      <div className="absolute inset-0 bg-gradient-to-b from-white to-red-50/20" />

      <div className="relative z-10 max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">

          {/* Text Section */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
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
                <motion.button whileHover={{ scale: 1.05 }} className={primaryButton}>
                  Explore Annual Subscription
                </motion.button>
              </Link>

              <Link to="/quarterly">
                <motion.button whileHover={{ scale: 1.05 }} className={secondaryButton}>
                  Explore Quarterly Tournaments
                </motion.button>
              </Link>
            </div>
          </motion.div>

          {/* Image Slideshow */}
          <motion.div
            className="relative h-72 sm:h-96 md:h-[500px] rounded-3xl overflow-hidden shadow-xl"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1 }}
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

            <div className="absolute bottom-5 left-1/2 -translate-x-1/2 bg-white/85 backdrop-blur-sm px-4 py-2 rounded-lg border border-gray-200 text-center text-[#C21807] font-semibold shadow-sm">
              {heroSlides[currentSlide].title}
            </div>
          </motion.div>
        </div>

        {/* Stats Section */}
        <div className="mt-20 grid grid-cols-1 sm:grid-cols-3 gap-8 text-center max-w-6xl mx-auto">
          {[
            { icon: "🏢", label: "Companies Engaged", value: 20 },
            { icon: "⚽", label: "Events Organized", value: 50 },
            { icon: "🎖", label: "Employees Impacted", value: 1000 },
          ].map((stat, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.15 }}
              className="group bg-white rounded-xl shadow-md border border-gray-100 py-10 hover:shadow-xl hover:scale-[1.03] hover:bg-[#C21807] transition-all cursor-pointer"
            >
              <div className="text-4xl mb-2 group-hover:text-white transition-colors">
                {stat.icon}
              </div>

              <div className="text-3xl font-bold text-[#C21807] group-hover:text-white transition-colors">
                {stat.value}+
              </div>

              <p className="text-sm mt-1 text-gray-600 group-hover:text-white transition-colors">
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
