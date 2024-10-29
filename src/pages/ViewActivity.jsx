import React, { useState, useEffect } from "react";
import { useUserContext } from "../context/UserContext";
import { supabase } from "../config/supabase";
import SideBar from "../components/SideBar";
import Modal from "../components/Modal";
import edit from "../assets/img/edit.png";
import delate from "../assets/img/delate.png";
import * as Yup from "yup";
import { Formik } from "formik";
import { toast, ToastContainer } from "react-toastify";
import { Toast } from "flowbite-react";

export default function ViewActivity() {
  const { user } = useUserContext();
  const [records, setRecords] = useState([]);
  const [loading, setLoading] = useState(false);
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [editRecord, setEditRecord] = useState(null);

  const openModal = (record) => {
    setEditRecord(record);
    setModalIsOpen(true);
  };

  const closeModal = () => {
    setModalIsOpen(false);
    setEditRecord(null);
  };

  const getRecords = async () => {
    try {
      setLoading(true);
      const { data, error } = await supabase
        .from("actividadesUsuario")
        .select()
        .eq("uid", user.id)
        .order("idActividades", { ascending: true });

      if (error) console.log("error", error);
      setRecords(data);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  const deleteExcercise = async (id) => {
    try {
      setLoading(true);
      await supabase
        .from("actividadesUsuario")
        .delete()
        .eq("uid", user.id)
        .eq("idActividades", id);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
      toast.success("Se a eliminado ejercio");
      getRecords(); //actualiza
    }
  };

  const updateExcersice = async (
    { idActividad, excersiceName },
    { setSubmitting, setErrors, resetForm }
  ) => {
    try {
      setSubmitting(true);

      await supabase
        .from("actividadesUsuario")
        .update({
          nameActivity: excersiceName,
        })
        .eq("uid", user.id)
        .eq("idActividades", idActividad);

      closeModal();
    } catch (error) {
      console.log(error);
    } finally {
      setSubmitting(false);
      toast.success("Se a modificado el ejercicio");
      getRecords(); //actualiza
    }
  };

  const validationSchema = Yup.object({
    excersiceName: Yup.string()
      .matches(/^[^\d]+$/, "El campo debe ser texto")
      .required("Este campo es requerido"),
  });

  useEffect(() => {
    getRecords();
  }, [user]);

  return (
    <div>
      <SideBar />
      <ToastContainer />
      <div className="p-16 pt-24 sm:ml-64" data-aos="fade-up">
        <h2 className="text-2xl font-semibold mb-4">Tus Ejercicios</h2>
        <div className="w-full h-full">
          {records && records.length === 0 && (
            <div className="relative items-center block p-6 bg-white border border-gray-100 rounded-lg shadow-md ">
              {loading && (
                <div
                  role="status"
                  className="absolute -translate-x-1/2 -translate-y-1/2 top-2/4 left-1/2"
                >
                  <svg
                    aria-hidden="true"
                    className="w-8 h-8 text-gray-200 animate-spin  fill-blue-600"
                    viewBox="0 0 100 101"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
                      fill="currentColor"
                    />
                    <path
                      d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
                      fill="currentFill"
                    />
                  </svg>
                  <span className="sr-only">Loading...</span>
                </div>
              )}
              <p
                className={
                  loading
                    ? "text-lg font-medium text-center text-gray-400 opacity-20"
                    : "text-lg font-medium text-center text-gray-400 "
                }
              >
                Sin registros
              </p>
            </div>
          )}

          {records && records.length > 0 && (
            <div className="relative items-center block p-6 bg-white border border-gray-100 rounded-lg shadow-md">
              <table className="w-full h-full text-center">
                <thead>
                  <tr>
                    <th className="border-slate-300 border">
                      Nombre de la Actividad
                    </th>
                    <th className="border-slate-300 border">Editar</th>
                    <th className="border-slate-300 border">Eliminar</th>
                  </tr>
                </thead>
                <tbody>
                  {records.map((record) => (
                    <tr key={record.idActividades}>
                      <td className="border-slate-300 border">
                        {record.nameActivity}
                      </td>
                      <td className="border-slate-300 border">
                        <button
                          type="button"
                          onClick={() => openModal(record)}
                          className="bg-azulHover p-1 rounded hover:bg-azul"
                        >
                          <img src={edit} alt="editar" className="h-5" />
                        </button>
                      </td>
                      <td className="border-slate-300 border">
                        <button
                          type="button"
                          onClick={() => deleteExcercise(record.idActividades)}
                          className="bg-red-600 p-1 rounded hover:bg-red-800"
                        >
                          <img src={delate} alt="borrar" className="h-5" />
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>

              <Modal
                isOpen={modalIsOpen}
                onClose={closeModal}
                title="Editar Ejercicio"
                width={"max-w-2xl"}
              >
                {editRecord && (
                  <div>
                    <Formik
                      initialValues={{
                        idActividad: editRecord.idActividades,
                        excersiceName: editRecord.nameActivity,
                      }}
                      validationSchema={validationSchema}
                      onSubmit={updateExcersice}
                    >
                      {({
                        values,
                        errors,
                        touched,
                        handleBlur,
                        handleChange,
                        handleSubmit,
                        isSubmitting,
                      }) => (
                        <form onSubmit={handleSubmit}>
                          <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                            Nombre del ejercicio:
                          </label>
                          <input
                            name="excersiceName"
                            id="excersiceName"
                            type="text"
                            onChange={handleChange}
                            onBlur={handleBlur}
                            autoComplete="off"
                            className="mr-3 bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                            value={values.excersiceName}
                          />
                          <p className="mb-4 text-sm text-red-500 dark:text-white w-full">
                            {errors.excersiceName &&
                              touched.excersiceName &&
                              errors.excersiceName}
                          </p>
                          <button
                            type="submit"
                            className="flex items-center justify-between bg-azulHover transition duration-300 ease-out hover:ease-out hover:bg-azul mt-4 px-7 py-1 rounded-lg text-white"
                          >
                            Guardar
                          </button>
                        </form>
                      )}
                    </Formik>
                  </div>
                )}
              </Modal>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
