import React from 'react'
import { useNavigate } from 'react-router-dom'
import { ArrowLeft, Users, Calendar, Trophy, Target, CheckCircle, Quote } from 'lucide-react'
import { motion } from 'framer-motion'

const Client4 = () => {
  const navigate = useNavigate()

  return (
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

      {/* Hero Section */}
      <section className='relative py-6 sm:py-10 overflow-hidden bg-white'>
        <div className='max-w-6xl mx-auto px-4 sm:px-6 relative z-10'>
          <motion.div
            initial={{ opacity: 0, y: -40 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.2, ease: "easeOut" }}
            viewport={{ once: true }}
            className='text-center'
          >
            {/* Badge */}
            <div className='inline-flex items-center gap-1.5 sm:gap-2 px-4 py-2 sm:px-5 sm:py-2.5 rounded-full bg-linear-to-r from-[#C21807]/10 to-[#A01506]/10 border border-[#C21807]/30 shadow-lg backdrop-blur-sm mb-6 sm:mb-8'>
              <Trophy className='w-3.5 h-3.5 sm:w-4 sm:h-4 text-[#C21807]' />
              <span className='text-xs sm:text-sm font-bold text-[#C21807]'>Success Story</span>
            </div>

            {/* Icon and Title in Row */}
            <div className='flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-3 md:gap-4 mb-4 sm:mb-6'>
              <div className='inline-flex items-center justify-center w-12 h-12 sm:w-16 sm:h-16 md:w-20 md:h-20 rounded-xl sm:rounded-2xl md:rounded-3xl bg-linear-to-r from-[#C21807] to-[#A01506] shadow-2xl shrink-0'>
                <Users className='w-5 h-5 sm:w-7 sm:h-7 md:w-8 md:h-8 text-white' />
              </div>
              <h1 className='text-xl sm:text-3xl md:text-4xl lg:text-5xl font-black text-gray-900 tracking-tight text-center sm:text-left'>
                Healthcare Systems{" "}
                <span className='bg-linear-to-r from-[#C21807] via-[#A01506] to-[#C21807] bg-clip-text text-transparent drop-shadow-sm'>
                  Group
                </span>
              </h1>
            </div>
            
            <p className='mt-3 sm:mt-4 text-xs sm:text-base md:text-lg text-gray-700 max-w-4xl mx-auto leading-relaxed font-medium px-2'>
              Promoting wellness and unity among healthcare professionals through sports
            </p>
          </motion.div>
        </div>
      </section>

      {/* Stats Section */}
      <section className='py-12 sm:py-16 bg-gray-50'>
        <div className='max-w-7xl mx-auto px-4 sm:px-6'>
          <div className='grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4 md:gap-6'>
            {[
              { icon: <Users className='w-6 h-6 sm:w-7 sm:h-7 md:w-8 md:h-8' />, value: '600+', label: 'Healthcare Workers' },
              { icon: <Calendar className='w-6 h-6 sm:w-7 sm:h-7 md:w-8 md:h-8' />, value: '30', label: 'Wellness Events' },
              { icon: <Trophy className='w-6 h-6 sm:w-7 sm:h-7 md:w-8 md:h-8' />, value: '94%', label: 'Participation Rate' },
              { icon: <Target className='w-6 h-6 sm:w-7 sm:h-7 md:w-8 md:h-8' />, value: '2.5 Years', label: 'Partnership' }
            ].map((stat, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                whileHover={{ y: -8, scale: 1.02 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className='bg-white p-4 sm:p-6 md:p-8 rounded-xl sm:rounded-2xl shadow-lg hover:shadow-[0_12px_35px_rgba(248,113,113,0.45)] transition-all duration-300 text-center border border-gray-100'
              >
                <div className='inline-flex items-center justify-center w-12 h-12 sm:w-14 sm:h-14 md:w-16 md:h-16 bg-linear-to-br from-[#C21807] to-[#A01506] text-white rounded-xl sm:rounded-2xl mb-3 sm:mb-4'>
                  {stat.icon}
                </div>
                <h3 className='text-xl sm:text-2xl md:text-3xl font-bold text-gray-900 mb-1 sm:mb-2'>{stat.value}</h3>
                <p className='text-xs sm:text-sm md:text-base text-gray-600 font-medium leading-tight'>{stat.label}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Case Study Section */}
      <section className='py-16 bg-white'>
        <div className='max-w-7xl mx-auto px-6'>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className='text-center mb-12'
          >
            <h2 className='text-3xl md:text-4xl font-black text-gray-900 mb-4'>
              The <span className='bg-linear-to-r from-[#C21807] to-[#A01506] bg-clip-text text-transparent'>Mission</span>
            </h2>
            <p className='text-lg text-gray-600 max-w-3xl mx-auto'>
              Supporting frontline healthcare workers with recreational activities and team bonding
            </p>
          </motion.div>

          <div className='grid grid-cols-1 md:grid-cols-2 gap-12 items-center'>
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
            >
              <div className='bg-linear-to-br from-gray-50 to-gray-100 p-8 rounded-3xl border border-gray-200'>
                <h3 className='text-2xl font-bold text-gray-900 mb-6'>Custom Programs</h3>
                <div className='space-y-4'>
                  {[
                    'Shift-friendly scheduling',
                    'Multi-sport tournaments',
                    'Stress management activities',
                    'Department vs department leagues',
                    'Family inclusion events'
                  ].map((item, i) => (
                    <div key={i} className='flex items-start gap-3'>
                      <CheckCircle className='w-6 h-6 text-[#C21807] shrink-0 mt-0.5' />
                      <span className='text-gray-700 font-medium'>{item}</span>
                    </div>
                  ))}
                </div>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
            >
              <div className='bg-linear-to-br from-[#C21807] to-[#A01506] p-8 rounded-3xl text-white shadow-2xl'>
                <h3 className='text-2xl font-bold mb-6'>Wellness Outcomes</h3>
                <div className='space-y-6'>
                  <div>
                    <div className='text-4xl font-black mb-2'>80%</div>
                    <p className='text-white/90'>Report better work-life balance</p>
                  </div>
                  <div>
                    <div className='text-4xl font-black mb-2'>65%</div>
                    <p className='text-white/90'>Reduction in burnout symptoms</p>
                  </div>
                  <div>
                    <div className='text-4xl font-black mb-2'>93%</div>
                    <p className='text-white/90'>Would recommend to colleagues</p>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Testimonial Section */}
      <section className='py-16 bg-gray-50'>
        <div className='max-w-4xl mx-auto px-6'>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className='bg-white rounded-3xl shadow-2xl p-8 md:p-12 relative overflow-hidden border border-gray-100'
          >
            <div className='absolute top-8 right-8 w-16 h-16 rounded-full bg-[#C21807]/10 flex items-center justify-center'>
              <Quote className='w-8 h-8 text-[#C21807]' />
            </div>
            <div className='relative'>
              <p className='text-lg md:text-xl text-gray-700 leading-relaxed italic mb-8'>
                "HAKIRUSH understands the unique challenges of healthcare workers. Their programs give our staff something to look forward to and a healthy way to decompress."
              </p>
              <div className='flex items-center gap-4'>
                <div className='w-16 h-16 rounded-full bg-linear-to-br from-[#C21807] to-[#A01506] flex items-center justify-center text-white text-2xl font-bold'>
                  DN
                </div>
                <div>
                  <div className='font-bold text-gray-900 text-lg'>Dr. Neha Desai</div>
                  <div className='text-gray-600'>Chief Wellness Officer, Healthcare Systems Group</div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  )
}

export default Client4
    