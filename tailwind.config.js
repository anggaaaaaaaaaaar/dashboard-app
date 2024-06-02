/** @type {import('tailwindcss').Config} */
export default {
  content: ["./src/**/*.{html,js,jsx,ts,tsx}"],
  darkMode: "selector",
  theme: {
    extend: {
      colors: {
        dark: "#141414",
      },
      fontSize: {
        xxs: "10px",
      },
    },
  },
  plugins: [],
};
