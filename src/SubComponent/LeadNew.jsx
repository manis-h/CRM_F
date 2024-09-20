import  { useEffect, useState } from 'react';
import axios from 'axios';
import { DataGrid } from '@mui/x-data-grid';
// require('dotenv').config();
const LeadNew = () => {
  const [leads, setLeads] = useState([]); // Stores lead details
  const [totalLeads, setTotalLeads] = useState(0); // Stores the total lead count
  const [page, setPage] = useState(1); // Current page
  const apiUrl = import.meta.env.VITE_API_URL;
  // Fetch leads and total lead count
  useEffect(() => {
    fetchLeads(page);
  }, [page]);

  console.log("Here is my id ",apiUrl)
  const fetchLeads = () => {
    axios.get(`https://crm-backend-wui1.onrender.com/api/leads`)
      .then(response => {
        console.log("The leads",response.data.leads)
        setLeads(response.data.leads);
        setTotalLeads(response.data.totalLeads); // Set total lead count
      })
      .catch(error => {
        console.error('Error fetching leads:', error);
      });
  };

  console.log(import.meta.env);

  const columns = [
    { field: 'fName', headerName: 'First Name', width: 150 },
    { field: 'lName', headerName: 'Last Name', width: 150 },
    { field: 'gender', headerName: 'Gender', width: 100 },
    { field: 'personalEmail', headerName: 'Personal Email', width: 200 },
    { field: 'mobile', headerName: 'Mobile', width: 150 },
    { field: 'city', headerName: 'City', width: 150 },
    { field: 'state', headerName: 'State', width: 150 },
    { field: 'loanAmount', headerName: 'Loan Amount', width: 150 },
    { field: 'salary', headerName: 'Salary', width: 150 },
  ];

  const rows = leads.map(lead => ({
    id: lead._id, // Unique ID for each lead
    fName: lead.fName,
    lName: lead.lName,
    gender: lead.gender,
    personalEmail: lead.personalEmail,
    mobile: lead.mobile,
    city: lead.city,
    state: lead.state,
    loanAmount: lead.loanAmount,
    salary: lead.salary,
  }));

  // const handleNextPage = () => {
  //   if (page < Math.ceil(totalLeads / 10)) setPage(page + 1);
  // };

  // const handlePrevPage = () => {
  //   if (page > 1) setPage(page - 1);
  // };

  return (
    <div>
      {/* Lead counter */}
      <div
        style={{
          display: 'inline-block',
          marginTop: '70px',
          marginLeft: '20px',
          marginBottom: '-30px',
          padding: '10px 20px',
          fontWeight: 'bold',
          backgroundColor: '#007bff',
          color: '#fff',
          borderRadius: '5px',
          boxShadow: '0px 4px 6px rgba(0, 0, 0, 0.1)',
          textAlign: 'center',
          cursor: 'pointer',
        }}
      >
        Total Leads: {totalLeads || 0} {/* Defaults to 0 if no leads */}
      </div>

      {/* Data Grid displaying the data */}
      <div style={{ height: 400, width: '100%', marginTop: '20px' }}>
        <DataGrid 
          rows={rows}
          columns={columns}
          pageSize={10}
          rowsPerPageOptions={[10]}
          pagination
          paginationMode="server"
          onPageChange={(newPage) => setPage(newPage)}
          rowCount={totalLeads}
        />
      </div>

   
    </div>
  );
};

export default LeadNew;