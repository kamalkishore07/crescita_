import React from 'react';
import { FaGithub, FaXTwitter, FaInstagram } from 'react-icons/fa6';
import { MdEmail, MdPhone, MdArrowForward } from 'react-icons/md';
import { Card } from '../ui/Card';

export const Footer: React.FC = () => {
    return (
        <footer className="pt-20 bg-[#111] border-t-2 border-orange/5 relative overflow-hidden flex flex-col justify-between">
            <div className="absolute top-0 left-0 w-full h-0.5 bg-gradient-to-r from-transparent via-orange/20 to-transparent"></div>

            <div className="max-w-7xl mx-auto w-full px-4 sm:px-8 md:px-16 relative z-10">
                <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-16 font-medium">
                    {/* Column 1: Brand */}
                    <div className="space-y-6">
                        <img src="/Images/Logo/Logo.png" alt="Crescita Logo" className="h-24 w-auto object-contain" />
                        <p className="text-sm text-white/60 leading-relaxed font-bold max-w-xs">
                            The premier Cresciton for the next generation of builders and innovators.
                        </p>
                    </div>

                    {/* Column 2: Navigation */}
                    <div className="space-y-6">
                        <h4 className="font-bold uppercase tracking-[0.2em] text-[10px] text-orange">Navigation</h4>
                        <ul className="space-y-3 text-[11px] font-bold text-white/60 uppercase tracking-widest">
                            <li><a href="#" className="hover:text-orange transition-colors">Home</a></li>
                            <li><a href="#flow" className="hover:text-orange transition-colors">Event Flow</a></li>
                            <li><a href="#sponsors" className="hover:text-orange transition-colors">Sponsors</a></li>
                        </ul>
                    </div>

                    {/* Column 3: Contact */}
                    <div className="space-y-6">
                        <h4 className="font-bold uppercase tracking-[0.2em] text-[10px] text-orange">Contact</h4>
                        <ul className="space-y-3 text-[11px] font-bold text-white/60 uppercase tracking-widest">
                            <li className="flex items-center gap-2">hello@crescita.in</li>
                            <li className="flex items-center gap-2">+91 98765 43210</li>
                        </ul>
                    </div>

                    {/* Column 4: Socials */}
                    <div className="space-y-6">
                        <h4 className="font-bold uppercase tracking-[0.2em] text-[10px] text-orange">Connect</h4>
                        <div className="flex gap-4">
                            {[FaGithub, FaXTwitter, FaInstagram].map((Icon, i) => (
                                <a key={i} href="#" className="w-10 h-10 rounded-full border border-white/10 flex items-center justify-center hover:!bg-[#E3B23C] hover:text-black hover:border-orange transition-all duration-300 text-white/60">
                                    <Icon />
                                </a>
                            ))}
                        </div>
                    </div>
                </div>

                <div className="flex flex-col md:flex-row justify-between items-center gap-4 text-[10px] font-bold text-white/40 uppercase tracking-[0.2em] mb-12">
                    <div className="flex flex-col md:items-start items-center gap-2">
                        <span>&copy; 2026 Cresciton</span>
                        <span className="text-[9px] opacity-80 normal-case tracking-widest">Developed & Maintained by Yuga Bharathi J, Varun Kumar N</span>
                    </div>
                    <div className="flex gap-1 items-center">
                        <span>Made with</span>
                        <span className="text-orange text-lg leading-none">♥</span>
                        <span>in Campus</span>
                    </div>
                </div>
            </div>

            {/* Full Width Bottom Illustration */}
            <div className="w-full relative z-0 mt-auto pt-10">
                {/* Top Fade Mask */}
                <div className="absolute top-0 left-0 w-full h-40 md:h-[400px] bg-gradient-to-b from-[#111] from-20% via-[#111]/80 to-transparent z-10"></div>

                <img
                    src="/Images/Department/Department.webp"
                    alt="Department Illustration"
                    className="w-full h-[320px] md:h-[640px] object-cover object-top opacity-60 translate-y-12"
                />
            </div>
        </footer>
    );
};
