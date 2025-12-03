import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import favicon from '../../assets/favicon.JPG';

const GetAQuoteSection = () => {
  const sectionRef = useRef(null);
  const isInView = useInView(sectionRef, { once: true, amount: 0.2 });

  return (
    <motion.section
      ref={sectionRef}
      className="relative z-10 pt-24 pb-8 overflow-visible bg-transparent w-full"
      initial={{ opacity: 0 }}
      animate={isInView ? { opacity: 1 } : { opacity: 0 }}
      transition={{ duration: 0.6 }}
    >
      <div className="relative w-full px-6 md:px-8 lg:px-12 max-w-7xl mx-auto">
        {/* Section Header */}
        <motion.div
          className="text-center mb-6 max-w-4xl mx-auto"
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          <motion.h3
            className="text-4xl md:text-5xl lg:text-6xl font-black text-[#253E5C] mb-4"
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ duration: 0.6, delay: 0.3 }}
          >
            <div className="flex flex-col items-center gap-2">
              <span>Ready to Transform</span>
              <span className="bg-gradient-to-r from-primary via-[#ff6b4a] to-primary bg-clip-text text-transparent">
                Your Business?
              </span>
            </div>
          </motion.h3>
          <motion.p
            className="text-[#253E5C]/70 text-lg md:text-xl max-w-3xl mx-auto leading-relaxed font-medium"
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ duration: 0.6, delay: 0.4 }}
          >
            Let's discuss how we can help grow your business. Get a personalized quote tailored to your needs.
          </motion.p>
        </motion.div>

        {/* Dolphin and Ball Button Container - Desktop Only */}
        <motion.div
          className="hidden md:flex relative items-center justify-center min-h-[350px]"
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.6, delay: 0.5 }}
        >
          <div className="relative z-10">
            <div className="relative">
              <img
                src={favicon}
                alt="Dolphin"
                className="w-64 md:w-80 h-auto object-contain relative z-10"
                loading="lazy"
              />
              
              {/* Ball Button */}
              <motion.button
                className="absolute z-20 rounded-full bg-gradient-to-br from-primary via-[#ff6b4a] to-[#e94f37] text-white font-bold text-xs md:text-sm px-3 py-2 md:px-4 md:py-2.5 border-2 border-white/30 cursor-pointer flex items-center justify-center"
                style={{
                  left: 'calc(21% - 40px)',
                  bottom: '204px',
                  width: '100px',
                  height: '100px',
                }}
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
              >
                <span className="text-center leading-tight font-extrabold whitespace-nowrap">
                  Get a Quote
                </span>
              </motion.button>
            </div>
          </div>
        </motion.div>
      </div>

      {/* Mobile Dolphin and Ball Button Container */}
      <motion.div
        className="md:hidden relative flex flex-col items-center justify-center mt-12 pt-8 pb-4"
        initial={{ opacity: 0, y: 20 }}
        animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
        transition={{ duration: 0.6, delay: 0.5 }}
      >
        <div className="relative z-10">
          <div className="relative">
            <img
              src={favicon}
              alt="Dolphin"
              className="w-48 h-auto object-contain relative z-10"
              loading="lazy"
            />
            
            {/* Mobile Ball Button */}
            <motion.button
              className="absolute z-20 rounded-full bg-gradient-to-br from-primary via-[#ff6b4a] to-[#e94f37] text-white font-bold text-xs px-3 py-2 border-2 border-white/30 cursor-pointer flex items-center justify-center shadow-lg"
              style={{
                left: 'calc(18% - 35px)',
                bottom: '125px',
                width: '85px',
                height: '85px',
              }}
              whileTap={{ scale: 0.9 }}
            >
              <span className="text-center leading-tight font-extrabold whitespace-nowrap relative z-10 text-[10px]">
                Get a Quote
              </span>
            </motion.button>
          </div>
        </div>
      </motion.div>

      {/* Background Decorative Elements - Static */}
      <div className="absolute top-0 left-0 w-[600px] h-[600px] bg-gradient-to-br from-primary/8 to-transparent rounded-full blur-2xl -z-10 opacity-30" />
      <div className="absolute bottom-0 right-0 w-[600px] h-[600px] bg-gradient-to-tl from-[#253E5C]/8 to-transparent rounded-full blur-2xl -z-10 opacity-30" />
    </motion.section>
  );
};

export default GetAQuoteSection;

