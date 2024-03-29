/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      scale: {
        98: ".98",
      },
    },
  },
  plugins: [require("daisyui")],

  daisyui: {
    themes: [
      {
        dark: {
          primary: "#F1D492",
          secondary: "#D68A2E",
          accent: "#9D5517",
          neutral: "#07040c",
          "base-100": "#231f1f",
          info: "#93c5fd",
          success: "#c084fc",
          warning: "#c88400",
          error: "#ff92a6",
        },
        light: {
          primary: "#231f1f",
          secondary: "#07040c",
          accent: "#9D5517",
          neutral: "#F1D492",
          "base-100": "#D68A2E",
          info: "#93c5fd",
          success: "#c084fc",
          warning: "#c88400",
          error: "#ff92a6",
        },
      },
    ],
  },
};
