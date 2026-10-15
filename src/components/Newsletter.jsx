import React, { useRef, useState, useEffect, createContext, useContext } from 'react';
import {
  motion,
  useMotionValue,
  useSpring,
  useTransform,
  useMotionTemplate,
  useReducedMotion,
  useScroll,
  useInView,
} from 'framer-motion';
import { Link } from 'react-router-dom';
import { Trophy, Activity, Target, ArrowRight, BadgeCheck } from 'lucide-react';

const GOLD = '#D4AF37';
const RED = '#E50914';
const EASE = [0.22, 1, 0.36, 1];
// Scroll-scrub smoothing: follows the scrollbar, irons out wheel steps
const SCRUB = { stiffness: 120, damping: 26, mass: 0.4 };

/* ------------------------------------------------------------------ */
/*  Data                                                                */
/* ------------------------------------------------------------------ */

const solutions = [
  {
    title: 'Annual Employee Engagement',
    description: 'A year-long engagement journey aligning monthly experiences with culture, recognition and wellness.',
    benefits: ['Monthly experiences', 'Custom branding', 'Leadership reporting'],
    href: '/services/annualpackage',
    icon: Trophy,
    tag: 'Year-round',
  },
  {
    title: 'Quarterly Corporate Championships',
    description: 'High-profile tournaments built for organisational visibility, participation and team pride.',
    benefits: ['Inter-company formats', 'Curation & production', 'Premium event activations'],
    href: '/services/quarterly',
    icon: Activity,
    tag: 'Every quarter',
  },
  {
    title: 'Custom Corporate Experiences',
    description: 'Tailored initiatives for onboarding, wellness weeks, leadership retreats and culture-building moments.',
    benefits: ['Flexible programming', 'Dedicated strategy', 'Elevated execution'],
    href: '/contact',
    icon: Target,
    tag: 'Made to order',
  },
];

const SOLUTION_BREAKPOINTS = [
  { min: 0, cols: 1 },
  { min: 1024, cols: 3 },
];

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

/* ------------------------------------------------------------------ */
/*  Signature pieces                                                    */
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

/* Words flip up from a 3D hinge; trigger sits on the whole heading */
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

const AnimatedHeading = ({ lead, accent, className = '' }) => {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, amount: 0.2 });
  const leadCount = lead.split(' ').length;
  return (
    <h3 ref={ref} className={className}>
      <RiseWords text={lead} play={inView} />
      {accent && <RiseWords text={accent} className="text-red-600" delayOffset={leadCount * 0.05 + 0.05} play={inView} />}
    </h3>
  );
};

/* ------------------------------------------------------------------ */
/*  ScrollCard3D — same card shell as the Road to Glory cards           */
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

const ScrollCard3D = ({ index, cols, radius = 24, tilt = 10, surface = '#0D0D0D', padding = 'p-5', ghost, children }) => {
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
  const enterRotX = useTransform(enter, range, [55, 0]);
  const enterRotY = useTransform(enter, range, [side * 36, 0]);
  const enterRotZ = useTransform(enter, range, [side * 5, 0]);
  const enterScale = useTransform(enter, range, [0.84, 1]);
  const enterOpacity = useTransform(enter, [s, s + (1 - s) * 0.45], [0, 1]);

  const { scrollYProgress } = useScroll({ target: ref, offset: ['start end', 'end start'] });
  const travel = useSpring(scrollYProgress, SCRUB);
  const travelTiltX = useTransform(travel, [0, 0.55, 1], [0, 0, -14]);
  const travelTiltY = useTransform(travel, [0, 0.55, 1], [0, 0, side * -7]);
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
  const glare = useMotionTemplate`radial-gradient(420px circle at ${glareX} ${glareY}, rgba(255,255,255,0.10), rgba(229,9,20,0.12) 30%, transparent 60%)`;

  const shadow = useTransform([blendedX, blendedY], ([rx, ry]) => {
    const sx = -ry * 2.2;
    const sy = 26 + rx * 2.2;
    return `${sx}px ${sy}px 60px -22px rgba(0,0,0,0.95), ${sx * 0.4}px ${sy * 0.4}px 30px -16px rgba(229,9,20,0.28)`;
  });

  const rim = useTransform([blendedX, blendedY], ([rx, ry]) => {
    const angle = Math.atan2(rx, -ry) * (180 / Math.PI) + 90;
    const strength = Math.min(1, Math.hypot(rx, ry) / 14);
    return `linear-gradient(${angle}deg, rgba(255,255,255,${0.18 * strength}), transparent 35%)`;
  });

  return (
    <div ref={ref} {...handlers} className="h-full" style={{ perspective: 1100 }}>
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
          {/* clipped surface — kept separate so the 3D content isn't flattened */}
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
                className="absolute -top-5 right-3 select-none font-black leading-none text-white transition-opacity duration-500"
                style={{ fontSize: '6rem', opacity: isHovered ? 0.08 : 0.04 }}
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
/*  Solution card — Road to Glory card layout                           */
/* ------------------------------------------------------------------ */

const SolutionCard3D = ({ solution, index, cols }) => {
  const Icon = solution.icon;

  return (
    <ScrollCard3D index={index} cols={cols} padding="p-5 sm:p-6" ghost={String(index + 1).padStart(2, '0')}>
      {({ isHovered, reduceMotion }) => (
        <>
          {/* top row: pill + tag (same as month name + theme) */}
          <Layer depth={30} className="relative flex items-center justify-between gap-3">
            <div
              className="rounded-full px-2.5 py-1 text-[10px] font-semibold uppercase tracking-[0.3em] text-[#E50914] transition-colors duration-300"
              style={{ background: isHovered ? `${RED}2E` : `${RED}1F` }}
            >
              Solution {index + 1}
            </div>
            <div className="text-xs font-medium text-[#A8A8A8]">{solution.tag}</div>
          </Layer>

          {/* inner panel */}
          <Layer
            depth={16}
            className="relative mt-5 rounded-[18px] border border-white/10 bg-gradient-to-br from-[#242424] via-[#161616] to-[#0D0D0D] p-3 shadow-[inset_0_1px_0_rgba(255,255,255,0.04)]"
          >
            <div
              className="flex min-h-[170px] flex-col justify-between rounded-[15px] border border-white/10 bg-[radial-gradient(circle_at_top_left,rgba(229,9,20,0.18),transparent_55%)] p-4"
              style={{ transformStyle: 'preserve-3d' }}
            >
              <Layer depth={46} className="relative inline-flex h-11 w-11 items-center justify-center">
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
                  className="relative flex h-9 w-9 items-center justify-center rounded-full bg-white/10 text-[#E50914]"
                >
                  <Icon size={17} strokeWidth={1.75} />
                </motion.div>
              </Layer>

              <Layer depth={26} className="mt-5">
                <h4 className="text-xl font-semibold leading-tight text-white sm:text-2xl">{solution.title}</h4>
                <p className="mt-2 text-sm leading-6 text-[#A8A8A8]">{solution.description}</p>
              </Layer>
            </div>
          </Layer>

          {/* benefits */}
          <Layer depth={14} as="ul" className="relative mt-5 flex-1 space-y-3 text-sm text-white">
            {solution.benefits.map((benefit, i) => (
              <motion.li
                key={benefit}
                className="flex items-center gap-2.5"
                initial={reduceMotion ? false : { opacity: 0, x: -12 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, margin: '-10% 0px' }}
                transition={{ duration: 0.45, delay: 0.2 + i * 0.08, ease: EASE }}
              >
                <motion.span
                  className="inline-flex"
                  animate={{ scale: isHovered ? 1.15 : 1, rotate: isHovered ? 360 : 0 }}
                  transition={{ duration: 0.5, delay: isHovered ? i * 0.06 : 0, ease: 'easeOut' }}
                >
                  <BadgeCheck size={16} className="shrink-0 text-[#E50914]" />
                </motion.span>
                {benefit}
              </motion.li>
            ))}
          </Layer>

          {/* footer: Learn More (same as the step-card progression row) */}
          <Layer depth={20} className="relative mt-6 border-t border-white/10 pt-4">
            <Link
              to={solution.href}
              className="group/link flex items-center justify-between rounded-md text-[11px] font-semibold uppercase tracking-[0.28em] text-[#CFCFCF] outline-none transition-colors hover:text-white focus-visible:ring-2 focus-visible:ring-[#E50914]"
            >
              <span>Learn More</span>
              <span className="flex items-center gap-2">
                <motion.span
                  className="h-px bg-gradient-to-r from-white/20 via-white/40 to-[#E50914]/70"
                  initial={false}
                  animate={{ width: isHovered ? 52 : 28 }}
                  transition={{ duration: 0.35, ease: EASE }}
                />
                <motion.span
                  className="flex h-8 w-8 items-center justify-center rounded-full"
                  style={{
                    background: isHovered ? RED : `${RED}1F`,
                    border: `1px solid ${RED}55`,
                    boxShadow: isHovered ? `0 10px 24px -8px ${RED}AA` : 'none',
                    transition: 'background 0.3s, box-shadow 0.3s',
                  }}
                  animate={{ x: isHovered ? 3 : 0 }}
                  transition={{ type: 'spring', stiffness: 300, damping: 18 }}
                >
                  <ArrowRight size={14} className={isHovered ? 'text-white' : 'text-[#E50914]'} />
                </motion.span>
              </span>
            </Link>
          </Layer>
        </>
      )}
    </ScrollCard3D>
  );
};

/* ------------------------------------------------------------------ */
/*  Section                                                             */
/* ------------------------------------------------------------------ */

const CTASection = () => {
  const reduceMotion = useReducedMotion();
  const cols = useResponsiveCols(SOLUTION_BREAKPOINTS);

  return (
    <section className="relative overflow-hidden bg-transparent py-24 font-sans">
      <div className="relative z-10 mx-auto max-w-7xl px-6">
        <motion.div
          initial={reduceMotion ? false : { opacity: 0, y: 50, rotateX: 10 }}
          whileInView={{ opacity: 1, y: 0, rotateX: 0 }}
          viewport={{ once: true, amount: 0.08 }}
          transition={{ duration: 0.9, ease: EASE }}
          style={{ transformPerspective: 1400, transformOrigin: '50% 0%' }}
          className="relative mt-5 rounded-[32px] border border-white/10 bg-[#171717] p-6 shadow-[0_30px_80px_rgba(0,0,0,0.3)] sm:p-10 lg:p-12"
        >
          <CornerMark corner="tl" active={false} />
          <CornerMark corner="br" active={false} />

          <div className="mb-10 flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
            <div className="max-w-2xl">
              <motion.div
                initial={reduceMotion ? false : { opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, ease: EASE }}
                className="mb-3 flex items-center gap-3"
              >
                <span className="h-1.5 w-1.5 rounded-full bg-[#E50914] shadow-[0_0_12px_#E50914]" />
                <span className="text-[11px] font-semibold uppercase tracking-[0.35em] text-[#E50914]">Our Solutions</span>
                <motion.span
                  className="h-px max-w-[60px] flex-1 origin-left bg-gradient-to-r from-[#D4AF37]/60 to-transparent"
                  initial={reduceMotion ? false : { scaleX: 0 }}
                  whileInView={{ scaleX: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.8, delay: 0.3, ease: EASE }}
                />
              </motion.div>
              <AnimatedHeading
                className="text-3xl font-bold tracking-tight text-white sm:text-4xl"
                lead="Three Premium Ways to"
                accent="Elevate Your Workplace"
              />
            </div>
            <motion.p
              initial={reduceMotion ? false : { opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7, delay: 0.3, ease: EASE }}
              className="max-w-xl text-sm leading-7 text-[#A8A8A8]"
            >
              Every solution is built to feel premium, polished and relevant for HR leaders, founders and corporate teams.
            </motion.p>
          </div>

          <div className="grid gap-6 lg:grid-cols-3">
            {solutions.map((solution, index) => (
              <SolutionCard3D key={solution.title} solution={solution} index={index} cols={cols} />
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default CTASection;