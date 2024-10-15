import React, { useEffect, useState } from 'react'
import LeadProfile from '../../page/LeadProfile'
import { useFetchAllHoldLeadsQuery, useFetchSingleLeadQuery } from '../../Service/Query';
import { DataGrid } from '@mui/x-data-grid';
import { useNavigate } from 'react-router-dom';
import OTPVerificationUI from './OtpVerification';
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
    const {data,isSuccess,isError,error} = useFetchAllHoldLeadsQuery()
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
        id: lead?._id, 
        name: ` ${lead?.fName}  ${lead?.mName} ${lead?.lName}`,
        mobile: lead?.mobile,
        aadhaar: lead?.aadhaar,
        pan: lead?.pan,
        city: lead?.city,
        state: lead?.state,
        loanAmount: lead?.loanAmount,
        salary: lead?.salary,
        source: lead?.source,
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
