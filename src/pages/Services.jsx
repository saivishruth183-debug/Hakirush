import React, { useEffect, useRef } from 'react'
import { Link } from 'react-router-dom'
import { motion, useMotionValue, useSpring, useTransform, useScroll } from 'framer-motion'
import { 
  Star, CalendarDays, ArrowRight, Zap, Trophy
} from 'lucide-react'
import PageBackground from '../components/PageBackground'
import backgroundImage from '../assets/Hero/Backimage.png'

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
      <div className="absolute inset-0 bg-slate-950/40 mix-blend-multiply" />
    </div>
  );
};

const Package = () => {
  return (
    <div className="relative overflow-hidden min-h-screen">
      
      {/* 1. Continuous Sports Background */}
      <PageBackground />
      
      {/* 2. Parallax Image Background */}
      <ParallaxImageBackground image={backgroundImage} />

      <div className="relative z-10 max-w-7xl mx-auto px-6 py-24">
        
        {/* Header Section */}
        <div className="text-center mb-20">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-slate-900/80 border border-slate-700 mb-6"
          >
            <Star className="w-4 h-4 text-red-500" fill="currentColor" />
            <span className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-200">Premium Tiers</span>
          </motion.div>
          
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-4xl md:text-6xl font-black text-white tracking-tight mb-6"
          >
            Choose Your <span className="text-red-500">Perfect Package</span>
          </motion.h1>
          
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

        {/* Card Grid */}
        <div className="flex flex-col lg:flex-row gap-8 items-stretch justify-center">
          
          {/* Annual Subscription Card */}
          <Link to="/services/annualpackage" className="w-full lg:w-1/2 group">
            <motion.div 
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="relative h-full transition-transform duration-500 group-hover:-translate-y-2"
            >
              <div className="absolute -top-4 right-8 z-20">
                <div className="bg-slate-900 text-white text-[10px] font-black px-4 py-2 rounded-full tracking-widest uppercase flex items-center gap-2 shadow-2xl">
                  <Zap className="w-3 h-3 text-yellow-400 fill-yellow-400" />
                  Most Preferred
                </div>
              </div>

              <div className="relative h-full overflow-hidden rounded-[3rem] bg-slate-900 p-1">
                <div className="absolute inset-0 bg-gradient-to-br from-red-500 via-transparent to-orange-500 opacity-40" />
                <div className="relative h-full bg-slate-900 rounded-[2.8rem] p-10 md:p-16 flex flex-col items-center text-center overflow-hidden">
                  <div className="absolute top-0 right-0 w-64 h-64 bg-red-600/20 blur-[80px] -mr-32 -mt-32 transition-transform duration-700 group-hover:scale-150" />
                  <div className="relative z-10">
                    <div className="w-20 h-20 bg-red-600 rounded-3xl flex items-center justify-center mb-8 mx-auto transition-transform duration-500 shadow-[0_20px_40px_rgba(220,38,38,0.3)]">
                      <CalendarDays className="w-10 h-10 text-white" />
                    </div>
                    <h3 className="text-3xl md:text-4xl font-black text-white mb-4">Annual Subscription</h3>
                    <p className="text-slate-400 font-medium mb-10 max-w-sm mx-auto leading-relaxed">
                      12 months of unlimited sports events, premium networking, and team building activities.
                    </p>
                    <div className="inline-flex items-center gap-3 bg-white text-slate-900 px-8 py-4 rounded-2xl font-bold transition-all duration-300 group-hover:bg-red-600 group-hover:text-white shadow-xl">
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
                <div className="relative h-full p-10 md:p-16 flex flex-col items-center text-center">
                  <div className="absolute top-0 left-0 w-32 h-32 bg-slate-700 rounded-br-full -ml-8 -mt-8 border border-slate-600" />
                  <div className="relative z-10">
                    <div className="w-20 h-20 bg-slate-700 border border-slate-600 rounded-3xl flex items-center justify-center mb-8 mx-auto transition-transform duration-500">
                      <Trophy className="w-10 h-10 text-red-500" />
                    </div>
                    <h3 className="text-3xl md:text-4xl font-black text-white mb-4">Quarterly League</h3>
                    <p className="text-slate-300 font-medium mb-10 max-w-sm mx-auto leading-relaxed">
                      High-energy competitive events every 3 months. Perfect for testing your team's spirit.
                    </p>
                    <div className="inline-flex items-center gap-3 border-2 border-white text-white px-8 py-4 rounded-2xl font-bold transition-all duration-300 group-hover:bg-red-600 group-hover:border-red-600 group-hover:shadow-xl">
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