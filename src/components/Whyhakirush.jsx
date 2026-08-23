import React, { useRef, useState } from 'react';
import { motion, useMotionValue, useSpring, useTransform, useReducedMotion } from 'framer-motion';
import { ArrowRight, BadgeCheck, BarChart3, HeartPulse, ShieldCheck, Sparkles, Users2, Trophy } from 'lucide-react';
import { Link } from 'react-router-dom';


const useTilt = (strength = 10, disabled = false) => {
  const ref = useRef(null);
  const [isHovered, setIsHovered] = useState(false);
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const rotateX = useSpring(useTransform(y, [-0.5, 0.5], [strength, -strength]), {
    stiffness: 260,
    damping: 22,
  });
  const rotateY = useSpring(useTransform(x, [-0.5, 0.5], [-strength, strength]), {
    stiffness: 260,
    damping: 22,
  });

  const handleMouseMove = (e) => {
    if (disabled || !ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    x.set((e.clientX - rect.left) / rect.width - 0.5);
    y.set((e.clientY - rect.top) / rect.height - 0.5);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
    setIsHovered(false);
  };

  return { ref, x, y, rotateX, rotateY, isHovered, setIsHovered, handleMouseMove, handleMouseLeave };
};

const GOLD = '#D4AF37';
const RED = '#E50914';
const CARD = '#111112';

const reasons = [
  {
    icon: Users2,
    title: 'Employee Engagement',
    description: 'A calendar of curated experiences your teams actually look forward to — not a one-off offsite, but a reason to show up every month.',
  },
  {
    icon: Trophy,
    title: 'Team Building',
    description: 'Mixed-department line-ups and inter-team fixtures build trust on the field first, so it carries back into the workplace.',
  },
  {
    icon: Sparkles,
    title: 'Corporate Sports',
    description: 'Professionally run tournaments, real jerseys, and match-day production — sport delivered at the standard your brand expects.',
  },
  {
    icon: HeartPulse,
    title: 'Workplace Wellness',
    description: 'Movement built into the work week, not bolted on — wellness formats that fit around calendars instead of competing with them.',
  },
  {
    icon: ShieldCheck,
    title: 'Employer Branding',
    description: 'A visible, values-led program that becomes part of how candidates and employees describe what it\u2019s like to work at your company.',
  },
  {
    icon: BarChart3,
    title: 'Analytics & Reports',
    description: 'Every match, badge, and HAKI RANK movement rolls up into leadership-ready reporting on participation and engagement.',
  },
];


const CornerMark = ({ corner, active }) => {
  const pos = {
    tl: 'top-3 left-3 border-t border-l',
    tr: 'top-3 right-3 border-t border-r',
    bl: 'bottom-3 left-3 border-b border-l',
    br: 'bottom-3 right-3 border-b border-r',
  }[corner];

  const shift = {
    tl: active ? { x: -2, y: -2 } : { x: 0, y: 0 },
    tr: active ? { x: 2, y: -2 } : { x: 0, y: 0 },
    bl: active ? { x: -2, y: 2 } : { x: 0, y: 0 },
    br: active ? { x: 2, y: 2 } : { x: 0, y: 0 },
  }[corner];

  return (
    <motion.span
      className={`pointer-events-none absolute h-4 w-4 ${pos}`}
      animate={{
        ...shift,
        opacity: active ? 1 : 0.55,
        borderColor: active ? RED : 'rgba(212,175,55,0.35)',
      }}
      transition={{ duration: 0.35, ease: 'easeOut' }}
    />
  );
};

const ReasonCard3D = ({ item, index }) => {
  const reduceMotion = useReducedMotion();
  const { ref, x, y, rotateX, rotateY, isHovered, setIsHovered, handleMouseMove, handleMouseLeave } = useTilt(8, reduceMotion);
  const Icon = item.icon;

  const glow = useTransform([x, y], ([xv, yv]) =>
    `radial-gradient(circle at ${(xv + 0.5) * 100}% ${(yv + 0.5) * 100}%, rgba(229,9,20,0.16), transparent 60%)`
  );

  return (
    <div className="h-full" style={{ perspective: 1100 }}>
      <motion.div
        initial={{ opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5, delay: index * 0.06 }}
        animate={{ y: isHovered && !reduceMotion ? -6 : 0 }}
        className="relative h-full rounded-2xl p-px transition-colors duration-500"
        style={{
          background: isHovered
            ? `linear-gradient(135deg, ${GOLD}80, rgba(255,255,255,0.05) 45%, ${RED}55)`
            : 'linear-gradient(135deg, rgba(255,255,255,0.07), rgba(255,255,255,0.02))',
        }}
      >
        <motion.article
          ref={ref}
          onMouseMove={handleMouseMove}
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={handleMouseLeave}
          style={{
            rotateX: isHovered && !reduceMotion ? rotateX : 0,
            rotateY: isHovered && !reduceMotion ? rotateY : 0,
            transformStyle: 'preserve-3d',
          }}
          className="group relative flex h-full flex-col overflow-hidden rounded-[15px] p-8"
          style={{ background: CARD }}
        >
          {/* cursor-tracked glow — red, the energetic half of the pair */}
          <motion.div
            className="pointer-events-none absolute inset-0 rounded-[inherit]"
            style={{ background: glow, opacity: isHovered ? 1 : 0, transition: 'opacity 0.35s' }}
          />

          {/* foil sweep — gold-to-red diagonal pass, once per hover, never looping */}
          <motion.div
            className="pointer-events-none absolute inset-0 rounded-[inherit]"
            style={{
              background: `linear-gradient(115deg, transparent 30%, ${GOLD}22 45%, ${RED}2A 50%, ${GOLD}22 55%, transparent 70%)`,
            }}
            initial={{ x: '-120%' }}
            animate={{ x: isHovered && !reduceMotion ? '120%' : '-120%' }}
            transition={{ duration: 0.9, ease: 'easeInOut' }}
          />

          {/* plaque corner brackets — gold at rest, red on hover */}
          <CornerMark corner="tl" active={isHovered} />
          <CornerMark corner="tr" active={isHovered} />
          <CornerMark corner="bl" active={isHovered} />
          <CornerMark corner="br" active={isHovered} />

          {/* icon medallion — red chip inside a slow rotating gold conic ring */}
          <div style={{ transform: 'translateZ(36px)' }} className="relative mb-6 inline-flex h-12 w-12 items-center justify-center">
            <motion.span
              className="absolute inset-0 rounded-full opacity-70"
              style={{
                background: `conic-gradient(from 0deg, ${GOLD}, transparent 30%, transparent 70%, ${GOLD})`,
                mask: 'radial-gradient(farthest-side, transparent calc(100% - 1.5px), #000 calc(100% - 1.5px))',
                WebkitMask: 'radial-gradient(farthest-side, transparent calc(100% - 1.5px), #000 calc(100% - 1.5px))',
              }}
              animate={{ rotate: isHovered && !reduceMotion ? 360 : 0 }}
              transition={{ duration: 2.2, ease: 'linear', repeat: isHovered && !reduceMotion ? Infinity : 0 }}
            />
            <div className="relative flex h-9 w-9 items-center justify-center rounded-full border border-[#E50914]/25 bg-[#E50914]/12 text-[#E50914]">
              <Icon size={18} />
            </div>
          </div>

          <h3 className="relative text-2xl font-medium text-white" style={{ transform: 'translateZ(22px)' }}>
            {item.title}
          </h3>

          {/* red → gold underline, drawn in on hover — the pairing made explicit */}
          <motion.div
            className="mt-2 h-px rounded-full"
            style={{ background: `linear-gradient(90deg, ${RED}, ${GOLD})` }}
            animate={{ width: isHovered ? 40 : 16, opacity: isHovered ? 1 : 0.5 }}
            transition={{ duration: 0.35 }}
          />

          <p className="relative mt-3 flex-1 text-sm leading-7 text-[#9C9C9C]" style={{ transform: 'translateZ(14px)' }}>
            {item.description}
          </p>
        </motion.article>
      </motion.div>
    </div>
  );
};

/* ------------------------------------------------------------------ */
/*  Membership plaque — echoes the card signature in the header itself */
/* ------------------------------------------------------------------ */
const TrustPlaque = () => (
  <div className="relative rounded-2xl p-px" style={{ background: `linear-gradient(135deg, ${GOLD}70, rgba(255,255,255,0.04) 50%, ${RED}45)` }}>
    <div className="relative rounded-[15px] p-6" style={{ background: CARD }}>
      <CornerMark corner="tl" active={false} />
      <CornerMark corner="br" active={false} />
      <div className="flex items-center gap-2 text-[11px] font-semibold uppercase tracking-[0.3em] text-red-600">
        <BadgeCheck size={14} />
        Trusted Nationwide
      </div>
      <div className="mt-5 flex items-end justify-between border-b border-white/10 pb-4">
        <span className="text-3xl font-semibold text-white">200+</span>
        <span className="text-xs text-[#9C9C9C]">Companies engaged</span>
      </div>
      <div className="mt-4 flex items-end justify-between">
        <span className="text-3xl font-semibold text-white">12+</span>
        <span className="text-xs text-[#9C9C9C]">Indian cities</span>
      </div>
    </div>
  </div>
);

const OurPlans = () => (
  <section className="relative overflow-hidden bg-transparent py-[120px] text-white">
    <div className="absolute inset-0" />
    <div className="section-shell relative">
      <div className="mb-14 grid gap-10 lg:grid-cols-[1.4fr_0.6fr] lg:items-end">
        <div>
          <div className="mb-4 flex items-center gap-3">
            <span className="h-1.5 w-1.5 rounded-full bg-[#E50914]" />
            <span className="text-[11px] font-semibold uppercase tracking-[0.35em] text-[#E50914]">Why HAKIRUSH</span>
            <span className="h-px flex-1 max-w-[60px] bg-gradient-to-r from-[#D4AF37]/50 to-transparent" />
          </div>

          <h2 className="text-4xl sm:text-5xl lg:text-6xl leading-tight">
            Premium employee engagement,{' '}
            <span className="text-red-600">built for modern organisations.</span>
          </h2>
          <p className="mt-4 max-w-2xl text-lg leading-8 text-[#A8A8A8]">
            HAKIRUSH brings together sport, culture, wellness and recognition in one platform for companies that want engagement they can actually measure.
          </p>
        </div>

        <TrustPlaque />
      </div>

      <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
        {reasons.map((item, index) => (
          <ReasonCard3D key={item.title} item={item} index={index} />
        ))}
      </div>
    </div>
  </section>
);

export default OurPlans;