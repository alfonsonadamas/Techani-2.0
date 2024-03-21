import React from "react";
import { useUserContext } from "../context/UserContext";
import { Formik } from "formik";
import { supabase } from "../config/supabase";
import SideBar from "../components/SideBar";
import * as Yup from "yup";

export default function WaterRegister() {
  const { user } = useUserContext();

  const onSubmit = async (
    { water },
    { setSubmitting, setErrors, resetForm }
  ) => {
    setSubmitting(true);
    const date = new Date().toLocaleDateString();

    var parts = date.split("/");
    var year = parts[2];
    var month = parts[1];
    var day = parts[0];
    var formatDate = `${year}-${month}-${day}`;

    const { data, error } = await supabase.from("registroAgua").insert([
      {
        created_at: formatDate,
        agua: water,
        uid: user.id,
      },
    ]);

    if (error) throw error;
    console.log(data);
  };

  const validationSchema = Yup.object().shape({
    water: Yup.number()
      .min(1, "El agua consumida no puede ser menor a 1")
      .max(500, "El agua consumida no puede ser mayor a 500")
      .required("El agua consumida es requerida"),
  });

  return (
    <div>
      <SideBar />
      <div className="p-16 pt-16  sm:ml-64" data-aos="fade-up">
        <div className="w-full h-60 flex justify-center items-center">
          <div className=" w-full">
            <Formik
              initialValues={{ water: "" }}
              onSubmit={onSubmit}
              validationSchema={validationSchema}
            >
              {({
                values,
                handleSubmit,
                handleChange,
                errors,
                touched,
                handleBlur,
                isSubmitting,
              }) => (
                <form onSubmit={handleSubmit} className="mx-auto w-full ">
                  <div className="mt-20">
                    <p className="mb-4 text-sm text-gray-900 dark:text-white w-full">
                      ¡Hola! <br /> Registra la ingesta de agua que has tenido
                      el día de hoy.
                    </p>
                    <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                      Agua consumida en vasos de 250ml
                    </label>

                    <input
                      className={
                        errors.water
                          ? "bg-gray-50 mb-2 border border-red-500  text-red-500 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5  "
                          : "bg-gray-50 mb-5 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5  "
                      }
                      type="text"
                      autoComplete="off"
                      name="water"
                      onChange={handleChange}
                      onBlur={handleBlur}
                      placeholder="Ingresa la cantidad de agua consumida en vasos de 250ml"
                      value={values.water}
                      min={1}
                      max={10}
                    ></input>

                    <p className="mb-4 text-sm text-red-500 dark:text-white w-full">
                      {errors.water && touched.water && errors.water}
                    </p>

                    <button
                      className="flex items-center justify-between bg-azulHover transition duration-300 ease-out hover:ease-out hover:bg-azul  px-7 py-1 rounded-lg text-white"
                      type="submit"
                    >
                      Guardar
                    </button>
                  </div>
                </form>
              )}
            </Formik>
          </div>
        </div>
      </div>
    </div>
  );
}
