import React, { useState } from 'react';
import { MdCode, MdTimer, MdSchool, MdClose } from 'react-icons/md';
import content from '../../data/content.json';

const iconMap: { [key: string]: React.ElementType } = {
    MdCode: MdCode,
    MdTimer: MdTimer,
    MdSchool: MdSchool
};

interface TechEventDetail {
    image: string;
    title: string;
    description: string;
}

interface TechEventItem {
    title: string;
    description: string;
    icon: string;
    modalDetails?: TechEventDetail[];
}

export const TechEvents: React.FC = () => {
    const { techEvents } = content;
    const [selectedEvent, setSelectedEvent] = useState<TechEventItem | null>(null);

    const handleCardClick = (item: TechEventItem) => {
        if (item.modalDetails && item.modalDetails.length > 0) {
            setSelectedEvent(item);
        }
    };

    const closeModal = () => {
        setSelectedEvent(null);
    };

    const isSingleItem = selectedEvent?.modalDetails?.length === 1;

    return (
        <section className="py-24 px-4 sm:px-8 md:px-16 bg-transparent">
            <div className="max-w-6xl mx-auto space-y-16">
                {/* Section Header */}
                <div className="text-center space-y-4 reveal">
                    <span className="text-orange font-bold text-[10px] tracking-[0.4em] uppercase">
                        {techEvents.title}
                    </span>
                    <h2 className="text-4xl md:text-5xl font-cabinet font-bold text-white uppercase tracking-tight">
                        Explore <span className="text-orange">Opportunities</span>
                    </h2>
                    <p className="max-w-2xl mx-auto text-white/60 text-lg font-medium">
                        {techEvents.description}
                    </p>
                </div>

                {/* Cards Grid */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    {(techEvents.items as TechEventItem[]).map((item, i) => {
                        const Icon = iconMap[item.icon] || MdCode;

                        return (
                            <div
                                key={i}
                                onClick={() => handleCardClick(item)}
                                className={`bg-[#111] p-8 rounded-[2rem] relative overflow-hidden flex flex-col items-center text-center space-y-6 shadow-lg shadow-black/20 hover:shadow-orange/10 transition-all duration-500 hover:-translate-y-2 border border-white/5 hover:border-orange/20 group reveal ${item.modalDetails ? 'cursor-pointer' : ''}`}
                            >
                                <div className="gloss-sheen"></div>
                                {/* Icon Container */}
                                <div className="w-20 h-20 rounded-2xl bg-orange/10 flex items-center justify-center text-orange group-hover:bg-orange group-hover:text-white transition-all duration-500">
                                    <Icon className="text-4xl" />
                                </div>

                                <div className="space-y-3">
                                    <h3 className="text-2xl font-bold text-white">
                                        {item.title}
                                    </h3>
                                    <p className="text-white/50 font-medium leading-relaxed">
                                        {item.description}
                                    </p>
                                </div>

                                {/* Hover Indicator */}
                                <div className="absolute top-6 right-6 w-2 h-2 rounded-full bg-orange/0 group-hover:bg-orange transition-all duration-500 delay-100" />
                            </div>
                        );
                    })}
                </div>
            </div>

            {/* Modal Overlay */}
            {selectedEvent && (
                <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
                    {/* Backdrop with Blur */}
                    <div
                        className="absolute inset-0 bg-black/60 backdrop-blur-md transition-opacity duration-300"
                        onClick={closeModal}
                    />

                    {/* Modal Content - Glossy Liquid Glass Effect (Dark) */}
                    <div
                        className={`relative bg-gradient-to-br from-[#111]/90 via-[#111]/70 to-[#111]/50 backdrop-blur-3xl border border-white/10 shadow-[0_8px_32px_0_rgba(0,0,0,0.5)] rounded-[2rem] md:rounded-[2.5rem] w-full overflow-hidden animate-in fade-in zoom-in-95 duration-300 p-6 md:p-12 ${isSingleItem ? 'max-w-4xl' : 'max-w-6xl'}`}
                    >
                        {/* Close Button */}
                        <button
                            onClick={closeModal}
                            className="absolute top-4 right-4 md:top-6 md:right-6 p-2 rounded-full bg-white/20 hover:bg-orange hover:text-white transition-colors duration-300 z-10 backdrop-blur-md border border-white/30"
                        >
                            <MdClose className="text-xl md:text-2xl" />
                        </button>

                        <div className="space-y-6 md:space-y-8">
                            <div className="text-center space-y-2">
                                <h3 className="text-2xl md:text-4xl font-cabinet font-bold text-[#222222] uppercase tracking-tight">
                                    {selectedEvent.title} <span className="text-orange">Details</span>
                                </h3>
                                <p className="text-sm md:text-base text-dark-text/60">Explore the sub-events happening under this category</p>
                            </div>

                            {/* Dynamic Layout Based on Item Count */}
                            {isSingleItem ? (
                                // Single Item Layout (Hackathon) - Full Width Card
                                <div className="w-full">
                                    {selectedEvent.modalDetails?.map((detail, idx) => (
                                        <div
                                            key={idx}
                                            className="group/card relative bg-white/50 backdrop-blur-lg rounded-[1.5rem] md:rounded-[2rem] overflow-hidden shadow-sm hover:shadow-xl transition-all duration-500 border border-white/50 hover:border-orange/30 flex flex-col md:flex-row h-full min-h-[auto] md:min-h-[400px]"
                                        >
                                            {/* Large Image Area */}
                                            <div className="w-full md:w-1/2 h-48 md:h-auto overflow-hidden">
                                                <img
                                                    src={detail.image}
                                                    alt={detail.title}
                                                    className="w-full h-full object-cover transition-transform duration-700 group-hover/card:scale-110"
                                                />
                                            </div>
                                            {/* Content Area */}
                                            <div className="w-full md:w-1/2 p-6 md:p-12 flex flex-col justify-center space-y-4 md:space-y-6">
                                                <h4 className="text-2xl md:text-3xl font-bold text-[#222222] group-hover/card:text-orange transition-colors">
                                                    {detail.title}
                                                </h4>
                                                <p className="text-sm md:text-lg text-dark-text/70 leading-relaxed font-medium">
                                                    {detail.description}
                                                </p>
                                                <button className="self-start px-6 md:px-8 py-2 md:py-3 bg-orange text-white rounded-full font-bold shadow-lg shadow-orange/20 hover:scale-105 transition-transform text-sm md:text-base">
                                                    Register Now
                                                </button>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            ) : (
                                // Grid Layout (Tech Events / Workshops)
                                <div className={`grid gap-4 md:gap-6 ${selectedEvent.modalDetails?.length === 2 ? 'grid-cols-1 md:grid-cols-2' : 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4'}`}>
                                    {selectedEvent.modalDetails?.map((detail, idx) => (
                                        <div key={idx} className="group/card relative bg-white/60 backdrop-blur-md rounded-[1.5rem] overflow-hidden shadow-sm hover:shadow-xl transition-all duration-500 border border-white/60 hover:border-orange/30">
                                            <div className="h-40 md:h-48 overflow-hidden">
                                                <img
                                                    src={detail.image}
                                                    alt={detail.title}
                                                    className="w-full h-full object-cover transition-transform duration-700 group-hover/card:scale-110"
                                                />
                                            </div>
                                            <div className="p-4 md:p-6 space-y-2 md:space-y-3">
                                                <h4 className="text-lg md:text-xl font-bold text-[#222222] group-hover/card:text-orange transition-colors">
                                                    {detail.title}
                                                </h4>
                                                <p className="text-sm md:text-base text-dark-text/70 leading-relaxed">
                                                    {detail.description}
                                                </p>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            )}
        </section>
    );
};
