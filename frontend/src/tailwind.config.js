/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}", // Scan all relevant files in src
  ],
  darkMode: 'class', // Enable class-based dark mode
  theme: {
    extend: {
      colors: {
        // You can add custom colors here if you wish
        'primary': '#8B5CF6', // Example: A purple color
        'primary-hover': '#7C3AED',
      }
    },
  },
  plugins: [
    require('@tailwindcss/forms'), // A plugin for better default form styles
  ],
}