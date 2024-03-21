import React from "react";
import { Link } from "react-router-dom";
import TechaniLogo from "../assets/img/Techani negro letras.png";

export default function NavRegsitro(props) {
  const { data } = props;
  return (
    <div>
      <div className="flex justify-between items-center px-20  py-3">
        <img src={TechaniLogo} alt="techaniLogo" width="80px" height="80px" />
        <Link
          to={data === "login" ? "/signup" : "/login"}
          className="relative inline-block transition-all duration-300 hover:text-azulSecundario"
        >
          {data === "login" ? "Crear Cuenta" : "Iniciar Sesión"}
        </Link>
      </div>
    </div>
  );
}
