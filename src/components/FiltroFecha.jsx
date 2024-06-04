import React from "react";

export default function FiltroFecha({ eventClick, handleDate1, handleDate2 }) {
  return (
    <div>
      <span>Seleccione un periodo:</span>
      <div className={`mt-5 `}>
        <span>Fecha inicio:</span>
        <input
          type="date"
          onChange={handleDate1}
          className="mx-3 w-48 text-center border-gray-400 rounded-xl"
        ></input>
        <span>Fecha fin:</span>
        <input
          type="date"
          onChange={handleDate2}
          className="mx-3 w-48 text-center border-gray-400 rounded-xl"
        ></input>
        <button
          onClick={() => eventClick()}
          className="bg-blue-500 text-white rounded-lg px-3 py-1.5 ml-3"
        >
          Buscar
        </button>
      </div>
    </div>
  );
}
