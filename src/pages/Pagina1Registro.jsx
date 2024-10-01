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


                {/*BOTON PARA CAMBIAR DE DIV */}
                <div className="flex justify-end ">
                  <button
                    type="submit"
                    className="font-light place-self text-white text-white mt-4 px-4 rounded-lg  hover:bg-blue-200 flex items-center justify-center"
                    style={{ backgroundColor: "#277BC0", border: "1px ridge #13BAFF" }}
                  >
                    SIGUIENTE <b className="text-lg text-white pl-2">&gt;</b>
                  </button>
                </div>
                {/* FIN BOTON PARA CAMBIAR DE DIV */} 

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


  {/*AQUI INICIA EL FORMULARIO DE ALEJANDRO  FRAME 26 FIGMA */}
  const Form3 = ({ onNext, onPrev }) => (
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
                <label htmlFor="pageNumber" className="self-end mt-4 mr-4" style={{ color: "#C3C3C3" }}>3 de 5</label>
              </div>
              <div className="grid grid-flow-col justify-stretch"  >

                {/*LADO IZQUIERDO DEL FORMULARIO */}
                <div htmlFor="left-size" className="justify-self-start pl-20 mr-4" style={{maxWidth: "800px", borderRight: '1px solid black' }}>
                  
                  <InputType
                    input="select"
                    question={(
                      <>
                      ¿Cuanto tiempo duro la luna de miel de <br /> su diabetes tipo 1?
                      </>
                    )}
                    options={[{option:"si", value:"Si"}, {option:"no", value:"No"}]}
                  />
                  
                  
                  <InputType
                     input="select"
                     question={(
                    <>
                    ¿Cuál era el tratamiento que utilizaba inicialmente<br /> para su diabetes tipo 1 y en qué dosis?
                    </>
                    )}
                    options={[{option:"insulina lenta", value:"INSULINA LENTA"}, {option:"pendiente", value:"PENDIENTE"}]}
                  />

                  <InputType
                    input="select"
                    question="¿Donde sigue su tratamiento actualmente?"
                    options={[{option:"hospital", value:"Hospital"}, {option:"pendiente", value:"PENDIENTE"}]}
                  />

                  <InputType
                    input="date"
                    question={(
                      <>
                      ¿Cuál es su ultima Hemoglobina glicosilada y<br /> fecha en que se obtuvo?
                      </>
                      )}
                      
                  />

                  <InputType
                    input="select"
                    question="¿Cual es su estado civil?"
                    options={[{option:"soltero", value:"Soltero"}, {option:"casado", value:"Casado"}, {option:"viudo", value:"Viudo"}]}
                  />

                  <button
                    className="self-start font-light place-self text-white mt-4 px-4 rounded-lg  hover:bg-blue-200 flex items-center justify-center"
                    style={{ backgroundColor: "#277BC0", border: "1px ridge #13BAFF" }} onClick={onPrev}
                  >
                    <b className="text-lg text-white pl-2">{"<"}</b>Anterior
                  </button>

                </div>
                {/*FIN DE LADO IZQUIERDO DEL FORMULARIO */}


                {/*LADO DERECHO  DEL FORMULARIO */}
                <div htmlFor="right size"
                    className="flex flex-col justify-self-start pl-20"
                >
                  <InputType
                    input="text"
                    question="¿Cual es su ocupacion?"
                    
                  />
                  <InputType
                    input="select"
                    question="¿Cual es su peso?"
                    options={[{option:"0", value:"o kg"}, {option:"70", value:"70 kg"}]}
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


                  <button
                    type="submit"
                    className="self-end font-light place-self text-white mt-4 mr-4 rounded-lg  hover:bg-blue-200 flex items-center justify-center"
                    style={{ backgroundColor: "#277BC0", border: "1px ridge #13BAFF" }} onClick={onNext}
                  >
                    SIGUIENTE <b className="text-lg text-white pl-2">&gt;</b>
                  </button>


                </div>
                {/*FIN DEL LADO DERECHO DEL FORMULARIO */}
              </div>
              <div className="flex justify-between ">


              </div>

            </div>
          </div>
        </form>
      )}
    </Formik>
  );
  {/*AQUI TERMINA EL FORMULARIO DE ALEJANDRO  FRAME 26 FIGMA*/}


    {/*AQUI INICIA EL FORMULARIO DE ALEJANDRO  FORMULARIO 5 */}
    {/*HAY QUE ACOMODAR EL ORDEN DE LOS fOMRS*/}
    const Form4 = ({ onNext, onPrev }) => (
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
                  <label htmlFor="pageNumber" className="self-end mt-4 mr-4" style={{ color: "#C3C3C3" }}>4 de 5</label>
                </div>
                <div className="grid grid-flow-col justify-stretch"  >
  
                  {/*LADO IZQUIERDO DEL FORMULARIO */}
                  <div htmlFor="left-size" className="justify-self-start pl-20 mr-4" style={{maxWidth: "800px", borderRight: '1px solid black' }}>
                    
                    <InputType
                      input="text"
                      question={(
                        <>
                        ¿Cuál es la meta de glucosa inferior  <br/> establecida por su medico tratante? 
                        
                        </>
                      )}
                      options={[{option:"si", value:"Si"}, {option:"no", value:"No"}]}
                    />
                    
                    
                    <InputType
                       input="select"
                       question="¿Como lleva el control de alimentos? "
                      
                      options={[{option:"por raciones", value:"POR RACIONES, ESTABLECIDAS POR EL MEDICO"}, {option:"por cuenta de carbohidratos", value:"POR CUENTA DE CARBOHIDRATOS"}]}
                    />
  
                    <InputType
                      input="select"
                      question="¿Realiza ejercicio? "
                      options={[{option:"si", value:"SI"}, {option:"no", value:"NO"}]}
                    />
  
                    <InputType
                      input="number"
                      question={(
                        <>
                        Por lo regular, ¿Cuánta agua consume<br /> al dia en litros?
                        </>
                        )}
                        
                    />
  
                    <InputType
                      input="text"
                      question="¿Que hace cuando tiene hiperglicemia?"
                      
                    />
  
                    <button
                      className="self-start font-light place-self text-white mt-4 px-4 rounded-lg  hover:bg-blue-200 flex items-center justify-center"
                      style={{ backgroundColor: "#277BC0", border: "1px ridge #13BAFF" }} onClick={onPrev}
                    >
                      <b className="text-lg text-white pl-2">{"<"}</b>Anterior
                    </button>
  
                  </div>
                  {/*FIN DE LADO IZQUIERDO DEL FORMULARIO */}
  
  
                  {/*LADO DERECHO  DEL FORMULARIO */}
                  <div htmlFor="right size"
                      className="flex flex-col justify-self-start pl-20"
                  >
                    <InputType
                      input="text"
                      question="¿Que hace cuando tiene hipoglicemia?"
                      
                    />
                    <InputType
                      input="select"
                      question="¿Ha tenido o tiene algún trastorno? "
                      options={[{option:"ninguno", value:"NINGUNO"}, {option:"ansiedad", value:"ANSIEDAD"}, {option:"depresion", value:"DEPRESIÒN"},
                                {option:"tdah", value:"TDAH"}, {option:"sindrome de asperger", value:"SINDROME DE ASPERGER"},
                                {option:"sindrome de espectro autista", value:"SINDROME DE ASPECTO AUTISTA"}, {option:"otro", value:"OTRO:"}
                      ]}
                    />
                    <InputType
                          input="select"
                          question={(
                            <>
                            ¿Sigue algún tratamiento para este<br /> trastorno? ¿Cual?
                            </>
                            )}
                            options={[{option:"si", value:"SI"}, {option:"no", value:"NO"}]}

                    />
    
                    <InputType
                      input="select"
                      question="¿Consume alcohol?"
                      options={[{option:"si", value:"SI"}, {option:"no", value:"NO"}]}
                    />


                    <InputType
                      input="select"
                      question="¿Consume algún estupefaciente?"
                      options={[{option:"si", value:"SI"}, {option:"no", value:"NO"}]}
                    />
  
  
                    <button
                      type="submit"
                      className="self-end font-light place-self text-white mt-4 mr-4 rounded-lg  hover:bg-blue-200 flex items-center justify-center"
                      style={{ backgroundColor: "#277BC0", border: "1px ridge #13BAFF" }} onClick={onNext}
                    >
                      SIGUIENTE <b className="text-lg text-white pl-2">&gt;</b>
                    </button>
  
  
                  </div>
                  {/*FIN DEL LADO DERECHO DEL FORMULARIO */}
                </div>
                <div className="flex justify-between ">
  
  
                </div>
  
              </div>
            </div>
          </form>
        )}
      </Formik>
    );
    {/*AQUI TERMINA EL FORMULARIO DE ALEJANDRO  FORMULARIO 5*/}
  return (
    
    <div>
    
      <NavStepsRegistro />

      {formIndex === 0 && <Form1 onNext={nextForm} />}
      {formIndex === 1 && <Form2 onNext={nextForm} onPrev={prevForm} />}
      {formIndex === 2 && <Form3 onNext={nextForm} onPrev={prevForm} />}
      {formIndex === 3 && <Form4 onNext={nextForm} onPrev={prevForm} />}
    </div>


  );
}
