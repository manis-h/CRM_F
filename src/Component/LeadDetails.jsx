import React, { useEffect, useState } from 'react';
import { TextField, FormControl, InputLabel, Select, MenuItem, Button, Typography, OutlinedInput, Box } from '@mui/material';
import { useParams } from 'react-router-dom';
import { useUpdateLeadMutation } from '../Service/Query';
import { formatDate } from '../utils/helper';

const LeadDetails = ({ leadData, setLeadEdit }) => {
  const { id } = useParams();
  const [updateLead, { data, isSuccess, isError, error }] = useUpdateLeadMutation();
  const [formData, setFormData] = useState(leadData);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setLeadEdit(false);
    updateLead({ id, formData });
  };
console.log('form data',formData)
  const convertToISODate = (dob) => {
    if (!dob) return '';
    const [day, month, year] = dob.split('-');
    return `${day}-${month}-${year}`;
  };

  return (
    <Box sx={{ padding: '40px', backgroundColor: '#f4f6f8', minHeight: '100vh' }}>
      <Typography variant="h4" align="center" gutterBottom sx={{ fontWeight: 'bold', color: '#3f51b5' }}>
        Lead Details
      </Typography>
      <Box 
        component="form" 
        onSubmit={handleSubmit} 
        sx={{ 
          backgroundColor: '#9c9b98', 
          padding: '30px', 
          borderRadius: '10px', 
          boxShadow: '0 4px 12px rgba(0,0,0,0.1)', 
          display: 'flex', 
          flexWrap: 'wrap', 
          gap: '20px' 
        }}
      >
        {/* Using Box for a two-column layout */}
        <Box sx={{ flex: '1 1 45%' }}>
          <TextField
            required
            fullWidth
            label="First Name"
            name="fName"
            value={formData.fName}
            onChange={handleChange}
            variant="outlined"
          />
        </Box>

        <Box sx={{ flex: '1 1 45%' }}>
          <TextField
            fullWidth
            label="Middle Name"
            name="mName"
            value={formData.mName}
            onChange={handleChange}
            variant="outlined"
          />
        </Box>

        <Box sx={{ flex: '1 1 45%' }}>
          <TextField
            fullWidth
            label="Last Name"
            name="lName"
            value={formData.lName}
            onChange={handleChange}
            variant="outlined"
          />
        </Box>

        <Box sx={{ flex: '1 1 45%' }}>
          <FormControl variant="outlined" fullWidth required>
            <InputLabel htmlFor="gender-select">Gender</InputLabel>
            <Select
              name="gender"
              value={formData.gender}
              onChange={handleChange}
              input={<OutlinedInput label="Gender" id="gender-select" />}
            >
              <MenuItem value="M">Male</MenuItem>
              <MenuItem value="F">Female</MenuItem>
            </Select>
          </FormControl>
        </Box>

        <Box sx={{ flex: '1 1 45%' }}>
          <TextField
            required
            fullWidth
            label="Date of Birth"
            name="dob"
            type="date"
            InputLabelProps={{ shrink: true }}
            value={formData?.dob && new Date(formData?.dob).toISOString().split('T')[0]}
            onChange={handleChange}
            variant="outlined"
          />
        </Box>

        <Box sx={{ flex: '1 1 45%' }}>
          <TextField
            required
            fullWidth
            label="Aadhaar"
            name="aadhaar"
            value={formData.aadhaar}
            onChange={handleChange}
            variant="outlined"
          />
        </Box>

        <Box sx={{ flex: '1 1 45%' }}>
          <TextField
            required
            fullWidth
            label="PAN"
            name="pan"
            value={formData.pan}
            onChange={handleChange}
            variant="outlined"
          />
        </Box>

        <Box sx={{ flex: '1 1 45%' }}>
          <TextField
            required
            fullWidth
            label="Mobile"
            name="mobile"
            value={formData.mobile}
            onChange={handleChange}
            variant="outlined"
          />
        </Box>

        <Box sx={{ flex: '1 1 45%' }}>
          <TextField
            fullWidth
            label="Alternate Mobile"
            name="alternateMobile"
            value={formData.alternateMobile}
            onChange={handleChange}
            variant="outlined"
          />
        </Box>

        <Box sx={{ flex: '1 1 45%' }}>
          <TextField
            required
            fullWidth
            label="Personal Email"
            name="personalEmail"
            value={formData.personalEmail}
            onChange={handleChange}
            variant="outlined"
          />
        </Box>

        <Box sx={{ flex: '1 1 45%' }}>
          <TextField
            required
            fullWidth
            label="Office Email"
            name="officeEmail"
            value={formData.officeEmail}
            onChange={handleChange}
            variant="outlined"
          />
        </Box>

        <Box sx={{ flex: '1 1 45%' }}>
          <TextField
            required
            fullWidth
            label="Loan Amount"
            name="loanAmount"
            type="number"
            value={formData.loanAmount}
            onChange={handleChange}
            variant="outlined"
          />
        </Box>

        <Box sx={{ flex: '1 1 45%' }}>
          <TextField
            required
            fullWidth
            label="Salary"
            name="salary"
            type="number"
            value={formData.salary}
            onChange={handleChange}
            variant="outlined"
          />
        </Box>

        <Box sx={{ flex: '1 1 45%' }}>
          <TextField
            required
            fullWidth
            label="Pin Code"
            name="pinCode"
            type="number"
            value={formData.pinCode}
            onChange={handleChange}
            variant="outlined"
          />
        </Box>

        <Box sx={{ flex: '1 1 45%' }}>
          <TextField
            required
            fullWidth
            label="State"
            name="state"
            value={formData.state}
            onChange={handleChange}
            variant="outlined"
          />
        </Box>

        <Box sx={{ flex: '1 1 45%' }}>
          <TextField
            required
            fullWidth
            label="City"
            name="city"
            value={formData.city}
            onChange={handleChange}
            variant="outlined"
          />
        </Box>

        {/* Buttons at the bottom */}
        <Box sx={{ display: 'flex', justifyContent: 'flex-end', gap: '10px', width: '100%' }}>
          <Button
            variant="outlined"
            color="gray"
            onClick={() => setLeadEdit(false)}
            sx={{
              backgroundColor: 'gray',
              color: 'white',
              borderColor: 'gray',
              padding: '10px 20px',
              '&:hover': {
                backgroundColor: 'darkgray',
              },
            }}
          >
            Cancel
          </Button>
          <Button
            type="submit"
            variant="contained"
            sx={{
              backgroundColor: '#3f51b5', // Primary color
              color: 'white',
              padding: '10px 20px',
              '&:hover': {
                backgroundColor: '#303f9f', // Darker shade for hover
              },
            }}
          >
            Submit
          </Button>
        </Box>
      </Box>
    </Box>
  );
};

export default LeadDetails;
