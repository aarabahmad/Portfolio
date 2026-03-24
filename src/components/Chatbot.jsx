import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Send, Bot, User, Sparkles, X, MessageSquare } from 'lucide-react';
import './Chatbot.css';

const QUICK_REPLIES = [
    '🛠️ Skills',
    '📁 Projects',
    '🏆 Achievements',
    '📜 Certifications',
    '📬 Contact',
];

const generateBotResponse = (query) => {
    const lowerQuery = query.toLowerCase().replace(/[^\w\s]/g, '');
    const tokens = lowerQuery.split(' ').filter(Boolean);

    const kb = [
        {
            intent: 'greeting',
            keywords: ['hello', 'hi', 'hey', 'greetings', 'morning', 'afternoon', 'sup', 'yo'],
            weight: 1,
            responses: [
                "Hi there! I'm Aarab's personal AI assistant. Ask me about his skills, projects, certifications, or how to get in touch!",
                "Hello! How can I help you learn more about Aarab today?",
            ]
        },
        {
            intent: 'skills_general',
            keywords: ['skill', 'stack', 'technologies', 'technology', 'tools', 'know', 'proficient', 'expert', 'good'],
            weight: 1.5,
            responses: [
                "Aarab's core tech stack spans Full-Stack Dev and AI/ML: Java, Spring Boot, React, Python, FastAPI, PyTorch, NLTK, SQL, and more. He's comfortable working across the entire software lifecycle—from system design to deployment."
            ]
        },
        {
            intent: 'skills_specific_ai',
            keywords: ['ai', 'ml', 'machine', 'learning', 'deep', 'pytorch', 'nlp', 'model', 'train', 'deploy', 'python'],
            weight: 2,
            responses: [
                "In AI/ML, Aarab has hands-on experience with NLP pipelines (NLTK, NLLB-200), PyTorch, and FastAPI for model deployment. His NLP Disease Surveillance project is a strong example of applied AI in the real world."
            ]
        },
        {
            intent: 'projects',
            keywords: ['project', 'portfolio', 'built', 'work', 'made', 'created', 'github', 'repo', 'showcase', 'metrosync', 'nlp', 'wordle'],
            weight: 1.5,
            responses: [
                "Aarab has built 3 featured projects:\n\n• MetroSync (Mar 2026) — Java/Spring Boot enterprise metro booking system with Dijkstra's pathfinding\n• NLP Disease Surveillance (Nov 2025) — Offline NLP pipeline for epidemic intelligence\n• AI Wordle Guesser (Mar 2025) — Browser-based heuristic AI word solver\n\nCheck the Projects section above!",
            ]
        },
        {
            intent: 'certifications',
            keywords: ['certif', 'certificate', 'course', 'nptel', 'algouniversity', 'algotutor', 'credential', 'learn'],
            weight: 2,
            responses: [
                "Aarab holds 3 certifications:\n\n• 28 Days Competitive Programming — AlgoTutor (Aug 2025)\n• Social Networks — NPTEL/IIT Madras (Apr 2024)\n• Graph Theory Programming Camp — AlgoUniversity (Mar 2024)\n\nYou can view them in the Certifications section!"
            ]
        },
        {
            intent: 'achievements',
            keywords: ['achievement', 'accomplish', 'award', 'rating', 'leetcode', 'contest', 'solved', 'problem', 'competitive'],
            weight: 2,
            responses: [
                "Aarab's key achievements include:\n\n🏆 LeetCode Contest Rating of 1482\n⭐ 750+ problems solved across LeetCode, Codeforces & GFG\n🎯 Open Source Contributor"
            ]
        },
        {
            intent: 'education',
            keywords: ['education', 'degree', 'university', 'college', 'study', 'major', 'background', 'lpu'],
            weight: 1.5,
            responses: [
                "Aarab is a Computer Science undergraduate with a background in software engineering and AI. He has supplemented his education with certifications from AlgoTutor, NPTEL, and AlgoUniversity."
            ]
        },
        {
            intent: 'experience',
            keywords: ['experience', 'work', 'job', 'history', 'role', 'resume', 'company', 'employed', 'intern'],
            weight: 1.5,
            responses: [
                "Aarab is a self-driven developer who has built full production-grade projects independently — from backend APIs and ML pipelines to frontend UIs. He's actively looking for exciting opportunities in software development or AI!"
            ]
        },
        {
            intent: 'contact',
            keywords: ['contact', 'email', 'hire', 'reach', 'touch', 'message', 'phone', 'talk', 'speak', 'opportunity'],
            weight: 2,
            responses: [
                "You can reach Aarab at:\n📧 ahmadaarab315@gmail.com\n📞 +91 7068460882\n\nOr use the Contact form at the bottom of this page. He's open to new opportunities!"
            ]
        },
        {
            intent: 'location',
            keywords: ['location', 'where', 'live', 'city', 'country', 'based', 'india', 'remote', 'relocate'],
            weight: 2,
            responses: [
                "Aarab is based in Uttar Pradesh, India. He is open to remote roles and on-site opportunities."
            ]
        },
        {
            intent: 'identity',
            keywords: ['who', 'bot', 'real', 'human', 'ai', 'name', 'created', 'you'],
            weight: 2,
            responses: [
                "I'm AarabBot — a custom rule-based AI assistant built to help you explore Aarab Ahmad's portfolio! I can tell you about his projects, skills, certifications, or how to contact him.",
            ]
        },
        {
            intent: 'website_tech',
            keywords: ['website', 'portfolio', 'react', 'framer', 'motion', 'css', 'design', 'vite', 'built'],
            weight: 2,
            responses: [
                "This portfolio was built by Aarab using React + Vite, vanilla CSS with custom design tokens, and Framer Motion for smooth animations. The chatbot is a custom rule-based NLP engine — no external APIs!"
            ]
        }
    ];

    let bestMatch = { intent: null, score: 0, responses: [] };

    for (const entry of kb) {
        let score = 0;
        for (const token of tokens) {
            if (token.length <= 2) {
                if (entry.keywords.includes(token)) score += (1 * entry.weight);
            } else {
                const matched = entry.keywords.some(kw => kw.includes(token) || token.includes(kw));
                if (matched) score += (1 * entry.weight);
            }
        }
        if (score > bestMatch.score) {
            bestMatch = { intent: entry.intent, score, responses: entry.responses };
        }
    }

    if (bestMatch.score >= 1) {
        return bestMatch.responses[Math.floor(Math.random() * bestMatch.responses.length)];
    }

    const fallbacks = [
        "I'm not sure I caught that! Try asking about Aarab's skills, projects, certifications, or contact info.",
        "Hmm, that's outside my knowledge. Ask me about Aarab's tech stack, achievements, or how to reach him!",
        "I'm still learning! Try asking about Aarab's projects or certifications.",
    ];
    return fallbacks[Math.floor(Math.random() * fallbacks.length)];
};

const Chatbot = () => {
    const [messages, setMessages] = useState([
        {
            id: 1,
            sender: 'bot',
            text: "Hi! I'm Aarab's personal AI assistant 👋\n\nAsk me anything about his skills, projects, certifications, or how to get in touch!"
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

    const sendMessage = (text) => {
        if (!text.trim() || isTyping) return;
        const userMsg = { id: Date.now(), sender: 'user', text: text.trim() };
        setMessages(prev => [...prev, userMsg]);
        setInput('');
        setIsTyping(true);
        setTimeout(() => {
            const botMsg = { id: Date.now() + 1, sender: 'bot', text: generateBotResponse(text) };
            setMessages(prev => [...prev, botMsg]);
            setIsTyping(false);
        }, 800 + Math.random() * 800);
    };

    const handleSend = (e) => {
        e.preventDefault();
        sendMessage(input);
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
                                <Bot size={22} className="bot-header-icon" />
                            </div>
                            <div className="bot-header-text">
                                <h3>AarabBot <Sparkles size={14} /></h3>
                                <span className="bot-status"><span className="status-dot"></span> Online</span>
                            </div>
                            <button className="chat-close-btn" onClick={() => setIsOpen(false)} aria-label="Close chat">
                                <X size={18} />
                            </button>
                        </div>

                        <div className="chat-window">
                            {messages.map((msg) => (
                                <div key={msg.id} className={`chat-message-wrapper ${msg.sender === 'user' ? 'user-wrapper' : 'bot-wrapper'}`}>
                                    {msg.sender === 'bot' && (
                                        <div className="chat-avatar bot-avatar">
                                            <Bot size={16} />
                                        </div>
                                    )}
                                    <div className={`chat-message ${msg.sender}-message`}>
                                        {msg.text.split('\n').map((line, i) => (
                                            <span key={i}>{line}{i < msg.text.split('\n').length - 1 && <br />}</span>
                                        ))}
                                    </div>
                                    {msg.sender === 'user' && (
                                        <div className="chat-avatar user-avatar">
                                            <User size={16} />
                                        </div>
                                    )}
                                </div>
                            ))}
                            {isTyping && (
                                <div className="chat-message-wrapper bot-wrapper">
                                    <div className="chat-avatar bot-avatar">
                                        <Bot size={16} />
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

                        <div className="quick-replies">
                            {QUICK_REPLIES.map((label) => (
                                <button key={label} className="quick-reply-chip" onClick={() => sendMessage(label)} disabled={isTyping}>
                                    {label}
                                </button>
                            ))}
                        </div>

                        <form className="chat-input-area" onSubmit={handleSend}>
                            <input
                                type="text"
                                value={input}
                                onChange={(e) => setInput(e.target.value)}
                                placeholder="Ask me anything..."
                                className="chat-input"
                                maxLength={200}
                            />
                            <button type="submit" className="chat-send-btn" disabled={!input.trim() || isTyping}>
                                <Send size={18} />
                            </button>
                        </form>
                    </motion.div>
                )}
            </AnimatePresence>

            <motion.button
                className="chatbot-fab"
                onClick={() => setIsOpen(!isOpen)}
                whileHover={{ scale: 1.08 }}
                whileTap={{ scale: 0.93 }}
                aria-label="Toggle AI Assistant"
            >
                <AnimatePresence mode="wait">
                    {isOpen ? (
                        <motion.span key="close" initial={{ rotate: -90, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }} exit={{ rotate: 90, opacity: 0 }} transition={{ duration: 0.2 }}>
                            <X size={24} />
                        </motion.span>
                    ) : (
                        <motion.span key="open" initial={{ rotate: 90, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }} exit={{ rotate: -90, opacity: 0 }} transition={{ duration: 0.2 }}>
                            <MessageSquare size={24} />
                        </motion.span>
                    )}
                </AnimatePresence>
            </motion.button>
        </div>
    );
};

export default Chatbot;
