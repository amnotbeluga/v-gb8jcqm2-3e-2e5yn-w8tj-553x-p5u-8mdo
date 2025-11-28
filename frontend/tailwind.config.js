/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: '#228B22',    // Forest Green
        accent: {
      DEFAULT: '#E64A19',  // Normal
      dark: '#FF7043',     // Hover shade
    },
        neutral: '#f5f5f5',   // Light Gray
      },
      fontFamily: {
        sans: ['Inter', 'Poppins', 'sans-serif'],
        playfair: ['"Playfair Display"', 'serif'],
      },
    },
  },
  plugins: [],
}