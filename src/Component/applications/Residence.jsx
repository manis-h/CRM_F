import React from 'react';
import { Typography, Grid, Button, Accordion, AccordionSummary, AccordionDetails, Paper, Divider } from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';

const Residence = () => {
    return (
        <>
            <Accordion>
                <AccordionSummary
                    expandIcon={<ExpandMoreIcon />}
                    aria-controls="panel1a-content"
                    id="panel1a-header"
                >
                    <Typography variant="h6">Residence Information</Typography>
                </AccordionSummary>
                <AccordionDetails>
                    <Paper elevation={3} style={{ padding: '30px', borderRadius: '10px' }}>
                        <Grid container spacing={2}>
                            {/* Render lead data here */}
                            <Grid item xs={12} sm={6}>
                                <Typography variant="subtitle1" gutterBottom>
                                    <strong>Address: </strong>
                                    {/* {leadData?.address} */}
                                </Typography>
                            </Grid>

                            <Grid item xs={12} sm={6}>
                                <Typography variant="subtitle1" gutterBottom>
                                    <strong>State: </strong>
                                    {/* {leadData?.state} */}
                                </Typography>
                            </Grid>
                            <Grid item xs={12} sm={6}>
                                <Typography variant="subtitle1" gutterBottom>
                                    <strong>City: </strong>
                                    {/* {leadData?.city} */}
                                </Typography>
                            </Grid>
                            <Grid item xs={12} sm={6}>
                                <Typography variant="subtitle1" gutterBottom>
                                    <strong>Pincode: </strong>
                                    {/* {leadData?.pincode} */}
                                </Typography>
                            </Grid>
                            <Grid item xs={12} sm={6}>
                                <Typography variant="subtitle1" gutterBottom>
                                    <strong>Residence Since: </strong>
                                    {/* {leadData?.residenceSince} */}
                                </Typography>
                            </Grid>
                        </Grid>

                        <Grid container justifyContent="flex-end" spacing={2}>
                            <Grid item>
                                <Button
                                    variant="outlined"
                                    onClick={() => setLeadEdit(true)}
                                    sx={{
                                        backgroundColor: 'primary.main',
                                        color: 'white',
                                        padding: '10px 20px',
                                        '&:hover': {
                                            backgroundColor: 'darkPrimary',
                                        },
                                    }}
                                >
                                    Edit
                                </Button>
                            </Grid>
                        </Grid>

                        <Divider style={{ margin: '30px 0' }} />

                        {/* Placeholder for additional components or features */}
                    </Paper>
                </AccordionDetails>
            </Accordion>
        </>
    );
}

export default Residence;
