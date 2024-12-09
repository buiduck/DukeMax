import React, {useEffect, useState} from 'react';
import {useParams} from 'react-router-dom';
import axios from "axios";

const DetailsBlog = () => {
    const {id} = useParams();
    const [blog, setBlog] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchBlogDetails = async () => {
            try {
                const response = await axios.get(`/api/blog/${id}`);
                const blogData = response.data.data;
                console.log(blogData);

                setBlog(blogData);
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
            <h1 className="text-4xl font-semibold text-gray-800 mb-8">{blog.TAG}</h1>
            <img
                src={new URL(blog.Image, process.env.REACT_APP_API_URL).href}
                alt={blog.Title}
                className="w-full h-96 object-cover rounded-lg shadow-lg mb-8"
            />
            <div
                className="text-gray-200 text-lg leading-8"
                dangerouslySetInnerHTML={{__html: blog.Content}}
            ></div>
        </div>
    );
};

export default DetailsBlog;
