'use client'

import { useRef, useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import { motion, useInView } from 'framer-motion';
import Image from 'next/image';

const GetAQuoteSection = () => {
  const sectionRef = useRef(null);
  const gridRef = useRef(null);
  const dtcBrandRef = useRef(null);
  const buttonRef = useRef(null);
  const performanceCardRef = useRef(null);
  const router = useRouter();
  const isInView = useInView(sectionRef, { once: true, amount: 0.2 });
  const [pathData, setPathData] = useState('M 550 180 Q 450 100, 350 130 Q 250 150, 160 100');
  const [mobilePathData, setMobilePathData] = useState('');
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const updatePath = () => {
      if (!gridRef.current || !dtcBrandRef.current || !buttonRef.current) return;

      const gridRect = gridRef.current.getBoundingClientRect();
      const dtcRect = dtcBrandRef.current.getBoundingClientRect();
      const buttonRect = buttonRef.current.getBoundingClientRect();

      // Calculate relative positions within the grid (viewBox is 1000x400)
      const viewBoxWidth = 1000;
      const viewBoxHeight = 400;

      // Start point: left edge of DTC Brand card (right column)
      const startX = ((dtcRect.left - gridRect.left) / gridRect.width) * viewBoxWidth;
      const startY = ((dtcRect.top + dtcRect.height / 2 - gridRect.top) / gridRect.height) * viewBoxHeight;

      // End point: center of Get Quote button (left column)
      const endX = ((buttonRect.left + buttonRect.width / 2 - gridRect.left) / gridRect.width) * viewBoxWidth;
      const endY = ((buttonRect.top + buttonRect.height / 2 - gridRect.top) / gridRect.height) * viewBoxHeight;

      // Control points for a pronounced curve
      const midX1 = startX - (startX - endX) * 0.44;
      const midY1 = startY - 10; // Curve upward
      const midX2 = startX - (startX - endX) * 0.6;
      const midY2 = startY - 12;
      const midX3 = startX - (startX - endX) * 0.8;
      const midY3 = endY + 50;

      setPathData(`M ${startX} ${startY} Q ${midX1} ${midY1}, ${midX2} ${midY2} Q ${midX3} ${midY3}, ${endX} ${endY}`);
    };

    updatePath();
    window.addEventListener('resize', updatePath);
    return () => window.removeEventListener('resize', updatePath);
  }, [isInView]);

  // Mobile path calculation: from DTC Brand card to Get Quote button
  useEffect(() => {
    const updateMobilePath = () => {
      if (!gridRef.current || !dtcBrandRef.current || !buttonRef.current) return;
      
      // Only calculate on mobile screens
      if (window.innerWidth >= 768) {
        setMobilePathData('');
        return;
      }

      const gridRect = gridRef.current.getBoundingClientRect();
      const cardRect = dtcBrandRef.current.getBoundingClientRect();
      const buttonRect = buttonRef.current.getBoundingClientRect();

      // Calculate relative positions within the grid
      const viewBoxWidth = 1000;
      const viewBoxHeight = 800;

      // Start point: left edge of DTC Brand card
      const startX = ((cardRect.left - gridRect.left) / gridRect.width) * viewBoxWidth;
      const startY = ((cardRect.top + cardRect.height / 2 - gridRect.top) / gridRect.height) * viewBoxHeight;

      // End point: right edge of Get Quote button
      const endX = ((buttonRect.left + buttonRect.width - gridRect.left) / gridRect.width) * viewBoxWidth;
      const endY = ((buttonRect.top + buttonRect.height / 2 - gridRect.top) / gridRect.height) * viewBoxHeight;

      // Create a smooth curved path with gentle curve
      // Control points for a smoother, less sharp curve
      const midX1 = startX - (startX - endX) * 0.35;
      const midY1 = startY - 8; // Gentle curve upward
      const midX2 = startX - (startX - endX) * 0.5;
      const midY2 = startY - 6;
      const midX3 = startX - (startX - endX) * 0.7;
      const midY3 = endY + 35;

      // Use quadratic Bezier curves for smooth curve
      setMobilePathData(`M ${startX} ${startY} Q ${midX1} ${midY1}, ${midX2} ${midY2} Q ${midX3} ${midY3}, ${endX} ${endY}`);
    };

    updateMobilePath();
    window.addEventListener('resize', updateMobilePath);
    return () => window.removeEventListener('resize', updateMobilePath);
  }, [isInView]);

  // Track mobile state for button sizing
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  const handleGetQuote = () => {
    router.push('/contact');
  };

  return (
    <motion.section
      ref={sectionRef}
      className="relative z-10 pt-8 md:pt-24 pb-8 md:pb-16 overflow-visible bg-transparent w-full"
      initial={{ opacity: 0 }}
      animate={isInView ? { opacity: 1 } : { opacity: 0 }}
      transition={{ duration: 0.6 }}
    >
      <div className="relative w-full px-6 md:px-8 lg:px-12 max-w-7xl mx-auto">
        {/* Section Header */}
        <motion.div
          className="text-center mb-8 md:mb-12 max-w-4xl mx-auto"
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

        {/* Two Column Layout: Dolphin Left + Formula Right */}
        <div ref={gridRef} className="relative grid grid-cols-2 md:grid-cols-2 gap-4 md:gap-12 items-start md:items-center">
          {/* Curved Arrow from DTC Brand to Get Quote Button - Desktop Only */}
          <motion.svg
            className="hidden md:block absolute z-5 pointer-events-none"
            style={{
              left: '0',
              top: '0',
              width: '100%',
              height: '100%',
              overflow: 'visible',
            }}
            initial={{ opacity: 0 }}
            animate={isInView ? { opacity: 1 } : { opacity: 0 }}
            transition={{ duration: 0.8, delay: 0.8 }}
            viewBox="0 0 1000 400"
            preserveAspectRatio="none"
          >
            <defs>
              <marker
                id="arrowhead-dtc"
                markerWidth="22"
                markerHeight="22"
                refX="18"
                refY="6.5"
                orient="auto"
                markerUnits="userSpaceOnUse"
              >
                <polygon
                  points="0 0, 22 6.5, 0 13"
                  fill="#253E5C"
                />
              </marker>
            </defs>
            {/* Curved path: starts from left edge of DTC Brand icon (right column ~55%) to Get Quote button (left column ~16%) */}
            {/* Coordinates scale with viewBox (1000x400) for responsiveness */}
            <path
              d="M 555 170 Q 490 100, 350 130 Q 250 150, 160 100"
              stroke="#253E5C"
              strokeWidth="3"
              strokeDasharray="8,5"
              fill="none"
              markerEnd="url(#arrowhead-dtc)"
              opacity="1"
            />
          </motion.svg>


          {/* Left Side: Dolphin and Ball Button */}
          <motion.div
            className="relative flex items-center justify-center md:justify-start min-h-[300px] md:min-h-[400px] mt-0 md:mt-0"
            initial={{ opacity: 0, x: -30 }}
            animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -30 }}
            transition={{ duration: 0.6, delay: 0.5 }}
          >
            <div className="relative z-10">
              <div className="relative">
                <Image
                  src="/favicon.JPG"
                  alt="Dolphin"
                  width={320}
                  height={320}
                  className="w-48 md:w-80 h-auto object-contain relative z-10"
                />
                
                {/* Ball Button */}
                <motion.button
                  ref={buttonRef}
                  onClick={handleGetQuote}
                  className="absolute z-20 rounded-full bg-gradient-to-br from-primary via-[#ff6b4a] to-[#e94f37] text-white font-bold text-xs md:text-sm px-3 py-2 md:px-4 md:py-2.5 border-2 border-white/30 cursor-pointer flex items-center justify-center shadow-xl"
                  style={{
                    left: 'calc(28% - 2px)',
                    bottom: isMobile ? '140px' : '225px',
                    width: isMobile ? '80px' : '100px',
                    height: isMobile ? '80px' : '100px',
                  }}
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <span className="text-center leading-tight font-extrabold whitespace-nowrap text-xs md:text-sm">
                    Get a Quote
                  </span>
                </motion.button>
              </div>
            </div>
          </motion.div>

          {/* Right Side: Value Proposition Formula */}
          <motion.div
            className="relative p-2 md:p-12"
                        initial={{ opacity: 0, x: 30 }}
            animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: 30 }}
            transition={{ duration: 0.6, delay: 0.6 }}
          >
            {/* Content */}
            <div className="relative z-10">
              <div className="flex flex-col md:flex-row items-start md:items-center justify-center gap-2 md:gap-6 lg:gap-8 overflow-x-auto pb-4 md:pb-0">
                {/* Your DTC Brand */}
                <div ref={dtcBrandRef} className="flex flex-row md:flex-col items-center gap-2 md:gap-3">
                  <div className="w-16 h-16 md:w-24 md:h-24 border-2 border-[#253E5C] rounded-lg flex items-center justify-center relative bg-gradient-to-br from-[#253E5C] via-[#253E5C] to-[#ff6b4a]/40">
                    {/* Shopping bag/Store icon for DTC Brand */}
                    <svg className="w-8 h-8 md:w-12 md:h-12" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M8 12V26C8 27.1 8.9 28 10 28H22C23.1 28 24 27.1 24 26V12" stroke="white" strokeWidth="2" strokeLinecap="round"/>
                      <path d="M12 12V8C12 6.9 12.9 6 14 6H18C19.1 6 20 6.9 20 8V12" stroke="white" strokeWidth="2" strokeLinecap="round"/>
                      <path d="M8 12H24" stroke="white" strokeWidth="2" strokeLinecap="round"/>
                      <circle cx="14" cy="19" r="1" fill="white"/>
                      <circle cx="18" cy="19" r="1" fill="white"/>
                    </svg>
                  </div>
                  <p className="text-[#253E5C] text-sm md:text-base font-semibold text-center">Your DTC Brand</p>
                </div>

                {/* Plus Sign */}
                <div className="text-[#253E5C] text-2xl md:text-4xl font-bold self-center md:self-start mt-0 md:mt-16">+</div>

                {/* Our Performance Marketing Team */}
                <div ref={performanceCardRef} className="flex flex-row md:flex-col items-center gap-2 md:gap-3 mt-0 md:mt-11">
                  <div className="w-16 h-16 md:w-24 md:h-24 border-2 border-[#253E5C] rounded-full flex items-center justify-center relative bg-gradient-to-br from-[#253E5C] via-[#253E5C] to-[#ff6b4a]/40">
                    {/* Analytics/Chart icon for Performance Marketing */}
                    <svg className="w-8 h-8 md:w-12 md:h-12" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M6 26V20H10V26H6Z" fill="white"/>
                      <path d="M12 26V14H16V26H12Z" fill="white"/>
                      <path d="M18 26V18H22V26H18Z" fill="white"/>
                      <path d="M24 26V10H28V26H24Z" fill="white"/>
                      <line x1="6" y1="26" x2="28" y2="26" stroke="white" strokeWidth="2" strokeLinecap="round"/>
                    </svg>
                  </div>
                  <p className="text-[#253E5C] text-sm md:text-base font-semibold text-center">Our Performance<br />Marketing Team</p>
                </div>

                {/* Equals Sign */}
                <div className="text-[#253E5C] text-2xl md:text-4xl font-bold self-center md:self-start mt-0 md:mt-16">=</div>

                {/* Result */}
                <div className="flex flex-row md:flex-col items-center gap-2 md:gap-3 mt-0 md:mt-6">
                  <div className="w-16 h-16 md:w-24 md:h-24 border-2 border-[#253E5C] rounded-full flex items-center justify-center relative bg-gradient-to-br from-[#253E5C] via-[#253E5C] to-[#ff6b4a]/40">
                    {/* Growth/Upward trend chart for ROAS Consistent Growth */}
                    <svg className="w-8 h-8 md:w-12 md:h-12" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M6 24L12 16L18 20L26 8" stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/>
                      <path d="M22 8H26V12" stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/>
                      <circle cx="6" cy="24" r="1.5" fill="white"/>
                      <circle cx="12" cy="16" r="1.5" fill="white"/>
                      <circle cx="18" cy="20" r="1.5" fill="white"/>
                      <circle cx="26" cy="8" r="1.5" fill="white"/>
                    </svg>
                  </div>
                  <p className="text-[#253E5C] text-sm md:text-base font-bold text-center">5-7x ROAS<br />Consistent Growth</p>
                </div>
              </div>
            </div>
          </motion.div>
        </div>

      </div>

      {/* Background Decorative Elements - Static */}
      <div className="absolute top-0 left-0 w-[600px] h-[600px] bg-gradient-to-br from-primary/8 to-transparent rounded-full blur-2xl -z-10 opacity-30" />
      <div className="absolute bottom-0 right-0 w-[600px] h-[600px] bg-gradient-to-tl from-[#253E5C]/8 to-transparent rounded-full blur-2xl -z-10 opacity-30" />
    </motion.section>
  );
};

export default GetAQuoteSection;

