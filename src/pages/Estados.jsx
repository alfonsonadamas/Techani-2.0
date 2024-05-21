import React, { useState } from "react";
import { Link } from "react-router-dom";
import SideBar from "../components/SideBar";
import { supabase } from "../config/supabase";
import { useUserContext } from "../context/UserContext";

export default function Estados() {
  const [estados, setEstados] = useState({ idEmocion: null, value: null });
  const [error, setError] = useState("");
  const [SaveSuccessfully, setSaveSuccessfully] = useState(false);
  const { user } = useUserContext();

  const handleMoodChange = (idEmocion, value) => {
    setEstados({ idEmocion, value });
    setSaveSuccessfully(false);
    setError("");
  };

  const [valor, setValor] = useState(0);

  const mostrarValor = (event) => {
    setValor(event.target.value);
  };

  const [timeRegistroEm, setTimeRegistroEm] = useState("");

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
      const { idEmocion, value } = estados;

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
        <label htmlFor="day" className="block mb-1">
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
                  width: "400px",
                  height: "400px",
                  borderRadius: "50%",
                  position: "relative",
                  overflow: "hidden",
                }}
              >
                <div
                  className=""
                  style={{
                    width: "100%",
                    height: "100%",
                    backgroundImage:
                      "conic-gradient(#1a56db 0%, #F9F9CE 0%, #F9F9CE 16.67%, #DEF9CE 16.67%, #DEF9CE 33.33%, #CEF9EF 33.33%, #CEF9EF 50%, #CEEDF9 50%, #CEEDF9 66.67%, #CED5F9 66.67%, #CED5F9 83.33%, #E0CEF9 83.33%, #E0CEF9 100%)",
                    display: "grid",
                    gridTemplateColumns: `repeat(2, 3fr)`,
                    gap: "0",

                    placeItems: "center",
                  }}
                >
                  <div
                    className="flex flex-col items-center"
                    style={{ marginLeft: "40px", marginTop: "15px" }}
                  >
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
                      className=" hover:bg-blue-700 rounded-full flex items-center justify-center"
                      onClick={() => handleMoodChange(1, "😊")}
                    >
                      😊
                    </button>
                    <p>Felicidad</p>
                  </div>

                  <div
                    className="flex flex-col items-center"
                    style={{ marginRight: "40px", marginTop: "15px" }}
                  >
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
                      className=" hover:bg-blue-700 rounded-full flex items-center justify-center"
                      onClick={() => handleMoodChange(2, "😐")}
                    >
                      😐
                    </button>
                    <p>Sorpresa</p>
                  </div>

                  <div
                    className="flex flex-col items-center"
                    style={{ marginBottom: "15px", marginRight: "30px" }}
                  >
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
                      className=" hover:bg-blue-700 rounded-full flex items-center justify-center"
                      onClick={() => handleMoodChange(3, "😔")}
                    >
                      😔
                    </button>
                    <p>Tristeza</p>
                  </div>
                  <div
                    className="flex flex-col items-center"
                    style={{ marginBottom: "15px", marginLeft: "30px" }}
                  >
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
                      className=" hover:bg-blue-700 rounded-full flex items-center justify-center"
                      onClick={() => handleMoodChange(4, "😰")}
                    >
                      😰
                    </button>
                    <p>Miedo</p>
                  </div>
                  <div
                    className="flex flex-col items-center"
                    style={{ marginBottom: "20px", marginLeft: "40px" }}
                  >
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
                      className=" hover:bg-blue-700 rounded-full flex items-center justify-center"
                      onClick={() => handleMoodChange(5, "😡")}
                    >
                      😡
                    </button>
                    <p>Ira</p>
                  </div>
                  <div
                    className="flex flex-col items-center"
                    style={{ marginBottom: "20px", marginRight: "40px" }}
                  >
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
                      className=" hover:bg-blue-700 rounded-full flex items-center justify-center"
                      onClick={() => handleMoodChange(6, "😪")}
                    >
                      😪
                    </button>
                    <p>Disgusto</p>
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
                min="0"
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
                <option required value="Desayuno">
                  Desayuno
                </option>
                <option value="Comida">Comida</option>
                <option value="Cena">Cena</option>
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
            <Link
              to="/"
              className="inline-block align-baseline font-bold text-sm text-blue-500 hover:text-blue-800"
            >
              Volver
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
}
