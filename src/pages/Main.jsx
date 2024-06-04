import React from "react";
import "../dist/output.css";
import SideBar from "../components/SideBar";

export default function Main() {
  return (
    <div className="w-full h-screen">
      <SideBar />
      <div className="p-16 pt-20 sm:ml-64 "></div>
    </div>
  );
}
