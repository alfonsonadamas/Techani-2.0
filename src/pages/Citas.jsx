import React from "react";
import SideBar from "../components/SideBar";
import { Formik } from "formik";
import { supabase } from "../config/supabase";
import * as Yup from "yup";
import { useUserContext } from "../context/UserContext";
import { useNavigate } from "react-router-dom";

function Citas() {
  const navigate = useNavigate();
  // Estados para manejar el envío del formulario y mostrar el mensaje de éxito
  const [sendForm, setSendForm] = useState(false);
  // Aquí inicializamos citas como un array vacío
  const { user } = useUserContext();

  const handleFormSubmit = async (
    { date, time, appointmentType, location, doctorName },
    { setSubmitting, setErrors, resetForm }
  ) => {
    try {
      setSubmitting(true);
      const { data, error } = await supabase.from("citasMedicas").insert([
        {
          typecites: appointmentType,
          date: date,
          time: time,
          place: location,
          doctorName: doctorName,
          uid: user.id,
        },
      ]);
      if (error) {
        throw error;
      }

      console.log(data);
      setSendForm(true); // Actualiza el estado para mostrar el mensaje de éxito
      setSubmitting(false);

      // Restablecer el formulario para dejar los campos en blanco
      resetForm();
    } catch (error) {
      console.error(error);
      setSubmitting(false);
    }
  };

  const validationSchema = Yup.object().shape({
    appointmentType: Yup.string()
      .max(50, "El tipo de cita no puede tener más de 50 caracteres")
      .required("El tipo de cita es requerido"),
    location: Yup.string()
      .max(50, "El lugar no puede tener más de 50 caracteres")
      .required("El lugar es requerido"),
    doctorName: Yup.string()
      .max(50, "El nombre del doctor no puede tener más de 50 caracteres")
      .required("El nombre del doctor es requerido"),
  });

  return (
    <div>
      <SideBar />
      <div className="p-16 pt-20 sm:ml-64" data-aos="fade-up">
        <label className="block text-gray-900 dark:text-white text-2xl mb-5 font-semibold">
          Agendar citas
        </label>
        <Formik
          initialValues={{
            date: "",
            time: "",
            appointmentType: "",
            location: "",
            doctorName: "",
          }}
          onSubmit={handleFormSubmit}
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
              <div className="mb-4">
                <label htmlFor="day" className="block mb-1">
                  Fecha:
                </label>
                <input
                  type="date"
                  id="date"
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  onChange={handleChange}
                />
              </div>
              <div className="mb-4">
                <label htmlFor="time" className="block mb-1">
                  Hora:
                </label>
                <input
                  type="time"
                  id="time"
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  onChange={handleChange}
                />
              </div>
              <div className="mb-4">
                <label htmlFor="appointmentType" className="block mb-1">
                  Tipo de cita:
                </label>
                <input
                  type="text"
                  id="appointmentType"
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  onChange={handleChange}
                />
                <p className="mb-4 text-sm text-red-500 dark:text-white w-full">
                  {errors.appointmentType &&
                    touched.appointmentType &&
                    errors.appointmentType}{" "}
                </p>
              </div>
              <div className="mb-4">
                <label htmlFor="location" className="block mb-1">
                  Lugar:
                </label>
                <input
                  type="text"
                  id="location"
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  onChange={handleChange}
                />
                <p className="mb-4 text-sm text-red-500 dark:text-white w-full">
                  {errors.location && touched.location && errors.location}{" "}
                </p>
              </div>
              <div className="mb-4">
                <label htmlFor="doctorName" className="block mb-1">
                  Nombre del Doctor:
                </label>
                <input
                  type="text"
                  id="doctorName"
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  onChange={handleChange}
                />
                <p className="mb-4 text-sm text-red-500 dark:text-white w-full">
                  {errors.doctorName && touched.doctorName && errors.doctorName}{" "}
                </p>
              </div>
              <button
                type="submit"
                className="bg-blue-700 text-white py-2 px-4 rounded-md hover:bg-blue-800"
              >
                Guardar Cita
              </button>
            </form>
          )}
        </Formik>
      </div>
    </div>
  );
}

export default Citas;
