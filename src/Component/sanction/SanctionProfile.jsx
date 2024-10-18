import React, { useEffect, useState } from 'react';
import { Typography, Button, Paper, Table, TableBody, TableCell, TableContainer, TableRow, Box } from '@mui/material';
import { useNavigate, useParams } from 'react-router-dom';
import { useSanctionProfileQuery } from '../../queries/applicationQueries';
import useAuthStore from '../store/authStore';
import useStore from '../../Store';
import BarButtons from '../BarButtons';
import InternalDedupe from '../InternalDedupe';
import ApplicationLogHistory from '../ApplicationLogHistory';
import ActionButton from '../actionButton';
import PersonalDetails from '../applications/PersonalDetails';
import BankDetails from '../applications/BankDetails';
import UploadDocuments from '../UploadDocuments';
import Cam from '../applications/Cam'


const barButtonOptions = ['Application', 'Documents', 'Personal', 'Banking', 'Verification', 'Cam']

const SanctionProfile = () => {
  const { id } = useParams();
  const {empInfo} = useAuthStore()
  const { setApplicationProfile } = useStore();
  const navigate = useNavigate();
  const [uploadedDocs, setUploadedDocs] = useState([]);
  const [currentPage, setCurrentPage] = useState("application");
  const [leadEdit, setLeadEdit] = useState(false);

  const { data, isSuccess, isError,error } = useSanctionProfileQuery(id, { skip: id === null });


  const columns = [
    { label: "First Name", value: data?.lead?.fName, label2: "Middle Name", value2: data?.lead?.mName },
    { label: "Last Name", value: data?.lead?.lName, label2: "Gender", value2: data?.lead?.gender },
    { label: "Date of Birth", value: data?.lead?.dob, label2: "Aadhaar Number", value2: data?.lead?.aadhaar },
    { label: "PAN Number", value: data?.lead?.pan, label2: "Mobile Number", value2: data?.lead?.mobile },
    { label: "Alternate Mobile", value: data?.lead?.alternateMobile, label2: "Personal Email", value2: data?.lead?.personalEmail },
    { label: "Office Email", value: data?.lead?.officeEmail, label2: "Loan Amount", value2: data?.lead?.loanAmount },
    { label: "Salary", value: data?.lead?.salary, label2: "State", value2: data?.lead?.state },
    { label: "City", value: data?.lead?.city, label2: "Pin Code", value2: data?.lead?.pinCode },
  ];

  useEffect(() => {
    if (isSuccess) {
      setApplicationProfile(data);
    }
    if (isSuccess && data?.lead?.document?.length) {
      setUploadedDocs(data?.lead?.document.map(doc => doc.type));
    }
  }, [isSuccess, data]);

  return (
    <div className="crm-container" style={{ padding: '10px' }}>
     
        <>
          <div className='p-3'>
            <BarButtons
              barButtonOptions={barButtonOptions}
              currentPage={currentPage}
              setCurrentPage={setCurrentPage}
            />

            {currentPage === "application" &&
              <>
                <Paper elevation={3} sx={{ padding: '20px', marginTop: '20px', borderRadius: '10px' }}>
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
                </Paper>
                {data?.lead?._id &&
                  <>
                    <InternalDedupe id={data?.lead?._id} />
                    <ApplicationLogHistory id={data?.lead?._id} />

                    {/* Action Buttons */}

                    {!data.isRejected  && <Box display="flex" justifyContent="center" sx={{ marginTop: '20px' }}>
                      <ActionButton 
                      id={data._id} 
                      isHold={data.onHold}  
                      />

                    </Box>}
                  </>
                }
              </>
            }
            {data && Object.keys(data).length > 0 &&
              <>
                {currentPage === "personal" && <PersonalDetails id={data.applicant} />}
                {currentPage === "banking" &&
                  <BankDetails id={data?.applicant} />}

                {currentPage === "documents" && <UploadDocuments leadData={data?.lead} setUploadedDocs={setUploadedDocs} uploadedDocs={uploadedDocs} />}

                {currentPage === "cam" && <Cam />}
              </>

            }


          </div>
        </>
      
    </div>
  );
};

export default SanctionProfile;
