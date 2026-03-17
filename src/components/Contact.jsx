import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Mail, MapPin, Phone, Github, Linkedin, Twitter, Send, CheckCircle, AlertCircle } from 'lucide-react';
import './Contact.css';

const Contact = () => {
    const [formState, setFormState] = useState({
        name: '',
        email: '',
        message: ''
    });
    const [status, setStatus] = useState('idle'); // idle, submitting, success, error

    const handleChange = (e) => {
        setFormState({
            ...formState,
            [e.target.name]: e.target.value
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setStatus('submitting');

        try {
            // NOTE TO USER: Replace this URL with your actual Formspree endpoint
            // e.g. https://formspree.io/f/your_id_here
            const FORMSPREE_ENDPOINT = 'https://formspree.io/f/xvgopkro'; // Using a placeholder/demo endpoint

            const response = await fetch(FORMSPREE_ENDPOINT, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json'
                },
                body: JSON.stringify(formState)
            });

            if (response.ok) {
                setStatus('success');
                setFormState({ name: '', email: '', message: '' });
                setTimeout(() => setStatus('idle'), 5000); // reset after 5s
            } else {
                setStatus('error');
                setTimeout(() => setStatus('idle'), 5000);
            }
        } catch (error) {
            console.error("Form submission error:", error);
            setStatus('error');
            setTimeout(() => setStatus('idle'), 5000);
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
        <section className="contact-section" id="contact">
            <div className="container">
                <motion.div 
                    className="section-header"
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, amount: 0.2 }}
                    variants={itemVariants}
                >
                    <h2 className="section-title">
                        Let's <span style={{ color: "var(--text-primary)" }}>Talk</span>
                    </h2>
                    <div className="section-line"></div>
                </motion.div>

                <div className="contact-content">
                    <motion.div 
                        className="contact-info"
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true, amount: 0.2 }}
                        variants={itemVariants}
                    >
                        <h3 className="contact-heading">Get in Touch</h3>
                        <p className="contact-desc">
                            I'm currently open for new opportunities. Whether you have a question or just want to say hi, I'll try my best to get back to you!
                        </p>

                        <div className="info-items">
                            <div className="info-item">
                                <div className="info-icon">
                                    <Mail size={24} />
                                </div>
                                <div>
                                    <h4 className="info-label">Email</h4>
                                    <a href="mailto:hello@example.com" className="info-value">hello@example.com</a>
                                </div>
                            </div>

                            <div className="info-item">
                                <div className="info-icon">
                                    <MapPin size={24} />
                                </div>
                                <div>
                                    <h4 className="info-label">Location</h4>
                                    <span className="info-value">San Francisco, CA</span>
                                </div>
                            </div>

                            <div className="info-item">
                                <div className="info-icon">
                                    <Phone size={24} />
                                </div>
                                <div>
                                    <h4 className="info-label">Phone</h4>
                                    <a href="tel:+1234567890" className="info-value">+1 (234) 567-890</a>
                                </div>
                            </div>
                        </div>

                        <div className="social-links">
                            <a href="#" className="social-link glass-panel" aria-label="Visit my Github profile">
                                <Github size={20} />
                            </a>
                            <a href="#" className="social-link glass-panel" aria-label="Connect with me on LinkedIn">
                                <Linkedin size={20} />
                            </a>
                            <a href="#" className="social-link glass-panel" aria-label="Follow me on Twitter">
                                <Twitter size={20} />
                            </a>
                        </div>
                    </motion.div>

                    <motion.form 
                        className="contact-form glass-panel" 
                        onSubmit={handleSubmit}
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true, amount: 0.2 }}
                        variants={{
                            hidden: { opacity: 0, y: 30 },
                            visible: { 
                                opacity: 1, 
                                y: 0, 
                                transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1], delay: 0.2 } 
                            }
                        }}
                    >
                        <div className="form-group">
                            <label htmlFor="name" className="form-label">Name</label>
                            <input
                                type="text"
                                id="name"
                                name="name"
                                className="form-input"
                                placeholder="John Doe"
                                value={formState.name}
                                onChange={handleChange}
                                required
                            />
                        </div>

                        <div className="form-group">
                            <label htmlFor="email" className="form-label">Email</label>
                            <input
                                type="email"
                                id="email"
                                name="email"
                                className="form-input"
                                placeholder="john@example.com"
                                value={formState.email}
                                onChange={handleChange}
                                required
                            />
                        </div>

                        <div className="form-group">
                            <label htmlFor="message" className="form-label">Message</label>
                            <textarea
                                id="message"
                                name="message"
                                className="form-textarea"
                                placeholder="Hello, I'd like to talk about..."
                                value={formState.message}
                                onChange={handleChange}
                                required
                            ></textarea>
                        </div>

                        <button
                            type="submit"
                            className={`btn btn-primary submit-btn ${status === 'success' ? 'success' : ''} ${status === 'error' ? 'error' : ''}`}
                            disabled={status === 'submitting'}
                        >
                            {status === 'idle' && (
                                <>Send Message <Send size={18} className="send-icon" /></>
                            )}
                            {status === 'submitting' && 'Sending...'}
                            {status === 'success' && (
                                <>Sent Successfully! <CheckCircle size={18} className="send-icon" /></>
                            )}
                            {status === 'error' && (
                                <>Error. Try Again. <AlertCircle size={18} className="send-icon" /></>
                            )}
                        </button>
                    </motion.form>
                </div>
            </div>

            <footer className="footer">
                <div className="container">
                    <div className="footer-content">
                        <p className="copyright" aria-label="Copyright Information">
                            © {new Date().getFullYear()} John Doe. All rights reserved.
                        </p>
                        <p className="credits" aria-label="Designed with Love">
                            Designed & Built with <span className="heart" aria-hidden="true">❤</span>
                        </p>
                    </div>
                </div>
            </footer>
        </section>
    );
};

export default Contact;
