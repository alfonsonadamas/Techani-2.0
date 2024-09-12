import React, { useState, useEffect } from "react";
import { useUserContext } from "../context/UserContext";
import { supabase } from "../config/supabase";
import SideBar from "../components/SideBar";
import Modal from "../components/ModalCitas"; // Asegúrate de tener el componente Modal creado
import { Formik } from "formik";
import * as Yup from "yup";

function MyDates() {
  const [citas, setCitas] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [editingCita, setEditingCita] = useState(null);
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const { user } = useUserContext();

  const formattedDate = () => {
    const dateObj = new Date();
    return `${dateObj.getFullYear()}-${
      dateObj.getMonth() + 1
    }-${dateObj.getDate()}`;
  };

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

  const setNextDates = () => {
    const nextDates = citas.filter((cita) => cita.state === "proximo");
    console.log(nextDates);
    return nextDates;
  };

  const setPastDates = () => {
    const pastDates = citas.filter((cita) => cita.state === "pasado");
    console.log(pastDates);
    return pastDates;
  };

  const setAssitedDates = () => {
    const assitedDates = citas.filter((cita) => cita.state === "asistido");
    console.log(assitedDates);
    return assitedDates;
  };

  const setState = async () => {
    for (let i = 0; i < citas.length; i++) {
      if (citas[i].date < formattedDate() && citas[i].state === "proximo") {
        const { data, error } = await supabase
          .from("citasMedicas")
          .update({ state: "pasado" })
          .eq("idCita", citas[i].idCita);
        if (error) {
          console.error(
            "Error al actualizar el estado de la cita:",
            error.message
          );
        }
        console.log("No asistidos", data);
      }
    }
  };

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

  const updateDate = async (idCita) => {
    const { data, error } = await supabase
      .from("citasMedicas")
      .update({ state: "asistido" })
      .eq("idCita", idCita);
    if (error) {
      console.error("Error al actualizar el estado de la cita:", error.message);
    }
    console.log(data);
    obtenerCitas();
  };

  useEffect(() => {
    obtenerCitas();
    setState();
    console.log(setNextDates().length);
  }, [user]);

  return (
    <div>
      <SideBar />
      <div className="p-16 pt-20 sm:ml-64 h-screen" data-aos="fade-up">
        <h2 className="block mb-2 text-2xl font-medium text-gray-900 dark:text-white">
          Próximas citas
        </h2>

        <div className="flex overflow-x-auto">
          {setNextDates().length === 0 ? (
            <div className="flex justify-center items-center w-full h-36">
              <h3 className="text-gray-400 text-2xl">No hay citas próximas</h3>
            </div>
          ) : (
            <div>
              {setNextDates().map((cita) => (
                <div className="mx-5 mb-5">
                  <h3 className="font-semibold w-52">{cita.typecites}</h3>
                  <div className="pl-3 ml-2 mt-2 w-full border-l-2 border-l-black">
                    <div className="flex ">
                      <div className="mr-7">
                        <p className="text-xs font-semibold">Fecha</p>
                        <p>{cita.date}</p>
                      </div>
                      <div>
                        <p className="text-xs font-semibold">Hora</p>
                        <p>{cita.time}</p>
                      </div>
                    </div>
                    <div className="mt-3">
                      <p className="text-xs font-semibold">Lugar</p>
                      <p className="w-36">{cita.place}</p>
                    </div>
                    <div className="mt-3">
                      <p className="text-xs font-semibold">Nombre del Doctor</p>
                      <p>{cita.doctorName}</p>
                    </div>
                  </div>
                  <div className="w-full mt-5">
                    <button
                      onClick={() => updateDate(cita.idCita)}
                      className="bg-[#116C09] px-3 py-1 text-white rounded-lg text-sm hover:bg-[#319927] transition-all duration-300"
                    >
                      Completado
                    </button>
                    <buttton
                      onClick={() => handleAbrirModalEdicion(cita)}
                      className="bg-[#277BC0] px-3 py-1 mx-5 text-white rounded-lg text-sm hover:bg-[#21669f] hover:cursor-pointer transition-all duration-300"
                    >
                      Editar
                    </buttton>
                    <buttton
                      onClick={() => handleEliminarCita(cita.idCita)}
                      className="bg-[#AB1A1A] px-3 py-1 text-white rounded-lg text-sm hover:bg-[#d72020] hover:cursor-pointer transition-all duration-300"
                    >
                      Eliminar
                    </buttton>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
        <h2 className="block mb-2 text-2xl font-medium text-gray-900 dark:text-white">
          Asistido
        </h2>
        <div className="flex overflow-x-auto">
          {setAssitedDates().length === 0 ? (
            <div className="flex justify-center items-center w-full h-36">
              <h3 className="text-gray-400 text-2xl">No hay citas asistidas</h3>
            </div>
          ) : (
            <div>
              {setAssitedDates().map((cita) => (
                <div className="mx-5 mb-5">
                  <h3 className="font-semibold w-52">{cita.typecites}</h3>
                  <div className="pl-3 ml-2 mt-2 w-full border-l-2 border-l-black">
                    <div className="flex ">
                      <div className="mr-7">
                        <p className="text-xs font-semibold">Fecha</p>
                        <p>{cita.date}</p>
                      </div>
                      <div>
                        <p className="text-xs font-semibold">Hora</p>
                        <p>{cita.time}</p>
                      </div>
                    </div>
                    <div className="mt-3">
                      <p className="text-xs font-semibold">Lugar</p>
                      <p className="w-36">{cita.place}</p>
                    </div>
                    <div className="mt-3">
                      <p className="text-xs font-semibold">Nombre del Doctor</p>
                      <p>{cita.doctorName}</p>
                    </div>
                  </div>
                  <div className="w-full mt-5">
                    <buttton
                      onClick={() => handleAbrirModalEdicion(cita)}
                      className="bg-[#277BC0] px-3 py-1 mx-5 text-white rounded-lg text-sm hover:bg-[#21669f] hover:cursor-pointer transition-all duration-300"
                    >
                      Editar
                    </buttton>
                    <buttton
                      onClick={() => handleEliminarCita(cita.idCita)}
                      className="bg-[#AB1A1A] px-3 py-1 text-white rounded-lg text-sm hover:bg-[#d72020] hover:cursor-pointer transition-all duration-300"
                    >
                      Eliminar
                    </buttton>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        <h2 className="block mb-2 text-2xl font-medium text-gray-900 dark:text-white">
          No asistido
        </h2>
        {setPastDates().length === 0 ? (
          <div className="flex justify-center items-center w-full h-36">
            <h3 className="text-gray-400 text-2xl">
              No hay citas no asistidas
            </h3>
          </div>
        ) : (
          <div className="flex overflow-x-auto">
            {setPastDates().map((cita) => (
              <div className="mx-5 mb-5">
                <h3 className="font-semibold w-52">{cita.typecites}</h3>
                <div className="pl-3 ml-2 mt-2 w-full border-l-2 border-l-black">
                  <div className="flex ">
                    <div className="mr-7">
                      <p className="text-xs font-semibold">Fecha</p>
                      <p>{cita.date}</p>
                    </div>
                    <div>
                      <p className="text-xs font-semibold">Hora</p>
                      <p>{cita.time}</p>
                    </div>
                  </div>
                  <div className="mt-3">
                    <p className="text-xs font-semibold">Lugar</p>
                    <p className="w-36">{cita.place}</p>
                  </div>
                  <div className="mt-3">
                    <p className="text-xs font-semibold">Nombre del Doctor</p>
                    <p>{cita.doctorName}</p>
                  </div>
                </div>
                <div className="w-full mt-5">
                  <button
                    onClick={() => updateDate(cita.idCita)}
                    className="bg-[#116C09] px-3 py-1 text-white rounded-lg text-sm hover:bg-[#319927] transition-all duration-300"
                  >
                    Completado
                  </button>
                  <buttton
                    onClick={() => handleAbrirModalEdicion(cita)}
                    className="bg-[#277BC0] px-3 py-1 mx-5 text-white rounded-lg text-sm hover:bg-[#21669f] hover:cursor-pointer transition-all duration-300"
                  >
                    Editar
                  </buttton>
                  <buttton
                    onClick={() => handleEliminarCita(cita.idCita)}
                    className="bg-[#AB1A1A] px-3 py-1 text-white rounded-lg text-sm hover:bg-[#d72020] hover:cursor-pointer transition-all duration-300"
                  >
                    Eliminar
                  </buttton>
                </div>
              </div>
            ))}
          </div>
        )}
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
