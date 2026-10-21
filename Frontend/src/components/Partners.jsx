import React from "react";
import { motion } from "framer-motion";
import {
  MapPin, Clock, MoveRight, Trophy, Zap, Timer, Award,
  Target, Activity, Flag, CircleDot, Swords, Handshake, Bike, Dumbbell,
  Newspaper, Briefcase,
} from "lucide-react";

const FONT_MONO = "'JetBrains Mono', 'IBM Plex Mono', monospace";

const careers = [
  { code: "01", title: "Event Coordinator", location: "Bengaluru", type: "Full-time" },
  { code: "02", title: "Content Producer", location: "Hyderabad", type: "Contract" },
  { code: "03", title: "Sales & Partnerships", location: "Remote", type: "Full-time" },
];


// ── Scrolling Icon Belt ──────────────────────────────────────────────────────
const Belt = ({ icons, directionX, speed, opacity }) => (
  <motion.div
    className="flex gap-20 whitespace-nowrap"
    animate={{ x: directionX }}
    transition={{ duration: speed, repeat: Infinity, ease: "linear" }}
    style={{ opacity }}
  >
    {[...icons, ...icons, ...icons].map((Icon, i) => (
      <div key={i} className="flex items-center gap-40">
        <Icon size={60} className="text-slate-950" />
      </div>
    ))}
  </motion.div>
);

const ContinuousSportsBackground = () => {
  const row1 = [Handshake, Bike, Dumbbell, Zap, Timer, Trophy, Award];
  const row2 = [Target, CircleDot, Swords, Timer, Activity, Flag, Trophy];

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {/* Scoreboard dot-grid, matched to Sponsorship.jsx */}
      <div
        className="absolute inset-0"
        style={{
          backgroundImage: "radial-gradient(rgba(10,10,10,0.05) 1px, transparent 1px)",
          backgroundSize: "22px 22px",
          maskImage: "radial-gradient(ellipse 60% 50% at 50% 20%, black, transparent)",
        }}
      />

      <div className="absolute top-[15%]    left-0 w-full"><Belt icons={row1} directionX={[0, -1500]}  speed={50} opacity={0.035} /></div>
      <div className="absolute top-[35%]    left-0 w-full"><Belt icons={row1} directionX={[0,  1500]}  speed={55} opacity={0.025} /></div>
      <div className="absolute bottom-[37%] left-0 w-full"><Belt icons={row2} directionX={[1500, 0]}   speed={70} opacity={0.025} /></div>
      <div className="absolute bottom-[10%] left-0 w-full"><Belt icons={row2} directionX={[-1500, 0]}  speed={65} opacity={0.02}/></div>

      <div className="absolute top-0    right-0 w-[500px] h-[500px] bg-red-50/40   blur-[120px] rounded-full" />
      <div className="absolute bottom-0 left-0  w-[600px] h-[600px] bg-slate-50/60 blur-[100px] rounded-full" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[400px] h-[400px] bg-[#B8923D]/[0.04] blur-[140px] rounded-full" />
    </div>
  );
};

// ── Section eyebrow (matched to Sponsorship.jsx badge pattern) ─────────────
const Eyebrow = ({ icon: Icon, children, accent = "#C21807", dark = false }) => (
  <div
    className={`mb-6 inline-flex items-center gap-2.5 rounded-full border px-4 py-1.5 ${
      dark ? "border-white/10 bg-white/[0.06]" : "border-slate-200 bg-white shadow-sm"
    }`}
  >
    <Icon size={14} style={{ color: accent }} />
    <span
      className={`text-[9px] font-semibold uppercase tracking-[0.38em] ${dark ? "text-slate-400" : "text-slate-500"}`}
      style={{ fontFamily: FONT_MONO }}
    >
      {children}
    </span>
  </div>
);

// ── Career Card ──────────────────────────────────────────────────────────────
const CareerCard = ({ job, index, onApply }) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true }}
    transition={{ delay: index * 0.1, duration: 0.6, ease: [0.4, 0, 0.2, 1] }}
    whileHover={{ y: -4 }}
    className="group relative overflow-hidden rounded-3xl border border-white/10 bg-white/[0.04] p-8 backdrop-blur-md transition-colors duration-500 hover:border-[#C21807]/40 hover:bg-white/[0.07]"
  >
    <div className="absolute inset-x-8 top-0 h-[1px] scale-x-0 bg-gradient-to-r from-transparent via-[#C21807] to-transparent transition-transform duration-500 group-hover:scale-x-100" />

    {/* Roster number + role icon */}
    <div className="mb-6 flex items-center justify-between">
      <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-br from-[#C21807] to-[#8F1204] shadow-lg transition-transform duration-500 group-hover:scale-105 group-hover:-rotate-3">
        <Briefcase size={18} className="text-white" strokeWidth={1.75} />
      </div>
      <span
        className="text-2xl tabular-nums text-white/15 transition-colors duration-500 group-hover:text-[#C21807]/40"
      >
        {job.code}
      </span>
    </div>

    <h4
      className="mb-6 text-2xl uppercase tracking-tight text-white transition-colors group-hover:text-[#E2634F]"
    >
      {job.title}
    </h4>

    <div className="mb-8 space-y-3.5">
      <div className="flex items-center gap-3 text-sm font-light text-slate-300">
        <MapPin className="h-4 w-4 text-[#C21807]" strokeWidth={1.75} /> {job.location}
      </div>
      <div className="flex items-center gap-3 text-sm font-light text-slate-300">
        <Clock className="h-4 w-4 text-[#C21807]" strokeWidth={1.75} /> {job.type}
      </div>
    </div>

    <button
      onClick={onApply}
      className="flex w-full cursor-pointer items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-[#C21807] to-[#8F1204] py-4 text-[11px] font-semibold uppercase tracking-[0.2em] text-white shadow-lg shadow-red-900/20 transition-all duration-300 hover:shadow-red-900/40 active:scale-95"
    >
      Apply Now
      <MoveRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
    </button>
  </motion.div>
);

const Partners = () => (
  <section className="relative overflow-hidden bg-white px-6 py-20 sm:py-24">
    <ContinuousSportsBackground />
    <div className="relative z-10 mx-auto max-w-7xl">
      <div className="mb-10 text-center">
        <Eyebrow icon={Newspaper}>Careers at Hakirush</Eyebrow>
      </div>
      <div className="grid gap-5 lg:grid-cols-3">
        {careers.map((job, index) => (
          <CareerCard key={job.code} job={job} index={index} />
        ))}
      </div>
    </div>
  </section>
);

export default Partners;