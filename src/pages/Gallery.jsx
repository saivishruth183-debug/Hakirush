import React, { useState } from "react";
// eslint-disable-next-line no-unused-vars
import { motion } from "framer-motion";
import { Camera, Sparkles, X } from "lucide-react";
import Cricket from "../assets/Gallery/Annual/cricket.png";
import Marathon from "../assets/Gallery/Annual/marathon.png";
import Table from "../assets/Gallery/Annual/tabletennis.png";
import Basketball from "../assets/Gallery/Quarterly/basketball.png";
import Ground from "../assets/Gallery/Quarterly/ground.png";
import Batemention from "../assets/Gallery/Quarterly/batemention.png";
import Celebration1 from "../assets/Gallery/Celebration/celeb1.png";
import Celebration2 from "../assets/Gallery/Celebration/celeb2.png";
import Behind1 from "../assets/Gallery/BehindTheSceans/behind1.png";
import Behind2 from "../assets/Gallery/BehindTheSceans/behind2.png";


const galleryData = {
  annual: [
    { id: 1, img: Cricket, city: "City A" },
    { id: 2, img: Marathon, city: "City B" },
    { id: 3, img: Table, city: "City A" },
  ],
  quarterly: [
    { id: 4, img: Basketball, city: "City C" },
    { id: 5, img: Ground, city: "City A" },
    { id: 6, img: Batemention, city: "City B" },
  ],
  celebration: [
    { id: 7, img: Celebration1, city: "City C" },
    { id: 8, img: Celebration2, city: "City B" },
  ],
  behindthescenes: [
    { id: 10, img: Behind1, city: "City A" },
    { id: 11, img: Behind2, city: "City C" },
  ],
};

const tabLabels = {
  annual: "Annual Package",
  quarterly: "Quarterly Package",
  celebration: "Celebration",
  behindthescenes: "Behind The Scenes",
};

const GalleryPage = () => {
  const [activeTab, setActiveTab] = useState("annual");
  // eslint-disable-next-line no-unused-vars
  const [cityFilter, setCityFilter] = useState("All");
  const [lightbox, setLightbox] = useState(null);

  const filteredImages =
    cityFilter === "All"
      ? galleryData[activeTab]
      : galleryData[activeTab].filter((img) => img.city === cityFilter);

  return (
    <div className="bg-white overflow-hidden">
      
      {/* Header with Premium Design */}
      <section className="relative pt-20 pb-8 overflow-hidden bg-white">

        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center max-w-4xl mx-auto px-6 relative z-10"
        >
          {/* Badge */}
          <div className="inline-flex items-center gap-1.5 sm:gap-2 px-3 py-2 sm:px-5 sm:py-2.5 rounded-full bg-gradient-to-r from-[#C21807]/10 to-[#A01506]/10 border border-[#C21807]/30 shadow-lg backdrop-blur-sm mb-6">
            <Camera className="w-4 h-4 text-[#C21807]" />
            <span className="text-sm font-bold text-[#C21807]">Visual Memories</span>
          </div>

          {/* Icon and Title in Row */}
          <div className="flex items-center justify-center gap-4 mb-6">
            <div className="inline-flex items-center justify-center w-16 h-16 rounded-3xl bg-gradient-to-r from-[#C21807] to-[#A01506] shadow-2xl shrink-0">
              <Sparkles className="w-6 h-6 text-white" />
            </div>
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-black text-gray-900 tracking-tight">
              Event{" "}
              <span className="bg-gradient-to-r from-[#C21807] via-[#A01506] to-[#C21807] bg-clip-text text-transparent drop-shadow-sm">
                Gallery
              </span>
            </h1>
          </div>

          <p className="text-sm sm:text-base md:text-lg text-gray-700 leading-relaxed max-w-3xl mx-auto font-medium">
            Relive the energy, passion, and competition from our corporate tournaments through stunning visual moments.
          </p>
        </motion.div>
      </section>

      {/* Tabs Section */}
      <section className="py-12 bg-white relative overflow-hidden">

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="max-w-7xl mx-auto px-6 relative z-10"
        >
          {/* Section Header */}
          <div className="text-center mb-8">
            <div className="inline-flex items-center gap-1.5 sm:gap-2 px-3 py-2 sm:px-5 sm:py-2.5 rounded-full bg-gradient-to-r from-[#C21807]/10 to-[#A01506]/10 border border-[#C21807]/30 shadow-lg backdrop-blur-sm mb-4">
              <Sparkles className="w-4 h-4 text-[#C21807]" />
              <span className="text-sm font-bold text-[#C21807]">Browse Collections</span>
            </div>
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-black text-gray-900">
              Explore{" "}
              <span className="bg-gradient-to-r from-[#C21807] via-[#A01506] to-[#C21807] bg-clip-text text-transparent drop-shadow-sm">
                Event Categories
              </span>
            </h2>
          </div>

          <div className="flex flex-wrap justify-center gap-3 sm:gap-4">
            {Object.keys(tabLabels).map((tab, idx) => (
              <motion.button
                key={tab}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ delay: idx * 0.1 }}
                viewport={{ once: true }}
                whileHover={{ scale: 1.05, y: -2 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => setActiveTab(tab)}
                className={`px-4 py-2 sm:px-6 sm:py-3 rounded-lg text-sm sm:text-base font-semibold border-2 cursor-pointer transition-all duration-300 shrink-0 shadow-md focus:outline-none focus-visible:ring-4 focus-visible:ring-[#C21807]/20 hover:shadow-[0_12px_35px_rgba(248,113,113,0.25)] ${
                  activeTab === tab
                    ? "bg-[#C21807] text-white border-transparent shadow-lg shadow-[#C21807]/30"
                    : "text-gray-700 border-gray-200 hover:border-[#C21807] bg-white hover:shadow-lg"
                }`}
              >
                {tabLabels[tab]}
              </motion.button>
            ))}
          </div>
        </motion.div>
      </section>

      {/* Image Grid */}
      <section className="py-12 relative overflow-hidden">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          viewport={{ once: true }}
          className="max-w-7xl mx-auto px-6 relative z-10"
        >
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {filteredImages.map((item, idx) => (
              <motion.div
                key={item.id}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ delay: idx * 0.05, duration: 0.5 }}
                viewport={{ once: true }}
                whileHover={{ y: -8, scale: 1.02 }}
                onClick={() => setLightbox(item.img)}
                onKeyPress={(e) => e.key === 'Enter' && setLightbox(item.img)}
                role="button"
                tabIndex={0}
                aria-label={`View ${tabLabels[activeTab]} image ${item.id}`}
                className="group relative cursor-pointer rounded-2xl overflow-hidden aspect-square bg-white shadow-xl hover:shadow-[0_12px_35px_rgba(248,113,113,0.45)] transition-all duration-500"
              >
                {/* Image */}
                <img
                  src={item.img}
                  alt={`${tabLabels[activeTab]} event in ${item.city}`}
                  loading="lazy"
                  className="w-full h-full object-cover object-center group-hover:scale-110 transition-transform duration-700"
                />
                
                {/* Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/0 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                
                {/* Hover Icon */}
                <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-500">
                  <div className="w-16 h-16 rounded-full bg-white/90 backdrop-blur-sm flex items-center justify-center transform scale-75 group-hover:scale-100 transition-transform duration-500">
                    <Camera className="w-8 h-8 text-[#C21807]" />
                  </div>
                </div>

                {/* Border Glow Effect */}
                <div className="absolute inset-0 rounded-2xl border-2 border-transparent group-hover:border-[#C21807]/50 transition-colors duration-500 pointer-events-none" />
              </motion.div>
            ))}
          </div>
        </motion.div>
      </section>

      {/* Premium Lightbox */}
      {lightbox && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={() => setLightbox(null)}
          className="fixed inset-0 bg-black/95 backdrop-blur-sm flex justify-center items-center z-50 cursor-zoom-out p-4"
        >
          {/* Close Button */}
          <motion.button
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.2 }}
            onClick={() => setLightbox(null)}
            className="absolute top-6 right-6 w-12 h-12 rounded-full bg-white/10 backdrop-blur-md border border-white/20 flex items-center justify-center hover:bg-[#C21807] transition-colors z-10"
          >
            <X className="w-6 h-6 text-white" />
          </motion.button>

          {/* Image with Animation */}
          <motion.img
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.3 }}
            src={lightbox}
            alt="Full size view"
            className="max-h-[90vh] max-w-[90vw] rounded-2xl shadow-2xl"
          />

          {/* Decorative Elements */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-gradient-to-br from-[#C21807]/20 to-[#A01506]/20 rounded-full blur-3xl pointer-events-none" />
        </motion.div>
      )}
    </div>
  );
};

export default GalleryPage;
