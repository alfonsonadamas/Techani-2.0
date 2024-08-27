import React, { useEffect, useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useUserContext } from "../context/UserContext";
import fondo from "../assets/img/techani_mainFondo.jpg";
import logo from "../assets/img/Techani (1).png";
import perfil from "../assets/img/perfil 1.png";

const Index = () => {
  const { user } = useUserContext();
  const navigate = useNavigate();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    if (user) {
      navigate("/dashboard");
    }
  }, [navigate, user]);

  const toggleMobileMenu = () => {
    setMobileMenuOpen(!mobileMenuOpen);
  };

  return (
    <div
      className="h-screen flex flex-col bg-cover bg-center"
      style={{ backgroundImage: `url(${fondo})` }}
    >
      <nav className="flex h-24 w-auto items-center justify-between bg-white">
        <div className="flex items-center md:justify-between ">
          <div className="flex items-center md:border-black md:border-r-2 pl-5 pr-8 sm:px-12">
            <img src={logo} alt="techaniLogo" width="60px" height="60px" />
            <p className="font-fuenteTechani text-azul ml-5">TECHANI</p>
          </div>
          <div>
            <p className="sm:px-6 md:px-8 lg:px-10 xl:px-12">
              La salud en tus manos
            </p>
          </div>
        </div>

        <div className="mr-10 md:hidden relative">
          <button
            onClick={toggleMobileMenu}
            className="text-azulSecundario focus:outline-none text-[30px]"
          >
            ☰
          </button>

          {/* Menú de hamburguesa para dispositivos móviles */}
          <div
            className={`fixed top-0 left-0 w-3/4 h-full bg-white z-50 overflow-hidden transition-transform transform ${
              mobileMenuOpen ? "translate-x-0" : "-translate-x-full"
            }`}
          >
            <div className="flex justify-end p-4">
              <button
                onClick={toggleMobileMenu}
                className="text-azulSecundario focus:outline-none text-[30px]"
              >
                &#xd7;
              </button>
            </div>

            <ul className="flex flex-col items-center">
              <li className="my-2">
                <Link to="/signup" className="text-azulSecundario font-bold">
                  Registrarse
                </Link>
              </li>
              <li className="my-2">
                <Link to="/login" className="text-azulSecundario font-bold">
                  Iniciar Sesión
                </Link>
              </li>
              <li className="my-2">
                <a href="login.php">
                  <img src={perfil} alt="" width="60" height="" />
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="mr-10 hidden md:flex">
          <ul className="flex items-center">
            <li className="mx-14">
              <Link to="/signup">Registrarse</Link>
            </li>
            <li>
              <Link to="/login" className="mr-5 text-azulSecundario font-bold">
                Iniciar Sesión
              </Link>
            </li>
            <li>
              <a href="login.php">
                <img src={perfil} alt="" width="60" height="" />
              </a>
            </li>
          </ul>
        </div>
      </nav>

      <div className="flex-grow flex flex-col items-end justify-center ">
        <div
          className="w-full flex justify-center sm:w-5/12"
          data-aos="fade-up"
        >
          <div className="my-3 pl-20 pr-20 flex flex-col justify-center">
            <h3 className="font-bold text-[6vw] sm:text-[3vw] mb-2 text-white">
              ¿QUÉ ES TECHANI?
            </h3>
            <p className="text-[5vw] sm:text-[2vw] text-white text-justify ">
              En Techani, entendemos a los usuarios y la importancia de brindar
              una experiencia integral en el control y monitoreo de la diabetes
              tipo 1.
            </p>

            <div className="flex flex-col justify-around sm:flex sm:flex-row mt-10">
              <Link
                to={"/signup"}
                className="bg-azulFondo mb-[7px] sm:mb-0 lg:mr-[7px] text-center transition duration-300 ease-out hover:ease-out hover:bg-azulSecundario hover:shadow-2xl  px-7 py-1 rounded-lg text-white"
              >
                Registrarse
              </Link>

              <Link
                to={"/login"}
                className="bg-azulFondo transition text-center duration-300 ease-out hover:ease-out hover:bg-azulSecundario hover:shadow-2xl  px-7 py-1 rounded-lg text-white"
              >
                Iniciar Sesión
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Index;