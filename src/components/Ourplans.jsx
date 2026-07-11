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

const reasons = [
  {
    icon: Users2,
    title: 'Employee Engagement',
    description: 'Create meaningful daily participation through curated experiences that connect people across teams.',
  },
  {
    icon: Trophy,
    title: 'Team Building',
    description: 'Build trust, collaboration and stronger workplace relationships through competitive yet inclusive activites.',
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

/* ------------------------------------------------------------------ */
/*  3D CARD — tilts toward cursor, icon pops forward, glossy highlight */
/* ------------------------------------------------------------------ */
const ReasonCard3D = ({ item, index }) => {
  const { ref, x, y, rotateX, rotateY, isHovered, setIsHovered, handleMouseMove, handleMouseLeave } = useTilt(9);
  const Icon = item.icon;

  const glow = useTransform([x, y], ([xv, yv]) =>
    `radial-gradient(circle at ${(xv + 0.5) * 100}% ${(yv + 0.5) * 100}%, rgba(229,9,20,0.18), transparent 60%)`
  );

  return (
    <div style={{ perspective: 1000 }}>
      <motion.article
        initial={{ opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5, delay: index * 0.06 }}
        ref={ref}
        onMouseMove={handleMouseMove}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={handleMouseLeave}
        animate={{ y: isHovered ? -10 : 0 }}
        style={{
          rotateX: isHovered ? rotateX : 0,
          rotateY: isHovered ? rotateY : 0,
          transformStyle: 'preserve-3d',
        }}
        className="premium-card relative p-8 overflow-hidden"
      >
        {/* cursor-tracked glow */}
        <motion.div
          className="absolute inset-0 pointer-events-none rounded-[inherit]"
          style={{ background: glow, opacity: isHovered ? 1 : 0, transition: 'opacity 0.3s' }}
        />

        {/* top sheen for glass feel */}
        <div
          className="absolute inset-x-0 top-0 h-1/3 rounded-t-[inherit] bg-gradient-to-b from-white/[0.06] to-transparent pointer-events-none"
          style={{ transform: 'translateZ(1px)' }}
        />

        {/* deepened shadow under the card on hover, sells the lift */}
        <motion.div
          className="absolute -bottom-4 left-4 right-4 h-6 rounded-full bg-black/50 blur-xl pointer-events-none"
          animate={{ opacity: isHovered ? 0.55 : 0, scaleX: isHovered ? 1 : 0.85 }}
          style={{ transform: 'translateZ(-60px)' }}
        />

        {/* icon badge — pops forward furthest, gets its own extruded depth */}
        <div style={{ transform: 'translateZ(40px)', transformStyle: 'preserve-3d' }} className="relative mb-6 inline-flex">
          <motion.div
            animate={{ scale: isHovered ? 1.08 : 1, rotate: isHovered ? -4 : 0 }}
            transition={{ type: 'spring', stiffness: 300, damping: 18 }}
            className="relative inline-flex rounded-2xl bg-[#E50914]/12 p-3 text-[#E50914] border border-[#E50914]/20"
          >
            <span
              className="absolute inset-0 rounded-2xl bg-[#E50914]/25 blur-md"
              style={{ transform: 'translateZ(-6px)', opacity: isHovered ? 1 : 0, transition: 'opacity 0.3s' }}
            />
            <Icon size={22} className="relative" />
          </motion.div>
        </div>

        <h3
          className="text-2xl text-white relative"
          style={{ transform: 'translateZ(24px)' }}
        >
          {item.title}
        </h3>
        <p
          className="mt-3 text-sm leading-7 text-[#A8A8A8] relative"
          style={{ transform: 'translateZ(16px)' }}
        >
          {item.description}
        </p>

        {/* thin light edge on hover */}
        <div
          className="absolute inset-0 rounded-[inherit] border pointer-events-none transition-colors duration-300"
          style={{ borderColor: isHovered ? 'rgba(229,9,20,0.35)' : 'transparent' }}
        />
      </motion.article>
    </div>
  );
};

const OurPlans = () => (
  <section className="relative overflow-hidden bg-transparent py-[120px] text-white">
    <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(229,9,20,0.12),transparent_45%)]" />
    <div className="section-shell relative">
      <div className="mb-12 max-w-3xl">
        <div className="mb-4 text-[11px] font-semibold uppercase tracking-[0.35em] text-[#E50914]">Why HAKIRUSH</div>
        <h2 className="text-4xl sm:text-5xl lg:text-6xl">Premium Employee Engagement Built for Modern Organisations</h2>
        <p className="mt-4 text-lg leading-8 text-[#A8A8A8]">
          HAKIRUSH brings together sport, culture, wellness and recognition in one premium platform for companies that want measurable engagement outcomes.
        </p>
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