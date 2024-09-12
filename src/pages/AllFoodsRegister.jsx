import React, { useState, useEffect } from 'react';
import { useUserContext } from "../context/UserContext";
import { supabase } from "../config/supabase";
import SideBar from '../components/SideBar';
import Modal from "../components/Modal";

import edit from "../assets/img/edit.png";
import delate from "../assets/img/delate.png";
import * as Yup from "yup";
import { Formik } from 'formik';

export default function AllFoodsRegister() {
    const { user } = useUserContext();
    const [loading, setLoading] = useState(false);
    const [meals, setMeals] = useState([]);
    const [datameals,setDataMeals] = useState([]);
    const [datameal,setDataMeal] = useState([]);
    const [dataAuxMeals,setDataAuxMeals] = useState([]);
    const [originalMeals, setOriginalMeals] = useState([]);
    const [mealsType,setMealsType] = useState([]);

    const [foods, setFoods] = useState([]);
    const [originalFoods, setOriginalFoods] = useState([]);

    const [daySelect, setDaySelect] = useState("");
    const [editMeal, setEditMeal] = useState(null);
    const [editDateMeal,setEditDateMeal] = useState(null);
    const [hourMeal,setHourMeal] = useState();
    const [modalIsOpen, setModalIsOpen] = useState(false);
    const [modalDateIsOpen, setModalDateIsOpen] = useState(false);
    const [IDmeal,setIDmeal] = useState(null);
    const [IDmealtype,setIDmealtype] = useState(null);
    

    const openModal = (record) => {
        setEditMeal(record);
        console.log("Meals:",record)
        setModalIsOpen(true);
      };
    
    const closeModal = () => {
        setModalIsOpen(false);
        setEditMeal(null);
    };

    const openModalDate = (record) =>{
        setEditDateMeal(record);
        setModalDateIsOpen(true);
    }

    const closeModalDate = () => {
        setModalDateIsOpen(false);
        setEditDateMeal(null);
    };

    const getFoods = async () => {
        try {
            setLoading(true);
            console.log("entre");
            const { data, error } = await supabase
                .from("alimentos")
                .select(
                    "idAlimentos,BancoAlimentos(idBancoAlimentos,food),created_at,hour,tipoComida(idTipocomida,meal),portion"
                )
                .eq("uid", user.id)
                .order("hour", { ascending: true });
            if (error) console.log("error", error);
            setFoods(data);
            setOriginalFoods(data);
        } catch (error) {
            console.log(error);
        } finally {
            setLoading(false);
        }
    };

    const updatemeal = async (
        {
            id,
            porcion
        },
        { setSubmitting, setErrors, resetForm }
    ) =>{
        try { 
            setSubmitting(true);
            // const isoDate = new Date(day).toISOString();
            // idAlimentos,idBancoAlimentos,created_at,hour,idTipoComida,portion,uid
            console.log("id:",id,"date:",datameal[0].id,"portion:",porcion);
            // console.log(datameal);
            const idBankAliments = datameal[0].id;

            const {data,error} = await supabase
                .from("alimentos")
                .update({
                    portion:porcion,
                    idBancoAlimentos:idBankAliments,
                })
                .eq("uid",user.id)
                .eq("idAlimentos",id);
            closeModal();
        } catch (error) {
            console.log(error);
        } finally{
            setLoading(false);
            filterDay();
            getFoods();//actualiza
        }
    };

    const getMeals = async () => {
        try{
            setLoading(true);
            const { data, error } = await supabase
                .from("BancoAlimentos")
                .select(
                    "idBancoAlimentos,food,tipoAlimento(idTipoalimento,food), portionamount, carbohydrates, unidadesMedida(idUnidadMedida,name)"
                )
                .eq("uid",user.id)
                .order("idBancoAlimentos", { ascending: true });
            if (error) console.log("error",error);
                setDataMeals(data);
        } catch (error){
            console.log(error);
        } finally {
            setLoading(false);
        }
    };

    const deletemeal = async (id) => {
        try {
            setLoading(true);
            await supabase
                .from("alimentos")
                .delete()
                .eq("uid",user.id)
                .eq("idAlimentos",id);
        } catch (error) {
            console.log(error);
        } finally{
            setLoading(false);
            filterDay();
            getFoods();
        }
    };

    const updatedate = async (alimentos) => {
        console.log(alimentos);
        // try {
        //     setLoading(true);
            
        // } catch (error) {
        //     console.log(error);
        // } finally{
        //     setLoading(false);
        // }
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

    function convertDate(isoString) {
        return isoString.split('T')[0];
    }

    const filterDay = () => {
        const mealFilter = originalFoods.filter(item =>
            convertDate(item.created_at) === daySelect
        );
        // Actualizar el estado con los alimentos filtrados
        setFoods(mealFilter);
        // Procesar los alimentos filtrados para mostrar las comidas agrupadas
        const mealType = () => {
            const Mealstype = [];
            const seenMealIds = new Set();

            mealFilter.forEach(data => {
                if (!seenMealIds.has(data.tipoComida.idTipocomida)) {
                    Mealstype.push({
                        tipoComida: {
                            idTipocomida: data.tipoComida.idTipocomida,
                            meal: data.tipoComida.meal
                        },
                        hour: {},
                        meal: []
                    });
                    seenMealIds.add(data.tipoComida.idTipocomida);
                }
            });
            setOriginalMeals(Mealstype);
        };
        mealType();
    };

    const handleSearch = (e) => {
        setDataMeal([]);
        if (e.target.value.trim() === "") return setDataAuxMeals([]);
        const newData = datameals.filter((item) =>{
            return item.food
                .toLowerCase()
                .includes(e.target.value.toLowerCase());
        });
        setDataAuxMeals(newData);
        console.log(dataAuxMeals);
    };

    const handleDay = (e) => {
        setDaySelect(e.target.value);
    };

    const handleBoton = (id) => {
        setIDmeal(preID => preID === id ? null : id);
        setIDmealtype(null);
    }

    const handleBotonMealType = (id) => {
        setIDmealtype(preID => preID === id ? null : id);
        setIDmeal(null);
    }

    const validationSchema = Yup.object().shape({
        porcion:Yup.number().required("Este campo es requerido")
    })

    useEffect(() => {
        getFoods();
        getMeals();
        getMealsType();
    }, [user]);

    useEffect(() => {
        const getMeals = (comidas) => {
            const get = comidas.map(comida => {
                const filterFoods = foods.filter(food => food.tipoComida.idTipocomida === comida.tipoComida.idTipocomida);

                return {
                    ...comida,
                    hour: filterFoods[0]?.hour || {}, // Toma la primera hora de los alimentos filtrados
                    meal: filterFoods.map(food => ({
                        idAlimentos: food.idAlimentos,
                        BancoAlimentos: {
                            idBancoAlimentos: food.BancoAlimentos.idBancoAlimentos,
                            food: food.BancoAlimentos.food
                        },
                        portion: food.portion
                    }))
                };
            });
            setMeals(get);
        };

        if (originalMeals.length > 0) {
            getMeals(originalMeals);
        }
    }, [originalMeals]);

    return (
        <div>
            <SideBar />
            <div className="p-16 pt-24 sm:ml-64" data-aos="fade-up">
                <h2 className="text-2xl font-semibold mb-4">Tus Comidas</h2>
                <div className="flex items-center mb-3 px-2 space-x-2">
                    <div>
                        <span>Dia:</span>
                        <input
                            type="date"
                            onChange={handleDay}
                            className="mx-3 w-48 text-center border-gray-400 rounded-xl"
                        />
                        <button
                            onClick={filterDay}
                            className="bg-blue-500 text-white rounded-lg px-3 py-1.5 ml-3"
                            disabled={loading}
                        >
                            Filtrar
                        </button>
                        <button
                            onClick={filterDay}
                            className="bg-red-600 text-white rounded-lg px-3 py-1.5 ml-3"
                        >
                            Actualizar
                        </button>
                        <div className="w-full mt-4">
                            {loading && <p>Loading...</p>}

                            {!loading && meals.length === 0 && (
                                <p className="text-lg font-medium text-center text-gray-400">
                                    Sin registros
                                </p>
                            )}
                            {meals.length > 0 && meals.map(comida => (
                                <div className="mb-6" key={comida.tipoComida.idTipocomida}>
                                    <div className="flex items-center">
                                        <h3 className="text-xl font-semibold cursor-pointer hover:underline" onClick={() =>handleBotonMealType(comida.tipoComida.idTipocomida)}>{comida.tipoComida.meal} - {comida.hour}</h3>
                                        {IDmealtype === comida.tipoComida.idTipocomida && (
                                            <div className="flex" data-aos="fade-left" data-aos-duration="250">
                                                <button
                                                    type="button"
                                                    onClick={() =>openModalDate(comida)}
                                                    className="bg-azulHover mx-4 p-1 rounded hover:bg-azul text-white flex"
                                                >
                                                    <img src={edit} alt="editar" className="h-5" />
                                                    <p className="px-2">Editar</p>
                                                </button>
                                                <button
                                                    type="button"
                                                    onClick={() =>updatedate(comida)}
                                                    className="bg-red-600 p-1 rounded hover:bg-red-800 text-white flex"
                                                >
                                                    <img src={delate} alt="borrar" className="h-5" />
                                                    <p className="px-2">Borrar</p>
                                                </button>
                                            </div>
                                        )}
                                    </div>
                                    <div className='border-solid border-l-2 border-l-black pl-2'>
                                        <ul>
                                            {comida.meal.map(alimento => (
                                                <li key={alimento.idAlimentos} className="flex items-center pb-2">
                                                    <a className="cursor-pointer hover:underline" onClick={ () => handleBoton(alimento.idAlimentos)}> 
                                                        {alimento.portion} {alimento.BancoAlimentos.food}
                                                    </a>
                                                    {IDmeal === alimento.idAlimentos && (
                                                        <div className="flex" data-aos="fade-left" data-aos-duration="250">
                                                            <button
                                                                type="button"
                                                                onClick={() => openModal(alimento)}
                                                                className="bg-azulHover mx-4 p-1 rounded hover:bg-azul text-white flex"
                                                            >
                                                                <img src={edit} alt="editar" className="h-5" />
                                                                <p className="px-2">Editar</p>
                                                            </button>
                                                            <button
                                                                type="button"
                                                                onClick={() => deletemeal(alimento.idAlimentos)}
                                                                className="bg-red-600 p-1 rounded hover:bg-red-800 text-white flex"
                                                            >
                                                                <img src={delate} alt="borrar" className="h-5" />
                                                                <p className="px-2">Borrar</p>
                                                            </button>
                                                        </div>
                                                    )}
                                                </li>
                                            ))}
                                        </ul>
                                    </div>
                                </div>
                            ))} 
                        </div>
                        <Modal
                            isOpen={modalDateIsOpen}
                            onClose={closeModalDate}
                            title={"Editar"}
                            width={"max-w-4xl"}
                        >
                            {editDateMeal && (
                            <div>
                                <div className="w-full mb-2 items-center">
                                    <label className="text-sm font-medium text-gray-900 dark:text-white">
                                        Tipo de alimento:
                                    </label>

                                </div>
                            </div>    
                            )}
                        </Modal>
                        <Modal
                            isOpen={modalIsOpen}
                            onClose={closeModal}
                            title={"Editar"}
                            width={"max-w-4xl"}
                        >

                            {editMeal && (
                                <div>
                                    <Formik
                                        initialValues={{
                                            porcion:1,
                                            id:editMeal.idAlimentos
                                        }}
                                        validationSchema={validationSchema}
                                        onSubmit={updatemeal}
                                    >
                                        {({
                                            values,
                                            errors,
                                            touched,
                                            handleBlur,
                                            handleChange,
                                            handleSubmit,
                                            isSubmitting
                                        }) =>(
                                            <form onSubmit={handleSubmit}>
                                                <div className="w-full mb-2 items-center">
                                                    {/* nombre del alimento */}
                                                    <label className="text-sm font-medium text-gray-900 dark:text-white">
                                                        Nombre del alimento:
                                                    </label>
                                                    <div className="w-full mx-auto">
                                                        <label
                                                            for="default-search"
                                                            className="mb-2 text-sm font-medium text-gray-900 sr-only dark:text-white"
                                                        >
                                                            Search
                                                        </label>
                                                        <div className="relative">
                                                            <div className="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
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
                                                            id="meal"
                                                            name="meal"
                                                            autoComplete="off"
                                                            onChange={handleSearch}
                                                            className="block w-full p-2.5 ps-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                                            placeholder="Buscar comida..."
                                                            />
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
                                                    <div className="pr-2">
                                                        <label className="whitespace-nowrap w-auto text-sm font-medium text-gray-900 dark:text-white">
                                                            Cantidad por porción:
                                                        </label>
                                                        <input
                                                            type="number" name="porcion" id="porcion"
                                                            defaultValue={values.porcion} min={1} max={100}
                                                            onChange={handleChange} onBlur={handleBlur}
                                                            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-50 p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                                        />
                                                        <p className="text-sm text-red-500 dark:text-white w-full">
                                                            {errors.porcion && touched.porcion && errors.porcion}
                                                        </p>
                                                    </div>
                                                </div>
 
                                                <button
                                                    type="submit"
                                                    className="flex items-center justify-between bg-azulHover transition duration-300 ease-out hover:ease-out hover:bg-azul mt-4 px-7 py-1 rounded-lg text-white"
                                                >
                                                    Editar
                                                </button>
                                            </form>
                                        )}
                                    </Formik>
                                </div>
                            )}
                        </Modal>
                    </div>
                </div>
            </div>
        </div>
    );
}
