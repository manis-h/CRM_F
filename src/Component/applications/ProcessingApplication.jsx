import React, { useEffect, useState } from 'react'
import { DataGrid } from '@mui/x-data-grid';
import { useNavigate } from 'react-router-dom';
import {  useFetchAllocatedApplicationQuery, useFetchSingleApplicationQuery } from '../../queries/applicationQueries';

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
];

const ProcessingApplication = () => {
    const [processingApplication, setProcessingApplication] = useState()
    const [totalApplications, setTotalApplications] = useState()
    const [id, setId] = useState(null)
    // const {employeeDetails} = useStore()
    // console.log('emp details',employeeDetails)
    const navigate = useNavigate()
    const [paginationModel, setPaginationModel] = useState({
        page: 0,
        pageSize: 5,
    });

    const { data, isSuccess, refetch } = useFetchAllocatedApplicationQuery({ page: paginationModel.page + 1, limit: paginationModel.pageSize })
    // const {data:applicationData,isSuccess:applicationSuccess} = useFetchSingleApplicationQuery(id,{skip:id===null})
    const handlePageChange = (newPaginationModel) => {
        setPaginationModel(newPaginationModel)

    }

    const handleLeadClick = (lead) => {
        setId(lead.id)
        navigate(`/application-profile/${lead.id}`)
    }


    useEffect(() => {
        refetch({ page: paginationModel.page + 1, limit: paginationModel.pageSize });
    }, [paginationModel]);

    useEffect(() => {
        if (data) {
            setProcessingApplication(data)
            setTotalApplications(data?.totalApplications)
        }
    }, [isSuccess, data])

    const rows = processingApplication?.applications?.map(application => ({
        id: application?._id, 
        name: ` ${application?.lead?.fName}  ${application?.lead?.mName} ${application?.lead?.lName}`,
        mobile: application?.lead?.mobile,
        aadhaar: application?.lead?.aadhaar,
        pan: application?.lead?.pan,
        city: application?.lead?.city,
        state: application?.lead?.state,
        loanAmount: application?.lead?.loanAmount,
        salary: application?.lead?.salary,
        source: application?.lead?.source,
    }));

    return (
        <>
            <div className="crm-container">
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
                        onRowClick={(params) => handleLeadClick(params)}
                        sx={{
                            '& .MuiDataGrid-row:hover': {
                                cursor: 'pointer',
                            },
                        }}
                    />
                </div>}
            </div>

        </>
    )
}

export default ProcessingApplication

