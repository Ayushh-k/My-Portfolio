import { useScrollAnimation } from '../hooks/useScrollAnimation';
import { useState, useEffect } from 'react';
import { Cpu, Database, Fingerprint, Terminal as TerminalIcon, ShieldCheck } from 'lucide-react';

const About = ({ isDark }) => {
  const sectionRef = useScrollAnimation({ animationType: 'up' });
  const [displayedCode, setDisplayedCode] = useState('');

  const codeText = `// INITIALIZING_HANDSHAKE
const developer = {
  id: "AYUSH_KAMBOJ",
  class: "B.Tech_CS",
  origin: "LPU_India",
  status: "ACTIVE_SYNC",
  focus: ["MERN", "System_Arch"],
  mission: "ENGINEER_INNOVATION"
};

// HANDSHAKE_COMPLETE
developer.execute_biography();`;

  useEffect(() => {
    let index = 0;
    const interval = setInterval(() => {
      if (index < codeText.length) {
        setDisplayedCode(codeText.substring(0, index + 1));
        index++;
      } else {
        clearInterval(interval);
      }
    }, 20);

    return () => clearInterval(interval);
  }, []);

  return (
    <section
      id="about"
      ref={sectionRef}
      className={`relative py-32 overflow-hidden transition-colors duration-500 ${isDark ? "bg-[#050b14]" : "bg-white"}`}
    >
      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <div className="text-center mb-20">
          <h2 className={`font-black mb-6 tracking-tighter ${isDark ? 'text-white' : 'text-gray-900'} uppercase section-header-text`}>
            CORE_BIOGRAPHY<span className="text-cyan-500">.exe</span>
          </h2>
          <div className="flex items-center justify-center gap-4">
            <div className="h-px w-12 bg-gray-500/30" />
            <p className="font-mono text-xs tracking-[0.3em] uppercase text-cyan-500/80">Kernel Identity Specifications</p>
            <div className="h-px w-12 bg-gray-500/30" />
          </div>
        </div>

        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Spec Sheet */}
          <div className="space-y-8">
            <div className={`p-8 rounded-xl border relative group ${isDark ? 'bg-white/5 border-white/5 backdrop-blur-md' : 'bg-gray-50 border-gray-200'}`}>
               <div className="absolute top-0 left-0 w-2 h-2 border-t-2 border-l-2 border-cyan-500 -translate-x-1 -translate-y-1" />
               <div className="absolute bottom-0 right-0 w-2 h-2 border-b-2 border-r-2 border-cyan-500 translate-x-1 translate-y-1" />
               
              <h3 className={`text-3xl font-black mb-8 leading-tight tracking-tighter ${isDark ? 'text-white' : 'text-gray-900'} uppercase`}>
                High-Performance <br/>Software <span className="text-emerald-500">Architect</span>
              </h3>
              
              <div className="space-y-6">
                <p className={`font-mono text-sm leading-relaxed ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
                  Handshake initiated. I am Ayush Kamboj, a B.Tech Computer Science engineer currently interfacing at Lovely Professional University. My central processor is optimized for Full Stack development, with a primary mission to architect scalable, resilient digital ecosystems.
                </p>
                {/* Spec Sheet Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-8">
                {[
                  { label: 'PROCESSOR', value: 'RYZEN_9_5900X', color: 'text-cyan-500' },
                  { label: 'STORAGE', value: '4.2TB_NVME', color: 'text-emerald-500' },
                  { label: 'ID_TOKEN', value: 'AK_0921_X', color: 'text-amber-500' },
                  { label: 'PROTOCOL', value: 'STABLE_UPLINK', color: 'text-cyan-500' }
                ].map((spec, i) => (
                  <div key={i} className="p-4 rounded-lg bg-white/5 border border-white/5 group hover:border-white/10 transition-colors">
                    <span className="block font-mono text-[9px] text-gray-500 tracking-widest mb-1">{spec.label}</span>
                    <span className={`font-mono text-xs font-black tracking-tighter ${spec.color}`}>{spec.value}</span>
                  </div>
                ))}
            </div>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row gap-4 mobile-stack-force">
               <div className="flex-1 p-4 rounded-lg bg-emerald-500/5 border border-emerald-500/20 text-[10px] font-mono tracking-widest text-emerald-500 uppercase">
                  Sys_Status: OPTIMIZED
               </div>
               <div className="flex-1 p-4 rounded-lg bg-cyan-500/5 border border-cyan-500/20 text-[10px] font-mono tracking-widest text-cyan-500 uppercase">
                  Latency: 12ms
               </div>
            </div>
          </div>

          {/* Terminal Display */}
          <div className="relative group">
            <div className="absolute -inset-1 bg-gradient-to-r from-cyan-500 to-emerald-500 rounded-xl blur opacity-25 group-hover:opacity-40 transition duration-1000 group-hover:duration-200" />
            <div className={`relative p-8 rounded-xl font-mono text-sm leading-relaxed overflow-hidden shadow-2xl ${
                isDark ? "bg-[#0a101d] text-cyan-400 border border-white/10" : "bg-gray-900 text-cyan-400 border border-gray-800"
              }`}
            >
              <div className="flex items-center justify-between mb-8 border-b border-white/10 pb-4">
                <div className="flex gap-2">
                  <div className="w-3 h-3 rounded-full bg-red-500/50" />
                  <div className="w-3 h-3 rounded-full bg-yellow-500/50" />
                  <div className="w-3 h-3 rounded-full bg-green-500/50" />
                </div>
                <div className="flex items-center gap-2 text-[10px] text-gray-400 tracking-widest">
                  <TerminalIcon size={12} /> BASH // CORE_KERNEL
                </div>
              </div>
              
              <div className="min-h-[280px]">
                <pre className="whitespace-pre-wrap">
                  {displayedCode}
                  <span className="inline-block w-2 h-5 ml-1 bg-emerald-500 animate-pulse" />
                </pre>
              </div>

              {/* Bottom Telemetry */}
              <div className="mt-8 pt-4 border-t border-white/5 flex items-center justify-between opacity-30">
                 <span className="text-[8px] uppercase tracking-widest">Mem: 16GT/s</span>
                 <span className="text-[8px] uppercase tracking-widest">Load: 0.12%</span>
                 <span className="text-[8px] uppercase tracking-widest text-emerald-500">0x00_SUCCESS</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
