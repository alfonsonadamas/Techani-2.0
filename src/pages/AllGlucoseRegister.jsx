import React, { useEffect, useState } from "react";
import { useUserContext } from "../context/UserContext";
import { supabase } from "../config/supabase";
import SideBar from "../components/SideBar";
// import { PDFDownloadLink } from "@react-pdf/renderer";
// import PdfGlucose from "../components/PdfGlucose";

export default function AllGlucoseRegister() {
  const { user } = useUserContext();
  const [records, setRecords] = useState([]);
  const [insulineRecords, setInsulineRecords] = useState([]);
  const [insulineRecordsAux, setInsulineRecordsAux] = useState([]);
  const [atipicDayRecords, setAtipicDayRecords] = useState([]);
  const [atipicDayRecordsAux, setAtipicDayRecordsAux] = useState([]);
  const [waterRecords, setWaterRecords] = useState([]);
  const [waterRecordsAux, setWaterRecordsAux] = useState([]);
  const [totalRecords, setTotalRecords] = useState([]);
  const [recordsAux, setRecordsAux] = useState([]);
  const [loading, setLoading] = useState(false);
  const [date1, setDate1] = useState("");
  const [date2, setDate2] = useState("");
  const [microService, setMicroService] = useState([{}]);

  const getMicroService = async () => {
    try {
      const response = await fetch("http://localhost:4000/");
      const data = await response.json();
      console.log(data);
      setMicroService(data);
    } catch (error) {
      console.log(error);
    }
  };

  const handleDate1 = (e) => {
    const date = e.target.value;
    var parts = date.split("-");
    var day = parts[2];
    var month = parts[1];
    var year = parts[0];
    const formatDate = new Date(year, month - 1, day);
    setDate1(formatDate);
    console.log(date);
  };

  const handleDate2 = (e) => {
    const date = e.target.value;
    var parts = date.split("-");
    var day = parts[2];
    var month = parts[1];
    var year = parts[0];
    const formatDate = new Date(year, month - 1, day);
    setDate2(formatDate);
  };

  const filterRecords = () => {
    setLoading(true);
    const recordsFiltered = records.filter((record) => {
      const date = new Date(record.created_at);
      const newDate1 = new Date(date1);
      const newDate2 = new Date(date2);

      return date >= newDate1 && date <= newDate2;
    });

    const recordsFilteredInsuline = insulineRecords.filter((record) => {
      const date = new Date(record.created_at);
      const newDate1 = new Date(date1);
      const newDate2 = new Date(date2);
      return date >= newDate1 && date <= newDate2;
    });

    const recordsFilteredAtipicDay = atipicDayRecords.filter((record) => {
      const date = new Date(record.created_at);
      const newDate1 = new Date(date1);
      const newDate2 = new Date(date2);
      return date >= newDate1 && date <= newDate2;
    });

    const recordsFilteredWater = waterRecords.filter((record) => {
      const date = new Date(record.created_at);
      const newDate1 = new Date(date1);
      const newDate2 = new Date(date2);
      return date >= newDate1 && date <= newDate2;
    });

    setRecordsAux(recordsFiltered);
    setInsulineRecordsAux(recordsFilteredInsuline);
    setAtipicDayRecordsAux(recordsFilteredAtipicDay);
    setWaterRecordsAux(recordsFilteredWater);
    console.log(
      recordsFiltered,
      recordsFilteredInsuline,
      recordsFilteredAtipicDay,
      recordsFilteredWater
    );

    const recordsFilteredAux = recordsFiltered.concat(
      recordsFilteredInsuline,
      recordsFilteredAtipicDay,
      recordsFilteredWater
    );
    setTotalRecords(recordsFilteredAux);
    setLoading(false);
  };

  useEffect(() => {
    getMicroService();
    const getRecords = async () => {
      try {
        setLoading(true);
        const { data, error } = await supabase
          .from("registroGlucosa")
          .select("id, created_at, glucosa, medicion(measurement)")
          .eq("uid", user.id);

        console.log(data);

        if (error) throw error;
        setRecords(data);
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    };

    const getRecordsInsuline = async () => {
      try {
        setLoading(true);
        const { data, error } = await supabase
          .from("registroInsulina")
          .select(
            "id, created_at, dosis, tipoInsulina(insulin), tipoDosis(tipoDosis)"
          )
          .eq("uid", user.id);

        if (error) throw error;
        setInsulineRecords(data);
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    };

    const getRecordsAtipicDay = async () => {
      try {
        setLoading(true);
        const { data, error } = await supabase
          .from("registroDiaAtipico")
          .select("id, created_at, diaAtipico(typeDay)")
          .eq("uid", user.id);

        if (error) throw error;
        setAtipicDayRecords(data);
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    };

    const getRecordsWater = async () => {
      try {
        setLoading(true);
        const { data, error } = await supabase
          .from("registroAgua")
          .select("created_at, agua")
          .eq("uid", user.id);

        if (error) throw error;
        console.log("Agua: ", data);
        setWaterRecords(data);
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    };
    getRecordsAtipicDay();
    getRecords();
    getRecordsInsuline();
    getRecordsWater();
  }, [user.id]);

  return (
    <div>
      <SideBar />
      <div className="p-16 pt-24 sm:ml-64" data-aos="fade-up">
        <h2 className="text-2xl mb-5 font-semibold">Tus registros</h2>
        <span>Seleccione un periodo:</span>
        <div className="mt-5">
          <span>Fecha inicio:</span>
          <input
            type="date"
            onChange={handleDate1}
            className="mx-3 w-48 text-center border-gray-400 rounded-xl"
          ></input>
          <span>Fecha fin:</span>
          <input
            type="date"
            onChange={handleDate2}
            className="mx-3 w-48 text-center border-gray-400 rounded-xl"
          ></input>
          <button
            onClick={filterRecords}
            className="bg-blue-500 text-white rounded-lg px-3 py-1.5 ml-3"
            disabled={loading}
          >
            Buscar
          </button>
        </div>

        <div className="flex flex-row justify-center items-center w-full h-full flex-wrap">
          {recordsAux.length === 0 &&
          insulineRecordsAux.length === 0 &&
          waterRecordsAux.length === 0 &&
          atipicDayRecordsAux.length === 0 ? (
            <div className="relative flex justify-center items-center h-24 border-2 mt-10 shadow-2xl rounded-lg w-4/5">
              {loading && (
                <div
                  role="status"
                  className="opacity-30 absolute flex justify-center items-center h-full bg-gray-400 w-full"
                >
                  <svg
                    aria-hidden="true"
                    className="opacity-100 w-8 h-8 text-gray-200 animate-spin  fill-blue-600"
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

              <p className=" text-gray-400">Sin registros</p>
            </div>
          ) : (
            <div className="mt-10 w-full">
              <p className="text-center mb-5 font-medium">
                Se encontraron {totalRecords.length} registro(s)
              </p>
              <h3 className="font-semibold text-xl">Registros de glucosa</h3>
              {recordsAux.length > 0 ? (
                <div className="flex w-full flex-wrap mt-5 ">
                  {recordsAux.map((record) => {
                    return (
                      <div
                        className="w-1/4 mr-10 px-10 pt-5 h-48 shadow-2xl rounded-lg"
                        key={record.id}
                      >
                        <p className="text-lg font-medium">
                          Numero de registro: {record.id}
                        </p>
                        <p>Fecha: {record.created_at}</p>
                        <p>Glucosa: {record.glucosa}</p>
                        <p>Tipo de medicion: {record.medicion.measurement}</p>
                      </div>
                    );
                  })}
                </div>
              ) : (
                <div className="relative flex justify-center items-center h-24 border-2 mt-10 shadow-2xl rounded-lg w-4/5">
                  <p className=" text-gray-400">Sin registros</p>
                </div>
              )}

              <h3 className="font-semibold text-xl mt-10">
                Registros de insulina
              </h3>
              {insulineRecordsAux.length > 0 ? (
                <div className="flex w-full flex-wrap mt-5 ">
                  {insulineRecordsAux.map((record) => {
                    return (
                      <div
                        className="w-1/4 mr-10 px-10 pt-3 h-48 shadow-2xl rounded-lg"
                        key={record.id}
                      >
                        <p className="text-lg font-medium">
                          Numero de registro: {record.id}
                        </p>
                        <p>Fecha: {record.created_at}</p>
                        <p>Dosis de insulina: {record.dosis}</p>
                        <p>Tipo de dosis: {record.tipoDosis.tipoDosis}</p>
                        <p>Tipo de insulina: {record.tipoInsulina.insulin}</p>
                      </div>
                    );
                  })}
                </div>
              ) : (
                <div className="relative flex justify-center items-center h-24 border-2 mt-10 shadow-2xl rounded-lg w-4/5">
                  <p className=" text-gray-400">Sin registros</p>
                </div>
              )}
              <h3 className="font-semibold text-xl mt-10">
                Registros de dia atipico
              </h3>
              {atipicDayRecordsAux.length > 0 ? (
                <div className="flex w-full flex-wrap mt-5 ">
                  {atipicDayRecordsAux.map((record) => {
                    return (
                      <div
                        className="w-1/4 mr-10 px-10 pt-3 h-48 shadow-2xl rounded-lg"
                        key={record.id}
                      >
                        <p className="text-lg font-medium">
                          Numero de registro: {record.id}
                        </p>
                        <p>Fecha: {record.created_at}</p>
                        <p>
                          Dia atipico:{" "}
                          {record.otherAtipicDay
                            ? record.otherAtipicDay
                            : record.diaAtipico.typeDay}
                        </p>
                      </div>
                    );
                  })}
                </div>
              ) : (
                <div className="relative flex justify-center items-center h-24 border-2 mt-10 shadow-2xl rounded-lg w-4/5">
                  <p className=" text-gray-400">Sin registros</p>
                </div>
              )}
              <h3 className="font-semibold text-xl mt-10">Registros de agua</h3>
              {waterRecordsAux.length > 0 ? (
                <div className="flex w-full flex-wrap mt-5 ">
                  {waterRecordsAux.map((record) => {
                    return (
                      <div
                        className="w-1/4 mr-10 px-10 pt-3 h-48 shadow-2xl rounded-lg"
                        key={record.id}
                      >
                        <p className="text-lg font-medium">
                          Numero de registro: {record.id}
                        </p>
                        <p>Fecha: {record.created_at}</p>
                        <p>Vasos consumidos: {record.agua} </p>
                      </div>
                    );
                  })}
                </div>
              ) : (
                <div className="relative flex justify-center items-center h-24 border-2 mt-10 shadow-2xl rounded-lg w-4/5">
                  <p className=" text-gray-400">Sin registros</p>
                </div>
              )}
            </div>
          )}
          {/* <PDFDownloadLink
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
                        <svg
                          aria-hidden="true"
                          role="status"
                          class="inline w-4 h-4 me-3 text-white animate-spin"
                          viewBox="0 0 100 101"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
                            fill="#E5E7EB"
                          />
                          <path
                            d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
                            fill="currentColor"
                          />
                        </svg>
                      </button>
                    ) : (
                      <button className="text-white transition-all bg-blue-500 hover:bg-blue-700 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2">
                        Descargar
                      </button>
                    )
                  } 
                </PDFDownloadLink>*/}
        </div>
        <h3 className="text-center mt-10">
          Listado de registros con microservicios
        </h3>

        {microService.map((micro) => {
          return (
            <div key={micro.id} className="w-2/5 h-36 shadow-2xl mt-5">
              <p className="text-center">Fecha: {micro.fecha}</p>
              <p className="text-center">Hora: {micro.hora}</p>
              <p className="text-center">Glucosa: {micro.glucosa}</p>
              <p className="text-center">Insulina: {micro.insulina}</p>
            </div>
          );
        })}
      </div>
    </div>
  );
}
