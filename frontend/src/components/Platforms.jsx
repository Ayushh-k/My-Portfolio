import { Globe, Code2, Terminal, ArrowRight, Cpu, Zap } from 'lucide-react';
import { useScrollAnimation } from '../hooks/useScrollAnimation';
import { useRef, useState } from 'react';

const platformsData = [
  {
    id: "leetcode",
    name: "LeetCode",
    url: "https://leetcode.com/u/ayush_kamboj/",
    icon: Code2,
    color: "#f59e0b",
    stats: [
      { label: "PROBLEMS_SOLVED", value: "350+" },
      { label: "CONTEST_RATING", value: "1540" },
      { label: "MAX_STREAK", value: "100_DAYS" }
    ],
    status: "ACTIVE_SYNC"
  },
  {
    id: "hackerrank",
    name: "HackerRank",
    url: "https://www.hackerrank.com/profile/ayushkamboj9690",
    icon: Terminal,
    color: "#10b981",
    stats: [
      { label: "PROBLEM_SOLVING", value: "5_STAR" },
      { label: "BADGES", value: "GOLD" },
      { label: "PERCENTILE", value: "Top_5%" }
    ],
    status: "OPTIMIZED"
  },
  {
    id: "hackerearth",
    name: "HackerEarth",
    url: "https://www.hackerearth.com/@ayushkamboj/",
    icon: Globe,
    color: "#8b5cf6",
    stats: [
      { label: "GLOBAL_RANK", value: "Top_10%" },
      { label: "CONTESTS", value: "12_PLAYED" },
      { label: "RATING", value: "1400" }
    ],
    status: "VERIFIED"
  }
];

const Platforms = ({ isDark }) => {
  const sectionRef = useScrollAnimation({ animationType: 'up', threshold: 0.1 });
  const scrollContainerRef = useRef(null);
  const [activeIndex, setActiveIndex] = useState(0);

  const handleScroll = () => {
    if (scrollContainerRef.current) {
      const container = scrollContainerRef.current;
      const firstCard = container.querySelector('.snap-center');
      if (!firstCard) return;
      const cardWidth = firstCard.offsetWidth + 32;
      const newIndex = Math.round(container.scrollLeft / cardWidth);
      if (newIndex !== activeIndex && newIndex >= 0 && newIndex < platformsData.length) {
        setActiveIndex(newIndex);
      }
    }
  };

  const scrollToCard = (index) => {
    if (scrollContainerRef.current) {
      const container = scrollContainerRef.current;
      const firstCard = container.querySelector('.snap-center');
      if (!firstCard) return;
      const cardWidth = firstCard.offsetWidth + 32;
      container.scrollTo({ left: index * cardWidth, behavior: 'smooth' });
    }
  };

  return (
    <section
      id="platforms"
      ref={sectionRef}
      className={`relative py-32 overflow-hidden transition-colors duration-500 ${isDark ? "bg-[#050b14]" : "bg-gray-50"}`}
    >
      {/* Background Micro-Decor */}
      {isDark && (
        <div className="absolute inset-0 pointer-events-none opacity-20">
          <div className="absolute inset-0" style={{ backgroundImage: 'radial-gradient(#1e293b 1px, transparent 1px)', backgroundSize: '40px 40px' }} />
        </div>
      )}

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <div className="text-center mb-20 relative">
          <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 w-32 h-32 bg-cyan-500/10 rounded-full blur-[50px] pointer-events-none" />
          <h2 className={`text-3xl sm:text-4xl md:text-6xl font-black mb-6 tracking-tighter ${isDark ? 'text-white' : 'text-gray-900'} uppercase break-words`}>
            ALGO_ARENAS<span className="text-cyan-500">_v2</span>
          </h2>
          <div className="flex items-center justify-center gap-2 sm:gap-4">
            <div className="h-px w-12 bg-gray-500/30" />
            <p className="font-mono text-[10px] sm:text-xs tracking-[0.1em] sm:tracking-[0.3em] uppercase text-cyan-500/80">Competitive Coding Nodes</p>
            <div className="h-px w-12 bg-gray-500/30" />
          </div>
        </div>

        {/* Horizontal Scroll Stream */}
        <div className="relative">
          {/* Scroll Header Decor */}
          <div className="flex justify-between items-center mb-6 px-2 opacity-50">
            <div className="flex items-center gap-3">
              <div className="w-2 h-2 rounded-full bg-cyan-500" />
              <span className="font-mono text-[9px] text-cyan-500 tracking-[0.3em] uppercase">ARENA_UPLINK_READY</span>
            </div>
            <div className="flex items-center gap-4">
              <span className="font-mono text-[8px] text-gray-500 uppercase tracking-widest hidden sm:block">
                NODE: 0{activeIndex + 1} // 0{platformsData.length}
              </span>
              <span className="font-mono text-[8px] text-gray-500 uppercase tracking-widest">SYNC: V.95.4</span>
            </div>
          </div>

          <div
            ref={scrollContainerRef}
            onScroll={handleScroll}
            className="flex gap-8 pb-8 overflow-x-auto snap-x snap-mandatory hide-scrollbar"
            style={{ scrollBehavior: 'smooth' }}
          >
            {platformsData.map((platform, index) => (
              <a
                key={platform.id}
                href={platform.url}
                target="_blank"
                rel="noopener noreferrer"
                className={`group flex-none w-[300px] sm:w-[420px] flex flex-col relative p-8 rounded-xl border snap-center transition-all duration-500 hover:-translate-y-1 overflow-hidden ${
                  isDark
                  ? "bg-[#0a101d]/60 border-white/5 backdrop-blur-xl hover:border-cyan-500/30 shadow-[0_0_15px_rgba(0,0,0,0.5)]"
                  : "bg-white border-gray-200 shadow-xl hover:border-cyan-500"
                }`}
                style={{ animationDelay: `${index * 0.15}s` }}
              >
                {/* Top Accent Line */}
                <div
                  className="absolute top-0 left-0 w-full h-[2px] opacity-50 group-hover:opacity-100 transition-opacity"
                  style={{ backgroundColor: platform.color, boxShadow: `0 0 10px ${platform.color}` }}
                />

                {/* Module Header */}
                <div className="flex justify-between items-start mb-8">
                  <div
                    className="p-4 rounded-lg flex items-center justify-center border shadow-inner transition-transform duration-500 group-hover:scale-110"
                    style={{
                      backgroundColor: `${platform.color}10`,
                      borderColor: `${platform.color}40`,
                      color: platform.color
                    }}
                  >
                    <platform.icon size={28} />
                  </div>
                  <div className="flex flex-col items-end">
                    <div className="flex items-center gap-2 mb-1">
                      <span className="font-mono text-[8px] text-gray-500 tracking-widest uppercase">NODE_SYNC</span>
                      <div className="w-1.5 h-1.5 rounded-full animate-pulse" style={{ backgroundColor: platform.color }} />
                    </div>
                    <span className="font-mono text-[9px] uppercase tracking-widest opacity-60" style={{ color: platform.color }}>
                      {platform.status}
                    </span>
                  </div>
                </div>

                <h3 className={`text-2xl font-black mb-6 tracking-tighter uppercase ${isDark ? 'text-white' : 'text-gray-900'}`}>
                  {platform.name}
                </h3>

                {/* Telemetry Grid */}
                <div className="space-y-4 mb-8 flex-1">
                  {platform.stats.map((stat, i) => (
                    <div key={i} className={`flex items-center justify-between p-3 rounded bg-white/5 border ${isDark ? 'border-white/5' : 'border-gray-100'}`}>
                      <span className="text-[10px] font-mono text-gray-400 uppercase tracking-widest">{stat.label}</span>
                      <span className={`text-[11px] font-bold font-mono tracking-wide ${isDark ? 'text-gray-200' : 'text-gray-800'}`}>
                        {stat.value}
                      </span>
                    </div>
                  ))}
                </div>

                {/* Bottom Connect */}
                <div className="pt-6 border-t border-white/5 flex items-center justify-between mt-auto">
                  <div className="flex items-center gap-2">
                    <Cpu size={14} className="text-gray-500" />
                    <span className="font-mono text-[9px] text-gray-500 uppercase tracking-widest group-hover:text-cyan-400 transition-colors">
                      ESTABLISH_UPLINK
                    </span>
                  </div>
                  <ArrowRight size={16} className="text-gray-500 group-hover:text-white group-hover:translate-x-1 transition-all" />
                </div>

                {/* Scanline Effect */}
                <div className="absolute inset-0 pointer-events-none opacity-0 group-hover:opacity-20 transition-opacity duration-700 bg-[linear-gradient(rgba(18,16,16,0)_50%,rgba(0,0,0,0.25)_50%),linear-gradient(90deg,rgba(255,0,0,0.06),rgba(0,255,0,0.02),rgba(0,0,255,0.06))] bg-[length:100%_2px,3px_100%]" />
              </a>
            ))}
          </div>

          {/* Dot Pagination */}
          <div className="flex justify-center items-center gap-3 mt-8">
            {platformsData.map((_, i) => (
              <button
                key={i}
                onClick={() => scrollToCard(i)}
                className={`transition-all duration-500 rounded-full ${
                  activeIndex === i
                  ? 'w-8 h-1.5 bg-gradient-to-r from-cyan-500 to-violet-500 shadow-[0_0_10px_rgba(6,182,212,0.5)]'
                  : 'w-1.5 h-1.5 bg-gray-700 hover:bg-gray-500'
                }`}
                aria-label={`Go to platform ${i + 1}`}
              />
            ))}
          </div>

          {/* Bottom Decor */}
          <div className="mt-16 border-t border-white/5 pt-8 flex justify-between items-center px-4 opacity-20">
            <div className="flex items-center gap-4 text-gray-500 font-mono text-[9px] tracking-widest uppercase">
              <Zap size={12} /> Arena_Nodes: ONLINE
            </div>
            <div className="font-mono text-[9px] tracking-widest text-gray-500 uppercase">
              Uplink_Sequence_Complete
            </div>
          </div>
        </div>
      </div>

      <style dangerouslySetInnerHTML={{ __html: `
        .hide-scrollbar::-webkit-scrollbar { display: none; }
        .hide-scrollbar { -ms-overflow-style: none; scrollbar-width: none; }
      `}} />
    </section>
  );
};

export default Platforms;
