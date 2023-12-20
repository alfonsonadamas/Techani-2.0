import React from "react";
import { useNavigate, Link } from "react-router-dom";
import { useEffect } from "react";
import { useUserContext } from "../context/UserContext";

import fondo from "../assets/img/techani_mainFondo.jpg";
import logo from "../assets/img/Techani (1).png";
import perfil from "../assets/img/perfil 1.png";

export default function Index() {
  const { user } = useUserContext();
  const navigate = useNavigate();
  useEffect(() => {
    if (user) {
      navigate("/dashboard");
    }
  }, [navigate, user]);

  return (
    <div
      className="h-screen flex flex-col bg-cover bg-center"
      style={{ backgroundImage: `url(${fondo})` }}
    >
      <nav className="flex h-24 items-center justify-between bg-white">
        <div className="flex items-center ">
          <div className="flex items-center border-black border-r-2 px-12">
            <img src={logo} alt="techaniLogo" width="60px" height="60px" />
            <p className="font-fuenteTechani text-azul ml-5">TECHANI</p>
          </div>
          <div>
            <p className="px-12">La salud en tus manos</p>
          </div>
        </div>

        <div className="mr-10">
          <ul className="flex items-center">
            <li className="mx-14 ">
              <a href="registroCorreo.php">Registrarse</a>
            </li>
            <li>
              <Link
                to={"/login"}
                className="mr-5 text-azulSecundario font-bold"
              >
                Iniciar Sesion
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
        <div className="w-5/12" data-aos="fade-up">
          <img src="" alt="" width="300" height="" />
          <div className="h-1 w-32 bg-azulBorde"></div>
          <div className="my-3 mr-14">
            <h3 className="font-bold text-4xl mb-2 text-white">
              ¿QUÉ ES TECHANI?
            </h3>
            <p className="text-3xl text-white text-justify ">
              En Techani, entendemos a los usuarios y la importancia de brindar
              una experiencia integral en el control y monitoreo de la diabetes
              tipo 1 y 2.
            </p>
            <div className="flex justify-around mt-10">
              <Link
                to={"/"}
                className="bg-azulFondo transition duration-300 ease-out hover:ease-out hover:bg-azulSecundario hover:shadow-2xl  px-7 py-1 rounded-lg text-white"
              >
                Registrarse
              </Link>

              <Link
                to={"/login"}
                className="bg-azulFondo transition duration-300 ease-out hover:ease-out hover:bg-azulSecundario hover:shadow-2xl  px-7 py-1 rounded-lg text-white"
              >
                Iniciar Sesión
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
