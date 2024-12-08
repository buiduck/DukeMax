import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';  // Đừng quên import axios

const BlogPage = () => {
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchBlogs = async () => {
      try {
        const response = await axios.get('/api/blog?page=1'); 
        setBlogs(response.data.data.pageData); 
      } catch (error) {
        console.error('Error fetching blogs:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchBlogs();
  }, []);

  if (loading) {
    return <div className="text-center text-xl mt-10 text-gray-500">Loading...</div>;
  }

  return (
    <div className="container mx-auto p-5">
      <h1 className="text-4xl font-semibold text-center text-gray-300 mb-8">Tin Tức</h1>
      {blogs.length === 0 ? (
        <p className="text-center text-gray-700">Không có bài viết nào.</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {blogs.map((blog) => (
            <div key={blog.Id} className="bg-white rounded-lg shadow-lg overflow-hidden">
              <img src={`${process.env.PUBLIC_URL}/${blog.Image}`} alt={blog.Title} className="w-full h-48 object-cover" />
              <div className="p-5">
                <h2 className="text-2xl font-semibold text-gray-800">{blog.Title}</h2>
                <p className="text-slate-700 mt-2">{blog.ShortDescription}</p>
                <Link
                  to={`/blog/${blog.Id}`}
                  className="mt-4 inline-block text-indigo-600 hover:text-indigo-800"
                >
                  Đọc thêm
                </Link>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default BlogPage;
