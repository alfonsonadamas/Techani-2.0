import React, { useState } from "react";
import SideBar from "../components/SideBar";
import { Formik } from "formik";
import { supabase } from "../config/supabase";
import { useUserContext } from "../context/UserContext";

export default function Files() {
  const [caracteres, setCaracteres] = useState(200);
  const [file, setFile] = useState(null);
  const { user } = useUserContext();

  const getUrl = async (filename) => {
    const { data2, error2 } = supabase.storage
      .from("analisis_archivos")
      .download(
        `analisis_archivos/8181e603-1925-4f40-90d5-22dc936b560f/Hola2.pdf`
      );
    console.log("Registro URL");
    console.log(error2, data2);
  };

  const onSubmit = async ({ filename, date, observation }) => {
    console.log(filename, file, date, observation);

    try {
      const { data, error } = await supabase.storage
        .from("analisis_archivos")
        .upload(
          `${user.id}/${filename}${
            file.type === "image/png" ? ".png" : ".pdf"
          }`,
          file
        );
      getUrl(filename);
      // const { data, error } = await supabase.from("analisis_archivos").insert({
      //   type: filename,
      //   date: date,
      //   observations: observation,
      //   uid: user.id,
      // });
      // console.log(data);
      console.log(error, data);
    } catch (error) {}
  };

  const handleCount = () => {
    const textArea = document.getElementById("textArea");
    const maxLength = textArea.getAttribute("maxlength");
    const currentLength = textArea.value.length;

    if (currentLength >= maxLength) {
      setCaracteres(0);
    } else {
      setCaracteres(maxLength - currentLength);
    }
  };

  return (
    <div>
      <SideBar></SideBar>
      <div className="p-16 pt-24 ml-64">
        <Formik
          initialValues={{ filename: "", date: "", observation: "" }}
          onSubmit={onSubmit}
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
            <form onSubmit={handleSubmit}>
              <div className="flex">
                <div className="flex-1 mr-2">
                  <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                    Tipo de Análisis
                  </label>
                  <input
                    type="text"
                    name="filename"
                    autoComplete="off"
                    onChange={handleChange}
                    onBlur={handleBlur}
                    aria-describedby="helper-text-explanation"
                    className={
                      errors.glucose
                        ? "bg-gray-50 mb-2 border border-red-500 text-red-500 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                        : "bg-gray-50 mb-5 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                    }
                    placeholder="Ingresa el nombre del Análisis"
                  />
                </div>
                <div className="flex-1 ml-2">
                  <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                    Fecha de los Análisis
                  </label>
                  <input
                    type="date"
                    name="date"
                    autoComplete="off"
                    onChange={handleChange}
                    onBlur={handleBlur}
                    aria-describedby="helper-text-explanation"
                    className={
                      errors.glucose
                        ? "bg-gray-50 mb-2 border border-red-500 text-red-500 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                        : "bg-gray-50 mb-5 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                    }
                    placeholder="Fecha del Análisis"
                  />
                </div>
              </div>
              <div>
                <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                  Subir archivos de Análisis
                </label>
                <input
                  type="file"
                  name="filename"
                  accept="image/jpeg, application/pdf"
                  autoComplete="off"
                  onChange={(e) => {
                    setFile(e.target.files[0]);
                  }}
                  onBlur={handleBlur}
                  aria-describedby="helper-text-explanation"
                  className={
                    errors.glucose
                      ? "bg-gray-50 mb-2 border border-red-500  text-red-500 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full "
                      : "bg-gray-50 mb-5 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full "
                  }
                  placeholder="Ingresa el nombre del Análisis"
                />
              </div>
              <div>
                <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white ">
                  Observaciones
                </label>

                <textarea
                  onChange={handleChange}
                  onBlur={handleBlur}
                  onInput={handleCount}
                  value={values.observation}
                  id="textArea"
                  maxLength="200"
                  placeholder="Ingresa tus observaciones aquí"
                  name="observation"
                  className="bg-gray-50 mb-2 h-32 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5   resize-none"
                ></textarea>
                <p className="mb-5">Caracteres restantes: {caracteres}</p>
              </div>
              <button
                type="submit"
                className="flex items-center justify-between bg-azulHover transition duration-300 ease-out hover:ease-out hover:bg-azul  px-7 py-1 rounded-lg text-white"
              >
                Guardar
              </button>
            </form>
          )}
        </Formik>
      </div>
    </div>
  );
}
