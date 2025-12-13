import { useRef, useState } from 'react';
import { motion, AnimatePresence, useInView } from 'framer-motion';
import Image from 'next/image';

const TeamSection = () => {
  const sectionRef = useRef(null);
  const isInView = useInView(sectionRef, { once: true, amount: 0.2 });
  const [hoveredIndex, setHoveredIndex] = useState(null);

  const teamMembers = [
    {
      id: 1,
      name: 'Talha Azmat',
      role: 'Founder & CEO',
      bio: 'Leading innovative campaigns with a passion for storytelling and brand transformation.',
      expertise: ['Brand Strategy', 'Creative Direction', 'Campaign Design'],
      image: '/talha.jpg',
    },
    {
      id: 2,
      name: 'Tabish Islam',
      role: 'Creative Director',
      bio: 'Driving data-driven growth strategies that deliver measurable results for e-commerce brands.',
      expertise: ['Performance Marketing', 'Growth Strategy', 'Analytics'],
      image: '/tabish.jpg',
    },
    {
      id: 3,
      name: 'Tahir Munir',
      role: 'SEO consultant',
      bio: 'Building immersive digital experiences with cutting-edge technology and creative solutions.',
      expertise: ['Web Development', '3D Design', 'Technical Innovation'],
      image: '/SEO.jpg',
    },
    {
      id: 4,
      name: 'Emma Thompson',
      role: 'Content Specialist',
      bio: 'Crafting compelling narratives that engage audiences and drive meaningful connections.',
      expertise: ['Content Strategy', 'Social Media', 'Storytelling'],
      image: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=400&h=500&fit=crop&q=80',
    },
  ];

  return (
    <motion.section
      ref={sectionRef}
      className="relative z-10 py-8 md:py-24 overflow-hidden bg-gradient-to-b from-white/30 via-white/50 to-white/80 w-full"
      initial={{ opacity: 0, scale: 1 }}
      animate={isInView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 1 }}
      style={{ scale: 1 }}
      transition={{ duration: 1 }}
    >
      <div className="relative w-full px-2 md:px-4 lg:px-6">
        {/* Section Header */}
        <motion.div
          className="text-center mb-16 max-w-4xl mx-auto"
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          <p className="text-xs uppercase tracking-[0.4em] text-[#253E5C]/60 mb-4">Our Team</p>
          <h3 className="text-4xl md:text-5xl font-black text-[#253E5C] mb-4">
            The Minds Behind the Magic
          </h3>
          <p className="text-[#253E5C]/70 text-lg max-w-2xl mx-auto">
            A collective of creative visionaries and strategic thinkers dedicated to elevating your brand.
          </p>
        </motion.div>

        {/* Team Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-5 lg:gap-6 w-full">
          {teamMembers.map((member, index) => {
            const cardHeights = [
              'h-[520px] md:h-[650px] lg:h-[700px]', // First card - larger
              'h-[420px] md:h-[520px] lg:h-[560px]', // Second card - smaller
              'h-[520px] md:h-[650px] lg:h-[700px]', // Third card - larger
              'h-[420px] md:h-[520px] lg:h-[560px]', // Fourth card - smaller
            ];
            
            return (
              <motion.div
                key={member.id}
                className={`relative group ${
                  index === 1 ? 'mt-8 md:mt-12 lg:mt-16' : 
                  index === 3 ? 'mt-8 md:mt-12 lg:mt-16' : ''
                }`}
                initial={{ opacity: 0, scale: 1 }}
                animate={
                  isInView
                    ? { opacity: 1, scale: 1 }
                    : { opacity: 0, scale: 1 }
                }
                style={{ scale: 1 }}
                transition={{
                  duration: 0.5,
                  delay: index * 0.1,
                }}
                onMouseEnter={() => setHoveredIndex(index)}
                onMouseLeave={() => setHoveredIndex(null)}
              >
                <div className={`relative ${cardHeights[index]} rounded-[32px] overflow-hidden cursor-pointer`}>
                  {/* Image Container */}
                  <div className="absolute inset-0 z-0">
                    <Image
                      src={member.image}
                      alt={member.name}
                      fill
                      className="object-cover transition-all duration-300"
                      style={{
                        filter: hoveredIndex === index ? 'brightness(0.4)' : 'brightness(1)',
                        transform: hoveredIndex === index ? 'scale(1.05)' : 'scale(1)',
                      }}
                    />
                    {/* Gradient Overlay - Hidden on hover */}
                    <div 
                      className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent z-0 transition-opacity duration-300"
                      style={{
                        opacity: hoveredIndex === index ? 0 : 1,
                      }}
                    />
                  </div>

                  {/* Initial State - Just Name */}
                  <div
                    className="absolute bottom-0 left-0 right-0 p-8 md:p-10 z-[15] transition-opacity duration-300"
                    style={{
                      opacity: hoveredIndex === index ? 0 : 1,
                    }}
                  >
                    <h4 className="text-3xl md:text-4xl font-black text-white">
                      {member.name}
                    </h4>
                  </div>

                  {/* Hover State - Name and Role */}
                  <AnimatePresence mode="wait">
                    {hoveredIndex === index && (
                      <motion.div
                        className="absolute inset-0 p-8 md:p-10 lg:p-12 flex flex-col justify-end z-[25]"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.3 }}
                      >
                        {/* Background Gradient */}
                        <div className="absolute inset-0 bg-gradient-to-t from-[#253E5C]/95 via-[#253E5C]/80 to-transparent z-[25]" />

                        {/* Content - Name and Role */}
                        <div className="relative z-[30]">
                          <h4 className="text-4xl md:text-5xl font-black text-white mb-3">
                            {member.name}
                          </h4>
                          <p className="text-primary text-xl md:text-2xl font-semibold">
                            {member.role}
                          </p>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>

      {/* Background Decorative Elements */}
      <div className="absolute top-0 left-0 w-96 h-96 bg-gradient-to-br from-primary/10 to-transparent rounded-full blur-3xl -z-10" />
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-gradient-to-tl from-[#253E5C]/10 to-transparent rounded-full blur-3xl -z-10" />
    </motion.section>
  );
};

export default TeamSection;

