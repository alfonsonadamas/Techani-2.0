import React, { useEffect } from "react";
import "../dist/output.css";
import SideBar from "../components/SideBar";
import axios from "axios";

export default function Main() {
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
    getApi();
  }, []);

  return (
    <div className="w-full h-screen">
      <SideBar />
      <div className="p-16 pt-20 sm:ml-64 "></div>
    </div>
  );
}
