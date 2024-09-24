import React, { useEffect, useState } from "react";
import SideBar from "../components/SideBar";
import { useUserContext } from "../context/UserContext";
import paisaje from "../assets/img/paisaje.png";
import pdf from "../assets/img/pdf.png";
import { supabase } from "../config/supabase";

export default function MyFiles() {
  const { user } = useUserContext();
  const [files, setFiles] = useState([]);

  const deleteFile = async (id, file) => {
    try {
      const { data, errorDelete } = await supabase
        .from("analisisArchivos")
        .delete()
        .eq("idArchivo", id);
      console.log(data);

      const fileName = file.substring(file.lastIndexOf("/") + 1);
      console.log(fileName);
      const { error } = await supabase.storage
        .from("analisis_archivos")
        .remove([`${user.id}/${fileName}`]);
      console.log(error);
    } catch (error) {
      console.log(error);
    }
  };

  const getFileExtentions = (file) => {
    // URL proporcionada
    const url = file;
    // Partimos el enlace para obtener la última parte (el nombre del archivo)
    const partes = url.split("/");

    // Obtenemos la última parte del arreglo, que es el nombre del archivo
    const archivo = partes[partes.length - 1];

    // Obtenemos el formato (extensión) del archivo
    const extension = archivo.split(".").pop();

    // Mostramos la extensión en consola
    console.log("La extensión del archivo es:", extension);

    return extension;
  };

  useEffect(() => {
    const fetchFiles = async () => {
      try {
        const { data } = await supabase
          .from("analisisArchivos")
          .select("*")
          .eq("uid", user.id);
        console.log("Datos ", data);
        setFiles(data);
      } catch (error) {
        console.log(error);
      }
    };
    fetchFiles();
  }, [user]);
  return (
    <div className="bg-gray-200 min-h-screen flex flex-col">
      <SideBar />

      <div
        className="flex-grow p-14 pt-24 sm:ml-64 flex flex-col"
        data-aos="fade-up"
      >
        <div className="grid grid-cols-2 gap-2 mb-4">
          <h2 className="text-2xl font-semibold">Mis Análisis Clínicos</h2>
          <div className="relative flex items-center">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <svg
                className="w-5 h-5 text-gray-500"
                aria-hidden="true"
                fill="currentColor"
                viewBox="0 0 20 20"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  fillRule="evenodd"
                  d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z"
                  clipRule="evenodd"
                ></path>
              </svg>
            </div>
            <input
              type="text"
              id="search-input"
              className="block w-full pl-10 py-2 text-gray-900 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
              placeholder="Buscar..."
            />
          </div>
        </div>

        <div className="flex-grow overflow-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {files && files.length > 0 ? (
              files.slice(0, 4).map((file) => (
                <div className="bg-white shadow-md rounded-lg p-4 w-full">
                  <div className="flex items-center">
                    <img
                      src={
                        getFileExtentions(file.file) === "pdf" ? pdf : paisaje
                      }
                      className="w-16 h-16 mr-4"
                      alt="paisaje"
                    />
                    <div>
                      <h3 className="text-lg font-bold">{file.title}</h3>
                      <p className="text-sm text-gray-500 mb-1">Fecha:</p>
                      <p className="text-sm text-gray-800">{file.date}</p>
                    </div>
                  </div>

                  <div className="mt-4">
                    <p className="text-sm text-gray-500 mb-1">Observaciones:</p>
                    <p className="text-sm text-gray-800 mb-4">
                      {file.observations}
                    </p>

                    <div className="flex justify-end space-x-4">
                      <div>
                        <a
                          target="_blank"
                          rel="noreferrer"
                          href={file.file}
                          className="flex justify-center bg-[#116C09] transition duration-300 ease-out hover:bg-green-500 px-7 py-1 rounded-lg text-white w-full"
                        >
                          Ver
                        </a>
                      </div>
                      <div>
                        <button
                          type="button"
                          className="flex justify-center bg-[#AB1A1A] transition duration-300 ease-out hover:bg-red-500 px-4 py-1 rounded-lg text-white w-full"
                          onClick={() => deleteFile(file.idArchivo, file.file)}
                        >
                          Eliminar
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              ))
            ) : (
              <p>No hay análisis clínicos disponibles.</p>
            )}
          </div>

          <div className="flex justify-center py-0 mt-2">
            <nav aria-label="Page navigation">
              <ul className="inline-flex items-center space-x-1 rounded-lg border border-gray-300 bg-white px-20 py-1 shadow-sm">
                <li>
                  <button className="px-3 py-1 rounded-lg text-gray-500 hover:bg-gray-100">
                    &lt;
                  </button>
                </li>
                <li>
                  <button className="px-3 py-1 rounded-lg bg-blue-100 text-blue-600">
                    1
                  </button>
                </li>
                <li>
                  <button className="px-3 py-1 rounded-lg text-gray-700 hover:bg-gray-100">
                    2
                  </button>
                </li>
                <li>
                  <button className="px-3 py-1 rounded-lg text-gray-700 hover:bg-gray-100">
                    3
                  </button>
                </li>
                <li>
                  <button className="px-3 py-1 rounded-lg text-gray-500 hover:bg-gray-100">
                    &gt;
                  </button>
                </li>
              </ul>
            </nav>
          </div>
        </div>
      </div>
    </div>
  );
}
