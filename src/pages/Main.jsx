import React, { useEffect, useState } from "react";
import SideBar from "../components/SideBar";
import axios from "axios";
import calendar from "../assets/img/calendar.png";
import temperatureL from "../assets/img/fria.png";
import temperatureM from "../assets/img/neutra.png";
import temperatureH from "../assets/img/caliente.png";
import waterL from "../assets/img/Vacio.png";
import waterM from "../assets/img/medio.png";
import waterH from "../assets/img/lleno.png";
import water from "../assets/img/water.png";
import loc from "../assets/img/location.png";
import idea from "../assets/img/idea.png";
import ReactApexChart from "react-apexcharts";
import { useUserContext } from "../context/UserContext";
import { supabase } from "../config/supabase";

export default function Main() {
  const date = new Date();
  const { user } = useUserContext();
  const options = {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  };
  const [lastGlucose, setLastGlucose] = useState(0);
  const [lastInsuline, setLastInsuline] = useState(0);
  const [lastEmotion, setLastEmotion] = useState(null);
  const [dose, setDose] = useState(null);
  const [glucose, setGlucose] = useState(null);
  const [waterTotal, setWaterTotal] = useState(0);
  const [fade, setFade] = useState(false);
  const [nextDates, setNextDates] = useState([]);

  const [temperature, setTemperature] = useState(0);
  const [location, setLocation] = useState(null);
  const [tip, setTip] = useState("No hay tips");

  const [dataGraf, setDataGraf] = useState({
    series: [
      {
        name: "Glucosa",
        data: [],
      },
    ],
    options: {
      chart: {
        height: 350,
        type: "line",
        zoom: {
          enabled: false,
        },
      },
      dataLabels: {
        enabled: false,
      },
      stroke: {
        curve: "straight",
      },
      title: {
        text: "Lecturas de glucosa",
        align: "left",
      },
      grid: {
        row: {
          colors: ["#f3f3f3", "transparent"], // takes an array which will be repeated on columns
          opacity: 0.5,
        },
      },
      xaxis: {
        categories: [],
      },
    },
  });

  const formatDate = new Intl.DateTimeFormat("es-ES", options).format(date);

  const formDate = () => {
    const date = new Date();
    var year = date.getFullYear();
    var month = date.getMonth() + 1;
    var day = date.getDate();

    const newDate = `${year}-${month < 10 ? `0${month}` : month}-${
      day < 10 ? `0${day}` : day
    }`;
    return newDate;
  };

  const getApi = async () => {
    navigator.geolocation.getCurrentPosition((position) => {
      console.log(position.coords.latitude, position.coords.longitude);
    });
    try {
      const res = await axios.get(
        "https://api.openweathermap.org/data/2.5/weather?lat=19.7212636&lon=-101.1842388&appid=687d1c96cd63e7daf8e83eca065e07b2"
      );
      console.log(Math.floor(res.data.main.temp - 273.15));
      setTemperature(Math.floor(res.data.main.temp - 273.15));
      setLocation(res.data.name);
    } catch (error) {
      console.error(error);
    }
  };

  const getGlucose = async () => {
    try {
      const { data } = await supabase
        .from("registroGlucosa")
        .select("created_at, glucosa, medicion(measurement)")
        .eq("uid", user.id)
        .order("created_at", { ascending: false })
        .limit(1);
      console.log("Glucosa ", data);
      setLastGlucose(data[0] ? data[0].glucosa : 0);
      setGlucose(data[0] ? data[0].medicion.measurement : "No hay medicion");
    } catch (error) {
      console.error(error);
    }
  };

  const getDataGlucose = async () => {
    try {
      const { data } = await supabase
        .from("registroGlucosa")
        .select("*")
        .eq("uid", user.id)
        .order("created_at", { ascending: false })
        .limit(10);
      console.log("Datos ", data);
      const newData = data.map((item) => item.glucosa);

      setDataGraf({
        ...dataGraf,
        series: [
          {
            name: "Glucosa",
            data: newData,
          },
        ],
        options: {
          ...dataGraf.options,
          xaxis: {
            categories: data.map((item) => {
              const date = new Date(item.created_at);
              return date.toLocaleDateString();
            }),
          },
        },
      });
    } catch (error) {
      console.error(error);
    }
  };

  const getInsuline = async () => {
    try {
      const { data } = await supabase
        .from("registroInsulina")
        .select("created_at, dosis, tipoDosis(tipoDosis)")
        .eq("uid", user.id)
        .order("created_at", { ascending: false })
        .limit(1)
        .eq("created_at", formDate());
      console.log(data);
      setLastInsuline(data[0] ? data[0].dosis : 0);
      setDose(data[0] ? data[0].tipoDosis.tipoDosis : "No hay dosis");
    } catch (error) {
      console.error(error);
    }
  };

  const getEmotion = async () => {
    try {
      const { data } = await supabase
        .from("emociones")
        .select("created_at, idEmocion")
        .eq("uid", user.id)
        .order("created_at", { ascending: false })
        .limit(1)
        .eq("created_at", new Date().toLocaleTimeString());
      console.log(data);
      setLastEmotion(data[0].idEmocion);
    } catch (error) {
      console.error(error);
    }
  };

  const mapEmotionToEmoji = (idEmocion) => {
    switch (idEmocion) {
      case 1:
        return "😊"; // Alegría
      case 2:
        return "😎"; // Orgullo
      case 3:
        return "🥹"; // Depresión
      case 4:
        return "😰"; // Miedo
      case 5:
        return "😡"; // Ira
      case 6:
        return "🤗"; // Gratitud
      case 7:
        return "🙏"; // Esperanza
      case 8:
        return "😌"; // Satisfacción
      case 9:
        return "💪"; // Valentía
      case 10:
        return "😉"; // Optimismo
      case 11:
        return "😁"; // Entusiasmo
      case 12:
        return "😟"; // Frustración
      case 13:
        return "😩"; // Desesperación
      case 14:
        return "😟"; // Ansiedad
      case 15:
        return "😔"; // Culpa
      case 16:
        return "😳"; // Vergüenza
      case 17:
        return "😐"; // Apatía
      case 18:
        return "😔"; // Aislamiento
      case 19:
        return "😢"; // Vulnerabilidad
      case 20:
        return "😒"; // Desconfianza
      case 21:
        return "🤨"; // Escepticismo
      case 22:
        return "😠"; // Resentimiento
      case 23:
        return "😖"; // Estrés
      default:
        return "❓"; // Emoji por defecto o mensaje de error
    }
  };

  const mapNameEmotion = (idEmocion) => {
    switch (idEmocion) {
      case 1:
        return "Alegría";
      case 2:
        return "Orgullo";
      case 3:
        return "Depresión";
      // Agrega más casos según tus necesidades
      case 4:
        return "Miedo";
      case 5:
        return "Ira";
      case 6:
        return "Gratitud";
      case 7:
        return "Esperanza";
      case 8:
        return "Satisfacción";
      case 9:
        return "Valentía";
      case 10:
        return "Optimismo";
      case 11:
        return "Entusiasmo";
      case 12:
        return "Frustración";
      case 13:
        return "Desesperación";
      case 14:
        return "Ansiedad";
      case 15:
        return "Culpa";
      case 16:
        return "Vergüenza";
      case 17:
        return "Apatía";
      case 18:
        return "Aislamiento";
      case 19:
        return "Vulnerabilidad";
      case 20:
        return "Desconfianza";
      case 21:
        return "Escepticismo";
      case 22:
        return "Resentimiento";
      case 23:
        return "Estrés";

      default:
        return "Sin emoción reciente"; // Emoji por defecto o mensaje de error
    }
  };

  const getWater = async () => {
    try {
      const { data } = await supabase
        .from("registroAgua")
        .select("created_at, agua")
        .eq("uid", user.id)
        .order("created_at", { ascending: false })
        .limit(1)
        .eq("created_at", formDate());
      console.log(data);
      setWaterTotal(data[0] ? data[0].agua * 250 : 0);
    } catch (error) {
      console.error(error);
    }
  };

  const setImage = (temp) => {
    if (temp < 19) {
      return temperatureL;
    } else if (temp >= 19 && temp <= 25) {
      return temperatureM;
    }
    return temperatureH;
  };

  const setWater = (water) => {
    if (water < 500) {
      return waterL;
    } else if (water >= 500 && water <= 1500) {
      return waterM;
    }
    return waterH;
  };

  const dates = async () => {
    try {
      const { data } = await supabase
        .from("citasMedicas")
        .select("*")
        .eq("uid", user.id)
        .eq("state", "proximo");
      console.log("Citas medicas ", data);
      setNextDates(data);
    } catch (error) {}
  };

  useEffect(() => {
    let tips = ["No hay tips"];
    getApi();
    if (user) {
      getGlucose();
      getInsuline();
      getDataGlucose();
      getEmotion();
      getWater();

      dates();
    }

    const getTips = async () => {
      try {
        const { data } = await supabase.from("tips").select("*");
        tips = data;
        console.log("Tips ", tips);
        return data;
      } catch (error) {
        console.error(error);
      }
    };

    getTips();

    const interval = setInterval(() => {
      setFade(true);
      setTimeout(() => {
        const random = Math.floor(Math.random() * tips.length);
        setTip(tips[random].tip);
        setFade(false);
      }, 500);
    }, 5000);
    console.log(tip);
    return () => clearInterval(interval);
  }, [user]);

  return (
    <div className="w-full h-full bg-[#F7F7F7]">
      <SideBar />

      <div
        className=" pt-20 sm:ml-64 flex flex-col justify-center items-center "
        style={{ paddingInline: 40 }}
      >
        <div
          className="bg-white w-full border-2 rounded-lg shadow-lg flex justify-between"
          style={{ padding: 15, paddingLeft: 40, border: "1px solid #E5E5E5" }}
        >
          <div className="flex items-center">
            <img src={calendar} alt="calendar" className="w-5 mr-5" />
            {formatDate.charAt(0).toUpperCase() + formatDate.slice(1)}
          </div>
        </div>
        <div className="mt-5 w-full flex justify-between">
          <div
            className="bg-white w-full border-2 rounded-lg shadow-lg flex flex-col items-center"
            style={{ width: "24%", height: 150 }}
          >
            <p className="text-xl font-semibold mb-2 mt-3">Ultima glucosa</p>
            <p className="mb-2">{glucose && glucose}</p>
            <p className="text-4xl font-medium">
              {lastGlucose && lastGlucose}
              <span className="text-lg font-normal">mg/dl</span>
            </p>
          </div>
          <div
            className="bg-white w-full border-2 rounded-lg shadow-lg flex flex-col items-center"
            style={{ width: "24%" }}
          >
            <p className="text-xl font-semibold mb-2 mt-3">Ultima insulina</p>
            <p className="mb-2">{dose && dose}</p>
            <p className="text-4xl font-medium">
              {lastInsuline}
              <span className="text-lg font-normal">u</span>
            </p>
          </div>
          <div
            className="bg-white w-full border-2 rounded-lg shadow-lg flex flex-col items-center"
            style={{ width: "24%" }}
          >
            <p className="text-xl font-semibold mb-2 mt-3">Emocion</p>
            <p className="mb-2">{mapNameEmotion(lastEmotion)}</p>
            <p className="text-4xl font-medium">
              {mapEmotionToEmoji(lastEmotion)}
            </p>
          </div>
          <div
            className="w-full border-2 rounded-lg shadow-lg flex flex-col items-center justify-center bg-azul"
            style={{ width: "18%" }}
          >
            <div className="flex items-center justify-center h-1/2">
              <img
                src={setImage(temperature)}
                alt="clouds"
                className="w-12 mr-3 mt-3"
              />
              <p className="text-white text-4xl">{temperature}°</p>
            </div>
            <div className="flex h-1/2 mt-2 items-center justify-center">
              <img src={loc} alt="location" className="w-5 mr-2" />
              <p className="text-white text-2xl">{location}</p>
            </div>
          </div>
        </div>
        <div
          className="w-full flex justify-between mt-5"
          style={{ height: 350 }}
        >
          <div
            className="border-2 rounded-lg shadow-lg "
            style={{ width: "78.5%" }}
          >
            <ReactApexChart
              series={dataGraf.series}
              options={dataGraf.options}
              type="line"
              height={350}
            />
          </div>

          <div
            className="flex flex-col items-center justify-around border-2 rounded-lg shadow-lg"
            style={{ width: "18%" }}
          >
            <h4 className="text-xl font-semibold">Agua Consumida</h4>
            <img src={setWater(waterTotal)} alt="water" className="w-36" />
            <p className="" style={{ fontSize: "3rem" }}>
              {waterTotal && waterTotal}
              <span className="text-3xl font-normal">ml</span>
            </p>
          </div>
        </div>
        <div className="w-full flex pb-5 mt-5 h-[350px]">
          <div className="w-[15%] bg-azul  flex flex-col justify-center shadow-lg rounded-lg border-2 mr-5">
            <div className="flex justify-center">
              <img src={idea} alt="idea" className="w-10 mr-2" />
              <h3 className="text-3xl font-semibold text-white">Tips</h3>
            </div>

            <div
              className={`h-2/3 flex items-center transition-opacity duration-500 ease-in-out ${
                fade ? "opacity-0" : "opacity-100"
              }`}
            >
              <p className="text-white p-3 mt-3">{tip}</p>
            </div>
          </div>
          <div className="w-[85%] shadow-lg rounded-lg border-2 pl-10 pt-5">
            <div className="">
              <h3 className="font-semibold text-2xl">Citas Medicas Próximas</h3>
            </div>
            <div className="">
              {nextDates.length > 0 ? (
                <div>
                  {nextDates.map((date) => (
                    <div>
                      <h3 className="font-semibold mt-7">{date.typecites}</h3>
                      <div className="pl-3 ml-2 mt-2 border-l-2 border-l-black">
                        <div className="flex ">
                          <div className="mr-7">
                            <p className="text-xs font-semibold">Fecha</p>
                            <p>{date.date}</p>
                          </div>
                          <div>
                            <p className="text-xs font-semibold">Hora</p>
                            <p>{date.time}</p>
                          </div>
                        </div>
                        <div className="mt-3">
                          <p className="text-xs font-semibold">Lugar</p>
                          <p className="w-36">{date.place}</p>
                        </div>
                        <div className="mt-3">
                          <p className="text-xs font-semibold">
                            Nombre del Doctor
                          </p>
                          <p>{date.doctorName}</p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="flex justify-center items-center w-full h-36">
                  <h3 className="text-gray-400 text-2xl">
                    No hay citas proximas
                  </h3>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
