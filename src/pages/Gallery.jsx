import React, { useState } from "react";
import { motion } from "framer-motion";
import SampleImg from "../assets/yoga.png";

const galleryData = {
  annual: [
    { id: 1, img: SampleImg, city: "City A" },
    { id: 2, img: SampleImg, city: "City B" },
    { id: 3, img: SampleImg, city: "City A" },
  ],
  quarterly: [
    { id: 4, img: SampleImg, city: "City C" },
    { id: 5, img: SampleImg, city: "City A" },
    { id: 6, img: SampleImg, city: "City B" },
  ],
  celebration: [
    { id: 7, img: SampleImg, city: "City C" },
    { id: 8, img: SampleImg, city: "City B" },
    { id: 9, img: SampleImg, city: "City A" },
  ],
  behindthescenes: [
    { id: 10, img: SampleImg, city: "City A" },
    { id: 11, img: SampleImg, city: "City C" },
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
  const [cityFilter, setCityFilter] = useState("All");
  const [lightbox, setLightbox] = useState(null);

  const filteredImages =
    cityFilter === "All"
      ? galleryData[activeTab]
      : galleryData[activeTab].filter((img) => img.city === cityFilter);

  return (
    <div className="bg-[#F8F5F2] pb-20">
      
      {/* Header with Gradient Background */}
      <div className="bg-white overflow-hidden relative">
        <div
          style={{
            position: "absolute",
            left: 0,
            right: 0,
            top: "-4rem",
            bottom: 0,
            background:
              "radial-gradient(circle at center, rgba(255,0,0,0.08), transparent 80%), radial-gradient(circle at bottom right, rgba(255,102,0,0.06), transparent 80%), radial-gradient(circle at top left, rgba(255,255,255,0.03), transparent 90%)",
          }}
        />

        <motion.div
          initial={{ opacity: 0, y: -30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: "easeOut" }}
          viewport={{ once: true }}
          className="text-center max-w-3xl mx-auto px-4 py-24 relative z-10"
        >
          <h1 className="text-3xl md:text-5xl font-extrabold text-[#0D1B2A]">
            <span className="text-[#C21807]">Event Highlights</span> Gallery
          </h1>
          <p className="mt-3 text-gray-600 text-base md:text-lg">
            Relive the energy, passion, and competition from our corporate tournaments.
          </p>
        </motion.div>
      </div>

      {/* Tabs */}
      <motion.div
        initial={{ opacity: 0, x: -30 }}
        whileInView={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.7, ease: "easeOut" }}
        viewport={{ once: true }}
        className="flex justify-start sm:justify-center gap-3 sm:gap-4 mb-8 sm:mb-10 overflow-x-auto whitespace-nowrap px-4 md:px-0 mt-10"
      >
        {Object.keys(tabLabels).map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`px-4 py-2 sm:px-6 sm:py-2 rounded-lg font-semibold border cursor-pointer transition flex-shrink-0 ${
              activeTab === tab
                ? "bg-[#C21807] text-white border-[#C21807]"
                : "text-[#0D1B2A] border-gray-300 hover:border-[#C21807] bg-white"
            }`}
          >
            {tabLabels[tab]}
          </button>
        ))}
      </motion.div>

      {/* Image Grid */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, ease: "easeOut" }}
        viewport={{ once: true }}
        className="max-w-7xl mx-auto grid grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-6 justify-center px-4 md:px-6 lg:px-20"
      >
        {filteredImages.map((item) => (
          <div
            key={item.id}
            onClick={() => setLightbox(item.img)}
            className="cursor-pointer border rounded-lg overflow-hidden group aspect-square bg-white shadow-md hover:shadow-lg transition-shadow duration-300"
          >
            <img
              src={item.img}
              alt="Event"
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
            />
          </div>
        ))}
      </motion.div>

      {/* Lightbox */}
      {lightbox && (
        <div
          onClick={() => setLightbox(null)}
          className="fixed inset-0 bg-black/80 flex justify-center items-center z-50 cursor-zoom-out p-4"
        >
          <img
            src={lightbox}
            alt="Zoom"
            className="max-h-[90vh] max-w-full rounded-lg"
          />
        </div>
      )}
    </div>
  );
};

export default GalleryPage;
