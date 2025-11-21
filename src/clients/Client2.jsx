import React from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, Users, Calendar, Trophy, Target, CheckCircle, Quote } from 'lucide-react';
import { motion } from 'framer-motion';

const Client2 = () => {
  const navigate = useNavigate();
  return (
    <div className='bg-gray-50 min-h-screen'>
      <div className='bg-white min-h-screen'>
        {/* Back Button */}
        <div className="max-w-6xl mx-auto px-4 sm:px-6 pt-12 pb-3 md:pt-10 md:pb-6">
          <motion.button
            onClick={() => navigate(-1)}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
            whileHover={{ x: -5 }}
            className="inline-flex items-center gap-1.5 sm:gap-2 px-3 py-2 sm:px-4 sm:py-2.5 rounded-lg bg-white border border-[#C21807]/30 shadow-sm hover:shadow-md text-[#C21807] hover:bg-[#C21807]/5 text-xs sm:text-sm md:text-base font-semibold transition-all cursor-pointer"
          >
            <ArrowLeft className="w-3.5 h-3.5 sm:w-4 sm:h-4 md:w-5 md:h-5 shrink-0" />
            <span className="whitespace-nowrap">Back to Clients</span>
          </motion.button>
        </div>
        {/* ...existing code... */}
      </div>
    </div>
  );
};

export default Client2;
    