import React, { useEffect, useState } from 'react'
import { useGetInternalDedupeQuery } from '../Service/Query'
import { useParams } from 'react-router-dom'
import { isRejected } from '@reduxjs/toolkit';
import { DataGrid } from '@mui/x-data-grid';

const columns = [
    { field: 'sr', headerName: '#', width: 50 },
    { field: 'name', headerName: 'Name', width: 200 },
    { field: 'loanAmount', headerName: 'Loan Amount', width: 150 },
    { field: 'salary', headerName: 'Salary', width: 100 },
    { field: 'isApproved', headerName: 'Approved', width: 100 },
    { field: 'isRejected', headerName: 'Rejected', width: 100 },

];

const InternalDedupe = () => {
    const { id } = useParams()
    const [leadHistory, setLeadHistory] = useState(null)
    const [paginationModel, setPaginationModel] = useState({
        page: 0,
        pageSize: 5,
    });
    const { data, isSuccess, isError } = useGetInternalDedupeQuery(id, { skip: id === null })

    console.log('dddddddd', history, data)

    useEffect(() => {
        if (isSuccess) {
            setLeadHistory(data.relatedLeads)

        }

    }, [isSuccess])

    const handlePageChange = (newPaginationModel) => {
        setPaginationModel(newPaginationModel)

    }

    const rows = leadHistory && leadHistory?.length && leadHistory.map((lead,index) => ({
        id:lead._id,
        sr:index + 1, 
        name: lead.fName + " " + lead?.mName + " " + lead?.lName,
        loanAmount:lead?.loanAmount,
        salary: lead?.salary,
        isRejected: !lead?.isRejected ? "Rejected" : "NA" ,
        isApproved: !lead?.isApproved ? "Approved" : "NA" ,
        
    }))
    return (
        <>

            <div className="accordion mt-3" id="accordionExample" style={{ borderRadius: "15px" }}>
                <div className="accordion-item" data-bs-toggle="collapse" style={{ maxWidth: "700px", margin: "0 auto" }}>
                    <h2 className="accordion-header" id="headingOne">
                        <button
                            className="accordion-button"
                            type="button"
                            data-bs-toggle="collapse"
                            data-bs-target="#collapseOne"
                            aria-expanded="true"
                            aria-controls="collapseOne"
                            style={{ backgroundColor: "#0366fc", borderRadius: "15px", color: "#fff"}}
                        >
                            <strong>Internal Dedupe</strong>

                        </button>
                    </h2>
                    <div
                        id="collapseOne"
                        className="accordion-collapse collapse"
                        aria-labelledby="headingOne"
                        data-bs-parent="#accordionExample"
                    >
                       

                        {columns && <div style={{ height: 400, width: '100%' }}>
                                <DataGrid
                                    rows={rows}
                                    columns={columns}
                                    // rowCount={totalLeads}
                                    // loading={isLoading}
                                    pageSizeOptions={[5]}
                                    paginationModel={paginationModel}
                                    paginationMode="server"
                                    onPaginationModelChange={handlePageChange}
                                    // onRowClick={(params) => handleLeadClick(params)}
                                    sx={{
                                        '& .MuiDataGrid-row:hover': {
                                            cursor: 'pointer',
                                        },
                                    }}
                                />
                            </div>}
                       

                    </div>
                </div>
            </div>



        </>
    )
}

export default InternalDedupe
