import { useState } from 'react';
import { motion, AnimatePresence, useInView } from 'framer-motion';
import favicon from '../../assets/favicon.JPG';
import { processSteps, processLabels, processLabelsSplit } from './constants';

// Process icons imports
import storeAnalysisIcon from '../../assets/Store-analysis.png';
import growthStrategyIcon from '../../assets/Growht-Strategy.png';
import multiChannelIcon from '../../assets/multi-channel.png';
import contentCreatorIcon from '../../assets/content-creator.png';
import campaignLaunchIcon from '../../assets/compaign-launch.png';
import performanceIcon from '../../assets/performance.png';
import analyticsIcon from '../../assets/analytics.png';

const processIcons = [
  storeAnalysisIcon,
  growthStrategyIcon,
  multiChannelIcon,
  contentCreatorIcon,
  campaignLaunchIcon,
  performanceIcon,
  analyticsIcon,
];

const ProcessBackdrop = () => {
  const [expandedCardIndex, setExpandedCardIndex] = useState(null);

  // Solid colors for each card based on brand color scheme - using only primary colors
  const cardColors = [
    { bg: '#253E5C', text: '#FFFFFF' },      // Store Analysis - Dark blue
    { bg: '#E94F37', text: '#FFFFFF' },      // Growth Strategy - Primary red/orange
    { bg: '#253E5C', text: '#FFFFFF' },      // Multi-Channel Ads - Dark blue
    { bg: '#E94F37', text: '#FFFFFF' },      // Content Creation - Primary red/orange
    { bg: '#253E5C', text: '#FFFFFF' },      // Campaign Launch - Dark blue
    { bg: '#E94F37', text: '#FFFFFF' },      // Performance Tracking - Primary red/orange
    { bg: '#253E5C', text: '#FFFFFF' },      // ROI Reports - Dark blue
  ];

  // CARD POSITIONING STYLES
  const cardStyles = [
    { left: 'calc(12% + 0px)', top: 'calc(77.3% + -180px)' },
    { left: 'calc(12% + 0px)', top: 'calc(57% + -180px)' },
    { left: 'calc(23% + 0px)', top: 'calc(42% + -180px)' },
    { left: 'calc(39% + 0px)', top: 'calc(37% + -180px)' },
    { left: 'calc(55% + 0px)', top: 'calc(42% + -180px)' },
    { left: 'calc(66% + 0px)', top: 'calc(57% + -180px)' },
    { left: 'calc(66% + 0px)', top: 'calc(77.3% + -180px)' },
  ];

  // CARD ROTATION VALUES
  const cardRotations = [
    180,    // Card 1
    0,      // Card 2
    33,     // Card 3
    0,      // Card 4
    -33,    // Card 5
    0,      // Card 6
    180,    // Card 7
  ];

  // LINE POSITIONING STYLES
  const linePositions = [
    { left: 'calc(30% + 0px)', top: 'calc(70% + -180px)' },
    { left: 'calc(30.5% + 0px)', top: 'calc(56% + 0px)' },
    { left: 'calc(37% + 0px)', top: 'calc(28% + 0px)' },
    { left: 'calc(48.5% + 0px)', top: 'calc(24% + 0px)' },
    { left: 'calc(58% + 0px)', top: 'calc(38% + 0px)' },
    { left: 'calc(63% + 0px)', top: 'calc(44.5% + 0px)' },
    { left: 'calc(62% + 0px)', top: 'calc(53% + 0px)' },
  ];

  return (
    <motion.section
      initial={{ opacity: 0, y: 60 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.3 }}
      transition={{ duration: 1 }}
      className="relative z-10 py-24"
    >
      <div className="w-full rounded-[36px] bg-[#f9f6f0] border border-white/70 shadow-[0_40px_140px_rgba(37,62,92,0.25)] px-8 py-12 lg:px-16">
        <div className="text-center mb-10">
          <p className="text-xs tracking-[0.5em] uppercase text-[#253E5C]/60">Process</p>
          <h3 className="text-3xl md:text-4xl font-black text-[#253E5C]">E-commerce Marketing Process</h3>
          <p className="text-[#253E5C]/70 mt-3 text-base">We specialize in delivering data-driven digital marketing solutions tailored exclusively for e-commerce brands to drive sales and maximize ROI.</p>
        </div>
        <div className="flex justify-center items-center gap-40 lg:gap-72 flex-wrap lg:flex-nowrap">
          {/* Desktop: Left side with steps list */}
          <div className="bg-white rounded-[32px] border border-[#253E5C]/10 shadow-[0_20px_50px_rgba(37,62,92,0.08)] p-8 max-w-3xl w-full flex-1 hidden md:block">
            <div className="space-y-5">
              {processSteps.map((text, index) => (
                <motion.div
                  key={text}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true, amount: 0.3 }}
                  transition={{ duration: 0.4, delay: index * 0.08 }}
                  className="flex gap-4 items-start"
                >
                  <div 
                    className="px-3 py-1 rounded-full font-bold text-sm flex items-center justify-center shadow-md flex-shrink-0"
                    style={{
                      background: cardColors[index].bg,
                      color: cardColors[index].text,
                    }}
                  >
                    {index + 1}
                  </div>
                  <p className="font-medium leading-relaxed pt-0.5 text-black">{text}</p>
                </motion.div>
              ))}
            </div>
          </div>

          {/* Mobile: Simple card grid with accordion */}
          <div className="md:hidden w-full">
            <div className="grid grid-cols-1 gap-4">
              {processLabels.map((label, index) => {
                const isExpanded = expandedCardIndex === index;
                
                return (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, amount: 0.3 }}
                    transition={{ duration: 0.4, delay: index * 0.05 }}
                    className="bg-white rounded-2xl border border-[#253E5C]/10 shadow-md overflow-hidden"
                    style={{
                      borderLeft: `4px solid ${cardColors[index].bg}`,
                    }}
                  >
                    <div className="p-5 flex items-center gap-4">
                      <div 
                        className="w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0 shadow-sm overflow-hidden"
                        style={{
                          background: cardColors[index].bg,
                          border: `2px solid ${cardColors[index].bg}`,
                        }}
                      >
                        <img 
                          src={processIcons[index]} 
                          alt={label}
                          className="w-8 h-8 object-contain"
                          loading="lazy"
                          style={{
                            imageRendering: 'crisp-edges',
                            WebkitImageRendering: 'crisp-edges',
                            filter: 'none',
                            opacity: 1,
                            mixBlendMode: 'normal',
                          }}
                        />
                      </div>
                      <div className="flex-1">
                        <h4 
                          className="font-bold text-base"
                          style={{ color: cardColors[index].bg }}
                        >
                          {label}
                        </h4>
                      </div>
                      <button
                        onClick={() => {
                          setExpandedCardIndex(isExpanded ? null : index);
                        }}
                        className="flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center transition-all duration-300 hover:scale-110"
                        style={{
                          background: isExpanded ? cardColors[index].bg : `${cardColors[index].bg}15`,
                          color: isExpanded ? cardColors[index].text : cardColors[index].bg,
                        }}
                        aria-label={isExpanded ? 'Collapse' : 'Expand'}
                      >
                        <motion.svg
                          className="w-5 h-5"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                          animate={{ rotate: isExpanded ? 45 : 0 }}
                          transition={{ duration: 0.3 }}
                        >
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M12 4v16m8-8H4" />
                        </motion.svg>
                      </button>
                    </div>
                    <AnimatePresence>
                      {isExpanded && (
                        <motion.div
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: 'auto', opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          transition={{ duration: 0.3, ease: 'easeInOut' }}
                          className="overflow-hidden"
                        >
                          <div className="px-5 pb-5 pt-0">
                            <p className="text-sm text-slate-600 leading-relaxed">
                              {processSteps[index]}
                            </p>
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </motion.div>
                );
              })}
            </div>
          </div>

          {/* Desktop: Right side with complex diagram */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="hidden md:flex flex-shrink-0 relative w-[500px] h-[500px] lg:w-[600px] lg:h-[600px] items-center justify-center overflow-visible"
          >
            {/* 7 Dotted lines */}
            {processSteps.map((text, index) => {
              const randomRotations = [30, -20, 60, 90, -60, -30, 30];
              const lineWidths = ['50px', '47px', '68px', '68px', '79px', '50px', '47px'];
              return (
                <div
                  key={`line-${index}`}
                  className="absolute z-15"
                  style={{
                    width: lineWidths[index],
                    height: '20px',
                    borderTop: '3px dashed rgba(0, 0, 0, 0.4)',
                    ...linePositions[index],
                    transformOrigin: 'left center',
                    transform: `rotate(${randomRotations[index]}deg)`,
                  }}
                />
              );
            })}
            
            {/* 7 Cards positioned around the circle */}
            {processSteps.map((text, index) => {
              return (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, scale: 0.5 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true, amount: 0.3 }}
                  transition={{ 
                    duration: 0.5, 
                    delay: 0.3 + index * 0.1,
                    type: "spring",
                    stiffness: 100
                  }}
                  className="absolute z-20"
                  style={{
                    ...cardStyles[index],
                    transform: 'translate(-50%, -50%)',
                  }}
                >
                  <div
                    className="border shadow-lg flex flex-col items-center justify-center overflow-hidden border-[#253E5C]/20"
                    style={{
                      width: '130px',
                      height: '120px',
                      transform: `rotate(${cardRotations[index]}deg)`,
                      transformOrigin: 'center center',
                      clipPath: 'polygon(50% 0%, 95% 35%, 70% 100%, 30% 100%, 5% 35%)',
                      WebkitClipPath: 'polygon(50% 0%, 95% 35%, 70% 100%, 30% 100%, 5% 35%)',
                      borderRadius: '8px',
                      background: cardColors[index].bg,
                    }}
                  >
                    <div
                      className="text-center flex flex-col items-center justify-center"
                      style={{
                        transform: `rotate(${-cardRotations[index]}deg)`,
                        transformOrigin: 'center center',
                        width: '100%',
                        height: '100%',
                        padding: '6px 8px',
                      }}
                    >
                      {(() => {
                        const [line1, line2] = processLabelsSplit[index];
                        
                        return (
                          <>
                            <div 
                              className="mb-2 flex items-center justify-center"
                              style={{ lineHeight: '1' }}
                            >
                              <img 
                                src={processIcons[index]} 
                                alt={processLabels[index]}
                                className="w-8 h-8 object-contain"
                                loading="lazy"
                              />
                            </div>
                            <div className="flex flex-col items-center">
                              <span 
                                className="text-[13px] font-bold leading-tight" 
                                style={{ 
                                  lineHeight: '1.2',
                                  color: cardColors[index].text,
                                }}
                              >
                                {line1}
                              </span>
                              <span 
                                className="text-[13px] font-bold leading-tight" 
                                style={{ 
                                  lineHeight: '1.2',
                                  color: cardColors[index].text,
                                }}
                              >
                                {line2}
                              </span>
                            </div>
                          </>
                        );
                      })()}
                    </div>
                  </div>
                </motion.div>
              );
            })}
            
            <div className="w-32 h-32 md:w-40 md:h-40 rounded-full p-6 md:p-8 bg-transparent flex items-center justify-center relative z-10 overflow-hidden">
              {/* Partial circle border - 260 degrees split into 7 colored segments */}
              {(() => {
                const borderRotation = 230;
                const centerX = 50;
                const centerY = 50;
                const radius = 40;
                const totalArc = 260;
                const segmentAngle = totalArc / 7;
                
                return (
                  <svg 
                    className="absolute inset-0 w-full h-full"
                    viewBox="0 0 100 100"
                    style={{ transform: `rotate(${borderRotation}deg)` }}
                  >
                    {cardColors.map((cardColor, index) => {
                      const startAngle = (index * segmentAngle) - 90;
                      const endAngle = ((index + 1) * segmentAngle) - 90;
                      
                      const startRad = (startAngle * Math.PI) / 180;
                      const endRad = (endAngle * Math.PI) / 180;
                      
                      const x1 = centerX + radius * Math.cos(startRad);
                      const y1 = centerY + radius * Math.sin(startRad);
                      const x2 = centerX + radius * Math.cos(endRad);
                      const y2 = centerY + radius * Math.sin(endRad);
                      
                      const largeArcFlag = segmentAngle > 180 ? 1 : 0;
                      
                      return (
                        <path
                          key={index}
                          d={`M ${x1} ${y1} A ${radius} ${radius} 0 ${largeArcFlag} 1 ${x2} ${y2}`}
                          fill="none"
                          stroke={cardColor.bg}
                          strokeWidth="20"
                          strokeLinecap="butt"
                          strokeOpacity="0.85"
                        />
                      );
                    })}
                  </svg>
                );
              })()}
              <img 
                src={favicon} 
                alt="Advertio Logo" 
                className="w-full h-full object-contain rounded-full relative z-10"
                loading="lazy"
              />
            </div>
          </motion.div>
        </div>
      </div>
    </motion.section>
  );
};

export default ProcessBackdrop;

