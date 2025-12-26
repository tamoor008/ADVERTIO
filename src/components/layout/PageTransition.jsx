'use client'

import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';

const pageVariants = {
  initial: {
    opacity: 0,
    y: 20,
  },
  animate: {
    opacity: 1,
    y: 0,
  },
  exit: {
    opacity: 0,
    y: -20,
  },
};

const pageTransition = {
  type: 'tween',
  ease: 'anticipate',
  duration: 0.5,
};

const PageTransition = ({ children }) => {
  // Scroll to top when component mounts (route changes) - disabled on mobile to prevent auto-scroll
  useEffect(() => {
    // Only scroll to top on desktop, not on mobile
    if (typeof window !== 'undefined' && window.innerWidth >= 768) {
      window.scrollTo({ top: 0, left: 0, behavior: 'instant' });
    }
  }, []);

  // Detect mobile for animation adjustments
  const [isMobile, setIsMobile] = useState(false);
  
  useEffect(() => {
    if (typeof window === 'undefined') return;
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  // Simplified variants for mobile - no y transform to prevent layout shifts
  const mobileVariants = {
    initial: { opacity: 0 },
    animate: { opacity: 1 },
    exit: { opacity: 0 },
  };

  return (
    <motion.div
      initial="initial"
      animate="animate"
      exit="exit"
      variants={isMobile ? mobileVariants : pageVariants}
      transition={isMobile ? { duration: 0.2 } : pageTransition}
    >
      {children}
    </motion.div>
  );
};

export default PageTransition;

