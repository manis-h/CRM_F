import React, { useEffect, useState } from 'react'
import { Button, Select, MenuItem, TextField, Box } from '@mui/material';

import { useApproveLeadMutation, useHoldLeadMutation, useRejectLeadMutation, useUnholdLeadMutation } from '../Service/Query';
import Swal from 'sweetalert2';
import { useNavigate } from 'react-router-dom';

const loanHoldReasons = [
    { label: "Incomplete Documentation", value: "incomplete_documentation" },
    { label: "Inconsistent Information", value: "unverifiable_information" },
    { label: "Pending Verification", value: "pending_verification" },
    { label: "Regulatory Changes", value: "regulatory_changes" },
];
const loanRejectReasons = [
    { label: "Inconsistent Information", value: "unverifiable_information" },
    { label: "Low Credit Score or Poor Credit History", value: "poor_credit_history" },
    { label: "High Debt-to-Income Ratio", value: "high_debt_to_income" },
    { label: "Suspicious Activity", value: "suspicious_activity" },
    { label: "Unstable Employment History", value: "unstable_employment" },
    { label: "Legal or Regulatory Issues", value: "legal_regulatory_issues" },
    { label: "High-Risk Profile", value: "high_risk_profile" },
    // { label: "Unclear Purpose of Loan", value: "unclear_loan_purpose" }
];

const ActionButton = ({leadData}) => {
    const id = leadData?._id
    const navigate = useNavigate()

    const [actionType, setActionType] = useState(''); // To track which action is selected: 'hold', 'reject', 'approve'
    const [selectedReason, setSelectedReason] = useState(''); // To track the selected reason for hold or reject
    const [reasonList, setReasonList] = useState(null)
    const [remarks, setRemarks] = useState('');

    const [holdLead, { data: holdLeadData, isSuccess: holdLeadSuccess, isError: isHoldError, error: leadHoldError }] = useHoldLeadMutation();
    const [unholdLead, { data: unholdLeadData, isSuccess: unholdLeadSuccess, isError: isUnHoldError, error: unleadHoldError }] = useUnholdLeadMutation();
    const [approveLead, { data: approveLeadData, isSuccess: approveLeadSuccess, isError: isApproveError, error: approveLeadError }] = useApproveLeadMutation();
    const [rejectLead, { data: rejectLeadData, isSuccess: rejectLeadSuccess, isError: isRejectError, error: rejectLeadError }] = useRejectLeadMutation();


    const handleActionClick = (type) => {
        console.log('type')
        if (type === "unhold") {
            unholdLead(id)
        } else {
            if (type === "hold") {
                setReasonList(loanHoldReasons)
            } else {
                setReasonList(loanRejectReasons)
            }
            setActionType(type); // Set the action to either 'hold' or 'reject'
        }
    };
    const handleBarButtons = status => setApplicationStatus(status);

    const handleReasonChange = (event) => {
        const reason = event.target.value;
        setSelectedReason(reason);

        setRemarks(reason); // Clear remarks if 'Other' is not selected

    };

    const handleSubmit = () => {
        // Submit logic for hold/reject based on actionType
        if (actionType === 'hold') {
            console.log('action', actionType)
            holdLead({ id, reason: remarks })

        } else if (actionType === 'reject') {
            // Perform reject action, include selectedReason and remarks
            rejectLead({ id, reason: remarks })
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
        if (holdLeadSuccess) {
            Swal.fire({
                title: "lead hold",
                text: "Lead on hold",
                icon: "question"
            });
        }

    }, [holdLeadSuccess])


    return (
        <>
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
                            onClick={() => handleActionClick(leadData?.onHold ? "unhold" : 'hold')}
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
                {(actionType === 'hold' || actionType === "unhold" || actionType === 'reject') && (
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
                            {reasonList && reasonList.length > 0 && reasonList.map((reason, index) => {
                                return <MenuItem key={index} value={reason.label}>{reason.label}</MenuItem>
                            })}

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

        </>
    )
}

export default ActionButton
