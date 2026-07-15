import React, { useRef, useState } from 'react';
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';
import { ArrowRight, BadgeCheck, BarChart3, HeartPulse, ShieldCheck, Sparkles, Users2, Trophy } from 'lucide-react';
import { Link } from 'react-router-dom';

/* ------------------------------------------------------------------ */
/*  Shared tilt hook — same physics as the navbar/footer 3D elements   */
/* ------------------------------------------------------------------ */
const useTilt = (strength = 10) => {
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
    if (!ref.current) return;
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

const reasons = [
  {
    icon: Users2,
    title: 'Employee Engagement',
    description: 'Create meaningful daily participation through curated experiences that connect people across teams.',
  },
  {
    icon: Trophy,
    title: 'Team Building',
    description: 'Build trust, collaboration and stronger workplace relationships through competitive yet inclusive activities.',
  },
  {
    icon: Sparkles,
    title: 'Corporate Sports',
    description: 'Deliver premium sport-led experiences with professional management, polished events and recognition.',
  },
  {
    icon: HeartPulse,
    title: 'Workplace Wellness',
    description: 'Support employee wellbeing with wellness initiatives that reinforce healthy and energised teams.',
  },
  {
    icon: ShieldCheck,
    title: 'Employer Branding',
    description: 'Strengthen your employer story with visible, values-led programs that leaders and employees remember.',
  },
  {
    icon: BarChart3,
    title: 'Analytics & Reports',
    description: 'Turn participation into insights with measurable engagement, reporting and leadership-ready outcomes.',
  },
];

const ReasonCard3D = ({ item, index }) => {
  const { ref, x, y, rotateX, rotateY, isHovered, setIsHovered, handleMouseMove, handleMouseLeave } = useTilt(8);
  const Icon = item.icon;

  const glow = useTransform([x, y], ([xv, yv]) =>
    `radial-gradient(circle at ${(xv + 0.5) * 100}% ${(yv + 0.5) * 100}%, rgba(229,9,20,0.14), transparent 60%)`
  );

  return (
    <div style={{ perspective: 1100 }}>
      {/* gradient hairline wrapper — reads as cut metal, not a flat CSS border */}
      <motion.div
        initial={{ opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5, delay: index * 0.06 }}
        animate={{ y: isHovered ? -8 : 0 }}
        className="relative rounded-3xl p-px transition-colors duration-500"
        style={{
          background: isHovered
            ? `linear-gradient(135deg, ${GOLD}55, rgba(255,255,255,0.06) 40%, ${RED}40)`
            : 'linear-gradient(135deg, rgba(255,255,255,0.08), rgba(255,255,255,0.02))',
        }}
      >
        <motion.article
          ref={ref}
          onMouseMove={handleMouseMove}
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={handleMouseLeave}
          style={{
            rotateX: isHovered ? rotateX : 0,
            rotateY: isHovered ? rotateY : 0,
            transformStyle: 'preserve-3d',
          }}
          className="relative overflow-hidden rounded-[inherit] bg-[#0B0B0C] p-8"
        >
          {/* cursor-tracked glow, single layer */}
          <motion.div
            className="pointer-events-none absolute inset-0 rounded-[inherit]"
            style={{ background: glow, opacity: isHovered ? 1 : 0, transition: 'opacity 0.35s' }}
          />

          {/* icon — slow rotating gold conic ring behind a static red chip */}
          <div style={{ transform: 'translateZ(36px)' }} className="relative mb-6 inline-flex h-12 w-12 items-center justify-center">
            <motion.span
              className="absolute inset-0 rounded-full opacity-70"
              style={{
                background: `conic-gradient(from 0deg, ${GOLD}, transparent 30%, transparent 70%, ${GOLD})`,
                mask: 'radial-gradient(farthest-side, transparent calc(100% - 1.5px), #000 calc(100% - 1.5px))',
                WebkitMask: 'radial-gradient(farthest-side, transparent calc(100% - 1.5px), #000 calc(100% - 1.5px))',
              }}
              animate={{ rotate: isHovered ? 360 : 0 }}
              transition={{ duration: 2.2, ease: 'linear', repeat: isHovered ? Infinity : 0 }}
            />
            <div className="relative flex h-9 w-9 items-center justify-center rounded-full bg-[#E50914]/12 text-[#E50914] border border-[#E50914]/20">
              <Icon size={18} />
            </div>
          </div>

          <h3 className="relative text-2xl text-white" style={{ transform: 'translateZ(22px)' }}>
            {item.title}
          </h3>

          {/* signature: red→gold underline draws in on hover, ties the two accents together */}
          <motion.div
            className="mt-2 h-px rounded-full"
            style={{ background: `linear-gradient(90deg, ${RED}, ${GOLD})` }}
            animate={{ width: isHovered ? 40 : 16, opacity: isHovered ? 1 : 0.4 }}
            transition={{ duration: 0.35 }}
          />

          <p className="relative mt-4 text-sm leading-7 text-[#A8A8A8]" style={{ transform: 'translateZ(14px)' }}>
            {item.description}
          </p>
        </motion.article>
      </motion.div>
    </div>
  );
};

const OurPlans = () => (
  <section className="relative overflow-hidden bg-transparent py-[120px] text-white">
    <div className="absolute inset-0" />
    <div className="section-shell relative">
      <div className="mb-12 max-w-3xl">
        <div className="mb-4 flex items-center gap-3">
          <span className="text-[11px] font-semibold uppercase tracking-[0.35em] text-[#E50914]">Why HAKIRUSH</span>
          <span className="h-px flex-1 max-w-[60px] bg-gradient-to-r from-[#E50914]/60 to-transparent" />
        </div>

        <h2 className="text-4xl sm:text-5xl lg:text-6xl">Premium Employee Engagement Built for Modern Organisations</h2>
        <p className="mt-4 max-w-2xl text-lg leading-8 text-[#A8A8A8]">
          HAKIRUSH brings together sport, culture, wellness and recognition in one premium platform for companies that want measurable engagement outcomes.
        </p>

        {/* trust chip — grounds the claim in real scale instead of just adjectives */}
        <div className="mt-6 inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.03] px-4 py-2 text-xs text-[#A8A8A8]">
          <BadgeCheck size={14} className="text-[#D4AF37]" />
          Trusted by 200+ companies across 12+ Indian cities
        </div>
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