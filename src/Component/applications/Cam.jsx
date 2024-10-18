import React, { useEffect, useState } from 'react';
import { Button, TextField,  Table, TableBody, TableCell, TableRow, TableContainer, Paper, Grid2 } from '@mui/material';
import { useGetCamDetailsQuery , useUpdateCamDetailsMutation } from '../../queries/applicationQueries';
import { useParams } from 'react-router-dom';


const EditableForm = () => {
  const { id }= useParams();
  const { data   , isLoading : camGetloading , isError : camGetError  , isSuccess : getCamSuccess } = useGetCamDetailsQuery(id , { skip : id === null});
  // const updatData = useUpdateCamDetailsMutation();
  const [isEditing, setIsEditing] = useState(false);
  // const response = useGetCamDetailsQuery(id, { skip: id === null });  // Fetch data
  const [formData, setFormData] = useState({
    leadId: data?.details?.leadId || 0,
    // Corrected the paths for all fields to access the nested 'details.details'
    loanNo: data?.details?.details?.loanNo || '-',
    salaryDate1: data?.details?.details?.salaryDate1 || '',
    salaryAmount1: data?.details?.details?.salaryAmount1 || 0,
    salaryDate2: data?.details?.details?.salaryDate2 || '',
    salaryAmount2: data?.details?.details?.salaryAmount2 || 0,
    salaryDate3: data?.details?.details?.salaryDate3 || '',
    salaryAmount3: data?.details?.details?.salaryAmount3 || 0,
    nextPayDate: data?.details?.details?.nextPayDate || '',
    averageSalary: data?.details?.details?.averageSalary || 0,
    actualNetSalary: data?.details?.details?.actualNetSalary || 0,
  
    // Keeping these fields from 'details.details'
    creditBureauScore: data?.details?.details?.cibilScore || '-',
    customerType: data?.details?.details?.customerType || 'NEW',
    dedupeCheck: data?.details?.details?.dedupeCheck || 'NO',
    customerCategory: data?.details?.details?.customerCategory || '-',
    repeatTimes: data?.details?.details?.repeatTimes || 0,
    obligations: data?.details?.details?.obligations || 100,
    eligibleFoirPercentage: data?.details?.details?.eligibleFoirPercentage || '0%',
    eligibleLoan: data?.details?.details?.eligibleLoan || 0,
    netDisbursalAmount: data?.details?.details?.netDisbursalAmount || 0,
    eligibleTenure: data?.details?.details?.eligibleTenure || '-',
    disbursalDate: data?.details?.details?.disbursalDate || '-',
    repaymentDate: data?.details?.details?.repaymentDate || '-',
    foir: data?.details?.details?.foir || '0%',
    loanAmount: data?.details?.details?.loanAmount || 0,
    roi: data?.details?.details?.roi || '0%',
    adminFeePercentage: data?.details?.details?.adminFeePercentage || '0%',
    netAdminFeeAmount: data?.details?.details?.netAdminFeeAmount || 0,
    gstPercentage: data?.details?.details?.gstPercentage || '0%',
    totalAdminFeeAmount: data?.details?.details?.totalAdminFeeAmount || 0,
    panelRoi: data?.details?.details?.panelRoi || 0,
    remarks: data?.details?.details?.remarks || '-',
  
    // Additional nested fields
    eligibleRoi: data?.details?.details?.eligibleRoi || '1%',
    eligibleAdminFee: data?.details?.details?.eligibleAdminFee || '10%',
    adminFeeGst: data?.details?.details?.adminFeeGst || '18%',
    adminFeeGstAmount: data?.details?.details?.adminFeeGstAmount || 0,
    finalFoirPercentage: data?.details?.details?.finalFoirPercentage || '0%',
    loanRecommended: data?.details?.details?.loanRecommended || 0,
    repaymentAmount: data?.details?.details?.repaymentAmount || 0,
  });
  
    // Use useEffect to update formData once data is fetched
    useEffect(() => {
      if (isSuccess && data?.details) {
        const details = data.details.details;  // Access the deeply nested object
        setFormData({
          leadId: data.details?.leadId || 0,
          loanNo: data.details?.details?.loanNo || '-',
          salaryDate1: details?.salaryDate1 || '',
          salaryAmount1: details?.salaryAmount1 || 0,
          salaryDate2: details?.salaryDate2 || '',
          salaryAmount2: details?.salaryAmount2 || 0,
          salaryDate3: details?.salaryDate3 || '',
          salaryAmount3: details?.salaryAmount3 || 0,
          nextPayDate: details?.nextPayDate || '',
          averageSalary: details?.averageSalary || 0,
          actualNetSalary: details?.actualNetSalary || 0,
          creditBureauScore: details?.cibilScore || '-',
          customerType: details?.customerType || 'NEW',
          dedupeCheck: details?.dedupeCheck || 'NO',
          customerCategory: details?.customerCategory || '-',
          repeatTimes: details?.repeatTimes || 0,
          obligations: details?.obligations || 100,
          eligibleFoirPercentage: details?.eligibleFoirPercentage || '0%',
          eligibleLoan: details?.eligibleLoan || 0,
          netDisbursalAmount: details?.netDisbursalAmount || 0,
          eligibleTenure: data.details?.details?.eligibleTenure || '-',
          disbursalDate: details?.disbursalDate || '-',
          repaymentDate: details?.repaymentDate || '-',
          foir: details?.foir || '0%',
          loanAmount: details?.loanAmount || 0,
          roi: details?.roi || '0%',
          adminFeePercentage: details?.adminFeePercentage || '0%',
          netAdminFeeAmount: details?.netAdminFeeAmount || 0,
          gstPercentage: details?.gstPercentage || '0%',
          totalAdminFeeAmount: details?.totalAdminFeeAmount || 0,
          panelRoi: details?.panelRoi || 0,
          remarks: details?.remarks || '-',
          // Missing fields added
          eligibleRoi: details?.eligibleRoi || '1%',
          eligibleAdminFee: details?.eligibleAdminFee || '10%',
          adminFeeGst: details?.adminFeeGst || '18%',
          adminFeeGstAmount: details?.adminFeeGstAmount || 0,
          finalFoirPercentage: details?.finalFoirPercentage || '0%',
          loanRecommended: details?.loanRecommended || 0,
          repaymentAmount: details?.repaymentAmount || 0,
        });
  
        // setFormData({
        //   leadId: data?.details?.leadId || 0,
        //   loanNo: data?.details?.loanNo || '-',
        //   salaryDate1: data?.details?.salaryDate1 || '',
        //   salaryAmount1: data?.details?.salaryAmount1 || 0,
        //   salaryDate2: data?.details?.salaryDate2 || '',
        //   salaryAmount2: data?.details?.salaryAmount2 || 0,
        //   salaryDate3: data?.details?.salaryDate3 || '',
        //   salaryAmount3: data?.details?.salaryAmount3 || 0,
        //   nextPayDate: data?.details?.nextPayDate || '',
        //   averageSalary: data?.details?.averageSalary || 0,
        //   actualNetSalary: data?.details?.actualNetSalary || 0,
        //   creditBureauScore: data?.details?.details?.cibilScore || '-',
        //   customerType: data?.details?.customerType || 'NEW',
        //   dedupeCheck: data?.details?.dedupeCheck || 'NO',
        //   customerCategory: data?.details?.customerCategory || '-',
        //   repeatTimes: data?.details?.repeatTimes || 0,
        //   obligations: data?.details?.obligations || 100,
        //   eligibleFoirPercentage: data?.details?.eligibleFoirPercentage || '0%',
        //   eligibleLoan: data?.details?.eligibleLoan || 0,
        //   netDisbursalAmount: data?.details?.netDisbursalAmount || 0,
        //   eligibleTenure: data?.details?.eligibleTenure || '-',
        //   disbursalDate: data?.details?.disbursalDate || '-',
        //   repaymentDate: data?.details?.repaymentDate || '-',
        //   foir: data?.details?.foir || '0%',
        //   loanAmount: data?.details?.loanAmount || 0,
        //   roi: data?.details?.roi || '0%',
        //   adminFeePercentage: data?.details?.adminFeePercentage || '0%',
        //   netAdminFeeAmount: data?.details?.netAdminFeeAmount || 0,
        //   gstPercentage: data?.details?.gstPercentage || '0%',
        //   totalAdminFeeAmount: data?.details?.totalAdminFeeAmount || 0,
        //   panelRoi: data?.details?.panelRoi || 0,
        //   remarks: data?.details?.remarks || '-',
        //   // Missing fields added
        //   eligibleRoi: data?.details?.eligibleRoi || '1%',
        //   eligibleAdminFee: data?.details?.eligibleAdminFee || '10%',
        //   adminFeeGst: data?.details?.adminFeeGst || '18%',
        //   adminFeeGstAmount: data?.details?.adminFeeGstAmount || 0,
        //   finalFoirPercentage: data?.details?.finalFoirPercentage || '0%',
        //   loanRecommended: data?.details?.loanRecommended || 0,
        //   repaymentAmount: data?.details?.repaymentAmount || 0,
        // });
      }
    }, [getCamSuccess, data]);  // Re-run the effect when `isSuccess` or `data` changes
  

  // helperText={errorMessage}
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
        const finalFoirPercentage = prevFormData.actualNetSalary 
          ? (recommendedLoan / prevFormData.actualNetSalary) * 100 
          : 0;
        // Add calculated fields to updatedFormData
        updatedFormData.finalFoirPercentage = `${finalFoirPercentage.toFixed(2)}%`;
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
  

  const handleSave = async(e) => {
    console.log("the form data is ",formData)
    // Add save logic here
    e.preventDefault();
    try {
      // Call the mutation function with necessary data
      await updateCamDetails({
        id: id, // ID of the CAM (assuming this is passed as a prop)
        updates: formData  // The updated data from the form
      }).unwrap();

      // Handle success or do further actions, like showing a notification
      console.log('Update successful');
    } catch (error) {
      // Handle error, maybe show an error message
      console.error('Error updating CAM details:', error);
    }

    console.log('Form data saved:', formData);
    setIsEditing(false);
  };

  const handleCancel = () => {
    setIsEditing(false);
  };

    console.log(data)
  // if (response.isLoading) {
  //   return <div>Loading...</div>;
  // }


  // Function to calculate the FOIR percentage based on the actual net salary
  const calculateFoir = (salary) => {
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

  // Function to calculate the eligible loan based on the actual net salary and FOIR
  const calculateEligibleLoan = (salary, foirPercentage) => {

    
    const foirDecimal = parseFloat(foirPercentage) / 100;
    return salary * foirDecimal;
  };

  // UseEffect to calculate FOIR whenever the actualNetSalary changes
  useEffect(() => {
    const foirPercentage = calculateFoir(formData.actualNetSalary);
    const eligibleLoan = calculateEligibleLoan(formData.actualNetSalary, foirPercentage);
    setFormData((prevData) => ({
      ...prevData,
      eligibleFoirPercentage: foirPercentage,
      eligibleLoan: eligibleLoan,
    }));
  }, [formData.actualNetSalary]);
  

  return (
    <div>
      {!isEditing ? (
        <div>
          {/* Display the table with data */}
          <TableContainer component={Paper}>
          <Table>
  <TableBody>
    <TableRow>
      <TableCell>Lead Id</TableCell>
      <TableCell>{formData.leadId}</TableCell>
      <TableCell>Loan No</TableCell>
      <TableCell>{formData.loanNo}</TableCell>
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
      <TableCell>Actual Net Salary</TableCell>
      <TableCell>{formData.actualNetSalary}</TableCell>
      <TableCell>Credit Bureau Score</TableCell>
      <TableCell>{formData.creditBureauScore}</TableCell>
    </TableRow>
    <TableRow>
      <TableCell>Customer Type</TableCell>
      <TableCell>{formData.customerType}</TableCell>
      <TableCell>Dedupe Check</TableCell>
      <TableCell>{formData.dedupeCheck}</TableCell>
    </TableRow>
    <TableRow>
      <TableCell>Obligations (Rs)</TableCell>
      <TableCell>{formData.obligations}</TableCell>
      <TableCell>Eligible FOIR</TableCell>
      <TableCell>{formData.eligibleFoirPercentage}</TableCell>
    </TableRow>
    <TableRow>
      <TableCell>Eligible Loan Amount</TableCell>
      <TableCell>{formData.eligibleLoan}</TableCell>
      <TableCell>Net Disbursal</TableCell>
      <TableCell>{formData.netDisbursalAmount}</TableCell>
    </TableRow>
    <TableRow>
      <TableCell>Tenure</TableCell>
      <TableCell>{formData.eligibleTenure}</TableCell>
      <TableCell>Disbursal Date</TableCell>
      <TableCell>{formData.disbursalDate}</TableCell>
    </TableRow>
    <TableRow>
      <TableCell>Repayment Date</TableCell>
      <TableCell>{formData.repaymentDate}</TableCell>
      <TableCell>FOIR</TableCell>
      <TableCell>{formData.foir}</TableCell>
    </TableRow>
    <TableRow>
      <TableCell>Loan Amount</TableCell>
      <TableCell>{formData.loanAmount}</TableCell>
      <TableCell>ROI</TableCell>
      <TableCell>{formData.roi}</TableCell>
    </TableRow>
    <TableRow>
      <TableCell>Admin Fee (%)</TableCell>
      <TableCell>{formData.adminFeePercentage}</TableCell>
      <TableCell>Net Admin Fee Amount</TableCell>
      <TableCell>{formData.netAdminFeeAmount}</TableCell>
    </TableRow>
    <TableRow>
      <TableCell>GST (%)</TableCell>
      <TableCell>{formData.gstPercentage}</TableCell>
      <TableCell>Total Admin Fee Amount</TableCell>
      <TableCell>{formData.totalAdminFeeAmount}</TableCell>
    </TableRow>
    <TableRow>
      <TableCell>Panel ROI</TableCell>
      <TableCell>{formData.panelRoi}</TableCell>
      <TableCell>Remarks</TableCell>
      <TableCell>{formData.remarks}</TableCell>
    </TableRow>

    {/* Added Missing Fields */}
    <TableRow>
      <TableCell>Eligible ROI</TableCell>
      <TableCell>{formData.eligibleRoi}</TableCell>
      <TableCell>Eligible Admin Fee</TableCell>
      <TableCell>{formData.eligibleAdminFee}</TableCell>
    </TableRow>
    <TableRow>
      <TableCell>Admin Fee GST</TableCell>
      <TableCell>{formData.adminFeeGst}</TableCell>
      <TableCell>Admin Fee GST Amount</TableCell>
      <TableCell>{formData.adminFeeGstAmount}</TableCell>
    </TableRow>
    <TableRow>
      <TableCell>Final FOIR Percentage</TableCell>
      <TableCell>{formData.finalFoirPercentage}</TableCell>
      <TableCell>Loan Recommended</TableCell>
      <TableCell>{formData.loanRecommended}</TableCell>
    </TableRow>
    <TableRow>
      <TableCell>Repayment Amount</TableCell>
      <TableCell>{formData.repaymentAmount}</TableCell>
    </TableRow>

    {/* Additional missing fields based on your formData object */}
    <TableRow>
      <TableCell>Eligible Tenure</TableCell>
      <TableCell>{formData.eligibleTenure}</TableCell>
      <TableCell>Eligible FOIR Percentage</TableCell>
      <TableCell>{formData.eligibleFoirPercentage}</TableCell>
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
        <form style={{ display: 'flex', flexWrap: 'wrap', gap: '16px', background: '#808080', padding: '10px' }}>
  {/* First Row (4 items) */}
  <div style={{ flex: '1 1 46%' }}>
    <TextField
      label="Lead ID"
      name="leadId"
      type="number"
      fullWidth
      value={formData.leadId}
      onChange={handleChange}
      InputProps={{ readOnly: true }} // Makes the field read-only
    />
  </div>
  <div style={{ flex: '1 1 46%' }}>
    <TextField
      label="Loan No"
      name="loanNo"
      fullWidth
      value={formData.loanNo}
      onChange={handleChange}
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
    />
  </div>
  <div style={{ flex: '1 1 46%' }}>
    <TextField
      label="Credit Bureau Score"
      name="creditBureauScore"
      fullWidth
      InputProps={{ readOnly: true }}
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
    <TextField
      label="Dedupe Check"
      name="dedupeCheck"
      fullWidth
      value={formData.dedupeCheck}
      onChange={handleChange}
    />
  </div>
  <div style={{ flex: '1 1 46%' }}>
    <TextField
      label="Customer Category"
      name="customerCategory"
      fullWidth
      value={formData.customerCategory}
      onChange={handleChange}
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
      label="Eligible FOIR Percentage"
      name="eligibleFoirPercentage"
      fullWidth
      value={formData.eligibleFoirPercentage}
      onChange={handleChange}
      slotProps={{ input: { readOnly: true } }} // Updated from InputProps to slotProps
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
      slotProps={{ input: { readOnly: true } }} // Updated from InputProps to slotProps
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
      slotProps={{ input: { readOnly: true } }} // Updated from InputProps to slotProps
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
      slotProps={{ input: { readOnly: true } }} // Updated from InputProps to slotProps
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
      label="Final FOIR Percentage"
      name="finalFoirPercentage"
      fullWidth
      value={formData.finalFoirPercentage}
      onChange={handleChange}
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
      // helperText={errorMessage}
      helperText={errorMessage}
      error={!!errorMessage} // Mark the field as error if there's an error message
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
      slotProps={{ input: { readOnly: true } }}
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
      slotProps={{ input: { readOnly: true } }} 
      
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
      slotProps={{ input: { readOnly: true } }}
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
      slotProps={{ input: { readOnly: true } }} // Updated from InputProps to slotProps
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
    />
  </div>
  <div style={{ flex: '1 1 100%' }}>
    <TextField
      label="Remarks"
      name="remarks"
      fullWidth
      value={formData.remarks}
      onChange={handleChange}
    />
  </div>

  {/* Save and Cancel Buttons */}
  <div style={{ flex: '1 1 100%', marginTop: '20px' }}>
    <Button variant="contained" color="primary" onClick={handleSave}>
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
    </div>
  );
};

export default EditableForm;
