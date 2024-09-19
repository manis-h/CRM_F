import React, { useEffect, useState } from 'react';
import axios from 'axios';
import DynamicTable from '../Component/DynamicTable';

const LeadNew = () => {
  const [users, setUsers] = useState([]); // Stores user details
  const [page, setPage] = useState(1); // Current page
  const [totalPages, setTotalPages] = useState(1); // Total pages for pagination
  const [totalLeads, setTotalLeads] = useState(0); // Stores the total lead count

  // Fetch users and total lead count
  useEffect(() => {
    fetchUsers(page);
  }, [page]);

  const fetchUsers = (pageNumber) => {
    axios.get(`http://localhost:3000/api/users/all?page=${pageNumber}&limit=10`, { withCredentials: true })
      .then(response => {
        setUsers(response.data.userDetails);
        setTotalPages(response.data.totalPages); // Set total pages
        setTotalLeads(response.data.totalUsers); // Set total lead count (totalUsers from response)
      })
      .catch(error => {
        console.error('Error fetching users:', error);
      });
  };

  const headers = ["First Name", "Last Name", "Gender", "Email", "Mobile", "City", "State", "Loan Amount", "No. of Loans"];

  const rows = users.map(user => [
    user.firstName,
    user.lastName,
    user.gender,
    user.personalEmail,
    user.mobileNo,
    user.city,
    user.state,
    user.loanAmount,
    user.NoOfLoans
  ]);

  const handleNextPage = () => {
    if (page < totalPages) setPage(page + 1);
  };

  const handlePrevPage = () => {
    if (page > 1) setPage(page - 1);
  };

  return (
    <div>
      {/* Lead counter */}
      <div
  style={{
    display: 'inline-block',
    marginTop: '70px',
    marginLeft:'20px',
    marginBottom:'-30px',
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
      {/* Table displaying the data */}
      <DynamicTable header={headers} rows={rows} />

      {/* Pagination Controls */}
      <div className="pagination" style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', marginTop: '20px' }}>
        <button
          onClick={handlePrevPage}
          disabled={page === 1}
          style={{
            backgroundColor: '#007bff',
            color: 'white',
            border: 'none',
            padding: '10px 20px',
            margin: '0 10px',
            cursor: 'pointer',
            borderRadius: '5px',
            opacity: page === 1 ? 0.5 : 1
          }}
        >
          Previous
        </button>
        <span style={{ fontWeight: 'bold' }}>
          Page {page} of {totalPages}
        </span>
        <button
          onClick={handleNextPage}
          disabled={page === totalPages}
          style={{
            backgroundColor: '#007bff',
            color: 'white',
            border: 'none',
            padding: '10px 20px',
            margin: '0 10px',
            cursor: 'pointer',
            borderRadius: '5px',
            opacity: page === totalPages ? 0.5 : 1
          }}
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default LeadNew;
