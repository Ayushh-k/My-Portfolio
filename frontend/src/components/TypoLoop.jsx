const ITEMS = [
  { text: "DESIGN", hex: "0x01", status: "OK" },
  { text: "CODE", hex: "0x02", status: "RUNNING" },
  { text: "TEST", hex: "0x03", status: "STABLE" },
  { text: "LAUNCH", hex: "0x04", status: "READY" },
];

const Strip = () => (
  <div className="flex items-center shrink-0 pr-12">
    {ITEMS.map((item, i) => (
      <div key={i} className="flex items-center gap-6 md:gap-10">
        <div className="flex flex-col items-start">
          <span className="text-[10px] md:text-xs font-mono text-cyan-500/60 leading-none mb-1">
            [{item.hex}]
          </span>
          <span
            className="text-4xl md:text-6xl lg:text-7xl font-mono uppercase tracking-[0.2em] relative group"
            style={{
              fontFamily: '"Share Tech Mono", monospace',
              color: 'white',
              WebkitTextStroke: '1px rgba(255,255,255,0.1)',
              textShadow: '0 0 15px rgba(0, 243, 255, 0.2)',
            }}
          >
            {item.text}
            {/* Glitch Overlay Effect */}
            <span className="absolute inset-0 text-cyan-500 opacity-0 group-hover:opacity-100 group-hover:animate-pulse -z-10 blur-[2px]">
              {item.text}
            </span>
          </span>
        </div>
        <div className="flex flex-col items-start gap-1">
          <div className="w-1 md:w-2 h-1 md:h-2 bg-emerald-500 rounded-full animate-pulse shadow-[0_0_8px_#10b981]" />
          <span className="text-[8px] md:text-[10px] font-mono text-emerald-500/80 tracking-tighter uppercase whitespace-nowrap">
            // {item.status}
          </span>
        </div>
        <span className="text-2xl md:text-4xl font-mono text-white/10 mx-4">
          ::
        </span>
      </div>
    ))}
  </div>
);

const TypoLoop = () => {
  return (
    <section className="relative w-full overflow-hidden bg-[#050b14] py-8 md:py-12 border-y border-white/5 transition-all duration-300 hover:bg-[#071120]/40">
      <style>{`
        @keyframes marquee {
          0% { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
        .animate-marquee {
          animation: marquee 40s linear infinite;
        }
        .animate-marquee:hover {
          animation-play-state: paused;
        }
        /* Micro scanlines */
        .scanlines::after {
          content: "";
          position: absolute;
          inset: 0;
          background: repeating-linear-gradient(
            0deg,
            rgba(0, 0, 0, 0.1),
            rgba(0, 0, 0, 0.1) 1px,
            transparent 1px,
            transparent 2px
          );
          pointer-events: none;
          z-index: 5;
        }
      `}</style>

      {/* Edge Fades */}
      <div className="absolute inset-y-0 left-0 w-16 md:w-32 z-20 pointer-events-none bg-gradient-to-r from-[#050b14] to-transparent" />
      <div className="absolute inset-y-0 right-0 w-16 md:w-32 z-20 pointer-events-none bg-gradient-to-l from-[#050b14] to-transparent" />

      <div className="scanlines">
        <div className="flex w-max animate-marquee">
          <Strip />
          <Strip />
        </div>
      </div>

      {/* Decorative corners */}
      <div className="absolute top-2 left-2 w-2 h-2 border-t border-l border-cyan-500/40" />
      <div className="absolute top-2 right-2 w-2 h-2 border-t border-r border-cyan-500/40" />
      <div className="absolute bottom-2 left-2 w-2 h-2 border-b border-l border-cyan-500/40" />
      <div className="absolute bottom-2 right-2 w-2 h-2 border-b border-r border-cyan-500/40" />
    </section>
  );
};

export default TypoLoop;
