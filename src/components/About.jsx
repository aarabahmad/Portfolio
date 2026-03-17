import React from 'react';
import { motion } from 'framer-motion';
import { User } from 'lucide-react';
import './About.css';

const About = () => {

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
        <section className="about-section" id="about">
            <div className="container">
                <motion.div 
                    className="section-header"
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, amount: 0.2 }}
                    variants={itemVariants}
                >
                    <h2 className="section-title">
                        About <span style={{ color: "var(--text-primary)" }}>Me</span>
                    </h2>
                    <div className="section-line"></div>
                </motion.div>

                <motion.div 
                    className="about-wrapper"
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, amount: 0.2 }}
                    variants={containerVariants}
                >
                    <motion.div className="about-image-column" variants={itemVariants}>
                        <div className="about-image-container glass-panel">
                            <img src="/profile.jpg" alt="Aarab Ahmad" className="about-profile-image" />
                        </div>
                    </motion.div>

                    <motion.div className="about-text-column" variants={itemVariants}>
                        <h3 className="about-heading">I build AI models that balance accuracy and scalability.</h3>
                        <p>
                            With a passion for artificial intelligence, I specialize in developing robust machine learning pipelines and deploying data-driven solutions that solve complex problems.
                        </p>
                        <p>
                            My approach focuses on clean architecture, efficient data processing, and scalable infrastructure. I believe a great model is one that performs reliably in production. When I'm not coding, I'm exploring new architectures or optimizing training loops for maximum efficiency.
                        </p>

                        <div className="stats-container">
                            <div className="stat-box glass-panel">
                                <span className="stat-number text-gradient">5+</span>
                                <span className="stat-label">Years Experience</span>
                            </div>
                            <div className="stat-box glass-panel">
                                <span className="stat-number text-gradient">50+</span>
                                <span className="stat-label">Projects Completed</span>
                            </div>
                        </div>
                    </motion.div>
                </motion.div>
            </div>
        </section>
    );
};

export default About;
