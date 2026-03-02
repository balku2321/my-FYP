// src/components/Profile.js

import React, { useState } from 'react';
import './Profile.css';

const Profile = () => {
  const [username, setUsername] = useState('John Doe');
  const [email, setEmail] = useState('johndoe@example.com');

  const handleSave = () => {
    // Handle saving profile logic
  };

  return (
    <div className="profile-page">
      <h1>My Profile</h1>
      <form>
        <div className="form-group">
          <label>Username</label>
          <input
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
        </div>
        <div className="form-group">
          <label>Email</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <button type="button" onClick={handleSave}>Save</button>
      </form>
    </div>
  );
};

export default Profile;
