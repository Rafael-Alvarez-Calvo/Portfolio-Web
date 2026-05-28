/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        syne: ['Syne', 'sans-serif'],
        dm: ['DM Sans', 'sans-serif'],
        mono: ['Fira Code', 'monospace'],
      },
      colors: {
        bg: '#040d1e',
        bg2: '#06101f',
        card: '#0c1629',
        card2: '#101d35',
        border: '#1c2d4f',
        blue: '#3b82f6',
        cyan: '#06b6d4',
        mint: '#10b981',
        purple: '#8b5cf6',
        'text-dim': '#4a6080',
        'text-muted': '#7b90b8',
      },
      animation: {
        'spin-slow': 'spin 8s linear infinite',
        'float': 'float 4s ease-in-out infinite',
        'float-delay': 'float 4s ease-in-out 1.5s infinite',
        'float-delay2': 'float 4s ease-in-out 3s infinite',
        'pulse-dot': 'pulseDot 2s infinite',
        'blink': 'blink 1s infinite',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-10px)' },
        },
        pulseDot: {
          '0%, 100%': { opacity: '1', transform: 'scale(1)' },
          '50%': { opacity: '0.5', transform: 'scale(0.8)' },
        },
        blink: {
          '0%, 100%': { opacity: '1' },
          '50%': { opacity: '0' },
        },
      },
    },
  },
  plugins: [],
}
