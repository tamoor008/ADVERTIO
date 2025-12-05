import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

export const useScrollAnimation = (options = {}) => {
  const ref = useRef(null);
  const {
    trigger = null,
    start = 'top 80%',
    end = 'bottom 20%',
    animation = { y: 50, opacity: 0 },
    duration = 1,
    stagger = 0,
  } = options;

  useEffect(() => {
    if (!ref.current) return;

    const element = trigger || ref.current;

    gsap.from(ref.current, {
      ...animation,
      duration,
      scrollTrigger: {
        trigger: element,
        start,
        end,
        toggleActions: 'play none none none',
      },
    });

    return () => {
      ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
    };
  }, [trigger, start, end, duration, stagger]);

  return ref;
};

