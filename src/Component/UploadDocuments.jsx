import React, { useState, useEffect } from 'react';
import { Accordion, AccordionSummary, AccordionDetails, Typography, Button, Paper, Box, TextField } from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import UploadFileIcon from '@mui/icons-material/UploadFile';
import VisibilityIcon from '@mui/icons-material/Visibility';
import { useLazyGetLeadDocsQuery, useUploadDocumentsMutation, } from '../Service/Query';
import { useParams } from 'react-router-dom';
import Swal from 'sweetalert2';

const UploadDocuments = ({ uploadedDocs, setUploadedDocs }) => {
    const { id } = useParams();
    const [selectedFileType, setSelectedFileType] = useState(null);

    const [uploadDocuments, { isSuccess: docSuccess }] = useUploadDocumentsMutation();
    const [getLeadDocs, { data: docsData, isSuccess: docsSuccess }] = useLazyGetLeadDocsQuery();
    const [accordianOpen,setAccordinaOpen]= useState(true)

    const [documents, setDocuments] = useState({
        aadhaarFront: null,
        aadhaarBack: null,
        panCard: null,
        salarySlip: null,
        bankStatement: null,
    });

    const handleChange = (e) => {
        if (e.target.type === 'file') {
            const file = e.target.files[0];
            const name = e.target.name;
            setDocuments({ ...documents, [name]: file });
        }
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        const formData = new FormData();
        Object.keys(documents).forEach((key) => {
            if (documents[key]) {
                formData.append(key, documents[key]);
            }
        });
        uploadDocuments({ id, docsData: formData });
    };

    const viewFile = (docType) => {
        setSelectedFileType(docType);
        getLeadDocs({ id, docType })
    };

    useEffect(() => {
        if (docSuccess) {
            Swal.fire({
                title: 'Documents uploaded successfully!',
                icon: 'success',
            });
        }
    }, [docSuccess]);

    useEffect(() => {
        if (docsSuccess) {
            Swal.fire({
                title: 'Document retrieved successfully!',
                html: `<img src="${docsData?.url}" alt="${selectedFileType}" width="400" />`,
                showCloseButton: true,
            });
        }
    }, [docsData]);

    const accordionStyles = {
        borderRadius: '12px',
        background: 'linear-gradient(145deg, #0366fc, #ffffff)',
        boxShadow: '5px 5px 10px #d1d5db, -5px -5px 10px #ffffff',
        marginBottom: '20px'
    };

    const paperStyles = {
        padding: '30px',
        borderRadius: '15px',
        backgroundColor: '#fafafa',
        boxShadow: '5px 5px 15px rgba(0, 0, 0, 0.1)',
    };

    const buttonStyles = {
        borderRadius: '8px',
        padding: '10px 20px',
        background: 'linear-gradient(45deg, #42a5f5, #007bb2)',
        color: '#fff',
        '&:hover': {
            background: 'linear-gradient(45deg, #007bb2, #42a5f5)',
        },
    };

    return (
        <Box sx={{ maxWidth: '700px', margin: '0 auto', mt: 3 }}>
            <Accordion defaultExpanded style={accordionStyles}>
                <AccordionSummary   expandIcon={<ExpandMoreIcon sx={{ color: '#007bb2' }} />}>
                    <Typography variant="h6" style={{ fontWeight: '600', color: "#ffffff" }}>Upload Documents</Typography>
                </AccordionSummary>
                <AccordionDetails>
                    <Paper elevation={3} style={paperStyles}>
                        <Box display="flex" flexDirection="column" gap={2}>
                            {Object.keys(documents).map((key) => (
                                <Box key={key} display="flex" flexDirection="column" gap={1} mb={3}>
                                    <Typography variant="subtitle1" style={{ fontWeight: '600' }}>
                                        {key.charAt(0).toUpperCase() + key.slice(1).replace(/([A-Z])/g, ' $1')}:
                                    </Typography>
                                    <Box
                                        display="flex"
                                        flexDirection="row"
                                        alignItems="center"
                                        justifyContent="space-between"
                                        sx={{
                                            padding: '12px',
                                            border: '2px solid #dfe3e8',
                                            borderRadius: '12px',
                                            boxShadow: '0 6px 12px rgba(0, 0, 0, 0.08)',
                                            backgroundColor: '#ffffff',
                                            marginBottom: '20px',
                                            
                                        }}
                                    >
                                        <TextField
                                            type="file"
                                            name={key}
                                            accept=".pdf,.doc,.docx,.jpg"
                                            onChange={handleChange}
                                            fullWidth
                                            InputProps={{
                                                sx: {
                                                    borderRadius: '6px',
                                                    padding: '8px',
                                                    backgroundColor: '#f4f6f8',
                                                    '&:hover': {
                                                        backgroundColor: '#e0e3e7',
                                                    },
                                                    '& input': {
                                                        padding: '8px',
                                                    },
                                                },
                                            }}
                                        />

                                        {uploadedDocs.includes(key) && (
                                            <Button
                                                variant="outlined"
                                                color="secondary"
                                                onClick={() => viewFile(key)}
                                                startIcon={<VisibilityIcon />}
                                                sx={{
                                                    marginLeft: '16px',
                                                    padding: '8px 18px',
                                                    borderRadius: '12px',
                                                    borderColor: '#3f51b5',
                                                    color: '#3f51b5',
                                                    transition: 'border-color 0.3s, background-color 0.3s',
                                                    '&:hover': {
                                                        borderColor: '#303f9f',
                                                        backgroundColor: '#e8eaf6',
                                                    },
                                                }}
                                            >
                                                View
                                            </Button>
                                        )}
                                    </Box>



                                </Box>
                            ))}
                        </Box>
                        <Box display="flex" justifyContent="space-between" mt={2}>
                            <Button
                                type="submit"
                                variant="contained"
                                sx={buttonStyles}
                                startIcon={<UploadFileIcon />}
                                onClick={handleSubmit}
                            >
                                Upload
                            </Button>

                        </Box>
                    </Paper>
                </AccordionDetails>
            </Accordion>
        </Box>
    );
};

export default UploadDocuments;
