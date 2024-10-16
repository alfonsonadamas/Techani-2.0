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
    const [editTimeMeal,setEditTimeMeal] = useState(null);
    const [editMealType,setEditMealType] = useState(null);
    const [modalIsOpen, setModalIsOpen] = useState(false);
    const [modalTimeIsOpen, setModalTimeIsOpen] = useState(false);
    const [modalMealTypeIsOpen,setModalMealTypeIsOpen] = useState(false);
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

    const openModalMealType = (record) => {
        setEditMealType(record);
        setModalMealTypeIsOpen(true);
    }

    const closeModalMealType = () => {
        setModalMealTypeIsOpen(false);
        setEditMealType(null);
    }

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

    const updateMealType = async (
        { comidas, mealType, hora },
        { setSubmitting, setErrors, resetForm }
    ) => {
        try {
            setSubmitting(true);
            console.log("Comidas:", comidas, "IdComidas", comidas.tipoComida.idTipocomida, "Mealtype:", mealType, "foods:", foods, "hora:",hora);
    
            const idTipocomida = comidas.tipoComida.idTipocomida;
            if (idTipocomida != mealType) {
                const mealsfilter = foods.filter((food) => {
                    return (
                        food.tipoComida.idTipocomida === Number(mealType) &&
                        food.created_at === comidas.date
                    );
                });
                console.log(mealsfilter);
                const hour_destiny = mealsfilter[0]?.hour;
                await Promise.all(
                    comidas.meal.map(async (comida) => {
                        // Filtrar para obtener los elementos que coinciden con comida
                        const matchingMeals = mealsfilter.filter(item => comida.BancoAlimentos.idBancoAlimentos === item.BancoAlimentos.idBancoAlimentos);

                        if (matchingMeals.length > 0) {
                            await Promise.all(matchingMeals.map(async (matchingMeal) => {
                                console.log("Existe", matchingMeal.BancoAlimentos.food);
                                console.log("Porción pasa de:", comida.portion, " a ", comida.portion + 1);
                                
                                const { error } = await supabase
                                    .from("alimentos")
                                    .update({
                                        portion: matchingMeal.portion + comida.portion,
                                        ...(hora === matchingMeal.hour ? {} : {hour:hora})
                                    })
                                    .eq("uid", user.id)
                                    .eq("idAlimentos", matchingMeal.idAlimentos);//se cambia la porcion a +1 de las seccion del tipo de comida seleccionada
    
                                if (!error) {
                                    // Solo si la actualización fue exitosa, ejecutar `deletemeal`
                                    deletemeal(comida.idAlimentos); // se borra de la sección del tipo de comida de origen
                                } else {
                                    console.log("Error al actualizar la porción para el alimento con id:", matchingMeal.idAlimentos);
                                }
                            }));
                        } else {
                            console.log("No existe", comida.BancoAlimentos.food);
                            await supabase
                                .from("alimentos")
                                .update({
                                    idTipoComida: mealType,
                                    ...(hora === hour_destiny ? {hour:hour_destiny} : {hour:hora})
                                })
                                .eq("uid", user.id)
                                .eq("idAlimentos", comida.idAlimentos); // se traslada el id del tipo de comida
                        }
                    })
                );
            }else{
                console.log("Tipo de comida igual")
                await Promise.all(
                    comidas.meal.map(async (comida) =>{
                        if(comida.hour != hora){
                            console.log("horas diferentes")
                            await supabase
                            .from("alimentos")
                            .update({
                                hour:hora
                            })
                            .eq("uid",user.id)
                            .eq("idAlimentos",comida.idAlimentos);
                        }else{
                            console.log("horas iguales")
                        }
                    })
                );
            }
            closeModalMealType();
        } catch (error) {
            console.log(error);
        } finally {
            setSubmitting(false);
            filterDay();
            getFoods();
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

    const deletemeals = async (alimentos) => {
        console.log(alimentos);
        try {
            setLoading(true);
            await Promise.all(
                alimentos.meal.map(async (alimento) =>{
                    await supabase
                    .from("alimentos")
                    .delete()
                    .eq("uid",user.id)
                    .eq("idAlimentos",alimento.idAlimentos);
                })
            )
        } catch (error) {
            console.log(error);
        } finally{
            setLoading(false);
        }
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
                        date: {},
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

    const validationSchemaTime = Yup.object().shape({
        time:Yup.string().required("Este campo es requerido")
    })

    const validationSchemaMealtype = Yup.object().shape({
        mealType:Yup.string().required("Este campo es requerido"),
    })

    let fecha = new Date(daySelect);
    fecha.setDate(fecha.getDate() + 1);
    let opciones = { 
        weekday: 'long', 
        year: 'numeric', 
        month: 'long', 
        day: 'numeric' 
    };

    let date = !isNaN(fecha) ? fecha.toLocaleDateString('es-ES', opciones) : null ;

    useEffect(() => {
        getFoods();
        getMeals();
        getMealsType();
        console.log("food",foods);
    }, [user]);

    useEffect(() => {
        const getMeals = (comidas) => {
            const get = comidas.map(comida => {
                const filterFoods = foods.filter(food => food.tipoComida.idTipocomida === comida.tipoComida.idTipocomida);

                return {
                    ...comida,
                    hour: filterFoods[0]?.hour || {}, // Toma la primera hora de los alimentos filtrados
                    date: filterFoods[0]?.created_at || {},
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
        console.log(meals);
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
                        >
                            Filtrar
                        </button>
                        <button
                            onClick={filterDay}
                            className="bg-red-600 text-white rounded-lg px-3 py-1.5 ml-3"
                        >
                            Actualizar
                        </button>
                        <p className="my-3"><span>⚠</span>Selecciona un alimento para ver más opciones</p>
                        <h1 className="text-blue-500">{date}</h1>
                        <div className="flex w-full mt-4">
                            {meals && meals.length === 0 &&(
                            <div>
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

                            {foods.length > 0 && meals.map(comida => (
                                <div className="mb-6 mx-4" key={comida.tipoComida.idTipocomida}>
                                    <div className="">
                                        <h3 className="text-xl font-semibold cursor-pointer hover:underline" onClick={() =>handleBotonMealType(comida.tipoComida.idTipocomida)}>{comida.tipoComida.meal} - {comida.hour}</h3>
                                        {IDmealtype === comida.tipoComida.idTipocomida && (
                                            <div className="flex" data-aos="fade-left" data-aos-duration="250">
                                                <button
                                                    type="button"
                                                    onClick={() =>openModalMealType(comida)}
                                                    className="bg-azulHover mx-4 p-1 rounded hover:bg-azul text-white flex"
                                                >
                                                    <img src={edit} alt="editar" className="h-5" />
                                                    <p className="px-2">Editar</p>
                                                </button>
                                                <button
                                                    type="button"
                                                    onClick={() =>deletemeals(comida)}
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
                            isOpen={modalMealTypeIsOpen}
                            onClose={closeModalMealType}
                            title={"Editar tipo de comida"}
                            width={"max-w-md"}
                        >
                            {editMealType && (
                                <div>
                                    <Formik
                                        initialValues={{
                                            comidas:editMealType,
                                            mealType:editMealType.tipoComida.idTipocomida,
                                            hora:editMealType.hour
                                        }}
                                        // validationSchema={validationSchemaMealtype}
                                        onSubmit={updateMealType}
                                    >
                                        {({
                                            values,
                                            errors,
                                            touched,
                                            handleBlur,
                                            handleChange,
                                            handleSubmit,
                                        }) =>(
                                            <form onSubmit = {handleSubmit}>
                                                <div className="w-full mb-2 items-center">
                                                    <label className="text-sm font-medium text-gray-900 dark:text-white">
                                                        Tipo de Comida:
                                                    </label>
                                                    <select
                                                        name="mealType" id="mealType"
                                                        defaultValue={values.mealType}
                                                        onChange={handleChange}
                                                        onBlur={handleBlur}
                                                        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                                    >
                                                        <option value="">Selecciona...</option>
                                                        {mealsType.map((comida) =>
                                                            <option
                                                                key={comida.idTipocomida}
                                                                value={comida.idTipocomida}
                                                            >
                                                                {comida.meal}
                                                            </option>
                                                        )}
                                                    </select>
                                                    <label className="text-sm font-medium text-gray-900 dark:text-white">
                                                        Hora:
                                                    </label>
                                                    <input
                                                        type="time"
                                                        id="hora"
                                                        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                                        onChange={handleChange}
                                                        onBlur={handleBlur}
                                                        value={values.hora}
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
