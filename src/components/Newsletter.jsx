import React from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { Zap, Trophy, Activity, Target, Star, Dribbble, Dumbbell, ArrowRight } from "lucide-react";

// --- SEAMLESS SCROLLING TRACK ---
const ScrollingSportsTrack = ({ direction = -1, speed = 30, opacity = 0.05 }) => {
  const icons = [Trophy, Activity, Target, Star, Dribbble, Dumbbell, Zap];
  
  return (
    <div className="flex whitespace-nowrap overflow-hidden py-3 select-none" style={{ opacity }}>
      <motion.div
        initial={{ x: direction > 0 ? "-50%" : "0%" }}
        animate={{ x: direction > 0 ? "0%" : "-50%" }}
        transition={{ duration: speed, repeat: Infinity, ease: "linear" }}
        className="flex gap-24 pr-24"
      >
        {[...icons, ...icons, ...icons].map((Icon, i) => (
          <Icon key={i} size={48} className="text-red-800" strokeWidth={1.5} />
        ))}
      </motion.div>
    </div>
  );
};

const CTASection = () => {
  return (
    <section className="relative py-24 bg-slate-50 overflow-hidden font-sans">
      
      {/* 1. DYNAMIC BACKGROUND ENGINE */}
      <div className="absolute inset-0 flex flex-col justify-around pointer-events-none z-0 py-10">
        <ScrollingSportsTrack direction={-1} speed={60} opacity={0.04} />
        <ScrollingSportsTrack direction={1} speed={80} opacity={0.02} />
        <ScrollingSportsTrack direction={-1} speed={70} opacity={0.03} />
      </div>

      {/* 2. AMBIENT GLOWS */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[400px] bg-red-100/30 blur-[120px] rounded-full z-0" />

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          viewport={{ once: true }}
          className="relative group"
        >
          {/* THE CARD - Now White */}
          <div className="relative bg-white border border-slate-200 rounded-[3.5rem] p-8 md:p-20 overflow-hidden shadow-2xl shadow-red-900/10 transition-all duration-700">
            
            {/* Animated Gradient Border (Hover Effect) */}
            <div className="absolute inset-0 bg-gradient-to-r from-red-50 via-transparent to-red-50 opacity-0 group-hover:opacity-100 transition-opacity duration-700" />

            {/* Background "Ghost" Trophy - Changed to light slate/gray */}
            <Trophy 
              className="absolute -bottom-16 -right-16 w-96 h-96 text-slate-100 -rotate-12 transition-all duration-1000 group-hover:rotate-0 group-hover:scale-110 group-hover:text-red-50" 
              strokeWidth={1}
            />

            <div className="relative z-10 flex flex-col lg:flex-row items-center justify-between gap-12">
              
              {/* CONTENT LEFT */}
              <div className="text-center lg:text-left space-y-8 max-w-2xl">
                <motion.div 
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  className="inline-flex items-center gap-3 px-5 py-2 rounded-full bg-red-600 text-white shadow-xl shadow-red-600/20"
                >
                  <Zap className="w-4 h-4 fill-current animate-pulse" />
                  <span className="text-xs font-black uppercase tracking-[0.2em]">Ready to Start?</span>
                </motion.div>

                {/* Heading - Changed to Slate 900 */}
                <h2 className="text-4xl md:text-6xl font-black text-slate-900 leading-none italic uppercase tracking-tighter">
                  Transform your <br className="hidden md:block" />
                  <span className="text-red-600">Workplace Culture</span>
                </h2>

                {/* Paragraph - Changed to Slate 600 */}
                <p className="text-slate-600 text-lg md:text-xl font-medium max-w-lg mx-auto lg:mx-0 leading-relaxed">
                  Join <span className="text-slate-900 font-bold underline decoration-red-600 underline-offset-8 decoration-2">50+ top-tier firms</span> that trust <span className="text-slate-900 font-black italic tracking-widest uppercase">Hakirush</span>.
                </p>
              </div>

              {/* ACTION RIGHT */}
              <div className="flex flex-col items-center gap-6">
                <Link to="/contact" className="relative group/btn">
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.98 }}
                    className="relative px-12 py-6 bg-red-600 hover:bg-red-700 text-white rounded-2xl font-black text-xl uppercase tracking-tighter shadow-2xl shadow-red-600/40 transition-all duration-300 flex items-center gap-4 group/text overflow-hidden cursor-pointer"
                  >
                    <span className="relative z-10">Free Consultation</span>
                    <ArrowRight className="w-6 h-6 relative z-10 transition-transform duration-300 group-hover/btn:translate-x-2" />
                    
                    <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover/btn:translate-x-full transition-transform duration-500" />
                  </motion.button>
                </Link>
                
                <p className="text-slate-400 text-xs font-bold uppercase tracking-[0.2em]">
                  Elevate your team spirit
                </p>
              </div>

            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default CTASection;