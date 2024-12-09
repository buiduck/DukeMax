import { useState, useEffect } from "react";
import axios from "axios";
import Select from "react-select"; // Import react-select
import Card from "../components/Card"; // Import Card component

const MovieFilter = () => {
  // States lưu trữ dữ liệu từ các API
  const [categories, setCategories] = useState([]);
  const [countries, setCountries] = useState([]);

  // States cho các giá trị lọc được chọn
  const [selectedCategories, setSelectedCategories] = useState([]); // Chỉnh sửa để hỗ trợ nhiều thể loại
  const [selectedCountries, setSelectedCountries] = useState([]);

  // State để lưu danh sách phim
  const [movies, setMovies] = useState([]);

  const searchMoviesFromApi = async () => {
    const query = {
      CategoryIds: selectedCategories.map((category) => category.value).join(","),
      CountryIds: selectedCountries.map((country) => country.value).join(","),
    };

    try {
      // Gửi yêu cầu với axios
      const { data } = await axios.get("/api/movie/search-multi-features", {
        params: query,
      });

      console.log(data); // Kiểm tra dữ liệu
      setMovies(data.data); // Cập nhật danh sách phim
    } catch (err) {
      console.error("Có lỗi khi tìm kiếm phim:", err);
    }
  };

  // Lấy dữ liệu từ các endpoint
  useEffect(() => {
    const fetchFilters = async () => {
      try {
        // Fetch tất cả dữ liệu từ 2 API: category và country
        const [categoryRes, countryRes] = await Promise.all([
          axios.get("/api/category"),
          axios.get("/api/country"),
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
    value: category.Id,
    label: category.Name,
  }));

  const countryOptions = countries.map((country) => ({
    value: country.Id,
    label: country.Name,
  }));

  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold text-center mb-6">Lọc Phim</h1>

      {/* Form lọc */}
      <div className="mb-6 flex gap-6 justify-center items-center">
        {/* Thể loại */}
        <div>
          <label htmlFor="category" className="block text-xl mb-2">
            Thể loại
          </label>
          <Select
            id="category"
            isMulti // Hỗ trợ chọn nhiều
            options={categoryOptions}
            value={selectedCategories}
            onChange={(selectedOptions) =>
              setSelectedCategories(selectedOptions)
            }
            getOptionLabel={(e) => e.label} // Hiển thị label của option
            getOptionValue={(e) => e.value} // Dùng value là tên thể loại
            className="p-2 w-[60vh] border rounded text-xl text-slate-700"
            placeholder="Chọn thể loại"
          />
        </div>

        {/* Quốc gia */}
        <div>
          <label htmlFor="country" className="block text-xl mb-2">
            Quốc gia
          </label>
          <Select
            id="country"
            isMulti
            options={countryOptions}
            value={selectedCountries}
            onChange={(selectedOptions) =>
              setSelectedCountries(selectedOptions)
            }
            getOptionLabel={(e) => e.label} // Hiển thị label của option
            getOptionValue={(e) => e.value} // Dùng value là tên thể loại
            className="p-2 border w-[50vh] rounded text-xl text-slate-700"
            placeholder="Chọn quốc gia"
          />
        </div>

        <div className="mt-7">
          <button
            onClick={searchMoviesFromApi}
            className="bg-blue-500 text-white  p-3 px-8 rounded-lg w-full sm:w-auto"
          >
            Lọc
          </button>
        </div>
      </div>

      {/* Hiển thị danh sách phim */}
      <div className="grid grid-cols-[repeat(auto-fit,230px)] gap-6 justify-center lg:justify-start">
        {movies.length > 0 ? (
          movies.map((movie) => <Card key={movie.Id || movie.Slug  } data={movie} />)
        ) : (
          <p className="text-center text-xl text-gray-500">
            Không tìm thấy phim nào.
          </p>
        )}
      </div>
    </div>
  );
};

export default MovieFilter;
