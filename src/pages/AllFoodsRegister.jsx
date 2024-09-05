import React, { useState, useEffect } from 'react';
import { useUserContext } from "../context/UserContext";
import { supabase } from "../config/supabase";
import SideBar from '../components/SideBar';
import Modal from "../components/Modal";

import edit from "../assets/img/edit.png";
import delate from "../assets/img/delate.png";

export default function AllFoodsRegister() {
    const { user } = useUserContext();
    const [loading, setLoading] = useState(false);
    const [meals, setMeals] = useState([]);
    const [originalMeals, setOriginalMeals] = useState([]);
    const [foods, setFoods] = useState([]);
    const [originalFoods, setOriginalFoods] = useState([]);
    const [daySelect, setDaySelect] = useState("");
    const [editMeal, setEditMeal] = useState(null);
    const [modalIsOpen, setModalIsOpen] = useState(false);
    const [IDmeal,setIDmeal] = useState(null);

    const openModal = (record) => {
        setEditMeal(record);
        console.log(record)
        setModalIsOpen(true);
      };
    
    const closeModal = () => {
        setModalIsOpen(false);
        setEditMeal(null);
    };

    const getFoods = async () => {
        try {
            setLoading(true);
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
    const deletemeal = async (id) => {
        console.log("Comida:",id);
    };

    const handleDay = (e) => {
        setDaySelect(e.target.value);
    };

    const handleBoton = (id) => {
        setIDmeal(preID => preID === id ? null : id);
    }

    useEffect(() => {
        getFoods();
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
                        <div className="w-full mt-4">
                            {loading && <p>Loading...</p>}

                            {!loading && meals.length === 0 && (
                                <p className="text-lg font-medium text-center text-gray-400">
                                    Sin registros
                                </p>
                            )}
                            {meals.length > 0 && meals.map(comida => (
                                <div className="mb-6" key={comida.tipoComida.idTipocomida}>
                                    <h3 className="text-xl font-semibold">{comida.tipoComida.meal} - {comida.hour}</h3>
                                    <ul>
                                        {comida.meal.map(alimento => (
                                            <li key={alimento.idAlimentos} className="flex items-center pb-2">
                                                <a className="cursor-pointer hover:underline" onClick={ () => handleBoton(alimento.idAlimentos)}> {alimento.portion} {alimento.BancoAlimentos.food} </a>
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
                            ))}
                        </div>
                        <Modal
                            isOpen={modalIsOpen}
                            onClose={closeModal}
                            title={"Alimento"}
                        >
                            {editMeal && (
                                <div>
                                    <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                                        Nombre del alimento:
                                    </label>
                                    <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                                        Tipo de alimento:
                                    </label>
                                    <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                                        Cantidad por porción:
                                    </label>
                                    <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                                        Fecha:
                                    </label>
                                </div>
                            )}
                        </Modal>
                    </div>
                </div>
            </div>
        </div>
    );
}
