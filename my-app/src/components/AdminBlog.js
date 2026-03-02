// src/components/AdminBlog.js
import React from 'react';
import { useNavigate } from 'react-router-dom';
import './AdminBlog.css';

const AdminBlog = ({ articles, setArticles }) => {
  const navigate = useNavigate();

  const handleDelete = (id) => {
    if (window.confirm("Are you sure you want to delete this blog post?")) {
      const updatedArticles = articles.filter((article) => article.id !== id);
      setArticles(updatedArticles); // Update the state to reflect the deleted article
    }
  };

  return (
    <div className="admin-blog-container">
      <h2>Manage Blog Posts</h2>
      <button onClick={() => navigate('/post-blog')}>Add New Blog</button> {/* Add New Blog button */}
      {articles.length > 0 ? (
        articles.map((article) => (
          <div key={article.id} className="blog-post">
            <h3>{article.title}</h3>
            <img src={article.image} alt={article.title} className="blog-thumbnail" />
            <p>{article.content}</p>
            <button onClick={() => handleDelete(article.id)}>Delete</button> {/* Delete button */}
          </div>
        ))
      ) : (
        <p>No blog posts available.</p>
      )}
    </div>
  );
};

export default AdminBlog;
