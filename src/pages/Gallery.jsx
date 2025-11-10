import React, { useState } from "react";
import { motion } from "framer-motion";
import SampleImg from "../assets/yoga.png"; // replace with real images

const galleryData = {
  annual: [
    { id: 1, img: SampleImg },
    { id: 2, img: SampleImg },
    { id: 3, img: SampleImg },
  ],
  quarterly: [
    { id: 4, img: SampleImg },
    { id: 5, img: SampleImg },
    { id: 6, img: SampleImg },
  ],
  celebration: [
    { id: 7, img: SampleImg },
    { id: 8, img: SampleImg },
    { id: 9, img: SampleImg },
  ],
  behindthescenes: [
    { id: 10, img: SampleImg },
    { id: 11, img: SampleImg },
    { id: 12, img: SampleImg },
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
    <div className="bg-[#F8F5F2] py-15">

      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: -30 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, ease: "easeOut" }}
        viewport={{ once: true }}
        className="text-center max-w-3xl mx-auto px-4 mb-12"
      >
        <h1 className="text-4xl md:text-5xl font-extrabold text-[#0D1B2A]">
          <span className="text-[#C21807]">Event Highlights</span> Gallery
        </h1>
        <p className="mt-4 text-gray-600 text-lg">
          Relive the energy, passion, and competition from our corporate tournaments.
        </p>
      </motion.div>

      {/* Tabs */}
      <motion.div
        initial={{ opacity: 0, x: -30 }}
        whileInView={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.7, ease: "easeOut" }}
        viewport={{ once: true }}
        className="flex justify-center gap-4 mb-10"
      >
        {Object.keys(tabLabels).map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`px-6 py-2 rounded-lg font-semibold border cursor-pointer transition ${
              activeTab === tab
                ? "bg-[#C21807] text-white border-[#C21807]"
                : "text-[#0D1B2A] border-gray-300 hover:border-[#C21807]"
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
        className="max-w-7xl mx-auto grid grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-6 justify-center px-6 md:px-20"
      >
        {filteredImages.map((item) => (
          <div
            key={item.id}
            onClick={() => setLightbox(item.img)}
            className="cursor-pointer border border-[#C21807] rounded-lg overflow-hidden group aspect-square bg-white"
          >
            <img
              src={item.img}
              alt="Event"
              className="w-full h-full object-contain group-hover:scale-105 transition-transform duration-500"
            />
          </div>
        ))}
      </motion.div>


      {/* Lightbox */}
      {lightbox && (
        <div
          onClick={() => setLightbox(null)}
          className="fixed inset-0 bg-black/70 flex justify-center items-center z-50 cursor-zoom-out"
        >
          <img src={lightbox} alt="Zoom" className="max-h-[85vh] rounded-lg" />
        </div>
      )}
    </div>
  );
};

export default GalleryPage;
