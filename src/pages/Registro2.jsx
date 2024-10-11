import React from 'react'
import SideBar from '../components/SideBar';
import InputType from "../components/InputType";
import { Formik } from "formik";


const FormInformacionPersonal = () => (
    <div>
        <Formik
            initialValues={{
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
                specificPregnancyProblem: '',
            }}
            onSubmit={(values) => {
                console.log(values)

            }}
            validationSchema={console.log("")}
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
                            <p className="mb-2 text-sm text-red-500 dark:text-white w-1">
                                {errors.birthdate &&
                                    touched.birthdate &&
                                    errors.birthdate}{" "}
                            </p>
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
                                options={[{ option: "soltero", value: "Soltero" }, { option: "casado", value: "Casado" }, { option: "viudo", value: "Viudo" }]}
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
                                {errors.weeksAtBirth &&
                                    touched.weeksAtBirth &&
                                    errors.weeksAtBirth}{" "}
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
                            />
                        </div>
                        <div className="col-span-4 col-start-9 row-start-3">
                            <InputType
                                name="actualState"
                                input="number"
                                question="Estado actual de residencia"
                                handleChange={handleChange}
                            />
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
                        <div className="col-span-4 col-start-9 row-start-5">
                            <div className=' col-span-4 col-start-1 row-start-1 h-6'>
                                <p className='font-semibold mb-0'>Hubo complicaciones en el embarazo?</p>
                            </div>
                            <div className='col-span-4 col-start-1 row-start-2 grid-cols-4 grid grid-rows-1 gap-2 items-center grid-flow-row'>
                                <div className='col-span-1 col-start-1 justify-self-start'>
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
                                </div>
                                <div className='col-span-3 col-start-2 w-11/12'>
                                    <InputType
                                        name="specificPregnancyProblem"
                                        input="text"
                                        question=""
                                        handleChange={handleChange}
                                        placeholder="¿Cuál?"
                                        disabled={values.complicationsInPregnancy}
                                    />

                                </div>

                            </div>


                        </div>
                        {/* fin contenedor con  inputs en la misma linea */}
                        {/*FIN DEL LADO DERECHO */}
                    </div>
                    {/* FIN DE GRID */}
                    <div className='flex justify-end pr-8 h-11'>
                        <button
                            type="submit"
                            className="h-10 w-28 font-light place-self bg-azul text-white border-2 border-azul border-solid mt-4 px-3 rounded-lg  hover:bg-azulHover hover:border-azulHover"
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
                specificPregnancyProblem: '',
            }}
            onSubmit={(values) => {
                console.log(values)

            }}
            validationSchema={console.log("3")}
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
                                    <div className=' col-span-4 col-start-1 row-start-1 h-6'>
                                        <p className='font-semibold mb-0'>Última hemoglobina glicosilada y fecha</p>
                                    </div>
                                    <div className='col-span-4 col-start-1 row-start-2 grid-cols-4 grid grid-rows-1 gap-2 items-center grid-flow-row'>
                                        <div className='col-span-1 col-start-1 justify-self-start'>
                                            <InputType
                                                name="lastHemoglobin"
                                                input="text"
                                                question=""
                                                handleChange={handleChange}
                                            />
                                        </div>
                                        <div className='col-span-3 col-start-2 w-11/12'>
                                            <InputType
                                                name="dateLastHemoglobin"
                                                input="date"
                                                question=""
                                                handleChange={handleChange}
                                                disabled={values.complicationsInPregnancy}
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
                                    <div className=' col-span-4 col-start-1 row-start-1 h-6'>
                                        <p className='font-semibold mb-0'>Última medición de triglicéridos y fecha</p>
                                    </div>
                                    <div className='col-span-4 col-start-1 row-start-2 grid-cols-4 grid grid-rows-1 gap-2 items-center grid-flow-row'>
                                        <div className='col-span-1 col-start-1 justify-self-start'>
                                            <InputType
                                                name="lastTriglycerides"
                                                input="text"
                                                question=""
                                                handleChange={handleChange}
                                            />
                                        </div>
                                        <div className='col-span-3 col-start-2 w-11/12'>
                                            <InputType
                                                name="dateLastTriglycerides"
                                                input="date"
                                                question=""
                                                handleChange={handleChange}
                                                disabled={values.complicationsInPregnancy}
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
                                    <div className=' col-span-4 col-start-1 row-start-1 h-6'>
                                        <p className='font-semibold mb-0'>Última medición de ácido útico y fecha</p>
                                    </div>
                                    <div className='col-span-4 col-start-1 row-start-2 grid-cols-4 grid grid-rows-1 gap-2 items-center grid-flow-row'>
                                        <div className='col-span-1 col-start-1 justify-self-start'>
                                            <InputType
                                                name="lastUricAcid"
                                                input="text"
                                                question=""
                                                handleChange={handleChange}
                                            />
                                        </div>
                                        <div className='col-span-3 col-start-2 w-11/12'>
                                            <InputType
                                                name="dateLastUricAcid"
                                                input="date"
                                                question=""
                                                handleChange={handleChange}
                                                disabled={values.complicationsInPregnancy}
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
                        <div className=' col-span-4 col-start-1 row-start-1 h-6'>
                                <p className='font-semibold mb-0'>Última medición de colesterol y fecha</p>
                            </div>
                            <div className='col-span-4 col-start-1 row-start-2 grid-cols-4 grid grid-rows-1 gap-2 items-center grid-flow-row'>
                                <div className='col-span-1 col-start-1 justify-self-start'>
                                    <InputType
                                        name="lastCholesterol"
                                        input="text"
                                        question=""
                                        handleChange={handleChange}
                                    />
                                </div>
                                <div className='col-span-3 col-start-2 w-11/12'>
                                    <InputType
                                        name="dateLastCholesterol"
                                        input="date"
                                        question=""
                                        handleChange={handleChange}
                                    />

                                </div>

                            </div>
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
                        {/*contenedor con  inputs en la misma linea */}
                        
                        {/* fin contenedor con  inputs en la misma linea */}
                        {/*FIN DEL LADO DERECHO */}
                    </div>
                    {/* FIN DE GRID */}
                    <div className='flex justify-end pr-8 h-11'>
                        <button
                            type="submit"
                            className="h-10 w-28 font-light place-self bg-azul text-white border-2 border-azul border-solid mt-4 px-3 rounded-lg  hover:bg-azulHover hover:border-azulHover"
                        >
                            GUARDAR
                        </button>
                    </div>

                </form>
            )}
        </Formik>
    </div>
);
export default function Registro2() {
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
