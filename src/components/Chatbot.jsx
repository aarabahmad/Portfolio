import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Send, Bot, User, Sparkles, X, MessageSquare } from 'lucide-react';
import './Chatbot.css';

const Chatbot = () => {
    const [messages, setMessages] = useState([
        {
            id: 1,
            sender: 'bot',
            text: "Hello! I'm Aarab's personal AI assistant. You can ask me about his skills, projects, experience, or how to contact him."
        }
    ]);
    const [input, setInput] = useState('');
    const [isTyping, setIsTyping] = useState(false);
    const [isOpen, setIsOpen] = useState(false);
    const messagesEndRef = useRef(null);

    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    };

    useEffect(() => {
        scrollToBottom();
    }, [messages, isTyping]);

    const handleSend = (e) => {
        e.preventDefault();
        if (!input.trim()) return;

        const userMsg = { id: Date.now(), sender: 'user', text: input.trim() };
        setMessages(prev => [...prev, userMsg]);
        setInput('');
        setIsTyping(true);

        // Simulate network/inference latency
        setTimeout(() => {
            const botResponseText = generateBotResponse(userMsg.text);
            const botMsg = { id: Date.now() + 1, sender: 'bot', text: botResponseText };
            setMessages(prev => [...prev, botMsg]);
            setIsTyping(false);
        }, 1000 + Math.random() * 1000); // 1-2 second delay
    };

    const generateBotResponse = (query) => {
        const lowerQuery = query.toLowerCase().replace(/[^\w\s]/g, ''); // strip punctuation
        const tokens = lowerQuery.split(' ').filter(Boolean);

        // Advanced Knowledge Base
        const kb = [
            {
                intent: 'greeting',
                keywords: ['hello', 'hi', 'hey', 'greetings', 'morning', 'afternoon', 'sup', 'yo'],
                weight: 1,
                responses: [
                    "Hi there! Feel free to ask me anything about Aarab's professional background, skills, or projects.",
                    "Hello! I am Aarab's AI assistant. How can I help you today?",
                    "Greetings! I'm here to answer your questions about Aarab."
                ]
            },
            {
                intent: 'skills_general',
                keywords: ['skill', 'stack', 'technologies', 'technology', 'tools', 'know', 'can', 'do', 'proficient', 'expert', 'good'],
                weight: 1.5,
                responses: [
                    "Aarab specializes in Machine Learning and Deep Learning. His core tech stack includes Python, PyTorch, TensorFlow, FastAPI, and data engineering tools like PostgreSQL. He's also proficient in model optimization and deployment."
                ]
            },
            {
                intent: 'skills_specific_ai',
                keywords: ['ai', 'ml', 'machine', 'learning', 'deep', 'pytorch', 'tensorflow', 'keras', 'scikit', 'vision', 'nlp', 'model', 'train', 'deploy'],
                weight: 2,
                responses: [
                    "Aarab is deeply experienced in Machine Learning. He builds, trains, and deploys models using PyTorch and TensorFlow, focusing on both Computer Vision and NLP architectures, with a strong emphasis on inference optimization."
                ]
            },
            {
                intent: 'experience',
                keywords: ['experience', 'work', 'job', 'background', 'history', 'role', 'resume', 'company', 'employed', 'past'],
                weight: 1.5,
                responses: [
                    "Aarab has over 5 years of experience building scalable machine learning models and data pipelines. He has a track record of deploying robust AI solutions that solve complex enterprise problems."
                ]
            },
            {
                intent: 'projects',
                keywords: ['project', 'portfolio', 'built', 'work', 'made', 'created', 'github', 'repo', 'open', 'source', 'showcase'],
                weight: 1.5,
                responses: [
                    "Some of Aarab's key projects include the 'NexGen AI Platform' for enterprise model management, a 'Predictive Market Forecaster', and a 'VisionAI Medical Analysis' tool. You can check out the Projects and Open Source sections for details!"
                ]
            },
            {
                intent: 'education',
                keywords: ['education', 'degree', 'university', 'college', 'study', 'major', 'certifications', 'certified', 'aws', 'coursera'],
                weight: 1.5,
                responses: [
                    "Aarab has a strong academic background in Computer Science and holds multiple advanced certifications in Machine Learning and Deep Learning from AWS and DeepLearning.AI."
                ]
            },
            {
                intent: 'contact',
                keywords: ['contact', 'email', 'hire', 'reach', 'touch', 'message', 'phone', 'talk', 'speak', 'interview', 'opportunity'],
                weight: 2,
                responses: [
                    "You can reach Aarab via the Contact form at the bottom of the page, or connect with him on LinkedIn. He's always open to discussing exciting AI/ML opportunities!"
                ]
            },
            {
                intent: 'location',
                keywords: ['location', 'where', 'live', 'city', 'country', 'based', 'timezone', 'remote', 'relocate'],
                weight: 2,
                responses: [
                    "Aarab is flexible with location and open to remote work opportunities worldwide."
                ]
            },
            {
                intent: 'identity',
                keywords: ['who', 'are', 'you', 'bot', 'real', 'human', 'ai', 'name', 'created'],
                weight: 2,
                responses: [
                    "I'm AarabBot! I am a custom AI assistant built by Aarab to help you learn more about his professional skills and background.",
                    "I am an AI clone built to answer questions about Aarab's work."
                ]
            },
            {
                intent: 'website_tech',
                keywords: ['how', 'build', 'website', 'portfolio', 'react', 'tailwind', 'framer', 'motion', 'css', 'design', 'ui'],
                weight: 2,
                responses: [
                    "This portfolio was built by Aarab using React, vanilla CSS with custom variables for styling, and Framer Motion for all the smooth scroll animations and transitions."
                ]
            }
        ];

        // Fuzzy Match Scoring System
        let bestMatch = { intent: null, score: 0, responses: [] };

        for (const entry of kb) {
            let score = 0;
            // Check exact matches and partial substring matches (basic fuzzy catch)
            for (const token of tokens) {
                // If the token is too short, require exact match to avoid false positives on 'a', 'in', etc.
                if (token.length <= 2) {
                    if (entry.keywords.includes(token)) score += (1 * entry.weight);
                } else {
                    // For longer words, check if the token is a substring of the keyword or vice-versa
                    const matched = entry.keywords.some(kw => kw.includes(token) || token.includes(kw));
                    if (matched) score += (1 * entry.weight);
                }
            }

            // Bonus for continuous phrases could be added here if needed

            if (score > bestMatch.score) {
                bestMatch = {
                    intent: entry.intent,
                    score: score,
                    responses: entry.responses
                };
            }
        }

        // Threshold for a "confident" answer
        if (bestMatch.score >= 1) {
            // Pick a random response from the best matched intent
            const randomIndex = Math.floor(Math.random() * bestMatch.responses.length);
            return bestMatch.responses[randomIndex];
        }

        // Fallbacks
        const fallbacks = [
            "I'm not quite sure I understand. I'm mainly trained on Aarab's professional background—try asking about his skills, experience, or projects!",
            "Hmm, I don't have that information. Could you ask me something specifically about Aarab's tech stack or career?",
            "I'm still learning! My expertise right now is solely focused on answering questions about Aarab's portfolio and professional history."
        ];
        return fallbacks[Math.floor(Math.random() * fallbacks.length)];
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
        <div className="chatbot-widget">
            <AnimatePresence>
                {isOpen && (
                    <motion.div 
                        className="chatbot-container glass-panel"
                        initial={{ opacity: 0, y: 30, scale: 0.9, originX: 1, originY: 1 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, scale: 0.9, y: 30 }}
                        transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
                    >
                        <div className="chatbot-header">
                            <div className="bot-avatar-container">
                                <Bot size={24} className="bot-header-icon" />
                            </div>
                            <div className="bot-header-text">
                                <h3>AarabBot Engine <Sparkles size={16} /></h3>
                                <span className="bot-status"><span className="status-dot"></span> Online</span>
                            </div>
                            <button className="chat-close-btn" onClick={() => setIsOpen(false)} aria-label="Close chat">
                                <X size={20} />
                            </button>
                        </div>

                        <div className="chat-window">
                            {messages.map((msg) => (
                                <div key={msg.id} className={`chat-message-wrapper ${msg.sender === 'user' ? 'user-wrapper' : 'bot-wrapper'}`}>
                                    {msg.sender === 'bot' && (
                                        <div className="chat-avatar bot-avatar">
                                            <Bot size={18} />
                                        </div>
                                    )}
                                    <div className={`chat-message ${msg.sender}-message`}>
                                        {msg.text}
                                    </div>
                                    {msg.sender === 'user' && (
                                        <div className="chat-avatar user-avatar">
                                            <User size={18} />
                                        </div>
                                    )}
                                </div>
                            ))}
                            {isTyping && (
                                <div className="chat-message-wrapper bot-wrapper">
                                    <div className="chat-avatar bot-avatar">
                                        <Bot size={18} />
                                    </div>
                                    <div className="chat-message bot-message typing-indicator">
                                        <span></span>
                                        <span></span>
                                        <span></span>
                                    </div>
                                </div>
                            )}
                            <div ref={messagesEndRef} />
                        </div>

                        <form className="chat-input-area" onSubmit={handleSend}>
                            <input
                                type="text"
                                value={input}
                                onChange={(e) => setInput(e.target.value)}
                                placeholder="Ask me anything about Aarab..."
                                className="chat-input"
                                maxLength={150}
                            />
                            <button type="submit" className="chat-send-btn" disabled={!input.trim() || isTyping}>
                                <Send size={20} />
                            </button>
                        </form>
                    </motion.div>
                )}
            </AnimatePresence>

            <motion.button 
                className="chatbot-fab"
                onClick={() => setIsOpen(!isOpen)}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                aria-label="Toggle AI Assistant"
            >
                {isOpen ? <X size={24} /> : <MessageSquare size={24} />}
            </motion.button>
        </div>
    );
};

export default Chatbot;
