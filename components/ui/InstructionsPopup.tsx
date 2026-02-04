"use client";

import React, { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FiX } from "react-icons/fi";

interface InstructionsPopupProps {
    isOpen: boolean;
    onClose: () => void;
}

const INSTRUCTIONS = [
    "College ID card is mandatory at the time of reporting.",
    "Every participant must register online through the official registration portal.",
    "Online registrations will be open till 11:59 PM on 26th February 2025.",
    "Pre-event schedules and important updates will be shared through the official WhatsApp group.",
    "Refunds will not be provided under any circumstances.",
    "Registered participants must report at the event venue between 08:30 AM and 09:00 AM on their respective event days.",
    "Participants are expected to strictly follow the time schedule.",
    "Participants should maintain discipline and decorum throughout the event.",
    "Usage of mobile phones during sessions is discouraged unless permitted by the coordinators.",
    "Participants must take care of their personal belongings; the organizers are not responsible for any loss.",
    "Participants are requested to follow instructions given by event coordinators and volunteers at all times.",
    "Entry to the venue is strictly based on registration confirmation and Crescita ID.",
    "Food and refreshments must be consumed only in designated areas.",
];

export const InstructionsPopup: React.FC<InstructionsPopupProps> = ({
    isOpen,
    onClose,
}) => {
    if (!isOpen) return null;

    return (
        <AnimatePresence>
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/40 backdrop-blur-sm"
            >
                <motion.div
                    initial={{ scale: 0.9, opacity: 0, y: 20 }}
                    animate={{ scale: 1, opacity: 1, y: 0 }}
                    exit={{ scale: 0.9, opacity: 0, y: 20 }}
                    className="relative w-full max-w-2xl bg-white/90 backdrop-blur-xl border border-white/20 rounded-3xl shadow-2xl overflow-hidden max-h-[80vh] flex flex-col"
                >
                    {/* Header */}
                    <div className="p-6 border-b border-black/5 bg-white/50 flex items-center justify-between sticky top-0 z-10">
                        <div>
                            <h3 className="text-xl font-cabinet font-bold text-dark-text uppercase tracking-wider">
                                General Instructions
                            </h3>
                            <p className="text-[10px] uppercase tracking-widest text-dark-text/40 font-bold mt-1">
                                Please Read Carefully
                            </p>
                        </div>
                        <button
                            onClick={onClose}
                            className="p-2 rounded-full hover:bg-black/5 transition-colors group"
                        >
                            <FiX className="w-5 h-5 text-dark-text/40 group-hover:text-dark-text transition-colors" />
                        </button>
                    </div>

                    {/* Content */}
                    <div className="p-6 overflow-y-auto custom-scrollbar">
                        <ul className="space-y-4">
                            {INSTRUCTIONS.map((instruction, index) => (
                                <li key={index} className="flex gap-4 items-start group">
                                    <span className="flex-shrink-0 w-6 h-6 rounded-full bg-orange/10 flex items-center justify-center text-[10px] font-bold text-orange mt-0.5 group-hover:bg-orange group-hover:text-white transition-colors duration-300">
                                        {index + 1}
                                    </span>
                                    <p className="text-sm text-dark-text/80 leading-relaxed font-cd">
                                        {instruction}
                                    </p>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Footer */}
                    <div className="p-4 bg-black/[0.02] border-t border-black/5 text-center">
                        <button
                            onClick={onClose}
                            className="px-8 py-2 bg-orange text-white text-xs font-bold uppercase tracking-widest rounded-full hover:bg-orange/90 transition-colors shadow-lg shadow-orange/20"
                        >
                            I Understand
                        </button>
                    </div>
                </motion.div>
            </motion.div>
        </AnimatePresence>
    );
};
