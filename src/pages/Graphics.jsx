import React, { useEffect } from "react";
import { useState } from "react";
import ReactApexChart from "react-apexcharts";
import SideBar from "../components/SideBar";
import { useUserContext } from "../context/UserContext";
import { supabase } from "../config/supabase";
import FiltroFecha from "../components/FiltroFecha";

export default function Grapics() {
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

  const filterData = () => {
    const filteredData = data.filter((record) => {
      const recordDate = new Date(record.created_at);
      return recordDate >= date1 && recordDate <= date2;
    });

    const low = filteredData.filter((record) => record.glucosa < 100).length;
    const normal = filteredData.filter(
      (record) => record.glucosa >= 101 && record.glucosa <= 130
    ).length;
    const high = filteredData.filter((record) => record.glucosa > 130).length;

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
    getRecords();
  }, [user]);

  return (
    <div className="w-full h-screen">
      <SideBar />
      <div className="p-16 pt-20 sm:ml-64 ">
        <div className="flex flex-col ">
          <div className="mb-5">
            <h2 className="text-2xl mb-5 font-semibold">Gráficas</h2>
            <FiltroFecha
              eventClick={filterData}
              handleDate1={handleDate1}
              handleDate2={handleDate2}
            ></FiltroFecha>
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
      </div>
    </div>
  );
}
