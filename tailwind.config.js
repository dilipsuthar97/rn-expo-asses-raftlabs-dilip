/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./app/_layout.tsx', './app/**/*.{js,jsx,ts,tsx}'],
  presets: [require('nativewind/preset')],
  theme: {
    extend: {},
  },
  plugins: [],
};
