/** @type {import('tailwindcss').Config} */

module.exports = {
  content: ['./*.html', './src/**/*.{js,ts,jsx,tsx,css}'],
  theme: {
    extend: {
      colors: {
        'light-gray': '#BBB7B7',
        'light-green': '#02C98D',
        'light-blue': '#3589D7'
      }
    },
    fontFamily: {
      sans: ['Gilroy', 'sans-serif']
    }
  },
  plugins: []
}
