import React from "react";
import { motion } from "framer-motion";
import { Link, useNavigate } from "react-router-dom";
import { 
  Zap, Target, Eye, Crosshair, Lightbulb, Bolt, Trophy, Quote, MapPin, Clock, Users, 
  Activity, CircleDot, Star, Dumbbell, Flag, MoveRight, Linkedin, ExternalLink
} from "lucide-react";

import Krishna from "../assets/Team/krishna.png";
import Vishruth from "../assets/Team/vishruth.png";
import Madan from "../assets/Team/madan.png";
import Sruthi from "../assets/Team/Sruthi.png";
import Arushi from "../assets/Team/arushi.png";

const ContinuousSportsBackground = () => {
  const row1 = [Trophy, Activity, Target, CircleDot, Star, Dumbbell];
  const row2 = [Flag, Zap, Trophy, Activity, Target, Star];

  return (
    <div className="fixed inset-0 overflow-hidden bg-white pointer-events-none z-0">
      <div className="absolute top-[-10%] left-[-10%] w-[60%] h-[60%] bg-red-100/60 blur-[120px] rounded-full" />
      <div className="absolute bottom-[-10%] right-[-10%] w-[50%] h-[50%] bg-red-50/80 blur-[120px] rounded-full" />
      
      <div className="flex absolute top-[10%] opacity-[0.04]">
        <motion.div 
          initial={{ x: 0 }}
          animate={{ x: "-100%" }}
          transition={{ duration: 40, repeat: Infinity, ease: "linear" }}
          className="flex gap-24 pr-24 whitespace-nowrap"
        >
          {row1.map((Icon, i) => <Icon key={i} size={70} className="text-red-900" strokeWidth={1} />)}
          {row1.map((Icon, i) => <Icon key={`dup-${i}`} size={70} className="text-red-900" strokeWidth={1} />)}
        </motion.div>
      </div>

      <div className="flex absolute top-[40%] opacity-[0.03]">
        <motion.div 
          initial={{ x: "-100%" }}
          animate={{ x: 0 }}
          transition={{ duration: 50, repeat: Infinity, ease: "linear" }}
          className="flex gap-32 pr-32 whitespace-nowrap"
        >
          {row2.map((Icon, i) => <Icon key={i} size={100} className="text-red-900" strokeWidth={0.5} />)}
          {row2.map((Icon, i) => <Icon key={`dup-${i}`} size={100} className="text-red-900" strokeWidth={0.5} />)}
        </motion.div>
      </div>

      <div className="flex absolute top-[70%] opacity-[0.04]">
        <motion.div 
          initial={{ x: 0 }}
          animate={{ x: "-100%" }}
          transition={{ duration: 35, repeat: Infinity, ease: "linear" }}
          className="flex gap-20 pr-20 whitespace-nowrap"
        >
          {row1.map((Icon, i) => <Icon key={i} size={80} className="text-red-900" strokeWidth={0.8} />)}
          {row1.map((Icon, i) => <Icon key={`dup-${i}`} size={80} className="text-red-900" strokeWidth={0.8} />)}
        </motion.div>
      </div>

      <div className="absolute inset-0 pointer-events-none" style={{
        background: "radial-gradient(circle at center, transparent 0%, rgba(255,255,255,0.2) 60%, rgba(255,255,255,0.7) 100%)"
      }} />
    </div>
  )
}

const mission = [
  { icon: <Target className="w-8 h-8 text-red-600" />, title: "Mission", description: "To unleash team spirit through thoughtfully designed sports experiences that drive employee wellbeing, collaboration and long-term loyalty." },
  { icon: <Eye className="w-8 h-8 text-red-600" />, title: "Vision", description: "To be India's most trusted corporate sports partner — delivering repeatable ROI in employee engagement and employer branding." },
];

const founding = [
  { icon: <Crosshair className="w-6 h-6 text-red-600" />, title: "Why we started", description: "To solve a real problem: disengaged teams, growing employee isolation after remote work, and HR teams stretched thin." },
  { icon: <Lightbulb className="w-6 h-6 text-red-600" />, title: "What we learned", description: "Small, well-run events create outsized cultural impact — trust and collaboration increase far faster than through remote initiatives." },
  { icon: <Bolt className="w-6 h-6 text-red-600" />, title: "How we operate", description: "End-to-end delivery: strategy, venue, ops, production, content & measurement." },
];

const team = [
  { image: Krishna, name: "Krishna", role: "Founder/CEO - Strategy & Growth", linkedin: "https://www.linkedin.com/in/sudireddy-krishna-sai-reddy-566087192 " },
  { image: Madan, name: "Madan Anugonda", role: "Operations Manager", linkedin: "https://www.linkedin.com/in/madan-anugonda" },
  { image: Sruthi, name: "Sruthi", role: "Project Manager", linkedin: "https://www.linkedin.com/in/sruthi-reddy-a060b4275/" },
  { image: Arushi, name: "Arushi Shreya", role: "HR Manager", linkedin: "https://www.linkedin.com/in/arushi-shreya/" },
];

const work = [
  { id: 1, title: "Discovery", description: "We understand your people, culture and KPIs." },
  { id: 2, title: "Design", description: "Custom event plan, formats, schedules and branding options." },
  { id: 3, title: "Delivery", description: "Venue, logistics, referees, safety and on-ground ops." },
  { id: 4, title: "Content & Reach", description: "Photo, reels, streaming and social amplification." },
  { id: 5, title: "Measure & Scale", description: "Feedback, participation metrics and scaling plan for next cycles." },
];

export default function About() {
  const navigate = useNavigate();
  const handleApplyClick = () => { navigate('/contact'); };

  return (
    <div className="relative bg-gray-50 overflow-hidden min-h-screen">
      <ContinuousSportsBackground />
      
      <div className="relative z-10">
        
        {/* HERO SECTION */}
        <section className="relative pt-24 pb-12 md:pb-20">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 text-center">
            <motion.div
              initial={{ opacity: 0, y: -40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1.2, ease: "easeOut" }}
              className="space-y-6">
              <div className="flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-4 mb-6">
                <div className="w-12 h-12 sm:w-14 sm:h-14 bg-[#C21807] rounded-xl flex items-center justify-center shadow-lg">
                  <Zap className="w-6 h-6 sm:w-8 sm:h-8 text-white" />
                </div>
                <h1 className="text-4xl md:text-5xl font-black text-slate-900 tracking-tight">
                  About <span className="text-[#C21807]">HAKIRUSH</span>
                </h1>
              </div>
              <p className="text-base sm:text-lg md:text-xl text-slate-600 max-w-4xl mx-auto leading-relaxed font-medium px-4">
                HAKIRUSH is a corporate sports management company built for today’s fast-paced work culture, bringing organizations together through high-energy sports experiences.
              </p>
            </motion.div>
          </div>
        </section>

        {/* MISSION & VISION */}
        <section className="py-12">
          <div className="max-w-7xl mx-auto px-4 sm:px-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto">
              {mission.map((item, index) => (
                <motion.div
                  key={item.title}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  className="group p-8 bg-white/80 backdrop-blur-md rounded-3xl shadow-xl hover:shadow-red-100 transition-all duration-500 border border-slate-100 hover:border-red-300">
                  <div className="flex items-center gap-5 mb-6">
                    <div className="w-16 h-16 bg-red-50 rounded-2xl flex items-center justify-center shrink-0 group-hover:scale-110 transition-transform">
                      {item.icon}
                    </div>
                    <h3 className="text-2xl sm:text-3xl font-extrabold text-slate-900">Our <span className="text-red-600">{item.title}</span></h3>
                  </div>
                  <p className="text-slate-700 leading-relaxed text-lg font-medium">{item.description}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* STORY SECTION */}
        <section className="py-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 text-center">
            <h2 className="text-4xl md:text-5xl font-black text-slate-900">Our <span className="text-red-600">Story</span></h2>
            <div className="max-w-4xl mx-auto mt-8">
              <p className="text-lg text-slate-600 leading-relaxed font-medium px-4">
                HAKIRUSH began with a simple idea—to deliver effortless, professional sports experiences for corporate teams. We combine event management, digital storytelling, and scalable operations to serve both startups and enterprises.
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-16 px-4">
              {founding.map((item, index) => (
                <motion.div
                  key={item.title}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  className="p-8 bg-white/60 backdrop-blur-sm rounded-2xl shadow-lg border border-slate-100 hover:border-red-200 transition-colors text-left">
                  <div className="w-12 h-12 bg-red-100 rounded-xl flex items-center justify-center mb-6">
                    {item.icon}
                  </div>
                  <h4 className="font-bold text-xl text-slate-900 mb-3">{item.title}</h4>
                  <p className="text-slate-600 leading-relaxed">{item.description}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* TEAM SECTION - RESTORED FULLY */}
        <section className="relative py-32 bg-white overflow-hidden font-sans">
          <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-red-50/50 blur-[120px] rounded-full -translate-y-1/2 translate-x-1/4 pointer-events-none" />
          
          <div className="max-w-7xl mx-auto px-6 relative z-10">
            <div className="text-center mb-24">
              <motion.div 
                initial={{ opacity: 0, y: 15 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-slate-900 text-white mb-6 shadow-xl shadow-slate-200"
              >
                <Users className="w-3.5 h-3.5 text-red-500" />
                <span className="text-[10px] font-black uppercase tracking-[0.3em]">The Leadership</span>
              </motion.div>
              
              <motion.h2 
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="text-4xl md:text-5xl font-black text-slate-900 tracking-tight"
              >
                Meet The <span className="text-red-600">Dream Team</span>
              </motion.h2>
              <div className="w-24 h-2 bg-red-600 mx-auto mt-6 rounded-full" />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
              {team.map((member, index) => (
                <motion.div
                  key={member.name}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  className="group relative"
                >
                  <div className="relative h-full bg-slate-50 rounded-[3rem] p-3 transition-all duration-500 group-hover:bg-white group-hover:shadow-[0_40px_80px_-20px_rgba(0,0,0,0.15)] group-hover:-translate-y-3">
                    <div className="relative aspect-[4/5] rounded-[2.5rem] overflow-hidden mb-8 shadow-inner bg-slate-200">
                      <motion.img
                        src={member.image}
                        alt={member.name}
                        className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-700 group-hover:scale-105"
                      />
                      <div className="absolute inset-x-0 bottom-0 p-6 translate-y-full group-hover:translate-y-0 transition-transform duration-500 bg-gradient-to-t from-slate-900/90 to-transparent">
                        <Link 
                          to={member.linkedin}
                          className="flex items-center justify-between w-full px-6 py-3 bg-white rounded-xl text-slate-900 font-bold text-sm hover:bg-red-600 hover:text-white transition-colors"
                        >
                          Connect on LinkedIn
                          <Linkedin className="w-4 h-4" />
                        </Link>
                      </div>
                    </div>
                    <div className="px-6 pb-8 text-center">
                      <p className="text-red-600 font-black text-[10px] uppercase tracking-[0.2em] mb-2">
                        {member.role.split('-')[0]}
                      </p>
                      <h3 className="text-2xl font-black text-slate-900 italic uppercase leading-tight mb-1">
                        {member.name}
                      </h3>
                      <p className="text-slate-400 text-xs font-medium uppercase tracking-wider">
                        {member.role.split('-')[1] || "Executive"}
                      </p>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* PROCESS SECTION */}
        <section className="max-w-7xl mx-auto px-4 sm:px-6 py-20">
          <h2 className="text-4xl md:text-5xl font-black text-center mb-12 text-slate-900">How We <span className="text-red-600">Work</span></h2>
          <div className="space-y-6 max-w-4xl mx-auto px-4">
            {work.map((step) => (
              <motion.div
                key={step.id}
                initial={{ opacity: 0, x: -30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                className="flex items-start gap-6 p-6 bg-white/60 backdrop-blur-sm rounded-2xl border border-slate-100 hover:bg-white hover:border-red-200 transition-colors cursor-pointer"
              >
                <span className="text-4xl font-black text-red-600 opacity-20 italic">0{step.id}</span>
                <div>
                  <h4 className="text-xl font-bold mb-2 text-slate-900">{step.title}</h4>
                  <p className="text-slate-600 font-medium">{step.description}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
}