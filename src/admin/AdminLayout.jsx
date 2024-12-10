import { Link, Outlet, useLocation, useNavigate } from 'react-router-dom';
import { MdDashboard, MdMovie, MdOutlineArticle, MdHome } from 'react-icons/md'; // Thêm MdHome và MdOutlineArticle
import DashboardHeader from './DashboardHeader';
import KeycloakService from "../components/keycloak";
import { useKeycloak } from '@react-keycloak/web';
import React, { useEffect } from 'react';
import { ROLES } from "../constants/roleConstants";

const AdminLayout = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const { keycloak, initialized } = useKeycloak();

    useEffect(() => {
        if (initialized && keycloak.authenticated) {
            if (!KeycloakService.hasRealmRole([ROLES.ADMIN])) {
                navigate('/');
            }
        }
    }, [keycloak, initialized, navigate]);

    if (!initialized || !keycloak.authenticated || !KeycloakService.hasRealmRole([ROLES.ADMIN])) {
        navigate("/");
        return <></>;
    }

    return (
        <div className="flex min-h-screen bg-gray-100">
        {/* Sidebar */}
        <div className="w-1/5 bg-sky-700 text-white p-5 space-y-4">
            <h2 className="my-3 text-4xl font-bold">Admin Panel</h2>
            <hr className="my-4 md:min-w-full" />
            <nav className="text-xl space-y-6">
                {/* Các Link */}
                <Link
                    to="/"
                    className="flex items-center p-2 rounded transition-all duration-300 hover:bg-blue-600"
                >
                    <MdHome className="w-6 h-6 mr-2" />
                    Trang Chủ
                </Link>
                <Link
                    to="/admin/dashboard"
                    className={`flex items-center p-2 rounded transition-all duration-300 ${
                        location.pathname === '/admin/dashboard' ? 'bg-blue-600' : 'hover:bg-blue-600'
                    }`}
                >
                    <MdDashboard className="w-6 h-6 mr-2" />
                    Dashboard
                </Link>
                <Link
                    to="/admin/movies"
                    className={`flex items-center p-2 rounded transition-all duration-300 ${
                        location.pathname === '/admin/movies' ? 'bg-blue-600' : 'hover:bg-blue-600'
                    }`}
                >
                    <MdMovie className="w-6 h-6 mr-2" />
                    Quản Lý Phim
                </Link>
                <Link
                    to="/admin/blog"
                    className={`flex items-center p-2 rounded transition-all duration-300 ${
                        location.pathname === '/admin/blog' ? 'bg-blue-600' : 'hover:bg-blue-600'
                    }`}
                >
                    <MdOutlineArticle className="w-6 h-6 mr-2" />
                    Quản Lý Tin Tức
                </Link>
            </nav>
        </div>

        {/* Main Content */}
        <div className="flex-1 flex flex-col p-6">
            <DashboardHeader />
            <div className="flex-1">
                <Outlet /> 
            </div>
        </div>
    </div>
    );
};

export default AdminLayout;
