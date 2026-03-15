import { useEffect, useState } from "react";
import {
  Navbar,
  Hero,
  About,
  Skills,
  Experience,
  Education,
  Projects,
  GitHubStats,
  Certifications,
  Contact,
  Footer,
  Preloader,
  ScrollToTop,
  WaveBackground,
  CustomCursor,
  TypoLoop,
  Platforms,
} from "./components";

function App() {
  const [isDark, setIsDark] = useState(true); // Strictly default to dark mode

  useEffect(() => {
    // Update document class
    if (isDark) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }, [isDark]);

  const toggleDarkMode = () => {
    setIsDark((prev) => !prev);
  };

  return (
    <>
      <CustomCursor />
      <Preloader />
      <div className={isDark ? "dark" : ""} style={{ position: "relative", zIndex: 50 }}>
        <Navbar isDark={isDark} toggleDarkMode={toggleDarkMode} />
        <div
          className={`${isDark ? "bg-gray-900/90 text-white" : "bg-white/90 text-gray-900"} transition-colors duration-300 grid-background page-fade-in`}
          style={{
            background: isDark ? 
              'linear-gradient(135deg, #050b14 0%, #0a192f 50%, #020c1b 100%)' : 
              '#f8fbfb'
          }}
        >
          {/* Hero Section with Wave Background */}
          <div style={{ position: "relative", backgroundColor: "transparent", zIndex: 10, overflow: "hidden" }}>
            <WaveBackground isDark={isDark} />
            <div style={{ position: "relative", zIndex: 20 }}>
              <Hero isDark={isDark} toggleDarkMode={toggleDarkMode} />
            </div>
          </div>
          
          <TypoLoop />
          <About isDark={isDark} />
          <Skills isDark={isDark} />
          <Experience isDark={isDark} />
          <Education isDark={isDark} />
          <Projects isDark={isDark} />
          <GitHubStats isDark={isDark} username="Ayushh-k" />
          <Platforms isDark={isDark} />
          <Certifications isDark={isDark} />
          <Contact isDark={isDark} />
          <Footer isDark={isDark} />
          <ScrollToTop isDark={isDark} />
        </div>
      </div>
    </>
  );
}

export default App;
