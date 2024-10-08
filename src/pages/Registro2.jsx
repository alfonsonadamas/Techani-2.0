import React from 'react'
import SideBar from '../components/SideBar';
import InputType from "../components/InputType";
import { Formik } from "formik";
import * as Yup from "yup";

export default function Registro2() {
    return (
        <div>
            <SideBar />
            <div className="p-16 pt-20 sm:ml-64" data-aos="fade-up">
                <Formik
                    initialValues={{
                        fullName: "",
                        email: "",
                        birthdate: "",
                        biologicalSex: "",
                        placeOfBirth: "",
                        stateOfBirth: "",
                        currentState: "",
                        diagnosisDate: "",
                        debutAge: '',
                        wasHospitalized: "",
                        hospitalizationCause: "",
                        maxGlucoseDebut: '',
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
                            <h2 className="text-2xl font-semibold mb-4 mt-6">Información personal</h2>
                            <hr className="border-gray-500 my-4 mr-10" />
                            <div id="container" className=" grid grid-flow-col grid-cols-3 justify-items-center mt-8" >

                                <div id="left-size" className="flex flex-col items-stretch px-4">
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
                                    <InputType
                                        name="biologicalSex"
                                        input="select"
                                        question="Sexo Biologico"
                                        options={[{ option: "femenino", value: "Femenino" },
                                        { option: "masculino", value: "Masculino" }
                                        ]}
                                        handleChange={handleChange}
                                    />
                                    <p className="mb-2 text-sm text-red-500 dark:text-white w-1">
                                        {errors.biologicalSex &&
                                            touched.biologicalSex &&
                                            errors.biologicalSex}{" "}
                                    </p>
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
                                <div id="mid-size" className="flex flex-col items-stretch px-4">
                                <InputType
                                        name="email"
                                        input="email"
                                        question="Correo Electrónico"
                                        handleChange={handleChange}
                                    />
                                    <p className="mb-2 text-sm text-red-500 dark:text-white w-1">
                                        {errors.email &&
                                            touched.email &&
                                            errors.email}{" "}
                                    </p>
                                </div>
                                <div id="right-size" className="flex flex-col items-stretch px-4">
                                    <InputType
                                        input="select"
                                        question="Hola"
                                        options={[{ values: "Si", option: "si" }, { values: "No", option: "si" }]}
                                    />
                                </div>
                            </div>
                        </form>
                    )}
                </Formik>
            </div>
        </div>
    )
}
