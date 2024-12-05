import { useState } from "react";
import { useKeycloak } from "@react-keycloak/web";
import KeycloakService from "./keycloak";

const AuthSideBar = ({ isOpen, onClose }) => {
    const { keycloak } = useKeycloak();

    const handleOverlayClick = (e) => {
        if (e.target === e.currentTarget) {
            onClose();
        }
    };

    return (
        <div
            className={`fixed top-0 right-0 h-full w-full bg-black bg-opacity-40 z-50 transition-all ${
                isOpen ? "visible opacity-100" : "invisible opacity-0"
            }`}
            onClick={handleOverlayClick}
        >
            <div
                className={`fixed top-0 right-0 h-full w-80 bg-slate-800 p-6 transform transition-transform ${
                    isOpen ? "translate-x-0" : "translate-x-full"
                }`}
            >
                <button
                    onClick={onClose}
                    className="text-gray-400 text-xl absolute top-4 right-4"
                >
                    X
                </button>

                <div className="my-5">
                    <h1 className="text-xl font-bold text-white mb-4">Chào khách!</h1>
                    <h3 className="text-gray-400 mb-6">
                        {keycloak.authenticated
                            ? `Xin chào ${KeycloakService.getUsername()}`
                            : "Vui lòng đăng nhập"}
                    </h3>

                    <div className="space-y-4">
                        {!keycloak.authenticated && (
                            <button
                                onClick={async () => {
                                    await keycloak.login();
                                }}
                                className="w-full py-2 px-4 bg-blue-500 text-white text-center rounded-lg shadow hover:bg-blue-600"
                            >
                                Đăng nhập
                            </button>
                        )}

                        {keycloak.authenticated && (
                            <>
                                <button
                                    onClick={async () => {
                                        const accountUrl = `${keycloak.authServerUrl}/realms/${keycloak.realm}/account`;
                                        window.location.href = accountUrl;
                                    }}
                                    className="w-full py-2 px-4 bg-green-500 text-white text-center rounded-lg shadow hover:bg-green-600"
                                >
                                    Info
                                </button>

                                <button
                                    onClick={async () => {
                                        await keycloak.logout();
                                    }}
                                    className="w-full py-2 px-4 bg-red-500 text-white text-center rounded-lg shadow hover:bg-red-600"
                                >
                                    Đăng xuất
                                </button>
                            </>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AuthSideBar;
