import React, { useState, useEffect, useRef } from 'react';
import { Bug, X, Trophy, Zap, Crosshair } from 'lucide-react';
import gsap from 'gsap';

const BugGame = () => {
  const [isActive, setIsActive] = useState(false);
  const [score, setScore] = useState(0);
  const [timeLeft, setTimeLeft] = useState(25);
  const [bugs, setBugs] = useState([]);
  const [gameOver, setGameOver] = useState(false);
  
  const gameAreaRef = useRef(null);
  const timerRef = useRef(null);

  const startGame = () => {
    setIsActive(true);
    setScore(0);
    setTimeLeft(25);
    setGameOver(false);
    setBugs([]);
    spawnBug();
  };

  const endGame = () => {
    setGameOver(true);
    if (timerRef.current) clearInterval(timerRef.current);
  };

  const closeGame = () => {
    setIsActive(false);
    setGameOver(false);
    setBugs([]);
    if (timerRef.current) clearInterval(timerRef.current);
  };

  useEffect(() => {
    if (isActive && !gameOver) {
      timerRef.current = setInterval(() => {
        setTimeLeft((prev) => {
          if (prev <= 1) {
            endGame();
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    }
    return () => clearInterval(timerRef.current);
  }, [isActive, gameOver]);

  // Spawner
  useEffect(() => {
    if (isActive && !gameOver) {
      const spawnInterval = setInterval(() => {
        spawnBug();
      }, Math.random() * 600 + 600); // Faster spawning (600ms - 1.2s)
      return () => clearInterval(spawnInterval);
    }
  }, [isActive, gameOver]);

  const spawnBug = () => {
    const id = Date.now() + Math.random();
    const x = Math.floor(Math.random() * 80) + 10; 
    const y = Math.floor(Math.random() * 80) + 10;
    const rotation = Math.random() * 360; // Random facing direction
    
    setBugs(prev => [...prev, { id, x, y, rotation }]);

    setTimeout(() => {
      setBugs(prev => prev.filter(b => b.id !== id));
    }, 3500); // Shorter lifespan makes it harder
  };

  // Dynamic Scurrying Effect for Bugs
  useEffect(() => {
    if (!gameAreaRef.current || bugs.length === 0) return;
    
    bugs.forEach(bug => {
      const bugEl = document.getElementById(`bug-${bug.id}`);
      if (bugEl && !bugEl.classList.contains('animating')) {
        bugEl.classList.add('animating');
        // Randomly scurry slightly around its origin
        gsap.to(bugEl, {
          x: `+=${(Math.random() - 0.5) * 50}`,
          y: `+=${(Math.random() - 0.5) * 50}`,
          rotation: `+=${(Math.random() - 0.5) * 90}`,
          duration: Math.random() * 1 + 0.5,
          repeat: -1,
          yoyo: true,
          ease: "power1.inOut"
        });
      }
    });
  }, [bugs]);

  const catchBug = (id, e) => {
    const bugElement = document.getElementById(`bug-${id}`);
    
    // Quick burst hide
    gsap.killTweensOf(bugElement);
    gsap.to(bugElement, {
      scale: 0,
      opacity: 0,
      duration: 0.15,
      ease: "power2.in"
    });

    // Spawn multi-particle explosion
    for(let i=0; i<6; i++) {
        const spark = document.createElement('div');
        spark.className = 'fixed w-2 h-2 rounded-full bg-red-400 pointer-events-none z-[10001] shadow-[0_0_10px_#f87171]';
        spark.style.left = `${e.clientX}px`;
        spark.style.top = `${e.clientY}px`;
        document.body.appendChild(spark);
        
        const angle = (Math.PI * 2 / 6) * i;
        const radius = Math.random() * 40 + 30;
        
        gsap.to(spark, {
          x: Math.cos(angle) * radius,
          y: Math.sin(angle) * radius,
          scale: 0,
          opacity: 0,
          duration: 0.5 + Math.random() * 0.3,
          ease: "expo.out",
          onComplete: () => spark.remove()
        });
    }

    // Floating +1 text
    const text = document.createElement('div');
    text.innerHTML = '+1';
    text.className = 'fixed text-emerald-400 font-extrabold text-2xl pointer-events-none z-[10001] drop-shadow-[0_0_10px_rgba(52,211,153,0.8)]';
    text.style.left = `${e.clientX}px`;
    text.style.top = `${e.clientY - 20}px`;
    document.body.appendChild(text);

    gsap.to(text, {
      y: -60,
      scale: 1.5,
      opacity: 0,
      duration: 0.8,
      ease: "power1.out",
      onComplete: () => text.remove()
    });

    // Very subtle screen shake
    if (gameAreaRef.current) {
        gsap.fromTo(gameAreaRef.current, 
            { x: -3, y: 2 }, 
            { x: 0, y: 0, duration: 0.1, ease: "bounce.out" }
        );
    }

    setBugs(prev => prev.filter(b => b.id !== id));
    setScore(s => s + 1);
  };

  if (!isActive) {
    return (
      <button 
        onClick={startGame}
        className="p-2 rounded-lg bg-[#0a101d]/50 backdrop-blur-md hover:bg-cyan-900/40 text-cyan-400 shadow-[0_0_10px_rgba(6,182,212,0.2)] hover:shadow-[0_0_15px_rgba(6,182,212,0.4)] transition-all duration-300 flex items-center gap-2 group"
        title="Play Minigame"
      >
        <Bug className="w-[18px] h-[18px] animate-[pulse_2s_ease-in-out_infinite] text-cyan-400" />
        <span className="font-bold text-[10px] uppercase tracking-[0.1em] whitespace-nowrap hidden sm:block">Bugs</span>
      </button>
    );
  }

  return (
    <div className="fixed inset-0 z-[10000] bg-[#02050a]/95 backdrop-blur-xl overflow-hidden flex flex-col items-center" style={{ cursor: 'crosshair' }}>
      {/* Background Cyberpunk Grid/Gradients */}
      <div className="absolute inset-0 bg-[linear-gradient(rgba(0,243,255,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(0,243,255,0.03)_1px,transparent_1px)] bg-[size:40px_40px] pointer-events-none"></div>
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[300px] bg-cyan-500/10 blur-[100px] pointer-events-none rounded-full"></div>

      {/* Cyberpunk HUD Header */}
      <div className="w-full max-w-5xl p-6 mt-4 flex justify-between items-center z-10 relative">
        
        {/* Score Display (Left) */}
        <div className="relative group">
            <div className="absolute inset-0 bg-emerald-500/20 blur-xl rounded-full opacity-50"></div>
            <div className="relative flex items-center gap-4 bg-[#0a101d]/80 border border-emerald-500/30 px-6 py-3 rounded-2xl shadow-[0_0_30px_rgba(16,185,129,0.15)]">
                <div className="p-3 bg-emerald-500/10 rounded-full">
                    <Zap size={24} className="text-emerald-400 animate-pulse" />
                </div>
                <div className="flex flex-col">
                    <span className="text-gray-400 text-[10px] font-mono leading-none tracking-[0.2em] mb-1">SCORE</span>
                    <span className="text-emerald-400 text-4xl font-black leading-none tracking-tighter shadow-emerald-400/50" style={{ textShadow: '0 0 15px rgba(52,211,153,0.5)' }}>
                        {score.toString().padStart(2, '0')}
                    </span>
                </div>
            </div>
        </div>

        {/* Time Display (Center) */}
        <div className="absolute left-1/2 -translate-x-1/2 flex flex-col items-center">
            <div className={`text-5xl md:text-6xl font-black font-mono tracking-tighter ${timeLeft <= 5 ? 'text-red-500 animate-pulse' : 'text-cyan-400'} drop-shadow-[0_0_20px_currentColor]`}>
               00:{timeLeft.toString().padStart(2, '0')}
            </div>
            {/* Timer Progress Bar */}
            <div className="w-48 h-1.5 bg-[#0a101d] rounded-full mt-3 overflow-hidden border border-white/5">
                <div 
                   className={`h-full transition-all duration-1000 ${timeLeft <= 5 ? 'bg-red-500 shadow-[0_0_10px_#ef4444]' : 'bg-cyan-400 shadow-[0_0_10px_#22d3ee]'}`}
                   style={{ width: `${(timeLeft / 25) * 100}%` }}
                ></div>
            </div>
        </div>

        {/* Close Button (Right) */}
        <button 
          onClick={closeGame}
          className="relative p-4 rounded-xl bg-[#0a101d]/80 border border-red-500/20 text-red-400 hover:bg-red-500/10 hover:border-red-500/50 hover:text-red-300 transition-all group overflow-hidden"
        >
          <X size={24} className="group-hover:rotate-90 transition-transform duration-300 relative z-10" />
          <div className="absolute inset-0 bg-red-500/20 translate-y-full group-hover:translate-y-0 transition-transform duration-300"></div>
        </button>
      </div>

      {/* Game Area */}
      <div 
        ref={gameAreaRef} 
        className="relative flex-1 w-full max-w-7xl h-full mt-4 mb-8 border border-white/5 rounded-3xl bg-transparent overflow-hidden"
      >
        {!gameOver ? (
          bugs.map((bug) => (
            <button
              id={`bug-${bug.id}`}
              key={bug.id}
              onClick={(e) => catchBug(bug.id, e)}
              className="absolute p-4 -translate-x-1/2 -translate-y-1/2 transition-transform hover:scale-110 active:scale-95 group"
              style={{ left: `${bug.x}%`, top: `${bug.y}%`, transform: `translate(-50%, -50%) rotate(${bug.rotation}deg)` }}
            >
              <div className="relative flex items-center justify-center">
                {/* Bug Body */}
                <Bug size={38} className="text-red-500 drop-shadow-[0_0_12px_rgba(239,68,68,0.9)] relative z-10" />
                
                {/* Red Warning Pulse Behind Bug */}
                <div className="absolute inset-0 w-full h-full bg-red-500/30 blur-xl rounded-full animate-pulse z-0"></div>
                <div className="absolute w-[150%] h-[150%] border border-red-500/20 rounded-full animate-[ping_2s_ease-out_infinite] z-0"></div>
              </div>
            </button>
          ))
        ) : (
          <div className="absolute inset-0 flex items-center justify-center bg-[#0a101d]/60 backdrop-blur-md z-50">
             <div className="bg-[#050b14] p-12 rounded-[2rem] border border-cyan-500/30 flex flex-col items-center text-center max-w-lg w-full mx-4 relative overflow-hidden">
                {/* Modal Glow */}
                <div className="absolute top-0 w-full h-2 bg-gradient-to-r from-transparent via-cyan-400 to-transparent"></div>
                <div className="absolute top-0 left-1/2 -translate-x-1/2 w-32 h-32 bg-cyan-500/20 blur-3xl"></div>

                <div className="w-24 h-24 bg-gradient-to-br from-cyan-500/20 to-emerald-500/20 rounded-3xl flex items-center justify-center mb-8 border border-cyan-500/30 shadow-[0_0_30px_rgba(6,182,212,0.2)] rotate-3">
                  <Trophy size={48} className="text-cyan-400" />
                </div>
                
                <h2 className="text-4xl font-black text-white mb-2 tracking-tight">System Purged!</h2>
                <p className="text-gray-400 mb-10 font-mono text-sm leading-relaxed">
                  You successfully cleared <span className="text-emerald-400 font-bold text-2xl px-1">{score}</span> malicious entities from the framework.
                </p>
                
                <div className="flex gap-4 w-full justify-center">
                  <button 
                    onClick={startGame}
                    className="flex-1 py-4 px-6 bg-cyan-400 hover:bg-cyan-300 text-[#050b14] font-bold rounded-xl transition-all hover:-translate-y-1 shadow-[0_0_20px_rgba(34,211,238,0.4)] tracking-wide"
                  >
                    PLAY AGAIN
                  </button>
                  <button 
                    onClick={closeGame}
                    className="flex-1 py-4 px-6 border border-white/10 hover:border-white/20 hover:bg-white/5 text-white font-bold rounded-xl transition-all tracking-wide"
                  >
                    EXIT TO SITE
                  </button>
                </div>
             </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default BugGame;
