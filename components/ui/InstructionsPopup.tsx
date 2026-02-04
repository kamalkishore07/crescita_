"use client";

import React, { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FiX, FiAlertCircle, FiCheckCircle, FiInfo } from "react-icons/fi";

interface InstructionsPopupProps {
    isOpen: boolean;
    onClose: () => void;
}

const GUIDELINES = {
    general: [
        "College ID card is Mandatory at the time of reporting",
        "Every participant must register online",
        "Online Registrations will be open till 11:59 PM on 26th February 2025",
        "Pre-event schedules will be shared with participants through WhatsApp group",
        "Registered participants must report at the event venue between 08:30 AM to 09:00 AM on 7th March",
        "Participants are expected to follow the time schedule strictly"
    ],
    registration: [
        "Registration Fee: ₹250 (Payable during Online Registration)",
        "Participants can register for either Workshop or Tech & Non-Tech Events",
        "If registered for Tech & Non-Tech Event, participants can take part in all events",
        "Workshop registration is for a full day, and participants aren't allowed to take part in other events"
    ],
    postRegistration: [
        "After individual registration & payment, we'll verify your payment",
        "You'll receive a Cresciton ID & further instructions via email",
        "Individual Event Registration Link will be mailed to participants after successful payment",
        "Refreshments will be provided",
        "Participation Certificates will be issued based on attendance"
    ],
    additional: [
        "Participants must bring their college ID",
        "Online registration is mandatory",
        "Payment must be completed before the deadline",
        "Participants should join the WhatsApp group for updates",
        "Be punctual and follow the event schedule"
    ]
};

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
                    className="relative w-full max-w-3xl bg-[#111] backdrop-blur-3xl border border-white/10 rounded-[2.5rem] shadow-2xl overflow-hidden max-h-[85vh] flex flex-col group"
                >
                    <div className="gloss-sheen"></div>

                    {/* Header */}
                    <div className="p-8 border-b border-white/5 bg-white/[0.02] flex items-center justify-between sticky top-0 z-10 backdrop-blur-xl">
                        <div>
                            <h3 className="text-2xl font-cabinet font-bold text-white uppercase tracking-tight">
                                Event <span className="text-orange">Guidelines</span>
                            </h3>
                            <p className="text-[10px] uppercase tracking-[0.3em] text-white/40 font-bold mt-1">
                                Essential Protocol & Instructions
                            </p>
                        </div>
                        <button
                            onClick={onClose}
                            className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center hover:bg-orange hover:text-black transition-all duration-300 group/close"
                        >
                            <FiX className="w-5 h-5 text-white/40 group-hover/close:text-inherit transition-colors" />
                        </button>
                    </div>

                    {/* Content */}
                    <div
                        className="p-8 overflow-y-auto custom-scrollbar space-y-8 overscroll-contain"
                        data-lenis-prevent
                    >
                        {/* General Instructions */}
                        <div className="space-y-4">
                            <div className="flex items-center gap-3">
                                <div className="w-8 h-8 rounded-xl bg-orange/10 border border-orange/20 flex items-center justify-center">
                                    <FiInfo className="w-4 h-4 text-orange" />
                                </div>
                                <h4 className="text-lg font-bold text-white uppercase tracking-wide">General Instructions</h4>
                            </div>
                            <ul className="space-y-3 ml-11">
                                {GUIDELINES.general.map((item, index) => (
                                    <motion.li
                                        key={index}
                                        initial={{ opacity: 0, x: -10 }}
                                        animate={{ opacity: 1, x: 0 }}
                                        transition={{ delay: index * 0.03 }}
                                        className="flex gap-3 items-start group/item"
                                    >
                                        <span className="flex-shrink-0 w-1.5 h-1.5 rounded-full bg-orange mt-2"></span>
                                        <p className="text-[14px] text-white/70 leading-relaxed font-medium group-hover/item:text-white transition-colors">
                                            {item}
                                        </p>
                                    </motion.li>
                                ))}
                            </ul>
                        </div>

                        {/* Registration Details */}
                        <div className="space-y-4">
                            <div className="flex items-center gap-3">
                                <div className="w-8 h-8 rounded-xl bg-blue-500/10 border border-blue-500/20 flex items-center justify-center">
                                    <FiCheckCircle className="w-4 h-4 text-blue-400" />
                                </div>
                                <h4 className="text-lg font-bold text-white uppercase tracking-wide">Registration Details</h4>
                            </div>
                            <ul className="space-y-3 ml-11">
                                {GUIDELINES.registration.map((item, index) => (
                                    <motion.li
                                        key={index}
                                        initial={{ opacity: 0, x: -10 }}
                                        animate={{ opacity: 1, x: 0 }}
                                        transition={{ delay: (GUIDELINES.general.length + index) * 0.03 }}
                                        className="flex gap-3 items-start group/item"
                                    >
                                        <span className="flex-shrink-0 w-1.5 h-1.5 rounded-full bg-blue-400 mt-2"></span>
                                        <p className="text-[14px] text-white/70 leading-relaxed font-medium group-hover/item:text-white transition-colors">
                                            {item}
                                        </p>
                                    </motion.li>
                                ))}
                            </ul>
                        </div>

                        {/* Post-Registration Process */}
                        <div className="space-y-4">
                            <div className="flex items-center gap-3">
                                <div className="w-8 h-8 rounded-xl bg-green-500/10 border border-green-500/20 flex items-center justify-center">
                                    <FiCheckCircle className="w-4 h-4 text-green-400" />
                                </div>
                                <h4 className="text-lg font-bold text-white uppercase tracking-wide">Post-Registration Process</h4>
                            </div>
                            <ul className="space-y-3 ml-11">
                                {GUIDELINES.postRegistration.map((item, index) => (
                                    <motion.li
                                        key={index}
                                        initial={{ opacity: 0, x: -10 }}
                                        animate={{ opacity: 1, x: 0 }}
                                        transition={{ delay: (GUIDELINES.general.length + GUIDELINES.registration.length + index) * 0.03 }}
                                        className="flex gap-3 items-start group/item"
                                    >
                                        <span className="flex-shrink-0 w-1.5 h-1.5 rounded-full bg-green-400 mt-2"></span>
                                        <p className="text-[14px] text-white/70 leading-relaxed font-medium group-hover/item:text-white transition-colors">
                                            {item}
                                        </p>
                                    </motion.li>
                                ))}
                            </ul>
                        </div>

                        {/* Additional Guidelines */}
                        <div className="space-y-4">
                            <div className="flex items-center gap-3">
                                <div className="w-8 h-8 rounded-xl bg-purple-500/10 border border-purple-500/20 flex items-center justify-center">
                                    <FiAlertCircle className="w-4 h-4 text-purple-400" />
                                </div>
                                <h4 className="text-lg font-bold text-white uppercase tracking-wide">Additional Guidelines</h4>
                            </div>
                            <ul className="space-y-3 ml-11">
                                {GUIDELINES.additional.map((item, index) => (
                                    <motion.li
                                        key={index}
                                        initial={{ opacity: 0, x: -10 }}
                                        animate={{ opacity: 1, x: 0 }}
                                        transition={{ delay: (GUIDELINES.general.length + GUIDELINES.registration.length + GUIDELINES.postRegistration.length + index) * 0.03 }}
                                        className="flex gap-3 items-start group/item"
                                    >
                                        <span className="flex-shrink-0 w-1.5 h-1.5 rounded-full bg-purple-400 mt-2"></span>
                                        <p className="text-[14px] text-white/70 leading-relaxed font-medium group-hover/item:text-white transition-colors">
                                            {item}
                                        </p>
                                    </motion.li>
                                ))}
                            </ul>
                        </div>

                        {/* Important Note */}
                        <div className="mt-8 p-6 bg-red-500/5 border border-red-500/20 rounded-2xl">
                            <div className="flex gap-3 items-start">
                                <FiAlertCircle className="w-5 h-5 text-red-400 flex-shrink-0 mt-0.5" />
                                <div className="space-y-2">
                                    <p className="text-sm font-bold text-red-400 uppercase tracking-wide">Important Note</p>
                                    <p className="text-[13px] text-white/70 leading-relaxed">
                                        Any person violating the rules will be disqualified. The decision of the judges will be final. Refunds will not be provided under any circumstances.
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Footer */}
                    <div className="p-6 bg-white/[0.02] border-t border-white/5 text-center backdrop-blur-xl">
                        <button
                            onClick={onClose}
                            className="px-12 py-4 bg-orange text-black text-[11px] font-bold uppercase tracking-[0.2em] rounded-full hover:bg-white hover:text-black transition-all duration-300 shadow-xl shadow-orange/10 hover:shadow-white/10"
                        >
                            I Understand
                        </button>
                    </div>
                </motion.div>
            </motion.div>
        </AnimatePresence>
    );
};
