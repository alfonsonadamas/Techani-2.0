import React from "react";

const Modal = ({ isOpen, onClose, children, title, width }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed top-0 left-0 w-full h-full flex items-center justify-center z-50">
      <div className=" absolute w-full h-full bg-gray-900 opacity-50"></div>
      {/* <div className="bg-white w-11/12 md:max-w-md mx-auto rounded shadow-lg z-50 overflow-y-auto"> */}
      <div className={`relative p-4 w-full ${width} max-h-full`}>
        {/* <div className="py-4 text-left px-6"> */}
        <div className="relative bg-white rounded-lg shadow dark:bg-gray-700">
          {/* Encabezado */}
          <div className="flex items-center justify-between p-4 md:p-5 border-b rounded-t dark:border-gray-600 mb-2">
            <h3 className="font-bold text-xl text-gray-900 dark:text-white">
              {title}
            </h3>
            {/* Boton de salida */}
            <button
              className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ms-auto inline-flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white"
              onClick={onClose}
            >
              <svg
                class="w-3 h-3"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 14 14"
              >
                <path
                  stroke="currentColor"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"
                />
              </svg>
              <span class="sr-only">Salir</span>
            </button>
          </div>
          {/* Contenido */}
          <div className="p-4 md:p-5 space-y-4">{children}</div>
        </div>
      </div>
    </div>
  );
};

export default Modal;
