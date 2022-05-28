module.exports = {
  content: ["./src/**/*.{html,js}"],
  theme: {
    container: {
      center: true,
      padding: "2rem",
      borderWidth: {
        150: `150px`,
      },
    },

    minWidth: {
      128: `%50`,
    },

    extend: {
      fontFamily: {
        sans: ["vazir"],
      },
      spacing: {
        50: "40%",
      },

      animation: {
        fade: "fadeOut 5s ease-in-out",
      },
      // that is actual animation
      keyframes: (theme) => ({
        fadeOut: {
          "0%": { backgroundColor: theme("colors.red.300") },
          "100%": { backgroundColor: theme("colors.transparent") },
        },
      }),
    },
  },
  plugins: [
    // require("@tailwindcss/forms"),
    // ...
  ],
};
