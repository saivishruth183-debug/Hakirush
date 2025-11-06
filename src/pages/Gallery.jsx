import React, { useState } from "react";
import SampleImg from "../assets/yoga.jpg"; // replace with real images

const galleryData = {
  annual: [
    { id: 1, city: "Bangalore", img: SampleImg },
    { id: 2, city: "Hyderabad", img: SampleImg },
    { id: 3, city: "Bangalore", img: SampleImg },
  ],
  quarterly: [
    { id: 4, city: "Bangalore", img: SampleImg },
    { id: 5, city: "Hyderabad", img: SampleImg },
    { id: 6, city: "Hyderabad", img: SampleImg },
  ],
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
    <div className="bg-white pt-24 pb-32">
      
      {/* Header */}
      <div className="text-center max-w-3xl mx-auto px-4 mb-12">
        <h1 className="text-4xl md:text-5xl font-extrabold text-[#0D1B2A]">
          📸 <span className="text-[#C21807]">Event Highlights</span> Gallery
        </h1>
        <p className="mt-4 text-gray-600 text-lg">
          Relive the energy, passion, and competition from our corporate tournaments.
        </p>
      </div>

      {/* Tabs */}
      <div className="flex justify-center gap-4 mb-10">
        {["annual", "quarterly"].map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`px-6 py-2 rounded-lg font-semibold border ${
              activeTab === tab
                ? "bg-[#C21807] text-white border-[#C21807]"
                : "text-[#0D1B2A] border-gray-300 hover:border-[#C21807]"
            } transition`}
          >
            {tab === "annual" ? "Annual Package" : "Quarterly Package"}
          </button>
        ))}
      </div>

      {/* City Filter */}
      <div className="flex justify-center gap-4 mb-12">
        {["All", "Bangalore", "Hyderabad"].map((city) => (
          <button
            key={city}
            onClick={() => setCityFilter(city)}
            className={`px-4 py-1 rounded-md text-sm border ${
              cityFilter === city
                ? "border-[#C21807] text-[#C21807] font-semibold"
                : "border-gray-300 text-gray-600"
            }`}
          >
            {city}
          </button>
        ))}
      </div>

      {/* Image Grid */}
      <div className="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-6 px-6 md:px-20">
        {filteredImages.map((item) => (
          <div
            key={item.id}
            onClick={() => setLightbox(item.img)}
            className="cursor-pointer border border-[#C21807] rounded-lg overflow-hidden group"
          >
            <img
              src={item.img}
              alt="Event"
              className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-500"
            />
          </div>
        ))}
      </div>

      {/* CTA */}
      <div className="text-center mt-16">
        <a
          href="/highlights"
          className="px-10 py-3 text-white font-semibold rounded-lg bg-gradient-to-r from-[#C21807] to-[#870B00] hover:scale-105 transition"
        >
          View More Highlights
        </a>
      </div>

      {/* Lightbox Modal */}
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
