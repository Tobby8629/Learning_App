/** @type {import('tailwindcss').Config} */
module.exports = {
  // NOTE: Update this to include the paths to all of your component files.
  content: ["./app/**/*.{js,jsx,ts,tsx}", "./components/**/*.{js,jsx,ts,tsx}"],
  presets: [require("nativewind/preset")],
  theme: {
    extend: {
      fontFamily: {
        "monserrat": ["Monserrat_Black", "sans-serif"],
        "monserrat-thin":["Monserrat_Thin", "sans-serif"],
        "monserrat-light": ["Monserrat_Light", "sans-serif"],
        "monserrat-medium":["Monserrat_Medium", "sans-serif"],
        "monserrat-semiBold":["Monserrat_SemiBold", "sans-serif"],
        "monserrat-bold": ["Monserrat_Bold", "sans-serif"],
        "monserrat-italic": ["Monserrat_Italic", "sans-serif"],
      }
    },
  },
  plugins: [],
}