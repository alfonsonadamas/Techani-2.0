import React, { useEffect, useState } from "react";
import SideBar from "../components/SideBar";
import { useUserContext } from "../context/UserContext";
import pdf from "../assets/img/pdf.png";
import { supabase } from "../config/supabase";

export default function MyFiles() {
  const { user } = useUserContext();
  const [files, setFiles] = useState([]);

  const deleteFile = async (id, file) => {
    try {
      // const { data, error } = await supabase
      //   .from("analisisArchivos")
      //   .delete()
      //   .eq("idArchivo", id);
      // console.log(data);

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
    <div>
      <SideBar></SideBar>
      <div className="p-16 pt-24 sm:ml-64" data-aos="fade-up">
        <h2 className="text-2xl font-semibold">Mis Analisis Clinicos</h2>
        {/* <span>Seleccione una fecha:</span>
        <input
          type="date"
          className="my-8 mx-3 w-48 text-center border-gray-400 rounded-xl"
        ></input> */}

        {files &&
          files.map((file) => (
            <div>
              <div className="flex flex-row w-full h-full flex-wrap ">
                <div className="m-2 flex flex-col items-center">
                  <img src={pdf} width={120} alt="pdf" />
                  <span>{file.title}</span>
                </div>
              </div>

              <div className="flex mt-4 space-x-4">
                <a
                  target="_blank"
                  rel="noreferrer"
                  href={file.file}
                  className="flex items-center justify-between bg-green-600 transition duration-300 ease-out hover:ease-out hover:bg-green-500 px-4 py-1 rounded-lg text-white"
                >
                  Ver
                </a>

                <button
                  type="button"
                  className="flex items-center justify-between bg-red-700 transition duration-300 ease-out hover:ease-out hover:bg-red-500 px-4 py-1 rounded-lg text-white"
                  onClick={() => deleteFile(file.idArchivo, file.file)}
                >
                  Eliminar
                </button>
              </div>
            </div>
          ))}
      </div>
    </div>
  );
}
