import React, { useMemo } from "react";

const ParticlesBackground = ({ isDark }) => {
  // Generate random particles
  const particles = useMemo(() => {
    return Array.from({ length: isDark ? 80 : 60 }, (_, i) => ({
      id: i,
      left: Math.random() * 100,
      top: Math.random() * 100,
      size: Math.random() * 4 + 3,
      duration: Math.random() * 20 + 25,
      delay: Math.random() * 8,
      moveX: (Math.random() - 0.5) * 300,
    }));
  }, [isDark]);

  const particleColor = isDark ? "#60a5fa" : "#3b82f6";
  const glowColor = isDark ? "rgba(96, 165, 250, 0.8)" : "rgba(59, 130, 246, 0.6)";

  return (
    <div
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        zIndex: 1,
        pointerEvents: "none",
        overflow: "hidden",
      }}
    >
      <style>{`
        @keyframes float-particle {
          0% {
            transform: translateY(100vh) translateX(0px);
            opacity: 0;
          }
          3% {
            opacity: 1;
          }
          97% {
            opacity: 1;
          }
          100% {
            transform: translateY(-100vh) translateX(var(--moveX));
            opacity: 0;
          }
        }
        
        .floating-particle {
          position: fixed;
          border-radius: 50%;
          animation: float-particle linear infinite;
          will-change: transform;
          pointer-events: none;
        }
      `}</style>

      {particles.map((particle) => (
        <div
          key={particle.id}
          className="floating-particle"
          style={{
            left: `${particle.left}%`,
            top: `${particle.top}%`,
            width: `${particle.size}px`,
            height: `${particle.size}px`,
            background: particleColor,
            boxShadow: `0 0 ${particle.size * 2}px ${glowColor}, 0 0 ${particle.size * 4}px ${glowColor}`,
            animationDuration: `${particle.duration}s`,
            animationDelay: `${particle.delay}s`,
            opacity: isDark ? 0.9 : 0.85,
            "--moveX": `${particle.moveX}px`,
          }}
        />
      ))}
    </div>
  );
};

export default ParticlesBackground;
