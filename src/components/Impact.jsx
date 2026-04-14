import React from 'react';
import { motion } from "framer-motion";
import { Quote } from "lucide-react";

// --- INTERNAL BACKGROUND COMPONENT ---
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
            transition={{ duration: 40, repeat: Infinity, ease: "linear" }}
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

// --- MAIN IMPACT COMPONENT ---
const metrics = [
  { value: "85%", label: "Average Participation" },
  { value: "1,200+", label: "Employees Engaged" },
  { value: "4.8/5", label: "Average NPS" },
  { value: "50+", label: "Events Delivered" },
];

const testimonials = [
  { 
    quote: '"HAKIRUSH organised a flawless tournament for our 200 employees. The energy was instant — people were talking across teams the next week."', 
    title: "HR Lead", 
    company: "FinTech Company" 
  },
  { 
    quote: '"Well-run, professional and great content. Our leadership loved the visibility."', 
    title: "Operations Head", 
    company: "Infrastructure Company" 
  },
  { 
    quote: '"Best employee engagement event we did this year."', 
    title: "People Team", 
    company: "EdTech Startup" 
  },
];

const Impact = () => {
  return (
    <div className="relative bg-white min-h-screen overflow-hidden">
      {/* Background stays at z-0 */}
      <ContinuousSportsBackground />

      {/* Content sits at z-10 */}
      <div className="relative z-10">
        
        {/* IMPACT METRICS */}
        <section className="py-20">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 text-center">
            <motion.h2 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-4xl md:text-5xl font-black mb-16 text-slate-900"
            >
              Impact & <span className="text-red-600">Metrics</span>
            </motion.h2>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 px-4">
              {metrics.map((metric, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  whileHover={{ scale: 1.05 }}
                  className="bg-white/70 backdrop-blur-md p-10 rounded-3xl shadow-xl border border-slate-100 hover:border-red-200 transition-all duration-300 cursor-pointer"
                >
                  <div className="text-5xl font-black text-red-600 mb-2">{metric.value}</div>
                  <div className="text-slate-600 font-bold uppercase tracking-widest text-xs">
                    {metric.label}
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* TESTIMONIALS */}
        <section className="py-24">
          <div className="max-w-7xl mx-auto px-4 sm:px-6">
            <motion.h2 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-4xl md:text-5xl font-black text-center mb-16 text-slate-900"
            >
              What Companies <span className="text-red-600">Say</span>
            </motion.h2>
            
            <div className="grid md:grid-cols-3 gap-8 px-4">
              {testimonials.map((testimonial, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, scale: 0.9 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.2 }}
                  className="relative bg-white/90 backdrop-blur-md p-8 rounded-3xl shadow-xl border border-slate-100 hover:border-red-200 transition-colors"
                >
                  <Quote className="w-12 h-12 text-red-100 absolute top-6 right-6 opacity-40" />
                  <p className="text-slate-700 italic mb-8 relative z-10 text-lg leading-relaxed font-medium">
                    {testimonial.quote}
                  </p>
                  <div className="pt-6 border-t border-slate-100 relative z-10">
                    <p className="font-bold text-red-600">{testimonial.title}</p>
                    <p className="text-sm font-bold text-slate-500 uppercase tracking-tight">
                      {testimonial.company}
                    </p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};

export default Impact;