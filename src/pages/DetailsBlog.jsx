import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

const DetailsBlog = () => {
  const { id } = useParams();
  const [blog, setBlog] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchBlogDetails = async () => {
      try {
        const response = await fetch(`/api/blog/${id}`); // Thay bằng endpoint API thực tế
        if (!response.ok) {
          throw new Error('Failed to fetch blog details');
        }
        const data = await response.json();
        setBlog(data); // Giả định API trả về chi tiết blog
      } catch (error) {
        console.error('Error fetching blog details:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchBlogDetails();
  }, [id]);

  if (loading) {
    return <div className="text-center text-xl mt-10 text-gray-500">Loading...</div>;
  }

  if (!blog) {
    return <div className="text-center text-xl mt-10 text-gray-500">Không tìm thấy bài viết.</div>;
  }

  return (
    <div className="container mx-auto p-5">
      <h1 className="text-4xl font-semibold text-gray-800 mb-8">{blog.title}</h1>
      <img
        src={blog.Image}
        alt={blog.Title}
        className="w-full h-96 object-cover rounded-lg shadow-lg mb-8"
      />
      <p className="text-gray-600 text-lg leading-8">{blog.Content}</p>
    </div>
  );
};

export default DetailsBlog;
