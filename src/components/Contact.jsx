import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Mail, MapPin, Phone, Github, Linkedin, Send, CheckCircle, AlertCircle } from 'lucide-react';
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
            const FORMSPREE_ENDPOINT = 'https://formspree.io/f/xzdjnqro';

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
                                    <a href="mailto:ahmadaarab315@gmail.com" className="info-value">ahmadaarab315@gmail.com</a>
                                </div>
                            </div>

                            <div className="info-item">
                                <div className="info-icon">
                                    <MapPin size={24} />
                                </div>
                                <div>
                                    <h4 className="info-label">Location</h4>
                                    <span className="info-value">Uttar Pradesh, India</span>
                                </div>
                            </div>

                            <div className="info-item">
                                <div className="info-icon">
                                    <Phone size={24} />
                                </div>
                                <div>
                                    <h4 className="info-label">Phone</h4>
                                    <a href="tel:+917068460882" className="info-value">+91 7068460882</a>
                                </div>
                            </div>
                        </div>

                        <div className="social-links">
                            <a href="https://github.com/aarabahmad" target="_blank" rel="noopener noreferrer" className="social-link glass-panel" aria-label="Visit my Github profile">
                                <Github size={20} />
                            </a>
                            <a href="https://linkedin.com/in/aarabahmad" target="_blank" rel="noopener noreferrer" className="social-link glass-panel" aria-label="Connect with me on LinkedIn">
                                <Linkedin size={20} />
                            </a>
                            <a href="https://leetcode.com/u/aarabahmad/" target="_blank" rel="noopener noreferrer" className="social-link glass-panel" aria-label="Visit my LeetCode profile">
                                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="20" height="20" fill="currentColor">
                                    <path d="M13.483 0a1.374 1.374 0 0 0-.961.438L7.116 6.226l-3.854 4.126a5.266 5.266 0 0 0-1.209 2.104 5.35 5.35 0 0 0-.125.513 5.527 5.527 0 0 0 .062 2.362 5.83 5.83 0 0 0 .349 1.017 5.938 5.938 0 0 0 1.271 1.818l4.277 4.193.039.038c2.248 2.165 5.852 2.133 8.063-.074l2.396-2.392c.54-.54.54-1.414.003-1.955a1.378 1.378 0 0 0-1.951-.003l-2.396 2.392a3.021 3.021 0 0 1-4.205.038l-.02-.019-4.276-4.193c-.652-.64-.972-1.469-.948-2.263a2.68 2.68 0 0 1 .066-.523 2.545 2.545 0 0 1 .619-1.164L9.13 8.114c1.058-1.134 3.204-1.27 4.43-.278l3.501 2.831c.593.48 1.461.387 1.94-.207a1.384 1.384 0 0 0-.207-1.943l-3.5-2.831c-.8-.647-1.766-1.045-2.774-1.202l2.015-2.158A1.384 1.384 0 0 0 13.483 0zm-2.866 12.815a1.38 1.38 0 0 0-1.38 1.382 1.38 1.38 0 0 0 1.38 1.382H20.79a1.38 1.38 0 0 0 1.38-1.382 1.38 1.38 0 0 0-1.38-1.382z"/>
                                </svg>
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
                            © {new Date().getFullYear()} Aarab Ahmad. All rights reserved.
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
