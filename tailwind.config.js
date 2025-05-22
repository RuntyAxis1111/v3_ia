/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        primary: {
          50: '#e8f0ff',
          100: '#d1e0ff',
          200: '#a3c2ff',
          300: '#75a3ff',
          400: '#4785ff',
          500: '#1966ff',
          600: '#0052ff',
          700: '#0042cc',
          800: '#003199',
          900: '#002166',
        },
        user: '#f0f0f0',
        bot: '#e8f0ff',
      },
      fontFamily: {
        sans: ['Inter', 'sans-serif'],
      },
      maxWidth: {
        container: '768px',
      },
    },
  },
  plugins: [],
};