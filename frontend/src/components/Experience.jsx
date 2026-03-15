import { Briefcase, Calendar, MapPin, Terminal, Hexagon, Zap } from 'lucide-react';
import { useScrollAnimation } from '../hooks/useScrollAnimation';

const defaultExperiences = [
  {
    _id: '1',
    title: 'STUDENT_INTERN',
    company: 'CipherSchools',
    type: 'APPRENTICESHIP',
    unitId: 'MERN_U_01',
    startDate: 'JUN_2025',
    endDate: 'JUL_2025',
    location: 'REMOTE_SYNC',
    outcome: 'DEPLOYED_SUCCESS',
    description: 'Executed 6-week intensive MERN development cycle. Engineered full-stack modules using decentralized database structures and responsive client architectures.',
    highlights: [
      'Architected JSON-based communication protocols between React nodes and Express kernels.',
      'Optimized MongoDB throughput for high-concurrency data operations.',
      'Synchronized frontend-backend clusters using modern REST paradigms.'
    ],
    skills: ['MERN', 'MongoDB', 'React', 'NodeJS', 'Express']
  }
];

const Experience = ({ isDark }) => {
  const sectionRef = useScrollAnimation({ animationType: 'up' });
  
  return (
    <section
      id="experience"
      ref={sectionRef}
      className={`relative py-32 overflow-hidden transition-colors duration-500 ${isDark ? 'bg-[#050b14]' : 'bg-gray-50'}`}
    >
      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <div className="text-center mb-24">
          <h2 className={`font-black mb-6 tracking-tighter ${isDark ? 'text-white' : 'text-gray-900'} uppercase section-header-text`}>
            DEPLOYMENT_HISTORY<span className="text-emerald-500">.log</span>
          </h2>
          <div className="flex items-center justify-center gap-4">
            <div className="h-px w-12 bg-gray-500/30" />
            <p className="font-mono text-xs tracking-[0.3em] uppercase text-emerald-500/80">Archived Service Records</p>
            <div className="h-px w-12 bg-gray-500/30" />
          </div>
        </div>

        <div className="space-y-12">
          {defaultExperiences.map((exp, index) => (
            <div
              key={exp._id}
              className={`relative overflow-hidden group rounded-xl border transition-all duration-500 ${
                isDark 
                ? 'bg-[#0a101d]/60 border-white/5 backdrop-blur-xl' 
                : 'bg-white border-gray-100 shadow-xl'
              }`}
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              {/* Card Terminal Header */}
              <div className="p-4 border-b border-white/5 flex items-center justify-between bg-white/5">
                <div className="flex items-center gap-3">
                  <Terminal size={14} className="text-emerald-500" />
                  <span className="font-mono text-[10px] tracking-widest text-gray-500 uppercase">
                    UNIT_ID_{exp.unitId}
                  </span>
                </div>
                <div className="flex items-center gap-2">
                   <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                   <span className="font-mono text-[9px] text-emerald-500/80 tracking-widest uppercase">CONNECTION_STABLE</span>
                </div>
              </div>

              <div className="p-6 md:p-10">
                <div className="grid lg:grid-cols-12 gap-12">
                  {/* Left Metadata */}
                  <div className="lg:col-span-4 space-y-6 lg:border-r lg:border-white/5 pr-8">
                    <div className="space-y-2">
                       <span className="text-[10px] font-mono text-gray-500 uppercase tracking-widest">POSITION</span>
                       <h3 className={`text-2xl font-black tracking-tighter uppercase ${isDark ? 'text-white' : 'text-gray-900'}`}>{exp.title}</h3>
                    </div>
                    
                    <div className="space-y-2">
                       <span className="text-[10px] font-mono text-gray-500 uppercase tracking-widest">ORCHESTRATOR</span>
                       <p className="text-emerald-500 font-black font-mono tracking-wide">{exp.company}</p>
                    </div>

                    <div className="grid grid-cols-2 gap-4 pt-4">
                      <div className="flex flex-col gap-1">
                         <div className="flex items-center gap-2 text-gray-500">
                           <Calendar size={12} /> <span className="text-[9px] font-mono uppercase tracking-widest">PERIOD</span>
                         </div>
                         <span className={`text-[11px] font-bold ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>{exp.startDate} - {exp.endDate}</span>
                      </div>
                      <div className="flex flex-col gap-1">
                         <div className="flex items-center gap-2 text-gray-500">
                           <MapPin size={12} /> <span className="text-[9px] font-mono uppercase tracking-widest">NODE</span>
                         </div>
                         <span className={`text-[11px] font-bold ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>{exp.location}</span>
                      </div>
                    </div>

                    <div className="pt-8 space-y-3">
                       <span className="text-[10px] font-mono text-gray-500 uppercase tracking-widest">TECH_STACK_SYNC</span>
                       <div className="flex flex-wrap gap-2">
                         {exp.skills.map(skill => (
                           <span key={skill} className="px-3 py-1 bg-white/5 border border-white/5 text-[9px] font-mono tracking-tighter text-gray-400 uppercase rounded hover:border-emerald-500/30 transition-colors">
                             {skill}
                           </span>
                         ))}
                       </div>
                    </div>
                  </div>

                  {/* Right Description/Logs */}
                  <div className="lg:col-span-8 space-y-8">
                     <div className="space-y-4">
                        <div className="flex items-center gap-3">
                           <Hexagon size={16} className="text-emerald-500" />
                           <span className="text-xs font-mono font-black tracking-[0.2em] text-white uppercase">LOG_SUMMARY</span>
                        </div>
                        <p className={`text-base leading-relaxed ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
                          {exp.description}
                        </p>
                     </div>

                     <div className="space-y-6">
                        <div className="flex items-center gap-3">
                           <Zap size={16} className="text-amber-500" />
                           <span className="text-xs font-mono font-black tracking-[0.2em] text-white uppercase">PROTOCOL_OUTCOMES</span>
                        </div>
                        <ul className="space-y-4">
                          {exp.highlights.map((highlight, i) => (
                            <li key={i} className="flex items-start gap-4 group/li">
                               <div className="mt-1.5 w-1.5 h-1.5 rounded-full bg-emerald-500/40 group-hover/li:bg-emerald-500 transition-colors" />
                               <p className={`text-sm leading-relaxed ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>{highlight}</p>
                            </li>
                          ))}
                        </ul>
                     </div>

                     <div className="pt-6 mt-8 border-t border-white/5 flex items-center justify-between">
                        <div className="flex items-center gap-2">
                           <span className="text-[9px] font-mono text-gray-500 uppercase tracking-widest">STATUS_REPORT:</span>
                           <span className="text-[10px] font-black font-mono text-emerald-500 tracking-widest uppercase">{exp.outcome}</span>
                        </div>
                        <div className="flex gap-1">
                           {[1, 2, 3, 4].map(i => (
                             <div key={i} className={`w-4 h-1 rounded-full ${i <= 3 ? 'bg-emerald-500/40' : 'bg-gray-700'}`} />
                           ))}
                        </div>
                     </div>
                  </div>
                </div>
              </div>

              {/* Decorative Scanline */}
              <div className="absolute inset-x-0 bottom-0 h-1 bg-gradient-to-r from-transparent via-emerald-500/20 to-transparent" />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Experience;
