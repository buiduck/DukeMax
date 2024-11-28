import React, { useState } from 'react';

const AdminAddUser = () => {
  const [user, setUser] = useState({ name: '', email: '', role: '' });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUser({ ...user, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('User added:', user);
  };

  return (
    <div className="max-w-2xl mx-auto mt-10 bg-white p-6 rounded-lg shadow-md">
      <h2 className="text-2xl font-semibold text-gray-700 mb-4">Add New User</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label htmlFor="name" className="block text-sm font-medium text-gray-600 mb-1">Name</label>
          <input
            type="text"
            id="name"
            name="name"
            value={user.name}
            onChange={handleChange}
            className="w-full p-2 border border-gray-300 rounded-lg focus:ring focus:ring-blue-300 focus:outline-none"
            placeholder="Enter user name"
          />
        </div>
        <div>
          <label htmlFor="email" className="block text-sm font-medium text-gray-600 mb-1">Email</label>
          <input
            type="email"
            id="email"
            name="email"
            value={user.email}
            onChange={handleChange}
            className="w-full p-2 border border-gray-300 rounded-lg focus:ring focus:ring-blue-300 focus:outline-none"
            placeholder="Enter user email"
          />
        </div>
        <div>
          <label htmlFor="role" className="block text-sm font-medium text-gray-600 mb-1">Role</label>
          <select
            id="role"
            name="role"
            value={user.role}
            onChange={handleChange}
            className="w-full p-2 border border-gray-300 rounded-lg focus:ring focus:ring-blue-300 focus:outline-none"
          >
            <option value="">Select role</option>
            <option value="admin">Admin</option>
            <option value="user">User</option>
          </select>
        </div>
        <button
          type="submit"
          className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 focus:ring focus:ring-blue-300"
        >
          Add User
        </button>
      </form>
    </div>
  );
};

export default AdminAddUser;
