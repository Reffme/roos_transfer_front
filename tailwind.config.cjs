/** @type {import('tailwindcss').Config} */
module.exports = {
  important: 'body',
  content: ['./index.html', './src/**/*.{vue,js,ts,jsx,tsx}'],
  theme: {
    extend: {
    },
    maxWidth: {
      container: '100%',
      modal: '550px'
    },
    maxHeight:{
      container:'100%'
    },
    colors:{
      base: '#E4E4E7'
    },
    fontFamily: {
      'sans': ['Manrope'],
    },
  },
}

