// src/admin/blog/AdminBlogList.jsx
import React from 'react';
import { Link } from 'react-router-dom';
import { MdEdit, MdDelete } from 'react-icons/md'; // Import icon từ react-icons

const AdminBlogList = () => {
  const blogs = [
    { id: 1, title: 'Bài viết 1', description: 'Mô tả ngắn về bài viết 1' },
    { id: 2, title: 'Bài viết 2', description: 'Mô tả ngắn về bài viết 2' },
    { id: 3, title: 'Bài viết 3', description: 'Mô tả ngắn về bài viết 3' }
  ];

  const handleDelete = (id) => {
    // Xử lý xóa bài viết tại đây
    console.log(`Xóa bài viết với ID: ${id}`);
  };

  return (
    <div className="container mx-auto p-8">
      <h1 className="text-4xl font-semibold text-gray-800 mb-8">Danh Sách Tin Tức</h1>
      
      <div className="mb-6">
        <Link
          to="/admin/blog/add-blog"
          className="inline-flex items-center bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 text-lg"
        >
          <span className="mr-2">Thêm Bài Viết</span>
        </Link>
      </div>

      <table className="min-w-full bg-white border border-gray-200 rounded-lg shadow-md">
        <thead>
          <tr>
            <th className="px-6 py-4 border-b text-left text-lg font-semibold text-gray-700">Tiêu đề</th>
            <th className="px-6 py-4 border-b text-left text-lg font-semibold text-gray-700">Mô tả</th>
            <th className="px-6 py-4 border-b text-left text-lg font-semibold text-gray-700">Hành động</th>
          </tr>
        </thead>
        <tbody>
          {blogs.map((blog) => (
            <tr key={blog.id} className="hover:bg-gray-100">
              <td className="px-6 py-4 border-b text-lg text-gray-700">{blog.title}</td>
              <td className="px-6 py-4 border-b text-lg text-gray-700">{blog.description}</td>
              <td className="px-6 py-4 border-b text-lg">
                <Link
                  to={`/admin/blog/edit-blog/${blog.id}`}
                  className="text-yellow-600 hover:text-yellow-800 mr-4 inline-flex items-center"
                >
                  <MdEdit size={24} />
                  <span className="ml-2">Sửa</span>
                </Link>
                <button
                  onClick={() => handleDelete(blog.id)}
                  className="text-red-600 hover:text-red-800 inline-flex items-center"
                >
                  <MdDelete size={24} />
                  <span className="ml-2">Xóa</span>
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default AdminBlogList;
