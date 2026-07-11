import React, { useEffect } from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import {
  Trophy, Users, Store, ShoppingBag, CheckCircle2,
  TrendingUp, ArrowUpRight, Handshake, Award,
  Target, Zap, Activity, Flag, CircleDot, Dumbbell,
  Bike, Timer, Swords, Crown, Sparkle,
} from "lucide-react";

// ── Design tokens ─────────────────────────────────────────────────────────
// Ink        #0A0A0A   primary dark
// Paper      #FAFAF9   primary light
// Crimson    #C21807   brand accent (existing)
// Crimson-D  #8F1204   crimson shadow/gradient stop
// Brass      #B8923D   premium accent — reserved for the Title tier only
// Brass-L    #E4C877   brass highlight

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
      <div className="absolute top-0    right-0 w-[500px] h-[500px] bg-red-50/50   blur-[120px] rounded-full" />
      <div className="absolute bottom-0 left-0  w-[600px] h-[600px] bg-slate-50/80 blur-[100px] rounded-full" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[400px] h-[400px] bg-[#B8923D]/[0.04] blur-[140px] rounded-full" />
    </div>
  );
};

// ── Data ─────────────────────────────────────────────────────────────────────
const MotionLink = motion.create(Link);

// Ordered from highest to lowest commitment — the numbering below is real
// rank, not decoration, so it's allowed to carry meaning.
const sponsorTiers = [
  {
    href: "/sponsor/titlesponser",
    icon: Crown,
    rank: "01",
    title: "Title Sponsor",
    desc: "Premium branding across kits, trophies, and reels",
    premium: true,
  },
  {
    href: "/sponsor/cosponser",
    icon: Users,
    rank: "02",
    title: "Co-Sponsor",
    desc: "Prominent logo placement, shoutouts, and banners",
  },
  {
    href: "/sponsor/stallsponser",
    icon: Store,
    rank: "03",
    title: "Stall Partner",
    desc: "On-site product demos, samplings, and branding space",
  },
  {
    href: "/sponsor/merchandisepartner",
    icon: ShoppingBag,
    rank: "04",
    title: "Merchandise Partner",
    desc: "Co-branded event kits and corporate giveaways",
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

// ── Fine grain texture (subtle, premium tactility on dark surfaces) ─────────
const GRAIN_BG =
  "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='120' height='120'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='2' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)' opacity='0.4'/%3E%3C/svg%3E\")";

// ── Tier Card ────────────────────────────────────────────────────────────────
const TierCard = ({ tier, index }) => {
  const accent = tier.premium ? "#B8923D" : "#C21807";
  const accentDeep = tier.premium ? "#8A6B26" : "#8F1204";

  return (
    <MotionLink
      to={tier.href}
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.1, duration: 0.75, ease: [0.4, 0, 0.2, 1] }}
      whileHover={{ y: -6 }}
      className="group relative flex flex-col overflow-hidden rounded-[1.75rem] border p-8 backdrop-blur-xl transition-colors duration-500"
      style={{
        background: tier.premium
          ? "linear-gradient(165deg, rgba(184,146,61,0.07), rgba(255,255,255,0.7))"
          : "rgba(255,255,255,0.6)",
        borderColor: tier.premium ? "rgba(184,146,61,0.35)" : "rgba(226,232,240,1)",
        boxShadow: "0 1px 0 0 rgba(255,255,255,0.6) inset",
      }}
    >
      {/* Hairline top accent — brighter on hover, gold for the flagship tier */}
      <div
        className="absolute inset-x-0 top-0 h-[2px] scale-x-0 transition-transform duration-500 group-hover:scale-x-100"
        style={{ background: `linear-gradient(90deg, transparent, ${accent}, transparent)` }}
      />

      {/* Premium ribbon */}
      {tier.premium && (
        <div className="absolute right-6 top-6 flex items-center gap-1 rounded-full bg-[#0A0A0A] px-3 py-1">
          <Sparkle size={10} className="text-[#E4C877]" />
          <span className="text-[8px] font-black uppercase tracking-[0.2em] text-[#E4C877]">Flagship</span>
        </div>
      )}

      {/* Rank + Icon row */}
      <div className="mb-8 flex items-center justify-between">
        <div
          className="flex h-14 w-14 items-center justify-center rounded-2xl shadow-lg transition-transform duration-500 group-hover:scale-105 group-hover:-rotate-3"
          style={{
            background: `linear-gradient(135deg, ${accent}, ${accentDeep})`,
            boxShadow: `0 12px 24px -8px ${accent}55`,
          }}
        >
          <tier.icon size={22} className="text-white" strokeWidth={1.75} />
        </div>
        <span
          className="font-serif text-3xl italic tabular-nums"
          style={{ color: tier.premium ? "#B8923D" : "#CBD5E1" }}
        >
          {tier.rank}
        </span>
      </div>

      {/* Text */}
      <h3
        className="mb-2 text-2xl font-black uppercase italic tracking-tighter text-slate-950 transition-colors duration-300 group-hover:text-[var(--tier-accent)]"
        style={{ "--tier-accent": accent }}
      >
        {tier.title}
      </h3>
      <p className="mb-8 flex-grow text-xs font-light leading-relaxed text-slate-500">
        {tier.desc}
      </p>

      {/* CTA row */}
      <div
        className="flex items-center justify-between border-t pt-5 transition-colors duration-300"
        style={{ borderColor: "rgba(226,232,240,1)" }}
      >
        <span className="text-[9px] font-black uppercase tracking-[0.25em] text-slate-950">
          Learn More
        </span>
        <div
          className="flex h-9 w-9 items-center justify-center rounded-full border transition-all duration-500 group-hover:border-transparent group-hover:[background:var(--tier-accent)]"
          style={{ borderColor: "rgba(226,232,240,1)", "--tier-accent": accent }}
        >
          <ArrowUpRight
            size={15}
            className="text-slate-500 transition-colors duration-300 group-hover:text-white"
          />
        </div>
      </div>
    </MotionLink>
  );
};

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
      <ContinuousSportsBackground />

      <div className="relative z-10 mx-auto max-w-7xl px-6">

        {/* ── Tiers Section ── */}
        <section id="tiers" className="py-24">

          {/* Header */}
          <div className="mb-16 flex flex-col justify-between gap-10 pb-12 lg:flex-row lg:items-end">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="max-w-2xl"
            >
              {/* Badge */}
              <div className="mb-8 inline-flex items-center gap-2.5 rounded-full border border-slate-200 bg-white px-4 py-1.5 shadow-sm">
                <Award size={14} className="text-[#B8923D]" />
                <span className="text-[9px] font-black uppercase tracking-[0.38em] text-slate-500">
                  Sponsorship Tiers
                </span>
              </div>

              <h2 className="text-4xl font-black uppercase italic leading-[0.88] tracking-[-0.05em] text-slate-950 md:text-6xl">
                Choose Your <br />
                <span className="not-italic text-[#C21807]">Partnership Level.</span>
              </h2>

              <p className="mt-5 max-w-sm text-base font-light italic leading-relaxed text-slate-500">
                Scale your brand exposure with elite association in fitness and team culture.
              </p>
            </motion.div>

            {/* Credibility strip — real figures pulled from the benefits below */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="flex gap-8 border-t border-slate-200 pt-6 lg:border-t-0 lg:border-l lg:pl-8 lg:pt-0"
            >
              <div>
                <div className="font-serif text-3xl italic text-slate-950">1000+</div>
                <div className="text-[9px] font-black uppercase tracking-[0.2em] text-slate-400">Professionals</div>
              </div>
              <div>
                <div className="font-serif text-3xl italic text-slate-950">4</div>
                <div className="text-[9px] font-black uppercase tracking-[0.2em] text-slate-400">Sponsor Tiers</div>
              </div>
            </motion.div>
          </div>

          {/* 4-col tier cards */}
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
              {/* Grain */}
              <div
                className="pointer-events-none absolute inset-0 opacity-[0.15] mix-blend-overlay"
                style={{ backgroundImage: GRAIN_BG }}
              />
              {/* Glow */}
              <div className="pointer-events-none absolute right-[-10%] top-[-20%] h-96 w-96 rounded-full bg-red-600/[0.1] blur-[120px] transition-all duration-700 group-hover:bg-red-600/[0.16]" />

              <div className="relative z-10">
                {/* Badge */}
                <div className="mb-8 inline-flex items-center gap-2 rounded-full bg-[#C21807] px-4 py-2">
                  <TrendingUp size={14} className="text-white" />
                  <span className="text-[9px] font-black uppercase tracking-[0.3em] text-white">
                    Analytics
                  </span>
                </div>

                <h3 className="mb-8 text-3xl font-black uppercase italic tracking-tighter text-slate-50">
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
              {/* Brass hairline at top */}
              <div className="absolute inset-x-10 top-0 h-[2px] bg-gradient-to-r from-transparent via-[#B8923D]/60 to-transparent" />

              {/* Glow */}
              <div className="pointer-events-none absolute right-[-10%] top-[-20%] h-96 w-96 rounded-full bg-slate-50 blur-[100px] transition-all duration-700 group-hover:bg-[#B8923D]/[0.06]" />

              <div className="relative z-10">
                {/* Badge */}
                <div className="mb-8 inline-flex items-center gap-2 rounded-full border border-slate-200 bg-slate-50 px-4 py-2">
                  <Trophy size={14} className="text-[#B8923D]" />
                  <span className="text-[9px] font-black uppercase tracking-[0.3em] text-[#8A6B26]">
                    Benefits
                  </span>
                </div>

                <h3 className="mb-8 text-3xl font-black uppercase italic tracking-tighter text-slate-950">
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