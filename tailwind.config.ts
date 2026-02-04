import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './app/**/*.{js,ts,jsx,tsx,mdx}',
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        orange: 'var(--color-orange)',
        soft: 'var(--color-soft)',
        dark1: '#A39594',
        dark2: '#6E675F',
        'dark-text': 'var(--color-dark-text)',
        'muted-text': 'var(--color-muted-text)',
      },
      borderRadius: {
        'xl2': '1.25rem',
        'xl3': '1.5rem',
        'xl4': '2rem',
      },
      boxShadow: {
        'soft': '0 8px 32px rgba(0, 0, 0, 0.08)',
        'softer': '0 2px 12px rgba(0, 0, 0, 0.05)',
      },
      spacing: {
        '128': '32rem',
        '144': '36rem',
      },
      fontFamily: {
        cabinet: ['var(--font-cabinet-grotesk)', 'sans-serif'],
      },
    },
  },
  plugins: [],
};
export default config;
