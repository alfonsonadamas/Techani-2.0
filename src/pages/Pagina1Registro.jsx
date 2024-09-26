import React, { useState } from "react";
import NavStepsRegistro from "../components/NavStepsRegistro";
import { Formik } from "formik";

export default function Pagina1Registro() {
  const [diabetesOption, setDiabetesOption] = useState(null);
  const [ageOption, setAgeOption] = useState(null);
 
 

  const updateRegistro = async () => {
    try {
      if(diabetesOption === "si"){
        window.open("", "_blank").document.write("<h1>Felicidades!</h1>"); 
      }else{
            window.open("", "_blank").document.write("<h1>Este formulario no es para ti, gracias.</h1>");
            window.open("", "_blank").document.close();
      }
      
    } catch (error) {
      console.log(error)
    }
  };

  return (
    
    <div>
    
      <NavStepsRegistro />
      <Formik
        initialValues={{
          diabetesOption: diabetesOption,
          ageOption: ageOption,
        }}
        onSubmit={updateRegistro}
      >
        {({handleSubmit}) => (
        <form onSubmit={handleSubmit}>
        <div className="bg-gray border-gray-700 w-fit shadow-lg flex flex-col items-center"
          style={{ backgroundColor: "#E7E7E7", width: "auto", height: "100vh" }}
        >
          <div
            className="bg-white border-radius rounded-xl  flex w-full h-full flex-col shadow-md"
            style={{ maxWidth: "1080px", maxHeight: "800px", marginBlockEnd: "100px", marginBlockStart: "110px" }}
          >
            <div style={{margin:"30px"}}>
              <div className="flex justify-between items-start h-10">
                <b><h1 className="mt-6" style={{fontSize:"22px"}}>Hola</h1></b>
                <label htmlFor="pageNumber" className="self-end py-6"style={{color: "#C3C3C3"}}>1 de 5</label>
              </div>
              <br />
              <p className="mt-3 ">Este proyecto web permite monitorear los niveles de glucosa de pacientes con diabetes tipo 1 en tiempo real. Ofrece gráficos y alertas personalizadas para el control eficaz de la glucosa, facilitando la toma de decisiones médicas. Mejora la calidad de vida y promueve un seguimiento continuo y seguro.</p>
              <br />
              <p>Con el fin de ser de la mayor utilidad posible estamos enfocados en monitoireo de la diabetes tipo 1.</p>
              <br />

              <b><label>¿Tienes Diabetes tipo 1?</label></b>
              <select 
                name="diabetesOption" 
                id="diabetesOption"
                onChange={(event) =>
                  setDiabetesOption(event.target.value)}
                className="bg-white border mt-2 border-black text-gray-900 border-radius text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 shadow-md"
                 style={{maxWidth:"400px"}}
              >
                <option value="no">No</option>
                <option value="si">Si</option>
                
              </select>
                  <br />
              <label className="font-bold pt-6">¿Eres mayor de edad?</label>
              <select 
                name="ageOption" 
                id="ageOption"
                onChange={(event) =>
                  setAgeOption(event.target.value)
              }
                className="bg-white border mt-2 border-black text-gray-900 border-radius text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 shadow-md"
                style={{maxWidth:"400px"}}
              >
                <option value="no">No</option>
                <option value="si">Si</option> 
              </select>
              
              <p className="text-sm mt-10">⚠️En caso de ser menor, llama a un padre o tutor para que te ayude a llenar el registro</p>
              
              <div className="flex justify-end ">
                <button 
                  type="submit"
                  className="font-light place-self text-white text-white mt-4 px-4 rounded-lg  hover:bg-blue-200 flex items-center justify-center"
                  style={{backgroundColor: "#277BC0", border: "1px ridge #13BAFF"}}
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

    </div>


  );
}
