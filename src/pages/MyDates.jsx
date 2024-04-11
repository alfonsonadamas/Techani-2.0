import React, { useState, useEffect } from "react";
import { supabase } from "../config/supabase";
import SideBar from "../components/SideBar";

function MyDates() {
  const [citas, setCitas] = useState([]);

  // Función para manejar la eliminación de una cita
  const handleEliminarCita = (id) => {
    // Lógica para eliminar la cita con el ID proporcionado
    console.log("Eliminar cita con ID:", id);
  };

  // Función para manejar la edición de una cita
  const handleEditarCita = (cita) => {
    // Lógica para editar la cita proporcionada
    console.log("Editar cita:", cita);
  };

  useEffect(() => {
    async function obtenerCitas() {
      try {
        const { data, error } = await supabase.from("citasMedicas").select("*");

        if (error) {
          console.error("Error al obtener citas:", error.message);
          return;
        }

        setCitas(data);
      } catch (error) {
        console.error("Error al obtener citas:", error.message);
      }
    }

    obtenerCitas();
  }, []);

  return (
    <div>
      <SideBar />
      <div className="p-16 pt-20 sm:ml-64" data-aos="fade-up">
        <label className="block text-gray-900 dark:text-white text-2xl mb-5 font-semibold">
          Mis citas
        </label>
        <ul className="mt-4">
          {Array.isArray(citas) &&
            citas.map((cita, index) => (
              <li key={index} className="mb-4">
                <div className="border border-gray-300 p-4 rounded-md">
                  <p>Fecha: {cita.date}</p>
                  <p>Hora: {cita.time}</p>
                  <p>Tipo de cita: {cita.typecites}</p>
                  <p>Lugar: {cita.place}</p>
                  <p>Nombre del Doctor: {cita.doctorName}</p>
                  <div className="mt-4 flex justify-end">
                    <button
                      className="mr-2 bg-red-500 hover:bg-red-600 text-white py-2 px-4 rounded-md"
                      onClick={() => handleEliminarCita(cita.id)}
                    >
                      Eliminar
                    </button>
                    <button
                      className="bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded-md"
                      onClick={() => handleEditarCita(cita)}
                    >
                      Editar
                    </button>
                  </div>
                </div>
              </li>
            ))}
        </ul>
      </div>
    </div>
  );
}

export default MyDates;
