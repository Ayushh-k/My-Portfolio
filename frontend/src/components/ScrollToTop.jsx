import { useEffect, useState } from 'react';
import { ChevronUp } from 'lucide-react';

const ScrollToTop = ({ isDark }) => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const toggleVisibility = () => {
      if (window.pageYOffset > 300) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    };

    window.addEventListener('scroll', toggleVisibility);
    return () => window.removeEventListener('scroll', toggleVisibility);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  };

  if (!isVisible) return null;

  return (
    <button
      onClick={scrollToTop}
      className={`fixed bottom-8 right-8 p-3 rounded-full z-40 transition-all transform hover:scale-110 ${
        isDark
          ? 'bg-cyan-500 text-white hover:bg-cyan-600'
          : 'bg-cyan-500 text-white hover:bg-cyan-600'
      } shadow-lg animate-bounce`}
      aria-label="Scroll to top"
    >
      <ChevronUp size={24} />
    </button>
  );
};

export default ScrollToTop;
