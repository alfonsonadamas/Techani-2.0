import React, { useEffect } from "react";
import { useState } from "react";
import { useUserContext } from "../context/UserContext";
import { Formik } from "formik";
import { supabase } from "../config/supabase";
import SideBar from "../components/SideBar";
import * as Yup from "yup";
import { toast, ToastContainer } from "react-toastify";

export default function InsulineRegister() {
  const { user } = useUserContext();
  const [insulineTypes, setinsulineTypes] = useState([]);
  const [doseTypes, setdoseTypes] = useState([]);
  const [submited, setSubmited] = useState(false);
  const [records, setRecords] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const getInsulineType = async () => {
    const { data, error } = await supabase.from("insulina").select("*");
    console.log(data);
    if (error) throw error;
    setinsulineTypes(data);
  };

  const getDoseType = async () => {
    const { data, error } = await supabase.from("tipoDosis").select("*");
    if (error) throw error;
    setdoseTypes(data);
  };

  const getRecords = async () => {
    var today = new Date().toLocaleDateString();
    today = today.split("/").reverse();
    if (today[1].length === 1) {
      today[1] = "0" + today[1];
    }
    today = today.join("-");

    try {
      const { data, error } = await supabase
        .from("registroInsulina")
        .select("*")
        .eq("uid", user.id)
        .eq("created_at", today);
      if (error) throw error;
      console.log("Datos anteriores", data);
      setRecords(data);
    } catch (error) {
      console.log(error);
    }
  };

  const onSubmit = async (
    { dose, doseType, insulineType, medition },
    { setSubmitting, setErrors, resetForm }
  ) => {
    setIsLoading(true);
    console.log(dose, doseType, insulineType, medition);
    if (doseType === "none") {
      setErrors({ doseType: "Selecciona un tipo de insulina" });
      return;
    }
    if (insulineType === "none") {
      setErrors({ insulineType: "Selecciona un tipo de dosis" });
      return;
    }

    if (medition === "none" && doseType === "1") {
      setErrors({ medition: "Selecciona un tipo de medición" });
      return;
    }

    var duplicate = false;

    if (records.length > 0) {
      records.forEach((record) => {
        if (record.medicion === medition && record.medicion !== "") {
          setErrors({
            medition: "Ya existe un registro con este tipo de medición",
          });
          duplicate = true;
          console.log(record);
        }
      });
    }

    const date = new Date().toLocaleDateString();
    var parts = date.split("/");
    var year = parts[2];
    var month = parts[1];
    var day = parts[0];
    var formatDate = `${year}-${month}-${day}`;

    try {
      if (!duplicate) {
        setSubmitting(true);
        const { data, error } = await supabase.from("registroInsulina").insert([
          {
            created_at: formatDate,
            uid: user.id,
            dosis: dose,
            tipoInsulina: insulineType,
            tipoDosis: doseType,
            medicion: medition,
          },
        ]);

        if (error) throw error;
        console.log(data);
        toast.success("Registro exitoso");
        getRecords();
        resetForm();
      } else {
        console.log("Registro duplicado");
        console.log(duplicate);
      }
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  };

  const validationSchema = Yup.object().shape({
    dose: Yup.number()
      .min(0, "La dosis de insulina no puede ser menor a 0")
      .max(500, "La dosis de insulina no puede ser mayor a 500")
      .required("La dosis de insulina es requerida"),
  });

  useEffect(() => {
    if (user) {
      getInsulineType();
      getDoseType();
      getRecords();
    }
  }, [user]);

  return (
    <div>
      <SideBar />
      <div className="p-16 pt-16  sm:ml-64" data-aos="fade-up">
        <ToastContainer />
        <div className="w-full h-60 flex justify-center items-center">
          <div className=" w-full mt-20">
            {!submited ? (
              <Formik
                initialValues={{
                  dose: "",
                  doseType: "",
                  insulineType: "",
                  medition: "",
                }}
                onSubmit={onSubmit}
                validationSchema={validationSchema}
              >
                {({
                  values,
                  handleSubmit,
                  handleChange,
                  errors,
                  touched,
                  handleBlur,
                  isSubmitting,
                }) => (
                  <form onSubmit={handleSubmit} className="mx-auto w-full ">
                    <div className="mt-48">
                      <p className="mb-4 text-sm text-gray-900 dark:text-white w-full">
                        ¡Hola! <br /> Registra tu dosis de insulina para llevar
                        un control detallado de tu diabetes. Recuerda que es
                        importante llevar un control de tus dosis para evitar
                        una hipoglucemia.
                      </p>
                      <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                        Tipo de insulina
                      </label>
                      <select
                        onChange={handleChange}
                        onBlur={handleBlur}
                        name="insulineType"
                        className={
                          errors.insulineType && touched.insulineType
                            ? "bg-gray-50 mb-2 border border-red-500   text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5  "
                            : "bg-gray-50 mb-5 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5  "
                        }
                      >
                        <option value="none">
                          Selecciona un tipo de insulina
                        </option>
                        {insulineTypes.map((insuline) => (
                          <option
                            key={insuline.idTipoInsulina}
                            value={insuline.idTipoInsulina}
                          >
                            {insuline.insulin}
                          </option>
                        ))}
                      </select>

                      <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                        Tipo de dosis
                      </label>

                      <select
                        onChange={handleChange}
                        onBlur={handleBlur}
                        name="doseType"
                        value={values.doseType}
                        className={
                          errors.doseType && touched.doseType
                            ? "bg-gray-50 mb-2 border border-red-500  text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5  "
                            : "bg-gray-50 mb-5 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5  "
                        }
                      >
                        <option value="none">
                          Selecciona el tipo de dosis
                        </option>
                        {doseTypes.map((insuline) => (
                          <option key={insuline.id} value={insuline.id}>
                            {insuline.tipoDosis}
                          </option>
                        ))}
                      </select>

                      {values.doseType === "1" && (
                        <div>
                          <select
                            name="medition"
                            id="medition"
                            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                            onChange={handleChange}
                            onBlur={handleBlur}
                            value={values.medition}
                          >
                            <option value="none">Seleccione... </option>
                            <option value="Desayuno">Desayuno</option>
                            <option value="Colacion Matutina">
                              Colación Matutina
                            </option>
                            <option value="Comida">Comida</option>
                            <option value="Colacion Vespertina">
                              Colación Vespertina
                            </option>
                            <option value="Ejercicio">Ejercicio</option>
                            <option value="Cena">Cena</option>
                            <option value="Nocturna">Nocturna</option>
                          </select>
                          <p className="mb-4 mt-3 text-sm text-red-500 dark:text-white w-full">
                            {errors.medition &&
                              touched.medition &&
                              errors.medition}
                          </p>
                        </div>
                      )}

                      <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                        Dosis en unidades
                      </label>

                      <input
                        className={
                          "bg-gray-50 mb-5 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5  "
                        }
                        type="text"
                        autoComplete="off"
                        placeholder="Ingresa la cantidad de insulina en unidades"
                        name="dose"
                        onChange={handleChange}
                        onBlur={handleBlur}
                        value={values.dose}
                        min={1}
                        max={10}
                      ></input>
                      <p className="mb-4 text-sm text-red-500 dark:text-white w-full">
                        {errors.dose && touched.dose && errors.dose}
                      </p>

                      <button
                        className="flex items-center justify-between bg-azulHover transition duration-300 ease-out hover:ease-out hover:bg-azul  px-7 py-1 rounded-lg text-white"
                        type="submit"
                        disabled={isLoading}
                      >
                        Guardar
                      </button>
                    </div>
                  </form>
                )}
              </Formik>
            ) : (
              <div className="w-full h-60 flex justify-center items-center">
                <div className="w-full">
                  <p className="mb-4 text-sm text-gray-900 dark:text-white w-full">
                    ¡Gracias por registrar tu dosis de insulina!{" "}
                  </p>
                  <button
                    onClick={() => setSubmited(false)}
                    className="flex items-center justify-between bg-azulHover transition duration-300 ease-out hover:ease-out hover:bg-azul  px-7 py-1 rounded-lg text-white"
                  >
                    Registrar otra dosis
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
