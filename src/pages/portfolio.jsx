'use client'

import { useRef, useEffect } from 'react';
import { motion, useScroll, useSpring, useTransform } from 'framer-motion';
import Image from 'next/image';
import Link from 'next/link';
import Head from 'next/head';

const Portfolio = () => {
  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  });

  // Grouping 22 images into thematic chapters
  const chapters = [
    {
      id: 'vision',
      title: 'Our Vision',
      subtitle: 'The Strategic Foundation',
      images: [1, 2, 3, 4],
      description: 'The blueprint of performance. We combine data-driven insights with world-class design to build brands that don\'t just look good—they convert.'
    },
    {
      id: 'artwork',
      title: 'Creative Artwork',
      subtitle: 'Strategic Brilliance',
      images: [19, 20, 21],
      description: 'Beyond standard design. Immersive and high-performance visual artwork that pushes the boundaries of digital creativity.'
    },
    {
      id: 'social',
      title: 'Social Presence Design',
      subtitle: 'Digital Engagement',
      images: [5, 6, 7, 8, 9],
      description: 'Stopping the scroll. We create cohesive social media systems that resonate across every platform, building trust and recognition at scale.'
    },
    {
      id: 'packaging',
      title: 'Product Story Packaging',
      subtitle: 'Physical Excellence',
      images: [10, 11, 12],
      description: 'Tangible brand experiences. Our packaging designs are engineered for shelf-impact, unboxing delight, and brand recall.'
    },
    {
      id: 'logomark',
      title: 'Logomark & Visual Language',
      subtitle: 'Core Identity',
      images: [13, 14, 15],
      description: 'The DNA of your brand. We craft timeless logomarks and comprehensive visual systems that represent your brand\'s core values.'
    },
    {
      id: 'banner',
      title: 'Banner Design',
      subtitle: 'High-Impact Media',
      images: [16, 17, 18],
      description: 'Conversion-focused visual storytelling. High-impact creative assets designed for maximum click-through rates and brand presence.'
    }
  ];

  return (
    <div ref={containerRef} className="min-h-screen bg-white relative">
      <Head>
        <title>Our Portfolio | Advertio - Premium Design &amp; Digital Case Studies</title>
        <meta name="description" content="Explore our premium portfolio showcase. See how Advertio blends strategy, creative design, and technology to build revenue-generating brand experiences." />
        <link rel="canonical" href="https://www.advertio.agency/portfolio" />
      </Head>
      {/* Custom Progress Bar */}
      <motion.div
        className="fixed top-0 left-0 right-0 h-1 bg-primary z-[10002] origin-left"
        style={{ scaleX }}
      />

      {/* Hero Header */}
      <section className="relative min-h-[80vh] flex items-center justify-center px-6 overflow-hidden">
        <div className="absolute inset-0 bg-white">
          <div className="absolute top-[-10%] left-[-10%] w-[50%] h-[50%] rounded-full bg-primary/5 blur-[120px] animate-pulse" />
          <div className="absolute bottom-[-10%] right-[-10%] w-[50%] h-[50%] rounded-full bg-dark/5 blur-[120px]" />
        </div>

        <div className="container mx-auto max-w-6xl relative z-10 text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1 }}
          >
            <span className="text-primary font-black uppercase tracking-[0.4em] text-xs mb-8 block">Project Visual Anthology</span>
            <h1 className="text-[10vw] md:text-[7vw] font-black text-dark leading-[0.9] mb-12 tracking-tighter uppercase">
              Premium Designs <br /> <span className="text-primary italic">Premium Returns.</span>
            </h1>
            <p className="text-xl md:text-2xl text-dark/70 max-w-2xl mx-auto font-medium leading-relaxed">
              Explore 22 pages of strategic brilliance. A deep dive into high-performance visual storytelling.
            </p>
          </motion.div>
        </div>

        {/* Floating background page number */}
        <div className="absolute bottom-10 right-10 text-[20vw] font-black text-dark/[0.03] select-none leading-none">
          22/22
        </div>
      </section>

      {/* Chapters */}
      <div className="space-y-40 pb-40">
        {chapters.map((chapter, cIndex) => (
          <section key={chapter.id} className="relative container mx-auto px-6 mb-32">
            <div className="flex flex-wrap gap-x-12 gap-y-16 items-start">
              {/* Sticky Title Block */}
              <div className="w-full lg:w-[450px] lg:sticky lg:top-32 h-fit z-10 mb-12 lg:mb-0">
                <motion.div
                  initial={{ opacity: 0, x: -30 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.8 }}
                >
                  <span className="text-primary font-bold text-sm uppercase tracking-widest block mb-2">{String(cIndex + 1).padStart(2, '0')}</span>
                  <h2 className="text-4xl md:text-6xl font-black text-dark mb-6 leading-none uppercase">{chapter.title}</h2>
                  <p className="text-dark/40 font-bold uppercase tracking-widest text-xs mb-8">{chapter.subtitle}</p>
                  <p className="text-dark/60 leading-relaxed font-medium border-l-2 border-primary/20 pl-6 lg:max-w-sm">
                    {chapter.description}
                  </p>
                </motion.div>
              </div>

              {/* Individual Image Cards (Direct Siblings for Wrapping) */}
              {chapter.images.map((imgIndex, i) => (
                <motion.div
                  key={imgIndex}
                  initial={{ opacity: 0, y: 60 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-100px" }}
                  transition={{ duration: 0.8, delay: (i % 2 === 0 ? 0 : 0.2) }}
                  className="relative group w-full md:w-[450px] flex-shrink-0"
                >
                  <div className="relative aspect-[4/5] rounded-[2.5rem] overflow-hidden shadow-[0_40px_100px_rgba(0,0,0,0.08)] border border-dark/5 bg-white">
                    <Image
                      src={`/assets/portfolio/Advertio Design Portfolio -${imgIndex}.png`}
                      alt={`Portfolio page ${imgIndex}`}
                      fill
                      className="object-cover transition-transform duration-1000 group-hover:scale-[1.03]"
                      sizes="(max-width: 768px) 100vw, 450px"
                      priority={imgIndex <= 2}
                    />

                    {/* Overlay page number */}
                    <div className="absolute top-10 right-10 w-12 h-12 rounded-full bg-dark/20 backdrop-blur-sm flex items-center justify-center font-black text-white text-xs">
                      {String(imgIndex).padStart(2, '0')}
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </section>
        ))}
      </div>

      {/* Visual Conclusion - Focused Width */}
      <section className="relative pb-40 container mx-auto px-6">
        <div className="max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 60 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 1 }}
            className="relative group"
          >
            <div className="relative aspect-[4/5] rounded-[3rem] overflow-hidden shadow-[0_50px_120px_rgba(0,0,0,0.12)] border border-dark/5 bg-white">
              <Image
                src="/assets/portfolio/Advertio Design Portfolio -22.png"
                alt="Design Anthology Conclusion"
                fill
                className="object-contain transition-transform duration-1000 group-hover:scale-[1.01]"
                sizes="100vw"
              />

              {/* Overlay Branding */}
              <div className="absolute inset-0 bg-gradient-to-t from-dark/40 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700 flex items-end p-20">
                <div>
                  <span className="text-primary font-black uppercase tracking-[0.4em] text-xs mb-4 block">Visual Anthology</span>
                  <h3 className="text-4xl md:text-6xl font-black text-white uppercase leading-none">The Conclusion.</h3>
                </div>
              </div>

              {/* Overlay page number */}
              <div className="absolute top-10 right-10 w-12 h-12 rounded-full bg-dark/20 backdrop-blur-sm flex items-center justify-center font-black text-white text-xs">
                22
              </div>
            </div>
          </motion.div></div>
      </section>

      {/* Signature CTA */}
      <section className="py-40 bg-dark relative overflow-hidden text-white">
        <div className="absolute top-0 right-0 w-full h-full opacity-10 pointer-events-none">
          <div className="absolute top-[-20%] right-[-10%] w-[60%] h-[60%] rounded-full bg-primary blur-[150px]" />
        </div>

        <div className="container mx-auto px-6 max-w-4xl text-center relative z-10">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <h2 className="text-5xl md:text-8xl font-black mb-12 leading-none uppercase">
              REDEFINE YOUR <br /> <span className="text-primary italic">STANDARD.</span>
            </h2>
            <p className="text-xl md:text-2xl text-white/50 mb-16 font-medium leading-relaxed">
              Let&apos;s build the next high-performance chapter <br className="hidden md:block" /> of your brand history together.
            </p>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-8">
              <Link
                href="/contact"
                className="px-12 py-6 bg-primary text-white font-black uppercase tracking-widest rounded-full hover:shadow-[0_20px_50px_rgba(233,79,55,0.4)] transition-all transform hover:-translate-y-2 text-sm w-full sm:w-auto"
              >
                Start Interaction
              </Link>
              <Link
                href="/"
                className="px-12 py-6 border-2 border-white/20 text-white font-black uppercase tracking-widest rounded-full hover:bg-white hover:text-dark transition-all transform hover:-translate-y-2 text-sm w-full sm:w-auto"
              >
                Back to Pulse
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Footer Bar */}
      <footer className="py-10 bg-primary text-center text-[10px] font-black uppercase tracking-[0.5em] text-white">
        Advertio Media Services © 2026 — Design Anthology
      </footer>
    </div>
  );
};

export default Portfolio;
