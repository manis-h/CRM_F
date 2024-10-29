import React, { useEffect, useState } from 'react';
import { Button, TextField,  Table, TableBody, TableCell, TableRow, TableContainer, Paper, Grid2 } from '@mui/material';
import { useGetCamDetailsQuery , useUpdateCamDetailsMutation } from '../../queries/applicationQueries';
import { useParams } from 'react-router-dom';
import { MenuItem, Select, InputLabel, FormControl } from '@mui/material';


const EditableForm = () => {
  const { id }= useParams();
  const { data   , isLoading : camGetloading , isError : camGetError  , isSuccess : getCamSuccess } = useGetCamDetailsQuery(id , { skip : id === null});
  // const updatData = useUpdateCamDetailsMutation();
  const [isEditing, setIsEditing] = useState(false);
  // const response = useGetCamDetailsQuery(id, { skip: id === null });  // Fetch data
  const [formData, setFormData] = useState({
    // leadId: data?.details?.leadId || 0,
    // // Corrected the paths for all fields to access the nested 'details.details'
    // loanNo: data?.details?.details?.loanNo || '-',
    // salaryDate1: data?.details?.details?.salaryDate1 || '',
    // salaryAmount1: data?.details?.details?.salaryAmount1 || 0,
    // salaryDate2: data?.details?.details?.salaryDate2 || '',
    // salaryAmount2: data?.details?.details?.salaryAmount2 || 0,
    // salaryDate3: data?.details?.details?.salaryDate3 || '',
    // salaryAmount3: data?.details?.details?.salaryAmount3 || 0,
    // nextPayDate: data?.details?.details?.nextPayDate || '',
    // averageSalary: data?.details?.details?.averageSalary || 0,
    // actualNetSalary: data?.details?.details?.actualNetSalary || 0,
  
    // // Keeping these fields from 'details.details'
    // creditBureauScore: data?.details?.details?.cibilScore || '-',
    // customerType: data?.details?.details?.customerType || 'NEW',
    // dedupeCheck: data?.details?.details?.dedupeCheck || 'NO',
    // customerCategory: data?.details?.details?.customerCategory || '-',
    // repeatTimes: data?.details?.details?.repeatTimes || 0,
    // obligations: data?.details?.details?.obligations || 100,
    // eligiblesalaryToIncomeRatioPercentage: data?.details?.details?.eligiblesalaryToIncomeRatioPercentage || '0%',
    // eligibleLoan: data?.details?.details?.eligibleLoan || 0,
    // netDisbursalAmount: data?.details?.details?.netDisbursalAmount || 0,
    // eligibleTenure: data?.details?.details?.eligibleTenure || '-',
    // disbursalDate: data?.details?.details?.disbursalDate || '-',
    // repaymentDate: data?.details?.details?.repaymentDate || '-',
    // salaryToIncomeRatio: data?.details?.details?.salaryToIncomeRatio || '0%',
    // loanAmount: data?.details?.details?.loanAmount || 0,
    // roi: data?.details?.details?.roi || '0%',
    // adminFeePercentage: data?.details?.details?.adminFeePercentage || '0%',
    // netAdminFeeAmount: data?.details?.details?.netAdminFeeAmount || 0,
    // gstPercentage: data?.details?.details?.gstPercentage || '0%',
    // totalAdminFeeAmount: data?.details?.details?.totalAdminFeeAmount || 0,
    // panelRoi: data?.details?.details?.panelRoi || 0,
    // remarks: data?.details?.details?.remarks || '-',
  
    // // Additional nested fields
    // eligibleRoi: data?.details?.details?.eligibleRoi || '1%',
    // eligibleAdminFee: data?.details?.details?.eligibleAdminFee || '10%',
    // adminFeeGst: data?.details?.details?.adminFeeGst || '18%',
    // adminFeeGstAmount: data?.details?.details?.adminFeeGstAmount || 0,
    // finalsalaryToIncomeRatioPercentage: data?.details?.details?.finalsalaryToIncomeRatioPercentage || '0%',
    // loanRecommended: data?.details?.details?.loanRecommended || 0,
    // repaymentAmount: data?.details?.details?.repaymentAmount || 0,
    leadId: '',                // Lead ID
    salaryDate1: '',           // Salary Date 1
    salaryAmount1: '',         // Salary Amount 1
    salaryDate2: '',           // Salary Date 2
    salaryAmount2: '',         // Salary Amount 2
    salaryDate3: '',           // Salary Date 3
    salaryAmount3: '',         // Salary Amount 3
    nextPayDate: '',           // Next Salary Date
    averageSalary: '',         // Median Salary Amount
    customerType: '',          // Customer Type
    dedupeCheck: '',           // Dedupe Check
    actualNetSalary: '',       // Net Salary
    creditBureauScore: '',     // Credit Bureau Score
    obligations: '',           // Obligations (Rs)
    salaryToIncomeRatio: '',   // Salary To Income Ratio
    eligibleLoan: '',          // Loan Amount
    loanRecommended: '',       // Loan Recommended
    disbursalDate: '',         // Disbursal Date
    repaymentDate: '',         // Repayment Date
    adminFeePercentage: '',    // Admin Fee Inc. GST (%)
    roi: '',                   // ROI (Rate of Interest)
    netAdminFeeAmount: '',     // Net Admin Fee Amount
    eligibleTenure: '',        // Eligible Tenure
    repaymentAmount: '',       // Repayment Amount
  });
  
  console.log("The formdata ia",formData)
  // console.log"The for",formdaata))
    // Use useEffect to update formData once data is fetched

    // useEffect(() => {
    //   if (getCamSuccess && data?.details) {
    //     const details = data.details.details;  // Access the deeply nested object
    //     setFormData({
    //       leadId: data.details?.leadId || 0,
    //       loanNo: data.details?.details?.loanNo || '-',
    //       salaryDate1: details?.salaryDate1 || '',
    //       salaryAmount1: details?.salaryAmount1 || 0,
    //       salaryDate2: details?.salaryDate2 || '',
    //       salaryAmount2: details?.salaryAmount2 || 0,
    //       salaryDate3: details?.salaryDate3 || '',
    //       salaryAmount3: details?.salaryAmount3 || 0,
    //       nextPayDate: details?.nextPayDate || '',
    //       averageSalary: details?.averageSalary || 0,
    //       actualNetSalary: details?.actualNetSalary || 0,
    //       creditBureauScore: details?.cibilScore || '-',
    //       customerType: details?.customerType || 'NEW',
    //       dedupeCheck: details?.dedupeCheck || 'NO',
    //       customerCategory: details?.customerCategory || '-',
    //       repeatTimes: details?.repeatTimes || 0,
    //       obligations: details?.obligations || 100,
    //       eligiblesalaryToIncomeRatioPercentage: details?.eligiblesalaryToIncomeRatioPercentage || '0%',
    //       eligibleLoan: details?.eligibleLoan || 0,
    //       netDisbursalAmount: details?.netDisbursalAmount || 0,
    //       eligibleTenure: data.details?.details?.eligibleTenure || '-',
    //       disbursalDate: details?.disbursalDate || '-',
    //       repaymentDate: details?.repaymentDate || '-',
    //       salaryToIncomeRatio: details?.salaryToIncomeRatio || '0%',
    //       loanAmount: details?.loanAmount || 0,
    //       roi: details?.roi || '0%',
    //       adminFeePercentage: details?.adminFeePercentage || '0%',
    //       netAdminFeeAmount: details?.netAdminFeeAmount || 0,
    //       gstPercentage: details?.gstPercentage || '0%',
    //       totalAdminFeeAmount: details?.totalAdminFeeAmount || 0,
    //       panelRoi: details?.panelRoi || 0,
    //       remarks: details?.remarks || '-',
    //       // Missing fields added
    //       eligibleRoi: details?.eligibleRoi || '1%',
    //       eligibleAdminFee: details?.eligibleAdminFee || '10%',
    //       adminFeeGst: details?.adminFeeGst || '18%',
    //       adminFeeGstAmount: details?.adminFeeGstAmount || 0,
    //       finalsalaryToIncomeRatioPercentage: details?.finalsalaryToIncomeRatioPercentage || '0%',
    //       loanRecommended: details?.loanRecommended || 0,
    //       repaymentAmount: details?.repaymentAmount || 0,
    //     });
    //   }


    // }, [getCamSuccess, data]); 
    useEffect(() => {
      if (getCamSuccess && data?.details) {
        const details = data.details.details;  // Access the deeply nested object
        setFormData({
          leadId: data.details?.leadId || 0,                // Lead ID
          salaryDate1: details?.salaryDate1 || '',          // Salary Date 1
          salaryAmount1: details?.salaryAmount1 || 0,       // Salary Amount 1
          salaryDate2: details?.salaryDate2 || '',          // Salary Date 2
          salaryAmount2: details?.salaryAmount2 || 0,       // Salary Amount 2
          salaryDate3: details?.salaryDate3 || '',          // Salary Date 3
          salaryAmount3: details?.salaryAmount3 || 0,       // Salary Amount 3
          nextPayDate: details?.nextPayDate || '',          // Next Salary Date
          averageSalary: details?.averageSalary || 0,       // Median Salary Amount
          actualNetSalary: details?.actualNetSalary || 0,   // Net Salary
          creditBureauScore: details?.cibilScore || '-',    // Credit Bureau Score
          customerType: details?.customerType || 'NEW',     // Customer Type
          dedupeCheck: details?.dedupeCheck || 'NO',        // Dedupe Check
          obligations: details?.obligations || 100,         // Obligations (Rs)
          salaryToIncomeRatio: details?.salaryToIncomeRatio || '0%',  // Salary to Income Ratio
          eligibleLoan: details?.eligibleLoan || 0,         // Loan Amount
          loanRecommended: details?.loanRecommended || 0,   // Loan Recommended
          disbursalDate: details?.disbursalDate || '-',     // Disbursal Date
          repaymentDate: details?.repaymentDate || '-',     // Repayment Date
          adminFeePercentage: details?.adminFeePercentage || '0%',  // Admin Fee Inc. GST (%)
          roi: details?.roi || '0%',                        // ROI (Rate of Interest)
          netAdminFeeAmount: details?.netAdminFeeAmount || 0,   // Net Admin Fee Amount
          eligibleTenure: details?.eligibleTenure || '-',   // Eligible Tenure
          repaymentAmount: details?.repaymentAmount || 0,   // Repayment Amount
        });
      }
    }, [getCamSuccess, data]);
    

     // Re-run the effect when `isSuccess` or `data` changes
  

  
  const [errorMessage,setErrorMessage]=useState("")
  

  //  Initialize the mutation hook
  const [updateCamDetails,  isLoading, isSuccess, isError ] = useUpdateCamDetailsMutation();
  
  const calculateDaysDifference = (disbursalDate, repaymentDate) => {
    console.log("The loan amount is calculateDaysDifference",disbursalDate,repaymentDate)

    if( !disbursalDate && !repaymentDate){
      return 0;
    }
    // Convert the string dates to Date objects
    const startDate = new Date(disbursalDate);
    const endDate = new Date(repaymentDate);
  
    // Get the time difference in milliseconds
    const timeDiff = endDate - startDate;
  
    // Convert time difference from milliseconds to days (1000ms * 60s * 60m * 24h)
    const daysDiff = Math.ceil(timeDiff / (1000 * 60 * 60 * 24));
  
    return daysDiff;
  };

  
  const handleChange = (e) => {
    const { name, value } = e.target;
  
    // Update form data with the new value
    setFormData((prevFormData) => {
      const updatedFormData = {
        ...prevFormData, // Start by copying the previous formData state
        [name]: value,   // Update the field that triggered the change event
      };
  
      // Handle loan recommendation logic
      if (name === 'loanRecommended') {
        const recommendedLoan = Number(value);
        const finalsalaryToIncomeRatioPercentage = prevFormData.actualNetSalary 
          ? (recommendedLoan / prevFormData.actualNetSalary) * 100 
          : 0;
        // Add calculated fields to updatedFormData
        updatedFormData.finalsalaryToIncomeRatioPercentage = `${finalsalaryToIncomeRatioPercentage.toFixed(2)}%`;
        updatedFormData.adminFee = recommendedLoan * 0.1;
        updatedFormData.adminFeeGstAmount = updatedFormData.adminFee * 0.18;
        updatedFormData.totalAdminFeeAmount = updatedFormData.adminFee * 1.18;
        updatedFormData.netDisbursalAmount = recommendedLoan - updatedFormData.totalAdminFeeAmount;
      }
      // Handle repayment date change and calculate repayment amount
      if (name === 'repaymentDate') {
        const eligibleTenure = calculateDaysDifference(prevFormData.disbursalDate, value);
        updatedFormData.eligibleTenure = eligibleTenure || 0;
  
        // Convert ROI to decimal
        const roiDecimal = Number(prevFormData.eligibleRoi.replace('%', '')) / 100;
        // Calculate repaymentAmount using the correct formula
        const loanRecommended = Number(prevFormData.loanRecommended);
        updatedFormData.repaymentAmount = loanRecommended 
          ? loanRecommended + (loanRecommended * roiDecimal * eligibleTenure )
          : 0;
      }
      // Return the updated form data
      return updatedFormData;
    });
  };
  

  const handleSave = async (e) => {
    e.preventDefault();
    console.log("The form data is", formData);

     // Utility function to validate if the input is a valid date
  const isValidDate = (date) => {
    return !isNaN(Date.parse(date)); // Returns true if valid, false if invalid
  };
  
    // Validation checks
    if (formData.actualNetSalary > 0 &&  isValidDate(formData.disbursalDate) && isValidDate(formData.repaymentDate)) {
      try {
        console.log("wating here to check")
        const response = await updateCamDetails({
          id: id, // ID of the CAM (assuming this is passed as a prop)
          updates: formData // The updated data from the form
        }).unwrap();

        console.log("the response is ",response)
  
        if (response?.success) {
          setIsEditing(false); // Stop editing after successful update
          setErrorMessage(""); // Clear any error message
        } else {
          setErrorMessage("Failed to update the data. Please try again.");
        }
      } catch (error) {
        console.error("Error updating CAM details:", error);
        setErrorMessage("An error occurred while updating the data.");
      }
  
      console.log('Form data saved:', formData);
    } else {
      setErrorMessage("Please fill out all the required fields.");
      console.warn("Validation failed. Required fields missing.");
    }
  };
  

 
  const handleCancel = () => {
    setIsEditing(false);
  };

    console.log(data)
  // if (response.isLoading) {
  //   return <div>Loading...</div>;
  // }


  // Function to calculate the salaryToIncomeRatio percentage based on the actual net salary
  const calculatesalaryToIncomeRatio = (salary) => {
    if (salary < 25000) {
      return '0%';
    } else if (salary >= 25000 && salary < 35000) {
      return '35%';
    } else if (salary >= 35000 && salary < 50000) {
      return '40%';
    } else {
      return '45%';
    }
  };

  // Function to calculate the eligible loan based on the actual net salary and salaryToIncomeRatio
  const calculateEligibleLoan = (salary, salaryToIncomeRatioPercentage) => {

    
    const salaryToIncomeRatioDecimal = parseFloat(salaryToIncomeRatioPercentage) / 100;
    return salary * salaryToIncomeRatioDecimal;
  };

  // UseEffect to calculate salaryToIncomeRatio whenever the actualNetSalary changes
  useEffect(() => {
    const salaryToIncomeRatioPercentage = calculatesalaryToIncomeRatio(formData.actualNetSalary);
    const eligibleLoan = calculateEligibleLoan(formData.actualNetSalary, salaryToIncomeRatioPercentage);
    if( formData.actualNetSalary > 25000){
      setFormData((prevData) => ({
        ...prevData,
        customerCategory : 'CAT - B'
      }));
    }else{
      setFormData((prevData) => ({
        ...prevData,
        customerCategory : ''
      }));
    }
    setFormData((prevData) => ({
      ...prevData,
      eligiblesalaryToIncomeRatioPercentage: salaryToIncomeRatioPercentage,
      eligibleLoan: eligibleLoan,
    }));
  }, [formData.actualNetSalary]);


  const meanSalary = (sal1, sal2, sal3) => {
    return (sal1 + sal2 + sal3) / 3;
  };
  

  useEffect(() => {
    const avgSal = meanSalary(
      Number(formData.salaryAmount1), 
      Number(formData.salaryAmount2), 
      Number(formData.salaryAmount3)
    ).toFixed(2);
  
    setFormData((prevData) => ({
      ...prevData,
      averageSalary: avgSal || 0,  // Ensure default value is set if avgSal is NaN
    }));
  }, [formData.salaryAmount1, formData.salaryAmount2, formData.salaryAmount3]);
  
  
  
  


  

  return (
    <>
      {
        camGetloading ?( <h1> Loading </h1>) : (<div>
          {!isEditing ? (
            <div>
              {/* Display the table with data */}
              <TableContainer component={Paper}>
              <Table>
      <TableBody > 
      <TableRow>
        <TableCell colSpan={5} align="center">
          Lead Id: {formData.leadId}
        </TableCell>
      </TableRow>
        <TableRow>
          <TableCell>Salary Date 1</TableCell>
          <TableCell>{formData.salaryDate1 || '-'}</TableCell>
          <TableCell>Salary Amount 1</TableCell>
          <TableCell>{formData.salaryAmount1}</TableCell>
        </TableRow>
        <TableRow>
          <TableCell>Salary Date 2</TableCell>
          <TableCell>{formData.salaryDate2 || '-'}</TableCell>
          <TableCell>Salary Amount 2</TableCell>
          <TableCell>{formData.salaryAmount2}</TableCell>
        </TableRow>
        <TableRow>
          <TableCell>Salary Date 3</TableCell>
          <TableCell>{formData.salaryDate3 || '-'}</TableCell>
          <TableCell>Salary Amount 3</TableCell>
          <TableCell>{formData.salaryAmount3}</TableCell>
        </TableRow>
        <TableRow>
          <TableCell>Next Salary Date</TableCell>
          <TableCell>{formData.nextPayDate || '-'}</TableCell>
          <TableCell>Median Salary Amount</TableCell>
          <TableCell>{formData.averageSalary}</TableCell>
        </TableRow>
        <TableRow>
          <TableCell>Customer Type</TableCell>
          <TableCell>{formData.customerType}</TableCell>
          <TableCell>Dedupe Check</TableCell>
          <TableCell>{formData.dedupeCheck}</TableCell>
        </TableRow>
        <TableRow>
          <TableCell>Net Salary</TableCell>
          <TableCell>{formData.actualNetSalary}</TableCell>
          <TableCell>Credit Bureau Score</TableCell>
          <TableCell>{formData.creditBureauScore}</TableCell>
        </TableRow>
        <TableRow>
          <TableCell>Obligations (Rs)</TableCell>
          <TableCell>{formData.obligations}</TableCell>
          <TableCell>Salary To Income Ratio</TableCell>
          <TableCell>  {formData.salaryToIncomeRatio}</TableCell>
        </TableRow>
        <TableRow>
          <TableCell>Loan Amount</TableCell>
          <TableCell>{formData.eligibleLoan}</TableCell>
           <TableCell>Loan Recommended</TableCell>
           <TableCell>{formData.loanRecommended}</TableCell>
        </TableRow>
        <TableRow>
          {/* <TableCell>Tenure</TableCell>
          <TableCell>{formData.eligibleTenure}</TableCell> */}
          <TableCell>Disbursal Date</TableCell>
          <TableCell>{formData.disbursalDate}</TableCell>
          <TableCell>Repayment Date</TableCell>
          <TableCell>{formData.repaymentDate}</TableCell>
        </TableRow>
        <TableRow>
        </TableRow>
        <TableRow>
          <TableCell>Admin Fee Inc. Gst(%)</TableCell>
          <TableCell>{formData.adminFeePercentage}</TableCell>
          <TableCell>ROI</TableCell>
          <TableCell>{formData.roi}</TableCell>
        </TableRow>
        {/* Additional missing fields based on your formData object */}
        <TableRow>
        <TableCell>Net Admin Fee Amount</TableCell>
          <TableCell>{formData.netAdminFeeAmount}</TableCell> 
          <TableCell>Tenure</TableCell>
          <TableCell>{formData.eligibleTenure}</TableCell>
        </TableRow>

        <TableRow  >
        <TableCell colSpan={4} align = "center"  >Repayment    Amount   {formData.repaymentAmount}</TableCell>
        </TableRow>
      </TableBody>
    </Table>
    
    </TableContainer>
    
    
              {/* Edit CAM Button */}
              <Button variant="contained" onClick={() => setIsEditing(true)} style={{ marginTop: '20px' }}>
                Edit CAM
              </Button>
            </div>
          ) : (
            // <form>
            <form onSubmit={handleSave} style={{ display: 'flex', flexWrap: 'wrap', gap: '16px', background: '#808080', padding: '10px' }}>
      {/* First Row (4 items) */}
      <div style={{ flex: '1 1 46%' }}>
        <TextField
          label="Lead ID"
          name="leadId"
          type="string"
          fullWidth
          value={formData.leadId}
          onChange={handleChange}
          disabled
           // Makes the field read-only
        />
      </div>
      <div style={{ flex: '1 1 46%' }}>
        <TextField
          label="Loan No"
          name="loanNo"
          fullWidth
          value={formData.loanNo}
          onChange={handleChange}
          disabled
        />
      </div>
      <div style={{ flex: '1 1 46%' }}>
        <TextField
          label="Salary Date 1"
          name="salaryDate1"
          type="date"
          InputLabelProps={{ shrink: true }}
          fullWidth
          value={formData.salaryDate1}
          onChange={handleChange}
        />
      </div>
      <div style={{ flex: '1 1 46%' }}>
        <TextField
          label="Salary Amount 1"
          name="salaryAmount1"
          type="number"
          fullWidth
          value={formData.salaryAmount1}
          onChange={handleChange}
        />
      </div>
    
      {/* Second Row (4 items) */}
      <div style={{ flex: '1 1 46%' }}>
        <TextField
          label="Salary Date 2"
          name="salaryDate2"
          type="date"
          InputLabelProps={{ shrink: true }}
          fullWidth
          value={formData.salaryDate2}
          onChange={handleChange}
        />
      </div>
      <div style={{ flex: '1 1 46%' }}>
        <TextField
          label="Salary Amount 2"
          name="salaryAmount2"
          type="number"
          fullWidth
          value={formData.salaryAmount2}
          onChange={handleChange}
        />
      </div>
      <div style={{ flex: '1 1 46%' }}>
        <TextField
          label="Salary Date 3"
          name="salaryDate3"
          type="date"
          InputLabelProps={{ shrink: true }}
          fullWidth
          value={formData.salaryDate3}
          onChange={handleChange}
        />
      </div>
      <div style={{ flex: '1 1 46%' }}>
        <TextField
          label="Salary Amount 3"
          name="salaryAmount3"
          type="number"
          fullWidth
          value={formData.salaryAmount3}
          onChange={handleChange}
        />
      </div>
    
      {/* Third Row (4 items) */}
      <div style={{ flex: '1 1 46%' }}>
        <TextField
          label="Next Pay Date"
          name="nextPayDate"
          type="date"
          InputLabelProps={{ shrink: true }}
          fullWidth
          value={formData.nextPayDate}
          onChange={handleChange}
        />
      </div>
      <div style={{ flex: '1 1 46%' }}>
        <TextField
          label="Average Salary"
          name="averageSalary"
          type="number"
          fullWidth
          value={formData.averageSalary}
          onChange={handleChange}
        />
      </div>
      <div style={{ flex: '1 1 46%' }}>
        <TextField
          label="Actual Net Salary"
          name="actualNetSalary"
          type="number"
          fullWidth
          value={formData.actualNetSalary}
          onChange={handleChange}
          required
        />
      </div>
      <div style={{ flex: '1 1 46%' }}>
        <TextField
          label="Credit Bureau Score"
          name="creditBureauScore"
          fullWidth
          // InputProps={{ readOnly: true }}
          disabled
          value={formData.creditBureauScore}
          onChange={handleChange}
        />
      </div>
    
      {/* Fourth Row (4 items) */}
      <div style={{ flex: '1 1 46%' }}>
        <TextField
          label="Customer Type"
          name="customerType"
          fullWidth
          value={formData.customerType}
          onChange={handleChange}
        />
      </div>
      <div style={{ flex: '1 1 46%' }}>
        {/* <TextField
          label="Dedupe Check"
          name="dedupeCheck"
          fullWidth
          value={formData.dedupeCheck}
          onChange={handleChange}
        /> */}
        <FormControl fullWidth>
        <InputLabel id="dedupe-check-label">Dedupe Check</InputLabel>
  <Select
    labelId="dedupe-check-label"
    label="Dedupe Check"
    name="dedupeCheck"
    value={formData.dedupeCheck}
    onChange={handleChange}
  >
    {/* Placeholder option */}
    <MenuItem value="">
      <em>Select Dedupe Check</em>
    </MenuItem>
    {/* Option for Yes */}
    <MenuItem value="Yes">Yes</MenuItem>
    {/* Option for No */}
    <MenuItem value="No">No</MenuItem>
  </Select>
  </FormControl>
      </div>
      <div style={{ flex: '1 1 46%' }}>
        <TextField
          label="Customer Category"
          name="customerCategory"
          fullWidth
          value={formData.customerCategory}
          onChange={handleChange}
          disabled
        />
      </div>
      <div style={{ flex: '1 1 46%' }}>
        <TextField
          label="Repeat Times"
          name="repeatTimes"
          type="number"
          fullWidth
          value={formData.repeatTimes}
          onChange={handleChange}
        />
      </div>
      {/* Fifth Row (4 items) */}
      <div style={{ flex: '1 1 46%' }}>
        <TextField
          label="Obligations (Rs)"
          name="obligations"
          type="number"
          fullWidth
          value={formData.obligations}
          onChange={handleChange}
        />
      </div>
      <div style={{ flex: '1 1 46%' }}>
        <TextField
          label="Eligible salaryToIncomeRatio Percentage"
          name="eligiblesalaryToIncomeRatioPercentage"
          fullWidth
          value={formData.eligiblesalaryToIncomeRatioPercentage}
          onChange={handleChange}
         disabled // Updated from InputProps to slotProps
        />
      </div>
      <div style={{ flex: '1 1 46%' }}>
        <TextField
          label="Eligible Loan"
          name="eligibleLoan"
          type="number"
          fullWidth
          value={formData.eligibleLoan}
          onChange={handleChange}
         disabled // Updated from InputProps to slotProps
        />
      </div>
      <div style={{ flex: '1 1 46%' }}>
        <TextField
          label="Net Disbursal Amount"
          name="netDisbursalAmount"
          type="number"
          fullWidth
          value={formData.netDisbursalAmount}
          onChange={handleChange}
          disabled
        />
      </div>
      {/* New Row (Additional Fields) */}
      <div style={{ flex: '1 1 46%' }}>
        <TextField
          label="Eligible ROI"
          name="eligibleRoi"
          type="string"
          fullWidth
          value={formData.eligibleRoi}
          onChange={handleChange}
          //disabled // Updated from InputProps to slotProps
          disabled
        />
      </div>
      <div style={{ flex: '1 1 46%' }}>
        <TextField
          label="Eligible Admin Fee"
          name="eligibleAdminFee"
          type="string"
          fullWidth
          value={formData.eligibleAdminFee}
          onChange={handleChange}
         disabled // Updated from InputProps to slotProps
        />
      </div>
      <div style={{ flex: '1 1 46%' }}>
        <TextField
          label="Eligible Tenure"
          name="eligibleTenure"
          type="number"
          fullWidth
          value={formData.eligibleTenure}
          onChange={handleChange}
          disabled
        />
      </div>
      <div style={{ flex: '1 1 46%' }}>
        <TextField
          label="Disbursal Date"
          name="disbursalDate"
          type="date"
          InputLabelProps={{ shrink: true }}
          fullWidth
          value={formData.disbursalDate}
          onChange={handleChange}
        />
      </div>
      {/* Sixth Row (More Fields) */}
      <div style={{ flex: '1 1 46%' }}>
        <TextField
          label="Final salaryToIncomeRatio Percentage"
          name="finalsalaryToIncomeRatioPercentage"
          fullWidth
          value={formData.finalsalaryToIncomeRatioPercentage}
          onChange={handleChange}
          disabled
        />
      </div>
      <div style={{ flex: '1 1 46%' }}>
        <TextField
          label="Loan Recommended"
          name="loanRecommended"
          type="number"
          fullWidth
          value={formData.loanRecommended}
          onChange={handleChange}
        />
      </div>
      <div style={{ flex: '1 1 46%' }}>
        <TextField
          label="Admin Fee"
          name="adminFee"
          type="number"
          fullWidth
          value={formData.adminFee}
          onChange={handleChange}
         disabled
        />
      </div>
      <div style={{ flex: '1 1 46%' }}>
        <TextField
          label="Admin Fee GST"
          name="adminFeeGst"
          type="string"
          fullWidth
          value={formData.adminFeeGst}
          onChange={handleChange}
         disabled 
          
          // Updated from InputProps to slotProps
        />
      </div>
      {/* Final Row (More Fields and Buttons) */}
      <div style={{ flex: '1 1 46%' }}>
        <TextField
          label="Admin Fee GST Amount"
          name="adminFeeGstAmount"
          type="number"
          fullWidth
          value={formData.adminFeeGstAmount}
          onChange={handleChange}
         disabled
        />
      </div>
      <div style={{ flex: '1 1 46%' }}>
        <TextField
          label="Total Admin Fee"
          name="totalAdminFee"
          type="number"
          fullWidth
          value={formData.totalAdminFeeAmount}
          onChange={handleChange}
         disabled // Updated from InputProps to slotProps
        />
      </div>
      <div style={{ flex: '1 1 46%' }}>
        <TextField
          label="Repayment Date"
          name="repaymentDate"
          type="date"
          InputLabelProps={{ shrink: true }}
          fullWidth
          value={formData.repaymentDate}
          onChange={handleChange}
          required
          // disabled
        />
      </div>
      <div style={{ flex: '1 1 46%' }}>
        <TextField
          label="Repayment Amount"
          name="repaymentAmount"
          type="number"
          fullWidth
          value={formData.repaymentAmount}
          onChange={handleChange}
          disabled
        />
      </div>
     
      {/* Save and Cancel Buttons */}
      <div style={{ flex: '1 1 100%', marginTop: '20px' }}>
        <Button 
        type="submit"  // Use 'type="submit"' to handle form submit
        variant="contained" 
        color="primary"
        //  onClick={handleSave}
         >
          Save CAM
        </Button>
        <Button
          variant="outlined"
          color="error"
          onClick={handleCancel}
          style={{ marginLeft: '10px' }}
          sx={{
            ':hover': {
              color: 'white',
              backgroundColor: 'red',
            },
          }}
        >
          Cancel
        </Button>
      </div>
    </form>
    
          )}
        </div>)
      }
    </>
  );
};

export default EditableForm;
