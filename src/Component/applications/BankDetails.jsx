import React, { useEffect, useState } from 'react';
import {
    Typography,
    Button,
    Paper,
    Divider,
    TextField,
    Table,
    TableBody,
    TableCell,
    TableRow,
    TableContainer,
    Box
} from '@mui/material';
import { useAddBankMutation, useGetBankDetailsQuery } from '../../queries/applicationQueries';
import { useParams } from 'react-router-dom';
import { useForm, Controller } from 'react-hook-form';
import useStore from '../../Store';

const BankDetails = ({ id }) => {
    const { applicationProfile } = useStore()
    const [bankDetails, setBankDetails] = useState(null)
    const [isAddingBank, setIsAddingBank] = useState(false);

    const bankRes = useGetBankDetailsQuery(id, { skip: id === null })
    const [addBank, addBankRes] = useAddBankMutation();

    // React Hook Form setup
    const { handleSubmit, control, reset } = useForm({
        defaultValues: {
            bankName: '',
            branchName: '',
            bankAccNo: '',
            ifscCode: '',
            beneficiaryName: '',
            accountType: '',
        }
    });

    // Handle form submission
    const onSubmit = (data) => {
        console.log('Saving bank details:', data);
        addBank({id,data});  
        setIsAddingBank(false);
        reset();
    };

    const handleOpenForm = () => {
        setIsAddingBank(true)
        reset(bankDetails)
    }

    useEffect(() => {
        if (bankRes.isSuccess) {
            console.log('bank res', bankRes)
            setBankDetails(bankRes?.data)
            // reset(bankRes.data[1])

        }

    }, [bankRes.isSuccess, bankRes.data])
    console.log('bank detaillllll',isAddingBank, !bankDetails)

    return (
        <Paper elevation={3} style={{ padding: '10px', marginTop: '20px', borderRadius: '10px' }}>
            {(isAddingBank || !(bankDetails && Object.keys(bankDetails).length > 0)) ? (
                <>
                <Typography variant="h6" gutterBottom>
                    Add Bank Details
                </Typography>

                <form onSubmit={handleSubmit(onSubmit)}>
                    <Box display="flex" flexDirection="column" gap={2}>
                        <Box display="flex" flexDirection={{ xs: 'column', sm: 'row' }} gap={2}>
                            <Controller
                                name="bankName"
                                control={control}
                                defaultValue={bankDetails?.bankName}
                                render={({ field }) => {
                                    console.log('field', field)
                                    return (
                                        <TextField label="Bank Name" fullWidth {...field} />
                                    )
                                }}
                            />
                            <Controller
                                name="branchName"
                                control={control}
                                defaultValue={bankDetails?.branchName}
                                render={({ field }) => (
                                    <TextField label="Branch Name" fullWidth {...field} />
                                )}
                            />
                        </Box>
                        <Box display="flex" flexDirection={{ xs: 'column', sm: 'row' }} gap={2}>
                            <Controller
                                name="bankAccNo"
                                control={control}
                                defaultValue={bankDetails?.bankAccNo}
                                render={({ field }) => (
                                    <TextField label="Bank Account Number" fullWidth {...field} />
                                )}
                            />
                            <Controller
                                name="ifscCode"
                                control={control}
                                defaultValue={bankDetails?.ifscCode}
                                render={({ field }) => (
                                    <TextField label="IFSC Code" fullWidth {...field} />
                                )}
                            />
                        </Box>
                        <Box display="flex" flexDirection={{ xs: 'column', sm: 'row' }} gap={2}>
                            <Controller
                                name="beneficiaryName"
                                control={control}
                                defaultValue={bankDetails?.beneficiaryName}
                                render={({ field }) => (
                                    <TextField label="Beneficiary Name" fullWidth {...field} />
                                )}
                            />
                            <Controller
                                name="accountType"
                                control={control}
                                defaultValue={bankDetails?.accountType}
                                render={({ field }) => (
                                    <TextField label="Account Type" fullWidth {...field} />
                                )}
                            />
                        </Box>
                    </Box>

                    <Box display="flex" justifyContent="flex-end" marginTop="20px">
                        <Button
                            variant="contained"
                            color="primary"
                            type="submit"
                            sx={{ marginRight: '10px' }}
                        >
                            Save
                        </Button>
                        <Button
                            variant="outlined"
                            color="secondary"
                            onClick={() => setIsAddingBank(false)}
                        >
                            Cancel
                        </Button>
                    </Box>
                </form>
            </>
               
            ) : (
                <>
                <Typography variant="h6" gutterBottom>
                    Bank Details
                </Typography>
                <TableContainer component={Paper}>
                    <Table>
                        <TableBody>
                            <TableRow>
                                <TableCell><strong>Bank Name:</strong></TableCell>
                                <TableCell>{bankDetails?.bankName}</TableCell>
                                <TableCell><strong>Branch Name:</strong></TableCell>
                                <TableCell>{bankDetails?.branchName}</TableCell>
                            </TableRow>
                            <TableRow>
                                <TableCell><strong>Bank Account Number:</strong></TableCell>
                                <TableCell>{bankDetails?.bankAccNo}</TableCell>
                                <TableCell><strong>IFSC Code:</strong></TableCell>
                                <TableCell>{bankDetails?.ifscCode}</TableCell>
                            </TableRow>
                            <TableRow>
                                <TableCell><strong>Beneficiary Name:</strong></TableCell>
                                <TableCell>{bankDetails?.beneficiaryName}</TableCell>
                                <TableCell><strong>Account Type:</strong></TableCell>
                                <TableCell>{bankDetails?.accountType}</TableCell>
                            </TableRow>
                        </TableBody>
                    </Table>
                </TableContainer>

                <Box display="flex" justifyContent="flex-end" marginTop="20px">
                    <Button
                        variant="outlined"
                        onClick={handleOpenForm}
                        sx={{
                            backgroundColor: 'primary.main',
                            color: 'white',
                            padding: '10px 20px',
                            '&:hover': {
                                backgroundColor: 'darkPrimary',
                            },
                        }}
                    >
                        {bankDetails ? "Edit" : "Add Bank"}
                    </Button>
                </Box>
            </>

                
            )}

            <Divider style={{ margin: '30px 0' }} />
        </Paper>
    );
};

export default BankDetails;
