import { useEffect, useRef } from 'react';

export const useScrollAnimation = (options = {}) => {
  const ref = useRef(null);
  const {
    threshold = 0.1,
    rootMargin = '0px 0px -100px 0px',
    delay = 0,
    animationType = 'up' // 'up', 'down', 'left', 'right', 'zoom', 'fade'
  } = options;

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setTimeout(() => {
            entry.target.classList.add('scroll-animate-in');
          }, delay);
        } else {
          // Remove animation class when element leaves viewport to allow replay
          entry.target.classList.remove('scroll-animate-in');
        }
      },
      {
        threshold,
        rootMargin
      }
    );

    if (ref.current) {
      // Add animation type classes
      ref.current.classList.add('scroll-reveal');
      ref.current.classList.add(`scroll-reveal-${animationType}`);
      observer.observe(ref.current);
    }

    return () => {
      if (ref.current) {
        observer.unobserve(ref.current);
      }
    };
  }, [threshold, rootMargin, delay, animationType]);

  return ref;
};
