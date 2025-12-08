'use client'

import { useRef, useState } from 'react';
import { motion, useInView } from 'framer-motion';

const FAQSection3D = () => {
  const sectionRef = useRef(null);
  const isInView = useInView(sectionRef, { once: true, amount: 0.25 });
  const [activeIndex, setActiveIndex] = useState(null);

  const faqs = [
    {
      question: 'How fast can Advertio launch a 3D-powered campaign?',
      answer:
        'Discovery to launch typically takes 21 days. Week one is immersion and data pulls, week two is concepting and motion prototyping, and week three is production plus ad-platform wiring with daily QA loops.',
      tag: 'Velocity',
      accent: '#E94F37',
      background: '#E94F37',
    },
    {
      question: 'What deliverables are included in the growth retainer?',
      answer:
        'We combine paid media orchestration, CRO audits, WebGL microsite drops, cinematic UGC editing, and real-time dashboards. Each sprint ships a measurable experiment tied to ROAS, LTV, or CPM efficiency.',
      tag: 'Scope',
      accent: '#253E5C',
      background: '#253E5C',
    },
    {
      question: 'Do you integrate with our internal creative or dev team?',
      answer:
        'Absolutely. We work in shared Figma, Notion, and Git repos. Our shaders, particle rigs, and tracking libraries are modular so internal teams can iterate without waiting on us.',
      tag: 'Collaboration',
      accent: '#E94F37',
      background: '#E94F37',
    },
    {
      question: 'How do you report results from immersive experiences?',
      answer:
        'We pipe volumetric engagement, scroll-depth, dwell time, and assisted conversions into Looker dashboards. Each FAQ tap, product spin, or AR trigger is evented back to your attribution model.',
      tag: 'Measurement',
      accent: '#253E5C',
      background: '#253E5C',
    },
    {
      question: 'Can the 3D FAQ component plug into other pages?',
      answer:
        'Yes. It is built with headless props, accepts CMS data, and exposes a variant prop for light or dark backgrounds. Animations rely on Framer Motion so it stays GPU-friendly.',
      tag: 'Flexibility',
      accent: '#E94F37',
      background: '#E94F37',
    },
    {
      question: 'What makes the Advertio support model different?',
      answer:
        'You get a dedicated strategist, shader artist, and marketing engineer on one Slack bridge. Stand-ups happen twice a week and war rooms spin up within 15 minutes for launches.',
      tag: 'Support',
      accent: '#253E5C',
      background: '#253E5C',
    },
  ];

  const handleToggle = (index) => {
    setActiveIndex((prev) => (prev === index ? null : index));
  };

  return (
    <motion.section
      ref={sectionRef}
      className="relative z-10 pt-8 md:pt-8 pb-28 px-6 lg:px-8 bg-gradient-to-b from-white/90 via-[#F6F7FF]/80 to-white w-full overflow-visible"
      initial={{ opacity: 0 }}
      animate={isInView ? { opacity: 1 } : { opacity: 0 }}
      transition={{ duration: 0.8 }}
    >
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        {[...Array(3)].map((_, index) => (
          <div
            key={`faq-orb-${index}`}
            className="absolute rounded-full blur-3xl opacity-20"
            style={{
              width: `${300 + index * 100}px`,
              height: `${300 + index * 100}px`,
              left: `${(index * 30) % 100}%`,
              top: `${(index * 25) % 100}%`,
              background: `radial-gradient(circle, rgba(233, 79, 55, ${0.1 + index * 0.05}) 0%, transparent 70%)`,
            }}
          />
        ))}
      </div>

      <div className="relative max-w-[1500px] mx-auto">
        <motion.div
          className="text-center mb-8 md:mb-16 max-w-3xl mx-auto"
          initial={{ opacity: 0, y: 40, scale: 0.95 }}
          animate={isInView ? { opacity: 1, y: 0, scale: 1 } : { opacity: 0, y: 40, scale: 0.95 }}
          transition={{ duration: 0.8, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
        >
          <motion.h3
            className="text-4xl md:text-5xl font-black text-[#253E5C] mb-4"
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
            transition={{ duration: 0.8, delay: 0.3 }}
          >
            F A <span className="bg-gradient-to-r from-[#253E5C] via-primary to-[#ff6b4a] bg-clip-text text-transparent">Q</span>
          </motion.h3>
          <motion.p
            className="text-[#253E5C]/70 text-lg"
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ duration: 0.8, delay: 0.4 }}
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
                className="relative rounded-[28px] border overflow-hidden group"
                style={{
                  background: faq.background,
                  borderColor: `${faq.accent}40`,
                  boxShadow: isActive
                    ? `0 30px 80px ${faq.accent}33, 0 15px 40px rgba(15,23,42,0.1)`
                    : '0 18px 45px rgba(15,23,42,0.08)',
                }}
                whileHover={{
                  y: -4,
                  scale: 1.01,
                }}
                transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
              >
                <div className="relative p-6 md:p-8">
                  <button
                    type="button"
                    onClick={() => handleToggle(index)}
                    className="w-full text-left focus:outline-none"
                  >
                    <div className="flex items-start justify-between gap-4">
                      <div>
                        <p className="text-xs uppercase tracking-[0.4em] text-white/70 mb-2">
                          {faq.tag}
                        </p>
                        <h4 className="text-xl md:text-2xl font-black text-white">
                          {faq.question}
                        </h4>
                      </div>
                      <motion.span
                        className="flex items-center justify-center w-12 h-12 rounded-2xl border border-white/20 bg-white/10 backdrop-blur-md"
                        animate={{
                          rotate: isActive ? 45 : 0,
                          background: isActive ? 'rgba(255,255,255,0.2)' : 'rgba(255,255,255,0.1)',
                          color: '#FFFFFF',
                          boxShadow: isActive
                            ? `0 0 25px rgba(255,255,255,0.3)`
                            : '0 5px 15px rgba(0,0,0,0.1)',
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
                        <p className="text-white/90 text-sm md:text-base leading-relaxed">
                          {faq.answer}
                        </p>
                        <motion.div
                          className="mt-6 h-[1px] w-full"
                          initial={{ scaleX: 0, opacity: 0 }}
                          animate={{ scaleX: 1, opacity: 1 }}
                          transition={{ duration: 0.5, delay: 0.1 }}
                          style={{
                            background: `linear-gradient(90deg, transparent, rgba(255,255,255,0.5), transparent)`,
                            transformOrigin: 'left',
                          }}
                        />
                      </>
                    )}
                  </motion.div>
                </div>

                <div
                  className="absolute -bottom-16 right-6 w-32 h-32 rounded-full blur-2xl opacity-40"
                  style={{ background: `${faq.accent}55` }}
                />
              </motion.div>
            );
          })}
        </div>
      </div>
    </motion.section>
  );
};

export default FAQSection3D;

