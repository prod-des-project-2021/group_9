module.exports = {
  purge: ['./src/**/*.{js,jsx,ts,tsx}', './public/index.html'],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {
      backgroundColor: theme => ({

        ...theme('colors'),

        'nav': '#F5D142',

        'nav-dark' : '#dab10b',

        'nav2': '#FBEDB6',

        'bg1': '#FFFFE6'
      }),

      fontFamily: {

        'Mali' : ['Mali', 'cursive']
      },
    }
  },

  variants: {
  extend: { },
},
plugins: []
  }
