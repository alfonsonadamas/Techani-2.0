import React, { useEffect, useState } from "react";
import SideBar from "../components/SideBar";
import LogoGlucoseRegister from "../assets/img/sugar-blood-level.png";
import LogoInsulineRegister from "../assets/img/vaccine.png";
import LogoWaterRegister from "../assets/img/water-bottle.png";
import LogoEmotionRegister from "../assets/img/emotional.png";
import edit from "../assets/img/editar.png";
import deleteIcon from "../assets/img/delate.png";
import { supabase } from "../config/supabase";
import { useUserContext } from "../context/UserContext";
import ModalGlucosa from "../components/ModalGlucosa";
import { toast, ToastContainer } from "react-toastify";

export default function EditRecords() {
  const [date, setDate] = useState("");
  const [glucosa, setGlucosa] = useState([]);
  const [insuline, setInsuline] = useState([]);
  const [water, setWater] = useState([]);
  const [atipicDay, setAtipicDay] = useState([]);
  const { user } = useUserContext();
  const [newDataGlucosa, setNewDataGlucosa] = useState([]);
  const [newDataInsuline, setNewDataInsuline] = useState([]);
  const [newDataWater, setNewDataWater] = useState([]);
  const [newDataAtipicDay, setNewDataAtipicDay] = useState([]);
  const [openGlucose, setOpenGlucose] = useState(false);
  const [openInsuline, setopenInsuline] = useState(false);
  const [openWater, setOpenWater] = useState(false);
  const [openAtipicDay, setOpenAtipicDay] = useState(false);
  const [optionEdit, setOptionEdit] = useState(false);
  const [meditionGlucose, setMeditionGlucose] = useState([]);
  const [editRecordData, setEditRecordData] = useState([]);

  const getMeditionGlucose = async () => {
    try {
      const { data, error } = await supabase.from("medicion").select("*");
      if (error) throw error;
      setMeditionGlucose(data);
    } catch (error) {
      console.log(error);
    }
  };

  const getGlucosa = async () => {
    try {
      const { data, error } = await supabase
        .from("registroGlucosa")
        .select("id, created_at, glucosa, idMedicion")
        .eq("uid", user.id);
      if (error) throw error;

      const newData = data.map((record) => {
        const object = {
          idGlucose: record.id,
          glucose: record.glucosa,
          created_at: record.created_at,
          medition: record.idMedicion,
        };
        return object;
      });
      setGlucosa(newData);
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

  const filterData = (dataGlucose) => {
    if (date) {
      setNewDataGlucosa([]);
      const filteredData = dataGlucose.filter((record) => {
        return formatDate(record.created_at) === date;
      });
      setNewDataGlucosa(filteredData);

      setNewDataInsuline([]);
      const filteredDataInsuline = insuline.filter((record) => {
        return formatDate(record.created_at) === date;
      });
      setNewDataInsuline(filteredDataInsuline);

      setNewDataWater([]);
      const filteredDataWater = water.filter((record) => {
        return formatDate(record.created_at) === date;
      });
      setNewDataWater(filteredDataWater);

      setNewDataAtipicDay([]);
      const filteredDataAtipicDay = atipicDay.filter((record) => {
        return formatDate(record.created_at) === date;
      });
      setNewDataAtipicDay(filteredDataAtipicDay);
    }
  };

  const deleteDataGlucose = async (ids) => {
    try {
      const { error } = await supabase
        .from("registroGlucosa")
        .delete()
        .in("id", ids);
      if (error) throw error;
      console.log("Registro eliminado");
      const updatedGlucosa = glucosa.filter(
        (record) => !ids.includes(record.idGlucose)
      );
      setGlucosa(updatedGlucosa);
      filterData(updatedGlucosa);
      setOpenGlucose(false);
    } catch (error) {
      console.log(error);
    }
  };

  const updateDataGlucose = async (data, id) => {
    try {
      const { error } = await supabase
        .from("registroGlucosa")
        .update(data)
        .eq("id", id);
      if (error) throw error;

      setGlucosa((prev) => {
        const updatedData = prev.map((record) => {
          if (record.idGlucose === id) {
            return {
              ...record,
              glucose: data.glucosa,
              idMedicion: data.idMedicion,
            };
          }
          return record;
        });
        return updatedData;
      });
      filterData(glucosa);

      toast.success("Registro actualizado");
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (user) {
      getGlucosa();
      getInsuline();
      getWater();
      getAtipicDay();
      getMeditionGlucose();
    }
  }, [user]);

  return (
    <div>
      <SideBar />
      <ToastContainer />
      {/* Glucosa */}
      <ModalGlucosa open={openGlucose} onClose={() => setOpenGlucose(false)}>
        {optionEdit ? (
          <div className="flex justify-center">
            <div className="overflow-x-auto flex flex-col">
              <div className="flex justify-center flex-col items-center">
                <h1 className="font-semibold text-lg">
                  Editar registro de glucosa
                </h1>
                <p>Ingrese los nuevos datos</p>
              </div>
              <div className="flex mt-2 mb-2">
                {newDataGlucosa &&
                  newDataGlucosa.map((record) => {
                    return (
                      <div key={record.idGlucose} className=" flex flex-col">
                        <span>Glucosa:</span>
                        <input
                          type="number"
                          className="mx-3 w-48  border-gray-400 rounded-xl"
                          defaultValue={record.glucose}
                          onChange={(e) => {
                            record.glucose = e.target.value;
                            setEditRecordData({
                              ...editRecordData,
                              glucosa: record.glucose,
                            });
                          }}
                        ></input>
                        <span className="mt-5">Medicion:</span>
                        <select
                          name=""
                          id=""
                          className="mx-3 w-48  border-gray-400 rounded-xl"
                          defaultValue={record.medition}
                          onChange={(e) => {
                            setEditRecordData({
                              ...editRecordData,
                              idMedicion: e.target.value,
                            });
                            console.log(editRecordData);
                          }}
                        >
                          {meditionGlucose.map((medition) => {
                            return (
                              <option value={medition.idMedicion}>
                                {medition.measurement}
                              </option>
                            );
                          })}
                        </select>
                        <div className="flex justify-between mt-5">
                          <button
                            onClick={() => {
                              updateDataGlucose(
                                editRecordData,
                                record.idGlucose
                              );
                            }}
                            className="bg-blue-500 text-white rounded-lg px-5 py-1 ml-3 flex items-center justify-center"
                          >
                            Guardar
                          </button>
                          <button
                            onClick={() => {
                              deleteDataGlucose([record.idGlucose]);
                            }}
                            className="bg-[#AB1A1A] text-white rounded-lg px-5 py-1 flex items-center justify-center"
                          >
                            Eliminar
                          </button>
                        </div>
                      </div>
                    );
                  })}
              </div>
            </div>
          </div>
        ) : (
          <div className="">
            <h1>Eliminar registro de glucosa</h1>{" "}
            <p>
              ¿Estas seguro de eliminar? Se eliminaran TODOS los datos de los
              registros
            </p>
            <div className="flex justify-end mt-5">
              <button
                onClick={() => {
                  setOpenGlucose(false);
                }}
                className="bg-[#AB1A1A] text-white rounded-lg px-5 py-1 flex items-center justify-center"
              >
                Cancelar
              </button>
              <button
                onClick={() => {
                  const meditionIds = [];
                  newDataGlucosa.map((medition) => {
                    return meditionIds.push(medition.idGlucose);
                  });
                  deleteDataGlucose(meditionIds);
                }}
                className="bg-blue-500 text-white rounded-lg px-5 py-1 ml-3 flex items-center justify-center"
              >
                Aceptar
              </button>
            </div>
          </div>
        )}
      </ModalGlucosa>
      {/* Insulina */}
      <ModalGlucosa open={openInsuline} onClose={() => setopenInsuline(false)}>
        {optionEdit ? (
          <div className="flex justify-center">
            <div className="overflow-x-auto flex flex-col">
              <div className="flex justify-center flex-col items-center">
                <h1 className="font-semibold text-lg">
                  Editar registro de Insulina
                </h1>
                <p>Ingrese los nuevos datos</p>
              </div>
              <div className="flex mt-2 mb-2">
                {newDataGlucosa &&
                  newDataGlucosa.map((record) => {
                    return (
                      <div key={record.idGlucose} className=" flex flex-col">
                        <span>Glucosa:</span>
                        <input
                          type="number"
                          className="mx-3 w-48  border-gray-400 rounded-xl"
                          defaultValue={record.glucose}
                          onChange={(e) => {
                            record.glucose = e.target.value;
                            setEditRecordData({
                              ...editRecordData,
                              glucosa: record.glucose,
                            });
                          }}
                        ></input>
                        <span className="mt-5">Medicion:</span>
                        <select
                          name=""
                          id=""
                          className="mx-3 w-48  border-gray-400 rounded-xl"
                          defaultValue={record.medition}
                          onChange={(e) => {
                            setEditRecordData({
                              ...editRecordData,
                              medition: e.target.value,
                            });
                            console.log(editRecordData);
                          }}
                        >
                          {meditionGlucose.map((medition) => {
                            return (
                              <option value={medition.idMedicion}>
                                {medition.measurement}
                              </option>
                            );
                          })}
                        </select>
                        <div className="flex justify-between mt-5">
                          <button className="bg-blue-500 text-white rounded-lg px-5 py-1 ml-3 flex items-center justify-center">
                            Guardar
                          </button>
                          <button
                            onClick={() => {
                              deleteDataGlucose([record.idGlucose]);
                            }}
                            className="bg-[#AB1A1A] text-white rounded-lg px-5 py-1 flex items-center justify-center"
                          >
                            Eliminar
                          </button>
                        </div>
                      </div>
                    );
                  })}
              </div>
            </div>
          </div>
        ) : (
          <div className="">
            <h1>Eliminar registro de Insulina</h1>{" "}
            <p>
              ¿Estas seguro de eliminar? Se eliminaran TODOS los datos de los
              registros
            </p>
            <div className="flex justify-end mt-5">
              <button
                onClick={() => {
                  setopenInsuline(false);
                }}
                className="bg-[#AB1A1A] text-white rounded-lg px-5 py-1 flex items-center justify-center"
              >
                Cancelar
              </button>
              <button
                onClick={() => {
                  const meditionIds = [];
                  newDataGlucosa.map((medition) => {
                    return meditionIds.push(medition.idGlucose);
                  });
                  deleteDataGlucose(meditionIds);
                }}
                className="bg-blue-500 text-white rounded-lg px-5 py-1 ml-3 flex items-center justify-center"
              >
                Aceptar
              </button>
            </div>
          </div>
        )}
      </ModalGlucosa>
      {/* Agua */}
      <ModalGlucosa open={openWater} onClose={() => setOpenWater(false)}>
        {optionEdit ? (
          <div className="flex justify-center">
            <div className="overflow-x-auto flex flex-col">
              <div className="flex justify-center flex-col items-center">
                <h1 className="font-semibold text-lg">
                  Editar registro de glucosa
                </h1>
                <p>Ingrese los nuevos datos</p>
              </div>
              <div className="flex mt-2 mb-2">
                {newDataGlucosa &&
                  newDataGlucosa.map((record) => {
                    return (
                      <div key={record.idGlucose} className=" flex flex-col">
                        <span>Glucosa:</span>
                        <input
                          type="number"
                          className="mx-3 w-48  border-gray-400 rounded-xl"
                          defaultValue={record.glucose}
                          onChange={(e) => {
                            record.glucose = e.target.value;
                            setEditRecordData({
                              ...editRecordData,
                              glucosa: record.glucose,
                            });
                          }}
                        ></input>
                        <span className="mt-5">Medicion:</span>
                        <select
                          name=""
                          id=""
                          className="mx-3 w-48  border-gray-400 rounded-xl"
                          defaultValue={record.medition}
                          onChange={(e) => {
                            setEditRecordData({
                              ...editRecordData,
                              medition: e.target.value,
                            });
                            console.log(editRecordData);
                          }}
                        >
                          {meditionGlucose.map((medition) => {
                            return (
                              <option value={medition.idMedicion}>
                                {medition.measurement}
                              </option>
                            );
                          })}
                        </select>
                        <div className="flex justify-between mt-5">
                          <button className="bg-blue-500 text-white rounded-lg px-5 py-1 ml-3 flex items-center justify-center">
                            Guardar
                          </button>
                          <button
                            onClick={() => {
                              deleteDataGlucose([record.idGlucose]);
                            }}
                            className="bg-[#AB1A1A] text-white rounded-lg px-5 py-1 flex items-center justify-center"
                          >
                            Eliminar
                          </button>
                        </div>
                      </div>
                    );
                  })}
              </div>
            </div>
          </div>
        ) : (
          <div className="">
            <h1>Eliminar registro de Insulina</h1>{" "}
            <p>
              ¿Estas seguro de eliminar? Se eliminaran TODOS los datos de los
              registros
            </p>
            <div className="flex justify-end mt-5">
              <button
                onClick={() => {
                  setopenInsuline(false);
                }}
                className="bg-[#AB1A1A] text-white rounded-lg px-5 py-1 flex items-center justify-center"
              >
                Cancelar
              </button>
              <button
                onClick={() => {
                  const meditionIds = [];
                  newDataGlucosa.map((medition) => {
                    return meditionIds.push(medition.idGlucose);
                  });
                  deleteDataGlucose(meditionIds);
                }}
                className="bg-blue-500 text-white rounded-lg px-5 py-1 ml-3 flex items-center justify-center"
              >
                Aceptar
              </button>
            </div>
          </div>
        )}
      </ModalGlucosa>
      {/* Dia atipico */}
      <ModalGlucosa
        open={openAtipicDay}
        onClose={() => setOpenAtipicDay(false)}
      >
        {optionEdit ? (
          <div className="flex justify-center">
            <div className="overflow-x-auto flex flex-col">
              <div className="flex justify-center flex-col items-center">
                <h1 className="font-semibold text-lg">
                  Editar registro de glucosa
                </h1>
                <p>Ingrese los nuevos datos</p>
              </div>
              <div className="flex mt-2 mb-2">
                {newDataGlucosa &&
                  newDataGlucosa.map((record) => {
                    return (
                      <div key={record.idGlucose} className=" flex flex-col">
                        <span>Glucosa:</span>
                        <input
                          type="number"
                          className="mx-3 w-48  border-gray-400 rounded-xl"
                          defaultValue={record.glucose}
                          onChange={(e) => {
                            record.glucose = e.target.value;
                            setEditRecordData({
                              ...editRecordData,
                              glucosa: record.glucose,
                            });
                          }}
                        ></input>
                        <span className="mt-5">Medicion:</span>
                        <select
                          name=""
                          id=""
                          className="mx-3 w-48  border-gray-400 rounded-xl"
                          defaultValue={record.medition}
                          onChange={(e) => {
                            setEditRecordData({
                              ...editRecordData,
                              medition: e.target.value,
                            });
                            console.log(editRecordData);
                          }}
                        >
                          {meditionGlucose.map((medition) => {
                            return (
                              <option value={medition.idMedicion}>
                                {medition.measurement}
                              </option>
                            );
                          })}
                        </select>
                        <div className="flex justify-between mt-5">
                          <button className="bg-blue-500 text-white rounded-lg px-5 py-1 ml-3 flex items-center justify-center">
                            Guardar
                          </button>
                          <button
                            onClick={() => {
                              deleteDataGlucose([record.idGlucose]);
                            }}
                            className="bg-[#AB1A1A] text-white rounded-lg px-5 py-1 flex items-center justify-center"
                          >
                            Eliminar
                          </button>
                        </div>
                      </div>
                    );
                  })}
              </div>
            </div>
          </div>
        ) : (
          <div className="">
            <h1>Eliminar registro de Insulina</h1>{" "}
            <p>
              ¿Estas seguro de eliminar? Se eliminaran TODOS los datos de los
              registros
            </p>
            <div className="flex justify-end mt-5">
              <button
                onClick={() => {
                  setopenInsuline(false);
                }}
                className="bg-[#AB1A1A] text-white rounded-lg px-5 py-1 flex items-center justify-center"
              >
                Cancelar
              </button>
              <button
                onClick={() => {
                  const meditionIds = [];
                  newDataGlucosa.map((medition) => {
                    return meditionIds.push(medition.idGlucose);
                  });
                  deleteDataGlucose(meditionIds);
                }}
                className="bg-blue-500 text-white rounded-lg px-5 py-1 ml-3 flex items-center justify-center"
              >
                Aceptar
              </button>
            </div>
          </div>
        )}
      </ModalGlucosa>
      <div className="p-16 pt-16  sm:ml-64" data-aos="fade-up">
        <h1 className="font-semibold text-xl mt-5">Editar Registros</h1>
        <p className="mt-5">Seleccione un dia para editar</p>
        <div className="mt-5 mb-12">
          <span>Fecha:</span>
          <input
            type="date"
            className="mx-3 w-48 text-center border-gray-400 rounded-xl"
            onChange={(e) => setDate(e.target.value)}
          ></input>

          <button
            onClick={() => {
              filterData(glucosa);
            }}
            className="bg-blue-500 text-white rounded-lg px-3 py-1.5 ml-3"
          >
            Buscar
          </button>
        </div>
        <div>
          <h2 className="font-semibold text-lg mt-5">Editar registro de:</h2>
          <div className="w-full">
            {newDataGlucosa.length > 0 && (
              <div className="border-b-2 h-20 flex items-center justify-between">
                <div className="flex items-center">
                  <img src={LogoGlucoseRegister} alt="" className="w-10" />
                  <p className="ml-3">Glucosa</p>
                </div>
                <div className="flex">
                  <button
                    onClick={() => {
                      setOpenGlucose(true);
                      setOptionEdit(false);
                    }}
                    className="bg-[#AB1A1A] text-white rounded-lg px-5 py-1.5 ml-3 flex items-center justify-center"
                  >
                    <img src={deleteIcon} alt="" className="w-5 mr-3" />
                    Eliminar
                  </button>
                  <button
                    onClick={() => {
                      setOpenGlucose(true);
                      setOptionEdit(true);
                    }}
                    className="bg-blue-500 text-white rounded-lg px-5 py-1.5 ml-3 flex items-center justify-center"
                  >
                    <img src={edit} alt="" className="w-5 mr-3" />
                    Editar
                  </button>
                </div>
              </div>
            )}
            {newDataInsuline.length > 0 && (
              <div className="border-b-2 h-20 flex items-center justify-between">
                <div className="flex items-center">
                  <img src={LogoInsulineRegister} alt="" className="w-10" />
                  <p className="ml-3">Insulina</p>
                </div>
                <div className="flex">
                  <button
                    onClick={() => {
                      setopenInsuline(true);
                      setOptionEdit(false);
                    }}
                    className="bg-[#AB1A1A] text-white rounded-lg px-5 py-1.5 ml-3 flex items-center justify-center"
                  >
                    <img src={deleteIcon} alt="" className="w-5 mr-3" />
                    Eliminar
                  </button>
                  <button
                    onClick={() => {
                      setopenInsuline(true);
                      setOptionEdit(true);
                    }}
                    className="bg-blue-500 text-white rounded-lg px-5 py-1.5 ml-3 flex items-center justify-center"
                  >
                    <img src={edit} alt="" className="w-5 mr-3" />
                    Editar
                  </button>
                </div>
              </div>
            )}
            {newDataWater.length > 0 && (
              <div className="border-b-2 h-20 flex items-center justify-between">
                <div className="flex items-center">
                  <img src={LogoWaterRegister} alt="" className="w-10" />
                  <p className="ml-3">Agua</p>
                </div>
                <div className="flex">
                  <button
                    onClick={() => {
                      setOpenWater(true);
                      setOptionEdit(false);
                    }}
                    className="bg-[#AB1A1A] text-white rounded-lg px-5 py-1.5 ml-3 flex items-center justify-center"
                  >
                    <img src={deleteIcon} alt="" className="w-5 mr-3" />
                    Eliminar
                  </button>
                  <button
                    onClick={() => {
                      setOpenWater(true);
                      setOptionEdit(true);
                    }}
                    className="bg-blue-500 text-white rounded-lg px-5 py-1.5 ml-3 flex items-center justify-center"
                  >
                    <img src={edit} alt="" className="w-5 mr-3" />
                    Editar
                  </button>
                </div>
              </div>
            )}
            {newDataAtipicDay.length > 0 && (
              <div className="border-b-2 h-20 flex items-center justify-between">
                <div className="flex items-center">
                  <img src={LogoEmotionRegister} alt="" className="w-10" />
                  <p className="ml-3">Dia atipico</p>
                </div>
                <div className="flex">
                  <button
                    onClick={() => {
                      setOpenAtipicDay(true);
                      setOptionEdit(false);
                    }}
                    className="bg-[#AB1A1A] text-white rounded-lg px-5 py-1.5 ml-3 flex items-center justify-center"
                  >
                    <img src={deleteIcon} alt="" className="w-5 mr-3" />
                    Eliminar
                  </button>
                  <button
                    onClick={() => {
                      setOpenAtipicDay(true);
                      setOptionEdit(true);
                    }}
                    className="bg-blue-500 text-white rounded-lg px-5 py-1.5 ml-3 flex items-center justify-center"
                  >
                    <img src={edit} alt="" className="w-5 mr-3" />
                    Editar
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
