// eslint-disable-next-line no-unused-vars
import { motion } from "framer-motion";
import { Store, CheckCircle, ArrowRight, Sparkles, ArrowLeft, Users } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";

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
  const navigate = useNavigate();
  const handleBackClick = () => {
    navigate('/sponsor#tiers');
  };

  return (
    <div className="relative overflow-hidden bg-white">
      {/* Back Button */}
      <div className="max-w-6xl mx-auto px-6 pt-10 md:pt-10 md:pb-6">
        <motion.button
          onClick={handleBackClick}
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5 }}
          whileHover={{ x: -5 }}
          className="inline-flex items-center gap-2 px-4 py-2.5 rounded-lg bg-white border border-[#C21807]/30 shadow-sm hover:shadow-md text-[#C21807] hover:bg-[#C21807]/5 text-sm md:text-base font-semibold transition-all cursor-pointer"
        >
          <ArrowLeft className="w-4 h-4 md:w-5 md:h-5 shrink-0" />
          <span>Back to Sponsorship Tiers</span>
        </motion.button>
      </div>
      {/* Hero Section */}
      <section className="relative py-10 overflow-hidden bg-white">

        <div className="max-w-6xl mx-auto px-6 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: -40 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.2, ease: "easeOut" }}
            viewport={{ once: true }}
            className="text-center"
          >
            <div className="inline-flex items-center gap-1.5 sm:gap-2 px-3 py-2 sm:px-5 sm:py-2.5 rounded-full bg-linear-to-r from-[#C21807]/10 to-[#A01506]/10 border border-[#C21807]/30 shadow-lg backdrop-blur-sm mb-8">
              <Users className="w-4 h-4 text-[#C21807]" />
              <span className="text-sm font-bold text-[#C21807]">Direct Engagement</span>
            </div>

            {/* Icon and Title in Row */}
            <div className="flex items-center justify-center gap-4 mb-6">
              <div className="inline-flex items-center justify-center w-20 h-20 rounded-3xl bg-linear-to-r from-[#C21807] to-[#A01506] shadow-2xl shrink-0">
                <IconComponent className="w-8 h-8 text-white" />
              </div>
              <h1 className="text-3xl md:text-4xl lg:text-5xl font-black text-gray-900 tracking-tight">
                {s.title}{" "}
                <span className="bg-linear-to-r from-[#C21807] via-[#A01506] to-[#C21807] bg-clip-text text-transparent drop-shadow-sm">
                  Sponsor
                </span>
              </h1>
            </div>
            
            <p className="mt-4 text-sm sm:text-base md:text-lg text-gray-700 max-w-4xl mx-auto leading-relaxed font-medium">
              {s.details.overview}
            </p>
          </motion.div>
        </div>
      </section>

      <section className="py-12 relative overflow-hidden">

        <div className="max-w-6xl mx-auto px-6 relative z-10">

          <div className="grid md:grid-cols-2 gap-10">
            {/* What you get */}
            <motion.div
              initial={{ opacity: 0, x: -60 }}
              whileInView={{ opacity: 1, x: 0 }}
              whileHover={{ y: -12, scale: 1.02 }}
              transition={{ type: 'spring', stiffness: 100, damping: 20 }}
              viewport={{ once: true }}
              className="group relative bg-white rounded-3xl shadow-2xl hover:shadow-[0_12px_35px_rgba(248,113,113,0.45)] transition-all duration-500 overflow-hidden cursor-pointer border border-gray-100"
            >
              <div className="relative p-10">
                <div className="inline-flex items-center gap-1.5 sm:gap-2 px-3 py-2 sm:px-5 sm:py-2.5 rounded-full bg-linear-to-r from-[#C21807] to-[#A01506] text-white mb-8 shadow-lg group-hover:shadow-[#C21807]/50 transition-shadow duration-300">
                  <Sparkles className="w-4 h-4 animate-pulse" />
                  <span className="text-sm font-bold tracking-wide">PACKAGE INCLUDES</span>
                </div>
                <h3 className="text-4xl font-extrabold text-gray-900 mb-8 group-hover:text-transparent group-hover:bg-linear-to-r group-hover:from-[#C21807] group-hover:to-[#A01506] group-hover:bg-clip-text transition-all duration-300">
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
                        <CheckCircle className="w-4 h-4 sm:w-5 sm:h-5 text-[#C21807] group-hover/item:scale-110 transition-transform" />
                      </div>
                      <span className="text-sm sm:text-base leading-relaxed font-medium">{item}</span>
                    </motion.li>
                  ))}
                </ul>
              </div>
              <div className="absolute inset-0 rounded-3xl border-2 border-transparent group-hover:border-[#C21807]/20 transition-colors duration-500 pointer-events-none" />
            </motion.div>

            {/* Why it matters */}
            <motion.div 
              initial={{ opacity: 0, x: 60 }}
              whileInView={{ opacity: 1, x: 0 }}
              whileHover={{ y: -12, scale: 1.02 }}
              transition={{ type: 'spring', stiffness: 100, damping: 20, delay: 0.1 }}
              viewport={{ once: true }}
              className="group relative bg-white rounded-3xl shadow-2xl hover:shadow-[0_12px_35px_rgba(248,113,113,0.45)] transition-all duration-500 overflow-hidden cursor-pointer border border-gray-100"
            >
              <div className="relative p-10">
                <div className="inline-flex items-center gap-1.5 sm:gap-2 px-3 py-2 sm:px-5 sm:py-2.5 rounded-full bg-linear-to-r from-[#C21807] to-[#A01506] text-white mb-8 shadow-lg group-hover:shadow-[#C21807]/50 transition-shadow duration-300">
                  <Store className="w-4 h-4 animate-pulse" />
                  <span className="text-sm font-bold tracking-wide">KEY BENEFITS</span>
                </div>
                <h3 className="text-4xl font-extrabold text-gray-900 mb-8 group-hover:text-transparent group-hover:bg-linear-to-r group-hover:from-[#C21807] group-hover:to-[#A01506] group-hover:bg-clip-text transition-all duration-300">
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
                        <CheckCircle className="w-4 h-4 sm:w-5 sm:h-5 text-[#C21807] group-hover/item:scale-110 transition-transform" />
                      </div>
                      <span className="text-sm sm:text-base leading-relaxed font-medium">{item}</span>
                    </motion.li>
                  ))}
                </ul>
              </div>
              <div className="absolute inset-0 rounded-3xl border-2 border-transparent group-hover:border-[#C21807]/20 transition-colors duration-500 pointer-events-none" />
            </motion.div>
          </div>

          {/* CTA Button */}
          <div className="text-center mt-12 md:mt-16 px-4 sm:px-6">
              <motion.a
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ type: "spring", stiffness: 100, damping: 20 }}
                viewport={{ once: true }}
                whileHover={{ scale: 1.05, y: -2 }}
                whileTap={{ scale: 0.98 }}
                href="https://docs.google.com/forms/d/e/1FAIpQLSfLEVHE5g0aw_MBfYbum20LAK1sbLdrLN4AzI0o2n-VF_RzZw/viewform"
                target="_blank"
                rel="noopener noreferrer"
                className="flex sm:inline-flex w-full sm:w-auto items-center justify-center gap-2 sm:gap-3 px-5 py-3 sm:px-8 sm:py-4 md:px-10 md:py-5 bg-[#C21807] text-white font-bold text-sm sm:text-base md:text-lg rounded-xl shadow-xl hover:shadow-2xl hover:shadow-[#C21807]/50 transition-all duration-300 cursor-pointer relative overflow-hidden group/btn focus:outline-none focus-visible:ring-2 focus-visible:ring-[#C21807]/30"
              >
                <span className="relative z-10 text-center">{s.details.ctaText}</span>
                <ArrowRight className="w-4 h-4 sm:w-5 sm:h-5 md:w-6 md:h-6 relative z-10 transform transition-transform duration-300 group-hover/btn:translate-x-1 shrink-0" />
                <div className="absolute inset-0 bg-white/20 -translate-x-full group-hover/btn:translate-x-full transition-transform duration-700" />
              </motion.a>
          </div>
        </div>
      </section>
    </div>
  );
}
