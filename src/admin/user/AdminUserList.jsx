// src/admin/user/AdminUserList.js
import React from 'react';
import { MdEdit, MdDelete ,MdPersonAdd} from 'react-icons/md'; // Sử dụng các icon từ react-icons/md
import { Link } from 'react-router-dom'; // Import Link for routing

const AdminUserList = () => {
  const users = [
    { id: 1, name: 'John Doe', email: 'johndoe@example.com' },
    { id: 2, name: 'Jane Smith', email: 'janesmith@example.com' },
    { id: 3, name: 'Bob Johnson', email: 'bobjohnson@example.com' },
  ];

  return (
    <div className="overflow-x-auto mt-7 text-slate-700 bg-white p-6 rounded-lg shadow-md">
      <h2 className="text-3xl font-semibold mb-4">User List</h2>
      
      {/* Add User Button */}
      <Link to="/admin/users/add-user">
        <button className="bg-blue-500 text-white p-3 rounded hover:bg-blue-600 transition-all duration-300 mb-4 flex items-center">
          <MdPersonAdd className="w-6 h-6 mr-2" />
          Thêm Tài Khoản
        </button>
      </Link>

      {/* User List Table */}
      <table className="min-w-full table-auto">
        <thead>
          <tr>
            <th className="border-b p-4 text-left">Name</th>
            <th className="border-b p-4 text-left">Email</th>
            <th className="border-b p-4 text-left">Actions</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user) => (
            <tr key={user.id}>
              <td className="border-b p-4">{user.name}</td>
              <td className="border-b p-4">{user.email}</td>
              <td className="border-b p-4 flex space-x-2">
                {/* Edit Button */}
                <Link to={`/admin/users/edit-user/${user.id}`}>
                  <button className="bg-blue-500 text-white p-2 rounded hover:bg-blue-600 transition-all duration-300">
                    <MdEdit className="w-5 h-5" />
                  </button>
                </Link>

                {/* Delete Button */}
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

export default AdminUserList;
