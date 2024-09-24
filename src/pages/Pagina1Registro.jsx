import React, { useState } from "react";
import NavStepsRegistro from "../components/NavStepsRegistro";
import InputType from "../components/InputType";
import { Formik } from "formik";

export default function Pagina1Registro() {
  const [formIndex, setFormIndex] = useState(0);



  const updateRegistro = async ({ diabetesOption, ageOption }, { setError }) => {
    try {
      if (diabetesOption === "si") {
        window.open("", "_blank").document.write("<h1>Felicidades!</h1>");
      } else {
        window.open("", "_blank").document.write("<h1>Este formulario no es para ti, gracias.</h1>");
        window.open("", "_blank").document.close();
      }

    } catch (error) {
      console.log(error)
    }
  };
  const nextForm = () => {
    setFormIndex((prevIndex) => prevIndex + 1);
  }
  const prevForm = () => {
    setFormIndex((prevIndex) => prevIndex - 1);
  }

  const Form1 = ({ onNext }) => (
    <Formik
      initialValues={{
        diabetesOption: "",
        ageOption: "",
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
                  <label htmlFor="pageNumber" className="self-end py-6" style={{ color: "#C3C3C3" }}>1 de 5</label>
                </div>
                <br />
                <p className="mt-3 ">Este proyecto web permite monitorear los niveles de glucosa de pacientes con diabetes tipo 1 en tiempo real. Ofrece gráficos y alertas personalizadas para el control eficaz de la glucosa, facilitando la toma de decisiones médicas. Mejora la calidad de vida y promueve un seguimiento continuo y seguro.</p>
                <br />
                <p>Con el fin de ser de la mayor utilidad posible estamos enfocados en monitoireo de la diabetes tipo 1.</p>
                <br />

                <InputType
                  input="select"
                  options={[{ option: "no", value: "No" },
                  { option: "si", value: "Si" }]}
                  question="¿Tienes Diabetes tipo 1?"
                />
                <br />
                <InputType
                  input="select"
                  question="¿Eres mayor de edad?"
                  options={[{ option: "no", value: "No" },
                  { option: "si", value: "Si" }
                  ]}
                />



                <p className="text-sm mt-10">⚠️En caso de ser menor, llama a un padre o tutor para que te ayude a llenar el registro</p>

                <div className="flex justify-end ">
                  <button
                    type="submit"
                    className="font-light place-self text-white text-white mt-4 px-4 rounded-lg  hover:bg-blue-200 flex items-center justify-center"
                    style={{ backgroundColor: "#277BC0", border: "1px ridge #13BAFF" }}
                  >
                    SIGUIENTE <b className="text-lg text-white pl-2">&gt;</b>
                  </button>
                </div>

              </div>

            </div>
          </div>
        </form>
      )}
    </Formik>
  );
  const Form2 = ({ onNext, onPrev }) => (
    <Formik
      initialValues={{

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


          <div className="bg-gray border-gray-700 w-fit shadow-lg flex flex-col items-center"
            style={{ backgroundColor: "#E7E7E7", width: "auto", height: "100vh" }}
          >
            <div
              className="bg-white border-radius rounded-xl  flex w-full h-full flex-col shadow-md"
              style={{ maxWidth: "90%", maxHeight: "80%", marginBlockStart: "110px" }}
            >
              <div className="flex justify-end items-start h-10">
                <label htmlFor="pageNumber" className="self-end mt-4 mr-4" style={{ color: "#C3C3C3" }}>2 de 5</label>
              </div>
              <div className="grid grid-flow-col justify-stretch"  >
                {/*LADO IZQUIERDO DEL FORMULARIO */}
                <div htmlFor="left-size" className="justify-self-start pl-20 mr-4" style={{maxWidth: "800px", borderRight: '1px solid black' }}>
                  
                  <InputType
                    input="text"
                    question="Nombre Completo"
                  />
                  <InputType
                    input="email"
                    question="Correo Electrónico"
                  />
                  <InputType
                    input="date"
                    question="Fecha de Nacimiento"
                  />
                  <InputType
                    input="select"
                    question="Sexo Biologico"
                    options={[{ option: "femenino", value: "Femenino" },
                      { option: "masculino", value: "Masculino" }
                      ]}
                  />
                  <InputType
                    input="text"
                    question="Lugar de Nacimiento"
                  />

                  <button
                    className="self-start font-light place-self text-white mt-4 px-4 rounded-lg  hover:bg-blue-200 flex items-center justify-center"
                    style={{ backgroundColor: "#277BC0", border: "1px ridge #13BAFF" }} onClick={onPrev}
                  >
                    <b className="text-lg text-white pl-2">{"<"}</b>Anterior
                  </button>

                </div>

                <div htmlFor="right size"
                    className="flex flex-col justify-self-start pl-20"
                >
                  <InputType
                    input="text"
                    question="Estado de Nacimiento"
                  />
                  <InputType
                    input="text"
                    question="¿En que estado radica actualmente?"
                  />
                  <InputType
                    input="date"
                    question="Fecha en que fue diagnosticado"
                  />
  
                  <InputType
                    input="number"
                    question="¿Que edad tenia cuando debutó?"
                  />
                  <InputType
                    input="select"
                    question="¿Estuvo hospitalizado cuando debutó?"
                    options={[{option:"si", value:"Si"}, {option:"no", value:"No"}]}
                  />
                  <button
                    type="submit"
                    className="self-end font-light place-self text-white mt-4 mr-4 rounded-lg  hover:bg-blue-200 flex items-center justify-center"
                    style={{ backgroundColor: "#277BC0", border: "1px ridge #13BAFF" }} onClick={onNext}
                  >
                    SIGUIENTE <b className="text-lg text-white pl-2">&gt;</b>
                  </button>
                </div>
              </div>
              <div className="flex justify-between ">


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

      {formIndex === 0 && <Form1 onNext={nextForm} />}
      {formIndex === 1 && <Form2 onNext={nextForm} onPrev={prevForm} />}

    </div>


  );
}
