import React, { useState, useEffect } from "react";
import { useUserContext } from "../context/UserContext";
import { supabase } from "../config/supabase";
import SideBar from "../components/SideBar";
import * as Yup from "yup";
import { Formik } from "formik";

export default function Comidas() {
  // Obtenemos el usuario del contexto
  const { user } = useUserContext();

  // Estados para el nombre del alimento, tipo de alimento, carga, registros y tipos de alimentos
  const [exercise, setExercise] = useState("");
  const [records, setRecords] = useState([]);
  const [sendForm, setSendForm] = useState(false);

  // Obtiene la fecha actual

  const validationSchema = Yup.object({
    exercise: Yup.string()
      .matches(/^[^\d]+$/, "El campo debe ser texto")
      .required("Este campo es requerido"),
  });

  // Función para insertar el alimento en la base de datos
  const handleSubmitexercise = async (
    { exercise },
    { setSubmitting, setErrors, resetForm }
  ) => {
    try {
      setSubmitting(true);
      // Insertamos el alimento en la tabla 'BancoAlimentos'
      const { data, error } = await supabase.from("actividadesUsuario").insert({
        nameActivity: exercise,
        uid: user.id,
      });

      if (error) throw error;
      resetForm();
      console.log("Enviado");
      setSendForm(true);

      //Si llega aqui actualizar un estado de enviado == true

      // Actualizamos los registros con el nuevo alimento
      setRecords([...records, data[0]]);
    } catch (error) {
      console.error("Error al agregar el ejercicio", error.message, exercise);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div>
      <SideBar />
      <div className="p-16 pt-20 sm:ml-64" data-aos="fade-up">
        {!sendForm ? (
          <>
            <label className="block mb-2 text-2xl font-medium text-gray-900 dark:text-white">
              Registro de un nuevo ejercicio
            </label>

            <Formik
              initialValues={{
                exercise: "",
              }}
              validationSchema={validationSchema}
              onSubmit={handleSubmitexercise}
            >
              {({
                values,
                errors,
                touched,
                handleBlur,
                handleChange,
                handleSubmit,
              }) => (
                <form onSubmit={handleSubmit}>
                  <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                    Nombre del ejercicio a agregar
                  </label>
                  <input
                    name="exercise"
                    id="exercise"
                    type="text"
                    value={values.exercise}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    autoComplete="off"
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  />
                  <p className="mb-4 text-sm text-red-500 dark:text-white w-full">
                    {errors.exercise && touched.exercise && errors.exercise}
                  </p>

                  <button
                    type="submit"
                    className="flex items-center justify-between bg-azulHover transition duration-300 ease-out hover:ease-out hover:bg-azul mt-4 px-7 py-1 rounded-lg text-white"
                  >
                    Guardar
                  </button>
                </form>
              )}
            </Formik>
          </>
        ) : (
          <div
            className="flex items-center p-4 mb-4 text-sm text-green-800 border border-green-300 rounded-lg bg-green-50 dark:bg-gray-800 dark:text-green-400 dark:border-green-800"
            role="alert"
          >
            <span className="sr-only">Info</span>
            <div className="text-green-400">
              <span class="font-medium ">Felicidades! </span>
              Se ha registrado tu ejercicio correctamente.{" "}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
