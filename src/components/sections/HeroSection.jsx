'use client'

import { useEffect, useRef, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Link from 'next/link';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { heroBadges, heroModes, staticHeroLinePoints, staticHeroSignals } from './constants';

gsap.registerPlugin(ScrollTrigger);

const rotatingWords = heroModes.map((mode) => mode.word);

const HeroSection = () => {
  const heroRef = useRef(null);
  const textRef = useRef(null);
  const [rotatingIndex, setRotatingIndex] = useState(0);
  const currentHeroMode = heroModes[rotatingIndex] ?? heroModes[0];
  const heroLinePoints = staticHeroLinePoints.map((point) => `${point.x},${point.y}`).join(' ');

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

    const scrollTrigger = ScrollTrigger.create({
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

    // Cleanup function to kill ScrollTrigger instance
    return () => {
      scrollTrigger.kill();
    };
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      setRotatingIndex((prev) => (prev + 1) % rotatingWords.length);
    }, 2200);
    return () => clearInterval(interval);
  }, []);

  return (
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
                <span className="relative inline-flex items-end h-[1.1em] w-[16ch] align-baseline">
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
                  href="/free-audit"
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
                  href="/services/performance-marketing"
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
                  <img src="/logo-Advertio.png" alt="Advertio logo" className="h-12 object-contain -mb-3" loading="lazy" />
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
  );
};

export default HeroSection;

