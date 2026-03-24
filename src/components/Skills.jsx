import React from 'react';
import { motion } from 'framer-motion';
import { Code2, Server, Layout, Brain, BarChart2, Wrench } from 'lucide-react';
import './Skills.css';

const skillCategories = [
    {
        icon: <Code2 size={22} />,
        category: 'Languages',
        skills: ['Java', 'Python', 'JavaScript', 'HTML5', 'CSS3', 'SQL'],
    },
    {
        icon: <Server size={22} />,
        category: 'Backend & APIs',
        skills: ['Spring Boot 3', 'FastAPI', 'JWT', 'H2 Database', 'REST APIs'],
    },
    {
        icon: <Layout size={22} />,
        category: 'Frontend',
        skills: ['React 18', 'Vite', 'Tailwind CSS', 'Framer Motion', 'Canvas API'],
    },
    {
        icon: <Brain size={22} />,
        category: 'AI / NLP',
        skills: ['PyTorch', 'NLTK', 'WordNet', 'NLLB-200', 'NLP Pipelines'],
    },
    {
        icon: <BarChart2 size={22} />,
        category: 'Data & Visualization',
        skills: ['Leaflet.js', 'SVG Mapping', 'Data Engineering', 'Tone.js'],
    },
    {
        icon: <Wrench size={22} />,
        category: 'Tools & Practices',
        skills: ['Git & GitHub', 'Dijkstra\'s Algorithm', 'QR Generation', 'Competitive Programming'],
    },
];

const Skills = () => {
    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: { staggerChildren: 0.1, delayChildren: 0.05 }
        }
    };

    const itemVariants = {
        hidden: { opacity: 0, y: 25 },
        visible: {
            opacity: 1,
            y: 0,
            transition: { duration: 0.7, ease: [0.16, 1, 0.3, 1] }
        }
    };

    const chipVariants = {
        hidden: { opacity: 0, scale: 0.85 },
        visible: { opacity: 1, scale: 1, transition: { duration: 0.35 } }
    };

    return (
        <section className="skills-section" id="skills">
            <div className="container">
                <motion.div
                    className="section-header"
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, amount: 0.2 }}
                    variants={itemVariants}
                >
                    <h2 className="section-title">
                        Technical <span style={{ color: 'var(--text-primary)' }}>Expertise</span>
                    </h2>
                    <div className="section-line"></div>
                </motion.div>

                <motion.div
                    className="skills-categories-grid"
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, amount: 0.1 }}
                    variants={containerVariants}
                >
                    {skillCategories.map((group) => (
                        <motion.div key={group.category} className="skill-category-card glass-panel" variants={itemVariants}>
                            <div className="skill-category-header">
                                <div className="skill-category-icon">{group.icon}</div>
                                <h4 className="skill-category-title">{group.category}</h4>
                            </div>
                            <motion.div className="skill-chips" variants={containerVariants}>
                                {group.skills.map((skill) => (
                                    <motion.span key={skill} className="skill-chip" variants={chipVariants}>
                                        {skill}
                                    </motion.span>
                                ))}
                            </motion.div>
                        </motion.div>
                    ))}
                </motion.div>
            </div>
        </section>
    );
};

export default Skills;
