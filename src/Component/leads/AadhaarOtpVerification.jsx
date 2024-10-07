import React, { useState, useRef, useEffect } from 'react';
import { Box, TextField, Button, Typography } from '@mui/material';
import { useParams } from 'react-router-dom';
import Swal from 'sweetalert2';
import { useVerifyAadhaarOtpMutation } from '../../Service/Query';

const AadhaarOtpVerification = () => {
  const { id } = useParams();
  const [otp, setOtp] = useState(Array(6).fill(''));
  const [timeLeft, setTimeLeft] = useState(30); // 30 seconds countdown for resend
  const inputRefs = useRef([]);

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
    const data = Number(otp.join(''));
    console.log('otp', data);
    verifyAadhaarOtp(id);
  };

  useEffect(() => {
    if (isSuccess) {
      Swal.fire({
        title: 'Aadhaar Verified!',
        icon: 'success',
      });
    }
  }, [isSuccess, data]);

  useEffect(() => {
    if (error?.data?.message) {
      Swal.fire({
        title: `${error.data.message}`,
        icon: 'error',
      });
    }
  }, [error]);

  return (
    <div className='crm-container' style={{ padding: '20px', maxWidth: '400px', margin: '0 auto' }}>
      <Typography variant="h4" align="center" gutterBottom sx={{ fontWeight: 'bold', color: '#1976D2' }}>
        OTP Verification
      </Typography>
      
      <Typography variant="body1" align="center" color="textSecondary" gutterBottom>
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
                fontSize: '24px',
                padding: '10px',
              },
            }}
            value={digit}
            onChange={(e) => handleChange(e, index)}
            onKeyDown={(e) => handleKeyDown(e, index)}
            inputRef={(el) => (inputRefs.current[index] = el)}
            sx={{
              width: 55,
              height: 55,
              backgroundColor: '#f3f3f3',
              borderRadius: '8px',
              boxShadow: '0px 4px 8px rgba(0, 0, 0, 0.1)',
              '& .MuiOutlinedInput-root': {
                borderRadius: '8px',
                borderColor: '#1976D2',
                transition: 'all 0.3s ease',
                '&:hover': {
                  borderColor: '#43a047',
                },
              },
              '& .MuiOutlinedInput-notchedOutline': {
                borderWidth: '2px',
              },
              '& .MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-notchedOutline': {
                borderColor: '#1976D2',
                boxShadow: '0px 6px 15px rgba(0, 0, 0, 0.1)',
              },
            }}
          />
        ))}
      </Box>

      <Box display="flex" justifyContent="center" mb={3}>
        <Typography variant="body2" color="textSecondary">
          {timeLeft > 0
            ? `Resend OTP in ${timeLeft}s`
            : <Button onClick={handleResend} sx={{ color: '#1976D2', fontWeight: 'bold' }}>Resend OTP</Button>}
        </Typography>
      </Box>

      {isError && error?.data?.message && (
        <Typography color="error" variant="body1" mb={2}>
          {error.data.message}
        </Typography>
      )}

      <Box display="flex" justifyContent="center" gap={2}>
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
    </div>
  );
};

export default AadhaarOtpVerification;
