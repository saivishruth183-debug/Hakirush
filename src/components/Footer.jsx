import React, { useRef, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useMotionValue, useSpring, useTransform } from 'framer-motion';
import { Mail, Phone, MapPin, Linkedin, Instagram, Youtube, Facebook, Check } from 'lucide-react';
import { Link } from 'react-router-dom';

/* ------------------------------------------------------------------ */
/*  Design tokens                                                      */
/* ------------------------------------------------------------------ */
const RED_LIGHT = '#F87171';
const RED = '#DC2626';
const RED_DARK = '#7F1D1D';
const INK = '#05070a';

/* ------------------------------------------------------------------ */
/*  Shared tilt hook — same physics as the navbar's 3D elements        */
/* ------------------------------------------------------------------ */
const useTilt = (strength = 16) => {
  const ref = useRef(null);
  const [isHovered, setIsHovered] = useState(false);
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const rotateX = useSpring(useTransform(y, [-0.5, 0.5], [strength, -strength]), {
    stiffness: 300,
    damping: 22,
  });
  const rotateY = useSpring(useTransform(x, [-0.5, 0.5], [-strength, strength]), {
    stiffness: 300,
    damping: 22,
  });

  const handleMouseMove = (e) => {
    if (!ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    x.set((e.clientX - rect.left) / rect.width - 0.5);
    y.set((e.clientY - rect.top) / rect.height - 0.5);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
    setIsHovered(false);
  };

  return { ref, rotateX, rotateY, isHovered, setIsHovered, handleMouseMove, handleMouseLeave };
};

/* ------------------------------------------------------------------ */
/*  AMBIENT PARTICLES — slow-drifting gold motes behind the footer     */
/* ------------------------------------------------------------------ */
const AmbientParticles = () => {
  const particles = React.useMemo(
    () =>
      Array.from({ length: 18 }, (_, i) => ({
        id: i,
        left: Math.random() * 100,
        top: Math.random() * 100,
        size: 1 + Math.random() * 2.5,
        duration: 8 + Math.random() * 10,
        delay: Math.random() * 6,
      })),
    []
  );

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {particles.map((p) => (
        <motion.span
          key={p.id}
          className="absolute rounded-full"
          style={{
            left: `${p.left}%`,
            top: `${p.top}%`,
            width: p.size,
            height: p.size,
            background: RED,
            boxShadow: `0 0 6px 1px ${RED}`,
          }}
          animate={{ y: [0, -22, 0], opacity: [0.15, 0.55, 0.15] }}
          transition={{ duration: p.duration, delay: p.delay, repeat: Infinity, ease: 'easeInOut' }}
        />
      ))}
    </div>
  );
};

/* ------------------------------------------------------------------ */
/*  CHAMPION SEAL — signature element: a slow-spinning 3D gold coin    */
/* ------------------------------------------------------------------ */
const ChampionSeal = () => {
  return (
    <div style={{ perspective: 700 }} className="shrink-0">
      <motion.div
        animate={{ rotateY: 360 }}
        transition={{ duration: 20, repeat: Infinity, ease: 'linear' }}
        style={{ transformStyle: 'preserve-3d' }}
        className="relative w-20 h-20 md:w-24 md:h-24"
      >
        <svg
          viewBox="0 0 200 200"
          className="w-full h-full"
          style={{ filter: `drop-shadow(0 0 18px ${RED}55)` }}
        >
          <defs>
            <linearGradient id="sealGrad" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor={RED_LIGHT} />
              <stop offset="50%" stopColor={RED} />
              <stop offset="100%" stopColor={RED_DARK} />
            </linearGradient>
          </defs>
          <circle cx="100" cy="100" r="94" fill="none" stroke="url(#sealGrad)" strokeWidth="2.5" />
          <circle cx="100" cy="100" r="80" fill="none" stroke="url(#sealGrad)" strokeWidth="1" strokeDasharray="1.5 5" opacity="0.8" />
          <path id="sealTextPath" d="M 100,100 m -62,0 a 62,62 0 1,1 124,0 a 62,62 0 1,1 -124,0" fill="none" />
          <text fontSize="10.5" fontWeight="800" letterSpacing="3.2" fill="url(#sealGrad)">
            <textPath href="#sealTextPath" startOffset="0%">
              HAKIRUSH • CORPORATE SPORTS • HAKIRUSH • CORPORATE SPORTS •
            </textPath>
          </text>
          <g transform="translate(100,102)">
            <path d="M-19,-24 L19,-24 L15,-3 Q15,10 0,15 Q-15,10 -15,-3 Z" fill="url(#sealGrad)" opacity="0.95" />
            <rect x="-4.5" y="15" width="9" height="10" fill="url(#sealGrad)" opacity="0.95" />
            <rect x="-15" y="25" width="30" height="4" rx="2" fill="url(#sealGrad)" opacity="0.95" />
            <path d="M-19,-22 Q-30,-22 -30,-10 Q-30,2 -19,-2" fill="none" stroke="url(#sealGrad)" strokeWidth="2.5" opacity="0.8" />
            <path d="M19,-22 Q30,-22 30,-10 Q30,2 19,-2" fill="none" stroke="url(#sealGrad)" strokeWidth="2.5" opacity="0.8" />
          </g>
        </svg>
      </motion.div>
    </div>
  );
};

/* ------------------------------------------------------------------ */
/*  3D SOCIAL ICON — magnetic tilt + sweeping conic gold glow ring     */
/* ------------------------------------------------------------------ */
const SocialIcon3D = ({ item }) => {
  const { ref, rotateX, rotateY, isHovered, setIsHovered, handleMouseMove, handleMouseLeave } = useTilt(22);
  const Icon = item.icon;

  return (
    <div style={{ perspective: 400 }}>
      <motion.a
        ref={ref}
        href={item.href}
        target="_blank"
        rel="noopener noreferrer"
        onMouseMove={handleMouseMove}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={handleMouseLeave}
        style={{ rotateX: isHovered ? rotateX : 0, rotateY: isHovered ? rotateY : 0, transformStyle: 'preserve-3d' }}
        animate={{ y: isHovered ? -5 : 0, scale: isHovered ? 1.1 : 1 }}
        transition={{ type: 'spring', stiffness: 300, damping: 18 }}
        className="relative w-11 h-11 flex items-center justify-center rounded-2xl bg-white/5 border border-white/10 overflow-hidden group"
      >
        {/* sweeping conic gold ring */}
        <motion.span
          className="absolute -inset-6 rounded-full pointer-events-none"
          style={{
            background: `conic-gradient(from 0deg, transparent, ${RED}99, transparent 40%)`,
          }}
          animate={{ rotate: isHovered ? 360 : 0, opacity: isHovered ? 1 : 0 }}
          transition={{ rotate: { duration: 2.2, repeat: isHovered ? Infinity : 0, ease: 'linear' }, opacity: { duration: 0.25 } }}
        />
        <span
          className="absolute inset-[1.5px] rounded-2xl transition-colors duration-300"
          style={{ background: isHovered ? INK : 'transparent' }}
        />
        <motion.span
          className="absolute inset-x-0 top-0 h-1/2 rounded-t-2xl bg-gradient-to-b from-white/20 to-transparent pointer-events-none"
          animate={{ opacity: isHovered ? 1 : 0 }}
          style={{ transform: 'translateZ(6px)' }}
        />
        <Icon
          className="relative w-5 h-5 transition-colors"
          style={{ transform: 'translateZ(14px)', color: isHovered ? RED_LIGHT : '#94a3b8' }}
        />
      </motion.a>
    </div>
  );
};

/* ------------------------------------------------------------------ */
/*  3D QUICK LINK — subtle lift + tilt toward cursor                   */
/* ------------------------------------------------------------------ */
const FooterLink3D = ({ link }) => {
  const { ref, rotateX, rotateY, isHovered, setIsHovered, handleMouseMove, handleMouseLeave } = useTilt(8);

  return (
    <li style={{ perspective: 300 }}>
      <Link to={link.href} ref={ref} onMouseMove={handleMouseMove} onMouseEnter={() => setIsHovered(true)} onMouseLeave={handleMouseLeave}>
        <motion.span
          style={{ rotateX: isHovered ? rotateX : 0, rotateY: isHovered ? rotateY : 0, transformStyle: 'preserve-3d' }}
          animate={{ x: isHovered ? 4 : 0 }}
          transition={{ type: 'spring', stiffness: 300, damping: 20 }}
          className="flex items-center gap-2 group transition-colors text-sm font-bold uppercase tracking-wider"
        >
          <motion.span
            className="h-px"
            style={{ background: RED }}
            animate={{ width: isHovered ? 16 : 0 }}
            transition={{ duration: 0.25 }}
          />
          <span
            style={{ transform: 'translateZ(6px)', color: isHovered ? '#fff' : '#94a3b8' }}
            className="transition-colors"
          >
            {link.name}
          </span>
        </motion.span>
      </Link>
    </li>
  );
};

/* ------------------------------------------------------------------ */
/*  3D CONTACT ICON BOX — tilts + pops forward on hover                */
/* ------------------------------------------------------------------ */
const ContactIcon3D = ({ Icon }) => {
  const { ref, rotateX, rotateY, isHovered, setIsHovered, handleMouseMove, handleMouseLeave } = useTilt(20);

  return (
    <div style={{ perspective: 400 }}>
      <motion.div
        ref={ref}
        onMouseMove={handleMouseMove}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={handleMouseLeave}
        style={{ rotateX: isHovered ? rotateX : 0, rotateY: isHovered ? rotateY : 0, transformStyle: 'preserve-3d' }}
        animate={{ boxShadow: isHovered ? `0 0 0 1px ${RED}88, 0 8px 20px -8px ${RED}55` : '0 0 0 1px transparent' }}
        className="w-12 h-12 shrink-0 flex items-center justify-center rounded-2xl bg-white/5 border border-white/10 transition-colors duration-300"
      >
        <Icon className="w-5 h-5 transition-colors" style={{ transform: 'translateZ(12px)', color: RED }} />
      </motion.div>
    </div>
  );
};

const MarqueeStrip = () => {
  const items = ['CRICKET', 'BADMINTON', 'FOOTBALL', 'CORPORATE WELLNESS', 'PAN-INDIA LEAGUES'];
  const loop = [...items, ...items];
  return (
    <div
      className="relative overflow-hidden py-4 border-y border-white/5 mb-10"
      style={{ maskImage: 'linear-gradient(90deg, transparent, black 10%, black 90%, transparent)', WebkitMaskImage: 'linear-gradient(90deg, transparent, black 10%, black 90%, transparent)' }}
    >
      <motion.div
        className="flex gap-10 whitespace-nowrap"
        animate={{ x: ['0%', '-50%'] }}
        transition={{ duration: 22, repeat: Infinity, ease: 'linear' }}
      >
        {loop.map((item, i) => (
          <span key={i} className="flex items-center gap-10 text-xs font-black uppercase tracking-[0.3em] text-slate-600">
            {item}
            <span className="w-1.5 h-1.5 rounded-full" style={{ background: RED }} />
          </span>
        ))}
      </motion.div>
    </div>
  );
};

/* ------------------------------------------------------------------ */
/*  FOOTER                                                              */
/* ------------------------------------------------------------------ */
const Footer = () => {
  const footerLinks = [
    { name: 'Home', href: '/' },
    { name: 'About', href: '/about' },
    { name: 'Services', href: '/services' },
    { name: 'Gallery', href: '/gallery' },
    { name: 'Clients', href: '/clients' },
  ];

  const TwitterIcon = ({ className }) => (
    <svg viewBox="0 0 1200 1227" fill="currentColor" className={className} xmlns="http://www.w3.org/2000/svg">
      <path d="M714.2 519.1L1160.9 0H1055.7L667.1 450.2L358.1 0H0L468.6 681.8L0 1226.4H105.3L515.8 750.8L842 1226.4H1200L714.2 519.1ZM570.9 687.5L523.4 620.1L146.7 79.7H311.5L615.4 520.2L662.9 587.6L1055.7 1146.7H890.9L570.9 687.5Z" />
    </svg>
  );

  const socials = [
    { icon: Facebook, href: 'https://www.facebook.com/share/1DKbJRWQtq/' },
    { icon: Instagram, href: 'https://www.instagram.com/hakirush.sports_events/?hl=en' },
    { icon: Linkedin, href: 'https://linkedin.com/company/hakirush' },
    { icon: TwitterIcon, href: 'https://x.com/Hakirush_sports' },
    { icon: Youtube, href: 'https://www.youtube.com/@HakirushSportsEvents' },
  ];

  return (
    <footer className="relative text-white pt-20 pb-10 overflow-hidden font-sans border-t border-white/5" style={{ background: INK }}>
      {/* Ambient background: gold glow + drifting particles */}
      <div
        className="absolute top-0 right-0 w-[500px] h-[500px] rounded-full -translate-y-1/2 translate-x-1/4 pointer-events-none"
        style={{ background: RED, opacity: 0.06, filter: 'blur(120px)' }}
      />
      <div
        className="absolute bottom-0 left-0 w-[400px] h-[400px] rounded-full translate-y-1/2 -translate-x-1/4 pointer-events-none"
        style={{ background: RED, opacity: 0.04, filter: 'blur(110px)' }}
      />
      <AmbientParticles />

      <div className="max-w-7xl mx-auto px-6 relative z-10">

        <div className="grid grid-cols-1 md:grid-cols-12 gap-16 md:gap-12 pb-16">
          {/* Brand Column */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="md:col-span-5 space-y-8"
          >
            <div className="flex items-center gap-5">
              <Link to="/" className="inline-block group shrink-0">
                <div className="flex items-center">
                  <div className="relative p-1">
                    <div
                      className="absolute inset-0 rounded-xl blur-md opacity-20 group-hover:opacity-50 transition-opacity"
                      style={{ background: RED }}
                    />
                    <img src="/favicon.png" alt="Logo" className="relative h-18 w-18 object-contain" />
                  </div>
                  <span className="text-4xl font-black italic tracking-tighter uppercase">
                    Haki
                    <span className="text-transparent bg-clip-text" style={{ backgroundImage: `linear-gradient(135deg, ${RED_LIGHT}, ${RED})` }}>
                      rush
                    </span>
                  </span>
                </div>
              </Link>
              <ChampionSeal />
            </div>

            <p className="text-slate-400 text-lg leading-relaxed max-w-sm">
              India's premier corporate sports platform. We don't just organize events; we build{' '}
              <span className="text-white font-bold">champions</span>.
            </p>

            <div className="flex gap-4">
              {socials.map((item, i) => (
                <SocialIcon3D key={i} item={item} />
              ))}
            </div>
          </motion.div>

          {/* Quick Links Column */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="md:col-span-3"
          >
            <h3 className="text-sm font-black uppercase tracking-[0.3em] mb-8" style={{ color: RED }}>
              Navigation
            </h3>
            <ul className="space-y-4">
              {footerLinks.map((link) => (
                <FooterLink3D key={link.name} link={link} />
              ))}
            </ul>
          </motion.div>

          {/* Contact Column */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="md:col-span-4 space-y-8"
          >
            <h3 className="text-sm font-black uppercase tracking-[0.3em] mb-8" style={{ color: RED }}>
              Get In Touch
            </h3>
            <div className="space-y-6">
              {[
                { icon: Mail, label: 'support@hakirush.com', href: 'mailto:support@hakirush.com' },
                { icon: Phone, label: '+91 7997110210', href: 'tel:+917997110210' },
              ].map((item, i) => (
                <a key={i} href={item.href} className="flex items-center gap-4 group">
                  <ContactIcon3D Icon={item.icon} />
                  <span className="text-slate-300 font-bold group-hover:text-white transition-colors">{item.label}</span>
                </a>
              ))}

              <div className="flex gap-4 group">
                <ContactIcon3D Icon={MapPin} />
                <p className="text-slate-400 text-sm leading-relaxed font-medium group-hover:text-slate-200 transition-colors">
                  No. 472/7 Balaji Arcade, A.V.S. Compound, Ejipura, Koramangala, Bengaluru - 560095.
                </p>
              </div>
            </div>
          </motion.div>
        </div>

        <MarqueeStrip />

        {/* Bottom Bar */}
        <div className="pt-2 flex flex-col md:flex-row justify-between items-center gap-6">
          <p className="text-slate-500 text-xs font-bold uppercase tracking-widest">
            &copy; {new Date().getFullYear()} <span className="text-white">HAKIRUSH</span>. Engineered for Excellence.
          </p>
          <div className="flex gap-8">
            {['Privacy Policy', 'Terms of Service'].map((text) => (
              <a
                key={text}
                href="#"
                className="text-slate-500 text-[10px] font-black uppercase tracking-widest transition-colors"
                onMouseEnter={(e) => (e.target.style.color = RED)}
                onMouseLeave={(e) => (e.target.style.color = '')}
              >
                {text}
              </a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;