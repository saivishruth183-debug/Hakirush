import React from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";

const sponsorTiers = [
  {
    href:"/sponsor/titlesponser",
    icon: "🏆",
    title: "Title Sponsor",
    desc: "Premium branding across kits, trophies, and reels",
  },
  {
    href:"/sponsor/cosponser",
    icon: "🤝",
    title: "Co-Sponsor",
    desc: "Prominent logo placement, shoutouts, and banners",
  },
  {
    href:"/sponsor/stallsponser",
    icon: "🏬",
    title: "Stall Partner",
    desc: "On-site product demos, samplings, and branding space",
  },
  {
    href:"/sponsor/merchandisepartner",
    icon: "👕",
    title: "Merchandise Partner",
    desc: "Co-branded event kits and corporate giveaways",
  },
];

const Sponsorship = () => {
  return (
    <div className="bg-[#FFF5F5] overflow-hidden">

      {/* Header Background */}
      <div
        className="relative pb-20 mb-12"
        style={{
          background:
            "radial-gradient(circle at center, rgba(255,0,0,0.07), transparent 70%), radial-gradient(circle at bottom right, rgba(255,102,0,0.05), transparent 80%), radial-gradient(circle at top left, rgba(255,255,255,0.05), transparent 85%)",
        }}
      >
        
        {/* Header Section */}
        <section className="pt-16 relative">
          <div className="max-w-7xl mx-auto px-6 text-center relative z-10">
            <motion.div
              initial={{ opacity: 0, y: 40, rotateX: -10 }}
              animate={{ opacity: 1, y: 0, rotateX: 0 }}
              transition={{ duration: 0.8 }}
            >
              <h1 className="text-4xl md:text-5xl font-extrabold text-[#0A1A2F] leading-tight">
                Power Your Brand Through{" "}
                <span className="text-[#C21807]">Sports</span>
              </h1>

              <p className="max-w-3xl mx-auto font-semibold text-gray-700 mt-5 text-lg leading-relaxed">
                Join India’s growing corporate sports revolution as a HAKIRUSH Sponsor. 
                Gain access to professional audiences, on-ground activations, and long-term brand visibility.
              </p>
            </motion.div>
          </div>
        </section>
      </div>

      {/* Sponsor Tiers */}
      <motion.section 
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, ease: "easeOut" }}
        viewport={{ once: true }}
        className="max-w-6xl mx-auto grid md:grid-cols-4 gap-8 px-6 pb-28"
      >
        {sponsorTiers.map((tier, i) => (
          <motion.a
            href={tier.href}
            whileHover={{ y: -8 }}
            key={i}
            className="p-8 bg-white border border-gray-200 rounded-xl shadow-md hover:shadow-xl hover:shadow-red-400 transition-all duration-300 cursor-pointer"
          >
            <div className="text-4xl mb-4">{tier.icon}</div>

            <h3 className="text-xl font-semibold text-[#0A1A2F] transition">
              {tier.title}
            </h3>

            <p className="text-gray-600 mt-2 transition">
              {tier.desc}
            </p>
          </motion.a>
        ))}
      </motion.section>

      {/* Dashboard & Why Sponsor Section */}
      <motion.section
        initial={{ opacity: 0, x: -30 }}
        whileInView={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.7, ease: "easeOut" }}
        viewport={{ once: true }}
        className="max-w-7xl mx-auto px-6 pb-20 grid sm:grid-cols-2 gap-10"
      >
        {/* Dashboard Card */}
        <motion.div
          whileHover={{ y: -8 }}
          className="group p-10 bg-white rounded-xl shadow-lg hover:shadow-red-400 border border-gray-200 transition-all hover:shadow-2xl"
        >
          <h2 className="text-3xl font-bold text-[#C21807] mb-6">
            Sponsor Dashboard Features
          </h2>

          <ul className="space-y-3 text-lg text-gray-700">
            <li>✅ Real-time analytics of reach & impressions</li>
            <li>✅ Brand exposure tracking</li>
            <li>✅ Highlight reels showcasing sponsor placements</li>
            <li>✅ Dedicated logo placement in media posts</li>
          </ul>
        </motion.div>

        {/* Why Sponsor Card */}
        <motion.div
          whileHover={{ y: -8 }}
          className="group p-10 bg-white rounded-xl shadow-lg hover:shadow-red-400 border border-gray-200 transition-all hover:shadow-2xl"
        >
          <h2 className="text-3xl font-bold text-[#C21807] mb-6">
            Why Sponsor HAKIRUSH?
          </h2>

          <ul className="space-y-3 text-lg text-gray-700">
            <li>✅ Access 1000+ professionals per tournament</li>
            <li>✅ Multi-city exposure</li>
            <li>✅ Social media amplification</li>
            <li>✅ Premium association with fitness & team culture</li>
          </ul>
        </motion.div>
      </motion.section>

      {/* CTA Button */}
      <motion.div 
        className="flex items-center justify-center pb-20"
        whileHover={{ scale: 1.07 }}
      >
        <Link
          to="/contact"
          className="px-10 py-3 rounded-full font-semibold text-white bg-[#C21807] hover:bg-red-600 transition-all shadow-lg"
        >
          Join as a Sponsor
        </Link>
      </motion.div>

    </div>
  );
};

export default Sponsorship;
