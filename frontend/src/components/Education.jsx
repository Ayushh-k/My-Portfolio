import { MapPin, Calendar, Cpu, ShieldCheck, Zap } from 'lucide-react';
import { useScrollAnimation } from '../hooks/useScrollAnimation';

const Education = ({ isDark }) => {
  const sectionRef = useScrollAnimation({ animationType: 'up' });

  const educationData = [
    {
      id: 1,
      institution: 'Lovely Professional University',
      location: 'Phagwara, Punjab',
      degree: 'B.Tech in CS & Engineering',
      info: 'Focusing on Full Stack Dev & Architecture',
      metric: 'CGPA: 8.77',
      period: '2023 - PRESENT',
      status: 'ACTIVE_LINK',
      color: '#00f3ff' // Cyan
    },
    {
      id: 2,
      institution: 'Dellmond International School',
      location: 'Fatehpur, Uttar Pradesh',
      degree: 'Intermediate (12th)',
      info: 'Science Stream (PCM)',
      metric: 'SCORE: 91.8%',
      period: '2021 - 2023',
      status: 'ARCHIVED',
      color: '#10b981' // Emerald
    },
    {
      id: 3,
      institution: 'Roorkee Sr. Sec. Public School',
      location: 'Roorkee, Uttarakhand',
      degree: 'Matriculation (10th)',
      info: 'General Science & Mathematics',
      metric: 'SCORE: 69.0%',
      period: '2020 - 2021',
      status: 'ARCHIVED',
      color: '#a78bfa' // Violet
    }
  ];

  return (
    <section
      id="education"
      ref={sectionRef}
      className={`relative py-32 overflow-hidden transition-colors duration-500 ${isDark ? 'bg-[#050b14]' : 'bg-gray-50'}`}
    >
      {/* Background Decor */}
      {isDark && (
        <>
          <div className="absolute top-0 left-1/4 w-[500px] h-[500px] bg-cyan-500/5 blur-[120px] rounded-full pointer-events-none" />
          <div className="absolute bottom-0 right-1/4 w-[500px] h-[500px] bg-emerald-500/5 blur-[120px] rounded-full pointer-events-none" />
        </>
      )}

      <div className="max-w-6xl mx-auto px-6 relative z-10">
        {/* Section Header */}
        <div className="text-center mb-24">
          <h2 className={`font-black mb-6 tracking-tighter ${isDark ? 'text-white' : 'text-gray-900'} font-sans section-header-text`}>
            EXP_HISTORY<span className="text-cyan-500">.exe</span>
          </h2>
          <div className="flex items-center justify-center gap-4">
            <div className="h-px w-12 bg-gray-500/30" />
            <p className="font-mono text-xs tracking-[0.3em] uppercase text-cyan-500/80">Educational Matrix</p>
            <div className="h-px w-12 bg-gray-500/30" />
          </div>
        </div>

        {/* Timeline Container */}
        <div className="relative">
          {/* Central Vertical Rail */}
          <div className="absolute left-8 md:left-1/2 md:-translate-x-1/2 top-0 bottom-0 w-px bg-gradient-to-b from-cyan-500 via-emerald-500 to-transparent opacity-20" />
          
          <div className="space-y-24">
            {educationData.map((edu, index) => {
              const isEven = index % 2 === 0;
              return (
                <div key={edu.id} className="relative flex flex-col md:flex-row items-center justify-between group">
                  
                  {/* Timeline Node */}
                  <div className="absolute left-8 md:left-1/2 md:-translate-x-1/2 top-0 z-20">
                    <div 
                      className="w-10 h-10 rounded-xl flex items-center justify-center shadow-lg transition-all duration-500 group-hover:scale-125"
                      style={{ 
                        background: isDark ? '#0a101d' : 'white',
                        border: `2px solid ${edu.color}40`,
                        boxShadow: `0 0 15px ${edu.color}20`
                      }}
                    >
                      <div 
                        className="w-3 h-3 rounded-full animate-pulse"
                        style={{ backgroundColor: edu.color, boxShadow: `0 0 10px ${edu.color}` }}
                      />
                    </div>
                  </div>

                  {/* Spacer for MD screens to keep symmetry */}
                  <div className={`hidden md:block w-[45%] ${isEven ? 'order-1' : 'order-2'}`} />

                  {/* Content Card */}
                  <div className={`w-full md:w-[45%] pl-20 md:pl-0 ${isEven ? 'md:text-right order-2' : 'md:text-left order-1'}`}>
                    <div 
                      className={`relative p-6 sm:p-8 rounded-2xl border transition-all duration-500 hover:-translate-y-2 ${
                        isDark 
                        ? 'bg-[#0a101d]/60 border-white/5 backdrop-blur-xl' 
                        : 'bg-white border-gray-100 shadow-xl'
                      }`}
                      style={{ 
                        borderLeft: isDark && !isEven ? `4px solid ${edu.color}` : 'inherit',
                        borderRight: isDark && isEven ? `4px solid ${edu.color}` : 'inherit'
                      }}
                    >
                      {/* Scanline Effect Overlay */}
                      {isDark && <div className="absolute inset-0 pointer-events-none opacity-[0.03] bg-[linear-gradient(rgba(18,16,16,0)_50%,rgba(0,0,0,0.25)_50%),linear-gradient(90deg,rgba(255,0,0,0.06),rgba(0,255,0,0.02),rgba(0,0,255,0.06))] bg-[length:100%_2px,3px_100%]" />}

                      <div className="flex flex-col gap-2 relative z-10">
                        <span className="font-mono text-[10px] tracking-[0.2em] text-gray-500 uppercase flex items-center md:justify-end gap-2 text-inherit">
                          {isEven ? <></> : <Calendar size={12} />}
                          {edu.period}
                          {isEven ? <Calendar size={12} /> : <></>}
                        </span>
                        
                        <h3 className={`text-2xl font-bold tracking-tight ${isDark ? 'text-white' : 'text-gray-900'}`}>
                          {edu.degree}
                        </h3>
                        
                        <p className="text-cyan-500 font-mono text-sm tracking-wide font-bold">
                          {edu.institution}
                        </p>
                        
                        <p className={`text-sm mt-2 leading-relaxed ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
                          {edu.info}
                        </p>

                        <div className={`mt-6 pt-6 border-t border-white/5 flex items-center gap-4 ${isEven ? 'md:justify-end' : 'justify-start'}`}>
                          <div className="flex items-center gap-2">
                            <MapPin size={14} className="text-gray-500" />
                            <span className="text-[10px] uppercase tracking-widest text-gray-400">{edu.location}</span>
                          </div>
                          
                          <div 
                            className="px-3 py-1 rounded-md text-[10px] font-black font-mono tracking-widest border"
                            style={{ 
                              color: edu.color, 
                              borderColor: `${edu.color}40`,
                              backgroundColor: `${edu.color}10`
                            }}
                          >
                            {edu.metric}
                          </div>
                        </div>

                        {/* Status Bit */}
                        <div className={`absolute top-4 ${isEven ? 'left-4' : 'right-4'} opacity-20`}>
                          <span className="text-[8px] font-mono tracking-tighter uppercase">{edu.status}</span>
                        </div>
                      </div>

                      {/* Connection Line Micro-Decor */}
                      <div className={`hidden md:block absolute top-5 w-12 h-px bg-gradient-to-r ${
                        isEven ? 'right-full bg-gradient-to-l' : 'left-full bg-gradient-to-r'
                      } from-white/10 to-transparent pointer-events-none`} />
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Bottom Decorative Footer */}
        <div className="mt-32 flex flex-wrap justify-center gap-12 opacity-30">
          <div className="flex items-center gap-3 text-gray-500 font-mono text-[10px] tracking-widest uppercase">
            <Cpu size={14} /> System_Load: 4.2%
          </div>
          <div className="flex items-center gap-3 text-gray-500 font-mono text-[10px] tracking-widest uppercase">
            <ShieldCheck size={14} /> Security_Protocol: Active
          </div>
          <div className="flex items-center gap-3 text-gray-500 font-mono text-[10px] tracking-widest uppercase">
            <Zap size={14} /> Neural_Sync: 100%
          </div>
        </div>
      </div>
    </section>
  );
};

export default Education;
