import React, { useState, useEffect } from 'react';
import { useUserContext } from "../context/UserContext";
import { supabase } from "../config/supabase";
import SideBar from '../components/SideBar';
import { toast, ToastContainer } from "react-toastify";
import Modal from "../components/Modal";

import edit from "../assets/img/edit.png";
import * as imageMeals from "../assets/img/Alimentos";
import delate from "../assets/img/delate.png";
import * as Yup from "yup";
import { Formik } from 'formik';

export default function Myfoods() {
    // General
    const { user } = useUserContext();
    const [loading, setLoading] = useState(false);

    const [date,setDate] = useState("");
    const [meals,setMeals] = useState([]);
    const [originalmeals,setOriginalMeals] = useState([]);
    const [mealsType,setMealsType] = useState([]);
    const [idMealTypeSelected,setidMealTypeSelected] = useState(0);

    // Modal
    const [modalIsOpen, setModalIsOpen] = useState(false);
    const [editMeals,setEditMeals] = useState(null);
    const [idActive,setidActive] = useState(0);

    //Search
    const [datameal,setDataMeal] = useState([]);
    const [dataAuxMeals,setDataAuxMeals] = useState([]);
    const [foods, setFoods] = useState([]);

    //Update
    const [aliments,setAliments] = useState([]);

    const openModal = (record,id) => {
        setDataMeal([]);
        setDataMeal([{id:record.idBancoAlimentos, name:record.food}])
        setEditMeals(record);
        setidActive(id);
        console.log("Meals",record,"IdActive",id);
        setModalIsOpen(true);
    };

    const closeModal = () => {
        setModalIsOpen(false);
        setEditMeals(null);
    };

    let fecha = new Date(date);
    fecha.setDate(fecha.getDate() + 1);
    let opciones = { 
        weekday: 'long', 
        year: 'numeric', 
        month: 'long', 
        day: 'numeric' 
    };

    let created = !isNaN(fecha) ? fecha.toLocaleDateString('es-ES', opciones) : null ;

    const getMeals = async () =>{
        try {
            setLoading(true);
            const { data, error } = await supabase
                .rpc("meals",
                    { 
                        user_id: user.id,
                        created_date: date
                    })
            if(error) console.log("error",error);
            setMeals(data);
            setOriginalMeals(data);
            setidMealTypeSelected(0);
        } catch (error) {
            console.log(error);
        } finally {
            setLoading(false);
        }
    }

    const getAliments = async () =>{
        try {
            setLoading(true);
            const { data, error } = await supabase
                .from("alimentos")
                .select(
                    "idAlimentos,BancoAlimentos(idBancoAlimentos,food),created_at,hour,tipoComida(idTipocomida,meal),portion"
                )
                .eq("uid", user.id)
            if (error) console.log("error", error);
            setAliments(data);
        } catch (error) {
            console.log(error);
        } finally {
            setLoading(false);
        }
    }

    const getFoods = async () => {
        try {
            setLoading(true);
            const { data, error } = await supabase
                .from("BancoAlimentos")
                .select(
                    "idBancoAlimentos,food,tipoAlimento(idTipoalimento,food), portionamount, carbohydrates, unidadesMedida(idUnidadMedida,name)"
                )
                .eq("uid",user.id)
                .order("idBancoAlimentos", { ascending: true });
            if (error) console.log("error", error);
            setFoods(data);
        } catch (error) {
            console.log(error);
        } finally {
            setLoading(false);
        }
    };

    const updatemeal = async (
        {food,idTipoComida,portion,created_at,hour},
        { setSubmitting, setErrors, resetForm }
    ) =>{
        try {
            getAliments();
            const formattedHour = hour.padEnd(8, ":00");
            console.log(formattedHour);
            const listMeals = aliments.filter((aliment) =>
                aliment.created_at === created_at &&
                aliment.tipoComida.idTipocomida === idTipoComida &&
                aliment.BancoAlimentos.idBancoAlimentos === datameal[0].id &&
                aliment.hour === hour
            );
            console.log("Datos orginales:",editMeals);
            console.log("Datos destino",listMeals);
            console.log(editMeals.idAlimentos);
            console.log("Food:",food,"idTipoComida:",idTipoComida,"Portion:",portion,"Created_at",created_at,"Hour",hour);

            console.log(formattedHour,editMeals.hour);

            if(editMeals.created_at === created_at){
                console.log("Fecha igual");
                if(idTipoComida == idActive){
                    console.log("Tipo de comida igual");
                    if(formattedHour === editMeals.hour){
                        console.log("Hora igual");
                    }else{
                        console.log("Horas diferentes");
                        if(datameal[0].id === editMeals.idBancoAlimentos){
                            console.log("Comida igual");
                        }else{
                            console.log("Comidas diferentes");
                        }
                    }
                }else{
                    console.log("Tipo de comida diferentes");
                }
            }else{
                console.log("Fecha diferente");
                
            }
            // if (listMeals.length > 0) {
            //     console.log("Alimento encontrado");
    
            //     // Verificar si es el mismo `idAlimentos`
            //     if (editMeals.idAlimentos === listMeals[0].idAlimentos) {
            //         console.log("IdAlimentos iguales. No se hace nada.");
            //     } else {
            //         console.log("IdAlimentos diferentes. Sumando porciones.");
            //         // Sumar las porciones del alimento original y el destino
            //     }
            // } else {
            //     console.log("Alimento no encontrado. Añadiendo o cambiando tipo/fecha."); 
            //     // Cambiar la hora de todos los alimentos del mismo tipo de comida si es diferente
            //     if (editMeals.hour !== formattedHour) {
            //         console.log("Actualizando horas de todos los alimentos del tipo de comida.");
            //     }
    
            //     // Cambiar la fecha de todos los alimentos si es diferente
            //     if (editMeals.created_at !== created_at) {
            //         console.log("Actualizando fechas de todos los alimentos.");
            //     }
            // }
        } catch (error) {
            console.log(error);
        }
    };

    let mealsIcons = (idTipoComida,idActive) =>{
        switch (idTipoComida){
            case 1:
                return idActive === idTipoComida ? imageMeals.desayuno_white : imageMeals.desayuno_black;
            case 2:
                return idActive === idTipoComida ? imageMeals.colacionM_white : imageMeals.colacionM_black;
            case 3:
                return idActive === idTipoComida ? imageMeals.comida_white : imageMeals.comida_black;
            case 4:
                return idActive === idTipoComida ? imageMeals.colacionV_white : imageMeals.colacionV_black;
            case 5:
                return idActive === idTipoComida ? imageMeals.cena_white : imageMeals.cena_black;
            default:
                return idActive === 0 ? imageMeals.all_white : imageMeals.all_black;
        }
    }

    let totalCarbohydrates = (meal) =>{
        return meal.reduce((total,comida)=> total + comida.portion * comida.carbohydrates,0);
    }

    const getMealsType = async () =>{
        try {
            setLoading(true);
            const{data,error} = await supabase
            .from("tipoComida")
            .select("*")
            if (error) console.log("error",error);
                setMealsType(data);
        } catch (error) {
            console.log(error);
        } finally {
            setLoading(false);
        }
    }

    const filterMeals = async (id) =>{
        if(id === 0){
            setMeals([...originalmeals]);
        } else {
            const getfilterMeals = originalmeals.filter((meal) => meal.idTipoComida === id);
            setMeals(getfilterMeals);
        }
    };

    const mealsSearch = (mealName, idMeal) =>{
        setDataMeal([
            {
                id: idMeal,
                name: mealName,
            },
        ]);
        setDataAuxMeals([]);
        console.log("Search:",datameal);
    }

    const handleDay = (e) =>{
        setDate(e.target.value);
    };

    const handleFilter = (id) =>{
        setidMealTypeSelected(id);
        filterMeals(id);
    };

    const handleSearch = (e) => {
        setDataMeal([]);
        if (e.target.value.trim() === "") return setDataAuxMeals([]);
        const newData = foods.filter((item) =>{
            return item.food
                .toLowerCase()
                .includes(e.target.value.toLowerCase());
        });
        setDataAuxMeals(newData);
    };

    useEffect(() =>{
        getMealsType();
        getFoods();
    },[user]);

    return(
        <div>
            <SideBar/>
            <ToastContainer />
            <div className="p-16 pt-24 sm:ml-64" data-aos="fade-up">
                <h2 className="text-2xl font-semibold mb-4">Tus Comidas</h2>
                <div className="mb-3 px-2 space-x-2 w-full">
                    <div>
                        <span>Fecha:</span>
                        <input
                            id="created_date"
                            type="date"
                            onChange={handleDay}
                            className="mx-3 w-48 border border-gray-300 rounded-md focus:outline-none focus:border-blue-500"
                        />
                        
                        <button
                            className="bg-azul hover:bg-azulHover text-white font-bold py-2 px-4 rounded shadow transition duration-300 ease-in-out"
                            onClick={getMeals}
                        >
                            Filtrar
                        </button>
                        <div className=" w-full mt-4">
                            <div>
                                <h3 className="text-xl font-semibold">Categorias</h3>
                                <div className="flex p-4 space-x-4">
                                {idMealTypeSelected === 0 ? (
                                    <div className="p-6 w-28 h-36 bg-blue-500 border rounded-lg text-center flex flex-col items-center justify-between" onClick={() => handleFilter(0)}>
                                        <img src={mealsIcons(0,idMealTypeSelected)} alt="" className="w-10 mb-2"/>
                                        <p className="text-white text-sm">Todos</p>
                                    </div>
                                ) : (
                                    <div className="p-6 w-28 h-36 border rounded-lg text-center flex flex-col items-center justify-between" onClick={() => handleFilter(0)}>
                                        <img src={mealsIcons(0,idMealTypeSelected)} alt="" className="w-10 mb-2"/>
                                        <p className="text-black text-sm">Todos</p>
                                    </div>
                                )}
                                    {mealsType.map((meal) => idMealTypeSelected === meal.idTipocomida ? (
                                            <div className="p-6 w-28 h-36 bg-blue-500 border rounded-lg text-center flex flex-col items-center justify-between" onClick={() => handleFilter(meal.idTipocomida)}>
                                            <img src={mealsIcons(meal.idTipocomida,idMealTypeSelected)} alt="" className="w-10 mb-2"/>
                                            <p className="text-white text-sm">{meal.meal}</p>
                                            </div>
                                        ) : (
                                            <div className="p-6 w-28 h-36 border rounded-lg text-center flex flex-col items-center justify-between" onClick={() => handleFilter(meal.idTipocomida)}>
                                            <img src={mealsIcons(meal.idTipocomida,idMealTypeSelected)} alt="" className="w-10 mb-2"/>
                                            <p className="text-black text-sm">{meal.meal}</p>
                                            </div>
                                        )
                                    )}
                                </div>
                                
                                {created && (
                                    <div className="flex items-center space-x-2 my-4">
                                        <span className="text-blue-500 font-medium">{created}</span>
                                        <div className="flex-grow border-t border-gray-300"></div>
                                    </div>
                                )}
                                

                                <div>
                                    {meals.map((comidas) =>(
                                        <div
                                            key={`${comidas.id}-${comidas.alimentos_detalle[0]?.id}`}
                                            className="shadow-md border rounded-lg p-6 mb-8"
                                        >
                                            <div className="flex mb-4 justify-between">
                                                <div className='flex justify-center'>
                                                    <img src={mealsIcons(comidas.idTipoComida,0)} alt="" className='w-6 mr-2'/>
                                                    <span>{mealsType.find(food => comidas.idTipoComida === food.idTipocomida)?.meal}</span>
                                                </div>
                                                <div>
                                                    <span>{comidas.alimentos_detalle[0].hour}</span>
                                                </div>
                                            </div>
                                            <table className="w-full h-full text-center mb-10">
                                                <tr>
                                                    <th className="border-slate-300 border">
                                                        Alimento
                                                    </th>
                                                    <th className="border-slate-300 border">
                                                        Carbohidratos por porcion
                                                    </th>
                                                    <th className="border-slate-300 border">
                                                        Carbohidratos totales
                                                    </th>
                                                    <th className="border-slate-300 border">
                                                        Acciones
                                                    </th>
                                                </tr>
                                                {comidas.alimentos_detalle.map((details) =>(
                                                    <tr key={`${comidas.id}-${details.food}`}>
                                                        <td className="p-2 border-slate-300 border">
                                                            {details.portion} {details.food}
                                                        </td>
                                                        <td className="p-2 border-slate-300 border">
                                                            {details.carbohydrates}
                                                        </td>
                                                        <td className="p-2 border-slate-300 border">
                                                            {details.portion*details.carbohydrates}
                                                        </td>
                                                        <td className="p-2 border-slate-300 border">
                                                            <div className="flex items-center justify-center" data-aos="fade-left" data-aos-duration="250">
                                                                <button
                                                                    type="button"
                                                                    onClick={() => openModal(details,comidas.idTipoComida)}
                                                                    className="bg-azulHover mx-4 p-1 rounded hover:bg-azul text-white flex"
                                                                >
                                                                    <img src={edit} alt="editar" className="h-5" />
                                                                    <p className="px-2">Editar</p>
                                                                </button>
                                                                <button
                                                                    type="button"
                                                                    onClick={() =>{}}
                                                                    className="bg-red-600 p-1 rounded hover:bg-red-800 text-white flex"
                                                                >
                                                                    <img src={delate} alt="borrar" className="h-5" />
                                                                    <p className="px-2">Borrar</p>
                                                                </button>
                                                            </div>
                                                        </td>
                                                    </tr>
                                                ))} 
                                                <tr>
                                                    <td className="p-2 font-bold border-slate-300 border">
                                                        Total de Carbohidratos:
                                                    </td>
                                                    <td className="p-2 border-slate-300 border">
                                                        {totalCarbohydrates(comidas.alimentos_detalle)}
                                                    </td>
                                                </tr>
                                            </table>

                                            <Modal
                                                isOpen={modalIsOpen}
                                                onClose={closeModal}
                                                title={"Editar Comida"}
                                            >
                                                {editMeals && (
                                                    <div>
                                                        <Formik
                                                            initialValues={{
                                                                food : editMeals.food,
                                                                idTipoComida : idActive,
                                                                portion : editMeals.portion,
                                                                created_at : editMeals.created_at,
                                                                hour : editMeals.hour,
                                                            }}
                                                            // validationSchema={validationSchema}
                                                            onSubmit={updatemeal}
                                                        >
                                                            {({
                                                                values,
                                                                errors,
                                                                touched,
                                                                handleBlur,
                                                                handleChange,
                                                                handleSubmit,
                                                                isSubmitting,
                                                            }) =>(
                                                                <form onSubmit={handleSubmit}>
                                                                    <div className="w-full mb-2 items-center">
                                                                        <div className="mb-4">
                                                                            <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                                                                                Nombre del alimento:
                                                                            </label>
                                                                            <div className="w-full mx-auto">
                                                                                <label
                                                                                    htmlFor="default-search"
                                                                                    className="mb-2 text-sm font-medium text-gray-900 sr-only dark:text-white"
                                                                                    >
                                                                                    Search
                                                                                </label>
                                                                                <div className="relative">
                                                                                    <div className="absolute inset-y-0 start-0 flex items-center pointer-events-none">
                                                                                        <svg
                                                                                            className="ml-3 w-4 h-4 text-gray-500 dark:text-gray-400"
                                                                                            aria-hidden="true"
                                                                                            xmlns="http://www.w3.org/2000/svg"
                                                                                            fill="none"
                                                                                            viewBox="0 0 20 20"
                                                                                        >
                                                                                            <path
                                                                                            stroke="currentColor"
                                                                                            stroke-linecap="round"
                                                                                            stroke-linejoin="round"
                                                                                            stroke-width="2"
                                                                                            d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"
                                                                                            />
                                                                                        </svg>
                                                                                    </div>
                                                                                    <input
                                                                                        type="search"
                                                                                        id="default-search"
                                                                                        name="food"
                                                                                        autoComplete="off"
                                                                                        defaultValue={values.food}
                                                                                        onChange={handleSearch}
                                                                                        className="block w-full p-2.5 ps-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                                                                        placeholder="Buscar comida..."
                                                                                    />
                                                                                </div>
                                                                            </div>
                                                                        </div>
                                                                        {dataAuxMeals.length !== 0 && datameal.length === 0 &&(
                                                                            <div className="mb-3 px-10">
                                                                                {dataAuxMeals.map((comida) => {
                                                                                    return (
                                                                                        <div 
                                                                                            key={comida.idBancoAlimentos}
                                                                                            className="cursor-pointer"
                                                                                            onClick={() =>
                                                                                                mealsSearch(comida.food,comida.idBancoAlimentos)
                                                                                            }
                                                                                        >
                                                                                            <div className="p-4 border-b-2 hover:bg-gray-100 transition-all ease-in">
                                                                                                <p>{comida.food}</p>
                                                                                            </div>
                                                                                        </div>
                                                                                    );
                                                                                })}
                                                                            </div>
                                                                        )}

                                                                        {datameal.length !== 0 && (
                                                                            <div className="px-10 mb-3 cursor-default">
                                                                                <div className="p-4 border-b-2 bg-gray-100 transition-all ease-in">
                                                                                    <p>{datameal[0].name}</p>
                                                                                </div>
                                                                            </div>
                                                                        )}
                                                                        <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                                                                            Tipo de comida:
                                                                        </label>
                                                                        <select
                                                                            name="idTipoComida" id="idTipoComida"
                                                                            defaultValue={values.idTipoComida}
                                                                            onChange={handleChange}
                                                                            onBlur={handleBlur}
                                                                            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                                                        >
                                                                            <option disabled>Selecciona un tipo de comida</option>
                                                                            {mealsType.map((comida) =>
                                                                                <option
                                                                                    key={comida.idTipocomida}
                                                                                    value={comida.idTipocomida}
                                                                                >
                                                                                    {comida.meal}
                                                                                </option>
                                                                            )}
                                                                        </select>
                                                                        <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                                                                            Cantidad por porción:
                                                                        </label>
                                                                        <input
                                                                            type="number" name="portion" id="portion"
                                                                            defaultValue={values.portion} min={1} max={100}
                                                                            onChange={handleChange} onBlur={handleBlur}
                                                                            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-50 p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                                                        />
                                                                        <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                                                                            Fecha:
                                                                        </label>
                                                                        <input
                                                                            type="date"
                                                                            id="created_at"
                                                                            name="created_at"
                                                                            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                                                            onChange={handleChange}
                                                                            onBlur={handleBlur}
                                                                            defaultValue={values.created_at ? new Date(values.created_at).toISOString().split('T')[0] : ""}
                                                                        />
                                                                        <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                                                                            Hora:
                                                                        </label>
                                                                        <input
                                                                            type="time"
                                                                            id="hour"
                                                                            hour="hour"
                                                                            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                                                            onChange={handleChange}
                                                                            onBlur={handleBlur}
                                                                            defaultValue={values.hour}
                                                                        />
                                                                        <button
                                                                            type="submit"
                                                                            className="flex items-center justify-between bg-azulHover transition duration-300 ease-out hover:ease-out hover:bg-azul mt-4 px-7 py-1 rounded-lg text-white"
                                                                        >
                                                                            Editar
                                                                        </button>
                                                                    </div>
                                                                </form>
                                                            )}
                                                        </Formik>
                                                    </div>
                                                )}
                                            </Modal>
                                        </div>
                                    ))}
                                </div>
                            </div>  
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}