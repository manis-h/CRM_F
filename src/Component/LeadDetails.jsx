import React, { useEffect, useState } from 'react';
import { TextField, FormControl, InputLabel, Select, MenuItem, Button, Grid, Typography, OutlinedInput } from '@mui/material';
import useStore from '../Store';
import { useParams } from 'react-router-dom';
import { useFetchSingleLeadQuery, useUpdateLeadMutation } from '../Service/Query';

const LeadDetails = ({ leadData, setLeadEdit }) => {
  const {id} =useParams()
  const [updateLead,{data,isSuccess,isError,error}] = useUpdateLeadMutation()
  const [formData, setFormData] = useState(leadData);
  console.log('lead data', leadData, formData);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setLeadEdit(false);
    updateLead({id,formData})
  };
  
  const convertToISODate = (dob) => {
    console.log("form date",dob);
    if (!dob) return ''; 
  
    const [day, month, year] = dob.split('-');
    // return `${year}-${month}-${day}`;
    return `${day}-${month}-${year}`;
  };

  return (
    <div style={{ padding: '40px', backgroundColor: '#f4f6f8', minHeight: '100vh' }}>
      <Typography variant="h4" align="center" gutterBottom style={{ fontWeight: 'bold', color: '#3f51b5' }}>
        Lead Details
      </Typography>
      <form onSubmit={handleSubmit} style={{ backgroundColor: '#fff', padding: '30px', borderRadius: '10px', boxShadow: '0 4px 12px rgba(0,0,0,0.1)' }}>
        <Grid container spacing={3}>
          {/* First Name */}
          <Grid item xs={12} sm={6}>
            <TextField
              required
              fullWidth
              label="First Name"
              name="fName"
              value={formData.fName}
              onChange={handleChange}
              variant="outlined"
            />
          </Grid>

          {/* Middle Name */}
          <Grid item xs={12} sm={6}>
            <TextField
              fullWidth
              label="Middle Name"
              name="mName"
              value={formData.mName}
              onChange={handleChange}
              variant="outlined"
            />
          </Grid>

          {/* Last Name */}
          <Grid item xs={12} sm={6}>
            <TextField
              fullWidth
              label="Last Name"
              name="lName"
              value={formData.lName}
              onChange={handleChange}
              variant="outlined"
            />
          </Grid>

          {/* Gender */}
          <Grid item xs={12} sm={6}>
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
          </Grid>

          {/* Date of Birth */}
          <Grid item xs={12} sm={6}>
            <TextField
              required
              fullWidth
              label="Date of Birth"
              name="dob"
              type="date"
              InputLabelProps={{ shrink: true }}
              value={formData.dob && convertToISODate(formData.dob)}
              onChange={handleChange}
              variant="outlined"
            />
          </Grid>

          {/* Aadhaar Number */}
          <Grid item xs={12} sm={6}>
            <TextField
              required
              fullWidth
              label="Aadhaar"
              name="aadhaar"
              value={formData.aadhaar}
              onChange={handleChange}
              variant="outlined"
            />
          </Grid>

          {/* PAN Number */}
          <Grid item xs={12} sm={6}>
            <TextField
              required
              fullWidth
              label="PAN"
              name="pan"
              value={formData.pan}
              onChange={handleChange}
              variant="outlined"
            />
          </Grid>

          {/* Mobile Number */}
          <Grid item xs={12} sm={6}>
            <TextField
              required
              fullWidth
              label="Mobile"
              name="mobile"
              value={formData.mobile}
              onChange={handleChange}
              variant="outlined"
            />
          </Grid>

          {/* Alternate Mobile */}
          <Grid item xs={12} sm={6}>
            <TextField
              fullWidth
              label="Alternate Mobile"
              name="alternateMobile"
              value={formData.alternateMobile}
              onChange={handleChange}
              variant="outlined"
            />
          </Grid>

          {/* Personal Email */}
          <Grid item xs={12} sm={6}>
            <TextField
              required
              fullWidth
              label="Personal Email"
              name="personalEmail"
              value={formData.personalEmail}
              onChange={handleChange}
              variant="outlined"
            />
          </Grid>

          {/* Office Email */}
          <Grid item xs={12} sm={6}>
            <TextField
              required
              fullWidth
              label="Office Email"
              name="officeEmail"
              value={formData.officeEmail}
              onChange={handleChange}
              variant="outlined"
            />
          </Grid>

          {/* Loan Amount */}
          <Grid item xs={12} sm={6}>
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
          </Grid>


          {/* Salary */}
          <Grid item xs={12} sm={6}>
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
          </Grid>

          {/* Pin Code */}
          <Grid item xs={12} sm={6}>
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
          </Grid>

          {/* State */}
          <Grid item xs={12} sm={6}>
            <TextField
              required
              fullWidth
              label="State"
              name="state"
              value={formData.state}
              onChange={handleChange}
              variant="outlined"
            />
          </Grid>

          {/* City */}
          <Grid item xs={12} sm={6}>
            <TextField
              required
              fullWidth
              label="City"
              name="city"
              value={formData.city}
              onChange={handleChange}
              variant="outlined"
            />
          </Grid>

          {/* Buttons at the bottom */}
            <Grid container justifyContent="flex-end" spacing={2}>
              <Grid item>
                <Button
                  variant="outlined"
                  color="gray"
                  onClick={() => setLeadEdit(false)}
                  sx={{
                    backgroundColor: 'gray',
                    color: 'white',
                    borderColor: 'gray',
                    padding: '10px 20px', // Adjust padding for better appearance
                    '&:hover': {
                      backgroundColor: 'darkgray',
                    },
                  }}
                >
                  Cancel
                </Button>
              </Grid>
              <Grid item>
                <Button
                  type="submit"
                  variant="contained"
                  sx={{
                    backgroundColor: 'primary.main',
                    color: 'white',
                    padding: '10px 20px', // Adjust padding for better appearance
                    '&:hover': {
                      backgroundColor: 'darkPrimary',
                    },
                  }}
                >
                  Submit
                </Button>
              </Grid>
            </Grid>
        </Grid>
      </form>
    </div>
  );
};

export default LeadDetails;
