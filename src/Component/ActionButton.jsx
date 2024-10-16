import React, { useEffect, useState } from 'react'
import { Button, Select, MenuItem, TextField, Box, Alert } from '@mui/material';

import { useHoldLeadMutation, useRecommendLeadMutation, useRejectLeadMutation, useUnholdLeadMutation } from '../Service/Query';
import Swal from 'sweetalert2';
import { useNavigate } from 'react-router-dom';
import useAuthStore from './store/authStore';
import { useHoldApplicationMutation, useRecommendApplicationMutation, useRejectApplicationMutation, useSendBackMutation, useUnholdApplicationMutation } from '../queries/applicationQueries';
import useStore from '../Store';
import RejectedLeads from './leads/RejectedLeads';

const loanHoldReasons = [
    { label: "Incomplete Documentation", value: "incomplete_documentation" },
    { label: "Inconsistent Information", value: "unverifiable_information" },
    { label: "Pending Verification", value: "pending_verification" },
    { label: "Regulatory Changes", value: "regulatory_changes" },
    { label: "Other", value: "Other" },
];
const loanRejectReasons = [
    { label: "Inconsistent Information", value: "unverifiable_information" },
    { label: "Low Credit Score or Poor Credit History", value: "poor_credit_history" },
    { label: "High Debt-to-Income Ratio", value: "high_debt_to_income" },
    { label: "Suspicious Activity", value: "suspicious_activity" },
    { label: "Unstable Employment History", value: "unstable_employment" },
    { label: "Legal or Regulatory Issues", value: "legal_regulatory_issues" },
    { label: "High-Risk Profile", value: "high_risk_profile" },
    { label: "Other", value: "Other" },
    // { label: "Unclear Purpose of Loan", value: "unclear_loan_purpose" }
];

const ActionButton = ({ id, isHold, isRejected }) => {

    const navigate = useNavigate()
    const { empInfo } = useAuthStore()
    const { applicationProfile } = useStore()

    const [actionType, setActionType] = useState(''); // To track which action is selected: 'hold', 'reject', 'approve'
    const [selectedReason, setSelectedReason] = useState(''); // To track the selected reason for hold or reject
    const [selectedRecipient, setSelectedRecipient] = useState()
    const [reasonList, setReasonList] = useState(null)
    const [remarks, setRemarks] = useState('');

    // Application Action component API-----------
    const [holdApplication, { data: holdApplicationData, isSuccess: holdApplicationSuccess, isError: isApplicationHoldError, error: applicationHoldError }] = useHoldApplicationMutation();
    const [unholdApplication, { data: unholdApplicationData, isSuccess: unholdApplicationSuccess, isError: isApplicationUnHoldError, error: unHoldApplicationError }] = useUnholdApplicationMutation();
    const [recommendApplication, { data: recommendApplicationData, isSuccess: recommendApplicationSuccess, isError: isApplicationRecommendError, error: recommendApplicationError }] = useRecommendApplicationMutation();
    const [rejectApplication, { data: rejectApplicationData, isSuccess: rejectApplicationSuccess, isError: isApplicationRejectError, error: rejectApplicationError }] = useRejectApplicationMutation();

    // Lead Action component API ----------------------
    const [holdLead, { data: holdLeadData, isSuccess: holdLeadSuccess, isError: isHoldError, error: leadHoldError }] = useHoldLeadMutation();
    const [unholdLead, { data: unholdLeadData, isSuccess: unholdLeadSuccess, isError: isUnHoldError, error: unHoldleadError }] = useUnholdLeadMutation();
    const [recommendLead, { data: recommendLeadData, isSuccess: recommendLeadSuccess, isError: isRecommendLeadError, error: recommendLeadError }] = useRecommendLeadMutation();
    const [rejectLead, { data: rejectLeadData, isSuccess: rejectLeadSuccess, isError: isRejectError, error: rejectLeadError }] = useRejectLeadMutation();

    // Send back mutation -------
    const [sendBack, { data: sendBackData, isSuccess: SendBackSuccess, isError: isSendBackError, error: sendBackError }] = useSendBackMutation()


    const handleApprove = () => {
        if (empInfo.empRole === "screener") {
            recommendLead(id)
        } else if (empInfo.empRole === "creditManager") {
            recommendApplication(id)
        }
    }
    const handleActionClick = (type) => {
        if (type === "unhold") {

            setSelectedReason("Other")
        } else {
            if (type === "hold") {
                setReasonList(loanHoldReasons)
            } else {
                setReasonList(loanRejectReasons)
            }
        }
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
            if (empInfo.empRole === "screener") {

                holdLead({ id, reason: remarks })
            } else if (empInfo.empRole === "creditManager") {
                holdApplication({ id, reason: remarks })
            }

        } else if (actionType === 'reject') {
            if (empInfo.empRole === "screener") {
                rejectLead({ id, reason: remarks })
            } else if (empInfo.empRole === "creditManager") {
                rejectApplication({ id, reason: remarks })
            }

        } else if (actionType === "unhold") {
            if (empInfo.empRole === "screener") {

                unholdLead({ id, reason: remarks })
            } else if (empInfo.empRole === "creditManager") {
                unholdApplication({ id, reason: remarks })
            }
        } else if (actionType === "sendBack") {
            sendBack({ id: applicationProfile.lead._id, reason: remarks, sendTo: selectedRecipient })

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
                text: "Lead on hold!",
                icon: "success"
            });
            navigate("/lead-hold")
        }
        if (unholdLeadSuccess && unholdLeadData) {
            Swal.fire({
                text: "Lead in process!",
                icon: "success"
            });
            navigate("/lead-process")
        }
        if (rejectLeadSuccess && rejectLeadData) {
            Swal.fire({
                text: "Lead Rejected!",
                icon: "success"
            });
            navigate("/rejected-leads")
        }
        if (recommendLeadSuccess && recommendLeadData) {
            Swal.fire({
                text: "Lead Forwarded!",
                icon: "success"
            });
            navigate("/lead-process")
        }

    }, [holdLeadData, unholdLeadData, rejectLeadData, recommendLeadData])
    useEffect(() => {
        if (SendBackSuccess && sendBackData) {
            Swal.fire({
                text: "Application successfully send back!",
                icon: "success"
            });
            navigate("/application-process")
        }

    }, [sendBackData])
    useEffect(() => {
        if (holdApplicationSuccess && holdApplicationData) {
            Swal.fire({
                text: "Application on hold!",
                icon: "success"
            });
            navigate("/application-hold")
        }
        if (unholdApplicationSuccess && unholdApplicationData) {
            Swal.fire({
                text: "Application in process!",
                icon: "success"
            });
            navigate("/application-process")
        }
        if (rejectApplicationSuccess && rejectApplicationData) {
            Swal.fire({
                text: "Application Rejected!",
                icon: "success"
            });
            navigate("/rejected-applications")
        }
        if (recommendApplicationSuccess && recommendApplicationData) {
            Swal.fire({
                text: "Application Forwarded!",
                icon: "success"
            });
            navigate("/application-process")
        }

    }, [holdApplicationData, unholdApplicationData, rejectApplicationData, recommendApplicationData])



    return (
        <>
            <Box sx={{ padding: 2 }}>
                {(isRecommendLeadError || isHoldError || isRejectError || isUnHoldError || isSendBackError) &&
                    <Alert severity="error" style={{ marginTop: "10px" }}>
                        {recommendLeadError?.data?.message} || {leadHoldError?.data?.message} || {rejectLeadError?.data?.message} || {unHoldleadError?.data?.message} || {sendBackError?.data?.message}
                    </Alert>
                }
                {(isApplicationRecommendError || isApplicationHoldError || isApplicationRejectError || isApplicationUnHoldError ) &&
                    <Alert severity="error" style={{ marginTop: "10px" }}>
                        {recommendApplicationError?.data?.message} || {applicationHoldError?.data?.message} || {rejectApplicationError?.data?.message} || {unHoldApplicationError?.data?.message}
                    </Alert>
                }

                {/* Render buttons if no action is selected */}
                {(!isRejected && !actionType) && (
                    <Box sx={{ display: 'flex', justifyContent: 'center', gap: 2, marginTop: 2 }}>
                        <Button
                            variant="contained"
                            color="success"
                            onClick={() => handleApprove('')}
                        >
                            Forward
                        </Button>
                        <Button
                            variant="contained"
                            color="warning"
                            onClick={() => handleActionClick(isHold ? "unhold" : 'hold')}
                        >
                            {isHold ? "Unhold" : "Hold"}
                        </Button>
                        <Button
                            variant="contained"
                            color="error"
                            onClick={() => handleActionClick('reject')}
                        >
                            Reject
                        </Button>
                        {empInfo?.empRole !== "screener" &&
                            <Button
                                variant="contained"
                                color="secondary"
                                onClick={() => handleActionClick('sendBack')}
                            >
                                Send Back
                            </Button>}
                    </Box>
                )}

                {/* Render dropdown, input, and submit/cancel buttons when Hold or Reject is selected */}
                {(actionType === 'hold' || actionType === "unhold" || actionType === 'reject' || actionType === "sendBack") && (
                    <Box sx={{ marginTop: 3 }}>
                        {(actionType === "hold" || actionType === "reject") &&
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
                                {reasonList && reasonList.length > 0 && reasonList.map((reason, index) => {
                                    return <MenuItem key={index} value={reason.label}>{reason.label}</MenuItem>
                                })}

                            </Select>
                        }

                        {(selectedReason === 'Other' || actionType === "sendBack") && (
                            <>
                                <TextField
                                    label="Remarks"
                                    value={remarks}
                                    onChange={(e) => setRemarks(e.target.value)}
                                    fullWidth
                                    multiline
                                    rows={3}
                                    sx={{ marginBottom: 2, width: '100%' }}
                                />
                                {actionType === "sendBack" && (
                                    <Select
                                        label="Send Back"
                                        variant="standard"
                                        fullWidth
                                        value={selectedRecipient} // Ensure the placeholder is shown initially
                                        onChange={(e) => setSelectedRecipient(e.target.value)}
                                        sx={{ marginBottom: 2, width: '200px', padding: '8px' }}
                                        displayEmpty // This is important to show the placeholder when no value is selected
                                    >
                                        <MenuItem value="" disabled>
                                            Select recipient to send back
                                        </MenuItem>
                                        <MenuItem value="screener">Screener</MenuItem>
                                        <MenuItem value="creditManager">Credit Manager</MenuItem>
                                    </Select>
                                )}
                            </>
                        )}





                        <Box sx={{ display: 'flex', justifyContent: 'center', gap: 2, marginTop: "15px" }}>
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

        </>
    )
}

export default ActionButton
