import React, { useState, useRef } from 'react';
import { Box, Grid, TextField, Button, Dialog, DialogTitle, DialogContent, DialogActions, Typography } from '@mui/material';

const OTPVerificationUI = () => {
  const [otp, setOtp] = useState(Array(6).fill(''));
  const [open, setOpen] = useState(false);
  const [timeLeft, setTimeLeft] = useState(30); // 30 seconds countdown for resend
  const inputRefs = useRef([]);

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

  // Open Dialog
  const handleClickOpen = () => {
    setOpen(true);
    setTimeLeft(30); // Reset the countdown when dialog is opened
  };

  // Close Dialog
  const handleClose = () => {
    setOpen(false);
  };

  // Resend OTP
  const handleResend = () => {
    setTimeLeft(30); // Reset timer
    // Add resend OTP logic here
  };

  // Countdown logic for Resend OTP
  React.useEffect(() => {
    if (timeLeft > 0) {
      const timerId = setTimeout(() => setTimeLeft(timeLeft - 1), 1000);
      return () => clearTimeout(timerId);
    }
  }, [timeLeft]);

  // Handle form submit (you can add real verification logic here)
  const handleSubmit = () => {
    alert(`OTP Submitted: ${otp.join('')}`);
    setOpen(false);
  };

  return (
    <div>
      <Button 
        variant="contained" 
        onClick={handleClickOpen} 
        sx={{
          backgroundColor: '#4caf50',
          color: 'white',
          padding: '12px 24px',
          borderRadius: '30px',
          fontWeight: 'bold',
          fontSize: '16px',
          '&:hover': {
            backgroundColor: '#43a047',
          }
        }}
      >
        Verify OTP
      </Button>

      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>
          <Typography variant="h5" align="center" sx={{ fontWeight: 'bold', color: '#1976D2' }}>
            OTP Verification
          </Typography>
        </DialogTitle>
        <DialogContent>
          <Box mt={2} mb={3} display="flex" justifyContent="center">
            <Typography variant="body1" align="center" color="textSecondary">
              Enter the 6-digit code we sent to your phone.
            </Typography>
          </Box>
          <Grid container justifyContent="center" spacing={2}>
            {otp.map((digit, index) => (
              <Grid item key={index}>
                <TextField
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
              </Grid>
            ))}
          </Grid>
          <Box mt={3} display="flex" justifyContent="center">
            <Typography variant="body2" color="textSecondary">
              {timeLeft > 0 
                ? `Resend OTP in ${timeLeft}s`
                : <Button onClick={handleResend} sx={{ color: '#1976D2', fontWeight: 'bold' }}>Resend OTP</Button>}
            </Typography>
          </Box>
        </DialogContent>
        <DialogActions>
          <Button 
            onClick={handleClose} 
            sx={{ color: '#f44336', fontWeight: 'bold' }}>
            Cancel
          </Button>
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
            }}>
            Submit
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default OTPVerificationUI;
