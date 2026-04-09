import React from "react";
import { motion } from 'framer-motion';
import { CheckCircle, Trophy, ArrowRight, CalendarDays, ArrowLeft } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';

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

// --- BACKGROUND COMPONENT ---
const ContinuousSportsBackground = () => {
  const icons = [Trophy, ArrowRight, CalendarDays, ArrowLeft];
  return (
    <div className="fixed inset-0 overflow-hidden bg-white pointer-events-none z-0">
      <div className="absolute top-[-10%] left-[-10%] w-[60%] h-[60%] bg-red-100/40 blur-[120px] rounded-full" />
      <div className="absolute bottom-[-10%] right-[-10%] w-[50%] h-[50%] bg-red-50/60 blur-[120px] rounded-full" />
      
      {[10, 40, 70].map((top, idx) => (
        <div key={top} className="flex absolute opacity-[0.03]" style={{ top: `${top}%` }}>
          <motion.div 
            initial={{ x: idx % 2 === 0 ? 0 : "-50%" }}
            animate={{ x: idx % 2 === 0 ? "-50%" : 0 }}
            transition={{ duration: 45 + idx * 5, repeat: Infinity, ease: "linear" }}
            className="flex gap-24 pr-24 whitespace-nowrap"
          >
            {[...icons, ...icons, ...icons, ...icons].map((Icon, i) => (
              <Icon key={i} size={80 + idx * 10} className="text-red-900" strokeWidth={0.5} />
            ))}
          </motion.div>
        </div>
      ))}
    </div>
  );
};

const QLeague = () => {
  const navigate = useNavigate();
  
  return (
    <div className="relative min-h-screen bg-gray-50/30 overflow-x-hidden">
      <ContinuousSportsBackground />
      
      <div className="relative z-10">
        {/* Navigation */}
        <nav className="max-w-7xl mx-auto px-6 pt-10">
          <motion.button
            onClick={() => navigate(-1)}
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            className="group inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white border border-red-100 text-gray-700 hover:text-[#C21807] hover:border-[#C21807] transition-all shadow-sm cursor-pointer"
          >
            <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
            <span className="text-sm font-bold">Back to Services</span>
          </motion.button>
        </nav>

        {/* Hero Section */}
        <section className="py-16 md:py-24 text-center px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="max-w-4xl mx-auto space-y-6"
          >
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-red-50 border border-red-100">
              <Trophy className="w-4 h-4 text-[#C21807]" />
              <span className="text-xs font-bold text-[#C21807] uppercase tracking-widest">Quarterly Tournaments</span>
            </div>
            
            <h1 className="text-4xl md:text-6xl font-black text-gray-900 leading-tight">
              Q-League — <br />
              <span className="bg-gradient-to-r from-[#C21807] to-[#800000] bg-clip-text text-transparent">
                Compete. Connect. Conquer.
              </span>
            </h1>
            
            <p className="text-gray-600 text-lg max-w-2xl mx-auto font-medium">
              Every quarter, <span className="text-gray-900 font-bold">HAKIRUSH</span> brings together <span className="text-[#C21807] font-bold">10+ companies</span> for high-octane corporate showdowns.
            </p>
          </motion.div>
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
                  className="group relative h-[450px] rounded-[2rem] overflow-hidden shadow-2xl bg-white"
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
              className="bg-white p-10 rounded-[2.5rem] shadow-xl border border-gray-100"
            >
              <h2 className="text-2xl font-black mb-8 flex items-center gap-3">
                <CheckCircle className="text-[#C21807]" /> What's Included
              </h2>
              <ul className="space-y-5">
                {features.map((item, i) => (
                  <li key={i} className="flex gap-4 text-gray-700 font-medium italic">
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
              className="bg-white  p-10 rounded-[2.5rem] shadow-xl"
            >
              <h2 className="text-2xl font-black mb-8 flex items-center gap-3">
                <Trophy className="text-[#C21807]" /> Core Benefits
              </h2>
              <ul className="space-y-5">
                {benefits.map((item, i) => (
                  <li key={i} className="flex gap-4 text-gray-700 font-medium">
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
                className="group relative inline-flex items-center gap-4 px-12 py-6 bg-[#C21807] text-white font-black text-xl rounded-2xl shadow-[0_20px_50px_rgba(194,24,7,0.3)] hover:bg-red-900 transition-all duration-300 cursor-pointer"
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