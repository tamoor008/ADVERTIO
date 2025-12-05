import { useEffect, useRef, useState, useMemo, memo, useCallback } from 'react';
import { motion, AnimatePresence, useInView } from 'framer-motion';
import { Link } from 'react-router-dom';

// Brand images imports
import baileyMercer from '../assets/bailey mercer.png';
import celvora from '../assets/Celvora.png';
import customizology from '../assets/customizology.jpg';
import donior from '../assets/donior new logo  (1).png';
import glamboon from '../assets/glamboon.jpg';
import infiniteage from '../assets/infiniteage.jpeg';
import novelle from '../assets/Novelle.png';
import outdoorplay from '../assets/outdoorplay.png';
import palm from '../assets/Palm v2.png';
import techhunts from '../assets/techhunts.jpg';
import valueMakers from '../assets/Value makers .png';
import vikingbags from '../assets/vikingbags.jpeg';

// Mockup images imports
import mockup1 from '../assets/mockups1.png';
import mockup2 from '../assets/mockups2.png';
import mockup3 from '../assets/Mockup3.png';
import mockup4 from '../assets/mockup4.png';
import mockup5 from '../assets/Mockup5.png';
import mockup6 from '../assets/mockup6.png';


const PRIMARY_COLOR = '#E94F37';
const SECONDARY_COLOR = '#253E5C';
const DEEP_BLUE = '#0F172A';

// Placeholder brand logo component
const PlaceholderLogo = memo(({ title, color }) => (
  <div 
    className="w-full h-full flex items-center justify-center font-black text-white rounded-full"
    style={{ 
      background: `linear-gradient(135deg, ${color}, ${color}CC)`,
      fontSize: '1.5rem',
    }}
  >
    {title.charAt(0)}
  </div>
));
PlaceholderLogo.displayName = 'PlaceholderLogo';

// Optimized Portfolio Card Component
const PortfolioCard = memo(({ project, index, isHovered, onMouseEnter, onMouseLeave }) => {
  return (
    <div
      className="relative group"
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
      style={{ 
        transformStyle: 'preserve-3d',
        position: 'relative',
        zIndex: isHovered ? 102 : 1,
        willChange: isHovered ? 'transform' : 'auto',
      }}
    >
      <motion.div
        className="relative rounded-[32px] overflow-hidden bg-white shadow-lg h-full"
        style={{
          border: `2px solid ${project.color}`,
          boxShadow: isHovered
            ? `0 20px 60px ${project.color}30, 0 10px 30px rgba(0, 0, 0, 0.08)`
            : `0 10px 30px ${project.color}15`,
          transformStyle: 'preserve-3d',
          minHeight: '850px',
          backgroundColor: '#ffffff',
          position: 'relative',
        }}
        animate={{
          scale: isHovered ? 1.03 : 1,
          y: isHovered ? -8 : 0,
        }}
        transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
      >
        {/* Simplified Gradient Border */}
        <div
          className="absolute inset-0 rounded-[32px] p-[2px]"
          style={{
            background: `linear-gradient(135deg, ${project.color}, ${project.color}80, #253E5C60, ${project.color})`,
            opacity: isHovered ? 1 : 0.8,
            transition: 'opacity 0.3s ease',
          }}
        >
          <div
            className="w-full h-full rounded-[30px] relative"
            style={{
              background: `linear-gradient(135deg, ${project.color}${isHovered ? '20' : '15'} 0%, ${project.color}${isHovered ? '12' : '08'} 50%, transparent 100%)`,
              transition: 'background 0.3s ease',
            }}
          >
            {/* Simplified Glow Effect */}
            <div
              className="absolute inset-0 rounded-[30px] pointer-events-none"
              style={{
                background: `radial-gradient(circle at 50% 50%, ${project.color}25 0%, transparent 70%)`,
                opacity: isHovered ? 0.6 : 0,
                transition: 'opacity 0.3s ease',
              }}
            />

            {/* Content Container */}
            <div className="relative z-10 p-6 md:p-8 bg-white/95 min-h-[850px] rounded-[30px] flex flex-col">
              {/* Brand Logo */}
              <div className="flex items-center justify-between mb-6">
                <div
                  className="relative"
                  style={{
                    transform: isHovered ? 'scale(1.05)' : 'scale(1)',
                    transition: 'transform 0.3s ease',
                  }}
                >
                  <div
                    className="w-16 h-16 md:w-20 md:h-20 rounded-full overflow-hidden bg-white p-2 flex items-center justify-center"
                    style={{ 
                      borderColor: project.color,
                      borderWidth: isHovered ? '5px' : '4px',
                      transition: 'border-width 0.3s ease',
                    }}
                  >
                    {project.brandLogo ? (
                      <img
                        src={project.brandLogo}
                        alt={project.title}
                        className="w-full h-full object-contain"
                        loading="lazy"
                      />
                    ) : (
                      <PlaceholderLogo title={project.title} color={project.color} />
                    )}
                  </div>
                </div>
                
                {/* Category Badge */}
                <div
                  className="px-3 py-1 rounded-full text-xs font-semibold"
                  style={{
                    background: `${project.color}15`,
                    color: project.color,
                    border: `1px solid ${project.color}30`,
                    transform: isHovered ? 'scale(1.03)' : 'scale(1)',
                    transition: 'transform 0.3s ease',
                  }}
                >
                  {project.category}
                </div>
              </div>

              {/* Mockup Image */}
              <div className="relative aspect-[4/3] overflow-hidden rounded-2xl mb-6">
                <img
                  src={project.mockup}
                  alt={project.title}
                  className="w-full h-full object-cover"
                  loading="lazy"
                  style={{
                    transform: isHovered ? 'scale(1.05)' : 'scale(1)',
                    transition: 'transform 0.4s ease',
                  }}
                />
                {/* Gradient Overlay */}
                <div
                  className="absolute bottom-0 left-0 right-0 h-16 bg-gradient-to-t from-[#253E5C]/95 via-[#253E5C]/80 to-transparent"
                  style={{
                    opacity: isHovered ? 1 : 0.8,
                    transition: 'opacity 0.3s ease',
                  }}
                />
                {/* Accent line */}
                <div
                  className="absolute bottom-0 left-0 right-0 h-1"
                  style={{ 
                    background: project.color, 
                    transformOrigin: 'left',
                    transform: isHovered ? 'scaleX(1)' : 'scaleX(0)',
                    transition: 'transform 0.3s ease',
                  }}
                />
              </div>

              {/* Project Title */}
              <h3
                className="text-2xl md:text-3xl font-black mb-4"
                style={{
                  color: isHovered ? project.color : '#253E5C',
                  transition: 'color 0.3s ease',
                }}
              >
                {project.title}
              </h3>

              {/* Description */}
              <p
                className="leading-relaxed mb-0 flex-grow"
                style={{
                  color: isHovered ? '#253E5C' : 'rgba(37, 62, 92, 0.7)',
                  transition: 'color 0.3s ease',
                }}
              >
                {project.description}
              </p>

              {/* Results */}
              <div className="grid grid-cols-3 gap-3 mb-6 -mt-8">
                {project.results.map((result, idx) => (
                  <div
                    key={idx}
                    className="text-center p-3 rounded-xl"
                    style={{
                      background: `${project.color}10`,
                      border: `1px solid ${project.color}20`,
                      transform: isHovered ? 'translateY(-2px) scale(1.02)' : 'translateY(0) scale(1)',
                      transition: `transform 0.3s ease ${idx * 0.03}s`,
                    }}
                  >
                    <div
                      className="text-lg font-black"
                      style={{ color: project.color }}
                    >
                      {result.value}
                    </div>
                    <div className="text-xs text-[#253E5C]/70 font-semibold mt-1">
                      {result.label}
                    </div>
                  </div>
                ))}
              </div>

              {/* Services Tags */}
              <div className="flex flex-wrap gap-2">
                {project.services.map((service, idx) => (
                  <span
                    key={idx}
                    className="px-3 py-1 rounded-full text-xs font-medium"
                    style={{
                      background: `${project.color}10`,
                      color: project.color,
                      border: `1px solid ${project.color}20`,
                      transform: isHovered ? 'scale(1.03)' : 'scale(1)',
                      transition: `transform 0.3s ease ${idx * 0.02}s`,
                    }}
                  >
                    {service}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
});
PortfolioCard.displayName = 'PortfolioCard';

// Projects data - moved outside component for better performance
const PROJECTS_DATA = [
    {
      id: 1,
      title: 'TechHunts',
      category: 'Performance Marketing',
      brandLogo: techhunts,
      mockup: mockup1,
      description: 'Data-driven performance marketing campaigns that increased ROAS by 6.8x and drove +128% revenue growth.',
      services: ['Performance Marketing', 'Digital Marketing', 'Creative Design'],
      results: [
        { label: 'ROAS', value: '6.8x' },
        { label: 'Revenue Growth', value: '+128%' },
        { label: 'Conversion Rate', value: '8.2%' },
      ],
      color: '#E94F37',
    },
    {
      id: 2,
      title: 'Glamboon',
      category: 'Website Development',
      brandLogo: glamboon,
      mockup: mockup2,
      description: 'High-performance website development with conversion optimization that improved conversion rate by 8.2%.',
      services: ['Website Development', 'Conversion Optimization', 'UI/UX Design'],
      results: [
        { label: 'Conversion Rate', value: '+8.2%' },
        { label: 'Page Load Speed', value: '<2s' },
        { label: 'User Engagement', value: '+45%' },
      ],
      color: '#6D28D9',
    },
    {
      id: 3,
      title: 'Novelle',
      category: 'Social Media & Branding',
      brandLogo: novelle,
      mockup: mockup3,
      description: 'Comprehensive social media strategy and branding that generated 2.4M impressions and +45% engagement rate.',
      services: ['Social Media Handling', 'Branding', 'Content Creation'],
      results: [
        { label: 'Impressions', value: '2.4M' },
        { label: 'Engagement Rate', value: '+45%' },
        { label: 'Follower Growth', value: '+38%' },
      ],
      color: '#16A34A',
    },
    {
      id: 4,
      title: 'InfiniteAge',
      category: 'Video Editing',
      brandLogo: infiniteage,
      mockup: mockup4,
      description: 'Cinematic video editing and product reveal films that increased engagement by 45% year over year.',
      services: ['Video Editing', 'Product Reveals', 'AR Kits'],
      results: [
        { label: 'Engagement', value: '+45%' },
        { label: 'Video Views', value: '1.2M+' },
        { label: 'Watch Time', value: '+67%' },
      ],
      color: '#EA580C',
    },
    {
      id: 5,
      title: 'VikingBags',
      category: 'Ecommerce Solutions',
      brandLogo: vikingbags,
      mockup: mockup5,
      description: 'Complete ecommerce solutions with MarTech automation that reduced CAC by 24% and increased LTV by 52%.',
      services: ['Ecommerce Solutions', 'MarTech Automation', 'Personalization'],
      results: [
        { label: 'CAC Reduction', value: '-24%' },
        { label: 'LTV Increase', value: '+52%' },
        { label: 'ROI', value: '5.4x' },
      ],
      color: '#0F766E',
    },
    {
      id: 6,
      title: 'OutdoorPlay',
      category: 'Digital Marketing',
      brandLogo: outdoorplay,
      mockup: mockup6,
      description: 'Strategic brand positioning and thought leadership that increased brand lift by 18% and customer LTV by 52%.',
      services: ['Digital Marketing', 'Brand Positioning', 'Thought Leadership'],
      results: [
        { label: 'Brand Lift', value: '+18%' },
        { label: 'LTV Increase', value: '+52%' },
        { label: 'Brand Awareness', value: '+38%' },
      ],
      color: '#DC2626',
    },
    {
      id: 7,
      title: 'Celvora',
      category: 'Website Development',
      brandLogo: celvora,
      mockup: mockup1,
      description: 'Conversion-focused optimization and UX audits that improved conversion rate by 67% and enhanced user experience.',
      services: ['Website Development', 'UX Optimization', 'CRO'],
      results: [
        { label: 'Conversions', value: '+67%' },
        { label: 'Bounce Rate', value: '-32%' },
        { label: 'User Satisfaction', value: '94%' },
      ],
      color: '#8B5CF6',
    },
    {
      id: 8,
      title: 'Bailey Mercer',
      category: 'Performance Marketing',
      brandLogo: baileyMercer,
      mockup: mockup2,
      description: 'Performance media and cross-channel campaigns that delivered 5.4x average ROAS with real-time optimization.',
      services: ['Performance Marketing', 'Cross-Channel Campaigns', 'Media Buying'],
      results: [
        { label: 'Average ROAS', value: '5.4x' },
        { label: 'Revenue Growth', value: '+156%' },
        { label: 'Campaign Efficiency', value: '+42%' },
      ],
      color: '#F59E0B',
    },
    {
      id: 9,
      title: 'Customizology',
      category: 'Creative & Design',
      brandLogo: customizology,
      mockup: mockup3,
      description: 'Immersive landing pages and WebGL-powered microsites that increased brand awareness by 38% and engagement rates.',
      services: ['Creative Design', 'WebGL Development', 'Landing Pages'],
      results: [
        { label: 'Brand Awareness', value: '+38%' },
        { label: 'Engagement Rate', value: '+89%' },
        { label: 'Time on Site', value: '+54%' },
      ],
      color: '#EC4899',
    },
    {
      id: 10,
      title: 'Donior',
      category: 'Digital Marketing',
      brandLogo: donior,
      mockup: mockup4,
      description: 'Crisis narrative control and rapid-response playbooks that ensured 100% brand protection during challenging times.',
      services: ['Digital Marketing', 'Crisis Management', 'Brand Protection'],
      results: [
        { label: 'Brand Protection', value: '100%' },
        { label: 'Response Time', value: '<2hrs' },
        { label: 'Reputation Score', value: '98%' },
      ],
      color: '#10B981',
    },
    {
      id: 11,
      title: 'Palm',
      category: 'Social Media & Branding',
      brandLogo: palm,
      mockup: mockup5,
      description: 'Experiential AR kits and mixed reality campaigns that extended reach by 89% into new dimensions.',
      services: ['Social Media', 'AR Development', 'Mixed Reality'],
      results: [
        { label: 'Reach Increase', value: '+89%' },
        { label: 'AR Interactions', value: '500K+' },
        { label: 'Social Shares', value: '+156%' },
      ],
      color: '#3B82F6',
    },
    {
      id: 12,
      title: 'Value Makers',
      category: 'Ecommerce Solutions',
      brandLogo: valueMakers,
      mockup: mockup6,
      description: 'Integrated marketing solutions and data-driven approach that delivered +156% ROI and measurable growth.',
      services: ['Ecommerce Solutions', 'Integrated Marketing', 'Data Analytics'],
      results: [
        { label: 'ROI', value: '+156%' },
        { label: 'Revenue Growth', value: '+94%' },
        { label: 'Customer Retention', value: '+67%' },
      ],
      color: '#EF4444',
    },
    // Placeholder Projects
    {
      id: 13,
      title: 'Luxury Fashion Co',
      category: 'Creative & Design',
      brandLogo: null, // Placeholder
      mockup: mockup1,
      description: 'Premium brand identity design and visual storytelling that elevated brand perception and increased customer engagement by 72%.',
      services: ['Creative Design', 'Brand Identity', 'Visual Storytelling'],
      results: [
        { label: 'Brand Awareness', value: '+65%' },
        { label: 'Engagement', value: '+72%' },
        { label: 'Brand Recall', value: '+58%' },
      ],
      color: '#9333EA',
    },
    {
      id: 14,
      title: 'TechStart Pro',
      category: 'Website Development',
      brandLogo: null, // Placeholder
      mockup: mockup2,
      description: 'Modern, responsive website with cutting-edge UI/UX that reduced bounce rate by 45% and increased time on site by 89%.',
      services: ['Website Development', 'UI/UX Design', 'Responsive Design'],
      results: [
        { label: 'Bounce Rate', value: '-45%' },
        { label: 'Time on Site', value: '+89%' },
        { label: 'Page Views', value: '+112%' },
      ],
      color: '#0891B2',
    },
    {
      id: 15,
      title: 'Fitness Hub',
      category: 'Social Media & Branding',
      brandLogo: null, // Placeholder
      mockup: mockup3,
      description: 'Comprehensive social media strategy with engaging content that grew followers by 250% and increased community engagement by 180%.',
      services: ['Social Media Handling', 'Content Creation', 'Community Management'],
      results: [
        { label: 'Follower Growth', value: '+250%' },
        { label: 'Engagement', value: '+180%' },
        { label: 'Reach', value: '+195%' },
      ],
      color: '#DC2626',
    },
    {
      id: 16,
      title: 'Green Energy Solutions',
      category: 'Digital Marketing',
      brandLogo: null, // Placeholder
      mockup: mockup4,
      description: 'Strategic digital marketing campaign focused on sustainability messaging that increased lead generation by 145% and improved brand sentiment.',
      services: ['Digital Marketing', 'Content Strategy', 'Lead Generation'],
      results: [
        { label: 'Lead Generation', value: '+145%' },
        { label: 'Brand Sentiment', value: '+92%' },
        { label: 'Website Traffic', value: '+178%' },
      ],
      color: '#059669',
    },
    {
      id: 17,
      title: 'Gourmet Delights',
      category: 'Ecommerce Solutions',
      brandLogo: null, // Placeholder
      mockup: mockup5,
      description: 'Complete Shopify store setup with conversion optimization that increased online sales by 220% and improved customer retention.',
      services: ['Shopify Development', 'Ecommerce Solutions', 'CRO'],
      results: [
        { label: 'Online Sales', value: '+220%' },
        { label: 'Conversion Rate', value: '+68%' },
        { label: 'Customer Retention', value: '+54%' },
      ],
      color: '#EA580C',
    },
    {
      id: 18,
      title: 'MedTech Innovations',
      category: 'Performance Marketing',
      brandLogo: null, // Placeholder
      mockup: mockup6,
      description: 'Targeted performance marketing campaigns across multiple channels that achieved 8.5x ROAS and reduced cost per acquisition by 38%.',
      services: ['Performance Marketing', 'PPC Campaigns', 'Conversion Optimization'],
      results: [
        { label: 'ROAS', value: '8.5x' },
        { label: 'CPA Reduction', value: '-38%' },
        { label: 'Click-Through Rate', value: '+95%' },
      ],
      color: '#0284C7',
    },
    {
      id: 19,
      title: 'Artisan Crafts',
      category: 'Creative & Design',
      brandLogo: null, // Placeholder
      mockup: mockup1,
      description: 'Beautiful packaging design and brand visual identity that enhanced product appeal and increased purchase intent by 85%.',
      services: ['Creative Design', 'Packaging Design', 'Brand Identity'],
      results: [
        { label: 'Purchase Intent', value: '+85%' },
        { label: 'Brand Recognition', value: '+73%' },
        { label: 'Customer Satisfaction', value: '+91%' },
      ],
      color: '#C026D3',
    },
    {
      id: 20,
      title: 'EduLearn Platform',
      category: 'Website Development',
      brandLogo: null, // Placeholder
      mockup: mockup2,
      description: 'Interactive learning platform with seamless user experience that increased course enrollments by 165% and improved user satisfaction scores.',
      services: ['Website Development', 'User Experience', 'Interactive Design'],
      results: [
        { label: 'Enrollments', value: '+165%' },
        { label: 'User Satisfaction', value: '96%' },
        { label: 'Completion Rate', value: '+78%' },
      ],
      color: '#7C3AED',
    },
    {
      id: 21,
      title: 'Wellness Retreat',
      category: 'Video Editing',
      brandLogo: null, // Placeholder
      mockup: mockup3,
      description: 'Cinematic promotional videos and documentary-style content that increased video engagement by 210% and boosted bookings by 145%.',
      services: ['Video Editing', 'Content Production', 'Storytelling'],
      results: [
        { label: 'Video Engagement', value: '+210%' },
        { label: 'Bookings', value: '+145%' },
        { label: 'Video Shares', value: '+189%' },
      ],
      color: '#F59E0B',
    },
    {
      id: 22,
      title: 'Smart Home Tech',
      category: 'Digital Marketing',
      brandLogo: null, // Placeholder
      mockup: mockup4,
      description: 'Integrated digital marketing strategy with thought leadership content that positioned the brand as an industry leader and increased qualified leads.',
      services: ['Digital Marketing', 'Thought Leadership', 'Content Marketing'],
      results: [
        { label: 'Qualified Leads', value: '+132%' },
        { label: 'Brand Authority', value: '+88%' },
        { label: 'Content Engagement', value: '+156%' },
      ],
      color: '#10B981',
    },
    {
      id: 23,
      title: 'Pet Care Plus',
      category: 'Social Media & Branding',
      brandLogo: null, // Placeholder
      mockup: mockup5,
      description: 'Heartwarming social media campaigns and community building that created a loyal following and increased brand advocacy by 195%.',
      services: ['Social Media Handling', 'Community Building', 'Brand Advocacy'],
      results: [
        { label: 'Brand Advocacy', value: '+195%' },
        { label: 'Community Growth', value: '+280%' },
        { label: 'User-Generated Content', value: '+245%' },
      ],
      color: '#EC4899',
    },
    {
      id: 24,
      title: 'Finance Pro',
      category: 'Performance Marketing',
      brandLogo: null, // Placeholder
      mockup: mockup6,
      description: 'Data-driven performance marketing with advanced attribution modeling that achieved 12.5x ROAS and optimized campaign efficiency.',
      services: ['Performance Marketing', 'Attribution Modeling', 'Campaign Optimization'],
      results: [
        { label: 'ROAS', value: '12.5x' },
        { label: 'Campaign Efficiency', value: '+67%' },
        { label: 'Customer Lifetime Value', value: '+89%' },
      ],
      color: '#EF4444',
    },
];

const Portfolio = () => {
  const heroRef = useRef(null);
  const projectsRef = useRef(null);
  const [hoveredIndex, setHoveredIndex] = useState(null);
  const [selectedCategory, setSelectedCategory] = useState('All');

  const heroInView = useInView(heroRef, { once: true, amount: 0.1 });
  const projectsInView = useInView(projectsRef, { once: true, amount: 0.1 });

  // Memoize categories to avoid recalculation
  const categories = useMemo(() => {
    return ['All', ...Array.from(new Set(PROJECTS_DATA.map(p => p.category)))];
  }, []);

  // Memoize filtered projects based on selected category
  const filteredProjects = useMemo(() => {
    if (selectedCategory === 'All') {
      return PROJECTS_DATA;
    }
    return PROJECTS_DATA.filter(p => p.category === selectedCategory);
  }, [selectedCategory]);

  // Optimized hover handlers with useCallback
  const handleMouseEnter = useCallback((index) => {
    setHoveredIndex(index);
  }, []);

  const handleMouseLeave = useCallback(() => {
    setHoveredIndex(null);
  }, []);

  // Scroll to top on mount
  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: 'instant' });
  }, []);

  return (
    <div className="relative min-h-screen overflow-visible bg-white" style={{ backgroundColor: '#FFFFFF', background: '#FFFFFF' }}>
      
      {/* Hero Section */}
      <section ref={heroRef} className="relative min-h-screen flex items-center justify-center overflow-visible pt-24 pb-20 z-10">
        <div className="container mx-auto px-6 relative z-30">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={heroInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
            transition={{ duration: 0.8 }}
            className="text-center max-w-4xl mx-auto"
          >
        <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={heroInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="mb-6"
            >
              <span className="px-4 py-2 rounded-full border border-primary/40 text-primary text-sm font-semibold tracking-wide uppercase bg-white/80 backdrop-blur">
                Our Portfolio
              </span>
        </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={heroInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
              transition={{ duration: 0.8, delay: 0.3 }}
              className="text-6xl md:text-8xl font-black mb-8 bg-gradient-to-r from-primary via-[#ff6b4a] to-[#253E5C] bg-clip-text text-transparent"
            >
              Showcasing Excellence
            </motion.h1>
            
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={heroInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="text-xl md:text-2xl text-[#253E5C]/80 leading-relaxed"
            >
              Explore our portfolio of innovative digital solutions and creative campaigns that drive measurable results for high-growth brands.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={heroInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
              transition={{ duration: 0.8, delay: 0.5 }}
              className="flex justify-center mt-12"
            >
              <motion.div
                animate={{ y: [0, 10, 0] }}
                transition={{ duration: 2, repeat: Infinity }}
                className="cursor-pointer"
              >
                <svg className="w-8 h-8 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
                </svg>
              </motion.div>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Category Filter */}
      <section className="relative py-12 px-6 z-30">
        <div className="container mx-auto max-w-7xl">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="flex flex-wrap justify-center gap-4"
          >
            {categories.map((category) => (
              <motion.button
                key={category}
                onClick={() => setSelectedCategory(category)}
                className={`px-6 py-3 rounded-full font-semibold text-sm transition-all ${
                  selectedCategory === category
                    ? 'bg-gradient-to-r from-primary to-[#ff6b4a] text-white shadow-lg shadow-primary/40'
                    : 'bg-white/90 backdrop-blur-md text-[#253E5C] border border-white/20 hover:border-primary/50'
                }`}
                whileHover={{ scale: 1.05, y: -2 }}
                whileTap={{ scale: 0.95 }}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4 }}
              >
                {category}
              </motion.button>
            ))}
          </motion.div>
                  </div>
      </section>

      {/* Projects Grid */}
      <section ref={projectsRef} className="relative py-8 md:py-20 px-6 z-30 min-h-screen" style={{ zIndex: 100, background: 'transparent' }}>
        <div className="container mx-auto max-w-7xl">
          <div
            key={selectedCategory}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
            style={{ position: 'relative', zIndex: 101 }}
          >
            {filteredProjects.map((project, index) => (
              <PortfolioCard
                key={project.id}
                project={project}
                index={index}
                isHovered={hoveredIndex === index}
                onMouseEnter={() => handleMouseEnter(index)}
                onMouseLeave={handleMouseLeave}
              />
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="relative py-8 md:py-20 px-6 z-30">
        <div className="container mx-auto max-w-4xl">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="text-center bg-white/90 backdrop-blur-md p-8 md:p-12 rounded-3xl shadow-xl"
            style={{
              border: '2px solid transparent',
              backgroundImage: 'linear-gradient(rgba(255,255,255,0.9), rgba(255,255,255,0.9)), linear-gradient(135deg, #253E5C, #E94F37)',
              backgroundOrigin: 'border-box',
              backgroundClip: 'padding-box, border-box',
            }}
          >
            <h2 className="text-3xl md:text-4xl font-bold text-[#253E5C] mb-6">
              Ready to Start Your Project?
            </h2>
            <p className="text-xl text-[#253E5C]/80 mb-8">
              Let's create something amazing together. Get in touch with our team today.
            </p>
            <div className="flex flex-col md:flex-row items-center justify-center gap-6">
              <Link to="/contact">
                <motion.button
                  className="px-8 py-4 rounded-2xl text-white font-semibold text-lg bg-gradient-to-r from-primary to-[#ff6b4a] shadow-lg shadow-primary/40"
                  whileHover={{ scale: 1.05, boxShadow: '0 10px 40px rgba(233, 79, 55, 0.5)' }}
                  whileTap={{ scale: 0.95 }}
                >
                  Get Started
                </motion.button>
              </Link>
              <Link to="/services">
                <motion.button
                  className="px-8 py-4 rounded-2xl text-[#253E5C] font-semibold text-lg bg-white/80 backdrop-blur-md border-2 border-[#253E5C]/20 hover:border-primary/50"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  View Services
                </motion.button>
              </Link>
            </div>
            </motion.div>
        </div>
      </section>
    </div>
  );
};

export default Portfolio;
