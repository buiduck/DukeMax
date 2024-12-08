import { useState, useEffect } from "react";
import axios from "axios";
import Select from "react-select"; // Import react-select

const MovieFilter = () => {
  // States lưu trữ dữ liệu từ các API
  const [categories, setCategories] = useState([]);
  const [countries, setCountries] = useState([]);

  // States cho các giá trị lọc được chọn
  const [selectedCategories, setSelectedCategories] = useState([]); // Chỉnh sửa để hỗ trợ nhiều thể loại
  const [selectedCountry, setSelectedCountry] = useState("");

  const handleFilter= ()=>{
    
  }
  // Lấy dữ liệu từ các endpoint
  useEffect(() => {
    const fetchFilters = async () => {
      try {
        // Fetch tất cả dữ liệu từ 2 API: category và country
        const [categoryRes, countryRes] = await Promise.all([
          axios.get("/api/category"),
          axios.get("/api/country")
        ]);

        // Lưu vào state tương ứng
        setCategories(categoryRes.data);
        setCountries(countryRes.data);
      } catch (err) {
        console.error("Có lỗi khi lấy dữ liệu:", err);
      }
    };
    fetchFilters();
  }, []);

  // Chuyển đổi dữ liệu category để phù hợp với react-select
  const categoryOptions = categories.map((category) => ({
    value: category.Name,
    label: category.Name
  }));

  const countryOptions = countries.map((country) => ({
    value: country.Name,
    label: country.Name
  }));

  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold text-center mb-6">Lọc Phim</h1>

      {/* Form lọc */}
      <div className="mb-6 flex gap-6 justify-center items-center">
        {/* Thể loại */}
        <div>
          <label htmlFor="category" className="block text-xl mb-2">Thể loại</label>
          <Select
            id="category"
            isMulti // Hỗ trợ chọn nhiều
            options={categoryOptions}
            value={selectedCategories}
            onChange={(selectedOptions) => setSelectedCategories(selectedOptions)}
            getOptionLabel={(e) => e.label} // Hiển thị label của option
            getOptionValue={(e) => e.value} // Dùng value là tên thể loại
            className="p-2 border rounded text-xl text-slate-700"
            placeholder="Chọn thể loại"
          />
        </div>

        {/* Quốc gia */}
        <div>
          <label htmlFor="country" className="block text-xl mb-2">Quốc gia</label>
          <select
            id="country"
            className="p-2 border rounded text-xl text-slate-700"
            value={selectedCountry}
            onChange={(e) => setSelectedCountry(e.target.value)}
          >
            <option value="">Chọn quốc gia</option>
            {countries.map((country) => (
              <option key={country.Id} value={country.Name}>{country.Name}</option>
            ))}
          </select>
        </div>

        <div className="mt-7">
            <button
                onClick={handleFilter}
                className="bg-blue-500 text-white  p-3 px-8 rounded-lg w-full sm:w-auto"
              >
                Lọc
            </button>
        </div>
      </div>

      {/* Hiển thị dữ liệu từ 2 endpoint */}
      <div>
        <h2 className="text-2xl font-semibold mb-4">Dữ liệu lọc</h2>
        <div className="space-y-2">
          <h3 className="text-xl mb-2">Thể loại đã chọn: </h3>
          <div className="flex flex-wrap gap-2">
            {selectedCategories.map((category) => (
              <span key={category.value} className="inline-block bg-blue-500 text-white py-1 px-3 rounded-full flex items-center">
                {category.label}
                <button
                  type="button"
                  className="ml-2 text-white"
                  onClick={() =>
                    setSelectedCategories(
                      selectedCategories.filter((item) => item.value !== category.value)
                    )
                  }
                >
                  <span className="text-lg">&times;</span>
                </button>
              </span>
            ))}
          </div>

          <h3 className="text-xl mb-2">Quốc gia đã chọn: {selectedCountry || "Chưa chọn"}</h3>
        </div>
      </div>
    </div>
  );
};

export default MovieFilter;