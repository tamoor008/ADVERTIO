import { useRef } from 'react';
import { motion, useInView, useMotionValue, animate } from 'framer-motion';
import { useEffect, useState } from 'react';
import { statsData } from './constants';

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

export default MetricsBar;

