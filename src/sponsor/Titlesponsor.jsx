import { motion } from "framer-motion";
import { Trophy, CheckCircle, ArrowRight, Sparkles, Star } from "lucide-react";
import { Link } from "react-router-dom";

const SPONSORS = [
  {
    key: "title",
    icon: "🏆",
    title: "Title",
    subtitle: "Premium branding across kits, trophies, and reels",
    details: {
      overview:
        "As the Title Sponsor, your brand becomes the defining face of the tournament. This package gives you top-level naming, premium placement and exclusive brand leadership throughout the event.",
      whatYouGet: [
        'Event naming rights – e.g. "The HAKIRUSH | [Your Brand] Corporate League"',
        "Primary logo on jerseys, main-stage banners, website & major signage",
        "Stage visibility & opportunity to address audience at opening/closing",
        "Dedicated VIP area + sponsor stall",
        "Weekly social media spotlights & featured reels",
        "Mention in press releases & newsletters",
      ],
      why: [
        "Exclusive recognition among 1000+ professionals",
        "High-impact visibility across offline & online channels",
        "Long-term brand association with corporate sports culture",
      ],
      ctaText: "Talk to Contact",
    },
  },
];

export default function SponsorGrid() {
  const s = SPONSORS[0];

  return (
    <div className="relative overflow-hidden bg-white">
      {/* Hero Section */}
      <section className="relative py-20 overflow-hidden bg-white">

        <div className="max-w-6xl mx-auto px-6 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center"
          >
            {/* Badge */}
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#C21807]/10 border border-[#C21807]/20 mb-8">
              <Star className="w-4 h-4 text-[#C21807] fill-[#C21807]" />
              <span className="text-sm font-semibold text-[#C21807]">Premium Sponsorship Package</span>
            </div>

            {/* Icon and Title in Row */}
            <div className="flex items-center justify-center gap-6 mb-6">
              <div className="inline-flex items-center justify-center w-20 h-20 rounded-3xl bg-[#C21807] shadow-2xl shrink-0">
                <Trophy className="w-8 h-8 text-white" />
              </div>
              <h1 className="text-3xl md:text-4xl lg:text-5xl font-extrabold text-gray-900">
                {s.title}{" "}
                <span className="bg-linear-to-r from-[#C21807] via-[#A01506] to-[#C21807] bg-clip-text text-transparent">
                  Sponsor
                </span>
              </h1>
            </div>
            
            <p className="mt-4 text-base md:text-lg text-gray-700 max-w-4xl mx-auto leading-relaxed">
              {s.details.overview}
            </p>
          </motion.div>
        </div>
      </section>

      {/* Content Section */}
      <section className="py-20 relative overflow-hidden">

        <div className="max-w-6xl mx-auto px-6 relative z-10">

          {/* Two-column content */}
          <div className="grid md:grid-cols-2 gap-10">
            {/* What you get */}
            <motion.div
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              whileHover={{ y: -12, scale: 1.02 }}
              transition={{ 
                type: 'spring', 
                stiffness: 300,
                damping: 20
              }}
              viewport={{ once: true }}
              className="group relative bg-white rounded-3xl shadow-2xl hover:shadow-[0_12px_35px_rgba(248,113,113,0.45)] transition-all duration-500 overflow-hidden cursor-pointer border border-gray-100"
            >

              <div className="relative p-10">
                {/* Icon Badge with Glow */}
                <div className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-[#C21807] mb-8 shadow-lg group-hover:shadow-[#C21807]/50 transition-shadow duration-300">
                  <Sparkles className="w-4 h-4 text-white animate-pulse" />
                  <span className="text-sm font-bold text-white tracking-wide">PACKAGE INCLUDES</span>
                </div>

                

                <ul className="space-y-5">
                  {s.details.whatYouGet.map((item, idx) => (
                    <motion.li
                      key={idx}
                      initial={{ opacity: 0, x: -20 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      transition={{ delay: idx * 0.1 }}
                      viewport={{ once: true }}
                      className="flex items-start gap-4 text-gray-700 group/item hover:text-gray-900 transition-colors"
                    >
                      <div className="shrink-0 mt-0.5">
                        <CheckCircle className="w-5 h-5 text-[#C21807] group-hover/item:scale-110 transition-transform" />
                      </div>
                      <span className="text-base leading-relaxed font-medium">{item}</span>
                    </motion.li>
                  ))}
                </ul>
              </div>

              {/* Border Glow Effect */}
              <div className="absolute inset-0 rounded-3xl border-2 border-transparent group-hover:border-[#C21807]/20 transition-colors duration-500 pointer-events-none" />
            </motion.div>

            {/* Why it matters */}
            <motion.div 
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              whileHover={{ y: -12, scale: 1.02 }}
              transition={{ 
                type: 'spring', 
                stiffness: 300,
                damping: 20,
                delay: 0.1
              }}
              viewport={{ once: true }}
              className="group relative bg-white rounded-3xl shadow-2xl hover:shadow-[0_12px_35px_rgba(248,113,113,0.45)] transition-all duration-500 overflow-hidden cursor-pointer border border-gray-100"
            >

              <div className="relative p-10">
                {/* Icon Badge with Glow */}
                <div className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-[#C21807] mb-8 shadow-lg group-hover:shadow-[#C21807]/50 transition-shadow duration-300">
                  <Trophy className="w-4 h-4 text-white animate-pulse" />
                  <span className="text-sm font-bold text-white tracking-wide">KEY BENEFITS</span>
                </div>

                <ul className="space-y-5">
                  {s.details.why.map((item, idx) => (
                    <motion.li
                      key={idx}
                      initial={{ opacity: 0, x: -20 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      transition={{ delay: idx * 0.1 }}
                      viewport={{ once: true }}
                      className="flex items-start gap-4 text-gray-700 group/item hover:text-gray-900 transition-colors"
                    >
                      <div className="shrink-0 mt-0.5">
                        <CheckCircle className="w-5 h-5 text-[#C21807] group-hover/item:scale-110 transition-transform" />
                      </div>
                      <span className="text-base leading-relaxed font-medium">{item}</span>
                    </motion.li>
                  ))}
                </ul>
              </div>

              {/* Border Glow Effect */}
              <div className="absolute inset-0 rounded-3xl border-2 border-transparent group-hover:border-[#C21807]/20 transition-colors duration-500 pointer-events-none" />
            </motion.div>
          </div>

          {/* CTA Button */}
          <div className="text-center mt-16">
            <Link to="/contact">
              <motion.button
                whileHover={{ scale: 1.05, y: -2 }}
                whileTap={{ scale: 0.98 }}
                transition={{ type: "spring", stiffness: 300 }}
                className="inline-flex items-center justify-center gap-3 px-12 py-5 bg-[#C21807] text-white font-bold text-lg rounded-lg shadow-xl hover:shadow-xl hover:shadow-[#C21807]/50 hover:scale-105 transition-all duration-300 cursor-pointer relative overflow-hidden group"
              >
                <span className="relative z-10">{s.details.ctaText}</span>
                <ArrowRight className="w-5 h-5 relative z-10 transform group-hover:translate-x-1 transition-transform" />
                {/* Shimmer effect */}
                <div className="absolute inset-0 bg-white/20 -translate-x-full group-hover:translate-x-full transition-transform duration-700" />
              </motion.button>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
