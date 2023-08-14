/** @type {import('tailwindcss').Config} */
export default {
  content: ['./src/**/*.{js,jsx,ts,tsx}', './public/index.html', './index.html'],
  darkMode: 'media', // or 'media' or 'class'
  theme: {
    colors: {
      transparent: 'transparent',
      current: 'currentColor',
      purple: {
        light: '#49088A',
        DEFAULT: '#49088A',
        dark: '#2F0954',
      },
      blue: {
        light: '#5ABAFF',
        DEFAULT: '#5ABAFF',
        dark: '#093252',
      },
      yellow: {
        DEFAULT: '#E6B802',
      },
      red: {
        DEFAULT: 'red'
      }
    }
  },
  variants: {
    extend: {},
  },
  plugins: [],
}

