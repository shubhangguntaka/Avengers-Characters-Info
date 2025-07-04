/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        avengers: ["'Avengers'", 'sans-serif'], // Use a custom font for the Avengers theme
        sans: ['"Roboto"', 'sans-serif'], // Use a modern font similar to the design
      },
    },
  },
  plugins: [],
};