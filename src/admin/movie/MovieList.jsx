// src/admin/movie/MovieList.js
import React, { useState } from 'react';
import { MdEdit, MdDelete ,MdAddCircle, MdOutlineSearch } from 'react-icons/md'; // Sử dụng các icon từ react-icons/md

const MovieList = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const movies = [
    { id: 1, title: 'Movie 1', genre: 'Action', release: '2023' },
    { id: 2, title: 'Movie 2', genre: 'Drama', release: '2022' },
    { id: 3, title: 'Movie 3', genre: 'Comedy', release: '2021' },
  ];

  const filteredMovies = movies.filter(movie =>
    movie.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (

    
    <div className="overflow-x-auto mt-7 text-slate-700 bg-white p-6 rounded-lg shadow-md">
      <h2 className="text-3xl font-semibold mb-4">Movie List</h2>

      <div className="flex items-center mb-4">
        <MdOutlineSearch className="text-gray-500 mr-2 w-6 h-6" />
        <input
          type="text"
          placeholder="Search Movies"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>

      <button className="bg-green-500 text-white p-3 rounded hover:bg-green-600 transition-all duration-300 mb-4 flex items-center">
        <MdAddCircle className="w-6 h-6 mr-2" />
        Thêm Phim
      </button>
      
      <table className="min-w-full table-auto">
        <thead>
          <tr>
            <th className="border-b p-4 text-left">Title</th>
            <th className="border-b p-4 text-left">Genre</th>
            <th className="border-b p-4 text-left">Release Year</th>
            <th className="border-b p-4 text-left">Actions</th>
          </tr>
        </thead>
        <tbody>
          {filteredMovies.map((movie) => (
            <tr key={movie.id}>
              <td className="border-b p-4">{movie.title}</td>
              <td className="border-b p-4">{movie.genre}</td>
              <td className="border-b p-4">{movie.release}</td>
              <td className="border-b p-4 flex space-x-2">
                <button className="bg-blue-500 text-white p-2 rounded hover:bg-blue-600 transition-all duration-300">
                  <MdEdit className="w-5 h-5" />
                </button>
                <button className="bg-red-500 text-white p-2 rounded hover:bg-red-600 transition-all duration-300">
                  <MdDelete className="w-5 h-5" />
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default MovieList;
