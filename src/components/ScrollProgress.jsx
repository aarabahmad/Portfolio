import React, { useEffect, useState } from 'react';
import './ScrollProgress.css';

const ScrollProgress = () => {
    const [scrollPercentage, setScrollPercentage] = useState(0);

    useEffect(() => {
        const handleScroll = () => {
            const windowHeight = window.innerHeight;
            const documentHeight = document.documentElement.scrollHeight;
            const scrollY = window.scrollY;

            const scrollableDistance = documentHeight - windowHeight;
            let percentage = (scrollY / scrollableDistance) * 100;

            // Ensure bounds
            percentage = Math.min(100, Math.max(0, percentage));

            setScrollPercentage(percentage);
        };

        window.addEventListener('scroll', handleScroll, { passive: true });
        // Initialize
        handleScroll();

        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    return (
        <div className="scroll-progress-container">
            <div
                className="scroll-progress-bar"
                style={{ width: `${scrollPercentage}%` }}
            />
        </div>
    );
};

export default ScrollProgress;
