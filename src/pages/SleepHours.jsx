import React, { useEffect, useState } from "react";
import SideBar from "../components/SideBar";
import { Formik } from "formik";
import * as Yup from "yup";
import { supabase } from "../config/supabase";
import { useUserContext } from "../context/UserContext";
import sleepQ from "../assets/img/sleepQuality.png";

import tip from "../assets/img/idea.png";
import Paginacion from "../components/Paginacion";
import { toast, ToastContainer } from "react-toastify";

export default function SleepHours() {
  const { user } = useUserContext();
  const [currentPage, setCurrentPage] = useState(1);
  const [items, setItems] = useState([]);

  const options = {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  };

  const getData = async () => {
    if (user.id) {
      const { data, error } = await supabase
        .from("calidadS")
        .select("*")
        .eq("uid", user.id);
      if (error) {
        console.log(error);
      }
      console.log(data);
      setItems(data);
    }
  };

  const handleSubmit = async (
    { sleepHours, sleepQuality, date },
    { setSubmitting, setErrors, resetForm }
  ) => {
    if (!date) {
      date = new Date().toISOString().split("T")[0];
    }
    try {
      setSubmitting(true);
      const { data, error } = await supabase.from("calidadS").insert({
        horas: sleepHours,
        calidad: sleepQuality,
        uid: user.id,
        fecha: date,
      });
      console.log(data, error);
      toast.success("Datos guardados correctamente");
      resetForm();
      getData();
    } catch (error) {
      console.log(error);
    } finally {
      setSubmitting(false);
      resetForm();
    }
  };

  const validationSchema = Yup.object().shape({
    sleepHours: Yup.number()
      .required("Este campo es requerido")
      .min(0, "El valor minimo es 0")
      .max(24, "El valor máximo es 24"),
    sleepQuality: Yup.number()
      .required("Este campo es requerido")
      .max(5, "El valor máximo es 5")
      .min(1, "El valor mínimo es 1"),
  });

  const itemsPerPage = 6;
  const totalPages = Math.ceil(items.length / itemsPerPage);
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = items.slice(indexOfFirstItem, indexOfLastItem);

  const handlePageChange = (page) => {
    if (page > 0 && page <= totalPages) {
      setCurrentPage(page);
    }
  };

  const formatDate = (date) => {
    const newDate = new Date(date);
    const longDate = new Intl.DateTimeFormat("es-ES", options).format(newDate);
    return longDate.charAt(0).toUpperCase() + longDate.slice(1);
  };

  const setDreamQuality = (quality) => {
    switch (quality) {
      case 1:
        return "Muy mala";
      case 2:
        return "Mala";
      case 3:
        return "Regular";
      case 4:
        return "Buena";
      case 5:
        return "Excelente";
      default:
        return "No definida";
    }
  };

  const deleteDream = async (id) => {
    try {
      const { data, error } = await supabase
        .from("calidadS")
        .delete()
        .eq("id", id);
      if (error) {
        console.log(error);
      }
      console.log(data, error);
      toast.success("Registro eliminado correctamente");
      getData();
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (user) {
      getData();
    }
  }, [user]);

  return (
    <div>
      <SideBar />
      <ToastContainer />
      <div className="p-16 mt-8 sm:ml-64 h-screen" data-aos="fade-up">
        <h1 className="text-2xl font-semibold text-gray-900 dark:text-white mb-5">
          Registro de sueño
        </h1>
        <div className="w-full flex items-center border-b-2 pb-5">
          <div className="w-1/2">
            <Formik
              initialValues={{
                sleepHours: "",
                sleepQuality: "",
                date: "",
              }}
              onSubmit={handleSubmit}
              validationSchema={validationSchema}
            >
              {({
                handleSubmit,
                handleChange,
                values,
                errors,
                touched,
                isSubmitting,
              }) => (
                <form
                  onSubmit={handleSubmit}
                  className="flex flex-col justify-center h-full w-full "
                >
                  <p className="mb-2 text-sm font-medium text-gray-900 dark:text-white">
                    Fecha de registro
                  </p>
                  <p className="text-sm mb-3">
                    Ingrese la fecha en la que desea registrar su calidad de
                    sueño. Si este campo esta vacio se registrará la fecha
                    actual.
                  </p>
                  <input
                    type="date"
                    name="date"
                    onChange={handleChange}
                    placeholder="Ingrese las horas que durmió"
                    max={new Date().toISOString().split("T")[0]}
                    className={
                      "bg-gray-50 mb-5 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                    }
                  />
                  <p className="mb-2 text-sm font-medium text-gray-900 dark:text-white">
                    Horas de sueño
                  </p>
                  <input
                    type="text"
                    name="sleepHours"
                    onChange={handleChange}
                    placeholder="Ingrese las horas que durmió"
                    className={
                      errors.sleepHours
                        ? "bg-gray-50 mb-2 border border-red-500 text-red-500 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                        : "bg-gray-50 mb-5 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                    }
                    value={values.sleepHours}
                  />
                  <p className="text-sm mb-2 text-red-500">
                    {errors.sleepHours &&
                      touched.sleepHours &&
                      errors.sleepHours}
                  </p>
                  <p className="mb-2 text-sm font-medium text-gray-900 dark:text-white">
                    Calidad de sueño
                  </p>
                  <p className="text-sm mb-3">
                    Ingrese la calidad en un{" "}
                    <span className="font-bold">rango del 1 al 5</span>, tomando
                    en cuenta que 5 es Excelente calidad de sueño
                  </p>
                  <input
                    type="text"
                    name="sleepQuality"
                    onChange={handleChange}
                    placeholder="Ingrese las horas que durmió"
                    className={
                      errors.sleepQuality
                        ? "bg-gray-50 mb-2 border border-red-500 text-red-500 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                        : "bg-gray-50 mb-5 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                    }
                    value={values.sleepQuality}
                  />
                  <p className="mb-5 text-sm text-red-500">
                    {errors.sleepQuality &&
                      touched.sleepQuality &&
                      errors.sleepQuality}
                  </p>
                  <button
                    type="submit"
                    disabled={
                      values.sleepHours === "" ||
                      values.sleepQuality === "" ||
                      isSubmitting
                    }
                    className="flex w-28 items-center justify-between bg-azulHover transition duration-300 ease-out hover:ease-out hover:bg-azul  px-7 py-1 rounded-lg text-white disabled:opacity-50"
                  >
                    Guardar
                  </button>
                </form>
              )}
            </Formik>
          </div>
          <div className="w-1/2 bg-azul flex ml-9 h-48 p-5 rounded-lg shadow-md shadow-slate-800">
            <div className="w-1/2 flex justify-center items-start mt-2">
              <img src={tip} alt="tip" className="w-10" />
            </div>
            <div className="ml-5">
              <p className="text-white font-semibold">
                TIPS PARA MEJORAR TU CALIDAD DE SUEÑO
              </p>
              <p className="text-white text-sm mt-3">
                El ejercicio diario puede mejorar significativamente la calidad
                del sueño, pero evita hacerlo justo antes de dormir. Hacer
                ejercicio vigoroso cerca de la hora de dormir puede activar tu
                cuerpo y dificultar que te relajes.
              </p>
            </div>
          </div>
        </div>

        <div className="flex justify-between mt-5 mb-5">
          <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-5">
            Historial de Sueño
          </h2>
          <form action="">
            <input className="rounded-lg" type="date" />
            <button
              type="submit"
              className=" ml-5 w-28 items-center justify-between bg-azulHover transition duration-300 ease-out hover:ease-out hover:bg-azul  px-7 py-1 rounded-lg text-white disabled:opacity-50"
            >
              Filtrar
            </button>
          </form>
        </div>
        <div className="flex flex-wrap mt-5">
          {/* <ul>
            {currentItems.map((item) => (
              <li key={item.id} className="border-b py-2">
                {item.horas}
              </li>
            ))}
          </ul> */}

          {currentItems.map((item) => (
            <div className="border-2 w-[31.5%] px-2 py-3 rounded-lg shadow-lg my-3 mx-1">
              <h3 className="mb-5">{formatDate(item.fecha)}</h3>
              <div className="flex ">
                <img
                  src={sleepQ}
                  alt="sleep"
                  className="w-10 h-full mr-5 ml-3"
                />
                <div className="mb-5">
                  <p>
                    <span className="font-semibold">Horas de sueño:</span>{" "}
                    {item.horas}
                  </p>
                  <p>
                    <span className="font-semibold">Calidad de sueño:</span>{" "}
                    {setDreamQuality(item.calidad)}
                  </p>
                </div>
              </div>
              <div className="flex justify-end">
                <button
                  onClick={() => {
                    deleteDream(item.id);
                  }}
                  className="bg-[#AB1A1A] rounded-lg text-white text-sm px-5 py-1"
                >
                  Eliminar
                </button>
              </div>
            </div>
          ))}
        </div>
        <div className="mb-5 mt-5 h-16">
          <Paginacion
            currentPage={currentPage}
            totalPages={totalPages}
            onPageChange={handlePageChange}
          />
        </div>
      </div>
    </div>
  );
}
