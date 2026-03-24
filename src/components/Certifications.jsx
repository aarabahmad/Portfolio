import React from 'react';
import { motion } from 'framer-motion';
import { Award, ExternalLink, Calendar } from 'lucide-react';
import './Certifications.css';

const Certifications = () => {
    const certifications = [
        {
            title: '28 Days Competitive Programming',
            issuer: 'AlgoTutor',
            date: 'Aug 2025',
            description: 'Successfully completed intensive training in Competitive Programming. Recognized for active participation, strong problem-solving skills, and excellence in practical assignments.',
            link: 'https://drive.google.com/file/d/19SMuA7d9TTFKnz7GgQXl2oGhRfPySf0J/view?usp=sharing',
            image: '/certificates/Aarab Ahmad - AlgoTutor.png'
        },
        {
            title: 'Social Networks (NPTEL Online Certification)',
            issuer: 'NPTEL (IIT Madras)',
            date: 'Apr 2024',
            description: 'Successfully completed the NPTEL online certification course on "Social Networks" with a focus on graph theory, network analysis, and structural properties of social systems.',
            link: 'https://drive.google.com/file/d/1cTlkHqhFAn8AJA-88ptKTbo6iCNTXq4c/view?usp=sharing',
            image: '/certificates/Social Networks.png'
        },
        {
            title: 'Graph Theory Programming Camp',
            issuer: 'AlgoUniversity',
            date: 'Mar 2024',
            description: 'Successfully completed the Graphs Programming Camp under the mentorship of Codeforces Master, Manas Kumar Verma and conquering 17 advanced graph problems.',
            link: 'https://drive.google.com/file/d/1iigi-C5s6YxDzqXH12zHyl9cPsYXhxw8/view?usp=sharing',
            image: '/certificates/Aarab Ahmad - AlgoUniversity.png'
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
                            {cert.image ? (
                                <div className="cert-image-container">
                                    <img src={cert.image} alt={cert.title} className="cert-image" />
                                </div>
                            ) : (
                                <div className="cert-icon-container">
                                    <Award size={32} className="cert-icon" />
                                </div>
                            )}
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
