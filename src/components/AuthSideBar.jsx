import {useState} from "react";
import {MdEmail, MdLock, MdPerson} from "react-icons/md";
import { useKeycloak } from '@react-keycloak/web'
import KeycloakService from "./keycloak";

const AuthSideBar = ({isOpen, onClose}) => {
    const [isLogin, setIsLogin] = useState(true);

    const [errorMessage, setErrorMessage] = useState("");

    const { keycloak, initialized } = useKeycloak()

    const handleOverlayClick = (e) => {
        if (e.target === e.currentTarget) {
            onClose();
        }
    };

    const navigateToAccount = async () => {
        if (keycloak.authenticated) {
            const proxyUrl = `/proxy/account-management`;
            const response = await fetch(proxyUrl, {
                method: "GET",
                headers: {
                    Authorization: `Bearer ${keycloak.token}`,
                },
            });

            const accountPage = await response.text();
            const newWindow = window.open();
            newWindow.document.write(accountPage);
        } else {
            await keycloak.login();
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
                <button onClick={onClose} className="text-gray-400 text-xl absolute top-4 right-4">
                    X
                </button>

                <div className="my-5">
                    <h1 className="text-xl">Chào khách!</h1>
                    <h3>Xin chào {KeycloakService.getUsername()}</h3>
                    <button
                        onClick={async () => {
                            await keycloak.login();
                        }}
                        className={`${isLogin ? "text-blue-400 border-b-2 border-blue-400" : "text-gray-400"}`}
                    >
                        Đăng nhập
                    </button>

                    <button
                        onClick={async () => {
                            const accountUrl = `${keycloak.authServerUrl}/realms/${keycloak.realm}/account`;
                            window.location.href = accountUrl;
                        }}
                        className={`${isLogin ? "text-blue-400 border-b-2 border-blue-400" : "text-gray-400"}`}
                    >
                        Info
                    </button>


                    <button
                        onClick={async () => {
                            await keycloak.logout();
                        }}
                        className={`${isLogin ? "text-blue-400 border-b-2 border-blue-400" : "text-gray-400"}`}
                    >
                        Đăng xuất
                    </button>

                </div>
            </div>
        </div>
    );
};

export default AuthSideBar;
