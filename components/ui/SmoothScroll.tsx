'use client';

import { useEffect } from 'react';
import Lenis from '@studio-freight/lenis';

export const SmoothScroll = () => {
    useEffect(() => {
        const lenis = new Lenis({
            duration: 1.2,
            easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
            orientation: 'vertical',
            gestureOrientation: 'vertical',
            smoothWheel: true,
        });

        function raf(time: number) {
            lenis.raf(time);
            requestAnimationFrame(raf);
        }

        requestAnimationFrame(raf);

        // Handle anchor links for smooth scrolling
        const handleAnchorClick = (e: MouseEvent) => {
            const target = e.target as HTMLElement;
            const link = target.closest('a');

            if (link && link.hash && link.hash.startsWith('#') && link.origin === window.location.origin) {
                e.preventDefault();
                const targetId = link.hash;
                const targetElement = document.querySelector(targetId);

                if (targetElement) {
                    lenis.scrollTo(targetElement as HTMLElement);
                }
            }
        };

        document.addEventListener('click', handleAnchorClick);

        return () => {
            lenis.destroy();
            document.removeEventListener('click', handleAnchorClick);
        };
    }, []);

    return null;
};
