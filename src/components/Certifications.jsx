import React from 'react';
import { motion } from 'framer-motion';
import { Award, ExternalLink, Calendar } from 'lucide-react';
import './Certifications.css';

const Certifications = () => {
    const certifications = [
        {
            title: 'AWS Certified Machine Learning – Specialty',
            issuer: 'Amazon Web Services',
            date: 'Dec 2023',
            description: 'Validated expertise in building, training, tuning, and deploying machine learning models on AWS.',
            link: '#'
        },
        {
            title: 'Deep Learning Specialization',
            issuer: 'DeepLearning.AI (Coursera)',
            date: 'Aug 2023',
            description: 'Mastered neural network foundations, CNNs, Sequence Models, and structuring machine learning projects.',
            link: '#'
        },
        {
            title: 'TensorFlow Developer Certificate',
            issuer: 'Google',
            date: 'Mar 2023',
            description: 'Demonstrated proficiency in building deep learning models for computer vision, natural language processing, and time series forecasting.',
            link: '#'
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
        <section className="certifications-section" id="certifications">
            <div className="container">
                <motion.div 
                    className="section-header"
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, amount: 0.2 }}
                    variants={itemVariants}
                >
                    <h2 className="section-title">
                        Professional <span style={{ color: "var(--text-primary)" }}>Certifications</span>
                    </h2>
                    <div className="section-line"></div>
                </motion.div>

                <motion.div 
                    className="certifications-grid"
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
                    {certifications.map((cert, index) => (
                        <motion.div key={index} className="cert-card glass-panel" variants={itemVariants}>
                            <div className="cert-icon-container">
                                <Award size={32} className="cert-icon" />
                            </div>
                            <div className="cert-content">
                                <h3 className="cert-title">{cert.title}</h3>
                                <p className="cert-issuer">{cert.issuer}</p>
                                <div className="cert-meta">
                                    <span className="cert-date"><Calendar size={14} /> {cert.date}</span>
                                </div>
                                <p className="cert-desc">{cert.description}</p>
                                <a href={cert.link} target="_blank" rel="noopener noreferrer" className="cert-link">
                                    Verify Credential <ExternalLink size={14} />
                                </a>
                            </div>
                        </motion.div>
                    ))}
                </motion.div>
            </div>
        </section>
    );
};

export default Certifications;
