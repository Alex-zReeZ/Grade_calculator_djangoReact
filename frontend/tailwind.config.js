/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      backgroundImage: {
        "math-bg": "url('/public/img/Maths.jpeg')",
        "French-bg": "url('/public/img/French.jpeg')",
        "English-bg": "url('/public/img/English.jpeg')",
      }
    },
  },
  plugins: [],
};
