import { useState, useEffect } from 'react';
import { Github, Linkedin, Mail, ArrowRight, Database, Activity, Sun, Moon, Menu, X, Download } from 'lucide-react';

const Hero = ({ isDark, toggleDarkMode }) => {
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    const t = setTimeout(() => setLoaded(true), 50);
    return () => clearTimeout(t);
  }, []);

  return (
    <>
      {/* ===== HERO SECTION ===== */}
      <section id="home" className="relative w-full min-h-screen flex flex-col md:flex-row overflow-hidden bg-[#050b14]">
        {/* Bottom fade to differentiate from next section */}
        <div className="absolute bottom-0 left-0 right-0 h-32 z-30 pointer-events-none" style={{ background: 'linear-gradient(to bottom, transparent, #050b14)' }}></div>

        {/* ===== LEFT PANE ===== */}
        <div
          className={`relative w-full md:w-[42%] min-h-[60vh] md:min-h-screen flex-shrink-0 bg-[#0a101d] border-r border-white/5 overflow-hidden transition-all duration-1000 ${loaded ? 'translate-x-0 opacity-100' : '-translate-x-20 opacity-0'}`}
        >
          {/* Glow behind image */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[400px] h-[400px] rounded-full bg-cyan-500/10 blur-[100px] pointer-events-none"></div>

          {/* Profile image fills the pane */}
          <img
            src="/images/profile.jpg"
            alt="Ayush Kamboj"
            className="absolute inset-0 w-full h-full object-cover object-top grayscale"
            onError={(e) => { e.target.style.display = 'none'; }}
          />

          {/* Gradient overlays to blend image into background */}
          <div className="absolute inset-0 bg-gradient-to-t from-[#0a101d] via-[#0a101d]/60 to-[#0a101d]/20 pointer-events-none"></div>
          <div className="absolute inset-0 bg-gradient-to-r from-[#0a101d]/30 via-transparent to-transparent pointer-events-none"></div>

          {/* Name + Accent at bottom — sits above gradients */}
          <div className="absolute bottom-12 left-8 md:left-12 right-8 z-20">
            <h1
              className="text-4xl xs:text-5xl sm:text-6xl lg:text-7xl font-black text-white leading-[1] tracking-tighter"
              style={{ textShadow: '0 4px 40px rgba(0,0,0,0.8)' }}
            >
              Ayush<br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-emerald-400">
                Kamboj.
              </span>
            </h1>

            <div className="w-14 h-1 bg-cyan-400 mt-6 mb-6 shadow-[0_0_12px_rgba(0,243,255,0.6)]"></div>

            {/* Social icons */}
            <div className="flex gap-6">
              <a href="https://github.com/ayushkamboj" target="_blank" rel="noreferrer"
                className="text-white hover:scale-110 transition-all duration-300"
                style={{ filter: 'drop-shadow(0 0 8px rgba(255,255,255,0.5))' }}>
                <Github size={24} />
              </a>
              <a href="https://linkedin.com/in/ayushkamboj" target="_blank" rel="noreferrer"
                className="text-[#0077b5] hover:scale-110 transition-all duration-300"
                style={{ filter: 'drop-shadow(0 0 10px rgba(0,119,181,0.6))' }}>
                <Linkedin size={24} />
              </a>
              <a href="#contact"
                className="text-[#ea4335] hover:scale-110 transition-all duration-300"
                style={{ filter: 'drop-shadow(0 0 10px rgba(234,67,53,0.6))' }}>
                <Mail size={24} />
              </a>
            </div>
          </div>
        </div>

        {/* ===== RIGHT PANE ===== */}
        <div
          className={`relative flex-1 flex flex-col justify-center px-8 md:px-14 lg:px-20 py-32 md:py-0 bg-[#050b14] overflow-hidden transition-all duration-1000 delay-300 ${loaded ? 'translate-y-0 opacity-100' : 'translate-y-20 opacity-0'}`}
        >
          {/* Right pane glow */}
          <div className="absolute bottom-0 right-0 w-[500px] h-[500px] rounded-full bg-emerald-500/5 blur-[140px] pointer-events-none translate-x-1/2 translate-y-1/2"></div>

          {/* Content */}
          <div className="max-w-[460px] z-10 relative">
            <p className="text-cyan-400 font-mono text-xs tracking-[0.2em] uppercase mb-5 flex items-center gap-3">
              <span className="w-8 h-px bg-cyan-400"></span> Introduction
            </p>
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-sans font-semibold text-white mb-6 leading-[1.2]">
              Full Stack Developer &<br />System Builder.
            </h2>
            <p className="text-gray-400 mb-12 text-sm md:text-base leading-relaxed font-mono">
              Based in India. I specialize in robust backend architectures, 
              scalable systems, and crafting pixel-perfect interactive web experiences.
            </p>

            <div className="flex flex-row items-center gap-6 mt-0">
              <a href="#about" className="group inline-flex items-center gap-3 text-cyan-400 font-bold hover:text-cyan-300 transition-colors text-base uppercase tracking-widest">
                My story
                <ArrowRight className="group-hover:translate-x-2 transition-transform" size={20} />
              </a>
              <a
                href="/resume.pdf"
                download
                className="group inline-flex items-center gap-2 px-5 py-2.5 rounded-lg font-bold uppercase tracking-widest text-sm transition-all hover:-translate-y-0.5"
                style={{
                  border: '1px solid rgba(0,243,255,0.4)',
                  color: '#00f3ff',
                  background: 'rgba(0,243,255,0.06)',
                  boxShadow: '0 0 12px rgba(0,243,255,0.1)',
                }}
                onMouseEnter={e => e.currentTarget.style.boxShadow = '0 0 20px rgba(0,243,255,0.3)'}
                onMouseLeave={e => e.currentTarget.style.boxShadow = '0 0 12px rgba(0,243,255,0.1)'}
              >
                <Download size={16} className="group-hover:translate-y-0.5 transition-transform" />
                Resume
              </a>
            </div>
          </div>

          {/* Floating Mockup Cards */}
          <div className="hidden xl:block absolute right-[-20px] top-0 bottom-0 w-[380px] pointer-events-none">

            {/* Card 1 — Server Metrics */}
            <div
              className="absolute right-[15%] top-[20%] bg-[#0f172a]/90 backdrop-blur-xl p-5 rounded-2xl border border-white/8 w-60 shadow-[0_20px_60px_rgba(0,0,0,0.5)] animate-wave-slow pointer-events-auto"
              style={{ animationDelay: '0s' }}
            >
              <div className="flex items-center justify-between mb-4 border-b border-white/10 pb-3">
                <span className="text-[10px] font-bold text-gray-300 tracking-widest uppercase">Server Metrics</span>
                <Activity size={13} className="text-emerald-400" />
              </div>
              <div className="text-3xl font-mono font-bold text-white mb-3">
                98.2<span className="text-sm text-cyan-400">%</span>
              </div>
              <div className="h-1 bg-gray-800 rounded-full overflow-hidden">
                <div className="h-full bg-emerald-400 w-[98%] shadow-[0_0_6px_#00ff41]"></div>
              </div>
            </div>

            {/* Card 2 — Code Snippet */}
            <div
              className="absolute right-[0%] top-[48%] bg-[#0a101d]/95 backdrop-blur-md p-4 rounded-2xl border border-cyan-500/20 w-68 shadow-[0_20px_60px_rgba(0,0,0,0.5)] animate-wave pointer-events-auto"
              style={{ animationDelay: '0.8s', width: '270px' }}
            >
              <div className="flex gap-1.5 mb-3">
                <div className="w-2.5 h-2.5 rounded-full bg-red-500/70"></div>
                <div className="w-2.5 h-2.5 rounded-full bg-yellow-500/70"></div>
                <div className="w-2.5 h-2.5 rounded-full bg-green-500/70"></div>
              </div>
              <div className="font-mono text-[10px] text-gray-400 leading-relaxed">
                <span className="text-pink-400">async</span> <span className="text-cyan-300">function</span>{' '}
                <span className="text-emerald-400">deploy</span>() {'{'}<br />
                &nbsp;&nbsp;<span className="text-cyan-300">const</span> env = <span className="text-yellow-300">'prod'</span>;<br />
                &nbsp;&nbsp;<span className="text-pink-400">await</span> server.<span className="text-emerald-400">init</span>(env);<br />
                &nbsp;&nbsp;console.<span className="text-cyan-300">log</span>(<span className="text-yellow-300">'✓ Online'</span>);<br />
                {'}'}
              </div>
            </div>

            {/* Card 3 — Database */}
            <div
              className="absolute right-[25%] top-[78%] bg-[#0f172a]/80 backdrop-blur-xl p-4 rounded-2xl border border-white/5 w-52 shadow-[0_20px_60px_rgba(0,0,0,0.5)] animate-slide-diagonal pointer-events-auto"
              style={{ animationDelay: '1.6s' }}
            >
              <div className="flex items-center gap-3">
                <div className="p-2 bg-emerald-500/20 rounded-lg text-emerald-400 shrink-0">
                  <Database size={15} />
                </div>
                <div>
                  <div className="text-xs font-bold text-gray-200">Cluster 01</div>
                  <div className="text-[10px] text-emerald-400 font-mono">● Connected</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default Hero;
