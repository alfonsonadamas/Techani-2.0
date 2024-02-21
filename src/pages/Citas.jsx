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
    <div>
      <SideBar />

      <div className="p-16 pt-20 sm:ml-64" data-aos="fade-up">
      <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
          Agendar citas
        </label>
  <form onSubmit={handleSubmit}>
    <div className="mb-4">
    <label htmlFor="day" className="block mb-1">Fecha:</label>
      <input
        type="date"
        id="date"
        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
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
        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
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
        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
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
        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
        value={location}
        onChange={(e) => setLocation(e.target.value)}
      />
    </div>
    <button type="submit" className="bg-blue-700 text-white py-2 px-4 rounded-md hover:bg-blue-800">Guardar Cita</button>
  </form>
</div>
</div>
    
  );
}

export default Citas;
