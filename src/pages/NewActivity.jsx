import React, { useState } from "react";
import SideBar from "../components/SideBar";
import { Formik } from "formik";
import * as Yup from "yup";
import { supabase } from "../config/supabase";
import { useUserContext } from "../context/UserContext";

export default function Activities() {
  const { user } = useUserContext();
  const [submitted, setSubmitted] = useState(false);
  const [activitieDuplicated, setActivitieDuplicated] = useState(false);
  const onSubmit = async (
    { name },
    { setSubmitting, setErrors, resetForm }
  ) => {
    setSubmitted(false);
    try {
      setSubmitting(true);
      const { data: existingData, error: selectError } = await supabase
        .from("actividadesUsuario")
        .select("nameActivity")
        .ilike("nameActivity", `%${name}%`);
      if (selectError) throw selectError;

      if (existingData.length === 0) {
        const { data, error: insertError } = await supabase
          .from("actividadesUsuario")
          .insert([{ nameActivity: name, uid: user.id }]);
        if (insertError) throw insertError;
        setSubmitted(true);
        console.log(data);
      } else {
        setActivitieDuplicated(true);
      }
      setTimeout(() => {
        setActivitieDuplicated(false);
      }, 5000);
    } catch (error) {
      console.log(error.message);
    } finally {
      setSubmitting(false);
      resetForm();
    }
  };

  const validationSchema = Yup.object({
    name: Yup.string().required("El nombre es requerido"),
  });
  return (
    <div>
      <SideBar />

      <div className="p-16 pt-20 sm:ml-64" data-aos="fade-up">
        {submitted && (
          <div
            class="flex items-center p-4 mb-4 text-sm text-green-800 border border-green-300 rounded-lg bg-green-50 dark:bg-gray-800 dark:text-green-400 dark:border-green-800"
            role="alert"
          >
            <span className="sr-only">Info</span>
            <div className="text-green-400">
              <span class="font-medium ">Felicidades! </span>
              <span>Actividad Registrada con éxito</span>
            </div>
          </div>
        )}
        {activitieDuplicated && (
          <div
            class="flex items-center p-4 mb-4 text-sm text-red-600 border border-red-300 rounded-lg bg-red-300 dark:bg-gray-800 dark:text-green-400 dark:border-green-800"
            role="alert"
          >
            <span className="sr-only">Info</span>
            <div className="text-red-500">
              <span class="font-medium ">Error! </span>
              <span>Actividad duplicada o parecida</span>
            </div>
          </div>
        )}

        <label className=" mb-2 text-sm font-medium text-gray-900 dark:text-white">
          Registro de Nueva Actividad
        </label>
        <Formik
          initialValues={{
            name: "",
          }}
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
                  Nombre de la Actividad:
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  onChange={handleChange}
                  onBlur={handleBlur}
                  value={values.name}
                  autoComplete="off"
                  placeholder="Nombre del Ejercicio"
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                />
                <p className="text-red-500">
                  {errors.name && touched.name && errors.name}
                </p>
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
                    class="inline w-4 h-4 me-3 text-white animate-spin"
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
      </div>
    </div>
  );
}
