import React, { useEffect, useState } from "react";
import { useUserContext } from "../context/UserContext";
import { supabase } from "../config/supabase";
import SideBar from "../components/SideBar";
import edit from "../assets/img/edit.png";
import delate from "../assets/img/delate.png";
import * as Yup from "yup";
import { Formik } from "formik";
import Modal from "../components/Modal";

export default function ViewEstados() {
  const { user } = useUserContext();
  const [records, setRecords] = useState([]);
  const [loading, setLoading] = useState(false);
  const [fechaini, setFechaini] = useState(null);
  const [fechafin, setFechafin] = useState(null);
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [editRecord, setEditRecord] = useState(null);

  const openModal = (record) => {
    setEditRecord(record);
    setModalIsOpen(true);
  };

  const closeModal = () => {
    setModalIsOpen(false);
    setEditRecord(null);
  };

  const updateEemoc = async (
    { idRegistro, idEmocion, Intencidad, timeRegistroEm },
    { setSubmitting }
  ) => {
    try {
      // Verifica que todos los parámetros necesarios estén presentes
      console.log("idRegistro", editRecord.idRegistroEmocion);
      console.log(Intencidad, timeRegistroEm, idEmocion);
      setSubmitting(true);

      const { data, error } = await supabase
        .from("emociones")
        .update({
          idEmocion: idEmocion,
          Intencidad: Intencidad,
          timeRegistroEm: timeRegistroEm,
        })
        .eq("uid", user.id)
        .eq("idRegistroEmocion", editRecord.idRegistroEmocion);

      closeModal();
      emotions(); // Actualiza
      console.log(data, error);
    } catch (error) {
      console.log("Error en updateEstados:", error.message);
    } finally {
      setSubmitting(false);
    }
  };

  const emotions = async () => {
    try {
      setLoading(true);
      const { data, error } = await supabase
        .from("emociones")
        .select()
        .eq("uid", user.id)
        .order("created_at", { ascending: false }) // Ordenar por created_at de forma descendente
        .limit(5); //limitar registros
      if (error) {
        console.log("error", error);
      } else {
        console.log("data", data); // Verifica lo que devuelve la consulta
        setRecords(data);
      }
    } catch (error) {
      console.log("catch error", error);
    } finally {
      setLoading(false);
    }
  };

  const getEmotions = async () => {
    try {
      const { data, error } = await supabase
        .from("emocion")
        .select("idEmocion, emotion");
      if (error) throw error;
      return data;
    } catch (error) {
      console.log(error);
      return [];
    }
  };

  const [em, setEmotions] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const emotionData = await getEmotions();
      setEmotions(emotionData);
      emotions();
    };

    fetchData();
  }, [user]);

  const deleteEmotion = async (id) => {
    try {
      setLoading(true);
      await supabase
        .from("emociones")
        .delete()
        .eq("uid", user.id)
        .eq("idRegistroEmocion", id);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
      emotions(); //actualiza
    }
  };

  const filterRecords = () => {
    const filteredRecords = records.filter((record) => {
      const recordDate = new Date(record.created_at);
      return (
        (!fechaini || recordDate >= fechaini) &&
        (!fechafin || recordDate <= fechafin)
      );
    });

    // Ordenar los registros por fecha de creación de más reciente a más antiguo
    filteredRecords.sort(
      (a, b) => new Date(b.created_at) - new Date(a.created_at)
    );

    return filteredRecords;
  };

  const mapEmotionToEmoji = (idEmocion) => {
    switch (idEmocion) {
      case 1:
        return "😊"; // Alegría
      case 2:
        return "😎"; // Orgullo
      case 3:
        return "🥹"; // Depresión
      case 4:
        return "😰"; // Miedo
      case 5:
        return "😡"; // Ira
      case 6:
        return "🤗"; // Gratitud
      case 7:
        return "🙏"; // Esperanza
      case 8:
        return "😌"; // Satisfacción
      case 9:
        return "💪"; // Valentía
      case 10:
        return "😉"; // Optimismo
      case 11:
        return "😁"; // Entusiasmo
      case 12:
        return "😟"; // Frustración
      case 13:
        return "😩"; // Desesperación
      case 14:
        return "😟"; // Ansiedad
      case 15:
        return "😔"; // Culpa
      case 16:
        return "😳"; // Vergüenza
      case 17:
        return "😐"; // Apatía
      case 18:
        return "😔"; // Aislamiento
      case 19:
        return "😢"; // Vulnerabilidad
      case 20:
        return "😒"; // Desconfianza
      case 21:
        return "🤨"; // Escepticismo
      case 22:
        return "😠"; // Resentimiento
      case 23:
        return "😖"; // Estrés
      default:
        return "❓"; // Emoji por defecto o mensaje de error
    }
  };

  const mapNameEmotion = (idEmocion) => {
    switch (idEmocion) {
      case 1:
        return "Alegría";
      case 2:
        return "Orgullo";
      case 3:
        return "Depresión";
      // Agrega más casos según tus necesidades
      case 4:
        return "Miedo";
      case 5:
        return "Ira";
      case 6:
        return "Gratitud";
      case 7:
        return "Esperanza";
      case 8:
        return "Satisfacción";
      case 9:
        return "Valentía";
      case 10:
        return "Optimismo";
      case 11:
        return "Entusiasmo";
      case 12:
        return "Frustración";
      case 13:
        return "Desesperación";
      case 14:
        return "Ansiedad";
      case 15:
        return "Culpa";
      case 16:
        return "Vergüenza";
      case 17:
        return "Apatía";
      case 18:
        return "Aislamiento";
      case 19:
        return "Vulnerabilidad";
      case 20:
        return "Desconfianza";
      case 21:
        return "Escepticismo";
      case 22:
        return "Resentimiento";
      case 23:
        return "Estrés";

      default:
        return "❓"; // Emoji por defecto o mensaje de error
    }
  };

  const formatDate = (fecha) => {
    const fechaObjeto = new Date(fecha);
    return fechaObjeto.toLocaleDateString();
  };

  const handleFilter = async () => {
    const fechaInicio = document.getElementById("idFIni").value;
    const fechaFin = document.getElementById("idFfin").value;

    try {
      setLoading(true);
      const { data, error } = await supabase
        .from("emociones")
        .select()
        .eq("uid", user.id)
        .gte("created_at", fechaInicio)
        .lte("created_at", fechaFin);

      if (error) console.log("error", error);
      else setRecords(data);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <SideBar />
      <div className="p-16 pt-24 sm:ml-64" data-aos="fade-up">
        <h2 className="text-2xl font-semibold mt-10">Emociones anteriores</h2>
        <p className="mb-5">Filtro por rango de fecha</p>
        <div className="flex flex-row items-center content-center mb-5">
          <div className="ml-5 mr-5">
            <p>Del</p>
          </div>
          <input
            id="idFIni"
            type="date"
            className="border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:border-blue-500"
          />
          <div className="ml-5 mr-5">
            <p>al</p>
          </div>
          <input
            id="idFfin"
            type="date"
            className="border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:border-blue-500"
          />

          <button
            className="bg-azul hover:bg-azulHover ml-5 text-white font-bold py-2 px-4 rounded shadow m-10 transition duration-300 ease-in-out"
            onClick={handleFilter}
          >
            Filtrar
          </button>
        </div>
        {loading ? (
          <p className="bg-blue-500">Cargando registros...</p>
        ) : (
          <div
            className=""
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(4,1fr)",
              gap: "15px",
            }}
          >
            {records.length === 0 ? (
              <p className="bg-yellow-500">No hay registros disponibles.</p>
            ) : (
              filterRecords().map((record) => (
                <div key={record.idEmocion} className="p-5">
                  <div className="bg-white rounded-md shadow-md ">
                    <div
                      style={{ marginTop: "10px" }}
                      className="items-center justify-center"
                    >
                      <h1 className="text-4xl mt-5 text-center">
                        {mapEmotionToEmoji(record.idEmocion)}
                      </h1>
                      <h2 className=" mt-5 text-center">
                        {mapNameEmotion(record.idEmocion)}
                      </h2>
                      <h1 className="text-center mt-2">
                        Fecha: {formatDate(record.created_at)}
                      </h1>
                      <h1 className="text-center mt-2">
                        Intensidad: {record.Intencidad}
                      </h1>
                    </div>
                    <div className="flex flex-row justify-center items-center mb-5">
                      <div
                        className="w-full h-4 mt-2 bg-blue-700 rounded-md"
                        style={{
                          width: `${(record.Intencidad / 5) * 90}%`,
                        }}
                      ></div>
                      <div
                        className="w-full h-4 mt-2  bg-slate-400 rounded-md"
                        style={{
                          width: `${((5 - record.Intencidad) / 5) * 90}%`,
                          backgroundColor: "#D3D3D3",
                        }}
                      ></div>
                    </div>
                    <div className=" flex flex-row justify-end items-center mr-5">
                      <button
                        type="button"
                        onClick={() => openModal(record)}
                        className="bg-azulHover p-1 rounded hover:bg-azul mb-5 mr-3"
                      >
                        <img src={edit} alt="editar" className="h-5" />
                      </button>
                      <button
                        type="button"
                        onClick={() => deleteEmotion(record.idRegistroEmocion)}
                        className="bg-red-600 p-1 rounded hover:bg-red-800 mb-5"
                      >
                        <img src={delate} alt="borrar" className="h-5" />
                      </button>
                    </div>
                  </div>
                </div>
              ))
            )}
            <Modal
              isOpen={modalIsOpen}
              onClose={closeModal}
              title="Editar Emociones"
              width={"max-w-2xl"}
            >
              {editRecord && (
                <div>
                  <Formik
                    initialValues={{
                      idRegistroEmocion: editRecord.idRegistroEmocion,
                      idEmocion: editRecord.idEmocion,
                      Intencidad: editRecord.Intencidad,
                      timeRegistroEm: editRecord.timeRegistroEm,
                    }}
                    onSubmit={updateEemoc}
                  >
                    {({
                      values,
                      errors,
                      touched,
                      handleBlur,
                      handleChange,
                      handleSubmit,
                      isSubmitting,
                    }) => (
                      <form onSubmit={handleSubmit}>
                        <select
                          className="bg-gray-50 border mb-5 border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                          id="idEmocion"
                          onChange={handleChange}
                          onBlur={handleBlur}
                          defaultValue={values.idEmocion}
                          name="idEmocion"
                        >
                          <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                            Nombre del ejercicio:
                          </label>
                          <option disabled>Selecciona una emoción</option>
                          {em.map((type) => (
                            <option key={type.idEmocion} value={type.idEmocion}>
                              {type.emotion}
                            </option>
                          ))}
                        </select>
                        <div className="w-full mt-10">
                          <label
                            htmlFor="rango"
                            className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                          >
                            ¿Con cuanta intensidad sientes tu emoción?
                          </label>
                          <input
                            type="range"
                            id="Intencidad"
                            name="Intencidad"
                            min="0"
                            max="5"
                            step="1"
                            className="form-range w-full mt-2"
                            onChange={handleChange}
                            onBlur={handleBlur}
                            defaultValue={values.Intencidad}
                          />
                          <p className="text-center text-gray-700 mt-2">
                            {values.Intencidad}
                          </p>
                        </div>

                        <div>
                          <label
                            htmlFor="timeRegistroEm"
                            className=" mb-2 text-sm font-medium text-gray-900 dark:text-white"
                          >
                            En que tiempo del día haces el registro:
                          </label>
                          <select
                            className="bg-gray-50 border mb-5 border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                            name="timeRegistroEm"
                            id="timeRegistroEm"
                            defaultValue={values.timeRegistroEm}
                            onChange={handleChange}
                            onBlur={handleBlur}
                          >
                            <option disabled value="">
                              -- Selecciona una opcion --
                            </option>
                            <option required value="Desayuno">
                              Desayuno
                            </option>
                            <option value="Comida">Comida</option>
                            <option value="Cena">Cena</option>
                          </select>
                        </div>

                        <button
                          type="submit"
                          className="flex items-center justify-between bg-azulHover transition duration-300 ease-out hover:ease-out hover:bg-azul mt-4 px-7 py-1 rounded-lg text-white"
                        >
                          Guardar
                        </button>
                      </form>
                    )}
                  </Formik>
                </div>
              )}
            </Modal>
          </div>
        )}
      </div>
    </div>
  );
}
