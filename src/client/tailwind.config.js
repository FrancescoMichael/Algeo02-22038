/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {},
    colors: {
      'semigreen' : '#D9E4DD',
      'dark' : '#555555',
      'semiyellow' : '#FBF7F0',
      'semigrey' : '#F1EFEF',
      'grey' : '#CDC9C3'
    }
  },
  plugins: [],
}