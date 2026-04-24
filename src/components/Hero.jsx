import React, { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Sparkles, ArrowRight } from "lucide-react";

// Assets
import Cricket from "../assets/Hero/cricket.png";
import Badminton from "../assets/Hero/badminton.png";
import Football from "../assets/Hero/Football.png";
import Yoga from "../assets/Hero/Yoga.png";

const heroSlides = [
  { id: 1, image: Cricket, title: "Cricket", subtitle: "Championship Finals" },
  { id: 2, image: Badminton, title: "Badminton", subtitle: "Pro Tournament" },
  { id: 3, image: Football, title: "Football", subtitle: "Elite League Match" },
  { id: 4, image: Yoga, title: "Yoga", subtitle: "Wellness Sessions" },
];

const Hero = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const AUTO_PLAY_INTERVAL = 6000;

  const nextSlide = useCallback(() => {
    setCurrentSlide((prev) => (prev + 1) % heroSlides.length);
  }, []);

  useEffect(() => {
    const interval = setInterval(nextSlide, AUTO_PLAY_INTERVAL);
    return () => clearInterval(interval);
  }, [nextSlide]);

  return (
    <section className="relative h-[95vh] w-full overflow-hidden bg-black font-sans">
      {/* Background Layer with Ken Burns Effect */}
      <div className="absolute inset-0 z-0">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentSlide}
            initial={{ opacity: 0, scale: 1.15 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 1.05 }}
            transition={{ duration: 2, ease: [0.4, 0, 0.2, 1] }}
            className="absolute inset-0"
          >
            <img
              src={heroSlides[currentSlide].image}
              alt={heroSlides[currentSlide].title}
              className="w-full h-full object-cover brightness-[0.5]"
            />
            {/* Multi-stage Overlay for Depth */}
            <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/20 to-transparent" />
            <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent" />
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Content Layer */}
      <div className="relative z-10 container mx-auto px-8 h-full flex flex-col justify-center">
        <div className="max-w-4xl">
          {/* Elite Badge */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="inline-flex items-center gap-3 bg-white/5 backdrop-blur-md border border-white/10 px-4 py-2 rounded-full mb-6"
          >
            <div className="p-1 bg-[#e10b0b] rounded-full">
              <Sparkles className="w-3 h-3 text-black" />
            </div>
            <span className="text-[10px] sm:text-xs font-bold uppercase tracking-[0.3em] text-gray-300">
              India's Premier Corporate Sports Platform
            </span>
          </motion.div>

          {/* Main Typography */}
          <h1 className="overflow-hidden mb-4">
            <motion.span 
              initial={{ y: "100%" }}
              animate={{ y: 0 }}
              transition={{ duration: 0.8, ease: "circOut" }}
              className="block text-5xl md:text-8xl font-black text-white leading-[0.9] tracking-tighter"
            >
              UNLEASHING <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#5e0606] to-[#fceabb]">
                TEAM SPIRIT
              </span>
            </motion.span>
          </h1>

          <div className="h-[60px] md:h-[80px] overflow-hidden">
            <AnimatePresence mode="wait">
              <motion.div
                key={currentSlide}
                initial={{ y: "100%" }}
                animate={{ y: 0 }}
                exit={{ y: "-100%" }}
                transition={{ duration: 0.5, ease: "easeInOut" }}
                className="text-2xl md:text-4xl font-light italic text-gray-400 flex items-center gap-4"
              >
                <span className="w-12 h-[1px] bg-[#ff0000] hidden md:block" />
                {heroSlides[currentSlide].subtitle}
              </motion.div>
            </AnimatePresence>
          </div>

          <motion.p 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
            className="mt-8 max-w-lg text-lg text-gray-400 font-medium leading-relaxed"
          >
            Elevating workplace culture through elite sports experiences that keep your teams 
            <span className="text-red-600"> active </span> and 
            <span className="text-red-600"> connected</span>.
          </motion.p>
        </div>
      </div>

      {/* Decorative Side Element */}
      <div className="absolute left-8 bottom-12 z-20 hidden md:block">
         <div className="flex items-center gap-4 rotate-90 origin-left translate-x-4">
            <span className="text-[10px] tracking-[0.4em] uppercase text-white/30 font-bold">Scroll to discover</span>
            <div className="w-20 h-[1px] bg-white/20" />
         </div>
      </div>
    </section>
  );
};

export default Hero;