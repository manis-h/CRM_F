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
import BarButtons from '../BarButtons';
import ActionButton from '../actionButton';

const barButtonOptions = ['Application', 'Documents', 'Personal', 'Banking', 'Verification','Cam']

const ApplicationProfile = () => {
  const { id } = useParams();
  const { setApplicationProfile } = useStore();
  const navigate = useNavigate();
  const [uploadedDocs, setUploadedDocs] = useState([]);
  const [currentPage, setCurrentPage] = useState("application");
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
            <BarButtons 
            barButtonOptions={barButtonOptions} 
            setCurrentPage={setCurrentPage} 
            />

            {currentPage === "application" && (
              <>
                <Paper elevation={3} sx={{ padding: '20px', marginTop: '20px', borderRadius: '10px' }}>
                  <TableContainer component={Paper} sx={{ borderRadius: '8px' }}>
                    <Table aria-label="application details table">
                      <TableBody>
                        {columns.map((row, index) => (
                          <TableRow key={index} sx={{ '&:nth-of-type(odd)': { backgroundColor: '#fafafa' } }}>
                            <TableCell align="left" sx={{ fontWeight: 500 }}>{row.label}</TableCell>
                            <TableCell align="left">{row.value || ''}</TableCell>
                            <TableCell align="left" sx={{ fontWeight: 500 }}>{row.label2}</TableCell>
                            <TableCell align="left">{row.value2 || ''}</TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  </TableContainer>
                </Paper>
                
              </>
            )}

            {currentPage === "personal" && <PersonalDetails applicationId={id} />}
            {currentPage === "banking" && <BankDetails />}

            {/* Action Buttons */}
            { currentPage === "application" && 
            <Box display="flex" justifyContent="center" sx={{ marginTop: '20px' }}>
              <ActionButton leadData={applicationData?.lead} />
             
            </Box> 
             }

             { currentPage === "documents" && <UploadDocuments setUploadedDocs={setUploadedDocs} uploadedDocs={uploadedDocs} /> }

             {
              currentPage === "cam" && <Cam />
             }
            
          </div>
        </>
      )}
    </div>
  );
};

export default ApplicationProfile;
