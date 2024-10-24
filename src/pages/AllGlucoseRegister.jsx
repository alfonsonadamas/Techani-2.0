import React, { useEffect, useState } from "react";
import { useUserContext } from "../context/UserContext";
import { supabase } from "../config/supabase";
import SideBar from "../components/SideBar";
import Modal from "../components/ModalGlucosa";
// import { PDFDownloadLink } from "@react-pdf/renderer";
// import PdfGlucose from "../components/PdfGlucose";

let totalRecords = [];

export default function AllGlucoseRegister() {
  const { user } = useUserContext();
  const [records, setRecords] = useState([]);
  const [insulineRecords, setInsulineRecords] = useState([]);
  const [insulineRecordsAux, setInsulineRecordsAux] = useState([]);
  const [atipicDayRecords, setAtipicDayRecords] = useState([]);
  const [atipicDayRecordsAux, setAtipicDayRecordsAux] = useState([]);
  const [waterRecords, setWaterRecords] = useState([]);
  const [waterRecordsAux, setWaterRecordsAux] = useState([]);
  const [recordsAux, setRecordsAux] = useState([]);
  const [loading, setLoading] = useState(false);
  const [date1, setDate1] = useState("");
  const [date2, setDate2] = useState("");
  const [open, setOpen] = useState(false);
  const [recordEdit, setRecordEdit] = useState([{}]);
  const [update, setUpdate] = useState(false);
  const [atipicDays, setAtipicDays] = useState([]);

  const getAtipicDay = async () => {
    const { data, error } = await supabase.from("diaAtipico").select("*");
    if (error) throw error;
    console.log(data);
    setAtipicDays(data);
  };

  const getRecords = async () => {
    try {
      setLoading(true);
      const { data, error } = await supabase
        .from("registroGlucosa")
        .select("id, created_at, glucosa, medicion(measurement)")
        .eq("uid", user.id);

      if (error) throw error;

      const newData = data.map((record) => {
        const object = {
          id: record.id,
          created_at: record.created_at,
          measurement: record.medicion.measurement,
          glucose: record.glucosa,
        };
        return object;
      });

      setRecords(newData);
      console.log("no editado", records);
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
          "id, created_at, dosis, tipoInsulina(insulin), tipoDosis(tipoDosis), medicion"
        )
        .eq("uid", user.id);

      if (error) throw error;

      const newData = data.map((record) => {
        const object = {
          id: record.id,
          dose: record.dosis,
          created_at: record.created_at,
          insulineType: record.tipoInsulina.insulin,
          doseType: record.tipoDosis.tipoDosis,
          medition: record.medicion,
        };
        return object;
      });

      setInsulineRecords(newData);
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

      const newData = data.map((record) => {
        const object = {
          id: record.id,
          created_at: record.created_at,
          atipicDay: record.diaAtipico.typeDay,
        };
        return object;
      });

      setAtipicDayRecords(newData);
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
        .select("id, created_at, agua")
        .eq("uid", user.id);

      if (error) throw error;
      setWaterRecords(data);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  const filterRecords = () => {
    setLoading(true);
    setUpdate(false);
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

    const registerGlucose = {};
    const registerInsuline = {};
    const registerAtipicDay = {};
    const registerWater = {};

    recordsFiltered.forEach((record) => {
      const fecha = record.created_at;
      if (!registerGlucose[fecha]) {
        registerGlucose[fecha] = [];
      }
      registerGlucose[fecha].push(record);
    });

    recordsFilteredInsuline.forEach((record) => {
      const fecha = record.created_at;
      if (!registerInsuline[fecha]) {
        registerInsuline[fecha] = [];
      }
      registerInsuline[fecha].push(record);
    });

    recordsFilteredAtipicDay.forEach((record) => {
      const fecha = record.created_at;
      if (!registerAtipicDay[fecha]) {
        registerAtipicDay[fecha] = [];
      }
      registerAtipicDay[fecha].push(record);
    });

    recordsFilteredWater.forEach((record) => {
      const fecha = record.created_at;
      if (!registerWater[fecha]) {
        registerWater[fecha] = [];
      }
      registerWater[fecha].push(record);
    });

    setRecordsAux(registerGlucose);
    setInsulineRecordsAux(registerInsuline);
    setAtipicDayRecordsAux(registerAtipicDay);
    setWaterRecordsAux(registerWater);

    const recordsTotal = Object.assign(
      {},
      registerGlucose,
      registerInsuline,
      registerAtipicDay,
      registerWater
    );

    totalRecords = recordsTotal;

    setLoading(false);
  };

  const handleEdit = async () => {
    try {
      setLoading(true);
      if (recordEdit.editType === "glucose") {
        await supabase
          .from("registroGlucosa")
          .update({ glucosa: recordEdit.medition })
          .eq("id", recordEdit.id);

        await getRecords();
        filterRecords();
        setOpen(false);
        setUpdate(true);
      }
      if (recordEdit.editType === "insuline") {
        await supabase
          .from("registroInsulina")
          .update({ dosis: recordEdit.medition })
          .eq("id", recordEdit.id);

        await getRecordsInsuline();
        filterRecords();
        setOpen(false);
        setUpdate(true);
      }
      if (recordEdit.editType === "water") {
        await supabase
          .from("registroInsulina")
          .update({ dosis: recordEdit.medition })
          .eq("id", recordEdit.id);

        await getRecordsInsuline();
        filterRecords();
        setOpen(false);
        setUpdate(true);
      }
      if (recordEdit.editType === "atipicDay") {
        await supabase
          .from("registroDiaAtipico")
          .update({ diaAtipico: recordEdit.medition })
          .eq("id", recordEdit.id);

        await getRecordsAtipicDay();
        filterRecords();
        setOpen(false);
        setUpdate(true);
      }
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  // const handleDelete = async () => {
  //   try {
  //     if (recordEdit.editType === "glucose") {
  //       await supabase.from("registroGlucosa").delete().eq("id", recordEdit.id);
  //       await getRecords();
  //       filterRecords();
  //       setOpen(false);
  //       setUpdate(true);
  //     }
  //     if (recordEdit.editType === "insuline") {
  //       await supabase
  //         .from("registroInsulina")
  //         .delete()
  //         .eq("id", recordEdit.id);
  //       await getRecordsInsuline();
  //       filterRecords();
  //       setOpen(false);
  //       setUpdate(true);
  //     }
  //     if (recordEdit.editType === "water") {
  //       const { error } = await supabase
  //         .from("registroAgua")
  //         .delete()
  //         .eq("id", recordEdit.id);
  //       console.log(error);
  //       await getRecordsWater();
  //       filterRecords();
  //       setOpen(false);
  //       setUpdate(true);
  //     }
  //     if (recordEdit.editType === "atipicDay") {
  //       await supabase
  //         .from("registroDiaAtipico")
  //         .delete()
  //         .eq("id", recordEdit.id);
  //       await getRecordsAtipicDay();
  //       filterRecords();
  //       setOpen(false);
  //       setUpdate(true);
  //     }
  //   } catch (error) {
  //     console.log(error);
  //   }
  // };

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

  useEffect(() => {
    getRecordsAtipicDay();
    getRecords();
    getRecordsInsuline();
    getRecordsWater();
    getAtipicDay();
  }, [user]);

  return (
    <div className="overflow-y-hidden">
      <Modal open={open} onClose={() => setOpen(false)}>
        <div>
          <h2 className="mb-3">Editar datos de registro</h2>
          <form className="flex flex-col">
            {recordEdit.editType === "glucose" ||
            recordEdit.editType === "insuline" ||
            recordEdit.editType === "water" ? (
              <input
                type="text"
                className="bg-gray-50 mb-5 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5  "
                onChange={(e) => {
                  setRecordEdit({
                    ...recordEdit,
                    medition: parseInt(e.target.value),
                  });
                  console.log(recordEdit);
                }}
                value={recordEdit.medition}
              />
            ) : (
              <select
                className="bg-gray-50 mb-5 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                name="atipicDay"
                id="atipicDay"
                onChange={(e) =>
                  setRecordEdit({ ...recordEdit, medition: e.target.value })
                }
              >
                {atipicDays.map((day) => (
                  <option key={day.idDiaatipico} value={day.idDiaatipico}>
                    {day.typeDay}
                  </option>
                ))}
              </select>
            )}
            <div>
              <button
                onClick={async (e) => {
                  e.preventDefault();
                  handleEdit();
                }}
                className="bg-blue-500 text-white rounded-lg px-3 py-1.5 mr-3"
              >
                Guardar
              </button>
            </div>
          </form>
        </div>
      </Modal>
      <SideBar />
      <div className="p-16 pt-24 sm:ml-64" data-aos="fade-up">
        <h2 className="text-2xl mb-5 font-semibold">Tus registros</h2>
        <span>Seleccione un periodo:</span>
        <div className={`mt-5 ${update && "mb-4"} `}>
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
            {update ? "Actualizar" : "Filtrar"}
          </button>
        </div>

        <div className="flex flex-row justify-center items-center w-full h-full flex-wrap overflow-auto">
          {update && (
            <div
              className="p-4 text-sm text-yellow-800 rounded-lg bg-yellow-50 dark:bg-gray-800 dark:text-yellow-300 w-full"
              role="alert"
            >
              <span className="font-medium">Atención!</span> Los registros han
              sido actualizados, para poder visualizar los cambios de click en
              el boton de "Actualizar".
            </div>
          )}
          {Object.keys(totalRecords).map((key) => {
            return (
              <div className="w-full">
                <table className="mt-10">
                  <thead className="border-2">
                    <tr>
                      <th className="border-2 px-7">Fecha</th>
                      <th className="border-2 px-7">Desayuno</th>
                      <th className="border-2 px-7">Colacion Matutina</th>
                      <th className="border-2 px-7">Comida</th>
                      <th className="border-2 px-7">Colacion Vespertina</th>
                      <th className="border-2 px-7">Ejercicio</th>
                      <th className="border-2 px-7">Cena</th>
                      <th className="border-2 px-7">Madrugada</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td className="border-2">
                        <div className="flex justify-center border-b-2">
                          <span>{key}</span>
                        </div>
                        <div className="flex justify-center">
                          <span>Glucosa</span>
                        </div>
                      </td>
                      <td className="border-2">
                        <div className="flex w-full">
                          {recordsAux[key] && (
                            <div className="w-1/2">
                              {recordsAux[key].map((record, index) => (
                                <div className="" key={index}>
                                  {record.measurement ===
                                    "Prepandrial - Desayuno" && (
                                    <div
                                      className="flex flex-col items-center border-r-2 hover:cursor-pointer hover:bg-gray-200 hover:transition-colors ease-in-out duration-300"
                                      onClick={() => {
                                        setOpen(!open);
                                        setRecordEdit({
                                          id: record.id,
                                          measurement: record.measurement,
                                          medition: record.glucose,
                                          editType: "glucose",
                                        });
                                        console.log(recordEdit);
                                      }}
                                    >
                                      <span>Pre</span>
                                      <span>{record.glucose}</span>
                                    </div>
                                  )}
                                </div>
                              ))}
                            </div>
                          )}
                          {recordsAux[key] && (
                            <div className="w-1/2">
                              {recordsAux[key].map((record, index) => (
                                <div className="" key={index}>
                                  {record.measurement ===
                                    "Postpandrial - Desayuno" && (
                                    <div
                                      className="flex flex-col items-center  hover:cursor-pointer hover:bg-gray-200 hover:transition-colors ease-in-out duration-300"
                                      onClick={() => {
                                        setOpen(!open);
                                        setRecordEdit({
                                          id: record.id,
                                          measurement: record.measurement,
                                          medition: record.glucose,
                                          editType: "glucose",
                                        });
                                        console.log(recordEdit);
                                      }}
                                    >
                                      <span>Pos</span>
                                      <span>{record.glucose}</span>
                                    </div>
                                  )}
                                </div>
                              ))}
                            </div>
                          )}
                        </div>
                      </td>
                      <td className="border-2">
                        <div className="flex w-full">
                          {recordsAux[key] && (
                            <div className="w-1/2">
                              {recordsAux[key].map((record, index) => (
                                <div className="" key={index}>
                                  {record.measurement ===
                                    "Prepandrial - Colacion Matutina" && (
                                    <div
                                      className="flex flex-col items-center border-r-2  hover:cursor-pointer hover:bg-gray-200 hover:transition-colors ease-in-out duration-300"
                                      onClick={() => {
                                        setOpen(!open);
                                        setRecordEdit({
                                          id: record.id,
                                          measurement: record.measurement,
                                          medition: record.glucose,
                                          editType: "glucose",
                                        });
                                        console.log(recordEdit);
                                      }}
                                    >
                                      <span>Pre</span>
                                      <span>{record.glucose}</span>
                                    </div>
                                  )}
                                </div>
                              ))}
                            </div>
                          )}
                          {recordsAux[key] && (
                            <div className="w-1/2">
                              {recordsAux[key].map((record, index) => (
                                <div className="" key={index}>
                                  {record.measurement ===
                                    "Postpandrial - Colación Matutina" && (
                                    <div
                                      className="flex flex-col items-center  hover:cursor-pointer hover:bg-gray-200 hover:transition-colors ease-in-out duration-300"
                                      onClick={() => {
                                        setOpen(!open);
                                        setRecordEdit({
                                          id: record.id,
                                          measurement: record.measurement,
                                          medition: record.glucose,
                                          editType: "glucose",
                                        });
                                        console.log(recordEdit);
                                      }}
                                    >
                                      <span>Pos</span>
                                      <span>{record.glucose}</span>
                                    </div>
                                  )}
                                </div>
                              ))}
                            </div>
                          )}
                        </div>
                      </td>
                      <td className="border-2">
                        <div className="flex">
                          {recordsAux[key] && (
                            <div className="w-1/2">
                              {recordsAux[key].map((record, index) => (
                                <div className="" key={index}>
                                  {record.measurement ===
                                    "Prepandrial - Comida" && (
                                    <div
                                      className="flex flex-col items-center border-r-2 hover:cursor-pointer hover:bg-gray-200 hover:transition-colors ease-in-out duration-300"
                                      onClick={() => {
                                        setOpen(!open);
                                        setRecordEdit({
                                          id: record.id,
                                          measurement: record.measurement,
                                          medition: record.glucose,
                                          editType: "glucose",
                                        });
                                        console.log(recordEdit);
                                      }}
                                    >
                                      <span>Pre</span>
                                      <span>{record.glucose}</span>
                                    </div>
                                  )}
                                </div>
                              ))}
                            </div>
                          )}
                          {recordsAux[key] && (
                            <div className="w-1/2">
                              {recordsAux[key].map((record, index) => (
                                <div className="" key={index}>
                                  {record.measurement ===
                                    "Postpandrial - Comida" && (
                                    <div
                                      className="flex flex-col items-center hover:cursor-pointer hover:bg-gray-200 hover:transition-colors ease-in-out duration-300"
                                      onClick={() => {
                                        setOpen(!open);
                                        setRecordEdit({
                                          id: record.id,
                                          measurement: record.measurement,
                                          medition: record.glucose,
                                          editType: "glucose",
                                        });
                                        console.log(recordEdit);
                                      }}
                                    >
                                      <span>Pos</span>
                                      <span>{record.glucose}</span>
                                    </div>
                                  )}
                                </div>
                              ))}
                            </div>
                          )}
                        </div>
                      </td>
                      <td className="border-2">
                        <div className="flex">
                          {recordsAux[key] && (
                            <div className="w-1/2">
                              {recordsAux[key].map((record, index) => (
                                <div className="" key={index}>
                                  {record.measurement ===
                                    "Prepandrial - Colación Vespertina" && (
                                    <div
                                      className="flex flex-col items-center border-r-2 hover:cursor-pointer hover:bg-gray-200 hover:transition-colors ease-in-out duration-300"
                                      onClick={() => {
                                        setOpen(!open);
                                        setRecordEdit({
                                          id: record.id,
                                          measurement: record.measurement,
                                          medition: record.glucose,
                                          editType: "glucose",
                                        });
                                        console.log(recordEdit);
                                      }}
                                    >
                                      <span>Pre</span>
                                      <span>{record.glucose}</span>
                                    </div>
                                  )}
                                </div>
                              ))}
                            </div>
                          )}
                          {recordsAux[key] && (
                            <div className="w-1/2">
                              {recordsAux[key].map((record, index) => (
                                <div className="" key={index}>
                                  {record.measurement ===
                                    "Postpandrial - Colación Vespertina" && (
                                    <div
                                      className="flex flex-col items-center hover:cursor-pointer hover:bg-gray-200 hover:transition-colors ease-in-out duration-300"
                                      onClick={() => {
                                        setOpen(!open);
                                        setRecordEdit({
                                          id: record.id,
                                          measurement: record.measurement,
                                          medition: record.glucose,
                                          editType: "glucose",
                                        });
                                        console.log(recordEdit);
                                      }}
                                    >
                                      <span>Pos</span>
                                      <span>{record.glucose}</span>
                                    </div>
                                  )}
                                </div>
                              ))}
                            </div>
                          )}
                        </div>
                      </td>
                      <td className="border-2 text-center">
                        <div className="flex">
                          {recordsAux[key] && (
                            <div className="w-1/2">
                              {recordsAux[key].map((record, index) => (
                                <div className="" key={index}>
                                  {record.measurement ===
                                    "Antes - Ejercicio" && (
                                    <div
                                      className="flex flex-col items-center border-r-2 hover:cursor-pointer hover:bg-gray-200 hover:transition-colors ease-in-out duration-300"
                                      onClick={() => {
                                        setOpen(!open);
                                        setRecordEdit({
                                          id: record.id,
                                          measurement: record.measurement,
                                          medition: record.glucose,
                                          editType: "glucose",
                                        });
                                        console.log(recordEdit);
                                      }}
                                    >
                                      <span>Pre</span>
                                      <span>{record.glucose}</span>
                                    </div>
                                  )}
                                </div>
                              ))}
                            </div>
                          )}
                          {recordsAux[key] && (
                            <div className="w-1/2">
                              {recordsAux[key].map((record, index) => (
                                <div className="" key={index}>
                                  {record.measurement ===
                                    "Después - Ejercicio" && (
                                    <div
                                      className="flex flex-col items-center hover:cursor-pointer hover:bg-gray-200 hover:transition-colors ease-in-out duration-300"
                                      onClick={() => {
                                        setOpen(!open);
                                        setRecordEdit({
                                          id: record.id,
                                          measurement: record.measurement,
                                          medition: record.glucose,
                                          editType: "glucose",
                                        });
                                        console.log(recordEdit);
                                      }}
                                    >
                                      <span>Pos</span>
                                      <span>{record.glucose}</span>
                                    </div>
                                  )}
                                </div>
                              ))}
                            </div>
                          )}
                        </div>
                      </td>
                      <td className="border-2">
                        <div className="flex">
                          {recordsAux[key] && (
                            <div className="w-1/2">
                              {recordsAux[key].map((record, index) => (
                                <div className="" key={index}>
                                  {record.measurement ===
                                    "Prepandrial - Cena" && (
                                    <div
                                      className="flex flex-col items-center border-r-2 hover:cursor-pointer hover:bg-gray-200 hover:transition-colors ease-in-out duration-300"
                                      onClick={() => {
                                        setOpen(!open);
                                        setRecordEdit({
                                          id: record.id,
                                          measurement: record.measurement,
                                          medition: record.glucose,
                                          editType: "glucose",
                                        });
                                        console.log(recordEdit);
                                      }}
                                    >
                                      <span>Pre</span>
                                      <span>{record.glucose}</span>
                                    </div>
                                  )}
                                </div>
                              ))}
                            </div>
                          )}
                          {recordsAux[key] && (
                            <div className="w-1/2">
                              {recordsAux[key].map((record, index) => (
                                <div className="" key={index}>
                                  {record.measurement ===
                                    "Postpandrial - Cena" && (
                                    <div
                                      className="flex flex-col items-center hover:cursor-pointer hover:bg-gray-200 hover:transition-colors ease-in-out duration-300"
                                      onClick={() => {
                                        setOpen(!open);
                                        setRecordEdit({
                                          id: record.id,
                                          measurement: record.measurement,
                                          medition: record.glucose,
                                          editType: "glucose",
                                        });
                                        console.log(recordEdit);
                                      }}
                                    >
                                      <span>Pre</span>
                                      <span>{record.glucose}</span>
                                    </div>
                                  )}
                                </div>
                              ))}
                            </div>
                          )}
                        </div>
                      </td>
                      <td className="border-2 text-center">
                        {recordsAux[key] && (
                          <div className="h-full">
                            {recordsAux[key].map((record, index) => (
                              <div className="h-full" key={index}>
                                {record.measurement ===
                                  "Postpandrial - Colación Vespertina" && (
                                  <div
                                    className="flex flex-col items-center hover:cursor-pointer h-full hover:bg-gray-200 hover:transition-colors ease-in-out duration-300"
                                    onClick={() => {
                                      setOpen(!open);
                                      setRecordEdit({
                                        id: record.id,
                                        measurement: record.measurement,
                                        medition: record.glucose,
                                      });
                                      console.log(recordEdit);
                                    }}
                                  >
                                    <span>{record.glucose}</span>
                                  </div>
                                )}
                              </div>
                            ))}
                          </div>
                        )}
                      </td>
                    </tr>
                    <tr>
                      <td className="border-2 ">
                        <div className="flex justify-center">
                          <span>Dosis insulina</span>
                        </div>
                      </td>
                      <td className="border-2 text-center">
                        {insulineRecordsAux[key] && (
                          <div className="">
                            {insulineRecordsAux[key].map((record, index) => (
                              <div className="" key={index}>
                                {record.medition === "Desayuno" && (
                                  <div
                                    className="flex flex-col items-center hover:cursor-pointer hover:bg-gray-200 hover:transition-colors ease-in-out duration-300"
                                    onClick={() => {
                                      setOpen(!open);
                                      setRecordEdit({
                                        id: record.id,
                                        measurement: record.medition,
                                        medition: record.dose,
                                        editType: "insuline",
                                      });
                                      console.log(recordEdit);
                                    }}
                                  >
                                    <span>
                                      {record.dose}{" "}
                                      {record.insulineType === "Rápida"
                                        ? "R"
                                        : "L"}
                                    </span>
                                  </div>
                                )}
                              </div>
                            ))}
                          </div>
                        )}
                      </td>
                      <td className="border-2 text-center">
                        {insulineRecordsAux[key] && (
                          <div className="">
                            {insulineRecordsAux[key].map((record, index) => (
                              <div className="" key={index}>
                                {record.medition === "Colacion Matutina" && (
                                  <div
                                    className="flex flex-col items-center hover:cursor-pointer hover:bg-gray-200 hover:transition-colors ease-in-out duration-300"
                                    onClick={() => {
                                      setOpen(!open);
                                      setRecordEdit({
                                        id: record.id,
                                        measurement: record.medition,
                                        medition: record.dose,
                                        editType: "insuline",
                                      });
                                      console.log(recordEdit);
                                    }}
                                  >
                                    <span>
                                      {record.dose}{" "}
                                      {record.insulineType === "Rápida"
                                        ? "R"
                                        : "L"}
                                    </span>
                                  </div>
                                )}
                              </div>
                            ))}
                          </div>
                        )}
                      </td>
                      <td className="border-2 text-center">
                        {insulineRecordsAux[key] && (
                          <div className="">
                            {insulineRecordsAux[key].map((record, index) => (
                              <div className="" key={index}>
                                {record.medition === "Comida" && (
                                  <div
                                    className="flex flex-col items-center hover:cursor-pointer hover:bg-gray-200 hover:transition-colors ease-in-out duration-300"
                                    onClick={() => {
                                      setOpen(!open);
                                      setRecordEdit({
                                        id: record.id,
                                        measurement: record.medition,
                                        medition: record.dose,
                                        editType: "insuline",
                                      });
                                      console.log(recordEdit);
                                    }}
                                  >
                                    <span>
                                      {record.dose}{" "}
                                      {record.insulineType === "Rápida"
                                        ? "R"
                                        : "L"}
                                    </span>
                                  </div>
                                )}
                              </div>
                            ))}
                          </div>
                        )}
                      </td>
                      <td className="border-2 text-center">
                        {insulineRecordsAux[key] && (
                          <div className="">
                            {insulineRecordsAux[key].map((record, index) => (
                              <div className="" key={index}>
                                {record.medition === "Colacion Vespertina" && (
                                  <div
                                    className="flex flex-col items-center hover:cursor-pointer hover:bg-gray-200 hover:transition-colors ease-in-out duration-300"
                                    onClick={() => {
                                      setOpen(!open);
                                      setRecordEdit({
                                        id: record.id,
                                        measurement: record.medition,
                                        medition: record.dose,
                                        editType: "insuline",
                                      });
                                      console.log(recordEdit);
                                    }}
                                  >
                                    <span>
                                      {record.dose}{" "}
                                      {record.insulineType === "Rápida"
                                        ? "R"
                                        : "L"}
                                    </span>
                                  </div>
                                )}
                              </div>
                            ))}
                          </div>
                        )}
                      </td>
                      <td className="border-2 text-center">
                        {insulineRecordsAux[key] && (
                          <div className="">
                            {insulineRecordsAux[key].map((record, index) => (
                              <div className="" key={index}>
                                {record.medition === "Ejercicio" && (
                                  <div
                                    className="flex flex-col items-center hover:cursor-pointer hover:bg-gray-200 hover:transition-colors ease-in-out duration-300"
                                    onClick={() => {
                                      setOpen(!open);
                                      setRecordEdit({
                                        id: record.id,
                                        measurement: record.medition,
                                        medition: record.dose,
                                        editType: "insuline",
                                      });
                                      console.log(recordEdit);
                                    }}
                                  >
                                    <span>
                                      {record.dose}{" "}
                                      {record.insulineType === "Rápida"
                                        ? "R"
                                        : "L"}
                                    </span>
                                  </div>
                                )}
                              </div>
                            ))}
                          </div>
                        )}
                      </td>
                      <td className="border-2 text-center">
                        {insulineRecordsAux[key] && (
                          <div className="">
                            {insulineRecordsAux[key].map((record, index) => (
                              <div className="" key={index}>
                                {record.medition === "Cena" && (
                                  <div
                                    className="flex flex-col items-center hover:cursor-pointer hover:bg-gray-200 hover:transition-colors ease-in-out duration-300"
                                    onClick={() => {
                                      setOpen(!open);
                                      setRecordEdit({
                                        id: record.id,
                                        measurement: record.medition,
                                        medition: record.dose,
                                        editType: "insuline",
                                      });
                                      console.log(recordEdit);
                                    }}
                                  >
                                    <span>
                                      {record.dose}{" "}
                                      {record.insulineType === "Rápida"
                                        ? "R"
                                        : "L"}
                                    </span>
                                  </div>
                                )}
                              </div>
                            ))}
                          </div>
                        )}
                      </td>
                      <td className="border-2 text-center">
                        {insulineRecordsAux[key] && (
                          <div className="">
                            {insulineRecordsAux[key].map((record, index) => (
                              <div className="" key={index}>
                                {record.medition === "Nocturna" && (
                                  <div
                                    className="flex flex-col items-center hover:cursor-pointer hover:bg-gray-200 hover:transition-colors ease-in-out duration-300"
                                    onClick={() => {
                                      setOpen(!open);
                                      setRecordEdit({
                                        id: record.id,
                                        measurement: record.medition,
                                        medition: record.dose,
                                        editType: "insuline",
                                      });
                                      console.log(recordEdit);
                                    }}
                                  >
                                    <span>
                                      {record.dose}{" "}
                                      {record.doseType === "Rápida" ? "R" : "L"}
                                    </span>
                                  </div>
                                )}
                              </div>
                            ))}
                          </div>
                        )}
                      </td>
                    </tr>
                    <tr>
                      <td className="border-2">
                        <div className="flex justify-center">
                          <span>Agua</span>
                        </div>
                      </td>

                      <td className="border-2 text-center">
                        {waterRecordsAux[key] && (
                          <div className="">
                            {waterRecordsAux[key].map((record, index) => (
                              <div className="" key={index}>
                                <div
                                  className="flex flex-col items-center hover:cursor-pointer hover:bg-gray-200 hover:transition-colors ease-in-out duration-300"
                                  onClick={() => {
                                    setOpen(!open);
                                    setRecordEdit({
                                      id: record.id,
                                      measurement: "",
                                      medition: record.agua,
                                      editType: "water",
                                    });
                                  }}
                                >
                                  <span>{record.agua}</span>
                                </div>
                              </div>
                            ))}
                          </div>
                        )}
                      </td>
                    </tr>
                    <tr>
                      <td className="border-2">
                        <div className="flex justify-center">
                          <span>Dia atipico</span>
                        </div>
                      </td>
                      <td className="border-2 text-center">
                        {atipicDayRecordsAux[key] && (
                          <div className="">
                            {atipicDayRecordsAux[key].map((record, index) => (
                              <div className="" key={index}>
                                <div
                                  className="flex flex-col items-center hover:cursor-pointer hover:bg-gray-200 hover:transition-colors ease-in-out duration-300"
                                  onClick={() => {
                                    setOpen(!open);
                                    setRecordEdit({
                                      id: record.id,
                                      measurement: "",
                                      medition: record.atipicDay,
                                      editType: "atipicDay",
                                    });
                                  }}
                                >
                                  <span>{record.atipicDay}</span>
                                </div>
                              </div>
                            ))}
                          </div>
                        )}
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            );
          })}

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
      </div>
    </div>
  );
}
