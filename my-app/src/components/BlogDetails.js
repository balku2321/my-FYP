// src/components/BlogDetail.js
import React from 'react';
import { useParams } from 'react-router-dom';
import './BlogDetails.css';

const BlogDetail = ({ articles }) => {
  const { id } = useParams();
  const blog = articles.find((article) => article.id === parseInt(id));

  if (!blog) {
    return <p>Blog post not found</p>;
  }

  return (
    <div className="blog-detail-container">
      <h2>{blog.title}</h2>
      <img src={blog.image} alt={blog.title} className="blog-detail-image" />
      <p>{blog.content}</p>
    </div>
  );
};

export default BlogDetail;
