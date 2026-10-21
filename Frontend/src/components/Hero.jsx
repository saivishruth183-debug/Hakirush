import React, { useEffect, useRef, useState } from 'react';
import {
  motion,
  AnimatePresence,
  useMotionValue,
  useScroll,
  useSpring,
  useTransform,
  useReducedMotion,
  useInView,
} from 'framer-motion';
import { ArrowRight, CalendarDays } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import heroVideo from '../assets/Hero/Cricket.mp4';

const PITCH = '#0E1712';
const CREAM = '#F5F3EC';
const SAGE = '#8B948C';
const SIGNAL = '#DC2626';
const GOLD = '#D9A441';
const EASE = [0.16, 1, 0.3, 1];

const FONT_DISPLAY = "'Big Shoulders Display', 'Oswald', sans-serif";
const FONT_MONO = "'IBM Plex Mono', monospace";
const FONT_BODY = "'Inter', sans-serif";

const HEADLINE = [
  { text: 'BUILDING', indentPct: 0, color: CREAM, drift: -140, depth: 30 },
  { text: 'WORKPLACES', indentPct: 7, color: CREAM, drift: 50, depth: 10 },
  { text: 'THROUGH SPORT', indentPct: 15, color: SIGNAL, drift: 240, depth: 60 },
];

// Sports the badge cycles through — taken from the HAKIRUSH calendar
const LIVE_SPORTS = ['Cricket', 'Football', 'Badminton', 'Table Tennis', 'Pickleball', 'Marathon'];

const STATS = [
  { value: '200+', label: 'Companies engaged' },
  { value: '12', label: 'Monthly experiences' },
  { value: '1000+', label: 'Pros per tournament' },
];

const MARQUEE = ['Corporate Cricket', 'Football Cup', 'Badminton Masters', 'Table Tennis League', 'Pickleball Open', 'Fitness Challenge', 'Corporate Marathon', 'Grand Finale'];

/* ------------------------------------------------------------------ */
/*  Fonts — loaded once, only if the app hasn't already                 */
/* ------------------------------------------------------------------ */

const useHeroFonts = () => {
  useEffect(() => {
    if (document.querySelector('link[data-hero-fonts]')) return;
    const link = document.createElement('link');
    link.rel = 'stylesheet';
    link.href =
      'https://fonts.googleapis.com/css2?family=Big+Shoulders+Display:wght@700;800;900&family=IBM+Plex+Mono:wght@400;500&family=Inter:wght@400;500;600&display=swap';
    link.setAttribute('data-hero-fonts', '');
    document.head.appendChild(link);
  }, []);
};

const useMediaQuery = (query) => {
  const [matches, setMatches] = useState(false);
  useEffect(() => {
    const mql = window.matchMedia(query);
    const update = () => setMatches(mql.matches);
    update();
    mql.addEventListener('change', update);
    return () => mql.removeEventListener('change', update);
  }, [query]);
  return matches;
};

/* ------------------------------------------------------------------ */
/*  Headline — letters flip up off a 3D hinge, one after another        */
/* ------------------------------------------------------------------ */

const HeadlineLine = ({ line, index, x, reduceMotion }) => {
  let letterIndex = 0;
  const base = 0.35 + index * 0.18;
  const words = line.text.split(' ');

  return (
    // the overflow mask sits on this wrapper; its z gives each line its own
    // depth plane, so the lines separate when the hero tilts
    <motion.span
      className="block overflow-hidden pb-[0.04em] leading-[0.95] sm:leading-[0.92]"
      style={{ z: reduceMotion ? 0 : line.depth }}
    >
      <motion.span
        className="block"
        style={{
          color: line.color,
          marginLeft: `min(${line.indentPct * 0.4}vw, ${line.indentPct}%)`,
          x,
          fontSize: 'clamp(2.4rem, 1rem + 5.8vw, 7rem)',
          letterSpacing: '-0.01em',
          textShadow: line.color === SIGNAL ? `0 0 48px ${SIGNAL}55` : '0 6px 40px rgba(0,0,0,0.45)',
        }}
      >
        {words.map((word, w) => (
          <React.Fragment key={w}>
            <span className="inline-block whitespace-nowrap">
              {word.split('').map((ch) => {
                const d = base + letterIndex++ * 0.028;
                return (
                  <motion.span
                    key={`${ch}-${d}`}
                    className="inline-block"
                    style={{ transformOrigin: '50% 100%', transformPerspective: 600 }}
                    initial={reduceMotion ? false : { y: '110%', rotateX: -90, opacity: 0 }}
                    animate={{ y: '0%', rotateX: 0, opacity: 1 }}
                    transition={{ duration: 0.9, delay: d, ease: EASE }}
                  >
                    {ch}
                  </motion.span>
                );
              })}
            </span>
            {w < words.length - 1 && ' '}
          </React.Fragment>
        ))}
      </motion.span>
    </motion.span>
  );
};

/* ------------------------------------------------------------------ */
/*  Live badge — sport name flips through the calendar                  */
/* ------------------------------------------------------------------ */

const LiveBadge = ({ reduceMotion }) => {
  const [i, setI] = useState(0);
  useEffect(() => {
    if (reduceMotion) return undefined;
    const t = setInterval(() => setI((v) => (v + 1) % LIVE_SPORTS.length), 2400);
    return () => clearInterval(t);
  }, [reduceMotion]);

  return (
    <motion.div
      initial={reduceMotion ? false : { opacity: 0, y: -10, rotateX: -60 }}
      animate={{ opacity: 1, y: 0, rotateX: 0 }}
      transition={{ duration: 0.7, ease: EASE }}
      style={{ transformPerspective: 600, borderColor: `${CREAM}26`, backgroundColor: `${PITCH}99` }}
      className="mb-8 inline-flex w-fit items-center gap-2.5 rounded-full border px-4 py-1.5 backdrop-blur-md sm:mb-10"
    >
      <span className="relative flex h-2 w-2">
        {!reduceMotion && (
          <span className="absolute inline-flex h-full w-full animate-ping rounded-full opacity-75" style={{ backgroundColor: SIGNAL }} />
        )}
        <span className="relative inline-flex h-2 w-2 rounded-full" style={{ backgroundColor: SIGNAL }} />
      </span>
      <span
        className="flex items-center gap-1.5 text-[10px] font-medium uppercase tracking-[0.2em] sm:text-[11px] sm:tracking-[0.25em]"
        style={{ fontFamily: FONT_MONO, color: SAGE }}
      >
        Live · Corporate
        <span className="relative inline-flex h-[1.3em] min-w-[9.5em] overflow-hidden" style={{ perspective: 400 }}>
          <AnimatePresence mode="popLayout" initial={false}>
            <motion.span
              key={LIVE_SPORTS[i]}
              className="absolute left-0 top-0 whitespace-nowrap"
              style={{ color: CREAM, transformOrigin: '50% 50% -8px' }}
              initial={{ rotateX: -90, opacity: 0 }}
              animate={{ rotateX: 0, opacity: 1 }}
              exit={{ rotateX: 90, opacity: 0 }}
              transition={{ duration: 0.5, ease: EASE }}
            >
              {LIVE_SPORTS[i]}
            </motion.span>
          </AnimatePresence>
        </span>
      </span>
    </motion.div>
  );
};

/* ------------------------------------------------------------------ */
/*  Magnetic buttons                                                    */
/* ------------------------------------------------------------------ */

const Magnetic = ({ children, strength = 10, disabled }) => {
  const ref = useRef(null);
  const x = useSpring(0, { stiffness: 300, damping: 20 });
  const y = useSpring(0, { stiffness: 300, damping: 20 });

  const onMove = (e) => {
    if (disabled || !ref.current) return;
    const r = ref.current.getBoundingClientRect();
    x.set(((e.clientX - r.left) / r.width - 0.5) * strength * 2);
    y.set(((e.clientY - r.top) / r.height - 0.5) * strength * 2);
  };
  const reset = () => {
    x.set(0);
    y.set(0);
  };

  return (
    <motion.div ref={ref} onPointerMove={onMove} onPointerLeave={reset} style={{ x, y }} className="inline-flex">
      {children}
    </motion.div>
  );
};

/* ------------------------------------------------------------------ */
/*  Rolling numbers                                                     */
/* ------------------------------------------------------------------ */

const RollingDigit = ({ char, play, delay, reduceMotion }) => {
  if (!/[0-9]/.test(char)) {
    return (
      <motion.span
        className="inline-block"
        style={{ height: '1em', lineHeight: '1em' }}
        initial={{ opacity: 0, y: 8 }}
        animate={play ? { opacity: 1, y: 0 } : { opacity: 0, y: 8 }}
        transition={{ duration: 0.35, delay: reduceMotion ? 0 : delay }}
      >
        {char}
      </motion.span>
    );
  }
  const target = Number(char);
  return (
    <span className="relative inline-block overflow-hidden align-bottom" style={{ height: '1em', lineHeight: '1em' }}>
      <span className="invisible">0</span>
      <motion.span
        className="absolute left-0 top-0"
        initial={{ y: 0 }}
        animate={reduceMotion || play ? { y: `-${target}em` } : { y: 0 }}
        transition={reduceMotion ? { duration: 0 } : { duration: 1.1, delay, ease: EASE }}
      >
        {Array.from({ length: 10 }).map((_, n) => (
          <span key={n} className="block" style={{ height: '1em' }}>
            {n}
          </span>
        ))}
      </motion.span>
    </span>
  );
};

const RollingNumber = ({ value, startDelay = 0 }) => {
  const ref = useRef(null);
  const reduceMotion = useReducedMotion();
  const inView = useInView(ref, { once: true });
  return (
    <span ref={ref} className="inline-flex tabular-nums">
      {value.split('').map((c, i) => (
        <RollingDigit key={i} char={c} play={inView} delay={startDelay + i * 0.08} reduceMotion={reduceMotion} />
      ))}
    </span>
  );
};

/* ------------------------------------------------------------------ */
/*  Corner frame — the same corner marks used on the cards              */
/* ------------------------------------------------------------------ */

const FrameCorner = ({ pos, delay, reduceMotion }) => {
  const place = {
    tl: 'left-4 top-20 border-l border-t sm:left-8 sm:top-24',
    tr: 'right-4 top-20 border-r border-t sm:right-8 sm:top-24',
    bl: 'bottom-4 left-4 border-b border-l sm:bottom-8 sm:left-8',
    br: 'bottom-4 right-4 border-b border-r sm:bottom-8 sm:right-8',
  }[pos];
  const from = { tl: [-14, -14], tr: [14, -14], bl: [-14, 14], br: [14, 14] }[pos];
  return (
    <motion.span
      aria-hidden
      className={`pointer-events-none absolute z-20 h-5 w-5 ${place}`}
      style={{ borderColor: pos === 'br' ? SIGNAL : `${GOLD}99` }}
      initial={reduceMotion ? false : { opacity: 0, x: from[0], y: from[1] }}
      animate={{ opacity: 1, x: 0, y: 0 }}
      transition={{ duration: 0.8, delay, ease: EASE }}
    />
  );
};

/* ------------------------------------------------------------------ */
/*  Hero                                                                */
/* ------------------------------------------------------------------ */

const Hero = () => {
  useHeroFonts();
  const navigate = useNavigate();
  const sectionRef = useRef(null);
  const reduceMotion = useReducedMotion();
  const canHover = useMediaQuery('(hover: hover) and (pointer: fine)');
  const pointerFx = canHover && !reduceMotion;

  /* ---- scroll: video zooms, content tips back and recedes ---- */
  const { scrollYProgress } = useScroll({ target: sectionRef, offset: ['start start', 'end start'] });
  const scroll = useSpring(scrollYProgress, { stiffness: 120, damping: 26, mass: 0.4 });

  const videoScale = useTransform(scroll, [0, 1], [1.06, 1.22]);
  const contentOpacity = useTransform(scroll, [0, 0.65], [1, 0]);
  const contentY = useTransform(scroll, [0, 1], ['0%', '14%']);
  const scrollTilt = useTransform(scroll, [0, 0.8], [0, 16]);
  const contentScale = useTransform(scroll, [0, 0.8], [1, 0.9]);
  const spineFill = useTransform(scroll, [0, 0.9], [0, 1]);
  const statsY = useTransform(scroll, [0, 0.6], [0, 60]);
  const statsOpacity = useTransform(scroll, [0, 0.45], [1, 0]);

  // one drift per line — fixed 3-item constant, so explicit hooks (no hooks in loops)
  const lineX0 = useTransform(scroll, [0, 0.75], reduceMotion ? [0, 0] : [0, HEADLINE[0].drift]);
  const lineX1 = useTransform(scroll, [0, 0.75], reduceMotion ? [0, 0] : [0, HEADLINE[1].drift]);
  const lineX2 = useTransform(scroll, [0, 0.75], reduceMotion ? [0, 0] : [0, HEADLINE[2].drift]);
  const lineXs = [lineX0, lineX1, lineX2];

  /* ---- pointer: the whole hero tilts toward the mouse, video counter-moves ---- */
  const mx = useMotionValue(0);
  const my = useMotionValue(0);
  const smx = useSpring(mx, { stiffness: 60, damping: 18 });
  const smy = useSpring(my, { stiffness: 60, damping: 18 });
  const tiltY = useTransform(smx, [-0.5, 0.5], [-5, 5]);
  const tiltX = useTransform([smy, scrollTilt], ([v, s]) => v * -6 + s);
  const videoX = useTransform(smx, [-0.5, 0.5], [22, -22]);
  const videoY = useTransform(smy, [-0.5, 0.5], [16, -16]);

  const onPointerMove = (e) => {
    if (!pointerFx) return;
    const r = sectionRef.current.getBoundingClientRect();
    mx.set((e.clientX - r.left) / r.width - 0.5);
    my.set((e.clientY - r.top) / r.height - 0.5);
  };
  const onPointerLeave = () => {
    mx.set(0);
    my.set(0);
  };

  const scrollToNext = () => {
    const el = sectionRef.current;
    if (el) window.scrollTo({ top: el.offsetTop + el.offsetHeight, behavior: reduceMotion ? 'auto' : 'smooth' });
  };

  return (
    <section
      ref={sectionRef}
      id="home-hero"
      data-cursor-ball="cricket"
      onPointerMove={onPointerMove}
      onPointerLeave={onPointerLeave}
      className="relative flex min-h-screen flex-col overflow-hidden"
      style={{ backgroundColor: PITCH, color: CREAM }}
    >
      {/* ---------------- video plane ---------------- */}
      <motion.div
        className="absolute inset-0"
        style={reduceMotion ? undefined : { scale: videoScale, x: pointerFx ? videoX : 0, y: pointerFx ? videoY : 0 }}
        initial={reduceMotion ? false : { opacity: 0, scale: 1.2 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1.6, ease: EASE }}
      >
        <video className="h-full w-full object-cover" src={heroVideo} autoPlay muted loop playsInline preload="auto" />
        {/* legibility wash — darkest behind the headline, opens up toward the top-right */}
        <div
          className="absolute inset-0"
          style={{
            background: `linear-gradient(to top, ${PITCH} 2%, ${PITCH}D9 32%, ${PITCH}80 62%, ${PITCH}40), linear-gradient(to right, ${PITCH}B3, transparent 65%)`,
          }}
        />
        <div className="absolute inset-0 bg-[#2F5233]/20 mix-blend-color" />
      </motion.div>

      {/* scanlines + vignette */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 opacity-[0.05]"
        style={{ backgroundImage: `repeating-linear-gradient(0deg, ${CREAM} 0px, ${CREAM} 1px, transparent 1px, transparent 3px)` }}
      />
      <div aria-hidden className="pointer-events-none absolute inset-0" style={{ boxShadow: 'inset 0 0 180px 40px rgba(0,0,0,0.55)' }} />

      {/* pitch crease lines — faint, drawn in on load */}
      <svg aria-hidden className="pointer-events-none absolute inset-0 h-full w-full" preserveAspectRatio="none" viewBox="0 0 100 100">
        {[
          ['M 62 100 L 74 0', 0.6],
          ['M 88 100 L 92 0', 0.75],
        ].map(([d, delay]) => (
          <motion.path
            key={d}
            d={d}
            stroke={CREAM}
            strokeOpacity="0.07"
            strokeWidth="0.15"
            fill="none"
            vectorEffect="non-scaling-stroke"
            initial={reduceMotion ? false : { pathLength: 0 }}
            animate={{ pathLength: 1 }}
            transition={{ duration: 1.8, delay, ease: EASE }}
          />
        ))}
      </svg>

      <FrameCorner pos="tl" delay={0.9} reduceMotion={reduceMotion} />
      <FrameCorner pos="tr" delay={1.0} reduceMotion={reduceMotion} />
      <FrameCorner pos="bl" delay={1.1} reduceMotion={reduceMotion} />
      <FrameCorner pos="br" delay={1.2} reduceMotion={reduceMotion} />

      {/* ---------------- left spine with scroll progress ---------------- */}
      <div className="pointer-events-none absolute bottom-24 left-8 top-24 hidden w-px lg:block" style={{ backgroundColor: `${CREAM}1F` }}>
        <motion.div
          className="absolute inset-x-0 top-0 h-full origin-top"
          style={{ scaleY: reduceMotion ? 0 : spineFill, background: `linear-gradient(${SIGNAL}, ${GOLD})` }}
        />
        <div
          className="absolute left-3 top-1/2 -translate-y-1/2 whitespace-nowrap text-[11px] font-medium uppercase tracking-[0.4em]"
          style={{ fontFamily: FONT_MONO, color: SAGE, writingMode: 'vertical-rl', transform: 'translateY(-50%) rotate(180deg)' }}
        >
          Hakirush · Corporate Sport
        </div>
      </div>

      {/* ---------------- content ---------------- */}
      <motion.div
        className="relative flex flex-1 flex-col justify-center px-6 pb-6 pt-24 sm:px-10 sm:pt-28 lg:px-24"
        style={{
          opacity: contentOpacity,
          y: reduceMotion ? 0 : contentY,
          perspective: 1200,
        }}
      >
        <motion.div
          style={
            reduceMotion
              ? undefined
              : {
                  rotateX: tiltX,
                  rotateY: pointerFx ? tiltY : 0,
                  scale: contentScale,
                  transformStyle: 'preserve-3d',
                  transformOrigin: '30% 60%',
                }
          }
        >
          <LiveBadge reduceMotion={reduceMotion} />

          <h1 style={{ fontFamily: FONT_DISPLAY, fontWeight: 800, transformStyle: 'preserve-3d' }} aria-label="Building workplaces through sport">
            {HEADLINE.map((line, i) => (
              <HeadlineLine key={line.text} line={line} index={i} x={lineXs[i]} reduceMotion={reduceMotion} />
            ))}
          </h1>

          {/* editorial subrow */}
          <motion.div
            initial={reduceMotion ? false : { opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 1.15, ease: EASE }}
            className="mt-8 flex flex-col gap-8 sm:mt-10 lg:flex-row lg:items-end lg:justify-between"
            style={{ z: reduceMotion ? 0 : 20 }}
          >
            <div className="flex max-w-md gap-4">
              <motion.span
                aria-hidden
                className="mt-2 w-px shrink-0 origin-top"
                style={{ background: `linear-gradient(${SIGNAL}, transparent)` }}
                initial={reduceMotion ? false : { scaleY: 0 }}
                animate={{ scaleY: 1 }}
                transition={{ duration: 1, delay: 1.3, ease: EASE }}
              />
              <p className="text-base leading-7 sm:text-lg sm:leading-8" style={{ fontFamily: FONT_BODY, color: '#B9C0BA' }}>
                HAKIRUSH helps organizations strengthen workplace culture through professionally managed corporate sports,
                employee engagement programs, team building experiences and workplace wellness initiatives.
              </p>
            </div>

            <div className="flex flex-wrap gap-3 sm:gap-4">
              <Magnetic disabled={!pointerFx}>
                <button
                  type="button"
                  onClick={() => navigate('/services')}
                  className="group relative inline-flex cursor-pointer items-center gap-2 overflow-hidden rounded-full px-6 py-3 text-xs font-semibold uppercase tracking-wide outline-none focus-visible:ring-2 focus-visible:ring-offset-2 sm:px-7 sm:py-3.5 sm:text-sm"
                  style={{
                    backgroundColor: SIGNAL,
                    color: CREAM,
                    boxShadow: `0 14px 36px -12px ${SIGNAL}CC, inset 0 1px 0 rgba(255,255,255,0.25)`,
                    '--tw-ring-color': GOLD,
                    '--tw-ring-offset-color': PITCH,
                  }}
                >
                  <span className="absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/30 to-transparent transition-transform duration-700 group-hover:translate-x-full" />
                  <span className="relative">Explore Solutions</span>
                  <ArrowRight size={16} className="relative transition-transform duration-300 group-hover:translate-x-1" />
                </button>
              </Magnetic>

              <Magnetic disabled={!pointerFx}>
                <button
                  type="button"
                  onClick={() => navigate('/contact')}
                  className="group inline-flex cursor-pointer items-center gap-2 rounded-full border px-6 py-3 text-xs font-semibold uppercase tracking-wide outline-none backdrop-blur-md transition-colors duration-300 hover:bg-white/10 focus-visible:ring-2 focus-visible:ring-offset-2 sm:px-7 sm:py-3.5 sm:text-sm"
                  style={{
                    borderColor: `${CREAM}40`,
                    color: CREAM,
                    backgroundColor: `${PITCH}66`,
                    '--tw-ring-color': GOLD,
                    '--tw-ring-offset-color': PITCH,
                  }}
                >
                  <CalendarDays size={15} className="transition-colors duration-300 group-hover:text-[#D9A441]" />
                  Schedule Consultation
                </button>
              </Magnetic>
            </div>
          </motion.div>
        </motion.div>
      </motion.div>

      {/* ---------------- scoreboard strip ---------------- */}
      <motion.div
        className="relative z-10"
        style={reduceMotion ? undefined : { y: statsY, opacity: statsOpacity }}
        initial={reduceMotion ? false : { opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.9, delay: 1.4, ease: EASE }}
      >
        <div className="mx-6 mb-6 flex items-end justify-between gap-4 sm:mx-10 lg:mx-24">
          <div
            className="grid flex-1 grid-cols-3 divide-x overflow-hidden rounded-2xl border backdrop-blur-md sm:max-w-xl"
            style={{ borderColor: `${CREAM}1F`, backgroundColor: `${PITCH}B3`, '--tw-divide-opacity': 1 }}
          >
            {STATS.map((s, i) => (
              <div key={s.label} className="px-3 py-3 sm:px-5 sm:py-4" style={{ borderColor: `${CREAM}14` }}>
                <div className="text-xl font-bold sm:text-3xl" style={{ fontFamily: FONT_DISPLAY, color: i === 0 ? SIGNAL : CREAM }}>
                  <RollingNumber value={s.value} startDelay={1.6 + i * 0.15} />
                </div>
                <div className="mt-1 text-[9px] uppercase tracking-[0.18em] sm:text-[10px] sm:tracking-[0.22em]" style={{ fontFamily: FONT_MONO, color: SAGE }}>
                  {s.label}
                </div>
              </div>
            ))}
          </div>

          {/* scroll cue — a ball drops down the line, on loop */}
          <button
            type="button"
            onClick={scrollToNext}
            aria-label="Scroll to next section"
            className="hidden shrink-0 flex-col items-center gap-2 rounded-full p-2 outline-none focus-visible:ring-2 sm:flex"
            style={{ '--tw-ring-color': GOLD }}
          >
            <span className="text-[10px] uppercase tracking-[0.3em]" style={{ fontFamily: FONT_MONO, color: SAGE }}>
              Scroll
            </span>
            <span className="relative block h-14 w-px overflow-hidden" style={{ backgroundColor: `${CREAM}26` }}>
              <motion.span
                className="absolute left-1/2 top-0 block h-2 w-2 -translate-x-1/2 rounded-full"
                style={{ background: `radial-gradient(circle at 35% 30%, #ff8080, ${SIGNAL} 60%, #6b0b0b)`, boxShadow: `0 0 8px ${SIGNAL}` }}
                animate={reduceMotion ? undefined : { y: [-8, 56], opacity: [0, 1, 1, 0] }}
                transition={{ duration: 1.6, repeat: Infinity, ease: 'easeIn' }}
              />
            </span>
          </button>
        </div>

        {/* fixture marquee */}
        <div className="relative overflow-hidden border-t py-2.5" style={{ borderColor: `${CREAM}14`, backgroundColor: `${PITCH}CC` }}>
          <motion.div
            className="flex w-max gap-10 whitespace-nowrap"
            animate={reduceMotion ? undefined : { x: ['0%', '-50%'] }}
            transition={{ duration: 38, repeat: Infinity, ease: 'linear' }}
          >
            {[...MARQUEE, ...MARQUEE].map((item, i) => (
              <span
                key={i}
                className="flex items-center gap-10 text-[10px] font-medium uppercase tracking-[0.35em] sm:text-[11px]"
                style={{ fontFamily: FONT_MONO, color: SAGE }}
              >
                {item}
                <span className="h-1 w-1 rounded-full" style={{ backgroundColor: i % 3 === 0 ? SIGNAL : GOLD }} />
              </span>
            ))}
          </motion.div>
          <div className="pointer-events-none absolute inset-y-0 left-0 w-16" style={{ background: `linear-gradient(to right, ${PITCH}, transparent)` }} />
          <div className="pointer-events-none absolute inset-y-0 right-0 w-16" style={{ background: `linear-gradient(to left, ${PITCH}, transparent)` }} />
        </div>
      </motion.div>
    </section>
  );
};

export default Hero;