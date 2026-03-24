import React, { useRef, useState } from 'react';
import { motion } from 'framer-motion';
import { Github, ExternalLink, Maximize2, Calendar } from 'lucide-react';
import ProjectModal from './ProjectModal';
import './Projects.css';

import diseaseImg from '../assets/Disease.png';
import wordleImg from '../assets/Wordle.png';
import metroSyncImg from '../assets/MetroSync.png';

const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: { 
        opacity: 1, 
        y: 0, 
        transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] } 
    }
};

// Moved OUTSIDE Projects to prevent remounting on every state change
const ProjectCard = ({ project, index, onProjectClick }) => {
    const cardRef = useRef(null);

    const handleMouseMove = (e) => {
        if (!cardRef.current) return;
        const rect = cardRef.current.getBoundingClientRect();
        const x = (e.clientX - rect.left) / rect.width;
        const y = (e.clientY - rect.top) / rect.height;
        const rotateX = (0.5 - y) * 20;
        const rotateY = (x - 0.5) * 20;
        cardRef.current.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale3d(1.02, 1.02, 1.02)`;
        cardRef.current.style.setProperty('--mouse-x', `${e.clientX - rect.left}px`);
        cardRef.current.style.setProperty('--mouse-y', `${e.clientY - rect.top}px`);
    };

    const handleMouseLeave = () => {
        if (!cardRef.current) return;
        cardRef.current.style.transform = `perspective(1000px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)`;
        cardRef.current.style.setProperty('--mouse-x', `-1000px`);
        cardRef.current.style.setProperty('--mouse-y', `-1000px`);
    };

    return (
        <motion.div
            className="project-card glass-panel"
            variants={itemVariants}
            ref={cardRef}
            onMouseMove={handleMouseMove}
            onMouseLeave={handleMouseLeave}
            onClick={() => onProjectClick(project)}
        >
            <div className="glare-container">
                <div className="glare"></div>
            </div>

            <div className="project-image-container">
                <img src={project.image} alt={project.title} className="project-image" loading="lazy" />
                <div className="project-overlay">
                    <div className="view-details-pill">
                        <Maximize2 size={16} /> View Details
                    </div>
                </div>
            </div>

            <div className="project-content">
                <h3 className="project-title">{project.title}</h3>
                <div className="project-meta">
                    <span className="project-date"><Calendar size={14} /> {project.date}</span>
                </div>
                <p className="project-desc">{project.description}</p>

                <div className="project-tech">
                    {project.tech.slice(0, 4).map((tech, i) => (
                        <span key={i} className="tech-badge">{tech}</span>
                    ))}
                    {project.tech.length > 4 && (
                        <span className="tech-badge">+{project.tech.length - 4}</span>
                    )}
                </div>

                <div className="project-links" onClick={(e) => e.stopPropagation()}>
                    {project.links.github && project.links.github !== '#' && (
                        <a href={project.links.github} className="project-link" aria-label="Github Repo" target="_blank" rel="noopener noreferrer">
                            <Github size={20} />
                        </a>
                    )}
                    {project.links.live && project.links.live !== '#' && (
                        <a href={project.links.live} className="project-link" aria-label="Live Site" target="_blank" rel="noopener noreferrer">
                            <ExternalLink size={20} />
                        </a>
                    )}
                </div>
            </div>
        </motion.div>
    );
};

const Projects = () => {
    const [selectedProject, setSelectedProject] = useState(null);
    const [isModalOpen, setIsModalOpen] = useState(false);

    const projects = [
        {
            title: 'MetroSync: Enterprise Metro Booking Service',
            date: 'March 2026',
            description: 'An enterprise-grade metro transit platform for high-performance routing, secure booking, and real-time network visualization.',
            longDescription: 'A decoupled, full-stack ecosystem using Spring Boot 3 and React 18. At its core, I implemented a custom pathfinding engine leveraging a modified Dijkstra\u2019s algorithm that prioritize direct travel. It includes a native SVG renderer for network topologies and a secure E-Ticket system.',
            challenge: 'Commuters often face sub-optimal paths due to ignored interchange time costs. Strict requirements for a self-contained system operating without external map APIs or database installations to meet deployment constraints.',
            solution: 'Modified Dijkstra\u2019s with a 10-minute penalty for line switches. Custom SVG mapping engine for topologies. Tamper-evident E-Ticket system with client-side QR generation and role-based JWT security.',
            image: metroSyncImg,
            tech: ['Java 21', 'Spring Boot 3', 'React 18', 'Vite', 'JWT', 'H2', 'SVG Mapping'],
            links: { github: 'https://github.com/aarabahmad/MetroSync', live: '#' }
        },
        {
            title: 'NLP-Driven Disease Surveillance & Translation System',
            date: 'November 2025',
            description: 'An Intelligent, Offline-First System for Extracting, Summarizing, and Translating Epidemic Intelligence.',
            longDescription: 'The system automates the processing of raw, unstructured health reports from rural Primary Health Centers (PHCs). It transforms noisy, symptom-based text into structured intelligence, providing real-time alerts and localized translations for public health officials and field workers.',
            challenge: 'Public health officials often face an "Information Gap"\u2014possessing vast amounts of data but lacking actionable intelligence. In a typical "Monday Morning" scenario, an epidemiologist might receive over 500 raw text reports. Finding a critical outbreak hidden within routine updates (e.g., identifying "loose watery stools" as potential Cholera) is like finding a needle in a haystack. Furthermore, regional language barriers (where a report is in English but the local worker speaks Marathi) create a dangerous delay in response times.',
            solution: 'I architected a deterministic NLP pipeline designed for high-stakes medical accuracy, ensuring zero hallucinations by avoiding generic LLMs in favor of rule-based intelligence. Key implementations include WordNet for synonym expansion, POS Tagging for grammar-based mining, NLLB-200 model for localized translation, and Leaflet.js with spatial jittering for visualization.',
            image: diseaseImg,
            tech: ['Python', 'FastAPI', 'NLTK', 'PyTorch', 'Leaflet', 'WordNet'],
            links: { github: 'https://github.com/aarabahmad/DiseaseSureveillance' }
        },
        {
            title: 'AI Wordle Guesser',
            date: 'March 2025',
            description: 'An intelligent web-based engine that challenges players to a strategic word-solving game.',
            longDescription: 'AI Wordle Guesser is a sophisticated, interactive web application where users challenge a highly adaptive AI to guess their secret 5-letter word. Beyond a simple game, it serves as a demonstration of heuristic-based problem solving and modern web aesthetics.',
            challenge: 'The primary technical hurdle was developing a performant, client-side guessing engine that could efficiently narrow down a dictionary of over 2,000 words based on complex feedback patterns. Standard Wordle solvers often rely on brute-force or large lookup tables; the challenge here was to create a strategy that felt "human-like" yet remains statistically superior, all while maintaining a smooth 60FPS UI and low-latency feedback processing.',
            solution: 'I architected a Heuristic Frequency Engine that dynamically evaluates letter probabilities across the remaining candidates. Key implementations: Strategic Guessing with entropy maximization, Dynamic Feedback Loop to prevent contradictory input, Immersive UX using Tone.js and Tailwind CSS, and a "Teach Me" feature for vocabulary expansion.',
            image: wordleImg,
            tech: ['HTML5', 'CSS3', 'JavaScript', 'Tailwind CSS', 'Tone.js', 'Canvas'],
            links: { 
                github: 'https://github.com/aarabahmad/Wordle-Guesser-AI.git',
                live: 'https://wordle-guesser-ai.vercel.app/'
            }
        }
    ];

    const handleProjectClick = (project) => {
        setSelectedProject(project);
        setIsModalOpen(true);
    };

    return (
        <>
            <section className="projects-section" id="projects">
                <div className="container">
                    <motion.div 
                        className="section-header"
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true, amount: 0.2 }}
                        variants={itemVariants}
                    >
                        <h2 className="section-title">
                            Featured <span style={{ color: "var(--text-primary)" }}>Work</span>
                        </h2>
                        <div className="section-line"></div>
                    </motion.div>

                    <motion.div 
                        className="projects-grid"
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true, amount: 0.1 }}
                        variants={{
                            hidden: { opacity: 0 },
                            visible: {
                                opacity: 1,
                                transition: { staggerChildren: 0.2 }
                            }
                        }}
                    >
                        {projects.map((project, index) => (
                            <ProjectCard key={project.title} project={project} index={index} onProjectClick={handleProjectClick} />
                        ))}
                    </motion.div>

                    <motion.div 
                        className="projects-cta text-center"
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true, amount: 0.5 }}
                        variants={itemVariants}
                    >
                        <a href="https://github.com/aarabahmad?tab=repositories" target="_blank" rel="noopener noreferrer" className="btn btn-secondary glass-panel" style={{ marginTop: '4rem' }}>
                            View All Projects
                        </a>
                    </motion.div>
                </div>
            </section>

            <ProjectModal
                project={selectedProject}
                isOpen={isModalOpen}
                onClose={() => setIsModalOpen(false)}
            />
        </>
    );
};

export default Projects;
