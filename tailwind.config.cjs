/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}'],
  theme: {
    extend: {
      colors: {
        'huitzo': {
          'dark': 'var(--color-bg-primary)',
          'secondary': 'var(--color-bg-secondary)',
          'tertiary': 'var(--color-bg-tertiary)',
          'accent': 'var(--color-accent-primary)',
          'accent-secondary': 'var(--color-accent-secondary)',
          'border': 'var(--color-border)',
        },
        'text': {
          'primary': 'var(--color-text-primary)',
          'secondary': 'var(--color-text-secondary)',
          'muted': 'var(--color-text-muted)',
        },
        'status': {
          'success': 'var(--color-success)',
          'warning': 'var(--color-warning)',
          'error': 'var(--color-error)',
          'info': 'var(--color-info)',
        },
        'ansi': {
          'red': 'var(--color-ansi-red)',
          'green': 'var(--color-ansi-green)',
          'yellow': 'var(--color-ansi-yellow)',
          'blue': 'var(--color-ansi-blue)',
        }
      },
      fontFamily: {
        'mono': ['JetBrains Mono', 'Fira Code', 'Monaco', 'monospace'],
        'sans': ['Inter', 'system-ui', 'sans-serif'],
      },
      boxShadow: {
        'glow': '0 0 20px var(--color-accent-glow)',
        'glow-lg': '0 0 40px rgba(0, 191, 255, 0.3)',
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