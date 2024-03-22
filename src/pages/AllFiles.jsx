import React from "react";
import SideBar from "../components/SideBar";

export default function AllFiles() {
  return (
    <div>
      <SideBar />
      <div className="p-16 pt-20 sm:ml-64" data-aos="fade-up">
        <div className="w-full h-60 flex justify-center items-center">
          <div className=" w-full">
            <h1 className="text-3xl font-bold text-center">
              Archivos de tu cuenta
            </h1>
            <p className="text-center text-gray-500">
              Aquí podrás ver y descargar tus archivos
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
