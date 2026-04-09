// eslint-disable-next-line no-unused-vars
import { motion } from "framer-motion";
import { 
  Store, CheckCircle, ArrowRight, Sparkles, ArrowLeft, Users, Trophy, 
  ShoppingBag, MapPin, Zap, Activity, CircleDot 
} from "lucide-react";
import { useNavigate } from "react-router-dom";

// --- BACKGROUND SUB-COMPONENT ---
const ContinuousSportsBackground = () => {
  // Theme-specific icons for Stall/Engagement
  const row1 = [Store, MapPin, ShoppingBag, CircleDot, Zap, Users];
  const row2 = [Trophy, Store, Activity, ShoppingBag, Users, Sparkles];

  return (
    <div className="fixed inset-0 overflow-hidden bg-white pointer-events-none z-0">
      {/* Radial blurred backgrounds */}
      <div className="absolute top-[-10%] left-[-10%] w-[60%] h-[60%] bg-red-100/60 blur-[120px] rounded-full" />
      <div className="absolute bottom-[-10%] right-[-10%] w-[50%] h-[50%] bg-red-50/80 blur-[120px] rounded-full" />

      {/* Row 1: Moving Left */}
      <div className="flex absolute top-[10%] opacity-[0.04]">
        <motion.div 
          initial={{ x: 0 }}
          animate={{ x: "-100%" }}
          transition={{ duration: 50, repeat: Infinity, ease: "linear" }}
          className="flex gap-24 pr-24 whitespace-nowrap"
        >
          {row1.map((Icon, i) => <Icon key={i} size={80} className="text-red-900" strokeWidth={1} />)}
          {row1.map((Icon, i) => <Icon key={`dup-${i}`} size={80} className="text-red-900" strokeWidth={1} />)}
        </motion.div>
      </div>

      {/* Row 2: Moving Right */}
      <div className="flex absolute top-[60%] opacity-[0.03]">
        <motion.div 
          initial={{ x: "-100%" }}
          animate={{ x: 0 }}
          transition={{ duration: 60, repeat: Infinity, ease: "linear" }}
          className="flex gap-32 pr-32 whitespace-nowrap"
        >
          {row2.map((Icon, i) => <Icon key={i} size={110} className="text-red-900" strokeWidth={0.5} />)}
          {row2.map((Icon, i) => <Icon key={`dup2-${i}`} size={110} className="text-red-900" strokeWidth={0.5} />)}
        </motion.div>
      </div>

      {/* Radial overlay for soft white */}
      <div className="absolute inset-0 pointer-events-none" style={{
        background: "radial-gradient(circle at center, transparent 0%, rgba(255,255,255,0.2) 60%, rgba(255,255,255,0.7) 100%)"
      }} />
    </div>
  );
};

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
  const navigate = useNavigate();
  
  const handleBackClick = () => {
    navigate('/sponsor#tiers');
  };

  return (
    <div className="bg-gray-50 relative overflow-hidden min-h-screen">
      
      {/* 1. Continuous Background Icons */}
      <ContinuousSportsBackground />

      {/* Back Button - z-20 to stay on top */}
      <div className="max-w-6xl mx-auto px-4 sm:px-6 pt-12 pb-3 md:pt-10 md:pb-6 relative z-20">
        <motion.button
          onClick={handleBackClick}
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5 }}
          whileHover={{ x: -5 }}
          className="inline-flex items-center gap-1.5 sm:gap-2 px-3 py-2 sm:px-4 sm:py-2.5 rounded-lg bg-white/90 backdrop-blur-sm border border-[#C21807]/30 shadow-sm hover:shadow-md text-[#C21807] hover:bg-[#C21807]/5 text-xs sm:text-sm md:text-base font-semibold transition-all cursor-pointer"
        >
          <ArrowLeft className="w-3.5 h-3.5 sm:w-4 sm:h-4 md:w-5 md:h-5 shrink-0" />
          <span className="whitespace-nowrap">Back to Sponsorship Tiers</span>
        </motion.button>
      </div>

      {/* Hero Section */}
      <section className="relative py-10 overflow-hidden bg-transparent">
        <div className="max-w-6xl mx-auto px-6 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: -40 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.2, ease: "easeOut" }}
            viewport={{ once: true }}
            className="text-center"
          >
            {/* Badge */}
            <div className="inline-flex items-center gap-1.5 sm:gap-2 px-3 py-2 sm:px-5 sm:py-2.5 rounded-full bg-white/80 border border-[#C21807]/30 shadow-lg backdrop-blur-sm mb-8">
              <Users className="w-4 h-4 text-[#C21807]" />
              <span className="text-sm font-bold text-[#C21807]">Direct Engagement</span>
            </div>

            {/* Icon and Title in Row */}
            <div className="flex items-center justify-center gap-2 sm:gap-3 md:gap-4 mb-6">
              <div className="inline-flex items-center justify-center w-14 h-14 sm:w-16 sm:h-16 md:w-20 md:h-20 rounded-2xl sm:rounded-3xl bg-gradient-to-r from-[#C21807] to-[#A01506] shadow-2xl shrink-0">
                <Trophy className="w-6 h-6 sm:w-7 sm:h-7 md:w-8 md:h-8 text-white" />
              </div>
              <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-black text-gray-900 tracking-tight">
                {s.title}{" "}
                <span className="bg-gradient-to-r from-[#C21807] via-[#A01506] to-[#C21807] bg-clip-text text-transparent drop-shadow-sm">
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

      {/* Content Section */}
      <section className="py-12 relative bg-transparent">
        <div className="max-w-6xl mx-auto px-6 relative z-10">
          <div className="grid md:grid-cols-2 gap-10">
            
            {/* What you get Card */}
            <motion.div
              initial={{ opacity: 0, x: -60 }}
              whileInView={{ opacity: 1, x: 0 }}
              whileHover={{ y: -12, scale: 1.01 }}
              transition={{ type: 'spring', stiffness: 100, damping: 20 }}
              viewport={{ once: true }}
              className="group relative bg-white/90 backdrop-blur-md rounded-3xl shadow-2xl hover:shadow-[0_12px_35px_rgba(194,24,7,0.3)] transition-all duration-500 overflow-hidden border border-gray-100"
            >
              <div className="relative p-10">
                <div className="inline-flex items-center gap-1.5 px-3 py-2 sm:px-5 sm:py-2.5 rounded-full bg-gradient-to-r from-[#C21807] to-[#A01506] text-white mb-8 shadow-lg group-hover:shadow-[#C21807]/50 transition-shadow duration-300">
                  <Sparkles className="w-4 h-4 animate-pulse" />
                  <span className="text-xs sm:text-sm font-bold tracking-wide">PACKAGE INCLUDES</span>
                </div>
                <h3 className="text-xl sm:text-3xl font-extrabold text-gray-900 mb-8 group-hover:text-[#C21807] transition-all duration-300">
                  What You Get
                </h3>
                <ul className="space-y-5">
                  {s.details.whatYouGet.map((item, idx) => (
                    <li key={idx} className="flex items-start gap-4 text-gray-700 group/item">
                      <CheckCircle className="w-5 h-5 text-[#C21807] shrink-0 mt-0.5 group-hover/item:scale-110 transition-transform" />
                      <span className="text-sm sm:text-base leading-relaxed font-medium">{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </motion.div>

            {/* Why it matters Card */}
            <motion.div 
              initial={{ opacity: 0, x: 60 }}
              whileInView={{ opacity: 1, x: 0 }}
              whileHover={{ y: -12, scale: 1.01 }}
              transition={{ type: 'spring', stiffness: 100, damping: 20, delay: 0.1 }}
              viewport={{ once: true }}
              className="group relative bg-white/90 backdrop-blur-md rounded-3xl shadow-2xl hover:shadow-[0_12px_35px_rgba(194,24,7,0.3)] transition-all duration-500 overflow-hidden border border-gray-100"
            >
              <div className="relative p-10">
                <div className="inline-flex items-center gap-1.5 px-3 py-2 sm:px-5 sm:py-2.5 rounded-full bg-gradient-to-r from-[#C21807] to-[#A01506] text-white mb-8 shadow-lg group-hover:shadow-[#C21807]/50 transition-shadow duration-300">
                  <Store className="w-4 h-4 animate-pulse" />
                  <span className="text-xs sm:text-sm font-bold tracking-wide">KEY BENEFITS</span>
                </div>
                <h3 className="text-xl sm:text-3xl font-extrabold text-gray-900 mb-8 group-hover:text-[#C21807] transition-all duration-300">
                  Why It Matters
                </h3>
                <ul className="space-y-5">
                  {s.details.why.map((item, idx) => (
                    <li key={idx} className="flex items-start gap-4 text-gray-700 group/item">
                      <CheckCircle className="w-5 h-5 text-[#C21807] shrink-0 mt-0.5 group-hover/item:scale-110 transition-transform" />
                      <span className="text-sm sm:text-base leading-relaxed font-medium">{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </motion.div>
          </div>

          {/* CTA Button */}
          <div className="text-center mt-12 md:mt-16 relative z-10">
              <motion.a
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ type: "spring", stiffness: 100, damping: 20 }}
                viewport={{ once: true }}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.98 }}
                href="https://docs.google.com/forms/d/e/1FAIpQLSfLEVHE5g0aw_MBfYbum20LAK1sbLdrLN4AzI0o2n-VF_RzZw/viewform"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-3 px-8 py-4 md:px-10 md:py-5 bg-[#C21807] text-white font-bold text-lg rounded-xl shadow-xl hover:shadow-2xl hover:shadow-[#C21807]/50 transition-all duration-300 group/btn overflow-hidden"
              >
                <span className="relative z-10">{s.details.ctaText}</span>
                <ArrowRight className="w-6 h-6 relative z-10 transform transition-transform group-hover/btn:translate-x-1" />
                <div className="absolute inset-0 bg-white/20 -translate-x-full group-hover/btn:translate-x-full transition-transform duration-700" />
              </motion.a>
          </div>
        </div>
      </section>
    </div>
  );
}