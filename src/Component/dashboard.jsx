import React, { useEffect } from 'react';
import Sidebar from '../Navbar/Sidebar';
import Navbar  from '../Navbar/NavBar';
import useStore from '../Store';
import { useGetEmployeesQuery } from '../Service/Query';
const Dashboard = ({isSidebarOpen}) => {
  const {login,setEmployeeDetails} = useStore()
  const {data:employeeDetails,isSuccess:empDetailsSuccess,refetch} = useGetEmployeesQuery()

  useEffect(() => {
    if(empDetailsSuccess){
      setEmployeeDetails(employeeDetails)
      
    }    
  },[employeeDetails])
  
  useEffect(() => {
    refetch()

  },[login])


console.log({isSidebarOpen},login)
  return (
    <div>
        <Navbar/>
        <Sidebar/>
    </div>
  );
};

export default Dashboard;
