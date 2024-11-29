import {useState} from "react";
import {MdEmail, MdLock, MdPerson} from "react-icons/md";
import { useKeycloak } from '@react-keycloak/web'
import KeycloakService from "./keycloak";

const AuthSideBar = ({isOpen, onClose}) => {
    const [isLogin, setIsLogin] = useState(true);
    const [formData, setFormData] = useState({
        username: "",
        password: "",
        displayName: "",
        email: "",
    });
    const [errorMessage, setErrorMessage] = useState("");

    const { keycloak, initialized } = useKeycloak()


    const handleChange = (e) => {
        const {name, value} = e.target;
        setFormData((prev) => ({...prev, [name]: value}));
    };

    // Đóng modal khi bấm ra ngoài
    const handleOverlayClick = (e) => {
        if (e.target === e.currentTarget) {
            onClose();
        }
    };

    // Hàm gửi dữ liệu đăng ký
    const handleRegister = async (e) => {
        e.preventDefault();

        // Kiểm tra yêu cầu tên đăng nhập và mật khẩu
        if (formData.password.length < 6) {
            setErrorMessage("Mật khẩu phải tối thiểu 6 ký tự!");
            return;
        }

        try {
            const response = await fetch("/api/register", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    username: formData.username,
                    password: formData.password,
                    displayName: formData.displayName,
                    email: formData.email,
                }),
            });

            const data = await response.json();

            if (data.success) {
                // Đăng ký thành công, chuyển qua form đăng nhập
                setIsLogin(true);
                setErrorMessage("");
            } else {
                setErrorMessage(data.message || "Đã có lỗi xảy ra!");
            }
        } catch (error) {
            setErrorMessage("Lỗi kết nối với máy chủ!");
        }
    };

    // Hàm gửi dữ liệu đăng nhập
    const handleLogin = async (e) => {
        e.preventDefault();
        keycloak.login();


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
                        onClick={() =>{
                            keycloak.login();
                        }}
                        className={`${isLogin ? "text-blue-400 border-b-2 border-blue-400" : "text-gray-400"}`}
                    >
                        Đăng nhập
                    </button>
                </div>

                <div className="flex justify-around mb-6 text-lg font-semibold">
                    <button
                        onClick={() => setIsLogin(true)}
                        className={`${isLogin ? "text-blue-400 border-b-2 border-blue-400" : "text-gray-400"}`}
                    >
                        Đăng nhập
                    </button>
                    <button
                        onClick={() => setIsLogin(false)}
                        className={`${!isLogin ? "text-blue-400 border-b-2 border-blue-400" : "text-gray-400"}`}
                    >
                        Đăng ký
                    </button>
                </div>

                {errorMessage && (
                    <div className="text-red-500 text-sm mb-4">{errorMessage}</div>
                )}

            </div>
        </div>
    );
};

export default AuthSideBar;
