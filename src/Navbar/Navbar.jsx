import React, { useEffect, useState } from 'react'; 
import { Link, useNavigate } from 'react-router-dom';
import Cookies from 'universal-cookie';
import {
  AppBar,
  Toolbar,
  IconButton,
  Typography,
  Menu,
  MenuItem,
  Avatar,
} from '@mui/material';
import { Logout, Person } from '@mui/icons-material';
import useStore from '../Store';
import { useLogoutMutation } from '../Service/Query';
import useAuthStore from '../Component/store/authStore';

const Navbar = () => {
  const cookies = new Cookies();
  const navigate = useNavigate();
  const { setEmployeeDetails } = useStore();
  const { setLogin, setEmpInfo, empInfo } = useAuthStore();
  
  // Add error and success flags for logout mutation
  const [logout, { isSuccess, isError, error }] = useLogoutMutation();
  
  const [menuAnchorEl, setMenuAnchorEl] = useState(null);

  const handleLogout = async () => {
    console.log("Logout button clicked");
    try {
      await logout(); // Ensure logout is awaited
      console.log("Logout successful");
    } catch (err) {
      console.error("Logout failed: ", err);
    }
  };

  const handleMenuClick = (event) => {
    setMenuAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setMenuAnchorEl(null);
  };

  // Trigger navigation on successful logout
  useEffect(() => {
    if (isSuccess) {
      setLogin(false);
      setEmpInfo(null);
      setEmployeeDetails(null);
      navigate('/login');
    }

    if (isError) {
      console.error("Error during logout: ", error);
    }
  }, [isSuccess, isError, error, setLogin, setEmpInfo, setEmployeeDetails, navigate]);

  // Sidebar links
  const sidebarLinks = [
    { text: 'User Profile', path: '/user-profile' },
    { text: 'Add Employee', path: '/add-users' },
    { text: 'View Employees', path: '/employees-list' },
    { text: 'Import CSV', path: '/import-csv' },
    { text: 'Add Bank Details', path: '/add-bank-details' },
    { text: 'Add Holiday Details', path: '/add-holiday-details' },
  ];

  return (
    <AppBar position="static" sx={{ backgroundColor: '#001f3f' }}> {/* Change color here */}
      <Toolbar>
        <Typography
          variant="h6"
          component={Link}
          to="/"
          style={{ textDecoration: 'none', color: 'inherit', marginLeft: 46 }}
        >
          QuickMoney4U
        </Typography>
        <div style={{ flexGrow: 1 }} />

        {empInfo?.empRole === "sanctionHead" ? (
          <>
            {/* User Profile Link */}
            <IconButton component={Link} to="/user-profile" color="inherit">
              <Person />
              User Profile
            </IconButton>

            {/* Logout Button */}
            <IconButton color="inherit" onClick={handleLogout}>
              <Logout />
              Logout
            </IconButton>
          </>
        ) : (
          <>
            {/* Replacing Settings Icon with Circle Avatar containing initials */}
            <IconButton color="inherit" onClick={handleMenuClick}>
              <Avatar style={{ backgroundColor: '#fff', color: '#001f3f' }}>
                AB {/* Replace with dynamic initials */}
              </Avatar>
            </IconButton>
            <Menu
              anchorEl={menuAnchorEl}
              open={Boolean(menuAnchorEl)}
              onClose={handleMenuClose}
            >
              {sidebarLinks.map((link) => (
                <MenuItem component={Link} to={link.path} key={link.text}>
                  {link.text}
                </MenuItem>
              ))}
              <MenuItem onClick={handleLogout}>Logout</MenuItem>
            </Menu>
          </>
        )}
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;
