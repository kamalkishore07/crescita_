import React from 'react';

interface CardProps {
    children: React.ReactNode;
    variant?: 'white' | 'dark' | 'glass' | 'accent';
    pixel?: boolean;
    className?: string;
    animate?: boolean;
}

export const Card: React.FC<CardProps> = ({
    children,
    variant = 'white',
    pixel = false,
    className = '',
    animate = true
}) => {
    const variants = {
        white: 'bg-white border border-dark-text/5',
        dark: 'bg-dark-bg text-white border border-white/5',
        glass: 'bg-white/40 backdrop-blur-sm border border-dark-text/5',
        accent: 'bg-orange/10 border border-orange/20'
    };

    const shapes = pixel ? 'pixel-box' : 'rounded-[2rem]';
    const animationClass = animate ? 'animate-trigger' : '';

    return (
        <div className={`p-8 md:p-12 ${variants[variant]} ${shapes} ${animationClass} ${className}`}>
            {children}
        </div>
    );
};
