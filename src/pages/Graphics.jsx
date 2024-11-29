import React from "react";
import SideBar from "../components/SideBar";
import GlucoseRange from "../components/graphics/GlucoseRange";
import GlucoseControl from "../components/graphics/GlucoseControl";
import GlucoseCarbs from "../components/graphics/GlucoseCarbs";

export default function Grapics() {
  return (
    <div className="w-full h-screen">
      <SideBar />
      <div className="p-16 pt-20 sm:ml-64 ">
        <div className="flex flex-col ">
          <h2 className="text-2xl font-semibold">Gráficas</h2>
          <GlucoseRange />
          <GlucoseControl />
          <GlucoseCarbs />
        </div>
      </div>
    </div>
  );
}
