import React, { useRef, useMemo } from 'react';
import { motion, useScroll, useTransform, useReducedMotion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import heroVideo from '../assets/Hero/Cricket.mp4';

/*
  DESIGN TOKENS (add once, e.g. in index.html <head> or index.css)

  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link href="https://fonts.googleapis.com/css2?family=Big+Shoulders+Display:wght@600;700;800&family=Inter:wght@400;500;600&family=IBM+Plex+Mono:wght@500&display=swap" rel="stylesheet">

  Palette:
    --turf-ink:      #0E1712   (background)
    --chalk:         #F5F3EC   (primary text / lines)
    --brick:         #C1392B   (primary accent — headline, CTA, ticker digits)
    --pitch-green:   #2F5233   (secondary accent — live-status dot)
    --steel:         #8B948C   (muted captions)
*/

const stats = [
  { value: '25K+', label: 'EMPLOYEES ENGAGED' },
  { value: '180+', label: 'ACTIVITIES CONDUCTED' },
  { value: '120+', label: 'CORPORATE CLIENTS' },
  { value: '18', label: 'CITIES SERVED' },
];

const Hero = () => {
  const navigate = useNavigate();
  const sectionRef = useRef(null);
  const prefersReducedMotion = useReducedMotion();

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start start', 'end start'],
  });

  // One deliberate motion idea: the video breathes in slowly, like a
  // broadcast camera easing toward the pitch. Nothing else moves with scroll.
  const videoScale = useTransform(scrollYProgress, [0, 1], [1, 1.12]);
  const contentOpacity = useTransform(scrollYProgress, [0, 0.7], [1, 0]);
  const contentY = useTransform(scrollYProgress, [0, 1], ['0%', '12%']);

  // Ticker content, duplicated once for a seamless marquee loop.
  const tickerItems = useMemo(() => [...stats, ...stats], []);

  return (
    <section
      ref={sectionRef}
      className="relative min-h-screen overflow-hidden bg-[#0E1712] text-[#F5F3EC]"
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
        {/* Duotone turf wash — replaces a generic dark gradient with the
            two colors actually in the palette, so the video reads as part
            of the same world as the type and UI, not a stock clip laid on top. */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#0E1712] via-[#0E1712]/70 to-[#0E1712]/20 mix-blend-multiply" />
        <div className="absolute inset-0 bg-[#2F5233]/25 mix-blend-color" />
      </motion.div>

      {/* Floodlight glow — a single soft light source, top-right, like a
          stadium floodlight catching the corner of the frame. */}
      <div className="pointer-events-none absolute -top-24 right-0 h-[520px] w-[520px] rounded-full bg-[radial-gradient(circle,rgba(193,57,43,0.20),transparent_70%)] blur-[80px]" />

      {/* Faint scoreboard scanlines — a texture, not decoration: it ties
          the panel behind the copy to an actual scoreboard display. */}
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.05]"
        style={{
          backgroundImage:
            'repeating-linear-gradient(0deg, #F5F3EC 0px, #F5F3EC 1px, transparent 1px, transparent 3px)',
        }}
      />

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
          {/* Match-status badge, standing in for the generic "icon + label" pill */}
          <div className="mb-6 inline-flex items-center gap-2.5 rounded-full border border-[#F5F3EC]/15 bg-[#0E1712]/60 px-4 py-1.5 backdrop-blur-sm">
            <span className="relative flex h-2 w-2">
              {!prefersReducedMotion && (
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-[#2F5233] opacity-75" />
              )}
              <span className="relative inline-flex h-2 w-2 rounded-full bg-[#2F5233]" />
            </span>
            <span
              className="text-[11px] font-medium uppercase tracking-[0.25em] text-[#8B948C]"
              style={{ fontFamily: "'IBM Plex Mono', monospace" }}
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
            <span className="relative inline-block text-[#C1392B]">
              through sport.
              {/* Hand-drawn underline — a scorer circling a boundary on a scorecard */}
              <svg
                className="absolute -bottom-3 left-0 w-full"
                height="14"
                viewBox="0 0 320 14"
                fill="none"
                preserveAspectRatio="none"
              >
                <path
                  d="M2 8C60 2 140 2 200 6C240 8.5 280 8 318 5"
                  stroke="#C1392B"
                  strokeWidth="3"
                  strokeLinecap="round"
                />
              </svg>
            </span>
          </h1>

          <p
            className="mt-8 max-w-xl text-lg leading-8 text-[#8B948C]"
            style={{ fontFamily: "'Inter', sans-serif" }}
          >
            HAKIRUSH helps organizations strengthen workplace culture through
            professionally managed corporate sports, employee engagement
            programs, team building experiences and workplace wellness
            initiatives.
          </p>

          <div className="mt-10 flex flex-wrap gap-4">
            <button
              onClick={() => navigate('/services')}
              className="group inline-flex cursor-pointer items-center gap-2 rounded-full bg-[#C1392B] px-7 py-3.5 text-sm font-semibold uppercase tracking-wide text-[#0E1712] transition-transform hover:-translate-y-0.5"
            >
              Explore Solutions
              <ArrowRight size={16} className="transition-transform group-hover:translate-x-1" />
            </button>
            <button
              onClick={() => navigate('/contact')}
              className="cursor-pointer rounded-full border border-[#F5F3EC]/25 px-7 py-3.5 text-sm font-semibold uppercase tracking-wide text-[#F5F3EC] transition-colors hover:border-[#F5F3EC]/60"
            >
              Schedule Consultation
            </button>
          </div>
        </motion.div>
      </motion.div>

      {/* Scoreboard ticker — the signature element. A real stadium LED
          ticker, not a static stat grid: numbers move the way a scoreboard
          actually behaves. Pauses on hover and under reduced-motion. */}
      <div className="absolute bottom-0 left-0 right-0 overflow-hidden border-t border-[#F5F3EC]/10 bg-[#0E1712]/80 py-4 backdrop-blur-sm">
        <motion.div
          className="flex w-max gap-16 whitespace-nowrap [animation-play-state:running] hover:[animation-play-state:paused]"
          animate={prefersReducedMotion ? {} : { x: ['0%', '-50%'] }}
          transition={{ duration: 22, repeat: Infinity, ease: 'linear' }}
        >
          {tickerItems.map((stat, i) => (
            <div key={`${stat.label}-${i}`} className="flex items-baseline gap-3">
              <span
                className="text-xl text-[#C1392B]"
                style={{ fontFamily: "'IBM Plex Mono', monospace" }}
              >
                {stat.value}
              </span>
              <span className="text-xs uppercase tracking-[0.2em] text-[#8B948C]">
                {stat.label}
              </span>
              <span className="ml-8 text-[#F5F3EC]/20">•</span>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default Hero;