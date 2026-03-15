import { Github, Linkedin, Twitter, Mail, Activity, Cpu, ShieldCheck } from 'lucide-react';

const Footer = ({ isDark }) => {
  const currentYear = new Date().getFullYear();

  const quickLinks = [
    { label: 'HOME', href: '#home' },
    { label: 'ABOUT', href: '#about' },
    { label: 'PROJECTS', href: '#projects' },
    { label: 'CONTACT', href: '#contact' }
  ];

  const socialLinks = [
    { icon: Github, href: 'https://github.com/Ayushh-k', label: 'GitHub', color: '#ffffff', glow: 'rgba(255,255,255,0.4)' },
    { icon: Linkedin, href: 'https://linkedin.com/in/ayushkamboj', label: 'LinkedIn', color: '#0077b5', glow: 'rgba(0,119,181,0.5)' },
    { icon: Twitter, href: 'https://twitter.com', label: 'Twitter', color: '#1da1f2', glow: 'rgba(29,161,242,0.5)' },
    { icon: Mail, href: 'mailto:ayushkamboj9690@gmail.com', label: 'Email', color: '#ff4b4b', glow: 'rgba(255,75,75,0.4)' }
  ];

  return (
    <footer
      className={`relative py-16 transition-colors duration-500 overflow-hidden ${isDark ? 'bg-[#030810] border-t border-white/5' : 'bg-gray-100 border-t border-gray-200'}`}
    >
      {/* Background Micro-Text */}
      {isDark && (
        <div className="absolute inset-0 pointer-events-none opacity-[0.03] select-none font-mono text-[10px] leading-relaxed p-4 overflow-hidden mask-fade">
          {Array.from({ length: 20 }).map((_, i) => (
            <div key={i}>
              0x{Math.random().toString(16).slice(2, 8).toUpperCase()} // NODE_INITIALIZED // PROTOCOL_V2 // SYNC_SUCCESS // {Math.random().toFixed(4)}
            </div>
          ))}
        </div>
      )}

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <div className="grid lg:grid-cols-4 md:grid-cols-2 gap-12 mb-16">
          {/* Mainframe ID */}
          <div className="space-y-6">
            <h3 className={`text-2xl font-black tracking-tighter uppercase ${isDark ? 'text-white' : 'text-gray-900'}`}>
              AYUSH_KAMBOJ<span className="text-emerald-500">.sys</span>
            </h3>
            <div className="flex flex-col gap-3 font-mono text-[10px] tracking-widest text-gray-500 uppercase">
              <div className="flex items-center gap-3">
                <Cpu size={12} className="text-emerald-500" /> V_2.5.0_STABLE
              </div>
              <div className="flex items-center gap-3">
                <Activity size={12} className="text-cyan-500" /> NODE_STATUS: ONLINE
              </div>
              <div className="flex items-center gap-3">
                <ShieldCheck size={12} className="text-violet-500" /> AUTH_LVL: ROOT_ADMIN
              </div>
            </div>
          </div>

          {/* Map Nodes (Quick Links) */}
          <div className="space-y-6">
            <h4 className={`font-mono text-xs font-black tracking-[0.3em] uppercase ${isDark ? 'text-gray-400' : 'text-gray-900'}`}>
              SITEMAP_INDEX
            </h4>
            <ul className="space-y-3">
              {quickLinks.map((link) => (
                <li key={link.label}>
                  <a
                    href={link.href}
                    className={`font-mono text-[10px] tracking-widest transition-all duration-300 flex items-center gap-2 group ${isDark ? 'text-gray-500 hover:text-cyan-400' : 'text-gray-600 hover:text-cyan-600'}`}
                  >
                    <span className="w-1.5 h-1.5 rounded-full bg-white/10 group-hover:bg-cyan-500 group-hover:shadow-[0_0_5px_#06b6d4] transition-all" />
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Core Handshake (Socials) */}
          <div className="space-y-6">
            <h4 className={`font-mono text-xs font-black tracking-[0.3em] uppercase ${isDark ? 'text-gray-400' : 'text-gray-900'}`}>
              UPLINK_CONNECTIONS
            </h4>
            <div className="flex flex-wrap gap-4">
              {socialLinks.map((link) => (
                <a
                  key={link.label}
                  href={link.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-10 h-10 rounded-lg bg-white/5 border border-white/5 flex items-center justify-center transition-all duration-300 hover:border-white/20 hover:-translate-y-1"
                  style={{ color: link.color, filter: `drop-shadow(0 0 5px ${link.glow})` }}
                  aria-label={link.label}
                >
                  <link.icon size={18} />
                </a>
              ))}
            </div>
          </div>

          {/* Infrastructure */}
          <div className="space-y-6">
            <h4 className={`font-mono text-xs font-black tracking-[0.3em] uppercase ${isDark ? 'text-gray-400' : 'text-gray-900'}`}>
              LOCATION_DATA
            </h4>
            <div className={`p-4 rounded border transition-all duration-300 ${isDark ? 'bg-white/5 border-white/5 text-gray-400 hover:border-white/10' : 'bg-gray-200 border-gray-300 text-gray-700'}`}>
               <p className="font-mono text-[10px] tracking-widest leading-relaxed">
                  JALANDHAR, PUNJAB, INDIA<br/>
                  COORDS: 31.3260° N, 75.5762° E
               </p>
            </div>
            <div className="flex gap-2">
               {[1, 2, 3, 4, 5].map(i => (
                 <div key={i} className={`h-1 flex-1 rounded-full ${i <= 4 ? 'bg-emerald-500/30 shadow-[0_0_5px_rgba(16,185,129,0.2)]' : 'bg-gray-700'}`} />
               ))}
            </div>
          </div>
        </div>

        {/* Global Terminal Footer */}
        <div className="pt-12 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-6">
          <p className={`font-mono text-[9px] tracking-[0.2em] text-center md:text-left ${isDark ? 'text-gray-600' : 'text-gray-500'}`}>
            &copy; {currentYear} AYUSH_KAMBOJ_INFRASTRUCTURE // ALL_SYSTEMS_OPERATIONAL
          </p>
          <div className="flex items-center gap-3">
             <span className="font-mono text-[9px] text-gray-500 uppercase tracking-widest">Neural_Sync:</span>
             <div className="flex gap-1 group">
                <div className="w-1 h-3 bg-cyan-500 rounded-full animate-pulse shadow-[0_0_8px_#06b6d4]" />
                <div className="w-1 h-3 bg-cyan-500/60 rounded-full animate-pulse shadow-[0_0_5px_#06b6d4]" style={{ animationDelay: '0.2s' }} />
                <div className="w-1 h-3 bg-cyan-500/30 rounded-full animate-pulse shadow-[0_0_3px_#06b6d4]" style={{ animationDelay: '0.4s' }} />
             </div>
          </div>
        </div>
      </div>

      <style>{`
        .mask-fade {
          -webkit-mask-image: linear-gradient(to bottom, black, transparent);
          mask-image: linear-gradient(to bottom, black, transparent);
        }
      `}</style>
    </footer>
  );
};

export default Footer;
