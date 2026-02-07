'use client';

import React, { useEffect, useState, useRef } from 'react';
import { Button } from '../ui/Button';
import content from '../../data/content.json';

export const Hero: React.FC = () => {
    const [currentIndex, setCurrentIndex] = useState(0);
    const [currentText, setCurrentText] = useState('');
    const [isDeleting, setIsDeleting] = useState(false);
    const [typingSpeed, setTypingSpeed] = useState(150);
    const { hero } = content;
    const containerRef = useRef<HTMLDivElement>(null);
    const [gridSize, setGridSize] = useState({ rows: 20, cols: 40 });
    const [offset, setOffset] = useState(0);

    // Dynamic grid calculation
    useEffect(() => {
        const calculateGrid = () => {
            if (!containerRef.current) return;
            const width = window.innerWidth * 1.5; // Account for the 150% width container
            const height = window.innerHeight;

            // Target pixel size ~40px
            const pixelSize = Math.max(30, Math.min(45, width / 40));

            setGridSize({
                rows: Math.ceil(height / pixelSize) + 5,
                cols: Math.ceil(width / pixelSize) + 5
            });
        };

        calculateGrid();
        window.addEventListener('resize', calculateGrid);
        return () => window.removeEventListener('resize', calculateGrid);
    }, []);

    // Animation Loop
    useEffect(() => {
        let frame: number;
        const animate = () => {
            setOffset((prev) => (prev > gridSize.cols ? -gridSize.cols : prev + 0.6));
            frame = requestAnimationFrame(animate);
        };
        frame = requestAnimationFrame(animate);
        return () => cancelAnimationFrame(frame);
    }, [gridSize.cols]);

    useEffect(() => {
        const handleTyping = () => {
            const fullText = (hero.titles as string[])[currentIndex];

            if (isDeleting) {
                setCurrentText(fullText.substring(0, currentText.length - 1));
                setTypingSpeed(50);
            } else {
                setCurrentText(fullText.substring(0, currentText.length + 1));
                setTypingSpeed(100);
            }

            if (!isDeleting && currentText === fullText) {
                setTimeout(() => setIsDeleting(true), 2000);
            } else if (isDeleting && currentText === '') {
                setIsDeleting(false);
                setCurrentIndex((prev) => (prev + 1) % (hero.titles as string[]).length);
            }
        };

        const timer = setTimeout(handleTyping, typingSpeed);
        return () => clearTimeout(timer);
    }, [currentText, isDeleting, currentIndex, hero.titles, typingSpeed]);

    const isPixelActive = (r: number, c: number, currentOffset: number) => {
        // Flow logic from bottom-left to top-right
        const val = (c - r);
        const center = currentOffset;
        const thickness = gridSize.cols / 4;

        const wave = Math.sin(r * 0.3) * (gridSize.cols / 10);
        return val >= (center + wave) - thickness && val <= (center + wave) + thickness;
    };

    const getOrangeColor = (c: number, r: number) => {
        const mix = (c + r) % 4;
        if (mix === 0) return '#E3B23C';
        if (mix === 1) return '#F4C542';
        if (mix === 2) return '#CE9C2D';
        return '#FFD56B';
    };

    return (
        <>
            <section ref={containerRef} className="relative min-h-screen flex items-center px-8 md:px-24 pt-32 md:pt-40 overflow-hidden bg-transparent">
                {/* 
          Dyanmic Grid-Based Pixel Background 
          - Recalculates rows/cols on window resize or zoom
          - Solid body that scales with viewport
      */}
                <div className="absolute inset-0 pointer-events-none select-none overflow-hidden z-0">
                    {/* Deeper Fade In/Out Overlays - Depths scale with vh for zoom consistency */}
                    <div className="absolute top-0 left-0 w-full h-[35vh] bg-gradient-to-b from-[#0A0A0A] via-[#0A0A0A]/80 to-transparent z-10" />
                    <div className="absolute bottom-0 left-0 w-full h-[25vh] bg-gradient-to-t from-[#0A0A0A] to-transparent z-10" />

                    <div className="flex flex-col w-[150%] ml-[-25%] h-full opacity-80">
                        {Array.from({ length: gridSize.rows }).map((_, r) => (
                            <div key={r} className="flex flex-1 w-full">
                                {Array.from({ length: gridSize.cols }).map((_, c) => {
                                    const active = isPixelActive(r, c, offset);
                                    const color = getOrangeColor(c, r);
                                    return (
                                        <div
                                            key={c}
                                            className="flex-1 h-full"
                                            style={{
                                                backgroundColor: active ? color : 'transparent',
                                                border: active ? `1px solid ${color}` : 'none',
                                                opacity: active ? 1 : 0,
                                                borderRadius: (r + c) % 5 === 0 ? '4px' : '1px'
                                            }}
                                        />
                                    );
                                })}
                            </div>
                        ))}
                    </div>
                </div>

                <div className="relative z-10 max-w-4xl space-y-10 md:-mt-20">
                    <div className="space-y-6">
                        <h1 className="text-[12vw] md:text-[6.8rem] font-cabinet font-bold text-white leading-[0.85] tracking-tighter drop-shadow-sm min-h-[3em] md:min-h-[2.55em]">
                            {currentText.split(' ').map((word, i, arr) => (
                                <React.Fragment key={i}>
                                    <span className={word.toUpperCase().includes('CRESCITA') ? 'text-orange' : ''}>
                                        {word}{i === arr.length - 1 ? <span className="animate-pulse ml-1 opacity-80">|</span> : ' '}
                                    </span>
                                    {(word.toLowerCase() === 'where' || i === 2) && <br className="hidden md:block" />}
                                </React.Fragment>
                            ))}
                        </h1>
                        <p className="text-[4vw] md:text-2xl text-white/60 max-w-2xl font-medium leading-relaxed apple-reveal-text">
                            {hero.description}
                        </p>
                    </div>

                    <div className="flex items-center gap-4 reveal">
                        <Button
                            variant="cta"
                            size="lg"
                            className="px-12 py-5 text-lg shadow-orange/20 hover:shadow-orange/40"
                            onClick={() => window.open(content.hero.ctaLink, '_blank')}
                        >
                            {hero.cta}
                        </Button>
                    </div>
                </div>

                {/* Hero Illustration - Hidden on mobile/tablet to prevent text blocking */}
                <div className="hidden md:block relative bottom-0 right-0 z-20 w-[90%] md:w-[45%] lg:w-[40%] pointer-events-none translate-y-[10%] translate-x-[5%] reveal">
                    <img
                        src="/Illustrations/I1.png"
                        alt="Hero Illustration"
                        className="w-full h-auto object-contain drop-shadow-2xl"
                    />
                </div>
            </section>

            {/* SDG Goals Section */}
            <section className="py-20 md:py-28 px-8 md:px-24 bg-gradient-to-b from-transparent to-black/20">
                <div className="max-w-6xl mx-auto">
                    <div className="text-center mb-16">
                        <h2 className="text-4xl md:text-5xl font-cabinet font-bold text-white mb-4">
                            {content.sdgGoals.title}
                        </h2>
                        <p className="text-lg text-white/60">
                            {content.sdgGoals.description}
                        </p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        {content.sdgGoals.goals.map((goal, index) => (
                            <div
                                key={index}
                                className="flex flex-col items-center text-center p-8 rounded-lg border border-orange/20 hover:border-orange/50 hover:bg-orange/5 transition-all duration-300"
                            >
                                <img
                                    src={goal.logo}
                                    alt={goal.title}
                                    className="w-24 h-24 mb-6 object-contain"
                                />
                                <h3 className="text-xl font-bold text-white mb-3">
                                    {goal.title}
                                </h3>
                                <p className="text-white/70">
                                    {goal.description}
                                </p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>
        </>
    );
};
