import { useState, useRef, useEffect } from "react";
import { Github, Globe, Code2, Zap, Terminal, Layers, Box, ArrowRight, Heart, MessageCircle, Send } from "lucide-react";
import { useScrollAnimation } from "../hooks/useScrollAnimation";
import { interactionAPI } from '../api/axiosConfig';

// Auto-scrolling image carousel for project cards
const ProjectCarousel = ({ images, color }) => {
  const [current, setCurrent] = useState(0);
  const timerRef = useRef(null);

  const startTimer = () => {
    timerRef.current = setInterval(() => {
      setCurrent(prev => (prev + 1) % images.length);
    }, 2500);
  };

  useEffect(() => {
    startTimer();
    return () => clearInterval(timerRef.current);
  }, [images.length]);

  const goTo = (i) => {
    clearInterval(timerRef.current);
    setCurrent(i);
    startTimer();
  };

  return (
    <div className="relative w-full overflow-hidden rounded-lg" style={{ aspectRatio: '16/9' }}>
      {images.map((src, i) => (
        <img
          key={i}
          src={src}
          alt={`Screenshot ${i + 1}`}
          className="absolute inset-0 w-full h-full object-cover object-top transition-opacity duration-700"
          style={{ opacity: i === current ? 1 : 0 }}
          draggable={false}
        />
      ))}
      {/* Overlay gradient at bottom */}
      <div className="absolute inset-x-0 bottom-0 h-10 bg-gradient-to-t from-black/60 to-transparent pointer-events-none" />
      {/* Dot indicators */}
      <div className="absolute bottom-2 left-1/2 -translate-x-1/2 flex gap-1.5">
        {images.map((_, i) => (
          <button
            key={i}
            onClick={() => goTo(i)}
            className="rounded-full transition-all duration-300"
            style={{
              width: i === current ? '16px' : '5px',
              height: '5px',
              backgroundColor: i === current ? color : 'rgba(255,255,255,0.4)',
              boxShadow: i === current ? `0 0 6px ${color}` : 'none',
            }}
            aria-label={`Go to slide ${i + 1}`}
          />
        ))}
      </div>
    </div>
  );
};

const defaultProjects = [
  {
    _id: "1",
    title: "AyurSetu",
    shortDescription: "Bridge to Wellness",
    description: "A full-stack web application for optimizing doctor availability and appointment scheduling.",
    technologies: ["React.js", "Node.js", "Express", "REST API"],
    metrics: { status: "ACTIVE", complexity: "MODULAR", auth: "0x1A" },
    githubLink: "https://github.com/Ayushh-k/AyurSetu.git",
    liveLink: "https://ayur-setu-v1u5.vercel.app",
    category: "Fullstack",
    color: "#00f3ff",
    images: [
      "/images/ayursetu-1.png",
      "/images/ayursetu-2.png",
      "/images/ayursetu-3.png",
      "/images/ayursetu-4.png",
      "/images/ayursetu-5.png",
    ]
  },
  {
    _id: "2",
    title: "Job Tracker",
    shortDescription: "Career Management System",
    description: "A web application to organize and track job applications efficiently with company tracking.",
    technologies: ["React.js", "Node.js", "MySQL"],
    metrics: { status: "STABLE", complexity: "LINEAR", auth: "0x4C" },
    githubLink: "https://github.com/Ayushh-k/Job-Application-tracker.git",
    liveLink: "",
    category: "fullstack",
    color: "#10b981",
    images: [
      "/images/jobtracker-1.png",
      "/images/jobtracker-2.png",
      "/images/jobtracker-3.png",
    ]
  },
  {
    _id: "3",
    title: "Survey Portal",
    shortDescription: "Data Capture Interface",
    description: "A web-based survey platform for creating and managing surveys with real-time response analysis.",
    technologies: ["HTML", "JS", "PHP", "MySQL"],
    metrics: { status: "LEGACY", complexity: "SIMPLE", auth: "0x9E" },
    githubLink: "https://github.com/Ayushh-k/SurveyPortal-website.git",
    liveLink: "#",
    category: "fullstack",
    color: "#a78bfa",
    images: [
      "/images/survey-1.png",
      "/images/survey-2.png",
      "/images/survey-3.png",
    ]
  },
  {
    _id: "4",
    title: "Resource Monitor",
    shortDescription: "System Telemetry Tool",
    description: "Real-time tracking of system resources like CPU, memory, and process usage.",
    technologies: ["Node.js", "Express", "MySQL", "JS"],
    metrics: { status: "EXPERIMENTAL", complexity: "OPTIMIZED", auth: "0xFF" },
    githubLink: "https://github.com/Ayushh-k/Resource_Monitoring_System.git",
    liveLink: "#",
    category: "fullstack",
    color: "#fb923c",
    images: [
      "/images/monitor-1.png",
      "/images/monitor-2.png",
      "/images/monitor-3.png",
    ]
  },
];

const Projects = ({ isDark }) => {
  const sectionRef = useScrollAnimation({ animationType: 'up' });
  const scrollContainerRef = useRef(null);
  const [selectedFilter, setSelectedFilter] = useState("all");
  const [activeIndex, setActiveIndex] = useState(0);
  const [likedProjects, setLikedProjects] = useState({});
  const [activeCommentBox, setActiveCommentBox] = useState(null);
  const [comments, setComments] = useState({});
  const [commentText, setCommentText] = useState("");
  const [showToast, setShowToast] = useState(false);

  const [sessionLiked, setSessionLiked] = useState(() => {
    try {
      const saved = localStorage.getItem('likedProjects');
      return saved ? JSON.parse(saved) : {};
    } catch {
      return {};
    }
  });

  const toggleLike = async (id) => {
    const hasLiked = sessionLiked[id];
    const action = hasLiked ? 'unlike' : 'like';

    setSessionLiked(prev => {
      const next = { ...prev, [id]: !hasLiked };
      localStorage.setItem('likedProjects', JSON.stringify(next));
      return next;
    });

    try {
      const res = await interactionAPI.toggleLike(id, { action });
      if (res.data.success) {
         setLikedProjects(prev => ({ ...prev, [id]: res.data.data.likes }));
      }
    } catch (error) {
       console.error("Error toggling like", error);
       setSessionLiked(prev => {
         const next = { ...prev, [id]: hasLiked };
         localStorage.setItem('likedProjects', JSON.stringify(next));
         return next;
       });
    }
  };

  const toggleCommentBox = (id) => {
    setActiveCommentBox(activeCommentBox === id ? null : id);
    setCommentText("");
  };

  const handleAddComment = async (e, id) => {
    e.preventDefault();
    if (!commentText.trim()) return;
    
    try {
      const res = await interactionAPI.addComment(id, { text: commentText, user: "Guest User" });
      if (res.data.success) {
        setComments(prev => ({
          ...prev,
          [id]: res.data.data.comments
        }));
      }
    } catch (error) {
      console.error("Failed to add comment", error);
    }
    setCommentText("");
  };

  const handleShare = async (project) => {
    const shareUrl = project.liveLink || project.githubLink || window.location.href;
    if (navigator.share) {
      try {
        await navigator.share({
          title: project.title,
          text: project.description,
          url: shareUrl,
        });
      } catch (error) {
        console.log('Error sharing', error);
      }
    } else {
      navigator.clipboard.writeText(shareUrl);
      setShowToast(true);
      setTimeout(() => setShowToast(false), 3000);
    }
  };

  // Ensure initial scroll position and fetch interactions on mount
  useEffect(() => {
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollLeft = 0;
    }

    const fetchInteractions = async () => {
      const likesMap = {};
      const commentsMap = {};
      
      try {
        await Promise.all(defaultProjects.map(async (p) => {
          const res = await interactionAPI.getInteractions(p._id);
          if (res.data && res.data.success) {
            likesMap[p._id] = res.data.data.likes || 0;
            commentsMap[p._id] = res.data.data.comments || [];
          }
        }));
        setLikedProjects(likesMap);
        setComments(commentsMap);
      } catch (error) {
        console.error("Failed to fetch interactions", error);
      }
    };
    
    fetchInteractions();
  }, []);

  const filteredProjects = selectedFilter === "all" 
    ? defaultProjects 
    : defaultProjects.filter(p => p.category.toLowerCase() === selectedFilter.toLowerCase());


  const handleScroll = () => {
    if (scrollContainerRef.current) {
      const container = scrollContainerRef.current;
      const firstCard = container.querySelector('.snap-center');
      if (!firstCard) return;

      const cardWidth = firstCard.offsetWidth + 32;
      const newIndex = Math.round(container.scrollLeft / cardWidth);
      
      if (newIndex !== activeIndex && newIndex >= 0 && newIndex < filteredProjects.length) {
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
      id="projects"
      ref={sectionRef}
      className={`relative py-32 overflow-hidden transition-colors duration-500 ${isDark ? "bg-[#050b14]" : "bg-gray-50"}`}
      style={{ willChange: 'transform' }}
    >
      {/* Background Decor */}
      {isDark && (
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-1/4 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-cyan-500/10 to-transparent" />
          <div className="absolute bottom-1/4 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-emerald-500/10 to-transparent" />
        </div>
      )}

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <div className="text-center mb-20">
          <h2 className={`text-3xl sm:text-4xl md:text-6xl font-black mb-6 tracking-tighter ${isDark ? 'text-white' : 'text-gray-900'} uppercase break-words`}>
            CORE_MODULES<span className="text-emerald-500">[ ]</span>
          </h2>
          <div className="flex items-center justify-center gap-2 sm:gap-4">
            <div className="h-px w-12 bg-gray-500/30" />
            <p className="font-mono text-[10px] sm:text-xs tracking-[0.1em] sm:tracking-[0.3em] uppercase text-emerald-500/80">Project Neural Network</p>
            <div className="h-px w-12 bg-gray-500/30" />
          </div>
        </div>

        {/* Filter Tab UI */}
        <div className="flex flex-wrap gap-4 justify-center mb-16">
          {["all", "fullstack", "backend", "frontend"].map((filter) => (
            <button
              key={filter}
              onClick={() => {
                setSelectedFilter(filter);
                setActiveIndex(0);
                if (scrollContainerRef.current) scrollContainerRef.current.scrollLeft = 0;
              }}
              className={`group relative px-6 py-2 font-mono text-xs tracking-widest uppercase transition-all duration-300 ${
                selectedFilter === filter ? "text-cyan-500" : "text-gray-500 hover:text-white"
              }`}
            >
              {filter}
              {selectedFilter === filter && (
                <div className="absolute -bottom-1 left-0 w-full h-0.5 bg-cyan-500 shadow-[0_0_8px_#06b6d4]" />
              )}
            </button>
          ))}
        </div>

        {/* Projects Horizontal Stream */}
        <div className="relative group/scroll">
          {/* Scroll Header Decor */}
          <div className="flex justify-between items-center mb-6 px-2 opacity-50">
             <div className="flex items-center gap-3">
                <div className="w-2 h-2 rounded-full bg-emerald-500" />
                <span className="font-mono text-[9px] text-emerald-500 tracking-[0.3em] uppercase">
                  MODULE_STREAM_READY
                </span>
             </div>
             <div className="flex items-center gap-4">
               <span className="font-mono text-[8px] text-gray-500 uppercase tracking-widest hidden sm:block">SEGMENT: 0{activeIndex + 1} // 0{filteredProjects.length}</span>
               <span className="font-mono text-[8px] text-gray-500 uppercase tracking-widest">LOAD_STABILITY: V.95.4</span>
             </div>
          </div>

          <div 
            ref={scrollContainerRef}
            onScroll={handleScroll}
            className="flex gap-8 pb-8 overflow-x-auto snap-x snap-mandatory hide-scrollbar"
            style={{ scrollBehavior: 'smooth' }}
          >
            {filteredProjects.map((project, index) => (
              <div
                key={project._id}
                className={`flex-none w-[320px] sm:w-[580px] snap-center relative overflow-hidden group rounded-xl border transition-all duration-500 ${
                  isDark 
                  ? 'bg-[#0a101d]/60 border-white/5 backdrop-blur-xl' 
                  : 'bg-white border-gray-100 shadow-xl'
                }`}
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                {/* Header Bar */}
                <div className="p-4 border-b border-white/5 flex items-center justify-between bg-white/5">
                  <div className="flex items-center gap-3">
                    <Terminal size={14} className="text-emerald-500" />
                    <span className="font-mono text-[10px] tracking-widest text-gray-500 uppercase">
                      SYS.PROJ_ID_{project.metrics.auth}
                    </span>
                  </div>
                  <div className="flex gap-4">
                    <a href={project.githubLink} target="_blank" rel="noreferrer" className="text-gray-500 hover:text-white transition-colors">
                      <Github size={16} />
                    </a>
                    {project.liveLink && (
                      <a href={project.liveLink} target="_blank" rel="noreferrer" className="text-gray-500 hover:text-white transition-colors">
                        <Globe size={16} />
                      </a>
                    )}
                  </div>
                </div>

                {/* Main Content */}
                <div className="p-8">
                  <div className="flex items-start justify-between mb-6">
                    <div>
                      <h3 className={`text-3xl font-black tracking-tighter ${isDark ? 'text-white' : 'text-gray-900'} uppercase group-hover:text-cyan-500 transition-colors duration-300`}>
                        {project.title}
                      </h3>
                      <p className="text-cyan-500/80 font-mono text-[10px] uppercase tracking-widest mt-1">
                        {project.shortDescription}
                      </p>
                    </div>
                    <div 
                      className="p-3 rounded-lg border"
                      style={{ borderColor: `${project.color}40`, backgroundColor: `${project.color}05` }}
                    >
                      <Box size={24} style={{ color: project.color }} />
                    </div>
                  </div>

                  {/* Image Carousel — shown only for projects with images */}
                  {project.images && project.images.length > 0 && (
                    <div className="mb-4">
                      <ProjectCarousel images={project.images} color={project.color} />
                    </div>
                  )}

                  {/* Interaction Bar (Instagram style) */}
                  <div className="flex items-center gap-4 mb-3">
                    <button 
                      onClick={() => toggleLike(project._id)}
                      className={`transition-all duration-300 active:scale-90 ${sessionLiked[project._id] ? 'text-red-500' : 'text-gray-500 hover:text-red-500'}`}
                      aria-label="Like project"
                    >
                      <Heart size={22} fill={sessionLiked[project._id] ? 'currentColor' : 'none'} className={sessionLiked[project._id] ? 'drop-shadow-[0_0_8px_rgba(239,68,68,0.5)]' : ''} />
                    </button>
                    <button 
                      onClick={() => toggleCommentBox(project._id)}
                      className={`transition-colors duration-300 active:scale-90 ${activeCommentBox === project._id ? (isDark ? 'text-white' : 'text-gray-900') : 'text-gray-500'} ${isDark ? 'hover:text-white' : 'hover:text-gray-900'}`}
                      aria-label="Comment"
                    >
                      <MessageCircle size={22} />
                    </button>
                    <button 
                      onClick={() => handleShare(project)}
                      className={`text-gray-500 transition-colors duration-300 active:scale-90 ${isDark ? 'hover:text-white' : 'hover:text-gray-900'}`}
                      aria-label="Share"
                    >
                      <Send size={22} />
                    </button>
                  </div>

                  {/* Likes count info */}
                  <div className={`text-[11px] font-bold mb-2 ${isDark ? 'text-white' : 'text-gray-900'}`}>
                    {likedProjects[project._id] === 1 ? '1 like' : `${likedProjects[project._id] || 0} likes`}
                  </div>

                  <p className={`text-sm leading-relaxed ${activeCommentBox === project._id ? 'mb-2' : 'mb-6'} ${isDark ? 'text-gray-400' : 'text-gray-600'} line-clamp-2`}>
                    <span className={`font-bold mr-2 ${isDark ? 'text-white' : 'text-gray-900'}`}>{project.title.toLowerCase()}</span>
                    {project.description}
                  </p>

                  {/* Comment Section */}
                  {activeCommentBox === project._id && (
                    <div className="mb-6 animate-fade-in relative z-20">
                      {/* Comments List */}
                      <div className="max-h-24 overflow-y-auto hide-scrollbar mb-3 space-y-2">
                        {(comments[project._id] || []).map(comment => (
                          <div key={comment.id} className="text-[11px] leading-tight flex gap-2">
                            <span className={`font-bold flex-shrink-0 ${isDark ? 'text-white' : 'text-gray-900'}`}>{comment.user}</span>
                            <span className={isDark ? 'text-gray-300' : 'text-gray-700'}>{comment.text}</span>
                          </div>
                        ))}
                      </div>
                      
                      {/* Add Comment Input */}
                      <form onSubmit={(e) => handleAddComment(e, project._id)} className={`flex items-center gap-2 border-t ${isDark ? 'border-gray-800' : 'border-gray-200'} pt-3 mt-2`}>
                        <input 
                          type="text" 
                          value={commentText}
                          onChange={(e) => setCommentText(e.target.value)}
                          placeholder="Add a comment..." 
                          className={`flex-1 bg-transparent text-[11px] py-1 focus:outline-none placeholder-gray-500 ${isDark ? 'text-white' : 'text-gray-900'} transition-colors`}
                        />
                        <button 
                          type="submit"
                          disabled={!commentText.trim()}
                          className={`text-[11px] font-bold transition-colors ${commentText.trim() ? 'text-cyan-500 hover:text-cyan-400' : 'text-gray-500 cursor-not-allowed'}`}
                        >
                          Post
                        </button>
                      </form>
                    </div>
                  )}

                  {/* Tech Stack Chips */}
                  <div className="flex flex-wrap gap-2 mb-8">
                    {project.technologies.map(tech => (
                      <span key={tech} className="px-3 py-1 bg-white/5 border border-white/5 text-[9px] font-mono tracking-tighter text-gray-400 uppercase rounded">
                        {tech}
                      </span>
                    ))}
                  </div>

                  {/* Technical Bottom Rail */}
                  <div className="pt-6 border-t border-white/5 flex flex-wrap gap-6">
                    <div className="flex flex-col">
                      <span className="text-[8px] font-mono text-gray-500 uppercase tracking-widest">STATUS</span>
                      <span 
                        className="text-[10px] font-black font-mono tracking-widest mt-1"
                        style={{ color: project.color }}
                      >
                        {project.metrics.status}
                      </span>
                    </div>
                    <div className="flex flex-col">
                      <span className="text-[8px] font-mono text-gray-500 uppercase tracking-widest">ARCHITECTURE</span>
                      <span className="text-[10px] font-black font-mono tracking-widest text-white mt-1">
                        {project.metrics.complexity}
                      </span>
                    </div>
                    <div className="ml-auto flex items-center h-full pt-2">
                       <ArrowRight className="text-emerald-500 opacity-0 group-hover:opacity-100 group-hover:translate-x-2 transition-all duration-300" />
                    </div>
                  </div>
                </div>

                {/* Hover Scanline Effect */}
                <div className="absolute inset-0 pointer-events-none opacity-0 group-hover:opacity-10 transition-opacity duration-700 bg-[linear-gradient(rgba(18,16,16,0)_50%,rgba(0,0,0,0.25)_50%),linear-gradient(90deg,rgba(255,0,0,0.06),rgba(0,255,0,0.02),rgba(0,0,255,0.06))] bg-[length:100%_2px,3px_100%]" />
              </div>
            ))}
          </div>

          {/* Dot Form Pagination */}
          <div className="flex justify-center items-center gap-3 mt-8">
            {filteredProjects.map((_, i) => (
              <button
                key={i}
                onClick={() => scrollToCard(i)}
                className={`transition-all duration-500 rounded-full ${
                  activeIndex === i 
                  ? 'w-8 h-1.5 bg-gradient-to-r from-emerald-500 to-cyan-500 shadow-[0_0_10px_rgba(16,185,129,0.5)]' 
                  : 'w-1.5 h-1.5 bg-gray-700 hover:bg-gray-500'
                }`}
                aria-label={`Go to project ${i + 1}`}
              />
            ))}
          </div>
        </div>

        {/* Toast Notification */}
        <div className={`fixed bottom-8 left-1/2 -translate-x-1/2 z-50 px-6 py-3 rounded-full bg-[#050b14]/90 border border-cyan-500/20 backdrop-blur-md text-cyan-400 font-mono text-[10px] tracking-widest uppercase transition-all duration-300 pointer-events-none flex items-center gap-2 shadow-[0_0_20px_rgba(6,182,212,0.15)] ${showToast ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}>
          <div className="w-1.5 h-1.5 rounded-full bg-cyan-500 animate-pulse" />
          Link Copied To Clipboard
        </div>

        {/* Grid Background Micro-Decor */}
        <div className="mt-32 border-t border-white/5 pt-12 flex justify-between items-center px-4 opacity-20">
          <div className="flex items-center gap-4 text-gray-500 font-mono text-[9px] tracking-widest uppercase">
            <Zap size={12} /> Buffer_Overflow: NEGATIVE
          </div>
          <div className="font-mono text-[9px] tracking-widest text-gray-500 uppercase">
            Load_Sequence_Complete
          </div>
        </div>
      </div>
      
      <style dangerouslySetInnerHTML={{ __html: `
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

export default Projects;
