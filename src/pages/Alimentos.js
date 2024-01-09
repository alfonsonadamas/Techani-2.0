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
        <div className="flex justify-center">
          <div className="max-w-md w-full bg-white p-8 rounded-lg shadow-md mt-56 md:mt-75">
        <h1 className="text-3xl font-bold mb-8 text-center mt-32 md:mt-64">Registro de Alimentos</h1>
        <form onSubmit={handleSubmit}>
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
              <option value="Frutas">Frutas</option>
              <option value="Carbohidratos">Carbohidratos</option>
              <option value="Lácteos">Lácteos</option>
              <option value="Frutos secos y semillas">Frutos secos y semillas</option>
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
          <button
                type="submit"
                className="bg-blue-700 text-white py-2 px-4 rounded-md hover:bg-blue-800"
              >
                Guardar
              </button>
        </form>
        </div>
        </div>
      </div>
          <div className="flex justify-center">
            <div className="container mx-auto p-16">
              <div className="w-full lg:w-1/3">
                <div className="mt-4 lg:mt-0">
                  <h2 className="text-xl font-bold mb-6">Alimentos Registrados</h2>
                  <div className="overflow-x-auto">
                    <table className="border-collapse border border-gray-100 mx-auto">
                      <tbody>
                        {alimentosRegistrados.map((alimento, index) => (
                          <React.Fragment key={index}>
                            <tr className="border border-gray-100">
                              <td className="border border-gray-100 p-2 w-1/2">
                                <div className="flex justify-between">
                                  <span className="font-bold">Tipo de Comida</span>
                                  <span>{alimento.tipoComida}</span>
                                </div>
                              </td>
                              <td className="border border-gray-100 p-2 w-1/2">
                                <div className="flex justify-between">
                                  <span className="font-bold">Tipo de Alimento</span>
                                  <span>{alimento.tipoAlimento}</span>
                                </div>
                              </td>
                            </tr>
                            <tr className="border border-gray-100">
                              <td className="border border-gray-100 p-2 w-1/2">
                                <div className="flex justify-between">
                                  <span className="font-bold">Porción</span>
                                  <span>{alimento.porcion}</span>
                                </div>
                              </td>
                            </tr>
                          </React.Fragment>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            </div>
          </div>
    </div>
    
  );
  
}
