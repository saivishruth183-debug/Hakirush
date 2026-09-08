import React, { useEffect, useRef } from 'react'
import { Link } from 'react-router-dom'
import { motion, useMotionValue, useSpring, useTransform, useScroll } from 'framer-motion'
import { 
  Star, CalendarDays, ArrowRight, Zap, Trophy
} from 'lucide-react'
import PageBackground from '../components/PageBackground'
import backgroundImage from '../assets/Hero/Backimage.png'

/* ---------------------------------------------------------------
   BRAND TOKENS — shared with About.jsx so every page reads as one
   system: maroon + gold, serif display type, one hairline device.
--------------------------------------------------------------- */
const ACCENT = "#8C1D2B";
const GOLD = "#D4AF37";
const HAIRLINE = `linear-gradient(90deg, ${ACCENT}, ${GOLD}, ${ACCENT})`;

/* ---------------------------------------------------------------
   PARALLAX IMAGE BACKGROUND
   Mouse movement + scroll subtly shift and scale the image for
   a cinematic depth feel, matching the About page treatment.
--------------------------------------------------------------- */
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
    <div
      ref={containerRef}
      className="fixed left-0 w-full overflow-hidden -z-10"
      style={{ top: "-10vh", height: "130vh" }}
    >
      <motion.img
        src={image}
        alt=""
        style={{
          x: translateX,
          y: useTransform([translateY, scrollTranslateY], ([ty, sy]) => ty + sy),
          scale,
        }}
        className="w-full h-full object-cover object-center will-change-transform"
        transition={{ type: "tween" }}
      />
      {/* Same three-stop gradient as About's ParallaxBackground, so the
          two pages sit at the same depth/contrast rather than one being
          lighter than the other. */}
      <div className="absolute inset-0 bg-gradient-to-b from-slate-950/75 via-slate-950/55 to-slate-950/80" />
      <div className="absolute inset-0 bg-slate-950/30 mix-blend-multiply" />
    </div>
  );
};

/* KIT-STRIPE DIVIDER — same diagonal jersey-trim seam used on About,
   marking the transition from the header into the package cards. */
const KitStripeDivider = () => (
  <div className="relative h-10 sm:h-14 w-full overflow-hidden" aria-hidden="true">
    <svg viewBox="0 0 1200 56" preserveAspectRatio="none" className="w-full h-full">
      <polygon points="0,56 480,0 560,0 80,56" fill={ACCENT} />
      <polygon points="560,56 1040,0 1120,0 640,56" fill={GOLD} opacity="0.85" />
    </svg>
  </div>
);

const Package = () => {
  return (
    <div className="relative overflow-hidden min-h-screen">
      
      {/* 1. Continuous Sports Background */}
      <PageBackground />
      
      {/* 2. Parallax Image Background */}
      <ParallaxImageBackground image={backgroundImage} />

      <div className="relative z-10 max-w-7xl mx-auto px-6 pt-24 pb-4">
        
        {/* Header Section */}
        <div className="text-center mb-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-slate-900 mb-6 shadow-xl shadow-slate-200"
          >
            <Star className="w-3.5 h-3.5" style={{ color: GOLD }} fill="currentColor" />
            <span className="text-[10px] font-black uppercase tracking-[0.3em] text-white">Premium Tiers</span>
          </motion.div>
          
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="font-serif text-4xl md:text-6xl font-black text-white tracking-tight leading-[1.05] mb-6"
          >
            Choose Your <span style={{ color: GOLD }}>Perfect Package</span>
          </motion.h1>

          <div className="w-16 h-px mx-auto rounded-full mb-6" style={{ background: HAIRLINE }} />
          
          <motion.p 
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="text-slate-300 max-w-2xl mx-auto text-lg font-medium"
          >
            Elevate your company culture through high-energy corporate tournaments and 
            exclusive sporting experiences.
          </motion.p>
        </div>

        <KitStripeDivider />

        {/* Card Grid */}
        <div className="flex flex-col lg:flex-row gap-8 items-stretch justify-center mt-8">
          
          {/* Annual Subscription Card */}
          <Link to="/services/annualpackage" className="w-full lg:w-1/2 group">
            <motion.div 
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="relative h-full transition-transform duration-500 group-hover:-translate-y-2"
            >
              <div className="absolute -top-4 right-8 z-20">
                <div
                  className="text-white text-[10px] font-black px-4 py-2 rounded-full tracking-widest uppercase flex items-center gap-2 shadow-2xl"
                  style={{ background: `linear-gradient(135deg, ${ACCENT}, #4a0d13)` }}
                >
                  <Zap className="w-3 h-3" style={{ color: GOLD }} fill={GOLD} />
                  Most Preferred
                </div>
              </div>

              <div className="relative h-full overflow-hidden rounded-[3rem] bg-slate-900 p-1">
                <span className="absolute top-1 left-8 right-8 h-[3px] z-10 rounded-full" style={{ background: HAIRLINE }} />
                <div className="absolute inset-0 opacity-40" style={{ background: `linear-gradient(135deg, ${ACCENT}, transparent, ${GOLD})` }} />
                <div className="relative h-full bg-slate-900 rounded-[2.8rem] p-10 md:p-16 flex flex-col items-center text-center overflow-hidden">
                  <div className="absolute top-0 right-0 w-64 h-64 blur-[80px] -mr-32 -mt-32 transition-transform duration-700 group-hover:scale-150" style={{ background: `${ACCENT}33` }} />
                  <span className="absolute top-6 right-8 font-serif text-4xl font-black text-white/[0.06] select-none">01</span>
                  <div className="relative z-10">
                    <div
                      className="w-20 h-20 rounded-3xl flex items-center justify-center mb-8 mx-auto transition-transform duration-500 shadow-[0_20px_40px_rgba(140,29,43,0.4)]"
                      style={{ background: `linear-gradient(135deg, ${ACCENT}, #4a0d13)` }}
                    >
                      <CalendarDays className="w-10 h-10 text-white" />
                    </div>
                    <h3 className="font-serif text-3xl md:text-4xl font-black text-white mb-4">Annual Subscription</h3>
                    <p className="text-slate-400 font-medium mb-10 max-w-sm mx-auto leading-relaxed">
                      12 months of unlimited sports events, premium networking, and team building activities.
                    </p>
                    <div
                      className="inline-flex items-center gap-3 px-8 py-4 rounded-2xl font-bold transition-all duration-300 shadow-xl"
                      style={{ background: GOLD, color: "#0f172a" }}
                    >
                      Explore Details
                      <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          </Link>

          {/* Quarterly Card */}
          <Link to="/services/quarterly" className="w-full lg:w-1/2 group">
            <motion.div 
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="relative h-full transition-transform duration-500 group-hover:-translate-y-2"
            >
              <div className="relative h-full overflow-hidden rounded-[3rem] bg-slate-800/90 border border-slate-700 shadow-[0_30px_60px_-15px_rgba(0,0,0,0.3)]">
                <span className="absolute top-0 left-8 right-8 h-[3px]" style={{ background: HAIRLINE }} />
                <div className="relative h-full p-10 md:p-16 flex flex-col items-center text-center">
                  <div className="absolute top-0 left-0 w-32 h-32 bg-slate-700 rounded-br-full -ml-8 -mt-8 border border-slate-600" />
                  <span className="absolute top-6 right-8 font-serif text-4xl font-black text-white/[0.08] select-none">02</span>
                  <div className="relative z-10">
                    <div className="w-20 h-20 bg-slate-700 border border-slate-600 rounded-3xl flex items-center justify-center mb-8 mx-auto transition-transform duration-500">
                      <Trophy className="w-10 h-10" style={{ color: GOLD }} />
                    </div>
                    <h3 className="font-serif text-3xl md:text-4xl font-black text-white mb-4">Quarterly League</h3>
                    <p className="text-slate-300 font-medium mb-10 max-w-sm mx-auto leading-relaxed">
                      High-energy competitive events every 3 months. Perfect for testing your team's spirit.
                    </p>
                    <div
                      className="inline-flex items-center gap-3 border-2 text-white px-8 py-4 rounded-2xl font-bold transition-all duration-300 group-hover:shadow-xl"
                      style={{ borderColor: GOLD }}
                    >
                      Explore Details
                      <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          </Link>
        </div>
      </div>
    </div>
  )
}

export default Package