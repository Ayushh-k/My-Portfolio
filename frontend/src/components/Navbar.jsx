import { useState, useEffect } from 'react';
import { Menu, X, Sun, Moon } from 'lucide-react';

const Navbar = ({ isDark, toggleDarkMode }) => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [isOverHero, setIsOverHero] = useState(true);

  useEffect(() => {
    const onScroll = () => {
       setScrolled(window.scrollY > 50);
       // Hero section is approx 100vh. We transition slightly before the end.
       setIsOverHero(window.scrollY < window.innerHeight - 80);
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    // Initialize on mount
    onScroll();
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const navLinks = [
    { label: 'Services', href: '#skills' },
    { label: 'Works', href: '#projects' },
    { label: 'About', href: '#about' },
    { label: 'Contact', href: '#contact' },
  ];

  // The Hero section is always dark. If we are over the Hero section,
  // we force the effective theme of the Navbar to be dark to ensure visibility.
  const effectiveIsDark = isOverHero || isDark;

  return (
    <header className="fixed top-0 left-0 right-0 z-[100] transition-all duration-500">
      {/* Blur layer */}
      <div
        className="absolute inset-0 transition-all duration-500"
        style={{
          backdropFilter: scrolled ? 'blur(12px)' : 'none',
          WebkitBackdropFilter: scrolled ? 'blur(12px)' : 'none',
          background: scrolled
            ? effectiveIsDark
              ? 'linear-gradient(to bottom, rgba(5,11,20,0.75) 0%, rgba(5,11,20,0.4) 80%, transparent 100%)'
              : 'linear-gradient(to bottom, rgba(248,251,251,0.85) 0%, rgba(248,251,251,0.4) 80%, transparent 100%)'
            : 'transparent',
        }}
      ></div>
      
      <div className="relative flex items-center justify-between px-8 py-5">
        {/* Logo */}
        <a href="#home" className={`text-2xl font-black ${effectiveIsDark ? 'text-white' : 'text-gray-900'} tracking-widest z-10 transition-colors duration-500`}>
          <span className="text-cyan-400">A</span>K.
        </a>

        {/* Desktop links */}
        <nav className={`hidden md:flex items-center gap-10 text-xs font-bold tracking-[0.2em] uppercase ${effectiveIsDark ? 'text-gray-400' : 'text-gray-600'} transition-colors duration-500`}>
          {navLinks.map(link => (
            <a key={link.label} href={link.href} className="hover:text-cyan-400 transition-colors duration-200">
              {link.label}
            </a>
          ))}
        </nav>

        {/* Right controls */}
        <div className="flex items-center gap-4">
          <button
            onClick={toggleDarkMode}
            className={`p-2 rounded-lg bg-white/5 ${effectiveIsDark ? 'text-gray-400 hover:text-cyan-400' : 'text-gray-600 hover:text-cyan-600'} transition-colors duration-500`}
            aria-label="Toggle dark mode"
          >
            {isDark ? <Sun size={18} /> : <Moon size={18} />}
          </button>
          <button
            className={`md:hidden p-2 ${effectiveIsDark ? 'text-gray-400 hover:text-cyan-400' : 'text-gray-600 hover:text-cyan-600'} transition-colors duration-500`}
            onClick={() => setMenuOpen(o => !o)}
            aria-label="Toggle menu"
          >
            {menuOpen ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>

        {/* Mobile menu */}
        {menuOpen && (
          <div className={`absolute top-full left-0 right-0 ${effectiveIsDark ? 'bg-[#0a101d]/95 border-white/5' : 'bg-white/95 border-gray-200'} backdrop-blur-xl border-t flex flex-col py-4 px-8 gap-4 md:hidden transition-colors duration-500`}>
            {navLinks.map(link => (
              <a 
                key={link.label} 
                href={link.href} 
                onClick={() => setMenuOpen(false)} 
                className={`text-sm ${effectiveIsDark ? 'text-gray-300 hover:text-cyan-400' : 'text-gray-700 hover:text-cyan-600'} transition-colors uppercase tracking-widest`}
              >
                {link.label}
              </a>
            ))}
          </div>
        )}
      </div>
    </header>
  );
};

export default Navbar;
