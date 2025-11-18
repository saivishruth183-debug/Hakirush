import React from 'react'
import { useNavigate } from 'react-router-dom'
import { ArrowLeft, Award, Users, Eye, TrendingUp, Star, CheckCircle, Handshake } from 'lucide-react'
import { motion } from 'framer-motion'

const Sponsor4 = () => {
  const navigate = useNavigate()

  return (
    <div className='bg-white min-h-screen'>
      {/* Hero Section */}
      <section className='relative bg-gradient-to-br from-[#C21807] via-[#A01506] to-[#8B1205] text-white py-20 overflow-hidden'>
        <div className='absolute inset-0 bg-black/10'></div>
        <div className='max-w-7xl mx-auto px-6 relative z-10'>
          <motion.button
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            onClick={() => navigate(-1)}
            className='flex items-center gap-2 px-5 py-2.5 bg-white/20 backdrop-blur-sm text-white rounded-xl hover:bg-white/30 transition-all duration-300 mb-8 border border-white/30'
          >
            <ArrowLeft className='w-5 h-5' />
            Go Back
          </motion.button>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className='max-w-4xl'
          >
            <div className='inline-flex items-center gap-2 px-4 py-2 bg-white/20 backdrop-blur-sm rounded-full mb-6 border border-white/30'>
              <Award className='w-5 h-5' />
              <span className='font-semibold'>Media Partner</span>
            </div>
            <h1 className='text-4xl md:text-6xl font-black mb-6 leading-tight'>SportsCast Media</h1>
            <p className='text-xl md:text-2xl text-white/90 leading-relaxed'>
              Broadcasting excellence and capturing memorable moments at every tournament
            </p>
          </motion.div>
        </div>
      </section>

      {/* Sponsorship Metrics */}
      <section className='py-16 bg-gray-50'>
        <div className='max-w-7xl mx-auto px-6'>
          <div className='grid grid-cols-1 md:grid-cols-4 gap-6'>
            {[
              { icon: <Eye className='w-8 h-8' />, value: '100K+', label: 'Social Media Reach' },
              { icon: <Users className='w-8 h-8' />, value: '15K+', label: 'Video Views' },
              { icon: <TrendingUp className='w-8 h-8' />, value: '400+', label: 'Events Covered' },
              { icon: <Star className='w-8 h-8' />, value: '96%', label: 'Engagement Rate' }
            ].map((stat, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                whileHover={{ y: -12, scale: 1.02 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className='bg-white p-8 rounded-2xl shadow-xl hover:shadow-[0_12px_35px_rgba(248,113,113,0.45)] transition-all duration-300 text-center border border-gray-100'
              >
                <div className='inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-[#C21807] to-[#A01506] text-white rounded-2xl mb-4'>
                  {stat.icon}
                </div>
                <h3 className='text-3xl font-bold text-gray-900 mb-2'>{stat.value}</h3>
                <p className='text-gray-600 font-medium'>{stat.label}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Partnership Details */}
      <section className='py-16 bg-white'>
        <div className='max-w-7xl mx-auto px-6'>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className='text-center mb-12'
          >
            <h2 className='text-3xl md:text-4xl font-black text-gray-900 mb-4'>
              Media <span className='bg-gradient-to-r from-[#C21807] to-[#A01506] bg-clip-text text-transparent'>Coverage</span>
            </h2>
            <p className='text-lg text-gray-600 max-w-3xl mx-auto'>
              Professional sports coverage bringing tournaments to life through multimedia
            </p>
          </motion.div>

          <div className='grid grid-cols-1 md:grid-cols-2 gap-12 items-center'>
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
            >
              <div className='bg-gradient-to-br from-gray-50 to-gray-100 p-8 rounded-3xl border border-gray-200'>
                <h3 className='text-2xl font-bold text-gray-900 mb-6'>Media Services</h3>
                <div className='space-y-4'>
                  {[
                    'Live event photography',
                    'Video highlights production',
                    'Social media content creation',
                    'Tournament livestreaming',
                    'Post-event video packages'
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
              <div className='bg-gradient-to-br from-[#C21807] to-[#A01506] p-8 rounded-3xl text-white shadow-2xl'>
                <h3 className='text-2xl font-bold mb-6'>Media Impact</h3>
                <div className='space-y-6'>
                  <div>
                    <div className='text-4xl font-black mb-2'>₹12L+</div>
                    <p className='text-white/90'>Media coverage value</p>
                  </div>
                  <div>
                    <div className='text-4xl font-black mb-2'>120+</div>
                    <p className='text-white/90'>Events documented</p>
                  </div>
                  <div>
                    <div className='text-4xl font-black mb-2'>500+</div>
                    <p className='text-white/90'>Hours of content</p>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Partnership Statement */}
      <section className='py-16 bg-gray-50'>
        <div className='max-w-4xl mx-auto px-6'>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className='bg-white rounded-3xl shadow-2xl p-8 md:p-12 relative overflow-hidden border border-gray-100'
          >
            <div className='absolute top-8 right-8 w-16 h-16 rounded-full bg-[#C21807]/10 flex items-center justify-center'>
              <Handshake className='w-8 h-8 text-[#C21807]' />
            </div>
            <div className='relative'>
              <h3 className='text-2xl md:text-3xl font-bold text-gray-900 mb-6'>Media Partnership</h3>
              <p className='text-lg text-gray-700 leading-relaxed mb-6'>
                SportsCast Media has been capturing the excitement of HAKIRUSH tournaments since 2020. Their professional photography and videography teams ensure every memorable moment is preserved and shared with audiences.
              </p>
              <p className='text-lg text-gray-700 leading-relaxed'>
                Through high-quality content creation and strategic social media distribution, SportsCast amplifies the reach and impact of every tournament, creating lasting memories for participants and valuable exposure for sponsors.
              </p>
              <div className='mt-8 pt-6 border-t border-gray-200'>
                <div className='flex items-center gap-4'>
                  <div className='w-16 h-16 rounded-full bg-gradient-to-br from-[#C21807] to-[#A01506] flex items-center justify-center text-white text-2xl font-bold'>
                    SC
                  </div>
                  <div>
                    <div className='font-bold text-gray-900 text-lg'>SportsCast Media</div>
                    <div className='text-gray-600'>Media Partner - Since 2020</div>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  )
}

export default Sponsor4
