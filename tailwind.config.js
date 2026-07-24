/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      colors: {
        primary: '#C9187F',
        'primary-dark': '#50002F',
        'primary-light': '#FFD4E5',
        rose: {
          50: '#FFF1F6',
          100: '#FFE0EC',
          200: '#FFC2D9',
          300: '#FF94BA',
          400: '#FB6094',
          500: '#E83A78',
          600: '#C9187F',
          700: '#9D1450',
          800: '#7A1244',
          900: '#50002F',
        },
        secondary: '#E83A78',
        accent: '#FFC2D9',
        dark: '#33001E',
        muted: '#7B5B6E',
        cream: '#FFF8FB',
        blush: '#FFE0EC',
        gov: {
          DEFAULT: '#1B3A5C',
          deep: '#0F2438',
          tint: '#EEF2F5',
          gold: '#B8862E',
        },
      },
      fontFamily: {
        sans: ['MonaSans', 'Inter', 'sans-serif'],
        elephant: ['"UTM Elephant"', 'MonaSans', 'Inter', 'sans-serif'],
      },
      backgroundImage: {
        'gradient-hawee': 'linear-gradient(135deg, #C9187F 0%, #E83A78 55%, #FB6094 100%)',
        'gradient-hawee-soft': 'linear-gradient(135deg, #FFF2F7 0%, #FFE4EF 100%)',
      },
      animation: {
        'float': 'float 6s ease-in-out infinite',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-20px)' },
        },
      },
    },
  },
  plugins: [],
}
