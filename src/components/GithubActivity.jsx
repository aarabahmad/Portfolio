import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Github, Star, GitFork, ExternalLink } from 'lucide-react';
import './GithubActivity.css';

const GithubActivity = () => {
    const [repos, setRepos] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const GITHUB_USERNAME = 'aarabahmad';

    useEffect(() => {
        const fetchRepos = async () => {
            try {
                // Fetch public repositories, sorted by updated
                const response = await fetch(`https://api.github.com/users/${GITHUB_USERNAME}/repos?sort=updated&per_page=6`);

                if (!response.ok) {
                    throw new Error('Failed to fetch from GitHub');
                }

                const data = await response.json();

                // Filter out forks and get top 3 by stars or recent updates
                const filteredRepos = data
                    .filter(repo => !repo.fork)
                    .slice(0, 3);

                setRepos(filteredRepos);
                setLoading(false);
            } catch (err) {
                console.error("Error fetching GitHub repos:", err);
                setError(err.message);
                setLoading(false);
            }
        };

        fetchRepos();
    }, []);

    if (loading) {
        return (
            <section className="github-section" id="opensource">
                <div className="container">
                    <div className="section-header fade-up">
                        <h2 className="section-title">Open <span style={{ color: "var(--text-primary)" }}>Source</span></h2>
                        <div className="section-line"></div>
                    </div>
                    <div className="github-loading">Loading repositories...</div>
                </div>
            </section>
        );
    }

    if (error || repos.length === 0) {
        return null; // Don't show the section if it fails
    }

    const itemVariants = {
        hidden: { opacity: 0, y: 30 },
        visible: { 
            opacity: 1, 
            y: 0, 
            transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] } 
        }
    };

    return (
        <section className="github-section" id="opensource">
            <div className="container">
                <motion.div 
                    className="section-header"
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, amount: 0.2 }}
                    variants={itemVariants}
                >
                    <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                        <Github size={40} />
                        <h2 className="section-title">Open <span style={{ color: "var(--text-primary)" }}>Source</span></h2>
                    </div>
                    <div className="section-line"></div>
                </motion.div>

                <motion.div 
                    className="github-grid"
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, amount: 0.1 }}
                    variants={{
                        hidden: { opacity: 0 },
                        visible: {
                            opacity: 1,
                            transition: { staggerChildren: 0.15, delayChildren: 0.2 }
                        }
                    }}
                >
                    {repos.map((repo, idx) => (
                        <motion.div key={repo.id} className="github-card glass-panel" variants={itemVariants}>
                            <div className="repo-header">
                                <h3 className="repo-name">
                                    <a href={repo.html_url} target="_blank" rel="noopener noreferrer">{repo.name}</a>
                                </h3>
                                <a href={repo.html_url} target="_blank" rel="noopener noreferrer" className="repo-link" aria-label="View on Github">
                                    <ExternalLink size={18} />
                                </a>
                            </div>

                            <p className="repo-description">
                                {repo.description || 'No description provided for this repository.'}
                            </p>

                            <div className="repo-footer">
                                <div className="repo-stats">
                                    <span className="stat" aria-label="Stars"><Star size={16} /> {repo.stargazers_count}</span>
                                    <span className="stat" aria-label="Forks"><GitFork size={16} /> {repo.forks_count}</span>
                                </div>
                                {repo.language && (
                                    <span className="repo-lang">
                                        <span className="lang-dot"></span> {repo.language}
                                    </span>
                                )}
                            </div>
                        </motion.div>
                    ))}
                </motion.div>

                <motion.div 
                    className="projects-cta text-center"
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, amount: 0.5 }}
                    variants={itemVariants}
                >
                    <a href={`https://github.com/${GITHUB_USERNAME}`} target="_blank" rel="noopener noreferrer" className="btn btn-secondary glass-panel" style={{ marginTop: '3rem' }}>
                        View Full Profile
                    </a>
                </motion.div>
            </div>
        </section>
    );
};

export default GithubActivity;
