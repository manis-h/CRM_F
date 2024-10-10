import React from 'react'

import {Button, Box } from '@mui/material';


const BarButtons = ({barButtonOptions,setCurrentPage}) => {

    const handleBarButtons = status => setCurrentPage(status);
  return (
    <>
    <Box display="flex" flexWrap="wrap" justifyContent="center" mb={3}>
              {barButtonOptions?.map(status => (
                <Button
                  key={status}
                  variant="contained"
                  color="success"
                  onClick={() => handleBarButtons(status.toLowerCase())}
                  sx={{
                    margin: "5px",
                    backgroundColor: 'green',
                    '&:hover': {
                      backgroundColor: 'darkgreen',
                      color: 'white',
                    },
                  }}
                >
                  {status}
                </Button>
              ))}
            </Box>
      
    </>
  )
}

export default BarButtons
