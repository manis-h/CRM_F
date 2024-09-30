import React, { useEffect, useState } from 'react';
import { useApplicationHistoryQuery } from '../Service/Query';
import { useParams } from 'react-router-dom';
import { DataGrid } from '@mui/x-data-grid';

const columns = [
    { field: 'sr', headerName: '#', width: 150 },
    { field: 'borrower', headerName: 'Borrower', width: 200 },
    { field: 'logDate', headerName: 'Log Date', width: 100 },
    { field: 'status', headerName: 'Status', width: 100 },
    { field: 'leadRemark', headerName: 'Lead Remark', width: 250 },

];

const ApplicationLogHistory = () => {
    const { id } = useParams()

    const [applicationLog, setApplicationLog] = useState(null)
    const [paginationModel, setPaginationModel] = useState({
        page: 0,
        pageSize: 5,
    });

    const logResponse = useApplicationHistoryQuery(id)

    const rows = applicationLog && applicationLog.length && applicationLog.map((log, index) => ({
        id: log._id,
        sr: index + 1,
        borrower: log?.borrower,
        logDate: log?.logDate,
        status: log?.status,
        leadRemark: log?.leadRemark

    }))

    useEffect(() => {
        if (logResponse.isSuccess) {
            setApplicationLog(logResponse.data)
        }

    }, [logResponse.isSuccess])

    return (
        <>
            <div className="accordion mt-3" id="applicationLog" style={{ borderRadius: "15px" }}>
                <div className="accordion-item" style={{ maxWidth: "700px", margin: "0 auto" }}>
                    <h2 className="accordion-header" id="headingApplicationLog">
                        <button
                            className="accordion-button"
                            type="button"
                            data-bs-toggle="collapse"
                            data-bs-target="#collapseApplicationLog"
                            aria-expanded="true"
                            aria-controls="collapseApplicationLog"
                            style={{ backgroundColor: "#0366fc", borderRadius: "15px", color: "#fff",  }}
                        >
                            <strong>Application Log</strong>
                        </button>
                    </h2>
                    <div
                        id="collapseApplicationLog"
                        className="accordion-collapse collapse"
                        aria-labelledby="headingApplicationLog"
                        data-bs-parent="#applicationLog"
                    >
                        <div className="accordion-body">
                            {/* Your log history content goes here */}

                            {columns && <div style={{ height: 400, width: '100%' }}>
                                <DataGrid
                                    rows={rows}
                                    columns={columns}
                                    // rowCount={totalLeads}
                                    // loading={isLoading}
                                    pageSizeOptions={[5]}
                                    paginationModel={paginationModel}
                                    paginationMode="server"
                                    // onPaginationModelChange={handlePageChange}
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
            </div>
        </>
    );
};

export default ApplicationLogHistory;
