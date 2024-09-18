/** @type {import('tailwindcss').Config} */
module.exports = {
  // NOTE: Update this to include the paths to all of your component files.
  content: ["./app/**/*.{js,jsx,ts,tsx}", "./components/**/*.{js,jsx,ts,tsx}"],
  presets: [require("nativewind/preset")],
  theme: {
    extend: {
      fontFamily: {
        barlow: ["Barlow-Black", "sans-serif"],
        "barlow-thin":["Barlow-Thin", "sans-serif"],
        "barlow-light": ["Barlow-Light", "sans-serif"],
        "barlow-medium":["Barlow-Medium", "sans-serif"],
        "barlow-bold": ["Barlow-Bold", "sans-serif"]
      }
    },
  },
  plugins: [],
}