import React, { useState, useEffect, useRef } from 'react';
import { Accordion, AccordionSummary, AccordionDetails, Typography, Button, Paper, Box, TextField, Alert } from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import UploadFileIcon from '@mui/icons-material/UploadFile';
import VisibilityIcon from '@mui/icons-material/Visibility';
import { useLazyGetLeadDocsQuery, useUploadDocumentsMutation } from '../Service/Query';
import { useParams } from 'react-router-dom';
import Swal from 'sweetalert2';

const UploadDocuments = ({ leadData, uploadedDocs, setUploadedDocs }) => {
    const { id } = useParams();
    const [selectedFileType, setSelectedFileType] = useState(null);

    const [uploadDocuments, { isSuccess: docSuccess, isError: isDocError, error: docError }] = useUploadDocumentsMutation();
    const [getLeadDocs, { data: docsData, isSuccess: docsSuccess, isError: isDocsError, error: docsError }] = useLazyGetLeadDocsQuery();
    const [accordianOpen, setAccordinaOpen] = useState(true);

    const [documents, setDocuments] = useState({
        aadhaarFront: null,
        aadhaarBack: null,
        panCard: null,
        salarySlip: null,
        bankStatement: null,
        verificationVideo: null,
    });

    const fileInputRefs = {
        aadhaarFront: useRef(null),
        aadhaarBack: useRef(null),
        panCard: useRef(null),
        salarySlip: useRef(null),
        bankStatement: useRef(null),
        verificationVideo: useRef(null),
    };

    const handleChange = (e) => {
        if (e.target.type === 'file') {
            const file = e.target.files[0];
            const name = e.target.name;

            // Validate file type
            if (name === 'salarySlip' || name === 'bankStatement') {
                if (file.type !== 'application/pdf') {
                    alert('Please upload a PDF file for salary slip or bank statement.');
                    return;
                }
            } else if (name === 'verificationVideo') {
                const validVideoTypes = ['video/mp4', 'video/avi', 'video/mov'];
                if (!validVideoTypes.includes(file.type)) {
                    alert('Please upload a valid video file (mp4, avi, mov).');
                    return;
                }
            }
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
        uploadDocuments({ id: leadData._id, docsData: formData });
        setDocuments({
            aadhaarFront: null,
            aadhaarBack: null,
            panCard: null,
            salarySlip: null,
            bankStatement: null,
            verificationVideo: null,
        });
    };

    const viewFile = (docType) => {
        setSelectedFileType(docType);
        getLeadDocs({ id: leadData._id, docType });
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
            const fileUrl = docsData?.url;
            const mimeType = docsData?.mimeType?.split('/').pop().toLowerCase();
            console.log('docs check', fileUrl, docsData, mimeType)

            if (['jpg', 'jpeg', 'png'].includes(mimeType)) {
                Swal.fire({
                    title: 'Document retrieved successfully!',
                    html: `<img src="${fileUrl}" alt="${selectedFileType}" width="400" />`,
                    showCloseButton: true,
                });
            } else if (['pdf'].includes(mimeType)) {
                Swal.fire({
                    title: 'Document retrieved successfully!',
                    html: `<iframe src="${fileUrl}" width="400" height="500"></iframe>`,
                    showCloseButton: true,
                });
            } else if (['mp4', 'avi', 'mov'].includes(mimeType)) {
                Swal.fire({
                    title: 'Document retrieved successfully!',
                    html: `<video width="400" controls><source src="${fileUrl}" type="video/${mimeType}">Your browser does not support the video tag.</video>`,
                    showCloseButton: true,
                });
            }
        }
    }, [docsData]);

    const accordionStyles = {
        borderRadius: '12px',
        background: 'linear-gradient(145deg, #0366fc, #ffffff)',
        boxShadow: '5px 5px 10px #d1d5db, -5px -5px 10px #ffffff',
        marginBottom: '20px',
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
                <AccordionSummary expandIcon={<ExpandMoreIcon sx={{ color: '#007bb2' }} />}>
                    <Typography variant="h6" style={{ fontWeight: '600', color: "#ffffff" }}>Upload Documents</Typography>
                </AccordionSummary>
                <AccordionDetails>
                    <Paper elevation={3} style={paperStyles}>
                        <Box display="flex" flexDirection="column" gap={2}>
                            {Object.keys(documents).map((key) => {
                                let acceptType = '';

                                if (key === 'salarySlip' || key === 'bankStatement') {
                                    acceptType = 'application/pdf';  // Only PDF files
                                } else if (key === 'verificationVideo') {
                                    acceptType = 'video/mp4, video/avi, video/mov';  // Only video files
                                } else {
                                    acceptType = 'image/jpg, image/png, image/jpeg';  // General file types for other fields
                                }
                                return (
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
                                                accept={acceptType}
                                                onChange={handleChange}
                                                // inputRef={fileInputRefs}
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
                                )
                            })}
                            <Box sx={{ marginTop: 2 }}>
                                {isDocError && (
                                    <Alert severity="error" sx={{ borderRadius: '8px', boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)' }}>
                                        <Typography variant="body1" sx={{ fontWeight: 'bold' }}>
                                            Error:
                                        </Typography>
                                        <Typography variant="body2" sx={{ marginTop: 1 }}>
                                            {docError?.data?.message}
                                        </Typography>
                                    </Alert>
                                )}
                            </Box>
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
