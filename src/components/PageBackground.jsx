import React from 'react';
import { motion } from 'framer-motion';
import { 
  Trophy, Activity, Target, CircleDot, Star, Dumbbell, Flag, Zap 
} from 'lucide-react';

/**
 * Unified PageBackground Component
 * Used consistently across all pages for a cohesive look
 */
const PageBackground = () => {
  const row1 = [Trophy, Activity, Target, CircleDot, Star, Dumbbell];
  const row2 = [Flag, Zap, Trophy, Activity, Target, Star];

  return (
    <div className="fixed inset-0 overflow-hidden pointer-events-none -z-20">
      {/* Blurred gradient backgrounds */}
      <div className="absolute top-[-10%] left-[-10%] w-[60%] h-[60%] bg-red-100/60 blur-[120px] rounded-full" />
      <div className="absolute bottom-[-10%] right-[-10%] w-[50%] h-[50%] bg-red-50/80 blur-[120px] rounded-full" />

      {/* First animated row of icons */}
      <div className="flex absolute top-[10%] opacity-[0.04] w-full overflow-hidden">
        <motion.div 
          initial={{ x: 0 }}
          animate={{ x: "-100%" }}
          transition={{ duration: 40, repeat: Infinity, ease: "linear" }}
          className="flex gap-24 pr-24 whitespace-nowrap flex-nowrap"
        >
          {row1.map((Icon, i) => (
            <Icon key={i} size={70} className="text-red-900" strokeWidth={1} />
          ))}
          {row1.map((Icon, i) => (
            <Icon key={`dup-${i}`} size={70} className="text-red-900" strokeWidth={1} />
          ))}
        </motion.div>
      </div>

      {/* Second animated row of icons */}
      <div className="flex absolute top-[40%] opacity-[0.03] w-full overflow-hidden">
        <motion.div 
          initial={{ x: "-100%" }}
          animate={{ x: 0 }}
          transition={{ duration: 50, repeat: Infinity, ease: "linear" }}
          className="flex gap-32 pr-32 whitespace-nowrap flex-nowrap"
        >
          {row2.map((Icon, i) => (
            <Icon key={i} size={100} className="text-red-900" strokeWidth={0.5} />
          ))}
          {row2.map((Icon, i) => (
            <Icon key={`dup-${i}`} size={100} className="text-red-900" strokeWidth={0.5} />
          ))}
        </motion.div>
      </div>

      {/* Third animated row of icons */}
      <div className="flex absolute top-[70%] opacity-[0.04] w-full overflow-hidden">
        <motion.div 
          initial={{ x: 0 }}
          animate={{ x: "-100%" }}
          transition={{ duration: 35, repeat: Infinity, ease: "linear" }}
          className="flex gap-20 pr-20 whitespace-nowrap flex-nowrap"
        >
          {row1.map((Icon, i) => (
            <Icon key={i} size={80} className="text-red-900" strokeWidth={0.8} />
          ))}
          {row1.map((Icon, i) => (
            <Icon key={`dup-${i}`} size={80} className="text-red-900" strokeWidth={0.8} />
          ))}
        </motion.div>
      </div>

      {/* Subtle vignette overlay */}
      <div 
        className="absolute inset-0 pointer-events-none" 
        style={{
          background: "radial-gradient(circle at center, transparent 0%, rgba(255,255,255,0.1) 60%, rgba(255,255,255,0.3) 100%)"
        }} 
      />
    </div>
  );
};

export default PageBackground;
