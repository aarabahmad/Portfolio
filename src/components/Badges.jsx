import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Loader2 } from 'lucide-react';
import './Badges.css';

const Badges = () => {
    const leetCodeFallbacks = [
        { name: '200 Days Badge 2025', icon: 'https://assets.leetcode.com/static_assets/public/images/badges/2024/lg/2025-200.png', platform: 'LeetCode', color: '#ffa116' },
        { name: '100 Days Badge 2025', icon: 'https://assets.leetcode.com/static_assets/public/images/badges/2024/lg/2025-100.png', platform: 'LeetCode', color: '#ffa116' },
        { name: '50 Days Badge 2025', icon: 'https://assets.leetcode.com/static_assets/public/images/badges/2024/lg/2025-50.png', platform: 'LeetCode', color: '#ffa116' },
        { name: 'Oct LeetCoding Challenge', icon: 'https://assets.leetcode.com/static_assets/public/images/badges/2024/lg/2024-10.png', platform: 'LeetCode', color: '#ffa116' },
        { name: 'Sep LeetCoding Challenge', icon: 'https://assets.leetcode.com/static_assets/public/images/badges/2024/lg/2024-09.png', platform: 'LeetCode', color: '#ffa116' },
        { name: 'Jul LeetCoding Challenge', icon: 'https://assets.leetcode.com/static_assets/public/images/badges/2024/lg/2024-07.png', platform: 'LeetCode', color: '#ffa116' },
        { name: 'Feb LeetCoding Challenge', icon: 'https://assets.leetcode.com/static_assets/public/images/badges/2024/lg/2025-02.png', platform: 'LeetCode', color: '#ffa116' }
    ];

    const [leetCodeBadges, setLeetCodeBadges] = useState(leetCodeFallbacks);
    const [loading, setLoading] = useState(true);

    const hackerRankBadges = [
        { name: 'Python: 4★', icon: 'https://upload.wikimedia.org/wikipedia/commons/4/40/HackerRank_Icon-1000px.png', color: '#2ec866', platform: 'HackerRank' },
        { name: 'Problem Solving: 2★', icon: 'https://upload.wikimedia.org/wikipedia/commons/4/40/HackerRank_Icon-1000px.png', color: '#2ec866', platform: 'HackerRank' },
        { name: 'Java: 2★', icon: 'https://upload.wikimedia.org/wikipedia/commons/4/40/HackerRank_Icon-1000px.png', color: '#2ec866', platform: 'HackerRank' },
        { name: 'C++: 1★', icon: 'https://upload.wikimedia.org/wikipedia/commons/4/40/HackerRank_Icon-1000px.png', color: '#2ec866', platform: 'HackerRank' }
    ];

    useEffect(() => {
        const fetchBadges = async () => {
            // Priority 1: Check local cache for immediate visibility
            const cached = localStorage.getItem('leetCodeBadgesCache');
            if (cached) {
                try {
                    const parsed = JSON.parse(cached);
                    if (parsed && parsed.length > 0) {
                        setLeetCodeBadges(parsed);
                        setLoading(false);
                    }
                } catch (e) {
                    console.error("Cache parse error:", e);
                }
            }

            try {
                // Priority 2: Fetch fresh live data from Primary Source
                let response = await fetch('https://alfa-leetcode-api.onrender.com/aarabahmad/badges');
                
                // Failover to Secondary Source if Primary is rate-limited or down
                if (!response.ok || response.status === 429) {
                    console.warn("Primary LeetCode API rate-limited, trying mirror...");
                    response = await fetch('https://leetcode-api-faisalshohag.vercel.app/aarabahmad/badges');
                }

                if (response.ok) {
                    const data = await response.json();
                    const badgeArray = data.badges || (data.data && data.data.matchedUser ? data.data.matchedUser.badges : null);
                    
                    if (badgeArray && badgeArray.length > 0) {
                        const liveBadges = badgeArray.map(b => ({
                            name: b.displayName || "LeetCode Award",
                            icon: b.icon.startsWith('/') ? `https://leetcode.com${b.icon}` : b.icon,
                            platform: 'LeetCode',
                            color: '#ffa116'
                        }));
                        setLeetCodeBadges(liveBadges);
                        localStorage.setItem('leetCodeBadgesCache', JSON.stringify(liveBadges));
                    }
                } else if (!cached) {
                    // Fallback to internal list if and only if we have no cache and API is failing
                    setLeetCodeBadges(leetCodeFallbacks);
                }
            } catch (error) {
                console.error("Failed to fetch live LeetCode badges from all sources:", error);
                if (!cached) setLeetCodeBadges(leetCodeFallbacks);
            } finally {
                setLoading(false);
            }
        };

        fetchBadges();
    }, []);

    const allBadges = [...leetCodeBadges, ...hackerRankBadges];

    const itemVariants = {
        hidden: { opacity: 0, y: 30 },
        visible: { 
            opacity: 1, 
            y: 0, 
            transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] } 
        }
    };

    return (
        <section className="badges-section" id="badges">
            <div className="container">
                <motion.div 
                    className="section-header"
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, amount: 0.2 }}
                    variants={itemVariants}
                >
                    <h2 className="section-title">
                        My <span style={{ color: "var(--text-primary)" }}>Badges</span>
                        {loading && <Loader2 size={24} className="loading-spinner" style={{ marginLeft: '15px', color: 'var(--text-muted)' }}/>}
                    </h2>
                    <div className="section-line"></div>
                </motion.div>
                
                <div style={{ marginTop: "-2.5rem", paddingBottom: "3rem", color: "var(--text-secondary)", fontSize: "1.1rem" }}>
                    <p>Recognitions gathered across various competitive and learning platforms.</p>
                </div>

                <motion.div 
                    className="badges-scroll-container"
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, amount: 0.1 }}
                    variants={{
                        hidden: { opacity: 0 },
                        visible: {
                            opacity: 1,
                            transition: { staggerChildren: 0.1 }
                        }
                    }}
                >
                    {allBadges.map((badge, index) => (
                        <motion.div key={index} className="large-badge-card glass-panel" variants={itemVariants}>
                            <div className="badge-platform-indicator" style={{ color: badge.color }}>
                                {badge.platform}
                            </div>
                            {badge.icon ? (
                                <img src={badge.icon} alt={badge.name} className="large-badge-icon" />
                            ) : (
                                <div className="large-badge-icon-placeholder" style={{ backgroundColor: badge.color }}>
                                    ★
                                </div>
                            )}
                            <h3 className="large-badge-name">{badge.name}</h3>
                        </motion.div>
                    ))}
                </motion.div>
            </div>
        </section>
    );
};

export default Badges;
