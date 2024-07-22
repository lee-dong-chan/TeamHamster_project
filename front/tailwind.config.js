/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {},
  },
  plugins: [
    function ({ addUtilities }) {
      const clipPathUtilities = {};

      for (let i = 0; i <= 50; i++) {
        clipPathUtilities[`.clip-inset-${i}`] = {
          "clip-path": `inset(0 ${100 - i * 2}% 0 0)`,
        };
      }

      addUtilities(clipPathUtilities, ["responsive", "hover"]);
    },
    require("tailwind-scrollbar-hide"),
  ],
};
