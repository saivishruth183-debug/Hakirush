import React, { useState, useEffect, useRef } from "react";
import { motion, useMotionValue, useSpring, useTransform, useScroll } from "framer-motion";
import { 
  Camera, Sparkles, X, Star, Trophy, Activity, 
  Target, CircleDot, Dumbbell, Flag, Zap, Play 
} from "lucide-react";
import backgroundImage from "../assets/Hero/Backimage.png";

// Import your assets
import Cricket from "../assets/Gallery/Annual/Cricket.mp4";
import Badminton from "../assets/Gallery/Annual/Badminton.mp4";
import Basketball from "../assets/Gallery/Quarterly/basketball.png";
import Ground from "../assets/Gallery/Quarterly/ground.png";
import Batemention from "../assets/Gallery/Quarterly/batemention.png";
import Celebration1 from "../assets/Gallery/Celebration/celeb1.JPG";
import Celebration2 from "../assets/Gallery/Celebration/celeb2.JPG";
import Celebration3 from "../assets/Gallery/Celebration/celeb3.JPG";
import Celebration4 from "../assets/Gallery/Celebration/celeb4.JPG";
import Behind1 from "../assets/Gallery/BehindTheSceans/behind1.JPG";
import Behind2 from "../assets/Gallery/BehindTheSceans/behind2.JPG";
import Behind3 from "../assets/Gallery/BehindTheSceans/behind3.JPG";
import VideoThumbnail1 from "../assets/Pilot/Video 1.mp4";

// --- BACKGROUND SUB-COMPONENT ---
const ContinuousSportsBackground = () => {
  const row1 = [Trophy, Activity, Target, CircleDot, Star, Dumbbell];
  const row2 = [Flag, Zap, Trophy, Activity, Target, Star];

  return (
    <div className="fixed inset-0 overflow-hidden pointer-events-none -z-20">
      <div className="absolute top-[-10%] left-[-10%] w-[60%] h-[60%] bg-red-100/60 blur-[120px] rounded-full" />
      <div className="absolute bottom-[-10%] right-[-10%] w-[50%] h-[50%] bg-red-50/80 blur-[120px] rounded-full" />
      <div className="flex absolute top-[10%] opacity-[0.04]">
        <motion.div initial={{ x: 0 }} animate={{ x: "-100%" }} transition={{ duration: 40, repeat: Infinity, ease: "linear" }} className="flex gap-24 pr-24 whitespace-nowrap">
          {row1.map((Icon, i) => <Icon key={i} size={70} className="text-red-900" strokeWidth={1} />)}
          {row1.map((Icon, i) => <Icon key={`dup-${i}`} size={70} className="text-red-900" strokeWidth={1} />)}
        </motion.div>
      </div>
      <div className="flex absolute top-[40%] opacity-[0.03]">
        <motion.div initial={{ x: "-100%" }} animate={{ x: 0 }} transition={{ duration: 50, repeat: Infinity, ease: "linear" }} className="flex gap-32 pr-32 whitespace-nowrap">
          {row2.map((Icon, i) => <Icon key={i} size={100} className="text-red-900" strokeWidth={0.5} />)}
          {row2.map((Icon, i) => <Icon key={`dup-${i}`} size={100} className="text-red-900" strokeWidth={0.5} />)}
        </motion.div>
      </div>
      <div className="flex absolute top-[70%] opacity-[0.04]">
        <motion.div initial={{ x: 0 }} animate={{ x: "-100%" }} transition={{ duration: 35, repeat: Infinity, ease: "linear" }} className="flex gap-20 pr-20 whitespace-nowrap">
          {row1.map((Icon, i) => <Icon key={i} size={80} className="text-red-900" strokeWidth={0.8} />)}
          {row1.map((Icon, i) => <Icon key={`dup-${i}`} size={80} className="text-red-900" strokeWidth={0.8} />)}
        </motion.div>
      </div>
      <div className="absolute inset-0 pointer-events-none" style={{
        background: "radial-gradient(circle at center, transparent 0%, rgba(255,255,255,0.2) 60%, rgba(255,255,255,0.7) 100%)"
      }} />
    </div>
  )
}

const ParallaxImageBackground = ({ image }) => {
  const containerRef = useRef(null);
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const springConfig = { damping: 30, stiffness: 80, mass: 0.6 };
  const smoothX = useSpring(mouseX, springConfig);
  const smoothY = useSpring(mouseY, springConfig);
  const translateX = useTransform(smoothX, [-1, 1], [-30, 30]);
  const translateY = useTransform(smoothY, [-1, 1], [-20, 20]);
  const scale = useTransform(smoothX, [-1, 1], [1.08, 1.12]);
  const { scrollY } = useScroll();
  const scrollTranslateY = useTransform(scrollY, [0, 1500], [0, 150]);

  useEffect(() => {
    const handleMouseMove = (e) => {
      const x = (e.clientX / window.innerWidth) * 2 - 1;
      const y = (e.clientY / window.innerHeight) * 2 - 1;
      mouseX.set(x);
      mouseY.set(y);
    };
    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, [mouseX, mouseY]);

  return (
    <div ref={containerRef} className="fixed left-0 w-full overflow-hidden -z-10" style={{ top: "-10vh", height: "130vh" }}>
      <motion.img
        src={image}
        alt=""
        style={{ x: translateX, y: useTransform([translateY, scrollTranslateY], ([ty, sy]) => ty + sy), scale }}
        className="w-full h-full object-cover object-center will-change-transform"
        transition={{ type: "tween" }}
      />
      <div className="absolute inset-0 bg-slate-950/40 mix-blend-multiply" />
    </div>
  );
};

const galleryData = {
  annual: [
    { id: 1, type: "video", img: Cricket, city: "City A", },
    { id: 2, type: "video", img: Badminton, city: "City A", },
  ],
  quarterly: [
    { id: 4, type: "image", img: Basketball, city: "City C" },
    { id: 5, type: "image", img: Ground, city: "City A" },
    { id: 6, type: "image", img: Batemention, city: "City B" },
  ],
  celebration: [
    { id: 7, type: "image", img: Celebration1, city: "City C" },
    { id: 8, type: "image", img: Celebration2, city: "City B" },
    { id: 9, type: "image", img: Celebration3, city: "City C" },
    { id: 13, type: "image", img: Celebration4, city: "City A" },
  ],
  behindthescenes: [
    { id: 10, type: "image", img: Behind1, city: "City A" },
    { id: 11, type: "image", img: Behind2, city: "City B" },
    { id: 12, type: "image", img: Behind3, city: "City C" },
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
  const [cityFilter] = useState("All");
  const [lightbox, setLightbox] = useState(null);

  const filteredImages =
    cityFilter === "All"
      ? galleryData[activeTab]
      : galleryData[activeTab].filter((img) => img.city === cityFilter);

  return (
    <div className="relative overflow-hidden min-h-screen">
      <ContinuousSportsBackground />
      <ParallaxImageBackground image={backgroundImage} />

      <div className="relative z-10">
        <section className="relative pt-20 pb-8">
          <motion.div initial={{ opacity: 0, y: -40 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }} className="text-center max-w-4xl mx-auto px-6">
            <div className="inline-flex items-center gap-1.5 sm:gap-2 px-5 py-2.5 rounded-full bg-slate-900/80 border border-slate-700 shadow-lg backdrop-blur-sm mb-6">
              <Camera className="w-4 h-4 text-red-500" />
              <span className="text-sm font-bold text-slate-200">Visual Memories</span>
            </div>
            <div className="flex items-center justify-center gap-4 mb-6">
              <div className="inline-flex items-center justify-center w-16 h-16 rounded-3xl bg-red-600 shadow-2xl shrink-0">
                <Sparkles className="w-6 h-6 text-white" />
              </div>
              <h1 className="text-3xl sm:text-4xl md:text-5xl font-black text-white tracking-tight">
                Event <span className="text-red-500">Gallery</span>
              </h1>
            </div>
            <p className="text-sm sm:text-base md:text-lg text-slate-300 leading-relaxed max-w-3xl mx-auto font-medium">
              Relive the energy, passion, and competition from our corporate tournaments through stunning visual moments.
            </p>
          </motion.div>
        </section>

        <section className="py-12">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }} viewport={{ once: true }} className="max-w-7xl mx-auto px-6">
            <div className="flex flex-wrap justify-center gap-3 sm:gap-4">
              {Object.keys(tabLabels).map((tab) => (
                <motion.button
                  key={tab}
                  whileHover={{ scale: 1.05, y: -2 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => setActiveTab(tab)}
                  className={`px-4 py-2 sm:px-6 sm:py-3 rounded-lg text-sm sm:text-base font-semibold border-2 cursor-pointer transition-all duration-300 shadow-md ${
                    activeTab === tab
                      ? "bg-red-600 text-white border-transparent shadow-lg shadow-red-600/30"
                      : "text-slate-300 border-slate-700 hover:border-red-500 bg-slate-800/80 backdrop-blur-sm"
                  }`}
                >
                  {tabLabels[tab]}
                </motion.button>
              ))}
            </div>
          </motion.div>
        </section>

        <section className="py-12">
          <div className="max-w-7xl mx-auto px-6">
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
              {filteredImages.map((item, idx) => {
                const isVideo = item.type === "video";

                return (
                  <motion.div
                    key={item.id}
                    initial={{ opacity: 0, scale: 0.9 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    transition={{ delay: idx * 0.05 }}
                    viewport={{ once: true }}
                    whileHover={{ y: -8 }}
                    onClick={() => setLightbox(item)}
                    className="group relative cursor-pointer rounded-2xl overflow-hidden aspect-square bg-slate-800 shadow-xl border border-slate-800/50"
                  >
                    {/* FIXED: Removed autoPlay so card is a static, paused preview frame */}
                    {isVideo ? (
                      <video
                        src={item.img}
                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700 relative z-0"
                        preload="metadata"
                        muted
                        playsInline
                      />
                    ) : (
                      <img
                        src={item.img}
                        alt="Gallery Grid item"
                        loading="lazy"
                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                      />
                    )}
                    <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center z-10">
                      {isVideo ? (
                        <Play className="w-8 h-8 text-white" fill="currentColor" />
                      ) : (
                        <Camera className="w-8 h-8 text-white" />
                      )}
                    </div>
                  </motion.div>
                );
              })}
            </div>
          </div>
        </section>
      </div>

      <div className="relative z-10 px-6 py-16">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-black text-white tracking-tight">
            Our Pilot Event <span className="text-red-500">Highlight</span>
          </h2>
          <p className="mt-4 max-w-3xl text-slate-300 leading-relaxed">
            Watch the highlights from our pilot event below. The video captures the best moments from the opening showcase.
          </p>
          <section className="py-12">
            <div className="mx-auto max-w-4xl overflow-hidden rounded-[28px] shadow-2xl border border-slate-700">
              <video src={VideoThumbnail1} controls className="w-full h-auto max-h-[620px]" poster="">
                Your browser does not support the video tag.
              </video>
            </div>
          </section>
        </div>
      </div>

      {lightbox && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="fixed inset-0 bg-black/95 backdrop-blur-sm flex justify-center items-center z-50 p-4"
          onClick={() => setLightbox(null)}
        >
          <button className="absolute top-6 right-6 text-white bg-white/10 p-3 rounded-full hover:bg-white/20 transition-colors">
            <X />
          </button>
          {/* Lightbox plays the video immediately on opening */}
          {lightbox.type === "video" ? (
            <motion.video
              initial={{ scale: 0.8 }}
              animate={{ scale: 1 }}
              src={lightbox.img}
              controls
              autoPlay
              playsInline
              className="max-h-[90vh] max-w-[90vw] rounded-2xl shadow-2xl"
              onClick={(e) => e.stopPropagation()}
            />
          ) : (
            <motion.img
              initial={{ scale: 0.8 }}
              animate={{ scale: 1 }}
              src={lightbox.img}
              className="max-h-[90vh] max-w-[90vw] rounded-2xl shadow-2xl"
              onClick={(e) => e.stopPropagation()}
            />
          )}
        </motion.div>
      )}
    </div>
  );
};

export default GalleryPage;