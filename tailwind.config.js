/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{html,ts}"],
  theme: {
    extend: {
      fontFamily: {
        sans: [
          "Outfit",
          "Inter",
          "system-ui",
          "Roboto",
          "sans-serif",
          " -apple-system",
          "BlinkMacSystemFont",
          "Segoe UI",
          "Helvetica",
          "Apple Color Emoji",
          "Segoe UI Emoji",
          "Segoe UI Symbol",
        ],
      },
    },
  },
  plugins: [],
};
