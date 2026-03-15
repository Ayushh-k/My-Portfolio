const AnimatedGradientBackground = ({ isDark }) => {
  if (isDark) {
    return (
      <div className="fixed inset-0 -z-10 overflow-hidden">
        {/* Dark mode gradient background */}
        <div
          className="absolute inset-0 opacity-80"
          style={{
            background: `linear-gradient(-45deg, #0f172a, #1e1b4b, #312e81, #3730a3, #1e1b4b)`,
            backgroundSize: '400% 400%',
            animation: 'gradientShift 15s ease infinite',
          }}
        />
        
        {/* Animated overlay with blur */}
        <div
          className="absolute inset-0"
          style={{
            background: `linear-gradient(45deg, rgba(139, 92, 246, 0.1), rgba(59, 130, 246, 0.1), rgba(236, 72, 153, 0.1))`,
            backgroundSize: '400% 400%',
            animation: 'gradientShift 20s ease infinite reverse',
            backdropFilter: 'blur(100px)',
          }}
        />

        {/* Additional subtle moving elements */}
        <div
          className="absolute -top-40 -right-40 w-80 h-80 bg-emerald-400/20 rounded-full blur-3xl"
          style={{
            animation: 'pulse 8s ease-in-out infinite',
          }}
        />
        <div
          className="absolute -bottom-40 -left-40 w-80 h-80 bg-cyan-400/20 rounded-full blur-3xl"
          style={{
            animation: 'pulse 10s ease-in-out infinite',
            animationDelay: '2s',
          }}
        />
      </div>
    );
  }

  // Light mode gradient background
  return (
    <div className="fixed inset-0 -z-10 overflow-hidden">
      {/* Light mode gradient background */}
      <div
        className="absolute inset-0"
        style={{
          background: `linear-gradient(-45deg, #f8fafc, #f0f9ff, #faf5ff, #fdf2f8, #f0f9ff)`,
          backgroundSize: '400% 400%',
          animation: 'gradientShift 15s ease infinite',
        }}
      />

      {/* Animated overlay */}
      <div
        className="absolute inset-0"
        style={{
          background: `linear-gradient(45deg, rgba(139, 92, 246, 0.05), rgba(59, 130, 246, 0.05), rgba(236, 72, 153, 0.05))`,
          backgroundSize: '400% 400%',
          animation: 'gradientShift 20s ease infinite reverse',
        }}
      />

      {/* Subtle moving elements */}
      <div
        className="absolute -top-40 -right-40 w-80 h-80 bg-purple-200/30 rounded-full blur-3xl"
        style={{
          animation: 'pulse 8s ease-in-out infinite',
        }}
      />
      <div
        className="absolute -bottom-40 -left-40 w-80 h-80 bg-cyan-200/30 rounded-full blur-3xl"
        style={{
          animation: 'pulse 10s ease-in-out infinite',
          animationDelay: '2s',
        }}
      />
    </div>
  );
};

export default AnimatedGradientBackground;
