import { useLocation, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import Card from "../components/Card";

const SearchPage = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const query = new URLSearchParams(location.search).get("q") || ""; // Query từ URL
    const [data, setData] = useState([]); // Dữ liệu kết quả tìm kiếm
    const [searchQuery, setSearchQuery] = useState(query); // Giá trị input tìm kiếm
    const [debouncedQuery, setDebouncedQuery] = useState(query); // Giá trị debounce

    // Debounce logic: Cập nhật giá trị debounce sau 1 giây
    useEffect(() => {
        const handler = setTimeout(() => {
            setDebouncedQuery(searchQuery);
        }, 1000);

        return () => clearTimeout(handler);
    }, [searchQuery]);

    // Gọi API khi debounce thay đổi
    useEffect(() => {
        const fetchData = async () => {
            if (!debouncedQuery.trim() && debouncedQuery !== "") {
                setData([]); // Xóa kết quả nếu input rỗng
                return;
            }
            try {
                const response = await axios.get("/api/movie/search", {
                    params: {
                        query: debouncedQuery,
                        limit: 40,
                    },
                });
                setData(response.data?.data || []);
            } catch (error) {
                console.error("Error fetching search results:", error);
            }
        };
        fetchData();
    }, [debouncedQuery]);

    // Đồng bộ searchQuery với query string trên URL
    useEffect(() => {
        setSearchQuery(query);
    }, [query]);

    return (
        <div className="py-8">
            {/* Thanh tìm kiếm dành cho di động */}
            <div className="lg:hidden my-2 mx-1 sticky top-[70px] z-30">
                <input
                    type="text"
                    placeholder="Tìm kiếm phim ở đây..."
                    onChange={(e) => navigate(`/search?q=${e.target.value}`)}
                    value={searchQuery}
                    className="px-4 py-1 text-lg w-full bg-white rounded-full text-neutral-900"
                />
            </div>
            <div className="container mx-auto">
                <h1 className="capitalize text-lg lg:text-xl font-bold my-3">
                    Kết quả tìm kiếm
                </h1>
                <div className="grid grid-cols-[repeat(auto-fit,230px)] gap-6 justify-center lg:justify-start">
                    {data.length > 0 ? (
                        data.map((item) => <Card data={item} key={item.Id} />)
                    ) : (
                        <p className="text-center text-gray-500">
                            Không tìm thấy kết quả phù hợp.
                        </p>
                    )}
                </div>
            </div>
        </div>
    );
};

export default SearchPage;
