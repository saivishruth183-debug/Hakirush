import { AnimatePresence, motion } from "framer-motion";
import { Star, Users, Building, Award } from "lucide-react";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

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
  const navigate = useNavigate();
  const [currentTestimonial, setCurrentTestimonial] = useState(0);

  useEffect(() => {
    const timer = setInterval(
      () =>
        setCurrentTestimonial((prev) => (prev + 1) % testimonials.length),
      10000
    );
    return () => clearInterval(timer);
  }, []);

  const redGradRight =
    "radial-gradient(circle at right, rgba(255,0,0,0.12), transparent 50%)";

  const redGradLeft =
    "radial-gradient(circle at left, rgba(255,0,0,0.12), transparent 50%)";

  return (
    <div className="bg-white overflow-hidden">

      {/* HERO */}
      <section
        className="pt-24 pb-20 relative"
        style={{
          background:
            "radial-gradient(circle at center, rgba(255,0,0,0.10), transparent 70%)",
        }}
      >
        <div className="max-w-7xl mx-auto px-6 text-center">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <h1 className="text-5xl lg:text-6xl font-extrabold mb-6 text-black">
              Our <span className="text-red-500">Clients</span>
            </h1>
            <p className="text-lg text-black max-w-3xl mx-auto">
              Trusted by leading companies to deliver exceptional corporate
              sports experiences.
            </p>
          </motion.div>
        </div>
      </section>

      {/* STATS */}
      <section className="py-20" style={{ background: redGradRight }}>
        <div className="max-w-7xl mx-auto px-10 lg:px-24">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                icon: <Building className="h-8 w-8 text-yellow-600" />,
                label: "Companies Trust Us",
                value: "50+",
              },
              {
                icon: <Users className="h-8 w-8 text-blue-600" />,
                label: "Employees Engaged",
                value: "10K+",
              },
              {
                icon: <Award className="h-8 w-8 text-green-600" />,
                label: "Events Delivered",
                value: "500+",
              },
            ].map((stat, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7 }}
                viewport={{ once: true }}
                className="text-center bg-gray-100 shadow-xl rounded-2xl p-8 hover:shadow-red-400"
              >
                <div className="p-4 bg-gray-200 rounded-2xl w-16 h-16 flex items-center justify-center mx-auto mb-4">
                  {stat.icon}
                </div>
                <h3 className="text-3xl font-bold text-gray-900 mb-2">
                  {stat.value}
                </h3>
                <p className="text-gray-700">{stat.label}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* LOGOS — ZERO GAP infinite left → right */}
      <section className="py-24 bg-white">
        <motion.div
          className="max-w-7xl mx-auto px-6"
          initial={{ opacity: 0, x: -30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
        >
          <h2 className="text-4xl font-bold text-center text-gray-900 mb-12">
            Trusted by <span className="text-red-600">Industry Leaders</span>
          </h2>

          <div className="relative overflow-hidden w-full py-10">

            {/* ✅ infinite loop without gaps */}
            <motion.div
              className="flex items-center gap-10 whitespace-nowrap w-[200%]"
              animate={{ x: ["-50%", "0%"] }}
              transition={{
                duration: 25,
                repeat: Infinity,
                ease: "linear",
              }}
            >
              {/* row 1 */}
              {clients.map((client, index) => (
                <div
                  key={`r1-${index}`}
                  className="bg-white p-6 rounded-xl shadow-md border cursor-pointer flex-shrink-0 hover:shadow-lg transition"
                >
                  <img
                    src={client.logo}
                    alt={`${client.name} - HAKIRUSH Client`}
                    loading="lazy"
                    className="h-16 w-32 object-contain grayscale hover:grayscale-0 transition"
                  />
                </div>
              ))}

              {/* row 2 */}
              {clients.map((client, index) => (
                <div
                  key={`r2-${index}`}
                  className="bg-white p-6 rounded-xl shadow-md border cursor-pointer flex-shrink-0 hover:shadow-lg transition"
                >
                  <img
                    src={client.logo}
                    alt={`${client.name} - HAKIRUSH Client`}
                    loading="lazy"
                    className="h-16 w-32 object-contain grayscale hover:grayscale-0 transition"
                  />
                </div>
              ))}
            </motion.div>
          </div>
        </motion.div>
      </section>

      {/* TESTIMONIALS */}
      <section className="py-24" style={{ background: redGradLeft }}>
        <motion.div
          className="max-w-4xl mx-auto px-6"
          initial={{ opacity: 0, x: 30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
        >
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
              className="bg-white p-10 rounded-2xl shadow-xl"
            >
              <div className="flex items-center mb-6">
                <img
                  src={testimonials[currentTestimonial].avatar}
                  alt={`${testimonials[currentTestimonial].person} - ${testimonials[currentTestimonial].position}`}
                  loading="lazy"
                  className="w-20 h-20 rounded-full mr-4 object-cover"
                />
                <div>
                  <h3 className="text-xl font-semibold text-red-600">
                    {testimonials[currentTestimonial].person}
                  </h3>
                  <p className="text-gray-800">
                    {testimonials[currentTestimonial].position},{" "}
                    {testimonials[currentTestimonial].company}
                  </p>
                  <div className="flex">
                    {Array(testimonials[currentTestimonial].rating)
                      .fill(0)
                      .map((_, i) => (
                        <Star
                          key={i}
                          className="text-yellow-400 h-4 w-4 mt-2"
                        />
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
