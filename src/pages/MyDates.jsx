import React, { useState, useEffect } from "react";
import { useUserContext } from "../context/UserContext";
import { supabase } from "../config/supabase";
import SideBar from "../components/SideBar";
import Modal from "../components/ModalCitas"; // Asegúrate de tener el componente Modal creado
import { Formik } from "formik";
import * as Yup from "yup";
import { useNavigate } from "react-router-dom";

function MyDates() {
  //const [citas, setCitas] = useState([{ idCita: null }]);
  const [citas, setCitas] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [editingCita, setEditingCita] = useState(null);
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const { user } = useUserContext();

  async function obtenerCitas() {
    setIsLoading(true);
    try {
      const { data, error } = await supabase
        .from("citasMedicas")
        .select("*")
        .eq("uid", user.id);
      if (error) throw error;
      console.log(data);
      setCitas(data); // Establece el estado local con los datos obtenidos
    } catch (error) {
      console.error("Error al obtener citas:", error.message);
      setError(error);
    } finally {
      setIsLoading(false);
    }
  }

  const handleEliminarCita = async (idCita) => {
    try {
      console.log("ID de la cita a eliminar:", idCita);
      await supabase.from("citasMedicas").delete().eq("idCita", idCita);
      if (error) throw error;
      window.location.reload();
    } catch (error) {
      console.error("Error al eliminar la cita:", error.message);
    }
  };

  const handleAbrirModalEdicion = (cita) => {
    setModalIsOpen(true);
    setEditingCita({
      idCita: cita.idCita,
      date: cita.date,
      time: cita.time,
      typecites: cita.typecites,
      place: cita.place,
      doctorName: cita.doctorName,
    });
    console.log("Cita a editar", editingCita);
  };

  const handleGuardarCambios = async (values) => {
    try {
      await supabase
        .from("citasMedicas")
        .update(values)
        .eq("idCita", editingCita.idCita);
      setModalIsOpen(false);
      obtenerCitas();
    } catch (error) {
      console.error("Error al guardar cambios:", error.message);
    }
  };

  useEffect(() => {
    obtenerCitas();
  }, [user]);

  return (
    <div>
      <SideBar />
      <div className="p-16 pt-20 sm:ml-64" data-aos="fade-up">
        <label className="block mb-2 text-2xl font-medium text-gray-900 dark:text-white">
          Mis citas
        </label>
        <ul className="mt-4">
          {citas.map((cita) => (
            <li key={cita.idCita} className="mb-4">
              <div className="bg-white shadow-lg rounded-lg p-4 mb-4 dark:bg-gray-800">
                <div className="mb-4">
                  <p>
                    Fecha: <span className="font-semibold">{cita.date}</span>
                  </p>
                  <p>
                    Hora: <span className="font-semibold">{cita.time}</span>
                  </p>
                  <p>
                    Tipo de cita:{" "}
                    <span className="font-semibold">{cita.typecites}</span>
                  </p>
                  <p>
                    Lugar: <span className="font-semibold">{cita.place}</span>
                  </p>
                  <p>
                    Nombre del Doctor:{" "}
                    <span className="font-semibold">{cita.doctorName}</span>
                  </p>
                </div>
                <div className="flex justify-end space-x-2">
                  <button
                    className="bg-red-600 text-white py-2 px-4 rounded hover:bg-red-700 transition ease-in duration-200"
                    onClick={() => handleEliminarCita(cita.idCita)}
                  >
                    Eliminar
                  </button>
                  <button
                    className="bg-blue-600 text-white py-2 px-4 rounded hover:bg-blue-700 transition ease-in duration-200"
                    onClick={() => handleAbrirModalEdicion(cita)}
                  >
                    Editar
                  </button>
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
              <form onSubmit={handleSubmit} className="flex flex-col">
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
                  type="text"
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

                <button
                  type="submit"
                  className="bg-blue-500 text-white py-1 px-4 rounded mt-5 "
                  disabled={isSubmitting}
                >
                  Guardar cambios
                </button>
                <button
                  type="submit"
                  disabled={isSubmitting}
                  onClick={() => setModalIsOpen(!modalIsOpen)}
                  className="bg-red-500 text-white py-1 px-4 rounded mt-5"
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
