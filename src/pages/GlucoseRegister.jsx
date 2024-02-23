import React from "react";
import { useState } from "react";
import { useUserContext } from "../context/UserContext";
import { Formik } from "formik";
import { supabase } from "../config/supabase";
import SideBar from "../components/SideBar";
import emailjs from "@emailjs/browser";
import { Link } from "react-router-dom";

export default function GlucoseRegister() {
  const { user } = useUserContext();

  const [mouseEnter, setMouseEnter] = useState(false);

  const [caracteres, setCaracteres] = useState(200);

  const [step1, setStep1] = useState(true);
  const [step2, setStep2] = useState(true);
  const [step3, setStep3] = useState(true);

  const [stepForm, setStepForm] = useState(1);

  const handleStep = () => {
    setStepForm(stepForm - 1);
    switch (stepForm) {
      case 2:
        setStep1(true);
        setStep2(true);
        setStep3(true);
        break;
      case 3:
        setStep1(false);
        setStep2(true);
        setStep3(true);
        break;

      default:
        break;
    }
  };

  const handleCount = () => {
    const textArea = document.getElementById("textArea");
    const maxLength = textArea.getAttribute("maxlength");
    const currentLength = textArea.value.length;

    if (currentLength >= maxLength) {
      setCaracteres(0);
    } else {
      setCaracteres(maxLength - currentLength);
    }
  };

  const onSubmit = async (
    {
      glucose,
      insulineType,
      dose,
      doseType,
      water,
      meditionType,
      atipicDay,
      otherAtipicDay,
      observation,
    },

    { setSubmitting, setErrors, resetForm }
  ) => {
    switch (stepForm) {
      case 1:
        if (glucose === "") {
          setErrors({ glucose: "Este campo no puede ir vacío" });
          return;
        } else if (!/^\d+$/.test(glucose)) {
          setErrors({ glucose: "Este campo solo admite numeros" });
          return;
        }
        setStepForm(2);
        setStep1(false);
        setStep2(true);
        setStep3(true);
        setSubmitting(false);
        break;

      case 2:
        if (dose === "") {
          setErrors({ dose: "Este campo no puede ir vacío" });
          return;
        } else if (!/^\d+$/.test(dose)) {
          setErrors({ dose: "Este campo solo admite numeros" });
          return;
        }
        setStepForm(3);
        setStep1(false);
        setStep2(false);
        setStep3(true);
        setSubmitting(false);
        break;

      case 3:
        if (atipicDay === "Otro" && otherAtipicDay === "") {
          setErrors({ otherAtipicDay: "Este campo no puede ir vacío" });
          console.log(atipicDay);
          return;
        }
        if (water < 1) {
          setErrors({ water: "Este campo no puede ir vacío" });
          return;
        } else if (!/^\d+$/.test(water)) {
          setErrors({ water: "Este campo solo admite numeros" });
          return;
        }
        setSubmitting(true);
        setStep1(false);
        setStep2(false);
        setStep3(false);
        const fecha = new Date();
        const año = fecha.getFullYear();
        const mes = fecha.getMonth() + 1;
        const dia = fecha.getDate();
        const fechaActual = `${año}-${mes < 10 ? "0" : ""}${mes}-${dia}`;

        try {
          if (atipicDay !== "otro") {
            await supabase.from("registroDiario").insert({
              uid: user.id,
              glucose: glucose,
              dose: dose,
              insulineType: insulineType,
              doseType: doseType,
              water: water,
              meditionType: meditionType,
              atipicDay: atipicDay,
              observation: observation,
              created_at: fechaActual,
            });
          } else {
            await supabase.from("registroDiario").insert({
              uid: user.id,
              glucose: glucose,
              dose: dose,
              insulineType: insulineType,
              doseType: doseType,
              water: water,
              meditionType: meditionType,
              atipicDay: otherAtipicDay,
              observation: observation,
              created_at: fechaActual,
            });
          }

          //   await emailjs.send(
          //     "service_gb8sr3f",
          //     "template_jt5p6ui",
          //     {
          //       to_email: user.email,
          //       from_name: "Techani",
          //       to_name: user.user_metadata.full_name,
          //       message: `Glucosa: ${glucose} mg/dl
          //            Insulina:  ${dose} unidades de Insulina ${insulineType}
          //            Tipo de dosis: ${doseType}
          //            Tipo de medición: ${meditionType}
          //            Dia atipico: ${atipicDay}
          //            Agua consumida: ${water} vasos de 250ml
          //            Observaciones: ${observation}
          //            `,
          //     },
          //     "RBjxGi8gd0qdpEToN"
          //   );
          setStepForm(4);
        } catch (error) {
          console.log(error);
        } finally {
          setSubmitting(false);
        }

        break;

      case 4:
        setSubmitting(false);
        setStep1(true);
        setStep2(true);
        setStep3(true);
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
                atipicDay: "Ninguno",
                observation: "",
                otherAtipicDay: "",
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
                        type="text"
                        name="glucose"
                        autoComplete="off"
                        onChange={handleChange}
                        onBlur={handleBlur}
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
                        className="bg-gray-50 border mb-5 border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                      >
                        <option value="Lenta">Lenta</option>
                        <option value="Rapida">Rápida</option>
                      </select>

                      <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                        Dosis en unidades
                      </label>

                      <input
                        className={
                          errors.dose
                            ? "bg-gray-50 mb-2 border border-red-500  text-red-500 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5  "
                            : "bg-gray-50 mb-5 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5  "
                        }
                        type="text"
                        autoComplete="off"
                        placeholder="Ingresa la cantidad de insulina en unidades"
                        name="dose"
                        onChange={handleChange}
                        onBlur={handleBlur}
                        min={1}
                        max={10}
                      ></input>
                      <p className="mb-4 text-sm text-red-500 dark:text-white w-full">
                        {errors.dose && touched.dose && errors.dose}
                      </p>

                      <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                        Tipo de dosis
                      </label>

                      <select
                        onChange={handleChange}
                        onBlur={handleBlur}
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
                      <div className=" flex justify-between">
                        <button
                          onMouseEnter={handleEnter}
                          onMouseLeave={handleLeave}
                          onClick={handleStep}
                          className="flex items-center justify-between bg-gray-400 transition duration-300 ease-out hover:ease-out hover:bg-gray-500  px-7 py-1 rounded-lg text-white"
                        >
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke-width="1.5"
                            stroke="currentColor"
                            className={
                              mouseEnter
                                ? "rotate-180 mr-3 w-4 h-4 -translate-x-1 duration-300 ease-out"
                                : "rotate-180 mr-3 w-4 h-4 duration-300 ease-out"
                            }
                          >
                            <path
                              stroke-linecap="round"
                              stroke-linejoin="round"
                              d="m8.25 4.5 7.5 7.5-7.5 7.5"
                            />
                          </svg>
                          Regresar
                        </button>
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
                    </div>
                  )}
                  {stepForm === 3 && (
                    <div className="pt-28">
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
                        name="atipicDay"
                        className="bg-gray-50 border mb-5 border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                      >
                        <option value="Ninguno">Ninguno</option>
                        <option value="Menstruacion">Menstruación</option>
                        <option value="Vacuna">Vacuna</option>
                        <option value="Enfermedad">Enfermedad</option>
                        <option value="Examen">Examen</option>
                        <option value="Otro">Otro...</option>
                      </select>

                      {values.atipicDay === "Otro" && (
                        <input
                          type="text"
                          name="otherAtipicDay"
                          onChange={handleChange}
                          onBlur={handleBlur}
                          autoComplete="off"
                          aria-describedby="helper-text-explanation"
                          className={
                            errors.otherAtipicDay
                              ? "bg-gray-50 mb-2 border border-red-500  text-red-500 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5  "
                              : "bg-gray-50 mb-5 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5  "
                          }
                          placeholder="Ingresa el motivo de tu dia atipico aquí"
                        />
                      )}
                      <p className="mb-4 text-sm text-red-500 dark:text-white w-full">
                        {errors.otherAtipicDay &&
                          touched.otherAtipicDay &&
                          errors.otherAtipicDay}
                      </p>

                      <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                        Agua consumida en vasos de 250ml
                      </label>

                      <input
                        className={
                          errors.water
                            ? "bg-gray-50 mb-2 border border-red-500  text-red-500 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5  "
                            : "bg-gray-50 mb-5 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5  "
                        }
                        type="text"
                        autoComplete="off"
                        name="water"
                        onChange={handleChange}
                        onBlur={handleBlur}
                        placeholder="Ingresa la cantidad de agua consumida en vasos de 250ml"
                        min={1}
                        max={10}
                      ></input>

                      <p className="mb-4 text-sm text-red-500 dark:text-white w-full">
                        {errors.water && touched.water && errors.water}
                      </p>

                      <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                        Observaciones
                      </label>

                      <textarea
                        onChange={handleChange}
                        onBlur={handleBlur}
                        onInput={handleCount}
                        value={values.observation}
                        id="textArea"
                        maxLength="200"
                        placeholder="Ingresa tus observaciones aquí"
                        name="observation"
                        className="bg-gray-50 mb-2 h-32 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5   resize-none"
                      ></textarea>
                      <p className="mb-5">Caracteres restantes: {caracteres}</p>
                      <div className=" flex justify-between">
                        <button
                          onMouseEnter={handleEnter}
                          onMouseLeave={handleLeave}
                          onClick={handleStep}
                          disabled={isSubmitting}
                          className="flex disabled:opacity-30 items-center justify-between bg-gray-400 transition duration-300 ease-out hover:ease-out hover:bg-gray-500  px-7 py-1 rounded-lg text-white"
                        >
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke-width="1.5"
                            stroke="currentColor"
                            className={
                              mouseEnter
                                ? "rotate-180 mr-3 w-4 h-4 -translate-x-1 duration-300 ease-out"
                                : "rotate-180 mr-3 w-4 h-4 duration-300 ease-out"
                            }
                          >
                            <path
                              stroke-linecap="round"
                              stroke-linejoin="round"
                              d="m8.25 4.5 7.5 7.5-7.5 7.5"
                            />
                          </svg>
                          Regresar
                        </button>
                        {isSubmitting ? (
                          <button
                            disabled={true}
                            type="button"
                            className="text-white disabled:opacity-55 bg-blue-700 font-medium rounded-lg text-sm px-7 py-2 text-center me-2 flex items-center"
                          >
                            <svg
                              aria-hidden="true"
                              role="status"
                              class="inline w-4 h-4 me-3 text-white animate-spin"
                              viewBox="0 0 100 101"
                              fill="none"
                              xmlns="http://www.w3.org/2000/svg"
                            >
                              <path
                                d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
                                fill="#E5E7EB"
                              />
                              <path
                                d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
                                fill="currentColor"
                              />
                            </svg>
                            Guardando...
                          </button>
                        ) : (
                          <button
                            type="submit"
                            className="flex items-center justify-between bg-azulHover transition duration-300 ease-out hover:ease-out hover:bg-azul  px-7 py-1 rounded-lg text-white"
                          >
                            Guardar
                          </button>
                        )}
                      </div>
                    </div>
                  )}
                  {stepForm === 4 && (
                    <div
                      class="flex items-center p-4 mb-4 text-sm text-green-800 border border-green-300 rounded-lg bg-green-50 dark:bg-gray-800 dark:text-green-400 dark:border-green-800"
                      role="alert"
                    >
                      <span className="sr-only">Info</span>
                      <div className="text-green-400">
                        <span class="font-medium ">Felicidades! </span>
                        Se ha registrado tu medición de glucosa correctamente.{" "}
                        <br />
                        Para consultar tus registros ve a la sección de{" "}
                        <span className="font-medium">"Mis registros"</span> o
                        haciendo click aqui:{" "}
                        <Link to={"/myRecords"} className="text-blue-500">
                          Mis registros
                        </Link>
                      </div>
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
