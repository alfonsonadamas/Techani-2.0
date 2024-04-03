import React, { useState, useEffect } from 'react';
import { createClient } from '@supabase/supabase-js';
import { useUserContext } from "../context/UserContext";
import { supabase } from '../config/supabase'; 
import SideBar from "../components/SideBar";
import { useNavigate } from 'react-router-dom';

function MyDates() {
  const [citas, setCitas] = useState([]);
  const [eliminada, setEliminada] = useState(false);
  const { user } = useUserContext(); 
  const navigate = useNavigate();


  async function obtenerCitas() {
    try {
      const { data, error } = await supabase
        .from('citasMedicas')
        .select('*');
      
      if (error) {
        console.error('Error al obtener citas:', error.message);
        return;
      }
      
      setCitas(data);
    } catch (error) {
      console.error('Error al obtener citas:', error.message);
    }
  }




  // Función para manejar la eliminación de una cita
  const handleEliminarCita = async (idCita) => {
    try {
      console.log("ID de la cita a eliminar:", idCita);

      const { data, error } = await supabase
        .from('citasMedicas')
        .delete()
        .match({ idCita });

      if (error) {
        throw error;
      }
      obtenerCitas();
      
    } catch (error) {
      console.error('Error al eliminar la cita:', error.message);
    }
  };
  


  // Función para manejar la edición de una cita
  const handleEditarCita = (cita) => {
    // Aquí debes implementar la lógica para abrir un formulario de edición
    // y luego actualizar la cita tanto en la lista como en la base de datos.
    console.log("Editar cita:", cita);
  };

  useEffect(() => {
    
    obtenerCitas();
  }, []);

  return (
    <div>
  <SideBar />
  <div className="p-16 pt-20 sm:ml-64" data-aos="fade-up">
    <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
      Mis citas
    </label>
    <ul className="mt-4">
      {Array.isArray(citas) && citas.map((cita, index) => (
        <li key={index} className="mb-4">
          <div className="bg-white shadow-lg rounded-lg p-4 mb-4 dark:bg-gray-800">
            <div className="mb-4">
              <p>Fecha: <span className="font-semibold">{cita.date}</span></p>
              <p>Hora: <span className="font-semibold">{cita.time}</span></p>
              <p>Tipo de cita: <span className="font-semibold">{cita.typecites}</span></p>
              <p>Lugar: <span className="font-semibold">{cita.place}</span></p>
              <p>Nombre del Doctor: <span className="font-semibold">{cita.doctorName}</span></p>
            </div>
            <div className="flex justify-end space-x-2">
              <button className="bg-red-600 text-white py-2 px-4 rounded hover:bg-red-700 transition ease-in duration-200" onClick={() => handleEliminarCita(cita.idCita)}>
                Eliminar
              </button>
              <button className="bg-blue-600 text-white py-2 px-4 rounded hover:bg-blue-700 transition ease-in duration-200" onClick={() => handleEditarCita(cita.idCita)}>
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
