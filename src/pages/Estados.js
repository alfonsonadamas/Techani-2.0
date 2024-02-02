import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import SideBar from '../components/SideBar';

export default function Estados() {
  // Estado para almacenar las respuestas del formulario
  const [estados, setEstados] = useState('');
  const [error, setError] = useState('');

  // Función para manejar cambios en el estado de ánimo
  const handleMoodChange = (e) => {
    setEstados(e.target.value);
    setError(''); // Limpiar el mensaje de error al cambiar el estado de ánimo
  };

  // Función para enviar el formulario
  const handleSubmit = (e) => {
    e.preventDefault();
    //acciónes con los datos (enviar a la base de datos, etc.)
    if (!estados.trim()) {
      setError('Por favor, selecciona un estado de ánimo.'); // Mostrar mensaje de error si el campo está vacío
      return;
    }
    
    console.log('Estado de ánimo registrado:', estados);
  };

  return (
    <div>
      <SideBar />
      <div className="p-16 pt-20 sm:ml-64" data-aos="fade-up">
      <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
          Registro del estado de ánimo
        </label>
          <form onSubmit={handleSubmit} className="max-w-md w-full bg-white p-8 rounded-lg shadow-md mt-8 md:mt-16">
            
            <div className="mb-4">
              <label className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" htmlFor="estados">
                Estado de ánimo:
              </label>
              <input
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                id="estados"
                type="text"
                placeholder="Ingresa tu estado de ánimo"
                value={estados}
                onChange={handleMoodChange}
              />
            </div>
            <div className="mb-4">
              <label className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">Seleccionar estado de ánimo:</label>
              <div className="flex items-center justify-between">
              <button type="button" className="text-3xl" onClick={() => handleMoodChange({ target: { value: '😊' } })}>😊</button>
              <button type="button" className="text-3xl" onClick={() => handleMoodChange({ target: { value: '😐' } })}>😐</button>
              <button type="button" className="text-3xl" onClick={() => handleMoodChange({ target: { value: '😔' } })}>😔</button>
              
              </div>
              {error && <p className="text-red-500 text-sm mt-1">{error}</p>} {/* Mostrar mensaje de error si existe */}
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
