import { useEffect, useRef } from 'react';

export const useMouseParallax = (intensity = 0.1) => {
  const ref = useRef(null);

  useEffect(() => {
    const element = ref.current;
    if (!element) return;

    const handleMouseMove = (e) => {
      const { clientX, clientY } = e;
      const { innerWidth, innerHeight } = window;
      
      const x = (clientX / innerWidth - 0.5) * intensity;
      const y = (clientY / innerHeight - 0.5) * intensity;

      element.style.transform = `translate(${x * 100}px, ${y * 100}px)`;
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, [intensity]);

  return ref;
};

