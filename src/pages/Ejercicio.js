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
    // Aquí puedes enviar los datos a tu backend 
    console.log('Día:', day);
    console.log('Actividad:', activity);
    console.log('Tiempo:', time);
    console.log('Peso:', weight);
  };

  return (
    <div>
        <SideBar />
        <div className="p-16 pt-20 sm:ml-64" data-aos="fade-up">
    <div className="flex justify-center ...">
  
    <div className="max-w-md w-full bg-white p-8 rounded-lg shadow-md mt-56 md:mt-75"> 
      <h1 className="text-3xl font-bold mb-8 text-center mt-32 md:mt-64">Registro de Ejercicio</h1> 
    <form onSubmit={handleSubmit}>
    <div className="mb-4">
          <label htmlFor="day" className="block mb-1">Día de la semana:</label>
          <select id="day" value={day} onChange={handleDayChange} className="border rounded-md px-3 py-2 w-full">
            <option value="">Selecciona un día</option>
            <option value="Lunes">Lunes</option>
            <option value="Martes">Martes</option>
            <option value="Miércoles">Miércoles</option>
            <option value="Miércoles">Jueves</option>
            <option value="Miércoles">Viernes</option>
            <option value="Miércoles">Sabado</option>
            <option value="Miércoles">Domingo</option>
          </select>
        </div>
        <div className="mb-4">
          <label htmlFor="activity" className="block mb-1">Actividad a realizar:</label>
          <input type="text" id="activity" value={activity} onChange={handleActivityChange} className="border rounded-md px-3 py-2 w-full" />
        </div>


        <div className="mb-4">
      <label htmlFor="exerciseTime" className="block mb-1">
        ¿Cuánto tiempo dedicaste al ejercicio?
      </label>
      <input
        type="text"
        id="exerciseTime"
        className="border rounded-md px-3 py-2"
        placeholder="Escribe el tiempo aquí..."
        value={exerciseTime}
        onChange={(e) => setExerciseTime(e.target.value)}
      />
    </div>



        <div className="mb-4">
          <label htmlFor="weight" className="block mb-1">¿Levantaste peso? (Cantidad o No)</label>
          <input type="text" id="weight" value={weight} onChange={handleWeightChange} className="border rounded-md px-3 py-2 w-full" />
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
</div>
    </div>
    
  );
}

export default ExerciseForm;
