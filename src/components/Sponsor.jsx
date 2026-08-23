import React, { useEffect } from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import {
  Trophy, Users, Store, ShoppingBag, CheckCircle2,
  TrendingUp, ArrowUpRight, Crown, ScanLine,
} from "lucide-react";

const FONT_DISPLAY = "'Oswald', 'Arial Narrow', sans-serif";
const FONT_MONO = "'JetBrains Mono', 'IBM Plex Mono', monospace";
const FONT_BODY = "'Inter', sans-serif";

const PITCH = "#10241A";      
const PITCH_DEEP = "#0A160F";  
const CHALK = "#F5F1E6";     
const CHALK_LINE = "#E4DFCF";  
const FLARE = "#DC2626";      
const TURF = "#3D8B5F";        
const FOIL = "#C9A24B";        

const FontImports = () => (
  <style>{`
    @import url('https://fonts.googleapis.com/css2?family=Oswald:wght@400;500;600;700&family=Inter:wght@400;500;600&family=JetBrains+Mono:wght@400;500;600&display=swap');

    @keyframes swing {
      0%, 100% { transform: rotate(0deg); }
      50% { transform: rotate(-1.2deg); }
    }
    .badge-hang:hover .badge-lanyard { animation: swing 1.8s ease-in-out infinite; }
  `}</style>
);

const SharedBackground = () => (
  <div className="absolute inset-0 overflow-hidden pointer-events-none">
    <div
      className="absolute inset-0 bg-cover bg-center bg-fixed"
      style={{ backgroundImage: `url(${Backimage})` }}
    />
    {/* Light wash only — enough for card contrast, not enough to flatten the photo to white */}
    <div className="absolute inset-0" style={{ background: `${CHALK}40` }} />
    <div className="absolute top-[-10%] right-[-5%] w-[520px] h-[520px] rounded-full blur-[130px]" style={{ background: `${FLARE}14` }} />
    <div className="absolute bottom-[-10%] left-[-5%] w-[560px] h-[560px] rounded-full blur-[120px]" style={{ background: `${TURF}12` }} />
  </div>
);

// ── Data ─────────────────────────────────────────────────────────────────────
const MotionLink = motion.create(Link);

const sponsorTiers = [
  {
    href: "/sponsor/titlesponser",
    icon: Crown,
    code: "TS·01",
    access: "All-Access",
    title: "Title Sponsor",
    desc: "Premium branding across kits, trophies, and reels",
    accent: FOIL,
    flagship: true,
  },
  {
    href: "/sponsor/cosponser",
    icon: Users,
    code: "CS·02",
    access: "Field Access",
    title: "Co-Sponsor",
    desc: "Prominent logo placement, shoutouts, and banners",
    accent: "#B4BCC6",
  },
  {
    href: "/sponsor/stallsponser",
    icon: Store,
    code: "SP·03",
    access: "Vendor Access",
    title: "Stall Partner",
    desc: "On-site product demos, samplings, and branding space",
    accent: "#C08552",
  },
  {
    href: "/sponsor/merchandisepartner",
    icon: ShoppingBag,
    code: "MP·04",
    access: "Supply Access",
    title: "Merchandise Partner",
    desc: "Co-branded event kits and corporate giveaways",
    accent: "#8B96A3",
  },
];

const analyticsPoints = [
  "Real-time analytics of reach & impressions",
  "Brand exposure tracking",
  "Highlight reels showcasing sponsor placements",
  "Dedicated logo placement in media posts",
];

const benefitPoints = [
  "Access 1000+ professionals per tournament",
  "Multi-city exposure",
  "Social media amplification",
  "Premium association with fitness & team culture",
];

// ── Credential Badge Card ─────────────────────────────────────────────────────
const TierCard = ({ tier, index }) => (
  <MotionLink
    to={tier.href}
    initial={{ opacity: 0, y: 40 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true }}
    transition={{ delay: index * 0.1, duration: 0.7, ease: [0.4, 0, 0.2, 1] }}
    whileHover={{ y: -6 }}
    className="badge-hang group relative flex flex-col pt-7"
  >
    {/* Lanyard strip + hole */}
    <div className="badge-lanyard relative mx-auto mb-[-1px] flex flex-col items-center" style={{ transformOrigin: "top center" }}>
      <div className="h-6 w-3 rounded-t-sm" style={{ background: tier.accent, opacity: 0.5 }} />
      <div
        className="relative z-10 h-4 w-4 rounded-full border-2"
        style={{ background: CHALK, borderColor: tier.accent }}
      />
    </div>

    {/* Badge body */}
    <div
      className="relative flex flex-col overflow-hidden rounded-2xl"
      style={{ background: PITCH, boxShadow: "0 20px 40px -20px rgba(16,36,26,0.5)" }}
    >
      {tier.flagship && (
        <div className="absolute right-4 top-4 flex items-center gap-1 rounded-full px-2.5 py-1" style={{ background: `${FOIL}22`, border: `1px solid ${FOIL}55` }}>
          <span className="text-[8px] font-semibold uppercase tracking-[0.2em]" style={{ fontFamily: FONT_MONO, color: FOIL }}>
            Flagship
          </span>
        </div>
      )}

      <div className="p-7 pb-6">
        {/* Access code row */}
        <div className="mb-6 flex items-center gap-2" style={{ color: `${CHALK}88` }}>
          <ScanLine size={12} />
          <span className="text-[10px] tracking-[0.25em]" style={{ fontFamily: FONT_MONO }}>
            HKR·{tier.code}
          </span>
        </div>

        <div
          className="mb-5 flex h-12 w-12 items-center justify-center rounded-xl"
          style={{ background: `${tier.accent}1f`, border: `1px solid ${tier.accent}55` }}
        >
          <tier.icon size={20} style={{ color: tier.accent }} strokeWidth={1.75} />
        </div>

        <div
          className="mb-1 text-[9px] font-semibold uppercase tracking-[0.3em]"
          style={{ fontFamily: FONT_MONO, color: tier.accent }}
        >
          {tier.access}
        </div>

        <h3
          className="mb-2 text-2xl uppercase tracking-tight"
          style={{ fontFamily: FONT_DISPLAY, fontWeight: 600, color: FLARE }}
        >
          {tier.title}
        </h3>
        <p className="text-xs font-light leading-relaxed" style={{ fontFamily: FONT_BODY, color: `${CHALK}99` }}>
          {tier.desc}
        </p>
      </div>

      {/* Perforated tear line */}
      <div className="relative">
        <div
          className="border-t border-dashed"
          style={{ borderColor: `${CHALK}33` }}
        />
        <div className="absolute -left-2.5 top-1/2 h-5 w-5 -translate-y-1/2 rounded-full" style={{ background: CHALK }} />
        <div className="absolute -right-2.5 top-1/2 h-5 w-5 -translate-y-1/2 rounded-full" style={{ background: CHALK }} />
      </div>

      {/* Tear-off stub */}
      <div className="flex items-center justify-between px-7 py-5">
        <span
          className="text-[9px] font-semibold uppercase tracking-[0.25em]"
          style={{ fontFamily: FONT_MONO, color: CHALK }}
        >
          Activate
        </span>
        <div
          className="flex h-8 w-8 items-center justify-center rounded-full transition-colors duration-300"
          style={{ background: `${tier.accent}22`, border: `1px solid ${tier.accent}55` }}
        >
          <ArrowUpRight size={14} style={{ color: tier.accent }} />
        </div>
      </div>
    </div>
  </MotionLink>
);

// ── Check List ───────────────────────────────────────────────────────────────
const CheckList = ({ items, accent, color }) => (
  <ul className="space-y-5">
    {items.map((text, i) => (
      <li key={i} className="flex items-start gap-3.5">
        <span
          className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full"
          style={{ background: `${accent}14`, border: `1px solid ${accent}33` }}
        >
          <CheckCircle2 size={12} style={{ color: accent }} strokeWidth={2.25} />
        </span>
        <span className="text-sm font-light leading-relaxed" style={{ fontFamily: FONT_BODY, color }}>
          {text}
        </span>
      </li>
    ))}
  </ul>
);

// ── Page ─────────────────────────────────────────────────────────────────────
const Sponsorship = () => {
  useEffect(() => {
    const saved = sessionStorage.getItem("sponsorPageScroll");
    if (saved) {
      setTimeout(() => {
        window.scrollTo(0, parseInt(saved, 10));
        sessionStorage.removeItem("sponsorPageScroll");
      }, 100);
    }
  }, []);

  return (
    <div className="relative min-h-screen overflow-hidden bg-transparent">
      <FontImports />

      <div className="relative z-10 mx-auto max-w-7xl px-6">

        {/* ── Tiers Section ── */}
        <section id="tiers" className="py-24">

          <div className="mb-20 flex flex-col justify-between gap-10 pb-12 lg:flex-row lg:items-end">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="max-w-2xl"
            >
              <div className="mb-8 inline-flex items-center gap-2.5 rounded-full px-4 py-1.5" style={{ background: PITCH }}>
                <ScanLine size={13} style={{ color: FLARE }} />
                <span
                  className="text-[9px] font-semibold uppercase tracking-[0.38em]"
                  style={{ fontFamily: FONT_MONO, color: CHALK }}
                >
                  Sponsor Credentials
                </span>
              </div>

              <h2
                className="text-4xl uppercase leading-[0.92] tracking-tight md:text-6xl"
                style={{ fontFamily: FONT_DISPLAY, fontWeight: 700, color: PITCH }}
              >
                Get Your <br />
                <span style={{ color: FLARE }}>Access Level.</span>
              </h2>

              <p
                className="mt-5 max-w-sm text-base leading-relaxed"
                style={{ fontFamily: FONT_BODY, color: `${PITCH}99` }}
              >
                Four tiers of matchday access. Scale your brand's presence across the pitch, the stands, and the feed.
              </p>
            </motion.div>

            {/* Scoreboard-style credibility strip */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="flex gap-1 rounded-xl p-1.5"
              style={{ background: PITCH }}
            >
              {[["1000+", "Pros"], ["04", "Tiers"], ["09", "Cities"]].map(([val, label], i) => (
                <div key={i} className="flex flex-col items-center px-4 py-2.5">
                  <div className="text-2xl tabular-nums" style={{ fontFamily: FONT_MONO, fontWeight: 600, color: FLARE }}>
                    {val}
                  </div>
                  <div className="text-[8px] font-semibold uppercase tracking-[0.2em]" style={{ fontFamily: FONT_MONO, color: `${CHALK}77` }}>
                    {label}
                  </div>
                </div>
              ))}
            </motion.div>
          </div>

          <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
            {sponsorTiers.map((tier, i) => (
              <TierCard key={i} tier={tier} index={i} />
            ))}
          </div>
        </section>

       {/* ── Analytics + Benefits Section ── */}
        <section className="py-16">
          <div className="grid gap-8 lg:grid-cols-2">

            {/* Dark: Field Report (Analytics) */}
            <motion.div
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.75, ease: [0.4, 0, 0.2, 1] }}
              whileHover={{ y: -4 }}
              className="group relative overflow-hidden rounded-[1.75rem] p-10 shadow-[0_20px_60px_-15px_rgba(0,0,0,0.5)] transition-all duration-700 md:p-12"
              style={{ background: PITCH_DEEP, border: `1px solid ${CHALK}14` }}
            >
              {/* Ambient glow — brightens on hover */}
              <div
                className="pointer-events-none absolute right-[-10%] top-[-20%] h-96 w-96 rounded-full blur-[120px] transition-all duration-700 group-hover:opacity-80"
                style={{ background: `${FLARE}18` }}
              />
              {/* Faint yardline texture */}
              <div
                className="pointer-events-none absolute inset-0 opacity-[0.04]"
                style={{
                  backgroundImage: `repeating-linear-gradient(90deg, ${CHALK} 0px, ${CHALK} 1px, transparent 1px, transparent 64px)`,
                }}
              />
              {/* Top accent bar */}
              <div
                className="absolute inset-x-0 top-0 h-[3px] scale-x-0 transition-transform duration-700 group-hover:scale-x-100"
                style={{ background: `linear-gradient(90deg, transparent, ${FLARE}, transparent)` }}
              />

              <div className="relative z-10">
                <div
                  className="mb-8 inline-flex items-center gap-2 rounded-full px-4 py-2 shadow-[0_8px_20px_-6px_rgba(0,0,0,0.4)] transition-transform duration-500 group-hover:-translate-y-0.5"
                  style={{ background: FLARE }}
                >
                  <TrendingUp size={14} className="text-white" />
                  <span
                    className="text-[9px] font-semibold uppercase tracking-[0.3em] text-white"
                    style={{ fontFamily: FONT_MONO }}
                  >
                    Field Report
                  </span>
                </div>

                <h3
                  className="mb-2 text-3xl uppercase tracking-tight"
                  style={{ fontFamily: FONT_DISPLAY, fontWeight: 600, color: CHALK }}
                >
                  Sponsor Dashboard
                </h3>
                <p
                  className="mb-8 text-sm leading-relaxed"
                  style={{ color: `${CHALK}80`, fontFamily: FONT_MONO }}
                >
                  Live numbers, not promises. Track it in real time.
                </p>

                <CheckList items={analyticsPoints} accent={FLARE} color={`${CHALK}CC`} />
              </div>
            </motion.div>

            {/* Light: Roster Call (Why Sponsor) */}
            <motion.div
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1, duration: 0.75, ease: [0.4, 0, 0.2, 1] }}
              whileHover={{ y: -4 }}
              className="group relative overflow-hidden rounded-[1.75rem] p-10 shadow-[0_20px_60px_-20px_rgba(0,0,0,0.15)] transition-all duration-700 md:p-12"
              style={{ background: CHALK, border: `1px solid ${PITCH}12` }}
            >
              {/* Soft turf glow, mirrors the dark card's flare */}
              <div
                className="pointer-events-none absolute left-[-10%] bottom-[-20%] h-96 w-96 rounded-full blur-[120px] transition-all duration-700 group-hover:opacity-80"
                style={{ background: `${TURF}14` }}
              />
              {/* Top accent bar */}
              <div
                className="absolute inset-x-0 top-0 h-[3px] scale-x-0 transition-transform duration-700 group-hover:scale-x-100"
                style={{ background: `linear-gradient(90deg, transparent, ${TURF}, transparent)` }}
              />

              <div className="relative z-10">
                <div
                  className="mb-8 inline-flex items-center gap-2 rounded-full px-4 py-2 transition-transform duration-500 group-hover:-translate-y-0.5"
                  style={{ background: `${TURF}12`, border: `1px solid ${TURF}33` }}
                >
                  <Trophy size={14} style={{ color: TURF }} />
                  <span
                    className="text-[9px] font-semibold uppercase tracking-[0.3em]"
                    style={{ fontFamily: FONT_MONO, color: TURF }}
                  >
                    Roster Call
                  </span>
                </div>

                <h3
                  className="mb-2 text-3xl uppercase tracking-tight"
                  style={{ fontFamily: FONT_DISPLAY, fontWeight: 600, color: PITCH }}
                >
                  Why Sponsor HAKIRUSH?
                </h3>
                <p
                  className="mb-8 text-sm leading-relaxed"
                  style={{ color: `${PITCH}80`, fontFamily: FONT_MONO }}
                >
                  A club that shows up for the people who show up for it.
                </p>

                <CheckList items={benefitPoints} accent={TURF} color={`${PITCH}CC`} />
              </div>
            </motion.div>

          </div>
        </section>

      </div>
    </div>
  );
};

export default Sponsorship;