import React, { useState, useEffect } from 'react';
import { MdCode, MdTimer, MdSchool, MdClose } from 'react-icons/md';
import content from '../../data/content.json';

const iconMap: { [key: string]: React.ElementType } = {
    MdCode: MdCode,
    MdTimer: MdTimer,
    MdSchool: MdSchool
};

interface ProblemStatement {
    title: string;
    shortDescription: string;
    fullDescription: string;
    driveLink?: string;
}

interface TechEventDetail {
    image: string;
    title: string;
    description: string;
    problemStatements?: ProblemStatement[];
}

interface TechEventItem {
    title: string;
    description: string;
    icon: string;
    image?: string;
    modalDetails?: TechEventDetail[];
}

export const TechEvents: React.FC = () => {
    const { techEvents } = content;
    const [selectedEvent, setSelectedEvent] = useState<TechEventItem | null>(null);
    const [showPSModal, setShowPSModal] = useState(false);
    const [activePS, setActivePS] = useState<ProblemStatement[]>([]);

    const handleCardClick = (item: TechEventItem) => {
        if (item.modalDetails && item.modalDetails.length > 0) {
            setSelectedEvent(item);
        }
    };

    const closeModal = () => {
        setSelectedEvent(null);
    };

    const isSingleItem = selectedEvent?.modalDetails?.length === 1;

    useEffect(() => {
        if (selectedEvent || showPSModal) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = 'unset';
        }
        return () => {
            document.body.style.overflow = 'unset';
        };
    }, [selectedEvent, showPSModal]);

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
                                className={`group relative bg-[#1A1A1A] rounded-[2rem] overflow-hidden flex flex-col items-center justify-end text-center p-8 h-[400px] shadow-lg shadow-black/20 hover:shadow-orange/10 transition-all duration-500 hover:scale-[1.03] border border-white/5 hover:border-orange/20 reveal cursor-pointer`}
                            >
                                {/* Background Image with Overlay */}
                                <div className="absolute inset-0 z-0">
                                    <img
                                        src={item.image}
                                        alt={item.title}
                                        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110 opacity-60 group-hover:opacity-40"
                                    />
                                    <div className="absolute inset-0 bg-gradient-to-t from-black via-black/80 to-transparent"></div>
                                </div>

                                <div className="gloss-sheen"></div>

                                {/* Content */}
                                <div className="relative z-10 space-y-4 flex flex-col items-center">
                                    {/* Icon Container */}
                                    <div className="w-16 h-16 rounded-2xl bg-orange/20 backdrop-blur-md flex items-center justify-center text-orange group-hover:bg-orange group-hover:text-white transition-all duration-500 border border-white/10">
                                        <Icon className="text-3xl" />
                                    </div>

                                    <h3 className="text-2xl font-bold text-white group-hover:text-orange transition-colors">
                                        {item.title}
                                    </h3>
                                    <p className="text-white/70 font-medium leading-relaxed max-w-xs">
                                        {item.description}
                                    </p>
                                </div>

                                {/* Hover Indicator */}
                                <div className="absolute top-6 right-6 w-2 h-2 rounded-full bg-white/20 group-hover:bg-orange transition-all duration-500 delay-100 z-10" />
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
                        className={`relative bg-[#111] backdrop-blur-3xl border border-white/10 shadow-[0_8px_32px_0_rgba(0,0,0,0.5)] rounded-[2rem] md:rounded-[2.5rem] w-full overflow-hidden animate-in fade-in zoom-in-95 duration-300 p-6 md:p-12 ${isSingleItem ? 'max-w-4xl' : 'max-w-6xl'} max-h-[90vh] overflow-y-auto custom-scrollbar overscroll-contain`}
                        data-lenis-prevent
                    >
                        <div className="gloss-sheen"></div>
                        {/* Close Button */}
                        <button
                            onClick={closeModal}
                            className="absolute top-4 right-4 md:top-6 md:right-6 p-2 rounded-full bg-white/5 hover:bg-orange hover:text-black transition-all duration-300 z-50 backdrop-blur-md border border-white/10"
                        >
                            <MdClose className="text-xl md:text-2xl" />
                        </button>

                        <div className="space-y-6 md:space-y-8 relative z-10">
                            <div className="text-center space-y-2">
                                <h3 className="text-2xl md:text-4xl font-cabinet font-bold text-white uppercase tracking-tight">
                                    {selectedEvent.title} <span className="text-orange">Details</span>
                                </h3>
                                <p className="text-sm md:text-base text-white/40">Explore the sub-events happening under this category</p>
                            </div>

                            {/* Dynamic Layout Based on Item Count */}
                            {isSingleItem ? (
                                // Single Item Layout (Hackathon) - Full Width Card
                                <div className="w-full">
                                    {selectedEvent.modalDetails?.map((detail, idx) => (
                                        <div
                                            key={idx}
                                            className="group/card relative bg-white/5 backdrop-blur-lg rounded-[1.5rem] md:rounded-[2rem] overflow-hidden shadow-sm hover:shadow-xl transition-all duration-500 border border-white/10 hover:border-orange/20 flex flex-col md:flex-row h-full min-h-[auto] md:min-h-[400px] hover:scale-[1.01]"
                                        >
                                            <div className="gloss-sheen"></div>
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
                                                <h4 className="text-2xl md:text-3xl font-bold text-white group-hover/card:text-orange transition-colors">
                                                    {detail.title}
                                                </h4>
                                                <p className="text-sm md:text-lg text-white/70 leading-relaxed font-medium">
                                                    {detail.description}
                                                </p>
                                                <div className="flex flex-wrap gap-4">
                                                    <button
                                                        onClick={() => window.open(content.hero.ctaLink, '_blank')}
                                                        className="px-6 md:px-8 py-2 md:py-3 bg-orange text-white rounded-full font-bold shadow-lg shadow-orange/20 hover:scale-105 transition-transform text-sm md:text-base"
                                                    >
                                                        Register Now
                                                    </button>
                                                    {detail.problemStatements && (
                                                        <button
                                                            onClick={() => {
                                                                setActivePS(detail.problemStatements || []);
                                                                setShowPSModal(true);
                                                            }}
                                                            className="px-6 md:px-8 py-2 md:py-3 bg-white/10 text-white border border-white/20 rounded-full font-bold hover:bg-white/20 hover:scale-105 transition-all text-sm md:text-base"
                                                        >
                                                            Problem Statements
                                                        </button>
                                                    )}
                                                </div>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            ) : (
                                // Grid Layout (Tech Events / Workshops)
                                <div className={`grid gap-4 md:gap-6 ${selectedEvent.modalDetails?.length === 2 ? 'grid-cols-1 md:grid-cols-2' : 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4'}`}>
                                    {selectedEvent.modalDetails?.map((detail, idx) => (
                                        <div key={idx} className="group/card relative bg-white/5 backdrop-blur-md rounded-[1.5rem] overflow-hidden shadow-sm hover:shadow-xl transition-all duration-500 border border-white/10 hover:border-orange/30">
                                            <div className="gloss-sheen"></div>
                                            <div className="h-40 md:h-48 overflow-hidden">
                                                <img
                                                    src={detail.image}
                                                    alt={detail.title}
                                                    className="w-full h-full object-cover transition-transform duration-700 group-hover/card:scale-110"
                                                />
                                            </div>
                                            <div className="p-4 md:p-6 space-y-2 md:space-y-3 relative z-10">
                                                <h4 className="text-lg md:text-xl font-cabinet font-bold text-white group-hover/card:text-orange transition-colors">
                                                    {detail.title}
                                                </h4>
                                                <p className="text-sm md:text-base text-white/60 leading-relaxed">
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

            {/* Problem Statements Modal */}
            {showPSModal && (
                <div className="fixed inset-0 z-[60] flex items-center justify-center p-4">
                    {/* Backdrop */}
                    <div
                        className="absolute inset-0 bg-black/80 backdrop-blur-xl transition-opacity duration-300"
                        onClick={() => setShowPSModal(false)}
                    />

                    {/* Modal Content */}
                    <div className="relative bg-[#111] border border-white/10 shadow-2xl rounded-[2rem] w-full max-w-3xl overflow-hidden animate-in fade-in zoom-in-95 duration-300 flex flex-col max-h-[85vh]">
                        <div className="gloss-sheen"></div>

                        {/* Header */}
                        <div className="p-8 border-b border-white/5 flex items-center justify-between sticky top-0 z-10 bg-[#111]/80 backdrop-blur-md">
                            <div>
                                <h3 className="text-2xl md:text-3xl font-cabinet font-bold text-white uppercase tracking-tight">
                                    Problem <span className="text-orange">Statements</span>
                                </h3>
                                <p className="text-sm text-white/40 mt-1">Select a challenge and build the future</p>
                            </div>
                            <button
                                onClick={() => setShowPSModal(false)}
                                className="p-2 rounded-full bg-white/5 hover:bg-orange hover:text-black transition-all duration-300"
                            >
                                <MdClose className="text-2xl" />
                            </button>
                        </div>

                        {/* Content */}
                        <div
                            className="p-8 overflow-y-auto custom-scrollbar space-y-6 overscroll-contain"
                            data-lenis-prevent
                        >
                            {activePS.map((ps, idx) => (
                                <div
                                    key={idx}
                                    className="group/ps p-6 rounded-2xl bg-white/5 border border-white/10 hover:border-orange/30 transition-all duration-300"
                                >
                                    <div className="flex items-start gap-4">
                                        <div className="w-10 h-10 rounded-xl bg-orange/10 flex items-center justify-center text-orange font-bold text-lg group-hover/ps:bg-orange group-hover/ps:text-white transition-all shrink-0">
                                            {idx + 1}
                                        </div>
                                        <div className="space-y-3 flex-grow">
                                            <h4 className="text-xl font-bold text-white group-hover/ps:text-orange transition-colors">
                                                {ps.title}
                                            </h4>
                                            <p className="text-white/60 leading-relaxed text-sm">
                                                {ps.shortDescription}
                                            </p>
                                            <a
                                                href={ps.driveLink || "#"}
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                className="inline-block px-6 py-2 bg-orange text-white rounded-full font-bold hover:scale-105 transition-transform text-sm uppercase tracking-wider shadow-lg shadow-orange/20"
                                            >
                                                View Details
                                            </a>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>

                        {/* Footer */}
                        <div className="p-6 border-t border-white/5 bg-white/[0.02] text-center">
                            <button
                                onClick={() => setShowPSModal(false)}
                                className="px-8 py-3 bg-orange text-white rounded-full font-bold hover:scale-105 transition-transform"
                            >
                                Close View
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </section>
    );
};
