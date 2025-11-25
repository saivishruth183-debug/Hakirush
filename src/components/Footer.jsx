import React from 'react';
import { motion } from 'framer-motion';
import { Mail, Phone, MapPin, Linkedin, Instagram, Youtube, Twitter, Facebook } from 'lucide-react';
import { Link } from 'react-router-dom';

const Footer = () => {
  const footer = [
    { name: 'Home', href: '/' },
    { name: 'About', href: '/about' },
    { name: 'Services', href: '/services' },
    { name: 'Sponsor Dashboard', href: '/sponsor' },
    { name: 'Gallery', href: '/gallery' },
    { name: 'Clients', href: '/clients' },
    { name: 'Contact', href: '/contact' },
  ];

  const socialmedia = [
    { icon: Facebook, href: "https://www.facebook.com/share/1DKbJRWQtq/" },
    { icon: Instagram, href: 'https://www.instagram.com/hakirush.sports_events/?hl=en' },
    { icon: Linkedin, href: 'https://linkedin.com/company/hakirush' },
    { icon: Twitter, href: 'https://x.com/Hakirush_sports?t=imr-ZZmYL7pGFek5b_8J9A&s=09' },
    { icon: Youtube, href: 'https://www.youtube.com/@HakirushSportsEvents' },
  ];

  return (
    <footer className="relative bg-black/80 text-white overflow-hidden">

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10 md:gap-12">

          {/* Brand Section */}

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <a href="/" className="group inline-block mb-6" aria-label="HAKIRUSH Home">
              <div className="flex items-center gap-2 group-hover:scale-105 transition-all duration-300">
                <div className="relative">
                  <div className="absolute inset-0 bg-linear-to-br from-[#C21807] to-[#A01506] rounded-2xl blur-lg opacity-40 group-hover:opacity-70 transition-opacity duration-300" />
                  <img
                    src="/favicon3.png"
                    alt="HAKIRUSH Logo"
                    width={48}
                    height={48}
                    loading="lazy"
                    className="relative h-12 w-12 object-contain drop-shadow-2xl"
                  />
                </div>
                <span className="text-3xl font-black text-yellow-500 tracking-tight">
                  HAKIRUSH
                </span>
              </div>
            </a>

            <p className="text-gray-300 mb-6 leading-relaxed text-sm mt-4">
              India's premier corporate sports engagement platform, fostering team building and
              employee wellness through competitive sports.
            </p>

            <div className="flex flex-wrap gap-3 mt-2 mb-2">
              {socialmedia.map((item, index) => (
                <motion.a
                  key={index}
                  href={item.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  whileHover={{ scale: 1.2, rotate: 5 }}
                  whileTap={{ scale: 0.95 }}
                  className="inline-flex items-center justify-center w-10 h-10 rounded-lg bg-white/5 border border-[#C21807]/20 hover:border-[#C21807] hover:bg-[#C21807] text-gray-400 hover:text-white transition-all duration-300 shadow-lg focus:outline-none focus-visible:ring-2 focus-visible:ring-[#C21807]"
                  tabIndex={0}
                  aria-label={item.href}
                >
                  <item.icon className="h-5 w-5" />
                </motion.a>
              ))}
            </div>
          </motion.div>

          {/* Quick Links */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            viewport={{ once: true }}
          >
            <h3 className="text-lg font-bold mb-6 text-red-600">
              Quick Links
            </h3>
            <ul className="space-y-2">
              {footer.map((item) => (
                <motion.li
                  key={item.href}
                  whileHover={{ x: 8 }}
                  transition={{
                    type: 'tween',
                    duration: 0.3,
                    ease: 'easeInOut',
                  }}
                >
                  <Link
                    to={item.href}
                    className="relative text-gray-300 hover:text-[#C21807] transition-colors duration-300 inline-flex items-center gap-2 group pl-2 border-l-2 border-transparent hover:border-[#C21807]"
                  >
                    <span className="text-sm font-medium">{item.name}</span>
                  </Link>
                </motion.li>
              ))}
            </ul>
          </motion.div>

          {/* Contact Info */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            viewport={{ once: true }}
          >
            <h3 className="text-lg font-bold mb-6 text-red-600">
              Get in Touch
            </h3>
            <div className="space-y-6">

              <motion.a
                href="mailto:support@hakirush.com"
                className="flex items-center gap-3 group cursor-pointer"
                whileHover={{ x: 8 }}
                transition={{ type: 'tween', duration: 0.3 }}
              >
                <div className="inline-flex items-center justify-center w-10 h-10 rounded-lg bg-[#1a2332] shadow-lg group-hover:bg-[#C21807] transition-all duration-300">
                  <Mail className="h-5 w-5 text-white" />
                </div>
                <span className="text-gray-300 text-base group-hover:text-white transition-colors">
                  support@hakirush.com
                </span>
              </motion.a>

              <motion.a
                href="tel:+917997110210"
                className="flex items-center gap-3 group cursor-pointer"
                whileHover={{ x: 8 }}
                transition={{ type: 'tween', duration: 0.3 }}
              >
                <div className="inline-flex items-center justify-center w-10 h-10 rounded-lg bg-[#1a2332] shadow-lg group-hover:bg-[#C21807] transition-all duration-300">
                  <Phone className="h-5 w-5 text-white" />
                </div>
                <span className="text-gray-300 text-base group-hover:text-white transition-colors">
                  +91 7997110210
                </span>
              </motion.a>

              <motion.div
                className="flex items-start gap-3 group cursor-pointer"
                whileHover={{ x: 8 }}
                transition={{ type: 'tween', duration: 0.3 }}
              >
                <div className="inline-flex items-center justify-center w-10 h-10 rounded-lg bg-[#1a2332] shadow-lg shrink-0 group-hover:bg-[#C21807] transition-all duration-300">
                  <MapPin className="h-5 w-5 text-white" />
                </div>
                <span className="text-gray-300 text-base leading-relaxed group-hover:text-white transition-colors">
                  No. 472/7 Balaji Arcade, A.V.S. Compound, 20th L Cross Road, AVS Layout, Ejipura,
                  Koramangala, Bengaluru, Karnataka - 560095.
                </span>
              </motion.div>
            </div>
          </motion.div>
        </div>

        {/* Bottom Footer */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.3 }}
          viewport={{ once: true }}
          className="border-t border-gray-700/30 mt-12 pt-8 text-center backdrop-blur-sm rounded-b-2xl"
        >
          <p className="text-gray-400 text-sm">
            &copy; 2025{' '}
            <span className="font-bold text-[#C21807]">
              HAKIRUSH
            </span>
            . All rights reserved.
          </p>
        </motion.div>
      </div>
    </footer>
  );
};

export default Footer;
