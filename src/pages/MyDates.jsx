import React from 'react';
import SideBar from '../components/SideBar';
function MyDates({ citas }) {
  return (
    <div>
        {console.log(citas)}
        <SideBar />
      <h2>Mis Citas</h2>
      <ul>
        {Array.isArray(citas) && citas.map((cita, index) => (
          <li key={index}>
            
            <p>Fecha: {cita.date}</p>
            <p>Hora: {cita.time}</p>
            <p>Tipo de cita: {cita.appointmentType}</p>
            <p>Lugar: {cita.location}</p>
          </li>
        ))}
      </ul>
    </div>
    	
  );
}

export default MyDates;
