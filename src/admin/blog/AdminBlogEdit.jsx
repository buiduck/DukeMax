import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import KeycloakService from "../../components/keycloak";
import axios from "axios";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";

const AdminBlogEdit = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const [formData, setFormData] = useState({
    title: "",
    shortDescription: "",
    content: "",
    image: null,
    imagePreview: null,
  });

  useEffect(() => {
    console.log('Blog ID:', id);
    const fetchBlogData = async () => {
      try {
        const token = KeycloakService.getToken();
        const response = await axios.get(`/api/blog/${id}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        const blogData = response.data.data;


        setFormData({
          title: blogData.Title,
          shortDescription: blogData.ShortDescription,
          content: blogData.Content,
          image: null,
          imagePreview: new URL(blogData.Image,process.env.REACT_APP_API_URL).href,
        });
      } catch (error) {
        console.error("Error fetching blog data:", error);
        alert("Không thể tải bài viết.");
      }
    };

    fetchBlogData();
  }, [id]);

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
    const data = new FormData();
    data.append("Id", id);
    data.append("Title", formData.title);
    data.append("ShortDescription", formData.shortDescription);
    data.append("Content", formData.content);
    if (formData.image) {
      data.append("Image", formData.image);
    }

    try {
      const token = KeycloakService.getToken();
      await axios.put(`/api/blog/`, data, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "multipart/form-data",
        },
      });

      alert("Cập nhật bài viết thành công!");
      navigate("/admin/blog");
    } catch (error) {
      console.error("Error updating blog:", error);
      alert("Có lỗi xảy ra, vui lòng thử lại.");
    }
  };

  return (
    <div className="container mx-auto p-8">
      <h1 className="text-4xl font-semibold text-gray-800 mb-8">
        Chỉnh Sửa Bài Viết
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
            Cập nhật bài viết
          </button>
        </div>
      </form>
    </div>
  );
};

export default AdminBlogEdit;
