import React, { useEffect, useState } from "react";
import SideBar from "../components/SideBar";
import { Formik } from "formik";
import * as Yup from "yup";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { supabase } from "../config/supabase";
import { useUserContext } from "../context/UserContext";

export default function Expediente() {
  const { user } = useUserContext();

  const [personalInformation, setPersonalInformation] = useState({});
  const [updateInformacionPersonal, setUpdateInformacionPersonal] = useState(false);
  
  const [familyHistory, setFamilyHistory] = useState({});
  const [updateFamilyHistory, setUpdateFamilyHistory] = useState(false);

  const [medicalEvaluation, setMedicalEvaluation] = useState({});
  const [updateMedicalEvaluation, setUpdateMedicalEvaluation] = useState(false)

  const [habitsData, setHabitsData] = useState({});
  const [updateHabitsData, setUpdateHabitsData] = useState(false);



  const [isLoading, setIsLoading] = useState(true);
  const inputStyle = `border-radius text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 
          dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white 
          dark:focus:ring-blue-500 dark:focus:border-blue-500 shadow-md`;

  const submitPersonalInformation = async (
    values,
    { setErrors, resetForm }
  ) => {
    let info = {
      fullName: values?.fullName || '',
      birthdate: values?.birthdate || '',
      placeOfBirth: values?.placeOfBirth || '',
      weightAtBirth: values?.weightAtBirth || '',
      typeOfDelivery: values?.typeOfDelivery || '',
      bloodType: values?.bloodType || '',

      email: values?.email || '',
      maritalStatus: values?.maritalStatus || '',
      stateOfBirth: values?.stateOfBirth || '',
      sizeAtBirth: values?.sizeAtBirth || '',
      gestationalWeeks: values?.gestationalWeeks || '',

      biologicalSex: values?.biologicalSex || '',
      ocupation: values?.ocupation || '',
      actualState: values?.actualState || '',
      apgarScore: values?.apgarScore || '',
      complicationsInPregnancy: values?.complicationsInPregnancy || '',
      specificPregnancyProblem: values?.specificPregnancyProblem || '',
    }
    if (info.complicationsInPregnancy !== "si") {
      info.specificPregnancyProblem = null;
    }
    if (updateInformacionPersonal === true) {
      const { data, error } = await supabase
        .from("informacionPersonal")
        .update([info])
        .eq("uid", user.id);
      if (error) throw error;
      toast.success("Campos actualizados");
      console.log(data)
    }
    else {
      let infoWithUser = {...info, uid: user.uid}
      const { data, error } = await supabase.from("informacionPersonal").insert([infoWithUser]);
      if (error) throw error;
      else console.log(data);
      toast.success("Datos Guardados");
    }
  };

  const submitFamilyHistory = async (
    values,
     { setErrors, resetForm }
    ) => {
    const info = {
      diabetesInFamily: values?.diabetesInFamily || null,
      diabetesType1: values?.diabetesType1 || null,
      diabetesType2: values?.diabetesType2 || null,
      hypertension: values?.hypertension || null,
      cancer: values?.cancer || null,
      cancerType: values?.cancerType || null
    }

    try {
      if (updateFamilyHistory === true) {
        const { data, error } = await supabase
          .from("antecedentesHeredo")
          .update([info])
          .eq("uid", user.id);
        if (error) throw error;
        toast.success("Campos actualizados");
      } 
      else {
        let infoWithUser = { ...info, uid: user.id }
        const { data, error } = await supabase
          .from("antecedentesHeredo")
          .insert([
            infoWithUser
          ]);
        if (error) console.log(error.message);
        else console.log(data);
        toast.success("Datos Guardados");
      }
    } catch (error) {
      console.log(error.message);
    } finally {
      resetForm();
    }
  }

  const sumbitMedicalEvaluation = async (
    values,
    { setErrors, resetForm }
  ) => {
    let info = {
      lastHemoglobin: values?.lastHemoglobin || null,
      systolicBloodPressure: values?.systolicBloodPressure || null,
      diastolicBloodPressure: values?.diastolicBloodPressure || null,
      dateLastHemoglobin: values?.dateLastHemoglobin || null,
      lastTriglycerides: values?.lastTriglycerides || null,
      dateLastTriglycerides: values?.dateLastTriglycerides || null,
      colesterolHDL: values?.colesterolHDL || null,
      currentWeight: values?.currentWeight || null,
      currentFastingGlucose: values?.currentFastingGlucose || null,
      lastUricAcid: values?.lastUricAcid || null,
      dateLastUricAcid: values?.dateLastUricAcid || null,
      timeInRange: values?.timeInRange || null,
      currentSize: values?.currentSize || null,
      lastCholesterol: values?.lastCholesterol || null,
      dateLastCholesterol: values?.dateLastCholesterol || null,
      glucoseGoal: values?.glucoseGoal || null,
      averageGlucose: values?.averageGlucose || null,}
    try {
      if (updateMedicalEvaluation === true) {
        const { data, error } = await supabase
          .from("evaluacionesMedicas")
          .update([info])
          .eq("uid", user.id);
        if (error) throw error;
        toast.success("Campos actualizados");
        console.log(data);

      }
      else {
        let infoWithUser = {...info,uid:user.id}
        const { data, error } = await supabase
          .from("evaluacionesMedicas")
          .insert([
            infoWithUser  
          ]);
        if (error) console.log( error.message);
        else console.log(data);
        toast.success("Datos Guardados");
      }
    } catch (error) {
      console.log(error.message);
    } finally {
      resetForm();
    }
  }

  const submitHabitsData = async (
    values, 
    { setErrors, resetForm }
  ) => {
    // Crear el objeto info con valores del formulario
    
    let info = {
      diabetesTreatment: values?.diabetesTreatment || null,
      insulinName: values?.insulinName || null,
      insulinDose: values?.insulinDose || null,
      treatmentLocation: values?.treatmentLocation || null,
      hyperglycemiaAction: values?.hyperglycemiaAction || null,
      hypoglycemiaAction: values?.hypoglycemiaAction || null,
      otherMedications: values?.otherMedications || null,
      foodControl: values?.foodControl || null,
      dailyWaterIntake: values?.dailyWaterIntake || null,
      drugUse: values?.drugUse || null,
      alcoholUse: values?.alcoholUse || null,
      rightFootObservation: values?.rightFootObservation || null,
      leftFootObservation: values?.leftFootObservation || null,
      exercise: values?.exercise || null,
      exerciseType: values?.exerciseType || null,
      exerciseDuration: values?.exerciseDuration || null,
      exerciseFrequency: values?.exerciseFrequency || null
    }
  
    try {
      // Verificar si estamos en modo actualización o inserción
      if (updateHabitsData === true) {
        const { data, error } = await supabase
          .from("habitosTratamiento")
          .update([info])
          .eq("uid", user.id);
  
        if (error) throw error;
        toast.success("Campos actualizados");
      } 
      else {
        let infoWithUser = { ...info, uid: user.id }
        const { data, error } = await supabase
          .from("habitosTratamiento")
          .insert([infoWithUser]);
  
        if (error) console.log(error.message);
        else console.log(data);
        toast.success("Datos guardados");
      }
    } catch (error) {
      console.log(error.message);
    } finally {
      resetForm();
    }
  }
  

  const validationSchema1 = Yup.object({
    fullName: Yup.string().matches(/^[^\d]+$/, "El campo debe ser texto"),
    birthdate: Yup.date().min(new Date(), 'La fecha no puede ser mayor a hoy'),
    placeOfBirth: Yup.string().matches(/^[^\d]+$/, "El campo debe ser texto"),
    weightAtBirth:  Yup.number("El campo debe ser un numero").positive("El peso debe ser positivo"),
    typeOfDelivery: Yup.string(),
    bloodType: Yup.string(),
    email: Yup.string().email("Ingresa una dirección de correo válida"),
    maritalStatus: Yup.string(),
    stateOfBirth: Yup.string().matches(/^[^\d]+$/, "El campo de ser texto"),
    sizeAtBirth: Yup.number("El campo debe ser un numero").positive(
      "La talla debe ser positivo"
    ),
    gestationalWeeks: Yup.number("El campo debe ser un numero").positive(
      "Las semanas deben ser positivas"
    ),
    biologicalSex: Yup.string(),
    ocupation: Yup.string().matches(/^[^\d]+$/, "El campo de ser sólo texto"),
    actualState: Yup.string().matches(/^[^\d]+$/, "El campo de ser texto"),
    apgarScore: Yup.number().max(10,"La calificación mayor es 10").min(0,"La calificación mínima es 0"),
    complicationsInPregnancy: Yup.string(),
    specificPregnancyProblem: Yup.string().max(255,"Describa de una manera más corta"),
  });
  const validationSchema2 = Yup.object({
    lastHemoglobin: Yup.number("El campo debe ser un número").positive("El campo debe ser un número positivo"),
    dateLastHemoglobin: Yup.date(),
    systolicBloodPressure: Yup.number("El campo debe ser un número").positive("El campo debe ser un número positivo"),
    diastolicBloodPressure: Yup.number("El campo debe ser un número").positive("El campo debe ser un número positivo"),
    lastTriglycerides: Yup.number("El campo debe ser un número").positive("El campo debe ser un número positivo"),
    dateLastTriglycerides: Yup.date(),
    colesterolHDL: Yup.number("El campo debe ser un número").positive("El campo debe ser un número positivo"),
    currentWeight: Yup.number("El campo debe ser un número").positive("El campo debe ser un número positivo"),
    currentFastingGlucose: Yup.number("El campo debe ser un número").positive("El campo debe ser un número positivo"),
    lastUricAcid: Yup.number("El campo debe ser un número").positive("El campo debe ser un número positivo"),
    dateLastUricAcid: Yup.date(),
    timeInRange: Yup.number("El campo debe ser un número").positive("El campo debe ser un número positivo"),
    currentSize: Yup.number("El campo debe ser un número").positive("El campo debe ser un número positivo"),
    lastCholesterol: Yup.number("El campo debe ser un número").positive("El campo debe ser un número positivo"),
    dateLastCholesterol: Yup.date(),
    glucoseGoal: Yup.number("El campo debe ser un número").positive("El campo debe ser un número positivo"),
    averageGlucose: Yup.number("El campo debe ser un número").positive("El campo debe ser un número positivo"),
  });
  const validationSchema3 = Yup.object({
    diabetesTreatment: Yup.string(),
    insulinName: Yup.string()
      .nullable(), // Opcional
    insulinDose: Yup.number("El campo debe ser un número")
      .positive("Debe ser un número positivo")
      .nullable(), // Opcional
    treatmentLocation: Yup.string(),
    hyperglycemiaAction: Yup.string(),
    hypoglycemiaAction: Yup.string()
      ,
    otherMedications: Yup.string()
      .nullable(), // Opcional
    foodControl: Yup.string()
      ,
    dailyWaterIntake: Yup.number("El campo debe ser un número")
      .positive("Debe ser un número positivo")
      .nullable(), // Opcional
    drugUse: Yup.string()
      ,
    alcoholUse: Yup.string()
      ,
    rightFootObservation: Yup.string()
      .nullable(), // Opcional
    leftFootObservation: Yup.string()
      .nullable(), // Opcional
    exercise: Yup.string()
      ,
    exerciseType: Yup.string()
      .nullable(), // Opcional
    exerciseDuration: Yup.number("El campo debe ser un número")
      .positive("Debe ser un número positivo")
      .nullable(), // Opcional
    exerciseFrequency: Yup.string()
      .nullable(), // Opcional
  });
  const validationSchema4 = Yup.object({
    diabetesInFamily: Yup.string()
      .oneOf(["Si", "No"], "Seleccione una opción válida")
      .required("Este campo es obligatorio"),
  
    diabetesType1: Yup.string()
      .oneOf(["Si", "No"], "Seleccione una opción válida")
      .required("Este campo es obligatorio"),
  
    diabetesType2: Yup.string()
      .oneOf(["Si", "No"], "Seleccione una opción válida")
      .required("Este campo es obligatorio"),
  
    hypertension: Yup.string()
      .oneOf(["Si", "No"], "Seleccione una opción válida")
      .required("Este campo es obligatorio"),
  
    cancer: Yup.string()
      .oneOf(["Si", "No"], "Seleccione una opción válida")
      .required("Este campo es obligatorio"),
  
    cancerType: Yup.string()
      .nullable()
      .max(255, "Máximo 255 caracteres")
      .when("cancer", {
        is: "Si",
        then: (schema) => schema.required("Especifica el tipo de cáncer"),
        otherwise: (schema) => schema.notRequired(),
      }),
  });
  
  

  useEffect(() => {
    if (user) {
      const initialPersonalInformation = async () => {
        try {
          const { data, error } = await supabase
            .from("informacionPersonal")
            .select("*")
            .eq("uid", user.id);
          if (error) throw error;
          setPersonalInformation({
            fullName: data[0]?.fullName || "",
            birthdate: data[0]?.birthdate || "",
            placeOfBirth: data[0]?.placeOfBirth || "",
            weightAtBirth: data[0]?.weightAtBirth || "",
            typeOfDelivery: data[0]?.typeOfDelivery || "disabled",
            bloodType: data[0]?.bloodType || "disabled",
            email: data[0]?.email || "",
            maritalStatus: data[0]?.maritalStatus || "",
            stateOfBirth: data[0]?.stateOfBirth || "",
            sizeAtBirth: data[0]?.sizeAtBirth || "",
            gestationalWeeks: data[0]?.gestationalWeeks || "",
            biologicalSex: data[0]?.biologicalSex || "disabled",
            ocupation: data[0]?.ocupation || "",
            actualState: data[0]?.actualState || "",
            apgarScore: data[0]?.apgarScore || "",
            complicationsInPregnancy:
              data[0]?.complicationsInPregnancy || "disabled",
            specificPregnancyProblem: data[0]?.specificPregnancyProblem || ""
          });
          setUpdateInformacionPersonal(data[0] !== undefined);
          setIsLoading(false);
        } catch (error) {
          console.log(error);
        }
      };
  
      const initialMedicalEvaluations = async () => {
        try {
          const { data, error } = await supabase
            .from("evaluacionesMedicas")
            .select("*")
            .eq("uid", user.id);
          if (error) throw error;
          setMedicalEvaluation({
            lastHemoglobin: data[0]?.lastHemoglobin || "",
            dateLastHemoglobin: data[0]?.dateLastHemoglobin || "",
            systolicBloodPressure: data[0]?.systolicBloodPressure || "",
            diastolicBloodPressure: data[0]?.diastolicBloodPressure || "",
            lastTriglycerides: data[0]?.lastTriglycerides || "",
            dateLastTriglycerides: data[0]?.dateLastTriglycerides || "",
            colesterolHDL: data[0]?.colesterolHDL || "",
            currentWeight: data[0]?.currentWeight || "",
            currentFastingGlucose: data[0]?.currentFastingGlucose || "",
            lastUricAcid: data[0]?.lastUricAcid || "",
            dateLastUricAcid: data[0]?.dateLastUricAcid || "",
            timeInRange: data[0]?.timeInRange || "",
            currentSize: data[0]?.currentSize || "",
            lastCholesterol: data[0]?.lastCholesterol || "",
            dateLastCholesterol: data[0]?.dateLastCholesterol || "",
            glucoseGoal: data[0]?.glucoseGoal || "",
            averageGlucose: data[0]?.averageGlucose || "",
          });
          setUpdateMedicalEvaluation(data[0] !== undefined);
          setIsLoading(false);
        } catch (error) {
          console.log(error);
        }
      };
  
      const initialHabitsData = async () => {
        try {
          const { data, error } = await supabase
            .from("habitosTratamiento")
            .select("*")
            .eq("uid", user.id)
          if (error) throw error;
            setHabitsData({
              diabetesTreatment: data[0]?.diabetesTreatment || '',
              insulinName: data[0]?.insulinName || '',
              insulinDose: data[0]?.insulinDose || '',
              treatmentLocation: data[0]?.treatmentLocation || '',
              hyperglycemiaAction: data[0]?.hyperglycemiaAction || '',
              hypoglycemiaAction: data[0]?.hypoglycemiaAction || '',
              otherMedications: data[0]?.otherMedications || '',
              foodControl: data[0]?.foodControl || '',
              dailyWaterIntake: data[0]?.dailyWaterIntake || '',
              drugUse: data[0]?.drugUse || '',
              alcoholUse: data[0]?.alcoholUse || '',
              rightFootObservation: data[0]?.rightFootObservation || '',
              leftFootObservation: data[0]?.leftFootObservation || '',
              exercise: data[0]?.exercise || '',
              exerciseType: data[0]?.exerciseType || '',
              exerciseDuration: data[0]?.exerciseDuration || '',
              exerciseFrequency: data[0]?.exerciseFrequency || ''
            });
            setUpdateHabitsData(data[0] !== undefined);
            setIsLoading(false);
        } catch (error) {
          console.log(error);
        }
      };

      const initialFamilyHistory = async () => {
        try {
          const { data, error } = await supabase
            .from("antecedentesHeredo")
            .select("*")
            .eq("uid", user.id);
          if (error) throw error;
          setFamilyHistory({
            diabetesInFamily: data[0]?.diabetesInFamily || '',
            diabetesType1: data[0]?.diabetesType1 || '',
            diabetesType2: data[0]?.diabetesType2 || '',
            hypertension: data[0]?.hypertension || '',
            cancer: data[0]?.cancer || '',
            cancerType: data[0]?.cancerType || '',
          });
          setUpdateFamilyHistory(data[0] !== undefined);
          setIsLoading(false);
        } catch (error) {
          console.log(error);
        }
      };
  
      initialPersonalInformation();
      initialMedicalEvaluations();
      initialHabitsData();
      initialFamilyHistory();
    }
  }, [user]);
  
  /*{
                         
                          } 
  */
  return (
    <div>
      <SideBar />
      <div className="p-16 pt-20 sm:ml-64" data-aos="fade-up">
        <ToastContainer />
        <div className="flex flex-row items-center">
          <h2 className="text-2xl font-semibold mb-1 mt-4">
            Información personal
          </h2>
          <p className="text-sm mt-10 mb-6 ml-10">
            ⚠️En caso de ser menor, llama a un padre o tutor para que te ayude a
            llenar el registro
          </p>
        </div>
        <hr className="border-gray-400" />
        {isLoading ? (
          <div>Cargando registros...</div>
        ) : (
          <Formik
            initialValues={personalInformation}
            enableReinitialize
            onSubmit={submitPersonalInformation}
            validationSchema={validationSchema1}
          >
            {({ values, errors, touched, handleSubmit, handleChange }) => (
              <form onSubmit={handleSubmit}>
                <div className="grid grid-cols-12 grid-rows-6 justify-items-stretch mt-5 pl-5 gap-x-1 gap-y-2">
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
                    <p className="mb-2 text-sm text-red-500 dark:text-white w-full h-1">
                      {touched.fullName && errors.fullName}
                    </p>
                  </div>
                  <div className="col-span-4 col-start-1 row-start-2">
                    <div className="w-11/12">
                      <label htmlFor="question" className="font-semibold">
                        Fecha de Nacimiento
                      </label>
                      <input
                        name="birthdate"
                        type="date"
                        onChange={handleChange}
                        value={values.birthdate}
                        className={inputStyle}
                      />

                      <p className="mb-2 text-sm text-red-500 dark:text-white w-full h-1">
                        {touched.birthdate && errors.birthdate}
                      </p>
                    </div>
                  </div>
                  <div className="col-span-4 col-start-1 row-start-3">
                    <div className="w-11/12">
                      <label htmlFor="question" className="font-semibold">
                        Lugar de Nacimiento
                      </label>
                      <input
                        name="placeOfBirth"
                        type="text"
                        onChange={handleChange}
                        value={values.placeOfBirth}
                        className={inputStyle}
                      />

                      <p className="mb-2 text-sm text-red-500 dark:text-white w-full h-1">
                        {touched.placeOfBirth && errors.placeOfBirth}
                      </p>
                    </div>
                  </div>
                  <div className="col-span-4 col-start-1 row-start-4">
                    <div className="w-11/12">
                      <label htmlFor="question" className="font-semibold">
                        Peso a nacer
                      </label>
                      <input
                        name="weightAtBirth"
                        type="number"
                        onChange={handleChange}
                        value={values.weightAtBirth}
                        className={inputStyle}
                      />

                      <p className="mb-2 text-sm text-red-500 dark:text-white w-full h-1">
                        {touched.weightAtBirth && errors.weightAtBirth}
                      </p>
                    </div>
                  </div>
                  <div className="col-span-4 col-start-1 row-start-5 w-11/12">
                    <p className="font-semibold">Tipo de parto</p>
                    <select
                      name="typeOfDelivery"
                      value={values.typeOfDelivery}
                      onChange={handleChange}
                      className={inputStyle}
                    >
                      <option value="disabled" disabled>
                        --Selecciona una opción--
                      </option>
                      <option value="parto natural">Parto Natural</option>
                      <option value="cesarea">Cesarea</option>
                    </select>

                    <p className="mb-2 text-sm text-red-500 dark:text-white w-full h-1">
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
                      value={values.bloodType}
                    >
                      <option value="disabled" disabled>
                        --Selecciona una opción--
                      </option>
                      <option value="A+">A+</option>
                      <option value="A-">A-</option>
                      <option value="B+">B+</option>
                      <option value="B-">B-</option>
                      <option value="AB+">B+</option>
                      <option value="AB-">B-</option>
                      <option value="O+">O+</option>
                      <option value="O-">O-</option>
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
                    <p className="mb-2 text-sm text-red-500 dark:text-white w-full h-1">
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
                      <option value="disabled" disabled>
                        --Selecciona una opción--
                      </option>
                      <option value="soltero">Soltero</option>
                      <option value="casado">Casado</option>
                      <option value="viudo">Viudo</option>
                    </select>
                    <p className="mb-2 text-sm text-red-500 dark:text-white w-full h-1">
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
                      value={values.stateOfBirth}
                    />
                    <p className="mb-2 text-sm text-red-500 dark:text-white w-full h-1">
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
                    <p className="mb-2 text-sm text-red-500 dark:text-white w-full h-1">
                      {errors.sizeAtBirth && touched.sizeAtBirth}
                    </p>
                  </div>
                  <div className="col-span-4 col-start-5 row-start-5 w-11/12">
                    <p className="font-semibold">
                      Semanas de gestiación al nacer
                    </p>
                    <input
                      name="gestationalWeeks"
                      type="number"
                      onChange={handleChange}
                      className={inputStyle}
                      value={values.gestationalWeeks}
                    />
                    <p className="mb-2 text-sm text-red-500 dark:text-white w-full h-1">
                      {errors.gestationalWeeks && touched.gestationalWeeks}
                    </p>
                  </div>
                  {/*Fin del contenedor medio */}

                  {/*Inicio del contenedor derecho */}
                  <div className="col-span-4 col-start-9 row-start-1 w-11/12">
                    <p className="font-semibold">Sexo biologico</p>
                    <select
                      name="biologicalSex"
                      onChange={handleChange}
                      className={inputStyle}
                      value={values.biologicalSex}
                    >
                      <option value="disabled" disabled>
                        --Selecciona una opción--
                      </option>
                      <option value="femenino">Femenino</option>
                      <option value="masculino">Masculino</option>
                    </select>
                    <p className="mb-2 text-sm text-red-500 dark:text-white w-full h-1">
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
                      value={values.ocupation}
                    />
                    <p className="mb-2 text-sm text-red-500 dark:text-white w-full h-1">
                      {errors.ocupation &&
                        touched.ocupation &&
                        errors.ocupation}{" "}
                    </p>
                  </div>
                  <div className="col-span-4 col-start-9 row-start-3 w-11/12">
                    <p className="font-semibold">Estado actual de residencia</p>
                    <input
                      name="actualState"
                      type="text"
                      onChange={handleChange}
                      className={inputStyle}
                      value={values.actualState}
                    />
                    <p className="mb-2 text-sm text-red-500 dark:text-white w-full h-1">
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
                      min={0}
                      max={10}
                    />
                    <p className="mb-2 text-sm text-red-500 dark:text-white w-full h-1">
                      {errors.apgarScore &&
                        touched.apgarScore &&
                        errors.apgarScore}{" "}
                    </p>
                  </div>
                  {/*contenedor con  inputs en la misma linea */}
                  <div className="col-span-4 col-start-9 row-start-5 h-6 flex flex-col items-start w-11/12">
                    <div className="flex flex-auto">
                      <p className="font-semibold mb-0">
                        ¿Hubo complicaciones en el embarazo?
                      </p>
                    </div>
                    <div className="col-span-4 col-start-1 row-start-2 grid-cols-4 flex flex-row items-start gap-1">
                      <div className="w-1/3">
                        <select
                          name="complicationsInPregnancy"
                          onChange={handleChange}
                          className={inputStyle}
                          value={values.complicationsInPregnancy}
                        >
                          <option value="disabled" disabled>
                            --Seleciona una opción--
                          </option>
                          <option value="si">Si</option>
                          <option value="no">No</option>
                        </select>
                        <p className="mb-2 text-sm text-red-500 dark:text-white w-full h-1">
                          {errors.complicationsInPregnancy &&
                            touched.complicationsInPregnancy}
                        </p>
                      </div>
                      <div className="w-2/3">
                        <input
                          type="text"
                          name="specificPregnancyProblem"
                          onChange={handleChange}
                          placeholder="¿Cuál?"
                          value={values.specificPregnancyProblem}
                          disabled={values.complicationsInPregnancy === "no"}
                          className={values.complicationsInPregnancy === "si"
                            ? `${inputStyle}bg-white  text-gray-900 shadow-md`  // Clases si no está deshabilitado.
                            : `${inputStyle}bg-gray-200 border border-gray-300 text-gray-500 shadow-sm cursor-not-allowed `}
                        />
                        <p className="mb-2 text-sm text-red-500 dark:text-white w-full h-1">
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
        )}


        <div className="flex flex-row items-center mt-8">
          <h2 className="text-3x1 font-semibold">Antecedentes Heredo-Familiares</h2>
        </div>
        <hr className="border-gray-400" />
          <Formik
          initialValues={familyHistory}
          enableReinitialize
          onSubmit={submitFamilyHistory}
          validationSchema={validationSchema4}
        >
          {({ handleSubmit, handleChange, values, errors, touched }) => (
            <form onSubmit={handleSubmit}>
              <div className="grid grid-cols-5 gap-4 mt-5 pl-5">
                <div className="col-span-2">
                  <p className="font-semibold mb-0">
                    ¿Sus padres o abuelos padecen o padecieron diabetes?
                  </p>
                  <select
                    name="diabetesInFamily"
                    value={values.diabetesInFamily}
                    onChange={handleChange}
                    className={inputStyle}
                  >
                    <option value="" disabled>--Selecciona una opción--</option>
                    <option value="Si">Si</option>
                    <option value="No">No</option>
                  </select>
                  <p className="text-sm text-red-500">{touched.diabetesInFamily && errors.diabetesInFamily}</p>
                </div>

                <div className="col-span-2">
                  <label className="font-semibold">Diabetes tipo 1</label>
                  <select
                    name="diabetesType1"
                    value={values.diabetesType1}
                    onChange={handleChange}
                    className={inputStyle}
                  >
                    <option value="" disabled>--Selecciona una opción--</option>
                    <option value="Si">Si</option>
                    <option value="No">No</option>
                  </select>
                  <p className="text-sm text-red-500">{touched.diabetesType1 && errors.diabetesType1}</p>
                </div>

                <div className="col-span-1">
                  <label className="font-semibold">Diabetes tipo 2</label>
                  <select
                    name="diabetesType2"
                    value={values.diabetesType2}
                    onChange={handleChange}
                    className={inputStyle}
                  >
                    <option value="" disabled>--Selecciona una opción--</option>
                    <option value="Si">Si</option>
                    <option value="No">No</option>
                  </select>
                  <p className="text-sm text-red-500">{touched.diabetesType2 && errors.diabetesType2}</p>
                </div>

                <div className="col-span-2">
                  <label className="font-semibold">Hipertensión</label>
                  <select
                    name="hypertension"
                    value={values.hypertension}
                    onChange={handleChange}
                    className={inputStyle}
                  >
                    <option value="" disabled>--Selecciona una opción--</option>
                    <option value="Si">Si</option>
                    <option value="No">No</option>
                  </select>
                  <p className="text-sm text-red-500">{touched.hypertension && errors.hypertension}</p>
                </div>

                <div className="col-span-2">
                  <label className="font-semibold">¿Algún tipo de Cáncer?</label>
                  <div className="flex gap-2">
                    <select
                      name="cancer"
                      value={values.cancer}
                      onChange={handleChange}
                      className={inputStyle + " w-1/3"}
                    >
                      <option value="" disabled>--Selecciona una opción--</option>
                      <option value="Si">Si</option>
                      <option value="No">No</option>
                    </select>
                    {values.cancer === "Si" && (
                      <input
                        name="cancerType"
                        type="text"
                        value={values.cancerType}
                        onChange={handleChange}
                        className={inputStyle + " w-2/3"}
                        placeholder="¿Cuál?"
                      />
                    )}
                  </div>
                  <p className="text-sm text-red-500">{touched.cancer && errors.cancer}</p>
                  {values.cancer === "Si" && (
                    <p className="text-sm text-red-500">{touched.cancerType && errors.cancerType}</p>
                  )}
                </div>
              </div>
              <div className="flex justify-end pr-8 h-11 mt-4">
                <button
                  type="submit"
                  className="h-10 w-28 font-light place-self bg-azulHover text-white border-2 border-azulHover border-solid px-3 rounded-lg hover:bg-azul hover:border-azul"
                >
                  GUARDAR
                </button>
              </div>
            </form>
          )}
        </Formik>

        {/*Formulario 4 */}
        <div className="flex flex-row items-center">
          <h2 className="text-2xl font-semibold mt-4 mb-6">
            Evaluaciones Médicas Recientes
          </h2>
        </div>

        <hr className="border-gray-400" />
        {isLoading ? (
          <div>Cargando registros...</div>
        ) : (
          <Formik
            initialValues={medicalEvaluation}
            enableReinitialize
            onSubmit={sumbitMedicalEvaluation}
            validationSchema={validationSchema2}
          >
            {({ handleSubmit, handleChange, values, errors, touched }) => (
              <form onSubmit={handleSubmit}>
                {/* grid para formulario 1*/}
                <div className="grid grid-cols-12 grid-rows-4 justify-items-stretch mt-5 pl-5 gap-1">
                  {/*Lado izquierdo del contenedor */}
                  <div className="col-span-4 w-11/12">
                    {/*contenedor con  inputs en la misma linea */}
                    <div className="col-span-4 col-start-1 row-start-1">
                      <div className="flex flex-auto">
                        <p className="font-semibold mb-0">
                          Última hemoglobina glicosilada y fecha
                        </p>
                      </div>
                      <div className="col-span-4 col-start-1 row-start-2 grid-cols-4 flex flex-row items-start gap-1">
                        <div className=" w-1/3">
                          <input
                            name="lastHemoglobin"
                            type="number"
                            value={values.lastHemoglobin}
                            onChange={handleChange}
                            className={inputStyle}
                            step={0.01}
                            min={"0"}
                          />
                          <p className="mb-2 text-sm text-red-500 dark:text-white w-full h-1">
                            {errors.lastHemoglobin && touched.lastHemoglobin}
                            {""}
                          </p>
                        </div>
                        <div className=" w-2/3 ">
                          <input
                            name="dateLastHemoglobin"
                            type="date"
                            value={values.dateLastHemoglobin}
                            onChange={handleChange}
                            className={inputStyle}
                          />
                          <p className="mb-2 text-sm text-red-500 dark:text-white w-full h-1">
                            {errors.dateLastHemoglobin &&
                              touched.dateLastHemoglobin}
                          </p>
                        </div>
                      </div>
                    </div>
                    {/* fin contenedor con  inputs en la misma linea */}
                  </div>
                  <div className="col-span-4 col-start-1 row-start-2 w-11/12 flex-col">
                    <p className="font-semibold mb-0 flex ">
                      Presión arterial actual
                    </p>
                    <div className=" flex flex-row gap-1">
                      <div className="w-1/2">
                        <input
                          name="systolicBloodPressure"
                          type="number"
                          value={values.systolicBloodPressure}
                          onChange={handleChange}
                          className={inputStyle}
                          placeholder="Sistólica"
                          min={"0"}
                        />
                        <p className="mb-2 text-sm text-red-500 dark:text-white w-full h-1 col-start-1 row-span-4">
                          {errors.systolicBloodPressure &&
                            touched.systolicBloodPressure}{" "}
                        </p>
                      </div>
                      <div className="w-1/2">
                        <input
                          name="diastolicBloodPressure"
                          type="number"
                          value={values.diastolicBloodPressure}
                          onChange={handleChange}
                          className={inputStyle}
                          placeholder="Diastólica"
                          min={"0"}
                        />
                        <p className="mb-2 text-sm text-red-500 dark:text-white w-full h-1 col-start-1 row-span-4">
                          {errors.diastolicBloodPressure &&
                            touched.diastolicBloodPressure}{" "}
                        </p>
                      </div>
                    </div>
                  </div>
                  <div className="col-span-4 col-start-1 row-start-3 w-11/12">
                    {/*contenedor con  inputs en la misma linea */}
                    <div className="col-span-4 col-start-1 row-start-1">
                      <div className="flex flex-auto">
                        <p className="font-semibold mb-0">
                          Última medición de triglicéridos y fecha
                        </p>
                      </div>
                      <div className="col-span-4 col-start-1 row-start-2 grid-cols-4 flex flex-row items-start gap-1">
                        <div className=" w-1/3">
                          <input
                            name="lastTriglycerides"
                            type="number"
                            value={values.lastTriglycerides}
                            onChange={handleChange}
                            className={inputStyle}
                            step={0.01}
                            min={"0"}
                          />
                          <p className="mb-2 text-sm text-red-500 dark:text-white w-full h-1 col-start-1 row-span-4">
                            {errors.lastTriglycerides &&
                              touched.lastTriglycerides}{" "}
                          </p>
                        </div>

                        <div className=" w-2/3 ">
                          <input
                            name="dateLastTriglycerides"
                            type="date"
                            value={values.dateLastTriglycerides}
                            onChange={handleChange}
                            className={inputStyle}
                          />
                        </div>
                      </div>
                    </div>
                    {/* fin contenedor con  inputs en la misma linea */}
                  </div>
                  <div className="col-span-4 col-start-1 row-start-4 w-11/12">
                    <p className="font-semibold mb-0">Colesterol HDL</p>
                    <input
                      name="colesterolHDL"
                      type="number"
                      value={values.colesterolHDL}
                      onChange={handleChange}
                      className={inputStyle}
                      step={0.01}
                      min={"0"}
                    />
                    <p className="mb-2 text-sm text-red-500 dark:text-white w-full h-1">
                      {errors.colesterolHDL &&
                        touched.colesterolHDL &&
                        errors.colesterolHDL}{" "}
                    </p>
                  </div>
                  {/*FIN Lado izquierdo del contenedor */}

                  {/* lado medio del contenedor */}
                  <div className="col-span-4 col-start-5 row-start-1 w-11/12">
                    <p className="font-semibold mb-0">Peso actual</p>
                    <input
                      name="currentWeight"
                      type="number"
                      value={values.currentWeight}
                      onChange={handleChange}
                      className={inputStyle}
                      step={0.01}
                      min={"0"}
                    />
                    <p className="mb-2 text-sm text-red-500 dark:text-white w-full h-1">
                      {errors.currentWeight &&
                        touched.currentWeight &&
                        errors.currentWeight}{" "}
                    </p>
                  </div>
                  <div className="col-span-4 col-start-5 row-start-2 w-11/12">
                    <p className="font-semibold mb-0">
                      Glucosa en ayunas actual
                    </p>
                    <input
                      name="currentFastingGlucose"
                      type="number"
                      value={values.currentFastingGlucose}
                      onChange={handleChange}
                      className={inputStyle}
                      min={"0"}
                    />
                    <p className="mb-2 text-sm text-red-500 dark:text-white w-full h-1">
                      {errors.currentFastingGlucose &&
                        touched.currentFastingGlucose &&
                        errors.currentFastingGlucose}{" "}
                    </p>
                  </div>
                  <div className="col-span-4 col-start-5 row-start-3 w-11/12">
                    {/*contenedor con  inputs en la misma linea */}
                    <div className="col-span-4 col-start-1 row-start-1">
                      <div className="flex flex-auto">
                        <p className="font-semibold mb-0">
                          Última medición de ácido úrico y fecha
                        </p>
                      </div>
                      <div className="col-span-4 col-start-1 row-start-2 grid-cols-4 flex flex-row items-start gap-1">
                        <div className=" w-1/3">
                          <input
                            name="lastUricAcid"
                            type="number"
                            value={values.lastUricAcid}
                            onChange={handleChange}
                            className={inputStyle}
                            step={0.01}
                            min={"0"}
                          />
                          <p className="mb-2 text-sm text-red-500 dark:text-white w-full h-1 col-span-4 col-start-1">
                            {errors.lastUricAcid &&
                              touched.lastUricAcid &&
                              errors.lastUricAcid}{" "}
                          </p>
                        </div>
                        <div className=" w-2/3 ">
                          <input
                            name="dateLastUricAcid"
                            type="date"
                            value={values.dateLastUricAcid}
                            onChange={handleChange}
                            className={inputStyle}
                          />
                        </div>
                      </div>
                    </div>
                    {/* fin contenedor con  inputs en la misma linea */}
                  </div>
                  <div className="col-span-4 col-start-5 row-start-4 w-11/12">
                    <p className="font-semibold mb-0">Tiempo en rango</p>
                    <input
                      name="timeInRange"
                      type="number"
                      value={values.timeInRange}
                      onChange={handleChange}
                      className={inputStyle}
                      step={0.01}
                      min={"0"}
                    />
                    <p className="mb-2 text-sm text-red-500 dark:text-white w-full h-1">
                      {errors.timeInRange &&
                        touched.timeInRange &&
                        errors.timeInRange}{" "}
                    </p>
                  </div>
                  {/*Fin del contenedor medio */}

                  {/*Inicio del contenedor derecho */}
                  <div className="col-span-4 col-start-9 row-start-1 w-11/12">
                    <p className="font-semibold mb-0">Talla actual</p>
                    <input
                      name="currentSize"
                      type="number"
                      value={values.currentSize}
                      onChange={handleChange}
                      className={inputStyle}
                      step={0.01}
                      min={"0"}
                    />
                    <p className="mb-2 text-sm text-red-500 dark:text-white w-full h-1">
                      {errors.currentSize &&
                        touched.currentSize &&
                        errors.currentSize}{" "}
                    </p>
                  </div>
                  <div className="col-span-4 col-start-9 row-start-2 w-11/12">
                    {/*Contenedor con dos inputs en linea*/}
                    <div className="flex flex-auto">
                      <p className="font-semibold mb-0">
                        Última medición de colesterol y fecha
                      </p>
                    </div>
                    <div className="col-span-4 col-start-1 row-start-2 grid-cols-4 flex flex-row items-start gap-1">
                      <div className=" w-1/3">
                        <input
                          name="lastCholesterol"
                          type="number"
                          value={values.lastCholesterol}
                          onChange={handleChange}
                          className={inputStyle}
                          step={0.01}
                          min={"0"}
                        />
                        <p className="mb-2 text-sm text-red-500 dark:text-white w-full h-1 col-span-4 col-start-1">
                          {errors.lastCholesterol &&
                            touched.lastCholesterol &&
                            errors.lastCholesterol}{" "}
                        </p>
                      </div>
                      <div className=" w-2/3 ">
                        <input
                          name="dateLastCholesterol"
                          type="date"
                          value={values.dateLastCholesterol}
                          onChange={handleChange}
                          className={inputStyle}

                        />
                      </div>
                    </div>
                    {/*fin Contenedor con dos inputs en linea*/}
                  </div>
                  <div className="col-span-4 col-start-9 row-start-3 w-11/12">
                    <p className="font-semibold mb-0">
                      Meta de glucosa establecida por su médico
                    </p>
                    <input
                      name="glucoseGoal"
                      type="number"
                      value={values.glucoseGoal}
                      onChange={handleChange}
                      className={inputStyle}

                    />
                    <p className="mb-2 text-sm text-red-500 dark:text-white w-full h-1">
                      {errors.glucoseGoal &&
                        touched.glucoseGoal &&
                        errors.glucoseGoal}{" "}
                    </p>
                  </div>
                  <div className="col-span-4 col-start-9 row-start-4 w-11/12">
                    <p className="font-semibold mb-0">Glucosa promedio</p>
                    <input
                      name="averageGlucose"
                      type="number"
                      value={values.averageGlucose}
                      onChange={handleChange}
                      className={inputStyle}
                    />
                    <p className="mb-2 text-sm text-red-500 dark:text-white w-full h-1">
                      {errors.averageGlucose &&
                        touched.averageGlucose &&
                        errors.averageGlucose}{" "}
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
        )}

        {/*Formulario 5 */}
        <div className="flex flex-row items-center">
          <h2 className="text-2xl font-semibold mt-4 mb-6">Hábitos y Tratamiento</h2>
        </div>
        <hr className="border-gray-400" />
      
        <Formik
          initialValues={habitsData}
          enableReinitialize
          onSubmit={submitHabitsData}
          validationSchema={validationSchema3}
        >
          {({ handleSubmit, handleChange, values, errors, touched }) => (
            <form onSubmit={handleSubmit} className="mt-5 pl-5">
              <div className="grid grid-cols-12 gap-4">
                {/* Tratamiento actual para diabetes tipo 1 */}
                <div className="col-span-4">
                  <label className="font-semibold">Tratamiento actual para la diabetes tipo 1</label>
                  <div className="flex flex-row gap-2 mt-2">
                    <select
                      name="diabetesTreatment"
                      value={values.diabetesTreatment}
                      onChange={handleChange}
                      className={`${inputStyle} w-1/3`}
                    >
                      <option value="">--Selecciona una opción--</option>
                      <option value="Insulina Lenta">Insulina Lenta</option>
                      <option value="Insulina Rápida">Insulina Rápida</option>
                    </select>
                    <input
                      type="text"
                      name="insulinName"
                      value={values.insulinName}
                      onChange={handleChange}
                      placeholder="Nombre de insulina"
                      className={`${inputStyle} w-1/3`}
                    />
                    <input
                      type="number"
                      name="insulinDose"
                      value={values.insulinDose}
                      onChange={handleChange}
                      placeholder="Dosis"
                      className={`${inputStyle} w-1/3`}
                      min={"0"}
                      step={0.01}
                    />
                  </div>
                  <label className="font-semibold">Lugar de tratamiento actual</label>
                  <select
                    name="treatmentLocation"
                    value={values.treatmentLocation}
                    onChange={handleChange}
                    className={inputStyle}
                  >
                    <option value="">--Selecciona una opción--</option>
                    <option value="IMSS">IMSS</option>
                    <option value="ISSSTE">ISSSTE</option>
                    <option value="Particular">Particular</option>
                  </select>
                  <label className="font-semibold">¿Qué hace en caso de hiperglicemia?</label>
                  <input
                    type="text"
                    name="hyperglycemiaAction"
                    value={values.hyperglycemiaAction}
                    onChange={handleChange}
                    className={inputStyle}
                  />
                  <label className="font-semibold">¿Consume estupefacientes?</label>
                  <select
                    name="drugUse"
                    value={values.drugUse}
                    onChange={handleChange}
                    className={inputStyle}
                  >
                    <option value="">--Selecciona una opción--</option>
                    <option value="Si">Si</option>
                    <option value="No">No</option>
                  </select>
                  <label className="font-semibold">¿Hace ejercicio?</label>
                  <select
                    name="exercise"
                    value={values.exercise}
                    onChange={handleChange}
                    className={inputStyle}
                  >
                    <option value="">--Selecciona una opción--</option>
                    <option value="Si">Si</option>
                    <option value="No">No</option>
                  </select>
                  
                  {values.exercise === "Si" && (
                    <div className="flex flex-col gap-2 mt-2">
                      <div className="flex flex-row gap-2">
                        <input
                          type="text"
                          name="exerciseType"
                          value={values.exerciseType}
                          onChange={handleChange}
                          placeholder="Tipo de ejercicio"
                          className={`${inputStyle} w-1/2`}
                        />
                        <input
                          type="number"
                          name="exerciseDuration"
                          value={values.exerciseDuration}
                          onChange={handleChange}
                          placeholder="Duración en horas"
                          className={`${inputStyle} w-1/2`}
                          min="0"
                        />
                      </div>
                      <select
                        name="exerciseFrequency"
                        value={values.exerciseFrequency}
                        onChange={handleChange}
                        className={`${inputStyle}`}
                      >
                        <option value="">--Selecciona una opción--</option>
                        <option value="Diario">Diario</option>
                        <option value="Semanal">Semanal</option>
                        <option value="Mensual">Mensual</option>
                      </select>
                    </div>
                  )}  
                </div>

                {/* Otros medicamentos */}
                <div className="col-span-5">
                  <label className="text-sm font-semibold mt-2">¿Qué otros medicamentos utiliza para cualquier otro padecimiento?</label>
                  <textarea
                    name="otherMedications"
                    value={values.otherMedications}
                    onChange={handleChange}
                    className={`${inputStyle} h-20 resize-none`}
                  />

                  <label className="font-semibold mt-2">¿Qué hace en caso de hipoglicemia?</label>
                  <input
                    type="text"
                    name="hypoglycemiaAction"
                    value={values.hypoglycemiaAction}
                    onChange={handleChange}
                    className={inputStyle}
                  />

                  <label className="font-semibold">¿Observaciones en el pie derecho?</label>
                  <select
                    name="rightFootObservation"
                    value={values.rightFootObservation}
                    onChange={handleChange}
                    className={inputStyle}
                  >
                    <option value="">--Selecciona una opción--</option>
                    <option value="Ampollas">Ampollas</option>
                    <option value="Callosidad">Callosidad</option>
                    <option value="Resequedad">Resequedad</option>
                  </select>
                  
                </div>

                {/* Control de alimentos y agua */}
                <div className="col-span-3">
                  <label className="font-semibold">¿Cómo controla sus alimentos?</label>
                  <select
                    name="foodControl"
                    value={values.foodControl}
                    onChange={handleChange}
                    className={inputStyle}
                  >
                    <option value="">--Selecciona una opción--</option>
                    <option value="Por raciones">Por raciones</option>
                    <option value="Por calorías">Por calorías</option>
                    <option value="Sin control">Sin control</option>
                  </select>
                  <label className="font-semibold mt-2">¿Cuánta agua consume al día? (en litros)</label>
                  <input
                    type="number"
                    name="dailyWaterIntake"
                    value={values.dailyWaterIntake}
                    onChange={handleChange}
                    className={inputStyle}
                    min={"0"}
                    step={0.01}
                  />
                  <label className="font-semibold mt-2">¿Consume alcohol?</label>
                  <select
                    name="alcoholUse"
                    value={values.alcoholUse}
                    onChange={handleChange}
                    className={inputStyle}
                  >
                    <option value="">--Selecciona una opción--</option>
                    <option value="Si">Si</option>
                    <option value="No">No</option>
                  </select>
                  <label className="font-semibold mt-2">¿Observaciones en el pie izquierdo?</label>
                  <select
                    name="leftFootObservation"
                    value={values.leftFootObservation}
                    onChange={handleChange}
                    className={inputStyle}
                  >
                    <option value="">--Selecciona una opción--</option>
                    <option value="Ampollas">Ampollas</option>
                    <option value="Callosidad">Callosidad</option>
                    <option value="Resequedad">Resequedad</option>
                  </select>
                </div>            
              </div>

              <div className="flex justify-end pr-8 h-11 mt-4">
                <button
                  type="submit"
                  className="h-10 w-28 font-light bg-azulHover text-white border-2 border-azulHover rounded-lg mt-4 hover:bg-azul hover:border-azul"
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