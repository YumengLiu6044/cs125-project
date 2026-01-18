/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./App.{js,ts,tsx}', './components/**/*.{js,ts,tsx}'],

  presets: [require('nativewind/preset')],
  theme: {
    extend: {
      colors: {
        bianca: '#FFFAF5',
        primary: '#F58700'
      },
      fontFamily: {
        sans: ['DMSans_400Regular'],
        light: ['DMSans_300Light'],
        regular: ['DMSans_400Regular'],
        medium: ['DMSans_500Medium'],
        semibold: ['DMSans_600SemiBold'],
        bold: ['DMSans_700Bold'],
      },
    },
  },
  plugins: [],
};
