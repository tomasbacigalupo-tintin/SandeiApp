/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: 'oklch(0.65 0.18 145)',
        secondary: 'oklch(0.72 0.14 195)',
        accent: 'oklch(0.82 0.09 95)',
        success: '#16a34a',
        warning: '#d97706',
        error: '#dc2626',
      },
      fontFamily: {
        sans: ['Inter', 'Noto Sans', 'sans-serif'],
        display: ['Teko', 'sans-serif'],
      },
    },
  },
  plugins: [],
}
