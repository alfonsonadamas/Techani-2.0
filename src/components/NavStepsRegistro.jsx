import React, { useEffect } from "react";
import TechaniLogo from "../assets/img/Techani (1).png";

export default function NavStepsRegistro({ data }) {
  useEffect(() => {
    console.log(data);
  }, [data]);
  return (
    <div className="flex flex-row bg-white shadow-md fixed w-full">
      <div className="flex justify-between items-center px-14  py-3"
        style={{ borderRight: '1px solid black' }}>
        <img src={TechaniLogo} alt="techaniLogo" width="50px" height="50px" />
        <h1 className="px-2 text-lg font-semibold">Techani</h1>
      </div>
      <div className="flex justify-between items-center px-20">
        <h1 className="mr-2 font-semibold text-2xl">Registro de Usuario</h1>
      </div>
    </div>
  );
}