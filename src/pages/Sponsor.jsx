import React, { useEffect } from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { Trophy, Users, Store, ShoppingBag, CheckCircle, TrendingUp, ArrowRight, Handshake, Award } from "lucide-react";

// Use motion.create(Link) to avoid deprecated motion(Component)
const MotionLink = motion.create(Link);

const sponsorTiers = [
  {
    href: "/sponsor/titlesponser",
    icon: Trophy,
    title: "Title Sponsor",
    desc: "Premium branding across kits, trophies, and reels",
    gradient: "from-[#C21807] to-[#A01506]",
  },
  {
    href: "/sponsor/cosponser",
    icon: Users,
    title: "Co-Sponsor",
    desc: "Prominent logo placement, shoutouts, and banners",
    gradient: "from-[#A01506] to-[#C21807]",
  },
  {
    href: "/sponsor/stallsponser",
    icon: Store,
    title: "Stall Partner",
    desc: "On-site product demos, samplings, and branding space",
    gradient: "from-[#C21807] to-[#A01506]",
  },
  {
    href: "/sponsor/merchandisepartner",
    icon: ShoppingBag,
    title: "Merchandise Partner",
    desc: "Co-branded event kits and corporate giveaways",
    gradient: "from-[#C21807] to-[#A01506]",
  },
];

const Sponsorship = () => {
  useEffect(() => {
    const savedScroll = sessionStorage.getItem('sponsorPageScroll');
    const scrollToTiers = () => {
      const el = document.getElementById('tiers');
      if (el) {
        el.scrollIntoView({ behavior: 'auto', block: 'start' });
      }
    };
    if (savedScroll) {
      setTimeout(() => {
        window.scrollTo(0, parseInt(savedScroll, 10));
        sessionStorage.removeItem('sponsorPageScroll');
      }, 100);
    } else if (window.location.hash === '#tiers') {
      setTimeout(scrollToTiers, 100);
    }
  }, []);

  const handleLinkClick = () => {
    sessionStorage.setItem('sponsorPageScroll', window.scrollY.toString());
  };

  return (
    <div className="bg-gray-50 overflow-hidden">
      {/* Header Section */}
      <section className="relative pt-24 pb-10 overflow-hidden bg-gray-50">
        <div className="max-w-7xl mx-auto px-6 text-center relative z-10">
            <motion.div
              initial={{ opacity: 0, y: -40 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 1.2, ease: "easeOut" }}
              viewport={{ once: true }}
            >
              {/* Badge */}
              <div className="inline-flex items-center gap-1.5 sm:gap-2 px-3 py-2 sm:px-5 sm:py-2.5 rounded-full bg-linear-to-r from-[#C21807]/10 to-[#A01506]/10 border border-[#C21807]/30 shadow-lg backdrop-blur-sm mb-6">
                <Handshake className="w-4 h-4 text-[#C21807]" />
                <span className="text-sm font-bold text-[#C21807]">Partnership Opportunities</span>
              </div>

              <h1 className="text-3xl sm:text-4xl md:text-5xl font-black text-gray-900 tracking-tight leading-tight mb-6">
                Power Your Brand Through{" "}
                <span className="bg-linear-to-r from-[#C21807] via-[#A01506] to-[#C21807] bg-clip-text text-transparent drop-shadow-sm">
                  Corporate Sports
                </span>
              </h1>

              <p className="max-w-3xl mx-auto text-sm sm:text-base md:text-lg text-gray-700 leading-relaxed font-medium">
                Join India's growing corporate sports revolution as a {" "}
                <span className="font-bold text-[#C21807]">
                  HAKIRUSH Sponsor
                </span>
                . Gain access to <span className="font-semibold">professional audiences</span>, on-ground activations, and long-term brand visibility.
              </p>
            </motion.div>
        </div>
      </section>

      {/* Sponsor Tiers */}
      <section id="tiers" className="py-12 relative overflow-hidden bg-gray-50">

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          viewport={{ once: true }}
          className="max-w-7xl mx-auto px-6 relative z-10"
        >
          {/* Section Header */}
          <div className="text-center mb-16">
            <div className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-linear-to-r from-[#C21807]/10 to-[#A01506]/10 border border-[#C21807]/30 shadow-lg backdrop-blur-sm mb-6">
              <Award className="w-4 h-4 text-[#C21807]" />
              <span className="text-sm font-bold text-[#C21807]">Sponsorship Tiers</span>
            </div>
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-black text-gray-900 mb-4">
              Choose Your{" "}
              <span className="bg-linear-to-r from-[#C21807] via-[#A01506] to-[#C21807] bg-clip-text text-transparent drop-shadow-sm">
                Partnership Level
              </span>
            </h2>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {sponsorTiers.map((tier, i) => {
              const IconComponent = tier.icon;
              return (
                <MotionLink 
                  to={tier.href}
                  key={i}
                  onClick={handleLinkClick}
                  initial={{ opacity: 0, y: 60 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ 
                    type: 'spring',
                    stiffness: 100,
                    damping: 20,
                    delay: i * 0.1
                  }}
                  viewport={{ once: true }}
                  whileHover={{ y: -8, scale: 1.02 }}
                  className="group relative bg-white rounded-2xl overflow-hidden shadow-xl hover:shadow-[0_12px_35px_rgba(248,113,113,0.45)] transition-all duration-500 cursor-pointer block"
                >
                  {/* Gradient Border Effect */}
                  <div className={`absolute inset-0 bg-linear-to-br ${tier.gradient} opacity-0 group-hover:opacity-10 transition-opacity duration-500`} />
                  <div className={`absolute inset-0 border-2 border-transparent group-hover:border-[#C21807] rounded-2xl transition-colors duration-300 pointer-events-none`} />

                  <div className="relative p-8">
                    {/* Icon and Title in Row */}
                    <div className="flex items-center gap-4 mb-6">
                      <div className={`flex items-center justify-center w-14 h-14 rounded-2xl bg-linear-to-br ${tier.gradient} shadow-lg shrink-0`}>
                        <IconComponent className="w-6 h-6 text-white" />
                      </div>
                      <h3 className="text-lg sm:text-xl font-bold text-gray-900 group-hover:text-[#C21807] transition-colors">
                        {tier.title}
                      </h3>
                    </div>

                    <p className="text-sm sm:text-base text-gray-600 leading-relaxed">
                      {tier.desc}
                    </p>

                    {/* Arrow Indicator */}
                    <div className="mt-6 flex items-center gap-2 text-[#C21807] font-semibold text-xs sm:text-sm">
                      <span>Learn More</span>
                      <ArrowRight className="w-4 h-4 transform group-hover:translate-x-1 transition-transform" />
                    </div>
                  </div>
                </MotionLink>
              );
            })}
          </div>
        </motion.div>
      </section>

      {/* Dashboard & Why Sponsor Section */}
      <section className="py-12 relative overflow-hidden">

        <div className="max-w-7xl mx-auto px-6 relative z-10">
          <div className="grid sm:grid-cols-2 gap-16">
            {/* Dashboard Card */}
            <motion.div
              initial={{ opacity: 0, x: -60 }}
              whileInView={{ opacity: 1, x: 0 }}
              whileHover={{ y: -8 }}
              transition={{ 
                type: 'spring', 
                stiffness: 100,
                damping: 20,
                delay: 0
              }}
              viewport={{ once: true }}
              className="group relative bg-white rounded-3xl shadow-xl hover:shadow-[0_12px_35px_rgba(248,113,113,0.45)] transition-all duration-500 overflow-hidden cursor-pointer"
            >

              <div className="relative p-10">
                {/* Icon Badge */}
                <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-linear-to-r from-[#C21807] to-[#A01506] text-white shadow-md mb-6">
                  <TrendingUp className="w-5 h-5" />
                  <span className="text-sm font-bold">Analytics</span>
                </div>

                <h2 className="text-xl sm:text-2xl md:text-3xl font-black text-gray-900 mb-6 group-hover:text-[#C21807] transition-colors">
                  Sponsor Dashboard Features
                </h2>

                <ul className="space-y-4">
                  {[
                    "Real-time analytics of reach & impressions",
                    "Brand exposure tracking",
                    "Highlight reels showcasing sponsor placements",
                    "Dedicated logo placement in media posts"
                  ].map((text, i) => (
                    <li key={i} className="flex items-start gap-3 text-gray-700">
                      <CheckCircle className="w-5 h-5 sm:w-6 sm:h-6 text-[#C21807] shrink-0 mt-0.5" />
                      <span className="text-sm sm:text-base lg:text-lg leading-relaxed">{text}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </motion.div>

            {/* Why Sponsor Card */}
            <motion.div
              initial={{ opacity: 0, x: 60 }}
              whileInView={{ opacity: 1, x: 0 }}
              whileHover={{ y: -8 }}
              transition={{ 
                type: 'spring', 
                stiffness: 100,
                damping: 20,
                delay: 0.1
              }}
              viewport={{ once: true }}
              className="group relative bg-white rounded-3xl shadow-xl hover:shadow-[0_12px_35px_rgba(248,113,113,0.45)] transition-all duration-500 overflow-hidden cursor-pointer"
            >

              <div className="relative p-10">
                {/* Icon Badge */}
                <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-linear-to-r from-[#C21807] to-[#A01506] text-white shadow-md mb-6">
                  <Trophy className="w-5 h-5" />
                  <span className="text-sm font-bold">Benefits</span>
                </div>

                <h2 className="text-xl sm:text-2xl md:text-3xl font-black text-gray-900 mb-6 group-hover:text-[#C21807] transition-colors">
                  Why Sponsor HAKIRUSH?
                </h2>

                <ul className="space-y-4">
                  {[
                    "Access 1000+ professionals per tournament",
                    "Multi-city exposure",
                    "Social media amplification",
                    "Premium association with fitness & team culture"
                  ].map((text, i) => (
                    <li key={i} className="flex items-start gap-3 text-gray-700">
                      <CheckCircle className="w-5 h-5 sm:w-6 sm:h-6 text-[#C21807] shrink-0 mt-0.5" />
                      <span className="text-sm sm:text-base lg:text-lg leading-relaxed">{text}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* CTA Button */}
      <div className="text-center pb-20 px-6">
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
            className="inline-flex items-center justify-center gap-2 sm:gap-3 px-6 py-3 sm:px-10 sm:py-4 md:px-12 md:py-5 bg-[#C21807] text-white font-bold text-base sm:text-lg rounded-lg shadow-xl hover:shadow-2xl hover:shadow-[#C21807]/50 transition-all duration-300 cursor-pointer relative overflow-hidden group/btn focus:outline-none focus-visible:ring-4 focus-visible:ring-[#C21807]/30"
          >
            <span className="relative z-10">Join as a Sponsor</span>
            <ArrowRight className="w-5 h-5 sm:w-6 sm:h-6 relative z-10 transform transition-transform duration-300 group-hover/btn:translate-x-1" />
            {/* Shimmer effect */}
            <div className="absolute inset-0 bg-white/20 -translate-x-full group-hover/btn:translate-x-full transition-transform duration-700" />
          </motion.a>
      </div>
    </div>
  );
};

export default Sponsorship;