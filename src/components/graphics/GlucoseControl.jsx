import React, { useEffect, useState } from "react";
import ReactApexChart from "react-apexcharts";
import { supabase } from "../../config/supabase";
import { useUserContext } from "../../context/UserContext";

export default function GlucoseControl() {
  const { user } = useUserContext();
  const [date1, setDate1] = useState(new Date());
  const [date2, setDate2] = useState(new Date());
  const [data, setData] = useState([]);
  const [glucoseRange, setGlucoseRange] = useState({ alto: 120, bajo: 80 }); // Valores por defecto
  const [barData, setBarData] = useState({
    series: [],
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
        width: [5, 7, 5],
        curve: "straight",
        dashArray: [0, 8, 5],
      },
      title: {
        text: "Datos de Glucosa",
        align: "left",
      },
      markers: {
        size: 0,
        hover: {
          sizeOffset: 6,
        },
      },
      xaxis: {
        categories: [],
      },
      grid: {
        borderColor: "#f1f1f1",
      },
    },
  });

  const formatDate = (date) => {
    const newDate = new Date(date);
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

    const glucosaValues = filteredData.map((item) => item.glucosa);
    const fechas = filteredData.map((item) => {
      const date = new Date(item.created_at);
      return date.toLocaleDateString();
    });

    // Repetir datos de rango
    const rangeLow = Array(glucosaValues.length).fill(glucoseRange.bajo);
    const rangeHigh = Array(glucosaValues.length).fill(glucoseRange.alto);

    setBarData({
      series: [
        {
          name: "Datos de Glucosa",
          data: glucosaValues,
        },
        {
          name: "Rango Bajo",
          data: rangeLow,
        },
        {
          name: "Rango Alto",
          data: rangeHigh,
        },
      ],
      options: {
        ...barData.options,
        xaxis: {
          categories: fechas,
        },
      },
    });
  };

  useEffect(() => {
    const getRecords = async () => {
      try {
        const { data, error } = await supabase
          .from("registroGlucosa")
          .select("created_at, glucosa")
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
        if (data.length > 0) setGlucoseRange(data[0]);
      } catch (error) {
        console.log(error);
      }
    };

    if (user) {
      getRecords();
      getGlucoseRange();
    }
  }, [user]);

  return (
    <div>
      <div className="mt-5 mb-5">
        <span>Fecha inicio:</span>
        <input
          type="date"
          className="mx-3 w-48 text-center border-gray-400 rounded-xl"
          onChange={(e) => setDate1(e.target.value)}
        />
        <span>Fecha fin:</span>
        <input
          type="date"
          className="mx-3 w-48 text-center border-gray-400 rounded-xl"
          onChange={(e) => setDate2(e.target.value)}
        />
        <button
          onClick={filterData}
          className="bg-blue-500 text-white rounded-lg px-3 py-1.5 ml-3"
        >
          Filtrar
        </button>
      </div>
      <div className="w-full border-gray-400 border-2">
        <ReactApexChart
          series={barData.series}
          options={barData.options}
          type="line"
          height={250}
          width={"100%"}
        />
      </div>
    </div>
  );
}
