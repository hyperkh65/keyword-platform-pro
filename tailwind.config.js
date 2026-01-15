/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          light: '#7c3aed',
          DEFAULT: '#6d28d9',
          dark: '#5b21b6',
        },
        accent: '#f97316',
      },
    },
  },
  plugins: [],
};