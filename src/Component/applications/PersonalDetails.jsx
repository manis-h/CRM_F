import React, { useEffect, useState } from 'react';
import {
  Typography,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableRow,
  Box,
  TableHead,
  Divider,
} from '@mui/material';
import ResidenceAndEmployment from './ApplicantDetails';
import { useApplicantPersonalDetailsQuery } from '../../queries/applicationQueries';
import useStore from '../../Store';

const PersonalDetails = () => {
  const { applicationProfile } = useStore();
  const [columns, setColumns] = useState()
  const [personalDetails, setPersonalDetails] = useState({});
  const [residence, setResidence] = useState({});
  const [employmentData, setEmploymentData] = useState({});
  const [reference, setReference] = useState({});

  const { data: applicantData, isSuccess: applicantSuccess } = useApplicantPersonalDetailsQuery(
    applicationProfile?.applicant,
    { skip: applicationProfile.applicant === null }
  );
  useEffect(() => {
    if (applicantSuccess) {
      setPersonalDetails(applicantData?.personalDetails);
      setResidence(applicantData?.residence);
      setEmploymentData(applicantData?.employmentData);
      setReference(applicantData?.reference);
      
    }
    setColumns([
      { label: 'Full Name', value: `${personalDetails?.fName || ''} ${personalDetails?.mName || ''} ${personalDetails?.lName || ''}`, label2: 'Date of Birth', value2: personalDetails?.dob || '' },
      { label: 'pan', value: personalDetails?.pan || '', label2: 'Gender', value2: personalDetails?.gender || '' },
      { label: 'Aadhaar', value: personalDetails?.aadhaar || '', label2: 'Mobile', value2: personalDetails?.mobile || '' },
      { label: 'Personal Email', value: personalDetails?.personalEmail || '', label2: 'Office Email', value2: personalDetails?.officeEmail || '' },
    ]);
  }, [applicantSuccess, applicantData,personalDetails]);

  return (
    <>
      <Paper elevation={3} sx={{ padding: '20px', marginTop: '20px', borderRadius: '10px', marginBottom: "20px" }}>
        <Typography variant="h6" gutterBottom sx={{ fontWeight: 'bold', marginBottom: '16px' }}>
          Personal Details
        </Typography>
        <TableContainer component={Paper} sx={{ borderRadius: '8px' }}>
          <Table aria-label="personal details table">
            <TableBody>
              {columns?.map((row, index) => (
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
      <ResidenceAndEmployment
        residence={residence}
        reference={reference}
        employmentData={employmentData}
      />
    </>
  );
};

export default PersonalDetails;

