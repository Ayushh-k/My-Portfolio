/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ['"Share Tech Mono"', 'monospace'],
        orbitron: ['Orbitron', 'sans-serif'],
      },
      colors: {
        primary: '#00f3ff', // Cyan
        secondary: '#00ff41', // Matrix Green
      },
      animation: {
        fadeInDown: 'fadeInDown 0.6s ease-out',
        fadeInUp: 'fadeInUp 0.6s ease-out 0.2s both',
        fadeInSection: 'fadeInSection 0.6s ease-out both',
        'pulse-slow': 'pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        wave: 'wave 3s ease-in-out infinite',
        'wave-slow': 'wave-slow 4s ease-in-out infinite',
        blob: 'blob 7s infinite',
        'slide-diagonal': 'slide-diagonal 4s ease-in-out infinite',
        'gradient-shift': 'gradientShift 15s ease infinite',
        'gradient-pulse': 'gradientPulse 8s ease-in-out infinite',
      },
      keyframes: {
        fadeInDown: {
          '0%': {
            opacity: '0',
            transform: 'translateY(-20px)',
          },
          '100%': {
            opacity: '1',
            transform: 'translateY(0)',
          },
        },
        fadeInUp: {
          '0%': {
            opacity: '0',
            transform: 'translateY(20px)',
          },
          '100%': {
            opacity: '1',
            transform: 'translateY(0)',
          },
        },
        fadeInSection: {
          '0%': {
            opacity: '0',
            transform: 'translateY(30px)',
          },
          '100%': {
            opacity: '1',
            transform: 'translateY(0)',
          },
        },
        wave: {
          '0%, 100%': {
            transform: 'translateY(0)',
          },
          '50%': {
            transform: 'translateY(-10px)',
          },
        },
        'wave-slow': {
          '0%, 100%': {
            transform: 'translateY(0)',
          },
          '50%': {
            transform: 'translateY(-8px)',
          },
        },
        blob: {
          '0%, 100%': {
            transform: 'translate(0, 0) scale(1)',
          },
          '33%': {
            transform: 'translate(30px, -50px) scale(1.1)',
          },
          '66%': {
            transform: 'translate(-20px, 20px) scale(0.9)',
          },
        },
        'slide-diagonal': {
          '0%': {
            transform: 'translateX(-10%)',
          },
          '50%': {
            transform: 'translateX(10%)',
          },
          '100%': {
            transform: 'translateX(-10%)',
          },
        },
        gradientShift: {
          '0%': {
            backgroundPosition: '0% 50%',
          },
          '50%': {
            backgroundPosition: '100% 50%',
          },
          '100%': {
            backgroundPosition: '0% 50%',
          },
        },
        gradientPulse: {
          '0%': {
            opacity: '0.6',
          },
          '50%': {
            opacity: '1',
          },
          '100%': {
            opacity: '0.6',
          },
        },
      },
    },
  },
  darkMode: 'class',
  plugins: [],
}
