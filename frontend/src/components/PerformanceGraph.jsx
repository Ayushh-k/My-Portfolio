import { useRef, useEffect, useState } from 'react';
import { useScrollAnimation } from '../hooks/useScrollAnimation';
import { Activity, TrendingUp, Code2, Zap, Terminal, Target } from 'lucide-react';

// ── Animated Bar Chart ─────────────────────────────────────────────────────────
const BarChart = ({ data, color, isDark }) => {
  const [animated, setAnimated] = useState(false);
  const ref = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(([e]) => {
      if (e.isIntersecting) { setAnimated(true); observer.disconnect(); }
    }, { threshold: 0.3 });
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  const max = Math.max(...data.map(d => d.value));

  return (
    <div ref={ref} className="flex items-end gap-3 h-40 w-full">
      {data.map((d, i) => (
        <div key={i} className="flex flex-col items-center gap-2 flex-1 h-full justify-end">
          <span className="font-mono text-[10px] font-bold" style={{ color }}>{d.value}</span>
          <div className="w-full rounded-t-md relative overflow-hidden" style={{
            height: animated ? `${(d.value / max) * 100}%` : '4px',
            backgroundColor: `${color}20`,
            border: `1px solid ${color}40`,
            transition: `height 1s ${i * 0.15}s cubic-bezier(0.34,1.56,0.64,1)`
          }}>
            <div className="absolute inset-0 rounded-t-md" style={{ backgroundColor: color, opacity: 0.85 }} />
            <div className="absolute inset-0 w-full h-full bg-gradient-to-t from-transparent via-white/10 to-white/20" />
          </div>
          <span className={`font-mono text-[9px] uppercase tracking-wider text-center leading-tight ${isDark ? 'text-gray-500' : 'text-gray-400'}`}>{d.label}</span>
        </div>
      ))}
    </div>
  );
};

// ── SVG Line Chart ──────────────────────────────────────────────────────────────
const LineChart = ({ data, color, isDark }) => {
  const [progress, setProgress] = useState(0);
  const ref = useRef(null);
  const W = 300, H = 110;
  const pad = { x: 8, y: 8 };

  useEffect(() => {
    const observer = new IntersectionObserver(([e]) => {
      if (e.isIntersecting) {
        let start = null;
        const animate = (ts) => {
          if (!start) start = ts;
          const p = Math.min((ts - start) / 1200, 1);
          setProgress(p);
          if (p < 1) requestAnimationFrame(animate);
        };
        requestAnimationFrame(animate);
        observer.disconnect();
      }
    }, { threshold: 0.3 });
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  const min = Math.min(...data.map(d => d.value));
  const max = Math.max(...data.map(d => d.value));
  const range = max - min || 1;

  const pts = data.map((d, i) => ({
    x: pad.x + (i / (data.length - 1)) * (W - pad.x * 2),
    y: pad.y + (1 - (d.value - min) / range) * (H - pad.y * 2),
  }));

  // Take only up to progress
  const visibleCount = Math.max(2, Math.ceil(progress * pts.length));
  const visible = pts.slice(0, visibleCount);

  const linePath = visible.map((p, i) => `${i === 0 ? 'M' : 'L'} ${p.x.toFixed(1)} ${p.y.toFixed(1)}`).join(' ');
  const areaPath = visible.length > 1
    ? `${linePath} L ${visible[visible.length - 1].x.toFixed(1)} ${H} L ${visible[0].x.toFixed(1)} ${H} Z`
    : '';

  return (
    <div ref={ref} className="w-full">
      <svg width="100%" viewBox={`0 0 ${W} ${H}`} preserveAspectRatio="none" style={{ height: '110px' }}>
        <defs>
          <linearGradient id={`area-${color.replace('#','')}`} x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor={color} stopOpacity="0.3" />
            <stop offset="100%" stopColor={color} stopOpacity="0.0" />
          </linearGradient>
        </defs>
        {areaPath && <path d={areaPath} fill={`url(#area-${color.replace('#','')})`} />}
        {linePath && (
          <path d={linePath} stroke={color} strokeWidth="2" fill="none"
            style={{ filter: `drop-shadow(0 0 4px ${color})` }} />
        )}
        {visible.map((p, i) => (
          <circle key={i} cx={p.x} cy={p.y} r="3" fill={color}
            style={{ filter: `drop-shadow(0 0 4px ${color})` }} />
        ))}
      </svg>
      <div className="flex justify-between mt-1">
        {data.map((d, i) => (
          <span key={i} className={`font-mono text-[8px] ${isDark ? 'text-gray-600' : 'text-gray-400'}`}>{d.label}</span>
        ))}
      </div>
    </div>
  );
};

// ── Radial Progress ─────────────────────────────────────────────────────────────
const RadialProgress = ({ value, max = 100, color, size = 80, label }) => {
  const [animated, setAnimated] = useState(false);
  const ref = useRef(null);
  const r = (size / 2) - 7;
  const circ = 2 * Math.PI * r;
  const pct = animated ? value / max : 0;
  const dash = pct * circ;

  useEffect(() => {
    const observer = new IntersectionObserver(([e]) => {
      if (e.isIntersecting) { setAnimated(true); observer.disconnect(); }
    }, { threshold: 0.3 });
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  return (
    <div ref={ref} className="flex flex-col items-center gap-2">
      <svg width={size} height={size} style={{ transform: 'rotate(-90deg)' }}>
        <circle cx={size/2} cy={size/2} r={r} fill="none" stroke="rgba(255,255,255,0.05)" strokeWidth="6" />
        <circle cx={size/2} cy={size/2} r={r} fill="none" stroke={color} strokeWidth="6"
          strokeDasharray={`${dash} ${circ}`}
          style={{ transition: 'stroke-dasharray 1.2s cubic-bezier(0.34,1.56,0.64,1)', filter: `drop-shadow(0 0 4px ${color})` }}
        />
      </svg>
      <div className="font-mono text-center -mt-1">
        <div className="text-xs font-black" style={{ color }}>{value}%</div>
        <div className="text-[8px] text-gray-500 uppercase tracking-widest">{label}</div>
      </div>
    </div>
  );
};

// ── Main Section ────────────────────────────────────────────────────────────────
const PerformanceGraph = ({ isDark }) => {
  const sectionRef = useScrollAnimation({ animationType: 'up' });

  const problemsData = [
    { label: 'Easy', value: 145 },
    { label: 'Medium', value: 172 },
    { label: 'Hard', value: 33 },
  ];

  const ratingData = [
    { label: 'Jan', value: 1200 },
    { label: 'Mar', value: 1310 },
    { label: 'May', value: 1380 },
    { label: 'Jul', value: 1420 },
    { label: 'Sep', value: 1490 },
    { label: 'Nov', value: 1540 },
  ];

  const radialStats = [
    { label: 'DSA', value: 88, color: '#f59e0b' },
    { label: 'Full Stack', value: 85, color: '#10b981' },
    { label: 'Databases', value: 80, color: '#8b5cf6' },
    { label: 'Problem Sol.', value: 82, color: '#00f3ff' },
  ];

  const streakData = [
    { label: 'Mon', value: 3 },
    { label: 'Tue', value: 6 },
    { label: 'Wed', value: 4 },
    { label: 'Thu', value: 8 },
    { label: 'Fri', value: 5 },
    { label: 'Sat', value: 9 },
    { label: 'Sun', value: 7 },
  ];

  return (
    <section
      id="performance"
      ref={sectionRef}
      className={`relative py-32 overflow-hidden transition-colors duration-500 ${isDark ? 'bg-[#050b14]' : 'bg-white'}`}
    >
      {/* Background Grid */}
      {isDark && (
        <div className="absolute inset-0 pointer-events-none opacity-10">
          <div className="absolute inset-0" style={{ backgroundImage: 'linear-gradient(rgba(6,182,212,0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(6,182,212,0.1) 1px, transparent 1px)', backgroundSize: '60px 60px' }} />
        </div>
      )}

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        {/* Header */}
        <div className="text-center mb-20">
          <h2 className={`text-3xl sm:text-4xl md:text-6xl font-black mb-6 tracking-tighter uppercase ${isDark ? 'text-white' : 'text-gray-900'}`}>
            PERF_METRICS<span className="text-cyan-500">.sys</span>
          </h2>
          <div className="flex items-center justify-center gap-4">
            <div className="h-px w-12 bg-gray-500/30" />
            <p className="font-mono text-xs tracking-[0.3em] uppercase text-cyan-500/80">Real-Time Coding Analytics</p>
            <div className="h-px w-12 bg-gray-500/30" />
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">

          {/* Card 1: Problem Breakdown Bar Chart */}
          <div className={`p-8 rounded-xl border transition-all duration-300 ${isDark ? 'bg-[#0a101d]/80 border-white/5 backdrop-blur-xl' : 'bg-gray-50 border-gray-200 shadow-lg'}`}>
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center gap-3">
                <div className="p-2 rounded-lg" style={{ backgroundColor: '#f59e0b20', border: '1px solid #f59e0b40' }}>
                  <Code2 size={16} style={{ color: '#f59e0b' }} />
                </div>
                <div>
                  <h3 className={`font-mono text-sm font-black uppercase tracking-widest ${isDark ? 'text-white' : 'text-gray-900'}`}>Problems Solved</h3>
                  <p className="font-mono text-[9px] text-gray-500 uppercase tracking-wider">LeetCode • 350+ Total</p>
                </div>
              </div>
              <span className="font-mono text-[9px] text-emerald-500 tracking-widest border border-emerald-500/30 bg-emerald-500/10 px-2 py-1 rounded">SYNCED</span>
            </div>
            <BarChart data={problemsData} color="#f59e0b" isDark={isDark} />
          </div>

          {/* Card 2: Contest Rating Line Chart */}
          <div className={`p-8 rounded-xl border transition-all duration-300 ${isDark ? 'bg-[#0a101d]/80 border-white/5 backdrop-blur-xl' : 'bg-gray-50 border-gray-200 shadow-lg'}`}>
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center gap-3">
                <div className="p-2 rounded-lg" style={{ backgroundColor: '#00f3ff20', border: '1px solid #00f3ff40' }}>
                  <TrendingUp size={16} style={{ color: '#00f3ff' }} />
                </div>
                <div>
                  <h3 className={`font-mono text-sm font-black uppercase tracking-widest ${isDark ? 'text-white' : 'text-gray-900'}`}>Rating Progression</h3>
                  <p className="font-mono text-[9px] text-gray-500 uppercase tracking-wider">Contest Rating • Peak 1540</p>
                </div>
              </div>
              <div className="flex items-center gap-1">
                <div className="w-1.5 h-1.5 rounded-full bg-cyan-500 animate-pulse" />
                <span className="font-mono text-[9px] text-cyan-500 tracking-widest">LIVE</span>
              </div>
            </div>
            <LineChart data={ratingData} color="#00f3ff" isDark={isDark} />
            <div className={`mt-4 pt-4 border-t ${isDark ? 'border-white/5' : 'border-gray-100'} flex justify-between`}>
              <div>
                <p className="font-mono text-[8px] text-gray-500 uppercase tracking-widest">Start Rating</p>
                <p className="font-mono text-xs font-bold text-gray-400">1200</p>
              </div>
              <div className="text-right">
                <p className="font-mono text-[8px] text-gray-500 uppercase tracking-widest">Current</p>
                <p className="font-mono text-xs font-bold" style={{ color: '#00f3ff' }}>1540</p>
              </div>
            </div>
          </div>

          {/* Card 3: Skill Proficiency Radials */}
          <div className={`p-8 rounded-xl border transition-all duration-300 ${isDark ? 'bg-[#0a101d]/80 border-white/5 backdrop-blur-xl' : 'bg-gray-50 border-gray-200 shadow-lg'}`}>
            <div className="flex items-center gap-3 mb-8">
              <div className="p-2 rounded-lg" style={{ backgroundColor: '#10b98120', border: '1px solid #10b98140' }}>
                <Target size={16} style={{ color: '#10b981' }} />
              </div>
              <div>
                <h3 className={`font-mono text-sm font-black uppercase tracking-widest ${isDark ? 'text-white' : 'text-gray-900'}`}>Skill Proficiency</h3>
                <p className="font-mono text-[9px] text-gray-500 uppercase tracking-wider">Self-assessed & project-validated</p>
              </div>
            </div>
            <div className="grid grid-cols-4 gap-4 justify-items-center">
              {radialStats.map((s, i) => (
                <RadialProgress key={i} value={s.value} color={s.color} label={s.label} size={76} />
              ))}
            </div>
          </div>

          {/* Card 4: Weekly Activity */}
          <div className={`p-8 rounded-xl border transition-all duration-300 ${isDark ? 'bg-[#0a101d]/80 border-white/5 backdrop-blur-xl' : 'bg-gray-50 border-gray-200 shadow-lg'}`}>
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center gap-3">
                <div className="p-2 rounded-lg" style={{ backgroundColor: '#8b5cf620', border: '1px solid #8b5cf640' }}>
                  <Activity size={16} style={{ color: '#8b5cf6' }} />
                </div>
                <div>
                  <h3 className={`font-mono text-sm font-black uppercase tracking-widest ${isDark ? 'text-white' : 'text-gray-900'}`}>Weekly Commits</h3>
                  <p className="font-mono text-[9px] text-gray-500 uppercase tracking-wider">Active Coding Streak</p>
                </div>
              </div>
              <span className="font-mono text-[9px] text-violet-400 tracking-widest border border-violet-500/30 bg-violet-500/10 px-2 py-1 rounded">100-DAY STREAK</span>
            </div>
            <BarChart data={streakData} color="#8b5cf6" isDark={isDark} />
          </div>

        </div>

        {/* Bottom Terminal Strip */}
        <div className="mt-12 border-t border-white/5 pt-8 flex flex-wrap justify-between items-center gap-4 px-2 opacity-30">
          <div className="flex items-center gap-4 font-mono text-[9px] text-gray-500 uppercase tracking-widest">
            <Terminal size={10} /> Analytics_Engine: v3.7.0
          </div>
          <div className="flex items-center gap-4 font-mono text-[9px] text-gray-500 uppercase tracking-widest">
            <Zap size={10} /> Refresh_Cycle: 24HR
          </div>
        </div>
      </div>

      <style dangerouslySetInnerHTML={{ __html: `
        #performance .skill-bar { transition: width 1s ease-out; }
      `}} />
    </section>
  );
};

export default PerformanceGraph;
