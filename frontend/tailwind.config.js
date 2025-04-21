/** @type {import('tailwindcss').Config} */
export default {
    content: [
      "./index.html",
      "./src/**/*.{js,ts,jsx,tsx}",
    ],
    theme: {
      extend: {
        fontFamily: {
          inter: ['Inter', 'sans-serif'],
        },
        keyframes: {
          fadeBlurIn: {
            '0%': { opacity: '0', filter: 'blur(6px)' },
            '100%': { opacity: '1', filter: 'blur(0)' },
          },
          scaleFadeIn: {
            '0%': { opacity: '0', transform: 'scale(0.9)' },
            '100%': { opacity: '1', transform: 'scale(1)' },
          },
        },
        animation: {
          'fade-blur-in': 'fadeBlurIn 1s ease-out forwards',
          'scale-fade-in': 'scaleFadeIn 1s ease-out forwards',
        },
      },
    },
    plugins: [],
  }
  