/** @type {import('tailwindcss').Config} */
import { content as _content, plugin } from "flowbite-react/tailwind";
export const content = ["./index.html", "./src/**/*.{js,ts,jsx,tsx}", _content()];
export const theme = {
  extend: {
    fontFamily: {
      popins: ["Poppins", "sans-serif"],
    },
  },
};
export const plugins = [
  plugin(),
];
