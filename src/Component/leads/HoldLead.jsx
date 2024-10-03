import React, { useEffect, useState } from 'react'
import LeadProfile from '../../page/LeadProfile'
import { useFetchAllHoldLeadsQuery, useFetchSingleLeadQuery } from '../../Service/Query';
import { DataGrid } from '@mui/x-data-grid';
import { useNavigate } from 'react-router-dom';
import OTPVerificationUI from './OtpVerification';
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

const HoldLead = () => {
    const [holdLeads, setHoldLeads] = useState()
    const [totalHoldLeads, setTotalHoldLeads] = useState()
    const [id, setId] = useState(null)
    // const {employeeDetails} = useStore()
    // console.log('emp details',employeeDetails)
    const navigate = useNavigate()
    const [paginationModel, setPaginationModel] = useState({
        page: 0,
        pageSize: 5,
    });
    const {data,isSuccess,isError} = useFetchAllHoldLeadsQuery()
    const {data:LeadData,isSuccess:leadSuccess} = useFetchSingleLeadQuery(id,{skip:id===null})
    const handlePageChange = (newPaginationModel) => {
        setPaginationModel(newPaginationModel)
    }

    const handleLeadClick = (lead) => {
        setId(lead.id)
        navigate(`/lead-profile/${lead.id}`)
    }


    // useEffect(() => {
    //     refetch({ page: paginationModel.page + 1, limit: paginationModel.pageSize });
    // }, [paginationModel]);

    useEffect(() => {
        if (data) {
            setHoldLeads(data)
        setTotalHoldLeads(data?.totalLeads)
        }
    }, [isSuccess, data])

    const rows = holdLeads?.leads?.map(lead => ({
        id: lead._id, 
        fName: lead.fName,
        lName: lead.lName,
        gender: lead.gender,
        personalEmail: lead.email,
        mobile: lead.mobile,
        city: lead.city,
        state: lead.state,
        loanAmount: lead.loanAmount,
        salary: lead.salary,
    }));

    return (
        <>
            <div className="crm-container">
                {columns && <div style={{ height: 400, width: '100%' }}>
                    <DataGrid
                        rows={rows}
                        columns={columns}
                        rowCount={totalHoldLeads}
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
            <OTPVerificationUI />
            </div>

        </>
    )
}

export default HoldLead
