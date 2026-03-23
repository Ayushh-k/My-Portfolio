import React, { useState, useEffect, useRef } from 'react';
import { Bug, X, Trophy, Zap, Skull, Activity, Target, Clock, Star } from 'lucide-react';
import gsap from 'gsap';

// --- COMPACT PERFORMANCE DASHBOARD ---
const PerformanceDashboard = ({ history, totalTime, stats, deathCause, score }) => {
  const finalAvg = stats.hits > 0 ? (stats.sumReaction / stats.hits) : 0;
  const finalBest = stats.fastest === Infinity ? 0 : stats.fastest;
  const finalAcc = stats.clicks > 0 ? Math.round((stats.hits / stats.clicks) * 100) : 0;
  
  const [dispAcc, setDispAcc] = useState(0);
  const [dispAvg, setDispAvg] = useState(0);
  const [dispBest, setDispBest] = useState(0);

  const pathRef = useRef(null);
  const fillRef = useRef(null);
  const pointsRef = useRef(null);

  let rating = "ROOKIE";
  let ratingColor = "text-gray-400";
  if (score > 15) { rating = "NOVICE"; ratingColor = "text-blue-400"; }
  if (score > 30) { rating = "HACKER"; ratingColor = "text-emerald-400"; }
  if (score > 50) { rating = "NINJA"; ratingColor = "text-purple-400"; }
  if (score > 70) { rating = "GODLIKE"; ratingColor = "text-yellow-400"; }
  if (deathCause === 'bomb') { rating = "FAILED"; ratingColor = "text-red-500"; }

  useEffect(() => {
    const obj = { acc: 0, avg: 0, best: 0 };
    gsap.to(obj, {
      acc: finalAcc || 0,
      avg: finalAvg || 0,
      best: finalBest || 0,
      duration: 1.5,
      ease: 'power2.out',
      onUpdate: () => {
        setDispAcc(Math.round(obj.acc));
        setDispAvg(Number(obj.avg).toFixed(2));
        setDispBest(Number(obj.best).toFixed(2));
      }
    });

    if (pathRef.current && typeof pathRef.current.getTotalLength === 'function') {
      const len = pathRef.current.getTotalLength() || 1000;
      gsap.fromTo(pathRef.current,
        { strokeDasharray: len, strokeDashoffset: len },
        { strokeDashoffset: 0, duration: 2, ease: 'power2.inOut' }
      );
    }
    
    if (fillRef.current) gsap.fromTo(fillRef.current, { opacity: 0 }, { opacity: 1, duration: 1, delay: 1 });
    if (pointsRef.current) gsap.fromTo(pointsRef.current, { opacity: 0 }, { opacity: 1, duration: 1, delay: 1.5 });

  }, [finalAcc, finalAvg, finalBest]);

  const maxScore = history.length > 0 ? (history[history.length - 1]?.score || 1) : 1;
  const width = 400;
  const height = 100;

  const points = history.map((point) => {
    const px = (point.time / totalTime) * width;
    const py = height - (point.score / maxScore) * height;
    return `${px},${py}`;
  });

  const fillPolygon = `0,${height} ${points.join(' ')} ${width},${height}`;

  return (
    <div className="w-full flex items-center flex-col gap-2 md:gap-3 mt-4 relative z-10 max-w-lg mb-2">
      
      {/* 4-Grid Stats Dashboard */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-2 w-full">
        <div className="bg-white/5 border border-white/10 rounded-xl p-3 flex flex-col items-center justify-center relative shadow-[inset_0_0_10px_rgba(255,255,255,0.02)]">
            <Target size={14} className="text-cyan-400 mb-1 opacity-70" />
            <span className="text-[8px] md:text-[10px] text-gray-400 font-mono tracking-widest mb-1">ACCURACY</span>
            <span className="text-lg md:text-xl font-black text-white">{dispAcc}%</span>
        </div>
        <div className="bg-white/5 border border-white/10 rounded-xl p-3 flex flex-col items-center justify-center relative shadow-[inset_0_0_10px_rgba(255,255,255,0.02)]">
            <Clock size={14} className="text-emerald-400 mb-1 opacity-70" />
            <span className="text-[8px] md:text-[10px] text-gray-400 font-mono tracking-widest mb-1">AVG REACT</span>
            <span className="text-lg md:text-xl font-black text-white">{dispAvg}s</span>
        </div>
        <div className="bg-white/5 border border-white/10 rounded-xl p-3 flex flex-col items-center justify-center relative shadow-[inset_0_0_10px_rgba(255,255,255,0.02)]">
            <Zap size={14} className="text-yellow-400 mb-1 opacity-70" />
            <span className="text-[8px] md:text-[10px] text-gray-400 font-mono tracking-widest mb-1">FASTEST</span>
            <span className="text-lg md:text-xl font-black text-white">{dispBest}s</span>
        </div>
        <div className="bg-white/5 border border-white/10 rounded-xl p-3 flex flex-col items-center justify-center relative shadow-[inset_0_0_10px_rgba(255,255,255,0.02)]">
            <Star size={14} className="text-purple-400 mb-1 opacity-70" />
            <span className="text-[8px] md:text-[10px] text-gray-400 font-mono tracking-widest mb-1">RATING</span>
            <span className={`text-sm md:text-base font-black ${ratingColor} tracking-tighter`}>{rating}</span>
        </div>
      </div>

      {/* Fully Flat 2D Graph */}
      <div className="w-full h-24 md:h-28 mt-2 bg-transparent border border-white/10 rounded-xl relative p-3 pt-4 flex flex-col overflow-hidden">
          <div className="flex items-center gap-2 mb-2 absolute top-2 left-2">
            <Activity size={12} className="text-cyan-400 relative z-10" />
            <span className="text-[9px] text-gray-400 font-mono tracking-widest font-bold relative z-10">MOMENTUM PLOT</span>
          </div>
          
          {history.length < 2 ? (
              <div className="flex-1 flex items-center justify-center h-full">
                 <span className="text-[9px] text-gray-600 font-mono tracking-widest">AWAITING TELEMETRY...</span>
              </div>
          ) : (
              <div className="flex-1 relative w-full h-full mt-3">
                <svg viewBox={`0 0 ${width} ${height}`} className="absolute inset-0 w-full h-full overflow-visible">
                  <defs>
                    <linearGradient id="cyberGradientDraw" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="0%" stopColor="#22d3ee" stopOpacity="0.2" />
                      <stop offset="100%" stopColor="#22d3ee" stopOpacity="0.0" />
                    </linearGradient>
                  </defs>
                  
                  {/* Fill */}
                  <g ref={fillRef} opacity="0">
                     <polygon points={fillPolygon} fill="url(#cyberGradientDraw)" />
                  </g>
                  
                  {/* Line */}
                  <path ref={pathRef} d={`M ${points.join(' L ')}`} fill="none" stroke="#22d3ee" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
                  
                  {/* Nodes */}
                  <g ref={pointsRef} opacity="0">
                    {history.map((point, i) => {
                        if (i === 0) return null;
                        const px = (point.time / totalTime) * width;
                        const py = height - (point.score / maxScore) * height;
                        return (
                            <circle key={i} cx={px} cy={py} r="2.5" fill="#22d3ee" stroke="#050b14" strokeWidth="1" />
                        );
                    })}
                  </g>
                </svg>
              </div>
          )}
      </div>
    </div>
  );
};

// --- MAIN GAME COMPONENT ---
const BugGame = () => {
  const TOTAL_TIME = 30;

  const [isActive, setIsActive] = useState(false);
  const [score, setScore] = useState(0);
  const [timeLeft, setTimeLeft] = useState(TOTAL_TIME);
  const [entities, setEntities] = useState([]);
  const [gameOver, setGameOver] = useState(false);
  const [deathCause, setDeathCause] = useState(null); 
  
  const [startTime, setStartTime] = useState(null);
  const [history, setHistory] = useState([]);
  const [stats, setStats] = useState({ clicks: 0, hits: 0, fastest: Infinity, sumReaction: 0 });
  
  const gameAreaRef = useRef(null);
  const timerRef = useRef(null);

  const startGame = () => {
    setIsActive(true);
    setScore(0);
    setTimeLeft(TOTAL_TIME);
    setGameOver(false);
    setDeathCause(null);
    setEntities([]);
    setStartTime(Date.now());
    setHistory([{ time: 0, score: 0 }]); 
    setStats({ clicks: 0, hits: 0, fastest: Infinity, sumReaction: 0 });
  };

  const endGame = (cause = 'timeout') => {
    setGameOver(true);
    setDeathCause(cause);
    if (timerRef.current) clearInterval(timerRef.current);
  };

  const closeGame = () => {
    setIsActive(false);
    setGameOver(false);
    setEntities([]);
    if (timerRef.current) clearInterval(timerRef.current);
  };

  useEffect(() => {
    if (isActive && !gameOver) {
      timerRef.current = setInterval(() => {
        setTimeLeft((prev) => {
          if (prev <= 1) {
            endGame('timeout');
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    }
    return () => clearInterval(timerRef.current);
  }, [isActive, gameOver]);

  // SPAWNER
  useEffect(() => {
    if (isActive && !gameOver) {
      const spawnInterval = setInterval(() => {
        spawnEntity();
      }, Math.random() * 500 + 600); // 600ms - 1100ms

      return () => clearInterval(spawnInterval);
    }
  }, [isActive, gameOver]);

  const spawnEntity = () => {
    const id = Date.now() + Math.random();
    const x = Math.floor(Math.random() * 80) + 10; 
    const y = Math.floor(Math.random() * 80) + 10;
    const rotation = Math.random() * 360; 
    
    // 15% Bomb chance
    const type = Math.random() > 0.85 ? 'bomb' : 'bug';
    
    setEntities(prev => [...prev, { id, type, x, y, rotation, spawnTime: Date.now() }]);

    setTimeout(() => {
      setEntities(prev => prev.filter(e => e.id !== id));
    }, type === 'bomb' ? 2000 : 3500); 
  };

  // SCURRYING
  useEffect(() => {
    if (!gameAreaRef.current || entities.length === 0) return;
    
    entities.forEach(entity => {
      const el = document.getElementById(`entity-${entity.id}`);
      if (el && !el.classList.contains('animating')) {
        el.classList.add('animating');
        gsap.to(el, {
          x: `+=${(Math.random() - 0.5) * 60}`,
          y: `+=${(Math.random() - 0.5) * 60}`,
          rotation: `+=${(Math.random() - 0.5) * 60}`,
          duration: Math.random() * 0.8 + 0.5,
          repeat: -1,
          yoyo: true,
          ease: "sine.inOut"
        });
      }
    });
  }, [entities]);

  const handleBackgroundClick = () => {
    if (gameOver) return;
    setStats(s => ({ ...s, clicks: s.clicks + 1 }));
  };

  const clickEntity = (entity, e) => {
    e.stopPropagation(); 
    if (gameOver) return;

    const el = document.getElementById(`entity-${entity.id}`);
    
    if (entity.type === 'bomb') {
      gsap.killTweensOf(el);
      const flash = document.createElement('div');
      flash.className = 'fixed inset-0 bg-red-600 z-[10002] pointer-events-none mix-blend-overlay';
      document.body.appendChild(flash);
      
      gsap.to(flash, { opacity: 0, duration: 1.0, ease: "expo.out", onComplete: () => flash.remove() });

      if (gameAreaRef.current) {
          gsap.fromTo(gameAreaRef.current, { x: -20, y: 20 }, { x: 0, y: 0, duration: 0.6, ease: "bounce.out" });
      }

      endGame('bomb');
      return;
    }

    // Reaction calculations
    const rxTime = (Date.now() - entity.spawnTime) / 1000;
    const elapsedTime = (Date.now() - startTime) / 1000;
    
    setStats(s => ({
      clicks: s.clicks + 1,
      hits: s.hits + 1,
      fastest: Math.min(s.fastest, rxTime),
      sumReaction: s.sumReaction + rxTime
    }));

    setHistory(prev => {
      const currentScore = prev.length > 0 ? prev[prev.length - 1].score : 0;
      return [...prev, { time: elapsedTime, score: currentScore + 1 }];
    });

    gsap.killTweensOf(el);
    gsap.to(el, { scale: 0, opacity: 0, duration: 0.15, ease: "power2.in" });

    // Sparks
    for(let i=0; i<6; i++) {
        const spark = document.createElement('div');
        spark.className = 'fixed w-2 h-2 rounded-full bg-cyan-400 pointer-events-none z-[10001] shadow-[0_0_10px_#22d3ee]';
        spark.style.left = `${e.clientX}px`;
        spark.style.top = `${e.clientY}px`;
        document.body.appendChild(spark);
        
        const angle = (Math.PI * 2 / 6) * i;
        const radius = Math.random() * 40 + 30;
        
        gsap.to(spark, { x: Math.cos(angle) * radius, y: Math.sin(angle) * radius, scale: 0, opacity: 0, duration: 0.4 + Math.random() * 0.2, ease: "expo.out", onComplete: () => spark.remove() });
    }

    // Floating Score Label
    const text = document.createElement('div');
    text.innerHTML = `+1 <span style="font-size:0.5em;color:#aaa">(${rxTime.toFixed(2)}s)</span>`;
    text.className = 'fixed text-cyan-400 font-extrabold text-xl md:text-2xl pointer-events-none z-[10001] drop-shadow-[0_0_15px_rgba(34,211,238,0.9)] whitespace-nowrap';
    text.style.left = `${e.clientX}px`;
    text.style.top = `${e.clientY - 20}px`;
    document.body.appendChild(text);

    gsap.to(text, { y: -60, scale: 1.2, opacity: 0, duration: 0.8, ease: "power1.out", onComplete: () => text.remove() });

    setEntities(prev => prev.filter(b => b.id !== entity.id));
    setScore(s => s + 1);
  };

  if (!isActive) {
    return (
      <button 
        onClick={startGame}
        className="p-2 md:p-3 rounded-xl bg-white/5 backdrop-blur-md border border-white/10 hover:bg-cyan-500/10 hover:border-cyan-500/50 text-cyan-400 shadow-[0_0_15px_rgba(6,182,212,0.1)] hover:shadow-[0_0_20px_rgba(6,182,212,0.3)] transition-all duration-300 flex items-center gap-2 group"
      >
        <Bug className="w-4 h-4 md:w-5 md:h-5 group-hover:rotate-12 transition-transform duration-300 relative z-10" />
        <span className="font-bold text-[10px] md:text-xs uppercase tracking-[0.2em] whitespace-nowrap hidden sm:block relative z-10">Bugs</span>
      </button>
    );
  }

  return (
    <div className="fixed inset-0 z-[10000] bg-[#010308]/95 backdrop-blur-3xl overflow-hidden flex flex-col items-center">
      
      {/* Background Gradients */}
      <div className="absolute inset-0 bg-[linear-gradient(rgba(0,243,255,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(0,243,255,0.03)_1px,transparent_1px)] bg-[size:50px_50px] pointer-events-none hidden sm:block"></div>
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full md:w-[800px] h-[300px] bg-cyan-500/10 blur-[150px] pointer-events-none rounded-full"></div>

      {/* HEADER SECTION */}
      <div className="w-full max-w-5xl p-4 md:p-6 flex justify-between items-center z-10 relative pointer-events-none">
        
        <div className="relative group pointer-events-auto">
            <div className="absolute inset-0 bg-cyan-500/20 blur-xl rounded-full opacity-50"></div>
            <div className="relative flex items-center gap-4 bg-[#050b14]/80 border border-cyan-500/30 px-5 md:px-8 py-3 md:py-4 rounded-2xl shadow-[0_0_30px_rgba(6,182,212,0.1)]">
                <div className="flex flex-col">
                    <span className="text-cyan-500/80 text-[10px] md:text-sm font-mono leading-none tracking-[0.3em] mb-1 font-bold">SCORE</span>
                    <span className="text-white text-3xl md:text-5xl font-black leading-none tracking-tighter" style={{ textShadow: '0 0 15px rgba(34,211,238,0.5)' }}>
                        {score.toString().padStart(3, '0')}
                    </span>
                </div>
            </div>
        </div>

        <div className="absolute left-1/2 -translate-x-1/2 flex flex-col items-center pointer-events-auto">
            <div className={`text-4xl md:text-6xl font-black font-mono tracking-tighter ${timeLeft <= 5 ? 'text-red-500 animate-pulse drop-shadow-[0_0_20px_#ef4444]' : 'text-white drop-shadow-[0_0_20px_rgba(255,255,255,0.4)]'}`}>
               00:{timeLeft.toString().padStart(2, '0')}
            </div>
            <div className="w-32 md:w-48 h-1.5 md:h-2 bg-white/10 rounded-full mt-2 overflow-hidden shadow-[inset_0_0_10px_rgba(0,0,0,0.5)]">
                <div 
                   className={`h-full transition-all duration-1000 ${timeLeft <= 5 ? 'bg-red-500 shadow-[0_0_15px_#ef4444]' : 'bg-cyan-400 shadow-[0_0_15px_#22d3ee]'}`}
                   style={{ width: `${(timeLeft / TOTAL_TIME) * 100}%` }}
                ></div>
            </div>
        </div>

        <button 
          onClick={closeGame}
          className="relative p-3 md:p-4 rounded-xl bg-white/5 border border-white/10 text-gray-400 hover:bg-red-500/20 hover:border-red-500/50 hover:text-red-400 transition-all pointer-events-auto group"
        >
          <X className="w-5 h-5 md:w-7 md:h-7 group-hover:rotate-90 transition-transform duration-300" />
        </button>
      </div>

      {/* GAME AREA */}
      <div 
        ref={gameAreaRef} 
        onClick={handleBackgroundClick}
        className="relative flex-1 w-full max-w-[1400px] h-full mt-2 md:mt-4 mb-4 md:mb-8 border border-transparent cursor-crosshair overflow-hidden"
      >
        {!gameOver && entities.map((entity) => {
          if (entity.type === 'bug') {
             return (
              <button
                id={`entity-${entity.id}`}
                key={entity.id}
                onMouseDown={(e) => clickEntity(entity, e)}
                onTouchStart={(e) => clickEntity(entity, e)}
                className="absolute p-4 -translate-x-1/2 -translate-y-1/2 hover:scale-[1.1] active:scale-95 group focus:outline-none"
                style={{ left: `${entity.x}%`, top: `${entity.y}%`, transform: `translate(-50%, -50%) rotate(${entity.rotation}deg)` }}
              >
                <div className="relative flex items-center justify-center">
                  <Bug className="w-10 h-10 md:w-12 md:h-12 text-cyan-400 drop-shadow-[0_0_15px_rgba(34,211,238,0.8)] relative z-10" />
                  <div className="absolute inset-0 w-full h-full bg-cyan-400/20 blur-xl rounded-full z-0"></div>
                </div>
              </button>
             );
          } else {
             return (
              <button
                id={`entity-${entity.id}`}
                key={entity.id}
                onMouseDown={(e) => clickEntity(entity, e)}
                onTouchStart={(e) => clickEntity(entity, e)}
                className="absolute p-4 -translate-x-1/2 -translate-y-1/2 hover:scale-[1.1] active:scale-95 group focus:outline-none"
                style={{ left: `${entity.x}%`, top: `${entity.y}%`, transform: `translate(-50%, -50%) rotate(${entity.rotation}deg)` }}
              >
                <div className="relative flex items-center justify-center">
                  <Bug className="w-10 h-10 md:w-12 md:h-12 text-red-500 drop-shadow-[0_0_15px_rgba(239,68,68,0.8)] relative z-10 animate-pulse" />
                  <div className="absolute inset-0 w-full h-full bg-red-600/30 blur-xl rounded-full animate-pulse z-0"></div>
                </div>
              </button>
             );
          }
        })}
        
        {/* RESPONSIVE ANALYTICS MODAL */}
        {gameOver && (
          <div className="absolute inset-0 flex flex-col items-center justify-center bg-[#010308]/90 py-6 px-4 md:py-12 overflow-y-auto" onClick={(e) => e.stopPropagation()}>
             <div className="flex flex-col items-center bg-[#050b14]/95 p-5 md:p-8 rounded-[2rem] border w-full max-w-xl shrink-0 my-auto relative pointer-events-auto shadow-2xl overflow-hidden mt-10 md:mt-auto">
                
                {/* Visual Glows */}
                <div className={`absolute top-0 w-full h-40 blur-[90px] pointer-events-none ${deathCause === 'bomb' ? 'bg-red-600/20' : 'bg-cyan-500/20'}`}></div>

                {/* Score Header */}
                <div className="flex items-center gap-4 w-full mb-2">
                  <div className={`w-14 h-14 md:w-16 md:h-16 shrink-0 rounded-2xl flex items-center justify-center border rotate-3 relative z-10 ${deathCause === 'bomb' ? 'bg-red-500/10 border-red-500 text-red-500 shadow-[0_0_20px_rgba(239,68,68,0.3)]' : 'bg-cyan-500/10 border-cyan-400 text-cyan-400 shadow-[0_0_20px_rgba(6,182,212,0.3)]'}`}>
                    {deathCause === 'bomb' ? <Skull size={24} className="animate-pulse" /> : <Trophy size={24} />}
                  </div>
                  <div className="flex flex-col relative z-10">
                    <h2 className={`text-xl md:text-3xl font-black tracking-tighter uppercase leading-none mb-1 ${deathCause === 'bomb' ? 'text-red-500' : 'text-white'}`}>
                      {deathCause === 'bomb' ? 'System Breach' : 'Target Purged'}
                    </h2>
                    <p className="text-gray-400 text-[10px] md:text-xs font-mono">
                      {deathCause === 'bomb' ? `Encrypted core detonated. Score locked.` : `Simulation complete. Metrics secured.`}
                    </p>
                  </div>
                </div>

                {/* Dynamic Analytics Dashboard */}
                <PerformanceDashboard history={history} totalTime={TOTAL_TIME} stats={stats} deathCause={deathCause} score={score} />
                
                {/* Actions */}
                <div className="flex gap-3 md:gap-4 w-full mt-4 relative z-20 max-w-lg mb-2">
                  <button 
                    onClick={startGame}
                    className={`flex-2 w-full py-4 text-center font-black rounded-xl transition-all shadow-xl hover:scale-105 active:scale-95 text-xs md:text-sm uppercase tracking-widest ${deathCause === 'bomb' ? 'bg-red-600 text-white shadow-[0_0_20px_rgba(239,68,68,0.3)] hover:bg-red-500' : 'bg-cyan-400 text-[#050b14] shadow-[0_0_20px_rgba(34,211,238,0.3)] hover:bg-cyan-300'}`}
                  >
                    REBOOT
                  </button>
                  <button 
                    onClick={closeGame}
                    className="flex-1 min-w-[120px] py-4 px-6 md:px-8 bg-white/5 border border-white/20 hover:border-white/50 hover:bg-white/10 text-white font-bold rounded-xl transition-all text-xs md:text-sm tracking-widest uppercase"
                  >
                    ABORT
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
