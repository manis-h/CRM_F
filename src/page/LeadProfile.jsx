import React, { useEffect, useState } from 'react';
import { Typography, Grid, Button, Accordion, AccordionSummary, AccordionDetails, Paper, Divider } from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { useParams } from 'react-router-dom';
import { useFetchSingleLeadQuery, useGetLeadDocsQuery, useUploadDocumentsMutation } from '../Service/Query';
import LeadDetails from '../Component/LeadDetails';
import Swal from 'sweetalert2';
import InternalDedupe from '../Component/InternalDedupe';
import Upload from '@mui/icons-material/Upload';
import UploadDocuments from '../Component/UploadDocuments';
import ApplicationLogHistory from '../Component/ApplicationLogHistory';

const LeadProfile = () => {
    const { id } = useParams();
        const [selectedFileType, setSelectedFileType] = useState(null);
    const [showDedupe, setShowDedupe] = useState(false);
    const [uploadedDocs, setUploadedDocs] = useState([]); // Initialize uploadedDocs state
   

    const [leadEdit, setLeadEdit] = useState(false);

    const { data: leadData, isSuccess: leadSuccess } = useFetchSingleLeadQuery(id, { skip: id === null });



    useEffect(() => {
        if (leadSuccess) {
            if (leadData?.document && leadData?.document.length) {
                for (let docs of leadData.document) {
                    setUploadedDocs(pre => [...pre, docs.type])
                }
            }
        }

    }, [leadSuccess])


    return (
        <div className="crm-container">
            {leadEdit ? (
                <LeadDetails leadData={leadData} setLeadEdit={setLeadEdit} />
            ) : (
                <>
                    <Paper elevation={3} style={{ padding: '30px', marginTop: '20px', borderRadius: '10px' }}>
                        <Grid container spacing={2}>
                            {/* Render lead data here */}
                            <Grid item xs={12} sm={6}>
                                <Typography variant="subtitle1" gutterBottom>
                                    <strong>First Name: </strong>
                                    {leadData?.fName}
                                </Typography>
                            </Grid>
                            <Grid item xs={12} sm={6}>
                                <Typography variant="subtitle1" gutterBottom>
                                    <strong>Middle Name: </strong>
                                    {leadData?.mName}
                                </Typography>
                            </Grid>
                            <Grid item xs={12} sm={6}>
                                <Typography variant="subtitle1" gutterBottom>
                                    <strong>Last Name: </strong>
                                    {leadData?.lName}
                                </Typography>
                            </Grid>
                            <Grid item xs={12} sm={6}>
                                <Typography variant="subtitle1" gutterBottom>
                                    <strong>Gender: </strong>
                                    {leadData?.gender}
                                </Typography>
                            </Grid>
                            <Grid item xs={12} sm={6}>
                                <Typography variant="subtitle1" gutterBottom>
                                    <strong>Date of Birth: </strong>
                                    {leadData?.dob}
                                </Typography>
                            </Grid>
                            <Grid item xs={12} sm={6}>
                                <Typography variant="subtitle1" gutterBottom>
                                    <strong>Aadhaar Number: </strong>
                                    {leadData?.aadhaar}
                                </Typography>
                            </Grid>
                            <Grid item xs={12} sm={6}>
                                <Typography variant="subtitle1" gutterBottom>
                                    <strong>PAN Number: </strong>
                                    {leadData?.pan}
                                </Typography>
                            </Grid>
                            <Grid item xs={12} sm={6}>
                                <Typography variant="subtitle1" gutterBottom>
                                    <strong>Mobile Number: </strong>
                                    {leadData?.mobile}
                                </Typography>
                            </Grid>
                            <Grid item xs={12} sm={6}>
                                <Typography variant="subtitle1" gutterBottom>
                                    <strong>Alternate Mobile Number: </strong>
                                    {leadData?.alternateMobile}
                                </Typography>
                            </Grid>
                            <Grid item xs={12} sm={6}>
                                <Typography variant="subtitle1" gutterBottom>
                                    <strong>Personal Email: </strong>
                                    {leadData?.personalEmail}
                                </Typography>
                            </Grid>
                            <Grid item xs={12} sm={6}>
                                <Typography variant="subtitle1" gutterBottom>
                                    <strong>Office Email: </strong>
                                    {leadData?.officeEmail}
                                </Typography>
                            </Grid>
                            <Grid item xs={12} sm={6}>
                                <Typography variant="subtitle1" gutterBottom>
                                    <strong>Loan Amount: </strong>
                                    {leadData?.loanAmount}
                                </Typography>
                            </Grid>
                            <Grid item xs={12} sm={6}>
                                <Typography variant="subtitle1" gutterBottom>
                                    <strong>Number of Loans: </strong>
                                    {leadData?.noOfLoans}
                                </Typography>
                            </Grid>
                            <Grid item xs={12} sm={6}>
                                <Typography variant="subtitle1" gutterBottom>
                                    <strong>Salary: </strong>
                                    {leadData?.salary}
                                </Typography>
                            </Grid>
                            <Grid item xs={12} sm={6}>
                                <Typography variant="subtitle1" gutterBottom>
                                    <strong>Pin Code: </strong>
                                    {leadData?.pinCode}
                                </Typography>
                            </Grid>
                            <Grid item xs={12} sm={6}>
                                <Typography variant="subtitle1" gutterBottom>
                                    <strong>State: </strong>
                                    {leadData?.state}
                                </Typography>
                            </Grid>
                            <Grid item xs={12} sm={6}>
                                <Typography variant="subtitle1" gutterBottom>
                                    <strong>City: </strong>
                                    {leadData?.city}
                                </Typography>
                            </Grid>
                        </Grid>

                        <Grid container justifyContent="flex-end" spacing={2}>
                            <Grid item>
                                <Button
                                    variant="outlined"
                                    onClick={() => setLeadEdit(true)}
                                    sx={{
                                        backgroundColor: 'primary.main',
                                        color: 'white',
                                        padding: '10px 20px',
                                        '&:hover': {
                                            backgroundColor: 'darkPrimary',
                                        },
                                    }}
                                >
                                    Edit
                                </Button>
                            </Grid>
                        </Grid>

                        <Divider style={{ margin: '30px 0' }} />

                        <UploadDocuments  uploadedDocs={uploadedDocs} />

                        <InternalDedupe />
                        <ApplicationLogHistory />
                    </Paper>
                </>
            )}
        </div>
    );
};

export default LeadProfile;
