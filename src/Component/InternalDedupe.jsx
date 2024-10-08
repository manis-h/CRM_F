import React, { useEffect, useState } from 'react';
import { useGetInternalDedupeQuery } from '../Service/Query';
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
    { field: 'sr', headerName: '#', width: 50 },
    { field: 'name', headerName: 'Name', width: 200 },
    { field: 'loanAmount', headerName: 'Loan Amount', width: 150 },
    { field: 'salary', headerName: 'Salary', width: 100 },
    { field: 'isApproved', headerName: 'Approved', width: 100 },
    { field: 'isRejected', headerName: 'Rejected', width: 100 },
];

const InternalDedupe = () => {
    const { id } = useParams();
    const [leadHistory, setLeadHistory] = useState([]);
    const [paginationModel, setPaginationModel] = useState({
        page: 0,
        pageSize: 5,
    });

    const { data, isSuccess, isError } = useGetInternalDedupeQuery(id, { skip: id === null });

    useEffect(() => {
        if (isSuccess) {
            setLeadHistory(data.relatedLeads || []);
        }
    }, [isSuccess, data]);

    const handlePageChange = (newPaginationModel) => {
        setPaginationModel(newPaginationModel);
    };

    const rows = leadHistory.map((lead, index) => ({
        id: lead._id,
        sr: index + 1,
        name: `${lead.fName} ${lead.mName || ''} ${lead.lName || ''}`,
        loanAmount: lead?.loanAmount,
        salary: lead?.salary,
        isRejected: lead?.isRejected ? 'NA' : 'Rejected',
        isApproved: lead?.isApproved ? 'NA' : 'Approved',
    }));

    return (
        <Box sx={{ maxWidth: '700px', margin: '0 auto', mt: 3, borderRadius: '15px' }}>
            <Accordion>
                <AccordionSummary
                    expandIcon={<ExpandMoreIcon />}
                    aria-controls="internal-dedupe-content"
                    id="internal-dedupe-header"
                    sx={{
                        backgroundColor: '#0366fc',
                        color: '#fff',
                        fontWeight: 'bold',
                        borderRadius: '5px',
                    }}
                >
                    <Typography variant="h6">Internal Dedupe</Typography>
                </AccordionSummary>
                <AccordionDetails>
                    <Box sx={{ height: 400, width: '100%' }}>
                        <DataGrid
                            rows={rows}
                            columns={columns}
                            pageSizeOptions={[5]}
                            paginationModel={paginationModel}
                            paginationMode="server"
                            onPaginationModelChange={handlePageChange}
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

export default InternalDedupe;
