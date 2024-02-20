import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import SideBar from '../components/SideBar';



function ExerciseForm() {
  const [day, setDay] = useState('');
  const [activity, setActivity] = useState('');
  const [time, setTime] = useState('');
  const [weight, setWeight] = useState('');
  const [exerciseTime, setExerciseTime] = useState('');

  const handleDayChange = (event) => {
    setDay(event.target.value);
  };

  const handleActivityChange = (event) => {
    setActivity(event.target.value);
  };

  const handleTimeChange = (event) => {
    setTime(event.target.value);
  };

  const handleWeightChange = (event) => {
    setWeight(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    // enviar los datos a  backend 
    console.log('Día:', day);
    console.log('Actividad:', activity);
    console.log('Tiempo:', time);
    console.log('Peso:', weight);
  };

  return (
    <div>
      <SideBar />
      <div className="p-16 pt-20 sm:ml-64" data-aos="fade-up">
        <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
          Registro de Ejercicio
        </label>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label htmlFor="day" className="block mb-1">Día de la semana:</label>
            <select id="day" value={day} onChange={handleDayChange} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
              <option value="">Selecciona un día</option>
              <option value="Lunes">Lunes</option>
              <option value="Martes">Martes</option>
              <option value="Miércoles">Miércoles</option>
              <option value="Jueves">Jueves</option>
              <option value="Viernes">Viernes</option>
              <option value="Sábado">Sábado</option>
              <option value="Domingo">Domingo</option>
            </select>
          </div>
          <div className="mb-4">
            <label htmlFor="activity" className="block mb-1">Actividad a realizar:</label>
            <input type="text" id="activity" value={activity} onChange={handleActivityChange} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" />
          </div>
          <div className="mb-4">
            <label htmlFor="exerciseTime" className="block mb-1">¿Cuánto tiempo dedicaste al ejercicio?</label>
            <input type="text" id="exerciseTime" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Escribe el tiempo aquí..." value={exerciseTime} onChange={(e) => setExerciseTime(e.target.value)} />
          </div>
          <div className="mb-4">
            <label htmlFor="weight" className="block mb-1">¿Levantaste peso? (Cantidad o No)</label>
            <input type="text" id="weight" value={weight} onChange={handleWeightChange} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" />
          </div>
          <button type="submit" className="bg-blue-700 text-white py-2 px-4 rounded-md hover:bg-blue-800 mt-4 w-full">
            Guardar
          </button>
        </form>
        <Link to="/registros-anteriores" className="block text-center mt-4 text-blue-500">
          Ver registros anteriores
        </Link>
      </div>
  
    </div>
  );
  
}

export default ExerciseForm;
