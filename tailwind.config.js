const defaultTheme = require('tailwindcss/defaultTheme')

/** @type {import('tailwindcss').Config} */
export default {
  content: [
    './src/pages/**/**.{html,js,ts,jsx,tsx}',
    './src/components/**/**.{html,js,ts,jsx,tsx}',
    './src/App.tsx',
  ],
  theme: {
    extend: {
      width: {
        icon: '2rem',
        'icon-sm': '1.5rem',
        'icon-lg': '4rem',
        'icon-xl': '6rem',
        'icon-xxl': '8rem',
      },
      container: {
        center: true,
      },
      backgroundImage: {
        logo: "url('/src/images/logo-detailed.png')",
        login: "url('/src/images/bg-login.png')",
        main: "url('/src/images/bg-main.png')",
        noResults: "url('/src/images/no_results.svg')",
        pageNotFound: "url('/src/images/page_not_found.svg')",
      },
      colors: {
        black: '#181818',
        background: '#f9f9f9',
        moore: {
          DEFAULT: '#29aae1',
          dark: '#007baf',
          light: '#6fdcff',
        },
        alert: {
          warning: '#eab308',
          info: '#3b82f6',
          error: '#ef4444',
          success: '#22c55e',
        },
        gray: {
          DEFAULT: '#6b7280',
          light: '#f3f4f6',
          lighter: '#9ca3af',
        },
      },
      keyframes: {
        enterFromBelow: {
          '0%': {
            transform: 'translate3d(0px, 40px, 0px)',
            opacity: 0,
          },
          '100%': {
            transform: 'none',
            opacity: 1,
          },
        },
        appear: {
          '0%': {
            opacity: 0,
          },
          '100%': {
            opacity: 1,
          },
        },
      },
      animation: {
        enterFromBelow: 'enterFromBelow 900ms 0ms 1 both',
        appear: 'appear 900ms 0ms 1 both',
      },
    },
  },
  plugins: [require('daisyui'), require('@headlessui/tailwindcss')],
  daisyui: {
    darkTheme: 'light',
  },
}
