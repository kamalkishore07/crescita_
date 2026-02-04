import React from 'react';
import content from '../../data/content.json';

export const Sponsors: React.FC = () => {
    const { sponsors } = content;

    const sponsorLogos = [
        "C:/Users/spicez/.gemini/antigravity/brain/b39e97c8-6824-4992-9ae0-545c3be71f52/logo_tech_corp_1769257329908.png",
        "C:/Users/spicez/.gemini/antigravity/brain/b39e97c8-6824-4992-9ae0-545c3be71f52/logo_innovate_systems_1769257344723.png",
        "C:/Users/spicez/.gemini/antigravity/brain/b39e97c8-6824-4992-9ae0-545c3be71f52/logo_future_labs_1769250528511_1769257359561.png",
        "C:/Users/spicez/.gemini/antigravity/brain/b39e97c8-6824-4992-9ae0-545c3be71f52/logo_dev_studio_1769250545599_1769257376432.png",
        "C:/Users/spicez/.gemini/antigravity/brain/b39e97c8-6824-4992-9ae0-545c3be71f52/logo_cloud_native_1769250561478_1769257393328.png",
        "C:/Users/spicez/.gemini/antigravity/brain/b39e97c8-6824-4992-9ae0-545c3be71f52/logo_code_masters_1769250575813_1769257408767.png"
    ];

    return (
        <section id="sponsors" className="py-24 bg-[#0A0A0A] overflow-hidden relative">
            {/* Background Effects */}
            <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px]"></div>
            <div className="absolute top-0 right-0 w-[800px] h-[800px] bg-orange/10 blur-[120px] rounded-full pointer-events-none"></div>
            <div className="absolute bottom-0 left-0 w-[600px] h-[600px] bg-orange/5 blur-[100px] rounded-full pointer-events-none"></div>

            <div className="max-w-7xl mx-auto mb-20 text-center px-4 relative z-10">
                <span className="text-orange font-bold text-[10px] tracking-[0.4em] uppercase mb-4 inline-block reveal-text">Collaborations</span>
                <h2 className="text-white text-5xl md:text-7xl font-cabinet font-bold tracking-tight uppercase leading-[0.85] reveal-text">
                    Powering <span className="text-orange">Innovation</span> With Industry <span className="text-orange">Visionaries</span>
                </h2>
                <div className="w-12 h-1 bg-orange/20 rounded-full mt-8 mx-auto reveal"></div>
            </div>

            {/* Faster Infinite Marquee */}
            <div className="relative flex overflow-x-hidden group">
                <div className="absolute left-0 top-0 bottom-0 w-32 bg-gradient-to-r from-[#0A0A0A] to-transparent z-10"></div>
                <div className="absolute right-0 top-0 bottom-0 w-32 bg-gradient-to-l from-[#0A0A0A] to-transparent z-10"></div>

                <div className="flex animate-marquee whitespace-nowrap py-10">
                    {[...sponsors.partners, ...sponsors.partners].map((sponsor, i) => (
                        <div
                            key={i}
                            className="inline-block w-[280px] md:w-[400px] mx-6 relative"
                        >
                            <div className="bg-[#111] border border-white/5 rounded-3xl p-10 md:p-12 h-[220px] flex flex-col items-center justify-center text-center transition-all duration-300 overflow-hidden relative group/card hover:border-orange/50 hover:shadow-[0_0_40px_rgba(249,115,22,0.15)] hover:-translate-y-1">
                                <div className="gloss-sheen"></div>
                                {/* Logo View */}
                                <div className="group-hover/card:opacity-0 group-hover/card:-translate-y-4 transition-all duration-500 flex items-center justify-center w-full h-full">
                                    <img
                                        src={sponsorLogos[i % sponsorLogos.length]}
                                        alt={sponsor.name}
                                        className="max-w-[180px] md:max-w-[240px] max-h-[100px] object-contain brightness-0 invert opacity-40 group-hover/card:opacity-100 transition-all duration-500"
                                        onError={(e) => {
                                            const target = e.target as HTMLImageElement;
                                            target.style.display = 'none';
                                            target.parentElement!.innerHTML = `<span class="text-2xl font-bold text-white/20 uppercase tracking-widest">${sponsor.name}</span>`;
                                        }}
                                    />
                                </div>

                                {/* About View (on hover) */}
                                <div className="absolute inset-0 p-8 flex flex-col items-center justify-center opacity-0 group-hover/card:opacity-100 transition-all duration-500 translate-y-4 group-hover/card:translate-y-0 text-center bg-[#111]">
                                    <div className="bg-orange/10 text-orange text-[9px] font-bold uppercase tracking-[0.3em] mb-4 px-3 py-1.5 rounded-full border border-orange/20">
                                        {sponsor.tier}
                                    </div>
                                    <h4 className="text-white text-lg font-bold mb-2 leading-none group-hover/card:text-orange transition-colors">{sponsor.name}</h4>
                                    <p className="text-white/40 text-[11px] font-bold uppercase leading-relaxed whitespace-normal max-w-[240px]">
                                        {sponsor.description}
                                    </p>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            <style jsx global>{`
                @keyframes marquee {
                    0% { transform: translateX(0); }
                    100% { transform: translateX(-50%); }
                }
                .animate-marquee {
                    animation: marquee 20s linear infinite;
                    display: flex;
                    width: max-content;
                }
                .group:hover .animate-marquee {
                    animation-play-state: paused;
                }
            `}</style>
        </section>
    );

};


