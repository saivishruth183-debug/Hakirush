import React, { useEffect, useRef } from "react";
import { motion, useMotionValue, useSpring, useTransform, useScroll } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { 
  Zap, Target, Eye, Crosshair, Lightbulb, Bolt, Trophy, Quote, MapPin, Clock, Users, 
  MoveRight, Linkedin, ExternalLink, ArrowRight, Star
} from "lucide-react";
import PageBackground from "../components/PageBackground";

import Krishna from "../assets/Team/krishna.png";
import Vishruth from "../assets/Team/vishruth.png";
import Arushi from "../assets/Team/arushi.png";
import Sharavanthi from "../assets/Team/sharvanthi.jpeg";
import Umesh from "../assets/Team/Umesh.jpeg";
import backgroundImage from "../assets/Hero/Backimage.png";

/* ------------------------------------------------------------------ */
/*  DESIGN SYSTEM — one accent pair, one signature device             */
/*                                                                      */
/*  Colors:  ACCENT (deep burgundy) + GOLD (highlight) — unchanged      */
/*  from your original, now applied consistently everywhere instead     */
/*  of ad hoc per section.                                              */
/*                                                                      */
/*  Signature element: a thin burgundy→gold hairline that sits along    */
/*  the top edge of every card on the page (mission, founding, process, */
/*  team badge). It's the one recurring visual motif that ties the      */
/*  page together — like a wax-seal ribbon running through the whole    */
/*  document.                                                           */
/*                                                                      */
/*  Type: pair font-serif (display, used with restraint on headings)    */
/*  with the body sans already in use. If you want to sharpen this      */
/*  further, swap in a proper display serif — e.g. Fraunces or Playfair */
/*  Display — via Google Fonts + tailwind.config.js fontFamily.display. */
/* ------------------------------------------------------------------ */
const ACCENT = "#8C1D2B"; // deep burgundy
const GOLD = "#D4AF37";   // highlight gold
const HAIRLINE = `linear-gradient(90deg, ${ACCENT}, ${GOLD}, ${ACCENT})`;

const ParallaxBackground = ({ image }) => {
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
      <div className="absolute inset-0 bg-gradient-to-b from-slate-950/75 via-slate-950/55 to-slate-950/80" />
      <div className="absolute inset-0 bg-slate-950/30 mix-blend-multiply" />
    </div>
  );
};
/* -------------------------- END BACKGROUND -------------------------- */

const mission = [
  { icon: <Target className="w-6 h-6" style={{ color: ACCENT }} />, title: "Mission", description: "To help organizations transform employee engagement into a continuous journey through professionally managed sports, team-building experiences, wellness initiatives and recognition programs that inspire collaboration, belonging and long-term workplace culture." },
  { icon: <Eye className="w-6 h-6" style={{ color: ACCENT }} />, title: "Vision", description: "To become India's most trusted Employee Engagement Ecosystem, helping organizations build stronger workplace cultures through sports, wellness, recognition and meaningful shared experiences." },
];

const founding = [
  { icon: <Crosshair className="w-5 h-5" style={{ color: ACCENT }} />, title: "Why we started", description: "To solve a real problem: disengaged teams, growing employee isolation after remote work, and HR teams stretched thin." },
  { icon: <Lightbulb className="w-5 h-5" style={{ color: ACCENT }} />, title: "What we learned", description: "Small, well-run events create outsized cultural impact — trust and collaboration increase far faster than through remote initiatives." },
  { icon: <Bolt className="w-5 h-5" style={{ color: ACCENT }} />, title: "How we operate", description: "End-to-end delivery: strategy, venue, ops, production, content & measurement." },
];

const team = [
  { image: Krishna, name: "Krishna", role: "Founder/CEO - Strategy & Growth", linkedin: "https://www.linkedin.com/in/sudireddy-krishna-sai-reddy-566087192" },
  { image: Arushi, name: "Arushi Shreya", role: "HR Manager", linkedin: "https://www.linkedin.com/in/arushi-shreya/" },
  { image: Sharavanthi, name: "Sharavanthi", role: "Digital Marketing", linkedin: "https://www.linkedin.com/in/d-sravanthi-21240a383" },
  { image: Umesh, name: "Umesh", role: "Operations Manager", linkedin: "https://www.linkedin.com/in/umesh-alla-8435a13a7" },
];

const work = [
  { id: 1, title: "Discovery", description: "We understand your people, culture and KPIs." },
  { id: 2, title: "Design", description: "Custom event plan, formats, schedules and branding options." },
  { id: 3, title: "Delivery", description: "Venue, logistics, referees, safety and on-ground ops." },
  { id: 4, title: "Content & Reach", description: "Photo, reels, streaming and social amplification." },
  { id: 5, title: "Measure & Scale", description: "Feedback, participation metrics and scaling plan for next cycles." },
];

const stats = [
  { label: "Cities", value: "14+" },
  { label: "Companies", value: "220+" },
  { label: "Employees engaged", value: "40K+" },
  { label: "Sports formats", value: "12+" },
];

const Kicker = ({ icon: Icon, children }) => (
  <motion.div
    initial={{ opacity: 0, y: 15 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true }}
    className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-slate-900 text-white mb-4 shadow-xl shadow-slate-200"
  >
    {Icon && <Icon className="w-3.5 h-3.5" style={{ color: GOLD }} />}
    <span className="text-[10px] font-black uppercase tracking-[0.3em]">{children}</span>
  </motion.div>
);

/* Shared card shell — carries the hairline signature so every card on
   the page reads as part of one system rather than one-off styling. */
const PremiumCard = ({ children, className = "" }) => (
  <div className={`relative bg-white rounded-2xl overflow-hidden ring-1 ring-slate-100 ${className}`}>
    <span className="absolute top-0 left-0 right-0 h-[3px]" style={{ background: HAIRLINE }} />
    {children}
  </div>
);

export default function About() {
  const navigate = useNavigate();
  const handleApplyClick = () => { navigate('/contact'); };

  return (
    <div className="relative overflow-hidden min-h-screen">
      <PageBackground />
      <ParallaxBackground image={backgroundImage} />

      <div className="relative z-10">

        {/* HERO SECTION */}
        <section className="relative pt-24 pb-14 md:pb-20">
          <div className="max-w-5xl mx-auto px-4 sm:px-6 text-center">
            <motion.div
              initial={{ opacity: 0, y: -30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, ease: "easeOut" }}
              className="space-y-7"
            >
              <div className="flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-4">
                <div
                  className="relative w-12 h-12 sm:w-14 sm:h-14 rounded-xl flex items-center justify-center shadow-lg ring-1 ring-black/5 overflow-hidden"
                  style={{ background: `linear-gradient(135deg, ${ACCENT}, #4a0d13)` }}
                >
                  <span className="absolute inset-x-0 top-0 h-1/2 bg-gradient-to-b from-white/25 to-transparent" />
                  <Zap className="relative w-6 h-6 sm:w-7 sm:h-7 text-white" />
                </div>
                <p className="text-[11px] font-bold uppercase tracking-[0.35em]" style={{ color: GOLD }}>
                  Employee Engagement, Elevated
                </p>
              </div>

              <h1 className="font-serif text-4xl sm:text-5xl md:text-6xl font-black text-white tracking-tight leading-[1.05]">
                About <span style={{ color: GOLD }}>HAKIRUSH</span>
              </h1>

              <div className="w-16 h-px mx-auto rounded-full" style={{ background: HAIRLINE }} />

              <p className="text-base sm:text-lg md:text-xl text-slate-300 max-w-3xl mx-auto leading-relaxed font-medium px-2">
                HAKIRUSH is an Employee Engagement Ecosystem designed to help organizations build stronger workplace cultures through professionally managed sports, team-building experiences, wellness initiatives and year-round engagement programs.
              </p>
            </motion.div>

            {/* Stat bar — one dark glass strip with hairline dividers, not four floating boxes */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
              className="mt-12 max-w-3xl mx-auto rounded-2xl bg-slate-950/50 backdrop-blur-md ring-1 ring-white/10 shadow-2xl overflow-hidden"
            >
              <div className="grid grid-cols-2 sm:grid-cols-4 divide-x divide-y sm:divide-y-0 divide-white/10">
                {stats.map((s) => (
                  <div key={s.label} className="px-3 py-5 text-center">
                    <p className="font-serif text-xl sm:text-2xl font-black" style={{ color: GOLD }}>{s.value}</p>
                    <p className="text-[9px] sm:text-[10px] font-bold uppercase tracking-[0.15em] text-slate-400 mt-1.5">{s.label}</p>
                  </div>
                ))}
              </div>
            </motion.div>
          </div>
        </section>

        {/* TEAM SECTION — premium employee ID badge cards */}
        <section className="relative py-16 md:py-24 bg-transparent overflow-hidden font-sans">
          <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-red-50/10 blur-[120px] rounded-full -translate-y-1/2 translate-x-1/4 pointer-events-none" />
          
          <div className="max-w-6xl mx-auto px-4 sm:px-6 relative z-10">
            <div className="text-center mb-12 md:mb-16">
              <Kicker icon={Users}>The Leadership</Kicker>
              
              <motion.h2 
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="font-serif text-4xl md:text-5xl font-black text-white tracking-tight"
              >
                Meet The <span style={{ color: GOLD }}>Dream Team</span>
              </motion.h2>
              <div className="w-14 h-1.5 mx-auto mt-4 rounded-full" style={{ background: GOLD }} />
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-5 max-w-5xl mx-auto">
              {team.map((member, index) => (
                <motion.div
                  key={member.name}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }} 
                  transition={{ delay: index * 0.08 }}
                  className="group relative"
                >
                  {/* Gold hairline glow that appears on hover */}
                  <div
                    className="absolute -inset-px rounded-xl sm:rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
                    style={{ background: `linear-gradient(180deg, ${GOLD}00, ${GOLD}99, ${GOLD}00)` }}
                  />

                  <div className="relative h-full bg-gradient-to-b from-slate-900 to-slate-950 rounded-xl sm:rounded-2xl overflow-hidden ring-1 ring-white/10 shadow-[0_8px_30px_-12px_rgba(0,0,0,0.5)] transition-all duration-500 group-hover:shadow-[0_20px_50px_-15px_rgba(0,0,0,0.6)] group-hover:-translate-y-2">

                    {/* Signature hairline — same device as every other card on the page */}
                    <span className="absolute top-0 left-0 right-0 h-[3px] z-10" style={{ background: HAIRLINE }} />

                    {/* Badge lanyard hole */}
                    <div className="flex justify-center pt-2 sm:pt-2.5">
                      <div className="w-4 h-1.5 sm:w-5 sm:h-2 rounded-full bg-slate-950 ring-1 ring-white/15" />
                    </div>

                    {/* Header strip — wordmark + badge label */}
                    <div className="flex items-center justify-between px-2 sm:px-3 pt-1.5 sm:pt-2 pb-1">
                      <span className="text-[6px] sm:text-[8px] font-black tracking-[0.2em] text-white/70 uppercase">Hakirush</span>
                      <span className="text-[6px] sm:text-[8px] font-bold tracking-[0.15em] uppercase" style={{ color: GOLD }}>Staff</span>
                    </div>

                    <div className="px-1.5 sm:px-2">
                      <div className="relative aspect-square rounded-lg sm:rounded-xl overflow-hidden bg-slate-800" style={{ boxShadow: `inset 0 0 0 1px ${GOLD}4D` }}>
                        <motion.img
                          src={member.image}
                          alt={member.name}
                          className="w-full h-full object-cover grayscale-[40%] group-hover:grayscale-0 transition-all duration-700 group-hover:scale-[1.08]"
                        />
                        <div className="absolute inset-x-0 bottom-0 h-1/2 bg-gradient-to-t from-slate-950/90 via-slate-950/10 to-transparent" />

                        {/* Thin gold corner accent */}
                        <div className="absolute top-1.5 left-1.5 sm:top-2 sm:left-2 w-3 h-3 sm:w-4 sm:h-4 border-t border-l opacity-0 group-hover:opacity-100 transition-opacity duration-500" style={{ borderColor: GOLD }} />
                        <div className="absolute bottom-1.5 right-1.5 sm:bottom-2 sm:right-2 w-3 h-3 sm:w-4 sm:h-4 border-b border-r opacity-0 group-hover:opacity-100 transition-opacity duration-500" style={{ borderColor: GOLD }} />

                        {/*
                          LinkedIn button: visible by default on mobile (no hover state on
                          touch), reverts to the hover-reveal animation from `sm:` up.
                        */}
                        <div className="absolute inset-x-0 bottom-0 p-1.5 sm:p-2 translate-y-0 sm:translate-y-full sm:group-hover:translate-y-0 transition-transform duration-400 ease-out">
                          <a
                            href={member.linkedin.trim()}
                            target="_blank" 
                            rel="noopener noreferrer"
                            onClick={(e) => e.stopPropagation()}
                            className="flex items-center justify-center gap-1 w-full py-1 sm:py-1.5 rounded-md font-bold text-[8px] sm:text-[11px] uppercase tracking-wider transition-all duration-200 hover:brightness-110 active:scale-95 cursor-pointer"
                            style={{ background: GOLD, color: "#0f172a" }}
                          >
                            <span>LinkedIn</span>
                            <Linkedin className="w-2.5 h-2.5 fill-current" />
                          </a>
                        </div>
                      </div>
                    </div>

                    {/* Name block */}
                    <div className="px-2 sm:px-3 pt-2.5 sm:pt-3.5 pb-1 text-center">
                      <p className="font-bold text-[7px] sm:text-[9px] uppercase tracking-[0.2em] mb-1 sm:mb-1.5" style={{ color: GOLD }}>
                        {member.role.split('-')[0]}
                      </p>
                      <h3 className="font-serif text-sm sm:text-lg font-bold text-red-500 leading-snug mb-1 sm:mb-1.5 truncate tracking-widest">
                        {member.name}
                      </h3>
                      <p className="text-slate-300 text-[8px] sm:text-[11px] font-medium uppercase tracking-wide line-clamp-1">
                        {member.role.split('-')[1] || "Executive"}
                      </p>
                    </div>

                    {/* ID footer strip — barcode + employee number */}
                    <div className="mt-2 sm:mt-2.5 px-1.5 sm:px-2 pb-1.5 sm:pb-2 flex items-center justify-between gap-1 border-t border-white/10 pt-1.5 sm:pt-2">
                      <div className="flex items-end gap-[1.5px] sm:gap-[2px] h-2.5 sm:h-3">
                        {[3,1,2,1,3,2,1,2,1,3,1,2].map((h, i) => (
                          <span
                            key={i}
                            className="w-[1.5px] sm:w-[2px] bg-white/25"
                            style={{ height: `${h * 25}%` }}
                          />
                        ))}
                      </div>
                      <span className="text-[6px] sm:text-[8px] font-mono text-white/30 tracking-wider">
                        HKR-{String(index + 1).padStart(3, '0')}
                      </span>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* MISSION & VISION */}
        <section className="py-14 md:py-20">
          <div className="max-w-7xl mx-auto px-4 sm:px-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8 max-w-5xl mx-auto">
              {mission.map((item, index) => (
                <motion.div
                  key={item.title}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                >
                  <PremiumCard className="group p-8 sm:p-10 shadow-[0_10px_40px_-15px_rgba(15,23,42,0.35)] hover:shadow-[0_25px_60px_-15px_rgba(15,23,42,0.45)] transition-all duration-500 hover:-translate-y-1">
                    <Quote className="absolute top-7 right-7 w-10 h-10 text-slate-100" strokeWidth={1.5} />
                    <div className="flex items-center gap-5 mb-6">
                      <div
                        className="w-14 h-14 rounded-full flex items-center justify-center shrink-0 ring-1 ring-slate-100 group-hover:scale-105 transition-transform"
                        style={{ background: `radial-gradient(circle at 30% 30%, ${ACCENT}14, ${ACCENT}05)` }}
                      >
                        {item.icon}
                      </div>
                      <h3 className="font-serif text-2xl sm:text-3xl font-bold text-slate-900">
                        Our <span style={{ color: ACCENT }}>{item.title}</span>
                      </h3>
                    </div>
                    <p className="text-slate-600 leading-relaxed text-base sm:text-lg">{item.description}</p>
                  </PremiumCard>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* STORY SECTION */}
        <section className="py-16 md:py-24 relative">
          <div className="max-w-6xl mx-auto px-4 sm:px-6">
            <div className="text-center mb-4">
              <Kicker icon={Star}>Our Story</Kicker>
            </div>
            <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl font-black text-white text-center">
              How It All <span style={{ color: GOLD }}>Began</span>
            </h2>

            {/* Editorial pull-quote — vertical rule instead of plain centered italic */}
            <div className="max-w-2xl mx-auto mt-10 flex gap-5 items-start">
              <span className="hidden sm:block w-px self-stretch shrink-0 mt-1" style={{ background: HAIRLINE }} />
              <div>
                <Quote className="w-8 h-8 mb-3" style={{ color: GOLD, opacity: 0.7 }} />
                <p className="text-lg sm:text-xl text-slate-200 leading-relaxed font-medium">
                  HAKIRUSH began with a simple idea—to deliver effortless, professional sports experiences for corporate teams. We combine event management, digital storytelling, and scalable operations to serve both startups and enterprises.
                </p>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-5 sm:gap-6 mt-14">
              {founding.map((item, index) => (
                <motion.div
                  key={item.title}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                >
                  <PremiumCard className="relative p-7 sm:p-8 shadow-[0_8px_30px_-15px_rgba(15,23,42,0.3)] hover:shadow-[0_20px_45px_-15px_rgba(15,23,42,0.4)] transition-all duration-400 text-left h-full">
                    <span className="absolute top-5 right-6 font-serif text-3xl font-black text-slate-100 select-none">0{index + 1}</span>
                    <div className="w-11 h-11 rounded-xl flex items-center justify-center mb-5 ring-1 ring-slate-100" style={{ background: "#8C1D2B0D" }}>
                      {item.icon}
                    </div>
                    <h4 className="font-serif font-bold text-lg sm:text-xl text-slate-900 mb-2.5">{item.title}</h4>
                    <p className="text-slate-600 leading-relaxed text-sm sm:text-base">{item.description}</p>
                  </PremiumCard>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* PROCESS SECTION — refined vertical timeline */}
        <section className="max-w-5xl mx-auto px-4 sm:px-6 py-16 md:py-24">
          <div className="text-center mb-4">
            <Kicker icon={Bolt}>The Process</Kicker>
          </div>
          <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl font-black text-center mb-14 text-white">
            How We <span style={{ color: GOLD }}>Work</span>
          </h2>

          <div className="relative">
            <div
              className="absolute left-[27px] sm:left-9 top-2 bottom-2 w-px hidden sm:block"
              style={{ background: `linear-gradient(180deg, ${ACCENT}, ${GOLD}, transparent)` }}
            />

            <div className="space-y-4 sm:space-y-5">
              {work.map((step, i) => (
                <motion.div
                  key={step.id}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.06 }}
                >
                  <PremiumCard className="relative flex items-start gap-5 sm:gap-6 p-5 sm:p-6 shadow-[0_6px_24px_-14px_rgba(15,23,42,0.3)] hover:shadow-[0_16px_36px_-14px_rgba(15,23,42,0.4)] hover:ring-[#8C1D2B]/20 transition-all duration-300">
                    <div
                      className="relative z-10 shrink-0 w-11 h-11 sm:w-14 sm:h-14 rounded-xl flex items-center justify-center font-serif font-black text-white text-base sm:text-lg shadow-md overflow-hidden"
                      style={{ background: `linear-gradient(135deg, ${ACCENT}, #4a0d13)` }}
                    >
                      <span className="absolute inset-x-0 top-0 h-1/2 bg-gradient-to-b from-white/25 to-transparent" />
                      <span className="relative">0{step.id}</span>
                    </div>
                    <div className="pt-1">
                      <h4 className="text-lg sm:text-xl font-bold mb-1.5 text-slate-900">{step.title}</h4>
                      <p className="text-slate-600 font-medium text-sm sm:text-base">{step.description}</p>
                    </div>
                  </PremiumCard>
                </motion.div>
              ))}
            </div>
          </div>

          <motion.div
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mt-12"
          >
            <button
              onClick={handleApplyClick}
              className="group inline-flex items-center gap-2 px-7 py-3.5 rounded-full text-white font-bold text-sm shadow-lg hover:shadow-xl hover:-translate-y-0.5 transition-all duration-300"
              style={{ background: `linear-gradient(135deg, ${ACCENT}, #4a0d13)` }}
            >
              Start a Conversation
              <ArrowRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" />
            </button>
          </motion.div>
        </section>
      </div>
    </div>
  );
}