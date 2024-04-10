import React, { useEffect, useState } from "react";
import { useUserContext } from "../context/UserContext";
import { Formik } from "formik";
import { supabase } from "../config/supabase";
import SideBar from "../components/SideBar";

export default function AtipicDay() {
  const { user } = useUserContext();
  const [atipicDay, setAtipicDay] = useState([]);
  const [submited, setSubmited] = useState(false);

  const getAtipicDay = async () => {
    const { data, error } = await supabase.from("diaAtipico").select("*");
    if (error) throw error;
    console.log(data);
    setAtipicDay(data);
  };

  const onSubmit = async (
    { atipicDay, otherAtipicDay },
    { setSubmitting, setErrors, resetForm }
  ) => {
    const date = new Date().toLocaleDateString();

    var parts = date.split("/");
    var year = parts[2];
    var month = parts[1];
    var day = parts[0];
    var formatDate = `${year}-${month}-${day}`;
    try {
      setSubmitting(true);
      const { error } = await supabase.from("registroDiaAtipico").insert([
        {
          created_at: formatDate,
          diaAtipico: atipicDay,
          otherAtipicDay: otherAtipicDay,
          uid: user.id,
        },
      ]);

      if (error) throw error;
    } catch (error) {
      console.log(error);
    } finally {
      setSubmitting(false);
      resetForm();
    }

    // await emailjs.send(
    //   "service_gb8sr3f",
    //   "template_jt5p6ui",
    //   {
    //     to_email: user.email,
    //     from_name: "Techani",
    //     to_name: user.user_metadata.full_name,
    //     message: `
    //     Dia atipico: ${atipicDay || otherAtipicDay}
    //         `,
    //   },
    //   "RBjxGi8gd0qdpEToN"
    // );
  };

  useEffect(() => {
    getAtipicDay();
  }, []);

  return (
    <div>
      <SideBar />
      <div className="p-16 pt-16  sm:ml-64" data-aos="fade-up">
        <div className="w-full h-60 flex justify-center items-center">
          <div className=" w-full">
            {!submited ? (
              <Formik initialValues={{ atipicDay: "" }} onSubmit={onSubmit}>
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
                    <div className="mt-16">
                      <p className="mb-4 text-sm text-gray-900 dark:text-white w-full">
                        ¡Hola! <br /> Registra si tuviste un día atípico para
                        llevar un mejor control de tu salud.
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
                        {atipicDay.map((atipic) => (
                          <option
                            key={atipic.idDiaatipico}
                            value={atipic.idDiaatipico}
                          >
                            {atipic.typeDay}
                          </option>
                        ))}
                      </select>

                      {values.atipicDay === "6" && (
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
                          value={values.otherAtipicDay}
                          placeholder="Ingresa el motivo de tu dia atipico aquí"
                        />
                      )}
                      <p className="mb-4 text-sm text-red-500 dark:text-white w-full">
                        {errors.otherAtipicDay &&
                          touched.otherAtipicDay &&
                          errors.otherAtipicDay}
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
                    ¡Gracias por registrar tu día atípico!{" "}
                  </p>
                  <button
                    onClick={() => setSubmited(false)}
                    className="flex items-center justify-between bg-azulHover transition duration-300 ease-out hover:ease-out hover:bg-azul  px-7 py-1 rounded-lg text-white"
                  >
                    Registrar otro día atípico
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
