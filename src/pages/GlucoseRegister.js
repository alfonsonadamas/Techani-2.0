import React from "react";
import { useState } from "react";
import { useUserContext } from "../context/UserContext";
import { Formik } from "formik";
import SideBar from "../components/SideBar";
import emailjs from "@emailjs/browser";

export default function GlucoseRegister() {
  const { user } = useUserContext();

  const [mouseEnter, setMouseEnter] = useState(false);

  const [step1, setStep1] = useState(true);
  const [step2, setStep2] = useState(true);
  const [step3, setStep3] = useState(true);

  const [stepForm, setStepForm] = useState(1);

  const sendEmail = async (
    glucose,
    insulineType,
    dose,
    doseType,
    water,
    meditionType,
    atipicDay,
    observation
  ) => {
    await emailjs.send(
      "service_gb8sr3f",
      "template_jt5p6ui",
      {
        to_email: user.email,
        from_name: "Techani",
        to_name: user.user_metadata.full_name,
        message: `Glucosa: ${glucose} mg/dl 
                  Insulina:  ${dose} unidades de Insulina ${insulineType} 
                  Tipo de dosis: ${doseType}
                  Tipo de medición: ${meditionType}
                  Dia atipico: ${atipicDay}
                  Agua consumida: ${water} vasos de 250ml
                  Observaciones: ${observation}
                  `,
      },
      "RBjxGi8gd0qdpEToN"
    );
  };

  const onSubmit = (
    {
      glucose,
      insulineType,
      dose,
      doseType,
      water,
      meditionType,
      atipicDay,
      observation,
    },

    { setSubmitting, setErrors, resetForm }
  ) => {
    switch (stepForm) {
      case 1:
        if (glucose < 1) {
          setErrors({ glucose: "Este campo no puede ir vacío" });
          return;
        }
        setStepForm(2);
        setStep1(false);
        setStep2(true);
        setStep3(true);
        break;

      case 2:
        setStepForm(3);
        setStep1(false);
        setStep2(false);
        setStep3(true);
        break;

      case 3:
        setStep1(false);
        setStep2(false);
        setStep3(false);
        sendEmail(
          glucose,
          insulineType,
          dose,
          doseType,
          water,
          meditionType,
          atipicDay,
          observation
        );
        break;

      default:
        break;
    }
  };

  const handleEnter = () => {
    setMouseEnter(true);
  };

  const handleLeave = () => {
    setMouseEnter(false);
  };

  // const validationSchema = Yup.object().shape({
  //   glucose: Yup.number()
  //     .min(1, "La glucosa no puede ser menor a 0")
  //     .max(500, "La glucosa no puede ser mayor a 500")
  //     .required("La glucosa es requerida"),
  //   dose: Yup.number()
  //     .min(0, "La dosis no puede ser menor a 0")
  //     .max(10, "La dosis no puede ser mayor a 10")
  //     .required("La dosis es requerida"),
  //   water: Yup.number()
  //     .min(0, "El agua no puede ser menor a 0")
  //     .max(10, "El agua no puede ser mayor a 10")
  //     .required("El agua es requerida"),
  // });

  return (
    <div>
      <SideBar />
      <div className="p-16 pt-16  sm:ml-64" data-aos="fade-up">
        <ol className="flex mt-10 items-center w-full text-sm font-medium text-center text-gray-500 dark:text-gray-400 sm:text-base">
          <li className="flex md:w-full items-center sm:after:content-[''] after:w-full after:h-1 after:border-b after:border-gray-200 after:border-1 after:hidden sm:after:inline-block after:mx-6 xl:after:mx-10 dark:after:border-gray-700">
            {step1 ? (
              <span className="flex items-center text-base after:content-['/'] sm:after:hidden after:mx-2 after:text-gray-200 dark:after:text-gray-500">
                <span className="me-2">1</span>
                Glucosa
              </span>
            ) : (
              <span className="flex items-center text-blue-500 text-base after:content-['/'] sm:after:hidden after:mx-2 after:text-gray-200 dark:after:text-gray-500">
                <svg
                  className="w-3.5 h-3.5 sm:w-4 sm:h-4 me-2.5"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path d="M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5Zm3.707 8.207-4 4a1 1 0 0 1-1.414 0l-2-2a1 1 0 0 1 1.414-1.414L9 10.586l3.293-3.293a1 1 0 0 1 1.414 1.414Z" />
                </svg>
                Glucosa
              </span>
            )}
          </li>
          <li className="flex md:w-full items-center after:content-[''] after:w-full after:h-1 after:border-b after:border-gray-200 after:border-1 after:hidden sm:after:inline-block after:mx-6 xl:after:mx-10 dark:after:border-gray-700">
            {step2 ? (
              <span className="flex items-center text-base after:content-['/'] sm:after:hidden after:mx-2 after:text-gray-200 dark:after:text-gray-500">
                <span className="me-2">2</span>
                Insulina
              </span>
            ) : (
              <span className="flex items-center text-blue-500 text-base after:content-['/'] sm:after:hidden after:mx-2 after:text-gray-200 dark:after:text-gray-500">
                <svg
                  className="w-3.5 h-3.5 sm:w-4 sm:h-4 me-2.5"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path d="M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5Zm3.707 8.207-4 4a1 1 0 0 1-1.414 0l-2-2a1 1 0 0 1 1.414-1.414L9 10.586l3.293-3.293a1 1 0 0 1 1.414 1.414Z" />
                </svg>
                Insulina
              </span>
            )}
          </li>
          <li className="flex items-center text-base">
            {step3 ? (
              <span className="flex items-center text-base after:content-['/'] sm:after:hidden after:mx-2 after:text-gray-200 dark:after:text-gray-500">
                <span className="me-2">3</span>
                Observaciones
              </span>
            ) : (
              <span className="flex items-center text-blue-500 text-base after:content-['/'] sm:after:hidden after:mx-2 after:text-gray-200 dark:after:text-gray-500">
                <svg
                  className="w-3.5 h-3.5 sm:w-4 sm:h-4 me-2.5"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path d="M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5Zm3.707 8.207-4 4a1 1 0 0 1-1.414 0l-2-2a1 1 0 0 1 1.414-1.414L9 10.586l3.293-3.293a1 1 0 0 1 1.414 1.414Z" />
                </svg>
                Observaciones
              </span>
            )}
          </li>
        </ol>
        <div className="w-full h-60 flex justify-center items-center">
          <div className=" w-full">
            <Formik
              initialValues={{
                glucose: "",
                insulineType: "Lenta",
                dose: "",
                doseType: "Para Alimentos",
                water: "",
                meditionType: "Prepandrial - Desayuno",
                atipicDay: "ninguno",
                observation: "",
              }}
              onSubmit={onSubmit}
              // validationSchema={validationSchema}
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
                  {stepForm === 1 && (
                    <div>
                      <p className=" mb-4 text-sm text-gray-900 dark:text-white w-full">
                        ¡Hola! <br /> Para mantener un control detallado de tu
                        salud, es crucial registrar con precisión tus niveles de
                        glucosa. Para esto es necesario que hagas una medicion
                        con tu glucometro e introduzcas el resultado en el
                        siguiente campo.
                      </p>
                      <input
                        type="number"
                        name="glucose"
                        min={1}
                        max={500}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        value={values.glucose}
                        aria-describedby="helper-text-explanation"
                        className={
                          errors.glucose
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
                        onMouseEnter={handleEnter}
                        onMouseLeave={handleLeave}
                      >
                        Siguiente
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke-width="1.5"
                          stroke="currentColor"
                          class={
                            mouseEnter
                              ? "ml-3 w-4 h-4 translate-x-1 duration-300 ease-out"
                              : "ml-3 w-4 h-4 duration-300 ease-out"
                          }
                        >
                          <path
                            stroke-linecap="round"
                            stroke-linejoin="round"
                            d="m8.25 4.5 7.5 7.5-7.5 7.5"
                          />
                        </svg>
                      </button>
                    </div>
                  )}
                  {stepForm === 2 && (
                    <div>
                      <p className="mt-56 mb-4 text-sm text-gray-900 dark:text-white w-full">
                        Ahora que ya has registrado tu nivel de glucosa, es
                        necesario registrar tu dosis de insulina. Para esto es
                        necesario que llenes el siguiente formulario.
                      </p>
                      <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                        Tipo de insulina
                      </label>
                      <select
                        onChange={handleChange}
                        onBlur={handleBlur}
                        value={values.insulineType}
                        className="bg-gray-50 border mb-5 border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                      >
                        <option value="Lenta">Lenta</option>
                        <option value="Rapida">Rápida</option>
                      </select>

                      <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                        Dosis en unidades
                      </label>

                      <input
                        className="bg-gray-50 mb-5 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5  dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                        type="number"
                        placeholder="Ingresa la cantidad de insulina en unidades"
                        name="dose"
                        onChange={handleChange}
                        onBlur={handleBlur}
                        value={values.dose}
                        min={1}
                        max={10}
                      ></input>

                      <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                        Tipo de dosis
                      </label>

                      <select
                        onChange={handleChange}
                        onBlur={handleBlur}
                        value={values.doseType}
                        className="bg-gray-50 mb-5 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5  dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                      >
                        <option value="Para Alimentos">Para Alimentos</option>
                        <option value="Corrección">Corrección</option>
                        <option value="24 Horas">24 Horas</option>
                      </select>
                      <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                        Tipo de medición
                      </label>

                      <select
                        onChange={handleChange}
                        onBlur={handleBlur}
                        value={values.meditionType}
                        className="bg-gray-50 mb-5 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5  dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                      >
                        <option value="Prepandrial - Desayuno">
                          Prepandrial - Desayuno
                        </option>
                        <option value="Postpandrial - Desayuno">
                          Postpandrial - Desayuno
                        </option>
                        <option value="Prepandrial - Comida">
                          Prepandrial - Comida
                        </option>
                        <option value="Postpandrial - Comida">
                          Postpandrial - Comida
                        </option>
                        <option value="Prepandrial - Cena">
                          Prepandrial - Cena
                        </option>
                        <option value="Postpandrial - Cena">
                          Postpandrial - Cena
                        </option>
                        <option value="Nocturna">Nocturna</option>
                      </select>
                      <button
                        className="flex items-center justify-between bg-azulHover transition duration-300 ease-out hover:ease-out hover:bg-azul  px-7 py-1 rounded-lg text-white"
                        type="submit"
                        onMouseEnter={handleEnter}
                        onMouseLeave={handleLeave}
                      >
                        Siguiente
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke-width="1.5"
                          stroke="currentColor"
                          class={
                            mouseEnter
                              ? "ml-3 w-4 h-4 translate-x-1 duration-300 ease-out"
                              : "ml-3 w-4 h-4 duration-300 ease-out"
                          }
                        >
                          <path
                            stroke-linecap="round"
                            stroke-linejoin="round"
                            d="m8.25 4.5 7.5 7.5-7.5 7.5"
                          />
                        </svg>
                      </button>
                    </div>
                  )}
                  {stepForm === 3 && (
                    <div>
                      <p className="mt-52 mb-4 text-sm text-gray-900 dark:text-white w-full">
                        Por ultimo es necesario que registres la cantidad de
                        agua y como te sentiste en el dia asi como algunas
                        observaciones que quieras hacer.
                      </p>
                      <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                        Dia atipico
                      </label>
                      <select
                        onChange={handleChange}
                        onBlur={handleBlur}
                        value={values.atipicDay}
                        className="bg-gray-50 border mb-5 border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                      >
                        <option value="ninguno">Ninguno</option>
                        <option value="menstruacion">Menstruación</option>
                        <option value="vacuna">Vacuna</option>
                        <option value="enfermedad">Enfermedad</option>
                        <option value="examen">Examen</option>
                        <option value="otro">Otro...</option>
                      </select>

                      <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                        Agua consumida en vasos de 250ml
                      </label>

                      <input
                        className="bg-gray-50 mb-5 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5  dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                        type="number"
                        name="water"
                        onChange={handleChange}
                        onBlur={handleBlur}
                        value={values.water}
                        placeholder="Ingresa la cantidad de agua consumida en vasos de 250ml"
                        min={1}
                        max={10}
                      ></input>

                      <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                        Observaciones
                      </label>

                      <textarea
                        onChange={handleChange}
                        onBlur={handleBlur}
                        value={values.observation}
                        name="observation"
                        className="bg-gray-50 mb-5 h-32 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5   resize-none"
                      ></textarea>
                      <button
                        type="submit"
                        className="bg-azulFondo transition duration-300 ease-out hover:ease-out  px-7 py-1 rounded-lg text-white"
                      >
                        Registrar
                      </button>
                    </div>
                  )}
                </form>
              )}
            </Formik>
          </div>
        </div>
      </div>
    </div>
  );
}
