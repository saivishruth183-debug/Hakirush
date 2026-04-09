import React from 'react'
import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { 
  Star, CalendarDays, Trophy, ArrowRight, Zap, Target, 
  Activity, CircleDot, Dumbbell, Flag 
} from 'lucide-react'

// --- BACKGROUND SUB-COMPONENT ---
const ContinuousSportsBackground = () => {
  const row1 = [Trophy, Activity, Target, CircleDot, Star, Dumbbell];
  const row2 = [Flag, Zap, Trophy, Activity, Target, Star];

  return (
    <div className="fixed inset-0 overflow-hidden bg-white pointer-events-none z-0">
      <div className="absolute top-[-10%] left-[-10%] w-[60%] h-[60%] bg-red-100/60 blur-[120px] rounded-full" />
      <div className="absolute bottom-[-10%] right-[-10%] w-[50%] h-[50%] bg-red-50/80 blur-[120px] rounded-full" />

      <div className="flex absolute top-[10%] opacity-[0.04]">
        <motion.div 
          initial={{ x: 0 }}
          animate={{ x: "-100%" }}
          transition={{ duration: 40, repeat: Infinity, ease: "linear" }}
          className="flex gap-24 pr-24 whitespace-nowrap"
        >
          {row1.map((Icon, i) => <Icon key={i} size={70} className="text-red-900" strokeWidth={1} />)}
          {row1.map((Icon, i) => <Icon key={`dup-${i}`} size={70} className="text-red-900" strokeWidth={1} />)}
        </motion.div>
      </div>

      <div className="flex absolute top-[40%] opacity-[0.03]">
        <motion.div 
          initial={{ x: "-100%" }}
          animate={{ x: 0 }}
          transition={{ duration: 50, repeat: Infinity, ease: "linear" }}
          className="flex gap-32 pr-32 whitespace-nowrap"
        >
          {row2.map((Icon, i) => <Icon key={i} size={100} className="text-red-900" strokeWidth={0.5} />)}
          {row2.map((Icon, i) => <Icon key={`dup-${i}`} size={100} className="text-red-900" strokeWidth={0.5} />)}
        </motion.div>
      </div>

      <div className="flex absolute top-[70%] opacity-[0.04]">
        <motion.div 
          initial={{ x: 0 }}
          animate={{ x: "-100%" }}
          transition={{ duration: 35, repeat: Infinity, ease: "linear" }}
          className="flex gap-20 pr-20 whitespace-nowrap"
        >
          {row1.map((Icon, i) => <Icon key={i} size={80} className="text-red-900" strokeWidth={0.8} />)}
          {row1.map((Icon, i) => <Icon key={`dup-${i}`} size={80} className="text-red-900" strokeWidth={0.8} />)}
        </motion.div>
      </div>

      <div className="absolute inset-0 pointer-events-none" style={{
        background: "radial-gradient(circle at center, transparent 0%, rgba(255,255,255,0.2) 60%, rgba(255,255,255,0.7) 100%)"
      }} />
    </div>
  )
}

const Package = () => {
  return (
    <div className="relative bg-white overflow-hidden py-24 min-h-screen">
      
      {/* 1. Insert the Continuous Background */}
      <ContinuousSportsBackground />

      {/* 2. Your Existing Premium Background Elements */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full pointer-events-none">
        <div className="absolute top-[-10%] right-[-10%] w-[500px] h-[500px] bg-red-50 rounded-full blur-[120px] opacity-60" />
        <div className="absolute bottom-[-10%] left-[-10%] w-[500px] h-[500px] bg-orange-50 rounded-full blur-[120px] opacity-60" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-6">
        
        {/* Header Section */}
        <div className="text-center mb-20">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-slate-50 border border-slate-200 mb-6"
          >
            <Star className="w-4 h-4 text-red-600" fill="currentColor" />
            <span className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-500">Premium Tiers</span>
          </motion.div>
          
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-4xl md:text-6xl font-black text-slate-900 tracking-tight mb-6"
          >
            Choose Your <span className="text-[#C21807]">Perfect Package</span>
          </motion.h1>
          
          <motion.p 
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="text-slate-500 max-w-2xl mx-auto text-lg font-medium"
          >
            Elevate your company culture through high-energy corporate tournaments and 
            exclusive sporting experiences.
          </motion.p>
        </div>

        {/* Card Grid */}
        <div className="flex flex-col lg:flex-row gap-8 items-stretch justify-center">
          
          {/* Annual Subscription Card */}
          <Link to="/services/annualpackage" className="w-full lg:w-1/2 group">
            <motion.div 
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="relative h-full transition-transform duration-500 group-hover:-translate-y-2"
            >
              <div className="absolute -top-4 right-8 z-20">
                <div className="bg-slate-900 text-white text-[10px] font-black px-4 py-2 rounded-full tracking-widest uppercase flex items-center gap-2 shadow-2xl">
                  <Zap className="w-3 h-3 text-yellow-400 fill-yellow-400" />
                  Most Preferred
                </div>
              </div>

              <div className="relative h-full overflow-hidden rounded-[3rem] bg-slate-900 p-1">
                <div className="absolute inset-0 bg-gradient-to-br from-red-500 via-transparent to-orange-500 opacity-40" />
                <div className="relative h-full bg-slate-900 rounded-[2.8rem] p-10 md:p-16 flex flex-col items-center text-center overflow-hidden">
                  <div className="absolute top-0 right-0 w-64 h-64 bg-red-600/20 blur-[80px] -mr-32 -mt-32 transition-transform duration-700 group-hover:scale-150" />
                  <div className="relative z-10">
                    <div className="w-20 h-20 bg-red-600 rounded-3xl flex items-center justify-center mb-8 mx-auto transition-transform duration-500 shadow-[0_20px_40px_rgba(220,38,38,0.3)]">
                      <CalendarDays className="w-10 h-10 text-white" />
                    </div>
                    <h3 className="text-3xl md:text-4xl font-black text-white mb-4">Annual Subscription</h3>
                    <p className="text-slate-400 font-medium mb-10 max-w-sm mx-auto leading-relaxed">
                      12 months of unlimited sports events, premium networking, and team building activities.
                    </p>
                    <div className="inline-flex items-center gap-3 bg-white text-slate-900 px-8 py-4 rounded-2xl font-bold transition-all duration-300 group-hover:bg-red-600 group-hover:text-white shadow-xl">
                      Explore Details
                      <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          </Link>

          {/* Quarterly Card */}
          <Link to="/services/quarterly" className="w-full lg:w-1/2 group">
            <motion.div 
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="relative h-full transition-transform duration-500 group-hover:-translate-y-2"
            >
              <div className="relative h-full overflow-hidden rounded-[3rem] bg-white border border-slate-200 shadow-[0_30px_60px_-15px_rgba(0,0,0,0.05)]">
                <div className="relative h-full p-10 md:p-16 flex flex-col items-center text-center">
                  <div className="absolute top-0 left-0 w-32 h-32 bg-slate-50 rounded-br-full -ml-8 -mt-8 border border-slate-100" />
                  <div className="relative z-10">
                    <div className="w-20 h-20 bg-slate-50 border border-slate-100 rounded-3xl flex items-center justify-center mb-8 mx-auto transition-transform duration-500">
                      <Trophy className="w-10 h-10 text-red-600" />
                    </div>
                    <h3 className="text-3xl md:text-4xl font-black text-slate-900 mb-4">Quarterly League</h3>
                    <p className="text-slate-500 font-medium mb-10 max-w-sm mx-auto leading-relaxed">
                      High-energy competitive events every 3 months. Perfect for testing your team's spirit.
                    </p>
                    <div className="inline-flex items-center gap-3 border-2 border-slate-900 text-slate-900 px-8 py-4 rounded-2xl font-bold transition-all duration-300 group-hover:bg-slate-900 group-hover:text-white group-hover:shadow-xl">
                      Explore Details
                      <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          </Link>
        </div>
      </div>
    </div>
  )
}

export default Package