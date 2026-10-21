import React, { useEffect, useRef, useState, createContext, useContext } from 'react';
import {
  motion,
  useMotionValue,
  useSpring,
  useTransform,
  useMotionTemplate,
  useReducedMotion,
  useInView,
  useScroll,
} from 'framer-motion';
import { Link } from 'react-router-dom';
import { Trophy, Users, Store, ShoppingBag, CheckCircle2, TrendingUp, ArrowUpRight, Crown, ScanLine } from 'lucide-react';

const FONT_DISPLAY = "'Oswald', 'Arial Narrow', sans-serif";
const FONT_MONO = "'JetBrains Mono', 'IBM Plex Mono', monospace";
const FONT_BODY = "'Inter', sans-serif";

const PITCH = '#10241A';
const PITCH_DEEP = '#0A160F';
const CHALK = '#F5F1E6';
const FLARE = '#E50914';
const TURF = '#3D8B5F';
const FOIL = '#C9A24B';
const GOLD = '#D4AF37';

const EASE = [0.22, 1, 0.36, 1];
// Scroll-scrub smoothing: follows the scrollbar, irons out wheel steps
const SCRUB = { stiffness: 120, damping: 26, mass: 0.4 };

const FontImports = () => (
  <style>{`
    @import url('https://fonts.googleapis.com/css2?family=Oswald:wght@400;500;600;700&family=Inter:wght@400;500;600&family=JetBrains+Mono:wght@400;500;600&display=swap');

  `}</style>
);

/* ------------------------------------------------------------------ */
/*  Hooks                                                               */
/* ------------------------------------------------------------------ */

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

// Pointer tilt — ref goes on a NON-rotating wrapper so the measured rect
// stays stable while the card inside rotates.
const useTilt = (strength = 10, disabled = false) => {
  const ref = useRef(null);
  const [isHovered, setIsHovered] = useState(false);
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const spring = { stiffness: 220, damping: 20, mass: 0.6 };
  const rotateX = useSpring(useTransform(y, [-0.5, 0.5], [strength, -strength]), spring);
  const rotateY = useSpring(useTransform(x, [-0.5, 0.5], [-strength, strength]), spring);

  const onPointerMove = (e) => {
    if (disabled || !ref.current || e.pointerType === 'touch') return;
    const rect = ref.current.getBoundingClientRect();
    x.set((e.clientX - rect.left) / rect.width - 0.5);
    y.set((e.clientY - rect.top) / rect.height - 0.5);
  };
  const onPointerEnter = (e) => {
    if (disabled || e.pointerType === 'touch') return;
    setIsHovered(true);
  };
  const onPointerLeave = () => {
    x.set(0);
    y.set(0);
    setIsHovered(false);
  };

  return { ref, x, y, rotateX, rotateY, isHovered, handlers: { onPointerMove, onPointerEnter, onPointerLeave } };
};

// Mirrors the Tailwind grid breakpoints so stagger order matches layout
const useResponsiveCols = (breakpoints) => {
  const getCols = () => {
    if (typeof window === 'undefined') return breakpoints[0].cols;
    const w = window.innerWidth;
    let cols = breakpoints[0].cols;
    for (const bp of breakpoints) if (w >= bp.min) cols = bp.cols;
    return cols;
  };
  const [cols, setCols] = useState(getCols);

  useEffect(() => {
    let frame = null;
    const onResize = () => {
      if (frame) cancelAnimationFrame(frame);
      frame = requestAnimationFrame(() => setCols(getCols()));
    };
    onResize();
    window.addEventListener('resize', onResize);
    return () => {
      window.removeEventListener('resize', onResize);
      if (frame) cancelAnimationFrame(frame);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return cols;
};

const TIER_BREAKPOINTS = [
  { min: 0, cols: 1 },
  { min: 640, cols: 2 },
  { min: 1024, cols: 4 },
];

/* Depth layers: content sits on real Z planes that pop as the card lands */
const DepthContext = createContext(null);

const Layer = ({ depth = 20, as = 'div', className = '', style, children }) => {
  const pop = useContext(DepthContext);
  const reduceMotion = useReducedMotion();
  const z = useTransform(pop, (v) => v * depth);
  const Comp = motion[as];
  return (
    <Comp className={className} style={{ ...style, z: reduceMotion ? depth : z, transformStyle: 'preserve-3d' }}>
      {children}
    </Comp>
  );
};

/* ------------------------------------------------------------------ */
/*  Signature pieces                                                    */
/* ------------------------------------------------------------------ */

const CornerMark = ({ corner, active, accent = FLARE }) => {
  const pos = {
    tl: 'top-3 left-3 border-t border-l',
    tr: 'top-3 right-3 border-t border-r',
    bl: 'bottom-3 left-3 border-b border-l',
    br: 'bottom-3 right-3 border-b border-r',
  }[corner];
  const d = active ? 3 : 0;
  const shift = { tl: { x: -d, y: -d }, tr: { x: d, y: -d }, bl: { x: -d, y: d }, br: { x: d, y: d } }[corner];

  return (
    <motion.span
      className={`pointer-events-none absolute z-10 h-3.5 w-3.5 ${pos}`}
      initial={false}
      animate={{
        ...shift,
        z: active ? 30 : 8,
        opacity: active ? 1 : 0.5,
        borderColor: active ? accent : 'rgba(212,175,55,0.35)',
      }}
      transition={{ duration: 0.35, ease: 'easeOut' }}
    />
  );
};

/* ------------------------------------------------------------------ */
/*  Text animation                                                      */
/* ------------------------------------------------------------------ */

const ScrollRevealWord = ({ word, index, total, scrollYProgress }) => {
  const start = index / total;
  const end = start + 1 / total;
  const opacity = useTransform(scrollYProgress, [start, end], [0.25, 1]);
  const color = useTransform(scrollYProgress, [start, end], ['rgba(245,241,230,0.35)', 'rgba(245,241,230,1)']);
  return (
    <motion.span style={{ opacity, color }} className="inline-block">
      {word}
      {' '}
    </motion.span>
  );
};

const ScrollRevealText = ({ text, className = '' }) => {
  const ref = useRef(null);
  const reduceMotion = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start 0.9', 'start 0.25'] });
  const words = text.split(' ');

  if (reduceMotion) {
    return (
      <p ref={ref} className={className}>
        {text}
      </p>
    );
  }
  return (
    <p ref={ref} className={className}>
      {words.map((word, i) => (
        <ScrollRevealWord key={i} word={word} index={i} total={words.length} scrollYProgress={scrollYProgress} />
      ))}
    </p>
  );
};

// Words flip up from a 3D hinge. The trigger sits on the whole heading —
// a word hidden inside an overflow mask never counts as "in view".
const RiseWords = ({ text, style, delayOffset = 0, play }) => {
  const reduceMotion = useReducedMotion();
  const shown = reduceMotion || play;
  const hidden = { y: '105%', rotateX: -75, opacity: 0 };

  return text.split(' ').map((word, i) => (
    <React.Fragment key={i}>
      <span className="inline-block overflow-hidden pb-[0.08em] align-bottom" style={{ perspective: 600 }}>
        <motion.span
          className="inline-block"
          style={{ transformOrigin: '50% 100%', ...style }}
          initial={reduceMotion ? false : hidden}
          animate={shown ? { y: '0%', rotateX: 0, opacity: 1 } : hidden}
          transition={{ duration: 0.85, delay: shown ? delayOffset + i * 0.07 : 0, ease: EASE }}
        >
          {word}
        </motion.span>
      </span>{' '}
    </React.Fragment>
  ));
};

const HeroHeading = () => {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, amount: 0.2 });
  return (
    <h1
      ref={ref}
      className="text-4xl uppercase leading-[0.92] tracking-tight md:text-6xl"
      style={{ fontFamily: FONT_DISPLAY, fontWeight: 700 }}
    >
      <RiseWords text="Get Your" play={inView} />
      <br />
      <RiseWords text="Access Level." style={{ color: FLARE }} delayOffset={0.2} play={inView} />
    </h1>
  );
};

/* ------------------------------------------------------------------ */
/*  Rolling numbers (re-roll every time they enter view)                */
/* ------------------------------------------------------------------ */

const DIGIT_HEIGHT_EM = 1;

const RollingDigit = ({ char, play, delay }) => {
  const reduceMotion = useReducedMotion();
  if (!/[0-9]/.test(char)) {
    return (
      <motion.span
        className="inline-block"
        initial={{ opacity: 0, y: 8 }}
        animate={play ? { opacity: 1, y: 0 } : { opacity: 0, y: 8 }}
        transition={{ duration: 0.35, delay: reduceMotion ? 0 : delay, ease: 'easeOut' }}
      >
        {char}
      </motion.span>
    );
  }
  const target = Number(char);
  return (
    <span
      className="relative inline-block overflow-hidden align-bottom"
      style={{ height: `${DIGIT_HEIGHT_EM}em`, lineHeight: `${DIGIT_HEIGHT_EM}em` }}
    >
      <span className="invisible">0</span>
      <motion.span
        className="absolute left-0 top-0"
        initial={{ y: 0 }}
        animate={reduceMotion || play ? { y: `-${target * DIGIT_HEIGHT_EM}em` } : { y: 0 }}
        transition={reduceMotion ? { duration: 0 } : { duration: 0.9, delay, ease: EASE }}
      >
        {Array.from({ length: 10 }).map((_, n) => (
          <span key={n} className="block" style={{ height: `${DIGIT_HEIGHT_EM}em` }}>
            {n}
          </span>
        ))}
      </motion.span>
    </span>
  );
};

const RollingNumber = ({ value, className = '' }) => {
  const ref = useRef(null);
  const inView = useInView(ref, { once: false, margin: '-10% 0px -10% 0px' });
  return (
    <span ref={ref} className={`inline-flex tabular-nums ${className}`}>
      {String(value)
        .split('')
        .map((char, i) => (
          <RollingDigit key={i} char={char} play={inView} delay={i * 0.08} />
        ))}
    </span>
  );
};

/* ------------------------------------------------------------------ */
/*  Data                                                                */
/* ------------------------------------------------------------------ */

const MotionLink = motion.create(Link);

const sponsorTiers = [
  { href: '/sponsor/titlesponser', icon: Crown, code: 'TS·01', access: 'All-Access', title: 'Title Sponsor', desc: 'Premium branding across kits, trophies, and reels', accent: FOIL, flagship: true },
  { href: '/sponsor/cosponser', icon: Users, code: 'CS·02', access: 'Field Access', title: 'Co-Sponsor', desc: 'Prominent logo placement, shoutouts, and banners', accent: '#B4BCC6' },
  { href: '/sponsor/stallsponser', icon: Store, code: 'SP·03', access: 'Vendor Access', title: 'Stall Partner', desc: 'On-site product demos, samplings, and branding space', accent: '#C08552' },
  { href: '/sponsor/merchandisepartner', icon: ShoppingBag, code: 'MP·04', access: 'Supply Access', title: 'Merchandise Partner', desc: 'Co-branded event kits and corporate giveaways', accent: '#8B96A3' },
];

const analyticsPoints = [
  'Real-time analytics of reach & impressions',
  'Brand exposure tracking',
  'Highlight reels showcasing sponsor placements',
  'Dedicated logo placement in media posts',
];

const benefitPoints = [
  'Access 1000+ professionals per tournament',
  'Multi-city exposure',
  'Social media amplification',
  'Premium association with fitness & team culture',
];

/* ------------------------------------------------------------------ */
/*  ScrollCard3D — same card shell as the Road to Glory cards           */
/*                                                                      */
/*  • Scroll-scrubbed "card deal" entrance (follows scroll position,    */
/*    reverses on scroll up), cards in a row land in a wave.            */
/*  • Dark hatched surface, gold→red border on hover, red glare,        */
/*    rim light, tilt-following shadow, foil sweep, ghost number.       */
/*  • Clipped surface is its own layer so the 3D content isn't          */
/*    flattened by overflow-hidden.                                     */
/* ------------------------------------------------------------------ */

const FoilSweep = ({ active, reduceMotion }) => (
  <motion.div
    className="pointer-events-none absolute inset-0 rounded-[inherit]"
    style={{
      background: `linear-gradient(115deg, transparent 30%, ${GOLD}22 45%, ${FLARE}2A 50%, ${GOLD}22 55%, transparent 70%)`,
    }}
    initial={{ x: '-120%' }}
    animate={{ x: active && !reduceMotion ? '120%' : '-120%' }}
    transition={{ duration: 0.9, ease: 'easeInOut' }}
  />
);

const ScrollCard3D = ({ index, cols, to, radius = 20, tilt = 12, surface = '#111111', padding = 'p-5', ghost, children }) => {
  const reduceMotion = useReducedMotion();
  const canHover = useMediaQuery('(hover: hover) and (pointer: fine)');
  const interactive = canHover && !reduceMotion;
  const { ref, x, y, rotateX, rotateY, isHovered, handlers } = useTilt(tilt, !interactive);

  const row = Math.floor(index / cols);
  const col = index % cols;
  const fromLeft = cols === 1 ? index % 2 === 0 : row % 2 === 0;
  const side = fromLeft ? -1 : 1;
  const order = fromLeft ? col : cols - 1 - col;
  const s = cols > 1 ? (order / (cols - 1)) * 0.3 : 0;
  const range = [s, 1];

  const { scrollYProgress: enterRaw } = useScroll({ target: ref, offset: ['start end', 'start 0.6'] });
  const enter = useSpring(enterRaw, SCRUB);

  const enterX = useTransform(enter, range, [side * 140, 0]);
  const enterY = useTransform(enter, range, [130, 0]);
  const enterZ = useTransform(enter, range, [-300, 0]);
  const enterRotX = useTransform(enter, range, [60, 0]);
  const enterRotY = useTransform(enter, range, [side * 40, 0]);
  const enterRotZ = useTransform(enter, range, [side * 6, 0]);
  const enterScale = useTransform(enter, range, [0.82, 1]);
  const enterOpacity = useTransform(enter, [s, s + (1 - s) * 0.45], [0, 1]);

  const { scrollYProgress } = useScroll({ target: ref, offset: ['start end', 'end start'] });
  const travel = useSpring(scrollYProgress, SCRUB);
  const travelTiltX = useTransform(travel, [0, 0.55, 1], [0, 0, -16]);
  const travelTiltY = useTransform(travel, [0, 0.55, 1], [0, 0, side * -8]);
  const exitY = useTransform(travel, [0.6, 1], [0, -36]);
  const exitOpacity = useTransform(travel, [0.82, 1], [1, 0.4]);

  const combinedY = useTransform([enterY, exitY], ([a, b]) => a + b);
  const combinedOpacity = useTransform([enterOpacity, exitOpacity], ([a, b]) => a * b);

  const hoverMix = useSpring(0, { stiffness: 180, damping: 24 });
  useEffect(() => {
    hoverMix.set(isHovered ? 1 : 0);
  }, [isHovered, hoverMix]);
  const blendedX = useTransform([rotateX, travelTiltX, hoverMix], ([t, sc, m]) => t * m + sc * (1 - m));
  const blendedY = useTransform([rotateY, travelTiltY, hoverMix], ([t, sc, m]) => t * m + sc * (1 - m));

  const landed = useTransform(enter, [0.7, 1], [0, 1]);
  const pop = useTransform([landed, hoverMix], ([p, m]) => p * (1 + 0.5 * m));

  const glareX = useTransform(x, (v) => `${(v + 0.5) * 100}%`);
  const glareY = useTransform(y, (v) => `${(v + 0.5) * 100}%`);
  const glare = useMotionTemplate`radial-gradient(380px circle at ${glareX} ${glareY}, rgba(255,255,255,0.10), rgba(229,9,20,0.12) 30%, transparent 60%)`;

  const shadow = useTransform([blendedX, blendedY], ([rx, ry]) => {
    const sx = -ry * 2.2;
    const sy = 24 + rx * 2.2;
    return `${sx}px ${sy}px 56px -22px rgba(0,0,0,0.95), ${sx * 0.4}px ${sy * 0.4}px 28px -16px rgba(229,9,20,0.28)`;
  });

  const rim = useTransform([blendedX, blendedY], ([rx, ry]) => {
    const angle = Math.atan2(rx, -ry) * (180 / Math.PI) + 90;
    const strength = Math.min(1, Math.hypot(rx, ry) / 16);
    return `linear-gradient(${angle}deg, rgba(255,255,255,${0.18 * strength}), transparent 35%)`;
  });

  const Shell = to ? MotionLink : motion.article;

  return (
    <div ref={ref} {...handlers} className="h-full" style={{ perspective: 1000 }}>
      <motion.div
        className="h-full will-change-transform"
        style={
          reduceMotion
            ? undefined
            : {
                transformStyle: 'preserve-3d',
                transformOrigin: '50% 100%',
                x: enterX,
                y: combinedY,
                z: enterZ,
                rotateX: enterRotX,
                rotateY: enterRotY,
                rotateZ: enterRotZ,
                scale: enterScale,
                opacity: combinedOpacity,
              }
        }
      >
        <Shell
          {...(to ? { to } : {})}
          className={`relative flex h-full flex-col ${padding} outline-none focus-visible:ring-2 focus-visible:ring-[#E50914] focus-visible:ring-offset-4 focus-visible:ring-offset-transparent`}
          style={{
            borderRadius: radius,
            rotateX: reduceMotion ? 0 : blendedX,
            rotateY: reduceMotion ? 0 : blendedY,
            boxShadow: reduceMotion ? '0 20px 50px -24px rgba(0,0,0,0.85)' : shadow,
            transformStyle: 'preserve-3d',
          }}
          animate={{ z: isHovered ? 50 : 0, scale: isHovered ? 1.02 : 1 }}
          transition={{ type: 'spring', stiffness: 260, damping: 22 }}
        >
          <div className="pointer-events-none absolute inset-0 overflow-hidden" style={{ borderRadius: radius }}>
            <div
              className="absolute inset-0"
              style={{ background: 'linear-gradient(135deg, rgba(255,255,255,0.09), rgba(255,255,255,0.02))' }}
            />
            <div
              className="absolute inset-0 transition-opacity duration-500"
              style={{
                background: `linear-gradient(135deg, ${GOLD}90, rgba(255,255,255,0.05) 45%, ${FLARE}70)`,
                opacity: isHovered ? 1 : 0,
              }}
            />
            <div
              className="absolute inset-px"
              style={{
                borderRadius: radius - 1,
                backgroundColor: surface,
                backgroundImage:
                  'repeating-linear-gradient(135deg, rgba(255,255,255,0.022) 0px, rgba(255,255,255,0.022) 1px, transparent 1px, transparent 10px)',
              }}
            />
            {!reduceMotion && <motion.div className="absolute inset-0" style={{ background: rim }} />}
            <div className="absolute inset-x-6 top-px h-px bg-gradient-to-r from-transparent via-white/20 to-transparent" />
            <motion.div
              className="absolute inset-0 transition-opacity duration-300"
              style={{ background: glare, opacity: isHovered ? 1 : 0 }}
            />
            <FoilSweep active={isHovered} reduceMotion={reduceMotion} />
            {ghost && (
              <span
                className="absolute -top-5 right-2 select-none font-black leading-none text-white transition-opacity duration-500"
                style={{ fontSize: '5.5rem', opacity: isHovered ? 0.08 : 0.04 }}
              >
                {ghost}
              </span>
            )}
          </div>

          <CornerMark corner="tl" active={isHovered} />
          <CornerMark corner="tr" active={isHovered} />
          <CornerMark corner="bl" active={isHovered} />
          <CornerMark corner="br" active={isHovered} />

          <DepthContext.Provider value={pop}>
            {typeof children === 'function' ? children({ isHovered, reduceMotion }) : children}
          </DepthContext.Provider>
        </Shell>
      </motion.div>
    </div>
  );
};

/* ------------------------------------------------------------------ */
/*  Tier card — Road to Glory card layout                               */
/* ------------------------------------------------------------------ */

const TierCard3D = ({ tier, index, cols }) => {
  const Icon = tier.icon;

  return (
    <ScrollCard3D index={index} cols={cols} to={tier.href} padding="p-4" tilt={12} ghost={String(index + 1).padStart(2, '0')}>
      {({ isHovered, reduceMotion }) => (
        <>
          <Layer depth={30} className="relative flex items-center justify-between gap-3">
            <div
              className="rounded-full px-2.5 py-1 text-[10px] font-semibold uppercase tracking-[0.3em] text-[#E50914] transition-colors duration-300"
              style={{ background: isHovered ? `${FLARE}2E` : `${FLARE}1F` }}
            >
              {tier.access}
            </div>
            <div className="flex items-center gap-1.5 text-xs font-medium text-[#A8A8A8]" style={{ fontFamily: FONT_MONO }}>
              <ScanLine size={11} />
              {tier.code}
            </div>
          </Layer>

          <Layer
            depth={16}
            className="relative mt-4 flex-1 rounded-[16px] border border-white/10 bg-gradient-to-br from-[#242424] via-[#161616] to-[#0D0D0D] p-3 shadow-[inset_0_1px_0_rgba(255,255,255,0.04)]"
          >
            <div
              className="flex h-full min-h-[150px] flex-col justify-between rounded-[14px] border border-white/10 bg-[radial-gradient(circle_at_top_left,rgba(229,9,20,0.18),transparent_55%)] p-3"
              style={{ transformStyle: 'preserve-3d' }}
            >
              <div className="flex items-start justify-between gap-2" style={{ transformStyle: 'preserve-3d' }}>
                <Layer depth={44} className="relative inline-flex h-10 w-10 items-center justify-center">
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
                  <motion.div
                    animate={{ scale: isHovered ? 1.12 : 1 }}
                    transition={{ type: 'spring', stiffness: 300, damping: 18 }}
                    className="relative flex h-8 w-8 items-center justify-center rounded-full bg-white/10 text-[#E50914]"
                  >
                    <Icon size={16} />
                  </motion.div>
                </Layer>

                {tier.flagship && (
                  <Layer
                    depth={36}
                    className="relative flex items-center gap-1 overflow-hidden rounded-full px-2.5 py-1"
                    style={{ background: `${GOLD}1F`, border: `1px solid ${GOLD}55` }}
                  >
                    {!reduceMotion && (
                      <motion.span
                        className="absolute inset-0"
                        style={{ background: `linear-gradient(115deg, transparent 35%, ${GOLD}66 50%, transparent 65%)` }}
                        animate={{ x: ['-120%', '120%'] }}
                        transition={{ duration: 1.8, repeat: Infinity, repeatDelay: 2.4, ease: 'easeInOut' }}
                      />
                    )}
                    <Crown size={9} className="relative" style={{ color: GOLD }} />
                    <span className="relative text-[8px] font-semibold uppercase tracking-[0.2em]" style={{ fontFamily: FONT_MONO, color: GOLD }}>
                      Flagship
                    </span>
                  </Layer>
                )}
              </div>

              <Layer depth={24} className="mt-4">
                <div className="text-lg font-semibold uppercase tracking-tight text-white" style={{ fontFamily: FONT_DISPLAY }}>
                  {tier.title}
                </div>
                <div className="mt-2 text-xs leading-5 text-[#A8A8A8]" style={{ fontFamily: FONT_BODY }}>
                  {tier.desc}
                </div>
              </Layer>
            </div>
          </Layer>

          <Layer
            depth={10}
            className="relative mt-3 flex items-center justify-between border-t border-white/10 pt-3 text-[10px] uppercase tracking-[0.28em] text-[#A8A8A8]"
          >
            <span style={{ fontFamily: FONT_MONO }}>Activate</span>
            <div className="flex items-center gap-2">
              <motion.div
                className="h-px bg-gradient-to-r from-white/20 via-white/40 to-[#E50914]/70"
                initial={false}
                animate={{ width: isHovered ? 48 : 28 }}
                transition={{ duration: 0.35, ease: EASE }}
              />
              <motion.span
                className="flex h-7 w-7 items-center justify-center rounded-full"
                style={{
                  background: isHovered ? FLARE : `${FLARE}1F`,
                  border: `1px solid ${FLARE}55`,
                  transition: 'background 0.3s',
                }}
                animate={{ rotate: isHovered ? 45 : 0 }}
                transition={{ type: 'spring', stiffness: 300, damping: 18 }}
              >
                <ArrowUpRight size={13} className={isHovered ? 'text-white' : 'text-[#E50914]'} />
              </motion.span>
            </div>
          </Layer>
        </>
      )}
    </ScrollCard3D>
  );
};

/* ------------------------------------------------------------------ */
/*  Panel3D — big info panels rise and tip in with scroll, tilt on hover */
/* ------------------------------------------------------------------ */

const Panel3D = ({ children, className = '', style, lag = 0 }) => {
  const reduceMotion = useReducedMotion();
  const canHover = useMediaQuery('(hover: hover) and (pointer: fine)');
  const { ref, rotateX, rotateY, isHovered, handlers } = useTilt(5, !(canHover && !reduceMotion));

  const { scrollYProgress } = useScroll({ target: ref, offset: ['start end', 'start 0.55'] });
  const p = useSpring(scrollYProgress, SCRUB);
  const range = [lag, 1];
  const enterRotX = useTransform(p, range, [30, 0]);
  const enterY = useTransform(p, range, [120, 0]);
  const enterScale = useTransform(p, range, [0.9, 1]);
  const enterOpacity = useTransform(p, [lag, lag + (1 - lag) * 0.5], [0, 1]);
  const rotX = useTransform([rotateX, enterRotX], ([a, b]) => a + b);

  return (
    <div ref={ref} {...handlers} className="h-full" style={{ perspective: 1400 }}>
      <motion.div
        className={`h-full ${className}`}
        style={{
          ...style,
          transformOrigin: '50% 100%',
          ...(reduceMotion ? {} : { rotateX: rotX, rotateY, y: enterY, scale: enterScale, opacity: enterOpacity }),
        }}
        animate={{ z: isHovered ? 24 : 0 }}
        transition={{ type: 'spring', stiffness: 220, damping: 22 }}
      >
        {children}
      </motion.div>
    </div>
  );
};

/* Checklist — items tick in one by one */
const CheckList = ({ items, accent, color }) => {
  const reduceMotion = useReducedMotion();
  return (
    <ul className="space-y-5">
      {items.map((text, i) => (
        <motion.li
          key={text}
          className="flex items-start gap-3.5"
          initial={reduceMotion ? false : { opacity: 0, x: -16 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, margin: '-10% 0px' }}
          transition={{ duration: 0.5, delay: 0.15 + i * 0.1, ease: EASE }}
        >
          <motion.span
            className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full"
            style={{ background: `${accent}14`, border: `1px solid ${accent}33` }}
            initial={reduceMotion ? false : { scale: 0, rotate: -90 }}
            whileInView={{ scale: 1, rotate: 0 }}
            viewport={{ once: true, margin: '-10% 0px' }}
            transition={{ type: 'spring', stiffness: 380, damping: 16, delay: 0.25 + i * 0.1 }}
          >
            <CheckCircle2 size={12} style={{ color: accent }} strokeWidth={2.25} />
          </motion.span>
          <span className="text-sm font-light leading-relaxed" style={{ fontFamily: FONT_BODY, color }}>
            {text}
          </span>
        </motion.li>
      ))}
    </ul>
  );
};

/* ------------------------------------------------------------------ */
/*  Page                                                                */
/* ------------------------------------------------------------------ */

const Sponsorship = () => {
  const reduceMotion = useReducedMotion();
  const tierCols = useResponsiveCols(TIER_BREAKPOINTS);

  useEffect(() => {
    const saved = sessionStorage.getItem('sponsorPageScroll');
    if (saved) {
      setTimeout(() => {
        window.scrollTo(0, parseInt(saved, 10));
        sessionStorage.removeItem('sponsorPageScroll');
      }, 100);
    }
  }, []);

  return (
    <div className="relative min-h-screen overflow-hidden bg-transparent">
      <FontImports />

      <div className="relative z-10 mx-auto max-w-7xl px-6">
        {/* ── Tiers ── */}
        <section id="tiers" className="py-24">
          <div className="mb-20 flex flex-col justify-between gap-10 pb-12 lg:flex-row lg:items-end">
            <div className="max-w-2xl">
              <motion.div
                initial={reduceMotion ? false : { opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, ease: EASE }}
                className="mb-8 inline-flex items-center gap-2.5 rounded-full px-4 py-1.5"
                style={{ background: PITCH }}
              >
                <ScanLine size={13} style={{ color: FLARE }} />
                <span className="text-[9px] font-semibold uppercase tracking-[0.38em]" style={{ fontFamily: FONT_MONO, color: CHALK }}>
                  Sponsor Credentials
                </span>
              </motion.div>

              <HeroHeading />

              <ScrollRevealText
                className="mt-5 max-w-sm text-base leading-relaxed"
                text="Four tiers of matchday access. Scale your brand's presence across the pitch, the stands, and the feed."
              />
            </div>

            {/* scoreboard strip — each panel flips down like a stadium board */}
            <motion.div
              initial={reduceMotion ? false : { opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, ease: EASE }}
              className="flex w-fit gap-1 rounded-xl p-1.5 shadow-[0_20px_40px_-20px_rgba(0,0,0,0.6)]"
              style={{ background: PITCH, perspective: 600 }}
            >
              {[
                ['1000+', 'Pros'],
                ['04', 'Tiers'],
                ['09', 'Cities'],
              ].map(([val, label], i) => (
                <motion.div
                  key={label}
                  initial={reduceMotion ? false : { rotateX: -90, opacity: 0 }}
                  whileInView={{ rotateX: 0, opacity: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.7, delay: 0.2 + i * 0.15, ease: EASE }}
                  whileHover={reduceMotion ? undefined : { y: -3 }}
                  style={{ transformOrigin: '50% 0%', background: PITCH_DEEP }}
                  className="flex flex-col items-center rounded-lg px-4 py-2.5"
                >
                  <div className="text-2xl tabular-nums" style={{ fontFamily: FONT_MONO, fontWeight: 600, color: FLARE }}>
                    <RollingNumber value={val} />
                  </div>
                  <div className="text-[8px] font-semibold uppercase tracking-[0.2em]" style={{ fontFamily: FONT_MONO, color: `${CHALK}77` }}>
                    {label}
                  </div>
                </motion.div>
              ))}
            </motion.div>
          </div>

          <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
            {sponsorTiers.map((tier, i) => (
              <TierCard3D key={tier.code} tier={tier} index={i} cols={tierCols} />
            ))}
          </div>
        </section>

        {/* ── Analytics + Benefits ── */}
        <section className="py-16">
          <div className="grid gap-8 lg:grid-cols-2">
            {/* Dark: Field Report */}
            <Panel3D
              className="group relative overflow-hidden rounded-[1.75rem] p-10 shadow-[0_20px_60px_-15px_rgba(0,0,0,0.5)] md:p-12"
              style={{ background: PITCH_DEEP, border: `1px solid ${CHALK}14` }}
            >
              <div
                className="pointer-events-none absolute inset-0 opacity-[0.04]"
                style={{ backgroundImage: `repeating-linear-gradient(90deg, ${CHALK} 0px, ${CHALK} 1px, transparent 1px, transparent 64px)` }}
              />
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
                  <span className="text-[9px] font-semibold uppercase tracking-[0.3em] text-white" style={{ fontFamily: FONT_MONO }}>
                    Field Report
                  </span>
                </div>
                <h3 className="mb-2 text-3xl uppercase tracking-tight" style={{ fontFamily: FONT_DISPLAY, fontWeight: 600, color: CHALK }}>
                  Sponsor Dashboard
                </h3>
                <p className="mb-8 text-sm leading-relaxed" style={{ color: `${CHALK}80`, fontFamily: FONT_MONO }}>
                  Live numbers, not promises. Track it in real time.
                </p>
                <CheckList items={analyticsPoints} accent={FLARE} color={`${CHALK}CC`} />
              </div>
            </Panel3D>

            {/* Light: Roster Call */}
            <Panel3D
              lag={0.15}
              className="group relative overflow-hidden rounded-[1.75rem] p-10 shadow-[0_20px_60px_-20px_rgba(0,0,0,0.35)] md:p-12"
              style={{ background: CHALK, border: `1px solid ${PITCH}12` }}
            >
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
                  <span className="text-[9px] font-semibold uppercase tracking-[0.3em]" style={{ fontFamily: FONT_MONO, color: TURF }}>
                    Roster Call
                  </span>
                </div>
                <h3 className="mb-2 text-3xl uppercase tracking-tight" style={{ fontFamily: FONT_DISPLAY, fontWeight: 600, color: PITCH }}>
                  Why Sponsor HAKIRUSH?
                </h3>
                <p className="mb-8 text-sm leading-relaxed" style={{ color: `${PITCH}80`, fontFamily: FONT_MONO }}>
                  A club that shows up for the people who show up for it.
                </p>
                <CheckList items={benefitPoints} accent={TURF} color={`${PITCH}CC`} />
              </div>
            </Panel3D>
          </div>
        </section>
      </div>
    </div>
  );
};

export default Sponsorship;