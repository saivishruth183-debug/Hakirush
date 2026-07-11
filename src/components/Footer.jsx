import React, { useRef, useState } from 'react';
import { motion } from 'framer-motion';
import { useMotionValue, useSpring, useTransform } from 'framer-motion';
import { Mail, Phone, MapPin, Linkedin, Instagram, Youtube, Facebook, ArrowUpRight } from 'lucide-react';
import { Link } from 'react-router-dom';

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
/*  3D SOCIAL ICON — tilts toward cursor, lifts and pops forward       */
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
        style={{
          rotateX: isHovered ? rotateX : 0,
          rotateY: isHovered ? rotateY : 0,
          transformStyle: 'preserve-3d',
        }}
        animate={{ y: isHovered ? -5 : 0, scale: isHovered ? 1.1 : 1 }}
        transition={{ type: 'spring', stiffness: 300, damping: 18 }}
        className="relative w-11 h-11 flex items-center justify-center rounded-2xl bg-white/5 border border-white/10 hover:border-red-600 hover:bg-red-600 transition-colors duration-300 group overflow-hidden"
      >
        {/* glossy sheen that appears on hover */}
        <motion.span
          className="absolute inset-x-0 top-0 h-1/2 rounded-t-2xl bg-gradient-to-b from-white/25 to-transparent pointer-events-none"
          animate={{ opacity: isHovered ? 1 : 0 }}
          style={{ transform: 'translateZ(6px)' }}
        />
        <Icon
          className="relative w-5 h-5 text-slate-400 group-hover:text-white transition-colors"
          style={{ transform: 'translateZ(14px)' }}
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
      <Link
        to={link.href}
        ref={ref}
        onMouseMove={handleMouseMove}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={handleMouseLeave}
      >
        <motion.span
          style={{
            rotateX: isHovered ? rotateX : 0,
            rotateY: isHovered ? rotateY : 0,
            transformStyle: 'preserve-3d',
          }}
          animate={{ x: isHovered ? 4 : 0 }}
          transition={{ type: 'spring', stiffness: 300, damping: 20 }}
          className="text-slate-400 hover:text-white flex items-center gap-2 group transition-colors text-sm font-bold uppercase tracking-wider"
        >
          <span className="h-px w-0 bg-red-600 transition-all group-hover:w-4" />
          <span style={{ transform: 'translateZ(6px)' }}>{link.name}</span>
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
        style={{
          rotateX: isHovered ? rotateX : 0,
          rotateY: isHovered ? rotateY : 0,
          transformStyle: 'preserve-3d',
        }}
        className="w-12 h-12 shrink-0 flex items-center justify-center rounded-2xl bg-white/5 border border-white/10 group-hover:border-red-600/50 group-hover:bg-red-600 transition-colors duration-300"
      >
        <Icon
          className="w-5 h-5 text-red-600 group-hover:text-white transition-colors"
          style={{ transform: 'translateZ(12px)' }}
        />
      </motion.div>
    </div>
  );
};

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
    { icon: Facebook, href: "https://www.facebook.com/share/1DKbJRWQtq/" },
    { icon: Instagram, href: 'https://www.instagram.com/hakirush.sports_events/?hl=en' },
    { icon: Linkedin, href: 'https://linkedin.com/company/hakirush' },
    { icon: TwitterIcon, href: 'https://x.com/Hakirush_sports' },
    { icon: Youtube, href: 'https://www.youtube.com/@HakirushSportsEvents' },
  ];

  return (
    <footer className="relative bg-[#05070a] text-white pt-20 pb-10 overflow-hidden font-sans border-t border-white/5">
      {/* Background Decorative Element */}
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-red-600/5 blur-[120px] rounded-full -translate-y-1/2 translate-x-1/4 pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-16 md:gap-12 pb-16">

          {/* Brand Column */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="md:col-span-5 space-y-8"
          >
            {/* Logo — plain, no 3D, matching the navbar */}
            <Link to="/" className="inline-block group">
              <div className="flex items-center">
                <div className="relative p-1">
                  <div className="absolute inset-0 bg-red-600 rounded-xl blur-md opacity-20 group-hover:opacity-50 transition-opacity" />
                  <img src="/favicon.png" alt="Logo" className="relative h-18 w-18 object-contain" />
                </div>
                <span className="text-4xl font-black italic tracking-tighter uppercase">Haki<span className="text-red-600">rush</span></span>
              </div>
            </Link>

            <p className="text-slate-400 text-lg leading-relaxed max-w-sm">
              India's premier corporate sports platform. We don't just organize events; we build <span className="text-white font-bold">champions</span>.
            </p>

            {/* Social icons — full 3D tilt */}
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
            <h3 className="text-sm font-black uppercase tracking-[0.3em] text-red-600 mb-8">Navigation</h3>
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
            <h3 className="text-sm font-black uppercase tracking-[0.3em] text-red-600 mb-8">Get In Touch</h3>
            <div className="space-y-6">
              {[
                { icon: Mail, label: 'support@hakirush.com', href: 'mailto:support@hakirush.com' },
                { icon: Phone, label: '+91 7997110210', href: 'tel:+917997110210' }
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

        {/* Bottom Bar */}
        <div className="pt-10 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-6">
          <p className="text-slate-500 text-xs font-bold uppercase tracking-widest">
            &copy; 2025 <span className="text-white">HAKIRUSH</span>. Engineered for Excellence.
          </p>
          <div className="flex gap-8">
            {['Privacy Policy', 'Terms of Service'].map(text => (
              <a key={text} href="#" className="text-slate-500 hover:text-red-600 text-[10px] font-black uppercase tracking-widest transition-colors">
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