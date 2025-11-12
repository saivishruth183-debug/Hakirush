import { useState } from "react";
import { motion } from "framer-motion";

const SPONSORS = [
  {
    key: "merch",
    icon: "👕",
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

  return (
    <div className="relative overflow-hidden bg-white">
      {/* Background Glow (global) */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "radial-gradient(circle at center, rgba(255,0,0,0.06), transparent 60%), radial-gradient(circle at bottom right, rgba(255,102,0,0.05), transparent 80%), radial-gradient(circle at top left, rgba(255,255,255,0.05), transparent 90%)",
        }}
      />

      {/* Content */}
      <div className="relative z-10">
        <section className="max-w-6xl mx-auto px-6 py-16">
          {/* Header */}
          <div className="text-center mb-14">
            <h1 className="text-4xl md:text-5xl font-extrabold text-slate-900 mb-3">
              {s.icon} {s.title}{" "}
              <span className="text-[#C21807] drop-shadow-sm">Sponsor</span>
            </h1>
            <p className="mt-4 text-gray-600 font-semibold max-w-4xl mx-auto text-lg leading-relaxed">
              {s.details.overview}
            </p>
          </div>

          {/* Two-column content */}
          <div className="grid md:grid-cols-2 gap-8">
            {/* What you get */}
            <motion.div 
              whileHover={{ y: -8 }}
              className="bg-white rounded-xl shadow-lg border border-gray-100 hover:shadow-red-400 p-8 transition hover:shadow-xl cursor-pointer">
              <h3 className="text-xl font-bold text-[#C21807] text-center mb-6">
                What You Get
              </h3>

              <ul className="space-y-3">
                {s.details.whatYouGet.map((item, idx) => (
                  <li
                    key={idx}
                    className="text-gray-700 text-sm leading-relaxed flex gap-2"
                  >
                    <span className="text-red-600 font-bold text-lg">•</span>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </motion.div>

            {/* Why it matters */}
            <motion.div 
              whileHover={{ y: -8 }}
              className="bg-white rounded-xl shadow-lg border border-gray-100 hover:shadow-red-400 p-8 transition hover:shadow-xl cursor-pointer">
              <h3 className="text-xl font-bold text-[#C21807] text-center mb-6">
                Why It Matters
              </h3>

              <ul className="space-y-3">
                {s.details.why.map((item, idx) => (
                  <li
                    key={idx}
                    className="text-gray-700 text-sm leading-relaxed flex gap-2"
                  >
                    <span className="text-red-600 font-bold text-lg">•</span>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>

              {/* CTA on mobile */}
              <div className="mt-6 md:hidden">
                <a
                  href="#contact"
                  className="inline-block px-5 py-2 rounded-md bg-red-600 text-white font-semibold hover:bg-red-700 shadow-sm"
                >
                  {s.details.ctaText}
                </a>
              </div>
            </motion.div>
          </div>

          {/* Desktop CTA */}
          <div className="mt-10 hidden md:flex justify-center">
            <a
              href="#contact"
              className="px-6 py-3 rounded-md bg-red-600 text-white font-semibold hover:bg-red-700 shadow-md"
            >
              {s.details.ctaText}
            </a>
          </div>
        </section>
      </div>
    </div>
  );
}
