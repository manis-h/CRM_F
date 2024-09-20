import React from 'react';
import Sidebar from '../Navbar/Sidebar';
import Navbar  from '../Navbar/NavBar';
import useStore from '../Store';
const Dashboard = ({isSidebarOpen}) => {

console.log({isSidebarOpen})
  return (
    <div>
        <Navbar/>
        <Sidebar/>
    </div>
  );
};

export default Dashboard;
