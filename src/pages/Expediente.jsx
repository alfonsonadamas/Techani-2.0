import React, { useEffect, useState } from 'react'
import SideBar from '../components/SideBar';
import InputType from "../components/InputType";
import { Formik } from "formik";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { supabase } from "../config/supabase";
import { useUserContext } from "../context/UserContext";


export default function Expediente() {
    const { user } = useUserContext();
    const [personalInformation, setPersonalInformation] = useState({});
    const [val, setVal] = useState({})

   useEffect(() => {
        
    initialPersonalInformation();

    }, [user]);

    
    const initialPersonalInformation  = async () => {
            try {
              const { data, error } = await supabase
                .from("infromacionPersonal")
                .select("*")
                .eq("uid", user.id);
              console.log("Datos ", data);
              
                console.log(data)
              if(data === null || error){
                setPersonalInformation({
                    fullName: '',
                    birthdate: '',
                    placeOfBirth: '',
                    weightAtBirth: '',
                    typeOfDelivery: '',
                    bloodType: '',

                    email: '',
                    maritalStatus: '',
                    stateOfBirth: '',
                    sizeAtBirth: '',
                    gestationalWeeks: '',

                    biologicalSex: '',
                    ocupation: '',
                    actualState: '',
                    apgarScore: '',
                    complicationsInPregnancy: '',
                    specificPregnancyProblem: ''
                })
              } else {setPersonalInformation(data)}
              console.log(personalInformation)
            } catch (error) {
              console.log(error);
            }
    };

    const submitPersonalInformation = async (
         values  ,
        { setErrors, resetForm })  =>{
        
            const { data, error } = await supabase
                .from("informacionPersonal")
                .insert({
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
                    }
                );
                if (error) throw error;
            toast.success("Datos Guardados");

    }
    const FormInformacionPersonal = () => (
        <div>
            <ToastContainer />
            <Formik
                initialValues={{
                    fullName: personalInformation.fullName,
                    birthdate: personalInformation.birthdate,
                    placeOfBirth: personalInformation.placeOfBirth,
                    weightAtBirth: personalInformation.weightAtBirth,
                    typeOfDelivery: personalInformation.typeOfDelivery,
                    bloodType: personalInformation.bloodType,

                    email: personalInformation.email,
                    maritalStatus: personalInformation.maritalStatus,
                    stateOfBirth: personalInformation.stateOfBirth,
                    sizeAtBirth: personalInformation.sizeAtBirth,
                    gestationalWeeks: personalInformation.gestationalWeeks,

                    biologicalSex: personalInformation.biologicalSex,
                    ocupation: personalInformation.ocupation,
                    actualState: personalInformation.actualState,
                    apgarScore: personalInformation.apgarScore,
                    complicationsInPregnancy: personalInformation.complicationsInPregnancy,
                    specificPregnancyProblem: personalInformation.specificPregnancyProblem, 
                    
                }}
                onSubmit={submitPersonalInformation}
                
            >
                {({ handleSubmit,
                    handleChange,
                    values,
                    errors,
                    touched, }) => (
                    <form onSubmit={handleSubmit}>
                        <div className='flex flex-row items-center'>
                            <h2 className="text-2xl font-semibold mb-1 mt-4">Información personal</h2>
                            <p className="text-sm mt-10 mb-6 ml-10">⚠️En caso de ser menor, llama a un padre o tutor para que te ayude a llenar el registro</p>
                        </div>

                        <hr className="border-gray-400" />
                        {/* grid para formulario 1*/}
                        <div className="grid grid-cols-12 grid-rows-6 justify-items-stretch mt-5 pl-5 gap-1">
                            {/*Lado izquierdo del contenedor */}
                            <div className="col-span-4">
                                <InputType
                                    name="fullName"
                                    input="text"
                                    question="Nombre Completo"
                                    handleChange={handleChange}
                                />
                                <p className="mb-2 text-sm text-red-500 dark:text-white w-1">
                                    {touched.fullName &&
                                        errors.fullName}
                                </p>
                            </div>
                            <div className="col-span-4 col-start-1 row-start-2">
                                 <InputType
                                    name="birthdate"
                                    input="date"
                                    question="Fecha de Nacimiento"
                                    handleChange={handleChange}
                                />
                            </div>
                            <div className="col-span-4 col-start-1 row-start-3">
                                <InputType
                                    name="placeOfBirth"
                                    input="text"
                                    question="Lugar de Nacimiento"
                                    handleChange={handleChange}
                                />
                                <p className="mb-2 text-sm text-red-500 dark:text-white w-1">
                                    {errors.placeOfBirth &&
                                        touched.placeOfBirth &&
                                        errors.placeOfBirth}{" "}
                                </p>
                            </div>
                            <div className="col-span-4 col-start-1 row-start-4">
                                <InputType
                                    name="weightAtBirth"
                                    input="number"
                                    question="Peso al nacer"
                                    handleChange={handleChange}
                                />
                                <p className="mb-2 text-sm text-red-500 dark:text-white w-1">
                                    {errors.weightAtBirth &&
                                        touched.weightAtBirth &&
                                        errors.weightAtBirth}{" "}
                                </p>
                            </div>
                            <div className="col-span-4 col-start-1 row-start-5">
                                <InputType
                                    name="typeOfDelivery"
                                    input="select"
                                    question="Tipo de parto"
                                    options={[{ option: "parto natural", value: "Parto Natural" },
                                    { option: "cesarea", value: "Cesárea" }
                                    ]}
                                    handleChange={handleChange}
                                />
                                <p className="mb-2 text-sm text-red-500 dark:text-white w-1">
                                    {errors.typeOfDelivery &&
                                        touched.typeOfDelivery &&
                                        errors.typeOfDelivery}{" "}
                                </p>
                            </div>
                            <div className="col-span-4 row-start-6">
                                <InputType
                                    name="bloodType"
                                    input="text"
                                    question="Tipo de sangre"
                                    handleChange={handleChange}
                                />
                            </div>
                            {/*FIN Lado izquierdo del contenedor */}

                            {/* lado medio del contenedor */}
                            <div className="col-span-4 col-start-5 row-start-1">
                                <InputType
                                    name="email"
                                    input="email"
                                    question="Correo electrónico"
                                    handleChange={handleChange}
                                    
                                />
                                <p className="mb-2 text-sm text-red-500 dark:text-white w-1">
                                    {errors.birthdate &&
                                        touched.birthdate &&
                                        errors.birthdate}{" "}
                                </p>
                               
                                <p className="mb-2 text-sm text-red-500 dark:text-white w-1">
                                    {errors.email &&
                                        touched.email &&
                                        errors.email}{" "}
                                </p>
                            </div>
                            <div className="col-span-4 col-start-5 row-start-2">
                                <InputType
                                    name="maritalStatus"
                                    input="select"
                                    question="Estado civil"
                                    options={[{ option: "soltero", value: "Soltero" }, { option: "casado", value: "Casado" }, 
                                              { option: "viudo", value: "Viudo" }]}
                                    handleChange={handleChange}
                                />
                                <p className="mb-2 text-sm text-red-500 dark:text-white w-1">
                                    {errors.maritalStatus &&
                                        touched.maritalStatus &&
                                        errors.maritalStatus}{" "}
                                </p>
                            </div>
                            <div className="col-span-4 col-start-5 row-start-3">
                                <InputType
                                    name="stateOfBirth"
                                    input="text"
                                    question="Estado de nacimiento"
                                    handleChange={handleChange}
                                />
                                <p className="mb-2 text-sm text-red-500 dark:text-white w-1">
                                    {errors.stateOfBirth &&
                                        touched.stateOfBirth &&
                                        errors.stateOfBirth}{" "}
                                </p>
                            </div>
                            <div className="col-span-4 col-start-5 row-start-4">
                                <InputType
                                    name="sizeAtBirth"
                                    input="number"
                                    question="Talla al nacer"
                                    handleChange={handleChange}
                                />
                                <p className="mb-2 text-sm text-red-500 dark:text-white w-1">
                                    {errors.sizeAtBirth &&
                                        touched.sizeAtBirth &&
                                        errors.sizeAtBirth}{" "}
                                </p>
                            </div>
                            <div className="col-span-4 col-start-5 row-start-5">
                                <InputType
                                    name="gestationalWeeks"
                                    input="number"
                                    question="Semnanas de gestación al nacer"
                                    handleChange={handleChange}
                                />
                                <p className="mb-2 text-sm text-red-500 dark:text-white w-1">
                                    {errors.gestationalWeeks &&
                                        touched.gestationalWeeks &&
                                        errors.gestationalWeeks}{" "}
                                </p>
                            </div>
                            {/*Fin del contenedor medio */}

                            {/*Inicio del contenedor derecho */}
                            <div className="col-span-4 col-start-9 row-start-1">
                                <InputType
                                    name="biologicalSex"
                                    input="select"
                                    question="Sexo biologico"
                                    options={[{ option: "femenino", value: "Femenino" }, { option: "masculino", value: "Masculino" }]}
                                    handleChange={handleChange}
                                />
                                <p className="mb-2 text-sm text-red-500 dark:text-white w-1">
                                    {errors.biologicalSex &&
                                        touched.biologicalSex &&
                                        errors.biologicalSex}{" "}
                                </p>
                            </div>
                            <div className="col-span-4 col-start-9 row-start-2">
                                <InputType
                                    name="ocupation"
                                    input="text"
                                    question="¿Cual es su ocupacion?"
                                    handleChange={handleChange}
                                />
                                <p className="mb-2 text-sm text-red-500 dark:text-white w-1">
                                    {errors.ocupation &&
                                        touched.ocupation &&
                                        errors.ocupation}{" "}
                                </p>
                            </div>
                            <div className="col-span-4 col-start-9 row-start-3">
                                <InputType
                                    name="actualState"
                                    input="text"
                                    question="Estado actual de residencia"
                                    handleChange={handleChange}
                                />
                                <p className="mb-2 text-sm text-red-500 dark:text-white w-1">
                                    {errors.actualState &&
                                        touched.actualState &&
                                        errors.actualState}{" "}
                                </p>
                            </div>
                            <div className="col-span-4 col-start-9 row-start-4">
                                <InputType
                                    name="apgarScore"
                                    input="number"
                                    question="Calificación de Apgar"
                                    handleChange={handleChange}
                                />
                                <p className="mb-2 text-sm text-red-500 dark:text-white w-1">
                                    {errors.apgarScore &&
                                        touched.apgarScore &&
                                        errors.apgarScore}{" "}
                                </p>
                            </div>
                            {/*contenedor con  inputs en la misma linea */}
                            <div className="col-span-4 col-start-9 row-start-5 h-6 flex flex-col items-start">
                                <div className='flex flex-auto'>
                                    <p className='font-semibold mb-0'>¿Hubo complicaciones en el embarazo?</p>
                                </div>
                                <div className='col-span-4 col-start-1 row-start-2 grid-cols-4 flex flex-row items-start'>
                                    <div className=' w-1/3'>
                                        <InputType
                                            name="complicationsInPregnancy"
                                            input="select"
                                            question=""
                                            options={[
                                                { option: "si", value: "Si" },
                                                { option: "no", value: "No" }
                                            ]}
                                            handleChange={handleChange}
                                        />
                                        <p className="mb-2 text-sm text-red-500 dark:text-white w-1">
                                            {errors.complicationsInPregnancy &&
                                                touched.complicationsInPregnancy &&
                                                errors.complicationsInPregnancy}{" "}
                                        </p>
                                    </div>
                                    <div className=' w-2/3 mr-3'>
                                        <InputType
                                            name="specificPregnancyProblem"
                                            input="text"
                                            question=""
                                            handleChange={handleChange}
                                            placeholder="¿Cuál?"
                                            disabled={values.complicationsInPregnancy}
                                        />

                                    </div>
                                        <p className="mb-2 text-sm text-red-500 dark:text-white w-1">
                                            {errors.specificPregnancyProblem &&
                                                touched.specificPregnancyProblem &&
                                                errors.specificPregnancyProblem}{" "}
                                        </p>

                                </div>


                            </div>
                            {/* fin contenedor con  inputs en la misma linea */}
                            {/*FIN DEL LADO DERECHO */}
                        </div>
                        {/* FIN DE GRID */}
                        <div className='flex justify-end pr-8 h-11'>
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
    );

    const FormEvaluacionesRecientes = () => (
        <div className='mt-10' >
            <Formik
                initialValues={{
                    
                }}
                onSubmit={(values) => {
                    console.log(values)

                }}
                validationSchema={console.log("validationSchema3")}
            >
                {({ handleSubmit,
                    handleChange,
                    values,
                    errors,
                    touched, }) => (
                    <form onSubmit={handleSubmit}>
                        <div className='flex flex-row items-center'>
                            <h2 className="text-2xl font-semibold mt-4 mb-6">Evaluaciones Médicas Recientes</h2>
                        </div>

                        <hr className="border-gray-400" />
                        {/* grid para formulario 1*/}
                        <div className="grid grid-cols-12 grid-rows-4 justify-items-stretch mt-5 pl-5 gap-1">
                            {/*Lado izquierdo del contenedor */}
                            <div className="col-span-4">
                                {/*contenedor con  inputs en la misma linea */}
                                <div className="col-span-4 col-start-1 row-start-1">
                                    <div className='flex flex-auto'>
                                        <p className='font-semibold mb-0'>Última hemoglobina glicosilada y fecha</p>
                                    </div>
                                    <div className='col-span-4 col-start-1 row-start-2 grid-cols-4 flex flex-row items-start'>
                                        <div className=' w-1/3'>
                                            <InputType
                                                name="lastHemoglobin"
                                                input="text"
                                                question=""
                                                handleChange={handleChange}
                                            />
                                        </div>
                                        <div className=' w-2/3 mr-3'>
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
                                    <div className='flex flex-auto'>
                                        <p className='font-semibold mb-0'>Última medición de triglicéridos y fecha</p>
                                    </div>
                                    <div className='col-span-4 col-start-1 row-start-2 grid-cols-4 flex flex-row items-start'>
                                        <div className=' w-1/3'>
                                            <InputType
                                                name="lastTriglycerides"
                                                input="text"
                                                question=""
                                                handleChange={handleChange}
                                            />
                                        </div>
                                        <div className=' w-2/3 mr-3'>
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
                                    <div className='flex flex-auto'>
                                        <p className='font-semibold mb-0'>Última medición de ácido úrico y fecha</p>
                                    </div>
                                    <div className='col-span-4 col-start-1 row-start-2 grid-cols-4 flex flex-row items-start'>
                                        <div className=' w-1/3'>
                                            <InputType
                                                name="lastUricAcid"
                                                input="text"
                                                question=""
                                                handleChange={handleChange}
                                            />
                                        </div>
                                        <div className=' w-2/3 mr-3'>
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
                                <div className='flex flex-auto'>
                                    <p className='font-semibold mb-0'>Última medición de colesterol y fecha</p>
                                </div>
                                <div className='col-span-4 col-start-1 row-start-2 grid-cols-4 flex flex-row items-start'>
                                    <div className=' w-1/3'>
                                        <InputType
                                            name="lastCholesterol"
                                            input="text"
                                            question=""
                                            handleChange={handleChange}
                                        />
                                    </div>
                                    <div className=' w-2/3 mr-3'>
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
                        <div className='flex justify-end pr-8 h-11'>
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
    );
    return (
        <div>
            <SideBar />
            <div className="p-16 pt-20 sm:ml-64" data-aos="fade-up">
                {/*FROMULARIO INFORMACIÓN PERSONAL */}
                <FormInformacionPersonal />
                {/*FROMULARIO Evaluaciones Médicas Recientes */}
                <FormEvaluacionesRecientes />

            </div>
        </div>
    )
}