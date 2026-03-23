import React, { useState, useEffect, useRef } from 'react';
import { Bug, X, Trophy } from 'lucide-react';
import gsap from 'gsap';

const BugGame = () => {
  const [isActive, setIsActive] = useState(false);
  const [score, setScore] = useState(0);
  const [timeLeft, setTimeLeft] = useState(25); // 25 seconds game
  const [bugs, setBugs] = useState([]);
  const [gameOver, setGameOver] = useState(false);
  
  const gameAreaRef = useRef(null);
  const timerRef = useRef(null);

  // Start game
  const startGame = () => {
    setIsActive(true);
    setScore(0);
    setTimeLeft(25);
    setGameOver(false);
    setBugs([]);
    spawnBug();
  };

  // End game
  const endGame = () => {
    setGameOver(true);
    if (timerRef.current) clearInterval(timerRef.current);
  };

  // Close completely
  const closeGame = () => {
    setIsActive(false);
    setGameOver(false);
    setBugs([]);
    if (timerRef.current) clearInterval(timerRef.current);
  };

  // Timer effect
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

  // Spawner effect
  useEffect(() => {
    if (isActive && !gameOver) {
      // Spawn a bug every 800ms to 1.5s
      const spawnInterval = setInterval(() => {
        spawnBug();
      }, Math.random() * 700 + 800);

      return () => clearInterval(spawnInterval);
    }
  }, [isActive, gameOver]);

  const spawnBug = () => {
    const id = Date.now() + Math.random();
    // Keep bugs strictly inside viewport margins
    const x = Math.floor(Math.random() * 80) + 10; 
    const y = Math.floor(Math.random() * 80) + 10;
    
    setBugs(prev => [...prev, { id, x, y }]);

    // Auto-remove bug if not caught
    setTimeout(() => {
      setBugs(prev => prev.filter(b => b.id !== id));
    }, 4000);
  };

  const catchBug = (id, e) => {
    // GSAP animation for crushing the bug
    const bugElement = e.currentTarget;
    gsap.to(bugElement, {
      scale: 0,
      rotation: 360,
      opacity: 0,
      duration: 0.3,
      ease: "power2.in",
      onComplete: () => {
        setBugs(prev => prev.filter(b => b.id !== id));
        setScore(s => s + 1);
      }
    });

    // Spawn a spark effect at mouse position
    const spark = document.createElement('div');
    spark.innerHTML = '+1';
    spark.className = 'fixed text-cyan-400 font-bold text-xl pointer-events-none z-[10001]';
    spark.style.left = `${e.clientX}px`;
    spark.style.top = `${e.clientY}px`;
    document.body.appendChild(spark);

    gsap.to(spark, {
      y: -50,
      opacity: 0,
      duration: 0.8,
      onComplete: () => spark.remove()
    });
  };

  // When inactive, render the trigger button (styled precisely for Navbar)
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

  // Active Game Fullscreen Overlay
  return (
    <div className="fixed inset-0 z-[10000] bg-[#050b14]/90 backdrop-blur-sm overflow-hidden flex flex-col cursor-crosshair">
      {/* Header */}
      <div className="w-full p-6 flex justify-between items-center bg-[#0a101d]/80 border-b border-white/10 shadow-lg">
        <div className="flex items-center gap-6">
          <div className="flex flex-col">
            <span className="text-gray-400 text-xs font-mono uppercase tracking-widest">Score</span>
            <span className="text-emerald-400 text-3xl font-black">{score}</span>
          </div>
          <div className="flex flex-col">
            <span className="text-gray-400 text-xs font-mono uppercase tracking-widest">Time</span>
            <span className={`text-3xl font-black ${timeLeft <= 5 ? 'text-red-500 animate-pulse' : 'text-cyan-400'}`}>
              00:{timeLeft.toString().padStart(2, '0')}
            </span>
          </div>
        </div>
        
        <button 
          onClick={closeGame}
          className="text-gray-400 hover:text-white bg-white/5 hover:bg-white/10 p-3 rounded-full transition-colors"
        >
          <X size={24} />
        </button>
      </div>

      {/* Game Area */}
      <div 
        ref={gameAreaRef} 
        className="relative flex-1 w-full h-full"
      >
        {!gameOver ? (
          bugs.map((bug) => (
            <button
              key={bug.id}
              onClick={(e) => catchBug(bug.id, e)}
              className="absolute p-3 -translate-x-1/2 -translate-y-1/2 transition-transform hover:scale-110 group disabled:opacity-50"
              style={{ left: `${bug.x}%`, top: `${bug.y}%` }}
            >
              <div className="relative">
                <Bug size={36} className="text-emerald-400 drop-shadow-[0_0_8px_rgba(52,211,153,0.8)] animate-bounce" />
                {/* Bug wings/glow effect */}
                <div className="absolute inset-0 bg-emerald-400/20 blur-md rounded-full -z-10 animate-pulse"></div>
              </div>
            </button>
          ))
        ) : (
          <div className="absolute inset-0 flex items-center justify-center">
             <div className="bg-[#0a101d] p-10 rounded-3xl border border-cyan-500/30 flex flex-col items-center text-center max-w-md w-full mx-4 shadow-[0_0_50px_rgba(6,182,212,0.15)]">
                <div className="w-20 h-20 bg-emerald-500/20 rounded-full flex items-center justify-center mb-6">
                  <Trophy size={40} className="text-emerald-400" />
                </div>
                <h2 className="text-3xl font-black text-white mb-2">Time's Up!</h2>
                <p className="text-gray-400 mb-8 font-mono">You caught <span className="text-emerald-400 font-bold text-xl px-1">{score}</span> bugs!</p>
                <div className="flex gap-4 w-full justify-center">
                  <button 
                    onClick={startGame}
                    className="flex-1 py-3 px-6 bg-cyan-500 hover:bg-cyan-400 text-[#050b14] font-bold rounded-xl transition-all hover:-translate-y-1 shadow-[0_0_20px_rgba(6,182,212,0.4)]"
                  >
                    Play Again
                  </button>
                  <button 
                    onClick={closeGame}
                    className="flex-1 py-3 px-6 border border-white/10 hover:border-white/20 hover:bg-white/5 text-white font-bold rounded-xl transition-all"
                  >
                    Exit Game
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
