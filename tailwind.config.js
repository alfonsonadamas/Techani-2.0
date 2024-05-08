/** @type {import('tailwindcss').Config} */

module.exports = {
  content: [
    "./src/**/*.{html,js}",
    "./public/index.html",
    "./src/pages/Login.jsx",
    "./src/components/Sidebar.jsx",
    "./src/pages/GlucoseRegister.jsx",
    "./src/components/Modal.jsx",
    "./src/pages/Profile.jsx",
    "./node_modules/flowbite-react/lib/esm/**/*.js",
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
        azulHover: "#2B8EDE",
      },
    },
  },
  plugins: [require("flowbite/plugin")],
};
