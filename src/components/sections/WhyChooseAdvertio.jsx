'use client'

import { useRef, useState } from 'react';
import { motion, AnimatePresence, useInView } from 'framer-motion';

const WhyChooseAdvertio = () => {
  const sectionRef = useRef(null);
  const isInView = useInView(sectionRef, { once: true, amount: 0.2 });
  const [expandedCardIndex, setExpandedCardIndex] = useState(null);

  const features = [
    {
      title: 'Measurable Results That Drive Growth',
      description: 'Our data-driven approach ensures your campaigns are constantly optimized for maximum impact.',
    },
    {
      title: 'Deep Industry Expertise & Proven Strategies',
      description: 'We understand the unique challenges and opportunities faced by e-commerce brands.',
    },
    {
      title: 'Transparency & Trustworthy Partnership',
      description: 'We provide clear, actionable reports that track your progress and demonstrate the return on investment (ROI).',
    },
    {
      title: 'Integrated Marketing Solutions',
      description: 'We offer comprehensive digital marketing services under one roof, including SEO, PPC, content marketing, and social media.',
    },
    {
      title: 'Conversion-Focused Optimization',
      description: 'Our Conversion Rate Optimization (CRO) experts meticulously analyze your website, optimizing every step of the customer journey.',
    },
    {
      title: 'Client-Centric Approach',
      description: 'We take the time to understand your unique business goals and challenges, tailoring our strategies to meet your specific needs.',
    },
    {
      title: 'Future-Proof Marketing',
      description: 'Our team stays at the forefront of the latest trends and technologies, ensuring your marketing strategy is always optimized for success in a dynamic environment.',
    },
    {
      title: 'Scalable Growth',
      description: 'As you grow, we\'ll adapt and scale your marketing strategy to meet your evolving needs, ensuring you stay ahead of the competition.',
    },
  ];

  return (
    <motion.section
      ref={sectionRef}
      className="relative z-10 py-8 md:py-24 overflow-visible bg-gradient-to-b from-white/40 via-white/60 to-white/80 w-full"
      initial={{ opacity: 0 }}
      animate={isInView ? { opacity: 1 } : { opacity: 0 }}
      transition={{ duration: 1.2 }}
    >
      <div className="relative w-full px-6 md:px-8 lg:px-12 max-w-7xl mx-auto">
        {/* Section Header */}
        <motion.div
          className="text-center mb-16 max-w-4xl mx-auto"
          initial={{ opacity: 0, y: 50, scale: 0.95 }}
          animate={isInView ? { opacity: 1, y: 0, scale: 1 } : { opacity: 0, y: 50, scale: 0.95 }}
          transition={{ duration: 1, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}
        >
          <motion.h3
            className="text-4xl md:text-5xl font-black text-[#253E5C] mb-6"
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
            transition={{ duration: 0.8, delay: 0.5 }}
          >
            Why Choose Advertio?
          </motion.h3>
          <motion.p
            className="text-[#253E5C]/70 text-lg max-w-3xl mx-auto leading-relaxed"
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ duration: 0.8, delay: 0.7 }}
          >
            We take pride in being a team of certified digital marketers. Offering affordable package pricing, quality services, creativity and projects on time. Our 360 degree marketing solutions and ROI-focused campaigns are built to deliver best results.
          </motion.p>
        </motion.div>

        {/* Features Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8">
          {features.map((feature, index) => (
            <motion.div
              key={feature.title}
              className="relative group"
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
              transition={{
                duration: 0.6,
                delay: 0.2 + index * 0.1,
                ease: [0.22, 1, 0.36, 1],
              }}
            >
              <div
                className="relative rounded-[28px] border-2 border-primary/40 p-6 md:p-8 overflow-hidden cursor-pointer bg-white transition-all duration-300 hover:shadow-lg hover:scale-[1.02]"
              >
                {/* Simple background pattern - no blur */}
                <div
                  className="absolute inset-0 rounded-[28px] opacity-5"
                  style={{
                    background: 'linear-gradient(135deg, #E94F37 0%, #253E5C 100%)',
                    zIndex: 0,
                  }}
                />

                {/* Desktop: Simple Gradient Overlay on hover - CSS only */}
                <div
                  className="absolute inset-0 bg-gradient-to-br from-primary/10 via-transparent to-[#253E5C]/5 rounded-[28px] z-[1] hidden md:block opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                />

                {/* Mobile: Background gradient overlay when expanded */}
                <div
                  className="absolute inset-0 rounded-[28px] pointer-events-none md:hidden z-[1] transition-opacity duration-300"
                  style={{
                    background: 'linear-gradient(135deg, rgba(233, 79, 55, 0.95) 0%, rgba(37, 62, 92, 0.95) 100%)',
                    opacity: expandedCardIndex === index ? 1 : 0,
                  }}
                />

                {/* Content */}
                <div className="relative z-10">
                  <div className="flex items-start justify-between gap-4 mb-4">
                    <h4
                      className="text-lg md:text-xl font-black leading-tight flex-1 transition-colors duration-300 group-hover:text-primary"
                      style={{
                        color: expandedCardIndex === index ? '#FFFFFF' : '#253E5C',
                      }}
                    >
                      {feature.title}
                    </h4>
                    {/* Mobile Accordion Button */}
                    <button
                      onClick={() => {
                        setExpandedCardIndex(expandedCardIndex === index ? null : index);
                      }}
                      className="md:hidden flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center transition-all duration-300 hover:scale-110"
                      style={{
                        background: expandedCardIndex === index ? '#E94F37' : 'rgba(233, 79, 55, 0.15)',
                        color: expandedCardIndex === index ? '#FFFFFF' : '#E94F37',
                      }}
                      aria-label={expandedCardIndex === index ? 'Collapse' : 'Expand'}
                    >
                      <svg
                        className="w-5 h-5 transition-transform duration-300"
                        style={{
                          transform: expandedCardIndex === index ? 'rotate(45deg)' : 'rotate(0deg)',
                        }}
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M12 4v16m8-8H4" />
                      </svg>
                    </button>
                  </div>
                  {/* Desktop: Always visible */}
                  <p
                    className="hidden md:block text-sm md:text-base leading-relaxed font-bold text-[#253E5C] opacity-70 group-hover:opacity-100 transition-opacity duration-300"
                  >
                    {feature.description}
                  </p>
                  {/* Mobile: Accordion content */}
                  <AnimatePresence>
                    {expandedCardIndex === index && (
                      <motion.div
                        className="md:hidden"
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.3, ease: 'easeInOut' }}
                      >
                        <p className="text-white text-sm leading-relaxed font-bold pt-2">
                          {feature.description}
                        </p>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Background Decorative Elements - Static */}
      <div className="absolute top-0 left-0 w-[600px] h-[600px] bg-gradient-to-br from-primary/8 to-transparent rounded-full blur-3xl -z-10 opacity-30" />
      <div className="absolute bottom-0 right-0 w-[600px] h-[600px] bg-gradient-to-tl from-[#253E5C]/8 to-transparent rounded-full blur-3xl -z-10 opacity-30" />
    </motion.section>
  );
};

export default WhyChooseAdvertio;

