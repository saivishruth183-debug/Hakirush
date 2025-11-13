import React from 'react'
import { motion } from 'framer-motion'
import { MoveRightIcon, Calendar, Trophy } from 'lucide-react'
import { Link } from 'react-router-dom'

const plans = [
  {
    id: 1,
    href: '/package/annualpackage',
    title: "Annual Subscription Plan",
    description:
      "One new sports or fitness event every month. Designed for 30–50 employees. We handle everything — venue, kits, transport, referees, and content.",
    button: 'Learn More',
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
    <section className="relative py-20 bg-white overflow-hidden">
      
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
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-linear-to-r from-red-50 to-orange-50 border border-red-100 mb-6">
            <div className="w-2 h-2 rounded-full bg-red-500 animate-pulse" />
            <span className="text-sm font-semibold text-red-600">Our Plans</span>
          </div>

          <h2 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-gray-900 mb-6">
            Choose Your{' '}
            <span className="bg-linear-to-r from-red-600 via-red-500 to-orange-500 bg-clip-text text-transparent">
              Perfect Plan
            </span>
          </h2>
          <p className="text-base sm:text-lg text-gray-600 max-w-3xl mx-auto leading-relaxed">
            Select a plan that aligns with your <span className="font-semibold text-red-600">company's engagement goals</span> and let our experts handle everything else
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
                className="group relative bg-white rounded-3xl shadow-xl hover:shadow-2xl transition-all duration-500 overflow-hidden"
              >
                
                <div className="relative p-8 sm:p-10">
                  {/* Icon and Title in Row */}
                  <div className="flex items-center gap-4 mb-6">
                    <div className="relative inline-block shrink-0">
                      <div className="absolute inset-0 bg-linear-to-br from-red-500 to-orange-500 rounded-2xl blur-xl opacity-50 group-hover:opacity-70 transition-opacity duration-500" />
                      <div className="relative p-4 bg-linear-to-br from-red-500 to-orange-500 rounded-2xl shadow-lg">
                        <Icon className="h-8 w-8 text-white" />
                      </div>
                    </div>

                    {/* Title */}
                    <h3 className="text-2xl sm:text-3xl font-bold text-gray-900">
                      <span className="bg-linear-to-r from-red-600 to-orange-500 bg-clip-text text-transparent">
                        {plan.title}
                      </span>
                    </h3>
                  </div>

                  {/* Description */}
                  <p className="text-gray-600 text-base sm:text-lg leading-relaxed mb-8">
                    {plan.description}
                  </p>

                  {/* Enhanced CTA Button */}
                  <Link 
                    to={plan.href} 
                    className="group/btn inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-linear-to-r from-red-600 to-orange-500 text-white font-semibold shadow-lg hover:shadow-xl hover:shadow-red-500/50 transition-all duration-300 hover:scale-105"
                  >
                    <span>{plan.button}</span>
                    <MoveRightIcon className="h-5 w-5 transform transition-transform duration-300 group-hover/btn:translate-x-1" />
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
