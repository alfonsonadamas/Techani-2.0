import React from "react";
// import { useUserContext } from "../context/UserContext";
// import { supabase } from "../config/supabase";
import SideBar from "../components/SideBar";
// import * as Yup from "yup";
// import { Formik } from "formik";
// import { type } from "@testing-library/user-event/dist/type";

export default function AllAlimentosRegister() {
  //const { user } = useUserContext();
  // const [records, setRecords] = useState([]);
  // const [loading, setLoading] = useState(false);

  // const getRecords = async () => {
  //   try {
  //     setLoading(true);
  //     const { data, error } = await supabase
  //       .from("BancoAlimentos")
  //       .select()
  //       .eq("uid", user.id);

  //     if (error) console.log("error", error);

  //     setRecords(data);
  //   } catch (error) {
  //     console.log(error);
  //   } finally {
  //     setLoading(false);
  //   }
  // };

  return (
    <div>
      <SideBar />
      <div className="p-16 pt-20 sm:ml-64" data-aos="fade-up">
        <div className="w-full h-60 flex justify-center items-center">
          <div className=" w-full">
            <h1 className="text-3xl font-bold text-center">
              Mis Registros de Alimentos
            </h1>
            <p className="text-center text-gray-500">
              Aquí podrás ver todos los alimentos que has registrado
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
