import React from 'react'
import { motion } from 'framer-motion'
import { 
  MoveRightIcon, Calendar, Trophy, Star, 
  Dumbbell, Circle as Basketball,
  Bike, Volleyball, Footprints, 
  Timer, Award, Swords, Goal
} from 'lucide-react'
import { Link } from 'react-router-dom'

const PremiumSportsBackground = () => {
  const row1 = [Basketball, Bike, Dumbbell, Goal, Timer, Trophy, Award];
  const row2 = [Volleyball, Footprints, Swords, Timer, Basketball, Bike, Trophy];

  return (
    <div className="absolute inset-0 overflow-hidden bg-white pointer-events-none">
      {/* 1. Subtle Architectural Grid */}
      <div 
        className="absolute inset-0 opacity-[0.3]" 
        style={{ 
          backgroundImage: `linear-gradient(to right, #f1f5f9 1px, transparent 1px), linear-gradient(to bottom, #f1f5f9 1px, transparent 1px)`,
          backgroundSize: '80px 80px' 
        }} 
      />

      {/* 2. Top Row: Right to Left (Fast & Subtle) */}
      <div className="absolute top-[15%] left-0 w-full opacity-[0.04]">
        <motion.div 
          animate={{ x: [0, -1500] }}
          transition={{ duration: 50, repeat: Infinity, ease: "linear" }}
          className="flex gap-40 whitespace-nowrap"
        >
          {[...row1, ...row1, ...row1].map((Icon, i) => (
            <div key={i} className="flex items-center gap-40">
              <Icon size={120} strokeWidth={0.5} className="text-slate-950" />
              <span className="text-8xl font-black italic text-slate-950 uppercase tracking-tighter">Perfect Plan</span>
            </div>
          ))}
        </motion.div>
      </div>

      {/* 3. Bottom Row: Left to Right (Slow & Larger) */}
      <div className="absolute bottom-[10%] left-0 w-full opacity-[0.03]">
        <motion.div 
          animate={{ x: [-1500, 0] }}
          transition={{ duration: 70, repeat: Infinity, ease: "linear" }}
          className="flex gap-56 whitespace-nowrap"
        >
          {[...row2, ...row2, ...row2].map((Icon, i) => (
            <div key={i} className="flex items-center gap-56">
              <span className="text-[10rem] font-black italic text-slate-950 uppercase tracking-tighter">Choose One</span>
              <Icon size={180} strokeWidth={0.5} className="text-slate-950" />
            </div>
          ))}
        </motion.div>
      </div>

      {/* 4. Soft Ambient Glows to blend the white */}
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-red-50/50 blur-[120px] rounded-full" />
      <div className="absolute bottom-0 left-0 w-[600px] h-[600px] bg-slate-50/80 blur-[100px] rounded-full" />
    </div>
  )
}

const plans = [
  {
    id: 1,
    href: '/services/annualpackage',
    title: "Annual Plan",
    subtitle: "Full Season Strategic Deployment",
    description: "One new sports or fitness event every month. Designed for 30–50 employees. We handle everything — venue, kits, transport, referees, and content.",
    features: ["Pro Coaching", "Analytics Dashboard", "Custom Kits"],
    icon: Calendar,
    accent: "bg-red-600"
  },
  {
    id: 2,
    href: '/services/quarterly',
    title: "Quarterly Plan",
    subtitle: "High-Production Tournament Series",
    description: "High-energy inter-company tournaments every three months. Includes sponsorships, brand activations, and highlight coverage.",
    features: ["Broadcast Media", "MVP Gala", "Sponsorships"],
    icon: Trophy,
    accent: "bg-slate-950"
  },
]

const OurPlans = () => {
  return (
    <section className="relative py-32 min-h-screen flex items-center justify-center bg-white">
      <PremiumSportsBackground />

      <div className="max-w-7xl mx-auto px-6 relative z-10 w-full">
        {/* Editorial Header */}
        <div className="mb-24 flex flex-col md:flex-row md:items-end justify-between border-b border-slate-100 pb-12">
          <div>
            <motion.p 
              initial={{ opacity: 0, x: -10 }}
              whileInView={{ opacity: 1, x: 0 }}
              className="text-red-600 font-black text-xs uppercase tracking-[0.4em] mb-4"
            >
              Membership Levels
            </motion.p>
            <h2 className="text-3xl md:text-7xl font-black text-slate-950 tracking-[-0.05em] uppercase leading-[0.8] italic">
              Choose Your
              <span className="text-red-600 not-italic"> Plan.</span>
            </h2>
            <p className="mt-8 md:mt-4 text-slate-500 font-medium text-lg max-w-lg leading-relaxed">
              Select a plan that aligns with your company's engagement goals and let our experts handle everything else
            </p>
          </div>
        </div>

        {/* The Dual Plan Cards */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
          {plans.map((plan, index) => (
            <motion.div
              key={plan.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.15, duration: 0.8 }}
              className="group relative"
            >
              {/* Card Body */}
              <div className="relative h-full bg-white/60 backdrop-blur-xl border border-slate-200 rounded-[3rem] p-12 overflow-hidden hover:shadow-[0_80px_100px_-50px_rgba(0,0,0,0.15)] transition-all duration-700 hover:border-red-200">
                
                <div className="relative z-10">
                  <div className={`inline-flex p-4 rounded-2xl ${plan.accent} text-white shadow-xl mb-12 group-hover:scale-110 transition-transform duration-500`}>
                    <plan.icon size={28} />
                  </div>

                  <h3 className="text-5xl font-black text-slate-950 uppercase italic tracking-tighter mb-4">
                    {plan.title}
                  </h3>
                  <p className="text-red-600 font-bold text-[10px] uppercase tracking-[0.3em] mb-10">{plan.subtitle}</p>
                  
                  <p className="text-slate-600 text-md font-normal mb-12 leading-relaxed border-l-2 border-slate-100 pl-6 group-hover:border-red-600 transition-colors">
                    {plan.description}
                  </p>

                  <div className="flex flex-wrap gap-6 mb-16">
                    {plan.features.map((f, i) => (
                      <div key={i} className="flex items-center gap-2">
                        <div className="w-1.5 h-1.5 rounded-full bg-red-600" />
                        <span className="text-[10px] font-black uppercase text-slate-800 tracking-wider">{f}</span>
                      </div>
                    ))}
                  </div>

                  <Link to={plan.href} className="flex items-center justify-between group/link">
                    <span className="text-xs font-black uppercase tracking-[0.3em] text-slate-950 group-hover/link:text-red-600 transition-colors">Learn More</span>
                    <div className="w-16 h-16 rounded-full bg-slate-950 text-white flex items-center justify-center group-hover/link:bg-red-600 group-hover/link:scale-110 transition-all duration-500 shadow-xl">
                      <MoveRightIcon size={24} />
                    </div>
                  </Link>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default OurPlans;