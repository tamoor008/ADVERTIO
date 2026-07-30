'use client'

import { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';
import Image from 'next/image';

const DesignPortfolioSection = () => {
  const containerRef = useRef(null);
  
  const scrollRef = useRef(null);
  const [dragConstraints, setDragConstraints] = useState({ left: 0, right: 0 });

  useEffect(() => {
    if (scrollRef.current) {
      const contentWidth = scrollRef.current.scrollWidth;
      const containerWidth = scrollRef.current.offsetWidth;
      setDragConstraints({ left: -(contentWidth - containerWidth), right: 0 });
    }
  }, []);
  
  const previewImages = [
    { src: '/assets/portfolio/Advertio Design Portfolio -1.png', alt: 'Brand Strategy' },
    { src: '/assets/portfolio/Advertio Design Portfolio -2.png', alt: 'Visual Casebook' },
    { src: '/assets/portfolio/Advertio Design Portfolio -3.png', alt: 'Brand Identity' },
    { src: '/assets/portfolio/Advertio Design Portfolio -4.png', alt: 'Packaging Design' },
    { src: '/assets/portfolio/Advertio Design Portfolio -5.png', alt: 'Creative Direction' },
    { src: '/assets/portfolio/Advertio Design Portfolio -6.png', alt: 'Meta Ads Design' },
  ].slice(0, 6);

  return (
    <section ref={containerRef} className="py-32 bg-[#F9FAFB] relative overflow-hidden">
      {/* Decorative background elements */}
      <div className="absolute top-0 left-0 w-full h-full pointer-events-none opacity-20">
        <div className="absolute top-20 left-[10%] w-64 h-64 border border-primary/20 rounded-full" />
        <div className="absolute bottom-20 right-[5%] w-96 h-96 border border-dark/10 rounded-full" />
      </div>

      <div className="container mx-auto px-6 relative z-10">
        <div className="flex flex-col lg:flex-row items-start justify-between mb-20 gap-10">
          <div className="max-w-2xl">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="flex items-center gap-4 mb-6"
            >
              <div className="h-[2px] w-12 bg-primary" />
              <span className="text-primary font-black uppercase tracking-widest text-sm">Portfolio Showcase</span>
            </motion.div>
            
            <motion.h2
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="text-5xl md:text-7xl font-black text-dark mb-8 leading-[0.95] tracking-tighter"
            >
              The Visual <br /> <span className="text-primary italic">Anthology.</span>
            </motion.h2>
            
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.1 }}
              className="text-xl text-dark/60 max-w-lg leading-relaxed font-medium"
            >
              Explore our visual casebook—a masterclass in brand identity, digital performance, and conversion-focused creative design.
            </motion.p>
          </div>

          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="lg:pt-10"
          >
            <Link
              href="/portfolio"
              className="group relative inline-flex items-center gap-4 p-1 rounded-full bg-white shadow-xl shadow-dark/5 border border-dark/5 transition-all hover:pr-8 hover:shadow-primary/20"
            >
              <div className="w-16 h-16 rounded-full bg-dark flex items-center justify-center text-white transition-colors group-hover:bg-primary">
                <svg className="w-6 h-6 transform transition-transform group-hover:translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
              </div>
              <span className="text-dark font-black uppercase tracking-widest text-sm px-2">View Full Casebook</span>
            </Link>
          </motion.div>
        </div>
      </div>

      {/* Horizontal Draggable Gallery */}
      <div className="relative mt-12 overflow-hidden px-6 md:px-[10vw]">
        <motion.div 
          ref={scrollRef}
          className="flex gap-12 cursor-grab active:cursor-grabbing overflow-x-auto no-scrollbar py-10"
          drag="x"
          dragConstraints={dragConstraints}
          whileTap={{ cursor: 'grabbing' }}
        >
          {previewImages.map((image, index) => (
            <motion.div
              key={index}
              className="relative flex-shrink-0 w-[280px] md:w-[450px] aspect-[4/5] rounded-[40px] overflow-hidden shadow-2xl transition-transform hover:scale-[1.02] duration-500"
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: index * 0.1 }}
            >
              <Image
                src={image.src}
                alt={image.alt}
                fill
                className="object-contain bg-white"
                sizes="(max-width: 768px) 100vw, 50vw"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-dark/60 via-transparent to-transparent opacity-0 hover:opacity-100 transition-opacity duration-300 flex items-end p-8">
                <p className="text-white font-bold text-lg md:text-2xl">{image.alt}</p>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>

      {/* Bottom accent */}
      <div className="mt-32 border-t border-dark/5 container mx-auto" />
    </section>
  );
};

export default DesignPortfolioSection;
