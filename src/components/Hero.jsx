import React, { useRef, useMemo } from 'react';
import { motion, useScroll, useTransform, useReducedMotion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import heroVideo from '../assets/Hero/Cricket.mp4';

const PITCH = '#0E1712';
const CREAM = '#F5F3EC';
const SAGE = '#8B948C';
const SIGNAL = '#DC2626';
const GOLD = '#D9A441';

const stats = [
  { value: '25K+', label: 'EMPLOYEES ENGAGED' },
  { value: '180+', label: 'ACTIVITIES CONDUCTED' },
  { value: '120+', label: 'CORPORATE CLIENTS' },
  { value: '18', label: 'CITIES SERVED' },
];

const HEADLINE = [
  { text: 'BUILDING', indentPct: 0, color: CREAM, drift: -140 },
  { text: 'WORKPLACES', indentPct: 7, color: CREAM, drift: 50 },
  { text: 'THROUGH SPORT', indentPct: 15, color: SIGNAL, drift: 240 },
];

const lineVariants = {
  hidden: { clipPath: 'inset(0 0 0 100%)', filter: 'blur(16px)', opacity: 0 },
  visible: (i) => ({
    clipPath: 'inset(0 0 0 0%)',
    filter: 'blur(0px)',
    opacity: 1,
    transition: { duration: 1, delay: 0.35 + i * 0.16, ease: [0.16, 1, 0.3, 1] },
  }),
};

const SectionLabel = ({ children }) => (
  <div className="flex items-center gap-2.5">
    <span className="h-1.5 w-1.5 rounded-full" style={{ backgroundColor: CREAM }} />
    <span
      className="text-[11px] font-medium uppercase tracking-[0.3em]"
      style={{ fontFamily: "'IBM Plex Mono', monospace", color: SAGE }}
    >
      {children}
    </span>
  </div>
);

const Hero = () => {
  const navigate = useNavigate();
  const sectionRef = useRef(null);
  const prefersReducedMotion = useReducedMotion();

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start start', 'end start'],
  });

  const videoScale = useTransform(scrollYProgress, [0, 1], [1, 1.12]);
  const contentOpacity = useTransform(scrollYProgress, [0, 0.7], [1, 0]);
  const contentY = useTransform(scrollYProgress, [0, 1], ['0%', '12%']);

  // One scroll-linked horizontal drift per headline line. HEADLINE is a
  // fixed 3-item constant, so three explicit hooks keep the rules-of-hooks
  // guarantee (never call hooks inside .map/loops).
  const lineX0 = useTransform(scrollYProgress, [0, 0.75], prefersReducedMotion ? [0, 0] : [0, HEADLINE[0].drift]);
  const lineX1 = useTransform(scrollYProgress, [0, 0.75], prefersReducedMotion ? [0, 0] : [0, HEADLINE[1].drift]);
  const lineX2 = useTransform(scrollYProgress, [0, 0.75], prefersReducedMotion ? [0, 0] : [0, HEADLINE[2].drift]);
  const lineXs = [lineX0, lineX1, lineX2];

  const tickerItems = useMemo(() => [...stats, ...stats], []);

  return (
    <section
      ref={sectionRef}
      id="home-hero"
      className="relative min-h-screen overflow-hidden"
      style={{ backgroundColor: PITCH, color: CREAM }}
    >
      {/* Video plane */}
      <motion.div
        className="absolute inset-0"
        style={{ scale: prefersReducedMotion ? 1 : videoScale }}
      >
        <video
          className="h-full w-full object-cover"
          src={heroVideo}
          autoPlay
          muted
          loop
          playsInline
        />
        <div
          className="absolute inset-0 mix-blend-multiply"
          style={{ background: `linear-gradient(to top, ${PITCH}, ${PITCH}CC 45%, ${PITCH}55)` }}
        />
        <div className="absolute inset-0 bg-[#2F5233]/25 mix-blend-color" />
      </motion.div>

      <div
        className="pointer-events-none absolute -top-24 right-0 h-[520px] w-[520px] rounded-full blur-[80px]"
        style={{ background: `radial-gradient(circle, ${SIGNAL}33, transparent 70%)` }}
      />
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.05]"
        style={{
          backgroundImage: `repeating-linear-gradient(0deg, ${CREAM} 0px, ${CREAM} 1px, transparent 1px, transparent 3px)`,
        }}
      />

      {/* Left spine — runs the full height, quiet structural signature */}
      <div className="pointer-events-none absolute bottom-24 left-8 top-24 hidden w-px lg:block" style={{ backgroundColor: `${CREAM}1F` }}>
        <div
          className="absolute -left-[9px] top-1/2 -translate-y-1/2 -rotate-90 whitespace-nowrap text-[11px] font-medium uppercase tracking-[0.4em]"
          style={{ fontFamily: "'IBM Plex Mono', monospace", color: SAGE }}
        >
          Hakirush · Corporate Sport
        </div>
      </div>

      {/* Content */}
      <motion.div
        className="relative flex min-h-screen flex-col justify-center px-6 pb-28 pt-24 sm:px-10 sm:pt-32 lg:px-24"
        style={{ opacity: contentOpacity, y: prefersReducedMotion ? 0 : contentY }}
      >
        {/* Match-status badge */}
        <motion.div
          initial={{ opacity: 0, y: -8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: 'easeOut' }}
          className="mb-8 inline-flex w-fit items-center gap-2.5 rounded-full border px-4 py-1.5 backdrop-blur-sm sm:mb-10"
          style={{ borderColor: `${CREAM}26`, backgroundColor: `${PITCH}99` }}
        >
          <span className="relative flex h-2 w-2">
            {!prefersReducedMotion && (
              <span
                className="absolute inline-flex h-full w-full animate-ping rounded-full opacity-75"
                style={{ backgroundColor: SIGNAL }}
              />
            )}
            <span className="relative inline-flex h-2 w-2 rounded-full" style={{ backgroundColor: SIGNAL }} />
          </span>
          <span
            className="text-[10px] font-medium uppercase tracking-[0.2em] sm:text-[11px] sm:tracking-[0.25em]"
            style={{ fontFamily: "'IBM Plex Mono', monospace", color: SAGE }}
          >
            Live · Corporate Fixture
          </span>
        </motion.div>

        <h1 style={{ fontFamily: "'Big Shoulders Display', sans-serif", fontWeight: 700 }}>
          {HEADLINE.map((line, i) => (
            <span key={line.text} className="block overflow-hidden leading-[0.95] sm:leading-[0.92]">
              <motion.span
                custom={i}
                variants={lineVariants}
                initial="hidden"
                animate="visible"
                className="block whitespace-normal break-words sm:whitespace-nowrap"
                style={{
                  color: line.color,
                  marginLeft: `min(${line.indentPct * 0.4}vw, ${line.indentPct}%)`,
                  x: lineXs[i],
                  fontSize: 'clamp(1.5rem, 1rem + 4.5vw, 6.25rem)',
                  letterSpacing: '-0.01em',
                }}
              >
                {line.text}
              </motion.span>
            </span>
          ))}
        </h1>

        {/* Editorial subrow — copy and CTAs share a baseline instead of stacking centered */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 1.05, ease: 'easeOut' }}
          className="mt-10 flex flex-col gap-8 sm:mt-12 lg:flex-row lg:items-end lg:justify-between"
        >
          <p
            className="max-w-md text-base leading-7 sm:text-lg sm:leading-8"
            style={{ fontFamily: "'Inter', sans-serif", color: SAGE }}
          >
            HAKIRUSH helps organizations strengthen workplace culture through
            professionally managed corporate sports, employee engagement
            programs, team building experiences and workplace wellness
            initiatives.
          </p>

          <div className="flex flex-wrap gap-3 sm:gap-4">
            <button
              onClick={() => navigate('/services')}
              className="group inline-flex cursor-pointer items-center gap-2 rounded-full px-6 py-3 text-xs font-semibold uppercase tracking-wide transition-transform hover:-translate-y-0.5 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 sm:px-7 sm:py-3.5 sm:text-sm"
              style={{ backgroundColor: SIGNAL, color: CREAM, outlineColor: GOLD }}
            >
              Explore Solutions
              <ArrowRight size={16} className="transition-transform group-hover:translate-x-1" />
            </button>
            <button
              onClick={() => navigate('/contact')}
              className="cursor-pointer rounded-full border px-6 py-3 text-xs font-semibold uppercase tracking-wide transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 sm:px-7 sm:py-3.5 sm:text-sm"
              style={{ borderColor: `${CREAM}40`, color: CREAM, outlineColor: GOLD }}
              onMouseEnter={(e) => (e.currentTarget.style.borderColor = `${CREAM}99`)}
              onMouseLeave={(e) => (e.currentTarget.style.borderColor = `${CREAM}40`)}
            >
              Schedule Consultation
            </button>
          </div>
        </motion.div>
      </motion.div>
    </section>
  );
};

export default Hero;