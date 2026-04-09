import React from 'react';
import { motion } from 'framer-motion';
import { Mail, Phone, MapPin, Linkedin, Instagram, Youtube, Facebook, ArrowUpRight } from 'lucide-react';
import { Link } from 'react-router-dom';

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
            <Link to="/" className="inline-block group">
              <div className="flex items-center gap-4">
                <div className="relative p-1">
                  <div className="absolute inset-0 bg-red-600 rounded-xl blur-md opacity-20 group-hover:opacity-50 transition-opacity" />
                  <img src="/favicon.png" alt="Logo" className="relative h-12 w-12 object-contain" />
                </div>
                <span className="text-2xl font-black italic tracking-tighter uppercase">Haki<span className="text-red-600">rush</span></span>
              </div>
            </Link>
            
            <p className="text-slate-400 text-lg leading-relaxed max-w-sm">
              India's premier corporate sports platform. We don't just organize events; we build <span className="text-white font-bold">champions</span>.
            </p>

            <div className="flex gap-4">
              {socials.map((item, i) => (
                <motion.a
                  key={i}
                  href={item.href}
                  target="_blank"
                  whileHover={{ y: -5, scale: 1.1 }}
                  className="w-11 h-11 flex items-center justify-center rounded-2xl bg-white/5 border border-white/10 hover:border-red-600 hover:bg-red-600 transition-all duration-300 group"
                >
                  <item.icon className="w-5 h-5 text-slate-400 group-hover:text-white transition-colors" />
                </motion.a>
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
                <li key={link.name}>
                  <Link 
                    to={link.href} 
                    className="text-slate-400 hover:text-white flex items-center gap-2 group transition-colors text-sm font-bold uppercase tracking-wider"
                  >
                    <span className="h-px w-0 bg-red-600 transition-all group-hover:w-4" />
                    {link.name}
                  </Link>
                </li>
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
                  <div className="w-12 h-12 flex items-center justify-center rounded-2xl bg-white/5 border border-white/10 group-hover:border-red-600/50 group-hover:bg-red-600 transition-all">
                    <item.icon className="w-5 h-5 text-red-600 group-hover:text-white transition-colors" />
                  </div>
                  <span className="text-slate-300 font-bold group-hover:text-white transition-colors">{item.label}</span>
                </a>
              ))}
              
              <div className="flex gap-4 group">
                <div className="w-12 h-12 shrink-0 flex items-center justify-center rounded-2xl bg-white/5 border border-white/10 group-hover:border-red-600/50 group-hover:bg-red-600 transition-all">
                  <MapPin className="w-5 h-5 text-red-600 group-hover:text-white transition-colors" />
                </div>
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