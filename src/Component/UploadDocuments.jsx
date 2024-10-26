import React, { useState } from 'react';
import {
    Typography,
    Button,
    Box,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    IconButton,
    Checkbox,
} from '@mui/material';
import VisibilityIcon from '@mui/icons-material/Visibility';
import DownloadIcon from '@mui/icons-material/Download';
import AddIcon from '@mui/icons-material/Add';
import { useLazyGetLeadDocsQuery, useUploadDocumentsMutation } from '../Service/Query';
import { useParams } from 'react-router-dom';
import Swal from 'sweetalert2';
import useAuthStore from './store/authStore';

const UploadDocuments = ({ leadData, uploadedDocs, setUploadedDocs }) => {
    const { id } = useParams();
    const { empInfo } = useAuthStore();
    const [selectedDocument, setSelectedDocument] = useState(null);
    const [documents, setDocuments] = useState({
        aadhaarFront: [],
        aadhaarBack: [],
        panCard: [],
        salarySlip: [],
        bankStatement: [],
    });
    const [uploadedDocumentDetails, setUploadedDocumentDetails] = useState([]);
    const [uploadDocumentType, setUploadDocumentType] = useState('');

    const [uploadDocuments] = useUploadDocumentsMutation();
    const [getLeadDocs] = useLazyGetLeadDocsQuery();

    const handleFileChange = (e, type) => {
        const files = Array.from(e.target.files);
        setDocuments((prevDocs) => ({
            ...prevDocs,
            [type]: [...prevDocs[type], ...files],
        }));
    };

    const handleAddUploadField = (type) => {
        setDocuments((prevDocs) => ({
            ...prevDocs,
            [type]: [...prevDocs[type], null], // Adding a placeholder for a new file input
        }));
    };

    const handleOpenUploadModal = (type) => {
        if (type) {
            setUploadDocumentType(type); // Set document type for upload
            showUploadDialog(type);
        } else {
            Swal.fire({
                title: 'Please select a document type first',
                icon: 'warning',
            });
        }
    };

    const showUploadDialog = (type) => {
        const isMultiple = type === 'salarySlip' || type === 'bankStatement'; // Check if the document type allows multiple uploads
        Swal.fire({
            title: 'Upload File',
            html: `
                <input type="file" id="fileInput" multiple="${isMultiple}" style="display: block; margin-bottom: 10px;" />
                <input type="password" id="passwordInput" placeholder="Password" style="display: block; width: 100%; margin-bottom: 10px;" />
            `,
            focusConfirm: false,
            preConfirm: () => {
                const fileInput = document.getElementById('fileInput').files;
                const passwordInput = document.getElementById('passwordInput').value;

                if (fileInput.length === 0) {
                    Swal.showValidationMessage('Please select at least one file to upload');
                    return false;
                }
                
                return { files: fileInput, password: passwordInput };
            },
            confirmButtonText: 'Upload',
            cancelButtonText: 'Cancel',
            showCancelButton: true,
        }).then(async (result) => {
            if (result.isConfirmed) {
                const { files, password } = result.value;

                try {
                    const formData = new FormData();
                    for (let i = 0; i < files.length; i++) {
                        formData.append(uploadDocumentType, files[i]);
                    }
                    await uploadDocuments({ id: leadData._id, docsData: formData }).unwrap();

                    Swal.fire('Success!', 'Documents uploaded successfully!', 'success');
                    setUploadedDocumentDetails((prev) => [
                        ...prev,
                        { type: uploadDocumentType, uploadedBy: empInfo.name, password },
                    ]);
                    setDocuments((prevDocs) => ({
                        ...prevDocs,
                        [uploadDocumentType]: [], // Clear the documents after upload
                    }));
                } catch (error) {
                    Swal.fire('Error!', error.message || 'An error occurred while uploading the documents.', 'error');
                }
            }
        });
    };

    const handleDownload = (doc) => {
        const blob = new Blob([JSON.stringify(doc)], { type: 'application/json' });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = `${doc.type}.json`;
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        URL.revokeObjectURL(url);
    };

    return (
        <Box sx={{ maxWidth: '700px', margin: '0 auto', mt: 3, p: 3, backgroundColor: '#ffffff', borderRadius: 2 }}>
            <Typography variant="h6" style={{ fontWeight: '600', color: "#000000", mb: 2 }}>
                Upload Documents
            </Typography>

            <Box display="flex" flexDirection="column" gap={2}>
                <Box display="flex" alignItems="center" gap={2}>
                    {['aadhaarFront', 'panCard', 'salarySlip', 'bankStatement'].map((key) => (
                        <Box key={key} display="flex" alignItems="center" gap={1}>
                            <Checkbox
                                checked={selectedDocument === key}
                                onChange={(e) => {
                                    if (e.target.checked) {
                                        setSelectedDocument(key);
                                    } else {
                                        setSelectedDocument(null);
                                    }
                                }}
                                sx={{ color: 'black' }}
                            />
                            <Typography variant="subtitle2" style={{ fontWeight: '600', color: '#000000', fontSize: '14px' }}>
                                {key.charAt(0).toUpperCase() + key.slice(1).replace(/([A-Z])/g, ' $1')}
                            </Typography>
                            {/* Add "+" sign/button only for Salary Slip and Bank Statement */}
                            {(key === 'salarySlip' || key === 'bankStatement') && (
                                <IconButton onClick={() => handleAddUploadField(key)} size="small">
                                    <AddIcon sx={{ color: 'black' }} /> {/* Change color to black */}
                                </IconButton>
                            )}
                        </Box>
                    ))}
                </Box>

                <Box>
                    <Button
                        variant="outlined"
                        onClick={() => handleOpenUploadModal(selectedDocument)}
                        disabled={!selectedDocument}
                    >
                        Upload
                    </Button>
                </Box>
            </Box>

            <TableContainer component={Box} sx={{ marginTop: 2, borderRadius: '8px', border: '1px solid #007bb2', overflow: 'hidden' }}>
                <Table>
                    <TableHead>
                        <TableRow sx={{ backgroundColor: '#007bb2', color: '#ffffff' }}>
                            <TableCell sx={{ color: '#ffffff', fontWeight: 'bold' }}>Doc ID</TableCell>
                            <TableCell sx={{ color: '#ffffff', fontWeight: 'bold' }}>Lead ID</TableCell>
                            <TableCell sx={{ color: '#ffffff', fontWeight: 'bold' }}>Document Type</TableCell>
                            <TableCell sx={{ color: '#ffffff', fontWeight: 'bold' }}>Uploaded By</TableCell>
                            <TableCell sx={{ color: '#ffffff', fontWeight: 'bold' }}>Actions</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {uploadedDocumentDetails.map((doc, index) => (
                            <TableRow key={index} sx={{ '&:nth-of-type(odd)': { backgroundColor: '#f9f9f9' } }}>
                                <TableCell sx={{ color: 'black' }}>{index + 1}</TableCell>
                                <TableCell sx={{ color: 'black' }}>{id}</TableCell>
                                <TableCell sx={{ color: 'black' }}>{doc.type}</TableCell>
                                <TableCell sx={{ color: 'black' }}>{doc.uploadedBy}</TableCell>
                                <TableCell>
                                    <IconButton>
                                        <VisibilityIcon sx={{ color: 'black' }} /> {/* Change color to black */}
                                    </IconButton>
                                    <IconButton onClick={() => handleDownload(doc)}>
                                        <DownloadIcon sx={{ color: 'black' }} /> {/* Change color to black */}
                                    </IconButton>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
        </Box>
    );
};

export default UploadDocuments;
