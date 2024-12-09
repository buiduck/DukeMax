import React, { useState,useEffect } from "react";
import Select from "react-select";
import axios from "axios";

const AdminAddMovie = () => {
  const [movie, setMovie] = useState({
    status: "",
    isCopyright: false,
    trailerUrl: "",
    name: "",
    originName: "",
    type: "single",
    poster: null,
    thumb: null,
    subDocQuyen: false,
    chieuRap: false,
    time: "",
    episodeCurrent: "",
    episodeTotal: 40,
    quality: "FHD",
    lang: "Vietsub",
    year: 2024,
    actorIds: [],
    countryIds: [],
    directorIds: [],
    categoryIds: [],
    streamData: [],
  });

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setMovie((prevMovie) => ({
      ...prevMovie,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleFileChange = (e) => {
    const { name, files } = e.target;
    setMovie((prevMovie) => ({
      ...prevMovie,
      [name]: files[0],
    }));
  };

// SUBMIT
  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("Form values:", movie);
  };


  const [actors, setActors] = useState([]);
  const [countries, setCountries] = useState([]);
  const [directors, setDirectors] = useState([]);
  const [categories, setCategories] = useState([]);

  // Actor
  useEffect(() => {
    axios.get("/api/actor?pageNumber=1&pageSize=20")
      .then(response => {
        // Assuming response.data is an array of actors
        const actorOptions = response.data.map(actor => ({
          value: actor.Id,
          label: actor.Name,
        }));
        setActors(actorOptions);
      })
      .catch(error => {
        console.error("There was an error fetching actors!", error);
      });
  }, []);

  const handleSelectChange = (selectedOptions, field) => {
    // selectedOptions will be an array for multi-select
    setMovie((prevMovie) => ({
      ...prevMovie,
      [field]: selectedOptions ? selectedOptions.map(option => option.value) : [],
    }));
  };

// Country
useEffect(() => {
  const fetchCountries = async () => {
    try {
      const response = await axios.get(
        "/api/country?pageNumber=1&pageSize=20"
      );
      setCountries(response.data); // Assumes API returns an array of countries
    } catch (error) {
      console.error("Error fetching countries:", error);
    } 
  };

  fetchCountries();
}, []);

const handleCountryChange = (e) => {
  const selectedCountry = e.target.value;
  setMovie((prevMovie) => ({
    ...prevMovie,
    countryIds: [selectedCountry], // Update the first country ID
  }));
};

// Director
useEffect(() => {
  const fetchDirectors = async () => {
    try {
      const response = await axios.get(
        "/api/director?pageNumber=1&pageSize=20"
      );
      setDirectors(response.data); // Assumes API returns an array of directors
    } catch (error) {
      console.error("Error fetching directors:", error);
    } 
  };

  fetchDirectors();
}, []);

const handleDirectorChange = (e) => {
  const selectedDirector = e.target.value;
  setMovie((prevMovie) => ({
    ...prevMovie,
    directorIds: [selectedDirector], // Update the first director ID
  }));
};

// Categories
useEffect(() => {
  const fetchCategories = async () => {
    try {
      const response = await axios.get(
        "/api/category?pageNumber=1&pageSize=20"
      );
      const options = response.data.map((category) => ({
        value: category.Id,
        label: category.Name,
      }));
      setCategories(options); // Convert API data to react-select options
    } catch (error) {
      console.error("Error fetching categories:", error);
    } 
  };

  fetchCategories();
}, []);

const handleCategoryChange = (selectedOptions) => {
  setMovie((prevMovie) => ({
    ...prevMovie,
    categoryIds: selectedOptions ? selectedOptions.map((opt) => opt.value) : [],
  }));
};



  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl  text-slate-800 font-bold mb-4">Add Movie</h1>
      <form onSubmit={handleSubmit}>
        <div className="grid grid-cols-2 gap-4">
          {/* Status */}
          <div>
            <label htmlFor="status" className="block text-sm font-medium text-gray-700 mb-1">Status</label>
            <select
              id="status"
              name="status"
              value={movie.status}
              onChange={handleChange}
              className="w-full p-2 border text-gray-700 border-gray-300 rounded-lg focus:ring focus:ring-blue-300 focus:outline-none"
            >
              <option value="completed">Completed</option>
              <option value="ongoing">Ongoing</option>
            </select>
          </div>

          {/* IsCopyright */}
          <div>
            <label htmlFor="isCopyright" className="block text-sm font-medium text-gray-700 mb-1">Is Copyright</label>
            <input
              type="checkbox"
              id="isCopyright"
              name="isCopyright"
              checked={movie.isCopyright}
              onChange={handleChange}
              className="p-2 border border-gray-300 rounded-lg"
            />
          </div>

          {/* TrailerUrl */}
          <div className="col-span-2">
            <label htmlFor="trailerUrl" className="block text-sm font-medium text-gray-700 mb-1">Trailer URL</label>
            <input
              type="url"
              id="trailerUrl"
              name="trailerUrl"
              value={movie.trailerUrl}
              onChange={handleChange}
              className="w-full p-2 border text-gray-700 border-gray-300 rounded-lg focus:ring focus:ring-blue-300 focus:outline-none"
              placeholder="Enter trailer URL"
            />
          </div>

          {/* Name and OriginName */}
          <div>
            <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">Name</label>
            <input
              type="text"
              id="name"
              name="name"
              value={movie.name}
              onChange={handleChange}
              className="w-full p-2 border  text-gray-700 border-gray-300 rounded-lg focus:ring focus:ring-blue-300 focus:outline-none"
              placeholder="Enter movie name"
            />
          </div>
          <div>
            <label htmlFor="originName" className="block text-sm font-medium text-gray-700 mb-1">Origin Name</label>
            <input
              type="text"
              id="originName"
              name="originName"
              value={movie.originName}
              onChange={handleChange}
              className="w-full p-2 border text-gray-700 border-gray-300 rounded-lg focus:ring focus:ring-blue-300 focus:outline-none"
              placeholder="Enter origin name"
            />
          </div>

          {/* Type */}
          <div>
            <label htmlFor="type" className="block text-sm font-medium text-gray-700 mb-1">Type</label>
            <select
              id="type"
              name="type"
              value={movie.type}
              onChange={handleChange}
              className="w-full p-2 border text-gray-700 border-gray-300 rounded-lg focus:ring focus:ring-blue-300 focus:outline-none"
            >
              <option value="single">Single</option>
              <option value="tvshows">TV Shows</option>
              <option value="series">Series</option>
              <option value="hoathinh">Hoathinh</option>
            </select>
          </div>

          {/* Poster and Thumb */}
          <div>
            <label htmlFor="poster" className="block text-sm font-medium text-gray-700 mb-1">Poster</label>
            <input
              type="file"
              id="poster"
              name="poster"
              onChange={handleFileChange}
              className="w-full p-2 border text-gray-700 border-gray-300 rounded-lg"
            />
          </div>
          <div>
            <label htmlFor="thumb" className="block text-sm font-medium text-gray-700 mb-1">Thumbnail</label>
            <input
              type="file"
              id="thumb"
              name="thumb"
              onChange={handleFileChange}
              className="w-full p-2 border text-gray-700 border-gray-300 rounded-lg"
            />
          </div>

          {/* SubDocQuyen and ChieuRap */}
          <div>
            <label htmlFor="subDocQuyen" className="block text-sm font-medium text-gray-700 mb-1">Sub Doc Quyen</label>
            <input
              type="checkbox"
              id="subDocQuyen"
              name="subDocQuyen"
              checked={movie.subDocQuyen}
              onChange={handleChange}
              className="p-2 border border-gray-300 rounded-lg"
            />
          </div>
          <div>
            <label htmlFor="chieuRap" className="block text-sm font-medium text-gray-700 mb-1">Chieu Rap</label>
            <input
              type="checkbox"
              id="chieuRap"
              name="chieuRap"
              checked={movie.chieuRap}
              onChange={handleChange}
              className="p-2 border text-gray-700 border-gray-300 rounded-lg"
            />
          </div>

          {/* Time and Episodes */}
          <div>
            <label htmlFor="time" className="block text-sm font-medium text-gray-700 mb-1">Time per Episode</label>
            <input
              type="text"
              id="time"
              name="time"
              value={movie.time}
              onChange={handleChange}
              className="w-full p-2 border text-gray-700 border-gray-300 rounded-lg focus:ring focus:ring-blue-300 focus:outline-none"
              placeholder="Enter time per episode"
            />
          </div>
          <div>
            <label htmlFor="episodeCurrent" className="block text-sm font-medium text-gray-700 mb-1">Current Episode</label>
            <input
              type="text"
              id="episodeCurrent"
              name="episodeCurrent"
              value={movie.episodeCurrent}
              onChange={handleChange}
              className="w-full p-2 border text-gray-700 border-gray-300 rounded-lg focus:ring focus:ring-blue-300 focus:outline-none"
              placeholder="Current episode"
            />
          </div>

          {/* Total Episodes */}
          <div>
            <label htmlFor="episodeTotal" className="block text-sm font-medium text-gray-700 mb-1">Total Episodes</label>
            <input
              type="number"
              id="episodeTotal"
              name="episodeTotal"
              value={movie.episodeTotal}
              onChange={handleChange}
              className="w-full p-2 border text-gray-700 border-gray-300 rounded-lg focus:ring focus:ring-blue-300 focus:outline-none"
            />
          </div>

          {/* Quality */}
          <div>
            <label htmlFor="quality" className="block text-sm font-medium text-gray-700 mb-1">Quality</label>
            <select
              id="quality"
              name="quality"
              value={movie.quality}
              onChange={handleChange}
              className="w-full p-2 border text-gray-700 border-gray-300 rounded-lg focus:ring focus:ring-blue-300 focus:outline-none"
            >
              <option value="FHD">FHD</option>
              <option value="Full HD">Full HD</option>
              <option value="CAM">CAM</option>
              <option value="FDH">FDH</option>
              <option value="360p">360p</option>
              <option value="HD">HD</option>
              <option value="FHDV">FHDV</option>
              <option value="SD">SD</option>
            </select>
          </div>

          {/* Lang */}
          <div>
            <label htmlFor="lang" className="block text-sm font-medium text-gray-700 mb-1">Language</label>
            <input
              type="text"
              id="lang"
              name="lang"
              value={movie.lang}
              onChange={handleChange}
              className="w-full p-2 border text-gray-700 border-gray-300 rounded-lg focus:ring focus:ring-blue-300 focus:outline-none"
              placeholder="Enter language"
            />
          </div>

          {/* Year */}
          <div>
            <label htmlFor="year" className="block text-sm font-medium text-gray-700 mb-1">Year</label>
            <input
              type="number"
              id="year"
              name="year"
              value={movie.year}
              onChange={handleChange}
              className="w-full p-2 border text-gray-700 border-gray-300 rounded-lg focus:ring focus:ring-blue-300 focus:outline-none"
            />
          </div>
        </div>


        <div>
            <label htmlFor="actorIds" className="block text-sm font-medium text-gray-700 mb-1">Actors</label>
            <Select
              isMulti
              id="actorIds"
              name="actorIds"
              options={actors}
              value={actors.filter(actor => movie.actorIds.includes(actor.value))}
              onChange={(selectedOptions) => handleSelectChange(selectedOptions, 'actorIds')}
              className="w-full p-2 border text-gray-700 border-gray-300 rounded-lg focus:ring focus:ring-blue-300 focus:outline-none"
              placeholder="Select actors"
            />
          </div>


          <div>
            <label htmlFor="countryIds" className="block text-sm font-medium text-gray-700 mb-1">
              Country
            </label>
            <select
              id="countryIds"
              name="countryIds"
              value={movie.countryIds[0] || ""}
              onChange={handleCountryChange}
              className="w-full p-2 border text-gray-700 border-gray-300 rounded-lg focus:ring focus:ring-blue-300 focus:outline-none"
              
            >
              <option value="">Select a country</option>
              {countries.map((country) => (
                <option key={country.Id} value={country.Id}>
                  {country.Name}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label
              htmlFor="directorIds"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Director
            </label>
            <select
              id="directorIds"
              name="directorIds"
              value={movie.directorIds[0] || ""}
              onChange={handleDirectorChange}
              className="w-full p-2 border text-gray-700 border-gray-300 rounded-lg focus:ring focus:ring-blue-300 focus:outline-none"
            >
              <option value="">Select a director</option>
              {directors.map((director) => (
                <option key={director.Id} value={director.Id}>
                  {director.Name}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label
              htmlFor="categories"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Categories
            </label>
            <Select
              id="categories"
              options={categories}
              isMulti
              onChange={handleCategoryChange}
              placeholder="Select categories"
              className="basic-multi-select text-gray-700"
              classNamePrefix="select"
            />
          </div>


        {/* Submit Button */}
        <button
          type="submit"
          className="w-full bg-blue-500 text-white p-3 rounded-lg hover:bg-blue-600 focus:outline-none mt-4"
        >
          Add Movie
        </button>
      </form>
    </div>
  );
};

export default AdminAddMovie;
