import React from 'react';
import content from '../../data/content.json';

interface AboutItem {
    name: string;
    paragraph: string;
}

export const StatsBar: React.FC = () => {
    const { stats } = content;
    const [expanded, setExpanded] = React.useState(false);

    return (
        <section className="py-24 px-4 sm:px-8 md:px-16 bg-transparent">
            <div className="max-w-[90rem] mx-auto">
                {/* Main Integrated Container */}
                <div className="bg-[#151515] rounded-[2.5rem] p-8 md:p-12 space-y-12 shadow-2xl overflow-hidden relative border border-white/5">

                    {/* Aligned Logos & Cards Grid */}
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        {(stats.items as AboutItem[]).map((item, i) => (
                            <div key={i} className="space-y-8 group reveal">
                                {/* Centered Logo Container with Glow */}
                                <div className="relative flex justify-center items-center h-40 group/logo">
                                    {/* Pixelated Orange Glow Effect */}
                                    <div className="absolute inset-0 flex items-center justify-center pointer-events-none overflow-visible">
                                        <div className="grid grid-cols-10 grid-rows-10 gap-1 w-48 h-48 opacity-[0.25] group-hover/logo:opacity-[0.6] transition-all duration-700">
                                            {Array.from({ length: 100 }).map((_, idx) => {
                                                const r = Math.floor(idx / 10);
                                                const c = idx % 10;
                                                const dist = Math.sqrt(Math.pow(r - 4.5, 2) + Math.pow(c - 4.5, 2));
                                                const opacity = Math.max(0, 1 - dist / 5);
                                                return (
                                                    <div
                                                        key={idx}
                                                        className="w-full h-full rounded-[1px] transition-all duration-500 group-hover/logo:scale-110"
                                                        style={{
                                                            backgroundColor: '#E3B23C',
                                                            opacity: opacity
                                                        }}
                                                    />
                                                );
                                            })}
                                        </div>
                                    </div>

                                    <img
                                        src={stats.logos[i]}
                                        alt={`${item.name} logo`}
                                        className="h-32 w-auto relative z-10 opacity-100 transition-all duration-500 group-hover/logo:scale-110 brightness-0 invert"
                                    />
                                </div>

                                {/* Card Container */}
                                <div
                                    className="bg-[#1A1A1A] p-10 md:p-12 rounded-[2.5rem] relative overflow-hidden flex flex-col justify-start min-h-[300px] shadow-lg hover:shadow-2xl transition-all duration-500 hover:-translate-y-2 border border-white/5 hover:border-orange/20"
                                >
                                    <div className="gloss-sheen"></div>
                                    {/* Top Right Dot - Branded */}
                                    <div className="absolute top-10 right-10 w-2.5 h-2.5 bg-orange rounded-full shadow-[0_0_15px_rgba(227,178,60,0.4)]"></div>

                                    <div className="space-y-6">
                                        <h3 className="text-4xl font-bold tracking-tighter text-white group-hover:text-orange transition-colors">
                                            {item.name}
                                        </h3>
                                        <p className={`text-[14px] font-medium text-white/60 leading-relaxed ${expanded ? 'line-clamp-none' : 'line-clamp-3'}`}>
                                            {item.paragraph}
                                        </p>
                                        <button onClick={() => setExpanded(!expanded)} className="text-orange underline">
                                            {expanded ? 'Read Less' : 'Read More'}
                                        </button>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
};
