import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import KeycloakService from "../../components/keycloak";

const AdminBlogCreate = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    title: "",
    shortDescription: "",
    content: "",
    image: null,
    imagePreview: null, // Dùng để hiển thị preview ảnh
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    const imagePreview = URL.createObjectURL(file);

    setFormData((prevData) => ({
      ...prevData,
      image: file,
      imagePreview: imagePreview,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const data = new FormData();
      data.append("Title", formData.title);
      data.append("ShortDescription", formData.shortDescription);
      data.append("Content", formData.content);
      if (formData.image) {
        data.append("Image", formData.image);
      }

      const token = KeycloakService.getToken();
      const response = await axios.post("/api/blog", data, {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: `Bearer ${token}`, // Thay thế bằng token thật từ KeycloakService
        },
      });

      if (response.data && response.data.status === 200) {
        alert(response.data.message || "Tạo bài viết thành công!");
        navigate("/admin/blog");
      } else {
        alert(response.data?.message || "Có lỗi xảy ra, vui lòng thử lại.");
      }
    } catch (error) {
      console.error("Error creating blog:", error);
      alert("Có lỗi xảy ra, vui lòng thử lại.");
    }
  };

  return (
    <div className="container mx-auto p-8">
      <h1 className="text-4xl font-semibold text-gray-800 mb-8">
        Thêm Bài Viết
      </h1>
      <form
        onSubmit={handleSubmit}
        className="bg-white p-6 rounded-lg shadow-lg"
      >
        <div className="mb-6">
          <label
            htmlFor="title"
            className="block text-lg font-medium text-gray-700"
          >
            Tiêu đề
          </label>
          <input
            type="text"
            id="title"
            name="title"
            value={formData.title}
            onChange={handleInputChange}
            className="mt-2 text-slate-700 p-3 border rounded-lg w-full"
            required
          />
        </div>
        <div className="mb-6">
          <label
            htmlFor="shortDescription"
            className="block text-lg font-medium text-gray-700"
          >
            Mô tả ngắn
          </label>
          <textarea
            id="shortDescription"
            name="shortDescription"
            value={formData.shortDescription}
            onChange={handleInputChange}
            rows="3"
            className="mt-2 text-slate-700 p-3 border rounded-lg w-full"
            required
          />
        </div>
        <div className="mb-6">
          <label
            htmlFor="content"
            className="block text-lg font-medium text-gray-700"
          >
            Nội dung
          </label>

          <ReactQuill
            theme="snow"
            value={formData.content}
            className="h-52 text-slate-700"
            onChange={(value) =>
              setFormData((prevData) => ({
                ...prevData,
                content: value,
              }))
            }
          />
        </div>
        <div className="mb-6 pt-10 flex items-center justify-between">
          <div className="flex mt-6 items-center">
            <label
              htmlFor="image"
              className="block text-lg font-medium text-gray-700 mr-4"
            >
              Ảnh
            </label>
            <input
              type="file"
              id="image"
              name="image"
              accept="image/*"
              onChange={handleImageChange}
              className="mt-2"
            />
          </div>

          {formData.imagePreview && (
            <div>
              <img
                src={formData.imagePreview}
                alt="Image Preview"
                className="w-32 h-32 object-cover rounded-lg"
              />
            </div>
          )}
        </div>
        <div className="flex justify-end">
          <button
            type="button"
            onClick={() => navigate("/admin/blog")}
            className="px-6 py-3 bg-gray-400 text-white rounded-lg mr-4 hover:bg-gray-500"
          >
            Hủy
          </button>
          <button
            type="submit"
            className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
          >
            Tạo bài viết
          </button>
        </div>
      </form>
    </div>
  );
};

export default AdminBlogCreate;
