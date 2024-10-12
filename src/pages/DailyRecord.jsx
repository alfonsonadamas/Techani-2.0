import React, { useState } from "react";
import SideBar from "../components/SideBar";
import { Link } from "react-router-dom";
import LogoGlucoseRegister from "../assets/img/sugar-blood-level.png";
import LogoInsulineRegister from "../assets/img/vaccine.png";
import LogoWaterRegister from "../assets/img/water-bottle.png";
import LogoEmotionRegister from "../assets/img/emotional.png";

export default function GlucoseRegisterMain() {
  const [mouseEnter, setMouseEnter] = useState(false);
  const [mouseEnter2, setMouseEnter2] = useState(false);
  const [mouseEnter3, setMouseEnter3] = useState(false);
  const [mouseEnter4, setMouseEnter4] = useState(false);

  const handleEnter = () => {
    setMouseEnter(true);
  };

  const handleLeave = () => {
    setMouseEnter(false);
  };

  const handleEnter2 = () => {
    setMouseEnter2(true);
  };

  const handleLeave2 = () => {
    setMouseEnter2(false);
  };

  const handleEnter3 = () => {
    setMouseEnter3(true);
  };

  const handleLeave3 = () => {
    setMouseEnter3(false);
  };

  const handleEnter4 = () => {
    setMouseEnter4(true);
  };

  const handleLeave4 = () => {
    setMouseEnter4(false);
  };

  return (
    <div>
      <SideBar></SideBar>
      <div className="p-16 pt-16 sm:ml-64" data-aos="fade-up">
        <div className="mt-5 ">
          <h1 className="font-semibold text-xl">Registros Disponibles</h1>
          <div className="flex flex-col md:flex-row justify-evenly items-center flex-wrap mt-5">
            <div className="flex border-2 mb-5 border-gray-200 hover:shadow-2xl transition-all duration-300 rounded-lg md:w-2/5  w-full max-w-md mx-auto md:h-52 h-auto">
              <div className="flex flex-col md:flex-row justify-center items-center">
                <div className=" w-1/2 flex justify-center items-center">
                  <div className="md:w-10 md:h-20 lg:h-full lg:w-full mt-5 flex justify-center items-center">
                    <img
                      className="w-2/3 h-4/5 mb-5"
                      src={LogoGlucoseRegister}
                      alt="diabetes-monitor"
                    />
                  </div>
                </div>
                <div className="w-1/2 ">
                  <div className="">
                    <h2 className="mb-3 mt-2 font-semibold text-center">
                      Registro de Glucosa
                    </h2>
                    <p className="text-justify mr-5 mb-5">
                      Registra tus niveles de glucosa y lleva un control de tus
                      niveles de azúcar en la sangre.
                    </p>
                  </div>

                  <div className="flex justify-center mb-5 ">
                    <Link
                      className="flex items-center justify-between bg-azulHover transition duration-300 ease-out hover:ease-out hover:bg-azul  px-7 py-1 rounded-lg text-white"
                      type="submit"
                      onMouseEnter={handleEnter}
                      onMouseLeave={handleLeave}
                      to={"/glucoseRegister"}
                    >
                      Registrar
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke-width="1.5"
                        stroke="currentColor"
                        className={
                          mouseEnter
                            ? "ml-3 w-4 h-4 translate-x-1 duration-300 ease-out"
                            : "ml-3 w-4 h-4 duration-300 ease-out"
                        }
                      >
                        <path
                          stroke-linecap="round"
                          stroke-linejoin="round"
                          d="m8.25 4.5 7.5 7.5-7.5 7.5"
                        />
                      </svg>
                    </Link>
                  </div>
                </div>
              </div>
            </div>

            <div className="flex border-2 mb-5 border-gray-200 hover:shadow-2xl transition-all duration-300 rounded-lg md:w-2/5  w-full max-w-md mx-auto md:h-52 h-auto">
              <div className="flex flex-col md:flex-row justify-center items-center">
                <div className="w-1/2 flex justify-center items-center">
                  <div className="md:w-10 md:h-20 lg:h-full lg:w-full mt-5 flex justify-center items-center">
                    <img
                      className="w-2/3 h-4/5 mb-5"
                      src={LogoInsulineRegister}
                      alt="diabetes-monitor"
                    />
                  </div>
                </div>
                <div className="w-1/2">
                  <h2 className="mb-3 mt-2 font-semibold text-center">
                    Registro de Insulina
                  </h2>
                  <p className="text-justify mr-5 mb-5">
                    Registra tu dosis de insulina y el tipo de medicion que
                    realizaste.
                  </p>
                  <div className="flex justify-center mb-5">
                    <Link
                      to={"/insulineRegister"}
                      className="flex items-center justify-between bg-azulHover transition duration-300 ease-out hover:ease-out hover:bg-azul  px-7 py-1 rounded-lg text-white"
                      type="submit"
                      onMouseEnter={handleEnter2}
                      onMouseLeave={handleLeave2}
                    >
                      Registrar
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke-width="1.5"
                        stroke="currentColor"
                        class={
                          mouseEnter2
                            ? "ml-3 w-4 h-4 translate-x-1 duration-300 ease-out"
                            : "ml-3 w-4 h-4 duration-300 ease-out"
                        }
                      >
                        <path
                          stroke-linecap="round"
                          stroke-linejoin="round"
                          d="m8.25 4.5 7.5 7.5-7.5 7.5"
                        />
                      </svg>
                    </Link>
                  </div>
                </div>
              </div>
            </div>
            <div className="flex border-2 mb-5 border-gray-200 hover:shadow-2xl transition-all duration-300 rounded-lg md:w-2/5  w-full max-w-md mx-auto md:h-52 h-auto">
              <div className="flex flex-col md:flex-row justify-center items-center">
                <div className="w-1/2 flex justify-center items-center">
                  <div className="md:w-10 md:h-20 lg:h-full lg:w-full mt-5 flex justify-center items-center">
                    <img
                      className="w-2/3 h-4/5 mb-5"
                      src={LogoWaterRegister}
                      alt="diabetes-monitor"
                    />
                  </div>
                </div>
                <div className="w-1/2">
                  <h2 className="mb-3 mt-2 font-semibold text-center">
                    Registro de Agua
                  </h2>
                  <p className="text-justify mr-5 mb-5">
                    Registra el agua que has consumido durante el día.
                  </p>
                  <div className="flex justify-center mb-5">
                    <Link
                      to={"/waterRegister"}
                      className="flex items-center justify-between bg-azulHover transition duration-300 ease-out hover:ease-out hover:bg-azul  px-7 py-1 rounded-lg text-white"
                      type="submit"
                      onMouseEnter={handleEnter3}
                      onMouseLeave={handleLeave3}
                    >
                      Registrar
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke-width="1.5"
                        stroke="currentColor"
                        class={
                          mouseEnter3
                            ? "ml-3 w-4 h-4 translate-x-1 duration-300 ease-out"
                            : "ml-3 w-4 h-4 duration-300 ease-out"
                        }
                      >
                        <path
                          stroke-linecap="round"
                          stroke-linejoin="round"
                          d="m8.25 4.5 7.5 7.5-7.5 7.5"
                        />
                      </svg>
                    </Link>
                  </div>
                </div>
              </div>
            </div>

            <div className="flex border-2 mb-5 border-gray-200 hover:shadow-2xl transition-all duration-300 rounded-lg md:w-2/5  w-full max-w-md mx-auto md:h-52 h-auto">
              <div className="flex flex-col md:flex-row justify-center items-center">
                <div className="w-1/2 flex justify-center items-center">
                  <div className="md:w-10 md:h-20 lg:h-full lg:w-full mt-5 flex justify-center items-center">
                    <img
                      className="w-2/3 h-4/5 mb-5"
                      src={LogoEmotionRegister}
                      alt="diabetes-monitor"
                    />
                  </div>
                </div>
                <div className="w-1/2">
                  <h2 className="mb-3 mt-2 font-semibold text-center">
                    Registro de Día Atípico
                  </h2>
                  <p className="text-justify mr-5 mb-5">
                    Registra si en el dia tuviste alguna actividad atípica que
                    pueda afectar tus mediciones.
                  </p>
                  <div className="flex justify-center mb-5">
                    <Link
                      to={"/atipicDayRegister"}
                      className="flex items-center justify-between bg-azulHover transition duration-300 ease-out hover:ease-out hover:bg-azul  px-7 py-1 rounded-lg text-white"
                      type="submit"
                      onMouseEnter={handleEnter4}
                      onMouseLeave={handleLeave4}
                    >
                      Registrar
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke-width="1.5"
                        stroke="currentColor"
                        class={
                          mouseEnter4
                            ? "ml-3 w-4 h-4 translate-x-1 duration-300 ease-out"
                            : "ml-3 w-4 h-4 duration-300 ease-out"
                        }
                      >
                        <path
                          stroke-linecap="round"
                          stroke-linejoin="round"
                          d="m8.25 4.5 7.5 7.5-7.5 7.5"
                        />
                      </svg>
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
