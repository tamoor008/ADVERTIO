import { useEffect, useRef, useState, useMemo, memo } from 'react';
import { motion, AnimatePresence, useInView, useMotionValue, animate } from 'framer-motion';
import { useNavigate, Link } from 'react-router-dom';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import favicon from '../assets/favicon.JPG';
import advertioLogo from '../assets/logo-Advertio.png';

// Brand images imports
import baileyMercer from '../assets/bailey mercer.png';
import celvora from '../assets/Celvora.png';
import customizology from '../assets/customizology.jpg';
import donior from '../assets/donior new logo  (1).png';
import glamboon from '../assets/glamboon.jpg';
import gloet from '../assets/Gloet.jpeg';
import htFinds from '../assets/HT Finds.png';
import infiniteage from '../assets/infiniteage.jpeg';
import lr from '../assets/LR.jpeg';
import naturelox from '../assets/naturelox.jpeg';
import neuroreform from '../assets/neuroreform.jpg';
import novelle from '../assets/Novelle.png';
import outdoorplay from '../assets/outdoorplay.png';
import palm from '../assets/Palm v2.png';
import sarwayush from '../assets/sarwayush.jpeg';
import smartykat from '../assets/smartykat.jpeg';
import ssLogo from '../assets/ss logo bgr (1).jpg';
import techhunts from '../assets/techhunts.jpg';
import valueMakers from '../assets/Value makers .png';
import vikingbags from '../assets/vikingbags.jpeg';
import xoegan from '../assets/xoegan.png';
import zhanng from '../assets/zhanng.jpg';

// Mockup images imports
import mockup1 from '../assets/mockups1.png';
import mockup2 from '../assets/mockups2.png';
import mockup3 from '../assets/Mockup3.png';
import mockup4 from '../assets/mockup4.png';
import mockup5 from '../assets/Mockup5.png';
import mockup6 from '../assets/mockup6.png';
import playButton from '../assets/play-buttons.png';
import talhaImage from '../assets/talha.jpg';
import tabishImage from '../assets/tabish.jpg';
import seoImage from '../assets/SEO.jpg';

// Process icons imports
import storeAnalysisIcon from '../assets/Store-analysis.png';
import growthStrategyIcon from '../assets/Growht-Strategy.png';
import multiChannelIcon from '../assets/multi-channel.png';
import contentCreatorIcon from '../assets/content-creator.png';
import campaignLaunchIcon from '../assets/compaign-launch.png';
import performanceIcon from '../assets/performance.png';
import analyticsIcon from '../assets/analytics.png';

gsap.registerPlugin(ScrollTrigger);

const servicesList = [
  { id: 'performance-marketing', title: 'Performance Marketing', desc: 'Drive measurable growth with data-driven campaigns engineered for maximum ROI.' },
  { id: 'digital-marketing', title: 'Digital Marketing', desc: 'Build a strong online presence with strategies that connect, engage, and convert.' },
  { id: 'social-media-handling-branding', title: 'Social Media Handling & Branding', desc: 'Grow your influence and build a brand your audience loves.' },
  { id: 'creative-design', title: 'Creative & Design', desc: 'Transform your brand visuals into powerful assets that influence and inspire.' },
  { id: 'video-editing', title: 'Video Editing', desc: 'Create cinematic visuals that elevate your brand and captivate your audience.' },
  { id: 'website-development', title: 'Website Development', desc: 'Build a high-performance website that converts visitors into customers.' },
  { id: 'shopify-store-development', title: 'Shopify Store Development', desc: 'Launch a revenue-driven Shopify store built for performance, scalability, and brand experience.' },
  { id: 'ecommerce-solutions', title: 'Ecommerce Solutions', desc: 'Empower your online business with complete ecommerce strategy, technology, and growth solutions.' },
];

const processSteps = [
  'We analyze your e-commerce store, target audience, and competitors to establish clear growth objectives.',
  'Develop a comprehensive digital strategy focused on customer acquisition, retention, and increasing average order value.',
  'Create high-converting ad campaigns across Google, Facebook, Instagram, and other platforms where your customers shop.',
  'Design compelling product content, email campaigns, and social media posts that drive engagement and conversions.',
  'Launch optimized campaigns with A/B testing, conversion rate optimization, and retargeting strategies to maximize sales.',
  'Track key e-commerce metrics including ROAS, conversion rates, customer lifetime value, and cart abandonment.',
  'Receive detailed performance reports with actionable insights to scale your e-commerce business profitably.',
];

const processLabels = [
  'Store Analysis',
  'Growth Strategy',
  'Multi-Channel Ads',
  'Content Creation',
  'Campaign Launch',
  'Performance Tracking',
  'ROI Reports',
];

const processIcons = [
  storeAnalysisIcon,
  growthStrategyIcon,
  multiChannelIcon,
  contentCreatorIcon,
  campaignLaunchIcon,
  performanceIcon,
  analyticsIcon,
];

const processLabelsSplit = [
  ['Store', 'Analysis'],
  ['Growth', 'Strategy'],
  ['Multi-Channel', 'Ads'],
  ['Content', 'Creation'],
  ['Campaign', 'Launch'],
  ['Performance', 'Tracking'],
  ['ROI', 'Reports'],
];

const heroBadges = [
  'Ecommerce Growth Pods',
  'Launch Creative Lab',
  'C-Suite Ready Reporting',
];

const heroHighlights = [
  { label: 'Paid Media Efficiency', value: '12%', detail: 'Lower CAC quarter over quarter' },
  { label: 'Lifecycle Revenue', value: '+38%', detail: 'Retention programs scaled' },
  { label: 'Average ROAS', value: '5.4x', detail: 'Across flagship campaigns' },
  { label: 'Sprint Velocity', value: '14 days', detail: 'From insight to launch' },
];

// Static graph and funnel values that don't change
const staticHeroSignals = [
  { label: 'Awareness', progress: 87 },
  { label: 'Consideration', progress: 89 },
  { label: 'Conversion', progress: 93 },
];

const staticHeroLinePoints = [
  { x: 10, y: 80 },
  { x: 60, y: 65 },
  { x: 110, y: 72 },
  { x: 160, y: 40 },
  { x: 210, y: 55 },
  { x: 260, y: 25 },
];

const heroModes = [
  {
    word: 'proven',
    highlights: [
      { label: 'Paid Media Efficiency', value: '12%', detail: 'Lower CAC quarter over quarter' },
      { label: 'Lifecycle Revenue', value: '+38%', detail: 'Retention programs scaled' },
      { label: 'Average ROAS', value: '5.4x', detail: 'Across flagship campaigns' },
      { label: 'Sprint Velocity', value: '14 days', detail: 'From insight to launch' },
    ],
  },
  {
    word: 'powerful',
    highlights: [
      { label: 'Campaign Reach', value: '2.4M', detail: 'Impressions across channels' },
      { label: 'Engagement Rate', value: '+45%', detail: 'Year over year growth' },
      { label: 'Brand Lift', value: '18%', detail: 'Measured awareness increase' },
      { label: 'Content Velocity', value: '28/day', detail: 'Assets produced weekly' },
    ],
  },
  {
    word: 'profitable',
    highlights: [
      { label: 'Revenue Growth', value: '+128%', detail: 'Quarter over quarter' },
      { label: 'Profit Margin', value: '34%', detail: 'Average campaign margin' },
      { label: 'LTV Increase', value: '+52%', detail: 'Customer lifetime value' },
      { label: 'ROI Multiplier', value: '6.8x', detail: 'Return on ad spend' },
    ],
  },
  {
    word: 'performance-based',
    highlights: [
      { label: 'Conversion Rate', value: '8.2%', detail: 'Average across campaigns' },
      { label: 'Cost Per Lead', value: '-24%', detail: 'Optimization impact' },
      { label: 'Attribution Accuracy', value: '94%', detail: 'Multi-touch tracking' },
      { label: 'Optimization Cycles', value: '3x/week', detail: 'Real-time adjustments' },
    ],
  },
];

const rotatingWords = heroModes.map((mode) => mode.word);

const ProcessBackdrop = () => {
  const [expandedCardIndex, setExpandedCardIndex] = useState(null);

  // Solid colors for each card based on brand color scheme
  // Store Analysis (index 0) should be #253E5C
  // Growth Strategy (index 1) should be #16A34A
  // Multi-Channel Ads (index 2) should be #6D28D9
  // Content Creation (index 3) should be #EA580C
  // Campaign Launch (index 4) should be #DC2626
  // Performance Tracking (index 5) should be #0F766E
  // ROI Reports (index 6) should be #059669
  const cardColors = [
    { bg: '#253E5C', text: '#FFFFFF' },      // Store Analysis - Dark blue
    { bg: '#16A34A', text: '#FFFFFF' },      // Growth Strategy - Green
    { bg: '#6D28D9', text: '#FFFFFF' },      // Multi-Channel Ads - Purple
    { bg: '#EA580C', text: '#FFFFFF' },      // Content Creation - Orange
    { bg: '#DC2626', text: '#FFFFFF' },      // Campaign Launch - Red
    { bg: '#0F766E', text: '#FFFFFF' },      // Performance Tracking - Teal
    { bg: '#059669', text: '#FFFFFF' },      // ROI Reports - Green
  ];

  // CARD POSITIONING STYLES - Adjust these values to position each card
  // Located at: src/pages/Home.jsx, lines ~36-44
  // Each card has left and top values. Adjust the pixel values to move cards around the border.
  const cardStyles = [
    { left: 'calc(12% + 0px)', top: 'calc(77.3% + -180px)' },      // Card 1 - Top of gap
    { left: 'calc(12% + 0px)', top: 'calc(57% + -180px)' },    // Card 2
    { left: 'calc(23% + 0px)', top: 'calc(42% + -180px)' },        // Card 3
    { left: 'calc(39% + 0px)', top: 'calc(37% + -180px)' },     // Card 4
    { left: 'calc(55% + 0px)', top: 'calc(42% + -180px)' },        // Card 5
    { left: 'calc(66% + 0px)', top: 'calc(57% + -180px)' },    // Card 6
    { left: 'calc(66% + 0px)', top: 'calc(77.3% + -180px)' },       // Card 7
  ];

  // CARD ROTATION VALUES - Adjust these degrees to rotate each card
  // Located at: src/pages/Home.jsx, lines ~49-56
  const cardRotations = [
    180,    // Card 1 rotation in degrees
    0,   // Card 2 rotation in degrees
  33,  // Card 3 rotation in degrees
  0,   // Card 4 rotation in degrees
  -33,  // Card 5 rotation in degrees
    0,   // Card 6 rotation in degrees
    180,  // Card 7 rotation in degrees
  ];

  // LINE POSITIONING STYLES - Adjust these values to position each line
  const linePositions = [
    { left: 'calc(30% + 0px)', top: 'calc(70% + -180px)' },      // Line 1
    { left: 'calc(30.5% + 0px)', top: 'calc(56% + 0px)' },      // Line 2
    { left: 'calc(37% + 0px)', top: 'calc(28% + 0px)' },      // Line 3
    { left: 'calc(48.5% + 0px)', top: 'calc(24% + 0px)' },      // Line 4
    { left: 'calc(58% + 0px)', top: 'calc(38% + 0px)' },      // Line 5
    { left: 'calc(63% + 0px)', top: 'calc(44.5% + 0px)' },      // Line 6
    { left: 'calc(62% + 0px)', top: 'calc(53% + 0px)' },      // Line 7
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
          {/* 7 Dotted lines - positioned absolutely for manual alignment */}
          {processSteps.map((text, index) => {
            const randomRotations = [30,-20,60, 90, -60, -30, 30];
            // Individual widths for each line - adjust these values to customize each line's length
            const lineWidths = ['50px', '47px', '68px', '68px', '79px', '50px', '47px']; // Line 1, Line 2, Line 3, Line 4, Line 5, Line 6, Line 7
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
              const borderRotation = 230; // Adjust this value to rotate the border (in degrees)
              const centerX = 50;
              const centerY = 50;
              const radius = 40;
              const totalArc = 260; // degrees
              const segmentAngle = totalArc / 7; // ~37.14 degrees per segment
              
              return (
                <svg 
                  className="absolute inset-0 w-full h-full"
                  viewBox="0 0 100 100"
                  style={{ transform: `rotate(${borderRotation}deg)` }}
                >
                  {cardColors.map((cardColor, index) => {
                    const startAngle = (index * segmentAngle) - 90; // Start from top, adjusted for rotation
                    const endAngle = ((index + 1) * segmentAngle) - 90;
                    
                    // Convert degrees to radians and calculate start/end points
                    const startRad = (startAngle * Math.PI) / 180;
                    const endRad = (endAngle * Math.PI) / 180;
                    
                    const x1 = centerX + radius * Math.cos(startRad);
                    const y1 = centerY + radius * Math.sin(startRad);
                    const x2 = centerX + radius * Math.cos(endRad);
                    const y2 = centerY + radius * Math.sin(endRad);
                    
                    // Calculate arc path
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
              className="w-full h-full object-contain rounded-full relative z-10 "  
            />
          </div>
        </motion.div>
      </div>
    </div>
  </motion.section>
  );
};

const statsData = [
  { label: 'Years Experience', value: 5, suffix: '+' },
  { label: 'Projects Delivered', value: 80, suffix: '+' },
  { label: 'Success Rate', value: 90, suffix: '%' },
  { label: 'Countries', value: 5, suffix: '+' },
];

const AnimatedStat = ({ stat, isInView }) => {
  const count = useMotionValue(0);
  const [displayValue, setDisplayValue] = useState(0);

  useEffect(() => {
    const unsubscribe = count.on('change', (latest) => {
      setDisplayValue(Math.round(latest));
    });
    return () => unsubscribe();
  }, [count]);

  useEffect(() => {
    if (!isInView) return undefined;
    const controls = animate(count, stat.value, {
      duration: 1.6,
      ease: [0.22, 1, 0.36, 1],
    });
    return () => controls.stop();
  }, [count, isInView, stat.value]);

  return (
    <motion.div
      className="rounded-[28px] p-[2px]"
      style={{
        borderRadius: '28px',
        border: '2px solid transparent',
        backgroundImage: 'linear-gradient(rgba(255,255,255,0), rgba(255,255,255,0)), linear-gradient(120deg, #253E5C, #e94f37)',
        backgroundOrigin: 'border-box',
        backgroundClip: 'padding-box, border-box',
      }}
      initial={{ opacity: 0, y: 20 }}
      animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
      transition={{ duration: 0.6 }}
    >
      <div className="flex flex-col items-center text-center px-3 py-4 md:px-4 md:py-6 rounded-[26px] bg-transparent">
        <span
          className="text-3xl md:text-5xl font-black tracking-tight text-white"
          style={{
            color: '#FFFFFF',
          }}
        >
          {displayValue}
          {stat.suffix}
        </span>
        <p className="mt-2 md:mt-3 text-xs md:text-base font-semibold text-white/80 uppercase tracking-[0.3em] whitespace-nowrap">
          {stat.label}
        </p>
      </div>
    </motion.div>
  );
};

const MetricsBar = () => {
  const sectionRef = useRef(null);
  const isInView = useInView(sectionRef, { once: true, amount: 0.3 });

  return (
    <section className="relative z-10 pb-24 overflow-visible">
      <div className="relative w-full">
        <motion.div
          ref={sectionRef}
          className="p-[2px] bg-gradient-to-r from-[#253E5C] via-primary to-[#ff7b5f]"
          initial={{ opacity: 0, y: 40, filter: 'blur(14px)' }}
          animate={
            isInView
              ? { opacity: 1, y: 0, filter: 'blur(0px)' }
              : { opacity: 0, y: 40, filter: 'blur(14px)' }
          }
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
        >
          <div className="bg-white/70 backdrop-blur-2xl border border-white/40 p-10">
            <div className="text-center mb-10">
              <p className="text-xs tracking-[0.4em] uppercase text-[#253E5C]/60">Impact</p>
              <h3 className="text-3xl md:text-4xl font-black text-[#253E5C]">
                Trusted by High-Growth Brands
              </h3>
              <p className="text-[#253E5C]/70 mt-3 text-base max-w-2xl mx-auto">
                A glimpse at the momentum we have built with our partners across immersive campaigns.
              </p>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
              {statsData.map((stat) => (
                <AnimatedStat key={stat.label} stat={stat} isInView={isInView} />
              ))}
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

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

const TeamSection = () => {
  const sectionRef = useRef(null);
  const isInView = useInView(sectionRef, { once: true, amount: 0.2 });
  const [hoveredIndex, setHoveredIndex] = useState(null);

  const teamMembers = [
    {
      id: 1,
      name: 'Talha Azmat',
      role: 'CEO',
      bio: 'Leading innovative campaigns with a passion for storytelling and brand transformation.',
      expertise: ['Brand Strategy', 'Creative Direction', 'Campaign Design'],
      image: talhaImage,
    },
    {
      id: 2,
      name: 'Tabish',
      role: 'Creative Director',
      bio: 'Driving data-driven growth strategies that deliver measurable results for e-commerce brands.',
      expertise: ['Performance Marketing', 'Growth Strategy', 'Analytics'],
      image: tabishImage,
    },
    {
      id: 3,
      name: 'Shayan Malik',
      role: 'SEO Expert',
      bio: 'Building immersive digital experiences with cutting-edge technology and creative solutions.',
      expertise: ['Web Development', '3D Design', 'Technical Innovation'],
      image: seoImage,
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
      className="relative z-10 py-24 overflow-hidden bg-gradient-to-b from-white/30 via-white/50 to-white/80 w-full"
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
            // Different heights for each card
            const cardHeights = [
              'h-[440px] md:h-[540px] lg:h-[580px]',  // Card 1 - shortest
              'h-[490px] md:h-[640px] lg:h-[680px]',  // Card 2 - medium-tall
              'h-[470px] md:h-[570px] lg:h-[600px]',  // Card 3 - medium
              'h-[510px] md:h-[610px] lg:h-[660px]',  // Card 4 - tall
            ];
            
            return (
            <motion.div
              key={member.id}
              className={`relative group ${
                index === 0 ? 'mt-8 md:mt-12 lg:mt-16' : 
                index === 2 ? 'mt-4 md:mt-6 lg:mt-8' : ''
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
                <motion.div
                  className="absolute inset-0 z-0"
                  animate={{
                    scale: hoveredIndex === index ? 1.1 : 1,
                    filter: hoveredIndex === index ? 'brightness(0.4)' : 'brightness(1)',
                  }}
                  transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
                >
                  <img
                    src={member.image}
                    alt={member.name}
                    className="w-full h-full object-cover"
                    loading="lazy"
                  />
                  {/* Gradient Overlay - Hidden on hover */}
                  <motion.div 
                    className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent z-0"
                    animate={{
                      opacity: hoveredIndex === index ? 0 : 1,
                    }}
                    transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
                  />
                </motion.div>

                {/* Initial State - Just Name */}
                <motion.div
                  className="absolute bottom-0 left-0 right-0 p-8 md:p-10 z-[15]"
                  animate={{
                    opacity: hoveredIndex === index ? 0 : 1,
                    y: hoveredIndex === index ? 30 : 0,
                  }}
                  transition={{ 
                    duration: hoveredIndex === index ? 0.3 : 0.5, 
                    delay: hoveredIndex === index ? 0 : 0,
                    ease: [0.22, 1, 0.36, 1] 
                  }}
                >
                  <motion.h4
                    className="text-3xl md:text-4xl font-black text-white"
                    initial={{ opacity: 0 }}
                    animate={
                      isInView
                        ? { opacity: 1 }
                        : { opacity: 0 }
                    }
                    transition={{ delay: index * 0.1, duration: 0.5 }}
                  >
                    {member.name}
                  </motion.h4>
                </motion.div>

                {/* Hover State - Full Details */}
                <AnimatePresence mode="wait">
                  {hoveredIndex === index && (
                    <motion.div
                      className="absolute inset-0 p-8 md:p-10 lg:p-12 flex flex-col justify-end z-[25]"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
                    >
                      {/* Animated Background Gradient */}
                      <motion.div
                        className="absolute inset-0 bg-gradient-to-t from-[#253E5C]/95 via-[#253E5C]/80 to-transparent z-[25]"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
                      />

                      {/* Content - Only Name and Role */}
                      <motion.div
                        className="relative z-[30]"
                        initial={{ y: 40, opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        exit={{ y: 40, opacity: 0 }}
                        transition={{ duration: 0.6, delay: 0.15, ease: [0.22, 1, 0.36, 1] }}
                      >
                        <motion.h4
                          className="text-4xl md:text-5xl font-black text-white mb-3"
                          initial={{ x: -20, opacity: 0 }}
                          animate={{ x: 0, opacity: 1 }}
                          transition={{ delay: 0.2, duration: 0.5 }}
                        >
                          {member.name}
                        </motion.h4>
                        <motion.p
                          className="text-primary text-xl md:text-2xl font-semibold"
                          initial={{ x: -20, opacity: 0 }}
                          animate={{ x: 0, opacity: 1 }}
                          transition={{ delay: 0.25, duration: 0.5 }}
                        >
                          {member.role}
                        </motion.p>
                      </motion.div>
                    </motion.div>
                  )}
                </AnimatePresence>

                {/* Decorative Elements */}
                <motion.div
                  className="absolute top-8 right-8 md:top-10 md:right-10 w-20 h-20 md:w-24 md:h-24 rounded-full border-2 border-white/20 z-[12]"
                  animate={{
                    scale: hoveredIndex === index ? 1.2 : 1,
                    opacity: hoveredIndex === index ? 0.3 : 0.1,
                  }}
                  transition={{ duration: 0.6 }}
                />
                <motion.div
                  className="absolute top-10 right-10 md:top-12 md:right-12 w-16 h-16 md:w-20 md:h-20 rounded-full border-2 border-primary/30 z-[12]"
                  animate={{
                    scale: hoveredIndex === index ? 1.3 : 1,
                    opacity: hoveredIndex === index ? 0.5 : 0.2,
                  }}
                  transition={{ duration: 0.6, delay: 0.1 }}
                />
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

const ServicesSection = ({ expanded, setExpanded }) => {
  const sectionRef = useRef(null);
  const isInView = useInView(sectionRef, { once: true, amount: 0.2 });
  const navigate = useNavigate();

  const handleServiceClick = (serviceId) => {
    navigate(`/services/${serviceId}`);
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
                  className="service-card group rounded-xl sm:rounded-2xl md:rounded-3xl border border-[#253E5C]/10 bg-white/90 p-3 sm:p-4 md:p-5 lg:p-6 shadow-md sm:shadow-lg transition-all duration-400 hover:-translate-y-2 hover:border-primary/30 cursor-pointer w-full"
                  initial={{ opacity: 0, y: 60, scale: 0.9 }}
                  whileInView={{ opacity: 1, y: 0, scale: 1 }}
                  viewport={{ once: true, amount: 0.2 }}
                  transition={{
                    duration: 0.6,
                    delay: 0.5 + index * 0.1,
                    ease: [0.22, 1, 0.36, 1],
                  }}
                  whileHover={{ y: -6 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => handleServiceClick(service.id)}
                  onMouseMove={(e) => {
                    const card = e.currentTarget;
                    const rect = card.getBoundingClientRect();
                    const x = ((e.clientX - rect.left) / rect.width) * 100;
                    const y = ((e.clientY - rect.top) / rect.height) * 100;
                    card.style.setProperty('--mouse-x', `${x}%`);
                    card.style.setProperty('--mouse-y', `${y}%`);
                  }}
                >
                  <div className="service-card-content">
                    <h4 className="text-base sm:text-lg md:text-xl font-semibold text-[#253E5C] mb-2 sm:mb-2.5 md:mb-3 transition-all duration-400 group-hover:text-white group-hover:translate-x-1">
                      {service.title}
                    </h4>
                    <p className="text-xs sm:text-sm md:text-base text-[#253E5C]/70 leading-relaxed font-medium transition-colors duration-400 group-hover:text-white/90">{service.desc}</p>
                  </div>
                </motion.div>
              ))}
              
              <AnimatePresence>
                {expanded && servicesList.slice(6).map((service, index) => (
                  <motion.div
                    key={service.title}
                    className="service-card group rounded-xl sm:rounded-2xl md:rounded-3xl border border-[#253E5C]/10 bg-white/90 p-3 sm:p-4 md:p-5 lg:p-6 shadow-md sm:shadow-lg transition-all duration-400 hover:-translate-y-2 hover:border-primary/30 cursor-pointer w-full"
                    initial={{ opacity: 0, y: 40, scale: 0.9 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: -20, scale: 0.9 }}
                    transition={{ 
                      duration: 0.5,
                      delay: index * 0.1
                    }}
                    whileHover={{ y: -6 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={() => handleServiceClick(service.id)}
                    onMouseMove={(e) => {
                      const card = e.currentTarget;
                      const rect = card.getBoundingClientRect();
                      const x = ((e.clientX - rect.left) / rect.width) * 100;
                      const y = ((e.clientY - rect.top) / rect.height) * 100;
                      card.style.setProperty('--mouse-x', `${x}%`);
                      card.style.setProperty('--mouse-y', `${y}%`);
                    }}
                  >
                    <div className="service-card-content">
                      <h4 className="text-base sm:text-lg md:text-xl font-semibold text-[#253E5C] mb-2 sm:mb-2.5 md:mb-3 transition-all duration-400 group-hover:text-white group-hover:translate-x-1">
                        {service.title}
                      </h4>
                      <p className="text-xs sm:text-sm md:text-base text-[#253E5C]/70 leading-relaxed font-medium transition-colors duration-400 group-hover:text-white/90">{service.desc}</p>
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

const Home = () => {
  const heroRef = useRef(null);
  const textRef = useRef(null);
  const [expanded, setExpanded] = useState(false);
  const [rotatingIndex, setRotatingIndex] = useState(0);
  const currentHeroMode = heroModes[rotatingIndex] ?? heroModes[0];
  const heroLinePoints = staticHeroLinePoints.map((point) => `${point.x},${point.y}`).join(' ');

  // Scroll to top on mount
  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: 'instant' });
  }, []);

  useEffect(() => {
    const tl = gsap.timeline();
    
    if (textRef.current) {
      tl.from(textRef.current.children, {
        opacity: 0,
        duration: 1,
        stagger: 0.2,
        ease: 'power3.out',
      });
    }

    ScrollTrigger.create({
      trigger: heroRef.current,
      start: 'top top',
      end: 'bottom top',
      scrub: true,
      onUpdate: (self) => {
        if (heroRef.current) {
          heroRef.current.style.opacity = 1 - self.progress;
        }
      },
    });
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      setRotatingIndex((prev) => (prev + 1) % rotatingWords.length);
    }, 2200);
    return () => clearInterval(interval);
  }, []);

  return (
    <>
      <style>{`
        .service-card {
          position: relative;
          overflow: hidden;
          isolation: isolate;
          max-width: 100%;
          box-sizing: border-box;
        }
        
        /* Animated gradient background on hover */
        .service-card::before {
          content: '';
          position: absolute;
          inset: 0;
          border-radius: inherit;
          background: 
            radial-gradient(circle at var(--mouse-x, 50%) var(--mouse-y, 50%), 
              rgba(233, 79, 55, 0.15) 0%,
              rgba(37, 62, 92, 0.12) 40%,
              rgba(233, 79, 55, 0.08) 70%,
              transparent 100%);
          opacity: 0;
          transition: opacity 0.4s cubic-bezier(0.4, 0, 0.2, 1);
          z-index: 1;
          pointer-events: none;
        }
        
        .service-card:hover::before {
          opacity: 1;
        }
        
        /* Main hover background with gradient */
        .service-card::after {
          content: '';
          position: absolute;
          inset: 0;
          border-radius: inherit;
          background: linear-gradient(135deg, 
            rgba(37, 62, 92, 0.95) 0%,
            rgba(37, 62, 92, 0.92) 50%,
            rgba(233, 79, 55, 0.15) 100%);
          opacity: 0;
          transition: opacity 0.4s cubic-bezier(0.4, 0, 0.2, 1);
          z-index: 1;
          pointer-events: none;
        }
        
        .service-card:hover::after {
          opacity: 1;
        }
        
        .service-card-content {
          position: relative;
          z-index: 2;
          transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
        }
        
        /* Enhanced shadow on hover */
        .service-card:hover {
          box-shadow: 
            0 20px 40px rgba(37, 62, 92, 0.2),
            0 0 0 1px rgba(233, 79, 55, 0.2),
            0 0 30px rgba(233, 79, 55, 0.15);
        }
        
        /* Show horizontal scrollbar on mobile, hide on desktop/laptop */
        .reviews-scroll-container {
          /* Mobile: show scrollbar */
          scrollbar-width: thin; /* Firefox - thin scrollbar on mobile */
          scrollbar-color: #253E5C rgba(37, 62, 92, 0.1); /* Dark blue thumb, light track */
          -ms-overflow-style: auto; /* IE and Edge - show scrollbar on mobile */
        }
        
        /* Desktop/Laptop: hide scrollbar */
        @media (min-width: 768px) {
          .reviews-scroll-container {
            scrollbar-width: none; /* Firefox - hide on desktop */
            -ms-overflow-style: none; /* IE and Edge - hide on desktop */
          }
          
          .reviews-scroll-container::-webkit-scrollbar {
            display: none; /* WebKit - hide horizontal scrollbar on desktop */
          }
        }
        
        /* Mobile: style the scrollbar with dark blue */
        @media (max-width: 767px) {
          .reviews-scroll-container::-webkit-scrollbar {
            display: block; /* Show scrollbar on mobile */
            height: 8px;
          }
          
          .reviews-scroll-container::-webkit-scrollbar-track {
            background: rgba(37, 62, 92, 0.1);
            border-radius: 10px;
          }
          
          .reviews-scroll-container::-webkit-scrollbar-thumb {
            background: #253E5C; /* Dark blue color */
            border-radius: 10px;
          }
          
          .reviews-scroll-container::-webkit-scrollbar-thumb:hover {
            background: #1a2d42; /* Darker blue on hover */
          }
          
          /* Reduce review card size on mobile */
          .reviews-scroll-container .group {
            width: 300px !important;
            min-width: 300px !important;
          }
          
          .reviews-scroll-container .group > div {
            min-height: 450px !important;
          }
          
          .reviews-scroll-container .review-card-content {
            min-height: 450px !important;
            padding: 1.5rem !important;
          }
        }
        
        /* Ensure review cards stay crisp on hover */
        .review-card-content {
          -webkit-font-smoothing: antialiased;
          -moz-osx-font-smoothing: grayscale;
          text-rendering: optimizeLegibility;
        }
        
        .review-card-content * {
          -webkit-font-smoothing: antialiased;
          -moz-osx-font-smoothing: grayscale;
        }
        
        .review-card-image {
          image-rendering: auto;
          -webkit-backface-visibility: hidden;
          backface-visibility: hidden;
          transform: translateZ(0);
          will-change: transform;
        }
      `}</style>
      <div className="relative min-h-screen overflow-visible bg-white" style={{ backgroundColor: '#FFFFFF', background: '#FFFFFF' }}>
        <div
          ref={heroRef}
          className="relative min-h-screen flex items-center px-6 py-16 overflow-visible"
        >
          <div className="relative w-full max-w-[1500px] mx-auto grid gap-12 lg:grid-cols-[1.1fr_0.9fr] items-center">
            <div className="relative z-30 text-center lg:text-left">
              <motion.div
                className="flex flex-wrap items-center justify-center lg:justify-start gap-3 mb-8"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.1 }}
              >
                <span className="px-4 py-1 rounded-full border border-primary/40 text-primary text-xs font-semibold tracking-[0.3em] uppercase bg-white/80 backdrop-blur">
                  Marketing Ops Partner
                </span>
                <span className="px-4 py-1 rounded-full border border-[#253E5C]/20 text-[#253E5C] text-xs font-semibold tracking-[0.3em] uppercase bg-white/70 backdrop-blur">
                  Ecommerce & Product Launches
                </span>
              </motion.div>

              <motion.div
                ref={textRef}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 1 }}
                className="space-y-6"
              >
                <motion.p
                  className="text-2xl md:text-[50px] font-black text-[#253E5C] max-w-4xl mx-auto lg:ml-0 leading-tight tracking-tight mb-6"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 1, delay: 0.3 }}
                >
                  We scale DTC ecommerce brands through digital marketing that's:{' '}
                  <span className="relative inline-flex items-end h-[1.1em] w-[16ch]  align-baseline">
                    <AnimatePresence mode="wait" initial={false}>
                      <motion.span
                        key={rotatingWords[rotatingIndex]}
                        initial={{ opacity: 0, y: 12 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -12 }}
                        transition={{ duration: 0.35, ease: 'easeOut' }}
                        className="absolute left-0 top-2 w-full capitalize bg-gradient-to-r from-primary to-[#ff6b4a] bg-clip-text text-transparent"
                      >
                        {rotatingWords[rotatingIndex]}.
                      </motion.span>
                    </AnimatePresence>
                  </span>
                </motion.p>
              </motion.div>

              <motion.div
                className="relative z-30 flex gap-4 md:gap-6 justify-center lg:justify-start flex-wrap mt-10"
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 1.1, duration: 0.8, ease: 'easeOut' }}
              >
                <motion.div
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <Link
                    to="/free-audit"
                    className="px-8 py-4 bg-primary text-white font-semibold rounded-full shadow-xl shadow-primary/30 hover:bg-primary/90 transition-colors inline-block"
                  >
                    Get Free Audit
                  </Link>
                </motion.div>
                <motion.div
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <Link
                    to="/services/performance-marketing"
                    className="px-8 py-4 border-2 border-primary text-primary font-semibold rounded-full bg-white/80 backdrop-blur hover:bg-primary/10 transition-colors inline-block"
                  >
                    Learn More
                  </Link>
                </motion.div>
              </motion.div>

              <div className="mt-12 flex flex-wrap justify-center lg:justify-start gap-3">
                {heroBadges.map((badge) => (
                  <span
                    key={badge}
                    className="px-4 py-2 rounded-2xl border border-[#253E5C]/15 bg-white/80 backdrop-blur text-sm font-semibold text-[#253E5C]/80 transition-all duration-300 ease-out hover:-translate-y-1 hover:border-primary/40 hover:bg-white hover:text-primary shadow-sm hover:shadow-lg"
                  >
                    {badge}
                  </span>
                ))}
              </div>
            </div>

            <div className="relative hidden lg:flex items-center justify-center">
              <div className="relative rounded-[36px] border border-white/10 p-10 w-full">
                <div className="flex items-start justify-between mb-6">
                  <div>
                    <img src={advertioLogo} alt="Advertio logo" className="h-12 object-contain -mb-3" />
                    <p className="text-3xl font-black text-[#253E5C]">Advertio Launch Sprint</p>
                  </div>
                  <div className="text-right">
                    <span className="text-4xl font-black text-primary">+128%</span>
                    <p className="text-xs text-[#253E5C]/60 uppercase tracking-[0.4em]">Revenue</p>
                  </div>
                </div>

                <div className="mb-8">
                  <svg viewBox="0 0 280 100" className="w-full h-28">
                    <defs>
                      <linearGradient id="heroLine" x1="0%" y1="0%" x2="100%" y2="0%">
                        <stop offset="0%" stopColor="#253E5C" stopOpacity="0.4" />
                        <stop offset="100%" stopColor="#E94F37" stopOpacity="0.8" />
                      </linearGradient>
                    </defs>
                    <motion.polyline
                      fill="none"
                      stroke="url(#heroLine)"
                      strokeWidth="3"
                      strokeLinecap="round"
                      points={heroLinePoints}
                      initial={{ pathLength: 0, opacity: 0.4 }}
                      animate={{ pathLength: 1, opacity: 1 }}
                      transition={{ duration: 0.8, ease: 'easeOut' }}
                    />
                    {staticHeroLinePoints.map((point, idx) => (
                      <motion.circle
                        key={`static-point-${idx}`}
                        cx={point.x}
                        cy={point.y}
                        r="4"
                        fill="#fff"
                        stroke="#253E5C"
                        strokeWidth="2"
                        initial={{ scale: 0, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        transition={{ duration: 0.4, delay: 0.1 * idx }}
                      />
                    ))}
                  </svg>
                </div>

                <div className="space-y-4">
                  {staticHeroSignals.map((signal) => (
                    <div key={`static-signal-${signal.label}`}>
                      <div className="flex items-center justify-between text-sm font-semibold text-[#253E5C] mb-1">
                        <span>{signal.label}</span>
                        <span>{signal.progress}%</span>
                      </div>
                      <div className="h-2 rounded-full bg-[#253E5C]/10 overflow-hidden">
                        <motion.div
                          className="h-full rounded-full bg-gradient-to-r from-[#253E5C] to-primary"
                          initial={{ width: 0 }}
                          animate={{ width: `${signal.progress}%` }}
                          transition={{ duration: 0.6, ease: 'easeOut' }}
                        />
                      </div>
                    </div>
                  ))}
                </div>

                <div className="mt-8 grid grid-cols-2 gap-4">
                  <AnimatePresence mode="wait">
                    {currentHeroMode.highlights.map((item) => (
                      <motion.div
                        key={`${currentHeroMode.word}-${item.label}`}
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -10 }}
                        transition={{ duration: 0.4 }}
                        className="p-4 rounded-2xl border border-[#253E5C]/10 bg-white/70"
                      >
                        <p className="text-xs uppercase tracking-[0.3em] text-[#253E5C]/60 mb-2">{item.label}</p>
                        <p className="text-2xl font-black text-[#253E5C]">{item.value}</p>
                        <p className="text-sm text-[#253E5C]/70">{item.detail}</p>
                      </motion.div>
                    ))}
                  </AnimatePresence>
                </div>
              </div>
            </div>
          </div>
        </div>

        <motion.div
          className="absolute bottom-10 left-1/2 transform -translate-x-1/2 z-10"
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
        >
          <svg className="w-6 h-6 text-[#253E5C]/60" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
          </svg>
        </motion.div>
      </div>

      <ServicesSection expanded={expanded} setExpanded={setExpanded} />

      <ProcessBackdrop />
      <MetricsBar />
      <WhyChooseAdvertio />
      <GetAQuoteSection />
      <TeamSection />
      <BrandCarousel />
      <MockupSection />
      <ReviewsSection3D />
      <VideoSection3D />
      <BlogsSection3D />
      <FAQSection3D />
      <ContactSection3D />
    </>
  );
};

const WhyChooseAdvertio = () => {
  const sectionRef = useRef(null);
  const isInView = useInView(sectionRef, { once: true, amount: 0.2 });
  const [hoveredIndex, setHoveredIndex] = useState(null);
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
      className="relative z-10 py-24 overflow-visible bg-gradient-to-b from-white/40 via-white/60 to-white/80 w-full"
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
            Why Choose Advertio? chose 
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
              initial={{ 
                opacity: 0, 
                y: 80,
                rotateX: -15,
                scale: 0.8
              }}
              animate={
                isInView
                  ? { 
                      opacity: 1, 
                      y: 0,
                      rotateX: 0,
                      scale: 1
                    }
                  : { 
                      opacity: 0, 
                      y: 80,
                      rotateX: -15,
                      scale: 0.8
                    }
              }
              transition={{
                duration: 0.8,
                delay: 0.4 + index * 0.12,
                ease: [0.22, 1, 0.36, 1],
              }}
              onMouseEnter={() => setHoveredIndex(index)}
              onMouseLeave={() => setHoveredIndex(null)}
              style={{ transformStyle: 'preserve-3d' }}
            >
              <motion.div
                className="relative rounded-[28px] border-2 border-primary/40 p-6 md:p-8 overflow-hidden cursor-pointer"
                style={{
                  transformStyle: 'preserve-3d',
                  backgroundColor: '#FFFFFF',
                }}
                animate={{
                  rotateY: hoveredIndex === index ? 5 : 0,
                  rotateX: hoveredIndex === index ? -3 : 0,
                  scale: hoveredIndex === index ? 1.05 : 1,
                  z: hoveredIndex === index ? 50 : 0,
                  backgroundColor: '#FFFFFF',
                }}
                transition={{
                  duration: 0.5,
                  ease: [0.22, 1, 0.36, 1],
                }}
              >
                {/* Blurred Logo Background */}
                <div
                  className="absolute inset-0 rounded-[28px] opacity-20"
                  style={{
                    backgroundImage: `url(${favicon})`,
                    backgroundSize: 'cover',
                    backgroundPosition: 'center',
                    backgroundRepeat: 'no-repeat',
                    filter: 'blur(4px)',
                    zIndex: 0,
                  }}
                />

                {/* Desktop: Animated Gradient Overlay on hover */}
                <motion.div
                  className="absolute inset-0 bg-gradient-to-br from-primary/10 via-transparent to-[#253E5C]/5 rounded-[28px] z-[1] hidden md:block"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: hoveredIndex === index ? 1 : 0 }}
                  transition={{ duration: 0.4 }}
                />

                {/* Mobile: Background gradient overlay when expanded (matches desktop hover) */}
                <motion.div
                  className="absolute inset-0 rounded-[28px] pointer-events-none md:hidden z-[1]"
                  style={{
                    background: 'linear-gradient(135deg, rgba(233, 79, 55, 0.95) 0%, rgba(37, 62, 92, 0.95) 100%)',
                  }}
                  animate={{ 
                    opacity: expandedCardIndex === index ? 1 : 0,
                  }}
                  transition={{ duration: 0.3, ease: 'easeInOut' }}
                />

                {/* Glow Effect */}
                <motion.div
                  className="absolute inset-0 rounded-[28px] z-[2]"
                  style={{
                    boxShadow: hoveredIndex === index 
                      ? '0 20px 60px rgba(233, 79, 55, 0.3), 0 0 40px rgba(233, 79, 55, 0.2), inset 0 0 20px rgba(233, 79, 55, 0.1)'
                      : '0 4px 20px rgba(37, 62, 92, 0.08)',
                  }}
                  transition={{ duration: 0.5 }}
                />

                {/* Content */}
                <div className="relative z-10">
                  <div className="flex items-start justify-between gap-4 mb-4">
                    <motion.h4
                      className="text-lg md:text-xl font-black leading-tight flex-1"
                      animate={{
                        color: hoveredIndex === index || (expandedCardIndex === index) ? '#FFFFFF' : '#253E5C',
                        scale: hoveredIndex === index ? 1.02 : 1,
                      }}
                      transition={{ duration: 0.3 }}
                    >
                      {feature.title}
                    </motion.h4>
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
                      <motion.svg
                        className="w-5 h-5"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                        animate={{ rotate: expandedCardIndex === index ? 45 : 0 }}
                        transition={{ duration: 0.3 }}
                      >
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M12 4v16m8-8H4" />
                      </motion.svg>
                    </button>
                  </div>
                  {/* Desktop: Always visible */}
                  <motion.p
                    className="hidden md:block text-[#253E5C]/70 text-sm md:text-base leading-relaxed font-bold"
                    animate={{
                      color: hoveredIndex === index ? '#FFFFFF' : 'rgb(3, 24, 49)',
                      opacity: hoveredIndex === index ? 1 : 0.7,
                    }}
                    transition={{ duration: 0.3 }}
                  >
                    {feature.description}
                  </motion.p>
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

                {/* Animated Border Glow */}
                <motion.div
                  className="absolute inset-0 rounded-[28px] pointer-events-none"
                  style={{
                    border: '2px solid transparent',
                    background: hoveredIndex === index
                      ? 'linear-gradient(135deg, rgba(233, 79, 55, 0.6), rgba(37, 62, 92, 0.4)) padding-box, linear-gradient(135deg, rgba(233, 79, 55, 0.8), rgba(37, 62, 92, 0.6)) border-box'
                      : 'transparent',
                  }}
                  animate={{
                    opacity: hoveredIndex === index ? 1 : 0,
                  }}
                  transition={{ duration: 0.4 }}
                />

                {/* Shimmer Effect */}
                {hoveredIndex === index && (
                  <motion.div
                    className="absolute inset-0 rounded-[28px] overflow-hidden"
                    initial={{ x: '-100%' }}
                    animate={{ x: '200%' }}
                    transition={{
                      duration: 1.2,
                      repeat: Infinity,
                      ease: 'linear',
                    }}
                    style={{
                      background: 'linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.4), transparent)',
                      width: '50%',
                      height: '100%',
                    }}
                  />
                )}
              </motion.div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Background Decorative Elements */}
      <motion.div
        className="absolute top-0 left-0 w-[600px] h-[600px] bg-gradient-to-br from-primary/8 to-transparent rounded-full blur-3xl -z-10"
        animate={isInView ? {
          scale: [1, 1.2, 1],
          opacity: [0.3, 0.5, 0.3],
        } : {}}
        transition={{
          duration: 8,
          repeat: Infinity,
          ease: 'easeInOut',
        }}
      />
      <motion.div
        className="absolute bottom-0 right-0 w-[600px] h-[600px] bg-gradient-to-tl from-[#253E5C]/8 to-transparent rounded-full blur-3xl -z-10"
        animate={isInView ? {
          scale: [1, 1.3, 1],
          opacity: [0.3, 0.5, 0.3],
        } : {}}
        transition={{
          duration: 10,
          repeat: Infinity,
          ease: 'easeInOut',
          delay: 1,
        }}
      />
    </motion.section>
  );
};

const GetAQuoteSection = () => {
  const sectionRef = useRef(null);
  const isInView = useInView(sectionRef, { once: true, amount: 0.2 });
  const [hovered, setHovered] = useState(false);

  // Floating particles data
  const particles = Array.from({ length: 15 }, (_, i) => ({
    id: i,
    size: Math.random() * 8 + 4,
    x: Math.random() * 100,
    y: Math.random() * 100,
    duration: Math.random() * 4 + 3,
    delay: Math.random() * 2,
  }));

  return (
    <motion.section
      ref={sectionRef}
      className="relative z-10 pt-24 pb-8 overflow-visible bg-transparent w-full"
      initial={{ opacity: 0 }}
      animate={isInView ? { opacity: 1 } : { opacity: 0 }}
      transition={{ duration: 1.2 }}
    >
      <div className="relative w-full px-6 md:px-8 lg:px-12 max-w-7xl mx-auto">
        {/* Section Header with enhanced animations */}
        <motion.div
          className="text-center mb-6 max-w-4xl mx-auto"
          initial={{ opacity: 0, y: 50, scale: 0.95 }}
          animate={isInView ? { opacity: 1, y: 0, scale: 1 } : { opacity: 0, y: 50, scale: 0.95 }}
          transition={{ duration: 1, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}
        >
          <motion.h3
            className="text-4xl md:text-5xl lg:text-6xl font-black text-[#253E5C] mb-4 relative inline-block"
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
            transition={{ duration: 0.8, delay: 0.5 }}
          >
            <div className="flex flex-col items-center gap-2">
              <motion.span
                className="relative z-10"
                initial={{ opacity: 0, x: -20 }}
                animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -20 }}
                transition={{ duration: 0.6, delay: 0.7 }}
              >
                Ready to Transform
              </motion.span>
              <motion.span
                className="relative z-10 bg-gradient-to-r from-primary via-[#ff6b4a] to-primary bg-clip-text text-transparent"
                initial={{ opacity: 0, x: 20 }}
                animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: 20 }}
                transition={{ duration: 0.6, delay: 0.9 }}
              >
                Your Business?
              </motion.span>
            </div>
            {/* Animated underline */}
            <motion.div
              className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-primary to-transparent"
              initial={{ scaleX: 0 }}
              animate={isInView ? { scaleX: 1 } : { scaleX: 0 }}
              transition={{ duration: 1, delay: 1.2, ease: [0.22, 1, 0.36, 1] }}
            />
          </motion.h3>
          <motion.p
            className="text-[#253E5C]/70 text-lg md:text-xl max-w-3xl mx-auto leading-relaxed font-medium"
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ duration: 0.8, delay: 1.1 }}
          >
            Let's discuss how we can help grow your business. Get a personalized quote tailored to your needs.
          </motion.p>
        </motion.div>

        {/* Floating Particles Background */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none" style={{ zIndex: 1 }}>
          {particles.map((particle) => (
            <motion.div
              key={particle.id}
              className="absolute rounded-full"
              style={{
                width: `${particle.size}px`,
                height: `${particle.size}px`,
                left: `${particle.x}%`,
                top: `${particle.y}%`,
                background: `radial-gradient(circle, rgba(233, 79, 55, ${0.3 + Math.random() * 0.3}) 0%, transparent 70%)`,
              }}
              animate={{
                y: [0, -30, 0],
                x: [0, Math.random() * 20 - 10, 0],
                scale: [1, 1.2, 1],
                opacity: [0.3, 0.7, 0.3],
              }}
              transition={{
                duration: particle.duration,
                repeat: Infinity,
                ease: 'easeInOut',
                delay: particle.delay,
              }}
            />
          ))}
        </div>

        {/* Dolphin and Ball Button Container - Desktop Only */}
        <motion.div
          className="hidden md:flex relative items-center justify-center min-h-[350px]"
          initial={{ opacity: 0, scale: 0.8 }}
          animate={isInView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.8 }}
          transition={{ duration: 0.8, delay: 0.5 }}
          onMouseEnter={() => setHovered(true)}
          onMouseLeave={() => setHovered(false)}
        >
          {/* Enhanced Water Ripples with more layers */}
          <motion.div
            className="absolute inset-0 flex items-center justify-center"
            style={{ zIndex: 5 }}
          >
            {[0, 1, 2, 3, 4].map((index) => (
              <motion.div
                key={index}
                className="absolute rounded-full"
                style={{
                  width: `${150 + index * 80}px`,
                  height: `${150 + index * 80}px`,
                  border: `2px solid rgba(233, 79, 55, ${0.15 - index * 0.03})`,
                }}
                animate={{
                  scale: [1, 1.3 + index * 0.1, 1],
                  opacity: [0.2, 0.05, 0.2],
                  rotate: [0, 180, 360],
                }}
                transition={{
                  duration: 3 + index * 0.5,
                  repeat: Infinity,
                  ease: "easeOut",
                  delay: index * 0.2,
                }}
              />
            ))}
          </motion.div>

          {/* Dolphin Container with Ball */}
          <div className="relative z-10">
            <motion.div
              className="relative"
              animate={{
                y: [0, -8, 0],
                rotate: [0, 2, -2, 0],
              }}
              transition={{
                duration: 3,
                repeat: Infinity,
                ease: "easeInOut",
              }}
            >
              {/* Sparkle effects around dolphin */}
              {[0, 1, 2, 3, 4, 5].map((index) => (
                <motion.div
                  key={`sparkle-${index}`}
                  className="absolute rounded-full"
                  style={{
                    width: '6px',
                    height: '6px',
                    background: 'rgba(233, 79, 55, 0.8)',
                    left: `${20 + (index % 3) * 30}%`,
                    top: `${15 + Math.floor(index / 3) * 40}%`,
                  }}
                  animate={{
                    scale: [0, 1.5, 0],
                    opacity: [0, 1, 0],
                    rotate: [0, 180, 360],
                  }}
                  transition={{
                    duration: 2,
                    repeat: Infinity,
                    ease: 'easeInOut',
                    delay: index * 0.3,
                  }}
                />
              ))}

              <motion.img
                src={favicon}
                alt="Dolphin"
                className="w-64 md:w-80 h-auto object-contain relative z-10"
                style={{ filter: hovered ? 'brightness(1.1)' : 'brightness(1)' }}
                animate={hovered ? {
                  scale: [1, 1.05, 1],
                } : {}}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                  ease: 'easeInOut',
                }}
              />
              
              {/* Enhanced Ball Button with more animations */}
              <motion.button
                className="absolute z-20 rounded-full bg-gradient-to-br from-primary via-[#ff6b4a] to-[#e94f37] text-white font-bold text-xs md:text-sm px-3 py-2 md:px-4 md:py-2.5 border-2 border-white/30 cursor-pointer flex items-center justify-center overflow-hidden group"
                style={{
                  left: 'calc(21% - 40px)',
                  bottom: '204px',
                  width: '100px',
                  height: '100px',
                }}
                animate={{
                  y: [0, -12, 0],
                  x: [0, 3, 0],
                  scale: [1, 1.05, 1],
                }}
                transition={{
                  duration: 3,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
                whileHover={{
                  scale: 1.15,
                }}
                whileTap={{
                  scale: 0.92,
                }}
              >
                {/* Shimmer effect on button */}
                <motion.div
                  className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent"
                  animate={{
                    x: ['-100%', '200%'],
                  }}
                  transition={{
                    duration: 2,
                    repeat: Infinity,
                    ease: 'linear',
                    repeatDelay: 1,
                  }}
                />
                <span className="text-center leading-tight font-extrabold whitespace-nowrap relative z-10">
                  Get a Quote
                </span>
              </motion.button>
            </motion.div>
          </div>

          {/* Floating geometric shapes - Static for performance */}
          {[0, 1, 2].map((index) => (
            <div
              key={`shape-${index}`}
              className="absolute opacity-20"
              style={{
                width: `${30 + index * 15}px`,
                height: `${30 + index * 15}px`,
                left: `${10 + index * 25}%`,
                top: `${20 + (index % 2) * 60}%`,
                border: `2px solid rgba(37, 62, 92, 0.2)`,
                borderRadius: index % 2 === 0 ? '50%' : '8px',
                transform: 'rotate(45deg)',
              }}
            />
          ))}
        </motion.div>
      </div>

      {/* Mobile Dolphin and Ball Button Container - Bottom Position */}
      <motion.div
        className="md:hidden relative flex flex-col items-center justify-center mt-12 pt-8 pb-4"
        initial={{ opacity: 0, y: 40 }}
        animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 40 }}
        transition={{ duration: 0.8, delay: 0.7 }}
      >
        {/* Simplified Water Ripples for Mobile */}
        <motion.div
          className="absolute inset-0 flex items-center justify-center"
          style={{ zIndex: 5 }}
        >
          {[0, 1, 2].map((index) => (
            <motion.div
              key={index}
              className="absolute rounded-full"
              style={{
                width: `${120 + index * 60}px`,
                height: `${120 + index * 60}px`,
                border: `2px solid rgba(233, 79, 55, ${0.12 - index * 0.03})`,
              }}
              animate={{
                scale: [1, 1.2 + index * 0.1, 1],
                opacity: [0.15, 0.04, 0.15],
                rotate: [0, 180, 360],
              }}
              transition={{
                duration: 3 + index * 0.5,
                repeat: Infinity,
                ease: "easeOut",
                delay: index * 0.2,
              }}
            />
          ))}
        </motion.div>

        {/* Mobile Dolphin Container with Ball */}
        <div className="relative z-10">
          <motion.div
            className="relative"
            animate={{
              y: [0, -6, 0],
              rotate: [0, 1.5, -1.5, 0],
            }}
            transition={{
              duration: 3,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          >
            {/* Simplified Sparkle effects for mobile */}
            {[0, 1, 2, 3].map((index) => (
              <motion.div
                key={`mobile-sparkle-${index}`}
                className="absolute rounded-full"
                style={{
                  width: '5px',
                  height: '5px',
                  background: 'rgba(233, 79, 55, 0.7)',
                  left: `${25 + (index % 2) * 40}%`,
                  top: `${20 + Math.floor(index / 2) * 50}%`,
                }}
                animate={{
                  scale: [0, 1.3, 0],
                  opacity: [0, 0.9, 0],
                  rotate: [0, 180, 360],
                }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                  ease: 'easeInOut',
                  delay: index * 0.4,
                }}
              />
            ))}

            <motion.img
              src={favicon}
              alt="Dolphin"
              className="w-48 h-auto object-contain relative z-10"
              animate={{
                scale: [1, 1.03, 1],
              }}
              transition={{
                duration: 2.5,
                repeat: Infinity,
                ease: 'easeInOut',
              }}
            />
            
            {/* Mobile Ball Button - Simplified and repositioned */}
            <motion.button
              className="absolute z-20 rounded-full bg-gradient-to-br from-primary via-[#ff6b4a] to-[#e94f37] text-white font-bold text-xs px-3 py-2 border-2 border-white/30 cursor-pointer flex items-center justify-center overflow-hidden group shadow-lg"
              style={{
                left: 'calc(18% - 35px)',
                bottom: '125px',
                width: '85px',
                height: '85px',
              }}
              animate={{
                y: [0, -10, 0],
                x: [0, 2, 0],
                scale: [1, 1.04, 1],
              }}
              transition={{
                duration: 3,
                repeat: Infinity,
                ease: "easeInOut",
              }}
              whileTap={{
                scale: 0.9,
              }}
            >
              {/* Shimmer effect on button */}
              <motion.div
                className="absolute inset-0 bg-gradient-to-r from-transparent via-white/25 to-transparent"
                animate={{
                  x: ['-100%', '200%'],
                }}
                transition={{
                  duration: 2.5,
                  repeat: Infinity,
                  ease: 'linear',
                  repeatDelay: 1.2,
                }}
              />
              <span className="text-center leading-tight font-extrabold whitespace-nowrap relative z-10 text-[10px]">
                Get a Quote
              </span>
            </motion.button>
          </motion.div>
        </div>
      </motion.div>

      {/* Enhanced Background Decorative Elements - Static for performance */}
      <div
        className="absolute top-0 left-0 w-[600px] h-[600px] bg-gradient-to-br from-primary/8 to-transparent rounded-full blur-2xl -z-10 opacity-30"
      />
      <div
        className="absolute bottom-0 right-0 w-[600px] h-[600px] bg-gradient-to-tl from-[#253E5C]/8 to-transparent rounded-full blur-2xl -z-10 opacity-30"
      />
    </motion.section>
  );
};

const ReviewsSection3D = () => {
  const sectionRef = useRef(null);
  const scrollContainerRef = useRef(null);
  const isInView = useInView(sectionRef, { once: false, amount: 0.1, margin: '-100px' });
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
      color: '#6D28D9',
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
      color: '#16A34A',
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
      color: '#EA580C',
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
      color: '#0F766E',
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
      color: '#DC2626',
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
      color: '#8B5CF6',
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
      color: '#F59E0B',
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
      color: '#EC4899',
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
      color: '#10B981',
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
      color: '#3B82F6',
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
      color: '#EF4444',
    },
  ];

  const StarRating = ({ rating, isHovered }) => {
    return (
      <div className="flex gap-1">
        {[...Array(5)].map((_, i) => (
          <motion.svg
            key={i}
            className="w-5 h-5"
            fill={i < rating ? '#FFD700' : '#E5E7EB'}
            viewBox="0 0 24 24"
            initial={false}
            animate={isHovered ? {
              scale: [1, 1.2, 1],
              rotate: [0, 10, -10, 0],
            } : {
              scale: 1,
              rotate: 0,
            }}
            transition={{
              duration: 0.4,
              delay: i * 0.05,
              ease: 'easeOut',
            }}
            style={{ willChange: 'transform' }}
          >
            <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
          </motion.svg>
        ))}
      </div>
    );
  };

  return (
    <motion.section
      ref={sectionRef}
      className="relative z-10 pt-8 pb-32 overflow-visible bg-gradient-to-b from-white/50 via-white/70 to-white/90 w-full"
      initial={{ opacity: 1 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.3 }}
      style={{ minHeight: '900px' }}
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
          className="text-center mb-16 max-w-4xl mx-auto"
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
        <div className="relative min-h-[700px] py-8">
          {/* Scroll Container */}
          <div
            ref={scrollContainerRef}
            className="reviews-scroll-container overflow-x-auto overflow-y-visible pb-12 pt-8"
            style={{
              WebkitOverflowScrolling: 'touch',
              minHeight: '700px',
              paddingLeft: '1rem',
              paddingRight: '1rem',
            }}
          >
            <div className="flex gap-6 md:gap-8 lg:gap-10 items-start" style={{ width: 'max-content', minHeight: '600px', paddingTop: '20px', paddingBottom: '40px' }}>
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
                    viewport={{ once: false, amount: 0.2 }}
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
                      className="relative h-full rounded-[32px] overflow-visible cursor-pointer"
                      style={{
                        transformStyle: 'preserve-3d',
                        minHeight: '550px',
                        position: 'relative',
                        zIndex: hoveredIndex === index ? 20 : 1,
                        WebkitFontSmoothing: 'antialiased',
                        textRendering: 'optimizeLegibility',
                        WebkitBackfaceVisibility: 'hidden',
                        backfaceVisibility: 'hidden',
                      }}
                      animate={{
                        rotateY: isHovered ? 3 : 0,
                        rotateX: isHovered ? -2 : 0,
                        scale: isHovered ? 1.05 : 1,
                        y: isHovered ? -12 : 0,
                      }}
                      transition={{
                        duration: 0.4,
                        ease: [0.22, 1, 0.36, 1],
                      }}
                    >
                      {/* Gradient Border Wrapper */}
                      <motion.div
                        className="absolute inset-0 rounded-[32px] p-[2px]"
                        style={{
                          background: `linear-gradient(135deg, ${review.color}, ${review.color}80, #253E5C60, ${review.color})`,
                        }}
                        animate={{
                          background: isHovered
                            ? `linear-gradient(135deg, ${review.color}, ${review.color}CC, #253E5C80, ${review.color})`
                            : `linear-gradient(135deg, ${review.color}, ${review.color}80, #253E5C60, ${review.color})`,
                        }}
                        transition={{ duration: 0.4 }}
                      >
                        <motion.div
                          className="w-full h-full rounded-[30px] relative"
                          style={{
                            background: `linear-gradient(135deg, ${review.color}15 0%, ${review.color}08 50%, transparent 100%)`,
                          }}
                          animate={{
                            background: isHovered
                              ? `linear-gradient(135deg, ${review.color}20 0%, ${review.color}12 50%, transparent 100%)`
                              : `linear-gradient(135deg, ${review.color}15 0%, ${review.color}08 50%, transparent 100%)`,
                          }}
                          transition={{ duration: 0.4 }}
                        >
                          {/* Animated Glow Effect */}
                          <motion.div
                            className="absolute inset-0 rounded-[30px] opacity-0"
                            style={{
                              background: `radial-gradient(circle at 50% 50%, ${review.color}25 0%, transparent 70%)`,
                            }}
                            animate={{
                              opacity: isHovered ? 0.8 : 0,
                            }}
                            transition={{ duration: 0.4 }}
                          />

                          {/* Content Container */}
                          <div className="relative z-10 p-8 md:p-10 bg-white/95 min-h-[550px] rounded-[30px] review-card-content">
                            {/* Profile Section */}
                            <div className="flex items-center gap-4 mb-6">
                          <motion.div
                            className="relative"
                            animate={{
                              scale: isHovered ? 1.08 : 1,
                            }}
                            transition={{ duration: 0.3 }}
                            style={{ willChange: 'transform' }}
                          >
                            <motion.div
                              className="w-16 h-16 md:w-20 md:h-20 rounded-full overflow-hidden border-4"
                              style={{ borderColor: review.color }}
                              animate={{
                                borderWidth: isHovered ? '5px' : '4px',
                              }}
                              transition={{ duration: 0.3 }}
                            >
                              <img
                                src={review.image}
                                alt={review.name}
                                className="w-full h-full object-cover review-card-image"
                                loading="lazy"
                              />
                            </motion.div>
                            {/* Animated Ring */}
                            <motion.div
                              className="absolute inset-0 rounded-full border-2 pointer-events-none"
                              style={{ borderColor: review.color }}
                              animate={{
                                scale: isHovered ? [1, 1.2, 1] : 1,
                                opacity: isHovered ? [0.4, 0, 0.4] : 0,
                              }}
                              transition={{
                                duration: 1.5,
                                repeat: isHovered ? Infinity : 0,
                                ease: 'easeInOut',
                              }}
                            />
                          </motion.div>
                            <div className="flex-1">
                              <motion.h4
                                className="text-xl md:text-2xl font-black text-[#253E5C] mb-1"
                                animate={{
                                  color: isHovered ? review.color : '#253E5C',
                                }}
                                transition={{ duration: 0.3 }}
                              >
                                {review.name}
                              </motion.h4>
                              <p className="text-sm md:text-base text-[#253E5C]/70 font-semibold">{review.role}</p>
                              <p className="text-xs text-[#253E5C]/50 font-medium">{review.company}</p>
                            </div>
                          </div>

                          {/* Star Rating - Only animate on hover */}
                          <div className="mb-6">
                            <StarRating rating={review.rating} isHovered={isHovered} />
                          </div>

                          {/* Review Text */}
                          <motion.p
                            className="text-[#253E5C]/80 text-base md:text-lg leading-relaxed mb-6 font-medium"
                            animate={{
                              color: isHovered ? '#253E5C' : 'rgba(37, 62, 92, 0.8)',
                            }}
                            transition={{ duration: 0.3 }}
                          >
                            "{review.text}"
                          </motion.p>

                          {/* Highlight Badge */}
                          <motion.div
                            className="inline-flex items-center gap-2 px-4 py-2 rounded-full"
                            style={{
                              background: `linear-gradient(135deg, ${review.color}20, ${review.color}10)`,
                              border: `1px solid ${review.color}30`,
                            }}
                            animate={{
                              scale: isHovered ? 1.05 : 1,
                              y: isHovered ? -2 : 0,
                            }}
                            transition={{ duration: 0.3 }}
                          >
                            <motion.span
                              className="text-sm font-black"
                              style={{ color: review.color }}
                            >
                              {review.highlight}
                            </motion.span>
                            <motion.svg
                              className="w-4 h-4"
                              style={{ color: review.color }}
                              fill="currentColor"
                              viewBox="0 0 20 20"
                              animate={{
                                x: isHovered ? [0, 2, 0] : 0,
                              }}
                              transition={{
                                duration: 1.2,
                                repeat: isHovered ? Infinity : 0,
                                ease: 'easeInOut',
                              }}
                            >
                              <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-8.707l-3-3a1 1 0 00-1.414 0l-3 3a1 1 0 001.414 1.414L9 9.414V13a1 1 0 102 0V9.414l1.293 1.293a1 1 0 001.414-1.414z" clipRule="evenodd" />
                            </motion.svg>
                          </motion.div>

                          {/* Shimmer Effect on Hover */}
                          {isHovered && (
                            <motion.div
                              className="absolute inset-0 rounded-[32px] overflow-hidden pointer-events-none z-20"
                              initial={{ x: '-100%' }}
                              animate={{ x: '200%' }}
                              transition={{
                                duration: 2,
                                repeat: Infinity,
                                ease: 'linear',
                                repeatDelay: 0.5,
                              }}
                              style={{
                                background: 'linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.3), transparent)',
                                width: '50%',
                                height: '100%',
                              }}
                            />
                          )}

                          {/* Floating Particles - Only on hover */}
                          {isHovered && [...Array(6)].map((_, i) => (
                            <motion.div
                              key={i}
                              className="absolute rounded-full pointer-events-none z-10"
                              style={{
                                width: '4px',
                                height: '4px',
                                background: review.color,
                                left: `${20 + (i % 3) * 30}%`,
                                top: `${30 + Math.floor(i / 3) * 40}%`,
                              }}
                              initial={{ scale: 0, opacity: 0 }}
                              animate={{
                                scale: [0, 1, 0],
                                opacity: [0, 0.8, 0],
                                y: [0, -40],
                                x: [0, (i % 2 === 0 ? 1 : -1) * 20],
                              }}
                              transition={{
                                duration: 1.5,
                                repeat: Infinity,
                                delay: i * 0.15,
                                ease: 'easeOut',
                              }}
                            />
                          ))}
                          </div>
                        </motion.div>
                      </motion.div>
                      
                      {/* Shadow Effect */}
                      <motion.div
                        className="absolute inset-0 rounded-[32px] pointer-events-none z-0"
                        animate={{
                          boxShadow: isHovered
                            ? `0 25px 60px ${review.color}35, 0 0 30px ${review.color}25, inset 0 0 20px ${review.color}08`
                            : `0 10px 30px rgba(37, 62, 92, 0.1)`,
                        }}
                        transition={{ duration: 0.4 }}
                      />
                    </motion.div>
                  </motion.div>
                );
              })}
            </div>
          </div>

          {/* Scroll Indicator */}
          <motion.div
            className="absolute right-8 top-1/2 -translate-y-1/2 hidden lg:block pointer-events-none"
            initial={{ opacity: 0 }}
            animate={isInView ? { opacity: 0.6 } : { opacity: 0 }}
            transition={{ delay: 1 }}
          >
            <motion.div
              animate={{ x: [0, 5, 0] }}
              transition={{ duration: 1.5, repeat: Infinity }}
              className="text-[#253E5C]/40"
            >
              <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </motion.div>
          </motion.div>
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

const VideoSection3D = () => {
  const sectionRef = useRef(null);
  const isInView = useInView(sectionRef, { once: false, amount: 0.1, margin: '-100px' });
  const [playingVideo, setPlayingVideo] = useState(null);

  const videos = [
    { id: 'ke8xYx4itng', title: 'Video 1' },
    { id: 'K6FamnZLa1s', title: 'Video 2' },
    { id: 'FcSn3qobomc', title: 'Video 3' },
    { id: '2J4AiHJnXXM', title: 'Video 4' },
  ];

  // Lock body scroll when modal is open
  useEffect(() => {
    if (playingVideo) {
      // Save current scroll position
      const scrollY = window.scrollY;
      // Lock body scroll
      document.body.style.position = 'fixed';
      document.body.style.top = `-${scrollY}px`;
      document.body.style.width = '100%';
      document.body.style.overflow = 'hidden';
      
      return () => {
        // Restore scroll position when modal closes
        document.body.style.position = '';
        document.body.style.top = '';
        document.body.style.width = '';
        document.body.style.overflow = '';
        window.scrollTo(0, scrollY);
      };
    }
  }, [playingVideo]);

  const handlePlayVideo = (videoId) => {
    setPlayingVideo(videoId);
  };

  const handleCloseVideo = () => {
    setPlayingVideo(null);
  };

  return (
    <motion.section
      ref={sectionRef}
      className="relative z-10 pt-8 pb-32 overflow-visible bg-gradient-to-b from-white/50 via-white/70 to-white/90 w-full"
      initial={{ opacity: 1 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.3 }}
    >
      <div className="relative z-10 max-w-[1500px] mx-auto px-6 sm:px-8 lg:px-10">
        {/* Enhanced Gradient Heading */}
        <motion.div
          className="text-center mb-16 md:mb-20"
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
        >
          <motion.h2
            className="text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-bold mb-6 relative"
            style={{
              background: 'linear-gradient(135deg, #E94F37 0%, #FF6B4A 25%, #253E5C 50%, #3A5F8F 75%, #E94F37 100%)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text',
              backgroundSize: '200% 200%',
              textShadow: '0 0 40px rgba(233, 79, 55, 0.3)',
            }}
            animate={isInView ? {
              backgroundPosition: ['0% 50%', '100% 50%', '0% 50%'],
            } : {}}
            transition={{
              backgroundPosition: {
                duration: 5,
                repeat: Infinity,
                ease: 'linear',
              },
            }}
          >
            Our Work in Motion
          </motion.h2>
          <motion.p
            className="text-lg md:text-xl lg:text-2xl text-gray-600 max-w-3xl mx-auto"
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ duration: 0.8, delay: 0.3 }}
          >
            Experience our creative journey through immersive video content
          </motion.p>
        </motion.div>
      </div>

      {/* Video Section with Bordered Container and Blurry Favicon Background - Full Width */}
      <div 
        className="relative"
        style={{
          width: '100vw',
          marginLeft: '50%',
          transform: 'translateX(-50%)',
        }}
      >
        {/* Bordered Container with Blurry Favicon Background */}
        <div 
          className="relative w-full border-2 border-gray-300/50 bg-white/50 backdrop-blur-sm p-8 md:p-12 lg:p-16 overflow-hidden" 
          style={{ 
            borderRadius: 0,
            boxShadow: `
              0 0 40px rgba(233, 79, 55, 0.3),
              0 0 80px rgba(233, 79, 55, 0.2),
              0 0 120px rgba(37, 62, 92, 0.2),
              0 0 160px rgba(37, 62, 92, 0.15),
              inset 0 0 60px rgba(233, 79, 55, 0.1),
              inset 0 0 100px rgba(37, 62, 92, 0.05)
            `,
          }}
        >
          {/* Blurry Favicon Background */}
          <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
            <img
              src={favicon}
              alt="Background"
              className="w-full h-full max-w-[1400px] max-h-[1400px] object-contain"
              style={{
                filter: 'blur(60px)',
                opacity: 0.4,
              }}
            />
          </div>

            {/* Video Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 md:gap-10 lg:gap-12 relative z-10">
            {videos.map((video, index) => (
              <motion.div
                key={video.id}
                className="relative cursor-pointer"
                initial={{ opacity: 0, y: 40 }}
                animate={isInView ? { 
                  opacity: 1, 
                  y: 0,
                } : { 
                  opacity: 0, 
                  y: 40,
                }}
                transition={{
                  duration: 0.6,
                  delay: index * 0.1,
                  ease: [0.22, 1, 0.36, 1],
                }}
                onClick={() => handlePlayVideo(video.id)}
              >
                {/* Video Thumbnail Container */}
                <div 
                  className="relative w-full rounded-3xl overflow-hidden bg-gray-900 shadow-2xl"
                  style={{
                    height: '400px',
                    minHeight: '400px',
                  }}
                >
                  {/* YouTube Thumbnail */}
                  <img
                    src={`https://img.youtube.com/vi/${video.id}/maxresdefault.jpg`}
                    alt={video.title}
                    className="w-full h-full object-cover"
                    loading="lazy"
                  />
                  
                  {/* Play Button Overlay */}
                  <div className="absolute inset-0 flex items-center justify-center bg-black/10">
                    <motion.div
                      className="relative"
                      style={{
                        width: '48px',
                        height: '48px',
                      }}
                      animate={{
                        scale: [1, 1.08, 1],
                      }}
                      transition={{
                        duration: 2,
                        repeat: Infinity,
                        ease: 'easeInOut',
                      }}
                    >
                      <img
                        src={playButton}
                        alt="Play"
                        className="w-full h-full object-contain drop-shadow-[0_0_20px_rgba(255,255,255,0.5)]"
                      />
                    </motion.div>
                  </div>
                </div>
              </motion.div>
            ))}
            </div>
          </div>
        </div>

      {/* Video Modal */}
      <AnimatePresence>
        {playingVideo && (
          <>
            {/* Navbar Overlay - Hides navbar links but keeps navbar visible */}
            <motion.div
              className="fixed top-0 left-0 right-0 z-[10002] h-24"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              style={{
                pointerEvents: 'none', // Allow clicks to pass through by default
              }}
            >
              {/* Black overlay that hides navbar links area (right side) */}
              <div 
                className="absolute top-0 right-0 h-full bg-black"
                style={{
                  width: '70%', // Cover the links area on the right
                  pointerEvents: 'auto', // Block clicks in this area
                }}
                onClick={(e) => {
                  // Prevent clicks on navbar links
                  e.preventDefault();
                  e.stopPropagation();
                }}
                onMouseDown={(e) => e.preventDefault()}
                onMouseUp={(e) => e.preventDefault()}
              />
            </motion.div>

            {/* Main Modal Backdrop */}
            <motion.div
              className="fixed inset-0 z-[9999] flex items-center justify-center bg-black p-4"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={handleCloseVideo}
              style={{
                position: 'fixed',
                top: 0,
                left: 0,
                right: 0,
                bottom: 0,
                pointerEvents: 'auto',
                touchAction: 'none',
              }}
              onWheel={(e) => e.preventDefault()}
              onTouchMove={(e) => e.preventDefault()}
            >
              {/* Backdrop that prevents all interactions */}
              <div 
                className="absolute inset-0"
                style={{
                  position: 'absolute',
                  top: 0,
                  left: 0,
                  right: 0,
                  bottom: 0,
                  zIndex: 1,
                  pointerEvents: 'auto',
                }}
                onClick={handleCloseVideo}
              />
              
              <motion.div
                className="relative w-full max-w-5xl aspect-video bg-black rounded-lg overflow-hidden z-10"
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.8, opacity: 0 }}
                onClick={(e) => e.stopPropagation()}
                style={{
                  pointerEvents: 'auto',
                  zIndex: 2,
                }}
              >
                {/* Close Button */}
                <button
                  onClick={handleCloseVideo}
                  className="absolute top-4 right-4 z-20 w-10 h-10 bg-white/10 hover:bg-white/20 rounded-full flex items-center justify-center text-white text-xl font-bold transition-colors backdrop-blur-sm"
                  style={{ pointerEvents: 'auto' }}
                >
                  ×
                </button>

                {/* YouTube Iframe */}
                <iframe
                  src={`https://www.youtube.com/embed/${playingVideo}?autoplay=1&rel=0`}
                  title="YouTube video player"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                  className="w-full h-full"
                  style={{ pointerEvents: 'auto' }}
                />
              </motion.div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </motion.section>
  );
};

const FAQSection3D = () => {
  const sectionRef = useRef(null);
  const isInView = useInView(sectionRef, { once: false, amount: 0.25 });
  const [activeIndex, setActiveIndex] = useState(null);

  const faqs = [
    {
      question: 'How fast can Advertio launch a 3D-powered campaign?',
      answer:
        'Discovery to launch typically takes 21 days. Week one is immersion and data pulls, week two is concepting and motion prototyping, and week three is production plus ad-platform wiring with daily QA loops.',
      tag: 'Velocity',
      accent: '#E94F37',
      background: 'linear-gradient(135deg, rgba(233, 79, 55, 0.12), rgba(255, 240, 236, 0.9))',
    },
    {
      question: 'What deliverables are included in the growth retainer?',
      answer:
        'We combine paid media orchestration, CRO audits, WebGL microsite drops, cinematic UGC editing, and real-time dashboards. Each sprint ships a measurable experiment tied to ROAS, LTV, or CPM efficiency.',
      tag: 'Scope',
      accent: '#6D28D9',
      background: 'linear-gradient(135deg, rgba(109, 40, 217, 0.12), rgba(240, 235, 255, 0.9))',
    },
    {
      question: 'Do you integrate with our internal creative or dev team?',
      answer:
        'Absolutely. We work in shared Figma, Notion, and Git repos. Our shaders, particle rigs, and tracking libraries are modular so internal teams can iterate without waiting on us.',
      tag: 'Collaboration',
      accent: '#16A34A',
      background: 'linear-gradient(135deg, rgba(22, 163, 74, 0.1), rgba(233, 255, 244, 0.95))',
    },
    {
      question: 'How do you report results from immersive experiences?',
      answer:
        'We pipe volumetric engagement, scroll-depth, dwell time, and assisted conversions into Looker dashboards. Each FAQ tap, product spin, or AR trigger is evented back to your attribution model.',
      tag: 'Measurement',
      accent: '#0EA5E9',
      background: 'linear-gradient(135deg, rgba(14, 165, 233, 0.12), rgba(231, 247, 255, 0.92))',
    },
    {
      question: 'Can the 3D FAQ component plug into other pages?',
      answer:
        'Yes. It is built with headless props, accepts CMS data, and exposes a variant prop for light or dark backgrounds. Animations rely on Framer Motion so it stays GPU-friendly.',
      tag: 'Flexibility',
      accent: '#EA580C',
      background: 'linear-gradient(135deg, rgba(234, 88, 12, 0.12), rgba(255, 243, 232, 0.92))',
    },
    {
      question: 'What makes the Advertio support model different?',
      answer:
        'You get a dedicated strategist, shader artist, and marketing engineer on one Slack bridge. Stand-ups happen twice a week and war rooms spin up within 15 minutes for launches.',
      tag: 'Support',
      accent: '#F59E0B',
      background: 'linear-gradient(135deg, rgba(245, 158, 11, 0.12), rgba(255, 248, 234, 0.92))',
    },
  ];

  const handleToggle = (index) => {
    setActiveIndex((prev) => (prev === index ? null : index));
  };

  return (
    <motion.section
      ref={sectionRef}
      className="relative z-10 py-28 px-6 lg:px-8 bg-gradient-to-b from-white/90 via-[#F6F7FF]/80 to-white w-full overflow-visible"
      initial={{ opacity: 0 }}
      animate={isInView ? { opacity: 1 } : { opacity: 0 }}
      transition={{ duration: 0.8 }}
    >
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        {[...Array(10)].map((_, index) => (
          <motion.div
            key={`faq-orb-${index}`}
            className="absolute rounded-full blur-3xl"
            style={{
              width: `${220 + index * 35}px`,
              height: `${220 + index * 35}px`,
              left: `${(index * 11) % 100}%`,
              top: `${(index * 23) % 100}%`,
              background: `radial-gradient(circle, rgba(233, 79, 55, ${0.04 + index * 0.01}) 0%, transparent 70%)`,
            }}
            animate={{
              scale: [1, 1.15, 1],
              opacity: [0.1, 0.35, 0.1],
              rotate: [0, 120, 360],
            }}
            transition={{
              duration: 12 + index,
              repeat: Infinity,
              ease: 'easeInOut',
              delay: index * 0.3,
            }}
          />
        ))}
      </div>

      <div className="relative max-w-[1500px] mx-auto">
        <motion.div
          className="text-center mb-16 max-w-3xl mx-auto"
          initial={{ opacity: 0, y: 40, scale: 0.95 }}
          animate={isInView ? { opacity: 1, y: 0, scale: 1 } : { opacity: 0, y: 40, scale: 0.95 }}
          transition={{ duration: 0.8, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
        >
          <motion.p
            className="text-xs uppercase tracking-[0.6em] text-[#253E5C]/60 mb-4"
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ duration: 0.6, delay: 0.3 }}
          >
            FAQ — Holographic Support
          </motion.p>
          <motion.h3
            className="text-4xl md:text-5xl font-black text-[#253E5C] mb-4"
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            Answers with <span className="bg-gradient-to-r from-[#253E5C] via-primary to-[#ff6b4a] bg-clip-text text-transparent">Depth & Motion</span>
          </motion.h3>
          <motion.p
            className="text-[#253E5C]/70 text-lg"
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ duration: 0.8, delay: 0.5 }}
          >
            Questions stay visible while answers fold out with layered 3D reveals and micro-interactions.
          </motion.p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 relative">
          {faqs.map((faq, index) => {
            const isActive = activeIndex === index;
            return (
              <motion.div
                key={faq.question}
                layout
                className="relative rounded-[28px] border backdrop-blur-xl overflow-hidden group"
                style={{
                  background: faq.background,
                  borderColor: `${faq.accent}22`,
                  boxShadow: isActive
                    ? `0 30px 80px ${faq.accent}33, 0 15px 40px rgba(15,23,42,0.1)`
                    : '0 18px 45px rgba(15,23,42,0.08)',
                }}
                whileHover={{
                  y: -6,
                  scale: 1.01,
                  boxShadow: `0 25px 70px ${faq.accent}26`,
                }}
                transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
              >
                <motion.div
                  className="absolute inset-0 pointer-events-none"
                  style={{
                    background: `linear-gradient(135deg, ${faq.accent}26, transparent)`,
                  }}
                  animate={{
                    opacity: isActive ? 1 : 0.7,
                  }}
                />

                <div className="relative p-6 md:p-8">
                  <button
                    type="button"
                    onClick={() => handleToggle(index)}
                    className="w-full text-left focus:outline-none"
                  >
                    <div className="flex items-start justify-between gap-4">
                      <div>
                        <p className="text-xs uppercase tracking-[0.4em] text-[#253E5C]/55 mb-2">
                          {faq.tag}
                        </p>
                        <h4 className="text-xl md:text-2xl font-black text-[#253E5C]">
                          {faq.question}
                        </h4>
                      </div>
                      <motion.span
                        className="flex items-center justify-center w-12 h-12 rounded-2xl border border-[#253E5C]/10 bg-white/80 backdrop-blur-md"
                        animate={{
                          rotate: isActive ? 45 : 0,
                          background: isActive ? `${faq.accent}1A` : 'rgba(255,255,255,0.8)',
                          color: isActive ? faq.accent : '#253E5C',
                          boxShadow: isActive
                            ? `0 0 25px ${faq.accent}66`
                            : '0 5px 15px rgba(37,62,92,0.1)',
                        }}
                        transition={{ duration: 0.3 }}
                      >
                        <motion.span
                          animate={{ scale: isActive ? 1.15 : 1 }}
                          transition={{ duration: 0.2 }}
                          className="text-2xl font-black"
                        >
                          +
                        </motion.span>
                      </motion.span>
                    </div>
                  </button>

                  <motion.div
                    layout
                    initial={false}
                    animate={{
                      height: isActive ? 'auto' : 0,
                      opacity: isActive ? 1 : 0,
                      marginTop: isActive ? 16 : 0,
                    }}
                    transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
                    className="overflow-hidden"
                  >
                    {isActive && (
                      <>
                        <p className="text-[#253E5C]/80 text-sm md:text-base leading-relaxed">
                          {faq.answer}
                        </p>
                        <motion.div
                          className="mt-6 h-[1px] w-full"
                          initial={{ scaleX: 0, opacity: 0 }}
                          animate={{ scaleX: 1, opacity: 1 }}
                          transition={{ duration: 0.5, delay: 0.1 }}
                          style={{
                            background: `linear-gradient(90deg, transparent, ${faq.accent}, transparent)`,
                            transformOrigin: 'left',
                          }}
                        />
                      </>
                    )}
                  </motion.div>
                </div>

                <motion.div
                  className="absolute -bottom-16 right-6 w-32 h-32 rounded-full blur-2xl"
                  style={{ background: `${faq.accent}55` }}
                  animate={{
                    y: isActive ? [0, -12, 0] : 0,
                    opacity: isActive ? 0.85 : 0.4,
                    scale: isActive ? 1.2 : 1,
                  }}
                  transition={{ duration: 1.8, repeat: Infinity, ease: 'easeInOut' }}
                />
              </motion.div>
            );
          })}
        </div>
      </div>
    </motion.section>
  );
};

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
      {/* Animated background orbs */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        {[...Array(8)].map((_, index) => (
          <motion.div
            key={`mockup-orb-${index}`}
            className="absolute rounded-full blur-3xl"
            style={{
              width: `${200 + index * 40}px`,
              height: `${200 + index * 40}px`,
              left: `${(index * 13) % 100}%`,
              top: `${(index * 17) % 100}%`,
              background: `radial-gradient(circle, rgba(233, 79, 55, ${0.03 + index * 0.01}) 0%, transparent 70%)`,
            }}
            animate={{
              scale: [1, 1.2, 1],
              opacity: [0.1, 0.3, 0.1],
              rotate: [0, 90, 180],
            }}
            transition={{
              duration: 10 + index * 2,
              repeat: Infinity,
              ease: 'easeInOut',
              delay: index * 0.4,
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
                whileHover={{ scale: 1.05, y: -10 }}
                transition={{ duration: 0.3 }}
              >
                {/* Gradient overlay on hover */}
                <motion.div
                  className="absolute inset-0 z-10 pointer-events-none"
                  style={{
                    background: hoveredIndex === index
                      ? 'linear-gradient(135deg, rgba(233, 79, 55, 0.1), transparent)'
                      : 'transparent',
                  }}
                  transition={{ duration: 0.3 }}
                />

                {/* Mockup Image */}
                <div className="relative aspect-[4/3] overflow-hidden">
                  <motion.img
                    src={mockup.image}
                    alt={mockup.title}
                    className="w-full h-full object-cover"
                    whileHover={{ scale: 1.1 }}
                    transition={{ duration: 0.5 }}
                  />
                </div>

                {/* Blue Gradient Overlay */}
                <motion.div
                  className="absolute bottom-0 left-0 right-0 h-16 bg-gradient-to-t from-[#253E5C]/95 via-[#253E5C]/80 to-transparent"
                  initial={{ opacity: 0.8 }}
                  animate={{ opacity: hoveredIndex === index ? 1 : 0.8 }}
                  transition={{ duration: 0.3 }}
                />

                {/* Accent line */}
                <motion.div
                  className="absolute bottom-0 left-0 right-0 h-1 bg-primary"
                  initial={{ scaleX: 0 }}
                  animate={{ scaleX: hoveredIndex === index ? 1 : 0 }}
                  transition={{ duration: 0.3 }}
                  style={{ transformOrigin: 'left' }}
                />
              </motion.div>
            </motion.div>
          ))}
        </div>
      </div>
    </motion.section>
  );
};

const ContactSection3D = () => {
  const sectionRef = useRef(null);
  const cardRef = useRef(null);
  const isInView = useInView(sectionRef, { once: false, amount: 0.3 });
  const [mouseTilt, setMouseTilt] = useState({ x: 0, y: 0 });
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    company: '',
    message: '',
  });
  const [status, setStatus] = useState('idle');

  const handleMouseMove = (event) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const x = ((event.clientX - rect.left) / rect.width - 0.5) * 2;
    const y = ((event.clientY - rect.top) / rect.height - 0.5) * 2;
    setMouseTilt({
      x: Math.max(-1, Math.min(1, x)),
      y: Math.max(-1, Math.min(1, y)),
    });
  };

  const resetTilt = () => setMouseTilt({ x: 0, y: 0 });

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    if (status === 'sending') return;
    setStatus('sending');

    setTimeout(() => {
      setStatus('sent');
      setFormData({ name: '', email: '', company: '', message: '' });

      setTimeout(() => setStatus('idle'), 3000);
    }, 1500);
  };

  return (
    <motion.section
      ref={sectionRef}
      className="relative z-10 py-24 px-6 lg:px-8 overflow-hidden bg-transparent"
      initial={{ opacity: 0 }}
      animate={isInView ? { opacity: 1 } : { opacity: 0 }}
      transition={{ duration: 0.8 }}
      style={{ 
        perspective: '1800px'
      }}
    >
      {/* Static Dark Background - Optimized for performance */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        {/* Primary color orbs - Static */}
        <div
          className="absolute top-0 left-0 w-[600px] h-[600px] bg-primary/20 blur-2xl rounded-full opacity-30"
        />
        <div
          className="absolute bottom-0 right-0 w-[700px] h-[700px] bg-[#253E5C]/25 blur-2xl rounded-full opacity-25"
        />
        {/* Accent color orbs - Static */}
        <div
          className="absolute top-1/2 left-1/4 w-[500px] h-[500px] bg-[#FF6B4A]/15 blur-2xl rounded-full opacity-20"
        />
        <div
          className="absolute top-1/3 right-1/3 w-[400px] h-[400px] bg-[#6D28D9]/15 blur-2xl rounded-full opacity-20"
        />
        {/* Reduced floating orbs - Static */}
        {[...Array(3)].map((_, i) => (
          <div
            key={i}
            className="absolute rounded-full opacity-15"
            style={{
              width: `${200 + i * 60}px`,
              height: `${200 + i * 60}px`,
              left: `${(i * 15) % 100}%`,
              top: `${(i * 20 + 10) % 100}%`,
              background: `radial-gradient(circle, rgba(${i % 2 === 0 ? '233, 79, 55' : '37, 62, 92'}, ${0.1 + i * 0.02}) 0%, transparent 70%)`,
              filter: 'blur(60px)',
            }}
          />
        ))}
      </div>

      <div className="relative max-w-[1500px] mx-auto grid grid-cols-1 lg:grid-cols-[0.9fr,1.1fr] gap-10 items-stretch">
        <motion.div
          className="rounded-[32px] border border-white/10 p-10 shadow-[0_20px_80px_rgba(0,0,0,0.3)]"
          style={{
            background: 'linear-gradient(135deg, rgba(37, 62, 92, 1) 0%, rgba(233, 79, 55, 1) 50%, rgba(37, 62, 92, 1) 100%)',
            transformStyle: 'preserve-3d'
          }}
          initial={{ opacity: 0, y: 50, rotateY: -15 }}
          animate={isInView ? { opacity: 1, y: 0, rotateY: 0 } : { opacity: 0, y: 50, rotateY: -15 }}
          transition={{ duration: 0.8, delay: 0.1 }}
        >
          <motion.p
            className="text-xs uppercase tracking-[0.6em] text-white/60 mb-4"
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            Contact
          </motion.p>
          <motion.h3
            className="text-4xl md:text-5xl font-black text-white mb-6 leading-tight"
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
            transition={{ duration: 0.8, delay: 0.3 }}
          >
            Reserve a growth sprint with our hybrid 3D marketing pod.
          </motion.h3>
          <p className="text-white/70 text-lg mb-10">
            Drop the essentials of your project and we'll return a calibrated roadmap within one business day.
          </p>

          <div className="space-y-6">
            {[
              { label: 'Response window', value: '< 2 hours' },
              { label: 'Avg. engagement', value: '90 day retained pod' },
              { label: 'Formats', value: 'Paid media + 3D creative + CRO' },
            ].map((item, idx) => (
              <motion.div
                key={item.label}
                className="flex items-center justify-between rounded-2xl border border-white/20 px-5 py-4"
                style={{
                  background: 'rgba(255, 255, 255, 0.05)'
                }}
                initial={{ opacity: 0, y: 20, x: -20 }}
                animate={isInView ? { opacity: 1, y: 0, x: 0 } : { opacity: 0, y: 20, x: -20 }}
                transition={{ duration: 0.6, delay: 0.4 + idx * 0.1 }}
              >
                <span className="text-xs tracking-[0.35em] uppercase text-white/90 font-semibold">{item.label}</span>
                <span className="text-base font-semibold text-white">{item.value}</span>
              </motion.div>
            ))}
          </div>

          <div className="mt-10 space-y-3">
            <motion.a
              href="mailto:hello@advertio.com"
              className="block text-lg font-semibold text-white transition-colors"
            >
              hello@advertio.com
            </motion.a>
            <motion.a
              href="https://wa.me/1234567890"
              target="_blank"
              rel="noopener noreferrer"
              className="block text-lg text-white/70 transition-colors"
            >
              WhatsApp · +1 (234) 567-890
            </motion.a>
          </div>
        </motion.div>

        <motion.form
          ref={cardRef}
          onSubmit={handleSubmit}
          onMouseMove={handleMouseMove}
          onMouseLeave={resetTilt}
          className="relative rounded-[36px] border border-white/20 shadow-[0_25px_80px_rgba(0,0,0,0.4)] p-8 md:p-10"
          style={{
            background: 'linear-gradient(135deg, rgba(233, 79, 55, 1) 0%, rgba(37, 62, 92, 1) 50%, rgba(233, 79, 55, 1) 100%)',
            transformStyle: 'preserve-3d'
          }}
          initial={{ opacity: 0, y: 60, rotateY: 15 }}
          animate={{
            opacity: isInView ? 1 : 0,
            y: isInView ? 0 : 60,
            rotateX: mouseTilt.y * 8,
            rotateY: mouseTilt.x * 8 + (isInView ? 0 : 15),
            translateZ: isInView ? 0 : -100,
            scale: isInView ? 1 : 0.95,
          }}
          transition={{ duration: 0.8, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
        >
          <div className="relative space-y-6">
            {[
              { label: 'Full name', name: 'name', type: 'text', placeholder: 'Ariana Collins' },
              { label: 'Work email', name: 'email', type: 'email', placeholder: 'ariana@brand.com' },
              { label: 'Company or product', name: 'company', type: 'text', placeholder: 'Peak Aurora' },
            ].map((field, index) => (
              <motion.div
                key={field.name}
                className="space-y-2"
                initial={{ opacity: 0, y: 30, rotateX: -10 }}
                animate={isInView ? { opacity: 1, y: 0, rotateX: 0 } : { opacity: 0, y: 30, rotateX: -10 }}
                transition={{ 
                  duration: 0.6, 
                  delay: 0.25 + index * 0.12,
                  ease: [0.22, 1, 0.36, 1]
                }}
                style={{ transformStyle: 'preserve-3d' }}
              >
                <motion.label 
                  className="text-sm font-semibold uppercase tracking-[0.3em] text-white/70 block"
                >
                  {field.label}
                </motion.label>
                <motion.input
                  type={field.type}
                  name={field.name}
                  placeholder={field.placeholder}
                  value={formData[field.name]}
                  onChange={handleChange}
                  required
                  className={`w-full px-5 py-4 rounded-2xl border border-white/20 placeholder-white/40 focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/40 transition-all ${
                    formData[field.name] ? 'bg-white text-[#253E5C]' : 'bg-white/10 text-white'
                  }`}
                  style={{ transformStyle: 'preserve-3d' }}
                />
              </motion.div>
            ))}

            <motion.div
              className="space-y-2"
              initial={{ opacity: 0, y: 30, rotateX: -10 }}
              animate={isInView ? { opacity: 1, y: 0, rotateX: 0 } : { opacity: 0, y: 30, rotateX: -10 }}
              transition={{ 
                duration: 0.6, 
                delay: 0.65,
                ease: [0.22, 1, 0.36, 1]
              }}
              style={{ transformStyle: 'preserve-3d' }}
            >
              <motion.label 
                className="text-sm font-semibold uppercase tracking-[0.3em] text-white/70 block"
              >
                Project notes
              </motion.label>
              <motion.textarea
                name="message"
                rows={5}
                placeholder="Share context, goals, or launch date..."
                value={formData.message}
                onChange={handleChange}
                required
                className={`w-full px-5 py-4 rounded-2xl border border-white/20 placeholder-white/40 focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/40 transition-all resize-none ${
                  formData.message ? 'bg-white text-[#253E5C]' : 'bg-white/10 text-white'
                }`}
                style={{ transformStyle: 'preserve-3d' }}
              />
            </motion.div>

            <motion.button
              type="submit"
              disabled={status === 'sending'}
              className="relative w-full flex items-center justify-center gap-3 px-6 py-4 rounded-2xl text-white font-semibold text-lg bg-gradient-to-r from-[#253E5C] via-primary to-[#FF6B4A] shadow-lg shadow-primary/40 transition-all disabled:opacity-60 overflow-hidden"
              whileTap={{ scale: 0.98 }}
              style={{ transformStyle: 'preserve-3d' }}
            >
              {/* Button glow effect */}
              <motion.div
                className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent"
                animate={{ x: ['-100%', '200%'] }}
                transition={{ duration: 2, repeat: Infinity, ease: 'linear', repeatDelay: 1 }}
              />
              <span className="relative z-10">{status === 'sending' ? 'Sending...' : 'Send the brief'}</span>
              <motion.span
                className="relative z-10"
                animate={{ x: [0, 6, 0] }}
                transition={{ duration: 1.5, repeat: Infinity, ease: 'easeInOut' }}
              >
                →
              </motion.span>
            </motion.button>

            {status === 'sent' && (
              <motion.p
                className="text-center text-sm font-semibold text-white"
                initial={{ opacity: 0, y: -6, scale: 0.9 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                transition={{ type: 'spring', stiffness: 300, damping: 20 }}
              >
                Message received. We'll respond shortly.
              </motion.p>
            )}
          </div>
        </motion.form>
      </div>
    </motion.section>
  );
};

const BlogsSection3D = () => {
  const sectionRef = useRef(null);
  const scrollContainerRef = useRef(null);
  const isInView = useInView(sectionRef, { once: false, amount: 0.1, margin: '-100px' });
  const [hoveredIndex, setHoveredIndex] = useState(null);
  const [expandedBlogId, setExpandedBlogId] = useState(null);
  const [isMobile, setIsMobile] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  const toggleBlog = (blogId) => {
    setExpandedBlogId(prev => prev === blogId ? null : blogId);
  };

  const blogs = [
    {
      id: 1,
      title: 'The Future of E-commerce and 3D Product Experiences',
      excerpt: 'Discover immersive 3D visualization is revolutionizing online shopping and driving conversion rates through experiences.',
      category: 'E-commerce',
      author: 'Sarah Chen',
      date: 'March 15, 2024',
      readTime: '5 min read',
      image: 'https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=800&h=600&fit=crop&q=80',
      color: '#E94F37',
      tags: ['3D Design', 'E-commerce', 'Innovation'],
    },
    {
      id: 2,
      title: 'Performance Marketing: Data-Driven Growth Strategies',
      excerpt: 'Learn how to leverage advanced analytics and cross-channel optimization to scale your DTC brand profitably with measurable results.',
      category: 'Marketing',
      author: 'Michael Rodriguez',
      date: 'March 12, 2024',
      readTime: '7 min read',
      image: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800&h=600&fit=crop&q=80',
      color: '#6D28D9',
      tags: ['Performance', 'Analytics', 'Growth'],
    },
    {
      id: 3,
      title: 'AR and Mixed Reality: The Next Frontier in Brand Engagement',
      excerpt: 'Explore how reality filters and experiential AR kits are creating new dimensions customer interaction and brand storytelling.',
      category: 'Technology',
      author: 'Emma Thompson',
      date: 'March 10, 2024',
      readTime: '6 min read',
      image: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=800&h=600&fit=crop&q=80',
      color: '#16A34A',
      tags: ['AR', 'Innovation', 'Engagement'],
    },
    {
      id: 4,
      title: 'Conversion Rate Optimization: Building Premium Funnels',
      excerpt: 'Uncover the secrets behind high-converting landing pages and how WebGL-powered microsites are transforming user experiences.',
      category: 'UX Design',
      author: 'David Park',
      date: 'March 8, 2024',
      readTime: '8 min read',
      image: 'https://images.unsplash.com/photo-1467232004584-a241de8bcf5d?w=800&h=600&fit=crop&q=80',
      color: '#EA580C',
      tags: ['CRO', 'UX', 'Conversion'],
    },
  ];


  return (
    <motion.section
      ref={sectionRef}
      className="relative z-10 pt-8 pb-0 md:pb-32 overflow-visible bg-gradient-to-b from-white/50 via-white/70 to-white/90 w-full"
      initial={{ opacity: 1 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.3 }}
      style={{ minHeight: '900px' }}
    >
      {/* Static Background Elements - Optimized for performance */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {[...Array(6)].map((_, i) => (
          <div
            key={i}
            className="absolute rounded-full opacity-20 hidden md:block"
            style={{
              width: `${120 + i * 40}px`,
              height: `${120 + i * 40}px`,
              left: `${i * 20}%`,
              top: `${(i % 3) * 30}%`,
              background: `radial-gradient(circle, rgba(233, 79, 55, ${0.1 + i * 0.02}) 0%, transparent 70%)`,
            }}
          />
        ))}
      </div>

      <div className="relative w-[90%] mx-auto">
        {/* Section Header - Immediate render */}
        <div className="text-center mb-16 max-w-4xl mx-auto">
          <p className="text-xs uppercase tracking-[0.5em] text-[#253E5C]/60 mb-4">
            Insights & Strategies
          </p>
          <h3 className="text-5xl md:text-6xl lg:text-7xl font-black text-[#253E5C] mb-6">
            <span className="bg-gradient-to-r from-[#253E5C] via-primary to-[#ff6b4a] bg-clip-text text-transparent">
              Latest Blogs
            </span>
          </h3>
          <p className="text-[#253E5C]/70 text-lg md:text-xl max-w-3xl mx-auto leading-relaxed">
            Expert insights on e-commerce growth, digital marketing, and cutting-edge technology
          </p>
        </div>

        {/* Blog Grid Container */}
        <div className="relative min-h-[800px] py-8">
          <div
            ref={scrollContainerRef}
            className="overflow-x-auto overflow-y-visible pb-4 md:pb-0 pt-0"
            style={{
              scrollbarColor: '#E94F37 transparent',
              WebkitOverflowScrolling: 'touch',
              minHeight: '800px',
              paddingLeft: '1rem',
              paddingRight: '1rem',
            }}
          >
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-3 md:gap-5 lg:gap-7 items-start" style={{ minHeight: '800px' }}>
              {blogs.map((blog, index) => {
                return (
                  <motion.article
                    key={blog.id}
                    className="relative group flex-shrink-0 w-full mx-auto h-auto"
                    initial={{ 
                      opacity: 0, 
                      y: 50,
                      scale: 0.95,
                    }}
                    whileInView={{ 
                      opacity: 1, 
                      y: 0,
                      scale: 1,
                    }}
                    viewport={{ once: true, amount: 0.1 }}
                    transition={{
                      duration: 0.5,
                      delay: index * 0.08,
                      ease: [0.22, 1, 0.36, 1],
                    }}
                  >
                    <motion.div
                      className="relative rounded-[32px] transition-transform duration-300 group-hover:-translate-y-2"
                      style={{
                        position: 'relative',
                        minHeight: '600px',
                        height: 'auto',
                        overflow: 'visible',
                      }}
                    >
                      {/* Gradient Border Wrapper */}
                      <div
                        className="absolute inset-0 rounded-[32px] p-[2px] transition-all duration-300 group-hover:opacity-100"
                        style={{
                          background: `linear-gradient(135deg, ${blog.color}, ${blog.color}80, #253E5C60, ${blog.color})`,
                        }}
                      >
                        <motion.div
                          className="w-full h-full rounded-[30px] relative flex flex-col"
                          style={{
                            background: `linear-gradient(135deg, ${blog.color}15 0%, ${blog.color}08 50%, transparent 100%)`,
                            minHeight: '100%',
                          }}
                        >
                          {/* Blog Image */}
                          <div className="relative w-full h-56 overflow-hidden rounded-t-[30px]">
                            <img
                              src={blog.image}
                              alt={blog.title}
                              className="w-full h-full object-cover transition-all duration-500 group-hover:scale-105 group-hover:brightness-110"
                            />
                            {/* Image Overlay Gradient */}
                            <div
                              className="absolute inset-0 transition-opacity duration-300 group-hover:opacity-60"
                              style={{
                                background: `linear-gradient(to bottom, transparent 0%, ${blog.color}20 100%)`,
                                opacity: 0.3,
                              }}
                            />
                            
                            {/* Category Badge */}
                            <div
                              className="absolute top-4 left-4 px-3 py-1 rounded-full backdrop-blur-md"
                              style={{
                                background: `${blog.color}CC`,
                                border: `1px solid ${blog.color}`,
                              }}
                            >
                              <span className="text-xs font-black text-white uppercase tracking-wide">
                                {blog.category}
                              </span>
                            </div>

                          </div>

                          {/* Tags - Always visible */}
                          <div 
                            className="relative z-10 p-6 md:p-8 flex flex-col bg-white/95 rounded-b-[30px]"
                            style={{
                              minHeight: 'fit-content',
                            }}
                          >
                            <div className="flex flex-wrap gap-2 mb-4">
                              {blog.tags.map((tag, tagIndex) => (
                                <span
                                  key={tagIndex}
                                  className="px-2 py-1 rounded-lg text-xs font-semibold transition-transform duration-200 group-hover:scale-105"
                                  style={{
                                    background: `${blog.color}15`,
                                    color: blog.color,
                                    border: `1px solid ${blog.color}30`,
                                  }}
                                >
                                  {tag}
                                </span>
                              ))}
                            </div>

                            {/* Content - Always visible on all devices */}
                            <div className="flex flex-col flex-grow min-h-0">
                              {/* Title */}
                              <h3
                                className="text-xl md:text-2xl font-black mb-3 leading-tight transition-colors duration-300 group-hover:text-[#253E5C]"
                                style={{
                                  color: blog.color,
                                }}
                              >
                                {blog.title}
                              </h3>

                              {/* Excerpt */}
                              <p className="text-sm md:text-base leading-relaxed mb-6 text-[#253E5C]/70 transition-colors duration-300 group-hover:text-[#253E5C]">
                                {blog.excerpt}
                              </p>

                              {/* Meta Information */}
                              <div className="flex items-center justify-between pt-4 border-t border-[#253E5C]/10">
                                <div className="flex items-center gap-3">
                                  <div
                                    className="w-10 h-10 rounded-full overflow-hidden border-2 transition-all duration-300 group-hover:scale-105 group-hover:border-[3px]"
                                    style={{ 
                                      borderColor: blog.color,
                                    }}
                                  >
                                    <div
                                      className="w-full h-full"
                                      style={{
                                        background: `linear-gradient(135deg, ${blog.color}, ${blog.color}80)`,
                                      }}
                                    />
                                  </div>
                                  <div>
                                    <p className="text-sm font-semibold text-[#253E5C]">{blog.author}</p>
                                    <p className="text-xs text-[#253E5C]/50">{blog.date}</p>
                                  </div>
                                </div>
                                <div
                                  className="flex items-center gap-2 text-xs font-semibold transition-transform duration-300 group-hover:translate-x-1"
                                  style={{ 
                                    color: blog.color,
                                  }}
                                >
                                  <span>{blog.readTime}</span>
                                  <svg
                                    className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1"
                                    fill="none"
                                    stroke="currentColor"
                                    viewBox="0 0 24 24"
                                  >
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                                  </svg>
                                </div>
                              </div>
                            </div>

                            {/* Subtle Glow Effect - Always visible */}
                            <div
                              className="absolute inset-0 rounded-[30px] pointer-events-none transition-opacity duration-300 group-hover:opacity-40"
                              style={{
                                background: `radial-gradient(circle at 50% 50%, ${blog.color}20 0%, transparent 70%)`,
                                opacity: 0.15,
                              }}
                            />
                          </div>
                        </motion.div>
                      </div>
                      
                      {/* Shadow Effect */}
                      <div
                        className="absolute inset-0 rounded-[32px] pointer-events-none z-0 transition-all duration-300 group-hover:shadow-xl"
                        style={{
                          boxShadow: `0 10px 30px rgba(37, 62, 92, 0.1)`,
                        }}
                      />
                    </motion.div>
                  </motion.article>
                );
              })}
            </div>
          </div>

          {/* See All Blogs Button */}
          <motion.div
            className="flex justify-center mt-12 mb-0 md:mb-8"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.5, ease: [0.22, 1, 0.36, 1] }}
          >
            <motion.button
              type="button"
              onClick={() => navigate('/blogs')}
              className="inline-flex items-center gap-3 px-8 py-4 rounded-full text-base font-semibold tracking-wide text-white shadow-lg shadow-black/10"
              style={{ 
                background: 'linear-gradient(135deg, #253E5C, #E94F37)',
              }}
              whileHover={{
                scale: 1.05,
                boxShadow: '0 20px 40px rgba(37, 62, 92, 0.3)',
                y: -2,
              }}
              whileTap={{ scale: 0.98 }}
              transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
            >
              <span>See all blogs</span>
              <motion.span
                className="text-xl leading-none"
                animate={{ x: [0, 5, 0] }}
                transition={{ duration: 1.5, repeat: Infinity, ease: 'easeInOut' }}
              >
                →
              </motion.span>
            </motion.button>
          </motion.div>

          {/* Scroll Indicator */}
          <motion.div
            className="absolute right-8 top-1/2 -translate-y-1/2 hidden lg:block pointer-events-none"
            initial={{ opacity: 0 }}
            animate={isInView ? { opacity: 0.6 } : { opacity: 0 }}
            transition={{ delay: 1 }}
          >
            <motion.div
              animate={{ x: [0, 5, 0] }}
              transition={{ duration: 1.5, repeat: Infinity }}
              className="text-[#253E5C]/40"
            >
              <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </motion.div>
          </motion.div>
        </div>
      </div>

      {/* Background Decorative Elements */}
      <motion.div
        className="absolute top-0 left-0 w-[0px] h-[0px] bg-gradient-to-br from-primary/15 to-transparent rounded-full blur-3xl -z-10 hidden md:block"
        animate={isInView ? {
          scale: [1, 1.3, 1],
          opacity: [0.3, 0.5, 0.3],
          rotate: [0, 90, 0],
        } : {}}
        transition={{
          duration: 15,
          repeat: Infinity,
          ease: 'easeInOut',
        }}
      />
      <motion.div
        className="absolute bottom-0 right-0 w-[900px] h-[900px] bg-gradient-to-tl from-[#253E5C]/15 to-transparent rounded-full blur-3xl -z-10 hidden md:block"
        animate={isInView ? {
          scale: [1, 1.4, 1],
          opacity: [0.3, 0.5, 0.3],
          rotate: [0, -90, 0],
        } : {}}
        transition={{
          duration: 18,
          repeat: Infinity,
          ease: 'easeInOut',
          delay: 3,
        }}
      />
    </motion.section>
  );
};

export default Home;