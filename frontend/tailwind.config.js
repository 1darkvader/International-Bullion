/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
    "./public/index.html"
  ],
  theme: {
    extend: {
      colors: {
        'gold': {
          DEFAULT: '#D4AF37',
          light: '#E5C158',
          dark: '#B8960C',
        },
        'charcoal': '#1A1A1A',
        'jet': '#0A0A0A',
      },
      fontFamily: {
        'display': ['Playfair Display', 'serif'],
        'sans': ['Inter', 'Helvetica Neue', 'sans-serif'],
      },
      backgroundImage: {
        'gold-gradient': 'linear-gradient(135deg, #D4AF37 0%, #E5C158 50%, #B8960C 100%)',
      },
    },
  },
  plugins: [],
}
