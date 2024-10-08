import React, { useEffect, useState } from 'react';
import { Typography, Button, Paper, Table, TableBody, TableCell, TableContainer, TableRow, Box } from '@mui/material';
import { useNavigate, useParams } from 'react-router-dom';
import UploadDocuments from '../UploadDocuments';
import LeadDetails from '../LeadDetails';
import { useApproveLeadMutation, useHoldLeadMutation, useRejectLeadMutation, useUnholdLeadMutation } from '../../Service/Query';
import PersonalDetails from './PersonalDetails';
import BankDetails from './BankDetails';
import { useFetchSingleApplicationQuery } from '../../queries/applicationQueries';
import useStore from '../../Store';
import Cam from './Cam';

const ApplicationProfile = () => {
  const { id } = useParams();
  const { setApplicationProfile } = useStore();
  const navigate = useNavigate();
  const [uploadedDocs, setUploadedDocs] = useState([]);
  const [applicationStatus, setApplicationStatus] = useState("application");
  const [leadEdit, setLeadEdit] = useState(false);

  const { data: applicationData, isSuccess: applicationSuccess } = useFetchSingleApplicationQuery(id, { skip: id === null });
  const [holdLead] = useHoldLeadMutation();
  const [unholdLead] = useUnholdLeadMutation();
  const [approveLead] = useApproveLeadMutation();
  const [rejectLead] = useRejectLeadMutation();

  const handleApprove = () => approveLead(id);
  const handleHold = () => {
    if (!applicationData?.onHold) {
      holdLead(id);
    } else {
      unholdLead(id);
    }
  };
  const handleReject = () => rejectLead(id);
  const handleBarButtons = status => setApplicationStatus(status);

  const columns = [
    { label: "First Name", value: applicationData?.lead?.fName, label2: "Middle Name", value2: applicationData?.lead?.mName },
    { label: "Last Name", value: applicationData?.lead?.lName, label2: "Gender", value2: applicationData?.lead?.gender },
    { label: "Date of Birth", value: applicationData?.lead?.dob, label2: "Aadhaar Number", value2: applicationData?.lead?.aadhaar },
    { label: "PAN Number", value: applicationData?.lead?.pan, label2: "Mobile Number", value2: applicationData?.lead?.mobile },
    { label: "Alternate Mobile", value: applicationData?.lead?.alternateMobile, label2: "Personal Email", value2: applicationData?.lead?.personalEmail },
    { label: "Office Email", value: applicationData?.lead?.officeEmail, label2: "Loan Amount", value2: applicationData?.lead?.loanAmount },
    { label: "Salary", value: applicationData?.lead?.salary, label2: "State", value2: applicationData?.lead?.state },
    { label: "City", value: applicationData?.lead?.city, label2: "Pin Code", value2: applicationData?.lead?.pinCode },
  ];

  useEffect(() => {
    if (applicationSuccess) {
      setApplicationProfile(applicationData);
    }
    if (applicationSuccess && applicationData?.document?.length) {
      setUploadedDocs(applicationData.document.map(doc => doc.type));
    }
  }, [applicationSuccess, applicationData]);

  return (
    <div className="crm-container" style={{ padding: '10px' }}>
      {leadEdit ? (
        <LeadDetails applicationData={applicationData} setLeadEdit={setLeadEdit} />
      ) : (
        <>
          <div className='p-3'>
            <Box display="flex" flexWrap="wrap" justifyContent="center" mb={3}>
              {['Application', 'Documents', 'Personal', 'Banking', 'Verification','Cam'].map(status => (
                <Button
                  key={status}
                  variant="contained"
                  color="success"
                  onClick={() => handleBarButtons(status.toLowerCase())}
                  sx={{
                    margin: "5px",
                    backgroundColor: 'green',
                    '&:hover': {
                      backgroundColor: 'darkgreen',
                      color: 'white',
                    },
                  }}
                >
                  {status}
                </Button>
              ))}
            </Box>

            {applicationStatus === "application" && (
              <>
                <Paper elevation={3} sx={{ padding: '20px', marginTop: '20px', borderRadius: '10px' }}>
                  <TableContainer component={Paper} sx={{ borderRadius: '8px' }}>
                    <Table aria-label="application details table">
                      <TableBody>
                        {columns.map((row, index) => (
                          <TableRow key={index} sx={{ '&:nth-of-type(odd)': { backgroundColor: '#fafafa' } }}>
                            <TableCell align="left" sx={{ fontWeight: 500 }}>{row.label}</TableCell>
                            <TableCell align="left">{row.value || 'N/A'}</TableCell>
                            <TableCell align="left" sx={{ fontWeight: 500 }}>{row.label2}</TableCell>
                            <TableCell align="left">{row.value2 || 'N/A'}</TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  </TableContainer>
                </Paper>
                
              </>
            )}

            {applicationStatus === "personal" && <PersonalDetails applicationId={id} />}
            {applicationStatus === "banking" && <BankDetails />}

            {/* Action Buttons */}
            { applicationStatus === "application" && <Box display="flex" justifyContent="center" sx={{ marginTop: '20px' }}>
              <Button
                variant="contained"
                color="success"
                onClick={handleApprove}
                sx={{
                  backgroundColor: 'green',
                  marginRight: '10px', // Adjust the margin to be closer
                  '&:hover': {
                    backgroundColor: 'darkgreen',
                    color: 'white',
                  },
                }}
              >
                Approve
              </Button>
              <Button
                variant="contained"
                color="warning"
                onClick={handleHold}
                sx={{
                  backgroundColor: 'orange',
                  marginRight: '10px', // Adjust the margin to be closer
                  '&:hover': {
                    backgroundColor: 'darkorange',
                    color: 'white',
                  },
                }}
              >
                Hold
              </Button>
              <Button
                variant="contained"
                color="error"
                onClick={handleReject}
                sx={{
                  backgroundColor: 'red',
                  '&:hover': {
                    backgroundColor: 'darkred',
                    color: 'white',
                  },
                }}
              >
                Reject
              </Button>
            </Box> 
             }

             { applicationStatus === "documents" && <UploadDocuments setUploadedDocs={setUploadedDocs} uploadedDocs={uploadedDocs} /> }

             {
              applicationStatus === "cam" && <Cam />
             }
            
          </div>
        </>
      )}
    </div>
  );
};

export default ApplicationProfile;
