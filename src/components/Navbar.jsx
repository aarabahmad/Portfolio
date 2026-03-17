import React, { useState, useEffect } from 'react';
import { useTheme } from '../context/ThemeContext';
import { Moon, Sun } from 'lucide-react';
import './Navbar.css';

const Navbar = () => {
    const { isDarkMode, toggleTheme } = useTheme();
    const [scrolled, setScrolled] = useState(false);
    const [activeSection, setActiveSection] = useState('hero');

    const navLinks = [
        { name: 'About', href: '#about' },
        { name: 'Skills', href: '#skills' },
        { name: 'Certifications', href: '#certifications' },
        { name: 'Achievements', href: '#achievements' },
        { name: 'Profiles', href: '#coding-profiles' },
        { name: 'Badges', href: '#badges' },
        { name: 'Projects', href: '#projects' },
        { name: 'Contact', href: '#contact' },
    ];

    useEffect(() => {
        const handleScroll = () => {
            const isScrolled = window.scrollY > 50;
            if (isScrolled !== scrolled) {
                setScrolled(isScrolled);
            }

            // Determine active section
            const sections = navLinks.map(link => link.href.substring(1));

            for (const section of sections) {
                const element = document.getElementById(section);
                if (element) {
                    const rect = element.getBoundingClientRect();
                    // If the section's top is comfortably within the viewport
                    if (rect.top <= 200 && rect.bottom >= 200) {
                        setActiveSection(section);
                        break;
                    }
                }
            }
        };

        window.addEventListener('scroll', handleScroll, { passive: true });
        return () => window.removeEventListener('scroll', handleScroll);
    }, [scrolled]);

    return (
        <nav className={`navbar ${scrolled ? 'nav-scrolled' : ''}`}>
            <div className="navbar-container">
                <a href="#hero" className="navbar-logo">
                    <img src="/logo.png" alt="Aarab Ahmad" className="brand-logo" />
                </a>

                <div className="nav-links">
                    {navLinks.map((link) => (
                        <a
                            key={link.name}
                            href={link.href}
                            className={`nav-link ${activeSection === link.href.substring(1) ? 'active' : ''}`}
                        >
                            {link.name}
                        </a>
                    ))}

                    <button
                        onClick={toggleTheme}
                        className="theme-toggle-btn glass-panel"
                        aria-label={isDarkMode ? "Switch to Light Mode" : "Switch to Dark Mode"}
                    >
                        {isDarkMode ? <Sun size={18} /> : <Moon size={18} />}
                    </button>

                    <a href="/resume.pdf" target="_blank" rel="noopener noreferrer" className="btn btn-primary" style={{ padding: '0.5rem 1.5rem', marginLeft: '1rem', fontSize: '0.9rem' }}>
                        Resume
                    </a>
                </div>
            </div>
        </nav>
    );
};

export default Navbar;
