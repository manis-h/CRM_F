import React, { useEffect, useState } from 'react'
import { useFetchAllocatedLeadsQuery } from '../Service/Query';
import { DataGrid } from '@mui/x-data-grid';

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

const ProcessingLeads = () => {
    const [processingLeads, setProcessingLeads] = useState()


    const [page, setPage] = useState()
    const { data,isSuccess } = useFetchAllocatedLeadsQuery()



    useEffect(() => {
        if (data) {
            setProcessingLeads(data)
        }


    }, [page,isSuccess])

    const rows = processingLeads?.leads?.map(lead => ({
        id: lead._id, // Unique ID for each lead
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
                <div style={{ height: 400, width: '100%', marginTop: '20px' }}>
                    <DataGrid
                        rows={rows}
                        columns={columns}
                        pageSize={10}
                        rowsPerPageOptions={[10]}
                        pagination
                        paginationMode="server"
                        onPageChange={(newPage) => setPage(newPage)}
                        rowCount={30}
                    />
                </div>
            </div>

        </>
    )
}

export default ProcessingLeads
