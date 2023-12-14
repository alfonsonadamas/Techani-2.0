import React from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "../config/supabase";
import { useEffect, useState } from "react";
import { useUserContext } from "../context/UserContext";
import ReactApexChart from "react-apexcharts";

import Nav from "../components/Nav";

import "../dist/output.css";

export default function Main() {
  const navigate = useNavigate();
  const { user } = useUserContext();
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
        text: "Ultimas mediciones del mes",
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

  const handleSignOut = async () => {
    try {
      const { error } = await supabase.auth.signOut();
      navigate("/login");
      console.log(error);
    } catch (error) {
      console.log(error);
    }
    //navigate("/login");
  };

  useEffect(() => {
    if (!user) {
      navigate("/login");
    }
  }, [user, navigate]);

  return (
    <div>
      <Nav />
      <ReactApexChart
        options={data.options}
        series={data.series}
        type="line"
        height={350}
      />
      <button onClick={handleSignOut}>Logout</button>
    </div>
  );
}
