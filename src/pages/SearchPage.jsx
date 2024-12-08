import { useLocation, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import Card from "../components/Card";

const SearchPage = () => {
  const location = useLocation();
  const [data, setData] = useState([]); // Dữ liệu trả về từ API
  const [page, setPage] = useState(1); // Trang hiện tại
  const [searchQuery, setSearchQuery] = useState(""); // Lưu trữ giá trị từ input
  const [debouncedQuery, setDebouncedQuery] = useState(""); // Lưu giá trị debounce
  const navigate = useNavigate();
  const query = new URLSearchParams(location.search).get("q"); // Lấy giá trị từ query string

  // Hàm gọi API
  const fetchData = async (query) => {
    if (!query) return; // Nếu không có query thì không gọi API

    try {
      const response = await axios.get("/api/movie/search", {
        params: {
          query: query, // Gửi từ khóa tìm kiếm
          limit: 40, // Giới hạn kết quả trả về mỗi lần
        },
      });
      if (response.data) {
        setData(response.data.data || []); // Gán kết quả tìm kiếm
      } else {
        console.log("No results found");
      }
    } catch (error) {
      console.error("Error fetching search results:", error);
    }
  };

  // Cập nhật `debouncedQuery` sau 1 giây khi searchQuery thay đổi
  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedQuery(searchQuery);
    }, 1000); // 1 giây

    return () => clearTimeout(handler); 
  }, [searchQuery]);

  // Fetch dữ liệu khi `debouncedQuery` thay đổi
  useEffect(() => {
    if (debouncedQuery) {
      setPage(1); // Reset trang về 1
      fetchData(debouncedQuery); // Gọi API
    }
  }, [debouncedQuery]);

  // Xử lý thay đổi giá trị input
  const handleInputChange = (e) => {
    const value = e.target.value;
    setSearchQuery(value); // Cập nhật giá trị input
    navigate(`/search?q=${value}`); // Cập nhật URL
  };

  return (
    <div className="py-8">
      {/* Thanh tìm kiếm dành cho di động */}
      <div className="lg:hidden my-2 mx-1 sticky top-[70px] z-30">
        <input
          type="text"
          placeholder="Tìm kiếm phim ở đây..."
          onChange={handleInputChange}
          value={searchQuery || ""}
          className="px-4 py-1 text-lg w-full bg-white rounded-full text-neutral-900"
        />
      </div>
      <div className="container mx-auto">
        <h1 className="capitalize text-lg lg:text-xl font-bold my-3">
          Kết quả tìm kiếm
        </h1>
        {/* Hiển thị danh sách kết quả tìm kiếm */}
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
