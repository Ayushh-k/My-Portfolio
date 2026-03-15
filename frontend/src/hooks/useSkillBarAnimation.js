import { useEffect, useRef } from 'react';

export const useSkillBarAnimation = (options = {}) => {
  const ref = useRef(null);
  const {
    threshold = 0.1,
    rootMargin = '0px 0px -100px 0px'
  } = options;

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          // Trigger skill bar animation
          const skillBars = entry.target.querySelectorAll('.skill-bar-fill');
          skillBars.forEach((bar, index) => {
            setTimeout(() => {
              bar.classList.add('animate-fill');
            }, index * 50); // Stagger each bar by 50ms
          });
        } else {
          // Reset animation when leaving viewport
          const skillBars = entry.target.querySelectorAll('.skill-bar-fill');
          skillBars.forEach((bar) => {
            bar.classList.remove('animate-fill');
          });
        }
      },
      {
        threshold,
        rootMargin
      }
    );

    if (ref.current) {
      observer.observe(ref.current);
    }

    return () => {
      if (ref.current) {
        observer.unobserve(ref.current);
      }
    };
  }, [threshold, rootMargin]);

  return ref;
};
