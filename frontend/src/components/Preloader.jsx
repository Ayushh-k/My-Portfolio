import { useEffect, useState } from 'react';
import { Terminal, Cpu, ShieldCheck, Activity, Wifi } from 'lucide-react';

const BOOT_LOGS = [
  { text: '[ SYSTEM_BOOT ] ACCESS_GRANTED_BY_ROOT', color: 'text-cyan-400', delay: 0 },
  { text: '[ KERNEL_SYNC ] CORE_MODULES_DETECTED', color: 'text-cyan-300', delay: 300 },
  { text: '[ AUTH_TOKEN ] VALIDATING_ENCRYPTION_KEYS', color: 'text-cyan-300', delay: 600 },
  { text: '[ NET_UPLINK ] ESTABLISHING_SECURE_BRIDGE', color: 'text-cyan-300', delay: 900 },
  { text: '[ DATA_EXTRACT ] LOADING_BIOGRAPHY_V7.log', color: 'text-emerald-400', delay: 1200 },
  { text: '[ DATA_EXTRACT ] SYNCING_DEPLOYMENT_HISTORY.log', color: 'text-emerald-400', delay: 1400 },
  { text: '[ DATA_EXTRACT ] ACCESSING_ARSENAL_MODULES', color: 'text-emerald-400', delay: 1600 },
  { text: '[ SYSTEM_READY ] PROTOCOL_X_INITIALIZED', color: 'text-cyan-400', delay: 1900 },
  { text: '>> INITIALIZING_SITE_OVERRIDE_SEQUENCE...', color: 'text-white font-black italic', delay: 2200 },
];

const Preloader = () => {
  const [visibleLogs, setVisibleLogs] = useState([]);
  const [progress, setProgress] = useState(0);
  const [isExiting, setIsExiting] = useState(false);
  const [isVisible, setIsVisible] = useState(true);
  const [showSuccess, setShowSuccess] = useState(false);

  useEffect(() => {
    // Reveal logs one by one
    const timers = BOOT_LOGS.map((log, i) =>
      setTimeout(() => {
        setVisibleLogs(prev => [...prev, i]);
      }, log.delay)
    );

    // Progress bar (Energy Capacity Gauge)
    const progressInterval = setInterval(() => {
      setProgress(prev => {
        if (prev >= 100) { 
          clearInterval(progressInterval); 
          setShowSuccess(true);
          return 100; 
        }
        return prev + (Math.random() > 0.8 ? 5 : 1);
      });
    }, 25);

    // Fade out sequence
    const exitTimer = setTimeout(() => setIsExiting(true), 3200);
    const removeTimer = setTimeout(() => setIsVisible(false), 3800);

    return () => {
      timers.forEach(clearTimeout);
      clearInterval(progressInterval);
      clearTimeout(exitTimer);
      clearTimeout(removeTimer);
    };
  }, []);

  if (!isVisible) return null;

  return (
    <div
      className="fixed inset-0 z-[10000] flex flex-col items-center justify-center overflow-hidden"
      style={{
        backgroundColor: '#050b14',
        opacity: isExiting ? 0 : 1,
        transition: 'opacity 0.6s ease-in-out',
      }}
    >
      {/* Background Matrix Effect (Subtle) */}
      <div className="absolute inset-0 opacity-[0.03] pointer-events-none overflow-hidden select-none">
        <div className="flex flex-wrap gap-4 text-[10px] font-mono whitespace-nowrap animate-pulse">
          {Array(100).fill('01 10 SYNC_INIT ').map((t, i) => <span key={i}>{t}</span>)}
        </div>
      </div>

      {/* Terminal Interface */}
      <div
        className={`w-[95vw] md:w-[60vw] max-w-2xl border-2 border-cyan-500/20 bg-[#0a101d]/60 backdrop-blur-xl relative overflow-hidden transition-all duration-500 ${
          isExiting ? 'scale-110 opacity-0 blur-lg' : 'scale-100'
        }`}
      >
        {/* Decorative corner accents */}
        <div className="absolute top-0 left-0 w-8 h-8 border-t-2 border-l-2 border-cyan-500 z-20" />
        <div className="absolute bottom-0 right-0 w-8 h-8 border-b-2 border-r-2 border-cyan-500 z-20" />

        {/* Header Unit */}
        <div className="flex items-center justify-between px-6 py-4 bg-cyan-500/5 border-b border-cyan-500/20">
          <div className="flex items-center gap-3">
            <Cpu className="w-4 h-4 text-cyan-400 animate-pulse" />
            <span className="text-[10px] font-mono text-cyan-400 tracking-[0.3em] uppercase opacity-70">Boot_System.v2</span>
          </div>
          <div className="flex items-center gap-4">
            <div className="flex gap-1">
              <div className={`w-1 h-1 rounded-full ${progress > 25 ? 'bg-cyan-500' : 'bg-gray-800'}`} />
              <div className={`w-1 h-1 rounded-full ${progress > 50 ? 'bg-cyan-500' : 'bg-gray-800'}`} />
              <div className={`w-1 h-1 rounded-full ${progress > 75 ? 'bg-cyan-500' : 'bg-gray-800'}`} />
            </div>
            <span className="text-[10px] font-mono text-cyan-500/50 uppercase tracking-tighter">NODE_ID_AX99</span>
          </div>
        </div>

        {/* Log Stream */}
        <div className="px-8 py-10 min-h-[300px] font-mono text-xs space-y-2 relative">
          {BOOT_LOGS.map((log, i) => (
            <div
              key={i}
              className={`flex items-center gap-3 transition-all duration-500 ${
                visibleLogs.includes(i) ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
              }`}
            >
              <span className={`tracking-tighter ${log.color}`}>{log.text}</span>
              {visibleLogs[visibleLogs.length - 1] === i && !showSuccess && (
                <div className="w-1.5 h-3 bg-cyan-400 animate-pulse" />
              )}
            </div>
          ))}

          {showSuccess && (
            <div className="mt-8 animate-[fadeIn_0.5s_ease-out_forwards]">
              <div className="flex items-center gap-2 text-white font-black italic text-xl tracking-tighter uppercase">
                <ShieldCheck className="w-6 h-6 text-cyan-400" />
                SYSTEM_INITIALIZED_✓
              </div>
              <div className="mt-1 h-[2px] w-full bg-gradient-to-r from-cyan-500 to-transparent animate-[growWidth_1s_ease-in-out]" />
            </div>
          )}
        </div>

        {/* Energy Capacity Gauge (Progress Bar) */}
        <div className="px-8 py-6 bg-cyan-500/5 border-t border-cyan-500/10">
          <div className="flex justify-between items-end mb-3">
            <div>
              <div className="text-[9px] font-mono text-cyan-500/50 uppercase tracking-widest mb-1">Energy_Load_Ratio</div>
              <div className="flex items-center gap-2">
                <Wifi className={`w-3 h-3 ${progress === 100 ? 'text-emerald-500' : 'text-cyan-500'}`} />
                <span className={`text-xl font-black italic tracking-tighter ${progress === 100 ? 'text-emerald-400' : 'text-cyan-400'}`}>
                  {String(progress).padStart(3, '0')}%
                </span>
              </div>
            </div>
            <div className="text-[9px] font-mono text-cyan-500/30 uppercase text-right">
              Core_Stability: <span className="text-cyan-400">OPTIMAL</span><br />
              Uplink: <span className="text-cyan-400">SECURE</span>
            </div>
          </div>
          
          <div className="h-4 bg-gray-900/50 rounded-sm border border-cyan-500/10 p-[2px] relative overflow-hidden">
            <div
              className="h-full bg-gradient-to-r from-cyan-600 via-cyan-400 to-emerald-400 transition-all duration-150 relative"
              style={{ width: `${progress}%` }}
            >
              <div className="absolute inset-0 bg-[linear-gradient(45deg,transparent_25%,rgba(255,255,255,.2)_50%,transparent_75%)] bg-[length:20px_20px] animate-[slideDiagonal_1s_linear_infinite]" />
              {/* Pulsing glow at the tip */}
              <div className="absolute top-0 right-0 h-full w-[10px] bg-white blur-sm opacity-50 shadow-[0_0_15px_rgba(255,255,255,0.8)]" />
            </div>
          </div>
          
          <div className="mt-4 flex justify-between">
            <div className="flex gap-1">
              {Array(10).fill(0).map((_, i) => (
                <div 
                  key={i} 
                  className={`w-1 h-3 rounded-t-sm transition-colors duration-300 ${
                    progress > (i * 10) ? 'bg-cyan-500/40' : 'bg-gray-800'
                  }`} 
                />
              ))}
            </div>
            <div className={`text-[10px] font-mono uppercase tracking-widest ${progress === 100 ? 'text-emerald-500' : 'text-cyan-500/50'}`}>
              {progress === 100 ? 'OVERRIDE_COMPLETE' : 'LOADING_PROTOCOL...'}
            </div>
          </div>
        </div>
      </div>

      {/* Global Status Footer */}
      <div className="mt-12 flex flex-col items-center gap-2 transition-all duration-500">
        <div className="flex items-center gap-6 opacity-40">
           <div className="flex items-center gap-2">
             <div className="w-1.5 h-1.5 rounded-full bg-cyan-500 animate-ping" />
             <span className="text-[10px] font-mono text-white tracking-widest uppercase">SYSCALL_READY</span>
           </div>
           <div className="h-3 w-px bg-white/20" />
           <div className="flex items-center gap-2">
             <Activity className="w-3 h-3 text-cyan-400" />
             <span className="text-[10px] font-mono text-white tracking-widest uppercase">BIOMETRIC_SYNC</span>
           </div>
        </div>
        <div className={`mt-4 text-2xl font-black italic tracking-tighter uppercase transition-opacity duration-300 ${isExiting ? 'opacity-0' : 'opacity-100'}`}>
          AYUSH_<span className="text-cyan-400">KAMBOJ</span>.sys
        </div>
      </div>

      <style dangerouslySetInnerHTML={{ __html: `
        @keyframes growWidth {
          from { width: 0; }
          to { width: 100%; }
        }
        @keyframes slideDiagonal {
          from { background-position: 0 0; }
          to { background-position: 40px 0; }
        }
      `}} />
    </div>
  );
};

export default Preloader;
