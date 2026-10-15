import React, { useRef, useState, useEffect } from 'react';
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
import { ArrowRight, BadgeCheck, BarChart3, HeartPulse, ShieldCheck, Sparkles, Users2, Trophy } from 'lucide-react';
import { Link } from 'react-router-dom';

const GOLD = '#D4AF37';
const RED = '#E50914';
const CARD = '#111112';
const EASE = [0.22, 1, 0.36, 1];

/* ------------------------------------------------------------------ */
/* Hooks                                                               */
/* ------------------------------------------------------------------ */

// matchMedia-based: only re-renders when the query actually flips,
// not on every resize pixel.
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

// Pointer-driven tilt. The ref goes on a NON-rotating wrapper so the
// measured rect stays stable while the inner card rotates.
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

  return {
    ref,
    x,
    y,
    rotateX,
    rotateY,
    isHovered,
    handlers: { onPointerMove, onPointerEnter, onPointerLeave },
  };
};

/* ------------------------------------------------------------------ */
/* Number roll + scroll-reveal text (unchanged behaviour)              */
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
  const chars = String(value).split('');

  return (
    <span ref={ref} className={`inline-flex tabular-nums ${className}`}>
      {chars.map((char, i) => (
        <RollingDigit key={i} char={char} play={inView} delay={i * 0.08} />
      ))}
    </span>
  );
};

const ScrollRevealWord = ({ word, index, total, scrollYProgress }) => {
  const start = index / total;
  const end = start + 1 / total;
  const opacity = useTransform(scrollYProgress, [start, end], [0.25, 1]);
  const color = useTransform(scrollYProgress, [start, end], ['rgba(255,255,255,0.3)', 'rgba(255,255,255,1)']);

  return (
    <motion.span style={{ opacity, color }} className="inline-block">
      {word}
      {'\u00A0'}
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

/* ------------------------------------------------------------------ */
/* Headline: words flip up out of a 3D hinge                           */
/* ------------------------------------------------------------------ */

// The in-view trigger lives on the (never-clipped) heading, not on each
// word — a word hidden inside an overflow mask never counts as "in view",
// which is why the headline stayed invisible before.
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
          transition={{ duration: 0.85, delay: shown ? delayOffset + i * 0.06 : 0, ease: EASE }}
        >
          {word}
        </motion.span>
      </span>{' '}
    </React.Fragment>
  ));
};

const AnimatedHeading = () => {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, amount: 0.2 });

  return (
    <h2
      ref={ref}
      className="text-4xl font-semibold leading-tight text-white sm:text-5xl lg:text-6xl"
      style={{ textShadow: '0 4px 30px rgba(0,0,0,0.65)' }}
    >
      <RiseWords text="Premium employee engagement," play={inView} />
      <RiseWords text="built for modern organisations." className="text-red-600" delayOffset={0.25} play={inView} />
    </h2>
  );
};

/* ------------------------------------------------------------------ */
/* Data                                                                */
/* ------------------------------------------------------------------ */

const reasons = [
  {
    icon: Users2,
    title: 'Employee Engagement',
    description:
      'A calendar of curated experiences your teams actually look forward to — not a one-off offsite, but a reason to show up every month.',
  },
  {
    icon: Trophy,
    title: 'Team Building',
    description:
      'Mixed-department line-ups and inter-team fixtures build trust on the field first, so it carries back into the workplace.',
  },
  {
    icon: Sparkles,
    title: 'Corporate Sports',
    description:
      'Professionally run tournaments, real jerseys, and match-day production — sport delivered at the standard your brand expects.',
  },
  {
    icon: HeartPulse,
    title: 'Workplace Wellness',
    description:
      'Movement built into the work week, not bolted on — wellness formats that fit around calendars instead of competing with them.',
  },
  {
    icon: ShieldCheck,
    title: 'Employer Branding',
    description:
      'A visible, values-led program that becomes part of how candidates and employees describe what it\u2019s like to work at your company.',
  },
  {
    icon: BarChart3,
    title: 'Analytics & Reports',
    description:
      'Every match, badge, and HAKI RANK movement rolls up into leadership-ready reporting on participation and engagement.',
  },
];

/* ------------------------------------------------------------------ */
/* Card pieces                                                         */
/* ------------------------------------------------------------------ */

const CornerMark = ({ corner, active }) => {
  const pos = {
    tl: 'top-3 left-3 border-t border-l',
    tr: 'top-3 right-3 border-t border-r',
    bl: 'bottom-3 left-3 border-b border-l',
    br: 'bottom-3 right-3 border-b border-r',
  }[corner];

  const d = active ? 3 : 0;
  const shift = {
    tl: { x: -d, y: -d },
    tr: { x: d, y: -d },
    bl: { x: -d, y: d },
    br: { x: d, y: d },
  }[corner];

  return (
    <motion.span
      className={`pointer-events-none absolute h-4 w-4 ${pos}`}
      initial={false}
      animate={{
        ...shift,
        z: active ? 30 : 10,
        opacity: active ? 1 : 0.55,
        borderColor: active ? RED : 'rgba(212,175,55,0.35)',
      }}
      transition={{ duration: 0.35, ease: 'easeOut' }}
    />
  );
};

const ReasonCard3D = ({ item, index, fromLeft, delay, canHover }) => {
  const reduceMotion = useReducedMotion();
  const interactive = canHover && !reduceMotion;
  const { ref, x, y, rotateX, rotateY, isHovered, handlers } = useTilt(18, !interactive);

  /* ---------------- Scroll-scrubbed motion ----------------
     Everything below is tied to scroll POSITION, not time: scroll
     slowly and the card moves slowly, stop and it freezes mid-flip,
     scroll back up and it plays in reverse. A light spring smooths
     out mouse-wheel steps so it never feels jerky. */

  // Entrance: from the card's top touching the bottom of the screen
  // until it reaches ~55% up the viewport.
  const { scrollYProgress: enterRaw } = useScroll({ target: ref, offset: ['start end', 'start 0.55'] });
  const enter = useSpring(enterRaw, { stiffness: 120, damping: 26, mass: 0.4 });

  // Per-column stagger: later columns start later and catch up.
  const s = delay * 0.9; // 0 / ~0.11 / ~0.22
  const range = [s, 1];
  const side = fromLeft ? -1 : 1;

  const enterX = useTransform(enter, range, [side * 160, 0]);
  const enterY = useTransform(enter, range, [140, 0]);
  const enterZ = useTransform(enter, range, [-320, 0]);
  const enterRotX = useTransform(enter, range, [62, 0]);
  const enterRotY = useTransform(enter, range, [side * 42, 0]);
  const enterRotZ = useTransform(enter, range, [side * 6, 0]);
  const enterScale = useTransform(enter, range, [0.82, 1]);
  const enterOpacity = useTransform(enter, [s, s + (1 - s) * 0.45], [0, 1]);
  // (no blur here on purpose — a CSS filter flattens preserve-3d children)

  // After it settles: keeps tilting as it travels up and out of view,
  // so the card stays alive for the whole scroll.
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start end', 'end start'] });
  const travel = useSpring(scrollYProgress, { stiffness: 120, damping: 26, mass: 0.4 });
  const scrollTiltX = useTransform(travel, [0, 0.5, 1], [0, 0, -18]);
  const scrollTiltY = useTransform(travel, [0, 0.5, 1], [0, 0, side * -10]);
  const exitY = useTransform(travel, [0.6, 1], [0, -40]);
  const exitOpacity = useTransform(travel, [0.8, 1], [1, 0.4]);
  const combinedY = useTransform([enterY, exitY], ([a, b]) => a + b);

  // Layers "pop" off the surface in the last stretch of the entrance
  const iconZ = useTransform(enter, [0.65, 1], [0, 80]);
  const titleZ = useTransform(enter, [0.7, 1], [0, 50]);
  const bodyZ = useTransform(enter, [0.75, 1], [0, 28]);
  const combinedOpacity = useTransform([enterOpacity, exitOpacity], ([a, b]) => a * b);

  // Smoothly hand control from scroll-tilt to pointer-tilt on hover
  const hoverMix = useSpring(0, { stiffness: 180, damping: 24 });
  useEffect(() => {
    hoverMix.set(isHovered ? 1 : 0);
  }, [isHovered, hoverMix]);
  const blendedX = useTransform([rotateX, scrollTiltX, hoverMix], ([t, s, m]) => t * m + s * (1 - m));
  const blendedY = useTransform([rotateY, scrollTiltY, hoverMix], ([t, s, m]) => t * m + s * (1 - m));

  const Icon = item.icon;
  const num = String(index + 1).padStart(2, '0');

  // Cursor-tracked specular glare (white core, red falloff)
  const glareX = useTransform(x, (v) => `${(v + 0.5) * 100}%`);
  const glareY = useTransform(y, (v) => `${(v + 0.5) * 100}%`);
  const glare = useMotionTemplate`radial-gradient(420px circle at ${glareX} ${glareY}, rgba(255,255,255,0.11), rgba(229,9,20,0.12) 28%, transparent 60%)`;

  // Shadow falls opposite the tilt, like a real object under a key light
  const shadow = useTransform([blendedX, blendedY], ([rx, ry]) => {
    const sx = -ry * 2.4;
    const sy = 30 + rx * 2.4;
    return `${sx}px ${sy}px 70px -24px rgba(0,0,0,0.95), ${sx * 0.4}px ${sy * 0.4}px 34px -18px rgba(229,9,20,0.3)`;
  });

  // Edge thickness: a light rim on the side tilted toward the viewer,
  // which is what makes a flat card read as a physical slab.
  const rim = useTransform([blendedX, blendedY], ([rx, ry]) => {
    const angle = Math.atan2(rx, -ry) * (180 / Math.PI) + 90;
    const strength = Math.min(1, Math.hypot(rx, ry) / 18);
    return `linear-gradient(${angle}deg, rgba(255,255,255,${0.18 * strength}), transparent 35%)`;
  });

  // Icon floats on its own plane and drifts with the cursor
  const iconX = useTransform(x, [-0.5, 0.5], [-8, 8]);
  const iconY = useTransform(y, [-0.5, 0.5], [-8, 8]);

  const appliedRotateX = reduceMotion ? 0 : blendedX;
  const appliedRotateY = reduceMotion ? 0 : blendedY;

  return (
    <div ref={ref} {...handlers} className="h-full" style={{ perspective: 900 }}>
      {/* scroll-scrubbed "card deal": flips up off the table, swings in from
          the side and rises out of depth — all driven by scroll position */}
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
          className="relative flex h-full flex-col rounded-2xl p-8"
          style={{
            rotateX: appliedRotateX,
            rotateY: appliedRotateY,
            boxShadow: reduceMotion ? '0 26px 60px -24px rgba(0,0,0,0.85)' : shadow,
            transformStyle: 'preserve-3d',
          }}
          animate={{ z: isHovered ? 60 : 0, scale: isHovered ? 1.02 : 1 }}
          transition={{ type: 'spring', stiffness: 260, damping: 22 }}
        >
          {/* ---- Clipped surface layer. Kept separate from the content so
                 overflow-hidden doesn't flatten the 3D children. ---- */}
          <div className="pointer-events-none absolute inset-0 overflow-hidden rounded-2xl">
            {/* gradient border — rest */}
            <div
              className="absolute inset-0"
              style={{ background: 'linear-gradient(135deg, rgba(255,255,255,0.09), rgba(255,255,255,0.02))' }}
            />
            {/* gradient border — hover (crossfaded; gradients can't CSS-transition) */}
            <div
              className="absolute inset-0 transition-opacity duration-500"
              style={{
                background: `linear-gradient(135deg, ${GOLD}90, rgba(255,255,255,0.05) 45%, ${RED}70)`,
                opacity: isHovered ? 1 : 0,
              }}
            />
            {/* base plate with locker-tag hatch */}
            <div
              className="absolute inset-px rounded-[15px]"
              style={{
                background: CARD,
                backgroundImage:
                  'repeating-linear-gradient(135deg, rgba(255,255,255,0.025) 0px, rgba(255,255,255,0.025) 1px, transparent 1px, transparent 10px)',
              }}
            />
            {/* tilt-reactive rim light */}
            {!reduceMotion && <motion.div className="absolute inset-0" style={{ background: rim }} />}
            {/* top-edge sheen */}
            <div className="absolute inset-x-6 top-px h-px bg-gradient-to-r from-transparent via-white/20 to-transparent" />
            {/* cursor glare */}
            <motion.div
              className="absolute inset-0 transition-opacity duration-300"
              style={{ background: glare, opacity: isHovered ? 1 : 0 }}
            />
            {/* foil sweep — once per hover */}
            <motion.div
              className="absolute inset-0"
              style={{
                background: `linear-gradient(115deg, transparent 30%, ${GOLD}22 45%, ${RED}2A 50%, ${GOLD}22 55%, transparent 70%)`,
              }}
              initial={{ x: '-120%' }}
              animate={{ x: isHovered && !reduceMotion ? '120%' : '-120%' }}
              transition={{ duration: 0.9, ease: 'easeInOut' }}
            />
            {/* ghost jersey number bleeding off the top */}
            <span
              className="absolute -top-6 right-3 select-none font-black leading-none text-white transition-opacity duration-500"
              style={{ fontSize: '6.5rem', opacity: isHovered ? 0.08 : 0.045 }}
            >
              {num}
            </span>
          </div>

          {/* ---- 3D content: each layer sits on its own Z plane ---- */}
          <CornerMark corner="tl" active={isHovered} />
          <CornerMark corner="tr" active={isHovered} />
          <CornerMark corner="bl" active={isHovered} />
          <CornerMark corner="br" active={isHovered} />

          <motion.div
            className="relative flex items-center"
            style={{
              x: interactive ? iconX : 0,
              y: interactive ? iconY : 0,
              z: reduceMotion ? 80 : iconZ,
              transformStyle: 'preserve-3d',
            }}
          >
            {/* idle float — the chip gently hovers above the card surface */}
            <motion.div
              className="flex"
              animate={reduceMotion ? undefined : { y: [0, -5, 0], rotateZ: [0, -1.5, 0] }}
              transition={{ duration: 3.2, repeat: Infinity, ease: 'easeInOut', delay: index * 0.35 }}
            >
            <div
              className="flex items-stretch overflow-hidden rounded-lg border backdrop-blur-sm"
              style={{
                borderColor: isHovered ? `${RED}66` : `${GOLD}40`,
                boxShadow: isHovered ? `0 12px 28px -10px ${RED}80` : '0 8px 20px -12px rgba(0,0,0,0.8)',
                transition: 'border-color 0.35s, box-shadow 0.35s',
              }}
            >
              <div
                className="flex h-11 w-11 items-center justify-center text-sm font-bold"
                style={{
                  background: isHovered ? `${RED}1F` : 'rgba(255,255,255,0.05)',
                  color: isHovered ? RED : GOLD,
                  transition: 'all 0.35s',
                }}
              >
                {num}
              </div>
              <div
                className="flex h-11 w-11 items-center justify-center border-l"
                style={{
                  borderColor: isHovered ? `${RED}33` : 'rgba(255,255,255,0.08)',
                  background: 'rgba(255,255,255,0.02)',
                  color: GOLD,
                }}
              >
                <motion.span
                  animate={{ rotate: isHovered && !reduceMotion ? [0, -12, 8, 0] : 0, scale: isHovered ? 1.12 : 1 }}
                  transition={{ duration: 0.6, ease: 'easeOut' }}
                  className="inline-flex"
                >
                  <Icon size={16} />
                </motion.span>
              </div>
            </div>
            </motion.div>
          </motion.div>

          <motion.h3 className="relative mt-6 text-2xl font-medium text-white" style={{ z: reduceMotion ? 45 : titleZ }}>
            {item.title}
          </motion.h3>

          <motion.div
            className="relative mt-2 h-px rounded-full"
            style={{ background: `linear-gradient(90deg, ${RED}, ${GOLD})`, transform: 'translateZ(35px)' }}
            initial={false}
            animate={{ width: isHovered ? 56 : 16, opacity: isHovered ? 1 : 0.5 }}
            transition={{ duration: 0.4, ease: EASE }}
          />

          <motion.p
            className="relative mt-3 flex-1 text-sm leading-7 text-[#9C9C9C] transition-colors duration-500"
            style={{ z: reduceMotion ? 25 : bodyZ, color: isHovered ? '#BDBDBD' : undefined }}
          >
            {item.description}
          </motion.p>
        </motion.article>
      </motion.div>
    </div>
  );
};

/* ------------------------------------------------------------------ */
/* Trust plaque — tilts too                                            */
/* ------------------------------------------------------------------ */

const TrustPlaque = ({ canHover }) => {
  const reduceMotion = useReducedMotion();
  const interactive = canHover && !reduceMotion;
  const { ref, rotateX, rotateY, isHovered, handlers } = useTilt(7, !interactive);

  return (
    <div ref={ref} {...handlers} style={{ perspective: 1000 }}>
      <motion.div
        initial={reduceMotion ? { opacity: 0 } : { opacity: 0, rotateX: 25, y: 40, z: -120 }}
        whileInView={{ opacity: 1, rotateX: 0, y: 0, z: 0 }}
        viewport={{ once: true, amount: 0.5 }}
        transition={{ duration: 1, ease: EASE, delay: 0.2 }}
        style={{ transformStyle: 'preserve-3d' }}
      >
        <motion.div
          className="relative rounded-2xl p-px"
          style={{
            rotateX: interactive ? rotateX : 0,
            rotateY: interactive ? rotateY : 0,
            transformStyle: 'preserve-3d',
            background: `linear-gradient(135deg, ${GOLD}70, rgba(255,255,255,0.04) 50%, ${RED}45)`,
            boxShadow: '0 30px 60px -28px rgba(0,0,0,0.9)',
          }}
          animate={{ z: isHovered ? 25 : 0 }}
          transition={{ type: 'spring', stiffness: 260, damping: 22 }}
        >
          <div className="relative rounded-[15px] p-6" style={{ background: CARD, transformStyle: 'preserve-3d' }}>
            <CornerMark corner="tl" active={isHovered} />
            <CornerMark corner="br" active={isHovered} />

            <div
              className="flex items-center gap-2 text-[11px] font-semibold uppercase tracking-[0.3em] text-red-600"
              style={{ transform: 'translateZ(30px)' }}
            >
              <span className="relative flex h-2 w-2">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-red-600 opacity-60" />
                <span className="relative inline-flex h-2 w-2 rounded-full bg-red-600" />
              </span>
              <BadgeCheck size={14} />
              Trusted Nationwide
            </div>

            <div
              className="mt-5 flex items-end justify-between border-b border-white/10 pb-4"
              style={{ transform: 'translateZ(45px)' }}
            >
              <span className="text-3xl font-semibold text-white">
                <RollingNumber value="200+" />
              </span>
              <span className="text-xs text-[#9C9C9C]">Companies engaged</span>
            </div>

            <div className="mt-4 flex items-end justify-between" style={{ transform: 'translateZ(45px)' }}>
              <span className="text-3xl font-semibold text-white">
                <RollingNumber value="12+" />
              </span>
              <span className="text-xs text-[#9C9C9C]">Indian cities</span>
            </div>
          </div>
        </motion.div>
      </motion.div>
    </div>
  );
};

/* ------------------------------------------------------------------ */
/* Backdrop: glow orbs + perspective grid floor with scroll parallax   */
/* ------------------------------------------------------------------ */

const SectionBackdrop = ({ progress }) => {
  const reduceMotion = useReducedMotion();
  const gridShift = useTransform(progress, [0, 1], ['0px', '-256px']);

  const gridLine = 'rgba(212,175,55,0.09)';

  return (
    <div aria-hidden className="pointer-events-none absolute inset-0 overflow-hidden">

      {/* stadium-floor grid receding into the distance */}
      <div className="absolute inset-x-0 bottom-0 h-[65%]" style={{ perspective: 900 }}>
        <motion.div
          className="absolute -inset-x-1/2 -bottom-[10%] h-[140%]"
          style={{
            rotateX: 68,
            transformOrigin: '50% 100%',
            backgroundImage: `linear-gradient(${gridLine} 1px, transparent 1px), linear-gradient(90deg, ${gridLine} 1px, transparent 1px)`,
            backgroundSize: '64px 64px',
            backgroundPositionY: reduceMotion ? '0px' : gridShift,
            maskImage: 'linear-gradient(to top, black 5%, transparent 70%)',
            WebkitMaskImage: 'linear-gradient(to top, black 5%, transparent 70%)',
          }}
        />
      </div>

      <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-[#D4AF37]/30 to-transparent" />
    </div>
  );
};

/* ------------------------------------------------------------------ */
/* Section                                                             */
/* ------------------------------------------------------------------ */

const WhyHakirush = () => {
  const sectionRef = useRef(null);
  const reduceMotion = useReducedMotion();
  const isMobile = useMediaQuery('(max-width: 767px)'); // matches md: breakpoint
  const canHover = useMediaQuery('(hover: hover) and (pointer: fine)');
  const { scrollYProgress } = useScroll({ target: sectionRef, offset: ['start end', 'end start'] });

  return (
    <section ref={sectionRef} className="relative overflow-hidden bg-transparent py-[100px] text-white">
      <SectionBackdrop progress={scrollYProgress} />

      <div className="section-shell relative">
        <div className="mb-16 grid gap-10 lg:grid-cols-[1.4fr_0.6fr] lg:items-end">
          <div>
            <motion.div
              className="mb-5 flex items-center gap-3"
              initial={reduceMotion ? false : { opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, ease: EASE }}
            >
              <span className="h-1.5 w-1.5 rounded-full bg-[#E50914] shadow-[0_0_12px_#E50914]" />
              <span className="text-[11px] font-semibold uppercase tracking-[0.35em] text-[#E50914]">Why HAKIRUSH</span>
              <motion.span
                className="h-px max-w-[60px] flex-1 origin-left bg-gradient-to-r from-[#D4AF37]/60 to-transparent"
                initial={reduceMotion ? false : { scaleX: 0 }}
                whileInView={{ scaleX: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, delay: 0.3, ease: EASE }}
              />
            </motion.div>

            <AnimatedHeading />

            <ScrollRevealText
              className="mt-5 max-w-2xl text-lg leading-8"
              text="HAKIRUSH brings together sport, culture, wellness and recognition in one platform for companies that want engagement they can actually measure."
            />
          </div>

          <TrustPlaque canHover={canHover} />
        </div>

        <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
          {reasons.map((item, index) => {
            const fromLeft = isMobile ? index % 2 === 0 : Math.floor(index / 3) % 2 === 0;
            const col = index % 3;
            const delay = isMobile ? 0 : (fromLeft ? col : 2 - col) * 0.12;

            return (
              <ReasonCard3D
                key={item.title}
                item={item}
                index={index}
                fromLeft={fromLeft}
                delay={delay}
                canHover={canHover}
              />
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default WhyHakirush;