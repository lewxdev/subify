/* eslint-env node */
/* eslint-disable @typescript-eslint/no-require-imports */

const { fontFamily } = require("tailwindcss/defaultTheme");

/** @type {import("tailwindcss").Config} */
module.exports = {
  mode: "jit",
  darkMode: "class",
  content: ["./src/**/*.tsx"],
  theme: {
    extend: {
      fontFamily: {
        sans: ["var(--font-sans)", ...fontFamily.sans],
      },
      keyframes: {
        shake: {
          "0%, 100%": {
            transform: "translateX(0)",
          },
          "10%, 30%, 50%, 70%, 90%": {
            transform: "translateX(-10px)",
          },
          "20%, 40%, 60%, 80%": {
            transform: "translateX(10px)",
          },
        },
      },
      animation: {
        shake: "shake 0.6s ease-in-out 0.25s 1",
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
};
