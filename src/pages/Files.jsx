import React, { useState } from "react";
import SideBar from "../components/SideBar";
import { Formik } from "formik";
import { supabase } from "../config/supabase";
import { useUserContext } from "../context/UserContext";
import { toast, ToastContainer } from "react-toastify";

export default function Files() {
  const [caracteres, setCaracteres] = useState(200);
  const [file, setFile] = useState(null);
  const { user } = useUserContext();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null)

  const onSubmit = async (
    { filename, date, observation },
    { setErrors, resetForm }
  ) => {
    try {
      setLoading(true);
      const { error } = await supabase.storage
        .from("analisis_archivos")
        .upload(`${user.id}/${file.name}`, file);

      if (error && error.error === "Duplicate") {
        toast.error("El archivo ya existe");
      } else {
        const { data, error } = supabase.storage
          .from("analisis_archivos")
          .getPublicUrl(`${user.id}/${file.name}`);
        console.log("link:");
        console.log(data.publicUrl, error);

        await supabase.from("analisisArchivos").insert({
          title: filename,
          date: date,
          observations: observation,
          uid: user.id,
          file: data.publicUrl,
        });
        toast.success("Archivo subido correctamente");
      }
    } catch (error) {
      console.log("Error", error);
    } finally {
      setLoading(false);
    }
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
  //función que verifica el archivo que se está subiendo tiene el peso y el formato adecuado
  const validationFile = (e) => {
    const selectedFile = e.target.files[0];
    const typeOfFile = selectedFile.name.split(".").slice(-1)[0].toLowerCase();
    const extensions = ["jpg","png","jpeg"];  
    console.log(selectedFile)
    if(extensions.includes(typeOfFile)){
      if(selectedFile.size <= 300000){
        setFile(selectedFile);
        setError(null);
      } else{
        setError("El tamaño de la imágen es demasiado grande, elige otra.");
      setFile(null);
      e.target.value = null; 
      }
    } else{
      setFile(null);
        setError("El tipo de archivo no es valido.");
        e.target.value = null;
    }
   
  }

  return (
    <div>
      <SideBar></SideBar>
      <div className="p-16 pt-24 ml-64" data-aos="fade-up">
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
            resetForm,
          }) => (
            <form onSubmit={handleSubmit}>
              <ToastContainer />
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
                  name="file"
                  accept="image/jpeg,image/png"
                  autoComplete="off"
                  onChange={
                    validationFile
                  }
                  onBlur={handleBlur}
                  aria-describedby="helper-text-explanation"
                  className={
                    error
                      ? "bg-gray-50 mb-2 border border-red-500  text-red-500 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full "
                      : "bg-gray-50 mb-5 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full "
                  }
                  placeholder="Ingresa el nombre del Análisis"
                />
                <p className="text-red-500 text-xs rounded-lg">{error}</p>
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
                className="flex items-center justify-between bg-azulHover transition duration-300 ease-out hover:ease-out hover:bg-azul  px-7 py-1 rounded-lg text-white disabled:opacity-50"
                disabled={loading}
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
