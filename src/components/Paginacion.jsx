import React from "react";

const Paginacion = ({ currentPage, totalPages, onPageChange }) => {
  const pages = [...Array(totalPages).keys()].map((num) => num + 1);

  return (
    <div className="flex justify-center space-x-2 my-4">
      {/* Botón "Anterior" */}
      <button
        onClick={() => onPageChange(currentPage - 1)}
        disabled={currentPage === 1}
        className={`px-4 py-2 ${
          currentPage === 1 ? "bg-gray-300" : "bg-blue-500 text-white"
        } rounded`}
      >
        Anterior
      </button>

      {/* Números de páginas */}
      {pages.map((page) => (
        <button
          key={page}
          onClick={() => onPageChange(page)}
          className={`px-4 py-2 rounded ${
            currentPage === page ? "bg-blue-600 text-white" : "bg-gray-200"
          }`}
        >
          {page}
        </button>
      ))}

      {/* Botón "Siguiente" */}
      <button
        onClick={() => onPageChange(currentPage + 1)}
        disabled={currentPage === totalPages}
        className={`px-4 py-2 ${
          currentPage === totalPages ? "bg-gray-300" : "bg-blue-500 text-white"
        } rounded`}
      >
        Siguiente
      </button>
    </div>
  );
};

export default Paginacion;
