import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import SideBar from '../components/SideBar';

export default function Estados() {
  // Estado para almacenar las respuestas del formulario
  const [estados, setEstados] = useState('');

  // Función para manejar cambios en el estado de ánimo
  const handleEstadosChange = (e) => {
    setEstados(e.target.value);
  };

  // Función para enviar el formulario
  const handleSubmit = (e) => {
    e.preventDefault();
    // Aquí puedes realizar alguna acción con los datos (enviar a la base de datos, etc.)
    console.log('Estado de ánimo registrado:', estados);
  };

  return (
    <div>
      <SideBar />
      <div className="p-16 pt-20 sm:ml-64" data-aos="fade-up">
        <div className="flex justify-center">
          <form onSubmit={handleSubmit} className="max-w-md w-full bg-white p-8 rounded-lg shadow-md mt-8 md:mt-16">
            <h1 className="text-3xl font-bold mb-8 text-center">Registro de Estado de ánimo</h1>
            <div className="mb-4">
              <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="estados">
                Estado de ánimo:
              </label>
              <input
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                id="estados"
                type="text"
                placeholder="Ingresa tu estado de ánimo"
                value={estados}
                onChange={handleEstadosChange}
              />
            </div>
            <div className="mb-4">
              <label className="block text-gray-700 text-sm font-bold mb-2">Seleccionar estado de ánimo:</label>
              <div className="flex items-center justify-between">
                <button
                  className="text-3xl"
                  onClick={() => setEstados('😊')}
                >
                  😊
                </button>
                <button
                  className="text-3xl"
                  onClick={() => setEstados('😐')}
                >
                  😐
                </button>
                <button
                  className="text-3xl"
                  onClick={() => setEstados('😔')}
                >
                  😔
                </button>
              </div>
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
    </div>
  );
}
