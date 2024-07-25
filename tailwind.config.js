/** @type {import('tailwindcss').Config} */
const flowbite = require("flowbite-react/tailwind");
module.exports = {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}", flowbite.content()],
  theme: {
    extend: {
      fontFamily: {
        popins: ["Poppins", "sans-serif"],
      },
    },
  },
  plugins: [
    flowbite.plugin(),
  ],
};
