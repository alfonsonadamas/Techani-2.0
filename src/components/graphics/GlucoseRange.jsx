import React, { useEffect, useState } from "react";
import { useUserContext } from "../../context/UserContext";
import { supabase } from "../../config/supabase";
import ReactApexChart from "react-apexcharts";

export default function GlucoseRange() {
  const { user } = useUserContext();
  const [date1, setDate1] = useState(new Date());
  const [date2, setDate2] = useState(new Date());
  const [data, setData] = useState([]);
  const [barData, setBarData] = useState({
    series: [
      {
        name: "Bajo",
        data: [0],
      },
      {
        name: "Normal",
        data: [0],
      },
      {
        name: "Alto",
        data: [0],
      },
    ],
    chart: {
      type: "bar",
      height: 350,
      stacked: true,
      stackType: "100%",
    },
    plotOptions: {
      bar: {
        horizontal: true,
      },
    },
    stroke: {
      width: 1,
      colors: ["#fff"],
    },
    title: {
      text: "Tiempo en rango",
    },
    xaxis: {
      categories: [2024],
    },
    tooltip: {
      y: {
        formatter: function (val) {
          return val + "dias";
        },
      },
    },
    fill: {
      opacity: 1,
    },
    legend: {
      position: "top",
      horizontalAlign: "left",
      offsetX: 40,
    },
  });
  const [glucoseRange, setGlucoseRange] = useState();

  const formatDate = (dateFormat) => {
    const newDate = new Date(dateFormat);
    return `${newDate.getFullYear()}-${newDate.getMonth() + 1}-${
      newDate.getDate() < 10 ? `0${newDate.getDate()}` : newDate.getDate()
    }`;
  };

  const filterData = () => {
    const filteredData = data.filter((record) => {
      return (
        formatDate(record.created_at) >= date1 &&
        formatDate(record.created_at) <= date2
      );
    });

    const low = filteredData.filter(
      (record) => record.glucosa < glucoseRange.bajo
    ).length;
    const normal = filteredData.filter(
      (record) =>
        record.glucosa >= glucoseRange.bajo &&
        record.glucosa <= glucoseRange.alto
    ).length;
    const high = filteredData.filter(
      (record) => record.glucosa > glucoseRange.alto
    ).length;

    setBarData({
      series: [
        {
          name: "Bajo",
          data: [low],
        },
        {
          name: "Normal",
          data: [normal],
        },
        {
          name: "Alto",
          data: [high],
        },
      ],
      chart: {
        type: "bar",
        height: 350,
        stacked: true,
        stackType: "100%",
      },
      plotOptions: {
        bar: {
          horizontal: true,
        },
      },
      stroke: {
        width: 1,
        colors: ["#fff"],
      },
      title: {
        text: "Tiempo en rango",
      },
      xaxis: {
        categories: [2024],
      },
      tooltip: {
        y: {
          formatter: function (val) {
            return val + "dias";
          },
        },
      },
      fill: {
        opacity: 1,
      },
      legend: {
        position: "top",
        horizontalAlign: "left",
        offsetX: 40,
      },
    });
  };

  useEffect(() => {
    const getRecords = async () => {
      try {
        const { data, error } = await supabase
          .from("registroGlucosa")
          .select("")
          .eq("uid", user.id);
        if (error) throw error;
        setData(data);
      } catch (error) {
        console.log(error);
      }
    };

    const getGlucoseRange = async () => {
      try {
        const { data, error } = await supabase
          .from("glucosaRango")
          .select("alto, bajo")
          .eq("uid", user.id);
        if (error) throw error;
        console.log(data);
        setGlucoseRange(data[0]);
        console.log(glucoseRange);
      } catch (error) {
        console.log(error);
      }
    };

    getRecords();
    getGlucoseRange();
  }, [user]);
  return (
    <div>
      <h1 className="font-semibold text-xl mt-5">Registros de Glucosa</h1>
      <div className="mt-5 mb-5">
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
      <div className="w-full border-gray-400 border-2">
        <ReactApexChart
          series={barData.series}
          options={barData}
          type="bar"
          height={250}
          width={"100%"}
        />
      </div>
    </div>
  );
}
