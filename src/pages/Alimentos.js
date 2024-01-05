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
      <div className="container mx-auto p-8">
        <h1 className="text-3xl font-bold mb-4">Registro de Alimentos</h1>
        <form onSubmit={handleSubmit} className="max-w-md mx-auto">
          <div className="mb-4">
            <label className="block mb-2">Tipo de comida:</label>
            <select
              value={tipoComida}
              onChange={handleTipoComidaChange}
              className="border p-2 w-full"
            >
              <option value="">Selecciona...</option>
              <option value="Desayuno">Desayuno</option>
              <option value="Comida">Comida</option>
              <option value="Cena">Cena</option>
            </select>
          </div>
          <div className="mb-4">
            <label className="block mb-2">Tipo de alimento:</label>
            <select
              value={tipoAlimento}
              onChange={handleTipoAlimentoChange}
              className="border p-2 w-full"
            >
              <option value="">Selecciona...</option>
              <option value="Leguminosas">Leguminosas</option>
              <option value="Proteína">Proteína</option>
              <option value="Verduras">Verduras</option>
              {/* Agrega más opciones según sea necesario */}
            </select>
          </div>
          <div className="mb-4">
            <label className="block mb-2">Porción:</label>
            <input
              type="text"
              value={porcion}
              onChange={handlePorcionChange}
              className="border p-2 w-full"
            />
          </div>
          <button type="submit" className="bg-blue-700 text-white py-2 px-4 rounded-md hover:bg-blue-800">Guardar</button>
        </form>
      </div>
      <div className="container mx-auto p-8">
        <div className="w-full lg:w-1/3">
          <div className="mt-4 lg:mt-0">
            <h2 className="text-xl font-bold mb-8">Alimentos Registrados</h2>
            <div className="overflow-x-auto">
              <table className="border-collapse border border-gray-400 w-full">
                <thead>
                  <tr>
                    <th className="border border-gray-400 p-2">Tipo de Comida</th>
                    <th className="border border-gray-400 p-2">Tipo de Alimento</th>
                    <th className="border border-gray-400 p-2">Porción</th>
                  </tr>
                </thead>
                <tbody>
                  {alimentosRegistrados.map((alimento, index) => (
                    <tr key={index}>
                      <td className="border border-gray-400 p-2">{alimento.tipoComida}</td>
                      <td className="border border-gray-400 p-2">{alimento.tipoAlimento}</td>
                      <td className="border border-gray-400 p-2">{alimento.porcion}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
  
}
