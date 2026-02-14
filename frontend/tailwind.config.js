/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
    "./public/index.html"
  ],
  theme: {
    extend: {
      colors: {
        'amber': {
          DEFAULT: '#C9A227',
          light: '#E8C547',
          dark: '#9A7B1A',
          muted: '#D4B84A',
        },
        'navy': {
          DEFAULT: '#0D1B2A',
          light: '#1B2838',
          dark: '#050A10',
          mid: '#152238',
        },
        'cream': {
          DEFAULT: '#F5F0E6',
          dark: '#E8E0D0',
          light: '#FDFBF7',
        },
        'copper': '#B87333',
        'slate': {
          custom: '#415A77',
          light: '#778DA9',
        },
      },
      fontFamily: {
        'display': ['Cormorant Garamond', 'Georgia', 'serif'],
        'sans': ['DM Sans', 'system-ui', 'sans-serif'],
        'mono': ['JetBrains Mono', 'monospace'],
      },
      backgroundImage: {
        'amber-gradient': 'linear-gradient(135deg, #C9A227 0%, #E8C547 50%, #9A7B1A 100%)',
        'navy-gradient': 'linear-gradient(180deg, #0D1B2A 0%, #1B2838 100%)',
        'radial-amber': 'radial-gradient(circle at center, rgba(201, 162, 39, 0.15) 0%, transparent 70%)',
      },
      boxShadow: {
        'amber': '0 4px 30px rgba(201, 162, 39, 0.15)',
        'amber-lg': '0 10px 50px rgba(201, 162, 39, 0.25)',
        'inner-amber': 'inset 0 0 30px rgba(201, 162, 39, 0.05)',
      },
      animation: {
        'float': 'float 6s ease-in-out infinite',
        'pulse-slow': 'pulse 4s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'shimmer': 'shimmer 3s infinite',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-10px)' },
        },
        shimmer: {
          '0%': { backgroundPosition: '-200% 0' },
          '100%': { backgroundPosition: '200% 0' },
        },
      },
    },
  },
  plugins: [],
}
