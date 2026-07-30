'use client'

import { useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Link from 'next/link';
import Head from 'next/head';

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
      title: 'Performance Marketing',
      description: 'Drive measurable growth with data-driven campaigns engineered for maximum ROI.',
      icon: '📈',
      link: '/services/performance-marketing',
    },
    {
      title: 'Digital Marketing',
      description: 'Build a strong online presence with strategies that connect, engage, and convert.',
      icon: '🌐',
      link: '/services/digital-marketing',
    },
    {
      title: 'Social Media Handling & Branding',
      description: 'Grow your influence and build a brand your audience loves.',
      icon: '📱',
      link: '/services/social-media-handling-branding',
    },
    {
      title: 'Creative & Design',
      description: 'Transform your brand visuals into powerful assets that influence and inspire.',
      icon: '🎨',
      link: '/services/creative-design',
    },
    {
      title: 'Video Editing',
      description: 'Create cinematic visuals that elevate your brand and captivate your audience.',
      icon: '🎬',
      link: '/services/video-editing',
    },
    {
      title: 'Website Development',
      description: 'Build a high-performance website that converts visitors into customers.',
      icon: '💻',
      link: '/services/website-development',
    },
    {
      title: 'Shopify Store Development',
      description: 'Launch a revenue-driven Shopify store built for performance, scalability, and brand experience.',
      icon: '🛒',
      link: '/services/shopify-store-development',
    },
    {
      title: 'Ecommerce Solutions',
      description: 'Empower your online business with complete ecommerce strategy, technology, and growth solutions.',
      icon: '🚀',
      link: '/services/ecommerce-solutions',
    },
  ];

  return (
    <div className="min-h-screen pt-24 pb-20">
      <Head>
        <title>Our Services | Advertio - Growth &amp; Tech Solutions</title>
        <meta name="description" content="Discover Advertio&apos;s premium marketing and technology services, from 3D design and custom Shopify development to performance marketing." />
      </Head>
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

        <div ref={servicesRef} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {services.map((service, index) => (
            <motion.div
              key={index}
              whileHover={{ y: -10, rotateY: 5 }}
              className="group"
            >
              <Link href={service.link}>
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
