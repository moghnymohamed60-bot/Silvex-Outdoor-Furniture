import type { Config } from 'tailwindcss';

const config: Config = {
  darkMode: 'class',
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        silvex: {
          50: '#FBF9F6',
          100: '#F5F0E8',
          200: '#E8DFD3',
          300: '#D5C7B5',
          400: '#BFA991',
          500: '#A37547', // Teak amber
          600: '#8A5D34',
          700: '#6C4524',
          800: '#4C2F17',
          900: '#2E1A0C',
        },
        forest: {
          50: '#F2F6F4',
          100: '#DEE8E3',
          200: '#BCCECA',
          500: '#436B58',
          700: '#2A4639',
          800: '#1F342A',
          900: '#13211A',
        },
        stone: {
          50: '#FAF9F7',
          100: '#F2EFEB',
          200: '#E4DFD7',
          300: '#D0C9BD',
          400: '#A89F91',
          500: '#7E7668',
          600: '#5C5549',
          700: '#3D382F',
          800: '#25221C',
          900: '#141311',
          950: '#0B0A09',
        },
        terracotta: {
          500: '#C06E52',
          600: '#A7583D',
        },
        azure: {
          500: '#3E7388',
          600: '#2E5767',
        }
      },
      fontFamily: {
        sans: ['var(--font-sans)', 'system-ui', '-apple-system', 'sans-serif'],
        serif: ['var(--font-serif)', 'Georgia', 'serif'],
        display: ['var(--font-display)', 'var(--font-serif)', 'Georgia', 'serif'],
      },
      boxShadow: {
        'luxury': '0 20px 40px -15px rgba(0, 0, 0, 0.07), 0 0 1px 1px rgba(0, 0, 0, 0.05)',
        'luxury-lg': '0 30px 60px -20px rgba(0, 0, 0, 0.12), 0 0 1px 1px rgba(0, 0, 0, 0.06)',
        'glow': '0 0 25px rgba(163, 117, 71, 0.25)',
      },
      animation: {
        'fade-in': 'fadeIn 0.5s cubic-bezier(0.16, 1, 0.3, 1) forwards',
        'slide-up': 'slideUp 0.6s cubic-bezier(0.16, 1, 0.3, 1) forwards',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        slideUp: {
          '0%': { opacity: '0', transform: 'translateY(20px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
      },
    },
  },
  plugins: [],
};

export default config;
