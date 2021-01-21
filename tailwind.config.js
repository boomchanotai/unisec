module.exports = {
  purge: ['./pages/**/*.js', './components/**/*.js'],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {
      gridTemplateColumns: {
        'header-mobile' : '70% 30%'
      }
    },
  },
  variants: {
    extend: {},
  },
  plugins: [],
}
