import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import SideBar from '../components/SideBar';
import { supabase } from "../config/supabase";

export default function Estados() {
  // Estado para almacenar las respuestas del formulario
  const [estados, setEstados] = useState('');
  const [error, setError] = useState('');
  const [SaveSuccessfully, setSaveSuccessfully] = useState(false);

  
    const handleMoodChange = (idEmocion, value) => {
      setEstados({ idEmocion, value });
      setSaveSuccessfully(false);
      setError('');
    };

  const handleSubmit = async (event) => {
    event.preventDefault();


    if (!estados || !estados.idEmocion ){
      setError('Seleccione un estado de animo, por favor');
      return;
    }
  
    try {
      // Obtener el idEmocion y value del estado de ánimo seleccionado
      const { idEmocion, value } = estados;
  
      // Realizar la lógica para guardar en la tabla 'emociones' en la base de datos
      const { data, error } = await supabase
        .from('emociones')
        .upsert([
          {
            idEmocion,

          },
        ]);
  
      if (error) {
        throw error;
      }
      
      console.log('Estado de ánimo guardado exitosamente:', data);
      
      setSaveSuccessfully(true);


      //ocultar mensaje de exito despues de 3 segundos
      setTimeout(() => {
        setSaveSuccessfully(false);
      }, 3000);
  
      // Puedes realizar acciones adicionales después de guardar en la base de datos
    } catch (error) {

      setError('Error al guardar el estado de ánimo en la base de datos, verifique su conexion');
      console.error(error);
    }
  };


  return (
    <div>
      <SideBar />
      <div className="p-16 pt-20 sm:ml-64" data-aos="fade-up">
      <label htmlFor="day" className="block mb-1">Registro del estado de ánimo:</label>
      
          <form onSubmit={handleSubmit}>
            
            ¿Como te sientes hoy?

          <div className="mb-4">
            <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
            
            </label>
              
            </div>

            <div className="mb-4">
            <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
            Seleccionar estado de ánimo:
            </label>
              {/* <label className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">Seleccionar estado de ánimo:</label> */}
              
              <div className="flex items-center justify-between h-20">
              <button type="button" style={{ fontSize: '2.5rem', lineHeight: '1', width: '4rem', height: '4rem', backgroundColor: estados.idEmocion === 1 ? '#1a56db' : '#ffffff',transition: 'background-color 0.3s ease'}} 
                      className=" hover:bg-blue-700 rounded-full flex items-center justify-center"
                      onClick={() => handleMoodChange(1,'😊')}>😊</button>


              <button type="button" style={{ fontSize: '2.5rem', lineHeight: '1', width: '4rem', height: '4rem', backgroundColor: estados.idEmocion === 2 ? '#1a56db' : '#ffffff',transition: 'background-color 0.3s ease'}} 
                      className=" hover:bg-blue-700 rounded-full flex items-center justify-center"
                      onClick={() => handleMoodChange(2,'😐')}>😐</button>


              <button type="button" style={{ fontSize: '2.5rem', lineHeight: '1', width: '4rem', height: '4rem', backgroundColor: estados.idEmocion === 3 ? '#1a56db' : '#ffffff',transition: 'background-color 0.3s ease'}} 
                      className=" hover:bg-blue-700 rounded-full flex items-center justify-center"
                      onClick={() => handleMoodChange(3,'😔')}>😔</button>
              
              </div>

              
              {error && <p className="text-red-500 text-sm mt-1">{error}</p>}
              {SaveSuccessfully && (
                      <p className="text-green-500 text-sm mt-1">Guardado exitosamente</p>
              )}

            </div>
            <div className="flex items-center justify-between">
            <button type="submit" className="bg-blue-700 text-white py-2 px-4 rounded-md hover:bg-blue-800">Guardar</button>
              <Link
                to="/"
                className="inline-block align-baseline font-bold text-sm text-blue-500 hover:text-blue-800"
              >
                Volver
              </Link>
            </div>
          </form>
        </div>
      </div>
    
  );
}
