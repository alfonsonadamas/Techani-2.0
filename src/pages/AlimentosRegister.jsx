import React, { useState, useEffect } from "react";
import { useUserContext } from "../context/UserContext";
import { supabase } from "../config/supabase";
import SideBar from "../components/SideBar";
import * as Yup from "yup";
import { Formik } from "formik";

export default function Comidas() {
  // Obtenemos el usuario del contexto
  const { user } = useUserContext();

  // Estados para el nombre del alimento, tipo de alimento, carga, registros y tipos de alimentos
  //const [foodName, setFoodName] = useState('');
  const [foodType, setFoodType] = useState("");
  // const [loading, setLoading] = useState(false);
  const [records, setRecords] = useState([]);
  const [foodTypes, setFoodTypes] = useState([]);
  const [measuringunits, setMeasuringunits] = useState([]);
  const [measuringunit, setMeasuringunit] = useState("");
  //const [carbohydratesAmount, setcarbohydratesAmount] = useState('');
  //const [portionAmount, setportionAmount]=useState('');
  const [sendForm, setSendForm] = useState(false);
  const [alimentExisting,setAlimentExisting] = useState(false);
  const [SMAE,setSMAE] = useState([]);
  const [loading, setLoading] = useState(true);

  // Obtiene la fecha actual
  const fecha = new Date();
  const año = fecha.getFullYear();
  const mes = fecha.getMonth() + 1;
  const dia = fecha.getDate();
  const fechaActual = `${año}-${mes < 10 ? "0" : ""}${mes}-${dia}`;

  const validationSchema = Yup.object({
    foodName: Yup.string()
      .matches(/^[^\d]+$/, "El campo debe ser texto")
      .required("Este campo es requerido"),
    foodType: Yup.string().required("Este campo es requerido"),
    portionAmount: Yup.string().required("Este campo es requerido"),
    carbohydratesAmount: Yup.string().required("Este campo es requerido"),
  });

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

  const fetchSMAE = async () => {
    try{
      setLoading(true);
      const { data:foodSMAE,error} = await supabase
        .from("SMAE")
        .select("idSMAE,food,tipoAlimento(idTipoalimento,food), unidadesMedida(idUnidadMedida,name),carbohydrates, portionamount");
      if (error){
        throw error;
      }
      setSMAE(foodSMAE);
    } catch (error){
      console.error("Error al cargar los alimentos:", error.message);
    } finally {
      setLoading(false);
    }
  }

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
    console.log("SMAE",SMAE);
    fetchSMAE();
  }, []);

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
              isSubmitting}) => (
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

                  <div className="flex mb-4">
                    <div>
                      <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                        Cantidad por porción
                      </label>
                      <div className="flex">
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
                          className="mr-3 bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-50 p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                        />
                        <select
                          className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-50 p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                          name="measuringunit"
                          id="measuringunit"
                          defaultValue={measuringunit}
                          // value={values.foodType}
                          onChange={handleChange}
                          onBlur={handleBlur}
                        >
                          {measuringunits.map((type) => (
                            <option
                              key={type.idUnidadMedida}
                              value={type.idUnidadMedida} // Usamos el índice como valor
                            >
                              {type.name}
                            </option>
                          ))}
                        </select>
                      </div>
                      <p className="mb-4 text-sm text-red-500 dark:text-white w-full">
                        {errors.portionAmount &&
                          touched.portionAmount &&
                          errors.portionAmount}
                      </p>
                    </div>

                    <div className="ml-6">
                      <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
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
                        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-50 p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                      />
                      <p className="mb-4 text-sm text-red-500 dark:text-white w-full">
                        {errors.carbohydratesAmount &&
                          touched.carbohydratesAmount &&
                          errors.carbohydratesAmount}
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
              {/* <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                    Tipo alimento
              </label>

              <select
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                name="foodType"
                id="foodType"
                defaultValue={foodType}
                // value={values.foodType}
                //onChange={handleChange}
                //onBlur={handleBlur}
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
              </select> */}
              {/* <div className="w-full h-full">
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
                      <div className="relative items-center block p-6 bg-white border border-gray-100 rounded-lg shadow-md">
                        <table className="w-full h-full text-center">
                          <thead>
                            <tr>
                              <th className="border-slate-300 border">Comida</th>
                              <th className="border-slate-300 border">Tipo de alimento</th>
                              <th className="border-slate-300 border">Cantidad por porción</th>
                              <th className="border-slate-300 border">Carbohidratos</th>
                            </tr>
                          </thead>
                          <tbody>
                            {SMAE.map((foods) => (
                              <tr key={foods.idSMAE}>
                                <td className="border-slate-300 border">{foods.food}</td>
                                <td className="border-slate-300 border">
                                  {foods.tipoAlimento.food}
                                </td>
                                <td className="border-slate-300 border">
                                  {foods.portionamount} {foods.unidadesMedida.name}
                                </td>
                                <td className="border-slate-300 border">{foods.carbohydrates}</td>
                              </tr>
                            ))}
                          </tbody>
                        </table>
                      </div>
                    )}
                  </>
                )}
              </div> */}
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
      </div>
         
    </div>
  );
}
