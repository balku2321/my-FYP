import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './PostBlog.css';
const PostBlog = ({ addArticle }) => {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [image, setImage] = useState('');
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();

    const newArticle = {
      id: Date.now(), // Unique ID for the article
      title,
      content,
      image,
    };

    // Call the function to add the article in the parent
    addArticle(newArticle);

    // Redirect to manage blogs or any other route
    navigate('/admin/manage-blogs'); 
  };

  return (
    <div className="new-article-form">
      <h2>Create New Blog Post</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
        />
        <textarea
          placeholder="Content"
          value={content}
          onChange={(e) => setContent(e.target.value)}
          required
        />
        <input
          type="text"
          placeholder="Image URL"
          value={image}
          onChange={(e) => setImage(e.target.value)}
        />
        <button type="submit">Post Blog</button>
      </form>
    </div>
  );
};

export default PostBlog;
