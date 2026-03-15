import { useState, useEffect } from 'react';
import { ExternalLink, Star, GitBranch, Code, ShieldCheck, Cpu, Database, Activity, Terminal } from 'lucide-react';
import { useScrollAnimation } from '../hooks/useScrollAnimation';

const GitHubStats = ({ isDark, username = 'YOUR_GITHUB_USERNAME' }) => {
  const [stats, setStats] = useState(null);
  const [repos, setRepos] = useState([]);
  const [languages, setLanguages] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const sectionRef = useScrollAnimation({ animationType: 'up', threshold: 0.1 });

  useEffect(() => {
    const fetchGitHubData = async () => {
      try {
        setLoading(true);
        
        // Fetch user stats
        const userResponse = await fetch(`https://api.github.com/users/${username}`);
        if (!userResponse.ok) throw new Error('Failed to fetch user data');
        const userData = await userResponse.json();

        // Fetch repositories
        const reposResponse = await fetch(
          `https://api.github.com/users/${username}/repos?sort=stars&order=desc&per_page=100`
        );
        if (!reposResponse.ok) throw new Error('Failed to fetch repositories');
        const reposData = await reposResponse.json();

        // Calculate language stats
        const languageMap = {};
        let totalStars = 0;
        
        for (const repo of reposData) {
          if (repo.language) {
            languageMap[repo.language] = (languageMap[repo.language] || 0) + 1;
          }
          totalStars += repo.stargazers_count || 0;
        }

        const totalRepoCount = reposData.length;

        setStats({
          publicRepos: userData.public_repos,
          followers: userData.followers,
          totalStars,
          avatar: userData.avatar_url,
          bio: userData.bio,
        });
        
        setRepos(reposData.slice(0, 6)); // Top 6 repos
        setLanguages(
          Object.entries(languageMap)
            .sort((a, b) => b[1] - a[1])
            .slice(0, 5) // Top 5 languages
            .map(([lang, count]) => ({
              name: lang,
              percentage: Math.round((count / totalRepoCount) * 100)
            }))
        );

        setError(null);
      } catch (err) {
        console.error('Error fetching GitHub data:', err);
        setError('OFFLINE_PROTOCOL_FAILURE: Check connection or API ceiling.');
      } finally {
        setLoading(false);
      }
    };

    if (username && username !== 'YOUR_GITHUB_USERNAME') {
      fetchGitHubData();
    } else {
      setError('AUTH_ERROR: GitHub node ID not provided.');
      setLoading(false);
    }
  }, [username]);

  return (
    <section 
      id="github-stats" 
      ref={sectionRef}
      className={`py-24 px-4 md:px-8 bg-transparent relative overflow-hidden min-h-[400px]`}
    >
      <div className="max-w-7xl mx-auto relative z-10">
        {loading ? (
          <div className="flex flex-col items-center justify-center min-h-[300px]">
            <div className="w-16 h-16 border-4 border-cyan-500/20 border-t-cyan-500 rounded-full animate-spin mb-4 shadow-[0_0_15px_rgba(6,182,212,0.5)]"></div>
            <p className="text-cyan-400 font-mono animate-pulse tracking-widest uppercase">ACCESSING_REMOTE_SYSTEM...</p>
          </div>
        ) : error ? (
          <div className="p-8 border-2 border-red-500/30 bg-red-500/5 rounded-lg text-center backdrop-blur-md">
            <Activity className="w-12 h-12 text-red-500 mx-auto mb-4" />
            <h3 className="text-xl font-mono text-red-400 mb-2 uppercase tracking-tighter">System_Alert: Data Fetch Failed</h3>
            <p className="text-red-300/70 font-mono text-sm">{error}</p>
          </div>
        ) : (
          <>
            {/* Robotic Header */}
            <div className="mb-16 relative">
              <div className="flex items-center gap-3 mb-2">
                <div className="w-2 h-2 bg-cyan-500 animate-pulse shadow-[0_0_8px_rgba(6,182,212,1)]" />
                <span className="text-cyan-400 font-mono text-xs tracking-[0.3em] uppercase opacity-70">Remote_Uplink</span>
              </div>
              <h2 className="font-black text-white mb-4 tracking-tighter uppercase italic leading-[0.8] drop-shadow-[0_0_20px_rgba(255,255,255,0.1)] section-header-text">
                GIT_UPLINK_<span className="text-cyan-400">STATS.log</span>
              </h2>
              <div className="h-px w-full bg-gradient-to-r from-cyan-500/50 via-cyan-500/10 to-transparent" />
              <p className="mt-4 text-cyan-200/50 font-mono text-sm uppercase tracking-widest">Global code contributions // System performance logs</p>
            </div>

            {/* System Telemetry Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 mb-16 scroll-reveal-stagger">
              {[
                { label: 'NODE_REPOS', value: stats?.publicRepos, icon: Database, color: 'text-cyan-400' },
                { label: 'SYNC_STARS', value: stats?.totalStars, icon: Star, color: 'text-yellow-400' },
                { label: 'UPLINK_FOLLOW', value: stats?.followers, icon: Activity, color: 'text-emerald-400' },
                { label: 'CORE_LANGS', value: languages.length, icon: Code, color: 'text-pink-400' }
              ].map((item, id) => (
                <div key={id} className="relative group p-4 sm:p-6 border-l-2 border-cyan-500/30 bg-[#0a101d]/60 backdrop-blur-md hover:bg-cyan-500/5 transition-all scroll-reveal-up">
                  <div className="absolute top-0 right-0 p-2 opacity-20 group-hover:opacity-100 transition-opacity">
                    <item.icon className={`w-4 h-4 ${item.color}`} />
                  </div>
                  <div className={`text-4xl font-black ${item.color} mb-1 italic tracking-tighter`}>
                    {String(item.value || 0).padStart(2, '0')}
                  </div>
                  <div className="text-[10px] font-mono text-cyan-400/60 uppercase tracking-[0.2em]">{item.label}</div>
                  <div className="mt-4 h-1 w-full bg-gray-800 relative overflow-hidden">
                    <div 
                      className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000" 
                    />
                  </div>
                </div>
              ))}
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              {/* Subsystem Proficiency Matrix */}
              <div className="lg:col-span-1 border border-cyan-500/20 bg-[#0a101d]/40 p-8 rounded-sm backdrop-blur-xl relative scroll-reveal-up">
                <div className="absolute top-0 left-0 w-8 h-[2px] bg-cyan-500" />
                <div className="absolute top-0 left-0 w-[2px] h-8 bg-cyan-500" />
                
                <h3 className="text-xl font-bold text-white mb-8 flex items-center gap-2 italic uppercase tracking-tighter">
                  <Code className="w-5 h-5 text-cyan-400" />
                  Web_&_DSA_Matrix.exe
                </h3>
                
                <div className="space-y-8">
                  {languages.map((lang, index) => (
                    <div key={index} className="relative">
                      <div className="flex justify-between items-center mb-2">
                        <span className="text-sm font-mono text-cyan-300 font-bold uppercase tracking-widest">{lang.name}</span>
                        <span className="text-xs font-mono text-cyan-500/70">{lang.percentage}%_CAPACITY</span>
                      </div>
                      <div className="h-3 bg-gray-900/50 rounded-full border border-cyan-500/10 p-[2px] relative overflow-hidden">
                        <div 
                          className="h-full bg-gradient-to-r from-cyan-600 to-cyan-400 rounded-full shadow-[0_0_10px_rgba(6,182,212,0.4)]"
                          style={{ width: `${lang.percentage}%` }}
                        />
                        <div className="absolute inset-0 bg-[linear-gradient(45deg,transparent_25%,rgba(255,255,255,.1)_50%,transparent_75%)] bg-[length:20px_20px] animate-[slideDiagonal_2s_linear_infinite]" />
                      </div>
                    </div>
                  ))}
                </div>
                
                <div className="mt-10 p-4 border border-cyan-500/10 bg-cyan-500/5 rounded text-[10px] font-mono text-cyan-400/50 leading-relaxed uppercase">
                  STATUS: STABLE_CONNECTION // DATA_POINTS_OPTIMIZED // KERNEL_SYNC_ACTIVE
                </div>
              </div>

              {/* Featured Data Transfer Nodes */}
              <div className="lg:col-span-2 space-y-4 scroll-reveal-stagger">
                <div className="flex items-center justify-between mb-6">
                  <h3 className="text-xl font-bold text-white flex items-center gap-2 italic uppercase tracking-tighter">
                    <Terminal className="w-5 h-5 text-cyan-400" />
                    Featured_Data_Nodes
                  </h3>
                  <div className="text-[10px] font-mono text-cyan-500/50 uppercase animate-pulse">Live_Feed_Active</div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {repos.map((repo) => (
                    <a
                      key={repo.id}
                      href={repo.html_url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="group block p-6 bg-[#0a101d]/60 border border-cyan-500/10 hover:border-cyan-500/40 transition-all relative overflow-hidden scroll-reveal-up"
                    >
                      <div className="absolute top-0 right-0 w-0 h-0 border-t-[30px] border-l-[30px] border-t-cyan-500/10 border-l-transparent group-hover:border-t-cyan-500/30 transition-colors" />
                      
                      <div className="flex items-start justify-between mb-4">
                        <h4 className="text-lg font-bold text-cyan-100 group-hover:text-cyan-400 transition-colors truncate italic pr-6 uppercase tracking-tight">
                          {repo.name.replace(/-/g, '_')}
                        </h4>
                        <ExternalLink className="w-4 h-4 text-cyan-500/50 group-hover:text-cyan-400" />
                      </div>

                      <p className="text-xs text-cyan-200/40 font-mono mb-6 line-clamp-2 uppercase h-8">
                        {repo.description || 'PROTOCOL_DESCRIPTION_UNDEFINED'}
                      </p>

                      <div className="flex items-center justify-between border-t border-cyan-500/10 pt-4">
                        <div className="flex items-center gap-3">
                          {repo.language && (
                            <div className="flex items-center gap-1">
                              <div className="w-1.5 h-1.5 rounded-full bg-cyan-500" />
                              <span className="text-[10px] font-mono text-cyan-400/70">{repo.language.toUpperCase()}</span>
                            </div>
                          )}
                          <div className="flex items-center gap-1">
                            <Star className="w-3 h-3 text-yellow-500/70" />
                            <span className="text-[10px] font-mono text-yellow-500/70">{repo.stargazers_count}</span>
                          </div>
                        </div>
                        <div className="text-[9px] font-mono text-cyan-600 uppercase tracking-tighter">NODE_ID_{repo.id.toString().slice(-4)}</div>
                      </div>
                    </a>
                  ))}
                </div>
              </div>
            </div>
          </>
        )}

        {/* Global Security Background Text */}
        <div className="absolute top-0 right-0 -mr-20 -mt-20 pointer-events-none opacity-[0.03] rotate-12">
          <div className="text-[200px] font-black italic select-none">UPLINK</div>
        </div>
      </div>
    </section>
  );
};

export default GitHubStats;
