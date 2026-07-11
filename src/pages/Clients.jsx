import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { AnimatePresence, motion } from "framer-motion";
import { 
  Star, Users, Building, Award, TrendingUp, Quote, MessageCircle,
  Trophy, Activity, Target, CircleDot, Dumbbell, Flag, Zap 
} from "lucide-react";
import backgroundVideo from "../assets/Hero/About.mp4";

// Client Assets
import Client1 from "../assets/Clients/Vessella.png";
import Client2 from "../assets/Clients/Goldsikka.png";
import Client3 from "../assets/Clients/Simplify.png";
import Client4 from "../assets/Clients/SVLA.png";

// Asset Imports
import Amit from "../assets/Terminals/Amit.png";
import Priya from "../assets//Terminals/Priya.png";
import Rajesh from "../assets/Terminals/Rajesh.png";
import Sarah from "../assets/Terminals/Sarah.png";

const MotionLink = motion(Link);

// --- BACKGROUND SUB-COMPONENT ---
const ContinuousSportsBackground = () => {
  const row1 = [Trophy, Activity, Target, CircleDot, Star, Dumbbell];
  const row2 = [Flag, Zap, Trophy, Activity, Target, Star];

  return (
    <div className="fixed inset-0 overflow-hidden pointer-events-none z-0">
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

      <div className="absolute inset-0 pointer-events-none" style={{
        background: "radial-gradient(circle at center, transparent 0%, rgba(255,255,255,0.2) 60%, rgba(255,255,255,0.7) 100%)"
      }} />
    </div>
  )
}

// --- DATA ARRAYS ---
const sponsers = [
  { id: 1, href: "/sponsors/sponsor1", name: "Sponser 1", logo: "https://placehold.co/150x80/e5e7eb/6b7280?text=Sponsor+1" },
  { id: 2, href: "/sponsors/sponsor2", name: "Sponser 2", logo: "https://placehold.co/150x80/e5e7eb/6b7280?text=Sponsor+2" },
  { id: 3, href: "/sponsors/sponsor3", name: "Sponser 3", logo: "https://placehold.co/150x80/e5e7eb/6b7280?text=Sponsor+3" },
  { id: 4, href: "/sponsors/sponsor4", name: "Sponser 4", logo: "https://placehold.co/150x80/e5e7eb/6b7280?text=Sponsor+4" },
  { id: 5, href: "/sponsors/sponsor5", name: "Sponser 5", logo: "https://placehold.co/150x80/e5e7eb/6b7280?text=Sponsor+5" },
];

const clients = [
  { id: 1, href: "https://vessella.com", name: "Client 1", logo: Client1 },
  { id: 2, href: "https://goldsikka.com", name: "Client 2", logo: Client2 },
  { id: 3, href: "https://simplifyhome.in", name: "Client 3", logo: Client3 },
  { id: 4, href: "https://thesvla.com", name: "Client 4", logo: Client4 },
];

const testimonials = [
  {
    person: "Rajesh Kumar",
    position: "HR Director",
    message: "HAKIRUSH has revolutionized our employee engagement. The biweekly tournaments have created a buzz in the office that we never had before. Team morale is at an all-time high!",
    avatar: Rajesh,
    rating: 5,
  },
  {
    person: "Priya Sharma",
    position: "CEO",
    message: "The professional organization and competitive spirit that HAKIRUSH brings has made our company culture more vibrant. Our employees look forward to every tournament!",
    avatar: Priya,
    rating: 5,
  },
  {
    person: "Amit Patel",
    position: "Operations Manager",
    message: "Outstanding service delivery! Every tournament is executed flawlessly. The branded kits, professional coverage, and seamless coordination exceed our expectations.",
    avatar: Amit,
    rating: 5,
  },
  {
    person: "Sarah Johnson",
    position: "Head of People Operations",
    message: "HAKIRUSH has transformed how our teams collaborate. The inter-department competitions have broken down silos and created lasting friendships across our organization.",
    avatar: Sarah,
    rating: 5,
  },
];

export default function Clients() {
  const [currentTestimonial, setCurrentTestimonial] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTestimonial((prev) => (prev + 1) % testimonials.length);
    }, 10000);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="relative overflow-hidden min-h-screen">
      
      {/* BACKGROUND ELEMENTS */}
      <ContinuousSportsBackground />
      
      {/* Video Background */}
      <div className="fixed inset-0 -z-10 overflow-hidden">
        <video
          src={backgroundVideo}
          autoPlay
          muted
          loop
          playsInline
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-slate-950/40 mix-blend-multiply" />
      </div>

      <div className="relative z-10">
        {/* HERO SECTION */}
        <section className="relative pt-20 pb-8">
          <div className="max-w-7xl mx-auto px-6 text-center">
            <motion.div
              initial={{ opacity: 0, y: -40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
            >
              <div className="flex items-center justify-center gap-4 mb-6">
                <div className="inline-flex items-center justify-center w-16 h-16 rounded-3xl bg-red-600 shadow-2xl shrink-0">
                  <Users className="w-6 h-6 text-white" />
                </div>
                <h1 className="text-3xl sm:text-4xl md:text-5xl font-black text-white tracking-tight">
                  Our <span className="text-red-500">Clients</span>
                </h1>
              </div>
              <p className="text-sm sm:text-base md:text-lg text-slate-300 max-w-3xl mx-auto font-medium">
                Trusted by leading companies to deliver exceptional corporate sports experiences 
                and build vibrant workplace cultures.
              </p>
            </motion.div>
          </div>
        </section>

        {/* STATS SECTION */}
        <section className="py-12">
          <div className="max-w-7xl mx-auto px-6">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-center mb-12"
            >
              <div className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-slate-900/80 border border-slate-700 shadow-lg backdrop-blur-sm mb-6">
                <TrendingUp className="w-4 h-4 text-red-500" />
                <span className="text-sm font-bold text-slate-200">Our Impact</span>
              </div>
              <h2 className="text-2xl sm:text-3xl md:text-4xl font-black text-white">
                By The <span className="text-red-500">Numbers</span>
              </h2>
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {[
                { icon: <Building className="h-6 w-6 text-red-700" />, label: "Companies Trust Us", value: "50+" },
                { icon: <Users className="h-6 w-6 text-red-700" />, label: "Employees Engaged", value: "10K+" },
                { icon: <Award className="h-6 w-6 text-red-700" />, label: "Events Delivered", value: "500+" },
              ].map((stat, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 40 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  whileHover={{ y: -12, scale: 1.02 }}
                  viewport={{ once: true }}
                  className="group relative text-center bg-slate-800/90 backdrop-blur-md p-10 rounded-3xl shadow-xl border border-slate-700 transition-all duration-500"
                >
                  <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-red-600/20 mb-6 shadow-lg group-hover:scale-110 transition-transform">
                    {stat.icon}
                  </div>
                  <h3 className="text-2xl sm:text-4xl font-extrabold text-white mb-3 group-hover:text-red-400 transition-colors">{stat.value}</h3>
                  <p className="text-slate-300 font-medium">{stat.label}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* LOGO SECTIONS */}
        {[
          { data: sponsers, label: "Our Sponsors", icon: <Building className="w-4 h-4" /> },
          { data: clients, label: "Our Partners", icon: <Users className="w-4 h-4" /> }
        ].map((section, idx) => (
          <section key={idx} className="py-12 overflow-hidden">
            <div className="text-center mb-8 px-6">
              <div className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-slate-900/80 border border-slate-700 shadow-md">
                <span className="text-red-500">{section.icon}</span>
                <span className="text-sm font-bold text-slate-200">{section.label}</span>
              </div>
            </div>
            
            <div className="relative flex overflow-hidden w-full py-6">
              <motion.div
                className="flex items-center gap-10 whitespace-nowrap"
                animate={{ x: ["0%", "-50%"] }}
                transition={{ duration: 30, repeat: Infinity, ease: "linear" }}
              >
                {[...section.data, ...section.data].map((item, index) => (
                  item.href.startsWith("/") ? (
                    <MotionLink
                      key={index}
                      to={item.href}
                      whileHover={{ y: -5 }}
                      className="bg-slate-800/90 backdrop-blur-sm p-8 rounded-2xl shadow-lg border border-slate-700 cursor-pointer transition-all"
                      aria-label={`Open ${item.name}`}
                    >
                      <img
                        src={item.logo}
                        alt={item.name}
                        className="h-12 w-32 object-contain grayscale hover:grayscale-0 transition-all duration-500"
                      />
                    </MotionLink>
                  ) : (
                    <motion.a
                      key={index}
                      href={item.href}
                      target="_blank"
                      rel="noreferrer"
                      whileHover={{ y: -5 }}
                      className="bg-slate-800/90 backdrop-blur-sm p-8 rounded-2xl shadow-lg border border-slate-700 cursor-pointer transition-all"
                      aria-label={`Open ${item.name}`}
                    >
                      <img
                        src={item.logo}
                        alt={item.name}
                        className="h-12 w-32 object-contain grayscale hover:grayscale-0 transition-all duration-500"
                      />
                    </motion.a>
                  )
                ))}
              </motion.div>
            </div>
          </section>
        ))}

        {/* TESTIMONIALS SECTION */}
        <section className="py-20">
          <div className="max-w-5xl mx-auto px-6">
            <div className="text-center mb-16">
              <div className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-slate-900/80 border border-slate-700 shadow-lg mb-6">
                <MessageCircle className="w-4 h-4 text-red-500" />
                <span className="text-sm font-bold text-slate-200">Success Stories</span>
              </div>
              <h2 className="text-3xl md:text-4xl font-black text-white tracking-tight">
                What Our <span className="text-red-500">Clients Say</span>
              </h2>
            </div>

            <AnimatePresence mode="wait">
              <motion.div
                key={currentTestimonial}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.5 }}
                className="bg-slate-800/90 backdrop-blur-lg rounded-[3rem] shadow-2xl p-8 md:p-16 border border-slate-700 relative overflow-hidden"
              >
                <Quote className="absolute top-8 right-8 w-12 h-12 text-red-500/10" />
                
                <div className="flex flex-col md:flex-row items-center gap-8 mb-8">
                  <img 
                    src={testimonials[currentTestimonial].avatar} 
                    className="w-24 h-24 rounded-2xl object-cover border-4 border-red-900/30 shadow-xl" 
                    alt={testimonials[currentTestimonial].person} 
                  />
                  <div className="text-center md:text-left">
                    <h3 className="text-2xl font-bold text-white">{testimonials[currentTestimonial].person}</h3>
                    <p className="text-red-400 font-semibold">{testimonials[currentTestimonial].position}</p>
                    <div className="flex gap-1 mt-2 justify-center md:justify-start">
                      {[...Array(testimonials[currentTestimonial].rating)].map((_, i) => (
                        <Star key={i} className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                      ))}
                    </div>
                  </div>
                </div>

                <blockquote className="text-lg md:text-xl text-slate-200 leading-relaxed italic border-l-4 border-red-500 pl-6">
                  "{testimonials[currentTestimonial].message}"
                </blockquote>
              </motion.div>
            </AnimatePresence>
          </div>
        </section>
      </div>
    </div>
  );
}