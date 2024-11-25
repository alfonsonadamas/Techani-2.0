import React, { useEffect, useState } from "react";
import { useUserContext } from "../context/UserContext";
import { supabase } from "../config/supabase";
import SideBar from "../components/SideBar";
import Modal from "../components/Modal";
import edit from "../assets/img/edit.png";
import delate from "../assets/img/delate.png";
import * as Yup from "yup";
import { Formik } from "formik";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function MyExercise() {
  const { user } = useUserContext();
  const [records, setRecords] = useState([]);
  const [loading, setLoading] = useState(false);
  const [fechaini, setFechaini] = useState(null);
  const [fechafin, setFechafin] = useState(null);
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [editRecord, setEditRecord] = useState(null);
  const [activitiesUs, setActivitiesUs] = useState([]);
  const [activities, setActivities] = useState([]);
  const [activity, setActivity] = useState([]);
  const [dataAuxActivities, setDataAuxActivities] = useState([]);
  const [weightOption, setWeightOption] = useState("no");

  const openModal = (record) => {
    setActivity([]);
    setWeightOption(getWeightOption(record.weight));
    console.log("record seleccionado: ", record);
    const name = getNameActivity(record.idActividades, record.actividadUsuario);
    if (record.idActividades === 12) {
      setActivity([{ id: record.actividadUsuario, name: name }]);
    } else {
      setActivity([{ id: record.idActividades, name: name }]);
    }
    setEditRecord(record);
    setModalIsOpen(true);
  };

  const closeModal = () => {
    setModalIsOpen(false);
    setEditRecord(null);
  };

  const activitySearch = (activityName, idActivity) => {
    setActivity([{ id: idActivity, name: activityName }]);
    setDataAuxActivities([]);
  };

  const handleSearch = (event) => {
    const searchTerm = event.target.value.trim().toLowerCase();
    const mergedActivities = activitiesUs.concat(activities);
    const newData = mergedActivities.filter(
      (item) =>
        item.nameActivity &&
        item.nameActivity.toLowerCase().includes(searchTerm)
    );
    setDataAuxActivities(newData);
    setActivity([]);
  };

  const validationSchema = Yup.object({
    nameActividad: Yup.string()
      .matches(/^[^\d]+$/, "El campo debe ser texto")
      .required("Este campo es requerido"),
    time: Yup.number()
      .positive("El tiempo debe ser positivo")
      .typeError("El tiempo debe de ser un número")
      .required("El tiempo es requerido"),
    weight: Yup.number()
      .positive("El peso debe de ser positivo")
      .nullable(true)
      .typeError("El peso debe de ser un número")
      .notRequired(),
    actividadUsuario: Yup.number().positive("debe ser positivo"),
  });

  const getActivities = async () => {
    try {
      const { data, error } = await supabase.from("actividades").select();
      if (error) throw error;
      setActivities(data);
    } catch (error) {
      console.log(error);
    }
  };

  const getActivitiesUs = async () => {
    try {
      const { data, error } = await supabase
        .from("actividadesUsuario")
        .select()
        .eq("uid", user.id);
      if (error) throw error;
      setActivitiesUs(data);
    } catch (error) {
      console.log(error);
    }
  };

  const updateEjercicio = async (
    {
      idEjercicio,
      idActividad,
      time,
      weight,
      weightOption,
      actividadUsuario,
      nameActividad,
    },
    { setSubmitting, setErrors, resetForm }
  ) => {
    try {
      console.log(idActividad);
      console.log("idEjercicio", editRecord.idEjercicio);
      setSubmitting(true);
      const weightValue = weightOption === "si" ? weight : null;
      console.log("Peso:", weightOption);
      let dataExercise = {
        time: time,
        weight: weightValue,
      };

      const selectedActivity = activity[0];
      console.log(selectedActivity);
      if (!selectedActivity) {
        throw new Error("No se ha seleccionado una actividad.");
      }

      if (
        activitiesUs.some((act) => act.idActividades === selectedActivity.id)
      ) {
        dataExercise.idActividades = 12;
        dataExercise.actividadUsuario = selectedActivity.id;
      } else {
        dataExercise.idActividades = selectedActivity.id;
        dataExercise.actividadUsuario = null;
      }

      console.log("Datos del ejercicio a actualizar:", dataExercise);

      const { data, error } = await supabase
        .from("ejercicio")
        .update({
          weight: weightValue,
          idActividades: dataExercise.idActividades,
          time: dataExercise.time,
          actividadUsuario: dataExercise.actividadUsuario,
        })
        .eq("uid", user.id)
        .eq("idActividades", idActividad)
        .eq("idEjercicio", idEjercicio);

      if (error) throw error;
      else console.log(data);
      closeModal();
      toast.success("Registro modificado");
      resetForm();
      Ejercicios(); // Actualiza
    } catch (error) {
      console.log(error);
      setErrors({ submit: error.message });
    } finally {
      setSubmitting(false);
      Ejercicios(); // Actualiza
    }
  };

  const Ejercicios = async () => {
    try {
      setLoading(true);
      const { data, error } = await supabase
        .from("ejercicio")
        .select()
        .eq("uid", user.id)
        .order("created_at", { ascending: false }) // Ordenar por created_at de forma descendente
        .limit(4); // Limitar a los últimos 5 registros

      if (error) console.log("error", error);

      setRecords(data);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  const deleteActivity = async (id) => {
    try {
      setLoading(true);
      await supabase
        .from("ejercicio")
        .delete()
        .eq("uid", user.id)
        .eq("idEjercicio", id);
    } catch (error) {
      console.log(error);
    } finally {
      toast.success("Registro eliminado");
      setLoading(false);
      Ejercicios(); //actualiza
    }
  };

  const filterRecords = () => {
    const filteredRecords = records.filter((record) => {
      const recordDate = new Date(record.date);
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

  const formatDate = (fecha) => {
    const fechaObjeto = new Date(fecha);
    return fechaObjeto.toLocaleDateString();
  };

  useEffect(() => {
    Ejercicios();
    getActivities();
    getActivitiesUs();
  }, [user]);

  const handleFilter = async () => {
    const fechaInicio = document.getElementById("idFIni").value;
    const fechaFin = document.getElementById("idFfin").value;

    try {
      setLoading(true);
      const { data, error } = await supabase
        .from("ejercicio")
        .select()
        .eq("uid", user.id)
        .gte("created_at", fechaInicio)
        .lte("created_at", fechaFin)
        .order("created_at", { ascending: false }); // Ordenar del más reciente al más antiguo

      if (error) {
        console.error("Error al consultar la base de datos:", error.message);
      } else {
        setRecords(data); // Actualizar los registros con los datos obtenidos
      }
    } catch (error) {
      console.error("Error en la solicitud:", error.message);
    } finally {
      setLoading(false); // Finalizar la carga, independientemente del resultado
    }
  };

  const getNameActivity = (id, actUs) => {
    if (id === 12) {
      let act = activitiesUs.find(
        (activity) => activity.idActividades === actUs
      );
      return act ? act.nameActivity : "No encontrada";
    } else {
      let act = activities.find((activity) => activity.idActividades === id);
      return act ? act.nameActivity : "Actividad no encontrada";
    }
  };
  const getWeightOption = (weight) => {
    if (weight !== null) {
      return "si";
    } else return "no";
  };

  return (
    <div>
  <SideBar />
  <div className="px-4 sm:px-16 pt-24 sm:ml-64 max-w-full" data-aos="fade-up">
    <h2 className="text-lg sm:text-2xl font-semibold mt-10">Ejercicios anteriores</h2>
    <p className="mb-5">Filtro por rango de fecha</p>
    <div className="flex flex-col sm:flex-row items-center gap-4 mb-5">
  <div className="flex items-center gap-2">
    <label htmlFor="idFIni" className="text-sm">Del</label>
    <input
      id="idFIni"
      type="date"
      className="border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:border-blue-500"
    />
  </div>
  <div className="flex items-center gap-2">
    <label htmlFor="idFfin" className="text-sm">Al</label>
    <input
      id="idFfin"
      type="date"
      className="border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:border-blue-500"
    />
  </div>
  <button
    className="bg-azul hover:bg-azulHover text-white font-bold py-2 px-4 rounded shadow transition duration-300 ease-in-out"
    onClick={handleFilter}
  >
    Filtrar
  </button>
</div>


        {loading ? (
          <p className="">Cargando nuevos..</p>
        ) : (
          <div>
            {/*Cambios realizados */}
            <div className="flex flex-wrap justify-center gap-4">
  {records && records.length === 0 ? (
    <p className="text-center">No hay registros disponibles.</p>
  ) : (
    filterRecords().map((record) => (
      <div
        key={record.idEjercicio}
        className="bg-white rounded-md shadow-md p-4 flex-grow" 
        style={{ minWidth: "200px", maxWidth: "300px" }}
      >
        {/* Contenido de cada actividad */}
        <div className="flex flex-col items-center">
          {/* Imagen */}
          <img
            alt="exercise"
            className="h-12 w-12 mb-3"
            src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADIAAAAyCAYAAAAeP4ixAAAACXBIWXMAAAsTAAALEwEAmpwYAAADRUlEQVR4nO2XR2iUURDHf9HYUA+2g70Q7A1sKKLYT4qIFw3oQSKC2FA8CKK5xJOKBY2CUZBgPWiiXjwowYKKIGIFS2JEFCyxYU1WBv4fjMtu8q1uNoXvB8u3b16d92bmzYOIiIiIiIiI5kk/4ABQCfzUt1DyJsNs4BMQS/Az+SyaAP2dEmeBsUB7fUsk/wj0pZFzwCmRiECZ/XHybsBgoA2NhEotdEyS+nGqr1B5CnDbmZ6d1l6gDw3MDy2oQ5L6jqr/Dsxw7c0cy51CJj8IDKCBeBHyRKzdQ2dmgUkNAY4Cv1X3CzgCDCTDFGoB5guJKFX9PadQqwTtcoAihe6YFCsGhpIh+rmoVaoT6KBvqfOD4H9BiPEKnQlWAyeBUZlQZpYWm+geMflM4JbK40OO2RvYDXxTvxrgTC0mnDb6yvYrtJv23eei0WMtaFCK43YHtgNf3OacBybSQJzUIlY4WRdgLdA5RH+7d7bFZRAXFc4zyiJNftXJ1of0G48pnQ98cApdVmjPCO2AKk0chNY5Kt/4h/HsfloDvHYKXQPmAlnUM0WacIvK7eVP5sjXJZ8AtEhhTIuQG4E3TqGbwLz6VGiaJnriJilLEOneyqeWAz1Djm0XrLV/6ca5CywBWqZbkRaKZjEXdbaqXKYo9zROqRrlZgVy7Ow65mgLrHTzBJfxonQrdFiDWwQypqpsphVgPrQauAB8jVPsHbALGFnHPK2BPOCZ6/tIJ1TXZtTJMF1wtsvTJZvszCDZDtvDbYfL1WIuSOTJ8ZNhi17q7rGYTn2ZlE2ZVi59NxNCCwgmsJAahtHAHuC9W9hn4BAwqZZ+ZlaLgfuuX7myjpTId45u0co4IdkdhedUsJPKBS7phIPF2ULXAV1r8dOFmjNITmvbgL8YrvS8WqZkrNJAVcp8/4ccBYNXTiF7/xxXHpgonGe5zU2WuSdN9XeqPN7dHwtIH9m6P0q0cYFS5vCbgV5x7Qeq/kHYCU6rQ66SwOBlaMlgfdED2CRTjjkzOgfMlxLFkp8KO2iuGyh4Z1xJ8sBKN1m6iIvdk8D/vimahmaDEj1T5ljIjDfddJJv2uX7XO+bEUFlrJn8aDaKREREREREREREUC/8Ae4ZfBBuF8VKAAAAAElFTkSuQmCC"
          />
          {/* Texto */}
          <h3 className="text-base text-center mt-2">
            Actividad: {getNanmeActivity(record.idActividades, record.actividadUsuario)}
          </h3>
          <h3 className="text-base text-center mt-2">
            Fecha: {record.date}
          </h3>
          <h3 className="text-base text-center mt-2 mb-2">
            Tiempo: {record.time} minutos
          </h3>
          {/* Botones */}
          <div className="flex flex-row justify-center items-center mt-4 space-x-2">
            <button
              type="button"
              onClick={() => openModal(record)}
              className="bg-blue-500 p-2 rounded hover:bg-blue-600 transition duration-300"
            >
              <img src={edit} alt="editar" className="h-5 w-5" />
            </button>
            <button
              type="button"
              onClick={() => deleteActivity(record.idEjercicio)}
              className="bg-red-500 p-2 rounded hover:bg-red-600 transition duration-300"
            >
              <img src={delate} alt="borrar" className="h-5 w-5" />
            </button>
          </div>
        </div>
      </div>
    ))
  )}
</div>


              {/* Hasta aqui los cambios */}
            <Modal
              isOpen={modalIsOpen}
              onClose={closeModal}
              title="Editar mi ejercicio"
            >
              {editRecord && (
                <div>
                  <Formik
                    initialValues={{
                      idEjercicio: editRecord.idEjercicio,
                      idActividad: editRecord.idActividades,
                      weight: editRecord.weight,
                      weightOption: weightOption,
                      nameActividad: getNameActivity(
                        editRecord.idActividades,
                        editRecord.actividadUsuario
                      ),
                      time: editRecord.time,
                    }}
                    validationSchema={validationSchema}
                    onSubmit={updateEjercicio}
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
                        <div className="mb-4">
                          <label htmlFor="activity" className="block mb-1">
                            Actividad que se realizó:
                          </label>

                          <div className="w-full mx-auto">
                            <label
                              htmlFor="default-search"
                              className="mb-2 text-sm font-medium text-gray-900 sr-only dark:text-white"
                            >
                              Search
                            </label>
                            <div className="relative">
                              <input
                                type="search"
                                id="default-search"
                                name="nameActividad"
                                autoComplete="off"
                                defaultValue={values.nameActividad}
                                onChange={handleSearch}
                                className="block w-full p-2.5 ps-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                placeholder="Buscar actividad..."
                              />
                            </div>
                          </div>
                        </div>
                        {dataAuxActivities.length !== 0 &&
                          activity.length === 0 && (
                            <div className="mb-3 px-10">
                              {dataAuxActivities.map((item) => {
                                return (
                                  <div
                                    key={item.idActividades}
                                    className="cursor-pointer"
                                    onClick={() =>
                                      activitySearch(
                                        item.nameActivity,
                                        item.idActividades
                                      )
                                    }
                                  >
                                    <div className="p-4 border-b-2 hover:bg-gray-100 transition-all ease-in">
                                      <p>{item.nameActivity}</p>
                                    </div>
                                  </div>
                                );
                              })}
                            </div>
                          )}

                        {activity.length !== 0 && (
                          <div className="px-10 mb-3 cursor-default">
                            <div className="p-4 border-b-2 bg-gray-100 transition-all ease-in">
                              <p>{activity[0].name}</p>
                            </div>
                          </div>
                        )}

                        <div className="mb-4">
                          <label htmlFor="exerciseTime" className="block mb-1">
                            ¿Cuánto tiempo dedicaste al ejercicio? (En minutos)
                          </label>
                          <input
                            type="text"
                            id="exerciseTime"
                            name="time"
                            defaultValue={values.time}
                            autoComplete="off"
                            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                            placeholder="Escribe el tiempo aquí..."
                            onChange={handleChange}
                            onBlur={handleBlur}
                          />
                          <p className="text-red-500">
                            {errors.time && touched.time && errors.time}
                          </p>
                        </div>
                        <div className="mb-4">
                          <label htmlFor="weight" className="block mb-1">
                            ¿Levantaste peso?
                          </label>
                          <select
                            name="weightOption"
                            id="weightOption"
                            onChange={(event) =>
                              setWeightOption(event.target.value)
                            }
                            className="bg-gray-50 border mb-5 border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                          >
                            <option value="no">No</option>
                            <option value="si">Si</option>
                          </select>
                          {weightOption === "si" && (
                            <div>
                              <label>Introduzca el peso</label>
                              <input
                                type="text"
                                id="weight"
                                name="weight"
                                onChange={handleChange}
                                onBlur={handleBlur}
                                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                              />
                              <p className="text-red-500">
                                {errors.weight &&
                                  touched.weight &&
                                  errors.weight}
                              </p>
                            </div>
                          )}
                        </div>
                        <button
                          type="submit"
                          className="flex items-center justify-between bg-azulHover transition duration-300 ease-out hover:ease-out hover:bg-azul mt-4 px-7 py-1 rounded-lg text-white"
                          disabled={isSubmitting}
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
