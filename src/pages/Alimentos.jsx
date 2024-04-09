import React, { useState } from 'react';
import SideBar from '../components/SideBar';

export default function Alimentos() {
  const [tipoComida, setTipoComida] = useState('');
  const [tipoAlimento, setTipoAlimento] = useState('');
  const [porcion, setPorcion] = useState('');
  const [alimentosRegistrados, setAlimentosRegistrados] = useState([]);

  const handleTipoComidaChange = (e) => {
    setTipoComida(e.target.value);
  };

  const handleTipoAlimentoChange = (e) => {
    setTipoAlimento(e.target.value);
  };

  const handlePorcionChange = (e) => {
    setPorcion(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const nuevoAlimento = {
      tipoComida,
      tipoAlimento,
      porcion,
    };
    setAlimentosRegistrados([...alimentosRegistrados, nuevoAlimento]);
    // Limpiar los campos después de guardar
    setTipoComida('');
    setTipoAlimento('');
    setPorcion('');
  };

  return (
    <div>
      <SideBar />
      <div className="p-16 pt-20 sm:ml-64" data-aos="fade-up">
        <h2 className="block mb-2 text-2xl font-medium text-gray-900 dark:text-white ">
          Registro de Alimentos
        </h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
              Tipo de comida
            </label>
            <select
              value={tipoComida}
              onChange={handleTipoComidaChange}
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            >
              <option value="">Selecciona...</option>
              <option value="Desayuno">Desayuno</option>
              <option value="Comida">Comida</option>
              <option value="Cena">Cena</option>
            </select>
          </div>
          <div className="mb-4">
            <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
              Tipo de alimento
            </label>
            <select
              value={tipoAlimento}
              onChange={handleTipoAlimentoChange}
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            >
              <option value="">Selecciona...</option>
              <option value="Leguminosas">Leguminosas</option>
              <option value="Proteína">Proteína</option>
              <option value="Verduras">Verduras</option>
              <option value="Frutas">Frutas</option>
              <option value="Carbohidratos">Carbohidratos</option>
              <option value="Lácteos">Lácteos</option>
              <option value="Frutos secos y semillas">Frutos secos y semillas</option>
            </select>
          </div>
          <div className="mb-4">
            <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
              Porción
            </label>
            <input
              type="text"
              value={porcion}
              onChange={handlePorcionChange}
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            />
          </div>
          <button
            type="submit"
            className="bg-blue-700 text-white py-2 px-4 rounded-md hover:bg-blue-800"
          >
            Guardar
          </button>
        </form>
      </div>
    </div>
  );
}
