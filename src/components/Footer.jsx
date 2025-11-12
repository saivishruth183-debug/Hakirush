import React from 'react';
import { motion } from 'framer-motion';
import { Mail, Phone, MapPin, Linkedin, Instagram, Twitter, Youtube } from 'lucide-react';
import { Link } from 'react-router-dom';

const Footer = () => {
  const footer = [
    { name: 'Home', href: '/' },
    { name: 'About', href: '/about' },
    { name: 'Package', href: '/package' },
    { name: 'Sponsor Dashboard', href: '/sponsor' },
    { name: 'Gallery', href: '/gallery' },
    { name: 'Clients', href: '/clients' },
    { name: 'Contact', href: '/contact' },
  ];

  const socialmedia = [
    { icon: Linkedin, href: 'https://linkedin.com/company/hakirush' },
    { icon: Instagram, href: 'https://www.instagram.com/hakirush.sports_events/?hl=en' },
    { icon: Twitter, href: 'https://x.com/Hakirushsports' },
    { icon: Youtube, href: 'https://www.youtube.com/@HakirushSportsEvents' },
  ];

  return (
    <footer className="bg-gray-900 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">

          {/* Brand Section */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <a href="/" className="flex items-center space-x-2 mb-4" aria-label="HAKIRUSH Home">
              <img
                src="/favicon.ico"
                alt="HAKIRUSH Logo"
                width={28}
                height={28}
                loading="lazy"
                className="rounded-lg"
              />
              <span className="text-xl font-bold">HAKIRUSH</span>
            </a>

            <p className="text-gray-400 mb-4">
              India's premier corporate sports engagement platform, fostering team building and
              employee wellness through competitive sports.
            </p>

            <div className="flex space-x-4">
              {socialmedia.map((item, index) => (
                <motion.a
                  key={index}
                  href={item.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  whileHover={{ scale: 1.25, transition: { duration: 0.5 } }}
                  transition={{ duration: 0.3, ease: 'easeInOut' }}
                >
                  <item.icon className="h-6 w-6 text-gray-600 hover:text-red-600 transition" />
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
            <h3 className="text-lg font-semibold mb-4">Quick Links</h3>
            <ul className="space-y-2">
              {footer.map((item) => (
                <motion.li
                  key={item.href}
                  whileHover={{ x: 10 }}
                  transition={{
                    type: 'tween',
                    duration: 0.4,
                    ease: 'easeInOut',
                  }}
                >
                  <Link
                    to={item.href}
                    className="text-gray-400 hover:text-red-400 transition-colors duration-300"
                  >
                    {item.name}
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
            <h3 className="text-lg font-semibold mb-4">Get in Touch</h3>
            <div className="space-y-3">

              <motion.span
                className="flex items-center space-x-3 cursor-pointer"
                whileHover={{ x: 10 }}
                transition={{ type: 'tween', duration: 0.3 }}
              >
                <Mail className="h-5 w-5 text-red-400" />
                <span className="text-gray-400">krishna@hakirush.com</span>
              </motion.span>

              <motion.span
                className="flex items-center space-x-3 cursor-pointer"
                whileHover={{ x: 10 }}
                transition={{ type: 'tween', duration: 0.3 }}
              >
                <Phone className="h-5 w-5 text-red-400" />
                <span className="text-gray-400">+91 7997110210</span>
              </motion.span>

              <motion.span
                className="flex items-start space-x-3 cursor-pointer"
                whileHover={{ x: 10 }}
                transition={{ type: 'tween', duration: 0.3 }}
              >
                <MapPin className="h-13 w-13 text-red-400" />
                <span className="text-gray-400 text-md pt-3">
                  No. 472/7 Balaji Arcade, A.V.S. Compound, 20th L Cross Road, AVS Layout, Ejipura,
                  Koramangala, Bengaluru, Karnataka - 560095.
                </span>
              </motion.span>
            </div>
          </motion.div>
        </div>

        {/* Bottom Footer */}
        <div className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-400">
          <p>&copy; 2025 HAKIRUSH. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
