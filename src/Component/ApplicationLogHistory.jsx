import React, { useEffect, useState } from 'react';
import { useApplicationHistoryQuery } from '../Service/Query';
import { useParams } from 'react-router-dom';
import { DataGrid } from '@mui/x-data-grid';
import {
    Accordion,
    AccordionSummary,
    AccordionDetails,
    Typography,
    Box,
} from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';

const columns = [
    { field: 'sr', headerName: '#', width: 150 },
    { field: 'borrower', headerName: 'Borrower', width: 200 },
    { field: 'logDate', headerName: 'Log Date', width: 100 },
    { field: 'status', headerName: 'Status', width: 100 },
    { field: 'leadRemark', headerName: 'Lead Remark', width: 250 },
];

const ApplicationLogHistory = () => {
    const { id } = useParams();
    const [applicationLog, setApplicationLog] = useState([]);
    const [paginationModel, setPaginationModel] = useState({
        page: 0,
        pageSize: 5,
    });

    const logResponse = useApplicationHistoryQuery(id);

    useEffect(() => {
        if (logResponse.isSuccess) {
            setApplicationLog(logResponse.data || []);
        }
    }, [logResponse.isSuccess, logResponse.data]);

    const rows = applicationLog.map((log, index) => ({
        id: log._id,
        sr: index + 1,
        borrower: log?.borrower,
        logDate: log?.logDate,
        status: log?.status,
        leadRemark: log?.leadRemark,
    }));

    return (
        <Box sx={{ maxWidth: '700px', margin: '0 auto', mt: 3 }}>
            <Accordion>
                <AccordionSummary
                    expandIcon={<ExpandMoreIcon />}
                    aria-controls="application-log-content"
                    id="application-log-header"
                    sx={{
                        backgroundColor: '#0366fc',
                        color: '#fff',
                        fontWeight: 'bold',
                        borderRadius: '5px',
                    }}
                >
                    <Typography variant="h6">Application Log</Typography>
                </AccordionSummary>
                <AccordionDetails>
                    <Box sx={{ height: 400, width: '100%' }}>
                        <DataGrid
                            rows={rows}
                            columns={columns}
                            pageSizeOptions={[5]}
                            paginationModel={paginationModel}
                            paginationMode="server"
                            onPaginationModelChange={setPaginationModel} // Update pagination on change
                            sx={{
                                '& .MuiDataGrid-row:hover': {
                                    cursor: 'pointer',
                                },
                            }}
                        />
                    </Box>
                </AccordionDetails>
            </Accordion>
        </Box>
    );
};

export default ApplicationLogHistory;
