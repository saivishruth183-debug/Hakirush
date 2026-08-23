import React, { useEffect, useRef } from "react";
import { motion, useMotionValue, useSpring, useTransform, useScroll } from 'framer-motion';
import {
  CheckCircle2, Trophy, ArrowRight, ArrowLeft,
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

const tickerIcons = [Trophy, Activity, Target, CircleDot, Star, Dumbbell, Flag];

// --- AMBIENT SCOREBOARD BACKGROUND (shared with Annual Plan) -------------
const ScoreboardBackground = () => (
  <div className="fixed inset-0 overflow-hidden pointer-events-none -z-20 bg-[#0B0C0E]">
    <div className="absolute top-[-15%] left-[-10%] w-[55%] h-[55%] bg-[#D4142A]/10 blur-[140px] rounded-full" />
    <div className="absolute bottom-[-15%] right-[-10%] w-[45%] h-[45%] bg-[#E8B923]/[0.06] blur-[140px] rounded-full" />

    <div
      className="absolute inset-0 opacity-[0.05]"
      style={{
        backgroundImage:
          'linear-gradient(#F4F2ED 1px, transparent 1px), linear-gradient(90deg, #F4F2ED 1px, transparent 1px)',
        backgroundSize: '64px 64px',
      }}
    />

    <div className="flex absolute top-[8%] opacity-[0.05] w-full overflow-hidden">
      <motion.div
        initial={{ x: 0 }}
        animate={{ x: '-50%' }}
        transition={{ duration: 55, repeat: Infinity, ease: 'linear' }}
        className="flex gap-28 pr-28 whitespace-nowrap flex-nowrap"
      >
        {[...tickerIcons, ...tickerIcons, ...tickerIcons].map((Icon, i) => (
          <Icon key={i} size={64} className="text-[#F4F2ED]" strokeWidth={1} />
        ))}
      </motion.div>
    </div>
  </div>
);

// --- PARALLAX HERO IMAGE (shared with Annual Plan) -----------------------
const ParallaxImageBackground = ({ image }) => {
  const containerRef = useRef(null);
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const springConfig = { damping: 30, stiffness: 80, mass: 0.6 };
  const smoothX = useSpring(mouseX, springConfig);
  const smoothY = useSpring(mouseY, springConfig);
  const translateX = useTransform(smoothX, [-1, 1], [-24, 24]);
  const translateY = useTransform(smoothY, [-1, 1], [-16, 16]);
  const scale = useTransform(smoothX, [-1, 1], [1.06, 1.1]);
  const { scrollY } = useScroll();
  const scrollTranslateY = useTransform(scrollY, [0, 1500], [0, 150]);

  useEffect(() => {
    const handleMouseMove = (e) => {
      mouseX.set((e.clientX / window.innerWidth) * 2 - 1);
      mouseY.set((e.clientY / window.innerHeight) * 2 - 1);
    };
    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, [mouseX, mouseY]);

  return (
    <div ref={containerRef} className="fixed left-0 w-full overflow-hidden -z-10" style={{ top: "-10vh", height: "125vh" }}>
      <motion.img
        src={image}
        alt=""
        style={{
          x: translateX,
          y: useTransform([translateY, scrollTranslateY], ([ty, sy]) => ty + sy),
          scale,
        }}
        className="w-full h-full object-cover object-center will-change-transform grayscale-[25%]"
      />
      <div className="absolute inset-0 bg-gradient-to-b from-[#0B0C0E]/60 via-[#0B0C0E]/70 to-[#0B0C0E]" />
    </div>
  );
};

// --- FIGHT-CARD TILE -------------------------------------------------------
const MatchCard = ({ item, index }) => (
  <motion.div
    initial={{ opacity: 0, y: 30 }}
    whileInView={{ opacity: 1, y: 0 }}
    transition={{ delay: index * 0.1, type: "spring", stiffness: 100 }}
    viewport={{ once: true }}
    whileHover={{ y: -6 }}
    className="group relative h-[420px] rounded-2xl overflow-hidden border border-white/10 bg-[#14161A]"
  >
    <img
      src={item.image}
      alt={item.name}
      className="absolute inset-0 w-full h-full object-cover opacity-80 transition-transform duration-700 group-hover:scale-108"
    />
    <div className="absolute inset-0 bg-gradient-to-t from-[#0B0C0E] via-[#0B0C0E]/50 to-[#0B0C0E]/10" />

    {/* giant ghosted round marker */}
    <span
      className="pointer-events-none absolute -top-3 -right-2 select-none font-black text-white/[0.08] leading-none z-0"
      style={{ fontFamily: '"Anton", sans-serif', fontSize: '7.5rem' }}
    >
      {item.quarter}
    </span>

    {/* round tag */}
    <div className="absolute top-6 left-6 z-10">
      <span
        className="px-3 py-1 bg-[#D4142A] text-white text-xs rounded-md shadow-lg"
        style={{ fontFamily: '"Anton", sans-serif', letterSpacing: '0.05em' }}
      >
        ROUND {item.quarter.replace('Q', '')}
      </span>
    </div>

    <div className="absolute bottom-7 left-7 right-7 z-10">
      <span className="text-[11px] font-bold uppercase tracking-[0.25em]" style={{ color: '#E8B923' }}>
        {item.sport}
      </span>
      <h3
        className="text-white mt-2 leading-[1.05]"
        style={{ fontFamily: '"Anton", sans-serif', fontSize: '1.65rem', letterSpacing: '0.01em' }}
      >
        {item.name}
      </h3>
      <div className="mt-3 h-[3px] w-8 bg-[#D4142A] rounded-full transition-all duration-500 group-hover:w-14" />
    </div>
  </motion.div>
);

const QLeague = () => {
  const navigate = useNavigate();

  return (
    <div className="relative min-h-screen overflow-x-hidden" style={{ fontFamily: '"Manrope", sans-serif' }}>
      <ScoreboardBackground />
      <ParallaxImageBackground image={backgroundImage} />

      <div className="relative z-10 w-full">
        {/* Navigation */}
        <nav className="max-w-7xl mx-auto px-6 pt-10">
          <motion.button
            onClick={() => navigate(-1)}
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            className="group flex items-center gap-2 px-4 py-2 rounded-full bg-white/[0.06] backdrop-blur-md border border-white/15 text-[#F4F2ED] hover:border-[#D4142A]/60 hover:text-white transition-all cursor-pointer"
          >
            <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
            <span className="text-sm font-semibold">Back to Services</span>
          </motion.button>
        </nav>

        {/* Hero — scale: eyebrow 11px / h1 clamp 1.75–2.75rem / body 1rem */}
        <section className="pt-12 pb-14 px-6 text-center">
          <div className="max-w-2xl mx-auto">
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-[#D4142A]/40 bg-[#D4142A]/10 mb-5"
            >
              <Trophy className="w-3.5 h-3.5 text-[#E8B923]" />
              <span className="text-[11px] font-bold text-[#E8B923] uppercase tracking-[0.2em]">
                Quarterly Tournaments
              </span>
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-[#F4F2ED] leading-[1.15] font-bold text-5xl"
            >
              Q-LEAGUE —{' '}
              <span className="text-[#D4142A]">COMPETE. CONNECT. CONQUER.</span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.2 }}
              className="mt-5 text-white/60 text-base max-w-md mx-auto leading-relaxed"
            >
              Every quarter, <span className="text-[#F4F2ED] font-semibold">HAKIRUSH</span> brings{' '}
              <span className="text-[#D4142A] font-semibold">10+ companies</span> together for
              high-octane corporate showdowns.
            </motion.p>
          </div>
        </section>

        {/* Tournament grid */}
        <section className="pb-24 px-6">
          <div className="max-w-7xl mx-auto">
            <div className="flex items-end justify-between mb-8 flex-wrap gap-4">
              <h2
                className="text-[#F4F2ED]"
                style={{ fontSize: '1.85rem' }}
              >
                THE FOUR ROUNDS
              </h2>
              <span className="text-sm text-white/40 font-medium">4 tournaments · one calendar year</span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
              {quarters.map((item, index) => (
                <MatchCard key={item.id} item={item} index={index} />
              ))}
            </div>
          </div>
        </section>

        {/* Benefits & CTA */}
        <section className="pb-24 px-6">
          <div className="max-w-7xl mx-auto grid md:grid-cols-2 gap-6">
            {/* Features Card */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="relative bg-[#14161A] p-8 md:p-10 rounded-3xl border border-white/10 overflow-hidden"
            >
              <div
                className="absolute -bottom-8 -right-4 select-none font-black text-white/[0.03] leading-none pointer-events-none"
                style={{ fontFamily: '"Anton", sans-serif', fontSize: '10rem' }}
              >
                01
              </div>
              <div className="relative z-10">
                <span className="text-[11px] font-bold uppercase tracking-[0.3em] text-[#E8B923]">
                  The Kit
                </span>
                <div className="flex items-center gap-3 mt-3 mb-8">
                  <div className="p-2.5 bg-[#D4142A] rounded-xl">
                    <CheckCircle2 className="w-5 h-5 text-white" strokeWidth={2.5} />
                  </div>
                  <h3 className="text-[#F4F2ED]" style={{ fontFamily: '"Anton", sans-serif', fontSize: '1.4rem' }}>
                    What's Included
                  </h3>
                </div>
                <ul className="space-y-4">
                  {features.map((item, i) => (
                    <li key={i} className="flex gap-3 items-start text-white/65">
                      <div className="mt-2 w-1 h-1 rounded-full bg-[#D4142A] shrink-0" />
                      <span className="text-[15px] leading-relaxed">{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </motion.div>

            {/* Benefits Card */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="relative bg-[#14161A] p-8 md:p-10 rounded-3xl border border-white/10 overflow-hidden"
            >
              <div
                className="absolute -bottom-8 -right-4 select-none font-black text-white/[0.03] leading-none pointer-events-none"
                style={{ fontFamily: '"Anton", sans-serif', fontSize: '10rem' }}
              >
                02
              </div>
              <div className="relative z-10">
                <span className="text-[11px] font-bold uppercase tracking-[0.3em] text-[#E8B923]">
                  The Payoff
                </span>
                <div className="flex items-center gap-3 mt-3 mb-8">
                  <div className="p-2.5 bg-[#D4142A] rounded-xl">
                    <Trophy className="w-5 h-5 text-white" strokeWidth={2.5} />
                  </div>
                  <h3 className="text-[#F4F2ED]" style={{ fontFamily: '"Anton", sans-serif', fontSize: '1.4rem' }}>
                    Core Benefits
                  </h3>
                </div>
                <ul className="space-y-4">
                  {benefits.map((item, i) => (
                    <li key={i} className="flex gap-3 items-start text-white/65">
                      <div className="mt-2 w-1 h-1 rounded-full bg-[#D4142A] shrink-0" />
                      <span className="text-[15px] leading-relaxed">{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </motion.div>
          </div>

          {/* CTA */}
          <div className="mt-16 flex flex-col items-center text-center">
            <span className="text-xs font-bold uppercase tracking-[0.3em] text-white/40 mb-4">
              Four rounds. One champion.
            </span>
            <Link to="/contact">
              <motion.button
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.97 }}
                className="inline-flex items-center gap-3 px-10 py-5 bg-[#D4142A] text-white font-bold text-lg rounded-2xl shadow-[0_20px_60px_-15px_rgba(212,20,42,0.5)] hover:bg-[#B5102380] transition-colors cursor-pointer"
                style={{ fontFamily: '"Anton", sans-serif', letterSpacing: '0.02em' }}
              >
                REGISTER FOR Q-LEAGUE
                <ArrowRight className="w-5 h-5" />
              </motion.button>
            </Link>
          </div>
        </section>
      </div>
    </div>
  );
};

export default QLeague;