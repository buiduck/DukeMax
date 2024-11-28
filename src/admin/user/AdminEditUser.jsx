import React, { useState, useEffect } from 'react';

const AdminEditUser = ({ userId }) => {
  const [user, setUser] = useState({ name: '', email: '', role: '' });

  useEffect(() => {
    // Fetch user data based on userId (mocked for now)
    const fetchUser = async () => {
      const mockData = { name: 'John Doe', email: 'john@example.com', role: 'admin' };
      setUser(mockData);
    };
    fetchUser();
  }, [userId]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUser({ ...user, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('User updated:', user);
  };

  return (
    <div className="max-w-2xl mx-auto mt-10 bg-white p-6 rounded-lg shadow-md">
      <h2 className="text-2xl font-semibold text-gray-700 mb-4">Edit User</h2>
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
          className="bg-green-500 text-white px-4 py-2 rounded-lg hover:bg-green-600 focus:ring focus:ring-green-300"
        >
          Save Changes
        </button>
      </form>
    </div>
  );
};

export default AdminEditUser;
