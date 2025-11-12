import React from "react";
import { motion } from 'framer-motion'
import Cricket from '../assets/cricket.png'
import Badminton from '../assets/badminton.png'
import Football from '../assets/football.png'
import Multi from "../assets/multisports.png";

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

const QLeague = () => {
  return (
    <div className="bg-[#FFF5F5] pb-10">

      <section className="py-16 relative overflow-hidden">
        {/* Absolute positioned background gradients */}
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            background:
              'radial-gradient(circle at center, rgba(255,0,0,0.06), transparent 60%), radial-gradient(circle at bottom right, rgba(255,102,0,0.05), transparent 80%), radial-gradient(circle at top left, rgba(255,255,255,0.05), transparent 90%)'
          }}
        />

        {/* Max-width container for content */}
        <div className="max-w-7xl mx-auto px-6 text-center relative z-10">
          {/* Header */}
          <motion.div
              initial={{ opacity: 0, y: -60 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, ease: "easeOut" }}
              viewport={{ once: true }}
              className="text-center w-11/12 md:max-w-4xl mx-auto px-4"
          >
              <h1 className="text-3xl md:text-5xl font-extrabold text-[#0D1B2A] pb-2">
                  Q-League — <br className="md:hidden" /> 
                  <span className="text-[#C21807]">Compete. Connect. Conquer.</span>
              </h1>
              <p className="mt-5 text-gray-600 text-md md:text-lg ">
                  Every quarter, HAKIRUSH brings together 10+ companies for high-energy corporate tournaments — each event focusing on one iconic sport.
              </p>
          </motion.div>
        </div>
      </section>

      {/* Timeline Cards */}
      <motion.div 
      initial={{ opacity: 0, y: 60 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.7, ease: "easeOut" }}
      viewport={{ once: true }}
      className="mt-16 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 px-6 md:px-20">
        {quarters.map((item) => (
          <div 
          key={item.id} 
          className="group rounded-2xl overflow-hidden bg-white shadow-md hover:shadow-2xl transition-all duration-500">
            <div className="relative h-64 overflow-hidden">
              <img src={item.image} alt={item.name} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"/>
              <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity flex flex-col justify-center text-center text-white">
                <h3 className="text-2xl font-bold">{item.quarter}</h3>
                <p className="text-sm mt-1">{item.name} — {item.sport}</p>
              </div>
            </div>
          </div>
        ))}
      </motion.div>

      {/* What's Included + Benefits */}
      <div className="mt-24 grid md:grid-cols-2 gap-12 px-6 md:px-20">
        
        <motion.div 
          initial={{ opacity: 0, y: 40, rotateX: -10 }}
          whileInView={{ opacity: 1, y: 0, rotateX: 0 }}
          whileHover={{ scale: 1.05, rotateY: 10 }}
          transition={{ type: 'spring', stiffness: 50 }}
          viewport={{ once: true }}
        className="p-8 bg-white shadow-lg rounded-2xl border border-gray-100 hover:shadow-red-400 cursor-pointer">
          <h2 className="text-2xl font-bold text-[#C21807] mb-4">What’s Included:</h2>
          <ul className="space-y-3 text-gray-700 list-disc list-inside">
            {features.map((text, i) => <li key={i}>{text}</li>)}
          </ul>
        </motion.div>

        <motion.div 
          initial={{ opacity: 0, y: 40, rotateX: -10 }}
          whileInView={{ opacity: 1, y: 0, rotateX: 0 }}
          whileHover={{ scale: 1.05, rotateY: 10 }}
          transition={{ type: 'spring', stiffness: 50 }}
          viewport={{ once: true }}
        className="p-8 bg-white shadow-lg rounded-2xl border border-gray-100 hover:shadow-red-400 cursor-pointer">
          <h2 className="text-2xl font-bold text-[#C21807] mb-4">Benefits:</h2>
          <ul className="space-y-3 text-gray-700 list-disc list-inside">
            {benefits.map((text, i) => <li key={i}>{text}</li>)}
          </ul>
        </motion.div>
      </div>
          <div className="flex justify-center mt-16">
            <a
              href="/contact"
              className="px-8 py-3 text-white bg-red-600 hover:bg-red-700 transitions rounded-full text-lg font-semibold shadow-lg cursor-pointer"
            >
              Register for Quarterly Package
            </a>
          </div>
    </div>
  );
};

export default QLeague;
