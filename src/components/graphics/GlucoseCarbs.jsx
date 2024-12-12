import React, { useEffect, useState } from "react";
import ReactApexChart from "react-apexcharts";
import { supabase } from "../../config/supabase";
import { useUserContext } from "../../context/UserContext";

export default function GlucoseCarbs() {
  const { user } = useUserContext();
  const [barData, setBarData] = useState({
    series: [
      {
        name: "Carbohidratos",
        data: [],
      },
      {
        name: "Glucosa",
        data: [],
      },
    ],
    options: {
      chart: {
        height: 350,
        type: "area",
      },
      title: {
        text: "Glucosa vs Carbohidratos",
        align: "left",
      },
      dataLabels: {
        enabled: false,
      },
      stroke: {
        curve: "smooth",
      },
      xaxis: {
        type: "datetime",
        categories: [
          "2018-09-19T00:00:00.000Z",
          "2018-09-19T01:30:00.000Z",
          "2018-09-19T02:30:00.000Z",
          "2018-09-19T03:30:00.000Z",
          "2018-09-19T04:30:00.000Z",
          "2018-09-19T05:30:00.000Z",
          "2018-09-19T06:30:00.000Z",
        ],
      },
      tooltip: {
        x: {
          format: "dd/MM/yy HH:mm",
        },
      },
    },
  });
  const [date1, setDate1] = useState("");
  const [date2, setDate2] = useState("");
  const [glucoseData, setGlucoseData] = useState([]);
  const [carbsData, setCarbsData] = useState([
    { carbohydrates: 0, created_at: "", meal: "" },
  ]);

  const filterData = () => {
    const filteredGlucose = glucoseData.filter((record) => {
      return (
        record.created_at >= date1 + "T00:00:00.000Z" &&
        record.created_at <= date2 + "T23:59:59.999Z"
      );
    });

    const filteredCarbs = carbsData.filter((record) => {
      return (
        record.created_at >= date1 + "T00:00:00.000Z" &&
        record.created_at <= date2 + "T23:59:59.999Z"
      );
    });

    const groupByMeal = filteredCarbs.reduce((acc, record) => {
      if (!record.meal || !record.created_at) {
        console.error(
          "Falta la propiedad 'meal' o 'date' en un registro:",
          record
        );
        return acc;
      }

      // Inicializamos el grupo por 'meal' si no existe
      if (!acc[record.meal]) {
        acc[record.meal] = {};
      }

      // Inicializamos el grupo por 'date' dentro de 'meal' si no existe
      if (!acc[record.meal][record.created_at]) {
        acc[record.meal][record.created_at] = [];
      }

      // Añadimos el registro
      acc[record.meal][record.created_at].push(record);
      return acc;
    }, {});

    const countCarbsByDate = Object.keys(groupByMeal).map((meal) => {
      const mealData = groupByMeal[meal];
      const mealCarbs = Object.keys(mealData).map((date) => {
        const dateData = mealData[date];
        const totalCarbs = dateData.reduce((acc, record) => {
          return acc + record.carbohydrates;
        }, 0);

        return {
          x: date,
          y: totalCarbs,
        };
      });

      return mealCarbs;
    });

    const carbArray = countCarbsByDate.flat();

    console.log(carbArray);

    const newSeries = [
      {
        name: "Carbohidratos",
        data: carbArray.map((record) => {
          return {
            x: record.x,
            y: record.y,
          };
        }),
      },

      {
        name: "Glucosa",
        data: filteredGlucose.map((record) => {
          return {
            x: record.created_at,
            y: record.glucosa,
          };
        }),
      },
    ];

    setBarData({
      ...barData,
      series: newSeries,
    });
  };

  useEffect(() => {
    const getGlucose = async () => {
      try {
        const { data, error } = await supabase
          .from("registroGlucosa")
          .select("created_at, glucosa")
          .eq("uid", user.id);

        if (error) throw error;
        setGlucoseData(data);
      } catch (error) {
        console.log(error);
      }
    };

    const getCarbs = async () => {
      try {
        const { data, error } = await supabase
          .from("alimentos")
          .select(
            "created_at, idBancoAlimentos(carbohydrates), idTipoComida(meal)"
          )
          .eq("uid", user.id);

        if (error) throw error;

        const newData = data.map((record) => {
          return {
            carbohydrates: record.idBancoAlimentos.carbohydrates,
            created_at: record.created_at,
            meal: record.idTipoComida.meal,
          };
        });
        setCarbsData(newData);
      } catch (error) {
        console.log(error);
      }
    };
    if (user) {
      getGlucose();
      getCarbs();
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
          options={barData.options}
          series={barData.series}
          type="area"
          height={250}
          width={"100%"}
        />
      </div>
    </div>
  );
}
