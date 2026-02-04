import React from 'react';
import { MdVerified, MdPhone, MdEmail } from 'react-icons/md';
import { FiUser } from 'react-icons/fi';
import content from '../../data/content.json';

export const Organisers: React.FC = () => {
    const { organisers } = content;

    // Color palette for different roles
    const getColorScheme = (index: number) => {
        const colors = [
            { bg: 'bg-orange/10', border: 'border-orange/20', text: 'text-orange', hover: 'hover:border-orange/40' },
            { bg: 'bg-blue-500/10', border: 'border-blue-500/20', text: 'text-blue-400', hover: 'hover:border-blue-500/40' },
            { bg: 'bg-purple-500/10', border: 'border-purple-500/20', text: 'text-purple-400', hover: 'hover:border-purple-500/40' },
            { bg: 'bg-green-500/10', border: 'border-green-500/20', text: 'text-green-400', hover: 'hover:border-green-500/40' },
            { bg: 'bg-pink-500/10', border: 'border-pink-500/20', text: 'text-pink-400', hover: 'hover:border-pink-500/40' },
            { bg: 'bg-cyan-500/10', border: 'border-cyan-500/20', text: 'text-cyan-400', hover: 'hover:border-cyan-500/40' },
        ];
        return colors[index % colors.length];
    };

    return (
        <section id="organisers" className="pt-32 pb-48 px-4 sm:px-8 md:px-16 bg-transparent">
            <div className="max-w-6xl mx-auto">
                {/* Header */}
                <div className="flex flex-col items-center text-center space-y-3 mb-20">
                    <span className="text-orange font-bold text-[9px] tracking-[0.4em] uppercase reveal-text">The Visionaries</span>
                    <h2 className="text-white text-4xl md:text-6xl font-cabinet font-bold tracking-tight uppercase leading-[0.85] reveal-text">
                        Meet The <span className="text-orange">Organizers</span>
                    </h2>
                    <p className="text-white/50 text-sm max-w-2xl mt-4 reveal-text">
                        Have questions? Reach out to our dedicated team of organizers
                    </p>
                </div>

                {/* Organizers Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {organisers.members.map((member, i) => {
                        const colorScheme = getColorScheme(i);

                        return (
                            <div
                                key={i}
                                className={`relative bg-[#111] rounded-3xl border ${colorScheme.border} ${colorScheme.hover} p-8 transition-all duration-500 hover:scale-[1.02] group reveal overflow-hidden`}
                            >
                                <div className="gloss-sheen"></div>

                                {/* Icon/Avatar */}
                                <div className="relative z-10 mb-6">
                                    <div className={`w-16 h-16 rounded-2xl ${colorScheme.bg} border ${colorScheme.border} flex items-center justify-center transition-all duration-300 group-hover:scale-110`}>
                                        <FiUser className={`w-8 h-8 ${colorScheme.text}`} />
                                    </div>
                                </div>

                                {/* Name & Verification */}
                                <div className="relative z-10 mb-2">
                                    <div className="flex items-center gap-2 mb-1">
                                        <h3 className="text-xl font-bold tracking-tight text-white leading-tight">
                                            {member.name}
                                        </h3>
                                        <MdVerified className="text-[#00BA34] text-xl flex-shrink-0" />
                                    </div>
                                </div>

                                {/* Role */}
                                <p className={`relative z-10 text-sm font-semibold ${colorScheme.text} mb-6 uppercase tracking-wide`}>
                                    {member.role}
                                </p>

                                {/* Contact Info */}
                                <div className="relative z-10 space-y-3">
                                    {/* Phone */}
                                    <a
                                        href={`tel:${member.phone}`}
                                        className="flex items-center gap-3 p-4 bg-white/5 rounded-2xl border border-white/5 hover:bg-white/10 hover:border-white/20 transition-all duration-300 group/phone"
                                    >
                                        <div className={`w-10 h-10 rounded-xl ${colorScheme.bg} border ${colorScheme.border} flex items-center justify-center flex-shrink-0`}>
                                            <MdPhone className={`w-5 h-5 ${colorScheme.text}`} />
                                        </div>
                                        <div className="flex-1 min-w-0">
                                            <p className="text-[10px] uppercase tracking-wider text-white/40 font-bold mb-0.5">Phone</p>
                                            <p className="text-sm font-semibold text-white/90 group-hover/phone:text-white transition-colors">
                                                {member.phone}
                                            </p>
                                        </div>
                                    </a>
                                </div>

                                {/* Decorative gradient */}
                                <div className={`absolute -bottom-20 -right-20 w-40 h-40 ${colorScheme.bg} rounded-full blur-3xl opacity-20 group-hover:opacity-30 transition-opacity duration-500`}></div>
                            </div>
                        );
                    })}
                </div>

                {/* Bottom CTA */}
                <div className="mt-16 text-center reveal-text">
                    <div className="inline-flex items-center gap-2 px-6 py-3 bg-white/5 border border-white/10 rounded-full">
                        <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
                        <p className="text-sm text-white/60">
                            Available for queries during event hours
                        </p>
                    </div>
                </div>
            </div>
        </section>
    );
};
