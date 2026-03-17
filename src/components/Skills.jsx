import React from 'react';
import { motion } from 'framer-motion';
import { Code, Brain, Network, Database, Cpu, LineChart } from 'lucide-react';
import './Skills.css';

const Skills = () => {
    const skills = [
        { name: 'Machine Learning', icon: <Brain />, level: 95 },
        { name: 'Deep Learning', icon: <Network />, level: 90 },
        { name: 'Data Engineering', icon: <Database />, level: 92 },
        { name: 'Python/PyTorch', icon: <Code />, level: 98 },
        { name: 'Model Optimization', icon: <Cpu />, level: 88 },
        { name: 'Data Visualization', icon: <LineChart />, level: 85 },
    ];

    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                staggerChildren: 0.15,
                delayChildren: 0.1
            }
        }
    };

    const itemVariants = {
        hidden: { opacity: 0, y: 30 },
        visible: { 
            opacity: 1, 
            y: 0, 
            transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] } 
        }
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
                        Technical <span style={{ color: "var(--text-primary)" }}>Expertise</span>
                    </h2>
                    <div className="section-line"></div>
                </motion.div>

                <div className="skills-container">
                    <motion.div 
                        className="skills-grid"
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true, amount: 0.2 }}
                        variants={containerVariants}
                    >
                        {skills.map((skill, index) => (
                            <motion.div key={index} className="skill-card glass-panel" variants={itemVariants}>
                                <div className="skill-icon">{skill.icon}</div>
                                <div className="skill-content">
                                    <h4 className="skill-name">{skill.name}</h4>
                                    <div className="skill-bar-bg">
                                        <motion.div 
                                            className="skill-bar" 
                                            initial={{ width: 0 }}
                                            whileInView={{ width: `${skill.level}%` }}
                                            viewport={{ once: true }}
                                            transition={{ duration: 1, ease: "easeOut", delay: 0.5 }}
                                        ></motion.div>
                                    </div>
                                </div>
                            </motion.div>
                        ))}
                    </motion.div>
                </div>
            </div>
        </section>
    );
};

export default Skills;
