import React, { useEffect, useState } from "react";
import { useUserContext } from "../context/UserContext";
import { supabase } from "../config/supabase";
import SideBar from "../components/SideBar";
import edit from "../assets/img/edit.png";
import delate from "../assets/img/delate.png";

export default function ViewEstados() {
  const { user } = useUserContext();
  const [records, setRecords] = useState([]);
  const [loading, setLoading] = useState(false);
  const [fechaini, setFechaini] = useState(null);
  const [fechafin, setFechafin] = useState(null);

  const emotions = async () => {
    try {
      setLoading(true);
      const { data, error } = await supabase
        .from("emociones")
        .select()
        .eq("uid", user.id)
        .order("created_at", { ascending: false }); // Ordenar por created_at de forma descendente
      console.log(data);
      if (error) console.log("error", error);

      setRecords(data);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  const deleteEmotion = async (id) => {
    try {
      setLoading(true);
      await supabase
        .from("emociones")
        .delete()
        .eq("uid", user.id)
        .eq("idRegistroEmocion", id);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
      emotions(); //actualiza
    }
  };

  const filterRecords = () => {
    const filteredRecords = records.filter((record) => {
      const recordDate = new Date(record.created_at);
      return (
        (!fechaini || recordDate >= fechaini) &&
        (!fechafin || recordDate <= fechafin)
      );
    });
    return filteredRecords;
  };

  const mapEmotionToEmoji = (idEmocion) => {
    switch (idEmocion) {
      case 1:
        return "😊";
      case 2:
        return "😐";
      case 3:
        return "😔";
      // Agrega más casos según tus necesidades
      case 4:
        return "😰";
      case 5:
        return "😡";
      case 6:
        return "😪";
      default:
        return "❓"; // Emoji por defecto o mensaje de error
    }
  };

  const mapNameEmotion = (idEmocion) => {
    switch (idEmocion) {
      case 1:
        return "Felicidad";
      case 2:
        return "Sorpresa";
      case 3:
        return "Tristesa";
      // Agrega más casos según tus necesidades
      case 4:
        return "Miedo";
      case 5:
        return "Ira";
      case 6:
        return "Disgusto";
      default:
        return "❓"; // Emoji por defecto o mensaje de error
    }
  };

  const formatDate = (fecha) => {
    const fechaObjeto = new Date(fecha);
    return fechaObjeto.toLocaleDateString();
  };

  useEffect(() => {
    const emotions = async () => {
      try {
        setLoading(true);
        const { data, error } = await supabase
          .from("emociones")
          .select()
          .eq("uid", user.id);
        console.log(data);
        if (error) console.log("error", error);

        setRecords(data);
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    };
    emotions();
  }, []);

  const handleFilter = async () => {
    const fechaInicio = document.getElementById("idFIni").value;
    const fechaFin = document.getElementById("idFfin").value;

    try {
      setLoading(true);
      const { data, error } = await supabase
        .from("emociones")
        .select()
        .eq("uid", user.id)
        .gte("created_at", fechaInicio)
        .lte("created_at", fechaFin);

      if (error) console.log("error", error);
      else setRecords(data);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <SideBar />
      <div className="p-16 pt-24 sm:ml-64" data-aos="fade-up">
        <h2 className="text-2xl font-semibold mt-10">Emociones anteriores</h2>
        <p className="mb-5">Filtro por rango de fecha</p>
        <div className="flex flex-row items-center content-center mb-5">
          <div className="ml-5 mr-5">
            <p>Del</p>
          </div>
          <input
            id="idFIni"
            type="date"
            className="border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:border-blue-500"
          />
          <div className="ml-5 mr-5">
            <p>al</p>
          </div>
          <input
            id="idFfin"
            type="date"
            className="border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:border-blue-500"
          />

          <button
            className="bg-azul hover:bg-azulHover ml-5 text-white font-bold py-2 px-4 rounded shadow m-10 transition duration-300 ease-in-out"
            onClick={handleFilter}
          >
            Filtrar
          </button>
        </div>
        {loading ? (
          <p className="bg-blue-500">Cargando registros...</p>
        ) : (
          <div
            className=""
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(4,1fr)",
              gap: "15px",
            }}
          >
            {records.length === 0 ? (
              <p className="bg-yellow-500">No hay registros disponibles.</p>
            ) : (
              filterRecords().map((record) => (
                <div key={record.idEmocion} className="p-5">
                  <div className="bg-white rounded-md shadow-md ">
                    <div
                      style={{ marginTop: "10px" }}
                      className="items-center justify-center"
                    >
                      <h1 className="text-4xl mt-5 text-center">
                        {mapEmotionToEmoji(record.idEmocion)}
                      </h1>
                      <h2 className=" mt-5 text-center">
                        {mapNameEmotion(record.idEmocion)}
                      </h2>
                      <h1 className="text-center mt-2">
                        Fecha: {formatDate(record.created_at)}
                      </h1>
                      <h1 className="text-center mt-2">
                        Intensidad: {record.Intencidad}
                      </h1>
                    </div>
                    <div className="flex flex-row justify-center items-center mb-5">
                      <div
                        className="w-full h-4 mt-2 bg-blue-700 rounded-md"
                        style={{
                          width: `${(record.Intencidad / 5) * 90}%`,
                        }}
                      ></div>
                      <div
                        className="w-full h-4 mt-2  bg-slate-400 rounded-md"
                        style={{
                          width: `${((5 - record.Intencidad) / 5) * 90}%`,
                          backgroundColor: "#D3D3D3",
                        }}
                      ></div>
                    </div>
                    <div className=" flex flex-row justify-end items-center mr-5">
                      <button
                        type="button"
                        onClick={{}}
                        className="bg-azulHover p-1 rounded hover:bg-azul mb-5 mr-3"
                      >
                        <img src={edit} alt="editar" className="h-5" />
                      </button>
                      <button
                        type="button"
                        onClick={() => deleteEmotion(record.idRegistroEmocion)}
                        className="bg-red-600 p-1 rounded hover:bg-red-800 mb-5"
                      >
                        <img src={delate} alt="borrar" className="h-5" />
                      </button>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>
        )}
      </div>
    </div>
  );
}
