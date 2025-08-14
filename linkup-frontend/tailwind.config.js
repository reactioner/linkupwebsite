/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          50: '#eff6ff',
          500: '#3b82f6',
          600: '#2563eb',
          700: '#1d4ed8',
        },
        linkedin: {
          500: '#0077b5',
          600: '#005885',
        }
      },
    },
  },
  plugins: [
    require('@tailwindcss/forms'),
  ],
}

