import React, { useEffect, useState } from 'react';
import { Typography, Grid, Button, Accordion, AccordionSummary, AccordionDetails, Paper, Divider } from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { useParams } from 'react-router-dom';
import { useFetchSingleLeadQuery, useUploadDocumentsMutation } from '../Service/Query';
import LeadDetails from '../Component/LeadDetails';
import Swal from 'sweetalert2';

const LeadProfile = () => {
    const { id } = useParams();
    const [leadEdit, setLeadEdit] = useState(false);
    const [documents, setDocuments] = useState({
        aadhaarFront: null,
        aadhaarBack: null,
        panCard: null,
        salarySlip: null,
        bankStatement: null,
    });

    const { data: leadData, isSuccess: leadSuccess, refetch } = useFetchSingleLeadQuery(id, { skip: id === null });
    const [uploadDocuments,{data:docsResult,isSuccess:docSuccess,error:docsError}] = useUploadDocumentsMutation()

    const [formData, setFormData] = useState({
        fName: '',
        mName: '',
        lName: '',
        gender: '',
        dob: '',
        aadhaar: '',
        pan: '',
        mobile: '',
        alternateMobile: '',
        personalEmail: '',
        officeEmail: '',
        loanAmount: '',
        noOfLoans: '',
        salary: '',
        pinCode: '',
        state: '',
        city: '',
    });

    const documentSubmit = (e) => {
        e.preventDefault();
        const docsData = new FormData();

        docsData.append("aadhaarFront", documents.aadhaarFront);
        docsData.append("aadhaarBack", documents.aadhaarBack);
        docsData.append("panCard", documents.panCard);
        docsData.append("salarySlip", documents.salarySlip);
        docsData.append("bankStatement", documents.bankStatement);

        // console.log('formData', docsData.get("aadhaarFront"));
        uploadDocuments({id,docsData})

    }

    
    const handleChange = (e) => {
        if (e.target.type === "file") {
            setDocuments({ ...documents, [e.target.name]: e.target.files[0] });
        }
    };

    useEffect(()=> {
        if(docSuccess){
            Swal.fire({
                title: "Documents uploaded successfully!",
                text: "You clicked the button!",
                icon: "success"
              });
        }           
        if(docsError){
            Swal.fire({
                title: "error!",
                text: "You clicked the button!",
                icon: "error"
              });
        }           

    },[docSuccess,docsError])
    useEffect(() => {
        if (leadData) {
            setFormData(leadData);
        }
    }, [leadData]);

    return (
        <div className="crm-container">
            {leadEdit ? (
                <LeadDetails leadData={formData} setLeadEdit={setLeadEdit} />
            ) : (
                <Paper elevation={3} style={{ padding: '30px', marginTop: '20px', borderRadius: '10px' }}>
                    <Grid container spacing={2}>
                        {/* Render each field explicitly, skipping the `_id` field */}
                        <Grid item xs={12} sm={6}>
                            <Typography variant="subtitle1" gutterBottom>
                                <strong>First Name: </strong>
                                {formData.fName}
                            </Typography>
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <Typography variant="subtitle1" gutterBottom>
                                <strong>Middle Name: </strong>
                                {formData.mName}
                            </Typography>
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <Typography variant="subtitle1" gutterBottom>
                                <strong>Last Name: </strong>
                                {formData.lName}
                            </Typography>
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <Typography variant="subtitle1" gutterBottom>
                                <strong>Gender: </strong>
                                {formData.gender}
                            </Typography>
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <Typography variant="subtitle1" gutterBottom>
                                <strong>Date of Birth: </strong>
                                {formData.dob}
                            </Typography>
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <Typography variant="subtitle1" gutterBottom>
                                <strong>Aadhaar Number: </strong>
                                {formData.aadhaar}
                            </Typography>
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <Typography variant="subtitle1" gutterBottom>
                                <strong>PAN Number: </strong>
                                {formData.pan}
                            </Typography>
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <Typography variant="subtitle1" gutterBottom>
                                <strong>Mobile Number: </strong>
                                {formData.mobile}
                            </Typography>
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <Typography variant="subtitle1" gutterBottom>
                                <strong>Alternate Mobile Number: </strong>
                                {formData.alternateMobile}
                            </Typography>
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <Typography variant="subtitle1" gutterBottom>
                                <strong>Personal Email: </strong>
                                {formData.personalEmail}
                            </Typography>
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <Typography variant="subtitle1" gutterBottom>
                                <strong>Office Email: </strong>
                                {formData.officeEmail}
                            </Typography>
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <Typography variant="subtitle1" gutterBottom>
                                <strong>Loan Amount: </strong>
                                {formData.loanAmount}
                            </Typography>
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <Typography variant="subtitle1" gutterBottom>
                                <strong>Number of Loans: </strong>
                                {formData.noOfLoans}
                            </Typography>
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <Typography variant="subtitle1" gutterBottom>
                                <strong>Salary: </strong>
                                {formData.salary}
                            </Typography>
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <Typography variant="subtitle1" gutterBottom>
                                <strong>Pin Code: </strong>
                                {formData.pinCode}
                            </Typography>
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <Typography variant="subtitle1" gutterBottom>
                                <strong>State: </strong>
                                {formData.state}
                            </Typography>
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <Typography variant="subtitle1" gutterBottom>
                                <strong>City: </strong>
                                {formData.city}
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

                    <Accordion style={{ width: '100%', backgroundColor: '#f9f9f9', boxShadow: '0 4px 8px rgba(0,0,0,0.1)', borderRadius: '10px' }}>
                        <AccordionSummary
                            expandIcon={<ExpandMoreIcon />}
                            style={{ justifyContent: 'center', textAlign: 'center' }}
                        >
                            <Typography variant="h6" style={{ fontWeight: 'bold', width: '100%', textAlign: 'center' }}>
                                Upload Documents
                            </Typography>
                        </AccordionSummary>
                        <AccordionDetails>
                            <form onSubmit={documentSubmit}  style={{ width: '100%' }}>
                                <Grid container spacing={2}>
                                    {Object.entries(documents).map(([key]) => (
                                        <Grid item xs={12} sm={6} key={key}>
                                            <label className="form-label" style={{ fontWeight: 'bold' }}>
                                                Upload {key.charAt(0).toUpperCase() + key.slice(1).replace(/([A-Z])/g, ' $1').replace('Card', ' Card')}:
                                            </label>
                                            <input
                                                type="file"
                                                className="form-control"
                                                name={key}
                                                accept=".pdf,.doc,.docx,.jpg"
                                                onChange={handleChange}
                                                style={{
                                                    borderRadius: '5px',
                                                    border: '1px solid #ccc',
                                                    padding: '5px',
                                                    marginTop: '5px',
                                                }}
                                            />
                                        </Grid>
                                    ))}
                                </Grid>
                                <Grid container justifyContent="flex-end" spacing={2}>
                                    <Grid item>
                                        <Button
                                            type="submit"
                                            variant="contained"
                                            color="primary"
                                            style={{
                                                marginTop: '30px',
                                                padding: '10px 20px',
                                                fontWeight: 'bold',
                                                display: 'block',
                                                marginLeft: 'auto',
                                                marginRight: 'auto',
                                                boxShadow: '0 4px 8px rgba(0,0,0,0.2)',
                                            }}
                                        >
                                            Upload
                                        </Button>
                                    </Grid>
                                </Grid>
                            </form>
                        </AccordionDetails>
                    </Accordion>
                </Paper>
            )}
        </div>
    );
};

export default LeadProfile;
