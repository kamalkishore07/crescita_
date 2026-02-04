import React from 'react';
import { Button } from '../ui/Button';
import content from '../../data/content.json';

export const PrizePool: React.FC = () => {
    const { prizes } = content;

    // Map content to specific podium slots with traditional labels
    const podiumSlots = [
        {
            ...prizes.cards[0],
            rank: '#2',
            h: 'md:h-[320px]',
            color: 'border-[#C0C0C0] shadow-lg shadow-[#C0C0C0]/10', // Silver
            rankColor: 'text-[#9A9A9A]',
            badge: 'Runner Up'
        },
        {
            ...prizes.cards[2],
            rank: '#1',
            h: 'md:h-[400px]',
            color: 'border-[#FFD700] shadow-2xl scale-105 shadow-[#FFD700]/20', // Gold
            rankColor: 'text-[#FFD700]',
            badge: 'Winner'
        },
        {
            ...prizes.cards[1],
            rank: '#3',
            h: 'md:h-[260px]',
            color: 'border-[#CD7F32] shadow-lg shadow-[#CD7F32]/10', // Bronze
            rankColor: 'text-[#A0522D]',
            badge: 'Spl Mention'
        }
    ];

    return (
        <section id="prizes" className="pt-24 pb-32 px-4 sm:px-8 md:px-16 bg-transparent relative overflow-hidden">
            {/* Ambient Orange Glow */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-orange/5 blur-[120px] rounded-full pointer-events-none"></div>

            <div className="max-w-5xl mx-auto relative z-10">

                {/* Clean Header */}
                <div className="flex flex-col items-center text-center space-y-4 mb-72">
                    <span className="text-orange font-bold text-[10px] tracking-[0.4em] uppercase reveal-text">Prize Pool</span>
                    <h2 className="text-white text-5xl md:text-7xl font-cabinet font-bold tracking-tight uppercase leading-[0.85] reveal-text">
                        Transparent <span className="text-orange">Rewards</span> For All <span className="text-orange">Builders</span>
                    </h2>
                </div>

                {/* Literal Podium Layout */}
                <div className="flex flex-col md:flex-row items-end justify-center gap-6">
                    {podiumSlots.map((card, i) => {
                        const isFirst = card.rank === '#1';

                        return (
                            <div
                                key={i}
                                className={`w-full md:w-1/3 flex flex-col group transition-all duration-700
                                ${isFirst ? 'order-2 z-20' : i === 0 ? 'order-1 z-10' : 'order-3 z-0'} relative reveal`}
                            >
                                {isFirst && (
                                    <div className="absolute bottom-[95%] left-1/2 -translate-x-1/2 w-[90%] md:w-[110%] z-30 pointer-events-none mb-[-2rem]">
                                        <img
                                            src="/Illustrations/I2.png"
                                            alt="Winner Illustration"
                                            className="w-full h-auto object-contain drop-shadow-2xl"
                                        />
                                    </div>
                                )}
                                <div className={`w-full flex flex-col items-center justify-center rounded-[2.5rem] bg-[#111] border-2 transition-all duration-500 relative overflow-hidden
                                    ${card.h} ${card.color} h-[250px]
                                    ${!isFirst && 'hover:scale-[1.02]'}`}
                                >
                                    <div className="gloss-sheen"></div>
                                    {/* Rank Indicator */}
                                    <div className={`text-6xl md:text-8xl font-bold italic mb-2 transition-all duration-700 pointer-events-none select-none
                                        ${card.rankColor} opacity-[0.15] group-hover:opacity-100`}>
                                        {card.rank}
                                    </div>

                                    {/* Prize Value */}
                                    <div className="text-center px-6 relative z-10 -mt-6">
                                        <div className="text-3xl md:text-5xl font-bold tracking-tight text-orange leading-none group-hover:scale-110 transition-transform duration-500">
                                            {card.value}
                                        </div>
                                        <div className="text-[12px] font-bold uppercase tracking-[0.3em] text-white mt-4 h-4">
                                            {card.badge}
                                        </div>
                                    </div>

                                    {/* Faded Background Decoration */}
                                    <div className={`absolute -bottom-4 left-0 right-0 text-center text-[3rem] font-bold uppercase italic leading-none whitespace-nowrap transform -rotate-2 select-none pointer-events-none transition-all duration-700
                                        ${isFirst ? 'opacity-[0.04] text-orange' : 'opacity-[0.04] text-white'} group-hover:opacity-0`}>
                                        {card.badge}
                                    </div>
                                </div>
                            </div>
                        );
                    })}
                </div>
            </div>
        </section>
    );
};



