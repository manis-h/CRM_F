import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Cookies from 'universal-cookie';
import './Navbar.css';
import useStore from '../Store';
import { useLoginUserMutation, useLogoutMutation } from '../Service/Query';
import useAuthStore from '../Component/store/authStore';

const Navbar = () => {
  const [clientRole, setClientRole] = useState('Client');
  const cookies = new Cookies();
  const navigate = useNavigate();
  const { setEmployeeDetails,  } = useStore();
  const {setLogin,setEmpInfo , empInfo } = useAuthStore()
  // const { } = userAuthStore();

  const [logout, { data, isSuccess }] = useLogoutMutation()

  const handleLogout = () => {
    // cookies.remove('authToken');
    logout()

  };

  const handleRoleChange = (event) => {
    setClientRole(event.target.value);
  };

  useEffect(() => {
    if (isSuccess) {
      setLogin(false);
      setEmpInfo(null);
      setEmployeeDetails(null);
      navigate('/login');

    }

  }, [isSuccess])

  return (
    <>
      {
        empInfo?.empRole === "sanctionHead" ? <nav className="navbar navbar-expand-lg navbar-light bg-light">
        <div className="container-fluid">
          <Link className="navbar-brand" to="/">
            QuickMoney4U
          </Link>
  
          {/* Toggle button for mobile view */}
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarNav"
            aria-controls="navbarNav"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
  
          <div className="collapse navbar-collapse" id="navbarNav">
            <ul className="navbar-nav ms-auto">
              {/* User Profile Link */}
              <li className="nav-item">
                <Link className="nav-link" to="/user-profile">
                  <i className="bi bi-person-circle me-1"></i> User Profile
                </Link>
              </li>
  
              {/* Client Role Dropdown */}
              <li className="nav-item">
                <select
                  className="form-select client-role-dropdown"
                  value={clientRole}
                  onChange={handleRoleChange}
                >
                  {/* <option value="Guest">AUDIT</option> */}
                  <option value="Admin">Sanction Head</option>
                  {/* <option value="Screener">SCREENER</option>
                  <option value="Credit-manager">CREDIT MANAGER</option> */}
                </select>
              </li>
  
              {/* Logout Button */}
              <li className="nav-item">
                <button
                  className="btn btn-danger ms-lg-3"
                  onClick={handleLogout}
                >
                  <i className="bi bi-box-arrow-right"></i>
                </button>
              </li>
            </ul>
          </div>
        </div>
      </nav>  : <nav className="navbar navbar-expand-lg navbar-light bg-light">
      <div className="container-fluid">
        <Link className="navbar-brand" to="/">
          QuickMoney4U
        </Link>

        {/* Toggle button for mobile view */}
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarNav"
          aria-controls="navbarNav"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav ms-auto">
            {/* User Profile Link */}
            <li className="nav-item">
              <Link className="nav-link" to="/user-profile">
                <i className="bi bi-person-circle me-1"></i> User Profile
              </Link>
            </li>

            {/* Settings Dropdown */}
            <li className="nav-item dropdown">
              <Link
                className="nav-link dropdown-toggle"
                to="#"
                id="settingsDropdown"
                role="button"
                data-bs-toggle="dropdown"
                aria-expanded="false"
              >
                <i className="bi bi-gear me-1"></i>Settings
              </Link>
              <ul className="dropdown-menu" aria-labelledby="settingsDropdown">
                <li>
                  <Link className="dropdown-item" to="/add-users">
                    Add Employee
                  </Link>
                </li>
                <li>
                  <Link className="dropdown-item" to="/employees-list">
                    View Employees
                  </Link>
                </li>
                <li>
                  <Link className="dropdown-item" to="/import-csv">
                    Import CSV
                  </Link>
                </li>
                <li>
                  <Link className="dropdown-item" to="/add-bank-details">
                    Add Bank Details
                  </Link>
                </li>
                <li>
                  <Link className="dropdown-item" to="/add-holiday-details">
                    Add Holiday Details
                  </Link>
                </li>
              </ul>
            </li>

            {/* Client Role Dropdown */}
            <li className="nav-item">
              <select
                className="form-select client-role-dropdown"
                value={clientRole}
                onChange={handleRoleChange}
              >
                {/* <option value="Guest">AUDIT</option> */}
                <option value="Admin">ADMIN</option>
                <option value="Screener">SCREENER</option>
                <option value="Credit-manager">CREDIT MANAGER</option>
              </select>
            </li>

            {/* Logout Button */}
            <li className="nav-item">
              <button
                className="btn btn-danger ms-lg-3"
                onClick={handleLogout}
              >
                <i className="bi bi-box-arrow-right"></i>
              </button>
            </li>
          </ul>
        </div>
      </div>
    </nav>
      }
    </>
    
  );
};

export default Navbar;
