import { motion } from 'framer-motion';

// Brand images imports
import baileyMercer from '../../assets/bailey mercer.png';
import celvora from '../../assets/Celvora.png';
import customizology from '../../assets/customizology.jpg';
import donior from '../../assets/donior new logo  (1).png';
import glamboon from '../../assets/glamboon.jpg';
import gloet from '../../assets/Gloet.jpeg';
import htFinds from '../../assets/HT Finds.png';
import infiniteage from '../../assets/infiniteage.jpeg';
import lr from '../../assets/LR.jpeg';
import naturelox from '../../assets/naturelox.jpeg';
import neuroreform from '../../assets/neuroreform.jpg';
import novelle from '../../assets/Novelle.png';
import outdoorplay from '../../assets/outdoorplay.png';
import palm from '../../assets/Palm v2.png';
import sarwayush from '../../assets/sarwayush.jpeg';
import smartykat from '../../assets/smartykat.jpeg';
import ssLogo from '../../assets/ss logo bgr (1).jpg';
import techhunts from '../../assets/techhunts.jpg';
import valueMakers from '../../assets/Value makers .png';
import vikingbags from '../../assets/vikingbags.jpeg';
import xoegan from '../../assets/xoegan.png';
import zhanng from '../../assets/zhanng.jpg';

const BrandCarousel = () => {
  const brandImages = [
    baileyMercer,
    celvora,
    customizology,
    donior,
    glamboon,
    gloet,
    htFinds,
    infiniteage,
    lr,
    naturelox,
    neuroreform,
    novelle,
    outdoorplay,
    palm,
    sarwayush,
    smartykat,
    ssLogo,
    techhunts,
    valueMakers,
    vikingbags,
    xoegan,
    zhanng,
  ];

  return (
    <motion.section
      className="relative z-10 py-16 overflow-hidden bg-gradient-to-b from-transparent to-white/30"
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true, amount: 0.3 }}
      transition={{ duration: 0.8 }}
    >
      <div className="relative w-full">
        <div className="max-w-4xl mx-auto text-center mb-12 px-6">
          <p className="text-xs uppercase tracking-[0.4em] text-[#253E5C]/60">Partners</p>
          <h3 className="text-3xl md:text-4xl font-black text-[#253E5C] mt-2">
            Brands that trust Advertio
          </h3>
          <p className="text-[#253E5C]/70 mt-4">
            Forward-thinking companies collaborating with us on cinematic campaigns and measurable growth.
          </p>
        </div>
        <div className="overflow-hidden">
          <div className="flex animate-scroll group">
            {/* First set of brands */}
            {brandImages.map((brand, index) => (
              <div
                key={`brand-1-${index}`}
                className="flex-shrink-0 mx-6 md:mx-8 flex items-center justify-center"
                style={{ width: '180px', height: '100px' }}
              >
                <img
                  src={brand}
                  alt={`Brand ${index + 1}`}
                  className="max-w-full max-h-full object-contain transition-opacity duration-300 opacity-90"
                  loading="lazy"
                />
              </div>
            ))}
            {/* Duplicate set for seamless loop */}
            {brandImages.map((brand, index) => (
              <div
                key={`brand-2-${index}`}
                className="flex-shrink-0 mx-6 md:mx-8 flex items-center justify-center"
                style={{ width: '180px', height: '100px' }}
              >
                <img
                  src={brand}
                  alt={`Brand ${index + 1}`}
                  className="max-w-full max-h-full object-contain transition-opacity duration-300 opacity-90"
                  loading="lazy"
                />
              </div>
            ))}
          </div>
        </div>
      </div>
      <div className="pointer-events-none absolute inset-y-0 left-0 w-48 bg-gradient-to-r from-[#1f2f45]/40 via-[#1f2f45]/10 to-transparent blur-2xl opacity-80" />
      <div className="pointer-events-none absolute inset-y-0 right-0 w-48 bg-gradient-to-l from-[#1f2f45]/40 via-[#1f2f45]/10 to-transparent blur-2xl opacity-80" />
      <style>{`
        @keyframes scroll {
          0% {
            transform: translateX(0);
          }
          100% {
            transform: translateX(-50%);
          }
        }
        .animate-scroll {
          animation: scroll 50s linear infinite;
          display: flex;
          width: fit-content;
        }
        .animate-scroll:hover {
          animation-play-state: paused;
        }
      `}</style>
    </motion.section>
  );
};

export default BrandCarousel;

