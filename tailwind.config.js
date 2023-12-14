/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{html,js}",
    "./public/index.html",
    "./src/pages/Login.js",
    "./node_modules/flowbite/**/*.js",
  ],
  theme: {
    extend: {
      fontFamily: {
        fuentesec: ["Dancing Script", "cursive"],
        fuenteTechani: ["Open Sans", "sans-serif"],
      },
      colors: {
        azul: "#277BC0",
        azulSecundario: "#4DBDEB",
        amarillo: "#FFE08C",
        fondoGris: "#F6F6F6",
        azulFondo: "#18578B",
      },
    },
  },
  plugins: [require("flowbite/plugin")],
};
