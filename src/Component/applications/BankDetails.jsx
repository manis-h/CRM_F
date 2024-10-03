import React, { useState } from 'react';
import { Typography, Grid, Button, Paper, Divider, TextField } from '@mui/material';

const BankDetails = () => {
    // State to control form visibility
    const [isAddingBank, setIsAddingBank] = useState(false);
    const [bankDetails, setBankDetails] = useState({
        bankName: '',
        branchName: '',
        bankAccNo: '',
        ifscCode: '',
        beneficiaryName: '',
        accountType: ''
    });

    const handleInputChange = (e) => {
        setBankDetails({
            ...bankDetails,
            [e.target.name]: e.target.value
        });
    };

    const handleSaveBankDetails = () => {
        // Add your logic to save bank details here
        console.log('Saving bank details:', bankDetails);
        setIsAddingBank(false); // Close form after saving
    };

    return (
        <Paper elevation={3} style={{ padding: '30px', marginTop: '20px', borderRadius: '10px' }}>
            <Grid container spacing={2}>
                {/* Display Bank Data or form to add new bank */}
                {!isAddingBank ? (
                    <>
                        <Grid item xs={12} sm={6}>
                            <Typography variant="subtitle1" gutterBottom>
                                <strong>Bank Name: </strong>
                                {/* {bankData?.bankName || 'N/A'} */}
                            </Typography>
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <Typography variant="subtitle1" gutterBottom>
                                <strong>Branch Name: </strong>
                                {/* {bankData?.branchName || 'N/A'} */}
                            </Typography>
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <Typography variant="subtitle1" gutterBottom>
                                <strong>Bank Account Number: </strong>
                                {/* {bankData?.bankAccNo || 'N/A'} */}
                            </Typography>
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <Typography variant="subtitle1" gutterBottom>
                                <strong>IFSC Code: </strong>
                                {/* {bankData?.ifscCode || 'N/A'} */}
                            </Typography>
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <Typography variant="subtitle1" gutterBottom>
                                <strong>Beneficiary Name: </strong>
                                {/* {bankData?.beneficiaryName || 'N/A'} */}
                            </Typography>
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <Typography variant="subtitle1" gutterBottom>
                                <strong>Account Type: </strong>
                                {/* {bankData?.accountType || 'N/A'} */}
                            </Typography>
                        </Grid>

                        <Grid container justifyContent="flex-end" spacing={2}>
                            <Grid item>
                                <Button
                                    variant="outlined"
                                    onClick={() => setIsAddingBank(true)}
                                    sx={{
                                        backgroundColor: 'primary.main',
                                        color: 'white',
                                        padding: '10px 20px',
                                        '&:hover': {
                                            backgroundColor: 'darkPrimary',
                                        },
                                    }}
                                >
                                    Add Bank
                                </Button>
                            </Grid>
                        </Grid>
                    </>
                ) : (
                    <>
                        {/* Bank Details Form */}
                        <Grid item xs={12} sm={6}>
                            <TextField
                                label="Bank Name"
                                variant="outlined"
                                fullWidth
                                name="bankName"
                                value={bankDetails.bankName}
                                onChange={handleInputChange}
                            />
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <TextField
                                label="Branch Name"
                                variant="outlined"
                                fullWidth
                                name="branchName"
                                value={bankDetails.branchName}
                                onChange={handleInputChange}
                            />
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <TextField
                                label="Bank Account Number"
                                variant="outlined"
                                fullWidth
                                name="bankAccNo"
                                value={bankDetails.bankAccNo}
                                onChange={handleInputChange}
                            />
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <TextField
                                label="IFSC Code"
                                variant="outlined"
                                fullWidth
                                name="ifscCode"
                                value={bankDetails.ifscCode}
                                onChange={handleInputChange}
                            />
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <TextField
                                label="Beneficiary Name"
                                variant="outlined"
                                fullWidth
                                name="beneficiaryName"
                                value={bankDetails.beneficiaryName}
                                onChange={handleInputChange}
                            />
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <TextField
                                label="Account Type"
                                variant="outlined"
                                fullWidth
                                name="accountType"
                                value={bankDetails.accountType}
                                onChange={handleInputChange}
                            />
                        </Grid>

                        <Grid container justifyContent="flex-end" spacing={2}>
                            <Grid item>
                                <Button
                                    variant="contained"
                                    color="primary"
                                    onClick={handleSaveBankDetails}
                                    sx={{
                                        marginRight: '10px',
                                    }}
                                >
                                    Save
                                </Button>
                            </Grid>
                            <Grid item>
                                <Button
                                    variant="outlined"
                                    color="secondary"
                                    onClick={() => setIsAddingBank(false)}
                                >
                                    Cancel
                                </Button>
                            </Grid>
                        </Grid>
                    </>
                )}
            </Grid>

            <Divider style={{ margin: '30px 0' }} />
        </Paper>
    );
};

export default BankDetails;
