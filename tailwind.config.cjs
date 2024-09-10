/** @type {import('tailwindcss').Config} */
module.exports = {
  important: 'body',
  content: ['./index.html', './src/**/*.{vue,js,ts,jsx,tsx}'],
  theme: {
    extend: {
      boxShadow:{
        'custom': '0 4px 6px rgba(0, 0, 0, 0.1), 0 10px 20px rgba(0, 0, 0, 0.1)',
      }
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

