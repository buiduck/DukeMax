// src/pages/BlogPage.jsx
import React from 'react';

const BlogPage = () => {
  return (
    <div className="container mx-auto p-5">
      <h1 className="text-4xl font-semibold text-center text-gray-300 mb-8">Tin Tức</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {/* Blog Post 1 */}
        <div className="bg-white rounded-lg shadow-lg overflow-hidden">
          <img src="https://via.placeholder.com/600x300" alt="Blog 1" className="w-full h-48 object-cover" />
          <div className="p-5">
            <h2 className="text-2xl font-semibold text-gray-800">Bài Viết Tiêu Biểu 1</h2>
            <p className="text-gray-600 mt-2">Đây là mô tả ngắn gọn về bài viết này. Nội dung bài viết sẽ được cập nhật sau.</p>
            <button className="mt-4 text-indigo-600 hover:text-indigo-800">Đọc thêm</button>
          </div>
        </div>
        {/* Blog Post 2 */}
        <div className="bg-white rounded-lg shadow-lg overflow-hidden">
          <img src="https://via.placeholder.com/600x300" alt="Blog 2" className="w-full h-48 object-cover" />
          <div className="p-5">
            <h2 className="text-2xl font-semibold text-gray-800">Bài Viết Tiêu Biểu 2</h2>
            <p className="text-gray-600 mt-2">Đây là mô tả ngắn gọn về bài viết này. Nội dung bài viết sẽ được cập nhật sau.</p>
            <button className="mt-4 text-indigo-600 hover:text-indigo-800">Đọc thêm</button>
          </div>
        </div>
        {/* Blog Post 3 */}
        <div className="bg-white rounded-lg shadow-lg overflow-hidden">
          <img src="https://via.placeholder.com/600x300" alt="Blog 3" className="w-full h-48 object-cover" />
          <div className="p-5">
            <h2 className="text-2xl font-semibold text-gray-800">Bài Viết Tiêu Biểu 3</h2>
            <p className="text-gray-600 mt-2">Đây là mô tả ngắn gọn về bài viết này. Nội dung bài viết sẽ được cập nhật sau.</p>
            <button className="mt-4 text-indigo-600 hover:text-indigo-800">Đọc thêm</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BlogPage;
