import React, { useState } from "react";
import SideBar from "../components/SideBar";
import { Formik } from "formik";
import { supabase } from "../config/supabase";
import { useUserContext } from "../context/UserContext";
import pdf from "../assets/img/pdf.png";

export default function MyFiles() {
  return (
    <div>
  <SideBar></SideBar>
  <div className="p-16 pt-24 sm:ml-64" data-aos="fade-up">
    <h2 className="text-2xl font-semibold">Mis Analisis Clinicos</h2>
    <span>Seleccione una fecha:</span>
    <input
      type="date"
      className="my-8 mx-3 w-48 text-center border-gray-400 rounded-xl"
    ></input>

    <div className="flex flex-row w-full h-full flex-wrap ">
      <div className="m-2 flex flex-col items-center">
        <img src={pdf} width={120} alt="pdf" />
        <span>Analisis de Glucosa</span>
      </div>
    </div>

   <div className="flex mt-4 space-x-4">
      <button
        type="submit"
        className="flex items-center justify-between bg-azulHover transition duration-300 ease-out hover:ease-out hover:bg-azul px-4 py-1 rounded-lg text-white"
      >
        Guardar
      </button>

      <button
        type="button"
        className="flex items-center justify-between bg-green-600 transition duration-300 ease-out hover:ease-out hover:bg-green-500 px-4 py-1 rounded-lg text-white"
      >
        Ver
      </button>

      <button
        type="button"
        className="flex items-center justify-between bg-red-700 transition duration-300 ease-out hover:ease-out hover:bg-red-500 px-4 py-1 rounded-lg text-white"
      >
        Eliminar
      </button>
    </div>
  </div>
</div>

  
  );
}
