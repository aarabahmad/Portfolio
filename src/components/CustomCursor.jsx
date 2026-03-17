import React, { useEffect, useState, useRef } from 'react';
import './CustomCursor.css';

const CustomCursor = () => {
    const dotRef = useRef(null);
    const ringRef = useRef(null);

    const [isHovering, setIsHovering] = useState(false);
    const [hidden, setHidden] = useState(false);
    const [clicked, setClicked] = useState(false);

    useEffect(() => {
        const mouseMoveEvent = (e) => {
            const { clientX, clientY } = e;

            // Move dot immediately
            if (dotRef.current) {
                dotRef.current.style.transform = `translate(${clientX}px, ${clientY}px)`;
            }

            // Move ring with a slight delay using requestAnimationFrame
            if (ringRef.current) {
                // simple direct transform for now, can implement spring physics later if needed
                requestAnimationFrame(() => {
                    if (ringRef.current) {
                        ringRef.current.style.transform = `translate(${clientX}px, ${clientY}px)`;
                    }
                });
            }
        };

        const mouseDownEvent = () => setClicked(true);
        const mouseUpEvent = () => setClicked(false);
        const mouseEnterEvent = () => setHidden(false);
        const mouseLeaveEvent = () => setHidden(true);

        const handleHoverElements = () => {
            const hoverables = document.querySelectorAll('a, button, .project-card, input, textarea');
            hoverables.forEach((el) => {
                el.addEventListener('mouseenter', () => setIsHovering(true));
                el.addEventListener('mouseleave', () => setIsHovering(false));
            });
        };

        window.addEventListener('mousemove', mouseMoveEvent);
        window.addEventListener('mousedown', mouseDownEvent);
        window.addEventListener('mouseup', mouseUpEvent);
        window.addEventListener('mouseenter', mouseEnterEvent);
        window.addEventListener('mouseleave', mouseLeaveEvent);

        // Initial setup for hover elements
        handleHoverElements();

        // Mutation observer to handle dynamically added elements (like after route changes if we had them)
        const observer = new MutationObserver(handleHoverElements);
        observer.observe(document.body, { childList: true, subtree: true });

        return () => {
            window.removeEventListener('mousemove', mouseMoveEvent);
            window.removeEventListener('mousedown', mouseDownEvent);
            window.removeEventListener('mouseup', mouseUpEvent);
            window.removeEventListener('mouseenter', mouseEnterEvent);
            window.removeEventListener('mouseleave', mouseLeaveEvent);
            observer.disconnect();
        };
    }, []);

    // Disable custom cursor on touch devices
    if (typeof window !== 'undefined' && window.matchMedia('(pointer: coarse)').matches) {
        return null;
    }

    return (
        <>
            <div
                ref={ringRef}
                className={`cursor-ring ${isHovering ? 'hover' : ''} ${hidden ? 'hidden' : ''} ${clicked ? 'clicked' : ''}`}
            />
            <div
                ref={dotRef}
                className={`cursor-dot ${isHovering ? 'hover' : ''} ${hidden ? 'hidden' : ''}`}
            />
        </>
    );
};

export default CustomCursor;
