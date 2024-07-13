/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        "noto": "Noto Sans, sans-serif",
        "poppins": "'Poppins', sans-serif"
      },
      boxShadow: {
        "border": "0 0 0 2px theme(colors.amber.500)"
      }
    },
  },
  plugins: [],
}

