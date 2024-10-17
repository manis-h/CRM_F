import { useEffect, useState } from 'react';
import { DataGrid } from '@mui/x-data-grid';
import { useNavigate } from 'react-router-dom';
import { useRecommendedApplicationsQuery } from '../../queries/applicationQueries';

const RecommendedApp = () => {
  const [applications, setApplications] = useState([]); 
  const [totalApplications, setTotalApplications] = useState(0); 
  const [page, setPage] = useState(1); 
  const [selectedApplication, setSelectedApplication] = useState(null);
//   const apiUrl = import.meta.env.VITE_API_URL;
  // const [allocateApplication, { data: updateApplication, isSuccess }] = useAllocateApplicationMutation();
  const [paginationModel, setPaginationModel] = useState({
    page: 0,
    pageSize: 5,
  });
  const navigate = useNavigate()


  const { data: allApplication,isSuccess:applicationSuccess, refetch } = useRecommendedApplicationsQuery({page:paginationModel.page+1,limit:paginationModel.pageSize})

  useEffect(() => {
    if(applicationSuccess){

        setApplications(allApplication);
        setTotalApplications(allApplication?.totalApplications)
    }

  }, [page,allApplication,applicationSuccess]);

  
  
  const handleAllocate = async () => {
    // Perform action based on selected leads
    allocateApplication(selectedApplication);
    
  };

  const handleCheckboxChange = (id) => {
    setSelectedApplication(selectedApplication === id ? null : id);
  }

  const handlePageChange = (newPaginationModel) => {
    // Fetch new data based on the new page
    setPaginationModel(newPaginationModel)
    refetch(newPaginationModel); // Adjust this according to your data fetching logic
  };

  // useEffect(() => {
  //   if(isSuccess){
  //       navigate("/application-process")

  //   }

  // },[isSuccess,allApplication])

// useEffect(() => {
//   refetch()
// }, [page, allApplication])
  const columns = [
    { field: 'name', headerName: 'Full Name', width: 200 },
    { field: 'mobile', headerName: 'Mobile', width: 150 },
    { field: 'aadhaar', headerName: 'Aadhaar No.', width: 150 },
    { field: 'pan', headerName: 'Pan No.', width: 150 },
    { field: 'city', headerName: 'City', width: 150 },
    { field: 'state', headerName: 'State', width: 150 },
    { field: 'loanAmount', headerName: 'Loan Amount', width: 150 },
    { field: 'salary', headerName: 'Salary', width: 150 },
    { field: 'recommendedBy', headerName: 'Recommended By', width: 150 },
    { field: 'source', headerName: 'Source', width: 150 },
  ];

  const rows = applications?.applications?.map(application => ({
    id: application?._id, // Unique ID for each lead
    name: `${application?.lead?.fName} ${application?.lead?.mName} ${application?.lead?.lName}`,
    mobile: application?.lead?.mobile,
    aadhaar: application?.lead?.aadhaar,
    pan: application?.lead?.pan,
    city: application?.lead?.city,
    state: application?.lead?.state,
    loanAmount: application?.lead?.loanAmount,
    salary: application?.lead?.salary,
    recommendedBy: application?.recommendedBy,
    source: application?.lead?.source,
  }));

  return (
    <div>
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          marginTop: '70px',
          marginLeft: '20px',
        }}
      >
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
          Total Applicattion: {totalApplications || 0} {/* Defaults to 0 if no leads */}
        </div>

        {/* Action button for selected leads */}
        <button
          onClick={handleAllocate}
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

      {columns && <div style={{ height: 400, width: '100%' }}>
        <DataGrid
          rows={rows}
          columns={columns}
          rowCount={totalApplications}
          // loading={isLoading}
          pageSizeOptions={[5]}
          paginationModel={paginationModel}
          paginationMode="server"
          onPaginationModelChange={handlePageChange}
          sx={{
            color: '#1F2A40',  // Default text color for rows
                '& .MuiDataGrid-columnHeaders': {
                  backgroundColor: '#1F2A40',  // Optional: Header background color
                  color: 'white'  // White text for the headers
                },
                '& .MuiDataGrid-footerContainer': {
                  backgroundColor: '#1F2A40',  // Footer background color
                  color: 'white',  // White text for the footer
                },
            '& .MuiDataGrid-row:hover': {
                backgroundColor: 'white',
                cursor: 'pointer',
            },
            '& .MuiDataGrid-row': {
                backgroundColor: 'white',
                // cursor: 'pointer',
            },
        }}
        />
      </div>}
    </div>
  );
};

export default RecommendedApp;
