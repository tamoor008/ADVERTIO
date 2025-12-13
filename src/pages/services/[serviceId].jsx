'use client'

import { useEffect, useRef, useState } from 'react';
import { useRouter } from 'next/router';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import { useInView } from 'framer-motion';
import favicon from '../../assets/favicon.JPG';
import { servicesList } from '../../components/sections/constants';

// Consistent color scheme for all services - Darker and more robust
const PRIMARY_COLOR = '#C7361F';
const SECONDARY_COLOR = '#1A2A3A';
const ACCENT_COLOR = '#E94F37';
const DARK_ACCENT = '#8B1A0A';
const DEEP_BLUE = '#0F172A';

// Service data - matching the servicesList from Home.jsx
const servicesData = [
  { 
    id: 'performance-marketing',
    title: 'Performance Marketing', 
    desc: 'Drive measurable growth with data-driven campaigns engineered for maximum ROI.',
    fullDescription: 'Performance Marketing focuses on achieving real, trackable results. We optimize every campaign using analytics, targeting precision, and continuous experimentation to generate conversions, leads, and revenue. Our approach ensures every marketing dollar delivers measurable impact and long-term value.',
    benefits: [
      'High-ROI Campaigns - Optimize spend to achieve the best return on investment.',
      'Laser-Focused Audience Targeting - Reach the right customers at the right time with precision.',
      'Scalable Growth - Build campaigns that expand profitably as your business grows.',
      'Full Transparency & Reporting - Get clear insights into performance, metrics, and growth opportunities.',
    ],
    whyChooseUs: [
      'Expertise Across All Paid Channels - Google Ads, Meta Ads, TikTok Ads, YouTube, LinkedIn & more.',
      'Advanced Data-Driven Optimization - We use analytics, trends, and testing to constantly refine performance.',
      'Proven Growth Framework - Our strategies consistently increase conversions and lower acquisition costs.',
      'End-to-End Campaign Management - From planning to execution to optimization, everything is handled for you.',
    ],
    process: [
      { step: 1, title: 'Performance Audit', desc: 'Evaluate current results, competitors, and opportunities.' },
      { step: 2, title: 'Campaign Strategy', desc: 'Build a powerful plan aligned with your goals.' },
      { step: 3, title: 'Execution & Launch', desc: 'Deploy high-performance campaigns across selected platforms.' },
      { step: 4, title: 'Optimization & Scaling', desc: 'Refine targeting, creatives, bidding, and audiences.' },
      { step: 5, title: 'Reporting & Insights', desc: 'Deliver data-backed recommendations for ongoing growth.' },
    ],
    reviews: [
      { name: 'James Wilson', role: 'Founder, OutdoorPlay', text: 'Advertio\'s performance marketing campaigns drove measurable growth with maximum ROI. The data-driven approach is exceptional!', highlight: 'Maximum ROI', rating: 5 },
      { name: 'Rachel Martinez', role: 'Founder, Celvora', text: 'The performance marketing strategies delivered measurable results. Our growth exceeded all expectations with data-driven campaigns!', highlight: 'Measurable Results', rating: 5 },
      { name: 'Alex Thompson', role: 'CEO, InnovateCo', text: 'Their performance marketing approach transformed our business. Data-driven campaigns engineered for maximum ROI delivered incredible growth!', highlight: 'Incredible Growth', rating: 5 },
      { name: 'Maria Garcia', role: 'CMO, TechVenture', text: 'Advertio\'s performance marketing expertise is unmatched. The campaigns drive measurable growth with maximum ROI every time!', highlight: 'Unmatched Expertise', rating: 5 },
    ],
  },
  { 
    id: 'digital-marketing',
    title: 'Digital Marketing', 
    desc: 'Build a strong online presence with strategies that connect, engage, and convert.',
    fullDescription: 'Digital Marketing is the backbone of brand visibility and customer acquisition. We design integrated marketing strategies across key digital channels to strengthen your online footprint and drive business growth.',
    benefits: [
      'Stronger Online Visibility - Boost brand presence across search, social, and digital platforms.',
      'Improved Lead Generation - Reach high-intent customers ready to take action.',
      'Holistic Marketing Approach - SEO, SEM, social media, content, and more - working together seamlessly.',
      'Audience-Centric Strategies - Tailored messaging & targeting that resonate with your ideal customers.',
    ],
    whyChooseUs: [
      'Full-Funnel Digital Expertise - We manage every stage of the customer journey.',
      'Integrated Multi-Channel Campaigns - Your brand stays consistent across all touchpoints.',
      'Real-Time Optimization - We adapt strategies based on performance and evolving digital trends.',
      'Proven Industry Experience - We\'ve successfully scaled brands across multiple sectors.',
    ],
    process: [
      { step: 1, title: 'Digital Presence Audit', desc: 'Evaluate your current online presence, identify gaps, and uncover growth opportunities.' },
      { step: 2, title: 'Strategy & Channel Planning', desc: 'Develop integrated marketing strategies and select the right channels for your goals.' },
      { step: 3, title: 'Content & Creative Development', desc: 'Create compelling content and creative assets that resonate with your audience.' },
      { step: 4, title: 'Execution Across Platforms', desc: 'Launch and manage campaigns across all selected digital platforms.' },
      { step: 5, title: 'Continuous Optimization & Insights', desc: 'Monitor performance, analyze data, and optimize strategies for ongoing growth.' },
    ],
    reviews: [
      { name: 'James Wilson', role: 'Founder, OutdoorPlay', text: 'Advertio\'s digital marketing strategies built a strong online presence for us. Our engagement and conversions increased significantly!', highlight: 'Strong Presence', rating: 5 },
      { name: 'Rachel Martinez', role: 'Founder, Celvora', text: 'The comprehensive digital marketing approach connected us with our audience perfectly. Results exceeded expectations!', highlight: 'Exceeded Expectations', rating: 5 },
      { name: 'Alex Thompson', role: 'CEO, InnovateCo', text: 'Their digital marketing strategies transformed our online presence. We now have a strong, engaging presence that converts!', highlight: 'Transformed Presence', rating: 5 },
      { name: 'Maria Garcia', role: 'CMO, TechVenture', text: 'Advertio\'s digital marketing expertise helped us build a strong online presence. The strategies connect, engage, and convert!', highlight: 'Expertise', rating: 5 },
    ],
  },
  { 
    id: 'social-media-handling-branding',
    title: 'Social Media Handling & Branding', 
    desc: 'Grow your influence and build a brand your audience loves.',
    fullDescription: 'Social media is where brands become personalities. We manage, build, and elevate your social presence through strategic planning, engaging content, and brand-aligned storytelling that builds trust and long-term loyalty.',
    benefits: [
      'Stronger Brand Identity Online - Create a recognizable and consistent voice across platforms.',
      'Engagement & Community Growth - Build real connections that turn followers into loyal customers.',
      'High-Quality Content Creation - Professional posts, reels, stories, and campaigns that stand out.',
      'Consistent Brand Visibility - Stay active, relevant, and top-of-mind every single day.',
    ],
    whyChooseUs: [
      'End-to-End Account Management - We handle everything—from content calendars to posting to engagement.',
      'Creative Storytelling Expertise - Your brand message becomes more memorable and authentic.',
      'Platform-Specific Strategies - Instagram, Facebook, LinkedIn, YouTube, TikTok—each handled differently.',
      'Data-Driven Social Growth - We analyze performance & optimize for reach, engagement, and conversions.',
    ],
    process: [
      { step: 1, title: 'Brand & Social Audit', desc: 'Evaluate your current brand identity and social media presence to identify opportunities.' },
      { step: 2, title: 'Content Strategy & Planning', desc: 'Develop comprehensive content strategies and editorial calendars for each platform.' },
      { step: 3, title: 'Content Creation (posts, reels, creatives)', desc: 'Create high-quality, engaging content including posts, reels, stories, and creative assets.' },
      { step: 4, title: 'Publishing & Community Engagement', desc: 'Schedule and publish content, then actively engage with your community and respond to interactions.' },
      { step: 5, title: 'Performance Tracking & Optimization', desc: 'Monitor metrics, analyze performance data, and continuously optimize strategies for growth.' },
    ],
    reviews: [
      { name: 'Emma Thompson', role: 'CMO, Novelle', text: 'Advertio\'s social media handling transformed our brand presence. Our engagement and follower growth exceeded all expectations!', highlight: 'Exceeded Expectations', rating: 5 },
      { name: 'Sophie Brown', role: 'Marketing Director, Customizology', text: 'The team built a brand our audience truly loves. Our social media presence is now professional and engaging.', highlight: 'Professional Presence', rating: 5 },
      { name: 'Daniel Kim', role: 'Founder, ShopSmart', text: 'Their social media strategy helped us grow our influence significantly. The content quality and engagement are outstanding!', highlight: 'Significant Growth', rating: 5 },
      { name: 'Olivia Davis', role: 'VP Brand, TrendSet', text: 'Advertio\'s branding approach resonated perfectly with our audience. Our brand identity is now strong and recognizable!', highlight: 'Strong Identity', rating: 5 },
    ],
  },
  { 
    id: 'creative-design',
    title: 'Creative & Design', 
    desc: 'Transform your brand visuals into powerful assets that influence and inspire.',
    fullDescription: 'Great design is more than aesthetics—it\'s communication. We create visually compelling brand assets that tell your story, strengthen recognition, and elevate your brand\'s presence in the market.',
    benefits: [
      'Premium Brand Aesthetic - High-quality, cohesive visuals that reflect your brand identity.',
      'Attention-Grabbing Creatives - Designs that stand out and increase engagement.',
      'Better Brand Recall - Consistent design language that customers remember.',
      'Versatile Design Solutions - From digital banners to brand kits to campaign visuals.',
    ],
    whyChooseUs: [
      'Experienced Creative Team - Professionals in visual design, branding, UI, and marketing creatives.',
      'Strategic Design Approach - Every creative is backed by purpose and messaging strategy.',
      'Fast Turnaround & Reliability - Timely delivery without compromising quality.',
      'Full Creative Support - Brand Kits, Ads, Social Media, Pitch Decks, Packaging & more.',
    ],
    process: [
      { step: 1, title: 'Creative Discovery Session', desc: 'Understand your brand, goals, and design requirements through collaborative discovery.' },
      { step: 2, title: 'Brand Direction & Moodboard', desc: 'Develop brand direction and create visual moodboards that capture your brand essence.' },
      { step: 3, title: 'Design Development', desc: 'Create compelling designs with attention to detail and brand consistency.' },
      { step: 4, title: 'Revision & Refinement', desc: 'Refine designs based on feedback to ensure perfect execution and alignment.' },
      { step: 5, title: 'Final Delivery with Brand Assets', desc: 'Deliver final brand assets and provide guidelines for consistent usage across all touchpoints.' },
    ],
    reviews: [
      { name: 'Sarah Chen', role: 'CEO, TechHunts', text: 'Advertio\'s creative designs transformed our brand visuals. The designs are powerful, inspiring, and perfectly aligned with our brand!', highlight: 'Powerful Designs', rating: 5 },
      { name: 'David Park', role: 'Director, InfiniteAge', text: 'The creative team created visuals that truly influence and inspire. Our brand identity is now stronger than ever!', highlight: 'Inspiring Visuals', rating: 5 },
      { name: 'Jennifer Liu', role: 'Founder, DesignHub', text: 'The design quality exceeded our expectations. Every visual asset is professional and strategically crafted!', highlight: 'Exceeded Expectations', rating: 5 },
      { name: 'Mark Stevens', role: 'VP Marketing, FutureTech', text: 'Advertio\'s creative work is exceptional. The designs perfectly capture our brand essence and inspire our audience!', highlight: 'Exceptional Work', rating: 5 },
    ],
  },
  { 
    id: 'video-editing',
    title: 'Video Editing', 
    desc: 'Create cinematic visuals that elevate your brand and captivate your audience.',
    fullDescription: 'Video is the most powerful content format today. We craft high-quality, engaging video edits that tell your story, enhance brand impact, and drive stronger audience engagement across platforms.',
    benefits: [
      'Professional Cinematic Editing - Smooth transitions, color grading, sound design & more.',
      'Platform-Optimized Videos - YouTube, Instagram Reels, TikTok, Ads, and more.',
      'Stronger Viewer Engagement - Videos built to hold attention and increase watch time.',
      'Brand-Aligned Storytelling - Edits that match your visual style and brand tone.',
    ],
    whyChooseUs: [
      'Expert Editing Team - Skilled in storytelling, pacing, and visual enhancement.',
      'Fast & Reliable Delivery - We maintain quality while meeting strict timelines.',
      'Creative + Strategic Approach - Beyond editing—we build narrative structure and audience flow.',
      'Wide Format Expertise - Promos, ads, reels, documentaries, corporate videos & more.',
    ],
    process: [
      { step: 1, title: 'Content Review & Objective Setting', desc: 'Review your footage and content to understand objectives and requirements.' },
      { step: 2, title: 'Storyboarding (if needed)', desc: 'Create storyboards to plan narrative structure and visual flow when required.' },
      { step: 3, title: 'Editing & Enhancement', desc: 'Edit footage with professional techniques, color grading, transitions, and effects.' },
      { step: 4, title: 'Revisions & Finalization', desc: 'Refine the edit based on feedback and finalize all details for delivery.' },
      { step: 5, title: 'Delivery of Final Formats', desc: 'Deliver final videos in all required formats optimized for different platforms.' },
    ],
    reviews: [
      { name: 'David Park', role: 'Director, InfiniteAge', text: 'Advertio\'s video editing created cinematic visuals that truly elevated our brand. The quality is outstanding!', highlight: 'Cinematic Quality', rating: 5 },
      { name: 'Sarah Chen', role: 'CEO, TechHunts', text: 'The video editing services captivated our audience perfectly. Every video tells our story beautifully!', highlight: 'Captivating Content', rating: 5 },
      { name: 'Brian Miller', role: 'Founder, LaunchPad', text: 'The editing quality is professional and cinematic. Our videos now stand out from the competition!', highlight: 'Professional Quality', rating: 5 },
      { name: 'Catherine Lee', role: 'CMO, ProductPro', text: 'Advertio\'s video editing transformed our content. The cinematic visuals truly elevate our brand presence!', highlight: 'Elevated Brand', rating: 5 },
    ],
  },
  { 
    id: 'website-development',
    title: 'Website Development', 
    desc: 'Build a high-performance website that converts visitors into customers.',
    fullDescription: 'Your website is your digital headquarters. We design and develop fast, modern, and conversion-focused websites that reflect your brand, engage visitors, and drive measurable business growth.',
    benefits: [
      'High-Speed, High-Performance Websites - Optimized for speed, SEO, and mobile responsiveness.',
      'Conversion-Focused Design - User experience designed to guide visitors into taking action.',
      'Custom, Scalable Architecture - Built to grow as your business evolves.',
      'SEO-Ready Structure - Better search visibility right from launch.',
    ],
    whyChooseUs: [
      'Experienced Web Designers & Developers - Expertise in modern frameworks & best practices.',
      'Clean, Modern UI/UX - Websites that look stunning and function flawlessly.',
      'Full Development Process - Design, development, testing, and launch—all handled in-house.',
      'Secure & Future-Proof Build - Strong backend architecture & long-term reliability.',
    ],
    process: [
      { step: 1, title: 'Discovery & Requirement Mapping', desc: 'Understand your business goals, target audience, and technical requirements.' },
      { step: 2, title: 'Wireframing & UI/UX Design', desc: 'Create wireframes and design user interfaces that align with your brand and goals.' },
      { step: 3, title: 'Development & Integrations', desc: 'Build your website using modern frameworks and integrate necessary tools and services.' },
      { step: 4, title: 'Testing & Deployment', desc: 'Test functionality, performance, and user experience, then deploy to production.' },
      { step: 5, title: 'Post-Launch Optimization', desc: 'Monitor performance, gather insights, and optimize for ongoing growth and improvements.' },
    ],
    reviews: [
      { name: 'Michael Rodriguez', role: 'Founder, Glamboon', text: 'Advertio\'s website development created a high-performance site that converts. Our conversion rate improved dramatically!', highlight: 'Improved Conversions', rating: 5 },
      { name: 'Rachel Martinez', role: 'Founder, Celvora', text: 'The website they built is fast, beautiful, and converts visitors into customers. Outstanding work!', highlight: 'Outstanding Work', rating: 5 },
      { name: 'Ryan Patel', role: 'CEO, ConvertMax', text: 'The website performance and conversion optimization exceeded our expectations. Highly recommend!', highlight: 'Exceeded Expectations', rating: 5 },
      { name: 'Lauren Taylor', role: 'Founder, EcomBoost', text: 'Advertio\'s website development is top-notch. The site is fast, SEO-friendly, and converts perfectly!', highlight: 'Top-Notch', rating: 5 },
    ],
  },
  { 
    id: 'shopify-store-development',
    title: 'Shopify Store Development', 
    desc: 'Launch a revenue-driven Shopify store built for performance, scalability, and brand experience.',
    fullDescription: 'We create highly optimized Shopify stores designed for fast performance, smooth user journeys, and seamless shopping experiences—helping you maximize conversions and sales.',
    benefits: [
      'Conversion-Optimized Storefronts - Designed to increase sales and reduce dropout.',
      'Seamless User Experience - Easy navigation, clean layout, and smooth checkout flow.',
      'Custom Features & Integrations - Apps, automations, product setups & more.',
      'Mobile-First Design - Perfect performance across all devices.',
    ],
    whyChooseUs: [
      'Certified Shopify Experts - Deep knowledge of themes, apps, and store architecture.',
      'Sales & Growth-Focused Strategy - Design + CRO built into the entire experience.',
      'Fast Delivery & Reliable Support - We launch quickly without compromising quality.',
      'End-to-End Store Setup - Products, collections, SEO, payment setup, automations & more.',
    ],
    process: [
      { step: 1, title: 'Store Planning & Strategy', desc: 'Plan your store structure, product organization, and conversion strategy.' },
      { step: 2, title: 'Theme Selection or Custom Design', desc: 'Select the perfect theme or create custom designs that reflect your brand.' },
      { step: 3, title: 'Store Build & Product Setup', desc: 'Build your store, set up products, collections, and configure all settings.' },
      { step: 4, title: 'Integrations & Testing', desc: 'Integrate apps, payment systems, and test all functionality and user flows.' },
      { step: 5, title: 'Launch & Optimization', desc: 'Launch your store and continuously optimize for performance and conversions.' },
    ],
    reviews: [
      { name: 'Thomas Lee', role: 'CEO, Bailey Mercer', text: 'Advertio\'s Shopify store development created a revenue-driven platform. Our sales increased significantly after launch!', highlight: 'Increased Sales', rating: 5 },
      { name: 'Lisa Anderson', role: 'VP Marketing, VikingBags', text: 'The store they built is beautiful, fast, and converts perfectly. It\'s built for performance and scalability!', highlight: 'Perfect Conversion', rating: 5 },
      { name: 'Kevin Zhang', role: 'Founder, GrowthLabs', text: 'The Shopify store exceeded our expectations. The brand experience and functionality are outstanding!', highlight: 'Outstanding Experience', rating: 5 },
      { name: 'Nicole Foster', role: 'CMO, ScaleUp Inc', text: 'Advertio\'s Shopify development is exceptional. The store is scalable and perfectly aligned with our brand!', highlight: 'Exceptional Development', rating: 5 },
    ],
  },
  { 
    id: 'ecommerce-solutions',
    title: 'Ecommerce Solutions', 
    desc: 'Empower your online business with complete ecommerce strategy, technology, and growth solutions.',
    fullDescription: 'We help brands build and scale ecommerce operations with end-to-end strategic, technical, and performance support — from store setup to marketing to long-term scalability.',
    benefits: [
      'Complete Ecommerce Ecosystem - Store setup, marketing, automation, logistics & more.',
      'Higher Conversion Rates - Optimize every stage of the customer journey.',
      'Seamless Shopping Experience - Smooth browsing, checkout, and fulfillment workflows.',
      'Scalable Growth Framework - Strategies designed for long-term expansion.',
    ],
    whyChooseUs: [
      'Ecommerce Strategy + Tech Expertise - We combine marketing, UX, development & optimization.',
      'Omnichannel Approach - Integrated experience across website, social, ads, and marketplaces.',
      'Advanced Conversion Optimization - We maximize sales by improving user flow and performance.',
      'Reliable Ongoing Support - We help you grow month after month.',
    ],
    process: [
      { step: 1, title: 'Ecommerce Audit & Planning', desc: 'Evaluate your current setup and develop comprehensive ecommerce strategy aligned with your goals.' },
      { step: 2, title: 'Platform Setup & Development', desc: 'Set up and develop your ecommerce platform with all necessary integrations and features.' },
      { step: 3, title: 'Marketing & Growth Integration', desc: 'Integrate marketing strategies, campaigns, and growth tactics across all channels.' },
      { step: 4, title: 'Automation & Optimization', desc: 'Implement automations and optimize every aspect of your ecommerce operations.' },
      { step: 5, title: 'Performance Review & Scaling', desc: 'Review performance metrics and implement scaling strategies for long-term growth.' },
    ],
    reviews: [
      { name: 'James Wilson', role: 'Founder, OutdoorPlay', text: 'Advertio\'s ecommerce solutions empowered our business completely. The comprehensive approach drove significant growth!', highlight: 'Significant Growth', rating: 5 },
      { name: 'Chris Johnson', role: 'Director, Value Makers', text: 'The complete ecommerce solutions transformed our online business. Strategy, technology, and growth all in one!', highlight: 'Complete Solutions', rating: 5 },
      { name: 'Patrick O\'Brien', role: 'CEO, EcomLeaders', text: 'Advertio provided everything we needed to succeed online. The comprehensive approach is exactly what we needed!', highlight: 'Complete Success', rating: 5 },
      { name: 'Victoria Adams', role: 'CMO, OnlineGrowth', text: 'The ecommerce solutions are comprehensive and effective. Our business is now empowered to grow and scale!', highlight: 'Empowered Growth', rating: 5 },
    ],
  },
];

export default function ServiceDetail() {
  const router = useRouter();
  const { serviceId } = router.query;
  const sectionRef = useRef(null);
  const mainContentRef = useRef(null);
  const whyChooseRef = useRef(null);
  const processRef = useRef(null);
  const reviewsRef = useRef(null);
  const contactFormRef = useRef(null);
  
  // Check screen size synchronously on initial render - ensure it runs immediately
  const getInitialScreenSize = () => {
    if (typeof window === 'undefined') return { isMobile: true, isSmallScreen: true }; // Default to showing on SSR
    const width = window.innerWidth;
    return {
      isMobile: width < 768,
      isSmallScreen: width < 1024
    };
  };
  
  const [isMobile, setIsMobile] = useState(() => getInitialScreenSize().isMobile);
  const [isSmallScreen, setIsSmallScreen] = useState(() => getInitialScreenSize().isSmallScreen);
  
  // Detect mobile and small screens on mount and resize - ensure immediate detection
  useEffect(() => {
    const checkScreenSize = () => {
      const width = window.innerWidth;
      const mobile = width < 768;
      const small = width < 1024;
      setIsMobile(mobile);
      setIsSmallScreen(small);
    };
    
    // Check immediately on mount
    checkScreenSize();
    
    // Also listen for resize
    window.addEventListener('resize', checkScreenSize);
    return () => window.removeEventListener('resize', checkScreenSize);
  }, []);
  
  // Helper: use immediate visibility on mobile and small screens
  const shouldShowImmediately = isMobile || isSmallScreen;
  
  // Always call hooks (React rules), but override values on small screens
  const _isInView = useInView(sectionRef, { once: true, amount: shouldShowImmediately ? 1 : 0.2 });
  const _mainContentInView = useInView(mainContentRef, { once: true, amount: shouldShowImmediately ? 1 : 0.2 });
  const _whyChooseInView = useInView(whyChooseRef, { once: true, amount: shouldShowImmediately ? 1 : 0.2 });
  const _processInView = useInView(processRef, { once: true, amount: shouldShowImmediately ? 1 : 0.2 });
  const _reviewsInView = useInView(reviewsRef, { once: true, amount: shouldShowImmediately ? 1 : 0.2 });
  const _contactFormInView = useInView(contactFormRef, { once: true, amount: shouldShowImmediately ? 1 : 0.2 });
  
  // Override to always show on small screens
  const isInView = shouldShowImmediately ? true : _isInView;
  const mainContentInView = shouldShowImmediately ? true : _mainContentInView;
  const whyChooseInView = shouldShowImmediately ? true : _whyChooseInView;
  const processInView = shouldShowImmediately ? true : _processInView;
  const reviewsInView = shouldShowImmediately ? true : _reviewsInView;
  const contactFormInView = shouldShowImmediately ? true : _contactFormInView;

  // Find the service by ID
  const service = servicesData.find(s => s.id === serviceId);

  // Scroll to top when component mounts or serviceId changes
  useEffect(() => {
    if (serviceId) {
      window.scrollTo({ top: 0, left: 0, behavior: 'instant' });
    }
  }, [serviceId]);

  // If service not found, redirect to home page
  useEffect(() => {
    if (serviceId && !service) {
      router.push('/');
    }
  }, [service, serviceId, router]);

  if (!serviceId || !service) {
    return null;
  }

  return (
    <div
      ref={sectionRef}
      className="relative min-h-screen pt-24 pb-20 bg-white md:overflow-visible overflow-visible"
      style={{ 
        backgroundColor: '#FFFFFF', 
        background: '#FFFFFF',
        opacity: 1,
        visibility: 'visible',
        display: 'block'
      }}
    >
      <div className="relative max-w-[1500px] mx-auto px-6 md:px-8 lg:px-12">
        {/* Back Button */}
        <motion.div
          className="mb-8"
          initial={{ opacity: shouldShowImmediately ? 1 : 0, x: shouldShowImmediately ? 0 : -20 }}
          animate={shouldShowImmediately ? { opacity: 1, x: 0 } : (isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -20 })}
          transition={{ duration: shouldShowImmediately ? 0 : 0.6, delay: shouldShowImmediately ? 0 : 0.2 }}
        >
          <Link
            href="/"
            className="inline-flex items-center gap-2 text-[#253E5C]/70 hover:text-[#253E5C] font-semibold transition-colors"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
            Back to Home
          </Link>
        </motion.div>

        {/* Service Header */}
        <div className="text-center mb-16 px-4" style={{ opacity: 1, visibility: 'visible', display: 'block' }}>
          <h1
            className="text-5xl md:text-6xl lg:text-7xl font-black mb-6 relative z-10 leading-tight overflow-visible"
            style={isMobile || isSmallScreen ? {
              // Simple solid color on small screens for better compatibility
              color: PRIMARY_COLOR,
              padding: '0.45rem 0',
              wordBreak: 'break-word',
              opacity: 1,
              visibility: 'visible',
              display: 'block',
            } : {
              // Gradient effect on larger screens
              background: `linear-gradient(135deg, ${PRIMARY_COLOR}, ${SECONDARY_COLOR})`,
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text',
              padding: '0.45rem 0',
              wordBreak: 'break-word',
              opacity: 1,
              visibility: 'visible',
              display: 'block',
              color: PRIMARY_COLOR, // Fallback color
            }}
          >
            {service.title}
          </h1>
          <p
            className="text-xl md:text-2xl text-[#253E5C]/70 max-w-3xl mx-auto leading-tight md:leading-relaxed"
            style={{
              opacity: 1,
              visibility: 'visible',
              display: 'block',
            }}
          >
            {service.desc}
          </p>
        </div>

        {/* Main Content Card */}
        <motion.div
          ref={mainContentRef}
          className="rounded-[36px] border border-white/20 p-8 md:p-12 lg:p-16 mb-12 relative z-10"
          style={{
            background: 'linear-gradient(135deg, rgba(255, 255, 255, 0.95), rgba(255, 255, 255, 0.9))',
            backdropFilter: 'blur(20px)',
            transformStyle: shouldShowImmediately ? 'flat' : 'preserve-3d',
            boxShadow: `0 25px 50px ${SECONDARY_COLOR}30, 0 0 40px ${DEEP_BLUE}20, 0 10px 30px ${SECONDARY_COLOR}25`,
          }}
          initial={isMobile ? { opacity: 1, y: 0 } : { opacity: 0, y: 60, rotateX: -10, z: -100 }}
          animate={shouldShowImmediately ? { opacity: 1, y: 0 } : (mainContentInView ? { opacity: 1, y: 0, rotateX: 0, z: 0 } : { opacity: 0, y: 60, rotateX: -10, z: -100 })}
          transition={isMobile ? { duration: 0 } : { 
            default: { duration: 0.8, ease: [0.22, 1, 0.36, 1] },
            hover: { duration: 0, ease: 'linear' }
          }}
          whileHover={shouldShowImmediately ? {} : { 
            y: -4,
            rotateX: 2,
            z: 10,
          }}
        >
          {/* Full Description */}
          <motion.div
            className="mb-12"
            initial={{ opacity: shouldShowImmediately ? 1 : 0, y: shouldShowImmediately ? 0 : 30 }}
            animate={shouldShowImmediately ? { opacity: 1, y: 0 } : (mainContentInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 })}
            transition={{ duration: shouldShowImmediately ? 0 : 0.8, delay: shouldShowImmediately ? 0 : 0.2 }}
          >
            <h2 className="text-3xl md:text-4xl font-black text-[#253E5C] mb-6">Overview</h2>
            <p className="text-lg md:text-xl text-[#253E5C]/80 leading-tight md:leading-relaxed">
              {service.fullDescription}
            </p>
          </motion.div>

          {/* Benefits Section */}
          <motion.div
            initial={{ opacity: shouldShowImmediately ? 1 : 0, y: shouldShowImmediately ? 0 : 30 }}
            animate={shouldShowImmediately ? { opacity: 1, y: 0 } : (mainContentInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 })}
            transition={{ duration: shouldShowImmediately ? 0 : 0.8, delay: shouldShowImmediately ? 0 : 0.4 }}
          >
            <h2 className="text-3xl md:text-4xl font-black text-[#253E5C] mb-8">Key Benefits</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {service.benefits.map((benefit, index) => (
                <motion.div
                  key={index}
                  className="relative group flex items-start gap-4 p-6 rounded-2xl overflow-hidden transition-all duration-300"
                  style={{
                    background: `linear-gradient(135deg, ${PRIMARY_COLOR}10, ${PRIMARY_COLOR}05)`,
                    border: `2px solid ${PRIMARY_COLOR}20`,
                  }}
                  initial={isMobile ? { opacity: 1, x: 0 } : { opacity: 0, x: -20 }}
                  animate={shouldShowImmediately ? { opacity: 1, x: 0 } : (mainContentInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -20 })}
                  transition={{ duration: 0.6, delay: 0.5 + index * 0.1, ease: [0.22, 1, 0.36, 1] }}
                  whileHover={shouldShowImmediately ? {} : {
                    scale: 1.02,
                    y: -4,
                  }}
                >
                  {/* Simple hover background */}
                  <div
                    className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                    style={{
                      background: `linear-gradient(135deg, ${PRIMARY_COLOR}15, ${PRIMARY_COLOR}08)`,
                    }}
                  />
                  
                  <div
                    className="flex-shrink-0 w-12 h-12 rounded-full flex items-center justify-center relative z-10 overflow-hidden"
                    style={{ 
                      background: 'transparent',
                    }}
                  >
                    <img 
                      src={typeof favicon === 'string' ? favicon : (favicon?.src || favicon?.default || favicon)}
                      alt="Advertio" 
                      className="w-full h-full object-contain rounded-full transition-transform duration-300 group-hover:scale-110"
                    />
                  </div>
                  <p 
                    className="text-lg font-semibold text-[#1A2A3A] pt-1 relative z-10 transition-colors duration-300 group-hover:text-[#C7361F] leading-tight md:leading-normal"
                  >
                    {benefit}
                  </p>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </motion.div>

        {/* Why Choose Advertio Section */}
        <motion.div
          ref={whyChooseRef}
          className="rounded-[36px] border border-white/20 p-8 md:p-12 lg:p-16 mb-12 relative z-10"
          style={{
            background: 'linear-gradient(135deg, rgba(255, 255, 255, 0.95), rgba(255, 255, 255, 0.9))',
            backdropFilter: 'blur(20px)',
            transformStyle: shouldShowImmediately ? 'flat' : 'preserve-3d',
            boxShadow: `0 25px 50px ${SECONDARY_COLOR}30, 0 0 40px ${DEEP_BLUE}20, 0 10px 30px ${SECONDARY_COLOR}25`,
          }}
          initial={isMobile ? { opacity: 1, y: 0 } : { opacity: 0, y: 60, rotateX: -10, z: -100 }}
          animate={shouldShowImmediately ? { opacity: 1, y: 0 } : (whyChooseInView ? { opacity: 1, y: 0, rotateX: 0, z: 0 } : { opacity: 0, y: 60, rotateX: -10, z: -100 })}
          transition={isMobile ? { duration: 0 } : { 
            default: { duration: 0.8, ease: [0.22, 1, 0.36, 1] },
            hover: { duration: 0, ease: 'linear' }
          }}
          whileHover={shouldShowImmediately ? {} : { 
            y: -4,
            rotateX: 2,
            z: 10,
          }}
        >
          <motion.h2
            className="text-3xl md:text-4xl font-black text-[#253E5C] mb-8"
            initial={{ opacity: shouldShowImmediately ? 1 : 0, y: shouldShowImmediately ? 0 : 20 }}
            animate={shouldShowImmediately ? { opacity: 1, y: 0 } : (whyChooseInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 })}
            transition={{ duration: shouldShowImmediately ? 0 : 0.8, delay: shouldShowImmediately ? 0 : 0.2 }}
          >
            Why Choose Advertio for {service.title}?
          </motion.h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {service.whyChooseUs.map((reason, index) => (
              <motion.div
                key={index}
                className="relative group flex items-start gap-4 p-6 rounded-2xl overflow-hidden transition-all duration-300"
                style={{
                  background: `linear-gradient(135deg, ${PRIMARY_COLOR}10, ${PRIMARY_COLOR}05)`,
                  border: `2px solid ${PRIMARY_COLOR}20`,
                }}
                initial={isMobile ? { opacity: 1, x: 0 } : { opacity: 0, x: -20 }}
                animate={shouldShowImmediately ? { opacity: 1, x: 0 } : (whyChooseInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -20 })}
                transition={{ duration: 0.6, delay: 0.3 + index * 0.1, ease: [0.22, 1, 0.36, 1] }}
                whileHover={shouldShowImmediately ? {} : {
                  scale: 1.02,
                  y: -4,
                }}
              >
                {/* Simple hover background */}
                <div
                  className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                  style={{
                    background: `linear-gradient(135deg, ${PRIMARY_COLOR}15, ${PRIMARY_COLOR}08)`,
                  }}
                />
                
                <div
                  className="flex-shrink-0 w-12 h-12 rounded-full flex items-center justify-center relative z-10 overflow-hidden"
                  style={{ 
                    background: 'transparent',
                  }}
                >
                  <img 
                    src={favicon.src || favicon} 
                    alt="Advertio" 
                    className="w-full h-full object-contain rounded-full transition-transform duration-300 group-hover:scale-110"
                  />
                </div>
                <p 
                  className="text-lg font-semibold text-[#1A2A3A] pt-1 relative z-10 transition-colors duration-300 group-hover:text-[#C7361F] leading-tight md:leading-normal"
                >
                  {reason}
                </p>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Process Section */}
        <motion.div
          ref={processRef}
          className="rounded-[36px] border border-white/20 p-8 md:p-12 lg:p-16 mb-12 relative z-10"
          style={{
            background: 'linear-gradient(135deg, rgba(255, 255, 255, 0.95), rgba(255, 255, 255, 0.9))',
            backdropFilter: 'blur(20px)',
            transformStyle: shouldShowImmediately ? 'flat' : 'preserve-3d',
            boxShadow: `0 25px 50px ${SECONDARY_COLOR}30, 0 0 40px ${DEEP_BLUE}20, 0 10px 30px ${SECONDARY_COLOR}25`,
          }}
          initial={isMobile ? { opacity: 1, y: 0 } : { opacity: 0, y: 60, rotateX: -10, z: -100 }}
          animate={shouldShowImmediately ? { opacity: 1, y: 0 } : (processInView ? { opacity: 1, y: 0, rotateX: 0, z: 0 } : { opacity: 0, y: 60, rotateX: -10, z: -100 })}
          transition={isMobile ? { duration: 0 } : { 
            default: { duration: 0.8, ease: [0.22, 1, 0.36, 1] },
            hover: { duration: 0, ease: 'linear' }
          }}
          whileHover={shouldShowImmediately ? {} : { 
            y: -4,
            rotateX: 2,
            z: 10,
          }}
        >
          <motion.h2
            className="text-3xl md:text-4xl font-black text-[#253E5C] mb-12 text-center"
            initial={{ opacity: shouldShowImmediately ? 1 : 0, y: shouldShowImmediately ? 0 : 20 }}
            animate={shouldShowImmediately ? { opacity: 1, y: 0 } : (processInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 })}
            transition={{ duration: shouldShowImmediately ? 0 : 0.8, delay: shouldShowImmediately ? 0 : 0.2 }}
          >
            How We Will Do This
          </motion.h2>
          <div className="space-y-8">
            {service.process.map((step, index) => (
              <motion.div
                key={index}
                className="flex gap-6 items-start"
                style={{ transformStyle: shouldShowImmediately ? 'flat' : 'preserve-3d' }}
                initial={isMobile ? { opacity: 1, x: 0 } : { opacity: 0, x: -30, rotateY: -20 }}
                animate={shouldShowImmediately ? { opacity: 1, x: 0 } : (processInView ? { opacity: 1, x: 0, rotateY: 0 } : { opacity: 0, x: -30, rotateY: -20 })}
                transition={isMobile ? { duration: 0 } : { 
                  default: { duration: 0.6, delay: 0.3 + index * 0.1, ease: [0.22, 1, 0.36, 1] },
                  hover: { duration: 0, ease: 'linear' }
                }}
                whileHover={shouldShowImmediately ? {} : { 
                  x: 5,
                  rotateY: 3,
                  z: 10,
                }}
              >
                <motion.div
                  className="flex-shrink-0 w-16 h-16 rounded-full flex items-center justify-center text-white font-black text-xl"
                  style={{ background: PRIMARY_COLOR, transformStyle: shouldShowImmediately ? 'flat' : 'preserve-3d' }}
                  whileHover={shouldShowImmediately ? {} : { scale: 1.1, rotateY: 360, z: 20 }}
                  transition={{ duration: 0, ease: 'linear' }}
                >
                  {step.step}
                </motion.div>
                <div className="flex-1 pt-2">
                  <h3 className="text-2xl font-black text-[#253E5C] mb-2">{step.title}</h3>
                  <p className="text-lg text-[#253E5C]/70 leading-tight md:leading-relaxed">{step.desc}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Reviews Section */}
        <motion.div
          ref={reviewsRef}
          className="mb-12"
          initial={{ opacity: shouldShowImmediately ? 1 : 0, y: shouldShowImmediately ? 0 : 60 }}
          animate={shouldShowImmediately ? { opacity: 1, y: 0 } : (reviewsInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 60 })}
          transition={{ duration: shouldShowImmediately ? 0 : 0.8 }}
        >
          <motion.h2
            className="text-3xl md:text-4xl font-black text-[#253E5C] mb-8 text-center"
            initial={{ opacity: shouldShowImmediately ? 1 : 0, y: shouldShowImmediately ? 0 : 20 }}
            animate={shouldShowImmediately ? { opacity: 1, y: 0 } : (reviewsInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 })}
            transition={{ duration: shouldShowImmediately ? 0 : 0.8, delay: shouldShowImmediately ? 0 : 0.2 }}
          >
            What Clients Say About Our {service.title}
          </motion.h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {service.reviews.map((review, index) => (
              <motion.div
                key={index}
                className="rounded-[28px] border border-white/20 p-8"
                style={{
                  background: 'linear-gradient(135deg, rgba(255, 255, 255, 0.95), rgba(255, 255, 255, 0.9))',
                  backdropFilter: 'blur(20px)',
                  transformStyle: shouldShowImmediately ? 'flat' : 'preserve-3d',
                  boxShadow: `0 15px 35px ${SECONDARY_COLOR}25, 0 0 25px ${DEEP_BLUE}15, 0 5px 15px ${SECONDARY_COLOR}20`,
                }}
                initial={isMobile ? { opacity: 1, y: 0 } : { opacity: 0, y: 40, rotateY: -15 }}
                animate={shouldShowImmediately ? { opacity: 1, y: 0 } : (reviewsInView ? { opacity: 1, y: 0, rotateY: 0 } : { opacity: 0, y: 40, rotateY: -15 })}
                transition={isMobile ? { duration: 0 } : { 
                  default: { duration: 0.6, delay: 0.3 + index * 0.15, ease: [0.22, 1, 0.36, 1] },
                  hover: { duration: 0, ease: 'linear' }
                }}
                whileHover={shouldShowImmediately ? {} : {
                  scale: 1.02,
                  boxShadow: `0 20px 50px ${SECONDARY_COLOR}40, 0 0 30px ${DEEP_BLUE}30, 0 10px 20px ${SECONDARY_COLOR}25`,
                  rotateY: 3,
                  z: 15,
                }}
              >
                <div className="flex items-center gap-4 mb-4">
                  <div
                    className="w-16 h-16 rounded-full overflow-hidden border-4"
                    style={{ borderColor: PRIMARY_COLOR }}
                  >
                    <div
                      className="w-full h-full flex items-center justify-center text-white font-bold text-xl"
                      style={{ background: PRIMARY_COLOR }}
                    >
                      {review.name.charAt(0)}
                    </div>
                  </div>
                  <div>
                    <h4 className="text-xl font-black text-[#253E5C]">{review.name}</h4>
                    <p className="text-sm text-[#253E5C]/70">{review.role}</p>
                  </div>
                </div>
                <div className="flex gap-1 mb-4">
                  {[...Array(review.rating)].map((_, i) => (
                    <svg key={i} className="w-5 h-5" fill="#FFD700" viewBox="0 0 24 24">
                      <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
                    </svg>
                  ))}
                </div>
                <p className="text-[#253E5C]/80 mb-4 leading-tight md:leading-relaxed">&ldquo;{review.text}&rdquo;</p>
                <div
                  className="inline-flex items-center gap-2 px-4 py-2 rounded-full"
                  style={{
                    background: `${PRIMARY_COLOR}15`,
                    border: `1px solid ${PRIMARY_COLOR}30`,
                  }}
                >
                  <span className="text-sm font-black" style={{ color: PRIMARY_COLOR }}>
                    {review.highlight}
                  </span>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Contact Form Section */}
        <ServiceContactForm service={service} contactFormRef={contactFormRef} contactFormInView={contactFormInView} isMobile={isMobile} shouldShowImmediately={shouldShowImmediately} />
      </div>
    </div>
  );
}

// Contact Form Component
function ServiceContactForm({ service, contactFormRef, contactFormInView, isMobile = false, shouldShowImmediately = false }) {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    company: '',
    service: service.title,
    adSpend: '',
    message: '',
  });
  const [status, setStatus] = useState('idle');

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
      setFormData({ name: '', email: '', company: '', message: '', service: service.title });

      setTimeout(() => setStatus('idle'), 3000);
    }, 1500);
  };

  return (
    <motion.div
      ref={contactFormRef}
      className="rounded-[36px] border border-white/20 p-8 md:p-12 lg:p-16 relative z-10 max-w-4xl mx-auto"
      style={{
        background: 'linear-gradient(135deg, rgba(233, 79, 55, 1) 0%, rgba(37, 62, 92, 1) 50%, rgba(233, 79, 55, 1) 100%)',
        transformStyle: shouldShowImmediately ? 'flat' : 'preserve-3d',
        boxShadow: `0 25px 60px ${SECONDARY_COLOR}40, 0 0 50px ${DEEP_BLUE}30, 0 15px 40px ${SECONDARY_COLOR}35`,
      }}
      initial={isMobile ? { opacity: 1, y: 0 } : { opacity: 0, y: 60, rotateX: -10, z: -100 }}
      animate={shouldShowImmediately ? { opacity: 1, y: 0 } : (contactFormInView ? { opacity: 1, y: 0, rotateX: 0, z: 0 } : { opacity: 0, y: 60, rotateX: -10, z: -100 })}
      transition={isMobile ? { duration: 0 } : { 
        duration: 0.8, 
        ease: [0.22, 1, 0.36, 1],
        hover: { duration: 0, ease: 'linear' }
      }}
      whileHover={shouldShowImmediately ? {} : { 
        y: -4,
        rotateX: 2,
        z: 10,
      }}
    >
      <motion.h2
        className="text-3xl md:text-4xl font-black text-white mb-6 text-center"
        initial={{ opacity: shouldShowImmediately ? 1 : 0, y: shouldShowImmediately ? 0 : 20 }}
        animate={shouldShowImmediately ? { opacity: 1, y: 0 } : (contactFormInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 })}
        transition={{ duration: shouldShowImmediately ? 0 : 0.8, delay: shouldShowImmediately ? 0 : 0.2 }}
      >
        Get Started with {service.title}
      </motion.h2>
      <motion.p
        className="text-lg text-white/70 text-center mb-8 max-w-2xl mx-auto leading-tight md:leading-normal"
        initial={{ opacity: shouldShowImmediately ? 1 : 0, y: shouldShowImmediately ? 0 : 20 }}
        animate={shouldShowImmediately ? { opacity: 1, y: 0 } : (contactFormInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 })}
        transition={{ duration: shouldShowImmediately ? 0 : 0.8, delay: shouldShowImmediately ? 0 : 0.3 }}
      >
        Ready to transform your business? Fill out the form below and we&apos;ll get back to you within 2 hours.
      </motion.p>

      <form onSubmit={handleSubmit} className="w-full space-y-6">
        {[
          { label: 'Full name', name: 'name', type: 'text', placeholder: 'John Doe' },
          { label: 'Work email', name: 'email', type: 'email', placeholder: 'john@company.com' },
          { label: 'Company or product', name: 'company', type: 'text', placeholder: 'Your Company' },
        ].map((field, index) => (
          <motion.div
            key={field.name}
            className="space-y-2"
            initial={{ opacity: shouldShowImmediately ? 1 : 0, y: shouldShowImmediately ? 0 : 30 }}
            animate={shouldShowImmediately ? { opacity: 1, y: 0 } : (contactFormInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 })}
            transition={{ duration: shouldShowImmediately ? 0 : 0.6, delay: shouldShowImmediately ? 0 : 0.4 + index * 0.1 }}
          >
            <label className="text-sm font-semibold uppercase tracking-[0.3em] text-white/70 block">
              {field.label}
            </label>
            <input
              type={field.type}
              name={field.name}
              placeholder={field.placeholder}
              value={formData[field.name]}
              onChange={handleChange}
              required
              className="w-full px-5 py-4 rounded-2xl bg-white/10 border border-white/20 text-white placeholder-white/40 focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/40 focus:bg-white/15 transition-all"
            />
          </motion.div>
        ))}

        <motion.div
          className="space-y-2"
          initial={{ opacity: shouldShowImmediately ? 1 : 0, y: shouldShowImmediately ? 0 : 30 }}
          animate={shouldShowImmediately ? { opacity: 1, y: 0 } : (contactFormInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 })}
          transition={{ duration: shouldShowImmediately ? 0 : 0.6, delay: shouldShowImmediately ? 0 : 0.6 }}
        >
          <label className="text-sm font-semibold uppercase tracking-[0.3em] text-white/70 block">
            Service
          </label>
          <select
            name="service"
            value={formData.service}
            onChange={handleChange}
            required
            className="w-full px-5 py-4 rounded-2xl bg-white/10 border border-white/20 text-white placeholder-white/40 focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/40 focus:bg-white/15 transition-all appearance-none cursor-pointer"
            style={{
              backgroundImage: formData.service 
                ? 'url("data:image/svg+xml,%3Csvg xmlns=\'http://www.w3.org/2000/svg\' width=\'12\' height=\'12\' viewBox=\'0 0 12 12\'%3E%3Cpath fill=\'%23ffffff\' d=\'M6 9L1 4h10z\'/%3E%3C/svg%3E")'
                : 'url("data:image/svg+xml,%3Csvg xmlns=\'http://www.w3.org/2000/svg\' width=\'12\' height=\'12\' viewBox=\'0 0 12 12\'%3E%3Cpath fill=\'%23ffffff\' d=\'M6 9L1 4h10z\'/%3E%3C/svg%3E")',
              backgroundRepeat: 'no-repeat',
              backgroundPosition: 'right 1rem center',
              paddingRight: '2.5rem',
            }}
          >
            {servicesList.map((svc) => (
              <option key={svc.id} value={svc.title} className="bg-[#253E5C] text-white">
                {svc.title}
              </option>
            ))}
          </select>
        </motion.div>

        <motion.div
          className="space-y-2"
          initial={{ opacity: shouldShowImmediately ? 1 : 0, y: shouldShowImmediately ? 0 : 30 }}
          animate={shouldShowImmediately ? { opacity: 1, y: 0 } : (contactFormInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 })}
          transition={{ duration: shouldShowImmediately ? 0 : 0.6, delay: shouldShowImmediately ? 0 : 0.7 }}
        >
          <label className="text-sm font-semibold uppercase tracking-[0.3em] text-white/70 block">
            Monthly Ad spend
          </label>
          <input
            type="text"
            name="adSpend"
            placeholder="e.g., $5,000 - $10,000"
            value={formData.adSpend}
            onChange={handleChange}
            required
            className="w-full px-5 py-4 rounded-2xl bg-white/10 border border-white/20 text-white placeholder-white/40 focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/40 focus:bg-white/15 transition-all"
          />
        </motion.div>

        <motion.div
          className="space-y-2"
          initial={{ opacity: shouldShowImmediately ? 1 : 0, y: shouldShowImmediately ? 0 : 30 }}
          animate={shouldShowImmediately ? { opacity: 1, y: 0 } : (contactFormInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 })}
          transition={{ duration: shouldShowImmediately ? 0 : 0.6, delay: shouldShowImmediately ? 0 : 0.8 }}
        >
          <label className="text-sm font-semibold uppercase tracking-[0.3em] text-white/70 block">
            Project details
          </label>
          <textarea
            name="message"
            rows={5}
            placeholder="Tell us about your project, goals, timeline, or any specific requirements..."
            value={formData.message}
            onChange={handleChange}
            className="w-full px-5 py-4 rounded-2xl bg-white/10 border border-white/20 text-white placeholder-white/40 focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/40 focus:bg-white/15 transition-all resize-none"
          />
        </motion.div>

        <motion.button
          type="submit"
          disabled={status === 'sending'}
            className="relative w-full flex items-center justify-center gap-3 px-6 py-4 rounded-2xl text-white font-semibold text-lg bg-gradient-to-r from-[#253E5C] via-primary to-[#FF6B4A] shadow-lg shadow-primary/40 transition-all disabled:opacity-60 overflow-hidden"
            style={{
              transformStyle: shouldShowImmediately ? 'flat' : 'preserve-3d',
            }}
            initial={isMobile ? { opacity: 1, y: 0 } : { opacity: 0, y: 30, rotateX: -10 }}
            animate={shouldShowImmediately ? { opacity: 1, y: 0 } : (contactFormInView ? { opacity: 1, y: 0, rotateX: 0 } : { opacity: 0, y: 30, rotateX: -10 })}
            transition={isMobile ? { duration: 0 } : { 
              default: { duration: 0.6, delay: 0.8, ease: [0.22, 1, 0.36, 1] },
              hover: { duration: 0, ease: 'linear' }
            }}
            whileHover={shouldShowImmediately ? {} : { 
              scale: 1.03, 
              boxShadow: '0 10px 40px rgba(233, 79, 55, 0.5)',
              translateZ: 20,
            }}
            whileTap={{ scale: 0.98 }}
          >
          <motion.div
            className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent"
            animate={{ x: ['-100%', '200%'] }}
            transition={{ duration: 2, repeat: Infinity, ease: 'linear', repeatDelay: 1 }}
          />
          <span className="relative z-10">
            {status === 'sending' ? 'Sending...' : 'Send Message'}
          </span>
          {status !== 'sending' && (
            <motion.span
              className="relative z-10"
              animate={{ x: [0, 6, 0] }}
              transition={{ duration: 1.5, repeat: Infinity, ease: 'easeInOut' }}
            >
              →
            </motion.span>
          )}
        </motion.button>

        {status === 'sent' && (
          <motion.p
            className="text-center text-sm font-semibold text-primary"
            initial={{ opacity: 0, y: -6, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ type: 'spring', stiffness: 300, damping: 20 }}
          >
            Message received! We&apos;ll respond within 2 hours.
          </motion.p>
        )}
      </form>
    </motion.div>
  );
}

