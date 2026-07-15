import React, { useEffect } from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import {
  Trophy, Users, Store, ShoppingBag, CheckCircle2,
  TrendingUp, ArrowUpRight, Award,
  Zap, Activity, Flag, CircleDot, Dumbbell,
  Bike, Timer, Swords, Crown, Medal,
} from "lucide-react";

// ── Design tokens ─────────────────────────────────────────────────────────
// Ink        #0A0A0A   primary dark
// Paper      #FAFAF9   primary light
// Crimson    #C21807   brand accent
// Crimson-D  #8F1204   crimson shadow/gradient stop
//
// Signature: sponsorship tiers are framed as MEDALS — the natural hierarchy
// of a sports tournament — rather than an arbitrary 01/02/03/04 list.
// Gold → Silver → Bronze → Steel, each with its own metal gradient.
//
// Type: Oswald (condensed, athletic) carries headlines the way a matchday
// program or kit numbering would; a tabular mono face renders every stat
// and medallion numeral like a stadium scoreboard.

const FONT_DISPLAY = "'Oswald', 'Arial Narrow', sans-serif";
const FONT_MONO = "'JetBrains Mono', 'IBM Plex Mono', monospace";
const FONT_SERIF = "'Fraunces', Georgia, serif";

const FontImports = () => (
  <style>{`
    @import url('https://fonts.googleapis.com/css2?family=Oswald:wght@400;500;600;700&family=JetBrains+Mono:wght@400;500;600&family=Fraunces:ital,opsz,wght@0,9..144,400;1,9..144,500&display=swap');

    @keyframes shimmer {
      0%   { background-position: -200% 0; }
      100% { background-position: 200% 0; }
    }
    .medal-shimmer::after {
      content: "";
      position: absolute;
      inset: 0;
      background: linear-gradient(110deg, transparent 30%, rgba(255,255,255,0.35) 45%, transparent 60%);
      background-size: 250% 100%;
      opacity: 0;
      transition: opacity 0.4s ease;
      pointer-events: none;
    }
    .group:hover .medal-shimmer::after {
      opacity: 1;
      animation: shimmer 1.6s ease-in-out infinite;
    }
  `}</style>
);

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
  const row1 = [Trophy, Bike, Dumbbell, Zap, Timer, Medal, Award];
  const row2 = [CircleDot, Swords, Timer, Activity, Flag, Trophy];
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {/* Faint scoreboard dot-grid — read only up close, like arena signage */}
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

      <div className="absolute top-0    right-0 w-[500px] h-[500px] bg-red-50/50   blur-[120px] rounded-full" />
      <div className="absolute bottom-0 left-0  w-[600px] h-[600px] bg-slate-50/80 blur-[100px] rounded-full" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[400px] h-[400px] bg-[#B8923D]/[0.04] blur-[140px] rounded-full" />
    </div>
  );
};

// ── Data ─────────────────────────────────────────────────────────────────────
const MotionLink = motion.create(Link);

// Metal identities, high commitment to low — the medal metaphor is the
// hierarchy, so it's allowed to carry real meaning.
const sponsorTiers = [
  {
    href: "/sponsor/titlesponser",
    icon: Crown,
    numeral: "I",
    metal: "Gold",
    title: "Title Sponsor",
    desc: "Premium branding across kits, trophies, and reels",
    gradient: "linear-gradient(135deg, #F6DE9B 0%, #C9A24B 45%, #8A6B26 100%)",
    ring: "#B8923D",
    flagship: true,
  },
  {
    href: "/sponsor/cosponser",
    icon: Users,
    numeral: "II",
    metal: "Silver",
    title: "Co-Sponsor",
    desc: "Prominent logo placement, shoutouts, and banners",
    gradient: "linear-gradient(135deg, #F1F3F6 0%, #B4BCC6 45%, #7A8592 100%)",
    ring: "#9AA5B1",
  },
  {
    href: "/sponsor/stallsponser",
    icon: Store,
    numeral: "III",
    metal: "Bronze",
    title: "Stall Partner",
    desc: "On-site product demos, samplings, and branding space",
    gradient: "linear-gradient(135deg, #E7B285 0%, #B5713A 45%, #7C4A18 100%)",
    ring: "#B5713A",
  },
  {
    href: "/sponsor/merchandisepartner",
    icon: ShoppingBag,
    numeral: "IV",
    metal: "Steel",
    title: "Merchandise Partner",
    desc: "Co-branded event kits and corporate giveaways",
    gradient: "linear-gradient(135deg, #6B7280 0%, #3F4653 45%, #191D24 100%)",
    ring: "#4B5563",
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

const GRAIN_BG =
  "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='120' height='120'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='2' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)' opacity='0.4'/%3E%3C/svg%3E\")";

// ── Medal Tier Card ──────────────────────────────────────────────────────────
const TierCard = ({ tier, index }) => (
  <MotionLink
    to={tier.href}
    initial={{ opacity: 0, y: 40 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true }}
    transition={{ delay: index * 0.1, duration: 0.75, ease: [0.4, 0, 0.2, 1] }}
    whileHover={{ y: -6 }}
    className="group medal-shimmer relative flex flex-col overflow-hidden rounded-[1.75rem] border border-slate-200 bg-white/70 p-8 backdrop-blur-xl transition-colors duration-500"
    style={{ boxShadow: "0 1px 0 0 rgba(255,255,255,0.6) inset" }}
  >
    {/* Hairline top accent in the tier's own metal */}
    <div
      className="absolute inset-x-0 top-0 h-[3px] scale-x-0 transition-transform duration-500 group-hover:scale-x-100"
      style={{ background: tier.gradient }}
    />

    {tier.flagship && (
      <div className="absolute right-6 top-6 flex items-center gap-1 rounded-full bg-[#0A0A0A] px-3 py-1">
        <Crown size={10} className="text-[#E4C877]" />
        <span
          className="text-[8px] font-semibold uppercase tracking-[0.2em] text-[#E4C877]"
          style={{ fontFamily: FONT_MONO }}
        >
          Flagship
        </span>
      </div>
    )}

    {/* Medallion + icon */}
    <div className="mb-8 flex items-center justify-between">
      <div
        className="flex h-14 w-14 items-center justify-center rounded-2xl shadow-lg transition-transform duration-500 group-hover:scale-105 group-hover:-rotate-3"
        style={{ background: tier.gradient, boxShadow: `0 12px 24px -8px ${tier.ring}66` }}
      >
        <tier.icon size={22} className="text-white" strokeWidth={1.75} />
      </div>

      {/* Engraved medallion numeral, ring rendered in the tier's own metal */}
      <div
        className="relative flex h-14 w-14 items-center justify-center rounded-full"
        style={{
          background: "radial-gradient(circle at 35% 30%, #ffffff, #f1f0ee 60%, #e6e4e0)",
          border: `1.5px solid ${tier.ring}55`,
          boxShadow: `inset 0 1px 2px rgba(255,255,255,0.9), inset 0 -2px 4px rgba(0,0,0,0.06), 0 1px 2px rgba(0,0,0,0.04)`,
        }}
      >
        <span
          className="text-lg"
          style={{ fontFamily: FONT_SERIF, fontStyle: "italic", color: tier.ring }}
        >
          {tier.numeral}
        </span>
      </div>
    </div>

    <div
      className="mb-1 text-[9px] font-semibold uppercase tracking-[0.3em]"
      style={{ fontFamily: FONT_MONO, color: tier.ring }}
    >
      {tier.metal} Tier
    </div>

    <h3
      className="mb-2 text-2xl uppercase tracking-tight text-slate-950"
      style={{ fontFamily: FONT_DISPLAY, fontWeight: 600 }}
    >
      {tier.title}
    </h3>
    <p className="mb-8 flex-grow text-xs font-light leading-relaxed text-slate-500">
      {tier.desc}
    </p>

    <div className="flex items-center justify-between border-t border-slate-200 pt-5">
      <span
        className="text-[9px] font-semibold uppercase tracking-[0.25em] text-slate-950"
        style={{ fontFamily: FONT_MONO }}
      >
        Learn More
      </span>
      <div
        className="flex h-9 w-9 items-center justify-center rounded-full border border-slate-200 transition-all duration-500 group-hover:border-transparent"
        style={{ "--tier-accent": tier.ring }}
      >
        <ArrowUpRight
          size={15}
          className="text-slate-500 transition-colors duration-300 group-hover:text-white"
        />
      </div>
    </div>

    {/* Hover fill for the arrow circle, matched to metal */}
    <style>{`
      .group:hover [style*="--tier-accent"] { background: ${tier.gradient}; }
    `}</style>
  </MotionLink>
);

// ── Check List ───────────────────────────────────────────────────────────────
const CheckList = ({ items, accent, textClass }) => (
  <ul className="space-y-5">
    {items.map((text, i) => (
      <li key={i} className="flex items-start gap-3.5">
        <span
          className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full"
          style={{ background: `${accent}14`, border: `1px solid ${accent}33` }}
        >
          <CheckCircle2 size={12} style={{ color: accent }} strokeWidth={2.25} />
        </span>
        <span className={`text-sm font-light leading-relaxed ${textClass}`}>{text}</span>
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
      <ContinuousSportsBackground />

      <div className="relative z-10 mx-auto max-w-7xl px-6">

        {/* ── Tiers Section ── */}
        <section id="tiers" className="py-24">

          <div className="mb-16 flex flex-col justify-between gap-10 pb-12 lg:flex-row lg:items-end">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="max-w-2xl"
            >
              <div className="mb-8 inline-flex items-center gap-2.5 rounded-full border border-slate-200 bg-white px-4 py-1.5 shadow-sm">
                <Medal size={14} className="text-[#B8923D]" />
                <span
                  className="text-[9px] font-semibold uppercase tracking-[0.38em] text-slate-500"
                  style={{ fontFamily: FONT_MONO }}
                >
                  Sponsorship Tiers
                </span>
              </div>

              <h2
                className="text-4xl uppercase leading-[0.92] tracking-tight text-slate-950 md:text-6xl"
                style={{ fontFamily: FONT_DISPLAY, fontWeight: 700 }}
              >
                Choose Your <br />
                <span className="text-[#C21807]">Partnership Level.</span>
              </h2>

              <p
                className="mt-5 max-w-sm text-base leading-relaxed text-slate-500"
                style={{ fontFamily: FONT_SERIF, fontStyle: "italic" }}
              >
                Scale your brand exposure with elite association in fitness and team culture.
              </p>
            </motion.div>

            {/* Credibility strip — scoreboard-style tabular figures */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="flex gap-8 border-t border-slate-200 pt-6 lg:border-t-0 lg:border-l lg:pl-8 lg:pt-0"
            >
              <div>
                <div className="text-3xl tabular-nums text-slate-950" style={{ fontFamily: FONT_MONO, fontWeight: 600 }}>
                  1000+
                </div>
                <div className="text-[9px] font-semibold uppercase tracking-[0.2em] text-slate-400" style={{ fontFamily: FONT_MONO }}>
                  Professionals
                </div>
              </div>
              <div>
                <div className="text-3xl tabular-nums text-slate-950" style={{ fontFamily: FONT_MONO, fontWeight: 600 }}>
                  04
                </div>
                <div className="text-[9px] font-semibold uppercase tracking-[0.2em] text-slate-400" style={{ fontFamily: FONT_MONO }}>
                  Medal Tiers
                </div>
              </div>
            </motion.div>
          </div>

          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {sponsorTiers.map((tier, i) => (
              <TierCard key={i} tier={tier} index={i} />
            ))}
          </div>
        </section>

        {/* ── Analytics + Benefits Section ── */}
        <section className="py-16">
          <div className="grid gap-8 lg:grid-cols-2">

            {/* Dark: Analytics */}
            <motion.div
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.75, ease: [0.4, 0, 0.2, 1] }}
              className="group relative overflow-hidden rounded-[1.75rem] border border-slate-800 bg-[#0A0A0A] p-10 transition-all duration-700 hover:border-slate-700 md:p-12"
            >
              <div
                className="pointer-events-none absolute inset-0 opacity-[0.15] mix-blend-overlay"
                style={{ backgroundImage: GRAIN_BG }}
              />
              <div className="pointer-events-none absolute right-[-10%] top-[-20%] h-96 w-96 rounded-full bg-red-600/[0.1] blur-[120px] transition-all duration-700 group-hover:bg-red-600/[0.16]" />

              <div className="relative z-10">
                <div className="mb-8 inline-flex items-center gap-2 rounded-full bg-[#C21807] px-4 py-2">
                  <TrendingUp size={14} className="text-white" />
                  <span className="text-[9px] font-semibold uppercase tracking-[0.3em] text-white" style={{ fontFamily: FONT_MONO }}>
                    Analytics
                  </span>
                </div>

                <h3
                  className="mb-8 text-3xl uppercase tracking-tight text-slate-50"
                  style={{ fontFamily: FONT_DISPLAY, fontWeight: 600 }}
                >
                  Sponsor Dashboard
                </h3>

                <CheckList items={analyticsPoints} accent="#E2634F" textClass="text-slate-400" />
              </div>
            </motion.div>

            {/* Light: Why Sponsor */}
            <motion.div
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1, duration: 0.75, ease: [0.4, 0, 0.2, 1] }}
              className="group relative overflow-hidden rounded-[1.75rem] border border-slate-200 bg-white p-10 transition-all duration-700 hover:border-[#B8923D]/40 md:p-12"
            >
              <div className="absolute inset-x-10 top-0 h-[2px] bg-gradient-to-r from-transparent via-[#B8923D]/60 to-transparent" />
              <div className="pointer-events-none absolute right-[-10%] top-[-20%] h-96 w-96 rounded-full bg-slate-50 blur-[100px] transition-all duration-700 group-hover:bg-[#B8923D]/[0.06]" />

              <div className="relative z-10">
                <div className="mb-8 inline-flex items-center gap-2 rounded-full border border-slate-200 bg-slate-50 px-4 py-2">
                  <Trophy size={14} className="text-[#B8923D]" />
                  <span className="text-[9px] font-semibold uppercase tracking-[0.3em] text-[#8A6B26]" style={{ fontFamily: FONT_MONO }}>
                    Benefits
                  </span>
                </div>

                <h3
                  className="mb-8 text-3xl uppercase tracking-tight text-slate-950"
                  style={{ fontFamily: FONT_DISPLAY, fontWeight: 600 }}
                >
                  Why Sponsor HAKIRUSH?
                </h3>

                <CheckList items={benefitPoints} accent="#B8923D" textClass="text-slate-500" />
              </div>
            </motion.div>

          </div>
        </section>

      </div>
    </div>
  );
};

export default Sponsorship;