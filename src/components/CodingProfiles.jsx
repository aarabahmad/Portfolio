import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Code2, Terminal, Trophy, Award, Loader2 } from 'lucide-react';
import './CodingProfiles.css';

const CodingProfiles = () => {
    const [leetCodeData, setLeetCodeData] = useState(null);
    const [leetCodeBadges, setLeetCodeBadges] = useState(null);
    const [cfData, setCfData] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchStats = async () => {
            // Load from cache first for immediate visibility
            const cachedStats = localStorage.getItem('codingStatsCache');
            const cachedBadges = localStorage.getItem('leetCodeBadgesCache'); // Shared with Badges component

            if (cachedStats) {
                try {
                    const { lc, cf } = JSON.parse(cachedStats);
                    if (lc) setLeetCodeData(lc);
                    if (cf) setCfData(cf);
                    if (lc || cf) setLoading(false);
                } catch (e) { console.error("Stats cache parse error:", e); }
            }

            if (cachedBadges) {
                try {
                    const parsed = JSON.parse(cachedBadges);
                    if (parsed && parsed.length > 0) {
                        // Normalize back to API format for this component's expectation if needed
                        // But actually let's just store the raw API response in cache for consistency
                        setLeetCodeBadges(parsed);
                    }
                } catch (e) { console.error("Badge cache parse error:", e); }
            }

            try {
                // Fetching LeetCode stats, badges, and Codeforces concurrently
                const [lcRes, lcBadgeRes, cfRes] = await Promise.all([
                    fetch('https://alfa-leetcode-api.onrender.com/aarabahmad/solved').catch(() => null),
                    fetch('https://alfa-leetcode-api.onrender.com/aarabahmad/badges').catch(() => null),
                    fetch('https://codeforces.com/api/user.info?handles=aarab18').catch(() => null)
                ]);

                let freshLc = null;
                let freshCf = null;

                if (lcRes && lcRes.ok) {
                    freshLc = await lcRes.json();
                    setLeetCodeData(freshLc);
                }

                if (lcBadgeRes && lcBadgeRes.ok) {
                    const badgeData = await lcBadgeRes.json();
                    if (badgeData.badges && badgeData.badges.length > 0) {
                        setLeetCodeBadges(badgeData.badges);
                        // Update the shared badge cache
                        localStorage.setItem('leetCodeBadgesCache', JSON.stringify(badgeData.badges));
                    }
                }

                if (cfRes && cfRes.ok) {
                    const cfJson = await cfRes.json();
                    if (cfJson.status === 'OK' && cfJson.result.length > 0) {
                        freshCf = cfJson.result[0];
                        setCfData(freshCf);
                    }
                }

                // Update stats cache if we got fresh data
                if (freshLc || freshCf) {
                    localStorage.setItem('codingStatsCache', JSON.stringify({
                        lc: freshLc || JSON.parse(cachedStats)?.lc,
                        cf: freshCf || JSON.parse(cachedStats)?.cf
                    }));
                }
            } catch (error) {
                console.error("Error fetching competitive stats:", error);
            } finally {
                setLoading(false);
            }
        };

        fetchStats();
    }, []);

    const profiles = [
        {
            platform: 'LeetCode',
            icon: <Code2 size={32} />,
            username: 'aarabahmad',
            primaryStat: { 
                tag: 'Problems Solved', 
                value: leetCodeData ? leetCodeData.solvedProblem : '447' 
            },
            subStats: [
                { label: 'Easy', value: leetCodeData ? leetCodeData.easySolved : '185', color: '#00b8a3' },
                { label: 'Medium', value: leetCodeData ? leetCodeData.mediumSolved : '216', color: '#ffc01e' },
                { label: 'Hard', value: leetCodeData ? leetCodeData.hardSolved : '46', color: '#ff375f' }
            ],
            // Only show up to 3 badges to keep it clean
            badges: leetCodeBadges ? leetCodeBadges.slice(0, 3).map(b => ({
                name: b.displayName || "Award",
                icon: (b.icon && b.icon.startsWith('/')) ? `https://leetcode.com${b.icon}` : b.icon,
                color: '#ffa116'
            })) : [],
            link: 'https://leetcode.com/u/aarabahmad/', 
            color: '#ffa116'
        },
        {
            platform: 'Codeforces',
            icon: <Terminal size={32} />,
            username: 'aarab18',
            primaryStat: { 
                tag: 'Max Rating', 
                value: cfData ? cfData.maxRating : '381' 
            },
            subStats: cfData ? [
                { label: 'Max Rank', value: cfData.maxRank, color: 'var(--text-secondary)' },
                { label: 'Current Rating', value: cfData.rating, color: 'var(--text-secondary)' }
            ] : [
                { label: 'Max Rank', value: 'Newbie', color: 'var(--text-secondary)' },
                { label: 'Current Rating', value: '381', color: 'var(--text-secondary)' }
            ],
            link: 'https://codeforces.com/profile/aarab18', 
            color: '#1f8acb'
        },
        {
            platform: 'CodeChef',
            icon: <Trophy size={32} />,
            username: 'aarab18',
            primaryStat: { tag: 'Max Rating', value: '1100' }, 
            subStats: [
                { label: 'Stars', value: '2★', color: 'var(--text-secondary)' },
                { label: 'Global Rank', value: 'Top 25%', color: 'var(--text-secondary)' }
            ],
            link: 'https://www.codechef.com/users/aarab18', 
            color: '#5B4638'
        }
    ];

    const itemVariants = {
        hidden: { opacity: 0, y: 30 },
        visible: { 
            opacity: 1, 
            y: 0, 
            transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] } 
        }
    };

    return (
        <section className="coding-profiles-section" id="coding-profiles">
            <div className="container">
                <motion.div 
                    className="section-header"
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, amount: 0.2 }}
                    variants={itemVariants}
                >
                    <h2 className="section-title" style={{ whiteSpace: 'normal', fontSize: 'clamp(2rem, 4vw, 3.5rem)' }}>
                        DSA & <span style={{ color: "var(--text-primary)" }}>Competitive Programming</span>
                    </h2>
                    <div className="section-line"></div>
                </motion.div>
                <div style={{ marginTop: "-2.5rem", paddingBottom: "3rem", color: "var(--text-secondary)", fontSize: "1.1rem" }}>
                    <p>Showcasing my problem-solving skills across various competitive platforms.</p>
                </div>

                <motion.div 
                    className="profiles-grid"
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, amount: 0.1 }}
                    variants={{
                        hidden: { opacity: 0 },
                        visible: {
                            opacity: 1,
                            transition: { staggerChildren: 0.15 }
                        }
                    }}
                >
                    {profiles.map((profile, index) => (
                        <motion.div key={index} className="profile-card glass-panel" variants={itemVariants}>
                            <div className="profile-header">
                                <div className="profile-icon" style={{ color: profile.color }}>
                                    {profile.icon}
                                </div>
                                <h3 className="profile-platform">
                                    {profile.platform}
                                    {loading && (profile.platform === 'LeetCode' || profile.platform === 'Codeforces') && 
                                        <Loader2 size={16} className="loading-spinner" style={{ marginLeft: '10px', color: 'var(--text-muted)' }}/>}
                                </h3>
                            </div>
                            <div className="profile-body">
                                <p className="profile-username">@{profile.username}</p>
                                <div className="profile-stats">
                                    <span className="stat-value" style={{ color: profile.color }}>
                                        {profile.primaryStat.value}
                                    </span>
                                    <span className="stat-tag">{profile.primaryStat.tag}</span>
                                </div>
                                
                                {profile.subStats && (
                                    <div className="sub-stats-container">
                                        {profile.subStats.map((stat, i) => (
                                            <div key={i} className="sub-stat">
                                                <span className="sub-stat-value" style={{ color: stat.color }}>{stat.value}</span>
                                                <span className="sub-stat-label">{stat.label}</span>
                                            </div>
                                        ))}
                                    </div>
                                )}
                            </div>
                            <div className="profile-footer">
                                <a href={profile.link} target="_blank" rel="noopener noreferrer" className="profile-link btn btn-secondary glass-panel">
                                    View Profile <span className="arrow">→</span>
                                </a>
                            </div>
                        </motion.div>
                    ))}
                </motion.div>
            </div>
        </section>
    );
};

export default CodingProfiles;
