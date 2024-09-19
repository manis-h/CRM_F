import React, { useState } from 'react';

const AddUserForm = () => {
    const [formData, setFormData] = useState({
        company: '',
        product: '',
        firstName: '',
        lastName: '',
        email: '',
        mobile: '',
        userRole: '',
        userBranch: '',
        center: ''
    });

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log('Form Data Submitted: ', formData);
        // Add logic to save the user data
    };

    return (
        <div className='add-user-form-container'>
            <form onSubmit={handleSubmit} className="add-user-form">
            <h2 className='form-heading'>Add User</h2>

                <div className="form-part">
                <div className="form-group">
                        <label>First Name</label>
                        <input
                            type="text"
                            name="firstName"
                            value={formData.firstName}
                            onChange={handleChange}
                            required
                        />
                    </div>
                    <div className="form-group">
                        <label>Last Name</label>
                        <input
                            type="text"
                            name="lastName"
                            value={formData.lastName}
                            onChange={handleChange}
                            required
                        />
                    </div>

                    <div className="form-group">
                        <label>Company</label>
                        <input
                            type="text"
                            name="company"
                            value={formData.company}
                            onChange={handleChange}
                            required
                        />
                    </div>

                    <div className="form-group">
                        <label>Product</label>
                        <input
                            type="text"
                            name="product"
                            value={formData.product}
                            onChange={handleChange}
                            required
                        />
                    </div>

                  

                   

                    <div className="form-group">
                        <label>Email</label>
                        <input
                            type="email"
                            name="email"
                            value={formData.email}
                            onChange={handleChange}
                            required
                        />
                    </div>

                    <div className="form-group">
                        <label>Mobile</label>
                        <input
                            type="tel"
                            name="mobile"
                            value={formData.mobile}
                            onChange={handleChange}
                            required
                        />
                    </div>
                </div>

                <div className="form-part">
                    <div className="form-group">
                        <label>User Role</label>
                        <input
                            type="text"
                            name="userRole"
                            value={formData.userRole}
                            onChange={handleChange}
                            required
                        />
                    </div>

                    <div className="form-group">
                        <label>User Branch</label>
                        <input
                            type="text"
                            name="userBranch"
                            value={formData.userBranch}
                            onChange={handleChange}
                            required
                        />
                    </div>

                    <div className="form-group">
                        <label>Center</label>
                        <textarea
                            name="center"
                            value={formData.center}
                            onChange={handleChange}
                            required
                            rows="3" // Adjust the number of rows as needed
                            style={{ resize: 'vertical' }} // Allows resizing vertically
                        />
                    </div>

                    <div className='form-button'>
                        <button type="submit">Save</button>
                    </div>
                </div>
            </form>

            <style jsx>{`
                .add-user-form-container {
                    display: flex;
                    flex-direction: column;
                    align-items: center;
                    padding: 20px;
                    margin-top:60px
                }

                .form-heading {
                    margin-bottom: 60px;
                   
                    weight:100%;
                    font-size: 24px;
                    color: #333;
                    text-align: center;
                }

                .add-user-form {
                    width: 100%;
                    max-width: 800px;
                    padding: 20px;
                    border: 1px solid #b6b3b3;
                    border-radius: 8px;
                    background-color: rgb(247, 242, 242);
                }

                .form-part {
                    display: flex;
                    flex-wrap: wrap;
                    gap: 20px;
                    margin-bottom: 20px;
                }

                .form-group {
                    flex: 1;
                    min-width: 280px;
                    margin-bottom: 15px;
                }

                .form-group label {
                    display: block;
                    margin-bottom: 5px;
                    font-weight: bold;
                }

                .form-group input, .form-group textarea {
                    width: 100%;
                    padding: 8px;
                    border: 1px solid #ccc;
                    border-radius: 4px;
                }

                .form-button {
                    display: flex;
                    justify-content: center;
                }

                button {
                    padding: 8px 12px;
                    width:50px;
                    border: none;
                    border-radius: 40px;
                    background-color: #007bff;
                    color: #fff;
                    font-size: 14px;
                    cursor: pointer;
                }

                button:hover {
                    background-color: #0056b3;
                }
            `}</style>
        </div>
    );
};

export default AddUserForm;
