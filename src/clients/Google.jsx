import { motion } from "framer-motion";
import { CheckCircle2 } from "lucide-react";

// ✅ Direct client data included here
const client = {
  id: "google",
  name: "Google",
  logo: "https://upload.wikimedia.org/wikipedia/commons/2/2f/Google_2015_logo.svg",
  description:
    "Google is a multinational technology company specializing in Internet-related services and products.",
  partnership: {
    title: "Empowering Sports Analytics",
    details:
      "Google collaborates with Hakirush to develop AI-powered sports analytics, helping athletes and teams improve performance through real-time data insights.",
    highlights: [
      "AI-based match performance tracking",
      "Cloud solutions for sports organizations",
      "Promoting digital transformation in sports",
    ],
  },
};

export default function GooglePage() {
  return (
    <div className="relative min-h-screen bg-[#FAFAFA] overflow-hidden">
      
      {/* Soft floating background orbs */}
      <div className="absolute -top-40 -left-40 w-[350px] h-[350px] bg-[#4285F4]/20 rounded-full blur-[120px]" />
      <div className="absolute bottom-0 right-0 w-[350px] h-[350px] bg-[#EA4335]/20 rounded-full blur-[120px]" />

      <div className="relative max-w-5xl mx-auto px-6 sm:px-10 py-32">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9 }}
          className="relative bg-white/80 backdrop-blur-xl border border-gray-200 shadow-[0_8px_40px_rgba(0,0,0,0.08)] rounded-3xl p-12"
        >
          {/* Glass highlight */}
          <div className="absolute inset-0 pointer-events-none rounded-3xl bg-gradient-to-tr from-white/40 to-transparent" />

          {/* Header */}
          <div className="relative z-10 text-center flex flex-col items-center mb-10">
            <div className="w-40 h-20 bg-gray-200 rounded-xl shadow-sm flex items-center justify-center mb-6">
              <img src={client.logo} alt="logo" className="object-contain w-full h-full p-4" />
            </div>

            <h1 className="text-4xl font-extrabold text-gray-800 tracking-tight">
              {client.name}
            </h1>
            <p className="text-gray-600 max-w-2xl leading-relaxed mt-4">
              {client.description}
            </p>
          </div>

          {/* Partnership Block */}
          <motion.div
            initial={{ opacity: 0, y: 25 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.25, duration: 0.7 }}
            className="relative z-10 bg-white border border-gray-100 rounded-2xl p-8 shadow-inner"
          >
            <h2 className="text-2xl font-bold text-[#EA4335] mb-4">
              {client.partnership.title}
            </h2>
            <p className="text-gray-700 leading-relaxed mb-6">
              {client.partnership.details}
            </p>

            <ul className="space-y-4">
              {client.partnership.highlights.map((highlight, index) => (
                <motion.li
                  key={index}
                  initial={{ opacity: 0, x: -12 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.35 + index * 0.1 }}
                  className="flex items-start gap-3 text-gray-800"
                >
                  <CheckCircle2 className="w-5 h-5 text-[#34A853] mt-1" />
                  <span>{highlight}</span>
                </motion.li>
              ))}
            </ul>
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
}
