import React, { useEffect, useState } from "react";
import SideBar from "../components/SideBar";
import { PDFDownloadLink } from "@react-pdf/renderer";
import MyDocument from "../components/PdfGlucose";
import descargaAll from "../assets/img/descargar azul.png";
import descargar from "../assets/img/descargar.png";
import pdf from "../assets/img/pdfimage.png";
import trash from "../assets/img/basura.png";
import { supabase } from "../config/supabase";
import { useUserContext } from "../context/UserContext";
import AllDocuments from "../components/AllDocuments";

export default function MyGlucoseRegister() {
  const { user } = useUserContext();
  const [glucosa, setGlucosa] = useState([]);
  const [insuline, setInsuline] = useState([]);
  const [water, setWater] = useState([]);
  const [atipicDay, setAtipicDay] = useState([]);
  const [date1, setDate1] = useState("");
  const [date2, setDate2] = useState("");
  const [data, setData] = useState([]);

  const getGlucosa = async () => {
    try {
      const { data, error } = await supabase
        .from("registroGlucosa")
        .select("id, created_at, glucosa, medicion(measurement)")
        .eq("uid", user.id);
      if (error) throw error;

      const newData = data.map((record) => {
        const object = {
          idGlucose: record.id,
          glucose: record.glucosa,
          created_at: record.created_at,
          medition: record.medicion.measurement,
        };
        return object;
      });
      setGlucosa(newData);
      console.log(newData);
    } catch (error) {
      console.log(error);
    }
  };
  const getInsuline = async () => {
    try {
      const { data, error } = await supabase
        .from("registroInsulina")
        .select(
          "id, created_at, dosis, medicion, insulina(insulin), tipoDosis(tipoDosis)"
        )
        .eq("uid", user.id);
      if (error) throw error;
      const newData = data.map((record) => {
        const object = {
          id: record.id,
          dose: record.dosis,
          created_at: record.created_at,
          insulineType: record.insulina.insulin,
          doseType: record.tipoDosis.tipoDosis,
          medition: record.medicion,
        };
        return object;
      });
      setInsuline(newData);
    } catch (error) {
      console.log(error);
    }
  };

  const getWater = async () => {
    try {
      var totalWater = 0;
      const { data, error } = await supabase
        .from("registroAgua")
        .select("*")
        .eq("uid", user.id);
      if (error) throw error;
      const newData = data.map((record) => {
        totalWater += record.agua;
        const object = {
          id: record.id,
          created_at: record.created_at,
          water: totalWater,
        };
        return object;
      });
      setWater(newData);
    } catch (error) {
      console.log(error);
    }
  };

  const getAtipicDay = async () => {
    try {
      const { data, error } = await supabase
        .from("registroDiaAtipico")
        .select("id, created_at, diaAtipico(typeDay), otherAtipicDay")
        .eq("uid", user.id);
      if (error) throw error;
      const newData = data.map((record) => {
        const object = {
          id: record.id,
          created_at: record.created_at,
          atipicDay: record.diaAtipico.typeDay,
          otherAtipicDay: record.otherAtipicDay,
        };
        return object;
      });
      setAtipicDay(newData);
      console.log(newData);
    } catch (error) {
      console.log(error);
    }
  };

  const formatDate = (dateFormat) => {
    const newDate = new Date(dateFormat);
    return `${newDate.getFullYear()}-${newDate.getMonth() + 1}-${
      newDate.getDate() < 10 ? `0${newDate.getDate()}` : newDate.getDate()
    }`;
  };

  const filterData = () => {
    if (date1 && date2) {
      const filteredData = glucosa.filter((record) => {
        return (
          formatDate(record.created_at) >= date1 &&
          formatDate(record.created_at) <= date2
        );
      });

      console.log(filteredData);
      const filteredDataInsuline = insuline.filter((record) => {
        return (
          formatDate(record.created_at) >= date1 &&
          formatDate(record.created_at) <= date2
        );
      });

      console.log(filteredDataInsuline);
      const filteredDataWater = water.filter((record) => {
        return (
          formatDate(record.created_at) >= date1 &&
          formatDate(record.created_at) <= date2
        );
      });
      console.log(filteredDataWater);

      const filteredDataAtipicDay = atipicDay.filter((record) => {
        return (
          formatDate(record.created_at) >= date1 &&
          formatDate(record.created_at) <= date2
        );
      });
      console.log(filteredDataAtipicDay);
      const data = groupByDate(
        filteredData,
        filteredDataInsuline,
        filteredDataWater,
        filteredDataAtipicDay
      );
      console.log(data);
      setData(data);
    }
  };

  const groupByDate = (glucose, insuline, water, atipicDay) => {
    const data = [];
    glucose.forEach((record) => {
      const date = formatDate(record.created_at);
      const index = data.findIndex((item) => item.date === date);
      if (index === -1) {
        data.push({
          date,
          glucose: [record],
          insuline: [],
          water: [],
          atipicDay: [],
        });
      } else {
        data[index].glucose.push(record);
      }
    });

    insuline.forEach((record) => {
      const date = formatDate(record.created_at);
      const index = data.findIndex((item) => item.date === date);
      if (index === -1) {
        data.push({
          date,
          glucose: [],
          insuline: [record],
          water: [],
          atipicDay: [],
        });
      } else {
        data[index].insuline.push(record);
      }
    });

    water.forEach((record) => {
      const date = formatDate(record.created_at);
      const index = data.findIndex((item) => item.date === date);
      if (index === -1) {
        data.push({
          date,
          glucose: [],
          insuline: [],
          water: [record],
          atipicDay: [],
        });
      } else {
        data[index].water.push(record);
      }
    });

    atipicDay.forEach((record) => {
      const date = formatDate(record.created_at);
      const index = data.findIndex((item) => item.date === date);
      if (index === -1) {
        data.push({
          date,
          glucose: [],
          insuline: [],
          water: [],
          atipicDay: [record],
        });
      } else {
        data[index].atipicDay.push(record);
      }
    });

    return data;
  };

  const deleteRecord = async (record) => {
    console.log(record);

    // Eliminar registros de glucosa
    await record.glucose.reduce((promise, item) => {
      return promise.then(async () => {
        try {
          const { error } = await supabase
            .from("registroGlucosa")
            .delete()
            .eq("id", item.idGlucose);
          if (error) throw error;
          console.log("Registro eliminado de glucosa");
        } catch (error) {
          console.log(error);
        }
      });
    }, Promise.resolve());

    // Eliminar registros de insulina
    await record.insuline.reduce((promise, item) => {
      return promise.then(async () => {
        try {
          const { error } = await supabase
            .from("registroInsulina")
            .delete()
            .eq("id", item.id);
          if (error) throw error;
          console.log("Registro eliminado de insulina");
        } catch (error) {
          console.log(error);
        }
      });
    }, Promise.resolve());

    // Eliminar registros de agua
    await record.water.reduce((promise, item) => {
      return promise.then(async () => {
        try {
          const { error } = await supabase
            .from("registroAgua")
            .delete()
            .eq("id", item.id);
          if (error) throw error;
          console.log("Registro eliminado de agua");
        } catch (error) {
          console.log(error);
        }
      });
    }, Promise.resolve());

    // Eliminar registros de días atípicos
    await record.atipicDay.reduce((promise, item) => {
      return promise.then(async () => {
        try {
          const { error } = await supabase
            .from("registroDiaAtipico")
            .delete()
            .eq("id", item.id);
          if (error) throw error;
          console.log("Registro eliminado de día atípico");
        } catch (error) {
          console.log(error);
        }
      });
    }, Promise.resolve());

    setTimeout(() => {
      getGlucosa();
      getInsuline();
      getWater();
      getAtipicDay();
    }, 2000);
  };

  useEffect(() => {
    if (user) {
      getGlucosa();
      getInsuline();
      getWater();
      getAtipicDay();
    }
  }, [user]);

  return (
    <div>
      <SideBar />
      <div className="p-16 pt-24 sm:ml-64" data-aos="fade-up">
        <div>
          <h1>Registros de Glucosa</h1>
          <div className="mt-5 mb-24">
            <span>Fecha inicio:</span>
            <input
              type="date"
              className="mx-3 w-48 text-center border-gray-400 rounded-xl"
              onChange={(e) => setDate1(e.target.value)}
            ></input>
            <span>Fecha fin:</span>
            <input
              type="date"
              className="mx-3 w-48 text-center border-gray-400 rounded-xl"
              onChange={(e) => setDate2(e.target.value)}
            ></input>
            <button
              onClick={() => {
                filterData();
              }}
              className="bg-blue-500 text-white rounded-lg px-3 py-1.5 ml-3"
            >
              Filtrar
            </button>
          </div>
        </div>
        <div className="w-full">
          <div className="flex w-full justify-between border-b-2 border-b-slate-300 pb-2">
            <p>Nombre</p>
            <PDFDownloadLink document={<AllDocuments data={data} />}>
              {({ blob, url, loading, error }) => {
                return (
                  <button className="flex items-center">
                    <img
                      src={descargaAll}
                      alt="downloadA"
                      className="w-5 h-5"
                    />
                    <p className="text-azul pl-2">Descargar todo</p>
                  </button>
                );
              }}
            </PDFDownloadLink>
          </div>
          {data.map((record) => {
            return (
              <div className="flex w-full justify-between items-center h-20 border-b-2 px-5 border-b-slate-300 mb-5">
                <PDFDownloadLink
                  document={<MyDocument data={record} />}
                  fileName={`Registro ${record.date}.pdf`}
                >
                  {({ blob, url, loading, error }) => {
                    return (
                      <a
                        href={url}
                        target="_blank"
                        rel="noreferrer"
                        className="flex items-center"
                      >
                        <img src={pdf} alt="pdf" className="w-10 mr-4" />
                        <p>Registro {record.date} .pdf</p>
                      </a>
                    );
                  }}
                </PDFDownloadLink>

                <div className="flex items-center">
                  <PDFDownloadLink
                    document={<MyDocument data={record} />}
                    fileName={`Registro ${record.date}.pdf`}
                  >
                    {({ blob, url, loading, error }) => {
                      return loading ? (
                        <div role="status">
                          <svg
                            aria-hidden="true"
                            className="w-3 h-3 text-gray-200 animate-spin dark:text-gray-600 fill-blue-600"
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
                      ) : (
                        <button>
                          <img
                            src={descargar}
                            alt="downloadA"
                            className="w-5 h-5"
                          />
                        </button>
                      );
                    }}
                  </PDFDownloadLink>
                  <button
                    onClick={() => {
                      deleteRecord(record);
                    }}
                    className="bg-[#AB1A1A] p-1 rounded-md px-2 ml-5"
                  >
                    <img src={trash} alt="trash" className="w-5 h-5" />
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
