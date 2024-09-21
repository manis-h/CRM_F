import { useEffect, useState } from 'react';
import axios from 'axios';
import { DataGrid } from '@mui/x-data-grid';
import { useLeadUpdateMutation } from '../Service/Query';

const LeadNew = () => {
  const [leads, setLeads] = useState([]); // Stores lead details
  const [totalLeads, setTotalLeads] = useState(0); // Stores the total lead count
  const [page, setPage] = useState(1); // Current page
  const [selectedLeads, setSelectedLeads] = useState(null); // Stores selected leads
  const apiUrl = import.meta.env.VITE_API_URL;
  const [leadUpdate,{data,isSuccess}] =useLeadUpdateMutation();


  // Fetch leads and total lead count
  useEffect(() => {
    fetchLeads(page);
  }, [page]);
  console.log("leads",selectedLeads,);
  

  const fetchLeads = () => {
            // axios.get(`https://crm-backend-wui1.onrender.com/api/leads`)

    axios.get(`http://localhost:3000/api/leads/`)
      .then(response => {
        setLeads(response.data.leads);
        setTotalLeads(response.data.totalLeads); // Set total lead count
      })
      .catch(error => {
        console.error('Error fetching leads:', error);
      });
  };
  
  // const handleCheckboxSelection = (selection) => {
    //   setSelectedLeads(selection); // Set selected lead IDs
    // };
    
    const handleActionButton = () => {
      console.log('Selected Leads:', selectedLeads);
      // Perform action based on selected leads
      leadUpdate(selectedLeads,);
    };
    
    const handleCheckboxChange = (id) => {
      setSelectedLeads(selectedLeads === id ? null : id);
    }
    
    const columns = [
      {
        field: 'select',
        headerName: '',
        width: 50,
        renderCell: (params) => (
          <input
          type="checkbox"
          checked={selectedLeads === params.row.id}
          
          onChange={() => handleCheckboxChange(params.row.id)}
          />
        ),
      },
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
    console.log("rows columns",rows,columns);

  return (
    <div>
      {/* Container for Lead counter and action button */}
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          marginTop: '70px',
          marginLeft: '20px',
        }}
      >
        {/* Lead counter */}
        <div
          style={{
            padding: '10px 20px',
            fontWeight: 'bold',
            backgroundColor: '#007bff',
            color: '#fff',
            borderRadius: '5px',
            boxShadow: '0px 4px 6px rgba(0, 0, 0, 0.1)',
            cursor: 'pointer',
          }}
        >
          Total Leads: {totalLeads || 0} {/* Defaults to 0 if no leads */}
        </div>

        {/* Action button for selected leads */}
        <button
          onClick={handleActionButton}
          style={{
            marginLeft: '20px',
            padding: '10px 20px',
            backgroundColor: '#28a745',
            color: '#fff',
            border: 'none',
            borderRadius: '5px',
            cursor: 'pointer',
          }}
        >
          Allocate
        </button>
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
