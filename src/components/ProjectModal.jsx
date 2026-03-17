import React, { useEffect } from 'react';
import { X, Github, ExternalLink, Calendar, User, Tag } from 'lucide-react';
import './ProjectModal.css';

const ProjectModal = ({ project, isOpen, onClose }) => {
    // Prevent scrolling on body when modal is open
    useEffect(() => {
        if (isOpen) {
            document.body.style.overflow = 'hidden';
            // Also hide the custom cursor dot nicely while in modal to avoid z-index wars 
            // overlay on top of overlay scenarios, though we could just ensure z-index is correct.
        } else {
            document.body.style.overflow = 'unset';
        }

        const handleEsc = (e) => {
            if (e.key === 'Escape') onClose();
        };
        window.addEventListener('keydown', handleEsc);
        return () => window.removeEventListener('keydown', handleEsc);
    }, [isOpen, onClose]);

    if (!isOpen || !project) return null;

    return (
        <div className={`modal-overlay ${isOpen ? 'open' : ''}`} onClick={onClose}>
            <div className="modal-content glass-panel" onClick={(e) => e.stopPropagation()}>
                <button className="modal-close" onClick={onClose} aria-label="Close modal">
                    <X size={24} />
                </button>

                <div className="modal-header">
                    <div className="modal-image-container">
                        <img src={project.image} alt={project.title} className="modal-image" />
                        <div className="modal-image-overlay"></div>
                    </div>
                </div>

                <div className="modal-body">
                    <h2 className="modal-title">{project.title}</h2>

                    <div className="modal-meta">
                        <span className="meta-item"><Calendar size={16} /> 2024</span>
                        <span className="meta-item"><User size={16} /> Solo Developer</span>
                        <span className="meta-item"><Tag size={16} /> AI Solution</span>
                    </div>

                    <div className="modal-description">
                        <h3>Overview</h3>
                        <p>{project.longDescription || project.description}</p>

                        <h3>The Challenge</h3>
                        <p>{project.challenge}</p>

                        <h3>The Solution</h3>
                        <p>{project.solution}</p>
                    </div>

                    <div className="modal-tech">
                        <h3>Tech Stack</h3>
                        <div className="tech-tags">
                            {project.tech.map((tech, i) => (
                                <span key={i} className="tech-badge">{tech}</span>
                            ))}
                        </div>
                    </div>

                    <div className="modal-actions">
                        <a href={project.links.live} className="btn btn-primary" target="_blank" rel="noopener noreferrer">
                            <ExternalLink size={18} style={{ marginRight: '0.5rem' }} /> View Live site
                        </a>
                        <a href={project.links.github} className="btn btn-secondary glass-panel" target="_blank" rel="noopener noreferrer">
                            <Github size={18} style={{ marginRight: '0.5rem' }} /> View Source
                        </a>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ProjectModal;
