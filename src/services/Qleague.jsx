import React, { useEffect, useState, useRef } from "react";
import { motion, useMotionValue, useSpring, useTransform, useScroll } from 'framer-motion';
import { 
  CheckCircle, Trophy, ArrowRight, ArrowLeft, 
  Activity, Target, CircleDot, Star, Dumbbell, Flag, Zap 
} from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import backgroundImage from "../assets/Hero/Backimage.png";

// Asset imports
import Cricket from "../assets/Q-League/Cricket.png";
import Badminton from "../assets/Q-League/Badminton.png";
import Football from "../assets/Q-League/Football.png";
import Multi from "../assets/Q-League/multilevel.png";

const quarters = [
  { id: 1, quarter: "Q1", name: "HAKIRUSH CUP", sport: "Cricket", image: Cricket },
  { id: 2, quarter: "Q2", name: "SmashFest", sport: "Badminton", image: Badminton },
  { id: 3, quarter: "Q3", name: "GoalRush", sport: "Football", image: Football },
  { id: 4, quarter: "Q4", name: "Battle of Corporates", sport: "Multi-Sport Festival", image: Multi },
];

const features = [
  "Full-scale tournament management",
  "Umpires, referees, and match fixtures",
  "On-ground branding & sponsor booths",
  "Photography, reels, and highlight coverage",
  "Awards, medals, and digital badges",
];

const benefits = [
  "Build inter-company connections",
  "Engage employees with competitive excitement",
  "Strengthen your brand presence",
  "Attract sponsors and PR coverage",
];

// --- BACKGROUND SUB-COMPONENT (MATCHED) ---
const ContinuousSportsBackground = () => {
  const row1 = [Trophy, Activity, Target, CircleDot, Star, Dumbbell];
  const row2 = [Flag, Zap, Trophy, Activity, Target, Star];

  return (
    <div className="fixed inset-0 overflow-hidden pointer-events-none -z-20">
      <div className="absolute top-[-10%] left-[-10%] w-[60%] h-[60%] bg-red-100/60 blur-[120px] rounded-full" />
      <div className="absolute bottom-[-10%] right-[-10%] w-[50%] h-[50%] bg-red-50/80 blur-[120px] rounded-full" />

      <div className="flex absolute top-[10%] opacity-[0.04] w-full overflow-hidden">
        <motion.div 
          initial={{ x: 0 }}
          animate={{ x: "-100%" }}
          transition={{ duration: 40, repeat: Infinity, ease: "linear" }}
          className="flex gap-24 pr-24 whitespace-nowrap flex-nowrap"
        >
          {row1.map((Icon, i) => <Icon key={i} size={70} className="text-red-900" strokeWidth={1} />)}
          {row1.map((Icon, i) => <Icon key={`dup-${i}`} size={70} className="text-red-900" strokeWidth={1} />)}
        </motion.div>
      </div>

      <div className="flex absolute top-[40%] opacity-[0.03] w-full overflow-hidden">
        <motion.div 
          initial={{ x: "-100%" }}
          animate={{ x: 0 }}
          transition={{ duration: 50, repeat: Infinity, ease: "linear" }}
          className="flex gap-32 pr-32 whitespace-nowrap flex-nowrap"
        >
          {row2.map((Icon, i) => <Icon key={i} size={100} className="text-red-900" strokeWidth={0.5} />)}
          {row2.map((Icon, i) => <Icon key={`dup-${i}`} size={100} className="text-red-900" strokeWidth={0.5} />)}
        </motion.div>
      </div>

      <div className="absolute inset-0 pointer-events-none" style={{
        background: "radial-gradient(circle at center, transparent 0%, rgba(255,255,255,0.2) 60%, rgba(255,255,255,0.7) 100%)"
      }} />
    </div>
  )
}

// --- PARALLAX IMAGE BACKGROUND (MATCHED) ---
const ParallaxImageBackground = ({ image }) => {
  const containerRef = useRef(null);
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const springConfig = { damping: 30, stiffness: 80, mass: 0.6 };
  const smoothX = useSpring(mouseX, springConfig);
  const smoothY = useSpring(mouseY, springConfig);
  const translateX = useTransform(smoothX, [-1, 1], [-30, 30]);
  const translateY = useTransform(smoothY, [-1, 1], [-20, 20]);
  const scale = useTransform(smoothX, [-1, 1], [1.08, 1.12]);
  const { scrollY } = useScroll();
  const scrollTranslateY = useTransform(scrollY, [0, 1500], [0, 150]);

  useEffect(() => {
    const handleMouseMove = (e) => {
      const x = (e.clientX / window.innerWidth) * 2 - 1;
      const y = (e.clientY / window.innerHeight) * 2 - 1;
      mouseX.set(x);
      mouseY.set(y);
    };
    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, [mouseX, mouseY]);

  return (
    <div ref={containerRef} className="fixed left-0 w-full overflow-hidden -z-10" style={{ top: "-10vh", height: "130vh" }}>
      <motion.img
        src={image}
        alt=""
        style={{ x: translateX, y: useTransform([translateY, scrollTranslateY], ([ty, sy]) => ty + sy), scale }}
        className="w-full h-full object-cover object-center will-change-transform"
        transition={{ type: "tween" }}
      />
      <div className="absolute inset-0 bg-slate-950/40 mix-blend-multiply" />
    </div>
  );
};

const QLeague = () => {
  const navigate = useNavigate();
  
  return (
    <div className="relative min-h-screen overflow-x-hidden">
      {/* MATCHED SPORTS BACKGROUND MATRIX */}
      <ContinuousSportsBackground />
      
      {/* MATCHED PARALLAX IMAGE BACKGROUND */}
      <ParallaxImageBackground image={backgroundImage} />
      
      <div className="relative z-10 w-full">
        {/* Navigation */}
        <nav className="max-w-7xl mx-auto px-6 pt-10">
          <motion.button
            onClick={() => navigate(-1)}
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            className="group flex items-center gap-2 px-4 py-2 rounded-full bg-white/80 backdrop-blur-md border border-gray-200 text-gray-700 hover:text-[#C21807] transition-all shadow-sm cursor-pointer"
          >
            <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
            <span className="text-sm font-semibold">Back to Services</span>
          </motion.button>
        </nav>

        {/* Hero Section */}
        <section className="py-16 md:py-24 text-center px-6">
          <div className="max-w-4xl mx-auto space-y-6">
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-red-50 border border-red-100"
            >
              <Trophy className="w-4 h-4 text-[#C21807]" />
              <span className="text-xs font-bold text-[#C21807] uppercase tracking-widest">Quarterly Tournaments</span>
            </motion.div>
            
            <motion.h1 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-4xl md:text-6xl font-black text-white leading-tight"
            >
              Q-League — <br />
              <span className="text-red-500">
                Compete. Connect. Conquer.
              </span>
            </motion.h1>
            
            <motion.p 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.2 }}
              className="text-slate-300 text-lg max-w-2xl mx-auto font-medium"
            >
              Every quarter, <span className="text-white font-bold">HAKIRUSH</span> brings together <span className="text-red-500 font-bold">10+ companies</span> for high-octane corporate showdowns.
            </motion.p>
          </div>
        </section>

        {/* Calendar Grid */}
        <section className="pb-20 px-6">
          <div className="max-w-7xl mx-auto">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
              {quarters.map((item, index) => (
                <motion.div 
                  key={item.id}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1, type: "spring", stiffness: 100 }}
                  viewport={{ once: true }}
                  className="group relative h-[450px] rounded-[2rem] overflow-hidden shadow-2xl bg-slate-800/90 border border-slate-700"
                >
                  <img 
                    src={item.image} 
                    alt={item.name} 
                    className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black via-black/20 to-transparent" />
                  
                  <div className="absolute top-6 left-6">
                    <span className="px-4 py-1.5 bg-[#C21807] text-white text-xs font-black rounded-full shadow-lg">
                      {item.quarter}
                    </span>
                  </div>

                  <div className="absolute bottom-8 left-8 right-8 space-y-1">
                    <h3 className="text-2xl font-black text-white">{item.name}</h3>
                    <p className="text-red-400 font-bold uppercase tracking-widest text-xs">{item.sport}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Benefits & CTA */}
        <section className="pb-24 px-6">
          <div className="max-w-7xl mx-auto grid md:grid-cols-2 gap-8">
            {/* Features Card */}
            <motion.div 
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="bg-slate-800/90 backdrop-blur-md p-10 rounded-[2.5rem] shadow-xl border border-slate-700"
            >
              <h2 className="text-2xl font-black text-white mb-8 flex items-center gap-3">
                <CheckCircle className="text-[#C21807]" /> What's Included
              </h2>
              <ul className="space-y-5">
                {features.map((item, i) => (
                  <li key={i} className="flex gap-4 text-slate-300 font-medium italic">
                    <div className="w-1.5 h-1.5 rounded-full bg-[#C21807] mt-2.5 shrink-0" />
                    {item}
                  </li>
                ))}
              </ul>
            </motion.div>

            {/* Benefits Card */}
            <motion.div 
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="bg-slate-800/90 backdrop-blur-md p-10 rounded-[2.5rem] shadow-xl border border-slate-700"
            >
              <h2 className="text-2xl font-black text-white mb-8 flex items-center gap-3">
                <Trophy className="text-[#C21807]" /> Core Benefits
              </h2>
              <ul className="space-y-5">
                {benefits.map((item, i) => (
                  <li key={i} className="flex gap-4 text-slate-300 font-medium">
                    <CheckCircle className="w-5 h-5 text-[#C21807] shrink-0" />
                    {item}
                  </li>
                ))}
              </ul>
            </motion.div>
          </div>

          <div className="mt-20 text-center">
            <Link to="/contact">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="group relative inline-flex items-center gap-4 px-12 py-6 bg-[#C21807] text-white font-black text-xl rounded-2xl shadow-[0_20px_50px_rgba(194,24,7,0.3)] hover:bg-red-700 transition-all duration-300 cursor-pointer"
              >
                Register for Q-League
                <ArrowRight className="w-6 h-6 group-hover:translate-x-2 transition-transform" />
              </motion.button>
            </Link>
          </div>
        </section>
      </div>
    </div>
  );
};

export default QLeague;