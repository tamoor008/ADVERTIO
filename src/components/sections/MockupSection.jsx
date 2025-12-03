import { useRef, useState } from 'react';
import { motion, useInView } from 'framer-motion';
import mockup1 from '../../assets/mockups1.png';
import mockup2 from '../../assets/mockups2.png';
import mockup3 from '../../assets/Mockup3.png';
import mockup4 from '../../assets/mockup4.png';
import mockup5 from '../../assets/Mockup5.png';
import mockup6 from '../../assets/mockup6.png';

const MockupSection = () => {
  const sectionRef = useRef(null);
  const isInView = useInView(sectionRef, { once: true, amount: 0.2 });
  const [hoveredIndex, setHoveredIndex] = useState(null);

  const mockups = [
    { id: 1, image: mockup1, title: 'Campaign Design' },
    { id: 2, image: mockup2, title: 'Brand Identity' },
    { id: 3, image: mockup3, title: 'Web Experience' },
    { id: 4, image: mockup4, title: 'Mobile Interface' },
    { id: 5, image: mockup5, title: 'Digital Marketing' },
    { id: 6, image: mockup6, title: 'Creative Solutions' },
  ];

  return (
    <motion.section
      ref={sectionRef}
      className="relative z-10 py-28 px-6 lg:px-8 bg-gradient-to-b from-white via-[#F6F7FF] to-white w-full overflow-hidden"
      initial={{ opacity: 0 }}
      animate={isInView ? { opacity: 1 } : { opacity: 0 }}
      transition={{ duration: 0.8 }}
    >
      {/* Static background orbs */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        {[...Array(3)].map((_, index) => (
          <div
            key={`mockup-orb-${index}`}
            className="absolute rounded-full blur-3xl opacity-20"
            style={{
              width: `${300 + index * 100}px`,
              height: `${300 + index * 100}px`,
              left: `${(index * 30) % 100}%`,
              top: `${(index * 25) % 100}%`,
              background: `radial-gradient(circle, rgba(233, 79, 55, ${0.1 + index * 0.05}) 0%, transparent 70%)`,
            }}
          />
        ))}
      </div>

      <div className="relative max-w-[1500px] mx-auto">
        {/* Section Header */}
        <motion.div
          className="text-center mb-16 max-w-3xl mx-auto"
          initial={{ opacity: 0, y: 40, scale: 0.95 }}
          animate={isInView ? { opacity: 1, y: 0, scale: 1 } : { opacity: 0, y: 40, scale: 0.95 }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          <motion.p
            className="text-xs uppercase tracking-[0.6em] text-primary/70 mb-4 font-semibold"
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ duration: 0.6, delay: 0.3 }}
          >
            Our Work
          </motion.p>
          <motion.h2
            className="text-4xl md:text-6xl font-black text-[#253E5C] mb-6 leading-tight"
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            Showcasing Excellence
          </motion.h2>
          <motion.p
            className="text-lg text-[#253E5C]/70 leading-relaxed"
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ duration: 0.8, delay: 0.5 }}
          >
            Explore our portfolio of innovative designs and creative solutions that drive results.
          </motion.p>
        </motion.div>

        {/* Mockup Grid */}
        <div className="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-3 gap-3 md:gap-6 lg:gap-8">
          {mockups.map((mockup, index) => (
            <motion.div
              key={mockup.id}
              className="relative group"
              initial={{ opacity: 0, y: 50, scale: 0.9 }}
              animate={isInView ? { opacity: 1, y: 0, scale: 1 } : { opacity: 0, y: 50, scale: 0.9 }}
              transition={{ duration: 0.6, delay: 0.1 * index }}
              onMouseEnter={() => setHoveredIndex(index)}
              onMouseLeave={() => setHoveredIndex(null)}
            >
              <motion.div
                className="relative rounded-2xl overflow-hidden bg-white/80 backdrop-blur-sm border border-white/20 shadow-lg"
                style={{
                  boxShadow: hoveredIndex === index
                    ? '0 30px 80px rgba(233, 79, 55, 0.25), 0 15px 40px rgba(0, 0, 0, 0.1)'
                    : '0 10px 40px rgba(0, 0, 0, 0.08)',
                }}
                whileHover={{ scale: 1.02, y: -4 }}
                transition={{ duration: 0.3 }}
              >
                {/* Mockup Image */}
                <div className="relative aspect-[4/3] overflow-hidden">
                  <img
                    src={mockup.image}
                    alt={mockup.title}
                    className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                    loading="lazy"
                  />
                </div>
              </motion.div>
            </motion.div>
          ))}
        </div>
      </div>
    </motion.section>
  );
};

export default MockupSection;

