import React, { useEffect, useState } from 'react';
import { Typography, Grid, Button, Paper, Divider, Table, TableBody, TableCell, TableContainer, TableRow, Box } from '@mui/material';
import { useNavigate, useParams } from 'react-router-dom';
import { useFetchSingleLeadQuery, } from '../Service/Query';
import LeadDetails from '../Component/LeadDetails';
import InternalDedupe from '../Component/InternalDedupe';
import Upload from '@mui/icons-material/Upload';
import UploadDocuments from '../Component/UploadDocuments';
import ApplicationLogHistory from '../Component/ApplicationLogHistory';
import VerifyContactDetails from '../Component/leads/DetailsVerification';
import CibilScorePage from '../Component/leads/CibilScore';
import useStore from '../Store';
import PanComapare from '../Component/leads/PanCompare';
import ActionButton from '../Component/actionButton';
import BarButtons from '../Component/BarButtons';
import useAuthStore from '../Component/store/authStore';

const barButtonOptions = ['Lead', 'Documents', 'Verification',]


const LeadProfile = () => {
    const { id } = useParams();
    const {empInfo} = useAuthStore()
    const navigate = useNavigate()

    const [currentPage, setCurrentPage] = useState("lead");

    const [uploadedDocs, setUploadedDocs] = useState([]); // Initialize uploadedDocs state
    const { setLead } = useStore()
    const [leadEdit, setLeadEdit] = useState(false);


    const { data: leadData, isSuccess: leadSuccess, isError, error } = useFetchSingleLeadQuery(id, { skip: id === null });

    const columns = [
        { label: "First Name", value: leadData?.fName, label2: "Middle Name", value2: leadData?.mName },
        { label: "Last Name", value: leadData?.lName, label2: "Gender", value2: leadData?.gender },
        { label: "Date of Birth", value: leadData?.dob, label2: "Aadhaar Number", value2: leadData?.aadhaar },
        { label: "PAN Number", value: leadData?.pan, label2: "Mobile Number", value2: leadData?.mobile },
        { label: "Alternate Mobile", value: leadData?.alternateMobile, label2: "Personal Email", value2: leadData?.personalEmail },
        { label: "Office Email", value: leadData?.officeEmail, label2: "Loan Amount", value2: leadData?.loanAmount },
        { label: "Salary", value: leadData?.salary, label2: "State", value2: leadData?.state },
        { label: "City", value: leadData?.city, label2: "Pin Code", value2: leadData?.pinCode },
    ];



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

    return (
        <div className="crm-container">

            {leadEdit ? (
                <LeadDetails leadData={leadData} setLeadEdit={setLeadEdit} />
            ) : (
                <>
                    <div className="p-3">
                        <BarButtons
                            barButtonOptions={barButtonOptions}
                            currentPage={currentPage}
                            setCurrentPage={setCurrentPage}
                        />

                        {currentPage === "lead" &&
                            <>
                                <Paper
                                    elevation={3}
                                    sx={{
                                        padding: '20px',
                                        marginTop: '20px',
                                        borderRadius: '10px',
                                        color: '#1F2A40',  // Default text color for rows
                                        '& .MuiDataGrid-columnHeaders': {
                                            backgroundColor: '#1F2A40',  // Optional: Header background color
                                            color: 'white',  // White text for the headers
                                        },
                                        '& .MuiDataGrid-footerContainer': {
                                            backgroundColor: '#1F2A40',  // Footer background color
                                            color: 'white',  // White text for the footer
                                        },
                                        '& .MuiDataGrid-row:hover': {
                                            backgroundColor: 'white',
                                            cursor: 'pointer',
                                        },
                                        '& .MuiDataGrid-row': {
                                            backgroundColor: 'white',
                                        },
                                    }}
                                >

                                    <TableContainer component={Paper} sx={{ borderRadius: '8px' }}>
                                        <Table aria-label="application details table">
                                            <TableBody>
                                                {columns.map((row, index) => (
                                                    <TableRow key={index} sx={{ '&:nth-of-type(odd)': { backgroundColor: '#141b2d' } }}>
                                                        <TableCell align="left" sx={{ fontWeight: 500 }}>{row.label}</TableCell>
                                                        <TableCell align="left">{row.value || ''}</TableCell>
                                                        <TableCell align="left" sx={{ fontWeight: 500 }}>{row.label2}</TableCell>
                                                        <TableCell align="left">{row.value2 || ''}</TableCell>
                                                    </TableRow>
                                                ))}
                                            </TableBody>
                                        </Table>
                                    </TableContainer>
                                    {isError &&
                                        <Alert severity="error" sx={{ borderRadius: '8px', mt: 2 }}>
                                            {error?.data?.message}
                                        </Alert>
                                    }
                                    {(empInfo?.empRole !== "sanctionHead" && empInfo?.empRole !== "admin") && <Box display="flex" justifyContent="flex-end" sx={{ my: 2 }}>
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
                                    </Box>}


                                </Paper>
                                {leadData?._id &&
                                    <>
                                        <CibilScorePage id={leadData._id} />
                                        <InternalDedupe id={leadData._id} />
                                        <ApplicationLogHistory id={leadData._id} />
                                        {/* Action Buttons */}
                                        {(!leadData?.isRejected && empInfo?.empRole !== "sanctionHead" && empInfo?.empRole !== "admin" ) &&
                                            <div className='my-3  d-flex justify-content-center'>
                                                <ActionButton id={leadData._id} isHold={leadData.onHold} />
                                            </div>}
                                    </>
                                }
                            </>
                        }
                        {leadData?._id &&
                            <>
                                {currentPage === "verification" &&
                                    <VerifyContactDetails
                                        isMobileVerified={leadData?.isMobileVerified}
                                        isEmailVerified={leadData?.isEmailVerified}
                                        isAadhaarVerified={leadData?.isAadhaarVerified}
                                        isPanVerified={leadData?.isPanVerified}
                                    />
                                }
                                {currentPage === "documents" &&
                                    <UploadDocuments
                                        leadData={leadData}
                                        setUploadedDocs={setUploadedDocs}
                                        uploadedDocs={uploadedDocs}
                                    />
                                }


                            </>
                        }
                    </div>


                </>
            )}
        </div>
    );
};

export default LeadProfile;
