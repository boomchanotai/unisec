module.exports = {
  purge: ['./pages/**/*.js', './components/**/*.js'],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {
      gridTemplateColumns: {
        'header-mobile' : '70% 30%',
        'split-20-80' : '20% 80%',
        'split-40-60' : '40% 60%'
      },
      height: {
        '60vh' : '60vh',
        '70vh' : '70vh',
        '80vh' : '80vh',
        '90vh' : '90vh'
      },
      width: {
        '60vw' : '60vw',
        '70vw' : '70vw',
        '80vw' : '80vw',
        '90vw' : '90vw'
      }
    },
  },
  variants: {
    extend: {},
  },
  plugins: [],
}
