/** @type {import('tailwindcss').Config} */

module.exports = {
  content: ['./*.html', './src/**/*.{js,ts,jsx,tsx,css}'],
  theme: {
    extend: {
      // screens: {
      //   'mobile': '640px',
      //
      //   'tablet': '640px',
      //
      //   'laptop': '1024px',
      //
      //   'desktop': '1280px'
      // },
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
