// eslint-disable-next-line no-unused-vars
import { motion } from "framer-motion";
import { ShoppingBag, CheckCircle, ArrowRight, Sparkles, ArrowLeft, Trophy } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";

const SPONSORS = [
  {
    key: "merch",
    icon: ShoppingBag,
    title: "Merchandise Partner",
    subtitle: "Co-branded event kits and corporate giveaways",
    details: {
      overview:
        "Merch sponsorship places your brand on items that attendees keep — jerseys, bottles, bags and more — extending visibility beyond the event day.",
      whatYouGet: [
        "Exclusive logo on official merchandise (jerseys, bottles, medals)",
        "Custom-branded giveaways & distribution at registration",
        "Social features (unboxing, prize posts) and mention in media",
      ],
      why: [
        "Long-lived brand recall through physical merchandise",
        "Visual presence in photos, videos & post-event coverage",
        "Perfect for lifestyle, fitness, and consumer brands",
      ],
      ctaText: "Partner on Merchandise",
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
    <div className="relative overflow-hidden bg-gray-50">
      {/* Back Button */}
      <div className="max-w-6xl mx-auto px-4 sm:px-6 pt-12 pb-3 md:pt-10 md:pb-6">
        <motion.button
          onClick={handleBackClick}
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5 }}
          whileHover={{ x: -5 }}
          className="inline-flex items-center gap-1.5 sm:gap-2 px-3 py-2 sm:px-4 sm:py-2.5 rounded-lg bg-white border border-[#C21807]/30 shadow-sm hover:shadow-md text-[#C21807] hover:bg-[#C21807]/5 text-xs sm:text-sm md:text-base font-semibold transition-all cursor-pointer"
        >
          <ArrowLeft className="w-3.5 h-3.5 sm:w-4 sm:h-4 md:w-5 md:h-5 shrink-0" />
          <span className="whitespace-nowrap">Back to Sponsorship Tiers</span>
        </motion.button>
      </div>
      <section className="relative py-10 overflow-hidden bg-gray-50">

        <div className="max-w-6xl mx-auto px-6 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: -40 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.2, ease: "easeOut" }}
            viewport={{ once: true }}
            className="text-center"
          >
            <div className="inline-flex items-center gap-1.5 sm:gap-2 px-3 py-2 sm:px-5 sm:py-2.5 rounded-full bg-linear-to-r from-[#C21807]/10 to-[#A01506]/10 border border-[#C21807]/30 shadow-lg backdrop-blur-sm mb-8">
              <ShoppingBag className="w-4 h-4 text-[#C21807]" />
              <span className="text-sm font-bold text-[#C21807]">Brand Merchandise</span>
            </div>

            {/* Icon and Title in Row */}
            <div className="flex items-center justify-center gap-2 sm:gap-3 md:gap-4 mb-6">
              <div className="inline-flex items-center justify-center w-14 h-14 sm:w-16 sm:h-16 md:w-20 md:h-20 rounded-2xl sm:rounded-3xl bg-linear-to-r from-[#C21807] to-[#A01506] shadow-2xl shrink-0">
                <Trophy className="w-6 h-6 sm:w-7 sm:h-7 md:w-8 md:h-8 text-white" />
              </div>
              <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-black text-gray-900 tracking-tight">
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
          <div className="grid md:grid-cols-2 gap-10 mb-12">
            <motion.div
              className="relative group bg-white rounded-3xl shadow-2xl hover:shadow-[0_12px_35px_rgba(248,113,113,0.45)] transition-all duration-500 border border-gray-100 overflow-hidden cursor-pointer"
              whileHover={{ y: -12, scale: 1.02 }}
              viewport={{ once: true }}
              initial={{ opacity: 0, x: -60 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ type: 'spring', stiffness: 100, damping: 20 }}
            >

              <div className="relative p-10">
                <div className="inline-flex items-center gap-1.5 sm:gap-2 px-3 py-2 sm:px-5 sm:py-2.5 rounded-full bg-linear-to-r from-[#C21807] to-[#A01506] text-white mb-6 sm:mb-8 shadow-lg group-hover:shadow-[#C21807]/50 transition-shadow duration-300">
                  <Sparkles className="w-4 h-4 animate-pulse" />
                  <span className="text-xs sm:text-sm font-bold tracking-wide">PACKAGE INCLUDES</span>
                </div>
                
                <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-gray-900 mb-6 sm:mb-8 group-hover:text-transparent group-hover:bg-linear-to-r group-hover:from-[#C21807] group-hover:to-[#A01506] group-hover:bg-clip-text transition-all duration-300">
                  What You Get
                </h2>
                
                <ul className="space-y-4 sm:space-y-5">
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

            <motion.div
              className="relative group bg-white rounded-3xl shadow-2xl hover:shadow-[0_12px_35px_rgba(248,113,113,0.45)] transition-all duration-500 border border-gray-100 overflow-hidden cursor-pointer"
              whileHover={{ y: -12, scale: 1.02 }}
              viewport={{ once: true }}
              initial={{ opacity: 0, x: 60 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ type: 'spring', stiffness: 100, damping: 20, delay: 0.1 }}
            >

              <div className="relative p-10">
                <div className="inline-flex items-center gap-1.5 sm:gap-2 px-3 py-2 sm:px-5 sm:py-2.5 rounded-full bg-linear-to-r from-[#C21807] to-[#A01506] text-white mb-6 sm:mb-8 shadow-lg group-hover:shadow-[#C21807]/50 transition-shadow duration-300">
                  <ShoppingBag className="w-4 h-4 animate-pulse" />
                  <span className="text-xs sm:text-sm font-bold tracking-wide">KEY BENEFITS</span>
                </div>
                
                <h2 className="text-xl sm:text-2xl md:text-3xl font-extrabold text-gray-900 mb-6 sm:mb-8 group-hover:text-transparent group-hover:bg-linear-to-r group-hover:from-[#C21807] group-hover:to-[#A01506] group-hover:bg-clip-text transition-all duration-300">
                  Why It Matters
                </h2>
                
                <ul className="space-y-4 sm:space-y-5">
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

          <motion.div
            className="flex justify-center px-4 sm:px-6"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.3 }}
          >
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
                className="flex sm:inline-flex w-full sm:w-auto items-center justify-center gap-2 sm:gap-3 px-5 py-3 sm:px-8 sm:py-4 md:px-12 md:py-5 bg-[#C21807] text-white font-bold text-sm sm:text-base md:text-lg rounded-xl shadow-xl hover:shadow-2xl hover:shadow-[#C21807]/50 transition-all duration-300 cursor-pointer relative overflow-hidden group/btn focus:outline-none focus-visible:ring-2 focus-visible:ring-[#C21807]/30"
              >
                <span className="relative z-10 text-center">{s.details.ctaText}</span>
                <ArrowRight className="w-4 h-4 sm:w-5 sm:h-5 md:w-6 md:h-6 relative z-10 transform transition-transform duration-300 group-hover/btn:translate-x-1 shrink-0" />
                {/* Shimmer effect */}
                <div className="absolute inset-0 bg-white/20 -translate-x-full group-hover/btn:translate-x-full transition-transform duration-700" />
              </motion.a>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
