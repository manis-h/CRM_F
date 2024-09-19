import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import Cookies from 'universal-cookie';
import './Navbar.css';
import useStore from '../Store';

const Navbar = () => {
    const [clientRole, setClientRole] = useState('Client');
    const setLogin = useStore((state) => state.setLogin);
    const cookies = new Cookies();
    const navigate = useNavigate();

    // Logout function in frontend
    const handleLogout = async () => {
        try {
            await axios.post('http://localhost:3000/api/users/logout', {}, { withCredentials: true });
            cookies.remove('authToken', { path: '/' });
            localStorage.removeItem('userData'); // If you use local storage
            setLogin(false);
            window.location.assign('/login');
        } catch (error) {
            console.error('Error during logout:', error);
        }
    };
    
    
    

    const handleRoleChange = (event) => {
        setClientRole(event.target.value);
        console.log('Selected Role:', event.target.value);
    };

    return (
        <nav className="navbar navbar-light">
            <div className="container-fluid">
                <a className="text navbar-brand">QuickMoney4U</a>

                {/* User Profile Link */}
                <Link to="/user-profile" className="user-profile-link" style={{ marginLeft: '500px' }}>
                    <i className="bi bi-person-circle" style={{ marginRight: '10px', color: 'black' }}></i>
                    User Profile
                </Link>

                {/* Settings Dropdown */}
                <div className="dropdown">
                    <Link
                        to="#"
                        className="dropdown-toggle settings-link"
                        id="settingsDropdown"
                        data-bs-toggle="dropdown"
                        aria-expanded="false"
                        style={{ marginRight: '50px' }}
                    >
                        <i className="bi bi-gear" style={{ marginRight: '8px', color: 'black' }}></i>Setting
                    </Link>
                    
                    <ul className="dropdown-menu" aria-labelledby="settingsDropdown">
                        <li><Link className="dropdown-item" to="/add-users">Add Users</Link></li>
                        <li><Link className="dropdown-item" to="/view-user">View Users</Link></li>
                        <li><Link className="dropdown-item" to="/import-csv">Import CSV</Link></li>
                        <li><Link className="dropdown-item" to="/add-bank-details">Add Bank Details</Link></li>
                        <li><Link className="dropdown-item" to="/add-holiday-details">Add Holiday Details</Link></li>
                    </ul>
                </div>

                {/* Client Role Dropdown */}
                <select
                    className="client-role-dropdown"
                    value={clientRole}
                    onChange={handleRoleChange}
                    style={{ marginLeft: '20px', borderRadius: '50px', textAlign: 'center', height: '30px' }}
                >
                    <option value="Guest">AUDIT</option>
                    <option value="Client">CLIENT ADMIN</option>
                    <option value="Admin">SCREENER</option>
                </select>

                {/* Logout Button */}
                <button 
                    style={{ backgroundColor: 'brown', marginLeft: '20px' }} 
                    onClick={handleLogout}
                >
                    <i className="bi bi-box-arrow-right" style={{ marginLeft: '8px', color: 'white' }}></i>
                </button>
            </div>
        </nav>
    );
};

export default Navbar;
