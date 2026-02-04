'use client';

import React from 'react';
import content from '../../data/content.json';
import { InstructionsPopup } from '../ui/InstructionsPopup';

const RADIUS = 700;
const CONTAINER_SIZE = 1800;

/**
 * EventFlow Component
 * A cinema-grade orbital journey system with stabilized revolving cards.
 */
export const EventFlow: React.FC = () => {
    const { eventFlow } = content;

    // Helper: Map index to X/Y on a 360-degree circle
    const getPolarPosition = (index: number, total: number) => {
        // Uniform 360-degree distribution
        const angle = (index / total) * (2 * Math.PI);
        return {
            x: Number((Math.cos(angle) * RADIUS).toFixed(3)),
            y: Number((Math.sin(angle) * RADIUS).toFixed(3))
        };
    };

    // Helper: Specific angle position for Anchors
    const getAnglePosition = (degrees: number) => {
        const radians = (degrees * Math.PI) / 180;
        return {
            x: Number((Math.cos(radians) * RADIUS).toFixed(3)),
            y: Number((Math.sin(radians) * RADIUS).toFixed(3))
        };
    };

    const [showInstructions, setShowInstructions] = React.useState(false);
    const [hasShownInstructions, setHasShownInstructions] = React.useState(false);

    // We'll use a ref for the section to detect visibility manually or via simple scroll listener if needed, 
    // but here let's use a simple intersection observer effect since we want it once.
    React.useEffect(() => {
        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting && !hasShownInstructions) {
                    setShowInstructions(true);
                    setHasShownInstructions(true);
                }
            },
            { threshold: 0.3 } // Trigger when 30% visible
        );

        const section = document.getElementById('flow');
        if (section) observer.observe(section);

        return () => observer.disconnect();
    }, [hasShownInstructions]);

    return (
        <>
            <InstructionsPopup
                isOpen={showInstructions}
                onClose={() => setShowInstructions(false)}
            />
            <section id="flow" className="py-24 px-4 sm:px-8 md:px-16 overflow-hidden bg-transparent relative h-[1200px]">
                {/* 1. Heading Layer */}
                <div className="max-w-[100rem] mx-auto relative z-30 text-center flex flex-col items-center pt-8 pointer-events-none">
                    <h2 className="text-5xl md:text-8xl font-cabinet font-bold tracking-tight text-white leading-[0.9] uppercase reveal-text">
                        At <span className="text-orange">Cresciton</span>, We Believe <span className="text-orange">Crescitons</span> Should Be <span className="text-orange">More Than</span>
                    </h2>
                    <div className="mt-8 px-8 py-3 bg-white/5 backdrop-blur-md rounded-full border border-white/10 reveal">
                        <span className="apple-reveal-text font-bold text-sm tracking-[0.3em] uppercase italic italic">
                            {eventFlow.highlight}
                        </span>
                    </div>
                </div>

                {/* 2. Orbital System Viewport */}
                <div
                    className="absolute left-1/2 -translate-x-1/2 w-[1800px] h-[1800px] pointer-events-none"
                    style={{ top: '350px' }}
                >
                    <div className="relative w-full h-full flex items-center justify-center">

                        {/* Layer 2a: Static Guide Arcs (Visible rail) */}
                        <div className="absolute w-[1400px] h-[1400px] rounded-full border-[2px] border-white/[0.04]"></div>
                        <div className="absolute w-[1400px] h-[1400px] rounded-full border border-white/[0.02] border-dashed scale-[1.05]"></div>

                        {/* Layer 2b: Dynamic Revolving Assembly */}
                        <div className="absolute w-full h-full flex items-center justify-center animate-orbit-ccw">
                            {eventFlow.tags.map((tag, i) => {
                                const { x, y } = getPolarPosition(i, eventFlow.tags.length);
                                return (
                                    <div
                                        key={i}
                                        className="absolute"
                                        style={{
                                            transform: `translate(${x}px, ${y}px)`
                                        }}
                                    >
                                        {/* Phase Card - Counter-rotating to stay leveled */}
                                        <div
                                            className="w-64 h-64 md:w-72 md:h-72 rounded-full bg-[#111] border border-white/10 shadow-2xl p-12 flex flex-col items-center justify-center text-center group hover:scale-110 hover:shadow-orange/20 hover:border-orange/20 pointer-events-auto transition-all duration-700 cursor-default animate-orbit-cw relative overflow-hidden"
                                        >
                                            <div className="gloss-sheen"></div>
                                            {/* Background Texture */}
                                            <div
                                                className="absolute inset-0 opacity-40 transition-opacity duration-500 group-hover:opacity-60"
                                                style={{
                                                    backgroundImage: 'url(/Marble/Marble.png)',
                                                    backgroundSize: 'cover',
                                                    backgroundPosition: 'center',
                                                    filter: 'invert(1) grayscale(1)'
                                                }}
                                            />

                                            {/* Interior Ornament */}
                                            <div className="absolute inset-2 rounded-full border-2 border-orange/10 border-dashed animate-spin-slow group-hover:border-orange/40 transition-colors z-10"></div>

                                            <div className="relative z-20 flex flex-col items-center">
                                                <span className="text-[11px] font-bold text-orange tracking-[0.4em] mb-4">PHASE 0{i + 1}</span>
                                                <h4 className="text-3xl font-bold tracking-tighter text-white leading-none mb-4 group-hover:text-orange transition-colors duration-500">{tag}</h4>
                                                <div className="w-10 h-[2px] bg-orange/20 rounded-full mb-4"></div>
                                                <p className="text-[10px] font-bold text-white/20 uppercase tracking-[0.3em] leading-relaxed">
                                                    Ideate · Design <br /> Deploy
                                                </p>
                                            </div>

                                            {/* Signature Dot */}
                                            <div className="absolute top-10 right-10 w-2.5 h-2.5 bg-orange rounded-full opacity-0 group-hover:opacity-100 transition-opacity shadow-[0_0_10px_rgba(227,178,60,0.5)]"></div>
                                        </div>
                                    </div>
                                );
                            })}
                        </div>

                        {/* Layer 2c: Static Structural Anchors */}
                        <div className="absolute w-full h-full flex items-center justify-center">
                            {[
                                { pos: getAnglePosition(145), label: eventFlow.sideLabels[0], num: '00' },
                                { pos: getAnglePosition(395), label: eventFlow.sideLabels[1], num: '07' }
                            ].map((anchor, i) => (
                                <div
                                    key={i}
                                    className="absolute w-56 h-56 rounded-full bg-white/5 backdrop-blur-xl border border-orange/20 flex flex-col items-center justify-center text-white/10"
                                    style={{
                                        transform: `translate(${anchor.pos.x}px, ${anchor.pos.y}px)`
                                    }}
                                >
                                    <span className="text-[2.5rem] font-bold">{anchor.num}</span>
                                    <span className="text-[9px] font-bold uppercase tracking-[0.5em] mt-2">{anchor.label}</span>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>

                {/* 3. Bottom Gradient Mask (The "Semi-circle" focal reveal) */}
                <div className="absolute bottom-0 left-0 w-full h-[500px] bg-gradient-to-t from-[#0A0A0A] via-[#0A0A0A]/90 to-transparent z-20 pointer-events-none"></div>

                {/* 4. Legend Text */}
                <div className="absolute bottom-12 left-1/2 -translate-x-1/2 z-30 opacity-20 hidden md:block">
                    <p className="text-[9px] font-bold uppercase tracking-[0.6em] text-white">A 30-Hour Continuous Cycle of Innovation</p>
                </div>

                <style jsx global>{`
                @keyframes orbit-cw {
                    from { transform: rotate(0deg); }
                    to { transform: rotate(360deg); }
                }
                @keyframes orbit-ccw {
                    from { transform: rotate(0deg); }
                    to { transform: rotate(-360deg); }
                }
                @keyframes spin-slow {
                    from { transform: rotate(0deg); }
                    to { transform: rotate(360deg); }
                }
                .animate-orbit-cw {
                    animation: orbit-cw 40s linear infinite;
                }
                .animate-orbit-ccw {
                    animation: orbit-ccw 40s linear infinite;
                }
                .animate-spin-slow {
                    animation: spin-slow 20s linear infinite;
                }
                /* Interactive Pause */
                .animate-orbit-ccw:hover,
                .animate-orbit-ccw:hover .animate-orbit-cw {
                    animation-play-state: paused;
                }
            `}</style>
            </section>
        </>
    );
};