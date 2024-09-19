import React, { useState } from 'react';
import './UserProfileForm.css'; // Add custom CSS styles

const UserProfileForm = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    mobile: '',
    userRole: '',
    userStatus: '',
    userId: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Form submitted:', formData);
  };

  return (
    <div className="form-container">
      <h2>User Profile Form</h2>
      <form onSubmit={handleSubmit} className="user-profile-form">
        <div className="form-group">
          <label htmlFor="name">Name:</label>
          <input
            type="text"
            id="name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="email">Email:</label>
          <input
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="mobile">Mobile:</label>
          <input
            type="text"
            id="mobile"
            name="mobile"
            value={formData.mobile}
            onChange={handleChange}
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="userRole">User Role:</label>
          <select
            id="userRole"
            name="userRole"
            value={formData.userRole}
            onChange={handleChange}
          >
            <option value="1">Admin</option>
            <option value="2">User</option>
            <option value="3">Guest</option>
          </select>
        </div>

        <div className="form-group">
          <label htmlFor="userStatus">User Status:</label>
          <input
            type="text"
            id="userStatus"
            name="userStatus"
            value={formData.userStatus}
            onChange={handleChange}
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="userId">User ID:</label>
          <input
            type="text"
            id="userId"
            name="userId"
            value={formData.userId}
            onChange={handleChange}
            required
          />
        </div>

        <button type="submit" className="submit-button">Submit</button>
      </form>
    </div>
  );
};

export default UserProfileForm;
