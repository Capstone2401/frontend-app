/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {},
  },
  plugins: [require("daisyui")],

  daisyui: {
    themes: [
      {
        mytheme: {
          primary: "#F1D492",
          secondary: "#D68A2E",
          accent: "#9D5517",
          neutral: "#07040c",
          "base-100": "#3C3838",
          info: "#93c5fd",
          success: "#c084fc",
          warning: "#c88400",
          error: "#ff92a6",
        },
      },
    ],
  },
};
