'use client'

import { useRef } from 'react';
import { motion, AnimatePresence, useInView } from 'framer-motion';
import { useRouter } from 'next/router';
import { servicesList } from './constants';

const ServicesSection = ({ expanded, setExpanded }) => {
  const sectionRef = useRef(null);
  const isInView = useInView(sectionRef, { once: true, amount: 0.2 });
  const router = useRouter();

  const handleServiceClick = (serviceId) => {
    router.push(`/services/${serviceId}`);
  };

  return (
    <motion.section
      ref={sectionRef}
      className="relative z-10 px-3 sm:px-4 md:px-6 py-12 sm:py-16 md:py-24 overflow-hidden w-full"
      initial={{ opacity: 0 }}
      animate={isInView ? { opacity: 1 } : { opacity: 0 }}
      transition={{ duration: 0.8 }}
    >
      <div className="relative max-w-[1500px] mx-auto w-full">
        <motion.div
          className="relative rounded-[20px] sm:rounded-[24px] md:rounded-[32px] p-[2px] bg-gradient-to-r from-[#253E5C] via-primary to-[#ff7b5f] shadow-lg sm:shadow-xl md:shadow-2xl w-full"
          initial={{ opacity: 0, scale: 0.95, y: 40 }}
          whileInView={{ opacity: 1, scale: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
        >
          <div className="rounded-[18px] sm:rounded-[22px] md:rounded-[30px] bg-white/70 backdrop-blur-2xl border border-white/40 p-4 sm:p-6 md:p-8 lg:p-10 w-full">
            <motion.div
              className="text-center mb-6 sm:mb-8 md:mb-10 lg:mb-12"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              <motion.p
                className="text-xs sm:text-sm uppercase tracking-[0.2em] sm:tracking-[0.3em] md:tracking-[0.4em] text-[#253E5C]/70 mb-2 sm:mb-3 md:mb-4"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.2 }}
                transition={{ duration: 0.5, delay: 0.3 }}
              >
                Signature Services
              </motion.p>
              <motion.h3
                className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-extrabold text-[#253E5C] px-1"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.2 }}
                transition={{ duration: 0.6, delay: 0.4 }}
              >
                Marketing Engines That Move Audiences
              </motion.h3>
            </motion.div>

            <div className="grid gap-3 sm:gap-4 md:gap-5 lg:gap-6 md:grid-cols-2 lg:grid-cols-3 w-full">
              {servicesList.slice(0, 6).map((service, index) => (
                <motion.div
                  key={service.title}
                  className="service-card group rounded-xl sm:rounded-2xl md:rounded-3xl border border-[#253E5C]/10 bg-white/90 p-3 sm:p-4 md:p-5 lg:p-6 shadow-md sm:shadow-lg hover:border-primary/30 cursor-pointer w-full transition-all duration-300 hover:shadow-lg"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, amount: 0.2 }}
                  transition={{
                    duration: 0.6,
                    delay: index * 0.1,
                  }}
                  onClick={() => handleServiceClick(service.id)}
                >
                  <div className="service-card-content">
                    <h4 className="text-base sm:text-lg md:text-xl font-semibold text-[#253E5C] mb-2 sm:mb-2.5 md:mb-3 transition-colors duration-300 group-hover:text-primary">
                      {service.title}
                    </h4>
                    <p className="text-xs sm:text-sm md:text-base text-[#253E5C]/70 leading-relaxed font-medium transition-colors duration-300">{service.desc}</p>
                  </div>
                </motion.div>
              ))}
              
              <AnimatePresence>
                {expanded && servicesList.slice(6).map((service, index) => (
                  <motion.div
                    key={service.title}
                    className="service-card group rounded-xl sm:rounded-2xl md:rounded-3xl border border-[#253E5C]/10 bg-white/90 p-3 sm:p-4 md:p-5 lg:p-6 shadow-md sm:shadow-lg hover:border-primary/30 cursor-pointer w-full transition-all duration-300 hover:shadow-lg"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 20 }}
                    transition={{ 
                      duration: 0.5,
                      delay: index * 0.1
                    }}
                    onClick={() => handleServiceClick(service.id)}
                  >
                    <div className="service-card-content">
                      <h4 className="text-base sm:text-lg md:text-xl font-semibold text-[#253E5C] mb-2 sm:mb-2.5 md:mb-3 transition-colors duration-300 group-hover:text-primary">
                        {service.title}
                      </h4>
                      <p className="text-xs sm:text-sm md:text-base text-[#253E5C]/70 leading-relaxed font-medium transition-colors duration-300">{service.desc}</p>
                    </div>
                  </motion.div>
                ))}
              </AnimatePresence>
            </div>

            <motion.div
              className="text-center mt-6 sm:mt-8 md:mt-10"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.6, delay: 1.1 }}
            >
              <motion.button
                onClick={() => setExpanded((prev) => !prev)}
                className="px-6 sm:px-8 md:px-10 py-2.5 sm:py-3 md:py-4 rounded-full border-2 border-primary text-primary text-sm sm:text-base font-semibold hover:bg-primary/10 transition-colors flex items-center gap-2 mx-auto"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                {expanded ? (
                  <>
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 15l7-7 7 7" />
                    </svg>
                    Show Less
                  </>
                ) : (
                  <>
                    Show More Services
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                    </svg>
                  </>
                )}
              </motion.button>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </motion.section>
  );
};

export default ServicesSection;

