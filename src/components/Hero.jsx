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

  const nextSlide = () =>
    setCurrentSlide((prev) => (prev + 1) % heroSlides.length);

  // 🔁 Auto change slide every 0.5s
  useEffect(() => {
    const interval = setInterval(nextSlide, 10000);
    return () => clearInterval(interval);
  }, []);

  return (
    <section className="relative min-h-screen flex items-center pt-28 sm:pt-24 md:pt-20 bg-gradient-to-br from-red-50 via-white to-red-100">
      {/* Overlay gradient */}
      <div className="absolute inset-0 bg-gradient-to-r from-red-100/30 via-transparent to-red-200/30" />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          
          {/* Left Content */}
          <motion.div
            initial={{ opacity: 0, x: -80, rotateY: -15 }}
            animate={{ opacity: 1, x: 0, rotateY: 0 }}
            transition={{ duration: 1 }}
            className="text-left"
          >
            <h1 className="text-4xl sm:text-5xl lg:text-7xl font-extrabold mb-6 leading-tight">
              <span className="text-red-600 block drop-shadow-md">UNLEASHING</span>
              TEAM SPIRIT THROUGH SPORTS
            </h1>

            <p className="text-lg lg:text-xl text-gray-700 mb-8 max-w-xl">
              Corporate sports experiences that keep your teams active, engaged, and connected — all year round.
            </p>

            <div className="flex flex-col sm:flex-row gap-4">
              {[
                { href: "/services", label: "Explore Annual Subscription", primary: true },
                { href: "/contact", label: "Explore Quarterly Tournaments", primary: false },
              ].map((btn, idx) => (
                <Link to={btn.href} key={idx}>
                  <motion.button
                    whileHover={{
                      scale: 1.08,
                      boxShadow: "0 10px 20px rgba(255, 0, 0, 0.3)",
                    }}
                    whileTap={{ scale: 0.95 }}
                    transition={{ type: "spring", stiffness: 200 }}
                    className={`w-60 px-8 py-4 rounded-xl text-lg font-semibold transition-all duration-300 ${
                      btn.primary
                        ? "bg-red-600 text-white hover:bg-white hover:text-red-600 hover:border-2 hover:border-red-600"
                        : "border-2 border-red-600 text-red-600 hover:bg-red-600 hover:text-white"
                    }`}
                  >
                    {btn.label}
                  </motion.button>
                </Link>
              ))}
            </div>
          </motion.div>

          {/* Right Slideshow */}
          <motion.div
            className="relative h-64 sm:h-80 md:h-[500px] rounded-3xl overflow-hidden bg-white shadow-2xl border border-gray-200 cursor-pointer"
            whileHover={{ scale: 1.05 }}
            transition={{ type: "spring", stiffness: 150 }}
            style={{ perspective: 1000 }}
          >
            <AnimatePresence mode="wait">
              <motion.img
                key={currentSlide}
                src={heroSlides[currentSlide].image}
                alt={heroSlides[currentSlide].title}
                initial={{ opacity: 0, scale: 1.1 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.4 }}
                className="w-full h-full object-cover"
              />
            </AnimatePresence>

            <div className="absolute bottom-8 left-4 right-4 text-red-600 bg-white/70 p-3 rounded-lg shadow-md">
              <h3 className="text-lg font-semibold text-center">
                {heroSlides[currentSlide].title}
              </h3>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
