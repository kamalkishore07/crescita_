import React from 'react';
import { Button } from '../ui/Button';
import content from '../../data/content.json';

export const Navbar: React.FC = () => {
    const { navbar } = content;
    return (
        <div className="fixed top-8 left-1/2 -translate-x-1/2 z-50 w-[calc(100%-3rem)] max-w-4xl">
            <nav className="bg-[#111111]/80 backdrop-blur-xl border border-white/10 pl-8 pr-3 py-3 rounded-full flex items-center justify-between shadow-lg shadow-black/10">
                <div className="flex items-center gap-12">
                    <div className="flex items-center gap-2 cursor-pointer group">
                        <img src="/Images/Logo/Logo.png" alt="Crescita Logo" className="h-8 w-auto object-contain brightness-0 invert" />
                        <div className="w-1.5 h-1.5 bg-orange rounded-full shadow-[0_0_10px_rgba(227,178,60,0.5)]"></div>
                    </div>
                    <div className="hidden md:flex items-center gap-8 text-[11px] font-bold uppercase tracking-[0.15em] text-white/50">
                        {navbar.links.map((link, i) => (
                            <a key={i} href={link.href} className="hover:text-orange transition-colors">{link.label}</a>
                        ))}
                    </div>
                </div>
                <Button variant="cta" className="px-10 py-3 text-[11px] uppercase font-bold tracking-[0.2em] shadow-orange/20">
                    {navbar.cta}
                </Button>
            </nav>
        </div>
    );
};
