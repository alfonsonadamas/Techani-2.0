import React, { useState, useEffect } from "react";
import { useUserContext } from "../context/UserContext";
import SideBar from "../components/SideBar";
import Modal from "../components/Modal";
import { supabase } from "../config/supabase";
import * as Yup from "yup";
import { Formik } from "formik";
import { toast, ToastContainer } from "react-toastify";

export default function Alimentos() {
  const { user } = useUserContext();
  const [foodTypes, setFoodTypes] = useState([]);
  const [mealTypes, setMealTypes] = useState([]);
  const [foodTypeSelect, setFoodTypeSelect] = useState("");
  const [records, setRecords] = useState([]);
  const [loading, setLoading] = useState(false);
  const [originalRecords, setOriginalRecords] = useState([]);

  const [alimentsSelect, setAlimentsSelect] = useState([]);
  const [carbohydratetotal, setCarbohydratesTotal] = useState(0);

  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [sendForm, setSendForm] = useState(false);

  const openModal = () => {
    setModalIsOpen(true);
  };

  const closeModal = () => {
    setModalIsOpen(false);
  };

  const handleCheckboxPortion = (e, index) => {
    const newAlimentsSelect = [...alimentsSelect];
    const selectedFood = newAlimentsSelect[index];
    const newPortion = parseInt(e.target.value);
    const newCarbohydratesTotal =
      carbohydratetotal -
      selectedFood.carbohydratesall +
      selectedFood.carbohydrates * newPortion;
    selectedFood.portion = newPortion;
    selectedFood.carbohydratesall = selectedFood.carbohydrates * newPortion;
    newAlimentsSelect[index] = selectedFood;
    setAlimentsSelect(newAlimentsSelect);
    console.log(alimentsSelect);
    setCarbohydratesTotal(newCarbohydratesTotal);
  };

  const handleCheckboxMeal = (e, record) => {
    if (e.target.checked) {
      setAlimentsSelect([
        ...alimentsSelect,
        {
          id: record.idBancoAlimentos,
          portion: 1,
          name: record.food,
          amount: record.portionamount,
          unitMeasurement: record.unidadesMedida.name,
          carbohydrates: record.carbohydrates,
          carbohydratesall: record.carbohydrates,
        },
      ]);
      setCarbohydratesTotal(carbohydratetotal + record.carbohydrates);
    } else {
      setAlimentsSelect(
        alimentsSelect.filter((food) => food.id != record.idBancoAlimentos)
      );
      setCarbohydratesTotal(carbohydratetotal - record.carbohydrates);
    }
    console.log("Alimentos seleccionados:", alimentsSelect);
  };

  const getFilterfoodTyple = async (foodTypeOption) => {
    if (foodTypeOption) {
      const filteredRecords = originalRecords.filter(
        (record) => record.tipoAlimento.food === foodTypeOption
      );
      setRecords(filteredRecords);
    } else {
      setRecords(originalRecords);
    }
  };

  const fetchTipoAlimento = async () => {
    try {
      const { data: tipoAlimentos, error } = await supabase
        .from("tipoAlimento")
        .select("*");
      if (error) {
        throw error;
      }
      setFoodTypes(tipoAlimentos);
    } catch (error) {
      console.error("Error al obtener los tipos de alimentos:", error.message);
    }
  };

  const getRecords = async () => {
    try {
      setLoading(true);
      const { data, error } = await supabase
        .from("BancoAlimentos")
        .select(
          "idBancoAlimentos,food,tipoAlimento(idTipoalimento,food), portionamount, carbohydrates, unidadesMedida(idUnidadMedida,name)"
        )
        .eq("uid", user.id)
        .order("idBancoAlimentos", { ascending: true });

      if (error) console.log("error", error);

      setRecords(data);
      setOriginalRecords(data);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  const getMealTypes = async () => {
    try {
      const { data: tipoComida, error } = await supabase
        .from("tipoComida")
        .select("*");
      if (error) {
        throw error;
      }
      setMealTypes(tipoComida);
    } catch (error) {
      console.error("Error al obtener los tipos de comidas:", error.message);
    }
  };

  const handleSubmitmeal = async (
    { mealType, date, time, portion },
    { setSubmitting, setErrors, resetForm }
  ) => {
    try {
      setSubmitting(true);

      await Promise.all(
        alimentsSelect.map(async (aliment) => {
          const { error } = await supabase.from("alimentos").insert({
            uid: user.id,
            idTipoComida: mealType,
            portion: aliment.portion,
            idBancoAlimentos: aliment.id,
            hour: time,
            created_at: date,
          });
          if (error) {
            throw new Error(`Error al agregar el alimento: ${error.message}`);
          }
        })
      );
      resetForm();
      setAlimentsSelect([]);
      //setSendForm(true);
      toast.success("Registro exitoso");
    } catch (error) {
      console.error("Error al agregar los alimentos:", error.message);
      setErrors({ submit: error.message });
    } finally {
      setSubmitting(false);
    }
  };

  const changefilter_foodTyple = (e) => {
    const foodTypeOpcion = e.target.value;
    setFoodTypeSelect(foodTypeOpcion);
    getFilterfoodTyple(foodTypeOpcion);
  };

  const validationSchema = Yup.object({
    mealType: Yup.string().required("Este campo es requerido"),
    date: Yup.string().required("Este campo es requerido"),
    time: Yup.string().required("Este campo es requerido"),
  });

  useEffect(() => {
    getFilterfoodTyple();
    fetchTipoAlimento();
    getMealTypes();
    getRecords();
  }, [user, alimentsSelect, carbohydratetotal]);

  return (
    <div>
      <SideBar />
      <ToastContainer />
      <div className="p-16 pt-20 sm:ml-64" data-aos="fade-up">
        {!sendForm ? (
          <>
            <h2 className="block mb-2 text-2xl font-medium text-gray-900 dark:text-white ">
              Registro de Comidas
            </h2>

            <Formik
              initialValues={{
                mealType: "",
                date: "",
                time: "",
                meal: "",
                portion: 1,
              }}
              validationSchema={validationSchema}
              onSubmit={handleSubmitmeal}
            >
              {({
                values,
                errors,
                touched,
                handleBlur,
                handleChange,
                handleSubmit,
              }) => (
                <form onSubmit={handleSubmit}>
                  <div className="mb-4">
                    <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                      Tipo de comida
                    </label>
                    <select
                      name="mealType"
                      id="mealType"
                      defaultValue={values.mealType}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    >
                      <option value="">Selecciona...</option>
                      {mealTypes.map((comida) => (
                        <option
                          key={comida.idTipocomida}
                          value={comida.idTipocomida}
                        >
                          {comida.meal}
                        </option>
                      ))}
                    </select>
                    <p className="mb-4 text-sm text-red-500 dark:text-white w-full">
                      {errors.mealType && touched.mealType && errors.mealType}
                    </p>
                  </div>
                  <div className="flex space-x-4">
                    <div className="mb-4">
                      <label
                        htmlFor="day"
                        className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                      >
                        Fecha:
                      </label>
                      <input
                        type="date"
                        id="date"
                        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                        onChange={handleChange}
                        onBlur={handleBlur}
                      />
                      <p className="mb-4 text-sm text-red-500 dark:text-white w-full">
                        {errors.date && touched.date && errors.date}
                      </p>
                    </div>
                    <div className="mb-4">
                      <label
                        htmlFor="time"
                        className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                      >
                        Hora:
                      </label>
                      <input
                        type="time"
                        id="time"
                        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                        onChange={handleChange}
                        onBlur={handleBlur}
                      />
                      <p className="mb-4 text-sm text-red-500 dark:text-white w-full">
                        {errors.time && touched.time && errors.time}
                      </p>
                    </div>
                  </div>
                  <div>
                    <button
                      type="button"
                      className="bg-blue-700 text-white py-2 px-4 rounded-t-lg hover:bg-blue-800 w-full"
                      onClick={() => openModal()}
                    >
                      Agregar alimento
                    </button>
                  </div>
                  <div className="w-full h-full">
                    {alimentsSelect && alimentsSelect.length === 0 && (
                      <div className="relative items-center block p-6 bg-white border border-gray-100 rounded-b-lg shadow-md ">
                        <p className="text-lg font-medium text-center text-gray-400 ">
                          Sin alimentos seleccionados
                        </p>
                      </div>
                    )}

                    {alimentsSelect && alimentsSelect.length > 0 && (
                      <div className="relative items-center block p-6 bg-white border border-gray-100 rounded-b-lg shadow-md">
                        <table className="w-full h-full text-center">
                          <tr>
                            <th className="border-slate-300 border">Porción</th>
                            <th className="border-slate-300 border">
                              Alimento
                            </th>
                            <th className="border-slate-300 border">
                              Cantidad
                            </th>
                            <th className="border-slate-300 border">
                              Carbohidratos por porcion
                            </th>
                            <th className="border-slate-300 border">
                              Carbohidratos totales
                            </th>
                          </tr>
                          {alimentsSelect.map((aliments, index) => (
                            <tr key={index}>
                              <td className="border-slate-300 border">
                                <input
                                  type="number"
                                  name="portion"
                                  id="portion"
                                  defaultValue={1}
                                  min={1}
                                  max={100}
                                  onChange={(e) =>
                                    handleCheckboxPortion(e, index)
                                  }
                                  className="p-0 py-1 pl-2 text-center w-full border-transparent"
                                />
                              </td>
                              <td className="border-slate-300 border">
                                {aliments.name}
                              </td>
                              <td className="border-slate-300 border">
                                {aliments.amount} {aliments.unitMeasurement}
                              </td>
                              <td className="border-slate-300 border">
                                {aliments.carbohydrates}
                              </td>
                              <td className="border-slate-300 border">
                                {aliments.carbohydratesall}
                              </td>
                            </tr>
                          ))}
                        </table>
                        <div className="flex justify-end mt-4">
                          <p>
                            <span className="font-bold">
                              Carbohidratos totales:{" "}
                            </span>
                            {carbohydratetotal}
                          </p>
                        </div>
                      </div>
                    )}
                    {alimentsSelect.length === 0 && (
                      <p className="text-red-500 mt-2">
                        Debe haber al menos un alimento seleccionado
                      </p>
                    )}
                  </div>

                  <Modal
                    isOpen={modalIsOpen}
                    onClose={closeModal}
                    title="Seleccione un alimento"
                    width="max-w-md"
                  >
                    <div className="mb-4">
                      <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                        Tipo de alimento
                      </label>
                      <select
                        className="w-full bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-50 p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                        name="filterfoodtype"
                        id="filterfoodtype"
                        value={foodTypeSelect}
                        onChange={changefilter_foodTyple}
                      >
                        <option value="">Seleccione un filtrado</option>
                        {foodTypes.map((type) => (
                          <option
                            key={type.idTipoAlimento}
                            value={type.idTipoAlimento} // Usamos el índice como valor
                          >
                            {type.food}
                          </option>
                        ))}
                      </select>
                    </div>

                    <div className="w-full h-full">
                      {records && records.length === 0 && (
                        <div className="relative items-center block p-6 bg-white border border-gray-100 rounded-lg shadow-md ">
                          {loading && (
                            <div
                              role="status"
                              class="absolute -translate-x-1/2 -translate-y-1/2 top-2/4 left-1/2"
                            >
                              <svg
                                aria-hidden="true"
                                class="w-8 h-8 text-gray-200 animate-spin  fill-blue-600"
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
                              <span class="sr-only">Loading...</span>
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
                            <tr>
                              <th></th>
                              <th className="border-slate-300 border">
                                Comida
                              </th>
                              <th className="border-slate-300 border">
                                Cantidad
                              </th>
                              <th className="border-slate-300 border">Carb</th>
                            </tr>
                            {records.map((record) => (
                              <tr>
                                <td className="pr-4">
                                  <input
                                    type="checkbox"
                                    name="portion"
                                    id="portion"
                                    onChange={(e) =>
                                      handleCheckboxMeal(e, record)
                                    }
                                    checked={alimentsSelect.some(
                                      (food) =>
                                        food.id === record.idBancoAlimentos
                                    )}
                                  />
                                </td>
                                <td className="border-slate-300 border">
                                  {record.food}
                                </td>
                                <td className="border-slate-300 border">
                                  {record.portionamount}{" "}
                                  {record.unidadesMedida.name}
                                </td>
                                <td className="border-slate-300 border">
                                  {record.carbohydrates}{" "}
                                </td>
                              </tr>
                            ))}
                          </table>
                        </div>
                      )}
                    </div>
                  </Modal>
                  <button
                    type="submit"
                    className="bg-blue-700 text-white py-2 px-4 rounded-md hover:bg-blue-800 mt-4"
                    disabled={alimentsSelect.length === 0}
                  >
                    Guardar
                  </button>
                </form>
              )}
            </Formik>
          </>
        ) : (
          <div
            class="flex items-center p-4 mb-4 text-sm text-green-800 border border-green-300 rounded-lg bg-green-50 dark:bg-gray-800 dark:text-green-400 dark:border-green-800"
            role="alert"
          >
            <span className="sr-only">Info</span>
            <div className="text-green-400">
              <span class="font-medium ">Felicidades! </span>
              Se ha registrado tu comida correctamente.{" "}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
