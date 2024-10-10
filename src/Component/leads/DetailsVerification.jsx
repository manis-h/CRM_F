import React, { useEffect, useState } from 'react';
import { Accordion, AccordionSummary, AccordionDetails, Typography, Button, Box } from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import Swal from 'sweetalert2';
import { useGetEmailOtpMutation, useLazyAadhaarOtpQuery, useLazyGetPanDetailsQuery } from '../../Service/Query';
import { useNavigate, useParams } from 'react-router-dom';
import EmailVerification from './OtpVerification';
import AadhaarOtpVerification from './AadhaarOtpVerification';
import PanCompare from './PanCompare';

const VerifyContactDetails = ({isMobileVerified, isEmailVerified, isAadhaarVerified, isPanVerified }) => {
  const { id } = useParams()
  const navigate = useNavigate()
  const [otp, setOtp] = useState(false)
  const [otpAadhaar, setOtpAadhaar] = useState(false)
  const [panModal, setPanModal] = useState(false)
  const [otpPan, setOtpPan] = useState(false)
  const [mobileVerified, setMobileVerified] = useState(false);

  const [getEmailOtp, { data: emailOtp, isSuccess: emailOtpSuccess, }] = useGetEmailOtpMutation()
  const [getPanDetails,panRes] = useLazyGetPanDetailsQuery()
  const [aadhaarOtp,aadhaarRes] = useLazyAadhaarOtpQuery()

  const handleMobileVerification = () => {
    // Logic for mobile verification
    setMobileVerified(true);
    Swal.fire({
      title: 'Mobile Verified!',
      icon: 'success',
    });
  };


  const handleEmailVerification = () => {
    getEmailOtp(id)
  };
  const   handlePanVerification = () => {
    console.log('pan details')
    getPanDetails(id)
  }
  const handleAadhaarVerification = () => {
    aadhaarOtp(id)
  }

  useEffect(() => {
    if (panRes?.isSuccess && panRes?.data) {
      console.log('pan res ')
    setPanModal(true)
      
    }
  }, [panRes?.data, panRes?.isSuccess])

  useEffect(() => {
    if (emailOtpSuccess) {
      setOtp(true)
    }
  }, [emailOtp, emailOtpSuccess])
  useEffect(() => {
    if (aadhaarRes?.isSuccess && aadhaarRes) {
      // setOtpAadhaar(true)
      navigate(`/aadhaar-verification/${aadhaarRes?.data?.trx_id}`)
    }
  }, [aadhaarRes.data, aadhaarRes?.isSuccess])




  return (
    <>
      {otp && <EmailVerification open={otp} setOpen={setOtp}  />}
      {<PanCompare open={panModal} setOpen={setPanModal} panDetails={panRes?.data?.data?.result} />}
      <Box sx={{ maxWidth: 700, margin: '0 auto', mt: 4 }}>
        {/* Single Accordion for Mobile and Email Verification */}
        <Accordion sx={{ borderRadius: '15px', boxShadow: 3 }}>
          <AccordionSummary
            expandIcon={<ExpandMoreIcon />}
            aria-controls="panel1-content"
            id="panel1-header"
            sx={{
              backgroundColor: '#0366fc',
              borderRadius: '5px',
              color: '#fff',
              fontWeight: 'bold',
              '&:hover': { backgroundColor: '#0056b3' }
            }}
          >
            <Typography variant="h6">Verification Options</Typography>
          </AccordionSummary>
          <AccordionDetails sx={{ backgroundColor: '#f5f5f5', borderRadius: '15px' }}>
            <Box sx={{ display: 'flex', flexDirection: 'column', width: '100%' }}>
              {/* Mobile Verification Section */}
              <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
                <Typography variant="body1">


                  Mobile:<span style={{ color: isMobileVerified ? 'green' : 'red' }}> {isMobileVerified ? 'Verified' : 'Not Verified'}
                  </span>
                </Typography>
                <Button
                  variant="contained"
                  onClick={handleMobileVerification}
                  sx={{
                    backgroundColor: isMobileVerified ? '#ccc' : '#4caf50',
                    '&:hover': { backgroundColor: isMobileVerified ? '#ccc' : '#388e3c' },
                    transition: 'background-color 0.3s'
                  }}
                  disabled={isMobileVerified} // Disable button if already verified
                >
                  Verify Mobile
                </Button>
              </Box>

              {/* Email Verification Section */}
              <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' ,mb:2 }}>
                <Typography variant="body1">
                  Email:
                  <span style={{ color: isEmailVerified ? 'green' : 'inherit' }}>
                    {isEmailVerified ? ' Verified' : ' Not Verified'}
                  </span>
                </Typography>

                <Button
                  variant="contained"
                  onClick={handleEmailVerification}
                  sx={{
                    backgroundColor: isEmailVerified ? '#ccc' : '#4caf50',
                    '&:hover': { backgroundColor: isEmailVerified ? '#ccc' : '#388e3c' },
                    transition: 'background-color 0.3s'
                  }}
                  disabled={isEmailVerified} // Disable button if already verified
                >
                  Verify Email
                </Button>
              </Box>
              {/* Aadhaar Verification Section */}
              <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' ,mb:2 }}>
                <Typography variant="body1">
                  Adhaar:
                  <span style={{ color: isAadhaarVerified ? 'green' : 'inherit' }}>
                    {isAadhaarVerified ? ' Verified' : ' Not Verified'}
                  </span>
                </Typography>

                <Button
                  variant="contained"
                  onClick={handleAadhaarVerification}
                  sx={{
                    backgroundColor: isAadhaarVerified ? '#ccc' : '#4caf50',
                    '&:hover': { backgroundColor: isAadhaarVerified ? '#ccc' : '#388e3c' },
                    transition: 'background-color 0.3s'
                  }}
                  disabled={isAadhaarVerified} 
                >
                  Verify Aadhaar
                </Button>
              </Box>
              {/* Pan Verification Section */}
              <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' ,mb:2 }}>
                <Typography variant="body1">
                  Pan:
                  <span style={{ color: isPanVerified ? 'green' : 'inherit' }}>
                    {isPanVerified ? ' Verified' : ' Not Verified'}
                  </span>
                </Typography>

                
                <Button
                  variant="contained"
                  onClick={handlePanVerification}
                  sx={{
                    backgroundColor: isPanVerified ? '#ccc' : '#4caf50',
                    '&:hover': { backgroundColor: isPanVerified ? '#ccc' : '#388e3c' },
                    transition: 'background-color 0.3s'
                  }}
                  disabled={isPanVerified} // Disable button if already verified
                >
                  Verify Pan
                </Button>
              </Box>
              {panRes.isError && <Typography variant="body1">
                  <span style={{ color:  'red'  }}>
                    {panRes?.error.data.message }
                  </span>
                </Typography>}
              
            </Box>
          </AccordionDetails>
        </Accordion>
      </Box>
    </>
  );
};

export default VerifyContactDetails;
