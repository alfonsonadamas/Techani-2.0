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

export default function AllFoodsRegister (){
 return(
    <div>
        <SideBar/>
        <div className="p-16 pt-24 sm:ml-64" data-aos="fade-up">
            <h2 className="text-2xl font-semibold mb-4">Tus Comidas</h2>
            <div className="flex items-center mb-3 px-2 space-x-2">
            </div>
        </div>
    </div>
 )   
}