import React, { useEffect, useState } from 'react'
import { DataGrid } from '@mui/x-data-grid';
import { Alert } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { useGetRejectedApplicationsQuery } from '../../queries/applicationQueries';
import useAuthStore from '../store/authStore';


const RejectedApplication = () => {
    const [rejectedApplications, setRejectedApplications] = useState()
    const [totalRejectedApplcations, setTotalRejectedApplications] = useState()
    const {empInfo} = useAuthStore()
    const navigate = useNavigate()
    const [paginationModel, setPaginationModel] = useState({
        page: 0,
        pageSize: 5,
    });
    const { data, isSuccess, isLoading, isError, error } = useGetRejectedApplicationsQuery()
    const handlePageChange = (newPaginationModel) => {
        setPaginationModel(newPaginationModel)
    }

    const handleLeadClick = (application) => {
        navigate(`/application-profile/${application.id}`)
    }

    useEffect(() => {
        if (data) {
            setRejectedApplications(data?.rejectedApplications?.application)
            setTotalRejectedApplications(data?.rejectedApplications?.totalApplications)
        }
    }, [isSuccess, data])

    const columns = [
        { field: 'name', headerName: 'Full Name', width: 200 },
        { field: 'mobile', headerName: 'Mobile', width: 150 },
        { field: 'aadhaar', headerName: 'Aadhaar No.', width: 150 },
        { field: 'pan', headerName: 'Pan No.', width: 150 },
        { field: 'city', headerName: 'City', width: 150 },
        { field: 'state', headerName: 'State', width: 150 },
        { field: 'loanAmount', headerName: 'Loan Amount', width: 150 },
        { field: 'salary', headerName: 'Salary', width: 150 },
        { field: 'source', headerName: 'Source', width: 150 },
        ...(empInfo?.empRole === "sanctionHead" || empInfo?.empRole === "admin"
            ? [{ field: 'rejectedBy', headerName: 'Rejected By', width: 150 }]
            : [])
    ];
    const rows = rejectedApplications?.map(application => ({
        id: application?._id,
        name: `${application?.lead?.fName} ${application?.lead?.mName} ${application?.lead?.lName}`,
        mobile: application?.lead?.mobile,
        aadhaar: application?.lead?.aadhaar,
        pan: application?.lead?.pan,
        city: application?.lead?.city,
        state: application?.lead?.state,
        loanAmount: application?.lead?.loanAmount,
        salary: application?.lead?.salary,
        source: application?.lead?.source,
        ...((empInfo?.empRole === "sanctionHead" || empInfo?.empRole === "admin") &&
        { rejectedBy: `${application?.rejectedBy?.fName}${application?.rejectedBy?.mName ? ` ${application?.rejectedBy?.mName}` : ``} ${application?.rejectedBy?.lName}`, })
  
    }));

    return (
        <>
            <div className="crm-container">
                {columns && <div style={{ height: 400, width: '100%' }}>
                    <DataGrid
                        rows={rows}
                        columns={columns}
                        rowCount={totalRejectedApplcations}
                        loading={isLoading}
                        pageSizeOptions={[5]}
                        paginationModel={paginationModel}
                        paginationMode="server"
                        onPaginationModelChange={handlePageChange}
                        onRowClick={(params) => handleLeadClick(params)}
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
                                cursor: 'pointer',
                            },
                        }}
                    />
                </div>}
            </div>
            {isError &&
                <Alert severity="error" style={{ marginTop: "10px" }}>
                    {error?.data?.message}
                </Alert>
            }

        </>
    )
}

export default RejectedApplication
