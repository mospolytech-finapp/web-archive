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
      backgroundImage: {
        'goal-bg': "url('/src/assets/images/goal-bg.svg')"
      },
      boxShadow: {
        custom: 'inset 0px 6px 6px rgba(0, 0, 0, 0.25)'
      },
      colors: {
        'light-gray': '#BBB7B7',
        'light-green': '#02C98D',
        'light-blue': '#3589D7',
        'light-green-text': '#009A6C',
        'light-blue-text': '#3076B8',
        'blue-focus': '#245786',
        'purple-active-link': '#6C39BB',
        'pink-active-link': '#E5AEFF',
        error: '#FFD9D9',
        'light-red': '#FF9494'
      }
    },
    fontFamily: {
      sans: ['Gilroy', 'sans-serif']
    }
  },
  plugins: []
}
