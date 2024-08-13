import React, { useEffect, useState } from "react";
import SideBar from "../components/SideBar";
import { Formik } from "formik";
import { supabase } from "../config/supabase";
import * as Yup from "yup";
import { useUserContext } from "../context/UserContext";

function ExerciseForm() {
  const { user } = useUserContext();
  const [activities, setActivities] = useState([]);
  const [dataAuxActivities, setDataAuxActivities] = useState([]);
  const [weightOption, setWeightOption] = useState("no"); // si o no
  const [activity, setActivity] = useState({});
  const [activitiesUs, setActivitiesUs] = useState([]);
  const [sendForm, setSendForm] = useState(false);

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
        .select();
      if (error) throw error;
      setActivitiesUs(data);
    } catch (error) {
      console.log(error);
    }
  };

  const activitySearch = (activityName, idActivity) => {
    setActivity({ id: idActivity, name: activityName });

    setDataAuxActivities([]);
    console.log(activity)
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
    console.log(newData);
    setActivity([]);
  };

  const onSubmit = async (
    { date, time, weight },
    { setSubmitting, setErrors, resetForm }
  ) => {
    setSubmitting(true);
    try {
      const weightValue = weightOption === "si" ? weight : null;
      let dataExercise = {
        uid: user.id,
        date: date,
        time: time,
        weight: weightValue,
      };

      const selectedActivity = activity;
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

      console.log(
        "Datos del ejercicio a guardar:",
        dataExercise.actividadUsuario
      );

      const { data, error } = await supabase
        .from("ejercicio")
        .insert([dataExercise]);
      if (error) throw error;
      resetForm();
      setSendForm(true);
    } catch (error) {
      console.log(error);
      setErrors({ submit: error.message });
    } finally {
      setSubmitting(false);
    }
  };

  const validationSchema = Yup.object().shape({
    date: Yup.date()
      .required("La fecha es requerida")
      .max(new Date(), "La fecha no puede ser mayor a la actual"),
    time: Yup.number()
      .required("El tiempo es requerido")
      .positive("El tiempo debe de ser positivo")
      .typeError("El tiempo debe de ser un número"),
    weight: Yup.number()
      .positive("El peso debe de ser positivo")
      .nullable(true)
      .typeError("El peso debe de ser un número")
      .notRequired(true),
  });

  useEffect(() => {
    getActivities();
    getActivitiesUs();
  }, []);

  return (
    <div>
      <SideBar />
      <div className="p-16 pt-20 sm:ml-64" data-aos="fade-up">
        <label className=" mb-2 text-sm font-medium text-gray-900 dark:text-white">
          Registro de Ejercicio
        </label>
        {!sendForm ? (
          <Formik
            initialValues={{ date: "", time: "", weight: "" }}
            onSubmit={onSubmit}
            validationSchema={validationSchema}
          >
            {({
              handleSubmit,
              handleChange,
              values,
              errors,
              touched,
              handleBlur,
              isSubmitting,
            }) => (
              <form onSubmit={handleSubmit}>
                <div className="mb-4">
                  <label htmlFor="day" className="block mb-1">
                    Fecha del Ejercicio:
                  </label>
                  <input
                    type="date"
                    id="date"
                    name="date"
                    onChange={handleChange}
                    onBlur={handleBlur}
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  />
                  <p className="text-red-500">
                    {errors.date && touched.date && errors.date}
                  </p>
                </div>
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
                        autoComplete="off"
                        onChange={handleSearch}
                        className="block w-full p-2.5 ps-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                        placeholder="Buscar actividad..."
                      />
                    </div>
                  </div>
                </div>
                {dataAuxActivities.length !== 0 && activity.length === 0 && (
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
                      <p>{activity.name}</p>
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
                    name="weigthOption"
                    id="weigthOption"
                    onChange={(event) => setWeightOption(event.target.value)}
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
                        {errors.weight && touched.weight && errors.weight}
                      </p>
                    </div>
                  )}
                </div>
                {isSubmitting ? (
                  <button
                    disabled={true}
                    type="button"
                    className="text-white disabled:opacity-55 bg-blue-700 font-medium rounded-lg text-sm px-7 py-2 text-center me-2 flex items-center"
                  >
                    <svg
                      aria-hidden="true"
                      role="status"
                      className="inline w-4 h-4 me-3 text-white animate-spin"
                      viewBox="0 0 100 101"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
                        fill="#E5E7EB"
                      />
                      <path
                        d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
                        fill="currentColor"
                      />
                    </svg>
                    Guardando...
                  </button>
                ) : (
                  <button
                    type="submit"
                    className="flex items-center justify-between bg-azulHover transition duration-300 ease-out hover:ease-out hover:bg-azul  px-7 py-1 rounded-lg text-white"
                  >
                    Guardar
                  </button>
                )}
              </form>
            )}
          </Formik>
        ) : (
          <div
            className="flex items-center p-4 mb-4 text-sm text-green-800 border border-green-300 rounded-lg bg-green-50 dark:bg-gray-800 dark:text-green-400 dark:border-green-800"
            role="alert"
          >
            <span className="sr-only">Info</span>
            <div className="text-green-400">
              <span className="font-medium">Felicidades! </span>
              Se ha registrado tu alimento correctamente.
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default ExerciseForm;