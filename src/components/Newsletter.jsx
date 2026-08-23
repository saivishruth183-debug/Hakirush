import React from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { Zap, Trophy, Activity, Target, ArrowRight, BadgeCheck } from "lucide-react";

const solutions = [
  {
    title: 'Annual Employee Engagement',
    description: 'A year-long engagement journey aligning monthly experiences with culture, recognition and wellness.',
    benefits: ['Monthly experiences', 'Custom branding', 'Leadership reporting'],
    href: '/services/annualpackage',
    icon: Trophy,
  },
  {
    title: 'Quarterly Corporate Championships',
    description: 'High-profile tournaments built for organisational visibility, participation and team pride.',
    benefits: ['Inter-company formats', 'Curation & production', 'Premium event activations'],
    href: '/services/quarterly',
    icon: Activity,
  },
  {
    title: 'Custom Corporate Experiences',
    description: 'Tailored initiatives for onboarding, wellness weeks, leadership retreats and culture-building moments.',
    benefits: ['Flexible programming', 'Dedicated strategy', 'Elevated execution'],
    href: '/contact',
    icon: Target,
  },
];

const CTASection = () => {
  return (
    <section className="relative py-24 bg-transparent overflow-hidden font-sans">

      {/* AMBIENT GLOW */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[400px] bg-red-100/30 blur-[120px] rounded-full z-0" />

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          viewport={{ once: true }}
          className="relative group"
        >

          {/* ── Dark: Solutions panel ── */}
          <div className="mt-5 rounded-[32px] border border-white/10 bg-[#171717] p-8 sm:p-10 lg:p-12">
            <div className="mb-10 flex flex-col gap-3 lg:flex-row lg:items-end lg:justify-between">
              <div className="max-w-2xl">
                <div className="mb-3 text-[11px] font-semibold uppercase tracking-[0.35em] text-[#E50914]">
                  Our Solutions
                </div>
                <h3 className="text-3xl sm:text-4xl font-bold text-white tracking-tight">
                  Three Premium Ways to Elevate Your Workplace
                </h3>
              </div>
              <p className="max-w-xl text-sm leading-7 text-[#A8A8A8]">
                Every solution is built to feel premium, polished and relevant for HR leaders, founders and corporate teams.
              </p>
            </div>

            <div className="grid gap-6 lg:grid-cols-3">
              {solutions.map((solution, index) => (
                <motion.article
                  key={solution.title}
                  initial={{ opacity: 0, y: 24 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.08 }}
                  whileHover={{ y: -8, scale: 1.01 }}
                  className="group/card relative rounded-[24px] border border-white/10 bg-[#0D0D0D] p-7 transition-colors duration-500 hover:border-[#E50914]/40"
                >
                  {/* corner glow on hover */}
                  <div className="pointer-events-none absolute -right-8 -top-8 h-32 w-32 rounded-full bg-[#E50914]/0 blur-2xl transition-all duration-500 group-hover/card:bg-[#E50914]/20" />

                  <div className="relative z-10 mb-5 flex items-center justify-between">
                    <div className="inline-flex rounded-full bg-[#E50914]/12 px-3 py-1 text-[10px] font-semibold uppercase tracking-[0.3em] text-[#E50914]">
                      Solution {index + 1}
                    </div>
                    <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#E50914]/10 border border-[#E50914]/25 transition-transform duration-500 group-hover/card:-translate-y-0.5">
                      <solution.icon size={18} className="text-[#E50914]" strokeWidth={1.75} />
                    </div>
                  </div>

                  <h4 className="relative z-10 text-2xl font-semibold text-white leading-tight">
                    {solution.title}
                  </h4>
                  <p className="relative z-10 mt-3 text-sm leading-7 text-[#A8A8A8]">
                    {solution.description}
                  </p>

                  <ul className="relative z-10 mt-6 space-y-3 text-sm text-white">
                    {solution.benefits.map((benefit) => (
                      <li key={benefit} className="flex items-center gap-2">
                        <BadgeCheck size={16} className="text-[#E50914] shrink-0" />
                        {benefit}
                      </li>
                    ))}
                  </ul>

                  <Link
                    to={solution.href}
                    className="relative z-10 mt-8 inline-flex items-center gap-2 font-semibold text-[#E50914] transition-all duration-300 hover:gap-3"
                  >
                    Learn More
                    <ArrowRight size={16} />
                  </Link>
                </motion.article>
              ))}
            </div>
          </div>

          {/* ── Dark: CTA finale ── */}
          <div className="mt-8 shadow-2xl shadow-red-900/30 relative rounded-[3.5rem] p-8 md:p-20 overflow-hidden transition-all duration-700 bg-gradient-to-br from-[#0D0D0D] via-[#171717] to-[#1a0808] border border-white/10">

            {/* decorative glows */}
            <div className="pointer-events-none absolute -top-24 -right-24 h-72 w-72 rounded-full bg-red-600/15 blur-[100px]" />
            <div className="pointer-events-none absolute -bottom-24 -left-24 h-72 w-72 rounded-full bg-red-600/10 blur-[100px]" />

            <div className="relative z-10 flex flex-col lg:flex-row items-center justify-between gap-12">

              {/* CONTENT LEFT */}
              <div className="text-center lg:text-left space-y-8 max-w-2xl">
                <motion.div
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  className="inline-flex items-center gap-3 px-5 py-2 rounded-full bg-red-600 text-white shadow-xl shadow-red-600/20"
                >
                  <Zap className="w-4 h-4 fill-current animate-pulse" />
                  <span className="text-xs font-black uppercase tracking-[0.2em]">Ready to Start?</span>
                </motion.div>

                <h2 className="text-4xl md:text-6xl font-black text-white leading-none italic uppercase [word-spacing:0.15em]">
                  Transform your <br className="hidden md:block" />
                  <span className="text-red-500">Workplace Culture</span>
                </h2>

                <p className="text-[#A8A8A8] text-lg md:text-xl font-medium max-w-lg mx-auto lg:mx-0 leading-relaxed">
                  Join <span className="text-white font-bold underline decoration-red-500 underline-offset-8 decoration-2">50+ top-tier firms</span> that trust <span className="text-white font-black italic tracking-widest uppercase">Hakirush</span>.
                </p>
              </div>

              {/* ACTION RIGHT */}
              <div className="flex flex-col items-center gap-6">
                <Link to="/contact" className="relative group/btn">
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.98 }}
                    className="relative px-12 py-6 bg-red-600 hover:bg-red-700 text-white rounded-2xl font-black text-xl uppercase tracking-tighter shadow-2xl shadow-red-600/40 transition-all duration-300 flex items-center gap-4 overflow-hidden cursor-pointer"
                  >
                    <span className="relative z-10">Free Consultation</span>
                    <ArrowRight className="w-6 h-6 relative z-10 transition-transform duration-300 group-hover/btn:translate-x-2" />
                    <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover/btn:translate-x-full transition-transform duration-500" />
                  </motion.button>
                </Link>

                <p className="text-[#666] text-xs font-bold uppercase tracking-[0.2em]">
                  Elevate your team spirit
                </p>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default CTASection;