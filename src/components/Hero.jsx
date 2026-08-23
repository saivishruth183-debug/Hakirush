import React, { useRef, useMemo, useState, useEffect } from 'react';
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

/* ---------------------------------------------------------------
   SIGNATURE ELEMENT — Matchday Scoreboard
   Turns the "workplace vs disengagement" idea from the headline
   into an actual broadcast-style object: a live fixture card with
   a ticking clock, sitting in the corner like a TV score bug.
--------------------------------------------------------------- */
const MatchScoreboard = () => {
  const prefersReducedMotion = useReducedMotion();
  const [seconds, setSeconds] = useState(37 * 60 + 12); // starts mid-match

  useEffect(() => {
    if (prefersReducedMotion) return;
    const id = setInterval(() => setSeconds((s) => s + 1), 1000);
    return () => clearInterval(id);
  }, [prefersReducedMotion]);

  const mm = String(Math.floor(seconds / 60)).padStart(2, '0');
  const ss = String(seconds % 60).padStart(2, '0');
};

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
  const tickerItems = useMemo(() => [...stats, ...stats], []);

  return (
    <section
      ref={sectionRef}
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
          style={{ background: `linear-gradient(to top, ${PITCH}, ${PITCH}B3, ${PITCH}33)` }}
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

      {/* Scoreboard — desktop only, pinned like a broadcast overlay */}
      <div className="pointer-events-none absolute right-6 top-28 z-10 hidden lg:block xl:right-16">
        <div className="pointer-events-auto">
          <MatchScoreboard />
        </div>
      </div>

      {/* Content */}
      <motion.div
        className="relative flex min-h-screen flex-col justify-center px-6 pb-28 pt-32 sm:px-10 lg:px-16"
        style={{ opacity: contentOpacity, y: prefersReducedMotion ? 0 : contentY }}
      >
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: 'easeOut' }}
          className="max-w-3xl"
        >
          {/* Match-status badge */}
          <div
            className="mb-6 inline-flex items-center gap-2.5 rounded-full border px-4 py-1.5 backdrop-blur-sm"
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
              className="text-[11px] font-medium uppercase tracking-[0.25em]"
              style={{ fontFamily: "'IBM Plex Mono', monospace", color: SAGE }}
            >
              Live · Corporate Fixture
            </span>
          </div>

          <h1
            className="text-[3.2rem] leading-[0.98] sm:text-7xl lg:text-[5.5rem]"
            style={{ fontFamily: "'Big Shoulders Display', sans-serif", fontWeight: 700 }}
          >
            BUILDING STRONGER
            <br />
            WORKPLACES
            <br />
            <span style={{ color: SIGNAL }}>through sport</span>
          </h1>

          <p
            className="mt-8 max-w-xl text-lg leading-8"
            style={{ fontFamily: "'Inter', sans-serif", color: SAGE }}
          >
            HAKIRUSH helps organizations strengthen workplace culture through
            professionally managed corporate sports, employee engagement
            programs, team building experiences and workplace wellness
            initiatives.
          </p>

          {/* Compact scoreline — mobile/tablet substitute for the pinned scoreboard */}
          <div
            className="mt-8 inline-flex items-center gap-3 rounded-full border px-4 py-2 lg:hidden"
            style={{ borderColor: `${CREAM}1F`, backgroundColor: `${PITCH}80` }}
          >
            <span
              className="text-xs font-semibold uppercase tracking-wide"
              style={{ fontFamily: "'Inter', sans-serif" }}
            >
              Hakirush XI <span style={{ color: GOLD }}>04</span>
            </span>
            <span className="h-3 w-px" style={{ backgroundColor: `${CREAM}26` }} />
            <span
              className="text-xs font-semibold uppercase tracking-wide"
              style={{ fontFamily: "'Inter', sans-serif", color: SAGE }}
            >
              Disengagement <span className="opacity-70">00</span>
            </span>
          </div>

          <div className="mt-10 flex flex-wrap gap-4">
            <button
              onClick={() => navigate('/services')}
              className="group inline-flex cursor-pointer items-center gap-2 rounded-full px-7 py-3.5 text-sm font-semibold uppercase tracking-wide transition-transform hover:-translate-y-0.5 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2"
              style={{ backgroundColor: SIGNAL, color: CREAM, outlineColor: GOLD }}
            >
              Explore Solutions
              <ArrowRight size={16} className="transition-transform group-hover:translate-x-1" />
            </button>
            <button
              onClick={() => navigate('/contact')}
              className="cursor-pointer rounded-full border px-7 py-3.5 text-sm font-semibold uppercase tracking-wide transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2"
              style={{ borderColor: `${CREAM}40`, color: CREAM, outlineColor: GOLD }}
              onMouseEnter={(e) => (e.currentTarget.style.borderColor = `${CREAM}99`)}
              onMouseLeave={(e) => (e.currentTarget.style.borderColor = `${CREAM}40`)}
            >
              Schedule Consultation
            </button>
          </div>
        </motion.div>
      </motion.div>

      {/* Ticker */}
      <div
        className="absolute bottom-0 left-0 right-0 overflow-hidden border-t py-4 backdrop-blur-sm"
        style={{ borderColor: `${CREAM}1A`, backgroundColor: `${PITCH}CC` }}
      >
        <motion.div
          className="flex w-max gap-16 whitespace-nowrap [animation-play-state:running] hover:[animation-play-state:paused]"
          animate={prefersReducedMotion ? {} : { x: ['0%', '-50%'] }}
          transition={{ duration: 22, repeat: Infinity, ease: 'linear' }}
        >
          {tickerItems.map((stat, i) => (
            <div key={`${stat.label}-${i}`} className="flex items-baseline gap-3">
              <span
                className="text-xl"
                style={{ fontFamily: "'IBM Plex Mono', monospace", color: SIGNAL }}
              >
                {stat.value}
              </span>
              <span className="text-xs uppercase tracking-[0.2em]" style={{ color: SAGE }}>
                {stat.label}
              </span>
              <span className="ml-8" style={{ color: `${CREAM}33` }}>•</span>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default Hero;