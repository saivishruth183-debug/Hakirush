import { AnimatePresence, motion, useAnimation } from 'framer-motion';
import { Star, Users, Building, Award } from 'lucide-react';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

const clients = [
  { id: 1, href: "google", name: 'Google', logo: 'https://upload.wikimedia.org/wikipedia/commons/2/2f/Google_2015_logo.svg' },
  { id: 2, href: "microsoft", name: 'Microsoft', logo: 'https://upload.wikimedia.org/wikipedia/commons/4/44/Microsoft_logo.svg' },
  { id: 3, href: "amazon", name: 'Amazon', logo: 'https://upload.wikimedia.org/wikipedia/commons/a/a9/Amazon_logo.svg' },
  { id: 4, href: "facebook", name: 'Facebook', logo: 'https://upload.wikimedia.org/wikipedia/commons/5/51/Facebook_f_logo_%282019%29.svg' },
  { id: 5, href: "apple", name: 'Apple', logo: 'https://upload.wikimedia.org/wikipedia/commons/f/fa/Apple_logo_black.svg' },
  { id: 6, href: "netflix", name: 'Netflix', logo: 'https://upload.wikimedia.org/wikipedia/commons/0/08/Netflix_2015_logo.svg' },
];

const testimonials = [
  { company: 'TechCorp Solutions', person: 'Rajesh Kumar', position: 'HR Director', message: 'HAKIRUSH has revolutionized our employee engagement. The biweekly tournaments have created a buzz in the office that we never had before. Team morale is at an all-time high!', avatar: 'https://images.pexels.com/photos/2182970/pexels-photo-2182970.jpeg?w=150', rating: 5 },
  { company: 'Innovation Labs', person: 'Priya Sharma', position: 'CEO', message: 'The professional organization and competitive spirit that HAKIRUSH brings has made our company culture more vibrant. Our employees look forward to every tournament!', avatar: 'https://images.pexels.com/photos/415829/pexels-photo-415829.jpeg?w=150', rating: 5 },
  { company: 'Digital Dynamics', person: 'Amit Patel', position: 'Operations Manager', message: 'Outstanding service delivery! Every tournament is executed flawlessly. The branded kits, professional coverage, and seamless coordination exceed our expectations.', avatar: 'https://images.pexels.com/photos/1040881/pexels-photo-1040881.jpeg?w=150', rating: 5 },
  { company: 'Future Systems', person: 'Sarah Johnson', position: 'Head of People Operations', message: 'HAKIRUSH has transformed how our teams collaborate. The inter-department competitions have broken down silos and created lasting friendships across our organization.', avatar: 'https://images.pexels.com/photos/762020/pexels-photo-762020.jpeg?w=150', rating: 5 }
];

export default function Clients() {
  const controls = useAnimation();
  const navigate = useNavigate();
  const [paused, setPaused] = useState(false);
  const [currentTestimonial, setCurrentTestimonial] = useState(0);

  const nextTestimonial = () =>
    setCurrentTestimonial((prev) => (prev + 1) % testimonials.length);

  useEffect(() => {
    const timer = setInterval(() => nextTestimonial(), 10000);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="bg-gradient-to-t from-white via-gray-100 to-neutral-200 overflow-hidden transition-colors duration-700">

      {/* Hero Section */}
      <section className="pt-24 pb-20 relative text-white">
        <div className="max-w-7xl mx-auto px-6 text-center relative z-10">
          <motion.div
            initial={{ opacity: 0, y: -30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease: "easeOut" }}
            viewport={{ once: true }}
          >
            <h1 className="text-5xl lg:text-6xl font-extrabold mb-6 text-black">
              Our <span className="text-red-500">Clients</span>
            </h1>
            <p className="text-lg text-black max-w-3xl mx-auto leading-relaxed">
              Trusted by leading companies to deliver exceptional corporate sports experiences and build stronger teams.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-10 lg:px-24">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[ 
              { icon: <Building className="h-8 w-8 text-yellow-600" />, label: "Companies Trust Us", value: "50+" },
              { icon: <Users className="h-8 w-8 text-blue-600" />, label: "Employees Engaged", value: "10K+" },
              { icon: <Award className="h-8 w-8 text-green-600" />, label: "Events Delivered", value: "500+" },
            ].map((stat, i) => (
              <motion.div 
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, ease: "easeOut" }}
              viewport={{ once: true }}
              key={i} className="text-center bg-white shadow-xl rounded-2xl p-8 border border-gray-200" whileHover={{ scale: 1.05 }}>
                <div className="p-4 bg-gray-100 rounded-2xl w-16 h-16 flex items-center justify-center mx-auto mb-4">
                  {stat.icon}
                </div>
                <h3 className="text-3xl font-bold text-gray-900 mb-2">{stat.value}</h3>
                <p className="text-gray-700">{stat.label}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Client Logos */}
      <section className="py-24 bg-white">
        <motion.div 
        initial={{ opacity: 0, x: -30 }}
        whileInView={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.7, ease: "easeOut" }}
        viewport={{ once: true }}
        className="max-w-7xl mx-auto px-6">
          <h2 className="text-4xl font-bold text-center text-gray-900 mb-12">
            Trusted by <span className="text-red-600">Industry Leaders</span>
          </h2>

          <div className="relative overflow-hidden">
            <motion.div
              animate={paused ? { x: 0 } : { x: ["-100%", "0%"] }}
              transition={{ x: { repeat: Infinity, repeatType: "loop", duration: 25, ease: "linear" } }}
              className="flex space-x-8 items-center py-10 px-10"
            >
              {[...clients, ...clients].map((client, index) => (
                <motion.div
                  key={index}
                  onClick={() => navigate(`/client/${client.href}`)}
                  whileHover={{ rotateY: 10, scale: 1.05 }}
                  className="flex-shrink-0 bg-white p-6 rounded-xl shadow-lg border border-gray-200 cursor-pointer"
                >
                  <img src={client.logo} alt={client.name} className="h-16 w-32 object-contain grayscale hover:grayscale-0 transition duration-300" />
                </motion.div>
              ))}
            </motion.div>
          </div>
        </motion.div>
      </section>

      {/* Testimonials */}
      <section className="py-24">
        <motion.div 
        initial={{ opacity: 0, x: 30 }}
        whileInView={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.7, ease: "easeOut" }}
        viewport={{ once: true }}
        className="max-w-4xl mx-auto px-6">
          <h2 className="text-4xl font-bold text-center text-gray-900 mb-16">
            What Our <span className="text-red-600">Clients Say</span>
          </h2>

          <AnimatePresence mode="wait">
            <motion.div
              key={currentTestimonial}
              initial={{ opacity: 0, rotateY: 90 }}
              animate={{ opacity: 1, rotateY: 0 }}
              exit={{ opacity: 0, rotateY: -90 }}
              transition={{ duration: 0.6 }}
              className="bg-white p-8 rounded-2xl shadow-xl border border-gray-200"
            >
              <div className="flex items-center mb-6">
                <img src={testimonials[currentTestimonial].avatar} className="w-20 h-20 rounded-full mr-4" />
                <div>
                  <h3 className="text-xl font-semibold text-red-600">{testimonials[currentTestimonial].person}</h3>
                  <p className="text-gray-800">{testimonials[currentTestimonial].position}, {testimonials[currentTestimonial].company}</p>
                  <div className="flex">
                    {Array(testimonials[currentTestimonial].rating).fill(0).map((_, i) => (
                      <Star key={i} className="h-4 w-4 text-yellow-400 fill-current mt-2" />
                    ))}
                  </div>
                </div>
              </div>

              <blockquote className="text-lg text-gray-700 italic">
                "{testimonials[currentTestimonial].message}"
              </blockquote>
            </motion.div>
          </AnimatePresence>
        </motion.div>
      </section>

    </div>
  );
}
