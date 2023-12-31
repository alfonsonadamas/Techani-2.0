import React, { useState } from 'react';

export default function Alimentos() {
  const [tipoComida, setTipoComida] = useState('');
  const [tipoAlimento, setTipoAlimento] = useState('');
  const [porcion, setPorcion] = useState('');

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
    console.log('Tipo de comida:', tipoComida);
    console.log('Tipo de alimento:', tipoAlimento);
    console.log('Porción:', porcion);
  };

  return (
    <div className="container mx-auto p-4">
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
  );
}
