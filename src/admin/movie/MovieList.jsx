// src/admin/movie/MovieList.js
import React, {useEffect, useState} from 'react';
import {MdAddCircle, MdDelete, MdEdit, MdOutlineSearch} from 'react-icons/md'; // Sử dụng các icon từ react-icons/md
import {Link} from 'react-router-dom';
import axios from "axios"; 

const MovieList = () => {
        const [searchTerm, setSearchTerm] = useState('');
        const [movies, setMovies] = useState([]);
        const movieTypes = ["single", "tvshows", "series", "hoathinh"]
        useEffect(() => {
            const fetchMovies = async () => {
                try {
                    const response = await axios.get('api/movie', {
                        params: {
                            pageNumber: 1,
                            pageSize: 10,
                            // type: ""
                        }
                    });

                    const moviePageData = await response.data.data.pageData;
                    console.log(moviePageData);
                    setMovies(moviePageData);
                } catch (err) {
                    console.log(err);
                } finally {
                }
            };

            fetchMovies();
        }, []);
        const filteredMovies = !movies ? [] : movies.filter(movie =>
            movie.Name.toLowerCase().includes(searchTerm.toLowerCase()) || movie.OriginName.toLowerCase().includes(searchTerm.toLowerCase())
        );
        return (
            <div className="overflow-x-auto mt-7 text-slate-700 bg-white p-6 rounded-lg shadow-md">
                <h2 className="text-3xl font-semibold mb-4">Movie List</h2>

                <div className="flex items-center mb-4">
                    <MdOutlineSearch className="text-gray-500 mr-2 w-6 h-6"/>
                    <input
                        type="text"
                        placeholder="Search Movies"
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                </div>

                {/* Add Movie Button */}
                <Link to="/admin/movies/add-movie">
                    <button
                        className="bg-green-500 text-white p-3 rounded hover:bg-green-600 transition-all duration-300 mb-4 flex items-center">
                        <MdAddCircle className="w-6 h-6 mr-2"/>
                        Thêm Phim
                    </button>
                </Link>

                {/* Movie List Table */}
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
                    {filteredMovies && filteredMovies.map((movie) => (
                        <tr key={movie.Id}>
                            <td className="border-b p-4">{movie.Name}</td>
                            <td className="border-b p-4">{movie.Genre}</td>
                            <td className="border-b p-4">{movie.Release}</td>
                            <td className="border-b p-4 flex space-x-2">
                                {/* Edit Button */}
                                <Link to={`/admin/movies/edit-movie/${movie.Id}`}>
                                    <button
                                        className="bg-blue-500 text-white p-2 rounded hover:bg-blue-600 transition-all duration-300">
                                        <MdEdit className="w-5 h-5"/>
                                    </button>
                                </Link>

                                {/* Delete Button */}
                                <button
                                    className="bg-red-500 text-white p-2 rounded hover:bg-red-600 transition-all duration-300">
                                    <MdDelete className="w-5 h-5"/>
                                </button>
                            </td>
                        </tr>
                    ))}
                    </tbody>
                </table>
            </div>
        );
    }
;

export default MovieList;
