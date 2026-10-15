import React, { useRef, useState, useEffect, createContext, useContext } from 'react';
import {
  motion,
  AnimatePresence,
  useMotionValue,
  useSpring,
  useTransform,
  useMotionTemplate,
  useReducedMotion,
  useScroll,
  useInView,
} from 'framer-motion';
import { ArrowRight, BadgeCheck, BarChart3, ChevronDown, Crown, Download, Sparkles, Trophy, Users2 } from 'lucide-react';

const GOLD = '#D4AF37';
const SILVER = '#C7CBD1';
const BRONZE = '#B8763E';
const RED = '#E50914';
const GREEN = '#34D399';
const EASE = [0.22, 1, 0.36, 1];

// Smoothing for scroll-scrubbed motion: follows the scrollbar exactly,
// but irons out mouse-wheel steps so nothing judders.
const SCRUB = { stiffness: 120, damping: 26, mass: 0.4 };

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

// Pointer tilt. The ref belongs on a NON-rotating wrapper so the measured
// rect stays stable while the card inside rotates.
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

/* Mirrors the Tailwind grid breakpoints so stagger order matches layout */
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

const MONTH_BREAKPOINTS = [
  { min: 0, cols: 1 },
  { min: 640, cols: 2 },
  { min: 1024, cols: 3 },
  { min: 1280, cols: 6 },
];

const STEP_BREAKPOINTS = [
  { min: 0, cols: 1 },
  { min: 640, cols: 2 },
  { min: 1280, cols: 4 },
];

/* ------------------------------------------------------------------ */
/*  Shared signature pieces                                             */
/* ------------------------------------------------------------------ */

const CornerMark = ({ corner, active }) => {
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
      className={`pointer-events-none absolute h-3.5 w-3.5 ${pos}`}
      initial={false}
      animate={{
        ...shift,
        z: active ? 30 : 8,
        opacity: active ? 1 : 0.5,
        borderColor: active ? RED : 'rgba(212,175,55,0.35)',
      }}
      transition={{ duration: 0.35, ease: 'easeOut' }}
    />
  );
};

/* One-pass gold→red foil sweep — never loops */
const FoilSweep = ({ active, reduceMotion }) => (
  <motion.div
    className="pointer-events-none absolute inset-0 rounded-[inherit]"
    style={{
      background: `linear-gradient(115deg, transparent 30%, ${GOLD}22 45%, ${RED}2A 50%, ${GOLD}22 55%, transparent 70%)`,
    }}
    initial={{ x: '-120%' }}
    animate={{ x: active && !reduceMotion ? '120%' : '-120%' }}
    transition={{ duration: 0.9, ease: 'easeInOut' }}
  />
);

/* ------------------------------------------------------------------ */
/*  Text animation                                                      */
/* ------------------------------------------------------------------ */

const ScrollRevealWord = ({ word, index, total, scrollYProgress }) => {
  const start = index / total;
  const end = start + 1 / total;
  const opacity = useTransform(scrollYProgress, [start, end], [0.25, 1]);
  const color = useTransform(scrollYProgress, [start, end], ['rgba(255,255,255,0.3)', 'rgba(255,255,255,1)']);
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

// Words flip up out of a 3D hinge. The in-view trigger sits on the whole
// heading — a word inside an overflow mask never counts as "in view".
const RiseWords = ({ text, className = '', delayOffset = 0, play }) => {
  const reduceMotion = useReducedMotion();
  const shown = reduceMotion || play;
  const hidden = { y: '105%', rotateX: -75, opacity: 0 };

  return text.split(' ').map((word, i) => (
    <React.Fragment key={i}>
      <span className="inline-block overflow-hidden pb-[0.12em] align-bottom" style={{ perspective: 600 }}>
        <motion.span
          className={`inline-block ${className}`}
          style={{ transformOrigin: '50% 100%' }}
          initial={reduceMotion ? false : hidden}
          animate={shown ? { y: '0%', rotateX: 0, opacity: 1 } : hidden}
          transition={{ duration: 0.85, delay: shown ? delayOffset + i * 0.05 : 0, ease: EASE }}
        >
          {word}
        </motion.span>
      </span>{' '}
    </React.Fragment>
  ));
};

const AnimatedHeading = ({ as: Tag = 'h2', lead, accent, className = '' }) => {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, amount: 0.2 });
  const leadCount = lead.split(' ').length;

  return (
    <Tag ref={ref} className={className}>
      <RiseWords text={lead} play={inView} />
      {accent && <RiseWords text={accent} className="text-red-600" delayOffset={leadCount * 0.05 + 0.05} play={inView} />}
    </Tag>
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

const roadToGloryMonths = [
  { month: 'January', theme: 'Ignite', icon: Sparkles, event: 'Corporate Marathon', sponsor: 'Performance Apparel', badge: 'Launch Badge' },
  { month: 'February', theme: 'Compete', icon: Trophy, event: 'Corporate Cricket Cup', sponsor: 'Sports Gear', badge: 'Rising Momentum' },
  { month: 'March', theme: 'Precision', icon: BarChart3, event: 'Corporate Badminton Masters', sponsor: 'Wellness Partners', badge: 'Precision Master' },
  { month: 'April', theme: 'Strategy', icon: Users2, event: 'Corporate Table Tennis League', sponsor: 'Lifestyle Brand', badge: 'Strategy Edge' },
  { month: 'May', theme: 'Wellness', icon: BadgeCheck, event: 'Corporate Fitness Challenge', sponsor: 'Health Alliance', badge: 'Wellness Warrior' },
  { month: 'June', theme: 'Momentum', icon: Trophy, event: 'Corporate Pickleball Open', sponsor: 'Community Partners', badge: 'Momentum Builder' },
  { month: 'July', theme: 'Unity', icon: Users2, event: 'Corporate Indoor Games', sponsor: 'Culture Sponsors', badge: 'Team Builder' },
  { month: 'August', theme: 'Spirit', icon: Sparkles, event: 'Independence Sports Festival', sponsor: 'National Partners', badge: 'Spirit Champion' },
  { month: 'September', theme: 'Strength', icon: Trophy, event: 'Corporate Football Cup', sponsor: 'Performance Partners', badge: 'Game Changer' },
  { month: 'October', theme: 'Celebrate', icon: BadgeCheck, event: 'Festival Sports Carnival', sponsor: 'Festival Sponsors', badge: 'Culture Builder' },
  { month: 'November', theme: 'Championship', icon: Crown, event: 'Corporate Sports Week', sponsor: 'Leadership Sponsors', badge: 'Elite Performer' },
  { month: 'December', theme: 'Legacy', icon: Crown, event: 'Corporate Grand Finale', sponsor: 'Annual Partners', badge: 'Legend' },
];

const rankingCriteria = [
  { label: 'Participation', value: '40%' },
  { label: 'Performance', value: '30%' },
  { label: 'Consistency', value: '15%' },
  { label: 'Sportsmanship', value: '10%' },
  { label: 'Community Engagement', value: '5%' },
];
const CRITERIA_COLORS = [RED, GOLD, SILVER, BRONZE, '#6E6E6E'];

const leaderboardData = [
  { rank: 1, name: 'TechNova Solutions', xp: '24,850 XP', level: 'Level 10', badges: '18', movement: '▲ +3' },
  { rank: 2, name: 'Skyline Innovations', xp: '23,740 XP', level: 'Level 10', badges: '17', movement: '▲ +1' },
  { rank: 3, name: 'Quantum Dynamics', xp: '22,980 XP', level: 'Level 9', badges: '16', movement: '—' },
  { rank: 4, name: 'Vertex Technologies', xp: '21,860 XP', level: 'Level 9', badges: '15', movement: '▼ -1' },
  { rank: 5, name: 'Fusion Enterprises', xp: '20,940 XP', level: 'Level 8', badges: '14', movement: '▲ +2' },
  { rank: 6, name: 'Pinnacle Industries', xp: '19,830 XP', level: 'Level 8', badges: '13', movement: '▼ -2' },
  { rank: 7, name: 'NovaEdge Corp', xp: '18,920 XP', level: 'Level 7', badges: '12', movement: '▲ +4' },
  { rank: 8, name: 'Elevate Systems', xp: '17,610 XP', level: 'Level 7', badges: '11', movement: '—' },
  { rank: 9, name: 'Zenith Global', xp: '16,740 XP', level: 'Level 6', badges: '10', movement: '▲ +1' },
  { rank: 10, name: 'Horizon Digital', xp: '15,980 XP', level: 'Level 6', badges: '9', movement: '▼ -3' },
];
const LEADERBOARD_PREVIEW = 5;

const xpRules = [
  'Event Participation', 'Team Registration', 'Match Victory', 'Tournament Winner', 'Runner Up',
  'Fair Play Award', 'Best Team Spirit', 'Attendance', 'Volunteer Participation', 'Special Recognition',
];

const badges = ['Early Challenger', 'Team Performer', 'Precision Master', 'Strategic Thinker', 'Wellness Warrior', 'Momentum Builder', 'Team Builder', 'Spirit Champion', 'Game Changer', 'Culture Builder', 'Elite Performer', 'Legend'];

const journeySteps = [
  { title: 'Join HAKIRUSH', icon: Sparkles, blurb: 'Start your journey with the community.' },
  { title: 'Receive Team Jerseys', icon: Users2, blurb: 'Gear up and represent your organization.' },
  { title: 'Participate in Monthly Experiences', icon: Trophy, blurb: 'Show up, compete, and connect.' },
  { title: 'Earn Experience Points (XP)', icon: BadgeCheck, blurb: 'Collect progress with every milestone.' },
  { title: 'Unlock Achievement Badges', icon: BarChart3, blurb: 'Celebrate distinction and consistency.' },
  { title: 'Improve HAKI RANK', icon: Crown, blurb: 'Rise through recognition and Roadtoglory.' },
  { title: 'Represent Your Organization', icon: Sparkles, blurb: 'Lead with pride and team spirit.' },
  { title: 'Become Annual Champions', icon: Trophy, blurb: 'Finish the year as a standout team.' },
];

const tierFor = (rank) => {
  if (rank === 1) return { color: GOLD, icon: Crown, label: '1st' };
  if (rank === 2) return { color: SILVER, icon: null, label: '2nd' };
  if (rank === 3) return { color: BRONZE, icon: null, label: '3rd' };
  return null;
};

const initials = (name) =>
  name
    .split(' ')
    .filter(Boolean)
    .slice(0, 2)
    .map((w) => w[0])
    .join('')
    .toUpperCase();

const parseXP = (xpStr) => parseInt(String(xpStr).replace(/[^\d]/g, ''), 10) || 0;

/* ------------------------------------------------------------------ */
/*  ScrollCard3D — the shared 3D card shell                             */
/*                                                                      */
/*  • Scroll-scrubbed "card deal" entrance: flips up off the table and  */
/*    swings in from the side, tied to scroll POSITION (reverses on     */
/*    scroll up, freezes when you stop).                                */
/*  • Row-wave stagger: cards in a row land one after another.          */
/*  • Content sits on real Z planes (<Layer depth>) that pop off the    */
/*    surface as the card lands, and further on hover.                  */
/*  • Pointer tilt + glare + rim light + shadow that follows the tilt.  */
/*  • The clipped surface is a separate layer, so overflow-hidden never */
/*    flattens the 3D content (the bug in the original cards).          */
/* ------------------------------------------------------------------ */

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

const ScrollCard3D = ({
  index,
  cols,
  radius = 20,
  tilt = 12,
  surface = '#111111',
  padding = 'p-5',
  ghost,
  children,
}) => {
  const reduceMotion = useReducedMotion();
  const canHover = useMediaQuery('(hover: hover) and (pointer: fine)');
  const interactive = canHover && !reduceMotion;
  const { ref, x, y, rotateX, rotateY, isHovered, handlers } = useTilt(tilt, !interactive);

  // Row-wave ordering: alternate rows come from alternate sides
  const row = Math.floor(index / cols);
  const col = index % cols;
  const fromLeft = cols === 1 ? index % 2 === 0 : row % 2 === 0;
  const side = fromLeft ? -1 : 1;
  const order = fromLeft ? col : cols - 1 - col;
  const s = cols > 1 ? (order / (cols - 1)) * 0.3 : 0;
  const range = [s, 1];

  // Entrance — scrubbed from "top touches bottom of screen" to "top at 60%"
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

  // Travel — keeps tipping back as it leaves the top of the screen
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start end', 'end start'] });
  const travel = useSpring(scrollYProgress, SCRUB);
  const travelTiltX = useTransform(travel, [0, 0.55, 1], [0, 0, -16]);
  const travelTiltY = useTransform(travel, [0, 0.55, 1], [0, 0, side * -8]);
  const exitY = useTransform(travel, [0.6, 1], [0, -36]);
  const exitOpacity = useTransform(travel, [0.82, 1], [1, 0.4]);

  const combinedY = useTransform([enterY, exitY], ([a, b]) => a + b);
  const combinedOpacity = useTransform([enterOpacity, exitOpacity], ([a, b]) => a * b);

  // Hover hands control from scroll-tilt to pointer-tilt without snapping
  const hoverMix = useSpring(0, { stiffness: 180, damping: 24 });
  useEffect(() => {
    hoverMix.set(isHovered ? 1 : 0);
  }, [isHovered, hoverMix]);
  const blendedX = useTransform([rotateX, travelTiltX, hoverMix], ([t, sc, m]) => t * m + sc * (1 - m));
  const blendedY = useTransform([rotateY, travelTiltY, hoverMix], ([t, sc, m]) => t * m + sc * (1 - m));

  // Layer separation: 0 while flat, 1 once landed, 1.5 on hover
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
        <motion.article
          className={`relative flex h-full flex-col ${padding}`}
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
          {/* clipped surface — separate from content so 3D survives */}
          <div className="pointer-events-none absolute inset-0 overflow-hidden" style={{ borderRadius: radius }}>
            <div
              className="absolute inset-0"
              style={{ background: 'linear-gradient(135deg, rgba(255,255,255,0.09), rgba(255,255,255,0.02))' }}
            />
            <div
              className="absolute inset-0 transition-opacity duration-500"
              style={{
                background: `linear-gradient(135deg, ${GOLD}90, rgba(255,255,255,0.05) 45%, ${RED}70)`,
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
        </motion.article>
      </motion.div>
    </div>
  );
};

/* ------------------------------------------------------------------ */
/*  Month card                                                          */
/* ------------------------------------------------------------------ */

const MonthCard3D = ({ item, index, cols }) => {
  const Icon = item.icon;

  return (
    <ScrollCard3D index={index} cols={cols} padding="p-4" tilt={12} ghost={String(index + 1).padStart(2, '0')}>
      {({ isHovered, reduceMotion }) => (
        <>
          <Layer depth={30} className="relative flex items-center justify-between gap-3">
            <div
              className="rounded-full px-2.5 py-1 text-[10px] font-semibold uppercase tracking-[0.3em] text-[#E50914] transition-colors duration-300"
              style={{ background: isHovered ? `${RED}2E` : `${RED}1F` }}
            >
              {item.month}
            </div>
            <div className="text-xs font-medium text-[#A8A8A8]">{item.theme}</div>
          </Layer>

          <Layer
            depth={16}
            className="relative mt-4 rounded-[16px] border border-white/10 bg-gradient-to-br from-[#242424] via-[#161616] to-[#0D0D0D] p-3 shadow-[inset_0_1px_0_rgba(255,255,255,0.04)]"
          >
            <div
              className="flex min-h-[112px] flex-col justify-between rounded-[14px] border border-white/10 bg-[radial-gradient(circle_at_top_left,rgba(229,9,20,0.18),transparent_55%)] p-3"
              style={{ transformStyle: 'preserve-3d' }}
            >
              <Layer depth={44} className="relative inline-flex h-9 w-9 items-center justify-center">
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
                  className="relative flex h-7 w-7 items-center justify-center rounded-full bg-white/10 text-[#E50914]"
                >
                  <Icon size={15} />
                </motion.div>
              </Layer>

              <Layer depth={24}>
                <div className="text-sm font-semibold text-white">{item.event}</div>
                <div className="mt-2 text-[11px] uppercase tracking-[0.25em] text-[#E50914]">{item.badge}</div>
              </Layer>
            </div>
          </Layer>

          <Layer depth={10} className="relative mt-3 text-xs leading-5 text-[#A8A8A8]">
            Sponsor: <span className="text-[#CFCFCF]">{item.sponsor}</span>
          </Layer>
        </>
      )}
    </ScrollCard3D>
  );
};

/* ------------------------------------------------------------------ */
/*  Year rail — fills month by month as you scroll the timeline         */
/* ------------------------------------------------------------------ */

const RailTick = ({ index, total, label, fill }) => {
  const reduceMotion = useReducedMotion();
  const at = index / (total - 1);
  const lit = useTransform(fill, [Math.max(0, at - 0.04), at], [0, 1]);
  const scale = useTransform(lit, [0, 1], [0.7, 1.15]);
  const bg = useTransform(lit, [0, 1], ['rgba(255,255,255,0.18)', GOLD]);
  const glow = useTransform(lit, [0, 1], ['0 0 0px rgba(212,175,55,0)', '0 0 12px rgba(212,175,55,0.7)']);
  const labelOpacity = useTransform(lit, [0, 1], [0.35, 1]);
  const shift = index === 0 ? '0%' : index === total - 1 ? '-100%' : '-50%';

  return (
    <div className="absolute top-0" style={{ left: `${at * 100}%` }}>
      <motion.span
        className="absolute -top-[4px] block h-2 w-2 rounded-full"
        style={{
          x: shift,
          backgroundColor: reduceMotion ? GOLD : bg,
          scale: reduceMotion ? 1 : scale,
          boxShadow: reduceMotion ? 'none' : glow,
        }}
      />
      <motion.span
        className="absolute top-3 hidden whitespace-nowrap text-[10px] font-semibold uppercase tracking-[0.2em] text-white sm:block"
        style={{ x: shift, opacity: reduceMotion ? 1 : labelOpacity }}
      >
        {label}
      </motion.span>
    </div>
  );
};

const YearRail = ({ targetRef }) => {
  const reduceMotion = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: targetRef, offset: ['start 0.85', 'end 0.6'] });
  const fill = useSpring(scrollYProgress, SCRUB);

  return (
    <div className="relative mt-8 h-8 sm:h-10">
      <div className="absolute inset-x-0 top-0 h-px bg-white/10" />
      <motion.div
        className="absolute inset-x-0 top-0 h-px origin-left"
        style={{ scaleX: reduceMotion ? 1 : fill, background: `linear-gradient(90deg, ${RED}, ${GOLD})` }}
      />
      {roadToGloryMonths.map((m, i) => (
        <RailTick key={m.month} index={i} total={roadToGloryMonths.length} label={m.month.slice(0, 3)} fill={fill} />
      ))}
    </div>
  );
};

/* ------------------------------------------------------------------ */
/*  Step card                                                           */
/* ------------------------------------------------------------------ */

const StepCard3D = ({ step, index, cols, isLast }) => {
  const Icon = step.icon;

  return (
    <ScrollCard3D index={index} cols={cols} surface="#070707" tilt={10} ghost={String(index + 1).padStart(2, '0')}>
      {({ isHovered }) => (
        <>
          <Layer depth={38} className="relative flex items-center justify-between">
            <div className="flex items-center gap-2.5">
              <motion.div
                animate={{ rotate: isHovered ? [0, -10, 8, 0] : 0, scale: isHovered ? 1.08 : 1 }}
                transition={{ duration: 0.6, ease: 'easeOut' }}
                className="flex h-10 w-10 items-center justify-center rounded-full border text-[#E50914]"
                style={{
                  borderColor: isHovered ? `${RED}66` : `${RED}33`,
                  background: `${RED}1A`,
                  boxShadow: isHovered ? `0 10px 26px -8px ${RED}99` : `0 0 20px ${RED}1F`,
                  transition: 'border-color 0.3s, box-shadow 0.3s',
                }}
              >
                <Icon size={16} />
              </motion.div>
              <div className="rounded-full border border-white/10 bg-white/[0.04] px-2.5 py-1 text-[10px] font-semibold uppercase tracking-[0.3em] text-[#A8A8A8]">
                Step {index + 1}
              </div>
            </div>
            <div className="text-[10px] uppercase tracking-[0.28em]" style={{ color: isLast ? GOLD : RED }}>
              {isLast ? 'Finale' : 'Next'}
            </div>
          </Layer>

          <Layer depth={26} className="relative mt-4 text-sm font-semibold leading-7 text-[#F3F3F3]">
            {step.title}
          </Layer>
          <Layer depth={16} as="p" className="relative mt-2 flex-1 text-sm leading-6 text-[#8E8E8E]">
            {step.blurb}
          </Layer>

          <Layer
            depth={10}
            className="relative mt-5 flex items-center justify-between border-t border-white/10 pt-3 text-[10px] uppercase tracking-[0.28em] text-[#A8A8A8]"
          >
            <span>Progression</span>
            <div className="flex items-center gap-2">
              <motion.div
                className="h-px bg-gradient-to-r from-white/20 via-white/40 to-[#E50914]/70"
                initial={false}
                animate={{ width: isHovered ? 48 : 32 }}
                transition={{ duration: 0.35, ease: EASE }}
              />
              <motion.span animate={{ x: isHovered ? 3 : 0 }} transition={{ duration: 0.3 }} className="inline-flex">
                {isLast ? <Crown size={12} style={{ color: GOLD }} /> : <ArrowRight size={12} className="text-[#E50914]" />}
              </motion.span>
            </div>
          </Layer>
        </>
      )}
    </ScrollCard3D>
  );
};

/* ------------------------------------------------------------------ */
/*  Leaderboard pieces                                                  */
/* ------------------------------------------------------------------ */

const RankBadge = ({ rank }) => {
  const tier = tierFor(rank);
  if (!tier) {
    return (
      <span className="inline-flex h-7 w-7 items-center justify-center rounded-full border border-white/10 text-xs font-semibold text-[#A8A8A8]">
        {rank}
      </span>
    );
  }
  const Icon = tier.icon;
  return (
    <span
      className="relative inline-flex h-7 w-7 items-center justify-center overflow-hidden rounded-full text-xs font-bold text-[#0D0D0D]"
      style={{ background: `linear-gradient(135deg, ${tier.color}, ${tier.color}CC)`, boxShadow: `0 0 14px ${tier.color}55` }}
    >
      {rank === 1 && (
        <motion.span
          className="absolute inset-0"
          style={{ background: 'linear-gradient(115deg, transparent 35%, rgba(255,255,255,0.7) 50%, transparent 65%)' }}
          animate={{ x: ['-120%', '120%'] }}
          transition={{ duration: 1.6, repeat: Infinity, repeatDelay: 2.4, ease: 'easeInOut' }}
        />
      )}
      <span className="relative">{Icon ? <Icon size={13} /> : rank}</span>
    </span>
  );
};

const MovementPill = ({ movement }) => {
  const isUp = movement.startsWith('▲');
  const isDown = movement.startsWith('▼');
  const color = isUp ? GREEN : isDown ? RED : '#8E8E8E';
  const bg = isUp ? `${GREEN}1A` : isDown ? `${RED}1A` : 'rgba(255,255,255,0.05)';
  return (
    <span
      className="inline-flex items-center justify-center whitespace-nowrap rounded-full px-2.5 py-1 text-[11px] font-semibold tabular-nums"
      style={{ color, background: bg }}
    >
      {movement}
    </span>
  );
};

const XPBar = ({ xp, max, tierColor }) => {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-10% 0px' });
  const reduceMotion = useReducedMotion();
  const value = parseXP(xp);
  const pct = max > 0 ? Math.max(6, Math.round((value / max) * 100)) : 6;
  const color = tierColor || RED;

  return (
    <div ref={ref} className="mt-1.5 h-1 w-full overflow-hidden rounded-full bg-white/5">
      <motion.div
        className="h-full rounded-full"
        style={{ background: `linear-gradient(90deg, ${color}, ${color}99)` }}
        initial={{ width: 0 }}
        animate={{ width: reduceMotion || inView ? `${pct}%` : 0 }}
        transition={{ duration: 0.9, ease: EASE }}
      />
    </div>
  );
};

const LEADERBOARD_COLS = '52px minmax(0,1fr) 160px 84px 64px 92px';

const rowMotion = (i) => ({
  initial: { opacity: 0, x: -18 },
  whileInView: { opacity: 1, x: 0 },
  exit: { opacity: 0, x: -12, transition: { duration: 0.2 } },
  viewport: { once: true, margin: '-5% 0px' },
  transition: { duration: 0.5, delay: (i % LEADERBOARD_PREVIEW) * 0.06, ease: EASE },
});

const LeaderboardRow = ({ entry, maxXP, i }) => {
  const tier = tierFor(entry.rank);
  return (
    <motion.div
      {...rowMotion(i)}
      whileHover={{ x: 4 }}
      className="grid items-center gap-4 px-4 py-3.5 transition-colors hover:bg-white/[0.03] sm:px-5"
      style={{
        gridTemplateColumns: LEADERBOARD_COLS,
        borderLeft: `2px solid ${tier ? tier.color : 'transparent'}`,
        background: tier ? `linear-gradient(90deg, ${tier.color}12, transparent 45%)` : 'transparent',
      }}
    >
      <RankBadge rank={entry.rank} />
      <div className="flex min-w-0 items-center gap-3">
        <div
          className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full text-[11px] font-bold"
          style={{
            background: tier ? `linear-gradient(135deg, ${tier.color}30, ${tier.color}0A)` : 'rgba(255,255,255,0.06)',
            color: tier ? tier.color : '#CFCFCF',
            border: `1px solid ${tier ? `${tier.color}45` : 'rgba(255,255,255,0.1)'}`,
          }}
        >
          {initials(entry.name)}
        </div>
        <span className="truncate text-sm font-medium text-white">{entry.name}</span>
      </div>
      <div className="min-w-0">
        <div className="text-sm font-semibold tabular-nums text-white">{entry.xp}</div>
        <XPBar xp={entry.xp} max={maxXP} tierColor={tier?.color} />
      </div>
      <div className="text-sm text-[#A8A8A8]">{entry.level}</div>
      <div className="text-sm tabular-nums text-[#A8A8A8]">{entry.badges}</div>
      <MovementPill movement={entry.movement} />
    </motion.div>
  );
};

const LeaderboardCardMobile = ({ entry, maxXP, i }) => {
  const tier = tierFor(entry.rank);
  return (
    <motion.div
      {...rowMotion(i)}
      className="rounded-2xl border border-white/5 bg-[#171717]/60 p-3.5"
      style={tier ? { boxShadow: `inset 0 0 0 1px ${tier.color}40`, background: `linear-gradient(135deg, ${tier.color}10, #171717)` } : undefined}
    >
      <div className="flex items-center justify-between gap-3">
        <div className="flex min-w-0 items-center gap-2.5">
          <RankBadge rank={entry.rank} />
          <div
            className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full text-[10px] font-bold"
            style={{
              background: tier ? `linear-gradient(135deg, ${tier.color}30, ${tier.color}0A)` : 'rgba(255,255,255,0.06)',
              color: tier ? tier.color : '#CFCFCF',
              border: `1px solid ${tier ? `${tier.color}45` : 'rgba(255,255,255,0.1)'}`,
            }}
          >
            {initials(entry.name)}
          </div>
          <span className="truncate text-sm font-semibold text-white">{entry.name}</span>
        </div>
        <MovementPill movement={entry.movement} />
      </div>
      <div className="mt-3">
        <div className="flex items-center justify-between text-xs text-[#A8A8A8]">
          <span className="font-semibold tabular-nums text-white">{entry.xp}</span>
          <span>{entry.level}</span>
        </div>
        <XPBar xp={entry.xp} max={maxXP} tierColor={tier?.color} />
      </div>
      <div className="mt-2.5 flex items-center justify-between border-t border-white/5 pt-2.5 text-xs text-[#A8A8A8]">
        <span>{entry.badges} Badges</span>
        <span className="text-[10px] uppercase tracking-[0.25em] text-[#6E6E6E]">{tier ? tier.label : `#${entry.rank}`}</span>
      </div>
    </motion.div>
  );
};

/* Weighting bar — the five criteria as one stacked bar */
const CriteriaBar = () => {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-10% 0px' });
  const reduceMotion = useReducedMotion();

  return (
    <div ref={ref} className="mb-6 flex h-2 w-full gap-[2px] overflow-hidden rounded-full bg-white/5">
      {rankingCriteria.map((c, i) => (
        <motion.div
          key={c.label}
          className="h-full first:rounded-l-full last:rounded-r-full"
          style={{ background: CRITERIA_COLORS[i] }}
          initial={{ width: 0 }}
          animate={{ width: reduceMotion || inView ? c.value : 0 }}
          transition={{ duration: 0.9, delay: reduceMotion ? 0 : i * 0.12, ease: EASE }}
        />
      ))}
    </div>
  );
};

/* ------------------------------------------------------------------ */
/*  CTA banner                                                          */
/* ------------------------------------------------------------------ */

const CTABanner = () => {
  const reduceMotion = useReducedMotion();
  const [isHovered, setIsHovered] = useState(false);

  return (
    <motion.div
      initial={reduceMotion ? false : { opacity: 0, y: 40, rotateX: 18 }}
      whileInView={{ opacity: 1, y: 0, rotateX: 0 }}
      viewport={{ once: true, amount: 0.3 }}
      transition={{ duration: 0.9, ease: EASE }}
      style={{ transformPerspective: 1200, transformOrigin: '50% 100%' }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className="relative rounded-[33px] p-px"
    >
      <div
        className="absolute inset-0 rounded-[33px]"
        style={{ background: `linear-gradient(135deg, ${RED}70, rgba(255,255,255,0.06) 45%, ${GOLD}55)` }}
      />
      <div
        className="relative overflow-hidden rounded-[32px] p-8 sm:p-12"
        style={{ background: 'linear-gradient(135deg, rgba(23,7,8,0.92), rgba(10,10,11,0.97) 55%, rgba(26,20,4,0.88))' }}
      >
        <div className="pointer-events-none absolute -right-20 -top-24 h-72 w-72 rounded-full blur-[110px]" style={{ background: `${RED}30` }} />
        <div className="pointer-events-none absolute -bottom-20 -left-16 h-64 w-64 rounded-full blur-[100px]" style={{ background: `${GOLD}22` }} />
        <motion.div
          className="pointer-events-none absolute -right-8 -top-10"
          animate={reduceMotion ? undefined : { rotate: [0, 6, 0], y: [0, -8, 0] }}
          transition={{ duration: 8, repeat: Infinity, ease: 'easeInOut' }}
        >
          <Crown className="text-white/[0.04]" size={240} strokeWidth={0.6} />
        </motion.div>

        <FoilSweep active={isHovered} reduceMotion={reduceMotion} />
        <CornerMark corner="tl" active={isHovered} />
        <CornerMark corner="tr" active={isHovered} />
        <CornerMark corner="bl" active={isHovered} />
        <CornerMark corner="br" active={isHovered} />

        <div className="relative flex flex-col gap-10 lg:flex-row lg:items-center lg:justify-between">
          <div className="max-w-2xl">
            <div className="inline-flex items-center gap-2 rounded-full border border-[#D4AF37]/30 bg-[#D4AF37]/10 px-3 py-1.5 text-[10px] font-semibold uppercase tracking-[0.35em] text-red-600">
              <span className="relative flex h-2 w-2 items-center justify-center">
                <motion.span
                  className="absolute inline-flex h-full w-full rounded-full"
                  style={{ background: RED }}
                  animate={reduceMotion ? {} : { scale: [1, 2.2, 1], opacity: [0.7, 0, 0.7] }}
                  transition={{ duration: 2.4, repeat: Infinity, ease: 'easeInOut' }}
                />
                <span className="relative h-2 w-2 rounded-full" style={{ background: RED }} />
              </span>
              Ready to Climb HAKI RANK?
            </div>
            <AnimatedHeading
              as="h3"
              className="mt-5 text-2xl font-bold leading-tight tracking-tight text-white sm:text-4xl"
              lead="Become a corporate member and turn every month into"
              accent="a shared celebration."
            />
            <p className="mt-3 max-w-xl text-sm leading-relaxed text-[#C7C7C7] sm:text-base">
              Create a culture of participation, celebration and recognition that lasts all year long.
            </p>
            <div className="mt-6 flex flex-wrap items-center gap-x-6 gap-y-2.5">
              {['12 monthly experiences', 'Team jerseys included', 'Instant HAKI RANK access'].map((item) => (
                <span key={item} className="inline-flex items-center gap-2 text-xs text-[#C7C7C7]">
                  <span className="h-1 w-1 shrink-0 rounded-full" style={{ background: GOLD }} />
                  {item}
                </span>
              ))}
            </div>
          </div>

          <div className="hidden h-28 w-px shrink-0 bg-gradient-to-b from-transparent via-white/15 to-transparent lg:block" />

          <div className="flex w-full shrink-0 flex-col gap-3 sm:w-auto sm:flex-row lg:w-auto">
            <div className="w-full rounded-xl p-px sm:w-auto" style={{ background: `linear-gradient(135deg, ${GOLD}, ${RED})` }}>
              <motion.button
                whileHover={{ scale: reduceMotion ? 1 : 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="group relative w-full overflow-hidden rounded-[11px] px-7 py-3.5 text-center text-sm font-semibold text-white shadow-[0_10px_30px_rgba(229,9,20,0.35)] sm:w-auto"
                style={{ background: `linear-gradient(135deg, ${RED}, ${RED}CC)` }}
              >
                <span
                  className="absolute inset-0 origin-left scale-x-0 transition-transform duration-300 ease-out group-hover:scale-x-100"
                  style={{ background: `linear-gradient(135deg, ${GOLD}, #B8912B)` }}
                />
                <span className="relative z-10 inline-flex items-center justify-center gap-2 whitespace-nowrap">
                  Become a Corporate Member
                  <ArrowRight size={15} className="transition-transform duration-300 group-hover:translate-x-1" />
                </span>
              </motion.button>
            </div>
            <button className="group inline-flex w-full items-center justify-center gap-2 whitespace-nowrap rounded-xl border border-white/15 bg-white/[0.04] px-7 py-3.5 text-center text-sm font-semibold text-white backdrop-blur-sm transition-colors hover:border-[#D4AF37]/50 hover:bg-white/[0.08] sm:w-auto">
              <Download size={15} className="text-[#A8A8A8] transition-colors group-hover:text-[#D4AF37]" />
              Download Brochure
            </button>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

/* ------------------------------------------------------------------ */
/*  Panel reveal — big containers rise in with a slight 3D tip          */
/* ------------------------------------------------------------------ */

const PanelReveal = ({ children, className = '', style }) => {
  const reduceMotion = useReducedMotion();
  return (
    <motion.div
      initial={reduceMotion ? false : { opacity: 0, y: 50, rotateX: 10 }}
      whileInView={{ opacity: 1, y: 0, rotateX: 0 }}
      viewport={{ once: true, amount: 0.08 }}
      transition={{ duration: 0.9, ease: EASE }}
      style={{ transformPerspective: 1400, transformOrigin: '50% 0%', ...style }}
      className={className}
    >
      {children}
    </motion.div>
  );
};

/* ------------------------------------------------------------------ */
/*  Section                                                             */
/* ------------------------------------------------------------------ */

const Roadtoglory = () => {
  const reduceMotion = useReducedMotion();
  const monthCols = useResponsiveCols(MONTH_BREAKPOINTS);
  const stepCols = useResponsiveCols(STEP_BREAKPOINTS);
  const maxXP = Math.max(...leaderboardData.map((e) => parseXP(e.xp)));
  const monthGridRef = useRef(null);
  const [expanded, setExpanded] = useState(false);

  const visibleRows = expanded ? leaderboardData : leaderboardData.slice(0, LEADERBOARD_PREVIEW);
  const leader = leaderboardData[0]; // profile preview always matches the real #1

  return (
    <section className="relative overflow-hidden bg-transparent px-4 py-16 text-white md:py-[120px]">
      <div className="section-shell relative mx-auto max-w-7xl space-y-12">
        {/* Header */}
        <div className="grid gap-8 lg:grid-cols-[1.05fr_0.95fr] lg:items-end">
          <div className="max-w-3xl">
            <motion.div
              initial={reduceMotion ? false : { opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, ease: EASE }}
              className="inline-flex items-center gap-2 rounded-full border border-[#E50914]/25 bg-[#E50914]/10 px-3 py-1.5 text-[11px] font-semibold uppercase tracking-[0.35em] text-[#E50914]"
            >
              <span className="h-2 w-2 rounded-full bg-[#E50914] shadow-[0_0_10px_#E50914]" />
              The Road to Glory
            </motion.div>
            <AnimatedHeading
              className="mt-6 text-3xl font-bold leading-tight tracking-tight sm:text-5xl lg:text-6xl"
              lead="A year of momentum, milestones and"
              accent="unforgettable experiences."
            />
            <ScrollRevealText
              className="mt-4 text-base leading-relaxed sm:text-lg"
              text="Every great workplace is built through consistent engagement, shared experiences and meaningful recognition."
            />
          </div>

          <PanelReveal className="relative grid grid-cols-3 gap-3 rounded-[24px] border border-white/10 bg-white/5 p-4 backdrop-blur-xl">
            <CornerMark corner="tl" active={false} />
            <CornerMark corner="br" active={false} />
            {[
              { value: '12', label: 'Monthly moments' },
              { value: '100%', label: 'Shared participation' },
              { value: '1', label: 'Annual champion' },
            ].map((stat) => (
              <motion.div
                key={stat.label}
                whileHover={reduceMotion ? undefined : { y: -4 }}
                className="rounded-[18px] border border-white/10 bg-[#0D0D0D]/70 p-3 text-center transition-colors hover:border-[#D4AF37]/40 sm:text-left"
              >
                <div className="text-xl font-bold text-white sm:text-2xl">
                  <RollingNumber value={stat.value} />
                </div>
                <div className="mt-1 line-clamp-2 text-xs text-[#A8A8A8]">{stat.label}</div>
              </motion.div>
            ))}
          </PanelReveal>
        </div>

        {/* Timeline */}
        <PanelReveal className="rounded-[32px] border border-white/10 bg-[linear-gradient(135deg,rgba(8,8,8,0.95),rgba(20,20,20,0.9))] p-5 shadow-[0_30px_80px_rgba(0,0,0,0.3)] backdrop-blur-2xl sm:p-8">
          <div className="flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
            <div className="max-w-2xl">
              <div className="text-[11px] font-semibold uppercase tracking-[0.35em] text-[#E50914]">Journey Timeline</div>
              <AnimatedHeading
                as="h3"
                className="mt-2 text-2xl font-bold sm:text-4xl"
                lead="A full-year path designed to build stronger teams."
              />
            </div>
            <div className="flex flex-wrap gap-2">
              <span className="rounded-full border border-white/10 bg-white/5 px-3 py-1.5 text-xs text-[#CFCFCF]">Monthly experiences</span>
              <span className="rounded-full border border-white/10 bg-white/5 px-3 py-1.5 text-xs text-[#CFCFCF]">Recognition moments</span>
            </div>
          </div>

          <YearRail targetRef={monthGridRef} />

          <div ref={monthGridRef} className="mt-6 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6">
            {roadToGloryMonths.map((item, index) => (
              <MonthCard3D key={item.month} item={item} index={index} cols={monthCols} />
            ))}
          </div>
        </PanelReveal>

        {/* Steps */}
        <PanelReveal className="rounded-[28px] border border-white/10 bg-[linear-gradient(135deg,rgba(5,5,5,0.96),rgba(18,18,18,0.9))] p-5 shadow-[0_20px_60px_rgba(0,0,0,0.3)] backdrop-blur-2xl sm:p-8">
          <div className="flex flex-col gap-3 lg:flex-row lg:items-end lg:justify-between">
            <div>
              <div className="text-[11px] font-semibold uppercase tracking-[0.35em] text-[#E50914]">How the journey unfolds</div>
              <AnimatedHeading
                as="h3"
                className="mt-2 text-xl font-semibold text-white sm:text-3xl"
                lead="A simple path from first join to annual recognition."
              />
            </div>
            <div className="w-fit rounded-full border border-white/10 bg-white/5 px-3 py-1.5 text-xs text-[#CFCFCF]">
              Built for participation and growth
            </div>
          </div>

          <div className="mt-8 grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
            {journeySteps.map((step, index) => (
              <StepCard3D
                key={step.title}
                step={step}
                index={index}
                cols={stepCols}
                isLast={index === journeySteps.length - 1}
              />
            ))}
          </div>
        </PanelReveal>

        {/* HAKI RANK */}
        <PanelReveal className="relative rounded-[33px] p-px">
          <div
            className="absolute inset-0 rounded-[33px]"
            style={{ background: `linear-gradient(135deg, ${GOLD}35, rgba(255,255,255,0.06) 40%, ${RED}25)` }}
          />
          <div className="relative rounded-[32px] bg-[#171717] p-5 shadow-[0_30px_80px_rgba(0,0,0,0.25)] sm:p-10">
            <div className="max-w-3xl">
              <div className="mb-2 flex items-center gap-2 text-[11px] font-semibold uppercase tracking-[0.35em] text-[#E50914]">
                <Crown size={13} style={{ color: GOLD }} />
                HAKI RANK
              </div>
              <AnimatedHeading className="text-3xl font-bold sm:text-5xl" lead="HAKI" accent="RANK" />
              <p className="mt-4 text-base leading-relaxed text-[#A8A8A8]">
                Recognizing organizations that consistently invest in employee engagement, teamwork, workplace wellness and sporting excellence.
              </p>
            </div>

            <div className="mt-8 grid gap-6 xl:grid-cols-[1.3fr_0.7fr]">
              {/* Leaderboard */}
              <div className="overflow-hidden rounded-[24px] border border-white/10 bg-[#0D0D0D] p-4 sm:p-6">
                <div className="mb-4 text-xs font-semibold uppercase tracking-[0.3em] text-[#E50914]">Ranking Criteria</div>
                <CriteriaBar />
                <div className="mb-6 grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-5">
                  {rankingCriteria.map((item, i) => (
                    <motion.div
                      key={item.label}
                      whileHover={reduceMotion ? undefined : { y: -3 }}
                      className="rounded-[16px] border border-white/10 bg-[#171717] p-3 text-center transition-colors hover:border-white/20 sm:text-left"
                    >
                      <div className="flex items-center justify-center gap-2 text-xl font-bold text-white sm:justify-start">
                        <span className="h-2 w-2 shrink-0 rounded-full" style={{ background: CRITERIA_COLORS[i] }} />
                        <RollingNumber value={item.value} />
                      </div>
                      <div className="mt-1 truncate text-xs text-[#A8A8A8]">{item.label}</div>
                    </motion.div>
                  ))}
                </div>

                {/* Desktop table */}
                <div className="hidden overflow-hidden rounded-[20px] border border-white/10 bg-[#0A0A0A] md:block">
                  <div
                    className="grid items-center gap-4 border-b border-white/10 bg-white/[0.02] px-4 py-3 text-[10px] font-semibold uppercase tracking-[0.28em] text-[#7A7A7A] sm:px-5"
                    style={{ gridTemplateColumns: LEADERBOARD_COLS }}
                  >
                    <span>Rank</span>
                    <span>Company</span>
                    <span>Current XP</span>
                    <span>Level</span>
                    <span>Badges</span>
                    <span>Move</span>
                  </div>
                  <div className="divide-y divide-white/[0.05]">
                    <AnimatePresence initial={false}>
                      {visibleRows.map((entry, i) => (
                        <LeaderboardRow key={entry.rank} entry={entry} maxXP={maxXP} i={i} />
                      ))}
                    </AnimatePresence>
                  </div>
                </div>

                {/* Mobile cards */}
                <div className="block space-y-3 md:hidden">
                  <div className="mb-1 text-xs font-semibold uppercase tracking-wider text-[#A8A8A8]">Standings</div>
                  <AnimatePresence initial={false}>
                    {visibleRows.map((entry, i) => (
                      <LeaderboardCardMobile key={entry.rank} entry={entry} maxXP={maxXP} i={i} />
                    ))}
                  </AnimatePresence>
                </div>

                <button
                  type="button"
                  onClick={() => setExpanded((v) => !v)}
                  aria-expanded={expanded}
                  className="mt-5 flex w-full items-center justify-center gap-1.5 rounded-xl border border-white/10 bg-white/[0.03] py-2.5 text-xs font-medium text-[#A8A8A8] transition-colors hover:border-[#D4AF37]/40 hover:text-white"
                >
                  {expanded ? `Show Top ${LEADERBOARD_PREVIEW}` : 'View Full Leaderboard'}
                  <motion.span animate={{ rotate: expanded ? 180 : 0 }} transition={{ duration: 0.3 }} className="inline-flex">
                    <ChevronDown size={14} />
                  </motion.span>
                </button>
              </div>

              {/* Side panels */}
              <div className="space-y-6">
                <div className="relative rounded-[24px] border border-white/10 bg-[#0D0D0D] p-5">
                  <div className="mb-4 text-xs font-semibold uppercase tracking-[0.3em] text-[#E50914]">Company Profile Preview</div>
                  <motion.div
                    whileHover={reduceMotion ? undefined : { scale: 1.015 }}
                    className="relative flex items-center gap-4 overflow-hidden rounded-[16px] border p-4"
                    style={{ borderColor: `${GOLD}40`, background: `linear-gradient(135deg, ${GOLD}12, #171717)` }}
                  >
                    <div
                      className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full font-bold text-[#0D0D0D]"
                      style={{ background: `linear-gradient(135deg, ${GOLD}, ${GOLD}CC)`, boxShadow: `0 0 22px ${GOLD}55` }}
                    >
                      {initials(leader.name)}
                    </div>
                    <div>
                      <div className="flex items-center gap-1.5 text-base font-semibold text-white">
                        <Crown size={14} style={{ color: GOLD }} />
                        {leader.name}
                      </div>
                      <div className="text-xs text-[#A8A8A8]">
                        Rank #{leader.rank} • {leader.xp}
                      </div>
                    </div>
                  </motion.div>
                  <div className="mt-4 space-y-2.5 text-xs text-[#A8A8A8] sm:text-sm">
                    {[
                      ['Company Level', leader.level],
                      ['Participation', '94%'],
                      ['Events Completed', '32'],
                      ['Badges Earned', leader.badges],
                      ['Next Milestone', 'Hold Rank #1'],
                    ].map(([k, v]) => (
                      <div key={k} className="flex items-center justify-between border-b border-white/[0.04] pb-2 last:border-0 last:pb-0">
                        <span>{k}</span>
                        <span className="text-white">{v}</span>
                      </div>
                    ))}
                  </div>
                  <motion.button
                    whileHover={reduceMotion ? undefined : { y: -2 }}
                    whileTap={{ scale: 0.98 }}
                    className="mt-5 w-full rounded-xl bg-[#E50914] py-2.5 text-sm font-semibold text-white shadow-[0_10px_26px_-10px_rgba(229,9,20,0.7)]"
                  >
                    View Profile
                  </motion.button>
                </div>

                <div className="rounded-[24px] border border-white/10 bg-[#0D0D0D] p-5">
                  <div className="mb-4 text-xs font-semibold uppercase tracking-[0.3em] text-[#E50914]">Achievement Badges</div>
                  <div className="flex flex-wrap gap-1.5">
                    {badges.map((badge, i) => {
                      const isLegend = badge === 'Legend';
                      return (
                        <motion.span
                          key={badge}
                          initial={reduceMotion ? false : { opacity: 0, scale: 0.7 }}
                          whileInView={{ opacity: 1, scale: 1 }}
                          viewport={{ once: true }}
                          transition={{ duration: 0.35, delay: i * 0.04, ease: EASE }}
                          whileHover={reduceMotion ? undefined : { y: -2 }}
                          className="relative cursor-default overflow-hidden rounded-full border px-2.5 py-1.5 text-[11px]"
                          style={
                            isLegend
                              ? { borderColor: `${GOLD}60`, color: GOLD, background: `${GOLD}14` }
                              : { borderColor: 'rgba(255,255,255,0.1)', color: '#A8A8A8', background: '#171717' }
                          }
                        >
                          {isLegend && !reduceMotion && (
                            <motion.span
                              className="absolute inset-0"
                              style={{ background: `linear-gradient(115deg, transparent 35%, ${GOLD}55 50%, transparent 65%)` }}
                              animate={{ x: ['-120%', '120%'] }}
                              transition={{ duration: 1.8, repeat: Infinity, repeatDelay: 2.2, ease: 'easeInOut' }}
                            />
                          )}
                          <span className="relative">{badge}</span>
                        </motion.span>
                      );
                    })}
                  </div>
                </div>
              </div>
            </div>

            {/* System info */}
            <div className="mt-6 grid gap-6 lg:grid-cols-[1fr_0.85fr]">
              <div className="rounded-[24px] border border-white/10 bg-[#0D0D0D] p-5">
                <div className="text-xs font-semibold uppercase tracking-[0.3em] text-[#E50914]">XP System</div>
                <p className="mt-2 text-xs leading-relaxed text-[#A8A8A8] sm:text-sm">
                  XP is backend configurable and awarded across participation, victories, fair play, and registration.
                </p>
                <div className="mt-4 flex flex-wrap gap-1.5">
                  {xpRules.map((rule) => (
                    <span
                      key={rule}
                      className="rounded-full border border-white/10 bg-[#171717] px-2.5 py-1.5 text-[11px] text-white transition-colors hover:border-[#E50914]/40"
                    >
                      {rule}
                    </span>
                  ))}
                </div>
              </div>

              <div className="rounded-[24px] border border-[#E50914]/20 bg-[#171717] p-5">
                <div className="mb-3 text-xs font-semibold uppercase tracking-[0.3em] text-[#E50914]">Why HAKI RANK Matters</div>
                <p className="text-xs leading-relaxed text-[#A8A8A8] sm:text-sm">
                  Unlike traditional single-elimination formats, HAKI RANK celebrates organizations that consistently invest in their teams all year round.
                </p>
                <div className="mt-4 rounded-[18px] border border-white/10 bg-[#0D0D0D] p-3 text-xs text-[#A8A8A8]">
                  <div className="mb-1 font-semibold text-white">Every XP Represents:</div>
                  <div className="leading-relaxed">Participation • Team Collaboration • Wellness • Consistency</div>
                </div>
              </div>
            </div>
          </div>
        </PanelReveal>

        <CTABanner />
      </div>
    </section>
  );
};

export default Roadtoglory;