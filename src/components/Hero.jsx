import React, { useRef, useMemo } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { ArrowRight, Sparkles } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import heroVideo from '../assets/Hero/cricket.mp4';

const stats = [
  { value: '25K+', label: 'Employees Engaged' },
  { value: '180+', label: 'Activities Conducted' },
  { value: '120+', label: 'Corporate Clients' },
  { value: '18', label: 'Cities Served' },
];

// Ambient embers drifting independently of scroll — constant low-level motion
const PARTICLES = Array.from({ length: 12 }, (_, i) => ({
  id: i,
  left: `${5 + Math.random() * 90}%`,
  top: `${8 + Math.random() * 75}%`,
  size: 2 + Math.random() * 4,
  duration: 5 + Math.random() * 7,
  delay: Math.random() * 5,
}));

const Hero = () => {
  const navigate = useNavigate();
  const sectionRef = useRef(null);

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start start', 'end start'],
  });

  // --- Video plane: now tilts on BOTH axes and pushes back in Z ---
  const videoRotateX = useTransform(scrollYProgress, [0, 1], [0, 14]);
  const videoRotateY = useTransform(scrollYProgress, [0, 1], [0, -6]);
  const videoZ = useTransform(scrollYProgress, [0, 1], [0, -220]);
  const videoScale = useTransform(scrollYProgress, [0, 1], [1, 1.25]);
  const overlayOpacity = useTransform(scrollYProgress, [0, 1], [0.5, 0.9]);

  // --- Perspective floor grid: sits behind the video, recedes faster ---
  const gridRotateX = useTransform(scrollYProgress, [0, 1], [55, 68]);
  const gridZ = useTransform(scrollYProgress, [0, 1], [-320, -520]);
  const gridOpacity = useTransform(scrollYProgress, [0, 0.6], [0.35, 0.1]);

  // --- Glow orbs at two different depths, drifting at different scroll rates ---
  const orbFarZ = useTransform(scrollYProgress, [0, 1], [-380, -560]);
  const orbFarY = useTransform(scrollYProgress, [0, 1], ['0%', '25%']);
  const orbFarRotate = useTransform(scrollYProgress, [0, 1], [0, 30]);

  const orbNearZ = useTransform(scrollYProgress, [0, 1], [-40, 60]);
  const orbNearY = useTransform(scrollYProgress, [0, 1], ['0%', '-20%']);
  const orbNearRotate = useTransform(scrollYProgress, [0, 1], [0, -22]);

  // --- Content: forward Z layer, drifts less than everything behind it ---
  const contentZ = useTransform(scrollYProgress, [0, 1], [0, 60]);
  const contentY = useTransform(scrollYProgress, [0, 1], ['0%', '30%']);
  const contentOpacity = useTransform(scrollYProgress, [0, 0.6], [1, 0]);

  const particles = useMemo(() => PARTICLES, []);

  return (
    <section
      ref={sectionRef}
      className="hero-section relative overflow-hidden text-white min-h-screen flex items-start"
      style={{ perspective: '1400px' }}
    >
      {/* 3D stage: preserve-3d lets child translateZ/rotateX values actually stack in depth */}
      <div className="absolute inset-0" style={{ transformStyle: 'preserve-3d' }}>

        {/* Perspective floor grid — deepest layer, sells the "stadium in 3D space" feel */}
        <motion.div
          className="absolute left-0 right-0 bottom-0 h-[70%] origin-bottom"
          style={{
            rotateX: gridRotateX,
            z: gridZ,
            opacity: gridOpacity,
            backgroundImage:
              'linear-gradient(rgba(229,9,20,0.4) 1px, transparent 1px), linear-gradient(90deg, rgba(229,9,20,0.4) 1px, transparent 1px)',
            backgroundSize: '48px 48px',
            transformStyle: 'preserve-3d',
          }}
        />

        {/* Far glow orb — slowest, deepest, largest */}
        <motion.div
          className="absolute -top-40 -left-32 h-[560px] w-[560px] rounded-full blur-[120px]"
          style={{
            background: 'radial-gradient(circle, rgba(229,9,20,0.28), transparent 70%)',
            z: orbFarZ,
            y: orbFarY,
            rotate: orbFarRotate,
          }}
        />

        {/* Near glow orb — moves opposite direction, closer to camera */}
        <motion.div
          className="absolute -bottom-32 -right-24 h-[420px] w-[420px] rounded-full blur-[100px]"
          style={{
            background: 'radial-gradient(circle, rgba(212,168,83,0.22), transparent 70%)',
            z: orbNearZ,
            y: orbNearY,
            rotate: orbNearRotate,
          }}
        />

        {/* Video plane — tilts on two axes now, not just one */}
        <motion.div
          className="absolute inset-0 origin-bottom"
          style={{
            rotateX: videoRotateX,
            rotateY: videoRotateY,
            z: videoZ,
            scale: videoScale,
            transformStyle: 'preserve-3d',
          }}
        >
          <video
            className="h-full w-full object-cover"
            src={heroVideo}
            autoPlay
            muted
            loop
            playsInline
          />
        </motion.div>

        {/* Ambient embers — constant motion independent of scroll */}
        {particles.map((p) => (
          <motion.span
            key={p.id}
            className="absolute rounded-full bg-[#E50914]/70"
            style={{ left: p.left, top: p.top, width: p.size, height: p.size }}
            animate={{ y: [0, -20, 0], opacity: [0.15, 0.75, 0.15] }}
            transition={{ duration: p.duration, delay: p.delay, repeat: Infinity, ease: 'easeInOut' }}
          />
        ))}

        <motion.div
          className="absolute inset-0 bg-gradient-to-t from-[#050505] via-[#050505]/60 to-[#050505]/10"
          style={{ opacity: overlayOpacity }}
        />
        <div className="absolute inset-0 pointer-events-none bg-[radial-gradient(circle_at_top_right,rgba(229,9,20,0.16),transparent_22%)]" />
      </div>

      {/* Content sits on its own forward Z layer so it reads as "in front of" everything behind it */}
      <motion.div
        className="section-shell relative w-full py-16 lg:py-20"
        style={{ y: contentY, opacity: contentOpacity, z: contentZ, transformStyle: 'preserve-3d' }}
      >
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="max-w-2xl"
        >
          <div className="hero-badge mb-5 inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-2 text-[11px] font-semibold uppercase tracking-[0.3em] text-[#C0C0C0] backdrop-blur-sm">
            <Sparkles size={14} className="text-[#E50914]" />
            Corporate Employee Engagement Platform
          </div>
          <h1 className="hero-heading text-5xl leading-[0.95] sm:text-6xl lg:text-7xl">
            Building Stronger Workplaces Through
            <span className="hero-heading-highlight block">Sports, Team Building &amp; Employee Engagement</span>
          </h1>
          <p className="mt-6 max-w-xl text-lg leading-8 text-[#C0C0C0]">
            HAKIRUSH helps organizations strengthen workplace culture through professionally managed corporate sports, employee engagement programs, team building experiences and workplace wellness initiatives.
          </p>
          <div className="hero-cta-grid mt-8">
            <button className="btn-primary cursor-pointer" onClick={() => navigate('/services')}>
              Explore Solutions
              <ArrowRight size={16} />
            </button>
            <button className="btn-secondary cursor-pointer" onClick={() => navigate('/contact')}>
              Schedule Consultation
            </button>
          </div>
        </motion.div>

        <div className="mt-14 grid gap-6 border-t border-white/10 pt-8 sm:grid-cols-2 xl:grid-cols-4">
          {stats.map((stat) => (
            <div key={stat.label}>
              <div className="text-2xl font-semibold text-white">{stat.value}</div>
              <div className="mt-1 text-sm text-[#C0C0C0]">{stat.label}</div>
            </div>
          ))}
        </div>
      </motion.div>
    </section>
  );
};

export default Hero;