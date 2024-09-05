import React, { useEffect, useState } from "react";
import SideBar from "../components/SideBar";
import axios from "axios";
import calendar from "../assets/img/calendar.png";
import clouds from "../assets/img/clouds.png";
import water from "../assets/img/water.png";
import loc from "../assets/img/location.png";
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

  const [temperature, setTemperature] = useState(0);
  const [location, setLocation] = useState(null);

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
        .select("*")
        .eq("uid", user.id)
        .order("created_at", { ascending: false })
        .limit(1);
      console.log(data);
      setLastGlucose(data[0].glucosa);
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
        .select("*")
        .eq("uid", user.id)
        .order("created_at", { ascending: false })
        .limit(1);
      console.log(data);
      setLastInsuline(data[0].dosis);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    getApi();
    getGlucose();
    getInsuline();
    getDataGlucose();
  }, [user]);

  return (
    <div className="w-full h-screen" style={{ backgroundColor: "#F7F7F7" }}>
      <SideBar />

      <div
        className="p-16 pt-20 sm:ml-64 flex flex-col justify-center items-center"
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

          <div
            className="flex items-center  justify-between rounded-lg mr-5"
            style={{ width: "20%" }}
          >
            <p className="cursor-pointer hover:text-azulSecundario hover:underline">
              Hoy
            </p>
            <p className="cursor-pointer hover:text-azulSecundario hover:underline">
              Semana
            </p>
            <p className="cursor-pointer hover:text-azulSecundario hover:underline">
              Mes
            </p>
          </div>
        </div>
        <div className="mt-5 w-full flex justify-between">
          <div
            className="bg-white w-full border-2 rounded-lg shadow-lg flex flex-col items-center"
            style={{ width: "24%", height: 150 }}
          >
            <p className="text-xl font-semibold mb-2 mt-3">Ultima glucosa</p>
            <p className="mb-2">Nocturna</p>
            <p className="text-4xl font-medium">
              {lastGlucose}
              <span className="text-lg font-normal">mg/dl</span>
            </p>
          </div>
          <div
            className="bg-white w-full border-2 rounded-lg shadow-lg flex flex-col items-center"
            style={{ width: "24%" }}
          >
            <p className="text-xl font-semibold mb-2 mt-3">Ultima insulina</p>
            <p className="mb-2">Correccion</p>
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
            <p className="mb-2">Orgullo</p>
            <p className="text-4xl font-medium">😎</p>
          </div>
          <div
            className="bg-white w-full border-2 rounded-lg shadow-lg flex flex-col items-center justify-center"
            style={{ width: "18%", backgroundColor: "#57A3E2" }}
          >
            <div className="flex items-center justify-center h-1/2">
              <img src={clouds} alt="clouds" className="w-14 mr-5" />
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
            className="border-2 rounded-lg shadow-lg"
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
            <img src={water} alt="water" className="w-36" />
            <p className="" style={{ fontSize: "3rem" }}>
              500<span className="text-3xl font-normal">ml</span>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
