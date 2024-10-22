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
  const [open, setOpen] = useState(false);
  const [editData, setEditData] = useState(true);

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
    if (date) {
      const filteredData = glucosa.filter((record) => {
        return formatDate(record.created_at) === date;
      });
      setNewDataGlucosa(filteredData);

      console.log(filteredData);
      const filteredDataInsuline = insuline.filter((record) => {
        return formatDate(record.created_at) === date;
      });
      setNewDataInsuline(filteredDataInsuline);

      console.log(filteredDataInsuline);
      const filteredDataWater = water.filter((record) => {
        return formatDate(record.created_at) === date;
      });
      setNewDataWater(filteredDataWater);

      const filteredDataAtipicDay = atipicDay.filter((record) => {
        return formatDate(record.created_at) === date;
      });
      setNewDataAtipicDay(filteredDataAtipicDay);
    }
  };

  const deleteData = async () => {
    try {
      const { error } = await supabase
        .from("registroGlucosa")
        .delete()
        .in("id", [99, 100, 101]);
      if (error) throw error;
      console.log("Registro eliminado");
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
    }
  }, [user]);

  return (
    <div>
      <SideBar />
      <ModalGlucosa open={open} onClose={() => setOpen(false)}>
        {editData ? (
          <div>
            <h1>Editar registro de glucosa</h1>
            <input type="text" placeholder="Glucosa"></input>
            <input type="text" placeholder="Medicion"></input>
            <button>Guardar</button>
          </div>
        ) : (
          <div className="">
            <h1>Eliminar registro de glucosa</h1>{" "}
            <p>¿Estas seguro de eliminar? Se eliminaran TODOS los registros</p>
            <div className="flex justify-end mt-5">
              <button
                onClick={() => {
                  setOpen(false);
                }}
                className="bg-[#AB1A1A] text-white rounded-lg px-5 py-1 flex items-center justify-center"
              >
                Cancelar
              </button>
              <button
                onClick={() => {
                  deleteData();
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
              filterData();
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
                      setOpen(true);
                      setEditData(false);
                    }}
                    className="bg-[#AB1A1A] text-white rounded-lg px-5 py-1.5 ml-3 flex items-center justify-center"
                  >
                    <img src={deleteIcon} alt="" className="w-5 mr-3" />
                    Eliminar
                  </button>
                  <button
                    onClick={() => {
                      setOpen(true);
                      setEditData(true);
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
                      setOpen(true);
                      setEditData(false);
                    }}
                    className="bg-[#AB1A1A] text-white rounded-lg px-5 py-1.5 ml-3 flex items-center justify-center"
                  >
                    <img src={deleteIcon} alt="" className="w-5 mr-3" />
                    Eliminar
                  </button>
                  <button
                    onClick={() => {
                      setOpen(true);
                      setEditData(true);
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
                      setOpen(true);
                      setEditData(false);
                    }}
                    className="bg-[#AB1A1A] text-white rounded-lg px-5 py-1.5 ml-3 flex items-center justify-center"
                  >
                    <img src={deleteIcon} alt="" className="w-5 mr-3" />
                    Eliminar
                  </button>
                  <button
                    onClick={() => {
                      setOpen(true);
                      setEditData(true);
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
                      setOpen(true);
                      setEditData(false);
                    }}
                    className="bg-[#AB1A1A] text-white rounded-lg px-5 py-1.5 ml-3 flex items-center justify-center"
                  >
                    <img src={deleteIcon} alt="" className="w-5 mr-3" />
                    Eliminar
                  </button>
                  <button
                    onClick={() => {
                      setOpen(true);
                      setEditData(true);
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
