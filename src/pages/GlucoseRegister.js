import React from "react";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { useUserContext } from "../context/UserContext";
import { Resend } from "resend";
import SideBar from "../components/SideBar";

export default function GlucoseRegister() {
  const navigate = useNavigate();
  const { user } = useUserContext();
  const [glucose, setGlucose] = useState(0);
  const resend = new Resend("re_2R3omFr2_GXejY65dkZDwD2onJYeyomLv");

  const sendEmail = async (e) => {
    e.preventDefault();
    try {
      const data = await resend.emails.send({
        from: "Acme <onboarding@resend.dev>",
        to: ["webtechani@gmail.com"],
        subject: "hello world",
        text: "it works!",
      });
      console.log(data);
    } catch (error) {
      console.log(error);
    }
    console.log("hola");
  };

  return (
    <div>
      <SideBar />
      <div className="p-16 pt-20 sm:ml-64" data-aos="fade-up">
        <ol class="flex items-center w-full text-sm font-medium text-center text-gray-500 dark:text-gray-400 sm:text-base">
          <li class="flex md:w-full items-center  dark:text-blue-500 sm:after:content-[''] after:w-full after:h-1 after:border-b after:border-gray-200 after:border-1 after:hidden sm:after:inline-block after:mx-6 xl:after:mx-10 dark:after:border-gray-700">
            <span class="flex items-center text-base after:content-['/'] sm:after:hidden after:mx-2 after:text-gray-200 dark:after:text-gray-500">
              <span class="me-2">1</span>
              Registro
            </span>
          </li>
          <li class="flex md:w-full items-center after:content-[''] after:w-full after:h-1 after:border-b after:border-gray-200 after:border-1 after:hidden sm:after:inline-block after:mx-6 xl:after:mx-10 dark:after:border-gray-700">
            <span class="flex items-center text-base after:content-['/'] sm:after:hidden after:mx-2 after:text-gray-200 dark:after:text-gray-500">
              <span class="me-2">2</span>
              Insulina
            </span>
          </li>
          <li class="flex items-center text-base">
            <span class="me-2 ">3</span>
            Otros
          </li>
        </ol>
        <div className="w-full flex justify-center ">
          <div className=" w-full">
            <form class="mx-auto w-full ">
              <p class=" mb-2 text-sm text-gray-900 dark:text-white w-full">
                ¡Hola! <br /> Para mantener un control detallado de tu salud, es
                crucial registrar con precisión tus niveles de glucosa. Para
                esto es necesario que hagas una medicion con tu glucometro e
                introduzcas el resultado en el siguiente campo.
              </p>
              <input
                type="number"
                id=""
                aria-describedby="helper-text-explanation"
                class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5  dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                placeholder="Ingresa tu medición de glucosa aquí"
              />

              <button className="bg-azul text-white px-4" onClick={sendEmail}>
                Registrar
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
