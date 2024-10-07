import React, { useState } from 'react';
import { Typography, Grid, Button, Accordion, AccordionSummary, AccordionDetails, Paper, Divider, TextField, Box } from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';

const ApplicantDetails = ({ residence, reference, employmentData }) => {
    const [isEditingResidence, setIsEditingResidence] = useState(false);
    const [isEditingEmployment, setIsEditingEmployment] = useState(false);

    const handleResidenceEditToggle = () => {
        setIsEditingResidence((prev) => !prev);
    };

    const handleEmploymentEditToggle = () => {
        setIsEditingEmployment((prev) => !prev);
    };

    const accordionStyles = {
        borderRadius: '12px',
        background: 'linear-gradient(145deg, #8cb4f5, #474e59)',
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
        <>
            {/* Residence Information Accordion */}
            <Accordion style={accordionStyles}>
                <AccordionSummary
                    expandIcon={<ExpandMoreIcon sx={{ color: '#007bb2' }} />}
                    aria-controls="panel1a-content"
                    id="panel1a-header"
                >
                    <Typography variant="h6" style={{ fontWeight: '600' }}>Residence Information</Typography>
                </AccordionSummary>
                <AccordionDetails>
                    <Paper elevation={3} style={paperStyles}>
                        {(isEditingResidence || !residence) ? (
                            <Box display="flex" flexDirection="column" gap={2}>
                                <Box display="flex" flexDirection={{ xs: 'column', sm: 'row' }} gap={2}>
                                    <TextField
                                        label="Address"
                                        fullWidth
                                        defaultValue={residence?.address ?? ""}
                                    />
                                    <TextField
                                        label="State"
                                        fullWidth
                                        defaultValue={residence?.state ?? ""}
                                    />
                                </Box>
                                <Box display="flex" flexDirection={{ xs: 'column', sm: 'row' }} gap={2}>
                                    <TextField
                                        label="City"
                                        fullWidth
                                        defaultValue={residence?.city ?? ""}
                                    />
                                    <TextField
                                        label="Pincode"
                                        fullWidth
                                        defaultValue={residence?.pincode ?? ""}
                                    />
                                </Box>
                                <Box display="flex" flexDirection={{ xs: 'column', sm: 'row' }} gap={2}>
                                    <TextField
                                        label="Residence Since"
                                        fullWidth
                                        defaultValue={residence?.residenceSince ?? ""}
                                    />
                                </Box>

                                <Box display="flex" justifyContent="flex-end" gap={2} mt={2}>
                                    <Button variant="outlined" onClick={handleResidenceEditToggle}>
                                        Cancel
                                    </Button>
                                    <Button variant="contained" style={buttonStyles} onClick={handleResidenceEditToggle}>
                                        Save
                                    </Button>
                                </Box>
                            </Box>
                        ) : (
                            <Box display="flex" flexDirection="column" gap={2}>
                                <Box display="flex" flexDirection={{ xs: 'column', sm: 'row' }} gap={2}>
                                    <Typography variant="subtitle1" gutterBottom>
                                        <strong>Address: </strong> {residence?.address}
                                    </Typography>
                                    <Typography variant="subtitle1" gutterBottom>
                                        <strong>State: </strong> {residence?.state}
                                    </Typography>
                                </Box>
                                <Box display="flex" flexDirection={{ xs: 'column', sm: 'row' }} gap={2}>
                                    <Typography variant="subtitle1" gutterBottom>
                                        <strong>City: </strong> {residence?.city}
                                    </Typography>
                                    <Typography variant="subtitle1" gutterBottom>
                                        <strong>Pincode: </strong> {residence?.pincode}
                                    </Typography>
                                </Box>
                                <Box display="flex" flexDirection={{ xs: 'column', sm: 'row' }} gap={2}>
                                    <Typography variant="subtitle1" gutterBottom>
                                        <strong>Residence Since: </strong> {residence?.residenceSince}
                                    </Typography>
                                </Box>

                                <Box display="flex" justifyContent="flex-end" gap={2} mt={2}>
                                    <Button variant="outlined" style={{ borderRadius: '8px' }} onClick={handleResidenceEditToggle}>
                                        {!(residence && Object.keys(residence).length) ? "Add" : "Edit"}
                                    </Button>
                                </Box>

                                <Divider style={{ margin: '30px 0' }} />
                            </Box>
                        )}
                    </Paper>
                </AccordionDetails>
            </Accordion>

            {/* Employment Details Accordion */}
            <Accordion style={accordionStyles}>
                <AccordionSummary
                    expandIcon={<ExpandMoreIcon sx={{ color: '#007bb2' }} />}
                    aria-controls="panel2a-content"
                    id="panel2a-header"
                >
                    <Typography variant="h6" style={{ fontWeight: '600' }}>Employment Details</Typography>
                </AccordionSummary>
                <AccordionDetails>
                    <Paper elevation={3} style={paperStyles}>
                        {(isEditingEmployment || !employmentData) ? (
                            <Box display="flex" flexDirection="column" gap={2}>
                                <Box display="flex" flexDirection={{ xs: 'column', sm: 'row' }} gap={2}>
                                    <TextField
                                        label="Company Name"
                                        fullWidth
                                        defaultValue={employmentData?.companyName ?? ""}
                                    />
                                    <TextField
                                        label="Company Address"
                                        fullWidth
                                        defaultValue={employmentData?.companyAddress ?? ""}
                                    />
                                </Box>
                                <Box display="flex" flexDirection={{ xs: 'column', sm: 'row' }} gap={2}>
                                    <TextField
                                        label="State"
                                        fullWidth
                                        defaultValue={employmentData?.state ?? ""}
                                    />
                                    <TextField
                                        label="City"
                                        fullWidth
                                        defaultValue={employmentData?.city ?? ""}
                                    />
                                </Box>
                                <Box display="flex" flexDirection={{ xs: 'column', sm: 'row' }} gap={2}>
                                    <TextField
                                        label="Pincode"
                                        fullWidth
                                        defaultValue={employmentData?.pincode ?? ""}
                                    />
                                    <TextField
                                        label="Department"
                                        fullWidth
                                        defaultValue={employmentData?.department ?? ""}
                                    />
                                </Box>
                                <Box display="flex" flexDirection={{ xs: 'column', sm: 'row' }} gap={2}>
                                    <TextField
                                        label="Designation"
                                        fullWidth
                                        defaultValue={employmentData?.designation ?? ""}
                                    />
                                    <TextField
                                        label="Employed Since"
                                        fullWidth
                                        defaultValue={employmentData?.employedSince ?? ""}
                                    />
                                </Box>

                                <Box display="flex" justifyContent="flex-end" gap={2} mt={2}>
                                    <Button variant="outlined" onClick={handleEmploymentEditToggle}>
                                        Cancel
                                    </Button>
                                    <Button variant="contained" style={buttonStyles} onClick={handleEmploymentEditToggle}>
                                        Save
                                    </Button>
                                </Box>
                            </Box>
                        ) : (
                            <Box display="flex" flexDirection="column" gap={2}>
                                <Box display="flex" flexDirection={{ xs: 'column', sm: 'row' }} gap={2}>
                                    <Typography variant="subtitle1" gutterBottom>
                                        <strong>Company Name: </strong> {employmentData?.companyName}
                                    </Typography>
                                    <Typography variant="subtitle1" gutterBottom>
                                        <strong>Company Address: </strong> {employmentData?.companyAddress}
                                    </Typography>
                                </Box>
                                <Box display="flex" flexDirection={{ xs: 'column', sm: 'row' }} gap={2}>
                                    <Typography variant="subtitle1" gutterBottom>
                                        <strong>State: </strong> {employmentData?.state}
                                    </Typography>
                                    <Typography variant="subtitle1" gutterBottom>
                                        <strong>City: </strong> {employmentData?.city}
                                    </Typography>
                                </Box>
                                <Box display="flex" flexDirection={{ xs: 'column', sm: 'row' }} gap={2}>
                                    <Typography variant="subtitle1" gutterBottom>
                                        <strong>Pincode: </strong> {employmentData?.pincode}
                                    </Typography>
                                    <Typography variant="subtitle1" gutterBottom>
                                        <strong>Department: </strong> {employmentData?.department}
                                    </Typography>
                                </Box>
                                <Box display="flex" flexDirection={{ xs: 'column', sm: 'row' }} gap={2}>
                                    <Typography variant="subtitle1" gutterBottom>
                                        <strong>Designation: </strong> {employmentData?.designation}
                                    </Typography>
                                    <Typography variant="subtitle1" gutterBottom>
                                        <strong>Employed Since: </strong> {employmentData?.employedSince}
                                    </Typography>
                                </Box>

                                <Box display="flex" justifyContent="flex-end" gap={2} mt={2}>
                                    <Button variant="outlined" style={{ borderRadius: '8px' }} onClick={handleEmploymentEditToggle}>
                                        Edit
                                    </Button>
                                </Box>

                                <Divider style={{ margin: '30px 0' }} />
                            </Box>
                        )}
                    </Paper>
                </AccordionDetails>
            </Accordion>
        </>
    );
};

export default ApplicantDetails;
