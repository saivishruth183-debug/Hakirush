import { AnimatePresence, motion } from "framer-motion";
import { Star, Users, Building, Award, Sparkles, TrendingUp, Quote } from "lucide-react";
import { useEffect, useState } from "react";

const clients = [
  { id: 1, href: "", name: "Client 1", logo: "https://via.placeholder.com/150" },
  { id: 2, href: "", name: "Client 2", logo: "https://via.placeholder.com/150" },
  { id: 3, href: "", name: "Client 3", logo: "https://via.placeholder.com/150" },
  { id: 4, href: "", name: "Client 4", logo: "https://via.placeholder.com/150" },
  { id: 5, href: "", name: "Client 5", logo: "https://via.placeholder.com/150" },
];

const testimonials = [
  {
    company: "TechCorp Solutions",
    person: "Rajesh Kumar",
    position: "HR Director",
    message:
      "HAKIRUSH has revolutionized our employee engagement. The biweekly tournaments have created a buzz in the office that we never had before. Team morale is at an all-time high!",
    avatar:
      "https://images.pexels.com/photos/2182970/pexels-photo-2182970.jpeg?w=150",
    rating: 5,
  },
  {
    company: "Innovation Labs",
    person: "Priya Sharma",
    position: "CEO",
    message:
      "The professional organization and competitive spirit that HAKIRUSH brings has made our company culture more vibrant. Our employees look forward to every tournament!",
    avatar:
      "https://images.pexels.com/photos/415829/pexels-photo-415829.jpeg?w=150",
    rating: 5,
  },
  {
    company: "Digital Dynamics",
    person: "Amit Patel",
    position: "Operations Manager",
    message:
      "Outstanding service delivery! Every tournament is executed flawlessly. The branded kits, professional coverage, and seamless coordination exceed our expectations.",
    avatar:
      "https://images.pexels.com/photos/1040881/pexels-photo-1040881.jpeg?w=150",
    rating: 5,
  },
  {
    company: "Future Systems",
    person: "Sarah Johnson",
    position: "Head of People Operations",
    message:
      "HAKIRUSH has transformed how our teams collaborate. The inter-department competitions have broken down silos and created lasting friendships across our organization.",
    avatar:
      "https://images.pexels.com/photos/762020/pexels-photo-762020.jpeg?w=150",
    rating: 5,
  },
];

export default function Clients() {
  const [currentTestimonial, setCurrentTestimonial] = useState(0);

  useEffect(() => {
    const timer = setInterval(
      () =>
        setCurrentTestimonial((prev) => (prev + 1) % testimonials.length),
      10000
    );
    return () => clearInterval(timer);
  }, []);



  return (
    <div className="bg-white overflow-hidden">

      {/* HERO SECTION */}
      <section className="relative py-20 overflow-hidden bg-white">

        <div className="max-w-7xl mx-auto px-6 text-center relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            {/* Badge */}
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-linear-to-r from-red-50 to-orange-50 border border-red-100 mb-6">
              <Building className="w-4 h-4 text-red-600" />
              <span className="text-sm font-semibold text-red-600">Trusted Partners</span>
            </div>

            {/* Icon and Title in Row */}
            <div className="flex items-center justify-center gap-6 mb-6">
              <div className="inline-flex items-center justify-center w-15 h-15 rounded-3xl bg-linear-to-br from-red-600 to-orange-500 shadow-2xl shrink-0">
                <Users className="w-6 h-6 text-white" />
              </div>
              <h1 className="text-3xl md:text-4xl lg:text-5xl font-extrabold text-gray-900">
                Our{" "}
                <span className="bg-linear-to-r from-red-600 to-orange-500 bg-clip-text text-transparent">
                  Clients
                </span>
              </h1>
            </div>

            <p className="text-base md:text-lg text-gray-700 max-w-3xl mx-auto leading-relaxed">
              Trusted by leading companies to deliver exceptional corporate sports experiences 
              and build vibrant workplace cultures.
            </p>
          </motion.div>
        </div>
      </section>

      {/* STATS SECTION */}
      <section className="py-20 relative overflow-hidden bg-white">
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-1/2 left-1/4 w-80 h-80 bg-linear-to-br from-red-200/20 to-transparent rounded-full blur-3xl" />
          <div className="absolute top-1/2 right-1/4 w-80 h-80 bg-linear-to-br from-orange-200/20 to-transparent rounded-full blur-3xl" />
        </div>

        <div className="max-w-7xl mx-auto px-6 relative z-10">
          {/* Section Header */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-linear-to-r from-red-50 to-orange-50 border border-red-100 mb-4">
              <TrendingUp className="w-4 h-4 text-red-600" />
              <span className="text-sm font-semibold text-red-600">Our Impact</span>
            </div>
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900">
              By The{" "}
              <span className="bg-linear-to-r from-red-600 to-orange-500 bg-clip-text text-transparent">
                Numbers
              </span>
            </h2>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                icon: <Building className="h-6 w-6 text-white" />,
                label: "Companies Trust Us",
                value: "50+",
                gradient: "from-red-600 to-orange-500",
              },
              {
                icon: <Users className="h-6 w-6 text-white" />,
                label: "Employees Engaged",
                value: "10K+",
                gradient: "from-orange-500 to-red-500",
              },
              {
                icon: <Award className="h-6 w-6 text-white" />,
                label: "Events Delivered",
                value: "500+",
                gradient: "from-red-500 to-pink-500",
              },
            ].map((stat, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                whileHover={{ y: -12, scale: 1.02 }}
                transition={{ 
                  type: 'spring',
                  stiffness: 300,
                  damping: 20,
                  delay: i * 0.1 
                }}
                viewport={{ once: true }}
                className="group relative text-center bg-white rounded-3xl shadow-xl hover:shadow-2xl transition-all duration-500 overflow-hidden cursor-pointer border border-gray-100"
              >
                {/* Background Effects */}
                <div className={`absolute inset-0 bg-linear-to-br ${stat.gradient} opacity-0 group-hover:opacity-5 transition-opacity duration-500`} />
                <div className="absolute -top-20 -right-20 w-40 h-40 bg-linear-to-br from-red-200/20 to-transparent rounded-full blur-2xl" />

                <div className="relative p-10">
                  {/* Icon Badge */}
                  <div className={`inline-flex items-center justify-center w-15 h-15 rounded-2xl bg-linear-to-br ${stat.gradient} mb-6 shadow-lg group-hover:scale-110 transition-transform duration-300`}>
                    {stat.icon}
                  </div>

                  <h3 className="text-4xl font-extrabold text-gray-900 mb-3 group-hover:text-transparent group-hover:bg-linear-to-r group-hover:from-red-600 group-hover:to-orange-500 group-hover:bg-clip-text transition-all duration-300">
                    {stat.value}
                  </h3>
                  <p className="text-base text-gray-700 font-medium">{stat.label}</p>
                </div>

                {/* Border Glow */}
                <div className="absolute inset-0 rounded-3xl border-2 border-transparent group-hover:border-red-500/20 transition-colors duration-500 pointer-events-none" />
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* LOGOS SECTION */}
      <section className="py-20 relative overflow-hidden">
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-1/2 left-1/3 w-96 h-96 bg-linear-to-br from-red-200/10 to-transparent rounded-full blur-3xl" />
          <div className="absolute top-1/2 right-1/3 w-96 h-96 bg-linear-to-br from-orange-200/10 to-transparent rounded-full blur-3xl" />
        </div>

        <motion.div
          className="max-w-7xl mx-auto px-6 relative z-10"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          {/* Section Header */}
          <div className="text-center mb-16">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-linear-to-r from-red-50 to-orange-50 border border-red-100 mb-4">
              <Sparkles className="w-4 h-4 text-red-600" />
              <span className="text-sm font-semibold text-red-600">Our Partners</span>
            </div>
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900">
              Trusted by{" "}
              <span className="bg-linear-to-r from-red-600 to-orange-500 bg-clip-text text-transparent">
                Industry Leaders
              </span>
            </h2>
          </div>

          <div className="relative overflow-hidden w-full py-10">
            {/* Infinite loop animation */}
            <motion.div
              className="flex items-center gap-10 whitespace-nowrap w-[200%]"
              animate={{ x: ["-50%", "0%"] }}
              transition={{
                duration: 25,
                repeat: Infinity,
                ease: "linear",
              }}
            >
              {/* First set */}
              {clients.map((client, index) => (
                <motion.div
                  key={`r1-${index}`}
                  whileHover={{ y: -8, scale: 1.05 }}
                  className="group relative bg-white p-8 rounded-2xl shadow-xl hover:shadow-2xl border border-gray-100 cursor-pointer shrink-0 overflow-hidden transition-all duration-500"
                >
                  <div className="absolute inset-0 bg-linear-to-br from-red-50/50 to-orange-50/50 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                  <img
                    src={client.logo}
                    alt={`${client.name} - HAKIRUSH Client`}
                    loading="lazy"
                    className="relative h-16 w-32 object-contain grayscale group-hover:grayscale-0 transition-all duration-500"
                  />
                  <div className="absolute inset-0 rounded-2xl border-2 border-transparent group-hover:border-red-500/20 transition-colors duration-500 pointer-events-none" />
                </motion.div>
              ))}

              {/* Second set (duplicate for seamless loop) */}
              {clients.map((client, index) => (
                <motion.div
                  key={`r2-${index}`}
                  whileHover={{ y: -8, scale: 1.05 }}
                  className="group relative bg-white p-8 rounded-2xl shadow-xl hover:shadow-2xl border border-gray-100 cursor-pointer shrink-0 overflow-hidden transition-all duration-500"
                >
                  <div className="absolute inset-0 bg-linear-to-br from-red-50/50 to-orange-50/50 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                  <img
                    src={client.logo}
                    alt={`${client.name} - HAKIRUSH Client`}
                    loading="lazy"
                    className="relative h-16 w-32 object-contain grayscale group-hover:grayscale-0 transition-all duration-500"
                  />
                  <div className="absolute inset-0 rounded-2xl border-2 border-transparent group-hover:border-red-500/20 transition-colors duration-500 pointer-events-none" />
                </motion.div>
              ))}
            </motion.div>
          </div>
        </motion.div>
      </section>

      {/* TESTIMONIALS SECTION */}
      <section className="py-20 relative overflow-hidden bg-white">
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-1/3 left-10 w-96 h-96 bg-linear-to-br from-red-300/20 to-orange-300/20 rounded-full blur-3xl animate-pulse" />
          <div className="absolute bottom-1/3 right-10 w-96 h-96 bg-linear-to-br from-orange-300/20 to-red-300/20 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }} />
        </div>

        <motion.div
          className="max-w-5xl mx-auto px-6 relative z-10"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          {/* Section Header */}
          <div className="text-center mb-16">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-linear-to-r from-red-50 to-orange-50 border border-red-100 mb-4">
              <Quote className="w-4 h-4 text-red-600" />
              <span className="text-sm font-semibold text-red-600">Success Stories</span>
            </div>
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900">
              What Our{" "}
              <span className="bg-linear-to-r from-red-600 to-orange-500 bg-clip-text text-transparent">
                Clients Say
              </span>
            </h2>
          </div>

          <AnimatePresence mode="wait">
            <motion.div
              key={currentTestimonial}
              initial={{ opacity: 0, scale: 0.9, rotateY: 90 }}
              animate={{ opacity: 1, scale: 1, rotateY: 0 }}
              exit={{ opacity: 0, scale: 0.9, rotateY: -90 }}
              transition={{ duration: 0.6 }}
              className="group relative bg-white rounded-3xl shadow-2xl hover:shadow-red-500/20 transition-all duration-500 overflow-hidden cursor-pointer border border-gray-100"
            >
              {/* Background Effects */}
              <div className="absolute inset-0 bg-linear-to-br from-red-50/50 via-transparent to-orange-50/50 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              <div className="absolute -top-20 -right-20 w-40 h-40 bg-linear-to-br from-red-200/30 to-transparent rounded-full blur-2xl" />

              <div className="relative p-10 md:p-12">
                {/* Quote Icon */}
                <div className="absolute top-8 right-8 w-16 h-16 rounded-full bg-linear-to-br from-red-100 to-orange-100 flex items-center justify-center opacity-50">
                  <Quote className="w-8 h-8 text-red-600" />
                </div>

                <div className="flex items-start gap-6 mb-8">
                  <motion.img
                    whileHover={{ scale: 1.1, rotate: 5 }}
                    src={testimonials[currentTestimonial].avatar}
                    alt={`${testimonials[currentTestimonial].person} - ${testimonials[currentTestimonial].position}`}
                    loading="lazy"
                    className="w-20 h-20 rounded-2xl object-cover shadow-lg shrink-0 border-2 border-red-100"
                  />
                  <div className="flex-1">
                    <h3 className="text-2xl font-bold text-gray-900 mb-1">
                      {testimonials[currentTestimonial].person}
                    </h3>
                    <p className="text-gray-600 font-medium mb-2">
                      {testimonials[currentTestimonial].position}
                    </p>
                    <p className="text-sm font-semibold text-red-600">
                      {testimonials[currentTestimonial].company}
                    </p>
                    <div className="flex gap-1 mt-3">
                      {Array(testimonials[currentTestimonial].rating)
                        .fill(0)
                        .map((_, i) => (
                          <Star
                            key={i}
                            className="w-5 h-5 text-yellow-400 fill-yellow-400"
                          />
                        ))}
                    </div>
                  </div>
                </div>

                <blockquote className="text-base md:text-lg text-gray-700 leading-relaxed italic relative pl-6 border-l-4 border-red-500">
                  "{testimonials[currentTestimonial].message}"
                </blockquote>
              </div>

              {/* Border Glow */}
              <div className="absolute inset-0 rounded-3xl border-2 border-transparent group-hover:border-red-500/20 transition-colors duration-500 pointer-events-none" />
            </motion.div>
          </AnimatePresence>
        </motion.div>
      </section>
    </div>
  );
}
