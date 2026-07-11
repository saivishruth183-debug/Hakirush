import React from "react";
import { motion } from "framer-motion";
import {
  MapPin, Clock, MoveRight, Trophy, Zap, Timer, Award,
  Target, Activity, Flag, CircleDot, Swords, Handshake, Bike, Dumbbell,
  Newspaper, Briefcase,
} from "lucide-react";

// ── Design tokens (matched to Sponsorship.jsx) ─────────────────────────────
// Ink #0A0A0A · Paper (transparent) · Crimson #C21807 · Crimson-D #8F1204
// Brass #B8923D — reserved for premium/editorial touches

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
      {/* Belts */}
      <div className="absolute top-[15%]    left-0 w-full"><Belt icons={row1} directionX={[0, -1500]}  speed={50} opacity={0.035} /></div>
      <div className="absolute top-[35%]    left-0 w-full"><Belt icons={row1} directionX={[0,  1500]}  speed={55} opacity={0.025} /></div>
      <div className="absolute bottom-[37%] left-0 w-full"><Belt icons={row2} directionX={[1500, 0]}   speed={70} opacity={0.025} /></div>
      <div className="absolute bottom-[10%] left-0 w-full"><Belt icons={row2} directionX={[-1500, 0]}  speed={65} opacity={0.02}/></div>

      {/* Ambient glows */}
      <div className="absolute top-0    right-0 w-[500px] h-[500px] bg-red-50/40   blur-[120px] rounded-full" />
      <div className="absolute bottom-0 left-0  w-[600px] h-[600px] bg-slate-50/60 blur-[100px] rounded-full" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[400px] h-[400px] bg-[#B8923D]/[0.04] blur-[140px] rounded-full" />
    </div>
  );
};

// ── Fine grain texture (matched to Sponsorship.jsx dark panel) ─────────────
const GRAIN_BG =
  "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='120' height='120'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='2' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)' opacity='0.4'/%3E%3C/svg%3E\")";

// ── Data ─────────────────────────────────────────────────────────────────────
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

// ── Section eyebrow (matched to Sponsorship.jsx badge pattern) ─────────────
const Eyebrow = ({ icon: Icon, children, accent = "#C21807" }) => (
  <div className="mb-6 inline-flex items-center gap-2.5 rounded-full border border-slate-200 bg-white px-4 py-1.5 shadow-sm">
    <Icon size={14} style={{ color: accent }} />
    <span className="text-[9px] font-black uppercase tracking-[0.38em] text-slate-500">
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

    <div className="mb-6 flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-br from-[#C21807] to-[#8F1204] shadow-lg transition-transform duration-500 group-hover:scale-105 group-hover:-rotate-3">
      <Briefcase size={18} className="text-white" strokeWidth={1.75} />
    </div>

    <h4 className="mb-6 text-2xl font-black italic tracking-tight text-white transition-colors group-hover:text-[#E2634F]">
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
      className="flex w-full cursor-pointer items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-[#C21807] to-[#8F1204] py-4 text-[11px] font-black uppercase tracking-[0.2em] text-white shadow-lg shadow-red-900/20 transition-all duration-300 hover:shadow-red-900/40 active:scale-95"
    >
      Apply Now
      <MoveRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
    </button>
  </motion.div>
);

// ── Main Component ───────────────────────────────────────────────────────────
const Partners = () => {
  const handleApplyClick = () => {
    window.location.href = "mailto:careers@hakirush.com?subject=Job Application";
  };

  return (
    <div className="relative min-h-screen overflow-hidden bg-transparent">
      <ContinuousSportsBackground />

      <div className="relative z-10">
        {/* ── PARTNERS SECTION ── */}
        <section className="overflow-hidden py-20">
          <div className="mx-auto mb-14 max-w-7xl px-4 text-center sm:px-6">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="flex flex-col items-center"
            >
              <Eyebrow icon={Newspaper} accent="#B8923D">In The Media</Eyebrow>
              <h2 className="text-4xl font-black uppercase italic leading-[0.9] tracking-[-0.04em] text-slate-950 md:text-5xl">
                Partners & <span className="not-italic text-[#C21807]">Press.</span>
              </h2>
            </motion.div>
          </div>

          {/* Marquee with edge fade for a cleaner, premium infinite-scroll feel */}
          <div
            className="flex overflow-hidden"
            style={{
              WebkitMaskImage: "linear-gradient(90deg, transparent, black 8%, black 92%, transparent)",
              maskImage: "linear-gradient(90deg, transparent, black 8%, black 92%, transparent)",
            }}
          >
            <motion.div
              className="flex gap-8 whitespace-nowrap"
              animate={{ x: ["0%", "-50%"] }}
              transition={{ duration: 30, repeat: Infinity, ease: "linear" }}
            >
              {[...partners, ...partners].map((partner, index) => (
                <div
                  key={index}
                  className="group shrink-0 rounded-2xl border border-slate-100 bg-white/80 px-8 py-6 shadow-sm backdrop-blur-sm transition-all duration-300 hover:border-[#B8923D]/40 hover:shadow-lg"
                >
                  <img
                    src={partner.img}
                    alt="Partner"
                    className="h-12 w-auto opacity-60 grayscale transition-all group-hover:opacity-100 group-hover:grayscale-0"
                  />
                </div>
              ))}
            </motion.div>
          </div>
        </section>

        {/* ── CAREERS SECTION ── */}
        <section className="relative mx-4 mb-20 overflow-hidden rounded-[3rem] bg-[#0A0A0A] py-24 shadow-2xl sm:mx-8">
          {/* Grain */}
          <div
            className="pointer-events-none absolute inset-0 opacity-[0.12] mix-blend-overlay"
            style={{ backgroundImage: GRAIN_BG }}
          />
          {/* Glow */}
          <div className="pointer-events-none absolute right-[-10%] top-[-20%] h-96 w-96 rounded-full bg-[#C21807]/[0.15] blur-[100px]" />

          <div className="relative z-10 mx-auto max-w-7xl px-6">
            <div className="mb-16 text-center">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="flex flex-col items-center"
              >
                <div className="mb-6 inline-flex items-center gap-2.5 rounded-full border border-white/10 bg-white/[0.06] px-4 py-1.5">
                  <Award size={14} className="text-[#E2634F]" />
                  <span className="text-[9px] font-black uppercase tracking-[0.38em] text-slate-400">
                    We're Hiring
                  </span>
                </div>
                <h2 className="mb-5 text-4xl font-black uppercase italic leading-[0.9] tracking-[-0.04em] text-white md:text-5xl">
                  Join The <span className="not-italic text-[#C21807]">Rush.</span>
                </h2>
                <p className="max-w-md text-lg font-light text-slate-400">
                  We're always looking for high-energy talent.
                </p>
              </motion.div>
            </div>

            <div className="grid gap-8 md:grid-cols-3">
              {careers.map((job, index) => (
                <CareerCard key={index} job={job} index={index} onApply={handleApplyClick} />
              ))}
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};

export default Partners;