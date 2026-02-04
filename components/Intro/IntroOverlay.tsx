'use client';

import { useEffect, useState } from 'react';
import Folder from './Folder';
import Image from 'next/image';

export const IntroOverlay = () => {
    const [isVisible, setIsVisible] = useState(true);
    const [isFading, setIsFading] = useState(false);

    useEffect(() => {
        // Start fading out after 2 seconds
        // This gives time for:
        // 0.2s pre-delay (folder closed)
        // ~1s animation open
        // ~0.8s viewing logo
        // Total ~3s including fade
        const timer = setTimeout(() => {
            setIsFading(true);
            setTimeout(() => {
                setIsVisible(false);
            }, 1000); // 1s fade duration
        }, 2000);

        return () => clearTimeout(timer);
    }, []);

    if (!isVisible) return null;

    return (
        <div
            className={`fixed inset-0 z-[9999] flex items-center justify-center bg-[#060010] transition-opacity duration-1000 ${isFading ? 'opacity-0 pointer-events-none' : 'opacity-100'}`}
        >
            <Folder
                size={3}
                color="#FF5D00"
                className=""
                items={[
                    <div key="logo" className="w-full h-full flex items-center justify-center bg-white p-2">
                        <Image
                            src="/Images/Logo/Logo.png"
                            alt="Logo"
                            width={100}
                            height={100}
                            className="object-contain"
                        />
                    </div>
                ]}
            />

            <div className={`absolute bottom-10 text-white/50 text-sm animate-pulse transition-opacity duration-500 ${isFading ? 'opacity-0' : 'opacity-100'}`}>
                Loading experience...
            </div>
        </div>
    );
};
