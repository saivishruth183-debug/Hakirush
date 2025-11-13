import { motion } from "framer-motion";
import { Store, CheckCircle, ArrowRight, Sparkles, Star } from "lucide-react";
import { Link } from "react-router-dom";

const SPONSORS = [
  {
    key: "stall",
    icon: Store,
    title: "Stall Partner",
    subtitle: "On-site product demos, samplings, and branding space",
    details: {
      overview:
        "Stalls and brand zones let you interact directly with attendees — ideal for lead gen, sampling and hands-on demos.",
      whatYouGet: [
        "Premium / Standard stall options (10x10 or 20x10 ft)",
        "Power, basic furniture & signage support",
        "Inclusion in event map & promoted photo/video highlights",
        "Opportunity to run contests or sampling within stall",
      ],
      why: [
        "Face-to-face engagement with 1000+ corporate professionals",
        "Immediate lead capture & product feedback",
        "Memorable brand experiences for attendees",
      ],
      ctaText: "Reserve a Stall",
    },
  },
];

export default function SponsorGrid() {
  const s = SPONSORS[0];
  const IconComponent = s.icon;

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
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-linear-to-r from-red-50 to-pink-50 border border-red-100 mb-8">
              <Star className="w-4 h-4 text-red-600 fill-red-600" />
              <span className="text-sm font-semibold text-red-600">Direct Engagement</span>
            </div>

            {/* Icon and Title in Row */}
            <div className="flex items-center justify-center gap-6 mb-6">
              <div className="inline-flex items-center justify-center w-20 h-20 rounded-3xl bg-linear-to-br from-red-500 to-pink-500 shadow-2xl shrink-0">
                <IconComponent className="w-8 h-8 text-white" />
              </div>
              <h1 className="text-3xl md:text-4xl lg:text-5xl font-extrabold text-gray-900">
                {s.title}{" "}
                <span className="bg-linear-to-r from-red-500 to-pink-500 bg-clip-text text-transparent">
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

      <section className="py-20 relative overflow-hidden">

        <div className="max-w-6xl mx-auto px-6 relative z-10">

          <div className="grid md:grid-cols-2 gap-10">
            <motion.div
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              whileHover={{ y: -12, scale: 1.02 }}
              transition={{ type: 'spring', stiffness: 300, damping: 20 }}
              viewport={{ once: true }}
              className="group relative bg-white rounded-3xl shadow-2xl hover:shadow-red-500/25 transition-all duration-500 overflow-hidden cursor-pointer border border-gray-100"
            >

              <div className="relative p-10">
                <div className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-linear-to-r from-red-500 to-pink-500 mb-8 shadow-lg group-hover:shadow-red-500/50 transition-shadow duration-300">
                  <Sparkles className="w-4 h-4 text-white animate-pulse" />
                  <span className="text-sm font-bold text-white tracking-wide">PACKAGE INCLUDES</span>
                </div>
                <h3 className="text-4xl font-extrabold text-gray-900 mb-8 group-hover:text-transparent group-hover:bg-linear-to-r group-hover:from-red-600 group-hover:to-pink-500 group-hover:bg-clip-text transition-all duration-300">
                  What You Get
                </h3>

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
                        <CheckCircle className="w-5 h-5 text-red-600 group-hover/item:scale-110 transition-transform" />
                      </div>
                      <span className="text-base leading-relaxed font-medium">{item}</span>
                    </motion.li>
                  ))}
                </ul>
              </div>
              <div className="absolute inset-0 rounded-3xl border-2 border-transparent group-hover:border-red-500/20 transition-colors duration-500 pointer-events-none" />
            </motion.div>

            <motion.div 
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              whileHover={{ y: -12, scale: 1.02 }}
              transition={{ type: 'spring', stiffness: 300, damping: 20, delay: 0.1 }}
              viewport={{ once: true }}
              className="group relative bg-white rounded-3xl shadow-2xl hover:shadow-pink-500/25 transition-all duration-500 overflow-hidden cursor-pointer border border-gray-100"
            >

              <div className="relative p-10">
                <div className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-linear-to-r from-red-500 to-pink-500 mb-8 shadow-lg group-hover:shadow-pink-500/50 transition-shadow duration-300">
                  <Store className="w-4 h-4 text-white animate-pulse" />
                  <span className="text-sm font-bold text-white tracking-wide">KEY BENEFITS</span>
                </div>

                <h3 className="text-4xl font-extrabold text-gray-900 mb-8 group-hover:text-transparent group-hover:bg-linear-to-r group-hover:from-red-600 group-hover:to-pink-500 group-hover:bg-clip-text transition-all duration-300">
                  Why It Matters
                </h3>

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
                        <CheckCircle className="w-5 h-5 text-red-600 group-hover/item:scale-110 transition-transform" />
                      </div>
                      <span className="text-base leading-relaxed font-medium">{item}</span>
                    </motion.li>
                  ))}
                </ul>
              </div>
              <div className="absolute inset-0 rounded-3xl border-2 border-transparent group-hover:border-pink-500/20 transition-colors duration-500 pointer-events-none" />
            </motion.div>
          </div>

          <div className="text-center mt-16">
            <Link to="/contact">
              <motion.button
                whileHover={{ scale: 1.05, y: -2 }}
                whileTap={{ scale: 0.98 }}
                transition={{ type: "spring", stiffness: 300 }}
                className="inline-flex items-center justify-center gap-3 px-12 py-5 bg-linear-to-r from-red-500 to-pink-500 text-white font-bold text-lg rounded-xl shadow-xl hover:shadow-2xl hover:shadow-red-500/50 transition-all duration-300 cursor-pointer relative overflow-hidden group"
              >
                <span className="relative z-10">{s.details.ctaText}</span>
                <ArrowRight className="w-5 h-5 relative z-10 transform group-hover:translate-x-1 transition-transform" />
                <div className="absolute inset-0 bg-white/20 -translate-x-full group-hover:translate-x-full transition-transform duration-700" />
              </motion.button>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
