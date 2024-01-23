import React, { useState } from "react";
import { useUserContext } from "../context/UserContext";
import { supabase } from "../config/supabase";
import SideBar from "../components/SideBar";
import { PDFDownloadLink } from "@react-pdf/renderer";
import PdfGlucose from "../components/PdfGlucose";

export default function AllGlucoseRegister() {
  const { user } = useUserContext();
  const [records, setRecords] = useState([]);
  const [loading, setLoading] = useState(false);

  const getRecords = async (date) => {
    try {
      setLoading(true);
      const { data, error } = await supabase
        .from("registroDiario")
        .select()
        .eq("uid", user.id)
        .eq("created_at", date);

      if (error) console.log("error", error);

      setRecords(data);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  const deleteRecord = async (id, date) => {
    try {
      setLoading(true);
      await supabase.from("registroDiario").delete().eq("idRegistro", id);
      const { data } = await supabase
        .from("registroDiario")
        .select()
        .eq("uid", user.id)
        .eq("created_at", date);
      setRecords(data);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  const changeDate = (e) => {
    getRecords(e.target.value);
  };

  return (
    <div>
      <SideBar />
      <div className="p-16 pt-24 sm:ml-64" data-aos="fade-up">
        <h2 className="text-2xl font-semibold">Tus registros</h2>
        <span>Seleccione una fecha:</span>
        <input
          type="date"
          className="my-8 mx-3 w-48 text-center border-gray-400 rounded-xl"
          onChange={changeDate}
        ></input>

        <div className="flex flex-row w-full h-full flex-wrap ">
          {records && records.length === 0 && (
            <div className="relative w-1/3 items-center block max-w-lg p-6 bg-white border border-gray-100 rounded-lg shadow-md ">
              {loading && (
                <div
                  role="status"
                  class="absolute -translate-x-1/2 -translate-y-1/2 top-2/4 left-1/2"
                >
                  <svg
                    aria-hidden="true"
                    class="w-8 h-8 text-gray-200 animate-spin  fill-blue-600"
                    viewBox="0 0 100 101"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
                      fill="currentColor"
                    />
                    <path
                      d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
                      fill="currentFill"
                    />
                  </svg>
                  <span class="sr-only">Loading...</span>
                </div>
              )}
              <p
                className={
                  loading
                    ? "text-lg font-medium text-center text-gray-400 opacity-20"
                    : "text-lg font-medium text-center text-gray-400 "
                }
              >
                Sin registros
              </p>
            </div>
          )}

          {records &&
            records.map((record) => (
              <div className="relative m-4 w-80 items-center block max-w-lg p-6 bg-white border border-gray-100 rounded-lg shadow-md ">
                <h5
                  className={
                    loading
                      ? "mb-2 text-2xl font-bold tracking-tight text-gray-900 opacity-20"
                      : "mb-2 text-2xl font-bold tracking-tight text-gray-900 "
                  }
                >
                  Número de Registro: {record.idRegistro}
                </h5>
                <p
                  className={
                    loading
                      ? "font-normal text-gray-700 opacity-20"
                      : "font-normal text-gray-700 "
                  }
                >
                  <span className="font-semibold">Glucosa:</span>{" "}
                  {record.glucose}
                </p>
                <p
                  className={
                    loading
                      ? "font-normal text-gray-700 opacity-20"
                      : "font-normal text-gray-700 "
                  }
                >
                  <span className="font-semibold">Insulina Administrada:</span>{" "}
                  {record.dose} {record.dose === 1 ? "Unidad" : "Unidades"} de
                  Insulina {record.insulineType}
                </p>
                <p
                  className={
                    loading
                      ? "font-normal text-gray-700 opacity-20"
                      : "font-normal text-gray-700 "
                  }
                >
                  <span className="font-semibold">Tipo de Medición:</span>{" "}
                  {record.doseType}
                </p>
                <p
                  className={
                    loading
                      ? "font-normal text-gray-700 opacity-20"
                      : "font-normal text-gray-700 "
                  }
                >
                  <span className="font-semibold">Agua:</span> {record.water}{" "}
                  {record.water === 1 ? "Vaso" : "Vasos"}
                </p>
                <p
                  className={
                    loading
                      ? "font-normal text-gray-700 opacity-20"
                      : "font-normal text-gray-700 "
                  }
                >
                  <span className="font-semibold">Dia Atipico:</span>{" "}
                  {record.atipicDay}
                </p>
                <p
                  className={
                    loading
                      ? "font-normal mb-2 text-gray-700 opacity-20"
                      : "font-normal mb-2 text-gray-700 "
                  }
                >
                  <span className="font-semibold">Observaciones:</span>{" "}
                  {record.observation}
                </p>
                {/* <button
                  type="button"
                  class="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2"
                >
                  Descargar
                </button> */}
                <PDFDownloadLink
                  document={
                    <PdfGlucose
                      datos={{
                        glucose: record.glucose,
                        dose: record.dose,
                        insulineType: record.insulineType,
                        doseType: record.doseType,
                        water: record.water,
                        atipicDay: record.atipicDay,
                        observation: record.observation,
                        created_at: record.created_at,
                        user: user.user_metadata.full_name,
                      }}
                    />
                  }
                  fileName={record.created_at}
                >
                  {({ blob, url, loading, error }) =>
                    loading ? (
                      <button
                        disabled="true"
                        className="text-white disabled:opacity-45 transition-all  bg-blue-500 hover:bg-blue-700 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2"
                      >
                        Descargando...
                      </button>
                    ) : (
                      <button className="text-white transition-all bg-blue-500 hover:bg-blue-700 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2">
                        Descargar
                      </button>
                    )
                  }
                </PDFDownloadLink>
                <button
                  type="button"
                  onClick={() =>
                    deleteRecord(record.idRegistro, record.created_at)
                  }
                  className="focus:outline-none text-white transition-all  bg-red-700 hover:bg-red-800 focus:ring-4 focus:ring-red-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2"
                >
                  Eliminar
                </button>

                {loading && (
                  <div
                    role="status"
                    class="absolute -translate-x-1/2 -translate-y-1/2 top-2/4 left-1/2"
                  >
                    <svg
                      aria-hidden="true"
                      class="w-8 h-8 text-gray-200 animate-spin  fill-blue-600"
                      viewBox="0 0 100 101"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
                        fill="currentColor"
                      />
                      <path
                        d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
                        fill="currentFill"
                      />
                    </svg>
                    <span class="sr-only">Loading...</span>
                  </div>
                )}
              </div>
            ))}
        </div>
      </div>
    </div>
  );
}
