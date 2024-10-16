import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { DataGrid } from '@mui/x-data-grid';
import {
    Accordion,
    AccordionSummary,
    AccordionDetails,
    Typography,
    Box,
    Alert,
} from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { useApplicationLogsQuery } from '../Service/Query';
import { formatDateTime } from '../utils/helper';

const columns = [
    { field: 'sr', headerName: '#', width: 150 },
    { field: 'borrower', headerName: 'Borrower', width: 200 },
    { field: 'logDate', headerName: 'Log Date', width: 200 },
    { field: 'status', headerName: 'Status', width: 100 },
    { field: 'leadRemark', headerName: 'Lead Remark', width: 250 },
    { field: 'reason', headerName: 'Reason', width: 250 },
];

const ApplicationLogHistory = ({ id }) => {

    const [applicationLog, setApplicationLog] = useState([]);
    const [paginationModel, setPaginationModel] = useState({
        page: 0,
        pageSize: 5,
    });

    const { data, isSuccess, isError, error } = useApplicationLogsQuery(id);

    useEffect(() => {
        if (isSuccess) {
            setApplicationLog(data || []);
        }
    }, [isSuccess, data]);

    const rows = applicationLog.map((log, index) => ({
        id: log._id,
        sr: index + 1,
        borrower: log?.borrower,
        logDate: formatDateTime(log?.logDate),
        status: log?.status,
        leadRemark: log?.leadRemark,
        reason: log?.reason,
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
                            // pageSizeOptions={[5]}
                            // paginationModel={paginationModel}
                            paginationMode="server"
                            onPaginationModelChange={setPaginationModel}
                            sx={{
                                '& .MuiDataGrid-row:hover': {
                                    cursor: 'pointer',
                                },
                            }}
                        />
                    </Box>
                </AccordionDetails>
            </Accordion>
            {isError &&
                <Alert severity="error" sx={{ borderRadius: '8px', mt: 2 }}>
                    {error?.data?.message}
                </Alert>
            }
        </Box>
    );
};

export default ApplicationLogHistory;
