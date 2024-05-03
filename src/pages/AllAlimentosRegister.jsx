import React, { useState, useEffect } from 'react';
import { useUserContext } from "../context/UserContext";
import { supabase } from "../config/supabase";
import SideBar from '../components/SideBar';
import Modal from '../components/Modal';
import edit from "../assets/img/edit.png";
import delate from "../assets/img/delate.png";
import * as Yup from 'yup';
import { Formik } from 'formik';
import { type } from '@testing-library/user-event/dist/type';

export default function AllAlimentosRegister () {
    const { user } = useUserContext();
    const [records, setRecords] = useState([]);
    const [originalRecords, setOriginalRecords] = useState([]);
    const [loading, setLoading] = useState(false);
    const [modalIsOpen, setModalIsOpen] = useState(false);
    const [editRecord,setEditRecord] = useState(null);

    const [foodType, setFoodType] = useState('');
    const [foodTypes, setFoodTypes] = useState([]);
    const [measuringunits, setMeasuringunits] = useState([]);
    const [measuringunit, setMeasuringunit] = useState('');

    const [carbohydratesSelect,setCarbohydratesSelect] = useState('');
    const [foodTypeSelect,setFoodTypeSelect] = useState('');
    const [portionAmountSelect,setPortionAmountSelect] = useState('');

    const openModal = (record) => {
      setEditRecord(record);
      setModalIsOpen(true);
    };
  
    const closeModal = () => {
      setModalIsOpen(false);
      setEditRecord(null);
    };

    const fecha = new Date();
    const año = fecha.getFullYear();
    const mes = fecha.getMonth() + 1;
    const dia = fecha.getDate();
    const fechaActual = `${año}-${mes < 10 ? "0" : ""}${mes}-${dia}`;
  

    const getRecords = async () => {
        try {
          setLoading(true);
          const { data, error } = await supabase
            .from("BancoAlimentos")
            .select("idBancoAlimentos,food,tipoAlimento(idTipoalimento,food), portionamount, carbohydrates, unidadesMedida(idUnidadMedida,name)")
            .eq("uid", user.id)
            .order("idBancoAlimentos",{ascending:true});

          if (error) console.log("error", error);
    
          setRecords(data);
          setOriginalRecords(data);
        } catch (error) {
          console.log(error);
        } finally {
          setLoading(false);
        }
    };

    const getFiltercarbohydrates = async (carbohydratesOpcion) => {
      // Filtrar por tipo de alimento
      let filteredRecords = [...records];
      if (carbohydratesOpcion === 'asc') {
        // Ordenar de menor a mayor
        filteredRecords.sort((a, b) => b.carbohydrates - a.carbohydrates);
      } else if (carbohydratesOpcion === 'des') {
        // Ordenar de mayor a menor
        filteredRecords.sort((a, b) => a.carbohydrates - b.carbohydrates);
      }else if(carbohydratesOpcion === ""){
        filteredRecords.sort((a, b) => a.idBancoAlimentos - b.idBancoAlimentos);
      }
      setPortionAmountSelect('');
      setRecords(filteredRecords);
    };

    const getFilterPortionAmount = async (portionAmountOption) =>{
      let filteredRecords = [...records];
      if (portionAmountOption === 'asc') {
        // Ordenar de menor a mayor
        filteredRecords.sort((a, b) => b.portionamount - a.portionamount);
      } else if (portionAmountOption === 'des') {
        // Ordenar de mayor a menor
        filteredRecords.sort((a, b) => a.portionamount - b.portionamount);
      }else if(portionAmountOption === ""){
        filteredRecords.sort((a, b) => a.idBancoAlimentos - b.idBancoAlimentos);
      }
      setCarbohydratesSelect('');
      setRecords(filteredRecords);
    };

    const getFilterfoodTyple = async (foodTypeOption) => {
      if (foodTypeOption) {
        const filteredRecords = originalRecords.filter(record => record.tipoAlimento.food === foodTypeOption);
        setRecords(filteredRecords);
      }else{
        setRecords(originalRecords);
      }
      setCarbohydratesSelect('');
      setPortionAmountSelect('');
    };

    const deletefood = async (id) => {
      try{
        setLoading(true);
        await supabase
          .from("BancoAlimentos")
          .delete()
          .eq("uid",user.id)
          .eq("idBancoAlimentos",id);
      } catch (error){
        console.log(error);
      } finally {
        setLoading(false);
        getRecords();//actualiza
      }
    };

    const fetchTipoAlimento = async () => {
      try {
        const { data: tipoAlimentos, error } = await supabase.from('tipoAlimento').select('*');
        if (error) {
          throw error;
        }
        setFoodTypes(tipoAlimentos);
      } catch (error) {
        console.error('Error al obtener los tipos de alimentos:', error.message);
      }
    };
  
    const fetchMedidas = async () =>{
      try {
        const{ data: unidadesMedida,error} = await supabase.from('unidadesMedida').select('*');
        if (error) {
          throw error;
        }
        setMeasuringunits(unidadesMedida);
      } catch (error) {
        console.error('Error al obtener las medidas:', error.message);
      }
    }

    const updatefood = async ({
        id,
        foodName,
        foodType,
        portionAmount,
        measuringunit,
        carbohydratesAmount
      },
      {setSubmitting, setErrors, resetForm}) => {
      try{
        // setLoading(true);
        setSubmitting(true);
        const Indexfoodtypes = foodTypes.find(type => type.food === foodType);
        setFoodType(Indexfoodtypes.idTipoalimento);

        await supabase
          .from("BancoAlimentos")
          .update({
            food: foodName,
            idTipoAlimento: Indexfoodtypes.idTipoalimento,
            idUnidadMedida: measuringunit,
            portionamount: portionAmount,
            carbohydrates: carbohydratesAmount,
            created_at: fechaActual,
          })
          .eq("uid",user.id)
          .eq("idBancoAlimentos",id);

          closeModal();
      } catch (error){
        console.log(error);
      } finally {
        setLoading(false);
        setCarbohydratesSelect('');
        setFoodTypeSelect('');
        setPortionAmountSelect('');
        getRecords();//actualiza
      }
    };

    

    const validationSchema = Yup.object({
      foodName: Yup.string().matches(/^[^\d]+$/, "El campo debe ser texto").required("Este campo es requerido"),
      foodType: Yup.string().required("Este campo es requerido"),
      portionAmount: Yup.string().required("Este campo es requerido"),
      carbohydratesAmount: Yup.string().required("Este campo es requerido")
    })

    const changefilter_portionAmount = (e) =>{
      const portionAmountOption = e.target.value;
      setPortionAmountSelect(portionAmountOption);
      getFilterPortionAmount(portionAmountOption);
    }

    const changefilter_carbohydrates = (e) =>{
      const carbohydratesOption = e.target.value;
      setCarbohydratesSelect(carbohydratesOption);
      getFiltercarbohydrates(carbohydratesOption);
    }

    const changefilter_foodTyple = (e) =>{
      const foodTypeOpcion = e.target.value;
      setFoodTypeSelect(foodTypeOpcion);
      getFilterfoodTyple(foodTypeOpcion);
    }

    useEffect(() => {
      getRecords();
      getFiltercarbohydrates();
      getFilterfoodTyple();
      fetchTipoAlimento();
      fetchMedidas();
    }, []);
    
    return(
        <div>
            <SideBar/>
            <div className="p-16 pt-24 sm:ml-64" data-aos="fade-up">
                <h2 className="text-2xl font-semibold mb-4">Tus Alimentos</h2>
                <div className="flex items-center mb-3 px-2 space-x-2">
                  {/* filtrados */}
                  <label className="block text-sm font-medium text-gray-900 dark:text-white">
                    Tipo de alimento:
                  </label>
                  <select 
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-50 p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    name="filterfoodtype" 
                    id="filterfoodtype"
                    value={foodTypeSelect}
                    onChange={changefilter_foodTyple}
                  >  
                    <option value="">Seleccione un filtrado</option>
                    {foodTypes.map((type) => (
                      <option 
                        key={type.idTipoAlimento} 
                        value={type.idTipoAlimento} // Usamos el índice como valor
                      >
                        {type.food}
                      </option>
                    ))}
                  </select>

                  <label className="block text-sm font-medium text-gray-900 dark:text-white">
                    Cantidad por porción:
                  </label>
                  <select 
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-50 p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    name="filterportionAmount" 
                    id="filterportionAmount"
                    value={portionAmountSelect}
                    onChange={changefilter_portionAmount}
                  >  
                    <option value="">Seleccione un filtrado</option>
                    <option value="asc">Mayor a menor</option>
                    <option value="des">Menor a mayor</option>
                  </select>

                  <label className="block text-sm font-medium text-gray-900 dark:text-white">
                    Carbohidratos:
                  </label>
                  <select 
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-50 p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    name="filtercarbohidrates" 
                    id="filtercarbohidrates"
                    value={carbohydratesSelect}
                    onChange={changefilter_carbohydrates}
                  >  
                    <option value="">Seleccione un filtrado</option>
                    <option value="asc">Mayor a menor</option>
                    <option value="des">Menor a mayor</option>
                  </select>
                </div>
                
                <div className="w-full h-full">
                {records && records.length === 0 && (
                  <div className="relative items-center block p-6 bg-white border border-gray-100 rounded-lg shadow-md ">
                  {loading && (
                    <div
                      role="status"
                      class="absolute -translate-x-1/2 -translate-y-1/2 top-2/4 left-1/2"
                    >
                      <svg
                        aria-hidden="true"
                        class="w-8 h-8 text-gray-200 animate-spin  fill-blue-600"
                        viewBox="0 0 100 101"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
                          fill="currentColor"
                        />
                        <path
                          d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
                          fill="currentFill"
                        />
                      </svg>
                      <span class="sr-only">Loading...</span>
                    </div>
                  )}
                  <p
                    className={
                      loading
                        ? "text-lg font-medium text-center text-gray-400 opacity-20"
                        : "text-lg font-medium text-center text-gray-400 "
                    }
                  >
                    Sin registros
                  </p>
                </div>
                )}
                
                {records && records.length > 0 && (
                  <div className="relative items-center block p-6 bg-white border border-gray-100 rounded-lg shadow-md">
                    <table className='w-full h-full text-center'>
                      <tr>
                        <th className="border-slate-300 border">Comida</th>
                        <th className="border-slate-300 border">Tipo de alimento</th>
                        <th className="border-slate-300 border">Cantidad por porción</th>
                        <th className="border-slate-300 border">Carbohidratos</th>
                      </tr>
                    {
                      records.map((record) => (
                        <tr>
                          <td className="border-slate-300 border">{record.food}</td>
                          <td className="border-slate-300 border">{record.tipoAlimento.food}</td>
                          <td className="border-slate-300 border">{record.portionamount} {record.unidadesMedida.name}</td>
                          <td className="border-slate-300 border">{record.carbohydrates} </td>
                          <td className="">
                            <button 
                              type="button"
                              onClick={() => openModal(record)}
                              className="bg-azulHover p-1 rounded hover:bg-azul">
                              <img src={edit} alt="editar" className="h-5"/>
                            </button>
                          </td>
                          <td className="">
                            <button 
                              type="button"
                              onClick={()=>
                                deletefood(record.idBancoAlimentos)
                              }
                              className="bg-red-600 p-1 rounded hover:bg-red-800"
                            >
                              <img src={delate} alt="borrar" className="h-5" />
                            </button>
                          </td>
                        </tr>
                    ))}
                    </table>

                    <Modal isOpen={modalIsOpen} onClose={closeModal} title="Editar alimento">
                      {editRecord &&(
                        <div> 
                          <Formik
                            initialValues={{
                              foodName: editRecord.food,
                              foodType: "",
                              portionAmount: editRecord.portionamount,
                              measuringunit: 1,
                              carbohydratesAmount: editRecord.carbohydrates,
                              id:editRecord.idBancoAlimentos
                            }}
                            validationSchema={validationSchema}
                            onSubmit={updatefood}
                          >
                          {({
                            values,
                            errors,
                            touched,
                            handleBlur,
                            handleChange,
                            handleSubmit,
                            isSubmitting}) => (
                              <form onSubmit={handleSubmit}>
                                <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Nombre del alimento:</label>
                                <input
                                  name="foodName"
                                  id="foodName"   
                                  type="text"
                                  onChange={handleChange}
                                  onBlur={handleBlur}
                                  autoComplete='off'
                                  className="mr-3 bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                  value={values.foodName}
                                />
                                <p className="mb-4 text-sm text-red-500 dark:text-white w-full">
                                  {errors.foodName && touched.foodName && errors.foodName}
                                </p>

                                <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Tipo de alimento:</label>
                                <select 
                                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                  name="foodType" 
                                  id="foodType"
                                  defaultValue={values.foodType}
                                  // value={values.foodType}
                                  onChange={handleChange}
                                  onBlur={handleBlur}
                                >    
                                  <option value="">Seleccione un tipo de alimento</option>
                                  {foodTypes.map((type) => (
                                    <option 
                                      key={type.idTipoAlimento} 
                                      value={type.idTipoAlimento} // Usamos el índice como valor
                                    >
                                      {type.food}
                                    </option>
                                  ))}
                                </select>
                                <p className="mb-4 text-sm text-red-500 dark:text-white w-full">
                                  {errors.foodType && touched.foodType && errors.foodType}
                                </p>
                                
                                <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                                  Cantidad por porción:
                                </label>
                                <div className="flex">
                                  <input
                                    name="portionAmount"
                                    id="portionAmount"        
                                    type="number"
                                    step="0.1"
                                    min={1}
                                    max={999}
                                    defaultValue={values.portionAmount}
                                    autoComplete='off'
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                    className="mr-3 bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-50 p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                  />
                                  <select 
                                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-50 p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                    name="measuringunit" 
                                    id="measuringunit"
                                    defaultValue={measuringunit}
                                    // value={values.foodType}
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                  >  
                                    {measuringunits.map((type) => (
                                      <option 
                                        key={type.idUnidadMedida} 
                                        value={type.idUnidadMedida} // Usamos el índice como valor
                                      >
                                        {type.name}
                                      </option>
                                    ))}
                                  </select>
                                </div>
                                <p className="mb-4 text-sm text-red-500 dark:text-white w-full">
                                  {errors.portionAmount && touched.portionAmount && errors.portionAmount}
                                </p>
                                
                                <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                                  Carbohidratos por porción:
                                </label>
                                <input 
                                  name="carbohydratesAmount"
                                  id="carbohydratesAmount"        
                                  type="number"
                                  min={1}
                                  max={999}
                                  defaultValue={values.carbohydratesAmount}
                                  onChange={handleChange}
                                  onBlur={handleBlur}
                                  autoComplete='off'
                                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-50 p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                />
                                <p className="mb-4 text-sm text-red-500 dark:text-white w-full">
                                  {errors.carbohydratesAmount && touched.carbohydratesAmount && errors.carbohydratesAmount}
                                </p>
                                {/* <p className="text-gray-700">ID Unidad Medida: {editRecord.unidadesMedida.idUnidadMedida}</p> */}
                                <button type="submit" className="flex items-center justify-between bg-azulHover transition duration-300 ease-out hover:ease-out hover:bg-azul mt-4 px-7 py-1 rounded-lg text-white">
                                  Guardar
                                </button>
                              </form>
                          )}
                          </Formik>
                        </div>
                      )}
                    </Modal>
                  </div>  

                )}
                  
                </div>
            </div>
        </div>
    );
}
