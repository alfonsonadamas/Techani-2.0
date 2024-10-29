import React from 'react'
import SideBar from '../components/SideBar';
import InputType from "../components/InputType";
import { Formik } from "formik";
import * as Yup from "yup";



export default function Registro2() {
    return (


    
        <div>
 
            <SideBar />
            {/*CONTENEDOR BLANCO */}
            <div className="p-16 pt-20 sm:ml-64" data-aos="fade-up">

                {/*TITULO */}
                <div className="flex flex-row">
                    <h2 className="font-bold">Historial Medico</h2>
                    <p className="pl-20 text-sm">Si no recuerda con exactitud la siguiente información, ingrese datos aproximados</p>
                </div>
                {/*FIN DE TITULO */}

                <hr className="border-gray-500 my-1 mr-1 mt-2 w-full" />

                <div id="container" className="  grid grid-flow-col grid-cols-3 justify-items-center" >

                    {/*LADO IZQUIERDO DEL FORMULARIO */}
                    <div id="left-size" className="flex flex-col items-stretch px-4">

                        <InputType
                            input="select"
                            question="¿Tienes Diabetes tipo 1?"
                            options={[{ option: "si", value: "Si" }, { option: "no", value: "No" }]}
                        />

                        <InputType
                            input="number"
                            question="Edad al debut"
                        />

                        <InputType
                            input="select"
                            question="¿Ha tenido o tiene algún trastorno? "
                            options={[{ option: "ninguno", value: "NINGUNO" }, { option: "ansiedad", value: "ANSIEDAD" }, { option: "depresion", value: "DEPRESIÒN" },
                            { option: "tdah", value: "TDAH" }, { option: "sindrome de asperger", value: "SINDROME DE ASPERGER" },
                            { option: "sindrome de espectro autista", value: "SINDROME DE ASPECTO AUTISTA" }, { option: "otro", value: "OTRO:" }
                            ]}
                        />

                        <InputType
                            input="select"
                            question="¿Ha tenido fracturas?"
                            options={[{ option: "si", value: "Si" }, { option: "no", value: "No" }]}
                        />


                        {/*Inicia el codigo raro */}
                        <div className="col-span-4 col-start-9 row-start-5 h-6 flex flex-col items-start mr-0 pr-0">

                            <div className='flex flex-auto pt-10 mt-4'>
                                <p className='font-semibold mb-0'>¿Hospitalizacion al debut?</p>
                            </div>


                            <div className='col-span-4 col-start-1 row-start-2 grid-cols-4 flex flex-row items-start'>


                                <div className=' w-1/3'>
                                    <InputType

                                        input="select"
                                        question=""
                                        options={[
                                            { option: "si", value: "Si" },
                                            { option: "no", value: "No" }
                                        ]}

                                    />
                                </div>


                                <div className='w-2/3 mr-3'>
                                    <InputType

                                        input="text"
                                        question=""

                                        placeholder="Causas"

                                    />

                                </div>

                            </div>


                        </div>
                        {/*Termina el codigo raro */}




                    </div>

                    {/*FIN DE LADO IZQUIERDO DEL FORMULARIO */}

                    {/*LADO MEIDO DEL FORMULARIO */}
                    <div id="mid-size" className="flex flex-col items-stretch px-4 space-y-4">

                        <InputType
                            input="date"
                            question="¿Fecha de diagnóstico?"
                        />

                        {/* Padecimientos */}
                        <div className="flex flex-col items-start">
                            <div className='flex flex-auto mt-4'>
                                <p className='font-semibold mb-0'>¿Tiene otros padecimientos?</p>
                            </div>
                            <div className='grid grid-cols-4 flex flex-row items-start mt-2'>
                                <div className='w-1/3'>
                                    <InputType
                                        input="select"
                                        question=""
                                        options={[
                                            { option: "si", value: "Si" },
                                            { option: "no", value: "No" }
                                        ]}
                                    />
                                </div>
                                <div className='w-2/3 mr-3'>
                                    <InputType
                                        input="text"
                                        question=""
                                        placeholder="¿Cuál?"
                                    />
                                </div>
                            </div>
                        </div>

                        {/* Tratamiento */}
                        <div className="flex flex-col items-start">
                            <div className='flex flex-auto mt-4'>
                                <p className='font-semibold mb-0'>¿Sigue tratamiento para el trastorno?</p>
                            </div>
                            <div className='grid grid-cols-4 flex flex-row items-start mt-2'>
                                <div className='w-1/3'>
                                    <InputType
                                        input="select"
                                        question=""
                                        options={[
                                            { option: "si", value: "Si" },
                                            { option: "no", value: "No" }
                                        ]}
                                    />
                                </div>
                                <div className='w-2/3 mr-3'>
                                    <InputType
                                        input="text"
                                        question=""
                                        placeholder="¿Cuál?"
                                    />
                                </div>
                            </div>
                        </div>

                        <InputType
                            input="select"
                            question="¿En qué etapa de crecimiento se encuentra actualmente?"
                            options={[
                                { option: "si", value: "Si" },
                                { option: "no", value: "No" }
                            ]}
                        />
                    </div>

                    {/*FIN DE LADO MEDIO DEL FORMULARIO */}

                    {/*LADO DERECHO DEL FORMULARIO */}
                    <div id="right-size" className="flex flex-col items-stretch px-4">

                        <InputType
                            input="text"
                            question="Glucosa al Debut"
                        />

                        <div className="flex flex-col items-start">
                            <div className='flex flex-auto mt-4'>
                                <p className='font-semibold mb-0'>¿Le han hecho un examen de neuropatia?</p>
                            </div>
                            <div className='grid grid-cols-4 flex flex-row items-start mt-2'>
                                <div className='w-1/3'>
                                    <InputType
                                        input="select"
                                        question=""
                                        options={[
                                            { option: "si", value: "Si" },
                                            { option: "no", value: "No" }
                                        ]}
                                    />
                                </div>
                                <div className='w-2/3 mr-3'>
                                    <InputType
                                        input="date "
                                        question=""
                                        placeholder="¿Cuando?"
                                    />
                                </div>
                            </div>
                        </div>

                        <InputType
                            input="select"
                            question="¿Ha tenido cirugias?"
                            options={[
                                { option: "si", value: "Si" },
                                { option: "no", value: "No" }
                            ]}
                        />

                        <div className="flex flex-col items-start">
                            <div className='flex flex-auto mt-4'>
                                <p className='font-semibold mb-0'>¿Tratamiento inicial para diabetes tipo 1?</p>

                            </div>
                            <div className='grid grid-cols-4 flex flex-row items-start mt-2'>
                                <div className='w-1/3'>
                                    <InputType
                                        input="select"
                                        question=""
                                        options={[
                                            { option: "si", value: "Si" },
                                            { option: "no", value: "No" }
                                        ]}
                                    />
                                </div>
                                <div className='w-2/3 mr-3'>
                                    <InputType
                                        input="text "
                                        question=""
                                        placeholder="¿Nombre de insulina?"
                                    />
                                </div>

                                <div className='w-2/3 mr-3'>
                                    <InputType
                                        input="text "
                                        question=""
                                        placeholder="Dosis"
                                    />
                                </div>
                            </div>
                        </div>

                    </div>
                    {/*LADO DERECHO DEL FORMULARIO */}

                </div>

                <hr className="border-gray-500 my-4 mr-10 mt-10 w-full" />

            </div>
            {/*FIN DEL CONTENEDOR BLANCO*/}
            
        </div>


    )
}
