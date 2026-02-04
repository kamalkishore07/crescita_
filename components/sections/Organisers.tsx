import React from 'react';
import { MdVerified } from 'react-icons/md';
import content from '../../data/content.json';

export const Organisers: React.FC = () => {
    const { organisers } = content;

    const images = [
        "C:/Users/spicez/.gemini/antigravity/brain/b39e97c8-6824-4992-9ae0-545c3be71f52/organizer_aditya_sharma_1769250428511.png",
        "C:/Users/spicez/.gemini/antigravity/brain/b39e97c8-6824-4992-9ae0-545c3be71f52/organizer_priya_patel_1769250445599.png",
        "C:/Users/spicez/.gemini/antigravity/brain/b39e97c8-6824-4992-9ae0-545c3be71f52/organizer_rahul_verma_1769250461478.png",
        "C:/Users/spicez/.gemini/antigravity/brain/b39e97c8-6824-4992-9ae0-545c3be71f52/organizer_sneha_gupta_1769250475813.png",
        "C:/Users/spicez/.gemini/antigravity/brain/b39e97c8-6824-4992-9ae0-545c3be71f52/organizer_karthik_raja_1769250489564.png",
        "C:/Users/spicez/.gemini/antigravity/brain/b39e97c8-6824-4992-9ae0-545c3be71f52/organizer_deepa_nair_1_1769250507092.png"
    ];

    return (
        <section id="organisers" className="pt-32 pb-48 px-4 sm:px-8 md:px-16 bg-transparent">
            <div className="max-w-6xl mx-auto">
                {/* Compact Header */}
                <div className="flex flex-col items-center text-center space-y-3 mb-20">
                    <span className="text-orange font-bold text-[9px] tracking-[0.4em] uppercase reveal-text">The Visionaries</span>
                    <h2 className="text-white text-4xl md:text-6xl font-cabinet font-bold tracking-tight uppercase leading-[0.85] reveal-text">
                        Built By <span className="text-orange">Builders</span> For <span className="text-orange">Builders</span>
                    </h2>
                </div>

                {/* Modular Profile Grid - Compacted */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
                    {organisers.members.map((member, i) => (
                        <div
                            key={i}
                            className="bg-[#111] rounded-[2.8rem] overflow-hidden border border-white/5 p-3 shadow-lg shadow-black/20 transition-all duration-500 hover:shadow-xl hover:shadow-orange/5 hover:border-orange/20 group reveal"
                        >
                            <div className="gloss-sheen"></div>
                            {/* Portrait Image Container - Compacted Height */}
                            <div className="relative h-[260px] w-full overflow-hidden rounded-[2.2rem]">
                                <img
                                    src={images[i]}
                                    alt={member.name}
                                    className="w-full h-full object-cover grayscale-[0.3] transition-all duration-700 group-hover:grayscale-0 group-hover:scale-110"
                                />
                                <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent opacity-40"></div>
                            </div>

                            {/* Card Content - Streamlined */}
                            <div className="px-5 py-8 space-y-5 text-left">
                                <div className="flex items-center gap-2">
                                    <h3 className="text-xl font-bold tracking-tight text-white leading-tight">
                                        {member.name}
                                    </h3>
                                    <MdVerified className="text-[#00BA34] text-2xl" />
                                </div>

                                <p className="text-white/60 text-[14px] font-medium leading-relaxed line-clamp-2">
                                    {member.role}
                                </p>

                                {/* Bottom Action - Modular & Compact */}
                                <div className="pt-6 border-t border-white/5">
                                    <button className="w-full bg-white/5 text-white text-[14px] font-bold py-4 rounded-full shadow-sm hover:bg-orange transition-all duration-300">
                                        For Contact - {member.phone}
                                    </button>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};
