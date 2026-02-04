import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Button } from '../ui/Button';
import content from '../../data/content.json';

interface NavbarProps {
    onInstructionsClick?: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({ onInstructionsClick }) => {
    const { navbar } = content;
    const [activeSection, setActiveSection] = useState('');

    useEffect(() => {
        const observerOptions = {
            root: null,
            rootMargin: '-40% 0px -40% 0px', // Center-ish of screen
            threshold: 0
        };

        const handleIntersect = (entries: IntersectionObserverEntry[]) => {
            entries.forEach((entry) => {
                if (entry.isIntersecting) {
                    setActiveSection(entry.target.id);
                }
            });
        };

        const observer = new IntersectionObserver(handleIntersect, observerOptions);

        // Targeted sections based on hrefs
        const sections = ['flow', 'prizes', 'sponsors', 'organisers', 'venue'];
        sections.forEach((id) => {
            const el = document.getElementById(id);
            if (el) observer.observe(el);
        });

        // Special case for hero (home)
        const hero = document.querySelector('section'); // Usually first section
        if (hero) observer.observe(hero);

        return () => observer.disconnect();
    }, []);

    // Also handle scroll to top for home
    useEffect(() => {
        const handleScroll = () => {
            if (window.scrollY < 100) {
                setActiveSection('home');
            }
        };
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const isHome = activeSection === '' || activeSection === 'home' || !activeSection;

    return (
        <div className="fixed top-8 left-1/2 -translate-x-1/2 z-50 w-[calc(100%-3rem)] max-w-5xl">
            <motion.nav
                initial={{ y: -20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                className="bg-[#111111]/80 backdrop-blur-2xl border border-white/10 pl-8 pr-3 py-3 rounded-full flex items-center justify-between shadow-2xl relative overflow-hidden group"
            >
                <div className="gloss-sheen"></div>

                <div className="flex items-center gap-12 relative z-10">
                    {/* Logo Area */}
                    <motion.div
                        whileHover={{ scale: 1.05 }}
                        className="flex items-center gap-2 cursor-pointer group/logo"
                        onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
                    >
                        <img src="/Images/Logo/Logo.png" alt="Crescita Logo" className="h-8 w-auto object-contain" />
                        <div className="w-1.5 h-1.5 bg-orange rounded-full shadow-[0_0_10px_rgba(227,178,60,0.8)]"></div>
                    </motion.div>

                    {/* Navigation Links */}
                    <div className="hidden lg:flex items-center gap-1 relative py-1 px-1 bg-white/5 rounded-full border border-white/5">
                        {navbar.links.map((link, i) => {
                            const id = link.href.replace('#', '');
                            const isActive = (id === '' && isHome) || (id !== '' && activeSection === id);

                            return (
                                <a
                                    key={i}
                                    href={link.href}
                                    className={`relative px-6 py-2 text-[10px] font-bold uppercase tracking-[0.2em] transition-all duration-500 rounded-full
                                        ${isActive ? 'text-white' : 'text-white/40 hover:text-white/70'}`}
                                >
                                    {isActive && (
                                        <motion.div
                                            layoutId="nav-pill"
                                            className="absolute inset-0 bg-white/10 border border-white/10 rounded-full shadow-[inset_0_1px_1px_rgba(255,255,255,0.1)]"
                                            transition={{ type: 'spring', bounce: 0.25, duration: 0.6 }}
                                        />
                                    )}
                                    <span className="relative z-10">{link.label}</span>
                                </a>
                            );
                        })}
                    </div>
                </div>

                {/* Right Side Actions */}
                <div className="flex items-center gap-3 relative z-10">
                    <motion.button
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        onClick={onInstructionsClick}
                        className="bg-white/5 px-6 py-3 rounded-full border border-white/10 text-[10px] font-bold uppercase tracking-[0.2em] text-orange hover:bg-orange hover:text-black hover:border-orange transition-all duration-300 relative overflow-hidden group/btn"
                    >
                        <div className="gloss-sheen"></div>
                        <span className="relative z-10">Guidelines</span>
                    </motion.button>

                    <Button variant="cta" className="px-6 py-2.5 text-[10px] uppercase font-bold tracking-[0.2em] shadow-orange/20 hover:scale-105 active:scale-95 transition-transform">
                        {navbar.cta}
                    </Button>
                </div>
            </motion.nav>
        </div>
    );
};
