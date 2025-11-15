import React from 'react'
// eslint-disable-next-line no-unused-vars
import { motion } from 'framer-motion'
import { MoveRightIcon, Calendar, Trophy, Star } from 'lucide-react'
import { Link } from 'react-router-dom'

const plans = [
  {
    id: 1,
    href: '/package/annualpackage',
    title: "Annual Subscription Plan",
    description:
      "One new sports or fitness event every month. Designed for 30–50 employees. We handle everything — venue, kits, transport, referees, and content.",
    button: 'Register Now',
    icon: Calendar,
  },
  {
    id: 2,
    href: '/package/quarterly',
    title: "Quarterly Tournament Plan",
    description:
      "High-energy inter-company tournaments every three months. Includes sponsorships, brand activations, and highlight coverage.",
    button: 'Register Now',
    icon: Trophy,
  },
]

const Ourplans = () => {
  return (
    <section className="relative py-12 bg-white overflow-hidden">
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">

        {/* Enhanced Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          {/* Badge */}
          <div className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-gradient-to-r from-[#C21807]/10 to-[#A01506]/10 border border-[#C21807]/30 mb-6 shadow-lg backdrop-blur-sm">
            <Star className="w-4 h-4 text-[#C21807]" />
            <span className="text-sm font-bold text-[#C21807]">Our Plans</span>
          </div>

          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-gray-900 mb-6 leading-tight tracking-tight">
            Choose Your{' '}
            <span className="bg-gradient-to-r from-[#C21807] via-[#A01506] to-[#C21807] bg-clip-text text-transparent drop-shadow-sm">
              Perfect Plan
            </span>
          </h2>
          <p className="text-base sm:text-lg text-gray-600 max-w-3xl mx-auto leading-relaxed font-medium">
            Select a plan that aligns with your{" "}
            <span className="font-bold text-[#C21807]">
              company's engagement goals
            </span>
            {" "}and let our experts handle everything else
          </p>
        </motion.div>

        {/* Enhanced Plans Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-10 relative">
          {plans.map((plan, index) => {
            const Icon = plan.icon
            return (
              <motion.div
                key={plan.id}
                initial={{ opacity: 0, y: 40, rotateX: -10 }}
                whileInView={{ opacity: 1, y: 0, rotateX: 0 }}
                transition={{ 
                  type: 'spring', 
                  stiffness: 200,
                  delay: index * 0.1 
                }}
                viewport={{ once: true }}
                whileHover={{ 
                  scale: window.innerWidth >= 768 ? 1.03 : 1,
                  y: window.innerWidth >= 768 ? -8 : 0
                }}
                className="group relative bg-white rounded-3xl shadow-xl hover:shadow-[0_12px_35px_rgba(248,113,113,0.45)] transition-all duration-500 overflow-hidden border-2 border-gray-100 hover:border-[#C21807]/20"
              >
                
                <div className="relative p-8 sm:p-10">
                  {/* Icon and Title in Row */}
                  <div className="flex items-center gap-4 mb-6">
                    <div className="relative inline-block shrink-0">
                      <div className="absolute inset-0 bg-[#C21807] rounded-2xl blur-xl opacity-50 group-hover:opacity-70 transition-opacity duration-500" />
                      <div className="relative p-4 bg-[#C21807] rounded-2xl shadow-lg">
                        <Icon className="h-8 w-8 text-white" />
                      </div>
                    </div>

                    {/* Title */}
                    <h3 className="text-lg sm:text-xl font-bold text-gray-900">
                      <span className="bg-gradient-to-r from-[#C21807] via-[#A01506] to-[#C21807] bg-clip-text text-transparent">
                        {plan.title}
                      </span>
                    </h3>
                  </div>

                  {/* Description */}
                  <p className="text-gray-700 text-base sm:text-lg leading-relaxed mb-8 font-medium">
                    {plan.description}
                  </p>

                  {/* Enhanced CTA Button */}
                  <Link to={plan.href}>
                    <motion.button
                      whileHover={{ scale: 1.05, y: -2 }}
                      whileTap={{ scale: 0.98 }}
                      transition={{ type: "spring", stiffness: 300 }}
                      className="inline-flex items-center gap-2 px-8 py-3 rounded-lg bg-[#C21807] text-white font-bold text-lg shadow-xl hover:shadow-2xl hover:shadow-[#C21807]/50 transition-all duration-300 cursor-pointer relative overflow-hidden group focus:outline-none focus-visible:ring-4 focus-visible:ring-[#C21807]/30"
                    >
                      <span className="relative z-10">{plan.button}</span>
                      <MoveRightIcon className="h-5 w-5 relative z-10 transform transition-transform duration-300 group-hover:translate-x-1" />
                      {/* Shimmer effect */}
                      <div className="absolute inset-0 bg-white/20 -translate-x-full group-hover:translate-x-full transition-transform duration-700" />
                    </motion.button>
                  </Link>
                </div>
              </motion.div>
            )
          })}
        </div>
      </div>
    </section>
  )
}

export default Ourplans
