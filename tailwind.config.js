/** @type {import('tailwindcss').Config} */
export default {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx}',
    './src/components/**/*.{js,ts,jsx,tsx}',
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
        login: "url('./src/images/bg-login.png')",
        main: "url('./src/images/bg-main.png')",
        logo: "url('./src/images/moore-logo.png')",
      },
      colors: {
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
    },
  },
  plugins: [require('daisyui')],
}
