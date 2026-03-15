import { Award, ArrowRight, ShieldCheck, Fingerprint, Lock, CheckCircle2 } from "lucide-react";
import { useScrollAnimation } from "../hooks/useScrollAnimation";
import { useState, useEffect, useRef } from "react";

const defaultCertificates = [
  {
    _id: "1",
    title: "Full Stack Development",
    issuer: "CipherSchools",
    year: 2025,
    authCode: "AUTH-687FC",
    certificateUrl: "https://www.cipherschools.com/certificate/preview?id=687fc07f7efd6d5090704b75",
    status: "VERIFIED",
    color: "#00f3ff"
  },
  {
    _id: "2",
    title: "Data Structures & Algorithms",
    issuer: "CipherSchools",
    year: 2024,
    authCode: "DSA-10095",
    certificateUrl: "https://cipher-other-assets.s3.ap-south-1.amazonaws.com/certificates/TC_ayushkamboj9690%40gmail.com_CS2024-10095",
    status: "VERIFIED",
    color: "#10b981"
  },
  {
    _id: "3",
    title: "Web Development",
    issuer: "FreeCodeCamp",
    year: 2023,
    authCode: "FCC-RESP",
    certificateUrl: "https://www.freecodecamp.org/certification/ayush11121/responsive-web-design",
    status: "VERIFIED",
    color: "#f472b6"
  },
  {
    _id: "4",
    title: "TCP/IP & Advanced Topics",
    issuer: "Univ. of Colorado",
    year: 2024,
    authCode: "COUR-VIFB",
    certificateUrl: "https://www.coursera.org/account/accomplishments/verify/VIFB2C666BBE",
    status: "VERIFIED",
    color: "#a78bfa"
  },
  {
    _id: "5",
    title: "Git & GitHub",
    issuer: "Coursera",
    year: 2024,
    authCode: "GIT-COLLAB",
    certificateUrl: "#",
    status: "PENDING_SCAN",
    color: "#94a3b8"
  },
  {
    _id: "6",
    title: "Computer Networking",
    issuer: "Google",
    year: 2024,
    authCode: "GOOG-NET",
    certificateUrl: "https://www.coursera.org/account/accomplishments/verify/CNHB5EQYM2DJ",
    status: "VERIFIED",
    color: "#fbbf24"
  },
  {
    _id: "7",
    title: "Programming in C#",
    issuer: "LPU",
    year: 2024,
    authCode: "LPU-CSHARP",
    certificateUrl: "https://lpucolab438.examly.io/certificate/U2FsdGVkX18vYGsEUEjM9GWvAceXt4J9UmKminDAmoE%3D",
    status: "VERIFIED",
    color: "#a855f7"
  },
  {
    _id: "8",
    title: "Python Basics",
    issuer: "HackerRank",
    year: 2024,
    authCode: "HR-PYTHON",
    certificateUrl: "https://www.hackerrank.com/certificates/070ce0ad031e",
    status: "VERIFIED",
    color: "#3b82f6"
  },
  {
    _id: "9",
    title: "Leadership Mastery",
    issuer: "Udemy",
    year: 2023,
    authCode: "UDEMY-LEAD",
    certificateUrl: "https://www.udemy.com/certificate/UC-0495b156-4790-4f69-961f-2a4e3c8a74a9/",
    status: "VERIFIED",
    color: "#f97316"
  },
];

const Certifications = ({ isDark }) => {
  const sectionRef = useScrollAnimation({ animationType: 'up' });
  const scrollContainerRef = useRef(null);
  const [activeIndex, setActiveIndex] = useState(0);

  // Ensure initial scroll position is 0 on mount
  useEffect(() => {
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollLeft = 0;
    }
  }, []);


  // Handle scroll to update active dot with debouncing logic
  const handleScroll = () => {
    if (scrollContainerRef.current) {
      const container = scrollContainerRef.current;
      const firstCard = container.querySelector('.snap-center');
      if (!firstCard) return;

      const cardWidth = firstCard.offsetWidth + 24;
      const newIndex = Math.round(container.scrollLeft / cardWidth);
      
      if (newIndex !== activeIndex && newIndex >= 0 && newIndex < defaultCertificates.length) {
        setActiveIndex(newIndex);
      }
    }
  };

  const scrollToCard = (index) => {
    if (scrollContainerRef.current) {
      const container = scrollContainerRef.current;
      const firstCard = container.querySelector('.snap-center');
      if (!firstCard) return;

      const cardWidth = firstCard.offsetWidth + 24;
      container.scrollTo({
        left: index * cardWidth,
        behavior: 'smooth'
      });
    }
  };

  return (
    <section
      id="certifications"
      ref={sectionRef}
      className={`relative py-32 overflow-hidden transition-colors duration-500 ${isDark ? "bg-[#050b14]" : "bg-gray-50"}`}
      style={{ willChange: 'transform' }}
    >
      {/* Decorative Grid Background */}
      {isDark && (
        <div className="absolute inset-0 pointer-events-none opacity-20">
          <div className="absolute inset-0" style={{ backgroundImage: 'radial-gradient(#1e293b 1px, transparent 1px)', backgroundSize: '40px 40px' }} />
        </div>
      )}

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <div className="text-center mb-24">
          <h2 className={`text-5xl md:text-6xl font-black mb-6 tracking-tighter ${isDark ? 'text-white' : 'text-gray-900'} uppercase`}>
            AUTH_CLEARANCE<span className="text-violet-500">[::]</span>
          </h2>
          <div className="flex items-center justify-center gap-4">
            <div className="h-px w-12 bg-gray-500/30" />
            <p className="font-mono text-xs tracking-[0.3em] uppercase text-violet-500/80">Secured Achievement Database</p>
            <div className="h-px w-12 bg-gray-500/30" />
          </div>
        </div>

        {/* Scrollable Certifications Container */}
        <div className="relative group/scroll">
          {/* Scroll Header Decor */}
          <div className="flex justify-between items-center mb-6 px-2 opacity-50">
             <div className="flex items-center gap-3">
                <div className="w-2 h-2 rounded-full bg-cyan-500" />
                <span className="font-mono text-[9px] text-cyan-500 tracking-[0.3em] uppercase">
                  CERT_STREAM_READY
                </span>
             </div>
             <div className="flex items-center gap-4">
               <span className="font-mono text-[8px] text-gray-500 uppercase tracking-widest hidden sm:block">INDEX: 0{activeIndex + 1} // 09</span>
               <span className="font-mono text-[8px] text-gray-500 uppercase tracking-widest">BITS_PER_SEC: 1024.kbps</span>
             </div>
          </div>

          <div 
            ref={scrollContainerRef}
            onScroll={handleScroll}
            className="flex gap-6 pb-8 overflow-x-auto snap-x snap-mandatory hide-scrollbar hide-scrollbar-chrome"
          >
            {defaultCertificates.map((cert, index) => (
              <div
                key={cert._id}
                className={`flex-none w-[320px] sm:w-[380px] snap-center relative p-8 rounded-xl border group transition-all duration-500 hover:-translate-y-2 ${
                  isDark 
                  ? "bg-[#0a101d]/60 border-white/5 backdrop-blur-xl" 
                  : "bg-white border-gray-200 shadow-xl"
                }`}
                style={{ 
                  animationDelay: `${index * 0.1}s`,
                }}
              >
                {/* Header Badge */}
                <div className="flex items-center justify-between mb-8">
                  <div 
                    className="w-12 h-12 rounded-lg flex items-center justify-center border shadow-inner transition-transform duration-500 group-hover:rotate-[360deg]"
                    style={{ 
                      backgroundColor: `${cert.color}10`,
                      borderColor: `${cert.color}40`,
                      color: cert.color
                    }}
                  >
                    <Award size={24} />
                  </div>
                  <div className="flex items-center gap-2">
                    <Fingerprint size={12} className="text-gray-500" />
                    <span className="font-mono text-[8px] text-gray-500 tracking-tighter uppercase">{cert.authCode}</span>
                  </div>
                </div>

                <h3 className={`text-xl font-bold mb-2 tracking-tight h-[3.5rem] line-clamp-2 ${isDark ? 'text-white' : 'text-gray-900'}`}>
                  {cert.title}
                </h3>
                
                <div className="space-y-4 mb-8">
                  <div className="flex items-center justify-between">
                    <span className="text-[10px] font-mono text-gray-500 uppercase tracking-widest">ISSUER</span>
                    <span className={`text-[10px] font-bold font-mono tracking-wide ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>
                      {cert.issuer}
                    </span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-[10px] font-mono text-gray-500 uppercase tracking-widest">VAL_YEAR</span>
                    <span className={`text-[10px] font-bold font-mono tracking-wide ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>
                      {cert.year}
                    </span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-[10px] font-mono text-gray-500 uppercase tracking-widest">STATUS</span>
                    <div className="flex items-center gap-1.5">
                      <div className={`w-1.5 h-1.5 rounded-full ${cert.status === 'VERIFIED' ? 'bg-emerald-500' : 'bg-gray-500'}`} />
                      <span className={`text-[10px] font-black font-mono tracking-widest ${cert.status === 'VERIFIED' ? 'text-emerald-500' : 'text-gray-500'}`}>
                        {cert.status}
                      </span>
                    </div>
                  </div>
                </div>

                <a
                  href={cert.certificateUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full flex items-center justify-center gap-2 py-3 rounded-lg font-mono text-[10px] tracking-[0.2em] font-black uppercase transition-all duration-300 bg-white/5 border border-white/5 hover:border-violet-500/50 hover:bg-violet-500/10 text-gray-400 hover:text-white"
                >
                  ACCESS_CREDENTIALS <ArrowRight size={14} />
                </a>

                {/* Decorative Scanline */}
                <div className="absolute bottom-0 left-0 w-full h-[2px] overflow-hidden pointer-events-none rounded-b-xl">
                   <div className="w-full h-full bg-gradient-to-r from-transparent via-violet-500 to-transparent animate-pulse opacity-30" />
                </div>
              </div>
            ))}
          </div>

          {/* Dot Form Pagination */}
          <div className="flex justify-center items-center gap-3 mt-8">
            {defaultCertificates.map((_, i) => (
              <button
                key={i}
                onClick={() => scrollToCard(i)}
                className={`transition-all duration-500 rounded-full ${
                  activeIndex === i 
                  ? 'w-8 h-1.5 bg-gradient-to-r from-violet-500 to-cyan-500 shadow-[0_0_10px_rgba(139,92,246,0.5)]' 
                  : 'w-1.5 h-1.5 bg-gray-700 hover:bg-gray-500'
                }`}
                aria-label={`Go to certificate ${i + 1}`}
              />
            ))}
          </div>
          
          {/* Custom Styles */}
          <style dangerouslySetInnerHTML={{ __html: `
            .hide-scrollbar::-webkit-scrollbar {
              display: none;
            }
            .hide-scrollbar {
              -ms-overflow-style: none;
              scrollbar-width: none;
            }
          `}} />
        </div>

        {/* Achievements / Telemetry Section */}
        <div className="relative pt-20 border-t border-white/5 mt-16">
           <div className="flex flex-col md:flex-row gap-8 justify-between">
              {[
                { label: "Active_Clearance", val: "LEVEL_4", icon: ShieldCheck, color: "#10b981" },
                { label: "Protocol_Success", val: "98.2%", icon: CheckCircle2, color: "#00f3ff" },
                { label: "Neural_Encryption", val: "EN-SHA256", icon: Lock, color: "#a78bfa" }
              ].map((item, i) => (
                <div key={i} className="flex-1 p-6 rounded-xl bg-white/5 border border-white/5 flex items-center gap-6 group hover:border-white/20 transition-all duration-300">
                  <div className="p-4 rounded-full bg-white/5 transition-transform duration-300 group-hover:rotate-12">
                    <item.icon size={28} style={{ color: item.color }} />
                  </div>
                  <div className="flex flex-col">
                    <span className="text-[8px] font-mono text-gray-500 uppercase tracking-[0.3em]">{item.label}</span>
                    <span className={`text-2xl font-black font-sans tracking-tighter ${isDark ? 'text-white' : 'text-gray-900'}`}>{item.val}</span>
                  </div>
                </div>
              ))}
           </div>
        </div>
      </div>
    </section>
  );
};

export default Certifications;
