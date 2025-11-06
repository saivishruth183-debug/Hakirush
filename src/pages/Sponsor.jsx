import React from "react";
import { motion } from "framer-motion";

const sponsorTiers = [
  {
    icon: "🏆",
    title: "Title Sponsor",
    desc: "Premium branding across kits, trophies, and reels",
  },
  {
    icon: "🤝",
    title: "Co-Sponsor",
    desc: "Prominent logo placement, shoutouts, and banners",
  },
  {
    icon: "🏬",
    title: "Stall Partner",
    desc: "On-site product demos, samplings, and branding space",
  },
  {
    icon: "👕",
    title: "Merchandise Partner",
    desc: "Co-branded event kits and corporate giveaways",
  },
];

const Sponsorship = () => {
  return (
    <div className="bg-white overflow-hidden">

      {/* Header Section */}
      <motion.section
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="text-center py-24 px-6"
      >
        <h1 className="text-4xl md:text-5xl font-bold text-[#0A1A2F]">
          Power Your Brand Through <span className="text-[#C21807]">Sports</span>
        </h1>
        <p className="max-w-2xl mx-auto text-gray-600 mt-5 text-lg">
          Join India’s growing corporate sports revolution as a HAKIRUSH Sponsor. 
          Gain access to professional audiences, on-ground activations, and long-term brand visibility.
        </p>
      </motion.section>

      {/* Sponsor Tiers */}
      <motion.section 
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        className="max-w-6xl mx-auto grid md:grid-cols-4 gap-6 px-6 pb-24"
      >
        {sponsorTiers.map((tier, i) => (
          <motion.div
            whileHover={{ y: -6 }}
            key={i}
            className="p-8 bg-white border border-gray-200 rounded-xl shadow-sm hover:shadow-lg transition-all"
          >
            <div className="text-4xl mb-4">{tier.icon}</div>
            <h3 className="text-xl font-semibold text-[#0A1A2F]">{tier.title}</h3>
            <p className="text-gray-600 mt-2">{tier.desc}</p>
          </motion.div>
        ))}
      </motion.section>

      {/* Sponsor Dashboard Features */}
      <section className="bg-[#0A1A2F] text-white py-20 px-6">
        <h2 className="text-3xl font-bold text-center">Sponsor Dashboard Features</h2>

        <div className="max-w-5xl mx-auto mt-12 grid md:grid-cols-2 gap-6 text-lg">
          <p>• Real-time analytics of reach & impressions</p>
          <p>• Brand exposure tracking</p>
          <p>• Highlight reels showcasing sponsor placements</p>
          <p>• Dedicated logo placement in media posts</p>
        </div>
      </section>

      {/* Why Sponsor */}
      <motion.section 
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        className="text-center py-24 px-6"
      >
        <h2 className="text-3xl font-bold text-[#0A1A2F]">Why Sponsor HAKIRUSH?</h2>
        <div className="max-w-3xl mx-auto mt-8 space-y-3 text-lg text-gray-700">
          <p>✅ Access 1000+ professionals per tournament</p>
          <p>✅ Multi-city exposure</p>
          <p>✅ Social media amplification (LinkedIn, Instagram, YouTube)</p>
          <p>✅ Premium association with fitness & corporate engagement</p>
        </div>

        <a
          href="/contact"
          className="mt-12 inline-block px-10 py-4 rounded-lg font-semibold text-white bg-gradient-to-r from-[#C21807] to-red-500 hover:from-red-500 hover:to-[#C21807] transition-all shadow-lg"
        >
          Join as a Sponsor
        </a>
      </motion.section>

    </div>
  );
};

export default Sponsorship;
