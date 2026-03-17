import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Quote, ChevronLeft, ChevronRight } from 'lucide-react';
import './Testimonials.css';

const Testimonials = () => {
    const [activeIndex, setActiveIndex] = useState(0);
    const [isAnimating, setIsAnimating] = useState(false);

    const testimonials = [
        {
            id: 1,
            name: 'Sarah Jenkins',
            role: 'Data Science Manager at TechFlow',
            text: 'Aarab completely transformed our machine learning infrastructure. His attention to detail and ability to execute complex models without sacrificing inference speed is unmatched. He is a truly exceptional engineer.',
            avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=150&q=80'
        },
        {
            id: 2,
            name: 'David Chen',
            role: 'Engineering Lead at StartupX',
            text: 'Working with Aarab was a breath of fresh air. He takes ownership of projects from data collection to deployment and consistently delivers polished, highly-accurate models. Highly recommended for any ambitious team.',
            avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&w=150&q=80'
        },
        {
            id: 3,
            name: 'Elena Rodriguez',
            role: 'Founder of HealthTech Solutions',
            text: 'As a product owner, it\'s rare to find machine learning engineers who obsess over model accuracy and practical deployment the way Aarab does. He brought my vision algorithms to life better than I could have imagined.',
            avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?auto=format&fit=crop&w=150&q=80'
        }
    ];

    const handleNext = () => {
        if (isAnimating) return;
        setIsAnimating(true);
        setActiveIndex((prev) => (prev + 1) % testimonials.length);
    };

    const handlePrev = () => {
        if (isAnimating) return;
        setIsAnimating(true);
        setActiveIndex((prev) => (prev - 1 + testimonials.length) % testimonials.length);
    };

    useEffect(() => {
        const timer = setTimeout(() => setIsAnimating(false), 500);
        return () => clearTimeout(timer);
    }, [activeIndex]);

    // Framer motion variants definition
    const itemVariants = {
        hidden: { opacity: 0, y: 30 },
        visible: { 
            opacity: 1, 
            y: 0, 
            transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] } 
        }
    };

    return (
        <section className="testimonials-section" id="testimonials">
            <div className="container">
                <motion.div 
                    className="section-header"
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, amount: 0.2 }}
                    variants={itemVariants}
                >
                    <h2 className="section-title">
                        Client <span style={{ color: "var(--text-primary)" }}>Feedback</span>
                    </h2>
                    <div className="section-line"></div>
                </motion.div>

                <motion.div 
                    className="testimonials-container"
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, amount: 0.2 }}
                    variants={{
                        hidden: { opacity: 0, scale: 0.95 },
                        visible: { 
                            opacity: 1, 
                            scale: 1, 
                            transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1], delay: 0.2 } 
                        }
                    }}
                >
                    <div className="testimonials-track" style={{ transform: `translateX(-${activeIndex * 100}%)` }}>
                        {testimonials.map((testimonial) => (
                            <div key={testimonial.id} className="testimonial-slide">
                                <div className="testimonial-card glass-panel">
                                    <Quote size={48} className="quote-icon" />
                                    <p className="testimonial-text">{testimonial.text}</p>
                                    <div className="testimonial-author">
                                        <img src={testimonial.avatar} alt={testimonial.name} className="author-avatar" />
                                        <div>
                                            <h4 className="author-name">{testimonial.name}</h4>
                                            <p className="author-role">{testimonial.role}</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>

                    <div className="testimonials-controls">
                        <button className="control-btn prev-btn" onClick={handlePrev} aria-label="Previous Testimonial">
                            <ChevronLeft size={24} />
                        </button>
                        <div className="testimonials-dots">
                            {testimonials.map((_, idx) => (
                                <button
                                    key={idx}
                                    className={`dot ${activeIndex === idx ? 'active' : ''}`}
                                    onClick={() => {
                                        if (!isAnimating) {
                                            setIsAnimating(true);
                                            setActiveIndex(idx);
                                        }
                                    }}
                                    aria-label={`Go to slide ${idx + 1}`}
                                ></button>
                            ))}
                        </div>
                        <button className="control-btn next-btn" onClick={handleNext} aria-label="Next Testimonial">
                            <ChevronRight size={24} />
                        </button>
                    </div>
                </motion.div>
            </div>
        </section>
    );
};

export default Testimonials;
