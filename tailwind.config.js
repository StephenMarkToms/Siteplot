module.exports = {
  purge: [],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {
      colors: {
        primary: {
         900:"#012a4a",
         800 :"#013a63",
         700 :"#01497c",
         600 :"#014f86",
         500 :"#2a6f97",
         400 :"#2c7da0",
         300 :"#468faf",
         200 :"#61a5c2",
         100 :"#89c2d9",
         50 :"#a9d6e5",
        },
        secondary: {
          50: '#FDFCFC',
          100: '#FAF7F5',
          200: '#F7F1EE',
          300: '#EEE3DD',
          400: '#E7D7CF',
          500: '#DFC9BE',
          600: '#CEAD9C',
          700: '#BD907A',
          800: '#AC7358',
          900: '#8C5C45',
        },
        tertiary: {
          50: '#E9D3D7',
          100: '#DFBEC4',
          200: '#CE9CA5',
          300: '#BD7A86',
          400: '#AC5867',
          500: '#8C4552',
          600: '#6A343E',
          700: '#48232A',
          800: '#261216',
          900: '#140A0C',
        },
        warning: {
          300: '#F0EDCC',
          400: '#E5E0A4',
          500: '#D9D27B',
          600: '#CEC555',
          700: '#BAB036',
        },
        success: {
          300: '#C2D8C1',
          400: '#A3C4A1',
          500: '#84B082',
          600: '#659C63',
          700: '#517D4F',
        },
        danger: {
          300: '#BD7A86',
          400: '#AC5867',
          500: '#8C4552',
          600: '#6A343E',
          700: '#48232A',
        },
      },
    },
  },
  variants: {
    extend: {},
  },
  plugins: [
    require('@tailwindcss/forms'),
  ],
}
