import React, { useEffect, useState } from 'react';
import { createClient } from '@supabase/supabase-js';
import SideBar from '../components/SideBar';

function MyDates() {
  const [citas, setCitas] = useState([]);

  useEffect(() => {
    async function obtenerCitas() {
      // Configura el cliente Supabase
      const supabaseUrl = 'https://techani.supabase.co';
      const supabaseKey = 'TU_CLAVE_API_DE_SUPABASE';
      const supabase = createClient(supabaseUrl, supabaseKey);

      try {
        // Realiza una consulta a la tabla de citas
        const { data, error } = await supabase
          .from('citas')
          .select('*'); // Puedes seleccionar los campos que desees aquí
        
        // Maneja los errores
        if (error) {
          console.error('Error al obtener citas:', error.message);
          return;
        }
        
        // Establece las citas obtenidas en el estado
        setCitas(data || []);
      } catch (error) {
        console.error('Error al obtener citas:', error.message);
      }
    }

    // Llama a la función para obtener citas cuando el componente se monta
    obtenerCitas();
  }, []); // El segundo argumento de useEffect, [] en este caso, asegura que la función se ejecute solo una vez al montar el componente

  return (
    <div>
      <SideBar />
      <h2>Mis Citas</h2>
      <ul>
        {Array.isArray(citas) && citas.map((cita, index) => (
          <li key={index}>
            <p>Fecha: {cita.date}</p>
            <p>Hora: {cita.time}</p>
            <p>Tipo de cita: {cita.appointmentType}</p>
            <p>Lugar: {cita.location}</p>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default MyDates;

