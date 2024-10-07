import React, { useState, useEffect } from 'react';
import { Accordion, AccordionSummary, AccordionDetails, Typography, Button, Paper, Box, TextField } from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import UploadFileIcon from '@mui/icons-material/UploadFile';
import VisibilityIcon from '@mui/icons-material/Visibility';
import { useUploadDocumentsMutation, useGetLeadDocsQuery } from '../Service/Query';
import { useParams } from 'react-router-dom';
import Swal from 'sweetalert2';

const UploadDocuments = () => {
    const { id } = useParams();
    const [isEditing, setIsEditing] = useState(false);
    const [selectedFileType, setSelectedFileType] = useState(null);

    const [uploadDocuments, { isSuccess: docSuccess }] = useUploadDocumentsMutation();
    const { data: docsData, isSuccess: docsSuccess } = useGetLeadDocsQuery(
        { id, docType: selectedFileType }, 
        { skip: !selectedFileType || !id }
    );

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
    }, [docsSuccess, docsData]);

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
            <Accordion style={accordionStyles}>
                <AccordionSummary expandIcon={<ExpandMoreIcon sx={{ color: '#007bb2' }} />}>
                    <Typography variant="h6" style={{ fontWeight: '600', color:"#ffffff" }}>Upload Documents</Typography>
                </AccordionSummary>
                <AccordionDetails>
                    <Paper elevation={3} style={paperStyles}>
                        <Box display="flex" flexDirection="column" gap={2}>
                            {Object.keys(documents).map((key) => (
                                <Box key={key} display="flex" flexDirection="column" gap={1} mb={3}>
                                    <Typography variant="subtitle1" style={{ fontWeight: '600' }}>
                                        {key.charAt(0).toUpperCase() + key.slice(1).replace(/([A-Z])/g, ' $1')}:
                                    </Typography>
                                    {isEditing ? (
                                        <TextField
                                            type="file"
                                            name={key}
                                            accept=".pdf,.doc,.docx,.jpg"
                                            onChange={handleChange}
                                            fullWidth
                                        />
                                    ) : (
                                        <Typography variant="body2" color="textSecondary">
                                            {documents[key] ? documents[key].name : 'No file uploaded'}
                                        </Typography>
                                    )}

                                    {documents[key] && (
                                        <Button
                                            variant="contained"
                                            sx={buttonStyles}
                                            onClick={() => viewFile(key)}
                                            startIcon={<VisibilityIcon />}
                                        >
                                            View {key}
                                        </Button>
                                    )}
                                </Box>
                            ))}
                        </Box>
                        <Box display="flex" justifyContent="space-between" mt={2}>
                            <Button
                                variant="outlined"
                                onClick={() => setIsEditing((prev) => !prev)}
                                sx={{ borderRadius: '8px' }}
                            >
                                {isEditing ? 'Cancel' : 'Edit'}
                            </Button>
                            {isEditing && (
                                <Button
                                    type="submit"
                                    variant="contained"
                                    sx={buttonStyles}
                                    startIcon={<UploadFileIcon />}
                                    onClick={handleSubmit}
                                >
                                    Upload
                                </Button>
                            )}
                        </Box>
                    </Paper>
                </AccordionDetails>
            </Accordion>
        </Box>
    );
};

export default UploadDocuments;
