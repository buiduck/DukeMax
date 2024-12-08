import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";

const AdminBlogEdit = () => {
  const navigate = useNavigate();
  const { id } = useParams(); // Lấy id từ URL
  const [formData, setFormData] = useState({
    title: "",
    shortDescription: "",
    content: "",
    image: null,
    imagePreview: null,
  });

  // Fetch dữ liệu bài viết khi trang được load
  useEffect(() => {
    const fetchBlogData = async () => {
      try {
        const response = await fetch(`/api/blogs/${id}`);
        if (response.ok) {
          const data = await response.json();
          setFormData({
            title: data.title,
            shortDescription: data.shortDescription,
            content: data.content,
            image: data.image, // Assuming the API returns the image path or URL
            imagePreview: data.imagePreview, // For displaying the current image preview
          });
        } else {
          alert("Không tìm thấy bài viết.");
        }
      } catch (error) {
        console.error("Error fetching blog data:", error);
        alert("Có lỗi xảy ra, vui lòng thử lại.");
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
    // e.preventDefault();
    // const data = new FormData();
    // data.append("title", formData.title);
    // data.append("shortDescription", formData.shortDescription);
    // data.append("content", formData.content);
    // if (formData.image) {
    //   data.append("image", formData.image);
    // }

    // try {
    //   // Gửi yêu cầu cập nhật bài viết
    //   const response = await fetch(`/api/blogs/${id}`, {
    //     method: "PUT",
    //     body: data,
    //     headers: {
    //       Authorization: `Bearer ${localStorage.getItem("token")}`, // Token từ localStorage
    //     },
    //   });

    //   if (response.ok) {
    //     alert("Cập nhật bài viết thành công!");
    //     navigate("/admin/blog"); // Điều hướng về trang danh sách blog
    //   } else {
    //     alert("Có lỗi xảy ra, vui lòng thử lại.");
    //   }
    // } catch (error) {
    //   console.error("Error updating blog:", error);
    //   alert("Có lỗi xảy ra, vui lòng thử lại.");
    // }
  };

  return (
    <div className="container mx-auto p-8">
      <h1 className="text-4xl font-semibold text-gray-800 mb-8">Chỉnh Sửa Bài Viết</h1>
      <form onSubmit={handleSubmit} className="bg-white p-6 rounded-lg shadow-lg">
        <div className="mb-6">
          <label htmlFor="title" className="block text-lg font-medium text-gray-700">
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
          <label htmlFor="shortDescription" className="block text-lg font-medium text-gray-700">
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
          <label htmlFor="content" className="block text-lg font-medium text-gray-700">
            Nội dung
          </label>
          <textarea
            id="content"
            name="content"
            value={formData.content}
            onChange={handleInputChange}
            rows="6"
            className="mt-2 p-3 text-slate-700 border rounded-lg w-full"
            required
          />
        </div>
        <div className="mb-6 flex items-center justify-between">
          <div className="flex items-center">
            <label htmlFor="image" className="block text-lg font-medium text-gray-700 mr-4">
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
            <div className="ml-4">
              <img
                src={formData.imagePreview}
                alt="Image Preview"
                className="w-16 h-16 object-cover rounded-lg" // Resize to 64px x 64px with object-cover
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
