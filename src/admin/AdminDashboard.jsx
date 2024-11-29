// src/admin/AdminDashboard.js
import React from 'react';
import { MdMovie, MdPeople, MdShoppingCart } from 'react-icons/md';
import {useKeycloak} from "@react-keycloak/web"; // Sử dụng các icon từ react-icons/md

const AdminDashboard = () => {

    const {keycloak,initialized} = useKeycloak();
    if(!!keycloak.authenticated) {
        return(
        <div className="grid grid-cols-1 mt-7 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            <div
                className="bg-white p-6 rounded-lg shadow-md hover:shadow-xl hover:bg-gray-50 transition-all duration-300 transform hover:scale-105">
                <div className="flex items-center">
                    <MdMovie className="w-8 h-8 text-blue-500 mr-4"/>
                    <div>
                        <h3 className="text-xl text-slate-600 font-semibold mb-2">Total Movies</h3>
                        <p className="text-2xl text-slate-600 ">120</p>
                    </div>
                </div>
            </div>

            <div
                className="bg-white p-6 rounded-lg shadow-md hover:shadow-xl hover:bg-gray-50 transition-all duration-300 transform hover:scale-105">
                <div className="flex items-center">
                    <MdPeople className="w-8 h-8 text-green-500 mr-4"/>
                    <div>
                        <h3 className="text-xl text-slate-600 font-semibold mb-2">Total Users</h3>
                        <p className="text-2xl text-slate-600">250</p>
                    </div>
                </div>
            </div>

            <div
                className="bg-white p-6 rounded-lg shadow-md hover:shadow-xl hover:bg-gray-50 transition-all duration-300 transform hover:scale-105">
                <div className="flex items-center">
                    <MdShoppingCart className="w-8 h-8 text-red-500 mr-4"/>
                    <div>
                        <h3 className="text-xl text-slate-600 font-semibold mb-2">Total Views</h3>
                        <p className="text-2xl text-slate-600">5000000</p>
                    </div>
                </div>
            </div>
        </div>)
    }
    return(
        <div>
            Yêu cầu đăng nhập
            <button onClick={event => {
                keycloak.login();
            }}>đăng nhập</button>
        </div>
    )

    ;
};

export default AdminDashboard;
