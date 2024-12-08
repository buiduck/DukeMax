import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { MdEdit, MdDelete } from "react-icons/md";
import axios from "axios";
import KeycloakService from "../../components/keycloak";
const AdminBlogList = () => {
  const [blogs, setBlogs] = useState([]);

  // Fetch list of blogs from API
  useEffect(() => {
    const fetchBlogs = async () => {
      try {
        const response = await axios.get("/api/blog?page=1"); // Replace with your API endpoint
        if (response.status === 200) {
          const blogsData = response.data.data.pageData.map((blog) => ({
            id: blog.Id,
            title: blog.Title,
            shortDescription: blog.ShortDescription,
            slug: blog.Slug,
            content: blog.Content,
            image: blog.Image,
            writeBy: blog.WriteBy,
          }));
          setBlogs(blogsData);
        } else {
          console.error("Failed to fetch blogs");
        }
      } catch (error) {
        console.error("Error fetching blogs:", error);
      }
    };

    fetchBlogs();
  }, []);

  // Handle delete functionality with authorization
  const handleDelete = async (id) => {
    if (window.confirm("Bạn có chắc chắn muốn xóa bài viết này không?")) {
      try {
        const token = KeycloakService.getToken();
        const response = await axios.delete(`/api/blog/${id}`, {
          headers: {
            Authorization: `Bearer ${token}`, // Attach the token in Authorization header
          },
        });

        if (response.status === 200) {
          setBlogs((prevBlogs) => prevBlogs.filter((blog) => blog.id !== id));
          alert("Xóa bài viết thành công!");
        } else {
          alert(response.data?.message || "Có lỗi xảy ra, không thể xóa bài viết.");
        }
      } catch (error) {
        console.error("Error deleting blog:", error);
        alert("Có lỗi xảy ra, không thể xóa bài viết.");
      }
    }
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
              <td className="px-6 py-4 border-b text-lg text-gray-700">{blog.shortDescription}</td>
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
