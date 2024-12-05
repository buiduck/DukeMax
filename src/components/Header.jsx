import { NavLink, Link, useNavigate, useLocation } from "react-router-dom";
import logo1 from "../assets/logo.png";
import user from "../assets/user.png";
import { MdOutlineSearch } from "react-icons/md";
import { useEffect, useState } from "react";
import { navigation } from "../constants/navigation";
import AuthSideBar from "./AuthSideBar";

const Header = () => {
    const location = useLocation();
    const queryParam = new URLSearchParams(location.search).get("q") || ""; // Lấy từ query string
    const [searchInput, setSearchInput] = useState(queryParam);
    const [isSidebarOpen, setSidebarOpen] = useState(false);
    const navigate = useNavigate();

    const handleSubmit = (e) => {
        e.preventDefault();
        if (searchInput.trim()) {
            navigate(`/search?q=${searchInput}`); // Điều hướng khi nhập từ khóa
        }
    };

    useEffect(() => {
        setSearchInput(queryParam); // Cập nhật lại input khi query thay đổi
    }, [queryParam]);

    return (
        <header className="fixed flex top-0 w-full h-16 bg-slate-500 bg-opacity-40 z-40">
            <div className="container mt-8 mx-auto px-2 flex items-center ml-10">
                <Link to="/">
                    <img src={logo1} alt="logo" width={145} className="-ml-13 -mt-9" />
                </Link>
                <nav className="hidden lg:flex items-center mb-7 gap-3 ml-5">
                    {navigation.map((nav) => (
                        <NavLink
                            key={nav.label}
                            to={nav.href}
                            className="px-2 hover:text-neutral-400"
                        >
                            {nav.label}
                        </NavLink>
                    ))}
                </nav>
                <div className="ml-auto flex gap-6">
                    {/* Thanh tìm kiếm */}
                    <form className="flex items-center gap-2" onSubmit={handleSubmit}>
                        <input
                            type="text"
                            placeholder="Tìm kiếm phim ở đây..."
                            value={searchInput}
                            onChange={(e) => setSearchInput(e.target.value)}
                            className="bg-transparent -mt-8 px-4 py-1 outline-none border-b-2 hidden lg:block"
                        />
                        <button className="-mt-8 w-7 text-3xl text-gray-200">
                            <MdOutlineSearch />
                        </button>
                    </form>
                    {/* Hình đại diện */}
                    <div
                        onClick={() => setSidebarOpen(true)}
                        className="w-10 mb-9 rounded-full overflow-hidden cursor-pointer active:scale-50 transition-all"
                    >
                        <img src={user} alt="user" className="w-full h-full" />
                    </div>
                    <AuthSideBar
                        isOpen={isSidebarOpen}
                        onClose={() => setSidebarOpen(false)}
                    />
                </div>
            </div>
        </header>
    );
};

export default Header;
