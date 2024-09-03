import React, { useEffect, useState } from "react";
import "../dist/output.css";
import SideBar from "../components/SideBar";
import axios from "axios";
import calendar from "../assets/img/calendar.png";
import clouds from "../assets/img/clouds.png";
import water from "../assets/img/water.png";
import ReactApexChart from "react-apexcharts";
import { useUserContext } from "../context/UserContext";

export default function Main() {
  const date = new Date();
  const { user } = useUserContext();
  const options = {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  };

  const [data, setData] = useState({
    series: [
      {
        name: "Desktops",
        data: [10, 41, 35, 51, 49, 62, 69, 91, 148],
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
        categories: [
          "Jan",
          "Feb",
          "Mar",
          "Apr",
          "May",
          "Jun",
          "Jul",
          "Aug",
          "Sep",
        ],
      },
    },
  });

  const formatDate = new Intl.DateTimeFormat("es-ES", options).format(date);

  const getApi = async () => {
    try {
      const res = await axios.get(
        "https://api.openweathermap.org/data/2.5/weather?q=lima,Peru&appid=687d1c96cd63e7daf8e83eca065e07b2"
      );
      console.log(res.data);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    //getApi();
    console.log(user.id);
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
              90 <span className="text-lg font-normal">mg/dl</span>
            </p>
          </div>
          <div
            className="bg-white w-full border-2 rounded-lg shadow-lg flex flex-col items-center"
            style={{ width: "24%" }}
          >
            <p className="text-xl font-semibold mb-2 mt-3">Ultima insulina</p>
            <p className="mb-2">Correccion</p>
            <p className="text-4xl font-medium">
              10 <span className="text-lg font-normal">u</span>
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
            className="bg-white w-full border-2 rounded-lg shadow-lg flex flex-col items-center"
            style={{ width: "18%", backgroundColor: "#57A3E2" }}
          >
            <div className="flex items-center">
              <img src={clouds} alt="clouds" className="w-14 mr-5 mt-2" />
              <p className="text-white text-3xl">21°</p>
            </div>
            <p className="text-white text-lg mt-2 mb-2">Nublado</p>
            <p className="text-white">Morelia</p>
          </div>
        </div>
        <div
          className="w-full flex justify-between mt-5"
          style={{ height: 370 }}
        >
          <div
            className="border-2 rounded-lg shadow-lg"
            style={{ width: "78.5%" }}
          >
            <ReactApexChart
              series={data.series}
              options={data.options}
              type="line"
              height={370}
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
