import React from 'react'
import { motion } from 'framer-motion'
import { MoveRightIcon, Calendar, Trophy } from 'lucide-react'

const plans = [
  {
    id: 1,
    href: '/',
    title: "Annual Subscription Plan",
    description:
      "One new sports or fitness event every month. Designed for 30–50 employees. We handle everything — venue, kits, transport, referees, and content.",
    button: 'Learn More',
    icon: Calendar,
  },
  {
    id: 2,
    href: '/',
    title: "Quarterly Tournament Plan",
    description:
      "High-energy inter-company tournaments every three months. Includes sponsorships, brand activations, and highlight coverage.",
    button: 'Register Now',
    icon: Trophy,
  },
]

const Ourplans = () => {
  return (
    <section className="py-24 bg-gray-50 relative">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_left,_#ff000010,_transparent_90%)] pointer-events-none" />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-5xl font-extrabold text-gray-900 mb-4">
            Our <span className="text-red-600">Plans</span>
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Choose a plan that best fits your company’s engagement goals and let us handle the rest.
          </p>
        </motion.div>

        {/* Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10 relative cursor-pointer">
          {plans.map((plan) => {
            const Icon = plan.icon
            return (
              <motion.div
                key={plan.id}
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
                  <h3 className="text-2xl font-semibold text-gray-900">
                    <span className="text-red-600">{plan.title}</span>
                  </h3>
                </div>
                <p className="text-gray-700 leading-relaxed mb-6">{plan.description}</p>

                <a href={plan.href} className="group inline-flex items-center text-red-600 font-semibold transition-all duration-300"
                >
                  <span className="transform transition-transform duration-300 group-hover:-translate-x-1">
                    {plan.button}
                  </span>
                  <MoveRightIcon className="ml-2 h-5 w-5 transform transition-transform duration-300 group-hover:translate-x-1" />
                </a>
              </motion.div>
            )
          })}
        </div>
      </div>
    </section>
  )
}

export default Ourplans
