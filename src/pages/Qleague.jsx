import React from "react";
import { motion } from 'framer-motion'
import Cricket from '../assets/cricket.webp'
import Badminton from '../assets/badminton.jpg'
import Football from '../assets/football.webp'
import Multi from "../assets/multisports.jpeg";

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
    <div className="bg-[#FFF5F5] pt-24 pb-32">

      {/* Header */}
      <motion.div 
      initial={{ opacity: 0, y: -60 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.7, ease: "easeOut" }}
      viewport={{ once: true }}
      className="text-center max-w-3xl mx-auto px-4">
        <h1 className="text-4xl md:text-5xl font-extrabold text-[#0D1B2A]">
          Q-League — <span className="text-[#C21807]">Compete. Connect. Conquer.</span>
        </h1>
        <p className="mt-5 text-gray-600 text-lg md:text-xl">
          Every quarter, HAKIRUSH brings together 10+ companies for high-energy corporate tournaments — each event focusing on one iconic sport.
        </p>
      </motion.div>

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
              className="px-10 py-4 rounded-lg text-white font-semibold 
              bg-gradient-to-r from-[#C21807] to-[#870B00] hover:scale-105 transition-transform"
            >
              Register for Quarterly Package
            </a>
          </div>
    </div>
  );
};

export default QLeague;
