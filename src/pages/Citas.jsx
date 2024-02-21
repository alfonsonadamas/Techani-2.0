import React, { useState } from 'react';
import SideBar from '../components/SideBar';

function Citas() {
  const [date, setDate] = useState('');
  const [time, setTime] = useState('');
  const [appointmentType, setAppointmentType] = useState('');
  const [location, setLocation] = useState('');
  const [citas, setCitas] = useState([]); // Aquí inicializamos citas como un array vacío

  const handleSubmit = (e) => {
    e.preventDefault();
    // Aquí puedes manejar la lógica para enviar los datos del formulario
    console.log('Fecha:', date);
    console.log('Hora:', time);
    console.log('Tipo de cita:', appointmentType);
    console.log('Lugar:', location);

    const newCita = { date, time, appointmentType, location };
    setCitas([...citas, newCita]);
    
    setDate('');
    setTime('');
    setAppointmentType('');
    setLocation('');
    // También puedes enviar los datos a una API o realizar otras operaciones
  };

  const handleDeleteAll = () => {
    setCitas([]);
  };

  const maxCitasToShow = 20; // Máximo número de citas a mostrar


  return (
    <div className="flex">
      <SideBar />

      <div className="container mx-auto p-4">
  <h1 className="text-2xl font-bold mb-4">Agendar Cita</h1>
  <form onSubmit={handleSubmit} className="max-w-md mx-auto">
    <div className="mb-4">
      <label htmlFor="date" className="block mb-1">
        Fecha:
      </label>
      <input
        type="date"
        id="date"
        className="border rounded-md px-3 py-2 w-full h-10"
        value={date}
        onChange={(e) => setDate(e.target.value)}
      />
    </div>
    <div className="mb-4">
      <label htmlFor="time" className="block mb-1">
        Hora:
      </label>
      <input
        type="time"
        id="time"
        className="border rounded-md px-3 py-2 w-full h-10"
        value={time}
        onChange={(e) => setTime(e.target.value)}
      />
    </div>
    <div className="mb-4">
      <label htmlFor="appointmentType" className="block mb-1">
        Tipo de cita:
      </label>
      <input
        type="text"
        id="appointmentType"
        className="border rounded-md px-3 py-2 w-full h-10"
        value={appointmentType}
        onChange={(e) => setAppointmentType(e.target.value)}
      />
    </div>
    <div className="mb-4">
      <label htmlFor="location" className="block mb-1">
        Lugar:
      </label>
      <input
        type="text"
        id="location"
        className="border rounded-md px-3 py-2 w-full h-10"
        value={location}
        onChange={(e) => setLocation(e.target.value)}
      />
    </div>
    <button type="submit" className="bg-blue-700 text-white py-2 px-4 rounded-md hover:bg-blue-800">Guardar Cita</button>
  </form>
</div>


<div className="w-1/2 p-4">
        <h1 className="text-2xl font-bold mb-4">Calendario de Citas</h1>
        <div>
          <h2 className="text-lg font-semibold mb-2">Todas las Citas:</h2>
          <ul>
            {citas.slice(0, maxCitasToShow).map((cita, index) => (
              <li key={index}>
                Fecha: {cita.date} - Hora: {cita.time} - Tipo: {cita.appointmentType} - Lugar: {cita.location}
              </li>
            ))}
          </ul>
          {citas.length > maxCitasToShow && (
            <button onClick={handleDeleteAll} className="bg-red-500 text-white py-2 px-4 rounded-md mt-2">
              Borrar Todas las Citas
            </button>
          )}
        </div>
      </div>
    </div>
  );
}

export default Citas;
