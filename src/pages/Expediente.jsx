import React, { useEffect, useState } from "react";
import SideBar from "../components/SideBar";
import InputType from "../components/InputType";
import { Formik } from "formik";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { supabase } from "../config/supabase";
import { useUserContext } from "../context/UserContext";

export default function Expediente() {
  const { user } = useUserContext();
  const [personalInformation, setPersonalInformation] = useState([{}]);
  const [updateInformacionPersonal, setUpdateInformacionPersonal] = useState(false);
  const inputStyle = `border-radius text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 
          dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white 
          dark:focus:ring-blue-500 dark:focus:border-blue-500 shadow-md`
  const submitPersonalInformation = async (
    values,
    { setErrors, resetForm }
  ) => {

    if (updateInformacionPersonal === true) {
      const { data, error } = await supabase
        .from("informacionPersonal")
        .update({
          fullName: values.fullName,
          birthdate: values.birthdate,
          placeOfBirth: values.placeOfBirth,
          weightAtBirth: values.weightAtBirth,
          typeOfDelivery: values.typeOfDelivery,
          bloodType: values.bloodType,

          email: values.email,
          maritalStatus: values.maritalStatus,
          stateOfBirth: values.stateOfBirth,
          sizeAtBirth: values.sizeAtBirth,
          gestationalWeeks: values.gestationalWeeks,

          biologicalSex: values.biologicalSex,
          ocupation: values.ocupation,
          actualState: values.actualState,
          apgarScore: values.apgarScore,
          complicationsInPregnancy: values.complicationsInPregnancy,
          specificPregnancyProblem: values.specificPregnancyProblem,
        })
        .eq("uid", user.id);
      if (error) throw error;
      toast.success("Campos actualizados");
      console.log(data)
    }
    else {
      const { data, error } = await supabase.from("informacionPersonal").insert({
        uid: user.id,
        fullName: values.fullName,
        birthdate: values.birthdate,
        placeOfBirth: values.placeOfBirth,
        weightAtBirth: values.weightAtBirth,
        typeOfDelivery: values.typeOfDelivery,
        bloodType: values.bloodType,

        email: values.email,
        maritalStatus: values.maritalStatus,
        stateOfBirth: values.stateOfBirth,
        sizeAtBirth: values.sizeAtBirth,
        gestationalWeeks: values.gestationalWeeks,

        biologicalSex: values.biologicalSex,
        ocupation: values.ocupation,
        actualState: values.actualState,
        apgarScore: values.apgarScore,
        complicationsInPregnancy: values.complicationsInPregnancy,
        specificPregnancyProblem: values.specificPregnancyProblem,
      });
      if (error) throw error;
      else console.log(data);
      toast.success("Datos Guardados");
    }


  };
  const initialPersonalInformation = async () => {
    try {
      const { data, error } = await supabase
        .from("informacionPersonal")
        .select("*")
        .eq("uid", user.id);
setPersonalInformation({
        fullName: data[0].fullName || '',
        birthdate: data[0].birthdate || '',
          placeOfBirth:data[0].placeOfBirth || '',
         weightAtBirth:data[0].weightAtBirth || '',
        typeOfDelivery:data[0].typeOfDelivery || 'disabled',
             bloodType:data[0].bloodType || '',

                email:data[0].email || '',
        maritalStatus:data[0].maritalStatus || '',
         stateOfBirth:data[0].stateOfBirth || '',
          sizeAtBirth:data[0].sizeAtBirth || '',
     gestationalWeeks:data[0].gestationalWeeks || '',
        biologicalSex:data[0].biologicalSex || 'disabled',
            ocupation:data[0].ocupation || '',
          actualState:data[0].actualState || '',
          apgarScore: data[0].apgarScore || '',          
        complicationsInPregnancy:data[0].complicationsInPregnancy || 'disabled',
        specificPregnancyProblem:data[0].specificPregnancyProblem || '',

      });
      if (data[0] !== undefined) {
        setUpdateInformacionPersonal(true);
      } else {
        setUpdateInformacionPersonal(false);
      }
      console.log("Es upgrade? :", updateInformacionPersonal)

      console.log(data[0]);
    } catch (error) {
      console.log(error);
    }
  };
  const initialValue = (value) =>{
    console.log("Hola",value)
    if(value === null || value === ""){
      return "disabled";
    }
    else return value;
  };

  useEffect(() => {
    setTimeout(() => {
    if (user) {
      initialPersonalInformation();
      }
    }, 2000);
  }, [user]);
  /*{
                          isDisabled === false
                            ? `bg-white border border-black text-gray-900 ${style}`  // Clases si no está deshabilitado.
                            : `bg-gray-200 border border-gray-400 text-gray-500${style}`
                          } 
  */
  return (
    <div>
      <SideBar />
      <div className="p-16 pt-20 sm:ml-64" data-aos="fade-up">
        <ToastContainer />
        <Formik
          initialValues={
            personalInformation
          }
          onSubmit={submitPersonalInformation}
        >
          {({ handleSubmit, handleChange, values, errors, touched }) => (
            <form onSubmit={handleSubmit}>
              <div className="flex flex-row items-center">
                <h2 className="text-2xl font-semibold mb-1 mt-4">
                  Información personal
                </h2>
                <p className="text-sm mt-10 mb-6 ml-10">
                  ⚠️En caso de ser menor, llama a un padre o tutor para que te
                  ayude a llenar el registro
                </p>
              </div>

              <hr className="border-gray-400" />
              {/* grid para formulario 1*/}
              <div className="grid grid-cols-12 grid-rows-6 justify-items-stretch mt-5 pl-5 gap-x-1">
                {/*Lado izquierdo del contenedor */}
                <div className="col-span-4 w-11/12">
                  <p className="font-semibold">Nombre Completo</p>
                  <input
                    name="fullName"
                    type="text"
                    value={values.fullName}
                    onChange={handleChange}
                    className={inputStyle}
                  />
                  <p className="mb-2 text-sm text-red-500 dark:text-white w-1">
                    {touched.fullName && errors.fullName}
                  </p>

                </div>
                <div className="col-span-4 col-start-1 row-start-2">
                  <div className="w-11/12">
                    <label htmlFor="question" className="font-semibold">Fecha de Nacimiento</label>
                    <input
                      name="birthdate"
                      type="date"
                      onChange={handleChange}
                      value={values.birthdate}
                      className={inputStyle}
                    />

                    <p className="mb-2 text-sm text-red-500 dark:text-white w-1">
                      {touched.birthdate && errors.birthdate}
                    </p>
                  </div>

                </div>
                <div className="col-span-4 col-start-1 row-start-3">
                  <div className="w-11/12">
                    <label htmlFor="question" className="font-semibold">Lugar de Nacimiento</label>
                    <input
                      name="placeOfBirth"
                      type="text"
                      onChange={handleChange}
                      defaultValue={values.placeOfBirth}
                      className={inputStyle}
                    />

                    <p className="mb-2 text-sm text-red-500 dark:text-white w-1">
                      {touched.placeOfBirth && errors.placeOfBirth}
                    </p>
                  </div>
                </div>
                <div className="col-span-4 col-start-1 row-start-4">
                  <div className="w-11/12">
                    <label htmlFor="question" className="font-semibold">Peso a nacer</label>
                    <input
                      name="weightAtBirth"
                      type="number"
                      onChange={handleChange}
                      defaultValue={personalInformation.weightAtBirth}
                      className={inputStyle}
                    />

                    <p className="mb-2 text-sm text-red-500 dark:text-white w-1">
                      {touched.weightAtBirth && errors.weightAtBirth}
                    </p>
                  </div>

                </div>
                <div className="col-span-4 col-start-1 row-start-5 w-11/12">
                  <p className="font-semibold">Tipo de parto</p>
                  <select
                    name="typeOfDelivery"
                    defaultChecked={personalInformation.typeOfDelivery !== null ? personalInformation.typeOfDelivery : "disabled"} onChange={handleChange} className={inputStyle}
                  >
                    <option value="disabled" disabled>--Selecciona una opción--</option>
                    <option value="parto natural">Parto Natural</option>
                    <option value="cesarea">Cesarea</option>
                  </select>

                  <p className="mb-2 text-sm text-red-500 dark:text-white w-1">
                    {errors.typeOfDelivery &&
                      touched.typeOfDelivery &&
                      errors.typeOfDelivery}{" "}
                  </p>
                </div>
                <div className="col-span-4 row-start-6 w-11/12">
                  <p className="font-semibold">Tipo de sangre</p>
                  <select
                    name="bloodType"
                    type="text"
                    onChange={handleChange}
                    className={inputStyle}
                    defaultValue={values.bloodType}
                  >
                    <option value="disabled" disabled>--Selecciona una opción--</option>
                    <option value="O+">O+</option>
                    <option value="O-">O-</option>
                    <option value="A+">A+</option>
                    <option value="A-">A-</option>
                    <option value="B+">B+</option>
                    <option value="B-">B-</option>
                  </select>
                </div>
                {/*FIN Lado izquierdo del contenedor */}

                {/* lado medio del contenedor */}
                <div className="col-span-4 col-start-5 row-start-1 w-11/12">
                  <p className="font-semibold">Correo electrónico</p>
                  <input
                    name="email"
                    type="email"
                    onChange={handleChange}
                    value={values.email}
                    className={inputStyle}
                  />
                  <p className="mb-2 text-sm text-red-500 dark:text-white w-1">
                    {errors.email && touched.email && errors.email}{" "}
                  </p>
                </div>
                <div className="col-span-4 col-start-5 row-start-2 w-11/12">
                  <p className="font-semibold">Estado civil</p>
                  <select
                    name="maritalStatus"
                    onChange={handleChange}
                    className={inputStyle}
                    value={values.maritalStatus}
                  >
                    <option value="disabled" disabled>--Selecciona una opción--</option>
                    <option value="soltero">Soltero</option>
                    <option value="casado">Casado</option>
                    <option value="viudo">Viudo</option>
                  </select>
                  <p className="mb-2 text-sm text-red-500 dark:text-white w-1">
                    {errors.maritalStatus &&
                      touched.maritalStatus &&
                      errors.maritalStatus}{" "}
                  </p>
                </div>
                <div className="col-span-4 col-start-5 row-start-3 w-11/12">
                  <p className="font-semibold">Estado de nacimiento</p>
                  <input
                    name="stateOfBirth"
                    type="text"
                    onChange={handleChange}
                    className={inputStyle}
                    value={personalInformation.stateOfBirth}
                  />
                  <p className="mb-2 text-sm text-red-500 dark:text-white w-1">
                    {errors.stateOfBirth && touched.stateOfBirth}
                  </p>
                </div>
                <div className="col-span-4 col-start-5 row-start-4 w-11/12">
                  <p className="font-semibold">Talla al nacer</p>
                  <input
                    name="sizeAtBirth"
                    type="number"
                    onChange={handleChange}
                    className={inputStyle}
                    value={values.sizeAtBirth}
                  />
                  <p className="mb-2 text-sm text-red-500 dark:text-white w-1">
                    {errors.sizeAtBirth && touched.sizeAtBirth}
                  </p>
                </div>
                <div className="col-span-4 col-start-5 row-start-5 w-11/12">
                  <p className="font-semibold">Semanas de gestiación al nacer</p>
                  <input
                    name="gestationalWeeks"
                    type="number"
                    onChange={handleChange}
                    className={inputStyle}
                    defaultValue={personalInformation.gestationalWeeks}
                  />
                  <p className="mb-2 text-sm text-red-500 dark:text-white w-1">
                    {errors.gestationalWeeks && touched.gestationalWeeks}
                  </p>
                </div>
                {/*Fin del contenedor medio */}

                {/*Inicio del contenedor derecho */}
                <div className="col-span-4 col-start-9 row-start-1 w-11/12">
                  <p className="font-semibold">Sexo biologico</p>
                  <select
                    name="biologicalSex"
                    onChange={ (e) =>{setPersonalInformation(personalInformation.biologicalSex = e.target.value)
                    }}
                    className={inputStyle}
                    value={personalInformation.biologicalSex}
                  >
                    <option value="disabled" disabled selected>--Selecciona una opción--</option>
                    <option value="femenino">Femenino</option>
                    <option value="masculino">Masculino</option>
                  </select>
                  <p className="mb-2 text-sm text-red-500 dark:text-white w-1">
                    {errors.biologicalSex && touched.biologicalSex}
                  </p>
                </div>
                <div className="col-span-4 col-start-9 row-start-2 w-11/12">
                  <p className="font-semibold">¿Cuál es su ocupación?</p>
                  <input
                    name="ocupation"
                    type="text"
                    onChange={handleChange}
                    className={inputStyle}
                    defaultValue={personalInformation.ocupation}
                  />
                  <p className="mb-2 text-sm text-red-500 dark:text-white w-1">
                    {errors.ocupation && touched.ocupation && errors.ocupation}{" "}
                  </p>
                </div>
                <div className="col-span-4 col-start-9 row-start-3 w-11/12">
                  <p className="font-semibold">Estado actual de residencia</p>
                  <input
                    name="actualState"
                    type="text"
                    onChange={handleChange}
                    className={inputStyle}
                    defaultValue={personalInformation.actualState}
                  />
                  <p className="mb-2 text-sm text-red-500 dark:text-white w-1">
                    {errors.actualState &&
                      touched.actualState &&
                      errors.actualState}{" "}
                  </p>
                </div>
                <div className="col-span-4 col-start-9 row-start-4 w-11/12">
                  <p className="font-semibold">Calificación de Apgar</p>
                  <input
                    name="apgarScore"
                    type="number"
                    onChange={handleChange}
                    className={inputStyle}
                    value={values.apgarScore}
                  />
                  <p className="mb-2 text-sm text-red-500 dark:text-white w-1">
                    {errors.apgarScore &&
                      touched.apgarScore &&
                      errors.apgarScore}{" "}
                  </p>
                </div>
                {/*contenedor con  inputs en la misma linea */}
                <div className="col-span-4 col-start-9 row-start-5 h-6 flex flex-col items-start">
                  
                    <div className="flex flex-auto">
                      <p className="font-semibold mb-0">
                        ¿Hubo complicaciones en el embarazo?
                      </p>
                    </div>
                    <div className="w-11/12">
                    <div className="col-span-4 col-start-1 row-start-2 grid-cols-4 flex flex-row items-start gap-1">
                      <div className="w-1/3">
                        <select name="complicationsInPregnancy"
                          onChange={handleChange}
                          className={inputStyle}
                          value={personalInformation.complicationsInPregnancy}
                        >
                          <option value="disabled" disabled>--Seleciona una opciópn--</option>
                          <option value="si">Si</option>
                          <option value="no">No</option>
                        </select>
                        <p className="mb-2 text-sm text-red-500 dark:text-white w-1">
                          {errors.complicationsInPregnancy && touched.complicationsInPregnancy}
                        </p>
                      </div>
                      <div className="w-2/3">
                        <input
                          type="text"
                          name="specificPregnancyProblem"
                          onChange={handleChange}
                          placeholder="¿Cuál?"
                          defaultValue={personalInformation.specificPregnancyProblem}
                          disabled={values.complicationsInPregnancy}
                          className={inputStyle}
                        />
                      </div>

                      <p className="mb-2 text-sm text-red-500 dark:text-white w-1">
                        {errors.specificPregnancyProblem &&
                          touched.specificPregnancyProblem &&
                          errors.specificPregnancyProblem}{" "}
                      </p>
                    </div>
                  </div>
                </div>
                {/* fin contenedor con  inputs en la misma linea */}
                {/*FIN DEL LADO DERECHO */}
              </div>
              {/* FIN DE GRID */}
              <div className="flex justify-end pr-8 h-11">
                <button
                  type="submit"
                  className="h-10 w-28 font-light place-self bg-azulHover text-white border-2 border-azulHover border-solid mt-4 px-3 rounded-lg  hover:bg-azul hover:border-azul"
                >
                  GUARDAR
                </button>
              </div>
            </form>
          )}
        </Formik>
        {/*Formulario 2 */}
        <Formik
          initialValues={{}}
          onSubmit={(values) => {
            console.log(values);
          }}
          validationSchema={console.log("validationSchema3")}
        >
          {({ handleSubmit, handleChange, values, errors, touched }) => (
            <form onSubmit={handleSubmit}>
              <div className="flex flex-row items-center">
                <h2 className="text-2xl font-semibold mt-4 mb-6">
                  Evaluaciones Médicas Recientes
                </h2>
              </div>

              <hr className="border-gray-400" />
              {/* grid para formulario 1*/}
              <div className="grid grid-cols-12 grid-rows-4 justify-items-stretch mt-5 pl-5 gap-1">
                {/*Lado izquierdo del contenedor */}
                <div className="col-span-4">
                  {/*contenedor con  inputs en la misma linea */}
                  <div className="col-span-4 col-start-1 row-start-1">
                    <div className="flex flex-auto">
                      <p className="font-semibold mb-0">
                        Última hemoglobina glicosilada y fecha
                      </p>
                    </div>
                    <div className="col-span-4 col-start-1 row-start-2 grid-cols-4 flex flex-row items-start">
                      <div className=" w-1/3">
                        <InputType
                          name="lastHemoglobin"
                          input="text"
                          question=""
                          handleChange={handleChange}
                        />
                      </div>
                      <div className=" w-2/3 mr-3">
                        <InputType
                          name="dateLastHemoglobin"
                          input="date"
                          question=""
                          handleChange={handleChange}
                        />
                      </div>
                    </div>
                  </div>
                  {/* fin contenedor con  inputs en la misma linea */}
                </div>
                <div className="col-span-4 col-start-1 row-start-2">
                  <InputType
                    name="bloodPressure"
                    input="text"
                    question="Presión arterial actual"
                    handleChange={handleChange}
                  />
                  <p className="mb-2 text-sm text-red-500 dark:text-white w-1">
                    {errors.bloodPressure &&
                      touched.bloodPressure &&
                      errors.bloodPressure}{" "}
                  </p>
                </div>
                <div className="col-span-4 col-start-1 row-start-3">
                  {/*contenedor con  inputs en la misma linea */}
                  <div className="col-span-4 col-start-1 row-start-1">
                    <div className="flex flex-auto">
                      <p className="font-semibold mb-0">
                        Última medición de triglicéridos y fecha
                      </p>
                    </div>
                    <div className="col-span-4 col-start-1 row-start-2 grid-cols-4 flex flex-row items-start">
                      <div className=" w-1/3">
                        <InputType
                          name="lastTriglycerides"
                          input="text"
                          question=""
                          handleChange={handleChange}
                        />
                      </div>
                      <div className=" w-2/3 mr-3">
                        <InputType
                          name="dateLastTriglycerides"
                          input="date"
                          question=""
                          handleChange={handleChange}
                        />
                      </div>
                    </div>
                  </div>
                  {/* fin contenedor con  inputs en la misma linea */}
                </div>
                <div className="col-span-4 col-start-1 row-start-4">
                  <InputType
                    name="colesterolHDL"
                    input="text"
                    question="Colesterol HDL"
                    handleChange={handleChange}
                  />
                  <p className="mb-2 text-sm text-red-500 dark:text-white w-1">
                    {errors.colesterolHDL &&
                      touched.colesterolHDL &&
                      errors.colesterolHDL}{" "}
                  </p>
                </div>
                {/*FIN Lado izquierdo del contenedor */}

                {/* lado medio del contenedor */}
                <div className="col-span-4 col-start-5 row-start-1">
                  <InputType
                    name="currentWeight"
                    input="number"
                    question="Peso actual"
                    handleChange={handleChange}
                  />
                  <p className="mb-2 text-sm text-red-500 dark:text-white w-1">
                    {errors.currentWeight &&
                      touched.currentWeight &&
                      errors.currentWeight}{" "}
                  </p>
                </div>
                <div className="col-span-4 col-start-5 row-start-2">
                  <InputType
                    name="currentGlucose"
                    input="text"
                    question="Glucosa en ayunas actual"
                  />
                  <p className="mb-2 text-sm text-red-500 dark:text-white w-1">
                    {errors.currentGlucose &&
                      touched.currentGlucose &&
                      errors.currentGlucose}{" "}
                  </p>
                </div>
                <div className="col-span-4 col-start-5 row-start-3">
                  {/*contenedor con  inputs en la misma linea */}
                  <div className="col-span-4 col-start-1 row-start-1">
                    <div className="flex flex-auto">
                      <p className="font-semibold mb-0">
                        Última medición de ácido úrico y fecha
                      </p>
                    </div>
                    <div className="col-span-4 col-start-1 row-start-2 grid-cols-4 flex flex-row items-start">
                      <div className=" w-1/3">
                        <InputType
                          name="lastUricAcid"
                          input="text"
                          question=""
                          handleChange={handleChange}
                        />
                      </div>
                      <div className=" w-2/3 mr-3">
                        <InputType
                          name="dateLastUricAcid"
                          input="date"
                          question=""
                          handleChange={handleChange}
                        />
                      </div>
                    </div>
                  </div>
                  {/* fin contenedor con  inputs en la misma linea */}
                </div>
                <div className="col-span-4 col-start-5 row-start-4">
                  <InputType
                    name="timeInRangetimeInRange"
                    input="number"
                    question="Tiempo en rango"
                    handleChange={handleChange}
                  />
                  <p className="mb-2 text-sm text-red-500 dark:text-white w-1">
                    {errors.timeInRangetimeInRange &&
                      touched.timeInRange &&
                      errors.timeInRange}{" "}
                  </p>
                </div>
                {/*Fin del contenedor medio */}

                {/*Inicio del contenedor derecho */}
                <div className="col-span-4 col-start-9 row-start-1">
                  <InputType
                    name="currentSize"
                    input="text"
                    question="Talla actual"
                    handleChange={handleChange}
                  />
                  <p className="mb-2 text-sm text-red-500 dark:text-white w-1">
                    {errors.currentSize &&
                      touched.currentSize &&
                      errors.currentSize}{" "}
                  </p>
                </div>
                <div className="col-span-4 col-start-9 row-start-2">
                  {/*Contenedor con dos inputs en linea*/}
                  <div className="flex flex-auto">
                    <p className="font-semibold mb-0">
                      Última medición de colesterol y fecha
                    </p>
                  </div>
                  <div className="col-span-4 col-start-1 row-start-2 grid-cols-4 flex flex-row items-start">
                    <div className=" w-1/3">
                      <InputType
                        name="lastCholesterol"
                        input="text"
                        question=""
                        handleChange={handleChange}
                      />
                    </div>
                    <div className=" w-2/3 mr-3">
                      <InputType
                        name="dateLastCholesterol"
                        input="date"
                        question=""
                        handleChange={handleChange}
                      />
                    </div>
                  </div>
                  {/*fin Contenedor con dos inputs en linea*/}
                </div>
                <div className="col-span-4 col-start-9 row-start-3">
                  <InputType
                    name="glucoseGoal"
                    input="text"
                    question="Meta de glucosa establecida por su médico"
                    handleChange={handleChange}
                  />
                </div>
                <div className="col-span-4 col-start-9 row-start-4">
                  <InputType
                    name="averageGlucose"
                    input="text"
                    question="Glucosa promedio"
                    handleChange={handleChange}
                  />
                  <p className="mb-2 text-sm text-red-500 dark:text-white w-1">
                    {errors.apgarScore &&
                      touched.apgarScore &&
                      errors.apgarScore}{" "}
                  </p>
                </div>
                {/*FIN DEL LADO DERECHO */}
              </div>
              {/* FIN DE GRID */}
              <div className="flex justify-end pr-8 h-11">
                <button
                  type="submit"
                  className="h-10 w-28 font-light place-self bg-azulHover text-white border-2 border-azulHover border-solid mt-4 px-3 rounded-lg  hover:bg-azul hover:border-azul"
                >
                  GUARDAR
                </button>
              </div>
            </form>
          )}
        </Formik>
      </div>
    </div>
  );
}
