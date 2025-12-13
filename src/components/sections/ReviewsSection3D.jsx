import { useRef, useState } from 'react';
import { motion, useInView } from 'framer-motion';

const ReviewsSection3D = () => {
  const sectionRef = useRef(null);
  const scrollContainerRef = useRef(null);
  const isInView = useInView(sectionRef, { once: true, amount: 0.1, margin: '-100px' });
  const [hoveredIndex, setHoveredIndex] = useState(null);

  const reviews = [
    {
      id: 1,
      name: 'Sarah Chen',
      role: 'CEO, TechHunts',
      company: 'TechHunts',
      image: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=400&h=400&fit=crop&q=80',
      rating: 5,
      text: 'Advertio transformed our digital presence completely. Their 3D campaign designs and performance marketing strategies increased our ROAS by 6.8x. The team is incredibly creative and data-driven.',
      highlight: '+128% Revenue Growth',
      color: '#E94F37',
    },
    {
      id: 2,
      name: 'Michael Rodriguez',
      role: 'Founder, Glamboon',
      company: 'Glamboon',
      image: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400&h=400&fit=crop&q=80',
      rating: 5,
      text: 'Working with Advertio has been a game-changer. Their immersive landing pages and conversion optimization increased our conversion rate by 8.2%. Highly recommend their services!',
      highlight: '8.2% Conversion Rate',
      color: '#253E5C',
    },
    {
      id: 3,
      name: 'Emma Thompson',
      role: 'CMO, Novelle',
      company: 'Novelle',
      image: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=400&h=400&fit=crop&q=80',
      rating: 5,
      text: 'The team at Advertio understands e-commerce like no other. Their social storytelling campaigns and influencer partnerships drove 2.4M impressions. Exceptional results!',
      highlight: '2.4M Impressions',
      color: '#E94F37',
    },
    {
      id: 4,
      name: 'David Park',
      role: 'Director, InfiniteAge',
      company: 'InfiniteAge',
      image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=400&fit=crop&q=80',
      rating: 5,
      text: 'Advertio\'s product reveal films and AR kits created an unforgettable launch experience. Our engagement rate increased by 45% year over year. Outstanding creative work!',
      highlight: '+45% Engagement',
      color: '#253E5C',
    },
    {
      id: 5,
      name: 'Lisa Anderson',
      role: 'VP Marketing, VikingBags',
      company: 'VikingBags',
      image: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=400&h=400&fit=crop&q=80',
      rating: 5,
      text: 'Their MarTech automation and personalized journeys reduced our CAC by 24%. The team is professional, creative, and always delivers on time. Best marketing partner we\'ve worked with!',
      highlight: '-24% CAC Reduction',
      color: '#E94F37',
    },
    {
      id: 6,
      name: 'James Wilson',
      role: 'Founder, OutdoorPlay',
      company: 'OutdoorPlay',
      image: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=400&h=400&fit=crop&q=80',
      rating: 5,
      text: 'Advertio\'s brand positioning and thought leadership content elevated our executive voices. Brand lift increased by 18% and customer LTV by 52%. Phenomenal results!',
      highlight: '+52% LTV Increase',
      color: '#253E5C',
    },
    {
      id: 7,
      name: 'Rachel Martinez',
      role: 'Founder, Celvora',
      company: 'Celvora',
      image: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=400&h=400&fit=crop&q=80',
      rating: 5,
      text: 'The conversion-focused optimization and UX audits transformed our customer journey. Our conversion rate improved dramatically, and the team provided actionable insights throughout.',
      highlight: '+67% Conversions',
      color: '#E94F37',
    },
    {
      id: 8,
      name: 'Thomas Lee',
      role: 'CEO, Bailey Mercer',
      company: 'Bailey Mercer',
      image: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=400&h=400&fit=crop&q=80',
      rating: 5,
      text: 'Advertio\'s performance media and cross-channel campaigns delivered exceptional ROAS. Their real-time optimization and intelligence helped us scale profitably. Highly recommended!',
      highlight: '5.4x Average ROAS',
      color: '#253E5C',
    },
    {
      id: 9,
      name: 'Sophie Brown',
      role: 'Marketing Director, Customizology',
      company: 'Customizology',
      image: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=400&h=400&fit=crop&q=80',
      rating: 5,
      text: 'Their immersive landing pages and WebGL-powered microsites created an unforgettable brand experience. Engagement rates soared, and our brand awareness increased significantly.',
      highlight: '+38% Brand Awareness',
      color: '#E94F37',
    },
    {
      id: 10,
      name: 'Robert Kim',
      role: 'Founder, Donior',
      company: 'Donior',
      image: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=400&h=400&fit=crop&q=80',
      rating: 5,
      text: 'Advertio\'s crisis narrative control and rapid-response playbooks protected our brand during challenging times. Their strategic approach and execution were flawless.',
      highlight: '100% Brand Protection',
      color: '#253E5C',
    },
    {
      id: 11,
      name: 'Amanda White',
      role: 'CMO, Palm',
      company: 'Palm',
      image: 'https://images.unsplash.com/photo-1531746020798-e6953c6e8e04?w=400&h=400&fit=crop&q=80',
      rating: 5,
      text: 'The experiential AR kits and mixed reality campaigns extended our reach into new dimensions. Their innovative approach and creative execution exceeded all expectations.',
      highlight: '+89% Reach Increase',
      color: '#E94F37',
    },
    {
      id: 12,
      name: 'Chris Johnson',
      role: 'Director, Value Makers',
      company: 'Value Makers',
      image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=400&fit=crop&q=80',
      rating: 5,
      text: 'Working with Advertio transformed our marketing operations. Their integrated solutions and data-driven approach delivered measurable results that exceeded our goals.',
      highlight: '+156% ROI',
      color: '#253E5C',
    },
  ];

  const StarRating = ({ rating }) => {
    return (
      <div className="flex gap-1">
        {[...Array(5)].map((_, i) => (
          <svg
            key={i}
            className="w-5 h-5"
            fill={i < rating ? '#FFD700' : '#E5E7EB'}
            viewBox="0 0 24 24"
          >
            <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
          </svg>
        ))}
      </div>
    );
  };

  return (
    <motion.section
      ref={sectionRef}
      className="relative z-10 pt-8 pb-0 md:pb-32 overflow-visible bg-gradient-to-b from-white/50 via-white/70 to-white/90 w-full min-h-[600px] md:min-h-[900px]"
      initial={{ opacity: 1 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.3 }}
    >
      {/* Static Background Elements - Optimized for performance */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {[...Array(5)].map((_, i) => (
          <div
            key={i}
            className="absolute rounded-full opacity-20"
            style={{
              width: `${100 + i * 30}px`,
              height: `${100 + i * 30}px`,
              left: `${i * 20}%`,
              top: `${(i % 3) * 30}%`,
              background: `radial-gradient(circle, rgba(233, 79, 55, ${0.08 + i * 0.02}) 0%, transparent 70%)`,
            }}
          />
        ))}
      </div>

      <div className="relative w-[90%] mx-auto">
        {/* Section Header */}
        <motion.div
          className="text-center mb-4 md:mb-16 max-w-4xl mx-auto"
          initial={{ opacity: 0, y: 50, scale: 0.9 }}
          animate={isInView ? { opacity: 1, y: 0, scale: 1 } : { opacity: 0, y: 50, scale: 0.9 }}
          transition={{ duration: 1, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}
        >
          <motion.p
            className="text-xs uppercase tracking-[0.5em] text-[#253E5C]/60 mb-4"
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ duration: 0.6, delay: 0.5 }}
          >
            Client Success Stories
          </motion.p>
          <motion.h3
            className="text-5xl md:text-6xl lg:text-7xl font-black text-[#253E5C] mb-6"
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
            transition={{ duration: 0.8, delay: 0.7 }}
          >
            <span className="bg-gradient-to-r from-[#253E5C] via-primary to-[#ff6b4a] bg-clip-text text-transparent">
              What Our Clients Say
            </span>
          </motion.h3>
          <motion.p
            className="text-[#253E5C]/70 text-lg md:text-xl max-w-3xl mx-auto leading-relaxed"
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ duration: 0.8, delay: 0.9 }}
          >
            Real results from brands that trust Advertio to drive their growth
          </motion.p>
        </motion.div>

        {/* Horizontal Scrollable Container */}
        <div className="relative min-h-[500px] md:min-h-[700px] py-4 md:py-8">
          {/* Scroll Container */}
          <div
            ref={scrollContainerRef}
            className="reviews-scroll-container overflow-x-auto overflow-y-visible pb-0 md:pb-12 pt-4 md:pt-8 min-h-[500px] md:min-h-[700px]"
            style={{
              WebkitOverflowScrolling: 'touch',
              paddingLeft: '1rem',
              paddingRight: '1rem',
            }}
          >
            <div className="flex gap-6 md:gap-8 lg:gap-10 items-start min-h-[400px] md:min-h-[600px]" style={{ width: 'max-content', paddingTop: '10px', paddingBottom: '40px' }}>
              {reviews.map((review, index) => {
                const isHovered = hoveredIndex === index;

                return (
                  <motion.div
                    key={review.id}
                    className="relative group flex-shrink-0"
                    initial={{ 
                      opacity: 1, 
                      x: 0,
                      scale: 1,
                    }}
                    whileInView={{ 
                      opacity: 1, 
                      x: 0,
                      scale: 1,
                    }}
                    viewport={{ once: true, amount: 0.2 }}
                    transition={{
                      duration: 0.6,
                      delay: index * 0.05,
                      ease: [0.22, 1, 0.36, 1],
                    }}
                    onMouseEnter={() => setHoveredIndex(index)}
                    onMouseLeave={() => setHoveredIndex(null)}
                    style={{ 
                      transformStyle: 'preserve-3d',
                      width: '380px',
                      minWidth: '380px',
                      willChange: 'transform',
                      zIndex: hoveredIndex === index ? 10 : 1,
                    }}
                  >
                    <motion.div
                      className="relative h-full rounded-[32px] overflow-visible cursor-pointer transition-all duration-300 min-h-[400px] md:min-h-[550px]"
                      style={{
                        position: 'relative',
                        zIndex: hoveredIndex === index ? 20 : 1,
                      }}
                      whileHover={{ scale: 1.02, y: -8 }}
                    >
                      {/* Gradient Border Wrapper */}
                      <div
                        className="absolute inset-0 rounded-[32px] p-[2px] transition-opacity duration-300"
                        style={{
                          background: `linear-gradient(135deg, ${review.color}, ${review.color}80, #253E5C60, ${review.color})`,
                          opacity: isHovered ? 1 : 0.8,
                        }}
                      >
                        <div
                          className="w-full h-full rounded-[30px] relative transition-all duration-300"
                          style={{
                            background: `linear-gradient(135deg, ${review.color}15 0%, ${review.color}08 50%, transparent 100%)`,
                          }}
                        >
                          {/* Content Container */}
                          <div className="relative z-10 p-8 md:p-10 bg-white/95 min-h-[400px] md:min-h-[550px] rounded-[30px] review-card-content">
                            {/* Profile Section */}
                            <div className="flex items-center gap-4 mb-6">
                              <div className="relative">
                                <div
                                  className="w-16 h-16 md:w-20 md:h-20 rounded-full overflow-hidden border-4 transition-all duration-300"
                                  style={{ 
                                    borderColor: review.color,
                                    borderWidth: isHovered ? '5px' : '4px',
                                  }}
                                >
                                  <img
                                    src={review.image}
                                    alt={review.name}
                                    className="w-full h-full object-cover review-card-image"
                                    loading="lazy"
                                  />
                                </div>
                              </div>
                              <div className="flex-1">
                                <h4
                                  className="text-xl md:text-2xl font-black mb-1 transition-colors duration-300"
                                  style={{
                                    color: isHovered ? review.color : '#253E5C',
                                  }}
                                >
                                  {review.name}
                                </h4>
                                <p className="text-sm md:text-base text-[#253E5C]/70 font-semibold">{review.role}</p>
                                <p className="text-xs text-[#253E5C]/50 font-medium">{review.company}</p>
                              </div>
                            </div>

                            {/* Star Rating */}
                            <div className="mb-6">
                              <StarRating rating={review.rating} />
                            </div>

                            {/* Review Text */}
                            <p className="text-[#253E5C]/80 text-base md:text-lg leading-relaxed mb-6 font-medium">
                              &ldquo;{review.text}&rdquo;
                            </p>

                            {/* Highlight Badge */}
                            <div
                              className="inline-flex items-center gap-2 px-4 py-2 rounded-full transition-transform duration-300"
                              style={{
                                background: `linear-gradient(135deg, ${review.color}20, ${review.color}10)`,
                                border: `1px solid ${review.color}30`,
                                transform: isHovered ? 'scale(1.02)' : 'scale(1)',
                              }}
                            >
                              <span
                                className="text-sm font-black"
                                style={{ color: review.color }}
                              >
                                {review.highlight}
                              </span>
                              <svg
                                className="w-4 h-4"
                                style={{ color: review.color }}
                                fill="currentColor"
                                viewBox="0 0 20 20"
                              >
                                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-8.707l-3-3a1 1 0 00-1.414 0l-3 3a1 1 0 001.414 1.414L9 9.414V13a1 1 0 102 0V9.414l1.293 1.293a1 1 0 001.414-1.414z" clipRule="evenodd" />
                              </svg>
                            </div>
                          </div>
                        </div>
                      </div>
                      
                      {/* Shadow Effect */}
                      <div
                        className="absolute inset-0 rounded-[32px] pointer-events-none z-0 transition-all duration-300"
                        style={{
                          boxShadow: isHovered
                            ? `0 20px 50px ${review.color}30, 0 0 25px ${review.color}20`
                            : `0 10px 30px rgba(37, 62, 92, 0.1)`,
                        }}
                      />
                    </motion.div>
                  </motion.div>
                );
              })}
            </div>
          </div>

          {/* Scroll Indicator */}
          <div
            className="absolute right-8 top-1/2 -translate-y-1/2 hidden lg:block pointer-events-none opacity-40"
          >
            <svg className="w-8 h-8 text-[#253E5C]/40" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </div>
        </div>
      </div>

      {/* Background Decorative Elements - Static for performance */}
      <div
        className="absolute top-0 left-0 w-[800px] h-[800px] bg-gradient-to-br from-primary/10 to-transparent rounded-full blur-2xl -z-10 opacity-20"
      />
      <div
        className="absolute bottom-0 right-0 w-[800px] h-[800px] bg-gradient-to-tl from-[#253E5C]/10 to-transparent rounded-full blur-2xl -z-10 opacity-20"
      />
    </motion.section>
  );
};

export default ReviewsSection3D;

