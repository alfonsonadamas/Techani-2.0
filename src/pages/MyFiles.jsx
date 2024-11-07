import React, { useEffect, useState } from "react";
import SideBar from "../components/SideBar";
import { useUserContext } from "../context/UserContext";
import paisaje from "../assets/img/paisaje.png";
import pdf from "../assets/img/pdf.png";
import { supabase } from "../config/supabase";
import Paginacion from "../components/Paginacion";

export default function MyFiles() {
  const { user } = useUserContext();
  const [files, setFiles] = useState([]);
  const [loading, setLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);

  const itemsPerPage = 4;
  const totalPages = Math.ceil(files.length / itemsPerPage);
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = files.slice(indexOfFirstItem, indexOfLastItem);

  const handlePageChange = (page) => {
    if (page > 0 && page <= totalPages) {
      setCurrentPage(page);
    }
  };

  const deleteFile = async (id, file) => {
    try {
      setLoading(true);
      const { data } = await supabase
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
      setLoading(false);
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
        </div>

        <div className="flex-grow overflow-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {files && files.length > 0 ? (
              currentItems.map((file) => (
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
                          disabled={loading}
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

          <div className="mb-5 mt-5 h-16">
            <Paginacion
              currentPage={currentPage}
              totalPages={totalPages}
              onPageChange={handlePageChange}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
