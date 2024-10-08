import React, { useState } from 'react';
import { Accordion, AccordionSummary, AccordionDetails, Typography, Button, Box, Paper } from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import Swal from 'sweetalert2';
import { useLazyFetchCibilScoreQuery } from '../../Service/Query';
import { useParams } from 'react-router-dom';

const CibilScore = () => {
  const {id} = useParams()
  const [score, setScore] = useState(null); 
  const [loading, setLoading] = useState(false); 
  const [error, setError] = useState(''); 

  const [fetchCibilScore,cibilRes] = useLazyFetchCibilScoreQuery()

  // Placeholder function for fetching CIBIL score
  const submitCibil = async () => {
    // setLoading(true);
    fetchCibilScore(id)
    // setError('');
   
  };

  const accordionStyles = {
    borderRadius: '12px',
    background: 'linear-gradient(145deg, #36cfc9, #ffffff)',
    boxShadow: '5px 5px 10px #d1d5db, -5px -5px 10px #ffffff',
    marginBottom: '20px',
  };

  const paperStyles = {
    padding: '20px',
    borderRadius: '15px',
    backgroundColor: '#fafafa',
    boxShadow: '5px 5px 15px rgba(0, 0, 0, 0.1)',
  };

  return (
    <Box sx={{ maxWidth: '700px', margin: '0 auto', mt: 3 }}>
      <Accordion style={accordionStyles}>
        <AccordionSummary expandIcon={<ExpandMoreIcon sx={{ color: '#007bb2' }} />}>
          <Typography variant="h6" style={{ fontWeight: '600', color: "#ffffff" }}>Fetch CIBIL Score</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Paper elevation={3} style={paperStyles}>
            <Box display="flex" justifyContent="space-between" alignItems="center">
              <Button
                variant="contained"
                onClick={submitCibil}
                disabled={loading}
                sx={{
                  borderRadius: '8px',
                  padding: '10px 20px',
                  background: 'linear-gradient(45deg, #42a5f5, #007bb2)',
                  color: '#fff',
                  '&:hover': {
                    background: 'linear-gradient(45deg, #007bb2, #42a5f5)',
                  },
                }}
              >
                {cibilRes?.isLoading ? 'Fetching...' : 'Fetch CIBIL Score'}
              </Button>

              <Box textAlign="right">
                {cibilRes?.isError && (
                  <Typography color="error" variant="body1" mt={1}>
                    {cibilRes?.error?.data?.message}
                  </Typography>
                )}
                {cibilRes?.data?.value && (
                  <Typography variant="h5" mt={1}>
                    Your CIBIL Score: {cibilRes?.data?.value}
                  </Typography>
                )}
              </Box>
            </Box>
          </Paper>
        </AccordionDetails>
      </Accordion>
    </Box>
  );
};

export default CibilScore;
