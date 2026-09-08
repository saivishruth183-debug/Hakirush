import React, { useRef, useState, useEffect } from 'react';
import { motion, useMotionValue, useSpring, useTransform, useReducedMotion, useScroll, useInView } from 'framer-motion';
import { ArrowRight, BadgeCheck, BarChart3, ChevronDown, Crown, Download, Sparkles, Trophy, Users2 } from 'lucide-react';

/* ------------------------------------------------------------------ */
/*  Shared tilt hook — safely handles touch/mobile screens            */
/* ------------------------------------------------------------------ */
const useTilt = (strength = 8, disabled = false) => {
  const ref = useRef(null);
  const [isHovered, setIsHovered] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const rafRef = useRef(null);

  useEffect(() => {
    const mq = window.matchMedia('(max-width: 768px)');
    const update = () => setIsMobile(mq.matches);
    update();
    mq.addEventListener('change', update);
    return () => mq.removeEventListener('change', update);
  }, []);

  useEffect(() => () => {
    if (rafRef.current) cancelAnimationFrame(rafRef.current);
  }, []);

  const rotateX = useSpring(useTransform(y, [-0.5, 0.5], [strength, -strength]), {
    stiffness: 260,
    damping: 22,
  });
  const rotateY = useSpring(useTransform(x, [-0.5, 0.5], [-strength, strength]), {
    stiffness: 260,
    damping: 22,
  });

  const handleMouseMove = (e) => {
    if (disabled || isMobile || !ref.current) return;
    const clientX = e.clientX;
    const clientY = e.clientY;
    if (rafRef.current) cancelAnimationFrame(rafRef.current);
    rafRef.current = requestAnimationFrame(() => {
      if (!ref.current) return;
      const rect = ref.current.getBoundingClientRect();
      x.set((clientX - rect.left) / rect.width - 0.5);
      y.set((clientY - rect.top) / rect.height - 0.5);
    });
  };

  const handleMouseLeave = () => {
    if (rafRef.current) cancelAnimationFrame(rafRef.current);
    x.set(0);
    y.set(0);
    setIsHovered(false);
  };

  return { ref, x, y, rotateX, rotateY, isHovered, setIsHovered, handleMouseMove, handleMouseLeave };
};

const GOLD = '#D4AF37';
const SILVER = '#C7CBD1';
const BRONZE = '#B8763E';
const RED = '#E50914';
const GREEN = '#34D399';

/* ------------------------------------------------------------------ */
/*  Corner frame — shared signature                                    */
/* ------------------------------------------------------------------ */
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
      className={`pointer-events-none absolute h-3.5 w-3.5 ${pos}`}
      animate={{
        ...shift,
        opacity: active ? 1 : 0.5,
        borderColor: active ? RED : 'rgba(212,175,55,0.35)',
      }}
      transition={{ duration: 0.35, ease: 'easeOut' }}
    />
  );
};

/* One-pass gold→red foil sweep — shared signature, never loops */
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
/*  ScrollRevealText — word-by-word scroll-linked reveal                */
/* ------------------------------------------------------------------ */
const ScrollRevealWord = ({ word, index, total, scrollYProgress }) => {
  const start = index / total;
  const end = start + 1 / total;
  const opacity = useTransform(scrollYProgress, [start, end], [0.25, 1]);
  const color = useTransform(
    scrollYProgress,
    [start, end],
    ['rgba(255,255,255,0.3)', 'rgba(255,255,255,1)']
  );

  return (
    <motion.span style={{ opacity, color }} className="inline-block">
      {word}{'\u00A0'}
    </motion.span>
  );
};

const ScrollRevealText = ({ text, className = '' }) => {
  const ref = useRef(null);
  const reduceMotion = useReducedMotion();
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start 0.9', 'start 0.25'],
  });
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

/* ------------------------------------------------------------------ */
/*  useResponsiveCols — mirrors the Tailwind grid breakpoints           */
/* ------------------------------------------------------------------ */
const useResponsiveCols = (breakpoints) => {
  const getCols = () => {
    if (typeof window === 'undefined') return breakpoints[0].cols;
    const w = window.innerWidth;
    let cols = breakpoints[0].cols;
    for (const bp of breakpoints) {
      if (w >= bp.min) cols = bp.cols;
    }
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
  { min: 640, cols: 2 }, // sm
  { min: 1024, cols: 3 }, // lg
  { min: 1280, cols: 6 }, // xl
];

const STEP_BREAKPOINTS = [
  { min: 0, cols: 1 },
  { min: 640, cols: 2 }, // sm
  { min: 1280, cols: 4 }, // xl
];

/* ------------------------------------------------------------------ */
/*  RollingNumber — odometer-style digit roll.                          */
/*  once: false — every number resets to 0 and rolls back up to its     */
/*  target EVERY time it scrolls into view, not just the first time.    */
/* ------------------------------------------------------------------ */
const DIGIT_HEIGHT_EM = 1;

const RollingDigit = ({ char, play, delay }) => {
  const reduceMotion = useReducedMotion();
  const isDigit = /[0-9]/.test(char);

  if (!isDigit) {
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
        animate={
          reduceMotion
            ? { y: `-${target * DIGIT_HEIGHT_EM}em` }
            : play
            ? { y: `-${target * DIGIT_HEIGHT_EM}em` }
            : { y: 0 }
        }
        transition={reduceMotion ? { duration: 0 } : { duration: 0.9, delay, ease: [0.22, 1, 0.36, 1] }}
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
  const chars = String(value).split('');

  return (
    <span ref={ref} className={`inline-flex tabular-nums ${className}`}>
      {chars.map((char, i) => (
        <RollingDigit key={i} char={char} play={inView} delay={i * 0.08} />
      ))}
    </span>
  );
};

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

const leaderboardData = [
  { rank: 1, name: 'TechNova Solutions', xp: '24,850 XP', level: 'Level 10', badges: '18', movement: '▲ +3', profile: 'View Profile' },
  { rank: 2, name: 'Skyline Innovations', xp: '23,740 XP', level: 'Level 10', badges: '17', movement: '▲ +1', profile: 'View Profile' },
  { rank: 3, name: 'Quantum Dynamics', xp: '22,980 XP', level: 'Level 9', badges: '16', movement: '—', profile: 'View Profile' },
  { rank: 4, name: 'Vertex Technologies', xp: '21,860 XP', level: 'Level 9', badges: '15', movement: '▼ -1', profile: 'View Profile' },
  { rank: 5, name: 'Fusion Enterprises', xp: '20,940 XP', level: 'Level 8', badges: '14', movement: '▲ +2', profile: 'View Profile' },
  { rank: 6, name: 'Pinnacle Industries', xp: '19,830 XP', level: 'Level 8', badges: '13', movement: '▼ -2', profile: 'View Profile' },
  { rank: 7, name: 'NovaEdge Corp', xp: '18,920 XP', level: 'Level 7', badges: '12', movement: '▲ +4', profile: 'View Profile' },
  { rank: 8, name: 'Elevate Systems', xp: '17,610 XP', level: 'Level 7', badges: '11', movement: '—', profile: 'View Profile' },
  { rank: 9, name: 'Zenith Global', xp: '16,740 XP', level: 'Level 6', badges: '10', movement: '▲ +1', profile: 'View Profile' },
  { rank: 10, name: 'Horizon Digital', xp: '15,980 XP', level: 'Level 6', badges: '9', movement: '▼ -3', profile: 'View Profile' },
];

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

/* Podium tier lookup — the one signature move on this page */
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
/*  MonthCard3D — cards replay entrance every time they cross into view */
/* ------------------------------------------------------------------ */
const MonthCard3D = ({ item, index, cols }) => {
  const reduceMotion = useReducedMotion();
  const { ref, x, y, rotateX, rotateY, isHovered, setIsHovered, handleMouseMove, handleMouseLeave } = useTilt(7, reduceMotion);
  const Icon = item.icon;
  const rowIndex = Math.floor(index / cols);
  const colInRow = index % cols;
  const fromLeft = rowIndex % 2 !== 0;
  const slideX = reduceMotion ? 0 : fromLeft ? -70 : 70;
  const staggerIndex = fromLeft ? colInRow : cols - 1 - colInRow;

  const glow = useTransform([x, y], ([xv, yv]) =>
    `radial-gradient(circle at ${(xv + 0.5) * 100}% ${(yv + 0.5) * 100}%, rgba(229,9,20,0.2), transparent 60%)`
  );

  return (
    <div className="h-full" style={{ perspective: 900 }}>
      <motion.div
        initial={{ opacity: 0, x: slideX, rotate: fromLeft ? -1.5 : 1.5, scale: 0.96 }}
        whileInView={{ opacity: 1, x: 0, rotate: 0, scale: 1 }}
        viewport={{ once: false, amount: 0.3, margin: '-10% 0px -10% 0px' }}
        transition={{ duration: 0.45, delay: staggerIndex * 0.05, ease: [0.22, 1, 0.36, 1] }}
        animate={{ y: isHovered && !reduceMotion ? -6 : 0 }}
        className="h-full rounded-[20px] p-px transition-colors duration-500"
        style={{
          background: isHovered
            ? `linear-gradient(135deg, ${GOLD}70, rgba(255,255,255,0.06) 45%, ${RED}55)`
            : 'linear-gradient(135deg, rgba(255,255,255,0.07), rgba(255,255,255,0.02))',
        }}
      >
        <motion.article
          ref={ref}
          onMouseMove={handleMouseMove}
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={handleMouseLeave}
          style={{
            rotateX: reduceMotion ? 0 : rotateX,
            rotateY: reduceMotion ? 0 : rotateY,
            transformStyle: 'preserve-3d',
          }}
          className="group relative h-full overflow-hidden rounded-[19px] bg-[#111111]/95 p-4 shadow-[0_12px_35px_rgba(0,0,0,0.22)]"
        >
          <motion.div
            className="absolute inset-0 pointer-events-none rounded-[inherit]"
            style={{ background: glow, opacity: isHovered ? 1 : 0, transition: 'opacity 0.3s' }}
          />
          <FoilSweep active={isHovered} reduceMotion={reduceMotion} />

          <CornerMark corner="tl" active={isHovered} />
          <CornerMark corner="tr" active={isHovered} />
          <CornerMark corner="bl" active={isHovered} />
          <CornerMark corner="br" active={isHovered} />

          <div className="relative flex items-center justify-between gap-3" style={{ transform: 'translateZ(10px)' }}>
            <div className="rounded-full bg-[#E50914]/15 px-2.5 py-1 text-[10px] font-semibold uppercase tracking-[0.3em] text-[#E50914]">{item.month}</div>
            <div className="text-xs font-medium text-[#A8A8A8]">{item.theme}</div>
          </div>

          <div className="relative mt-4 rounded-[16px] border border-white/10 bg-gradient-to-br from-[#242424] via-[#161616] to-[#0D0D0D] p-3 shadow-[inset_0_1px_0_rgba(255,255,255,0.04)]" style={{ transform: 'translateZ(6px)' }}>
            <div className="flex min-h-[112px] flex-col justify-between rounded-[14px] border border-white/10 bg-[radial-gradient(circle_at_top_left,rgba(229,9,20,0.18),transparent_55%)] p-3 shadow-inner shadow-black/30">
              <div className="relative inline-flex h-9 w-9 items-center justify-center" style={{ transform: 'translateZ(28px)' }}>
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
                  animate={{ scale: isHovered ? 1.1 : 1 }}
                  transition={{ type: 'spring', stiffness: 300, damping: 18 }}
                  className="relative flex h-7 w-7 items-center justify-center rounded-full bg-white/10 text-[#E50914]"
                >
                  <Icon size={15} />
                </motion.div>
              </div>
              <div style={{ transform: 'translateZ(18px)' }}>
                <div className="text-sm font-semibold text-white">{item.event}</div>
                <div className="mt-2 text-[11px] uppercase tracking-[0.25em] text-[#E50914]">{item.badge}</div>
              </div>
            </div>
          </div>

          <div className="relative mt-3 text-xs leading-5 text-[#A8A8A8]" style={{ transform: 'translateZ(6px)' }}>
            Sponsor: <span className="text-[#CFCFCF]">{item.sponsor}</span>
          </div>
        </motion.article>
      </motion.div>
    </div>
  );
};

/* ------------------------------------------------------------------ */
/*  3D STEP CARD — lighter tilt for the journey steps grid             */
/* ------------------------------------------------------------------ */
const StepCard3D = ({ step, index, icon: Icon, cols }) => {
  const reduceMotion = useReducedMotion();
  const { ref, rotateX, rotateY, isHovered, setIsHovered, handleMouseMove, handleMouseLeave } = useTilt(6, reduceMotion);
  const rowIndex = Math.floor(index / cols);
  const colInRow = index % cols;
  const fromLeft = rowIndex === 0;
  const slideX = reduceMotion ? 0 : fromLeft ? -60 : 60;
  const staggerIndex = fromLeft ? colInRow : cols - 1 - colInRow;

  return (
    <div className="h-full" style={{ perspective: 800 }}>
      <motion.div
        initial={{ opacity: 0, x: slideX, rotate: fromLeft ? -1.5 : 1.5, scale: 0.96 }}
        whileInView={{ opacity: 1, x: 0, rotate: 0, scale: 1 }}
        viewport={{ once: false, amount: 0.3, margin: '-10% 0px -10% 0px' }}
        transition={{ duration: 0.45, delay: staggerIndex * 0.06, ease: [0.22, 1, 0.36, 1] }}
        className="h-full"
      >
        <motion.div
          ref={ref}
          onMouseMove={handleMouseMove}
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={handleMouseLeave}
          animate={{ y: isHovered && !reduceMotion ? -5 : 0 }}
          style={{
            rotateX: reduceMotion ? 0 : rotateX,
            rotateY: reduceMotion ? 0 : rotateY,
            transformStyle: 'preserve-3d',
          }}
          className="group relative flex h-full flex-col overflow-hidden rounded-[20px] border border-white/10 bg-[#050505]/90 p-5 shadow-[0_16px_40px_rgba(0,0,0,0.28)] transition-colors duration-300 hover:border-[#E50914]/35"
        >
          <FoilSweep active={isHovered} reduceMotion={reduceMotion} />

          <CornerMark corner="tl" active={isHovered} />
          <CornerMark corner="tr" active={isHovered} />
          <CornerMark corner="bl" active={isHovered} />
          <CornerMark corner="br" active={isHovered} />

          <div className="relative flex items-center justify-between" style={{ transform: 'translateZ(14px)' }}>
            <div className="flex items-center gap-2.5">
              <div className="flex h-10 w-10 items-center justify-center rounded-full border border-[#E50914]/20 bg-[#E50914]/10 text-[#E50914] shadow-[0_0_20px_rgba(229,9,20,0.12)]">
                <Icon size={16} />
              </div>
              <div className="rounded-full border border-white/10 bg-white/[0.04] px-2.5 py-1 text-[10px] font-semibold uppercase tracking-[0.3em] text-[#A8A8A8]">
                Step {index + 1}
              </div>
            </div>
            <div className="text-[10px] uppercase tracking-[0.28em] text-[#E50914]">Next</div>
          </div>
          <div className="relative mt-4 text-sm font-semibold leading-7 text-[#F3F3F3]" style={{ transform: 'translateZ(10px)' }}>{step.title}</div>
          <p className="relative mt-2 flex-1 text-sm leading-6 text-[#8E8E8E]" style={{ transform: 'translateZ(10px)' }}>{step.blurb}</p>
          <div className="relative mt-5 flex items-center justify-between border-t border-white/10 pt-3 text-[10px] uppercase tracking-[0.28em] text-[#A8A8A8]" style={{ transform: 'translateZ(10px)' }}>
            <span>Progression</span>
            <div className="flex items-center gap-2">
              <div className="h-px w-8 bg-gradient-to-r from-white/20 via-white/40 to-[#E50914]/70" />
              <ArrowRight size={12} className="text-[#E50914]" />
            </div>
          </div>
        </motion.div>
      </motion.div>
    </div>
  );
};

/* ------------------------------------------------------------------ */
/*  Podium rank badge — gold / silver / bronze                          */
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
      className="inline-flex h-7 w-7 items-center justify-center rounded-full text-xs font-bold text-[#0D0D0D]"
      style={{ background: `linear-gradient(135deg, ${tier.color}, ${tier.color}CC)`, boxShadow: `0 0 14px ${tier.color}55` }}
    >
      {Icon ? <Icon size={13} /> : rank}
    </span>
  );
};

/* ------------------------------------------------------------------ */
/*  Movement pill                                                       */
/* ------------------------------------------------------------------ */
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

/* ------------------------------------------------------------------ */
/*  XP bar                                                               */
/* ------------------------------------------------------------------ */
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
        animate={{ width: reduceMotion ? `${pct}%` : inView ? `${pct}%` : 0 }}
        transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
      />
    </div>
  );
};

/* ------------------------------------------------------------------ */
/*  Leaderboard row (desktop)                                            */
/* ------------------------------------------------------------------ */
const LEADERBOARD_COLS = '52px minmax(0,1fr) 160px 84px 64px 92px';

const LeaderboardRow = ({ entry, maxXP }) => {
  const tier = tierFor(entry.rank);
  return (
    <motion.div
      whileHover={{ x: 3 }}
      transition={{ type: 'spring', stiffness: 420, damping: 32 }}
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

/* Mobile stacked card */
const LeaderboardCardMobile = ({ entry, maxXP }) => {
  const tier = tierFor(entry.rank);
  return (
    <div
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
    </div>
  );
};

/* ------------------------------------------------------------------ */
/*  CTA BANNER                                                          */
/* ------------------------------------------------------------------ */
const CTABanner = () => {
  const reduceMotion = useReducedMotion();
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className="relative rounded-[33px] p-px"
      style={{ background: `linear-gradient(135deg, ${RED}70, rgba(255,255,255,0.06) 45%, ${GOLD}55)` }}
    >
      <div
        className="relative overflow-hidden rounded-[32px] p-8 sm:p-12"
        style={{ background: 'linear-gradient(135deg, rgba(23,7,8,0.92), rgba(10,10,11,0.97) 55%, rgba(26,20,4,0.88))' }}
      >
        <div className="pointer-events-none absolute -right-20 -top-24 h-72 w-72 rounded-full blur-[110px]" style={{ background: `${RED}30` }} />
        <div className="pointer-events-none absolute -left-16 -bottom-20 h-64 w-64 rounded-full blur-[100px]" style={{ background: `${GOLD}22` }} />

        <Crown className="pointer-events-none absolute -right-8 -top-10 text-white/[0.04]" size={240} strokeWidth={0.6} />

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
            <h3 className="mt-5 text-2xl sm:text-4xl font-bold tracking-tight leading-tight text-white">
              Become a corporate member and turn every month into{' '}
              <span className="text-red-600">a shared celebration.</span>
            </h3>
            <p className="mt-3 max-w-xl text-sm sm:text-base leading-relaxed text-[#C7C7C7]">
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
            <div
              className="w-full rounded-xl p-px sm:w-auto"
              style={{ background: `linear-gradient(135deg, ${GOLD}, ${RED})` }}
            >
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
    </div>
  );
};

const Roadtoglory = () => {
  const monthCols = useResponsiveCols(MONTH_BREAKPOINTS);
  const stepCols = useResponsiveCols(STEP_BREAKPOINTS);
  const maxXP = Math.max(...leaderboardData.map((e) => parseXP(e.xp)));

  return (
    <section className="relative overflow-hidden bg-transparent py-16 md:py-[120px] text-white px-4">
      <div className="absolute inset-0" />
      <div className="absolute left-1/2 top-16 h-[360px] w-[360px] -translate-x-1/2 rounded-full bg-[#E50914]/10 blur-[130px]" />

      <div className="section-shell relative max-w-7xl mx-auto space-y-12">

        {/* Top Header Block */}
        <div className="grid gap-8 lg:grid-cols-[1.05fr_0.95fr] lg:items-end">
          <div className="max-w-3xl">
            <div className="inline-flex items-center gap-2 rounded-full border border-[#E50914]/25 bg-[#E50914]/10 px-3 py-1.5 text-[11px] font-semibold uppercase tracking-[0.35em] text-[#E50914]">
              <span className="h-2 w-2 rounded-full" />
              The Road to Glory
            </div>
            <h2 className="mt-6 text-3xl sm:text-5xl lg:text-6xl font-bold tracking-tight leading-tight">
              A year of momentum, milestones and{' '}
              <span className="text-red-600">unforgettable experiences.</span>
            </h2>
            <ScrollRevealText
              className="mt-4 text-base sm:text-lg leading-relaxed"
              text="Every great workplace is built through consistent engagement, shared experiences and meaningful recognition."
            />
          </div>

          <div className="relative grid gap-3 rounded-[24px] border border-white/10 bg-white/5 p-4 backdrop-blur-xl grid-cols-3">
            <CornerMark corner="tl" active={false} />
            <CornerMark corner="br" active={false} />
            {[
              { value: '12', label: 'Monthly moments' },
              { value: '100%', label: 'Shared participation' },
              { value: '1', label: 'Annual champion' },
            ].map((stat) => (
              <div key={stat.label} className="rounded-[18px] border border-white/10 bg-[#0D0D0D]/70 p-3 text-center sm:text-left">
                <div className="text-xl sm:text-2xl font-bold text-white">
                  <RollingNumber value={stat.value} />
                </div>
                <div className="mt-1 text-xs text-[#A8A8A8] line-clamp-2">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Timeline Section */}
        <div className="rounded-[32px] border border-white/10 bg-[linear-gradient(135deg,rgba(8,8,8,0.95),rgba(20,20,20,0.9))] p-5 shadow-[0_30px_80px_rgba(0,0,0,0.3)] backdrop-blur-2xl sm:p-8">
          <div className="flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
            <div className="max-w-2xl">
              <div className="text-[11px] font-semibold uppercase tracking-[0.35em] text-[#E50914]">Journey Timeline</div>
              <h3 className="mt-2 text-2xl sm:text-4xl font-bold">A full-year path designed to build stronger teams.</h3>
            </div>
            <div className="flex flex-wrap gap-2">
              <span className="rounded-full border border-white/10 bg-white/5 px-3 py-1.5 text-xs text-[#CFCFCF]">Monthly experiences</span>
              <span className="rounded-full border border-white/10 bg-white/5 px-3 py-1.5 text-xs text-[#CFCFCF]">Recognition moments</span>
            </div>
          </div>

          <div className="mt-8 grid gap-4 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6">
            {roadToGloryMonths.map((item, index) => (
              <MonthCard3D key={item.month} item={item} index={index} cols={monthCols} />
            ))}
          </div>
        </div>

        {/* Steps Journey Section */}
        <div>
          <div className="rounded-[28px] border border-white/10 bg-[linear-gradient(135deg,rgba(5,5,5,0.96),rgba(18,18,18,0.9))] p-5 shadow-[0_20px_60px_rgba(0,0,0,0.3)] backdrop-blur-2xl sm:p-8">
            <div className="flex flex-col gap-3 lg:flex-row lg:items-end lg:justify-between">
              <div>
                <div className="text-[11px] font-semibold uppercase tracking-[0.35em] text-[#E50914]">How the journey unfolds</div>
                <h3 className="mt-2 text-xl font-semibold text-white sm:text-3xl">A simple path from first join to annual recognition.</h3>
              </div>
              <div className="w-fit rounded-full border border-white/10 bg-white/5 px-3 py-1.5 text-xs text-[#CFCFCF]">
                Built for participation and growth
              </div>
            </div>

            <div className="mt-8 grid gap-4 grid-cols-1 sm:grid-cols-2 xl:grid-cols-4">
              {journeySteps.map((step, index) => (
                <StepCard3D
                  key={step.title}
                  step={step}
                  index={index}
                  icon={step.icon}
                  cols={stepCols}
                />
              ))}
            </div>
          </div>
        </div>

        {/* HAKI RANK Details & Interactive Leaderboard */}
        <div
          className="rounded-[33px] p-px"
          style={{ background: `linear-gradient(135deg, ${GOLD}35, rgba(255,255,255,0.06) 40%, ${RED}25)` }}
        >
          <div className="rounded-[32px] bg-[#171717] p-5 shadow-[0_30px_80px_rgba(0,0,0,0.25)] sm:p-10">
            <div className="max-w-3xl">
              <div className="mb-2 flex items-center gap-2 text-[11px] font-semibold uppercase tracking-[0.35em] text-[#E50914]">
                <Crown size={13} style={{ color: GOLD }} />
                HAKI RANK
              </div>
              <h2 className="text-3xl sm:text-5xl font-bold flex flex-row gap-2">
                <span>HAKI</span>
                <span className="text-red-600">RANK</span>
              </h2>
              <p className="mt-4 text-base text-[#A8A8A8] leading-relaxed">
                Recognizing organizations that consistently invest in employee engagement, teamwork, workplace wellness and sporting excellence.
              </p>
            </div>

            <div className="mt-8 grid gap-6 xl:grid-cols-[1.3fr_0.7fr]">

              {/* Left Leaderboard Area */}
              <div className="rounded-[24px] border border-white/10 bg-[#0D0D0D] p-4 sm:p-6 overflow-hidden">
                <div className="mb-5 text-xs font-semibold uppercase tracking-[0.3em] text-[#E50914]">Ranking Criteria</div>
                <div className="grid gap-3 grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 mb-6">
                  {rankingCriteria.map((item) => (
                    <div key={item.label} className="rounded-[16px] border border-white/10 bg-[#171717] p-3 text-center sm:text-left">
                      <div className="text-xl font-bold text-white">
                        <RollingNumber value={item.value} />
                      </div>
                      <div className="mt-1 text-xs text-[#A8A8A8] truncate">{item.label}</div>
                    </div>
                  ))}
                </div>

                {/* DESKTOP LEDGER VIEW */}
                <div className="hidden md:block overflow-hidden rounded-[20px] border border-white/10 bg-[#0A0A0A]">
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
                    {leaderboardData.map((entry) => (
                      <LeaderboardRow key={entry.rank} entry={entry} maxXP={maxXP} />
                    ))}
                  </div>
                </div>

                {/* MOBILE STACKED CARDS VIEW */}
                <div className="block md:hidden space-y-3">
                  <div className="text-xs font-semibold uppercase tracking-wider text-[#A8A8A8] mb-1">Standings</div>
                  {leaderboardData.map((entry) => (
                    <LeaderboardCardMobile key={entry.rank} entry={entry} maxXP={maxXP} />
                  ))}
                </div>

                <button className="mt-5 flex w-full items-center justify-center gap-1.5 rounded-xl border border-white/10 bg-white/[0.03] py-2.5 text-xs font-medium text-[#A8A8A8] transition-colors hover:border-[#D4AF37]/40 hover:text-white">
                  View Full Leaderboard
                  <ChevronDown size={14} />
                </button>
              </div>

              {/* Right Side Info Panels */}
              <div className="space-y-6">
                <div className="relative rounded-[24px] border border-white/10 bg-[#0D0D0D] p-5">
                  <div className="mb-4 text-xs font-semibold uppercase tracking-[0.3em] text-[#E50914]">Company Profile Preview</div>
                  <div
                    className="flex items-center gap-4 rounded-[16px] border p-4"
                    style={{ borderColor: `${GOLD}40`, background: `linear-gradient(135deg, ${GOLD}12, #171717)` }}
                  >
                    <div
                      className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full font-bold text-[#0D0D0D]"
                      style={{ background: `linear-gradient(135deg, ${GOLD}, ${GOLD}CC)` }}
                    >
                      NL
                    </div>
                    <div>
                      <div className="flex items-center gap-1.5 text-base font-semibold text-white">
                        <Crown size={14} style={{ color: GOLD }} />
                        Northstar Labs
                      </div>
                      <div className="text-xs text-[#A8A8A8]">Rank #1 • 18,420 XP</div>
                    </div>
                  </div>
                  <div className="mt-4 space-y-2.5 text-xs sm:text-sm text-[#A8A8A8]">
                    <div className="flex items-center justify-between"><span>Company Level</span><span className="text-white">Level 9</span></div>
                    <div className="flex items-center justify-between"><span>Participation</span><span className="text-white">94%</span></div>
                    <div className="flex items-center justify-between"><span>Events Completed</span><span className="text-white">32</span></div>
                    <div className="flex items-center justify-between"><span>Badges Earned</span><span className="text-white">12</span></div>
                    <div className="flex items-center justify-between"><span>Next Milestone</span><span className="text-white">Level 10</span></div>
                  </div>
                  <button className="mt-5 w-full bg-[#E50914] text-white py-2.5 rounded-xl text-sm font-semibold transition-transform active:scale-[0.98]">
                    View Profile
                  </button>
                </div>

                <div className="rounded-[24px] border border-white/10 bg-[#0D0D0D] p-5">
                  <div className="mb-4 text-xs font-semibold uppercase tracking-[0.3em] text-[#E50914]">Achievement Badges</div>
                  <div className="flex flex-wrap gap-1.5">
                    {badges.map((badge) => {
                      const isLegend = badge === 'Legend';
                      return (
                        <span
                          key={badge}
                          className="rounded-full border px-2.5 py-1.5 text-[11px]"
                          style={
                            isLegend
                              ? { borderColor: `${GOLD}60`, color: GOLD, background: `${GOLD}14` }
                              : { borderColor: 'rgba(255,255,255,0.1)', color: '#A8A8A8', background: '#171717' }
                          }
                        >
                          {badge}
                        </span>
                      );
                    })}
                  </div>
                </div>
              </div>
            </div>

            {/* System Info Block */}
            <div className="mt-6 grid gap-6 lg:grid-cols-[1fr_0.85fr]">
              <div className="rounded-[24px] border border-white/10 bg-[#0D0D0D] p-5">
                <div className="text-xs font-semibold uppercase tracking-[0.3em] text-[#E50914]">XP System</div>
                <p className="mt-2 text-xs sm:text-sm leading-relaxed text-[#A8A8A8]">
                  XP is backend configurable and awarded across participation, victories, fair play, and registration.
                </p>
                <div className="mt-4 flex flex-wrap gap-1.5">
                  {xpRules.map((rule) => (
                    <span key={rule} className="rounded-full border border-white/10 bg-[#171717] px-2.5 py-1.5 text-[11px] text-white">{rule}</span>
                  ))}
                </div>
              </div>

              <div className="rounded-[24px] border border-[#E50914]/20 bg-[#171717] p-5">
                <div className="mb-3 text-xs font-semibold uppercase tracking-[0.3em] text-[#E50914]">Why HAKI RANK Matters</div>
                <p className="text-xs sm:text-sm leading-relaxed text-[#A8A8A8]">
                  Unlike traditional single-elimination formats, HAKI RANK celebrates organizations that consistently invest in their teams all year round.
                </p>
                <div className="mt-4 rounded-[18px] border border-white/10 bg-[#0D0D0D] p-3 text-xs text-[#A8A8A8]">
                  <div className="mb-1 font-semibold text-white">Every XP Represents:</div>
                  <div className="leading-relaxed">Participation • Team Collaboration • Wellness • Consistency</div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <CTABanner />

      </div>
    </section>
  );
};

export default Roadtoglory;