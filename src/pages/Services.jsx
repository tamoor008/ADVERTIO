import { useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Link } from 'react-router-dom';

gsap.registerPlugin(ScrollTrigger);

const Services = () => {
  const servicesRef = useRef(null);

  // Scroll to top on mount
  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: 'instant' });
  }, []);

  useEffect(() => {
    if (servicesRef.current) {
      gsap.from(servicesRef.current.children, {
        scale: 0.8,
        opacity: 0,
        duration: 0.8,
        stagger: 0.15,
        scrollTrigger: {
          trigger: servicesRef.current,
          start: 'top 80%',
        },
      });
    }
  }, []);

  const services = [
    {
      title: '3D Design',
      description: 'Immersive 3D experiences that captivate your audience',
      icon: '🎨',
      link: '/services/3d-design',
    },
    {
      title: 'Web Development',
      description: 'Premium React-based websites with cutting-edge tech',
      icon: '💻',
      link: '/services/web-development',
    },
    {
      title: 'Branding',
      description: 'Complete brand identity and visual design systems',
      icon: '✨',
      link: '/services/branding',
    },
    {
      title: 'Digital Marketing',
      description: 'Strategic campaigns that drive engagement and growth',
      icon: '📈',
      link: '/services/digital-marketing',
    },
    {
      title: 'Motion Graphics',
      description: 'Cinematic animations and video production',
      icon: '🎬',
      link: '/services/motion-graphics',
    },
    {
      title: 'Consulting',
      description: 'Expert guidance for your digital transformation',
      icon: '🚀',
      link: '/services/consulting',
    },
  ];

  return (
    <div className="min-h-screen pt-24 pb-20">
      <div className="container mx-auto px-6">
        <motion.div
          className="text-center mb-20"
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
        >
          <h1 className="text-6xl md:text-8xl font-black mb-6 bg-gradient-to-r from-primary to-white bg-clip-text text-transparent">
            SERVICES
          </h1>
          <p className="text-xl text-white/80 max-w-3xl mx-auto">
            Premium solutions tailored to elevate your brand
          </p>
        </motion.div>

        <div ref={servicesRef} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.map((service, index) => (
            <motion.div
              key={index}
              whileHover={{ y: -10, rotateY: 5 }}
              className="group"
            >
              <Link to={service.link}>
                <div className="bg-dark/50 backdrop-blur-md p-8 rounded-2xl border border-white/10 hover:border-primary/50 transition-all h-full">
                  <div className="text-6xl mb-6 group-hover:scale-110 transition-transform">
                    {service.icon}
                  </div>
                  <h3 className="text-2xl font-bold text-white mb-4">{service.title}</h3>
                  <p className="text-white/60">{service.description}</p>
                  <div className="mt-6 text-primary font-semibold group-hover:translate-x-2 transition-transform">
                    Learn more →
                  </div>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Services;

