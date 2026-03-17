import React from 'react';
import { motion } from 'framer-motion';
import { Trophy, Star, Target } from 'lucide-react';
import './Achievements.css';

const Achievements = () => {
    const achievements = [
        {
            icon: <Trophy size={32} />,
            title: 'Kaggle Competition Winner',
            description: 'Placed 1st out of 2,000+ teams in the Global Predictive Modeling Challenge by optimizing a custom XGBoost ensemble model.'
        },
        {
            icon: <Star size={32} />,
            title: 'Outstanding Engineer Award 2024',
            description: 'Recognized for single-handedly reducing cloud ML training costs by 40% through infrastructure redesign and spot-instance utilization.'
        },
        {
            icon: <Target size={32} />,
            title: 'Open Source Contributor',
            description: 'Core contributor to major open-source machine learning libraries, with over 50+ merged pull requests optimizing core tensor operations.'
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
        <section className="achievements-section" id="achievements">
            <div className="container">
                <motion.div 
                    className="section-header"
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, amount: 0.2 }}
                    variants={itemVariants}
                >
                    <h2 className="section-title">
                        Key <span style={{ color: "var(--text-primary)" }}>Achievements</span>
                    </h2>
                    <div className="section-line"></div>
                </motion.div>

                <motion.div 
                    className="achievements-grid"
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
                    {achievements.map((item, index) => (
                        <motion.div key={index} className="achievement-card glass-panel" variants={itemVariants}>
                            <div className="achievement-icon-wrapper">
                                {item.icon}
                            </div>
                            <h3 className="achievement-title">{item.title}</h3>
                            <p className="achievement-desc">{item.description}</p>
                        </motion.div>
                    ))}
                </motion.div>
            </div>
        </section>
    );
};

export default Achievements;
