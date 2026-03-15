const SectionDivider = ({ type = 'wave', isDark }) => {
  const bgColor = isDark ? '#111827' : '#f3f4f6'; // gray-900 : gray-50
  const waveColor = isDark ? '#1f2937' : '#ffffff'; // gray-800 : white

  if (type === 'wave') {
    return (
      <div className={`relative h-24 overflow-hidden ${isDark ? 'bg-gray-900' : 'bg-gray-50'}`}>
        <svg
          viewBox="0 0 1200 120"
          preserveAspectRatio="none"
          className="w-full h-full"
        >
          <path
            d="M0,30 Q300,60 600,30 T1200,30 L1200,0 L0,0 Z"
            fill={waveColor}
            className="animate-wave"
          />
          <path
            d="M0,50 Q300,80 600,50 T1200,50 L1200,120 L0,120 Z"
            fill={waveColor}
            className="animate-wave-slow"
            style={{ animationDelay: '0.2s' }}
          />
        </svg>
      </div>
    );
  }

  if (type === 'blob') {
    return (
      <div className={`relative h-32 flex items-center justify-center overflow-hidden ${isDark ? 'bg-gray-900' : 'bg-gray-50'}`}>
        <div className="relative w-48 h-48">
          <div className={`absolute inset-0 rounded-full animate-blob ${isDark ? 'bg-cyan-400/20' : 'bg-cyan-300/20'}`} />
          <div
            className={`absolute inset-0 rounded-full animate-blob animation-delay-2000 ${isDark ? 'bg-emerald-400/20' : 'bg-emerald-300/20'}`}
            style={{ animationDelay: '2s' }}
          />
          <div
            className={`absolute inset-0 rounded-full animate-blob animation-delay-4000 ${isDark ? 'bg-pink-500/20' : 'bg-pink-400/20'}`}
            style={{ animationDelay: '4s' }}
          />
        </div>
      </div>
    );
  }

  if (type === 'diagonal') {
    return (
      <div className={`relative h-20 overflow-hidden ${isDark ? 'bg-gray-900' : 'bg-gray-50'}`}>
        <svg
          viewBox="0 0 1200 120"
          preserveAspectRatio="none"
          className="w-full h-full"
        >
          <path
            d="M0,0 L1200,60 L1200,120 L0,120 Z"
            fill={waveColor}
            className="animate-slide-diagonal"
          />
        </svg>
      </div>
    );
  }

  if (type === 'gradient-wave') {
    return (
      <div className={`relative h-28 overflow-hidden ${isDark ? 'bg-gray-900' : 'bg-gray-50'}`}>
        <svg
          viewBox="0 0 1200 120"
          preserveAspectRatio="none"
          className="w-full h-full"
        >
          <defs>
            <linearGradient id="waveGradient" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#3b82f6" stopOpacity="0.3" />
              <stop offset="50%" stopColor="#8b5cf6" stopOpacity="0.3" />
              <stop offset="100%" stopColor="#ec4899" stopOpacity="0.3" />
            </linearGradient>
          </defs>
          <path
            d="M0,40 Q300,70 600,40 T1200,40 L1200,0 L0,0 Z"
            fill="url(#waveGradient)"
            className="animate-wave"
          />
          <path
            d="M0,60 Q300,90 600,60 T1200,60 L1200,120 L0,120 Z"
            fill={waveColor}
            className="animate-wave-slow"
            style={{ animationDelay: '0.3s' }}
          />
        </svg>
      </div>
    );
  }

  return null;
};

export default SectionDivider;
