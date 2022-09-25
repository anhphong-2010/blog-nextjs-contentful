module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
    "./layouts/**/*.{js,ts,jsx,tsx}",
    "./ctf/**/*.{js,ts,jsx,tsx}",
  ],

  darkMode: "class", // or 'media' or 'class'
  theme: {
    extend: {
      colors: {
        "regal-blue": "#243c5a",
        dark: "rgba(31, 41, 55 ,1)",
      },
      keyframes: {
        slideY: {
          "0%": { transform: "translateY(0px)" },
          "30%": { transform: "translateY(12px)" },
          "60%": { transform: "translateY(10px)" },
          "60%": { transform: "translateY(8px)" },
          "100%": { transform: "translateY(0px)" },
        },
      },
      animation: {
        fly: "slideY 4s linear infinite",
      },
    },
  },
  variants: {
    extend: {},
  },
  corePlugins: {
    container: false,
  },
  plugins: [
    function ({ addComponents }) {
      addComponents({
        ".container": {
          maxWidth: "100%",
          "@screen sm": {
            maxWidth: "600px",
          },
          "@screen md": {
            maxWidth: "700px",
          },
          "@screen lg": {
            maxWidth: "1024px",
          },
          "@screen xl": {
            maxWidth: "1200px",
          },
        },
      });
    },
  ],
};
