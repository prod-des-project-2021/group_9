module.exports = {
  purge: ['./src/**/*.{js,jsx,ts,tsx}', './public/index.html'],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {
      backgroundColor: theme => ({

        ...theme('colors'),

        'nav': '#f2c40d',

        'nav-dark' : '#dab10b',

        'nav-light' : '#f7d85e',

        'nav2': '#FBEDB6',

        'bg1': '#FFFFE6'
      }),

      blur: {        
        xs: '2px',
      },

      fontFamily: {
        'Mali' : ['Mali', 'cursive']
      },
    },
  },

  variants: {
  extend: { },
},
plugins: []
}
