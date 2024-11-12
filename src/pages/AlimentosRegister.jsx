import React, { useState, useEffect } from "react";
import { useUserContext } from "../context/UserContext";
import { supabase } from "../config/supabase";
import SideBar from "../components/SideBar";
import * as Yup from "yup";
import Modal from '../components/Modal';
import { Formik } from "formik";

export default function Comidas() {
  const { user } = useUserContext();
  const [modalIsOpen, setModalIsOpen] = useState(false);

  const [foodType, setFoodType] = useState("");
  const [records, setRecords] = useState([]);
  const [aliments, setAliments] = useState([]);
  const [foodTypes, setFoodTypes] = useState([]);
  const [measuringunits, setMeasuringunits] = useState([]);
  const [measuringunit, setMeasuringunit] = useState("");

  const [sendForm, setSendForm] = useState(false);
  const [alimentExisting, setAlimentExisting] = useState(false);

  const [alimentsSelect, setAlimentsSelect] = useState([]);
  const [SMAE, setSMAE] = useState([]);
  const [originalSMAE, setOriginalSMAE] = useState([]);
  const [loading, setLoading] = useState(true);
  const [former, setFormer] = useState(0);
  const [next, setNext] = useState(5);
  const [SAMElength, setSAMElength] = useState();

  // Obtiene la fecha actual
  const fecha = new Date();
  const año = fecha.getFullYear();
  const mes = fecha.getMonth() + 1;
  const dia = fecha.getDate();
  const fechaActual = `${año}-${mes < 10 ? "0" : ""}${mes}-${dia}`;

  const openModal = () => {
    setModalIsOpen(true);
  };

  const closeModal = () => {
    setModalIsOpen(false);
  };

  const getFilterfoodTyple = async (foodTypeOption) => {
    if (foodTypeOption) {
      const filteredRecords = originalSMAE.filter(
        (record) => record.tipoAlimento.food === foodTypeOption
      );
      setSMAE(filteredRecords);
    } else {
      setSMAE(originalSMAE);
    }
    lengthSMAE();
    setFormer(0);
    setNext(5);
  };

  const lengthSMAE = () => {
    if (SMAE.length % 5 == 0) {
      setSAMElength(SMAE.length);
    } else {
      setSAMElength(SMAE.length + (5 - SMAE.length % 5));
    }
  }

  const filterSMAE_Former = () => {
    const before = former;
    const after = next;
    setFormer(before - 5);
    setNext(after - 5);
  }

  const filterSMAE_Next = () => {
    const before = former;
    const after = next;
    setFormer(before + 5);
    setNext(after + 5);
  }

  const changefilter_foodTyple = (e) => {
    const foodTypeOpcion = e.target.value;
    getFilterfoodTyple(foodTypeOpcion);
  };

  const validationSchema = Yup.object({
    foodName: Yup.string()
      .matches(/^[^\d]+$/, "El campo debe ser texto")
      .required("Este campo es requerido"),
    foodType: Yup.string().required("Este campo es requerido"),
    portionAmount: Yup.string().required("Este campo es requerido"),
    carbohydratesAmount: Yup.string().required("Este campo es requerido"),
  });

  const handleCheckboxSMAE = (e, record) => {
    if (e.target.checked) {
      setAlimentsSelect([...alimentsSelect, {
        id: record.idSMAE,
        name: record.food,
        idtype: record.tipoAlimento.idTipoalimento,
        type: record.tipoAlimento.food,
        amount: record.portionamount,
        idUnitMeasurement: record.unidadesMedida.idUnidadMedida,
        unitMeasurement: record.unidadesMedida.name,
        carbohydrates: record.carbohydrates,
      }])
    } else {
      setAlimentsSelect(alimentsSelect.filter(food => food.id != record.idSMAE));
    }
    console.log("Alimentos seleccionados:", alimentsSelect)
  };

  const handleSubmiSMAE = async (
    { }, { setSubmitting, setErrors, resetForm }
  ) => {
    try {
      setSubmitting(true);

      await Promise.all(
        alimentsSelect.map(async (aliment) => {
          const { error } = await supabase
            .from("BancoAlimentos")
            .insert({
              uid: user.id,
              food: aliment.name,
              idTipoAlimento: aliment.idtype,
              idUnidadMedida: aliment.idUnitMeasurement,
              portionamount: aliment.amount,
              carbohydrates: aliment.carbohydrates,
              created_at: fechaActual
            });
          if (error) {
            throw new Error(`Error al agregar el alimento: ${error.message}`);
          }
        })
      );
      resetForm();
      setAlimentsSelect([]);
      setSendForm(true);
    } catch (error) {
      console.error("Error al agregar los alimentos:", error.message);
      setErrors({ submit: error.message });
    } finally {
      setSubmitting(false);
    }
  };

  // Función para insertar el alimento en la base de datos
  const handleSubmitfood = async (
    { foodName, foodType, measuringunit, portionAmount, carbohydratesAmount },
    { setSubmitting, setErrors, resetForm }
  ) => {
    try {
      setSubmitting(true);

      const Indexfoodtypes = foodTypes.find((type) => type.food === foodType);
      setFoodType(Indexfoodtypes.idTipoalimento);

      // Insertamos el alimento en la tabla 'BancoAlimentos'
      const { data, error } = await supabase
        .from("BancoAlimentos")
        .insert({
          uid: user.id,
          food: foodName,
          idTipoAlimento: Indexfoodtypes.idTipoalimento,
          idUnidadMedida: measuringunit,
          portionamount: portionAmount,
          carbohydrates: carbohydratesAmount,
          created_at: fechaActual,
        });

      if (error) throw error;
      resetForm();
      console.log("Enviado");
      setSendForm(true);

      //Si llega aqui actualizar un estado de enviado == true

      // Actualizamos los registros con el nuevo alimento
      setRecords([...records, data[0]]);
    } catch (error) {
      console.error("Error al agregar el alimento:", error.message, foodType);
    } finally {
      setSubmitting(false);
    }
  };

  // Función para obtener los tipos de alimentos de la base de datos
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

  const fetchAliments = async () => {
    try {
      setLoading(true);
      const { data, error } = await supabase
        .from("BancoAlimentos")
        .select(
          "idBancoAlimentos,food,tipoAlimento(idTipoalimento,food), portionamount, carbohydrates, unidadesMedida(idUnidadMedida,name)"
        )
        .eq("uid", user.id)
      if (error) console.log("error", error);
      setAliments(data);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  const fetchSMAE = async () => {
    try {
      setLoading(true);
      const { data: foodSMAE, error } = await supabase
        .from("SMAE")
        .select("idSMAE,food,tipoAlimento(idTipoalimento,food), unidadesMedida(idUnidadMedida,name),carbohydrates, portionamount");
      if (error) {
        throw error;
      }
      const available_foods = foodSMAE.filter(food => !aliments.some(meat => meat.food === food.food));
      setSMAE(available_foods);
      setOriginalSMAE(available_foods);
      // setOriginalSMAE(foodSMAE);
      lengthSMAE();
    } catch (error) {
      console.error("Error al cargar los alimentos:", error.message);
    } finally {
      setLoading(false);
    }
  };

  const fetchMedidas = async () => {
    try {
      const { data: unidadesMedida, error } = await supabase
        .from("unidadesMedida")
        .select("*");
      if (error) {
        throw error;
      }
      setMeasuringunits(unidadesMedida);
    } catch (error) {
      console.error("Error al obtener las medidas:", error.message);
    }
  };

  // Efecto para cargar los tipos de alimentos cuando el componente se monta
  useEffect(() => {
    fetchTipoAlimento();
    fetchMedidas();
    fetchSMAE();
    fetchAliments();
  }, [user]);

  useEffect(() => {
    lengthSMAE();
  }, [SMAE]);

  return (
    <div>
      <SideBar />
      <div className="p-16 pt-20 sm:ml-64" data-aos="fade-up">
        {!sendForm ? (
          <>
            <label className="block mb-2 text-2xl font-medium text-gray-900 dark:text-white">
              Registro Alimento
            </label>
            <div className="flex mb-2">
              <button
                onClick={() => setAlimentExisting(false)}
                className={`mr-3 ${!alimentExisting ? 'flex items-center justify-between transition duration-300 ease-out hover:ease-out px-7 py-1 rounded-t-lg text-white bg-azul' : 'bg-white text-black'}`}
              >
                Registrar nuevo
              </button>
              <button
                onClick={() => setAlimentExisting(true)}
                className={`${alimentExisting ? 'bg-azul flex items-center justify-between transition duration-300 ease-out hover:ease-out px-7 py-1 rounded-t-lg text-white' : 'bg-white text-black'}`}
              >
                Registrar existente
              </button>
            </div>
            {!alimentExisting && (
              <Formik
                initialValues={{
                  foodName: "",
                  foodType: "",
                  portionAmount: 1,
                  measuringunit: 1,
                  carbohydratesAmount: 1,
                }}
                validationSchema={validationSchema}
                onSubmit={handleSubmitfood}
              >
                {({
                  values,
                  errors,
                  touched,
                  handleBlur,
                  handleChange,
                  handleSubmit,
                  isSubmitting }) => (
                  <form onSubmit={handleSubmit}>
                    <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                      Nombre alimentos
                    </label>
                    <input
                      name="foodName"
                      id="foodName"
                      type="text"
                      value={values.foodName}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      autoComplete='off'
                      className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    />
                    <p className="mb-4 text-sm text-red-500 dark:text-white w-full">
                      {errors.foodName && touched.foodName && errors.foodName}
                    </p>

                    <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                      Tipo alimento
                    </label>

                    <select
                      className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                      name="foodType"
                      id="foodType"
                      defaultValue={foodType}
                      // value={values.foodType}
                      onChange={handleChange}
                      onBlur={handleBlur}
                    >
                      <option value="">Seleccione un tipo de alimento</option>
                      {foodTypes.map((type) => (
                        <option
                          key={type.idTipoAlimento}
                          value={type.idTipoAlimento} // Usamos el índice como valor
                        >
                          {type.food}
                        </option>
                      ))}
                    </select>
                    <p className="mb-4 text-sm text-red-500 dark:text-white w-full">
                      {errors.foodType && touched.foodType && errors.foodType}
                    </p>

                      <div className="flex flex-col md:flex-row md:items-center mb-4"> {/* Reducido a space-y-2 y space-x-2 */}
                        {/* Cantidad por porción */}
                        <div className="flex-1 mt-1"> {/* Ajustado a mt-1 */}
                          <label className="block mb-1 text-sm font-medium text-gray-900 dark:text-white">
                            Cantidad por porción
                          </label>
                          <div className="flex items-center gap-1">
                            <input
                              name="portionAmount"
                              id="portionAmount"
                              type="number"
                              step="0.1"
                              min={1}
                              max={999}
                              defaultValue={1}
                              onChange={handleChange}
                              onBlur={handleBlur}
                              autoComplete="off"
                              className="mr-3 bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-20 p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                            />
                            <select
                              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-32 p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                              name="measuringunit"
                              id="measuringunit"
                              defaultValue={measuringunit}
                              onChange={handleChange}
                              onBlur={handleBlur}
                            >
                              {measuringunits.map((type) => (
                                <option key={type.idUnidadMedida} value={type.idUnidadMedida}>
                                  {type.name}
                                </option>
                              ))}
                            </select>
                          </div>
                          <p className="mt-1 text-sm text-red-500 dark:text-white w-full"> {/* Ajustado a mt-1 */}
                            {errors.portionAmount && touched.portionAmount && errors.portionAmount}
                          </p>
                        </div>

                        {/* Carbohidratos por porción */}
                        <div className="flex-1 mt-1 p-1"> {/* Ajustado con padding de 1 rem */}
                          <label className="block mb-1 text-sm font-medium text-gray-900 dark:text-white">
                            Carbohidratos por porción
                          </label>
                          <input
                            name="carbohydratesAmount"
                            id="carbohydratesAmount"
                            type="number"
                            min={1}
                            max={999}
                            defaultValue={1}
                            onChange={handleChange}
                            onBlur={handleBlur}
                            autoComplete="off"
                            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-35 p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                          />
                          <p className="mt-1 text-sm text-red-500 dark:text-white w-full"> {/* Ajustado a mt-1 */}
                            {errors.carbohydratesAmount && touched.carbohydratesAmount && errors.carbohydratesAmount}
                          </p>
                        </div>

                      </div>
                      <button
                        type="submit"
                        className="flex items-center justify-between bg-azulHover transition duration-300 ease-out hover:ease-out hover:bg-azul mt-4 px-7 py-1 rounded-lg text-white"
                      >
                        Guardar
                      </button>
                  </form>
                )}
              </Formik>
            )}

            {alimentExisting && (
              <div>
                <div className="w-full h-full">
                  {alimentsSelect && alimentsSelect.length === 0 && (
                    <div className="relative items-center block p-6 bg-white border border-gray-100 rounded-t-lg shadow-md ">
                      <p className="text-lg font-medium text-center text-gray-400 ">
                        Sin alimentos seleccionados
                      </p>
                    </div>
                  )}

                  {alimentsSelect && alimentsSelect.length > 0 && (
                    <div className="relative items-center block p-6 bg-white border border-gray-100 rounded-b-lg shadow-md">
                      <table className='w-full h-full text-center'>
                        <tr>
                          <th className="border-slate-300 border">Alimento</th>
                          <th className="border-slate-300 border">Tipo de Alimento</th>
                          <th className="border-slate-300 border">Cantidad</th>
                          <th className="border-slate-300 border">Carbohidratos por porcion</th>
                        </tr>
                        {alimentsSelect.map((aliments, index) => (
                          <tr key={index}>
                            <td className="border-slate-300 border">{aliments.name}</td>
                            <td className="border-slate-300 border">{aliments.type}</td>
                            <td className="border-slate-300 border">{aliments.amount} {aliments.unitMeasurement}</td>
                            <td className="border-slate-300 border">{aliments.carbohydrates}</td>
                          </tr>
                        ))}
                      </table>
                    </div>
                  )}
                </div>
                <Formik
                  initialValues={{}}
                  onSubmit={handleSubmiSMAE}
                >
                  {({ handleSubmit, isSubmitting }) => (
                    <form onSubmit={handleSubmit}>
                      <div>
                        <button
                          type="button"
                          className="bg-azul text-white py-2 px-4 rounded-b-lg hover:bg-blue-800 w-full"
                          onClick={() => openModal()}
                        >
                          Agregar alimento
                        </button>
                        <div className="flex justify-end">
                          <button
                            type="submit"
                            className="bg-azulHover transition duration-300 ease-out hover:ease-out hover:bg-azul mt-4 px-7 py-1 rounded-lg text-white"
                          >
                            Guardar
                          </button>
                        </div>
                      </div>
                    </form>
                  )}
                </Formik>
              </div>
            )}
          </>
        ) : (
          <div
            class="flex items-center p-4 mb-4 text-sm text-green-800 border border-green-300 rounded-lg bg-green-50 dark:bg-gray-800 dark:text-green-400 dark:border-green-800"
            role="alert"
          >
            <span className="sr-only">Info</span>
            <div className="text-green-400">
              <span class="font-medium ">Felicidades! </span>
              Se ha registrado tu alimento correctamente.{" "}
            </div>
          </div>
        )}
        <Modal isOpen={modalIsOpen} onClose={closeModal} title="Seleccione un alimento" width="max-w-4xl">
          <div>
            <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
              Tipo alimento
            </label>

            <select
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              name="foodType"
              id="foodType"
              defaultValue={foodType}
              onChange={changefilter_foodTyple}
            >
              <option value="">Seleccione un tipo de alimento</option>
              {foodTypes.map((type) => (
                <option
                  key={type.idTipoAlimento}
                  value={type.idTipoAlimento} // Usamos el índice como valor
                >
                  {type.food}
                </option>
              ))}
            </select>
            <div className="w-full h-full mt-4">
              {loading ? (
                <div className="relative items-center block p-6 bg-white border border-gray-100 rounded-lg shadow-md ">
                  <p className="text-lg font-medium text-center text-gray-400">
                    Cargando alimentos...
                  </p>
                </div>
              ) : (
                <>
                  {SMAE && SMAE.length === 0 && (
                    <div className="relative items-center block p-6 bg-white border border-gray-100 rounded-lg shadow-md ">
                      <p className="text-lg font-medium text-center text-gray-400">
                        Sin registros
                      </p>
                    </div>
                  )}

                  {SMAE && SMAE.length > 0 && (
                    // cambios en la responsividad en las tablas con overflow-x las cuales permiten el desbordamiento horizontal mejoran el espaciado
                    <div className="relative block p-6 bg-white border border-gray-100 rounded-lg shadow-md overflow-x-auto">
                      <table className="min-w-full text-center">
                        <thead>
                          <tr className="bg-gray-100">
                            <th className="border border-slate-300 px-2 py-2">Seleccionar</th>
                            <th className="border border-slate-300 px-2 py-2">Comida</th>
                            <th className="border border-slate-300 px-2 py-2">Tipo de alimento</th>
                            <th className="border border-slate-300 px-2 py-2">Cantidad</th>
                            <th className="border border-slate-300 px-2 py-2">Carbohidratos</th>
                          </tr>
                        </thead>
                        <tbody>
                          {SMAE.slice(former, next).map((foods) => (
                            <tr key={foods.idSMAE}>
                              <td className='border border-slate-300 px-2 py-2'>
                                <input type="checkbox" name="portion" id="portion" onChange={(e) => handleCheckboxSMAE(e, foods)} checked={alimentsSelect.some(food => food.id === foods.idSMAE)} />
                              </td>
                              <td className="border border-slate-300 px-2 py-2">{foods.food}</td>
                              <td className="border border-slate-300 px-2 py-2">{foods.tipoAlimento.food}</td>
                              <td className="border border-slate-300 px-2 py-2">{foods.portionamount} {foods.unidadesMedida.name}</td>
                              <td className="border border-slate-300 px-2 py-2">{foods.carbohydrates}</td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                      {/* Hasta aqui los cambios */}
                      {/* filtro */}
                      <div className="flex justify-center space-x-3 mt-3">
                        {former - 5 >= 0 && (
                          <button
                            onClick={filterSMAE_Former}
                            className="flex items-center justify-between bg-azulHover transition duration-300 ease-out hover:ease-out hover:bg-azul mt-4 px-7 py-1 rounded-lg text-white">
                            Anterior
                          </button>
                        )}
                        {next + 5 <= SAMElength && (
                          <button
                            onClick={filterSMAE_Next}
                            className="flex items-center justify-between bg-azulHover transition duration-300 ease-out hover:ease-out hover:bg-azul mt-4 px-7 py-1 rounded-lg text-white">
                            Siguiente
                          </button>
                        )}

                      </div>
                      <p className="text-center text-gray-500 text-xs mt-1">{former} - {next} / {SMAE.length}</p>
                    </div>
                  )}
                </>
              )}
            </div>
          </div>
        </Modal>
      </div>

    </div>


  );
}
