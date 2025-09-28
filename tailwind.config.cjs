/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}'],
  theme: {
    extend: {
      colors: {
        'huitzo': {
          'dark': '#0a0e27',
          'secondary': '#0d1117',
          'tertiary': '#161b22',
          'accent': '#00ff9f',
          'accent-secondary': '#00d9ff',
          'border': '#30363d',
        },
        'text': {
          'primary': '#ffffff',
          'secondary': '#8b949e',
          'muted': '#6e7681',
        },
        'status': {
          'success': '#3fb950',
          'warning': '#d29922',
          'error': '#f85149',
          'info': '#58a6ff',
        }
      },
      fontFamily: {
        'mono': ['JetBrains Mono', 'Fira Code', 'Monaco', 'monospace'],
        'sans': ['Inter', 'system-ui', 'sans-serif'],
      },
      boxShadow: {
        'glow': '0 0 20px rgba(0, 255, 159, 0.2)',
        'glow-lg': '0 0 40px rgba(0, 255, 159, 0.3)',
      },
      animation: {
        'pulse-glow': 'pulse 2s infinite',
        'fade-in': 'fadeIn 0.5s ease-in',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0', transform: 'translateY(20px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        }
      }
    },
  },
  plugins: [],
};