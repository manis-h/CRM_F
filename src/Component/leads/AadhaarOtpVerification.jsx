import React, { useState, useRef, useEffect } from 'react';
import { Box, TextField, Button, Typography, Paper } from '@mui/material';
import { useNavigate, useParams } from 'react-router-dom';
import Swal from 'sweetalert2';
import { useVerifyAadhaarOtpMutation } from '../../Service/Query';
import useStore from '../../Store';
import AadhaarCompare from './AadhaarCompare';

const AadhaarOtpVerification = () => {
  const [aadhaarModal, setAadhaarModal] = useState(false)

  const { id } = useParams();
  const navigate = useNavigate()
  const [aadhaarDetails,setAadhaarDetails] = useState()
  const [otp, setOtp] = useState(Array(6).fill(''));
  const [timeLeft, setTimeLeft] = useState(30); // 30 seconds countdown for resend
  const inputRefs = useRef([]);
  const {lead} = useStore()

  const [verifyAadhaarOtp, { data, isSuccess, isError, error }] = useVerifyAadhaarOtpMutation();

  // Handle OTP input
  const handleChange = (e, index) => {
    const { value } = e.target;
    if (value.match(/^[0-9]$/)) {
      const newOtp = [...otp];
      newOtp[index] = value;
      setOtp(newOtp);

      // Move to next input box
      if (index < 5) {
        inputRefs.current[index + 1].focus();
      }
    } else if (value === '') {
      const newOtp = [...otp];
      newOtp[index] = '';
      setOtp(newOtp);
    }
  };

  // Handle key press for deleting or backspace
  const handleKeyDown = (e, index) => {
    if (e.key === 'Backspace' && !otp[index] && index > 0) {
      inputRefs.current[index - 1].focus();
    }
  };

  const handleResend = () => {
    setTimeLeft(30); // Reset timer
    // Add resend OTP logic here
  };

  // Countdown logic for Resend OTP
  useEffect(() => {
    if (timeLeft > 0) {
      const timerId = setTimeout(() => setTimeLeft(timeLeft - 1), 1000);
      return () => clearTimeout(timerId);
    }
  }, [timeLeft]);

  // Handle form submit
  const handleSubmit = () => {
    const data = otp.join('');
    console.log('lead id',lead)
    verifyAadhaarOtp({id:lead?._id,trx_id:id,otp:data});
  };

  useEffect(() => {
    if (isSuccess) {
      setAadhaarModal(true)
      setAadhaarDetails(data?.details)
      
    }
  }, [isSuccess, data]);


  return (
    <>
    {<AadhaarCompare open={aadhaarModal} setOpen={setAadhaarModal} aadhaarDetails={aadhaarDetails} />}
    <Box
      sx={{
        height: '100vh',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        background: '#a5aeb8',
        padding: '20px',
      }}
    >
      <Paper
        elevation={6}
        sx={{
          padding: '40px',
          maxWidth: '400px',
          width: '100%',
          borderRadius: '12px',
          background: '#64686e', // Slight transparency
          boxShadow: '0 4px 20px rgba(0, 0, 0, 0.2)',
        }}
      >
        <Box display="flex" flexDirection="column" alignItems="center" gap={3}>
          <Typography variant="h4" align="center" sx={{ fontWeight: 'bold', color: '#ffffff' }}>
            OTP Verification
          </Typography>

          <Typography variant="body1" align="center" color="#ffffff">
            Enter the 6-digit OTP sent to your Aadhaar-linked email.
          </Typography>

          {/* OTP Input Fields */}
          <Box display="flex" justifyContent="center" gap={2} mb={3}>
            {otp.map((digit, index) => (
              <TextField
                key={index}
                variant="outlined"
                inputProps={{
                  maxLength: 1,
                  style: {
                    textAlign: 'center',
                    fontSize: '20px',
                    padding: '10px',
                  },
                }}
                value={digit}
                onChange={(e) => handleChange(e, index)}
                onKeyDown={(e) => handleKeyDown(e, index)}
                inputRef={(el) => (inputRefs.current[index] = el)}
                sx={{
                  width: 50,
                  height: 50,
                  backgroundColor: '#f3f3f3',
                  borderRadius: '8px',
                  boxShadow: '0px 4px 8px rgba(0, 0, 0, 0.1)',
                  '& .MuiOutlinedInput-root': {
                    borderRadius: '8px',
                    borderColor: '#1976D2',
                    '&:hover': {
                      borderColor: '#43a047',
                    },
                  },
                  '& .MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-notchedOutline': {
                    borderColor: '#1976D2',
                    boxShadow: '0px 6px 15px rgba(0, 0, 0, 0.1)',
                  },
                }}
              />
            ))}
          </Box>

          <Typography variant="body2" color="#ffffff" align="center">
            {timeLeft > 0
              ? `Resend OTP in ${timeLeft}s`
              : <Button onClick={handleSubmit} sx={{ color: '#ffffff', fontWeight: 'bold' }}>Resend OTP</Button>}
          </Typography>

          {isError && error?.data?.message && (
            <Typography color="error" variant="body1" mb={2}>
              {error.data.message}
            </Typography>
          )}

          <Button
            onClick={handleSubmit}
            variant="contained"
            sx={{
              backgroundColor: '#1976D2',
              color: 'white',
              fontWeight: 'bold',
              padding: '10px 20px',
              borderRadius: '30px',
              '&:hover': {
                backgroundColor: '#1565C0',
              },
            }}
          >
            Submit
          </Button>
        </Box>
      </Paper>
    </Box>
    </>
  );
};

export default AadhaarOtpVerification;
