/** @type {import('tailwindcss').Config} */
export default {
  content: ['./src/**/*.{astro,html,js,jsx,ts,tsx}'],
  theme: {
    extend: {
      colors: {
        primary: {
          50: '#e6f4ff',
          100: '#b3dfff',
          200: '#80caff',
          300: '#4db5ff',
          400: '#1a9fff',
          500: '#0088e6',
          600: '#006bb4',
          700: '#004e82',
          800: '#003050',
          900: '#0a1628',
        },
        accent: {
          DEFAULT: '#00b4d8',
          light: '#48cae4',
          dark: '#0096c7',
        },
        dark: {
          DEFAULT: '#0a1628',
          light: '#1a2a44',
          lighter: '#243654',
        },
        med: {
          blue: '#2196F3',
          cyan: '#00BCD4',
          teal: '#009688',
          gradient: {
            from: '#0a1628',
            via: '#1a3a5c',
            to: '#2196F3',
          },
        },
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', '-apple-system', 'sans-serif'],
        display: ['Plus Jakarta Sans', 'Inter', 'sans-serif'],
      },
      boxShadow: {
        'soft': '0 2px 15px -3px rgba(0, 0, 0, 0.04), 0 1px 6px -2px rgba(0, 0, 0, 0.03)',
        'soft-md': '0 4px 25px -5px rgba(0, 0, 0, 0.06), 0 2px 10px -3px rgba(0, 0, 0, 0.04)',
        'soft-lg': '0 10px 40px -10px rgba(0, 0, 0, 0.08), 0 4px 15px -5px rgba(0, 0, 0, 0.04)',
        'soft-xl': '0 20px 60px -15px rgba(0, 0, 0, 0.1), 0 8px 25px -8px rgba(0, 0, 0, 0.05)',
        'blue-glow': '0 8px 30px -5px rgba(33, 150, 243, 0.2)',
        'blue-glow-lg': '0 15px 50px -10px rgba(33, 150, 243, 0.3)',
      },
      borderRadius: {
        '4xl': '2rem',
      },
      spacing: {
        '18': '4.5rem',
        '22': '5.5rem',
      },
      animation: {
        'fade-in': 'fadeIn 0.7s ease-out forwards',
        'slide-up': 'slideUp 0.7s ease-out forwards',
        'slide-in-left': 'slideInLeft 0.7s ease-out forwards',
        'slide-in-right': 'slideInRight 0.7s ease-out forwards',
        'float': 'float 6s ease-in-out infinite',
        'pulse-soft': 'pulseSoft 4s ease-in-out infinite',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        slideUp: {
          '0%': { opacity: '0', transform: 'translateY(40px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        slideInLeft: {
          '0%': { opacity: '0', transform: 'translateX(-40px)' },
          '100%': { opacity: '1', transform: 'translateX(0)' },
        },
        slideInRight: {
          '0%': { opacity: '0', transform: 'translateX(40px)' },
          '100%': { opacity: '1', transform: 'translateX(0)' },
        },
        float: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-20px)' },
        },
        pulseSoft: {
          '0%, 100%': { opacity: '0.4' },
          '50%': { opacity: '0.7' },
        },
      },
    },
  },
  plugins: [],
};
