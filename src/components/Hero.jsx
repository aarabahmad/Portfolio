import React, { useEffect } from 'react';
import { motion } from 'framer-motion';
import './Hero.css';

const Hero = () => {
    useEffect(() => {
        const handleMouseMove = (e) => {
            const { clientX, clientY } = e;
            const moveX = (window.innerWidth / 2 - clientX) * 0.05;
            const moveY = (window.innerHeight / 2 - clientY) * 0.05;

            const elements = document.querySelectorAll('.parallax-layer');
            elements.forEach(el => {
                const speed = el.getAttribute('data-speed') || 1;
                el.style.transform = `translate(${moveX * speed}px, ${moveY * speed}px)`;
            });
        };

        window.addEventListener('mousemove', handleMouseMove);

        // Trigger word reveal animation
        setTimeout(() => {
            document.querySelectorAll('.word-reveal').forEach((el, index) => {
                setTimeout(() => {
                    el.classList.add('active');
                }, index * 100);
            });
        }, 500);

        return () => window.removeEventListener('mousemove', handleMouseMove);
    }, []);

    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                staggerChildren: 0.2,
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
        <section className="hero-section" id="hero">
            <div className="hero-background">
                <div className="glow glow-1 parallax-layer" data-speed="0.5"></div>
                <div className="glow glow-2 parallax-layer" data-speed="0.8"></div>
                <div className="glow glow-3 parallax-layer" data-speed="1.2"></div>
                <div className="grid-overlay"></div>
            </div>

            <motion.div 
                className="container hero-content"
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, amount: 0.2 }}
                variants={containerVariants}
            >
                <div className="hero-centered-content">
                    <motion.div className="hero-badge" variants={itemVariants}>
                        <span className="live-dot"></span> Available for AI &amp; ML Projects
                    </motion.div>

                    <motion.h1 className="hero-title" variants={itemVariants}>
                        <div className="reveal-line">
                            <span className="word-reveal">Architecting</span> <span className="word-reveal">Intelligent</span>
                        </div>
                        <div className="reveal-line">
                            <span className="word-reveal" style={{ color: "var(--text-primary)" }}>Systems</span>
                        </div>
                    </motion.h1>

                    <motion.div className="hero-cta" variants={itemVariants}>
                        <a href="#projects" className="btn btn-primary">
                            View My Work <span className="arrow">→</span>
                        </a>
                        <a href="/resume.pdf" target="_blank" rel="noopener noreferrer" className="btn btn-secondary glass-panel">
                            Resume
                        </a>
                    </motion.div>
                </div>
            </motion.div>

        </section>
    );
};

export default Hero;
