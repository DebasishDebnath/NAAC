const theme = require("./theme");

module.exports = {
  darkMode: "class",
  content: ["./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: theme.colors,
      borderRadius: theme.borderRadius,
      fontFamily: theme.fontFamily,
    },
  },
  plugins: [],
};
