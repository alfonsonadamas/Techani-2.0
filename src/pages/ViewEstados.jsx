import React, { useEffect, useState } from "react";
import { useUserContext } from "../context/UserContext";
import { supabase } from "../config/supabase";
import SideBar from "../components/SideBar";

export default function ViewEstados() {
  const { user } = useUserContext();
  const [records, setRecords] = useState([]);
  const [loading, setLoading] = useState(false);

  const mapEmotionToEmoji = (idEmocion) => {
    switch (idEmocion) {
      case 1:
        return "😊";
      case 2:
        return "😐";
      case 3:
        return "😔";
      // Agrega más casos según tus necesidades
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
  }, [user.id]);

  return (
    <div>
      <SideBar />
      <div className="p-16 pt-24 sm:ml-64" data-aos="fade-up">
        <h2 className="text-2xl font-semibold mt-10">Emociones anteriores</h2>

        {loading ? (
          <p className="bg-blue-500">Cargando registros...</p>
        ) : (
          <div>
            {records.length === 0 ? (
              <p className="bg-yellow-500">No hay registros disponibles.</p>
            ) : (
              <div>
                <h3 className="text-lg font-semibold mt-4">Registros:</h3>
                <div
                  className="flex flex-wrap justify-between m-10 mt-15"
                  style={{ display: "flex", flex: "wrap" }}
                >
                  {records.map((record) => (
                    <div
                      className="w-48 h-auto p-4 bg-white rounded-md shadow-md flex flex-col "
                      key={record.idEmocion}
                    >
                      <div
                        style={{ marginTop: "10px" }}
                        className="items-center justify-center"
                      >
                        <h1 className="text-4xl mt-5 text-center">
                          {mapEmotionToEmoji(record.idEmocion)}
                        </h1>
                        <h1 className="text-center mt-2">
                          Fecha: {formatDate(record.created_at)}
                        </h1>
                        <h1 className="text-center mt-2">
                          Intensidad: {record.Intencidad}
                        </h1>
                      </div>
                      <div className="flex flex-row">
                        <div
                          className="w-full h-4 mt-2 bg-blue-700 rounded-md"
                          style={{
                            width: `${(record.Intencidad / 5) * 100}%`,
                          }}
                        ></div>
                        <div
                          className="w-full h-4 mt-2 bg-slate-400 rounded-md"
                          style={{
                            width: `${((5 - record.Intencidad) / 5) * 100}%`,
                            backgroundColor: "#D3D3D3",
                          }}
                        ></div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
