import React, { useEffect } from "react";
import { useState } from "react";
import { useUserContext } from "../context/UserContext";
import { Formik } from "formik";
import { supabase } from "../config/supabase";
import SideBar from "../components/SideBar";
import * as Yup from "yup";

export default function GlucoseRegister() {
  const { user } = useUserContext();
  const [meditionType, setMeditionType] = useState([]);
  const [submited, setSubmited] = useState(false);

  const getMeditionType = async () => {
    const { data, error } = await supabase.from("medicion").select("*");
    if (error) throw error;
    setMeditionType(data);
  };

  const onSubmit = async (
    { glucose, meditionType },
    { setSubmitting, setErrors, resetForm }
  ) => {
    console.log(meditionType);

    if (meditionType === "none") {
      setErrors({ meditionType: "Selecciona un tipo de medición" });

      return;
    }

    const date = new Date().toLocaleDateString();

    var parts = date.split("/");
    var year = parts[2];
    var month = parts[1];
    var day = parts[0];
    var formatDate = `${year}-${month}-${day}`;

    try {
      setSubmitting(true);
      await supabase.from("registroGlucosa").insert([
        {
          uid: user.id,
          created_at: formatDate,
          glucosa: glucose,
          idMedicion: meditionType,
        },
      ]);

      // await emailjs.send(
      //   "service_gb8sr3f",
      //   "template_jt5p6ui",
      //   {
      //     to_email: user.email,
      //     from_name: "Techani",
      //     to_name: user.user_metadata.full_name,
      //     message: `
      //   Glucosa: ${glucose}
      //   Tipo de medición: ${meditionType}`,
      //   },
      //   "RBjxGi8gd0qdpEToN"
      // );
      setSubmited(true);
    } catch (error) {
      console.log(error);
    } finally {
      setSubmitting(false);
      resetForm();
    }
  };

  const validationSchema = Yup.object().shape({
    glucose: Yup.number()
      .min(0, "La glucosa no puede ser menor a 0")
      .max(500, "La glucosa no puede ser mayor a 500")
      .required("La glucosa es requerida"),

    meditionType: Yup.string().required("El tipo de medición es requerido"),
  });

  useEffect(() => {
    getMeditionType();
  }, []);

  return (
    <div>
      <SideBar />
      <div className="p-16 pt-16  sm:ml-64" data-aos="fade-up">
        <div className="w-full h-60 flex justify-center items-center">
          <div className=" w-full">
            {!submited ? (
              <Formik
                initialValues={{
                  glucose: "",
                  meditionType: "none",
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
                    <div className="mt-24">
                      <p className="mb-4 text-sm text-gray-900 dark:text-white w-full">
                        ¡Hola! <br /> Para mantener un control detallado de tu
                        salud, es crucial registrar con precisión tus niveles de
                        glucosa. Para esto es necesario que hagas una medicion
                        con tu glucometro e introduzcas el resultado en el
                        siguiente campo asi como el tipo de medicion que
                        realizaste.
                      </p>
                      <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                        Tipo de medición
                      </label>

                      <select
                        onChange={handleChange}
                        name="meditionType"
                        onBlur={handleBlur}
                        value={values.meditionType}
                        className={
                          errors.meditionType && touched.meditionType
                            ? "bg-gray-50 mb-2 border border-red-500   text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5  "
                            : "bg-gray-50 mb-5 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5  "
                        }
                      >
                        <option value="none">
                          Seleccione el tipo de medición
                        </option>

                        {meditionType.map((medition) => (
                          <option
                            key={medition.idMedicion}
                            value={medition.idMedicion}
                          >
                            {medition.measurement}
                          </option>
                        ))}
                      </select>

                      <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                        Medición de glucosa
                      </label>
                      <input
                        type="text"
                        name="glucose"
                        autoComplete="off"
                        onChange={handleChange}
                        onBlur={handleBlur}
                        value={values.glucose}
                        aria-describedby="helper-text-explanation"
                        className={
                          errors.glucose && touched.glucose
                            ? "bg-gray-50 mb-2 border border-red-500  text-red-500 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5  "
                            : "bg-gray-50 mb-5 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5  "
                        }
                        placeholder="Ingresa tu medición de glucosa aquí"
                      />

                      <p className="mb-4 text-sm text-red-500 dark:text-white w-full">
                        {errors.glucose && touched.glucose && errors.glucose}
                      </p>

                      <button
                        className="flex items-center justify-between bg-azulHover transition duration-300 ease-out hover:ease-out hover:bg-azul  px-7 py-1 rounded-lg text-white"
                        type="submit"
                        disabled={isSubmitting}
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
                    ¡Gracias por registrar tus niveles de glucosa!{" "}
                  </p>
                  <button
                    onClick={() => setSubmited(false)}
                    className="flex items-center justify-between bg-azulHover transition duration-300 ease-out hover:ease-out hover:bg-azul  px-7 py-1 rounded-lg text-white"
                  >
                    Registrar otro
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
