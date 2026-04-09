import React, { useEffect } from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { 
  Trophy, Users, Store, ShoppingBag, CheckCircle, 
  TrendingUp, ArrowRight, Handshake, Award, 
  Target, Zap, Activity, Flag, CircleDot, Dumbbell 
} from "lucide-react";

// --- REFINED PREMIUM BACKGROUND ---
const ContinuousSportsBackground = () => {
  const row1 = [Trophy, Activity, Target, CircleDot, Award, Dumbbell];
  const row2 = [Flag, Zap, Trophy, Handshake, Target, Users];

  return (
    <div className="absolute inset-0 overflow-hidden bg-white pointer-events-none z-0">
      {/* 1. Subtle Architectural Grid */}
      <div 
        className="absolute inset-0 opacity-[0.3]" 
        style={{ 
          backgroundImage: `linear-gradient(to right, #f1f5f9 1px, transparent 1px), linear-gradient(to bottom, #f1f5f9 1px, transparent 1px)`,
          backgroundSize: '80px 80px' 
        }} 
      />

      {/* 2. Ambient Light Glows */}
      <div className="absolute top-[-10%] left-[-10%] w-[60%] h-[60%] bg-red-50/60 blur-[120px] rounded-full" />
      <div className="absolute bottom-[-10%] right-[-10%] w-[50%] h-[50%] bg-slate-50/80 blur-[120px] rounded-full" />

      {/* 3. Row 1: Moving Left (Top) */}
      <div className="flex absolute top-[15%] opacity-[0.03]">
        <motion.div 
          animate={{ x: [0, -1500] }}
          transition={{ duration: 60, repeat: Infinity, ease: "linear" }}
          className="flex gap-40 whitespace-nowrap"
        >
          {[...row1, ...row1].map((Icon, i) => (
            <div key={i} className="flex items-center gap-40">
              <Icon size={100} strokeWidth={0.5} className="text-slate-950" />
              <span className="text-7xl font-black italic text-slate-950 uppercase tracking-tighter">Momentum</span>
            </div>
          ))}
        </motion.div>
      </div>

      {/* 4. Row 2: Moving Right (Mid) */}
      <div className="flex absolute top-[45%] opacity-[0.02]">
        <motion.div 
          animate={{ x: [-1500, 0] }}
          transition={{ duration: 80, repeat: Infinity, ease: "linear" }}
          className="flex gap-56 whitespace-nowrap"
        >
          {[...row2, ...row2].map((Icon, i) => (
            <div key={i} className="flex items-center gap-56">
              <span className="text-[9rem] font-black italic text-slate-950 uppercase tracking-tighter">Synergy</span>
              <Icon size={140} strokeWidth={0.5} className="text-slate-950" />
            </div>
          ))}
        </motion.div>
      </div>

      {/* Gradient Fade to White at Edges */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-white/80" />
    </div>
  );
};

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
    if (savedScroll) {
      setTimeout(() => {
        window.scrollTo(0, parseInt(savedScroll, 10));
        sessionStorage.removeItem('sponsorPageScroll');
      }, 100);
    }
  }, []);

  return (
    <div className="relative bg-white overflow-hidden min-h-screen">
      <ContinuousSportsBackground />

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        {/* Header Section */}
        <section id="tiers" className="py-24">
          <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-10 mb-20 border-b border-slate-100 pb-12">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="max-w-2xl"
            >
              <div className="inline-flex items-center gap-3 px-4 py-1.5 rounded-full bg-slate-50 border border-slate-200 mb-8">
                <Award className="w-3.5 h-3.5 text-[#C21807]" />
                <span className="text-[10px] font-black uppercase tracking-[0.4em] text-slate-500">Sponsorship Tiers</span>
              </div>
              <h2 className="text-3xl md:text-6xl font-black text-slate-950 tracking-[-0.05em] uppercase leading-[0.9] italic">
                Choose Your <br />
                <span className="text-[#C21807] not-italic">Partnership Level.</span>
              </h2>
              <p className="mt-4 text-slate-500 font-medium text-lg lg:text-xl max-w-sm leading-relaxed italic">
                Scale your brand exposure with elite association in fitness and team culture.
              </p>
            </motion.div>
          </div>

          {/* Tier Cards */}
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {sponsorTiers.map((tier, i) => {
              const IconComponent = tier.icon;
              return (
                <MotionLink 
                  to={tier.href}
                  key={i}
                  initial={{ opacity: 0, y: 40 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.1, duration: 0.8 }}
                  viewport={{ once: true }}
                  className="group relative bg-white/40 backdrop-blur-xl rounded-[2.5rem] p-10 border border-slate-100 transition-all duration-700 hover:shadow-[0_80px_100px_-50px_rgba(0,0,0,0.12)] hover:border-red-200 group flex flex-col h-full"
                >
                  <div className={`w-16 h-16 rounded-2xl bg-gradient-to-br ${tier.gradient} flex items-center justify-center shadow-xl mb-10 transform transition-transform duration-500 group-hover:scale-110`}>
                    <IconComponent className="w-7 h-7 text-white" />
                  </div>
                  
                  <h3 className="text-2xl font-black text-slate-950 uppercase italic tracking-tighter mb-4 group-hover:text-[#C21807] transition-colors">
                    {tier.title}
                  </h3>
                  <p className="text-slate-600 leading-relaxed font-medium mb-10 flex-grow">{tier.desc}</p>
                  
                  <div className="flex items-center gap-4 pt-6 border-t border-slate-100 group-hover:border-red-100 transition-colors">
                    <span className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-900">Learn More</span>
                    <div className="w-10 h-10 rounded-full border border-slate-200 flex items-center justify-center group-hover:bg-[#C21807] group-hover:text-white transition-all duration-500">
                      <ArrowRight size={18} />
                    </div>
                  </div>
                </MotionLink>
              );
            })}
          </div>
        </section>

        {/* Analytics Section */}
        <section className="py-24 border-t border-slate-100">
          <div className="grid lg:grid-cols-2 gap-10">
            {/* Analytics Card */}
            <motion.div
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="bg-slate-950 rounded-[3rem] p-12 md:p-16 text-white relative overflow-hidden group shadow-2xl shadow-red-900/20"
            >
              <div className="relative z-10">
                <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-red-600 mb-8">
                  <TrendingUp className="w-4 h-4" />
                  <span className="text-[10px] font-black uppercase tracking-widest">Analytics</span>
                </div>
                <h3 className="text-4xl font-black uppercase italic tracking-tighter mb-10">Sponsor Dashboard</h3>
                <ul className="space-y-6">
                  {["Real-time analytics of reach & impressions", "Brand exposure tracking", "Highlight reels showcasing sponsor placements", "Dedicated logo placement in media posts"].map((text, i) => (
                    <li key={i} className="flex items-start gap-4">
                      <CheckCircle className="w-6 h-6 text-red-600 shrink-0 mt-0.5" />
                      <span className="text-lg text-slate-300 font-medium">{text}</span>
                    </li>
                  ))}
                </ul>
              </div>
              <div className="absolute top-[-20%] right-[-10%] w-96 h-96 bg-red-600/10 blur-[120px] rounded-full group-hover:bg-red-600/20 transition-all duration-700" />
            </motion.div>

            {/* Why Sponsor Card */}
            <motion.div
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              viewport={{ once: true }}
              className="bg-white border border-slate-200 rounded-[3rem] p-12 md:p-16 relative overflow-hidden group shadow-xl hover:shadow-red-500/10 transition-all duration-700 hover:border-red-100"
            >
              <div className="relative z-10">
                <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-slate-100 text-[#C21807] mb-8">
                  <Trophy className="w-4 h-4" />
                  <span className="text-[10px] font-black uppercase tracking-widest">Benefits</span>
                </div>
                <h3 className="text-4xl font-black text-slate-950 uppercase italic tracking-tighter mb-10">Why Sponsor HAKIRUSH?</h3>
                <ul className="space-y-6">
                  {["Access 1000+ professionals per tournament", "Multi-city exposure", "Social media amplification", "Premium association with fitness & team culture"].map((text, i) => (
                    <li key={i} className="flex items-start gap-4">
                      <CheckCircle className="w-6 h-6 text-red-600 shrink-0 mt-0.5" />
                      <span className="text-lg text-slate-600 font-medium">{text}</span>
                    </li>
                  ))}
                </ul>
              </div>
              <div className="absolute top-[-20%] right-[-10%] w-96 h-96 bg-slate-50 blur-[100px] rounded-full group-hover:bg-red-50 transition-all duration-700" />
            </motion.div>
          </div>
        </section>
      </div>
    </div>
  );
};

export default Sponsorship;