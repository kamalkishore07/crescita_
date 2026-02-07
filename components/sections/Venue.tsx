import React, { useState } from 'react';
import { MdLocationOn, MdCalendarToday, MdAccessTime, MdRestaurant, MdSchool, MdStars, MdCheckCircle } from 'react-icons/md';
import content from '../../data/content.json';

export const Venue: React.FC = () => {
    const { schedule } = content;
    const [activeDay, setActiveDay] = useState(0);

    const getIcon = (type: string) => {
        switch (type.toLowerCase()) {
            case 'food': return <MdRestaurant size={18} />;
            case 'workshop': return <MdSchool size={18} />;
            case 'ceremony': return <MdStars size={18} />;
            default: return <MdAccessTime size={18} />;
        }
    };

    return (
        <section id="venue" className="py-32 px-4 sm:px-8 md:px-16 bg-transparent">
            <div className="max-w-7xl mx-auto">
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-20 items-start">

                    {/* Left: Venue Sidebar - Refined & Compact */}
                    <div className="lg:col-span-4 space-y-12 lg:sticky lg:top-32">
                        <div className="space-y-4">
                            <span className="text-orange font-bold text-[10px] tracking-[0.4em] uppercase reveal-text">The Destination</span>
                            <h2 className="text-white text-5xl md:text-7xl font-cabinet font-bold tracking-tight uppercase leading-[0.85] reveal-text">
                                <span className="text-orange">Venue</span> & <br /><span className="text-orange">Timeline</span>
                            </h2>
                            <div className="w-12 h-1 bg-orange/20 rounded-full mt-6 reveal"></div>
                        </div>

                        <div className="group bg-[#111] border border-white/5 rounded-[3rem] p-10 shadow-2xl space-y-10 reveal relative overflow-hidden transition-all duration-500 hover:scale-[1.03]">
                            <div className="gloss-sheen"></div>
                            <div className="space-y-4">
                                <div className="flex items-center gap-2 text-orange font-bold text-[10px] tracking-widest uppercase">
                                    <MdLocationOn size={16} /> Campus Location
                                </div>
                                <h3 className="text-2xl font-bold tracking-tight text-white">Kongu Engineering College, Erode</h3>
                                <p className="text-white/60 text-sm font-medium leading-relaxed">
                                    156 ,5theru, Nadar Colony, Rs Road, near Kongu College Road, Erode, Vidya Nagar East, Tamil Nadu 638060
                                </p>
                            </div>

                            <div className="space-y-4 pt-10 border-t border-white/5">
                                <div className="flex items-center gap-2 text-orange font-bold text-[10px] tracking-widest uppercase">
                                    <MdCalendarToday size={16} /> Mark the dates
                                </div>
                                <h3 className="text-2xl font-bold tracking-tight text-white">March 06 — 07, 2026</h3>
                                <div className="flex items-center gap-2 text-white/40 font-bold text-xs uppercase tracking-widest">
                                    <MdCheckCircle className="text-green-500" /> 30 Hours Continuous
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Right: Premium Schedule Table */}
                    <div className="lg:col-span-8 space-y-10">
                        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 pb-4">
                            <div className="space-y-2">
                                <h3 className="text-3xl font-bold tracking-tight uppercase text-white">Timeline of <span className="text-orange">Innovation</span></h3>
                                <p className="text-white/30 text-[10px] font-bold uppercase tracking-[0.2em]">Select a day to view the agenda</p>
                            </div>

                            {/* Modern Day Tabs */}
                            <div className="flex bg-[#222]/50 backdrop-blur-sm p-1.5 rounded-2xl border border-white/5">
                                {schedule.days.map((day, idx) => (
                                    <button
                                        key={idx}
                                        onClick={() => setActiveDay(idx)}
                                        className={`px-8 py-3 rounded-xl text-[11px] font-bold uppercase tracking-widest transition-all duration-300 border border-transparent ${activeDay === idx
                                            ? 'bg-orange text-black shadow-xl shadow-orange/20 translate-y-[-2px]'
                                            : 'text-white/30 hover:text-orange hover:bg-orange/10 hover:border-orange/20'
                                            }`}
                                    >
                                        {day.day}
                                    </button>
                                ))}
                            </div>
                        </div>

                        <div className="space-y-4 relative">
                            {/* Visual Timeline Line */}
                            <div className="absolute left-[39px] top-10 bottom-10 w-[2px] bg-orange/30 hidden md:block"></div>

                            {schedule.days[activeDay].events.map((item, i) => (
                                <div
                                    key={i}
                                    className="group relative bg-[#111] border border-white/5 rounded-3xl p-6 md:px-10 flex flex-col md:flex-row md:items-center gap-8 transition-all duration-500 hover:shadow-2xl hover:shadow-black/20 hover:scale-[1.02] overflow-hidden"
                                >
                                    <div className="gloss-sheen"></div>
                                    {/* Time Block */}
                                    <div className="md:w-32 flex items-center gap-4 relative z-10">
                                        <div className="w-4 h-4 rounded-full border-4 border-[#0A0A0A] bg-white/10 group-hover:bg-orange group-hover:scale-125 transition-all duration-500 hidden md:block absolute -left-[30px]"></div>
                                        <span className="text-base font-bold text-white tracking-tight group-hover:text-orange transition-colors">{item.time}</span>
                                    </div>

                                    {/* Content Block */}
                                    <div className="flex-1 flex items-center gap-6">
                                        <div className="w-14 h-14 bg-white/5 rounded-2xl flex items-center justify-center text-white/40 group-hover:bg-orange/10 group-hover:text-orange transition-all duration-500">
                                            {getIcon(item.type)}
                                        </div>

                                        <div className="space-y-1">
                                            <h4 className="text-xl font-bold text-white tracking-tight group-hover:text-orange transition-colors">
                                                {item.event}
                                            </h4>
                                            <div className="flex items-center gap-3">
                                                <span className="bg-white/5 text-white/40 text-[9px] font-bold uppercase tracking-widest px-3 py-1 rounded-full group-hover:bg-orange/5 group-hover:text-orange/60 transition-all">
                                                    {item.type}
                                                </span>
                                            </div>
                                        </div>
                                    </div>

                                    {/* Arrow Indicator */}
                                    <div className="hidden md:block opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                                        <div className="w-8 h-8 rounded-full bg-orange/10 flex items-center justify-center text-orange">
                                            <MdStars size={16} />
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>

                </div>
            </div>
        </section>
    );
};
