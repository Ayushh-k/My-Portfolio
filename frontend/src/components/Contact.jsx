import { useState } from "react";
import { contactAPI } from "../api/axiosConfig";
import {
  Mail,
  Phone,
  MapPin,
  Linkedin,
  Github,
  Twitter,
  Send,
  Terminal,
  Cpu,
  Wifi,
  ShieldCheck
} from "lucide-react";
import { useScrollAnimation } from "../hooks/useScrollAnimation";

const Contact = ({ isDark }) => {
  const sectionRef = useScrollAnimation({ animationType: 'up' });
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    setSuccess(false);

    try {
      await contactAPI.submit(formData);
      setSuccess(true);
      setFormData({ name: "", email: "", subject: "", message: "" });
      setTimeout(() => setSuccess(false), 5000);
    } catch (err) {
      setError(
        err.response?.data?.message ||
          "Protocol Error: Transmission Aborted.",
      );
      setTimeout(() => setError(null), 5000);
    } finally {
      setLoading(false);
    }
  };

  return (
    <section
      id="contact"
      ref={sectionRef}
      className={`relative py-32 overflow-hidden transition-colors duration-500 ${isDark ? "bg-[#050b14]" : "bg-white"}`}
    >
      {/* Background Decor */}
      {isDark && (
        <div className="absolute inset-0 pointer-events-none opacity-20">
          <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-cyan-500 to-transparent" />
          <div className="absolute bottom-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-emerald-500 to-transparent" />
        </div>
      )}

      <div className="max-w-6xl mx-auto px-6 relative z-10">
        <div className="text-center mb-24">
          <h2 className={`text-5xl md:text-6xl font-black mb-6 tracking-tighter ${isDark ? 'text-white' : 'text-gray-900'} uppercase`}>
            UPLINK_COMM_LINK<span className="text-cyan-500">.exe</span>
          </h2>
          <div className="flex items-center justify-center gap-4">
            <div className="h-px w-12 bg-gray-500/30" />
            <p className="font-mono text-xs tracking-[0.3em] uppercase text-cyan-500/80">Secure Transmission Portal</p>
            <div className="h-px w-12 bg-gray-500/30" />
          </div>
        </div>

        <div className="grid lg:grid-cols-12 gap-16">
          {/* Subsystem Info */}
          <div className="lg:col-span-5 space-y-12">
            <div className={`p-8 rounded-xl border ${isDark ? 'bg-white/5 border-white/5 backdrop-blur-md' : 'bg-gray-50 border-gray-200'}`}>
              <h3 className={`text-xl font-bold mb-6 flex items-center gap-3 ${isDark ? 'text-white' : 'text-gray-900'}`}>
                <Terminal size={20} className="text-cyan-500" /> SYS_OBJECTIVES
              </h3>
              <p className={`font-mono text-sm leading-relaxed mb-10 ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
                Initiate a data handshake for collaborative ventures, architectural consultations, or technical synthesis. 
                Response latency is typically &lt; 24 hours.
              </p>

              <div className="space-y-8">
                {[
                  { icon: Mail, label: "CMD_EMAIL", val: "ayushkamboj9690@gmail.com", color: "#00f3ff" },
                  { icon: Phone, label: "CMD_PHONE", val: "+91 9690259628", color: "#10b981" },
                  { icon: MapPin, label: "CMD_LOC", val: "Jalandhar, Punjab, IN", color: "#fb923c" }
                ].map((item, i) => (
                  <div key={i} className="flex items-center gap-6 group hover:translate-x-2 transition-transform duration-300">
                    <div className="w-12 h-12 rounded-lg bg-white/5 border border-white/5 flex items-center justify-center group-hover:border-white/20">
                      <item.icon size={20} style={{ color: item.color }} />
                    </div>
                    <div className="flex flex-col">
                      <span className="text-[8px] font-mono text-gray-500 uppercase tracking-widest">{item.label}</span>
                      <span className={`text-sm font-bold ${isDark ? 'text-gray-200' : 'text-gray-800'}`}>{item.val}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Neural Links */}
            <div className={`p-8 rounded-xl border ${isDark ? 'bg-white/5 border-white/5' : 'bg-gray-50 border-gray-200'}`}>
               <span className="text-[10px] font-mono text-gray-500 uppercase tracking-[0.3em] block mb-6">NEURAL_SYNAPSE_POINTS</span>
               <div className="flex gap-4">
                  {[
                    { icon: Github, href: "https://github.com/Ayushh-k", color: "#ffffff", glow: "rgba(255,255,255,0.4)" },
                    { icon: Linkedin, href: "https://linkedin.com/in/ayushkamboj", color: "#0077b5", glow: "rgba(0,119,181,0.5)" },
                    { icon: Twitter, href: "https://twitter.com", color: "#1da1f2", glow: "rgba(29,161,242,0.5)" }
                  ].map((link, i) => (
                    <a 
                      key={i} 
                      href={link.href} 
                      target="_blank" 
                      rel="noreferrer"
                      className="w-10 h-10 rounded-lg flex items-center justify-center bg-white/5 border border-white/5 hover:border-white/30 transition-all duration-300 hover:-translate-y-1"
                      style={{ color: link.color, filter: `drop-shadow(0 0 8px ${link.glow})` }}
                    >
                      <link.icon size={18} />
                    </a>
                  ))}
               </div>
            </div>
          </div>

          {/* Input Interface */}
          <div className="lg:col-span-7">
            <form onSubmit={handleSubmit} className="space-y-8 relative">
              {/* Decorative brackets */}
              <div className="absolute -top-4 -left-4 w-4 h-4 border-t border-l border-white/10" />
              <div className="absolute -bottom-4 -right-4 w-4 h-4 border-b border-r border-white/10" />

              <div className="grid md:grid-cols-2 gap-8">
                <div className="space-y-2">
                  <label className="font-mono text-[9px] text-gray-500 uppercase tracking-widest ml-1">CMD_USER_NAME</label>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                    className={`w-full bg-white/5 border border-white/10 rounded-lg px-4 py-3 outline-none focus:border-cyan-500/50 focus:shadow-[0_0_15px_rgba(6,182,212,0.1)] transition-all duration-300 ${isDark ? 'text-white' : 'text-gray-900'}`}
                    placeholder="ENTER_IDENTIFIER..."
                  />
                </div>
                <div className="space-y-2">
                  <label className="font-mono text-[9px] text-gray-500 uppercase tracking-widest ml-1">CMD_EMAIL_DEST</label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    className={`w-full bg-white/5 border border-white/10 rounded-lg px-4 py-3 outline-none focus:border-cyan-500/50 focus:shadow-[0_0_15px_rgba(6,182,212,0.1)] transition-all duration-300 ${isDark ? 'text-white' : 'text-gray-900'}`}
                    placeholder="NAME@HOST.EXT..."
                  />
                </div>
              </div>

              <div className="space-y-2">
                <label className="font-mono text-[9px] text-gray-500 uppercase tracking-widest ml-1">CMD_SUBJECT_TYPE</label>
                <input
                  type="text"
                  name="subject"
                  value={formData.subject}
                  onChange={handleChange}
                  required
                  className={`w-full bg-white/5 border border-white/10 rounded-lg px-4 py-3 outline-none focus:border-cyan-500/50 focus:shadow-[0_0_15px_rgba(6,182,212,0.1)] transition-all duration-300 ${isDark ? 'text-white' : 'text-gray-900'}`}
                  placeholder="CLASSIFICATION_DESC..."
                />
              </div>

              <div className="space-y-2">
                <label className="font-mono text-[9px] text-gray-500 uppercase tracking-widest ml-1">CMD_DATA_PAYLOAD</label>
                <textarea
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  required
                  rows={6}
                  className={`w-full bg-white/5 border border-white/10 rounded-lg px-4 py-3 outline-none focus:border-cyan-500/50 focus:shadow-[0_0_15px_rgba(6,182,212,0.1)] transition-all duration-300 resize-none ${isDark ? 'text-white' : 'text-gray-900'}`}
                  placeholder="WRITE_MESSAGE_STRING..."
                />
              </div>

              {/* Status Indicators */}
              {(success || error) && (
                <div className={`p-4 rounded-lg font-mono text-[10px] tracking-widest border transition-all duration-500 ${
                  success 
                  ? 'bg-emerald-500/5 border-emerald-500/40 text-emerald-500' 
                  : 'bg-red-500/5 border-red-500/40 text-red-500'
                }`}>
                  {success ? ">>> SECURE_CONNECTION_ESTABLISHED: DATA_TRANSFERRED" : `>>> CRITICAL_ERROR: ${error}`}
                </div>
              )}

              <button
                type="submit"
                disabled={loading}
                className={`group relative w-full py-4 bg-transparent border-2 border-cyan-500 font-mono text-xs tracking-[0.4em] font-black uppercase overflow-hidden transition-all duration-500 hover:shadow-[0_0_30px_rgba(6,182,212,0.3)] ${loading ? 'cursor-wait' : ''}`}
              >
                <div className={`absolute inset-0 bg-cyan-500 transition-transform duration-500 ${loading ? 'translate-y-0' : 'translate-y-full group-hover:translate-y-0'}`} />
                <span className={`relative flex items-center justify-center gap-3 transition-colors duration-500 ${loading ? 'text-white' : 'text-cyan-500 group-hover:text-white'}`}>
                  {loading ? (
                    <>SYNCING_DATA_STREAMS...</>
                  ) : (
                    <>
                      <Send size={14} /> TRANSMIT_DATA_PKT.send()
                    </>
                  )}
                </span>
                
                {/* Micro-scanning animation row */}
                {!loading && (
                   <div className="absolute top-0 left-0 w-full h-[1px] bg-white opacity-0 group-hover:animate-scan" />
                )}
              </button>
            </form>
          </div>
        </div>

        {/* System Telemetry Footer */}
        <div className="mt-32 flex flex-wrap justify-between gap-8 pt-12 border-t border-white/5 opacity-30">
          <div className="flex items-center gap-3 text-gray-500 font-mono text-[9px] tracking-widest uppercase">
            <Cpu size={12} /> Buffer: READY
          </div>
          <div className="flex items-center gap-3 text-gray-500 font-mono text-[9px] tracking-widest uppercase">
            <Wifi size={12} /> Signal: 5.4 GHZ
          </div>
          <div className="flex items-center gap-3 text-gray-500 font-mono text-[9px] tracking-widest uppercase">
            <ShieldCheck size={12} /> Encryption: AES-256
          </div>
        </div>
      </div>

      <style>{`
        @keyframes scan {
          0% { top: 0; }
          100% { top: 100%; }
        }
        .animate-scan {
          animation: scan 2s linear infinite;
        }
      `}</style>
    </section>
  );
};

export default Contact;
