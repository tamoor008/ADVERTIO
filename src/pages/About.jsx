import { useEffect, useRef, useState } from 'react';
import { motion, useInView, AnimatePresence } from 'framer-motion';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import talhaImage from '../assets/talha.jpg';

gsap.registerPlugin(ScrollTrigger);

const About = () => {
  const heroRef = useRef(null);
  const testimonialsRef = useRef(null);
  const whoWeAreRef = useRef(null);
  const leadershipRef = useRef(null);
  const valuesRef = useRef(null);
  
  const [currentTestimonialIndex, setCurrentTestimonialIndex] = useState(0);
  const [isHovered, setIsHovered] = useState(false);
  const contactSectionRef = useRef(null);
  const contactCardRef = useRef(null);
  const [mouseTilt, setMouseTilt] = useState({ x: 0, y: 0 });
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    company: '',
    message: '',
  });
  const [formStatus, setFormStatus] = useState('idle');
  const [hoveredValueIndex, setHoveredValueIndex] = useState(null);
  const [focusedCardIndex, setFocusedCardIndex] = useState(null);
  const [isMobile, setIsMobile] = useState(false);
  const valuesContainerRef = useRef(null);

  const heroInView = useInView(heroRef, { once: true, amount: 0.1 });
  const whoWeAreInView = useInView(whoWeAreRef, { once: true, amount: 0.1 });
  const leadershipInView = useInView(leadershipRef, { once: true, amount: 0.1 });
  const valuesInView = useInView(valuesRef, { once: true, amount: 0.1 });
  const contactInView = useInView(contactSectionRef, { once: false, amount: 0.3 });

  const testimonials = [
    {
      id: 1,
      text: "Suffered alteration in some form, by injected humour, or randomised words which don't look even slightly believable. If you are going to use a passage of you need to be sure there anything embarrassing",
      author: "About One Star"
    },
    {
      id: 2,
      text: "Suffered alteration in some form, by injected humour, or randomised words which don't look even slightly believable. If you are going to use a passage of you need to be sure there anything embarrassing",
      author: "About One Star"
    },
    {
      id: 3,
      text: "Suffered alteration in some form, by injected humour, or randomised words which don't look even slightly believable. If you are going to use a passage of you need to be sure there anything embarrassing",
      author: "About One Star"
    },
    {
      id: 4,
      text: "Suffered alteration in some form, by injected humour, or randomised words which don't look even slightly believable. If you are going to use a passage of you need to be sure there anything embarrassing",
      author: "About One Star"
    },
    {
      id: 5,
      text: "Suffered alteration in some form, by injected humour, or randomised words which don't look even slightly believable. If you are going to use a passage of you need to be sure there anything embarrassing",
      author: "About One Star"
    },
  ];

  const nextTestimonial = () => {
    setCurrentTestimonialIndex((prev) => (prev + 1) % testimonials.length);
  };

  const prevTestimonial = () => {
    setCurrentTestimonialIndex((prev) => (prev - 1 + testimonials.length) % testimonials.length);
  };

  const handleDragEnd = (event, info) => {
    const swipeThreshold = 50;
    if (info.offset.x > swipeThreshold) {
      prevTestimonial();
    } else if (info.offset.x < -swipeThreshold) {
      nextTestimonial();
    }
  };

  const handleMouseMove = (event) => {
    if (!contactCardRef.current) return;
    const rect = contactCardRef.current.getBoundingClientRect();
    const x = ((event.clientX - rect.left) / rect.width - 0.5) * 2;
    const y = ((event.clientY - rect.top) / rect.height - 0.5) * 2;
    setMouseTilt({
      x: Math.max(-1, Math.min(1, x)),
      y: Math.max(-1, Math.min(1, y)),
    });
  };

  const resetTilt = () => setMouseTilt({ x: 0, y: 0 });

  const handleFormChange = (event) => {
    const { name, value } = event.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleFormSubmit = (event) => {
    event.preventDefault();
    if (formStatus === 'sending') return;
    setFormStatus('sending');

    setTimeout(() => {
      setFormStatus('sent');
      setFormData({ name: '', email: '', company: '', message: '' });

      setTimeout(() => setFormStatus('idle'), 3000);
    }, 1500);
  };

  // Scroll to top on mount
  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: 'instant' });
  }, []);

  // Auto-advance carousel (pauses on hover)
  useEffect(() => {
    if (isHovered) {
      // Pause when hovered - clear any existing interval
      return;
    }
    
    // Start auto-advancing when not hovered
    const interval = setInterval(() => {
      setCurrentTestimonialIndex((prev) => (prev + 1) % testimonials.length);
    }, 4000); // Change testimonial every 4 seconds

    // Cleanup: clear interval when component unmounts or when hovered
    return () => clearInterval(interval);
  }, [testimonials.length, isHovered]);

  useEffect(() => {
    // Animate value cards
    if (valuesRef.current) {
      const cards = valuesRef.current.querySelectorAll('.value-card');
      gsap.set(cards, { opacity: 0, y: 50 });
      
      cards.forEach((card, index) => {
        gsap.to(card, {
          opacity: 1,
          y: 0,
          duration: 0.8,
          ease: 'power2.out',
        scrollTrigger: {
            trigger: card,
            start: 'top 85%',
            toggleActions: 'play none none none',
        },
          delay: index * 0.15,
        });
      });
    }

  }, []);

  // Detect mobile viewport
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    
    checkMobile();
    window.addEventListener('resize', checkMobile);
    
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  // Handle clicks outside cards to unfocus (mobile only)
  useEffect(() => {
    const handleClickOutside = (event) => {
      // Only handle on mobile (screen width < 768px)
      if (!isMobile) return;
      
      if (valuesContainerRef.current && !valuesContainerRef.current.contains(event.target)) {
        setFocusedCardIndex(null);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    document.addEventListener('touchstart', handleClickOutside);
    
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      document.removeEventListener('touchstart', handleClickOutside);
    };
  }, [isMobile]);

  const values = [
    {
      number: '01',
      title: 'Empathy',
      description: 'Driving force that connects us to our clients, allowing us to understand their business needs deeply.',
    },
    {
      number: '02',
      title: 'Trust',
      description: 'The currency of our client partnership, earned through reliability, transparency and steadfast commitment.',
    },
    {
      number: '03',
      title: 'Synergy',
      description: 'The collaborative synergy of our team fuels innovative solutions and propels client success.',
    },
    {
      number: '04',
      title: 'Innovation',
      description: 'Innovative thinking is our forte as we navigate the path to client success through continuous forward-thinking digital solutions.',
    },
  ];


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
                  About Advertio
                </span>
              </motion.div>
              
              <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={heroInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                transition={{ duration: 0.8, delay: 0.3 }}
              className="text-6xl md:text-8xl font-black mb-8 bg-gradient-to-r from-primary via-[#ff6b4a] to-[#253E5C] bg-clip-text text-transparent"
              >
              Unleash your potential with Advertio
              </motion.h1>
              
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={heroInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                transition={{ duration: 0.8, delay: 0.4 }}
              className="flex justify-center"
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

      {/* Who We Are Section with Testimonials Carousel and Vision/Mission */}
      <section ref={whoWeAreRef} className="relative py-20 px-6 z-30">
        <div className="container mx-auto max-w-7xl">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="mb-12"
          >
            <h2 className="text-5xl md:text-6xl font-black mb-6">
              <span className="text-[#253E5C]">Who We</span>{' '}
              <span className="bg-gradient-to-r from-primary to-[#ff6b4a] bg-clip-text text-transparent">Are?</span>
            </h2>
            <p className="text-xl md:text-2xl text-[#253E5C] leading-relaxed max-w-4xl">
              Advertio is a forward-thinking digital solutions agency dedicated to helping businesses excel in a rapidly evolving digital world. We provide end-to-end, 360° digital marketing and technology services designed to accelerate growth, strengthen brand presence, and deliver measurable results.
            </p>
            <p className="text-xl md:text-2xl text-[#253E5C] leading-relaxed max-w-4xl mt-4">
              Our purpose is simple: combine strategy, creativity, and innovation to empower businesses with cost-effective solutions that drive long-term success.
            </p>
            <p className="text-xl md:text-2xl text-[#253E5C] leading-relaxed max-w-4xl mt-4">
              At Advertio, we don't just run campaigns—we build digital ecosystems that transform businesses into powerful, future-ready brands.
            </p>
          </motion.div>

          <div className="grid lg:grid-cols-2 gap-12 items-start mt-12">
            {/* Left Side - Testimonials Carousel */}
            <div className="relative">
              <div 
                ref={testimonialsRef}
                className="relative overflow-hidden min-h-[300px]"
                onMouseEnter={() => setIsHovered(true)}
                onMouseLeave={() => setIsHovered(false)}
              >
                <AnimatePresence mode="wait" initial={false}>
                  <motion.div
                    key={currentTestimonialIndex}
                    initial={{ opacity: 0, x: 300 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -300 }}
                    transition={{ duration: 0.5, ease: 'easeInOut' }}
                    drag="x"
                    dragConstraints={{ left: -100, right: 100 }}
                    dragElastic={0.2}
                    onDragEnd={handleDragEnd}
                    className="testimonial-card w-full bg-white/90 backdrop-blur-md p-6 rounded-2xl shadow-lg cursor-grab active:cursor-grabbing"
                    style={{
                      border: '2px solid transparent',
                      backgroundImage: 'linear-gradient(rgba(255,255,255,0.9), rgba(255,255,255,0.9)), linear-gradient(135deg, #253E5C, #E94F37)',
                      backgroundOrigin: 'border-box',
                      backgroundClip: 'padding-box, border-box',
                    }}
                  >
                    <div className="flex items-center gap-1 mb-4">
                      {[...Array(5)].map((_, i) => (
                        <svg key={i} className="w-5 h-5 text-yellow-400" fill="currentColor" viewBox="0 0 20 20">
                          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                        </svg>
                      ))}
                    </div>
                    <p className="text-[#253E5C]/80 leading-relaxed">
                      "{testimonials[currentTestimonialIndex].text}".
                    </p>
                    <p className="mt-4 font-semibold text-[#253E5C]">{testimonials[currentTestimonialIndex].author}</p>
                  </motion.div>
                </AnimatePresence>
              </div>
            </div>

            {/* Right Side - Vision and Mission */}
            <div className="space-y-8">
              {/* Vision Section */}
              <motion.div
                initial={{ opacity: 0, x: 50 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8 }}
                className="flex items-start gap-6"
              >
                <div className="flex-shrink-0 w-16 h-16 rounded-xl bg-gradient-to-br from-[#253E5C] to-primary flex items-center justify-center">
                  <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                  </svg>
                </div>
                <div className="flex-1">
                  <h3 className="text-3xl font-bold text-[#253E5C] mb-4 uppercase">Vision</h3>
                  <p className="text-lg text-[#253E5C]/80 leading-relaxed">
                    To reshape the global digital landscape by delivering a complete spectrum of innovative, efficient, and accessible digital solutions that empower businesses of all sizes to grow, compete, and lead with confidence.
                  </p>
                </div>
        </motion.div>

              {/* Mission Section */}
            <motion.div
                initial={{ opacity: 0, x: 50 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, delay: 0.2 }}
                className="flex items-start gap-6"
              >
                <div className="flex-shrink-0 w-16 h-16 rounded-xl bg-gradient-to-br from-[#253E5C] to-primary flex items-center justify-center">
                  <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0zM10 7v3m0 0v3m0-3h3m-3 0H7" />
                  </svg>
                </div>
                <div className="flex-1">
                  <h3 className="text-3xl font-bold text-[#253E5C] mb-4 uppercase">Mission</h3>
                  <p className="text-lg text-[#253E5C]/80 leading-relaxed">
                    Our mission is to provide businesses with comprehensive 360° digital marketing and technology solutions that drive sustainable growth.
                  </p>
                  <p className="text-lg text-[#253E5C]/80 leading-relaxed mt-4">
                    We are committed to expanding our global footprint, enhancing our technological expertise, and delivering excellence through innovation, automation, and strategic execution—helping brands reach their highest potential.
                  </p>
                </div>
            </motion.div>
            </div>
          </div>
        </div>
      </section>

      {/* Leadership Section */}
      <section ref={leadershipRef} className="relative py-20 px-6 z-30 bg-gradient-to-b from-white to-[#f8f9fa]">
        <div className="container mx-auto max-w-7xl">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            {/* Left Side - Text Content */}
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="space-y-6"
            >
              <h2 className="text-5xl md:text-6xl font-black mb-4">
                <span className="text-[#253E5C]">Leadership with more</span>{' '}
                <span className="bg-gradient-to-r from-primary to-[#ff6b4a] bg-clip-text text-transparent">focus</span>
              </h2>
              
              <h3 className="text-xl md:text-2xl font-semibold text-[#253E5C] mb-6">
                Chief Executive Officer, Salman Rasheed
              </h3>
              
              <div className="space-y-6">
                <div className="flex items-start gap-4">
                  <div className="flex-shrink-0 w-6 h-6 rounded-full bg-primary flex items-center justify-center mt-1">
                    <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                  <p className="text-lg text-[#253E5C]/80 leading-relaxed">
                    We are enhancing client business value through a holistic approach.
                  </p>
                </div>
                
                <div className="flex items-start gap-4">
                  <div className="flex-shrink-0 w-6 h-6 rounded-full bg-primary flex items-center justify-center mt-1">
                    <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
              <p className="text-lg text-[#253E5C]/80 leading-relaxed">
                    We share the same passion, commitment and emotions as you do to drive excellence in every aspect of your business
              </p>
                </div>
              </div>
            </motion.div>

            {/* Right Side - Portrait Image */}
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="relative"
            >
              <div className="relative w-full aspect-[3/4] max-w-md mx-auto">
                <img
                  src={talhaImage}
                  alt="Leadership"
                  className="w-full h-full object-cover rounded-2xl shadow-2xl"
                  loading="lazy"
                />
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Contact CTA Section */}
      <section className="relative py-20 px-6 z-30">
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
              Interest in starting a work with us?
            </h2>
            <p className="text-xl text-[#253E5C]/80 mb-8">
              Give us a call to speak with a Consultant
            </p>
            <p className="text-2xl font-bold text-primary mb-4">Contact us today!</p>
            
            <div className="flex flex-col md:flex-row items-center justify-center gap-6 mt-8">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center">
                  <svg className="w-6 h-6 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                  </svg>
                </div>
                <span className="text-lg font-semibold text-[#253E5C]">(+92) 323 4304559</span>
              </div>
              
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center">
                  <svg className="w-6 h-6 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                  </svg>
                </div>
                <span className="text-lg font-semibold text-[#253E5C]">info@advertio.com</span>
              </div>
            </div>
            </motion.div>
        </div>
      </section>

      {/* Our Values Section */}
      <section ref={valuesRef} className="relative pt-32 pb-0 px-6 z-30 overflow-visible">
        <div className="container mx-auto max-w-7xl">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="text-center mb-20"
          >
            <h2 className="text-5xl md:text-6xl font-black mb-6 bg-gradient-to-r from-primary to-[#253E5C] bg-clip-text text-transparent">
              Our Values
            </h2>
            <p className="text-lg text-[#253E5C]/70 max-w-2xl mx-auto">
              The core principles that guide everything we do
            </p>
          </motion.div>

          {/* Unique Layout: Diamond/Zigzag Pattern */}
          <div className="relative" style={{ minHeight: '800px' }}>
            {/* Background decorative elements */}
            <div className="absolute inset-0 overflow-hidden pointer-events-none">
              {[...Array(8)].map((_, i) => (
                <motion.div
                  key={i}
                  className="absolute rounded-full opacity-10"
                  style={{
                    width: `${200 + i * 50}px`,
                    height: `${200 + i * 50}px`,
                    left: `${(i % 4) * 25}%`,
                    top: `${Math.floor(i / 4) * 50}%`,
                    background: `radial-gradient(circle, rgba(233, 79, 55, 0.3) 0%, transparent 70%)`,
                  }}
                  animate={{
                    scale: [1, 1.3, 1],
                    opacity: [0.1, 0.2, 0.1],
                  }}
                  transition={{
                    duration: 8 + i,
                    repeat: Infinity,
                    ease: 'easeInOut',
                    delay: i * 0.5,
                  }}
                />
              ))}
            </div>

            {/* Values Grid with Unique Layout */}
            <div ref={valuesContainerRef} className="relative grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 md:gap-8 lg:gap-6 items-stretch">
              {values.map((value, index) => {
                const isEven = index % 2 === 0;
                const isFocused = focusedCardIndex === index;
                // On mobile, use focused state; on desktop, use hover state
                const isHovered = isMobile ? isFocused : (hoveredValueIndex === index);
                
                return (
              <motion.div
                key={index}
                    className="relative group"
                style={{ 
                  transformStyle: 'preserve-3d',
                  zIndex: isFocused && isMobile ? 50 : 1,
                }}
                    initial={{ opacity: 0, y: 100, rotateX: -20 }}
                    whileInView={{ opacity: 1, y: 0, rotateX: 0 }}
                    viewport={{ once: true, amount: 0.3 }}
                    transition={{
                      duration: 0.8,
                      delay: index * 0.15,
                      ease: [0.22, 1, 0.36, 1],
                    }}
                    onMouseEnter={() => setHoveredValueIndex(index)}
                    onMouseLeave={() => setHoveredValueIndex(null)}
                    onClick={() => {
                      if (isMobile) {
                        setFocusedCardIndex(isFocused ? null : index);
                      }
                    }}
                  >
                    {/* 3D Card Container */}
                    <motion.div
                      className="relative h-full"
                      style={{ transformStyle: 'preserve-3d' }}
                      animate={{
                        rotateY: isMobile && isFocused ? 0 : (isHovered ? (isEven ? 5 : -5) : 0),
                        rotateX: isMobile && isFocused ? 0 : (isHovered ? -3 : 0),
                        scale: isMobile && isFocused ? 1.08 : (isHovered ? 1.05 : 1),
                        y: isMobile && isFocused ? -20 : 0,
                        z: isMobile && isFocused ? 100 : (isHovered ? 50 : 0),
                      }}
                      transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
                    >
                      {/* Gradient Border with Animation */}
                      <motion.div
                        className="absolute inset-0 rounded-[32px] p-[3px]"
                        style={{
                          background: `linear-gradient(135deg, ${
                            index === 0 ? '#E94F37' : 
                            index === 1 ? '#253E5C' : 
                            index === 2 ? '#E94F37' : 
                            '#253E5C'
                          }, ${
                            index === 0 ? '#253E5C' : 
                            index === 1 ? '#E94F37' : 
                            index === 2 ? '#253E5C' : 
                            '#E94F37'
                          })`,
                        }}
                        animate={{
                          background: isHovered
                            ? `linear-gradient(135deg, ${
                                index === 0 ? '#E94F37' : 
                                index === 1 ? '#253E5C' : 
                                index === 2 ? '#E94F37' : 
                                '#253E5C'
                              }CC, ${
                                index === 0 ? '#253E5C' : 
                                index === 1 ? '#E94F37' : 
                                index === 2 ? '#253E5C' : 
                                '#E94F37'
                              }CC)`
                            : `linear-gradient(135deg, ${
                                index === 0 ? '#E94F37' : 
                                index === 1 ? '#253E5C' : 
                                index === 2 ? '#E94F37' : 
                                '#253E5C'
                              }, ${
                                index === 0 ? '#253E5C' : 
                                index === 1 ? '#E94F37' : 
                                index === 2 ? '#253E5C' : 
                                '#E94F37'
                              })`,
                        }}
                        transition={{ duration: 0.4 }}
                      >
                        <motion.div
                          className="w-full h-full rounded-[30px] relative overflow-hidden bg-white/95 backdrop-blur-md"
                          style={{
                            minHeight: '380px',
                          }}
                        >
                          {/* Animated Background Gradient */}
                          <motion.div
                            className="absolute inset-0 opacity-0"
                            style={{
                              background: `linear-gradient(135deg, ${
                                index === 0 ? 'rgba(233, 79, 55, 0.1)' : 
                                index === 1 ? 'rgba(37, 62, 92, 0.1)' : 
                                index === 2 ? 'rgba(233, 79, 55, 0.1)' : 
                                'rgba(37, 62, 92, 0.1)'
                              } 0%, transparent 100%)`,
                            }}
                            animate={{
                              opacity: isHovered ? 1 : 0,
                            }}
                            transition={{ duration: 0.4 }}
                          />

                          {/* Glow Effect */}
                          <motion.div
                            className="absolute inset-0 rounded-[30px]"
                            style={{
                              background: `radial-gradient(circle at 50% 50%, ${
                                index === 0 ? 'rgba(233, 79, 55, 0.2)' : 
                                index === 1 ? 'rgba(37, 62, 92, 0.2)' : 
                                index === 2 ? 'rgba(233, 79, 55, 0.2)' : 
                                'rgba(37, 62, 92, 0.2)'
                              } 0%, transparent 70%)`,
                            }}
                            animate={{
                              opacity: isHovered ? [0.3, 0.6, 0.3] : 0,
                              scale: isHovered ? [1, 1.2, 1] : 1,
                            }}
                            transition={{
                              duration: 2,
                              repeat: isHovered ? Infinity : 0,
                              ease: 'easeInOut',
                            }}
                          />

                          {/* Content */}
                          <div className="relative z-10 p-8 h-full flex flex-col">
                            {/* Number Badge with Icon */}
                            <motion.div
                              className="flex items-center justify-between mb-6"
                              animate={{
                                y: isHovered ? -5 : 0,
                              }}
                              transition={{ duration: 0.3 }}
                            >
                              <motion.div
                                className="text-6xl font-black"
                                style={{
                                  color: index === 0 ? '#E94F37' : 
                                         index === 1 ? '#253E5C' : 
                                         index === 2 ? '#E94F37' : 
                                         '#253E5C',
                                }}
                                animate={{
                                  scale: isHovered ? [1, 1.1, 1] : 1,
                                  rotate: isHovered ? [0, 5, -5, 0] : 0,
                                }}
                                transition={{
                                  duration: 0.6,
                                  repeat: isHovered ? Infinity : 0,
                                  repeatDelay: 1,
                                }}
                              >
                                {value.number}
              </motion.div>
                              
                              {/* Animated Icon */}
                              <motion.div
                                className="w-16 h-16 rounded-2xl flex items-center justify-center"
                                style={{
                                  background: `linear-gradient(135deg, ${
                                    index === 0 ? 'rgba(233, 79, 55, 0.15)' : 
                                    index === 1 ? 'rgba(37, 62, 92, 0.15)' : 
                                    index === 2 ? 'rgba(233, 79, 55, 0.15)' : 
                                    'rgba(37, 62, 92, 0.15)'
                                  }, ${
                                    index === 0 ? 'rgba(233, 79, 55, 0.05)' : 
                                    index === 1 ? 'rgba(37, 62, 92, 0.05)' : 
                                    index === 2 ? 'rgba(233, 79, 55, 0.05)' : 
                                    'rgba(37, 62, 92, 0.05)'
                                  })`,
                                }}
                                animate={{
                                  rotate: isHovered ? 360 : 0,
                                  scale: isHovered ? 1.1 : 1,
                                }}
                                transition={{ duration: 0.6, ease: 'easeInOut' }}
                              >
                                <svg
                                  className="w-8 h-8"
                                  style={{
                                    color: index === 0 ? '#E94F37' : 
                                           index === 1 ? '#253E5C' : 
                                           index === 2 ? '#E94F37' : 
                                           '#253E5C',
                                  }}
                                  fill="none"
                                  stroke="currentColor"
                                  viewBox="0 0 24 24"
                                >
                                  {index === 0 && (
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                                  )}
                                  {index === 1 && (
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                                  )}
                                  {index === 2 && (
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                                  )}
                                  {index === 3 && (
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                                  )}
                                </svg>
                              </motion.div>
                            </motion.div>

                            {/* Title */}
                            <motion.h3
                              className="text-3xl md:text-4xl font-black mb-4"
                              style={{
                                color: index === 0 ? '#E94F37' : 
                                       index === 1 ? '#253E5C' : 
                                       index === 2 ? '#E94F37' : 
                                       '#253E5C',
                              }}
                              animate={{
                                x: isHovered ? 5 : 0,
                              }}
                              transition={{ duration: 0.3 }}
                            >
                              {value.title}
                            </motion.h3>

                            {/* Description */}
                            <motion.p
                              className="text-[#253E5C]/70 leading-relaxed text-base md:text-lg flex-grow"
                              animate={{
                                color: isHovered ? '#253E5C' : 'rgba(37, 62, 92, 0.7)',
                              }}
                              transition={{ duration: 0.3 }}
                            >
                              {value.description}
                            </motion.p>

                            {/* Decorative Line */}
                            <motion.div
                              className="mt-6 h-1 rounded-full"
                              style={{
                                background: `linear-gradient(90deg, ${
                                  index === 0 ? '#E94F37' : 
                                  index === 1 ? '#253E5C' : 
                                  index === 2 ? '#E94F37' : 
                                  '#253E5C'
                                }, transparent)`,
                              }}
                              animate={{
                                scaleX: isHovered ? 1 : 0.5,
                              }}
                              transition={{ duration: 0.4 }}
                            />

                            {/* Floating Particles on Hover */}
                            {isHovered && [...Array(5)].map((_, i) => (
                              <motion.div
                                key={i}
                                className="absolute rounded-full pointer-events-none"
                                style={{
                                  width: '6px',
                                  height: '6px',
                                  background: index === 0 || index === 2 ? '#E94F37' : '#253E5C',
                                  left: `${20 + (i % 3) * 30}%`,
                                  top: `${40 + Math.floor(i / 3) * 30}%`,
                                }}
                                initial={{ scale: 0, opacity: 0 }}
                                animate={{
                                  scale: [0, 1, 0],
                                  opacity: [0, 0.8, 0],
                                  y: [0, -30],
                                  x: [0, (i % 2 === 0 ? 1 : -1) * 15],
                                }}
                                transition={{
                                  duration: 1.5,
                                  repeat: Infinity,
                                  delay: i * 0.2,
                                  ease: 'easeOut',
                                }}
                              />
                            ))}
                          </div>
                        </motion.div>
                      </motion.div>

                      {/* Shadow Effect */}
                      <motion.div
                        className="absolute inset-0 rounded-[32px] pointer-events-none -z-10"
                        animate={{
                          boxShadow: isHovered
                            ? `0 30px 80px ${
                                index === 0 || index === 2 ? 'rgba(233, 79, 55, 0.4)' : 'rgba(37, 62, 92, 0.4)'
                              }, 0 0 40px ${
                                index === 0 || index === 2 ? 'rgba(233, 79, 55, 0.2)' : 'rgba(37, 62, 92, 0.2)'
                              }`
                            : `0 15px 40px rgba(37, 62, 92, 0.15)`,
                        }}
                        transition={{ duration: 0.4 }}
                      />
                    </motion.div>
                  </motion.div>
                );
              })}
            </div>
          </div>
        </div>
      </section>

      {/* Client Testimonials Section - ReviewsSection3D */}
      <ReviewsSection3D />

      {/* Final CTA Section - Contact Cards */}
      <section ref={contactSectionRef} className="relative py-20 px-6 z-30">
        <div className="container mx-auto max-w-[1500px]">
          <div className="grid grid-cols-1 lg:grid-cols-[0.9fr,1.1fr] gap-10 items-stretch">
            {/* Left Card - Contact Info */}
            <motion.div
              className="rounded-[32px] border border-white/10 p-10 shadow-[0_20px_80px_rgba(0,0,0,0.3)]"
              style={{
                background: 'linear-gradient(135deg, rgba(37, 62, 92, 1) 0%, rgba(233, 79, 55, 1) 50%, rgba(37, 62, 92, 1) 100%)',
                transformStyle: 'preserve-3d'
              }}
              initial={{ opacity: 0, y: 50, rotateY: -15 }}
              animate={contactInView ? { opacity: 1, y: 0, rotateY: 0 } : { opacity: 0, y: 50, rotateY: -15 }}
              transition={{ duration: 0.8, delay: 0.1 }}
              whileHover={{ scale: 1.02, translateZ: 20 }}
            >
              <motion.p
                className="text-xs uppercase tracking-[0.6em] text-white/60 mb-4"
                initial={{ opacity: 0, y: 20 }}
                animate={contactInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                transition={{ duration: 0.6, delay: 0.2 }}
              >
                Contact
              </motion.p>
              <motion.h3
                className="text-4xl md:text-5xl font-black text-white mb-6 leading-tight"
                initial={{ opacity: 0, y: 30 }}
                animate={contactInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
                transition={{ duration: 0.8, delay: 0.3 }}
              >
                Have questions? Get in touch!
              </motion.h3>
              <p className="text-white/70 text-lg mb-10">
                A digital agency who delivers revenue-generating digital marketing solutions
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
                    animate={contactInView ? { opacity: 1, y: 0, x: 0 } : { opacity: 0, y: 20, x: -20 }}
                    transition={{ duration: 0.6, delay: 0.4 + idx * 0.1 }}
                    whileHover={{ scale: 1.03, borderColor: 'rgba(233, 79, 55, 0.3)', translateX: 5 }}
                  >
                    <span className="text-xs tracking-[0.35em] uppercase text-white/90 font-semibold">{item.label}</span>
                    <span className="text-base font-semibold text-white">{item.value}</span>
                  </motion.div>
                ))}
              </div>

              <div className="mt-10 space-y-3">
                <motion.a
                  href="mailto:info@advertio.com"
                  className="block text-lg font-semibold text-white hover:text-primary transition-colors"
                  whileHover={{ x: 5, scale: 1.05 }}
                >
                  info@advertio.com
                </motion.a>
                <motion.a
                  href="https://wa.me/923234304559"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block text-lg text-white/70 hover:text-primary transition-colors"
                  whileHover={{ x: 5, scale: 1.05 }}
                >
                  WhatsApp · (+92) 323 4304559
                </motion.a>
              </div>
            </motion.div>

            {/* Right Card - Contact Form */}
            <motion.form
              ref={contactCardRef}
              onSubmit={handleFormSubmit}
              onMouseMove={handleMouseMove}
              onMouseLeave={resetTilt}
              className="relative rounded-[36px] border border-white/20 shadow-[0_25px_80px_rgba(0,0,0,0.4)] p-8 md:p-10"
              style={{
                background: 'linear-gradient(135deg, rgba(233, 79, 55, 1) 0%, rgba(37, 62, 92, 1) 50%, rgba(233, 79, 55, 1) 100%)',
                transformStyle: 'preserve-3d'
              }}
              initial={{ opacity: 0, y: 60, rotateY: 15 }}
              animate={{
                opacity: contactInView ? 1 : 0,
                y: contactInView ? 0 : 60,
                rotateX: mouseTilt.y * 8,
                rotateY: mouseTilt.x * 8 + (contactInView ? 0 : 15),
                translateZ: contactInView ? 0 : -100,
                scale: contactInView ? 1 : 0.95,
              }}
              transition={{ duration: 0.8, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
              whileHover={{ scale: 1.01 }}
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
                    animate={contactInView ? { opacity: 1, y: 0, rotateX: 0 } : { opacity: 0, y: 30, rotateX: -10 }}
                    transition={{ 
                      duration: 0.6, 
                      delay: 0.25 + index * 0.12,
                      ease: [0.22, 1, 0.36, 1]
                    }}
                    whileHover={{ scale: 1.02, translateZ: 10 }}
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
                      onChange={handleFormChange}
                      required
                      className="w-full px-5 py-4 rounded-2xl bg-white/10 border border-white/20 text-white placeholder-white/40 focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/40 focus:bg-white/15 transition-all"
                      whileFocus={{ 
                        scale: 1.02, 
                        borderColor: 'rgba(233, 79, 55, 0.6)',
                        boxShadow: '0 0 20px rgba(233, 79, 55, 0.3)',
                        translateZ: 15
                      }}
                      style={{ transformStyle: 'preserve-3d' }}
                    />
                  </motion.div>
                ))}

                <motion.div
                  className="space-y-2"
                  initial={{ opacity: 0, y: 30, rotateX: -10 }}
                  animate={contactInView ? { opacity: 1, y: 0, rotateX: 0 } : { opacity: 0, y: 30, rotateX: -10 }}
                  transition={{ 
                    duration: 0.6, 
                    delay: 0.65,
                    ease: [0.22, 1, 0.36, 1]
                  }}
                  whileHover={{ scale: 1.01, translateZ: 10 }}
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
                    onChange={handleFormChange}
                    required
                    className="w-full px-5 py-4 rounded-2xl bg-white/10 border border-white/20 text-white placeholder-white/40 focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/40 focus:bg-white/15 transition-all resize-none"
                    whileFocus={{ 
                      scale: 1.01, 
                      borderColor: 'rgba(233, 79, 55, 0.6)',
                      boxShadow: '0 0 20px rgba(233, 79, 55, 0.3)',
                      translateZ: 15
                    }}
                    style={{ transformStyle: 'preserve-3d' }}
                  />
                </motion.div>

                <motion.button
                  type="submit"
                  disabled={formStatus === 'sending'}
                  className="relative w-full flex items-center justify-center gap-3 px-6 py-4 rounded-2xl text-white font-semibold text-lg bg-gradient-to-r from-[#253E5C] via-primary to-[#FF6B4A] shadow-lg shadow-primary/40 transition-all disabled:opacity-60 overflow-hidden"
                  whileHover={{ scale: 1.03, translateZ: 20, boxShadow: '0 10px 40px rgba(233, 79, 55, 0.5)' }}
                  whileTap={{ scale: 0.98 }}
                  style={{ transformStyle: 'preserve-3d' }}
                >
                  <motion.div
                    className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent"
                    animate={{ x: ['-100%', '200%'] }}
                    transition={{ duration: 2, repeat: Infinity, ease: 'linear', repeatDelay: 1 }}
                  />
                  <span className="relative z-10">{formStatus === 'sending' ? 'Sending...' : 'Send the brief'}</span>
                  <motion.span
                    className="relative z-10"
                    animate={{ x: [0, 6, 0] }}
                    transition={{ duration: 1.5, repeat: Infinity, ease: 'easeInOut' }}
                  >
                    →
                  </motion.span>
                </motion.button>

                {formStatus === 'sent' && (
                  <motion.p
                    className="text-center text-sm font-semibold text-primary"
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
        </div>
      </section>
    </div>
  );
};

// ReviewsSection3D Component - Exact copy from Home.jsx
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
    <>
      <style>{`
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
          image-rendering: -webkit-optimize-contrast;
          image-rendering: crisp-edges;
        }
      `}</style>
      <motion.section
        ref={sectionRef}
        className="relative z-10 pt-0 pb-0 overflow-visible bg-gradient-to-b from-white/50 via-white/70 to-white/90 w-full"
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
      </motion.section>
    </>
  );
};

export default About;
