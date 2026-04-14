import React from 'react';
import { motion } from "framer-motion";
import { MapPin, Clock, MoveRight } from "lucide-react";

// --- INTERNAL BACKGROUND COMPONENT ---
// Creates a subtle, moving "sports" watermark effect
const ContinuousSportsBackground = () => {
  const words = ["CRICKET", "BADMINTON", "ENERGY", "FOOTBALL", "RUSH", "TEAMWORK", "WIN"];
  
  return (
    <div className="absolute inset-0 z-0 pointer-events-none opacity-[0.03] overflow-hidden select-none">
      <div className="absolute top-0 left-0 w-[200%] h-[200%] -rotate-12 flex flex-col gap-8">
        {[...Array(10)].map((_, i) => (
          <motion.div
            key={i}
            initial={{ x: i % 2 === 0 ? "0%" : "-50%" }}
            animate={{ x: i % 2 === 0 ? "-50%" : "0%" }}
            transition={{ duration: 45, repeat: Infinity, ease: "linear" }}
            className="flex gap-12 whitespace-nowrap text-8xl md:text-9xl font-black italic tracking-tighter"
          >
            {[...Array(8)].map((_, j) => (
              <span key={j}>{words[j % words.length]}</span>
            ))}
          </motion.div>
        ))}
      </div>
    </div>
  );
};

// --- DATA ---
const partners = [
  { img: "https://placehold.co/150x80/e5e7eb/6b7280?text=Partner+1" },
  { img: "https://placehold.co/150x80/e5e7eb/6b7280?text=Partner+2" },
  { img: "https://placehold.co/150x80/e5e7eb/6b7280?text=Partner+3" },
  { img: "https://placehold.co/150x80/e5e7eb/6b7280?text=Partner+4" },
  { img: "https://placehold.co/150x80/e5e7eb/6b7280?text=Partner+5" },
  { img: "https://placehold.co/150x80/e5e7eb/6b7280?text=Partner+6" },
];

const careers = [
  { title: "Event Coordinator", location: "Bengaluru", type: "Full-time" },
  { title: "Content Producer", location: "Hyderabad", type: "Contract" },
  { title: "Sales & Partnerships", location: "Remote", type: "Full-time" },
];

// --- MAIN COMPONENT ---
const Partners = () => {
  const handleApplyClick = () => {
    window.location.href = "mailto:careers@hakirush.com?subject=Job Application";
  };

  return (
    <div className="relative bg-white overflow-hidden">
      {/* 1. Global Background for the whole section */}
      <ContinuousSportsBackground />

      <div className="relative z-10">
        {/* PARTNERS SECTION */}
        <section className="py-20 overflow-hidden">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 text-center mb-12">
            <motion.h2 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-4xl md:text-5xl font-black text-slate-900"
            >
              Partners & <span className="text-red-600">Press</span>
            </motion.h2>
          </div>

          <div className="flex overflow-hidden">
            <motion.div
              className="flex gap-10 whitespace-nowrap"
              animate={{ x: ["0%", "-50%"] }}
              transition={{ 
                duration: 30, 
                repeat: Infinity, 
                ease: "linear" 
              }}
            >
              {[...partners, ...partners].map((partner, index) => (
                <div 
                  key={index} 
                  className="bg-white/90 backdrop-blur-sm px-8 py-6 rounded-2xl shadow-sm border border-slate-100 shrink-0 hover:shadow-lg hover:border-red-300 transition-all duration-300 group"
                >
                  <img 
                    src={partner.img} 
                    alt="Partner" 
                    className="h-12 w-auto grayscale opacity-60 group-hover:grayscale-0 group-hover:opacity-100 transition-all" 
                  />
                </div>
              ))}
            </motion.div>
          </div>
        </section>

        {/* CAREERS SECTION */}
        <section className="py-24 bg-slate-900 rounded-[3rem] mx-4 sm:mx-8 mb-20 overflow-hidden relative shadow-2xl">
          {/* Internal background can be added here too if you want it visible on dark bg */}
          <div className="max-w-7xl mx-auto px-6 relative z-10">
            <div className="text-center mb-16">
              <motion.h2 
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="text-4xl md:text-5xl font-black mb-6 text-white"
              >
                Join The <span className="text-red-600">Rush</span>
              </motion.h2>
              <p className="text-slate-400 text-xl font-medium">
                We're always looking for high-energy talent.
              </p>
            </div>

            <div className="grid md:grid-cols-3 gap-8">
              {careers.map((job, index) => (
                <motion.div 
                  key={index} 
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  className="p-8 bg-white/5 backdrop-blur-md rounded-3xl border border-white/10 hover:bg-white/10 hover:border-red-500/50 transition-all group"
                >
                  <h4 className="text-2xl font-bold mb-6 text-white group-hover:text-red-500 transition-colors">
                    {job.title}
                  </h4>
                  <div className="space-y-4 mb-8">
                    <div className="flex items-center gap-3 text-slate-300">
                      <MapPin className="w-5 h-5 text-red-500" /> {job.location}
                    </div>
                    <div className="flex items-center gap-3 text-slate-300">
                      <Clock className="w-5 h-5 text-red-500" /> {job.type}
                    </div>
                  </div>
                  <button 
                    onClick={handleApplyClick} 
                    className="w-full text-white py-4 bg-red-600 rounded-xl font-bold hover:bg-red-700 transition-all flex items-center justify-center gap-2 cursor-pointer active:scale-95"
                  >
                    Apply Now <MoveRight className="w-5 h-5" />
                  </button>
                </motion.div>
              ))}
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};

export default Partners;