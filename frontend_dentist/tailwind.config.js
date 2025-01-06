// tailwind.config.js
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        'dentist-blue': '#74B9FF',
        'dentist-green': '#A3E4D7',
        'dentist-dark-green': '#2D6A4F',
        'dentist-light-gray': '#BDC3C7',
        'dentist-beige': '#F4F1EE',
        'dentist-dark-blue': '#2C3E50',
      },
    },
  },
  plugins: [],
};
