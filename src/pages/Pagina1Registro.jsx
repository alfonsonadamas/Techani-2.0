import React, { useState } from "react";
import NavStepsRegistro from "../components/NavStepsRegistro";
import InputType from "../components/InputType";
import { Formik } from "formik";
import * as Yup from "yup";

export default function Pagina1Registro() {
  const [formIndex, setFormIndex] = useState(0);
  const [mouseEnter, setMouseEnter] = useState(false);
  const goPrev = true;
  const ContainerForm = () => {

  }
  const ArrowIcon = ({ goPrev, mouseEnter }) => (

    <svg
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
      strokeWidth="1.5"
      stroke="currentColor"
      className={
        goPrev ?
          "ml-3 w-4 h-4 duration-300 ease-out rotate-180"
          :
          "ml-3 w-4 h-4 duration-300 ease-out"
      }
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="m8.25 4.5 7.5 7.5-7.5 7.5"
      />
    </svg>
  );
  const nextForm = () => {
    setFormIndex((prevIndex) => prevIndex + 1);
  }
  const prevForm = () => {
    setFormIndex((prevIndex) => prevIndex - 1);
  }
  const showValues = (values) => {
    console.log(values);
  }
  const handleEnter = () => {
    setMouseEnter(true);
  }
  const handleLeave = () => {
    setMouseEnter(false);
  }

  const intitUserValues = (values) => {
    if (values.diabetesOption === "no") {
      console.log("este formulario no es para ti")
    } else {
      //inicializar datos del usuario en Supabase ...
    }

  }
  const validationSchema1 = Yup.object().shape({
    diabetesOption: Yup.string()
      .required("Este campo es requerido"),
    ageOption: Yup.string()
      .required("Este campo es requerido"),
  });


  const Form1 = ({ onNext, numberForm }) => (
    <Formik
      initialValues={{
        diabetesOption: "",
        ageOption: "",
      }}
      onSubmit={(values) => {
        intitUserValues(values)
        onNext()
      }}
      validationSchema={validationSchema1}
    >
      {({ handleSubmit,
        handleChange,
        values,
        errors,
        touched, }) => (
        <form onSubmit={handleSubmit}>

          <div className="bg-gray border-gray-700 w-fit shadow-lg flex flex-col items-center"
            style={{ backgroundColor: "#E7E7E7", width: "auto", height: "100vh" }}
          >
            <div
              className="bg-white border-radius rounded-xl  flex w-full h-full flex-col shadow-md"
              style={{ maxWidth: "1080px", maxHeight: "800px", marginBlockEnd: "100px", marginBlockStart: "110px" }}
            >
              <div style={{ margin: "30px" }}>
                <div className="flex justify-between items-start h-10">
                  <b><h1 className="mt-6" style={{ fontSize: "22px" }}>Hola</h1></b>
                  <label htmlFor="pageNumber" className="self-end py-6" style={{ color: "#C3C3C3" }}>{numberForm} de 7</label>
                </div>
                <br />
                <p className="mt-3 ">Este proyecto web permite monitorear los niveles de glucosa de pacientes con diabetes tipo 1 en tiempo real. Ofrece gráficos y alertas personalizadas para el control eficaz de la glucosa, facilitando la toma de decisiones médicas. Mejora la calidad de vida y promueve un seguimiento continuo y seguro.</p>
                <br />
                <p>Con el fin de ser de la mayor utilidad posible estamos enfocados en monitoireo de la diabetes tipo 1.</p>
                <br />

                <InputType
                  name="diabetesOption"
                  input="select"
                  question="¿Tienes Diabetes tipo 1?"
                  options={[{ option: "no", value: "No" },
                  { option: "si", value: "Si" }]}
                  handleChange={handleChange}
                />
                <p className="mb-4 text-sm text-red-500 dark:text-white w-full">
                  {errors.diabetesOption}
                </p>
                <InputType
                  name="ageOption"
                  input="select"
                  question="¿Eres mayor de edad?"
                  options={[{ option: "no", value: "No" },
                  { option: "si", value: "Si" }]}
                  handleChange={handleChange}
                />
                <p className="mb-4 text-sm text-red-500 dark:text-white w-full">
                  {errors.ageOption &&
                    touched.ageOption &&
                    errors.ageOption}{" "}
                </p>



                <p className="text-sm mt-10">⚠️En caso de ser menor, llama a un padre o tutor para que te ayude a llenar el registro</p>

                <div className="flex justify-end ">
                  <button
                    type="submit"
                    className="font-light place-self text-white mt-4 px-3 rounded-lg  hover:bg-blue-200 flex items-center justify-center"
                    style={{ backgroundColor: "#277BC0", border: "1px ridge #13BAFF" }}
                  //onMouseEnter={handleEnter}
                  //onMouseLeave={handleLeave}
                  >
                    SIGUIENTE <ArrowIcon mouseEnter={mouseEnter} className="text-lg text-white" />
                  </button>
                </div>

              </div>

            </div>
          </div>
        </form>
      )}
    </Formik>
  );

  const validationSchema2 = Yup.object().shape({
    fullName: Yup.string()
      .matches(/^[^\d]+$/, "El campo debe ser texto.")
      .required("Este campo es requerido."),
    email: Yup.string().required("Este campo es requerido."),
    birthdate: Yup.date().required("Este campo es requerido.").max(new Date(), "La fecha no puede ser posterior a hoy."),
    biologicalSex: Yup.string().required("Este campo es requerido."),
    placeOfBirth: Yup.string().required("Este campo es requerido.").max(50, "La cantidad de caracteres debe ser menor a 50."),
    stateOfBirth: Yup.string().required("Este campo es requerido.").max(50, "La cantidad de caracteres debe ser menor a 50."),
    currentState: Yup.string().required("Este campo es requerido.").max(50, "La cantidad de caracteres debe ser menor a 50."),
    diagnosisDate: Yup.date().required("Este campo es requerido.").max(new Date(), "La fecha no puede ser posterior a hoy."),
    debutAge: Yup.number().required("Este campo es requerido.").positive("La edad debe ser un número positivo.")
      .integer("el número debe ser entero.").min(0, "La edad debe ser mayor a 0.").max(110, "Rectifique la edad."),
    hospitalizationCause: Yup.string().max(50, "La cantidad de caracteres debe ser menor a 100."),
    maxGlucoseDebut: Yup.number().required("Este campo es requerido.").positive("La edad debe ser un número positivo.")
      .min(0, "La edad debe ser mayor a 0."),
  });

  const Form2 = ({ onNext, onPrev, numberForm }) => (

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
        showValues(values)
        onNext()
      }}
      validationSchema={console.log("")}
    >
      {({ handleSubmit,
        handleChange,
        values,
        errors,
        touched, }) => (
        <form onSubmit={handleSubmit}>


          <div className="bg-slate-300 w-full h-full shadow-xl flex flex-col items-center justify-stretch min-h-screen flex-grow"
          >
            <div
              className="bg-white rounded-xl w-11/12 min-h-[600px] mt-28 mb-8 flex flex-col shadow-xl justify-items-center border-gray-300"
              style={{ borderWidth: 1, minHeight: "600px"}}
            >
              <div className="flex justify-end items-center h-10 ">
                <label htmlFor="pageNumber" className="self-end mt-4 mr-10 opacity-50">{numberForm} de 7</label>
              </div>
              <div id="container" className=" flex-1 grid grid-flow-col grid-cols-2 justify-items-end" >
                {/*LADO IZQUIERDO DEL FORMULARIO */}
                <div id="left-size" className="flex flex-col items-stretch pl-20 border-r-2 border-gray-500">

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
                  <InputType
                    name="stateOfBirth"
                    input="text"
                    question="Estado de Nacimiento"
                    handleChange={handleChange}
                  />
                  <p className="mb-2 text-sm text-red-500 dark:text-white w-1">
                    {errors.stateOfBirth &&
                      touched.stateOfBirth &&
                      errors.stateOfBirth}{" "}
                  </p>

                </div>

                <div id="right size" className=" flex flex-col items-stretch pl-20">
                  <InputType
                    name="currentState"
                    input="text"
                    question="¿En que estado radica actualmente?"
                    handleChange={handleChange}
                  />
                  <p className="mb-2 text-sm text-red-500 dark:text-white w-1">
                    {errors.currentState &&
                      touched.currentState &&
                      errors.currentState}{" "}
                  </p>
                  {/*Texto que de apoyo al usuario */}
                  <p className="mb-2 text-sm text-red-800 dark:text-white w-1 font-semibold" style={{ maxWidth: "400px" }}>
                    -- Si no recuerda con exactitud la siguiente información <br />ingrese datos aproximados --
                  </p>

                  <InputType
                    name="diagnosisDate"
                    input="date"
                    question="Fecha en que fue diagnosticado"
                    handleChange={handleChange}
                  />
                  <p className="mb-2 text-sm text-red-500 dark:text-white w-1">
                    {errors.diagnosisDate &&
                      touched.diagnosisDate &&
                      errors.diagnosisDate}{" "}
                  </p>
                  <InputType
                    name="debutAge"
                    input="number"
                    question="¿Que edad tenia cuando debutó?"
                    handleChange={handleChange}
                  />
                  <p className="mb-2 text-sm text-red-500 dark:text-white w-1">
                    {errors.debutAge &&
                      touched.debutAge &&
                      errors.debutAge}{" "}
                  </p>
                  <InputType
                    name="wasHospitalized"
                    input="select"
                    question="¿Estuvo hospitalizado cuando debutó?"
                    options={[{ option: "si", value: "Si" }, { option: "no", value: "No" }]}
                    handleChange={handleChange}
                  />
                  <p className="mb-2 text-sm text-red-500 dark:text-white w-1">
                    {errors.wasHospitalized &&
                      touched.wasHospitalized &&
                      errors.wasHospitalized}{" "}
                  </p>

                  {values.wasHospitalized === "si" && (
                    <div>
                      <InputType
                        name="hospitalizationCause"
                        input="text"
                        question="¿Cuál fue la causa?"
                        handleChange={handleChange}
                      />
                      <p className="mb-2 text-sm text-red-500 dark:text-white w-1">
                        {errors.hospitalizationCause &&
                          touched.hospitalizationCause &&
                          errors.hospitalizationCause}{" "}
                      </p>
                    </div>
                  )}

                  <InputType
                    name="maxGlucoseDebut"
                    input="number"
                    question="¿Cual fue la glucosa máxima con la que debutó?"
                    options={[{ option: "si", value: "Si" }, { option: "no", value: "No" }]}
                    handleChange={handleChange}
                  />
                  <p className="mb-2 text-sm text-red-500 dark:text-white w-1">
                    {errors.maxGlucoseDebut &&
                      touched.maxGlucoseDebut &&
                      errors.maxGlucoseDebut}{" "}
                  </p>

                </div>
              </div>
              <div className="grid grid-flow-col grid-cols-2 justify-items-center-center mb-4 mx-4"  >
                <div className="justify-self-center mx-4">
                  <button
                    className="self-start font-light place-self text-white  px-4 rounded-lg  hover:bg-blue-200 flex items-center justify-center text-lg pr-4 pl-0 "
                    style={{ backgroundColor: "#277BC0", border: "1px ridge #13BAFF" }}
                    onClick={onPrev}
                  >
                    <ArrowIcon goPrev={goPrev} className="text-lg text-white " />
                    Regresar
                  </button>
                </div>
                <div className="flex flex-col justify-self-center">
                  <button
                    type="submit"
                    className="self-end font-light place-self bg-blue-200 text-white  mr-4 rounded-lg  hover:bg-blue-200 flex items-center justify-center text-lg pl-2"
                    style={{ backgroundColor: "#277BC0", border: "1px ridge #13BAFF" }}
                  >
                    Guardar y siguiente
                    <div className="text-lg text-white pr-2 "><ArrowIcon mouseEnter={mouseEnter} /></div>

                  </button>
                </div>
              </div>
            </div>
          </div>
        </form>
      )}
    </Formik>
  );

  const Form3 = ({ onNext, onPrev, numberForm }) => (
    <Formik
      initialValues={{
        initialType: "",
        dosis: 0,
      }}
      onSubmit={(values) => {
        onNext()
      }
      }
    >
      {({ handleSubmit,
        handleChange,
        values,
        errors,
        touched, }) => (
        <form onSubmit={handleSubmit}>


          <div className="bg-slate-300 w-full h-full shadow-xl flex flex-col items-center min-h-screen flex-grow"
          >
            <div
              className="bg-white rounded-xl w-11/12 h-5/6 mt-28 mb-10 flex flex-col shadow-xl border-gray-300"
              style={{ borderWidth: 1, minHeight: "600px" }}
            >
              <div className="flex justify-end items-start h-10 ">
                <label htmlFor="pageNumber" className="self-end mt-4 mr-10 opacity-50">{numberForm} de 7</label>
              </div>
              <div id="container" className="grid grid-flow-col grid-cols-2 justify-items-stretch" >
                {/*LADO IZQUIERDO DEL FORMULARIO */}
                <div id="left-size" className="flex flex-col items-stretch pl-20 border-r-2 border-gray-400">
                  <InputType
                    input="number"
                    question={(
                      <>
                        ¿Cuanto tiempo duro la luna de miel de <br /> su diabetes tipo 1? <p className="text-xs inline">(En meses)</p>
                      </>
                    )}
                    handleChange={handleChange}
                  />
                  <p className="mb-2 text-sm text-red-500 dark:text-white w-1">
                    {errors.wasHospitalized &&
                      touched.wasHospitalized &&
                      errors.wasHospitalized}{" "}
                  </p>
                  <InputType
                    name="initialType"
                    input="select"
                    question={(
                      <>
                        ¿Cuál era el tratamiento que utilizaba inicialmente<br /> para su diabetes tipo 1 y en qué dosis?
                      </>
                    )}
                    options={[{ option: "insulina lenta", value: "Insulina Lenta" },
                    { option: "insulina rapida", value: "Insulina Rápida" },
                    { option: "metformina", value: "Metformina" },
                    { option: "otro", value: "Otro" }
                    ]}
                    handleChange={handleChange}
                  />

                  {values.initialType === "otro" && (
                    <div className="flex flex-row">
                      <InputType
                        name="nombre"
                        input="text"
                        question="Nombre"
                        handleChange={handleChange}
                      />
                      <InputType
                        name="dosis"
                        input="number"
                        question="Dosis"
                        handleChange={handleChange}
                      />
                    </div>
                  )}


                  <InputType
                    input="select"
                    question="¿Donde sigue su tratamiento actualmente?"
                    options={[{ option: "hospital", value: "Hospital" }, { option: "pendiente", value: "PENDIENTE" }]}
                  />

                  <InputType
                    input="date"
                    question={(
                      <>
                        ¿Cuál es su ultima Hemoglobina glicosilada y<br /> fecha en que se obtuvo?
                      </>
                    )}

                  />

                  

                </div>
                {/*FIN DE LADO IZQUIERDO DEL FORMULARIO */}


                {/*LADO DERECHO  DEL FORMULARIO */}
                <div id="right-size"
                  className="flex flex-col justify-self-start pl-20"
                >
                  <InputType
                    input="text"
                    question="¿Cual es su ocupacion?"

                  />
                  <InputType
                    input="number"
                    question="¿Cual es su peso?"
                    options={[{ option: "0", value: "o kg" }, { option: "70", value: "70 kg" }]}
                  />
                  <InputType
                    input="text"
                    question="¿Cual es su talla?"
                  />

                  <InputType
                    input="text"
                    question={(
                      <>
                        ¿Cuál es su medicion de presion<br /> arterial el dia de hoy?
                      </>
                    )}
                  />
                  <InputType
                    input="text"
                    question={(
                      <>
                        ¿Cuál es su medicion de glucosa<br />en ayunas el dia de hoy?
                      </>
                    )}

                  />


                </div>
                {/*FIN DEL LADO DERECHO DEL FORMULARIO */}
              </div>
              <div className="grid grid-flow-col justify-stretch "  >
                <div className="justify-self-start mx-4 mb-8">
                  <button
                    className="self-start font-light place-self text-white mt-4 px-4 rounded-lg  hover:bg-blue-200 flex items-center justify-center text-lg pr-4 pl-0 "
                    style={{ backgroundColor: "#277BC0", border: "1px ridge #13BAFF" }}
                    onClick={onPrev}
                  >
                    <ArrowIcon goPrev={goPrev} className="text-lg text-white " />
                    Regresar
                  </button>
                </div>
                <div className="flex flex-col justify-self-end">
                  <button
                    type="submit"
                    className="self-end font-light place-self text-white mt-4 mr-4 rounded-lg  hover:bg-blue-200 flex items-center justify-center text-lg pl-2"
                    style={{ backgroundColor: "#277BC0", border: "1px ridge #13BAFF" }}
                  >
                    Guardar y siguiente
                    <div className="text-lg text-white pr-2 "><ArrowIcon mouseEnter={mouseEnter} /></div>

                  </button>
                </div>
              </div>

            </div>
          </div>
        </form>
      )}
    </Formik>
  );

  const validationSchema6 = Yup.object().shape({
    antecedentT1: Yup.string().required("Este campo es requerido"),
    antecedentT2: Yup.string().required("Este campo es requerido"),
    antecedentHyper: Yup.string().required("Este campo es requerido"),
    typeOfCancer: Yup.string().max(255, "La cantidad de caracteres máx. es de 255"),
    weightAtBirth: Yup.number().required("Este campo es requerido.").positive("La edad debe ser un número positivo.")
      .min(1, "la estatura debe ser mayor a 0."),
    sizeAtBirth: Yup.number().required("Este campo es requerido.").positive("La edad debe ser un número positivo.")
      .min(1, "La talla debe ser mayor a 0."),
    apgarScore: Yup.number().required("Este campo es requerido.").positive("La edad debe ser un número positivo.")
      .min(0, "Su calificación debe ser mayor que 0.").max(10, "Su calificación debe ser menor que 10"),
    typeOfDelivery: Yup.string().required("Este campo es requerido"),
    weeksAtBirth: Yup.number().required("Este campo es requerido").positive("El campo debe ser un número positivo"),
  });
  const Form6 = ({ onNext, onPrev, numberForm }) => (

    <Formik
      initialValues={{
        antecedentT1: "",
        antecedentT2: "",
        antecedentHyper: "",
        antecedentCancer: "",
        typeOfCancer: "",
        weightAtBirth: '',
        sizeAtBirth: '',
        apgarScore: '',
        typeOfDelivery: "",
        weeksAtBirth: "",

      }}
      onSubmit={(values) => {
        showValues(values)
        onNext()
      }}
      validationSchema={console.log("aqui va el validationSchema6")}
    >
      {({ handleSubmit,
        handleChange,
        values,
        errors,
        touched, }) => (
        <form onSubmit={handleSubmit}>


          <div className="bg-slate-300 w-full h-full shadow-xl flex flex-col items-center min-h-screen flex-grow"
          >
            <div
              className="bg-white rounded-xl w-11/12 h-5/6 mt-28 mb-10 flex flex-col shadow-xl border-gray-300"
              style={{ borderWidth: 1, minHeight: "600px" }}
            >
              <div className="flex justify-end items-start h-10 ">
                <label htmlFor="pageNumber" className="self-end mt-4 mr-10 opacity-50">{numberForm} de 7</label>
              </div>
              <div id="container" className="grid grid-flow-col grid-cols-2 justify-items-stretch" >
                {/*LADO IZQUIERDO DEL FORMULARIO */}
                <div id="left-size" className="flex flex-col items-stretch pl-20 border-r-2 border-gray-400">

                  <h2 className="font-bold pt-4 text-base">
                    {(<>
                      ¿Sus padres o abuelos padecen o<br />padecieron alguna de las siguientes<br />enfermedades crónicas?
                    </>
                    )}
                  </h2>
                  <hr className="border-gray-300 my-4 mr-10" />
                  <br />
                  <InputType
                    name="antecedentT1"
                    input="select"
                    options={[{ option: "si", value: "Si" },
                    { option: "no", value: "No" }
                    ]}
                    question="Diabetes tipo 1"
                    handleChange={handleChange}
                  />
                  <p className="mb-2 text-sm text-red-500 dark:text-white w-1">
                    {errors.antecedentT1 &&
                      touched.antecedentT1 &&
                      errors.antecedentT1}{" "}
                  </p>
                  <InputType
                    name="antecedentT2"
                    input="select"
                    options={[{ option: "si", value: "Si" },
                    { option: "no", value: "No" }
                    ]}
                    question="Diabetes tipo 2"
                    handleChange={handleChange}
                  />
                  <p className="mb-2 text-sm text-red-500 dark:text-white w-1">
                    {errors.antecedentT2 &&
                      touched.antecedentT2 &&
                      errors.antecedentT2}{" "}
                  </p>
                  <InputType
                    name="antecedentHyper"
                    input="select"
                    options={[{ option: "si", value: "Si" },
                    { option: "no", value: "No" }
                    ]}
                    question="Hipertensión"
                    handleChange={handleChange}
                  />
                  <p className="mb-2 text-sm text-red-500 dark:text-white w-1">
                    {errors.antecedentHyper &&
                      touched.antecedentHyper &&
                      errors.antecedentHyper}{" "}
                  </p>
                  <InputType
                    name="antecedentCancer"
                    input="select"
                    options={[{ option: "si", value: "Si" },
                    { option: "no", value: "No" }
                    ]}
                    question="¿Algún tipo de Cáncer?"
                    handleChange={handleChange}
                  />
                  <p className="mb-2 text-sm text-red-500 dark:text-white w-1">
                    {errors.antecedentCancer &&
                      touched.antecedentCancer &&
                      errors.antecedentCancer}{" "}
                  </p>
                  {values.antecedentCancer === "si" && (
                    <div className="flex flex-col justify-between">
                      <InputType
                        name="typeOfCancer"
                        input="text"
                        question={<>
                          Especifique
                          <span className="text-xs block">(Si es más de un tipo, separe por comas)</span>
                        </>}
                        handleChange={handleChange}

                      />
                      <p className="mb-2 text-sm text-red-500 dark:text-white w-1">
                        {errors.typeOfCancer &&
                          touched.typeOfCancer &&
                          errors.typeOfCancer}{" "}
                      </p>
                    </div>
                  )}

                </div>

                <div id="right size"
                  className="flex flex-col justify-self-stretch pl-20"
                >
                  <InputType
                    name="weightAtBirth"
                    input="number"
                    question="¿Cuánto pesó usted al nacer?"
                    handleChange={handleChange}
                  />
                  <p className="mb-2 text-sm text-red-500 dark:text-white w-1">
                    {errors.weightAtBirth &&
                      touched.weightAtBirth &&
                      errors.weightAtBirth}{" "}
                  </p>
                  <InputType
                    name="sizeAtBirth"
                    input="number"
                    question="¿Cuál fue su talla al nacer?"
                    handleChange={handleChange}
                  />
                  <p className="mb-2 text-sm text-red-500 dark:text-white w-1">
                    {errors.sizeAtBirth &&
                      touched.sizeAtBirth &&
                      errors.sizeAtBirth}{" "}
                  </p>

                  <InputType
                    name="apgarScore"
                    input="number"
                    question="¿Cuál fue su calificación de Apgar al nacer?"
                    handleChange={handleChange}
                  />
                  <p className="mb-2 text-sm text-red-500 dark:text-white w-1">
                    {errors.apgarScore &&
                      touched.apgarScore &&
                      errors.apgarScore}{" "}
                  </p>
                  <InputType
                    name="typeOfDelivery"
                    input="select"
                    question="¿Nació por parto natural o por cesárea?"
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
                  <InputType
                    name="weeksAtBirth"
                    input="number"
                    question="¿A las cuántas semanas nació?"
                    options={[{ option: "parto natural", value: "Parto Natural" },
                    { option: "cesarea", value: "Cesárea" }
                    ]}
                    handleChange={handleChange}
                  />
                  <p className="mb-2 text-sm text-red-500 dark:text-white w-1">
                    {errors.weeksAtBirth &&
                      touched.weeksAtBirth &&
                      errors.weeksAtBirth}{" "}
                  </p>

                </div>
              </div>
              <div className="grid grid-flow-col justify-stretch"  >
                <div className="justify-self-start mx-4 mb-8">
                  <button
                    className="self-start font-light place-self text-white mt-4 px-4 rounded-lg  hover:bg-blue-200 flex items-center justify-center text-lg pr-4 pl-0 "
                    style={{ backgroundColor: "#277BC0", border: "1px ridge #13BAFF" }}
                    onClick={onPrev}
                  >
                    <ArrowIcon goPrev={goPrev} className="text-lg text-white " />
                    Regresar
                  </button>
                </div>
                <div className="flex flex-col justify-self-end">
                  <button
                    type="submit"
                    className="self-end font-light place-self text-white mt-4 mr-4 rounded-lg  hover:bg-blue-200 flex items-center justify-center text-lg pl-2"
                    style={{ backgroundColor: "#277BC0", border: "1px ridge #13BAFF" }}
                  >
                    Guardar y siguiente
                    <div className="text-lg text-white pr-2 "><ArrowIcon mouseEnter={mouseEnter} /></div>

                  </button>
                </div>
              </div>
            </div>
          </div>
        </form>
      )}
    </Formik>
  );

  const Form7 = ({ onNext, onPrev, numberForm }) => (

    <Formik
      initialValues={{
        complicationsInPregnancy: "",
        hadASurgery: "",
        typeOfSurgery: "",
        hadAFracture: "",
        typeOfFracture: "",
        bloodPressure: "",
        colesterolHDL: "",
        timeInRange: "",
        avgGlucose: "",
      }}
      onSubmit={(values) => {
        showValues(values)
        onNext()
      }}
      validationSchema={console.log("aqui va el validationSchema6")}
    >
      {({ handleSubmit,
        handleChange,
        values,
        errors,
        touched, }) => (
        <form onSubmit={handleSubmit}>


          <div className="bg-slate-300 w-full h-full shadow-xl flex flex-col items-center min-h-screen flex-grow"
          >
            <div
              className="bg-white rounded-xl w-11/12 h-5/6 mt-28 mb-10 flex flex-col shadow-xl border-gray-300"
              style={{ borderWidth: 1, minHeight: "600px" }}
            >
              <div className="flex justify-end items-start h-10 ">
                <label htmlFor="pageNumber" className="self-end mt-4 mr-10 opacity-50">{numberForm} de 7</label>
              </div>
              <div id="container" className="grid grid-flow-col grid-cols-2 justify-items-stretch" >
                {/*LADO IZQUIERDO DEL FORMULARIO */}
                <div id="left-size" className="flex flex-col items-stretch gap-2 pl-20 border-r-2 border-gray-400">

                  <InputType
                    name="complicationsInPregnancy"
                    input="select"
                    question={(<>
                      ¿Hubo algún contratiempo<br />durante el embarazo?
                    </>
                    )}
                    options={[{ option: "si", value: "Si" },
                    { option: "no", value: "No" }
                    ]}
                    handleChange={handleChange}
                  />
                  <p className="mb-2 text-sm text-red-500 dark:text-white w-1">
                    {errors.complicationsInPregnancy &&
                      touched.complicationsInPregnancy &&
                      errors.complicationsInPregnancy}{" "}
                  </p>
                  {values.complicationsInPregnancy === "si" && (
                    <div>
                      <InputType
                        name="specificPregnancyProblem"
                        input="text"
                        question="Especifique"
                        handleChange={handleChange}
                      />
                      <p className="mb-2 text-sm text-red-500 dark:text-white w-1">
                        {errors.specificPregnancyProblem &&
                          touched.specificPregnancyProblem &&
                          errors.specificPregnancyProblem}{" "}
                      </p>
                    </div>
                  )}
                  <InputType
                    name="bloodType"
                    input="text"
                    question="¿Cuál es su tipo de sangre?"
                    handleChange={handleChange}
                  />
                  <p className="mb-2 text-sm text-red-500 dark:text-white w-1">
                    {errors.bloodType &&
                      touched.bloodTypebloodType &&
                      errors.bloodType}{" "}
                  </p>

                  <InputType
                    name="hadASurgery"
                    input="select"
                    question="¿Ha tenido alguna cirugía?"
                    options={[{ option: "si", value: "Si" },
                    { option: "no", value: "No" }
                    ]}
                    handleChange={handleChange}
                  />
                  <p className="mb-2 text-sm text-red-500 dark:text-white w-1">
                    {errors.hadASurgery &&
                      touched.hadASurgery &&
                      errors.hadASurgery}{" "}
                  </p>
                  {values.hadASurgery && (
                    <div>
                      <InputType
                        name="typeOfSurgery"
                        input="text"
                        question="Especifique"
                        handleChange={handleChange}
                      />
                      <p className="mb-2 text-sm text-red-500 dark:text-white w-1">
                        {errors.typeOfSurgery &&
                          touched.typeOfSurgery &&
                          errors.typeOfSurgery}{" "}
                      </p>
                    </div>
                  )}
                  <InputType
                    name="hadAFracture"
                    input="select"
                    question="¿Ha tenido alguna fractura?"
                    options={[{ option: "si", value: "Si" },
                    { option: "no", value: "No" }
                    ]}
                    handleChange={handleChange}
                  />
                  <p className="mb-2 text-sm text-red-500 dark:text-white w-1">
                    {errors.hadAFracture &&
                      touched.hadAFracture &&
                      errors.hadAFracture}{" "}
                  </p>
                  {values.hadAFracture === "si" && (
                    <div>
                      <InputType
                        name="typeOfFracture"
                        input="text"
                        question="Especifique"
                        handleChange={handleChange}
                        emergent="si"
                      />
                      <p className="mb-2 text-sm text-red-500 dark:text-white w-1">
                        {errors.typeOfFracture &&
                          touched.typeOfFracture &&
                          errors.typeOfFracture}{" "}
                      </p>
                    </div>
                  )}

                </div>

                <div id="right size"
                  className="flex flex-col justify-self-stretch items-stretch pl-20"
                >
                  <div><br /></div>
                  <InputType
                    name="bloodPressure"
                    input="text"
                    question="Presión"
                    handleChange={handleChange}
                  />
                  <p className="mb-2 text-sm text-red-500 dark:text-white w-1">
                    {errors.bloodPressure &&
                      touched.bloodPressure &&
                      errors.bloodPressure}{" "}
                  </p>
                  <InputType
                    name="colesterolHDL"
                    input="text"
                    question="Colesterol HDL"
                    handleChange={handleChange}
                  />
                  <p className="mb-2 text-sm text-red-500 dark:text-white w-1">
                    {errors.size &&
                      touched.size &&
                      errors.size}{" "}
                  </p>
                  <InputType
                    name="timeInRange"
                    input="text"
                    question="Tiempo en rango"
                    handleChange={handleChange}
                  />
                  <p className="mb-2 text-sm text-red-500 dark:text-white w-1">
                    {errors.size &&
                      touched.size &&
                      errors.size}{" "}
                  </p>
                  <InputType
                    name="avgGlucose"
                    input="text"
                    question="Glucosa promedio"
                    handleChange={handleChange}
                  />
                  <p className="mb-2 text-sm text-red-500 dark:text-white w-1">
                    {errors.size &&
                      touched.size &&
                      errors.size}{" "}
                  </p>


                </div>
              </div>
              <div className="grid grid-flow-col justify-stretch "  >
                <div className="justify-self-start mx-4 mb-8">
                  <button
                    className="self-start font-light place-self text-white mt-4 px-4 rounded-lg  hover:bg-blue-200 flex items-center justify-center text-lg pr-4 pl-0 "
                    style={{ backgroundColor: "#277BC0", border: "1px ridge #13BAFF" }}
                    onClick={onPrev}
                  >
                    <ArrowIcon goPrev={goPrev} className="text-lg text-white " />
                    Regresar
                  </button>
                </div>
                <div className="flex flex-col justify-self-end">
                  <button
                    type="submit"
                    className="self-end font-light place-self text-white mt-4 mr-4 rounded-lg  hover:bg-blue-200 flex items-center justify-center text-lg px-7"
                    style={{ backgroundColor: "#277BC0", border: "1px ridge #13BAFF" }}
                  >
                    Guardar
                  </button>
                </div>
              </div>
            </div>
          </div>
        </form>
      )}
    </Formik>
  );

  return (
    <div>
      <NavStepsRegistro />
      {formIndex === 0 && <Form1 onNext={nextForm} numberForm={1} />}
      {formIndex === 1 && <Form2 onNext={nextForm} onPrev={prevForm} numberForm={2} />}
      {formIndex === 2 && <Form3 onNext={nextForm} onPrev={prevForm} numberForm={3} />}
      {formIndex === 3 && <Form6 onNext={nextForm} onPrev={prevForm} numberForm={6} />}
      {formIndex === 4 && <Form7 onNext={nextForm} onPrev={prevForm} numberForm={7} />}
    </div>
  );
}
