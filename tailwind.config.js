/** @type {import('tailwindcss').Config} */
export default {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx}',
    './src/components/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {
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
      },
    },
  },
  plugins: [],
}
