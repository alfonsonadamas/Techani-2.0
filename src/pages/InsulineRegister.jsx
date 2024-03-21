import React, { useEffect } from "react";
import { useState } from "react";
import { useUserContext } from "../context/UserContext";
import { Formik } from "formik";
import { supabase } from "../config/supabase";
import SideBar from "../components/SideBar";
import emailjs from "@emailjs/browser";
import * as Yup from "yup";

export default function InsulineRegister() {
  const { user } = useUserContext();
  const [insulineType, setinsulineType] = useState([]);
  const [doseType, setdoseType] = useState([]);

  const getInsulineType = async () => {
    const { data, error } = await supabase.from("insulina").select("*");
    if (error) throw error;
    setinsulineType(data);
  };

  const getDoseType = async () => {
    const { data, error } = await supabase.from("tipoDosis").select("*");
    if (error) throw error;
    setdoseType(data);
  };

  const onSubmit = async (
    { dose, doseType, insulineType },
    { setSubmitting, setErrors, resetForm }
  ) => {
    console.log(doseType);
    if (doseType === "none") {
      setErrors({ doseType: "Selecciona un tipo de medición" });
      return;
    }
    if (insulineType === "none") {
      setErrors({ insulineType: "Selecciona un tipo de medición" });
      return;
    }
    const date = new Date().toLocaleDateString();
    var parts = date.split("/");
    var year = parts[2];
    var month = parts[1];
    var day = parts[0];
    var formatDate = `${year}-${month}-${day}`;
    const { data, error } = await supabase.from("registroInsulina").insert([
      {
        created_at: formatDate,
        uid: user.id,
        dosis: dose,
        tipoInsulina: insulineType,
        tipoDosis: doseType,
      },
    ]);

    if (error) throw error;
    console.log(data);

    await emailjs.send(
      "service_gb8sr3f",
      "template_jt5p6ui",
      {
        to_email: user.email,
        from_name: "Techani",
        to_name: user.user_metadata.full_name,
        message: `
         Dosis: ${dose}
         Tipo de dosis: ${doseType}
         Tipo de insulina: ${insulineType}`,
      },
      "RBjxGi8gd0qdpEToN"
    );
  };

  const validationSchema = Yup.object().shape({
    dose: Yup.number()
      .min(0, "La dosis de insulina no puede ser menor a 0")
      .max(500, "La dosis de insulina no puede ser mayor a 500")
      .required("La dosis de insulina es requerida"),
  });

  useEffect(() => {
    getInsulineType();
    getDoseType();
  }, []);

  return (
    <div>
      <SideBar />
      <div className="p-16 pt-16  sm:ml-64" data-aos="fade-up">
        <div className="w-full h-60 flex justify-center items-center">
          <div className=" w-full">
            <Formik
              initialValues={{
                dose: "",
                doseType: "none",
                insulineType: "none",
              }}
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
                  <div className="mt-48">
                    <p className="mb-4 text-sm text-gray-900 dark:text-white w-full">
                      ¡Hola! <br /> Registra tu dosis de insulina para llevar un
                      control detallado de tu diabetes. Recuerda que es
                      importante llevar un control de tus dosis para evitar una
                      hipoglucemia.
                    </p>
                    <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                      Tipo de insulina
                    </label>
                    <select
                      onChange={handleChange}
                      onBlur={handleBlur}
                      name="insulineType"
                      className="bg-gray-50 border mb-3 border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    >
                      <option value="none">
                        Selecciona un tipo de insulina
                      </option>
                      {insulineType.map((insuline) => (
                        <option
                          key={insuline.idTipoInsulina}
                          value={insuline.idTipoInsulina}
                        >
                          {insuline.insulin}
                        </option>
                      ))}
                    </select>
                    <p className="mb-4 text-sm text-red-500 dark:text-white w-full">
                      {errors.insulineType &&
                        touched.insulineType &&
                        errors.insulineType}
                    </p>
                    <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                      Tipo de dosis
                    </label>

                    <select
                      onChange={handleChange}
                      onBlur={handleBlur}
                      name="doseType"
                      value={values.doseType}
                      className="bg-gray-50 mb-3 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5  dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    >
                      <option value="none">Selecciona el tipo de dosis</option>
                      {doseType.map((insuline) => (
                        <option key={insuline.id} value={insuline.id}>
                          {insuline.tipoDosis}
                        </option>
                      ))}
                    </select>
                    <p className="mb-4 text-sm text-red-500 dark:text-white w-full">
                      {errors.doseType && touched.doseType && errors.doseType}{" "}
                    </p>
                    <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                      Dosis en unidades
                    </label>

                    <input
                      className={
                        errors.dose
                          ? "bg-gray-50 mb-2 border border-red-500  text-red-500 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5  "
                          : "bg-gray-50 mb-5 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5  "
                      }
                      type="text"
                      autoComplete="off"
                      placeholder="Ingresa la cantidad de insulina en unidades"
                      name="dose"
                      onChange={handleChange}
                      onBlur={handleBlur}
                      value={values.dose}
                      min={1}
                      max={10}
                    ></input>
                    <p className="mb-4 text-sm text-red-500 dark:text-white w-full">
                      {errors.dose && touched.dose && errors.dose}
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
