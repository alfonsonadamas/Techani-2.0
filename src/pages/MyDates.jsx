import React, { useState, useEffect } from 'react';
import { createClient } from '@supabase/supabase-js';
import { useUserContext } from "../context/UserContext";
import { supabase } from '../config/supabase'; 
import SideBar from "../components/SideBar";
import Modal from "../components/Modal"; // Asegúrate de tener el componente Modal creado
import { Formik } from "formik";
import * as Yup from "yup";

function MyDates() {
  //const [citas, setCitas] = useState([{ idCita: null }]);
  const [citas, setCitas] = useState([]);


  // Función para manejar la eliminación de una cita
  const handleEliminarCita = (id) => {
    // Lógica para eliminar la cita con el ID proporcionado
    console.log("Eliminar cita con ID:", id);
  };

  // Función para manejar la edición de una cita
  const handleEditarCita = (cita) => {
    // Lógica para editar la cita proporcionada
    console.log("Editar cita:", cita);
  };

  
  useEffect(() => {
    async function obtenerCitas() {
      try {
        const { data, error } = await supabase
          .from('citasMedicas')
          .select('*');
        
        if (error) {
          console.error('Error al obtener citas:', error.message);
          return;
        }
        
        setCitas(data);
      } catch (error) {
        console.error('Error al obtener citas:', error.message);
      }
    }

    obtenerCitas();
  }, [user]);

  return (
    <div>
      <SideBar />
      <div className="p-16 pt-20 sm:ml-64" data-aos="fade-up">
        <label className="block text-gray-900 dark:text-white text-2xl mb-5 font-semibold">
          Mis citas
        </label>
        <ul className="mt-4">
          {Array.isArray(citas) && citas.map((cita, index) => (
            <li key={index} className="mb-4">
              <div className="border border-gray-300 p-4 rounded-md">
                <p>Fecha: {cita.date}</p>
                <p>Hora: {cita.time}</p>
                <p>Tipo de cita: {cita.appointmentType}</p>
                <p>Lugar: {cita.location}</p>
                <p>Nombre del Doctor: {cita.doctorName}</p>
                <div className="mt-4 flex justify-end">
                  <button className="mr-2 bg-red-500 hover:bg-red-600 text-white py-2 px-4 rounded-md" onClick={() => handleEliminarCita(cita.id)}>Eliminar</button>
                  <button className="bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded-md" onClick={() => handleEditarCita(cita)}>Editar</button>
                </div>
              </div>
            </li>
          ))}
        </ul>
      </div>
      <Modal open={modalIsOpen} onClose={() => setModalIsOpen(!modalIsOpen)}>
        {editingCita && (
          <Formik
            initialValues={{
              date: editingCita.date || "",
              time: editingCita.time || "",
              typecites: editingCita.typecites || "",
              place: editingCita.place || "", // Cambiado de 'location' a 'place'
              doctorName: editingCita.doctorName || "",
            }}
            validationSchema={Yup.object({
              date: Yup.date().required("La fecha es requerida"),
              time: Yup.string().required("La hora es requerida"),
              typecites: Yup.string().required("El tipo de cita es requerido"),
              place: Yup.string().required("El lugar es requerido"), // Cambiado de 'location' a 'place'
              doctorName: Yup.string().required(
                "El nombre del doctor es requerido"
              ),
            })}
            onSubmit={(values, { setSubmitting }) => {
              handleGuardarCambios(values);
              setSubmitting(false);
            }}
          >
            {({
              values,
              errors,
              touched,
              handleChange,
              handleBlur,
              handleSubmit,
              isSubmitting,
            }) => (
              <form onSubmit={handleSubmit}>
                <label htmlFor="date">Fecha</label>
                <input
                  id="date"
                  type="date"
                  name="date"
                  onChange={handleChange}
                  onBlur={handleBlur}
                  value={values.date}
                />
                {touched.date && errors.date && <div>{errors.date}</div>}

                <label htmlFor="time">Hora</label>
                <input
                  id="time"
                  type="time"
                  name="time"
                  onChange={handleChange}
                  onBlur={handleBlur}
                  value={values.time}
                />
                {touched.time && errors.time && <div>{errors.time}</div>}

                <label htmlFor="typecites">Tipo de cita</label>
                <input
                  id="typecites"
                  type="typecites"
                  name="typecites"
                  onChange={handleChange}
                  onBlur={handleBlur}
                  value={values.typecites}
                />
                {touched.typecites && errors.typecites && (
                  <div>{errors.typecites}</div>
                )}

                <label htmlFor="place">Lugar</label>
                <input
                  id="place"
                  type="text"
                  name="place" // Aquí usas 'place'
                  onChange={handleChange}
                  onBlur={handleBlur}
                  value={values.place}
                />
                {touched.place && errors.place && <div>{errors.place}</div>}

                <label htmlFor="doctorName">Nombre del Doctor</label>
                <input
                  id="doctorName"
                  type="text"
                  name="doctorName"
                  onChange={handleChange}
                  onBlur={handleBlur}
                  value={values.doctorName}
                />
                {touched.doctorName && errors.doctorName && (
                  <div>{errors.doctorName}</div>
                )}

                <button type="submit" disabled={isSubmitting}>
                  Guardar cambios
                </button>
                <button
                  type="submit"
                  disabled={isSubmitting}
                  onClick={() => setModalIsOpen(!modalIsOpen)}
                >
                  Cancelar
                </button>
              </form>
            )}
          </Formik>
        )}
      </Modal>
    </div>
  );
}

export default MyDates;
