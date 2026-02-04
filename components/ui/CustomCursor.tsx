"use client";

import React, { useEffect, useState, useCallback } from 'react';
import { motion, useSpring, useMotionValue } from 'framer-motion';

export const CustomCursor: React.FC = () => {
    const [isHovering, setIsHovering] = useState(false);
    const [isVisible, setIsVisible] = useState(false);

    // Mouse coordinates
    const mouseX = useMotionValue(-100);
    const mouseY = useMotionValue(-100);

    // Spring physics for smooth trailing
    const springConfig = { damping: 25, stiffness: 250 };
    const trailX = useSpring(mouseX, springConfig);
    const trailY = useSpring(mouseY, springConfig);

    const handleMouseMove = useCallback((e: MouseEvent) => {
        mouseX.set(e.clientX);
        mouseY.set(e.clientY);

        if (!isVisible) setIsVisible(true);
    }, [mouseX, mouseY, isVisible]);

    useEffect(() => {
        const checkHover = (e: MouseEvent) => {
            const target = e.target as HTMLElement;
            const isClickable =
                target.closest('button') ||
                target.closest('a') ||
                target.closest('input') ||
                window.getComputedStyle(target).cursor === 'pointer';

            setIsHovering(!!isClickable);
        };

        window.addEventListener('mousemove', handleMouseMove);
        window.addEventListener('mouseover', checkHover);

        // Hide cursor when leaving window
        const handleMouseLeave = () => setIsVisible(false);
        const handleMouseEnter = () => setIsVisible(true);

        document.body.addEventListener('mouseleave', handleMouseLeave);
        document.body.addEventListener('mouseenter', handleMouseEnter);

        return () => {
            window.removeEventListener('mousemove', handleMouseMove);
            window.removeEventListener('mouseover', checkHover);
            document.body.removeEventListener('mouseleave', handleMouseLeave);
            document.body.removeEventListener('mouseenter', handleMouseEnter);
        };
    }, [handleMouseMove]);

    if (typeof window !== 'undefined' && 'ontouchstart' in window) return null;

    return (
        <>
            <style jsx global>{`
                html, body, * {
                    cursor: none !important;
                }
                @media (max-width: 1024px) {
                    html, body, * {
                        cursor: auto !important;
                    }
                }
            `}</style>

            {/* Main Dot */}
            <motion.div
                className="fixed top-0 left-0 w-2 h-2 bg-orange rounded-full z-[9999] pointer-events-none"
                style={{
                    x: mouseX,
                    y: mouseY,
                    translateX: '-50%',
                    translateY: '-50%',
                    opacity: isVisible ? 1 : 0
                }}
                animate={{
                    scale: isHovering ? 2 : 1,
                }}
                transition={{ type: 'spring', damping: 20, stiffness: 300 }}
            />

            {/* Trailing Ring */}
            <motion.div
                className="fixed top-0 left-0 w-8 h-8 border border-orange/30 rounded-full z-[9998] pointer-events-none bg-orange/5"
                style={{
                    x: trailX,
                    y: trailY,
                    translateX: '-50%',
                    translateY: '-50%',
                    opacity: isVisible ? 1 : 0
                }}
                animate={{
                    scale: isHovering ? 2.5 : 1,
                    backgroundColor: isHovering ? 'rgba(227, 178, 60, 0.15)' : 'rgba(227, 178, 60, 0.05)',
                    borderColor: isHovering ? 'rgba(227, 178, 60, 0.6)' : 'rgba(227, 178, 60, 0.3)',
                }}
            >
                {/* Subtle Glow */}
                <div className="absolute inset-0 rounded-full blur-[8px] bg-orange/10" />
            </motion.div>
        </>
    );
};
