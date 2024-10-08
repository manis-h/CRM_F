import React, { useEffect, useState } from 'react';
import { Typography, Grid, Button, Accordion, AccordionSummary, AccordionDetails, Paper, Divider, Alert, Select, MenuItem, TextField, Box } from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { useNavigate, useParams } from 'react-router-dom';
import { useApproveLeadMutation, useFetchSingleLeadQuery, useHoldLeadMutation, useRejectLeadMutation, useUnholdLeadMutation, useUploadDocumentsMutation } from '../Service/Query';
import LeadDetails from '../Component/LeadDetails';
import Swal from 'sweetalert2';
import InternalDedupe from '../Component/InternalDedupe';
import Upload from '@mui/icons-material/Upload';
import UploadDocuments from '../Component/UploadDocuments';
import ApplicationLogHistory from '../Component/ApplicationLogHistory';
import { CheckBox } from '@mui/icons-material';
import VerificationUI from '../Component/leads/DetailsVerification';
import CibilScorePage from '../Component/leads/CibilScore';
import useStore from '../Store';
import PanComapare from '../Component/leads/PanCompare';

const LeadProfile = () => {
    const { id } = useParams();
    const navigate = useNavigate()
    
    const [uploadedDocs, setUploadedDocs] = useState([]); // Initialize uploadedDocs state
    const { setLead } = useStore()
    const [leadEdit, setLeadEdit] = useState(false);
    const [actionType, setActionType] = useState(''); // To track which action is selected: 'hold', 'reject', 'approve'
    const [selectedReason, setSelectedReason] = useState(''); // To track the selected reason for hold or reject
    const [remarks, setRemarks] = useState(''); // To track remarks input for 'Other'

   

    

    const { data: leadData, isSuccess: leadSuccess } = useFetchSingleLeadQuery(id, { skip: id === null });
    const [holdLead, { data: holdLeadData, isSuccess: holdLeadSuccess, isError: isHoldError, error: leadHoldError }] = useHoldLeadMutation();
    const [unholdLead, { data: unholdLeadData, isSuccess: unholdLeadSuccess, isError: isUnHoldError, error: unleadHoldError }] = useUnholdLeadMutation();
    const [approveLead, { data: approveLeadData, isSuccess: approveLeadSuccess, isError: isApproveError, error: approveLeadError }] = useApproveLeadMutation();
    const [rejectLead, { data: rejectLeadData, isSuccess: rejectLeadSuccess, isError: isRejectError, error: rejectLeadError }] = useRejectLeadMutation();

    const handleApprove = () => {
        approveLead(id)
    }
    const handleHold = () => {
        if (!leadData?.onHold) {
            holdLead(id)
        } else {
            unholdLead(id)
        }
    }
    const handleReject = () => {
        rejectLead(id)
    }
    const handleActionClick = (type) => {
        setActionType(type); // Set the action to either 'hold' or 'reject'
    };

    const handleReasonChange = (event) => {
        const reason = event.target.value;
        setSelectedReason(reason);
        
            setRemarks(reason); // Clear remarks if 'Other' is not selected
        
    };

    const handleSubmit = () => {
        // Submit logic for hold/reject based on actionType
        if (actionType === 'hold') {
            holdLead({id,reason:remarks})
            
            console.log('Hold reason:', selectedReason, 'Remarks:', remarks);
        } else if (actionType === 'reject') {
            // Perform reject action, include selectedReason and remarks
            rejectLead({id,reason:remarks})
            console.log('Reject reason:', selectedReason, 'Remarks:', remarks);
        }else if(actionType ==='unhold'){
            unholdLead(id)
            console.log('unhold', selectedReason, remarks)
        }

        // Reset state after submission
        setActionType('');
        setSelectedReason('');
        setRemarks('');
    };

    const handleCancel = () => {
        // Reset all states to go back to initial state
        setActionType('');
        setSelectedReason('');
        setRemarks('');
    };
    useEffect(() => {
        if (holdLeadSuccess && holdLeadData) {
            Swal.fire({
                // title: "Good job!",
                text: "Lead on hold!",
                icon: "success"
            });
            navigate("/lead-hold")
        }
        if (unholdLeadSuccess && unholdLeadData) {
            Swal.fire({
                // title: "Good job!",
                text: "Lead in process!",
                icon: "success"
            });
            navigate("/lead-process")
        }

    }, [holdLeadData, unholdLeadData])
    useEffect(() => {
        if (rejectLeadSuccess) {
            Swal.fire({
                // title: "Good job!",
                text: "Lead Rejected!",
                icon: "success"
            });
            navigate("/rejected-leads")
        }

    }, [rejectLeadSuccess, rejectLeadData])
    useEffect(() => {
        if (approveLeadSuccess) {
            Swal.fire({
                // title: "Good job!",
                text: "Lead Approved!",
                icon: "success"
            });
            navigate("/lead-process")
        }

    }, [approveLeadSuccess, approveLeadData])


    useEffect(() => {
        if (leadSuccess) {
            setLead(leadData)
            if (leadData?.document && leadData?.document.length > 0) {
                for (let docs of leadData.document) {
                    setUploadedDocs(pre => [...pre, docs.type])
                }
            }
        }

    }, [leadSuccess, leadData])

    useEffect(() => {
        if (holdLeadSuccess) {
            Swal.fire({
                title: "lead hold",
                text: "Lead on hold",
                icon: "question"
            });
        }

    }, [holdLeadSuccess])


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

                        <VerificationUI
                            isMobileVerified={leadData?.isMobileVerified}
                            isEmailVerified={leadData?.isEmailVerified}
                            isAadhaarVerified={leadData?.isAadhaarVerified}
                            isPanVerified={leadData?.isPanVerified}
                        />
                        <CibilScorePage />

                        <UploadDocuments setUploadedDocs={setUploadedDocs} uploadedDocs={uploadedDocs} />

                        <InternalDedupe />
                        <ApplicationLogHistory />

                        {isApproveError && <Alert severity="error" style={{ marginTop: "10px" }}>
                            {approveLeadError?.data?.message}
                        </Alert>}
                        {isHoldError && <Alert severity="error" style={{ marginTop: "10px" }}>
                            {leadHoldError?.data?.message}
                        </Alert>}
                        {isRejectError && <Alert severity="error" style={{ marginTop: "10px" }}>
                            {rejectLeadError?.data?.message}
                        </Alert>}
                        {isUnHoldError && <Alert severity="error" style={{ marginTop: "10px" }}>
                            {unleadHoldError?.data?.message}
                        </Alert>}
                        {!leadData?.isRejected && <div className='my-3  d-flex justify-content-center'>

                            {/* Action Buttons */}
                            <Box sx={{ padding: 2 }}>
            {/* Render buttons if no action is selected */}
            {!actionType && (
                <Box sx={{ display: 'flex', justifyContent: 'center', gap: 2, marginTop: 2 }}>
                    <Button
                        variant="contained"
                        color="success"
                        onClick={() => handleActionClick('approve')}
                    >
                        Approve
                    </Button>
                    <Button
                        variant="contained"
                        color="warning"
                        onClick={() => handleActionClick(leadData?.onHold ? "unhold":'hold')}
                    >
                        {leadData?.onHold ? "Unhold" : "Hold"}
                    </Button>
                    <Button
                        variant="contained"
                        color="error"
                        onClick={() => handleActionClick('reject')}
                    >
                        Reject
                    </Button>
                </Box>
            )}

            {/* Render dropdown, input, and submit/cancel buttons when Hold or Reject is selected */}
            {(actionType === 'hold' || actionType === 'reject') && (
                <Box sx={{ marginTop: 3 }}>
                    <Select
                        value={selectedReason}
                        onChange={handleReasonChange}
                        displayEmpty
                        fullWidth
                        sx={{ marginBottom: 2 }}
                    >
                        <MenuItem value="" disabled>
                            Select a reason
                        </MenuItem>
                        <MenuItem value="Reason A">Reason A</MenuItem>
                        <MenuItem value="Reason B">Reason B</MenuItem>
                        <MenuItem value="Other">Other</MenuItem>
                    </Select>

                    {selectedReason === 'Other' && (
                        <TextField
                            label="Remarks"
                            value={remarks}
                            onChange={(e) => setRemarks(e.target.value)}
                            fullWidth
                            multiline
                            rows={3}
                            sx={{ marginBottom: 2 }}
                        />
                    )}

                    <Box sx={{ display: 'flex', justifyContent: 'center', gap: 2 }}>
                    <Button
                            variant="outlined"
                            color="secondary"
                            onClick={handleCancel}
                        >
                            Cancel
                        </Button>
                        <Button
                            variant="contained"
                            color="primary"
                            onClick={handleSubmit}
                        >
                            Submit
                        </Button>
                        
                    </Box>
                </Box>
            )}
        </Box>
                        </div>}
                    </Paper>
                </>
            )}
        </div>
    );
};

export default LeadProfile;
