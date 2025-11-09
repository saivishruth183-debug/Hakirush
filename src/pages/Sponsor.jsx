import React from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";

const MotionLink = motion(Link);

const sponsorTiers = [
  {
    href: "/sponsor/titlesponser",
    icon: "🏆",
    title: "Title Sponsor",
    desc: "Premium branding across kits, trophies, and reels",
  },
  {
    href: "/sponsor/cosponser",
    icon: "🤝",
    title: "Co-Sponsor",
    desc: "Prominent logo placement, shoutouts, and banners",
  },
  {
    href: "/sponsor/stallsponser",
    icon: "🏬",
    title: "Stall Partner",
    desc: "On-site product demos, samplings, and branding space",
  },
  {
    href: "/sponsor/merchandisepartner",
    icon: "👕",
    title: "Merchandise Partner",
    desc: "Co-branded event kits and corporate giveaways",
  },
];

const Sponsorship = () => {
  return (
    <div className="bg-[#FFF5F5] overflow-hidden">

      {/* Header Section */}
      <motion.section
        initial={{ opacity: 0, y: -30 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, ease: "easeOut" }}
        viewport={{ once: true }}
        className="text-center py-16 px-6"
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
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, ease: "easeOut" }}
        viewport={{ once: true }}
        className="max-w-6xl mx-auto grid md:grid-cols-4 gap-6 px-6 pb-24"
      >
        {sponsorTiers.map((tier, i) => (
          <MotionLink
            to={tier.href}
            whileHover={{ y: -6, scale: 1.03 }}
            key={i}
            className="p-8 bg-white border border-gray-200 rounded-xl shadow-sm hover:shadow-lg hover:shadow-red-400 transition-all cursor-pointer"
          >
            <div className="text-4xl mb-4">{tier.icon}</div>
            <h3 className="text-xl font-semibold text-[#0A1A2F]">{tier.title}</h3>
            <p className="text-gray-600 mt-2">{tier.desc}</p>
          </MotionLink>
        ))}
      </motion.section>

      {/* Dashboard & Why Sponsor Cards */}
      <motion.section
        initial={{ opacity: 0, x: -30 }}
        whileInView={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.7, ease: "easeOut" }}
        viewport={{ once: true }}
        className="max-w-7xl mx-auto px-6 pb-16 grid sm:grid-cols-2 gap-8"
      >
        {/* Dashboard Card */}
        <motion.div
          whileHover={{ y: -6, scale: 1.02 }}
          className="p-10 bg-white rounded-xl shadow-lg hover:shadow-red-800 transition-all cursor-pointer"
        >
          <h2 className="text-3xl text-[#C21807] font-bold mb-6">Sponsor Dashboard Features</h2>
          <ul className="space-y-3 text-lg text-gray-700">
            <li>✅ Real-time analytics of reach and impressions</li>
            <li>✅ Brand exposure tracking</li>
            <li>✅ Highlight reels showcasing sponsor placements</li>
            <li>✅ Dedicated logo placement in media posts</li>
          </ul>
        </motion.div>

        {/* Why Sponsor Card */}
        <motion.div
          whileHover={{ y: -6, scale: 1.02 }}
          className="p-10 bg-white border border-gray-200 rounded-xl shadow-lg hover:shadow-red-800 transition-all cursor-pointer"
        >
          <h2 className="text-3xl font-bold text-[#C21807] mb-6">Why Sponsor HAKIRUSH?</h2>
          <ul className="space-y-3 text-lg text-gray-700">
            <li>✅ Access 1000+ professionals per tournament</li>
            <li>✅ Multi-city exposure</li>
            <li>✅ Social media amplification</li>
            <li>✅ Premium association with fitness and team culture</li>
          </ul>
        </motion.div>
      </motion.section>

      {/* CTA Button */}
      <motion.div className="flex items-center justify-center pb-16" whileHover={{ scale: 1.06 }}>
        <Link
          to="/contact"
          className="px-8 py-3 rounded-full font-semibold text-white bg-[#C21807] hover:bg-red-600 transition-all shadow-md"
        >
          Join as a Sponsor
        </Link>
      </motion.div>

    </div>
  );
};

export default Sponsorship;
