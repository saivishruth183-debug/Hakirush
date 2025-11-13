import React from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { Trophy, Users, Store, ShoppingBag, CheckCircle, TrendingUp, ArrowRight } from "lucide-react";

// Use motion(Link) for Framer Motion animation on the Link component
const MotionLink = motion(Link);

const sponsorTiers = [
  {
    href: "/sponsor/titlesponser",
    icon: Trophy,
    title: "Title Sponsor",
    desc: "Premium branding across kits, trophies, and reels",
    gradient: "from-red-600 to-orange-500",
  },
  {
    href: "/sponsor/cosponser",
    icon: Users,
    title: "Co-Sponsor",
    desc: "Prominent logo placement, shoutouts, and banners",
    gradient: "from-orange-500 to-red-500",
  },
  {
    href: "/sponsor/stallsponser",
    icon: Store,
    title: "Stall Partner",
    desc: "On-site product demos, samplings, and branding space",
    gradient: "from-red-500 to-pink-500",
  },
  {
    href: "/sponsor/merchandisepartner",
    icon: ShoppingBag,
    title: "Merchandise Partner",
    desc: "Co-branded event kits and corporate giveaways",
    gradient: "from-pink-500 to-red-600",
  },
];

const Sponsorship = () => {
  return (
    <div className="bg-white overflow-hidden">
      {/* Header Section */}
      <section className="relative py-20 overflow-hidden bg-white">
        <div className="max-w-7xl mx-auto px-6 text-center relative z-10">
            <motion.div
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
            >
              {/* Badge */}
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-linear-to-r from-red-50 to-orange-50 border border-red-100 mb-6">
                <div className="w-2 h-2 rounded-full bg-red-500 animate-pulse" />
                <span className="text-sm font-semibold text-red-600">Partnership Opportunities</span>
              </div>

              <h1 className="text-3xl md:text-4xl lg:text-5xl font-extrabold text-gray-900 leading-tight mb-6">
                Power Your Brand Through{" "}
                <span className="bg-linear-to-r from-red-600 to-orange-500 bg-clip-text text-transparent">
                  Corporate Sports
                </span>
              </h1>

              <p className="max-w-3xl mx-auto text-base md:text-lg text-gray-700 leading-relaxed">
                Join India's growing corporate sports revolution as a <strong className="text-red-600">HAKIRUSH Sponsor</strong>. 
                Gain access to <strong>professional audiences</strong>, on-ground activations, and long-term brand visibility.
              </p>
            </motion.div>
        </div>
      </section>

      {/* Sponsor Tiers */}
      <section className="py-20 relative overflow-hidden bg-white">

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          viewport={{ once: true }}
          className="max-w-7xl mx-auto px-6 relative z-10"
        >
          {/* Section Header */}
          <div className="text-center mb-16">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-linear-to-r from-red-50 to-orange-50 border border-red-100 mb-6">
              <div className="w-2 h-2 rounded-full bg-red-500 animate-pulse" />
              <span className="text-sm font-semibold text-red-600">Sponsorship Tiers</span>
            </div>
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-gray-900 mb-4">
              Choose Your{" "}
              <span className="bg-linear-to-r from-red-600 to-orange-500 bg-clip-text text-transparent">
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
                  initial={{ opacity: 0, y: 40 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ 
                    duration: 0.5,
                    delay: i * 0.1
                  }}
                  viewport={{ once: true }}
                  whileHover={{ y: -8, scale: 1.02 }}
                  className="group relative bg-white rounded-2xl overflow-hidden shadow-xl hover:shadow-2xl transition-all duration-500 cursor-pointer block"
                >
                  {/* Gradient Border Effect */}
                  <div className={`absolute inset-0 bg-linear-to-br ${tier.gradient} opacity-0 group-hover:opacity-10 transition-opacity duration-500`} />
                  <div className={`absolute inset-0 border-2 border-transparent group-hover:border-red-500 rounded-2xl transition-colors duration-300 pointer-events-none`} />

                  <div className="relative p-8">
                    {/* Icon and Title in Row */}
                    <div className="flex items-center gap-4 mb-6">
                      <div className={`flex items-center justify-center w-14 h-14 rounded-2xl bg-linear-to-br ${tier.gradient} shadow-lg shrink-0`}>
                        <IconComponent className="w-6 h-6 text-white" />
                      </div>
                      <h3 className="text-xl font-bold text-gray-900 group-hover:text-red-600 transition-colors">
                        {tier.title}
                      </h3>
                    </div>

                    <p className="text-gray-600 leading-relaxed">
                      {tier.desc}
                    </p>

                    {/* Arrow Indicator */}
                    <div className="mt-6 flex items-center gap-2 text-red-600 font-semibold text-sm">
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
      <section className="py-20 relative overflow-hidden">

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          viewport={{ once: true }}
          className="max-w-7xl mx-auto px-6 relative z-10"
        >
          <div className="grid sm:grid-cols-2 gap-10">
            {/* Dashboard Card */}
            <motion.div
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              whileHover={{ y: -8 }}
              transition={{ 
                type: 'spring', 
                stiffness: 200,
                delay: 0
              }}
              viewport={{ once: true }}
              className="group relative bg-white rounded-3xl shadow-xl hover:shadow-2xl transition-all duration-500 overflow-hidden cursor-pointer"
            >

              <div className="relative p-10">
                {/* Icon Badge */}
                <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-linear-to-r from-red-600 to-orange-500 mb-6">
                  <TrendingUp className="w-5 h-5 text-white" />
                  <span className="text-sm font-bold text-white">Analytics</span>
                </div>

                <h2 className="text-3xl font-bold text-gray-900 mb-6 group-hover:text-red-600 transition-colors">
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
                      <CheckCircle className="w-6 h-6 text-red-600 shrink-0 mt-0.5" />
                      <span className="text-lg leading-relaxed">{text}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </motion.div>

            {/* Why Sponsor Card */}
            <motion.div
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              whileHover={{ y: -8 }}
              transition={{ 
                type: 'spring', 
                stiffness: 200,
                delay: 0.1
              }}
              viewport={{ once: true }}
              className="group relative bg-white rounded-3xl shadow-xl hover:shadow-2xl transition-all duration-500 overflow-hidden cursor-pointer"
            >

              <div className="relative p-10">
                {/* Icon Badge */}
                <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-linear-to-r from-red-600 to-orange-500 mb-6">
                  <Trophy className="w-5 h-5 text-white" />
                  <span className="text-sm font-bold text-white">Benefits</span>
                </div>

                <h2 className="text-3xl font-bold text-gray-900 mb-6 group-hover:text-red-600 transition-colors">
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
                      <CheckCircle className="w-6 h-6 text-red-600 shrink-0 mt-0.5" />
                      <span className="text-lg leading-relaxed">{text}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </motion.div>
          </div>
        </motion.div>
      </section>

      {/* CTA Button */}
      <div className="text-center pb-20">
        <Link to="/contact">
          <motion.button
            whileHover={{ scale: 1.05, y: -2 }}
            whileTap={{ scale: 0.98 }}
            transition={{ type: "spring", stiffness: 300 }}
            className="inline-flex items-center justify-center gap-3 px-12 py-5 bg-linear-to-r from-red-600 to-orange-500 text-white font-bold text-lg rounded-xl shadow-xl hover:shadow-2xl hover:shadow-red-500/50 transition-all duration-300 cursor-pointer relative overflow-hidden group"
          >
            <span className="relative z-10">Join as a Sponsor</span>
            <ArrowRight className="w-6 h-6 relative z-10 transform group-hover:translate-x-1 transition-transform" />
            {/* Shimmer effect */}
            <div className="absolute inset-0 bg-white/20 -translate-x-full group-hover:translate-x-full transition-transform duration-700" />
          </motion.button>
        </Link>
      </div>
    </div>
  );
};

export default Sponsorship;