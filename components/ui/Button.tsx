import React from 'react';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
    variant?: 'cta' | 'solid' | 'outline' | 'glass';
    size?: 'sm' | 'md' | 'lg';
}

export const Button: React.FC<ButtonProps> = ({
    children,
    variant = 'solid',
    size = 'md',
    className = '',
    ...props
}) => {
    const baseStyles = 'font-semibold tracking-tight transition-all duration-300 active:scale-[0.98] flex items-center justify-center gap-2 outline-none focus-visible:ring-2 focus-visible:ring-orange/50';

    const variants = {
        cta: 'bg-black text-white shadow-sm hover:!bg-[#E3B23C] hover:text-black hover:shadow-xl hover:shadow-orange/20 hover:-translate-y-0.5',
        solid: 'bg-dark-text/70 text-white shadow-sm hover:!bg-[#E3B23C] hover:text-black hover:shadow-orange/20 hover:-translate-y-0.5',
        outline: 'bg-transparent border border-dark-text/10 text-dark-text hover:!bg-[#E3B23C] hover:text-black hover:border-orange hover:-translate-y-0.5 hover:shadow-orange/10',
        glass: 'bg-white/70 backdrop-blur-md border border-white/40 text-dark-text hover:!bg-[#E3B23C] hover:text-black hover:border-orange hover:-translate-y-0.5 shadow-sm'
    };

    const sizes = {
        sm: 'px-5 py-2.5 text-xs',
        md: 'px-7 py-3.5 text-sm',
        lg: 'px-10 py-5 text-base'
    };

    const shape = 'rounded-2xl';

    return (
        <button
            className={`${baseStyles} ${variants[variant]} ${sizes[size]} ${shape} ${className}`}
            {...props}
        >
            {children}
        </button>
    );
};
