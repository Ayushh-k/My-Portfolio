import { useEffect, useState, useRef } from 'react';
import { skillAPI } from '../api/axiosConfig';
import { Code2, Palette, Server, Database, Wrench, GitBranch, Terminal, Activity, Zap } from 'lucide-react';
import { useScrollAnimation } from '../hooks/useScrollAnimation';
import { useSkillBarAnimation } from '../hooks/useSkillBarAnimation';

const Skills = ({ isDark }) => {
  const sectionRef = useScrollAnimation({ animationType: 'up' });
  const skillsRef = useSkillBarAnimation();
  const scrollContainerRef = useRef(null);
  const [skills, setSkills] = useState({});
  const [loading, setLoading] = useState(true);
  const [activeIndex, setActiveIndex] = useState(0);

  // Ensure initial scroll position is 0 on mount
  useEffect(() => {
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollLeft = 0;
    }
  }, []);

  const proficiencyMap = {
    'Expert': 95,
    'Advanced': 85,
    'Intermediate': 70,
    'Beginner': 50
  };

  const iconMap = {
    'Programming Languages': Code2,
    Frontend: Palette,
    Backend: Server,
    Databases: Database,
    'Data Structures': Activity,
    Tools: Wrench,
    'Version Control': GitBranch
  };

  const categoryColors = {
    'Programming Languages': '#fbbf24', // Amber
    Frontend: '#00f3ff', // Cyan
    Backend: '#10b981', // Emerald
    Databases: '#a78bfa', // Violet
    'Data Structures': '#ef4444', // Red
    Tools: '#fb923c', // Orange
    'Version Control': '#f472b6' // Pink
  };

  const defaultSkills = {
    'Programming Languages': [
      { name: 'Java', proficiency: 'Advanced' },
      { name: 'JavaScript', proficiency: 'Advanced' },
      { name: 'SQL', proficiency: 'Advanced' },
      { name: 'PHP', proficiency: 'Intermediate' }
    ],
    Frontend: [
      { name: 'HTML5', proficiency: 'Expert' },
      { name: 'CSS3', proficiency: 'Expert' },
      { name: 'React.js', proficiency: 'Advanced' },
      { name: 'Tailwind CSS', proficiency: 'Advanced' }
    ],
    Backend: [
      { name: 'Node.js', proficiency: 'Advanced' },
      { name: 'Express.js', proficiency: 'Advanced' },
      { name: 'JDBC', proficiency: 'Advanced' },
      { name: 'REST APIs', proficiency: 'Advanced' }
    ],
    Databases: [
      { name: 'MongoDB', proficiency: 'Expert' },
      { name: 'Mongoose', proficiency: 'Expert' },
      { name: 'MySQL', proficiency: 'Advanced' },
      { name: 'PostgreSQL', proficiency: 'Intermediate' }
    ],
    'Data Structures': [
      { name: 'Arrays & Strings', proficiency: 'Expert' },
      { name: 'Linked Lists', proficiency: 'Advanced' },
      { name: 'Trees & Graphs', proficiency: 'Advanced' },
      { name: 'Dynamic Prog.', proficiency: 'Intermediate' }
    ],
    Tools: [
      { name: 'Git', proficiency: 'Advanced' },
      { name: 'GitHub', proficiency: 'Advanced' },
      { name: 'VS Code', proficiency: 'Expert' },
      { name: 'Postman', proficiency: 'Advanced' }
    ],
    'Version Control': [
      { name: 'Git', proficiency: 'Advanced' },
      { name: 'GitHub', proficiency: 'Advanced' },
      { name: 'GitLab', proficiency: 'Intermediate' }
    ]
  };

  useEffect(() => {
    const fetchSkills = async () => {
      try {
        const response = await skillAPI.getAll();
        const data = response.data.data;
        setSkills(data && Object.keys(data).length > 0 ? data : defaultSkills);
      } catch (err) {
        setSkills(defaultSkills);
      } finally {
        setLoading(false);
      }
    };
    setSkills(defaultSkills);
    setLoading(false);
    fetchSkills();
  }, []);

  const skillEntries = Object.entries(skills);


  const handleScroll = () => {
    if (scrollContainerRef.current) {
      const container = scrollContainerRef.current;
      const firstCard = container.querySelector('.snap-center');
      if (!firstCard) return;

      const cardWidth = firstCard.offsetWidth + 32;
      const newIndex = Math.round(container.scrollLeft / cardWidth);
      
      if (newIndex !== activeIndex && newIndex >= 0 && newIndex < skillEntries.length) {
        setActiveIndex(newIndex);
      }
    }
  };

  const scrollToCard = (index) => {
    if (scrollContainerRef.current) {
      const container = scrollContainerRef.current;
      const firstCard = container.querySelector('.snap-center');
      if (!firstCard) return;

      const cardWidth = firstCard.offsetWidth + 32;
      container.scrollTo({
        left: index * cardWidth,
        behavior: 'smooth'
      });
    }
  };

  return (
    <section
      id="skills"
      ref={sectionRef}
      className={`relative py-32 overflow-hidden transition-colors duration-500 ${isDark ? 'bg-[#050b14]' : 'bg-gray-50'}`}
      style={{ willChange: 'transform' }}
    >
      <div ref={skillsRef} className="max-w-7xl mx-auto px-6 relative z-10">
        <div className="text-center mb-24">
          <h2 className={`font-black mb-6 tracking-tighter ${isDark ? 'text-white' : 'text-gray-900'} uppercase section-header-text text-5xl md:text-6xl`}>
            THE_TECH_ARSENAL<span className="text-amber-500">.v4</span>
          </h2>
          <div className="flex items-center justify-center gap-4">
            <div className="h-px w-12 bg-gray-500/30" />
            <p className="font-mono text-xs tracking-[0.3em] uppercase text-amber-500/80">Subsystem Capacity Matrix</p>
            <div className="h-px w-12 bg-gray-500/30" />
          </div>
        </div>

        {/* Horizontal Stream Container */}
        <div className="relative group/scroll">
          {/* Scroll Header Decor */}
          <div className="flex justify-between items-center mb-6 px-2 opacity-50">
             <div className="flex items-center gap-3">
                <div className="w-2 h-2 rounded-full bg-amber-500" />
                <span className="font-mono text-[9px] text-amber-500 tracking-[0.3em] uppercase">
                  ARSENAL_MODULE_READY
                </span>
             </div>
             <div className="flex items-center gap-4">
               <span className="font-mono text-[8px] text-gray-500 uppercase tracking-widest hidden sm:block">MODULE: 0{activeIndex + 1} // 0{skillEntries.length}</span>
               <span className="font-mono text-[8px] text-gray-500 uppercase tracking-widest">THROUGHPUT: OPTIMIZED</span>
             </div>
          </div>

          <div 
            ref={scrollContainerRef}
            onScroll={handleScroll}
            className="flex gap-8 pb-12 overflow-x-auto snap-x snap-mandatory hide-scrollbar"
            style={{ scrollBehavior: 'smooth' }}
          >
            {skillEntries.map(([category, categorySkills], index) => {
              const IconComponent = iconMap[category] || Code2;
              const color = categoryColors[category] || '#06b6d4';
              
              return (
                <div
                  key={category}
                  className={`flex-none w-[300px] sm:w-[380px] snap-center relative p-6 sm:p-8 rounded-xl border group transition-all duration-500 ${
                    isDark
                      ? 'bg-[#0a101d]/60 border-white/5 backdrop-blur-xl'
                      : 'bg-white border-gray-100 shadow-xl'
                  }`}
                  style={{ animationDelay: `${index * 0.15}s` }}
                >
                  {/* Module Header */}
                  <div className="flex items-center justify-between mb-8">
                     <div 
                      className="p-3 rounded-lg border flex items-center justify-center shadow-lg"
                      style={{ 
                        backgroundColor: `${color}05`,
                        borderColor: `${color}30`,
                        color: color,
                        boxShadow: `0 0 15px ${color}15`
                      }}
                    >
                      <IconComponent size={24} />
                    </div>
                    <div className="flex flex-col items-end">
                       <span className="font-mono text-[9px] text-gray-500 tracking-widest uppercase mb-1">MODULE_SYNC</span>
                       <div className="flex gap-1">
                          {[1, 2, 3].map(i => (
                            <div key={i} className={`w-3 h-1 rounded-full ${i <= 2 ? '' : 'opacity-20'}`} style={{ backgroundColor: color }} />
                          ))}
                       </div>
                    </div>
                  </div>

                  <h3 className={`text-xl font-black font-mono tracking-tighter mb-8 uppercase ${isDark ? 'text-white' : 'text-gray-900'}`}>
                    {category}
                  </h3>

                  <div className="space-y-6">
                    {Array.isArray(categorySkills) && categorySkills.map((skill) => {
                      const skillName = skill.name || skill;
                      const proficiency = skill.proficiency || 'Advanced';
                      const width = proficiencyMap[proficiency] || 75;
                      
                      return (
                        <div key={skillName} className="space-y-2">
                          <div className="flex justify-between items-end">
                            <div className="flex items-center gap-2">
                               <Terminal size={10} className="text-gray-500" />
                               <span className={`text-[11px] font-mono tracking-widest uppercase ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>
                                  {skillName}
                               </span>
                            </div>
                            <span className="text-[10px] font-black font-mono tracking-tighter" style={{ color: color }}>
                              {width}%
                            </span>
                          </div>
                          
                          <div className={`h-1.5 rounded-full overflow-hidden relative ${isDark ? 'bg-white/5' : 'bg-gray-100'}`}>
                             <div 
                               className="skill-bar-fill h-full rounded-full relative overflow-hidden w-0 transition-all duration-1000 ease-out"
                               style={{ 
                                 '--width': `${width}%`,
                                 backgroundColor: color,
                                 boxShadow: `0 0 10px ${color}40`
                               }}
                             >
                                <div className="absolute inset-0 w-full h-full bg-gradient-to-r from-transparent via-white/30 to-transparent animate-shimmer" style={{ backgroundSize: '200% 100%' }} />
                             </div>
                          </div>
                        </div>
                      );
                    })}
                  </div>

                  {/* Bottom Module Telemetry */}
                  <div className="mt-10 pt-6 border-t border-white/5 flex items-center justify-between">
                     <div className="flex items-center gap-2">
                         <Activity size={12} className="text-gray-500" />
                         <span className="text-[8px] font-mono text-gray-500 tracking-[0.2em] uppercase">LINKED_CAPACITY</span>
                     </div>
                     <Zap size={12} className="text-amber-500 opacity-30 group-hover:opacity-100 transition-opacity" />
                  </div>
                </div>
              );
            })}
          </div>

          {/* Dot Form Pagination */}
          <div className="flex justify-center items-center gap-3 mt-4">
            {skillEntries.map((_, i) => (
              <button
                key={i}
                onClick={() => scrollToCard(i)}
                className={`transition-all duration-500 rounded-full ${
                  activeIndex === i 
                  ? 'w-8 h-1.5 bg-gradient-to-r from-amber-500 to-orange-500 shadow-[0_0_10px_rgba(245,158,11,0.5)]' 
                  : 'w-1.5 h-1.5 bg-gray-700 hover:bg-gray-500'
                }`}
                aria-label={`Go to skill module ${i + 1}`}
              />
            ))}
          </div>
        </div>
      </div>

      <style dangerouslySetInnerHTML={{ __html: `
        @keyframes shimmer {
          0% { transform: translateX(-100%); }
          100% { transform: translateX(100%); }
        }
        .animate-shimmer {
          animation: shimmer 3s infinite linear;
        }
        .hide-scrollbar::-webkit-scrollbar {
          display: none;
        }
        .hide-scrollbar {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
      `}} />
    </section>
  );
};

export default Skills;
