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
    <section className="py-10 bg-gray-50 relative">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_left,_#ff000010,_transparent_90%)] pointer-events-none" />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-gray-900 mb-3">
            Our <span className="text-[#C21807]">Plans</span>
          </h2>
          <p className="text-base sm:text-lg text-gray-600 max-w-2xl mx-auto">
            Choose a plan that fits your company’s engagement goals and let us handle the rest.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-10 relative">
          {plans.map((plan) => {
            const Icon = plan.icon
            return (
              <motion.div
                key={plan.id}
                initial={{ opacity: 0, y: 40, rotateX: -10 }}
                whileInView={{ opacity: 1, y: 0, rotateX: 0 }}
                transition={{ type: 'spring', stiffness: 200 }}
                viewport={{ once: true }}
                whileHover={{ scale: window.innerWidth >= 768 ? 1.05 : 1 }} // hover only on desktop
                className="relative bg-white border border-gray-200 p-6 sm:p-8 rounded-2xl shadow-lg hover:shadow-red-400 transition-all"
              >
                <div className="flex items-center mb-4">
                  <div className="p-2 sm:p-3 bg-red-100 rounded-lg mr-4">
                    <Icon className="h-5 w-5 sm:h-6 sm:w-6 text-red-600" />
                  </div>
                  <h3 className="text-xl sm:text-2xl font-semibold text-gray-900">
                    <span className="text-[#C21807] font-bold">{plan.title}</span>
                  </h3>
                </div>

                <p className="text-gray-700 text-sm sm:text-base leading-relaxed mb-5">
                  {plan.description}
                </p>

                <Link 
                  to={plan.href} 
                  className="group inline-flex items-center text-[#C21807] font-semibold text-sm sm:text-base transition-all duration-300"
                >
                  <span className="transform transition-transform duration-300 group-hover:-translate-x-1">
                    {plan.button}
                  </span>
                  <MoveRightIcon className="ml-2 h-4 w-4 sm:h-5 sm:w-5 transform transition-transform duration-300 group-hover:translate-x-1" />
                </Link>
              </motion.div>
            )
          })}
        </div>
      </div>
    </section>
  )
}

export default Ourplans
