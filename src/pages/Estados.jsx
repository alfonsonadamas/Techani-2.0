import SideBar from "../components/SideBar";
import { supabase } from "../config/supabase";
import { useUserContext } from "../context/UserContext";
import React, { useEffect, useState } from "react";
export default function Estados() {
  const [estados, setEstados] = useState({ idEmocion: null, value: null });
  const [error, setError] = useState("");
  const [SaveSuccessfully, setSaveSuccessfully] = useState(false);
  const { user } = useUserContext();
  const [meditionType, setMeditionType] = useState([]);

  const handleMoodChange = (idEmocion, value) => {
    setEstados({ idEmocion, value });
    setSaveSuccessfully(false);
    setError("");
  };

  const [valor, setValor] = useState(0);

  const mostrarValor = (event) => {
    setValor(event.target.value);
  };
  const getMeditionType = async () => {
    const { data, error } = await supabase.from("medicion").select("*");
    if (error) throw error;
    setMeditionType(data);
  };
  const [timeRegistroEm, setTimeRegistroEm] = useState("");
  useEffect(() => {
    getMeditionType();
  });
  const handleTimeChange = (e) => {
    setTimeRegistroEm(e.target.value);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!estados.idEmocion || estados.value === null) {
      setError("Seleccione un estado de ánimo y la intensidad, por favor");
      return;
    }

    try {
      // Obtener el idEmocion y value del estado de ánimo seleccionado
      const { idEmocion } = estados;

      // Realizar la lógica para guardar en la tabla 'emociones' en la base de datos
      const { data, error } = await supabase.from("emociones").insert([
        {
          idEmocion: idEmocion,
          Intencidad: valor,
          uid: user.id,
          timeRegistroEm: timeRegistroEm, // Asumiendo que el campo en la tabla de Supabase es 'valorIntensidad'
        },
      ]);

      if (error) {
        throw error;
      }

      console.log("Estado de ánimo guardado exitosamente:", data);

      setSaveSuccessfully(true);

      // Ocultar mensaje de éxito después de 3 segundos
      setTimeout(() => {
        setSaveSuccessfully(false);
      }, 3000);

      // Puedes realizar acciones adicionales después de guardar en la base de datos
    } catch (error) {
      setError(
        "Error al guardar el estado de ánimo en la base de datos, verifique su conexión"
      );
      console.error(error);
    }
  };
  const totalEmotions = 6; // Número total de emociones
  const angle = 360 / totalEmotions;

  return (
    <div>
      <SideBar />
      <div className="p-16 pt-20 sm:ml-64" data-aos="fade-up">
        <label htmlFor="day" className="block mb-2 text-xl font-semibold mt-2">
          Registro del estado de ánimo:
        </label>

        <form onSubmit={handleSubmit}>
          ¿Como te sientes hoy?
          <div className="mb-4">
            <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"></label>
          </div>
          <div className="mb-4">
            <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
              Seleccionar estado de ánimo:
            </label>
            {/* <label className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">Seleccionar estado de ánimo:</label> */}

            <div className="flex w-full items-center justify-center">
              <div
                style={{
                  width: "auto",
                  height: "auto",
                  position: "relative",
                  overflow: "hidden",
                }}
              >
                <div
                  className=""
                  style={{
                    width: "100%",
                    height: "100%",
                    display: "grid",
                    gridTemplateColumns: `repeat(8, 1fr)`,
                    gap: "30px",
                    placeItems: "center",
                    padding: "20px",
                  }}
                >
                  <div className="flex flex-col items-center">
                    <button
                      type="button"
                      style={{
                        fontSize: "2.5rem",
                        lineHeight: "1",
                        width: "4rem",
                        height: "4rem",
                        backgroundColor:
                          estados.idEmocion === 1
                            ? "#1a56db"
                            : "rgba(0, 0, 0, 0)",
                        transition: "background-color 0.3s ease",
                      }}
                      className="hover:bg-blue-700 rounded-full flex items-center justify-center"
                      onClick={() => handleMoodChange(1, "😊")}
                    >
                      😊
                    </button>
                    <p>Alegría</p>
                  </div>

                  <div className="flex flex-col items-center">
                    <button
                      type="button"
                      style={{
                        fontSize: "2.5rem",
                        lineHeight: "1",
                        width: "4rem",
                        height: "4rem",
                        backgroundColor:
                          estados.idEmocion === 2
                            ? "#1a56db"
                            : "rgba(0, 0, 0, 0)",
                        transition: "background-color 0.3s ease",
                      }}
                      className="hover:bg-blue-700 rounded-full flex items-center justify-center"
                      onClick={() => handleMoodChange(2, "😎")}
                    >
                      😎
                    </button>
                    <p>Orgullo</p>
                  </div>

                  <div className="flex flex-col items-center">
                    <button
                      type="button"
                      style={{
                        fontSize: "2.5rem",
                        lineHeight: "1",
                        width: "4rem",
                        height: "4rem",
                        backgroundColor:
                          estados.idEmocion === 3
                            ? "#1a56db"
                            : "rgba(0, 0, 0, 0)",
                        transition: "background-color 0.3s ease",
                      }}
                      className="hover:bg-blue-700 rounded-full flex items-center justify-center"
                      onClick={() => handleMoodChange(3, "🥹")}
                    >
                      🥹
                    </button>
                    <p>Depresión</p>
                  </div>

                  <div className="flex flex-col items-center">
                    <button
                      type="button"
                      style={{
                        fontSize: "2.5rem",
                        lineHeight: "1",
                        width: "4rem",
                        height: "4rem",
                        backgroundColor:
                          estados.idEmocion === 4
                            ? "#1a56db"
                            : "rgba(0, 0, 0, 0)",
                        transition: "background-color 0.3s ease",
                      }}
                      className="hover:bg-blue-700 rounded-full flex items-center justify-center"
                      onClick={() => handleMoodChange(4, "😰")}
                    >
                      😰
                    </button>
                    <p>Miedo</p>
                  </div>

                  <div className="flex flex-col items-center">
                    <button
                      type="button"
                      style={{
                        fontSize: "2.5rem",
                        lineHeight: "1",
                        width: "4rem",
                        height: "4rem",
                        backgroundColor:
                          estados.idEmocion === 5
                            ? "#1a56db"
                            : "rgba(0, 0, 0, 0)",
                        transition: "background-color 0.3s ease",
                      }}
                      className="hover:bg-blue-700 rounded-full flex items-center justify-center"
                      onClick={() => handleMoodChange(5, "😡")}
                    >
                      😡
                    </button>
                    <p>Ira</p>
                  </div>

                  <div className="flex flex-col items-center">
                    <button
                      type="button"
                      style={{
                        fontSize: "2.5rem",
                        lineHeight: "1",
                        width: "4rem",
                        height: "4rem",
                        backgroundColor:
                          estados.idEmocion === 6
                            ? "#1a56db"
                            : "rgba(0, 0, 0, 0)",
                        transition: "background-color 0.3s ease",
                      }}
                      className="hover:bg-blue-700 rounded-full flex items-center justify-center"
                      onClick={() => handleMoodChange(6, "🤗")}
                    >
                      🤗
                    </button>
                    <p>Gratidud</p>
                  </div>

                  <div className="flex flex-col items-center">
                    <button
                      type="button"
                      style={{
                        fontSize: "2.5rem",
                        lineHeight: "1",
                        width: "4rem",
                        height: "4rem",
                        backgroundColor:
                          estados.idEmocion === 7
                            ? "#1a56db"
                            : "rgba(0, 0, 0, 0)",
                        transition: "background-color 0.3s ease",
                      }}
                      className="hover:bg-blue-700 rounded-full flex items-center justify-center"
                      onClick={() => handleMoodChange(7, "🙏🏻")}
                    >
                      🙏🏻
                    </button>
                    <p>Esperanza</p>
                  </div>
                  <div className="flex flex-col items-center">
                    <button
                      type="button"
                      style={{
                        fontSize: "2.5rem",
                        lineHeight: "1",
                        width: "4rem",
                        height: "4rem",
                        backgroundColor:
                          estados.idEmocion === 8
                            ? "#1a56db"
                            : "rgba(0, 0, 0, 0)",
                        transition: "background-color 0.3s ease",
                      }}
                      className="hover:bg-blue-700 rounded-full flex items-center justify-center"
                      onClick={() => handleMoodChange(8, "😌")}
                    >
                      😌
                    </button>
                    <p>Satisfacción</p>
                  </div>
                  <div className="flex flex-col items-center">
                    <button
                      type="button"
                      style={{
                        fontSize: "2.5rem",
                        lineHeight: "1",
                        width: "4rem",
                        height: "4rem",
                        backgroundColor:
                          estados.idEmocion === 9
                            ? "#1a56db"
                            : "rgba(0, 0, 0, 0)",
                        transition: "background-color 0.3s ease",
                      }}
                      className="hover:bg-blue-700 rounded-full flex items-center justify-center"
                      onClick={() => handleMoodChange(9, "💪🏻")}
                    >
                      💪🏻
                    </button>
                    <p>Valentía</p>
                  </div>
                  <div className="flex flex-col items-center">
                    <button
                      type="button"
                      style={{
                        fontSize: "2.5rem",
                        lineHeight: "1",
                        width: "4rem",
                        height: "4rem",
                        backgroundColor:
                          estados.idEmocion === 10
                            ? "#1a56db"
                            : "rgba(0, 0, 0, 0)",
                        transition: "background-color 0.3s ease",
                      }}
                      className="hover:bg-blue-700 rounded-full flex items-center justify-center"
                      onClick={() => handleMoodChange(10, "😉")}
                    >
                      😉
                    </button>
                    <p>Optimismo</p>
                  </div>
                  <div className="flex flex-col items-center">
                    <button
                      type="button"
                      style={{
                        fontSize: "2.5rem",
                        lineHeight: "1",
                        width: "4rem",
                        height: "4rem",
                        backgroundColor:
                          estados.idEmocion === 11
                            ? "#1a56db"
                            : "rgba(0, 0, 0, 0)",
                        transition: "background-color 0.3s ease",
                      }}
                      className="hover:bg-blue-700 rounded-full flex items-center justify-center"
                      onClick={() => handleMoodChange(11, "😁")}
                    >
                      😁
                    </button>
                    <p>Entusiasmo</p>
                  </div>
                  <div className="flex flex-col items-center">
                    <button
                      type="button"
                      style={{
                        fontSize: "2.5rem",
                        lineHeight: "1",
                        width: "4rem",
                        height: "4rem",
                        backgroundColor:
                          estados.idEmocion === 12
                            ? "#1a56db"
                            : "rgba(0, 0, 0, 0)",
                        transition: "background-color 0.3s ease",
                      }}
                      className="hover:bg-blue-700 rounded-full flex items-center justify-center"
                      onClick={() => handleMoodChange(12, "🤯")}
                    >
                      🤯
                    </button>
                    <p>Frustración</p>
                  </div>
                  <div className="flex flex-col items-center">
                    <button
                      type="button"
                      style={{
                        fontSize: "2.5rem",
                        lineHeight: "1",
                        width: "4rem",
                        height: "4rem",
                        backgroundColor:
                          estados.idEmocion === 13
                            ? "#1a56db"
                            : "rgba(0, 0, 0, 0)",
                        transition: "background-color 0.3s ease",
                      }}
                      className="hover:bg-blue-700 rounded-full flex items-center justify-center"
                      onClick={() => handleMoodChange(13, "🤦🏻‍♂")}
                    >
                      🤦🏻‍♂
                    </button>
                    <p>Desesperación</p>
                  </div>
                  <div className="flex flex-col items-center">
                    <button
                      type="button"
                      style={{
                        fontSize: "2.5rem",
                        lineHeight: "1",
                        width: "4rem",
                        height: "4rem",
                        backgroundColor:
                          estados.idEmocion === 14
                            ? "#1a56db"
                            : "rgba(0, 0, 0, 0)",
                        transition: "background-color 0.3s ease",
                      }}
                      className="hover:bg-blue-700 rounded-full flex items-center justify-center"
                      onClick={() => handleMoodChange(14, "😥")}
                    >
                      😥
                    </button>
                    <p>Ansiedad</p>
                  </div>
                  <div className="flex flex-col items-center">
                    <button
                      type="button"
                      style={{
                        fontSize: "2.5rem",
                        lineHeight: "1",
                        width: "4rem",
                        height: "4rem",
                        backgroundColor:
                          estados.idEmocion === 15
                            ? "#1a56db"
                            : "rgba(0, 0, 0, 0)",
                        transition: "background-color 0.3s ease",
                      }}
                      className="hover:bg-blue-700 rounded-full flex items-center justify-center"
                      onClick={() => handleMoodChange(15, "🥺")}
                    >
                      🥺
                    </button>
                    <p>Culpa</p>
                  </div>
                  <div className="flex flex-col items-center">
                    <button
                      type="button"
                      style={{
                        fontSize: "2.5rem",
                        lineHeight: "1",
                        width: "4rem",
                        height: "4rem",
                        backgroundColor:
                          estados.idEmocion === 16
                            ? "#1a56db"
                            : "rgba(0, 0, 0, 0)",
                        transition: "background-color 0.3s ease",
                      }}
                      className="hover:bg-blue-700 rounded-full flex items-center justify-center"
                      onClick={() => handleMoodChange(16, "😳")}
                    >
                      😳
                    </button>
                    <p>Vergüenza</p>
                  </div>
                  <div className="flex flex-col items-center">
                    <button
                      type="button"
                      style={{
                        fontSize: "2.5rem",
                        lineHeight: "1",
                        width: "4rem",
                        height: "4rem",
                        backgroundColor:
                          estados.idEmocion === 17
                            ? "#1a56db"
                            : "rgba(0, 0, 0, 0)",
                        transition: "background-color 0.3s ease",
                      }}
                      className="hover:bg-blue-700 rounded-full flex items-center justify-center"
                      onClick={() => handleMoodChange(17, "😐")}
                    >
                      😐
                    </button>
                    <p>Apatía</p>
                  </div>
                  <div className="flex flex-col items-center">
                    <button
                      type="button"
                      style={{
                        fontSize: "2.5rem",
                        lineHeight: "1",
                        width: "4rem",
                        height: "4rem",
                        backgroundColor:
                          estados.idEmocion === 18
                            ? "#1a56db"
                            : "rgba(0, 0, 0, 0)",
                        transition: "background-color 0.3s ease",
                      }}
                      className="hover:bg-blue-700 rounded-full flex items-center justify-center"
                      onClick={() => handleMoodChange(18, "😔")}
                    >
                      😔
                    </button>
                    <p>Aislamiento</p>
                  </div>
                  <div className="flex flex-col items-center">
                    <button
                      type="button"
                      style={{
                        fontSize: "2.5rem",
                        lineHeight: "1",
                        width: "4rem",
                        height: "4rem",
                        backgroundColor:
                          estados.idEmocion === 19
                            ? "#1a56db"
                            : "rgba(0, 0, 0, 0)",
                        transition: "background-color 0.3s ease",
                      }}
                      className="hover:bg-blue-700 rounded-full flex items-center justify-center"
                      onClick={() => handleMoodChange(19, "😢")}
                    >
                      😢
                    </button>
                    <p>Vulnerabilidad</p>
                  </div>
                  <div className="flex flex-col items-center">
                    <button
                      type="button"
                      style={{
                        fontSize: "2.5rem",
                        lineHeight: "1",
                        width: "4rem",
                        height: "4rem",
                        backgroundColor:
                          estados.idEmocion === 20
                            ? "#1a56db"
                            : "rgba(0, 0, 0, 0)",
                        transition: "background-color 0.3s ease",
                      }}
                      className="hover:bg-blue-700 rounded-full flex items-center justify-center"
                      onClick={() => handleMoodChange(20, "😒")}
                    >
                      😒
                    </button>
                    <p>Desconfianza</p>
                  </div>
                  <div className="flex flex-col items-center">
                    <button
                      type="button"
                      style={{
                        fontSize: "2.5rem",
                        lineHeight: "1",
                        width: "4rem",
                        height: "4rem",
                        backgroundColor:
                          estados.idEmocion === 21
                            ? "#1a56db"
                            : "rgba(0, 0, 0, 0)",
                        transition: "background-color 0.3s ease",
                      }}
                      className="hover:bg-blue-700 rounded-full flex items-center justify-center"
                      onClick={() => handleMoodChange(21, "🤨")}
                    >
                      🤨
                    </button>
                    <p>Escepticismo</p>
                  </div>
                  <div className="flex flex-col items-center">
                    <button
                      type="button"
                      style={{
                        fontSize: "2.5rem",
                        lineHeight: "1",
                        width: "4rem",
                        height: "4rem",
                        backgroundColor:
                          estados.idEmocion === 22
                            ? "#1a56db"
                            : "rgba(0, 0, 0, 0)",
                        transition: "background-color 0.3s ease",
                      }}
                      className="hover:bg-blue-700 rounded-full flex items-center justify-center"
                      onClick={() => handleMoodChange(22, "😠")}
                    >
                      😠
                    </button>
                    <p>Resentimiento</p>
                  </div>
                  <div className="flex flex-col items-center">
                    <button
                      type="button"
                      style={{
                        fontSize: "2.5rem",
                        lineHeight: "1",
                        width: "4rem",
                        height: "4rem",
                        backgroundColor:
                          estados.idEmocion === 23
                            ? "#1a56db"
                            : "rgba(0, 0, 0, 0)",
                        transition: "background-color 0.3s ease",
                      }}
                      className="hover:bg-blue-700 rounded-full flex items-center justify-center"
                      onClick={() => handleMoodChange(23, "😖")}
                    >
                      😖
                    </button>
                    <p>Estrés</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="w-full mt-10">
              <label
                htmlFor="rango"
                className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
              >
                ¿Con cuanta intensidad sientes tu emoción?
              </label>
              <input
                type="range"
                id="rango"
                name="rango"
                min="1"
                max="5"
                step="1"
                className="form-range w-full mt-2"
                onChange={mostrarValor}
                value={valor}
              />
              <p className="text-center text-gray-700 mt-2">{valor}</p>
            </div>

            <div>
              <label
                htmlFor="timeRegistroEm"
                className=" mb-2 text-sm font-medium text-gray-900 dark:text-white"
              >
                En que tiempo del día haces el registro:
              </label>
              <select
                className="bg-gray-50 border mb-5 border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                name="timeRegistroEm"
                id="timeRegistroEm"
                value={timeRegistroEm}
                onChange={handleTimeChange}
              >
                <option disabled value="">
                  -- Selecciona una opcion --
                </option>
                {meditionType.map((medition) => (
                  <option key={medition.idMedicion} value={medition.idMedicion}>
                    {medition.measurement}
                  </option>
                ))}
              </select>
            </div>

            {error && <p className="text-red-500 text-sm mt-1">{error}</p>}
            {SaveSuccessfully && (
              <div
                className="flex items-center p-4 mb-4 text-sm text-green-800 border border-green-300 rounded-lg bg-green-50 dark:bg-gray-800 dark:text-green-400 dark:border-green-800"
                role="alert"
              >
                <span className="sr-only">Info</span>
                <div className="text-green-400">
                  <span class="font-medium ">Felicidades! </span>
                  Se ha registrado tu ejercicio correctamente.{" "}
                </div>
              </div>
            )}
          </div>
          <div className="flex items-center justify-between">
            <button
              type="submit"
              className="bg-blue-700 text-white py-2 px-4 rounded-md hover:bg-blue-800"
            >
              Guardar
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
