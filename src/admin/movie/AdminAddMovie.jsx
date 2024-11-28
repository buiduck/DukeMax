import React, { useState } from 'react';

const AdminAddMovie = () => {
  const [movie, setMovie] = useState({ title: '', genre: '', releaseDate: '' });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setMovie({ ...movie, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Movie added:', movie);
  };

  return (
    <div className="max-w-2xl mx-auto mt-10 bg-white p-6 rounded-lg shadow-md">
      <h2 className="text-2xl font-semibold text-gray-700 mb-4">Add New Movie</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label htmlFor="title" className="block text-sm font-medium text-gray-600 mb-1">Title</label>
          <input
            type="text"
            id="title"
            name="title"
            value={movie.title}
            onChange={handleChange}
            className="w-full p-2 border border-gray-300 rounded-lg focus:ring focus:ring-blue-300 focus:outline-none"
            placeholder="Enter movie title"
          />
        </div>
        <div>
          <label htmlFor="genre" className="block text-sm font-medium text-gray-600 mb-1">Genre</label>
          <input
            type="text"
            id="genre"
            name="genre"
            value={movie.genre}
            onChange={handleChange}
            className="w-full p-2 border border-gray-300 rounded-lg focus:ring focus:ring-blue-300 focus:outline-none"
            placeholder="Enter movie genre"
          />
        </div>
        <div>
          <label htmlFor="releaseDate" className="block text-sm font-medium text-gray-600 mb-1">Release Date</label>
          <input
            type="date"
            id="releaseDate"
            name="releaseDate"
            value={movie.releaseDate}
            onChange={handleChange}
            className="w-full p-2 border border-gray-300 rounded-lg focus:ring focus:ring-blue-300 focus:outline-none"
          />
        </div>
        <button
          type="submit"
          className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 focus:ring focus:ring-blue-300"
        >
          Add Movie
        </button>
      </form>
    </div>
  );
};

export default AdminAddMovie;
