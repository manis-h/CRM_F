import React, { useState } from 'react';
import { Accordion, AccordionSummary, AccordionDetails, Typography, Button, Box } from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import Swal from 'sweetalert2';

const VerificationUI = () => {
  const [mobileVerified, setMobileVerified] = useState(false);
  const [emailVerified, setEmailVerified] = useState(false);

  const handleMobileVerification = () => {
    // Logic for mobile verification
    setMobileVerified(true);
    Swal.fire({
      title: 'Mobile Verified!',
      icon: 'success',
    });
  };

  const handleEmailVerification = () => {
    // Logic for email verification
    setEmailVerified(true);
    Swal.fire({
      title: 'Email Verified!',
      icon: 'success',
    });
  };

  return (
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
                Mobile: {mobileVerified ? 'Verified' : 'Not Verified'}
              </Typography>
              <Button 
                variant="contained" 
                onClick={handleMobileVerification} 
                sx={{
                  backgroundColor: mobileVerified ? '#ccc' : '#4caf50',
                  '&:hover': { backgroundColor: mobileVerified ? '#ccc' : '#388e3c' },
                  transition: 'background-color 0.3s'
                }}
                disabled={mobileVerified} // Disable button if already verified
              >
                Verify Mobile
              </Button>
            </Box>

            {/* Email Verification Section */}
            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <Typography variant="body1">
                Email: {emailVerified ? 'Verified' : 'Not Verified'}
              </Typography>
              <Button 
                variant="contained" 
                onClick={handleEmailVerification} 
                sx={{
                  backgroundColor: emailVerified ? '#ccc' : '#4caf50',
                  '&:hover': { backgroundColor: emailVerified ? '#ccc' : '#388e3c' },
                  transition: 'background-color 0.3s'
                }}
                disabled={emailVerified} // Disable button if already verified
              >
                Verify Email
              </Button>
            </Box>
          </Box>
        </AccordionDetails>
      </Accordion>
    </Box>
  );
};

export default VerificationUI;
