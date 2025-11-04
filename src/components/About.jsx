import React from 'react'
import { motion } from 'framer-motion'
import { Target, Users, Trophy, Star } from 'lucide-react'


const visionPoints = [
  { id: 'whyhakirush', title: 'Why HAKIRUSH?', content: 'Post-pandemic, employee morale and wellness have taken a hit. HAKIRUSH brings companies together through biweekly sports tournaments, team-building events, and fun rivalries — all managed end-to-end.', icon: Target },
  { id: 'difference', title: 'How We Make a Difference', content: 'We transform corporate culture by fostering healthy competition, building stronger teams, and creating memorable experiences that employees talk about long after the games are over.', icon: Users },
  { id: 'mission', title: 'Our Mission', content: "To be India's premier corporate sports engagement platform, helping companies boost employee morale, build team spirit, and create lasting professional relationships through the power of sports.", icon: Trophy },
  { id: 'choose', title: 'Why Choose HAKIRUSH', content: 'End-to-end event management, professional coverage, branded kits, transport included, monthly tournaments, and a dedicated leaderboard system that keeps the competitive spirit alive year-round.', icon: Star },
];

const About = () => {
  return (
    <section className="py-24 bg-gray-50 relative">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_#ff000010,_transparent_90%)] pointer-events-none" />
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8 }}
                viewport={{ once: true }}
                className="text-center mb-16"
              >
                <h2 className="text-5xl font-extrabold text-gray-900 mb-4">
                  Why Choose <span className="text-red-600">HAKIRUSH</span>?
                </h2>
                <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                  We're more than just a sports platform — we're your partner in building stronger, more engaged teams.
                </p>
              </motion.div>
    
              <div className="grid grid-cols-1 md:grid-cols-2 gap-10 relative cursor-pointer">
                {visionPoints.map((point, i) => {
                  const Icon = point.icon;
                  return (
                    <motion.div
                      key={point.id}
                      initial={{ opacity: 0, y: 40, rotateX: -10 }}
                      whileInView={{ opacity: 1, y: 0, rotateX: 0 }}
                      whileHover={{ scale: 1.05, rotateY: 10 }}
                      transition={{ type: 'spring', stiffness: 200 }}
                      viewport={{ once: true }}
                      className="relative bg-white border border-gray-200 p-8 rounded-2xl shadow-lg hover:shadow-red-400 transition-all"
                    >
                      <div className="flex items-center mb-4">
                        <div className="p-3 bg-red-100 rounded-lg mr-4">
                          <Icon className="h-6 w-6 text-red-600" />
                        </div>
                        <h3 className="text-2xl font-semibold text-gray-900">{point.title}</h3>
                      </div>
                      <p className="text-gray-700 leading-relaxed">{point.content}</p>
                    </motion.div>
                  );
                })}
            </div>
        </div>
    </section>
  )
}

export default About
