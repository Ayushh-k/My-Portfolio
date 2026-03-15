import React, { useEffect, useRef } from "react";

const WaveBackground = ({ isDark }) => {
  const canvasRef = useRef(null);
  const particlesRef = useRef([]);
  const mouseRef = useRef({ x: 0, y: 0 });

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    resizeCanvas();

    let animationId;
    let time = 0;

    // Track mouse
    const handleMouseMove = (e) => {
      mouseRef.current = { x: e.clientX, y: e.clientY };
    };
    window.addEventListener("mousemove", handleMouseMove);

    // Initialize particles
    const initializeParticles = () => {
      particlesRef.current = [];
      const particleCount = 150;

      for (let i = 0; i < particleCount; i++) {
        particlesRef.current.push({
          x: Math.random() * canvas.width,
          y: Math.random() * canvas.height * 0.8,
          size: Math.random() * 1 + 0.5,
          speedX: (Math.random() * 0.5 - 0.25) * 0.5,
          speedY: (Math.random() * 0.5 - 0.25) * 0.5,
          originalX: 0,
          originalY: 0,
          opacity: Math.random() * 0.6 + 0.3,
          pulseSpeed: Math.random() * 0.02 + 0.01,
          pulseFactor: Math.random(),
        });
      }
      // Store original positions
      particlesRef.current.forEach((p) => {
        p.originalX = p.x;
        p.originalY = p.y;
      });
    };

    initializeParticles();

    const drawParticles = () => {
      particlesRef.current.forEach((particle, index) => {
        // Movement
        particle.x += particle.speedX;
        particle.y += particle.speedY;

        // Mouse attraction (subtle)
        const dx = mouseRef.current.x - particle.x;
        const dy = mouseRef.current.y - particle.y;
        const distance = Math.sqrt(dx * dx + dy * dy);
        const maxDistance = 200;

        if (distance < maxDistance) {
          const force = (1 - distance / maxDistance) * 0.02;
          particle.x += (dx / distance) * force;
          particle.y += (dy / distance) * force;
        }

        // Wrap around
        if (particle.x > canvas.width + 20) particle.x = -20;
        if (particle.x < -20) particle.x = canvas.width + 20;
        if (particle.y > canvas.height + 20) particle.y = -20;
        if (particle.y < -20) particle.y = canvas.height + 20;

        // Pulsing effect
        particle.pulseFactor += particle.pulseSpeed;
        const pulse = Math.sin(particle.pulseFactor) * 0.5 + 0.5;
        const size = particle.size * (1 + pulse * 0.5);
        const opacity = particle.opacity * (pulse * 0.4 + 0.6);

        // Draw particle with glow
        const gradient = ctx.createRadialGradient(
          particle.x,
          particle.y,
          0,
          particle.x,
          particle.y,
          size * 2
        );

        if (isDark) {
          gradient.addColorStop(0, `rgba(124, 58, 237, ${opacity})`);
          gradient.addColorStop(0.5, `rgba(6, 182, 212, ${opacity * 0.5})`);
          gradient.addColorStop(1, `rgba(59, 130, 246, 0)`);
        } else {
          gradient.addColorStop(0, `rgba(168, 85, 247, ${opacity * 0.8})`);
          gradient.addColorStop(0.5, `rgba(6, 182, 212, ${opacity * 0.4})`);
          gradient.addColorStop(1, `rgba(14, 165, 233, 0)`);
        }

        ctx.fillStyle = gradient;
        ctx.beginPath();
        ctx.arc(particle.x, particle.y, size * 3, 0, Math.PI * 2);
        ctx.fill();

        // Draw core dot
        ctx.fillStyle = isDark
          ? `rgba(200, 150, 255, ${opacity})`
          : `rgba(200, 150, 255, ${opacity * 0.8})`;
        ctx.beginPath();
        ctx.arc(particle.x, particle.y, size, 0, Math.PI * 2);
        ctx.fill();

        // Draw connection lines to nearby particles
        for (let j = index + 1; j < particlesRef.current.length; j++) {
          const other = particlesRef.current[j];
          const lineDistance = Math.sqrt(
            Math.pow(particle.x - other.x, 2) +
              Math.pow(particle.y - other.y, 2)
          );

          if (lineDistance < 150) {
            ctx.strokeStyle = isDark
              ? `rgba(124, 58, 237, ${(1 - lineDistance / 150) * 0.2})`
              : `rgba(168, 85, 247, ${(1 - lineDistance / 150) * 0.1})`;
            ctx.lineWidth = 1;
            ctx.beginPath();
            ctx.moveTo(particle.x, particle.y);
            ctx.lineTo(other.x, other.y);
            ctx.stroke();
          }
        }
      });
    };

    const animate = () => {
      // Clear canvas completely for crisp particles
      ctx.fillStyle = isDark ? "#111827" : "#ffffff";
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      drawParticles();

      time += 1;
      animationId = requestAnimationFrame(animate);
    };

    animate();

    const handleResize = () => {
      resizeCanvas();
      initializeParticles();
    };

    window.addEventListener("resize", handleResize);

    return () => {
      cancelAnimationFrame(animationId);
      window.removeEventListener("resize", handleResize);
      window.removeEventListener("mousemove", handleMouseMove);
    };
  }, [isDark]);

  return (
    <canvas
      ref={canvasRef}
      style={{
        position: "absolute",
        top: 0,
        left: 0,
        width: "100%",
        height: "100%",
        zIndex: 1,
        pointerEvents: "none",
      }}
    />
  );
};

export default WaveBackground;
