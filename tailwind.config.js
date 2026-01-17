/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  darkMode: 'class',
  theme: {
    extend: {
      fontFamily: {
        josefin: ['Josefin Sans', 'sans-serif'],
      },
      colors: {
        primary: {
          blue: 'hsl(220, 98%, 61%)',
        },
        light: {
          'gray-very-light': 'hsl(0, 0%, 98%)',
          'grayish-blue-very-light': 'hsl(236, 33%, 92%)',
          'grayish-blue-light': 'hsl(233, 11%, 84%)',
          'grayish-blue-dark': 'hsl(236, 9%, 61%)',
          'grayish-blue-very-dark': 'hsl(235, 19%, 35%)',
        },
        dark: {
          'blue-very-dark': 'hsl(235, 21%, 11%)',
          'desaturated-blue-very-dark': 'hsl(235, 24%, 19%)',
          'grayish-blue-light': 'hsl(234, 39%, 85%)',
          'grayish-blue-hover': 'hsl(236, 33%, 92%)',
          'grayish-blue-dark': 'hsl(234, 11%, 52%)',
          'grayish-blue-very-dark': 'hsl(233, 14%, 35%)',
          'grayish-blue-very-dark-2': 'hsl(237, 14%, 26%)',
        },
      },
    },
  },
  plugins: [
    function({ addBase }) {
      addBase({
        'body': {
          fontSize: '18px',
        },
      })
    }
  ],
}

