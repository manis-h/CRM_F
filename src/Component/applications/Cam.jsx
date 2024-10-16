// import React, { useEffect, useState } from 'react';
// import { Button, TextField,  Table, TableBody, TableCell, TableRow, TableContainer, Paper, Grid2 } from '@mui/material';
// import { useGetCamDetailsQuery , useUpdateCamDetailsMutation } from '../../queries/applicationQueries';
// import { useParams } from 'react-router-dom';


// const EditableForm = () => {
//   const { id }= useParams();
//   const { data  } = useGetCamDetailsQuery(id , { skip : id === null});
//   const [isEditing, setIsEditing] = useState(false);
//   // const response = useGetCamDetailsQuery(id, { skip: id === null });  // Fetch data
//   const [formData, setFormData] = useState({
//     leadId: data?.details?.leadId,
//     loanNo: '-',
//     salaryDate1: '',
//     salaryAmount1: 0,
//     salaryDate2: '',
//     salaryAmount2: 0,
//     salaryDate3: '',
//     salaryAmount3: 0,
//     nextPayDate: '',
//     averageSalary: 0,
//     actualNetSalary: 0,
//     creditBureauScore: data?.details?.details?.cibilScore || '-',
//     customerType: 'NEW',
//     dedupeCheck: 'NO',
//     customerCategory: '-',
//     repeatTimes: 0,
//     obligations: 100,
//     eligibleFoirPercentage: '0%',
//     eligibleLoan: 0,
//     netDisbursalAmount: 0,
//     eligibleTenure: '-',
//     disbursalDate: '-',
//     repaymentDate: '-',
//     foir: '0%',
//     loanAmount: 0,
//     roi: '0%',
//     adminFeePercentage: '0%',
//     netAdminFeeAmount: 0,
//     gstPercentage: '0%',
//     totalAdminFeeAmount: 0,
//     panelRoi: 0,
//     remarks: '-'
//   });

  
  
//   // useEffect(() => {
//   //   if (response.isSuccess && response.data) {
//   //     setFormData({
//   //       ...formData,
//   //       leadId: response.data.details.leadId || "",
//   //       // Add other fields similarly
//   //     });
//   //   }
//   // }, [response.isSuccess, response.data]);
  

//   const handleChange = (e) => {
//     setFormData({
//       ...formData,
//       [e.target.name]: e.target.value,
//     });
//   };

//   // console.log("The data is ",response.data.details.leadId);

//   useEffect( ()=>{
//     //  console.log("The data is ",response);
//   } ,[])

//   const handleSave = () => {
//     // Add save logic here
//     console.log('Form data saved:', formData);
//     setIsEditing(false);
//   };

//   const handleCancel = () => {
//     setIsEditing(false);
//   };

//     console.log(data)
//   // if (response.isLoading) {
//   //   return <div>Loading...</div>;
//   // }
  

//   return (
//     <div>
//       {!isEditing ? (
//         <div>
//           {/* Display the table with data */}
//           <TableContainer component={Paper}>
//             <Table>
//               <TableBody>
//                 <TableRow>
//                   <TableCell>Lead Id</TableCell>
//                   <TableCell>{formData.leadId}</TableCell>
//                   <TableCell>Loan No</TableCell>
//                   <TableCell>{formData.loanNo}</TableCell>
//                 </TableRow>
//                 <TableRow>
//                   <TableCell>Salary Date 1</TableCell>
//                   <TableCell>{formData.salaryDate1 || '-'}</TableCell>
//                   <TableCell>Salary Amount 1</TableCell>
//                   <TableCell>{formData.salaryAmount1}</TableCell>
//                 </TableRow>
//                 <TableRow>
//                   <TableCell>Salary Date 2</TableCell>
//                   <TableCell>{formData.salaryDate2 || '-'}</TableCell>
//                   <TableCell>Salary Amount 2</TableCell>
//                   <TableCell>{formData.salaryAmount2}</TableCell>
//                 </TableRow>
//                 <TableRow>
//                   <TableCell>Salary Date 3</TableCell>
//                   <TableCell>{formData.salaryDate3 || '-'}</TableCell>
//                   <TableCell>Salary Amount 3</TableCell>
//                   <TableCell>{formData.salaryAmount3}</TableCell>
//                 </TableRow>
//                 <TableRow>
//                   <TableCell>Next Salary Date</TableCell>
//                   <TableCell>{formData.nextPayDate || '-'}</TableCell>
//                   <TableCell>Median Salary Amount</TableCell>
//                   <TableCell>{formData.averageSalary}</TableCell>
//                 </TableRow>
//                 <TableRow>
//                   <TableCell>Actual Net Salary</TableCell>
//                   <TableCell>{formData.actualNetSalary}</TableCell>
//                   <TableCell>Credit Bureau Score</TableCell>
//                   <TableCell>{formData.creditBureauScore}</TableCell>
//                 </TableRow>
//                 <TableRow>
//                   <TableCell>Customer Type</TableCell>
//                   <TableCell>{formData.customerType}</TableCell>
//                   <TableCell>Dedupe Check</TableCell>
//                   <TableCell>{formData.dedupeCheck}</TableCell>
//                 </TableRow>
//                 <TableRow>
//                   <TableCell>Obligations (Rs)</TableCell>
//                   <TableCell>{formData.obligations}</TableCell>
//                   <TableCell>Eligible FOIR</TableCell>
//                   <TableCell>{formData.eligibleFoirPercentage}</TableCell>
//                 </TableRow>
//                 <TableRow>
//                   <TableCell>Eligible Loan Amount</TableCell>
//                   <TableCell>{formData.eligibleLoan}</TableCell>
//                   <TableCell>Net Disbursal</TableCell>
//                   <TableCell>{formData.netDisbursalAmount}</TableCell>
//                 </TableRow>
//                 <TableRow>
//                   <TableCell>Tenure</TableCell>
//                   <TableCell>{formData.eligibleTenure}</TableCell>
//                   <TableCell>Disbursal Date</TableCell>
//                   <TableCell>{formData.disbursalDate}</TableCell>
//                 </TableRow>
//                 <TableRow>
//                   <TableCell>Repayment Date</TableCell>
//                   <TableCell>{formData.repaymentDate}</TableCell>
//                   <TableCell>FOIR</TableCell>
//                   <TableCell>{formData.foir}</TableCell>
//                 </TableRow>
//                 <TableRow>
//                   <TableCell>Loan Amount</TableCell>
//                   <TableCell>{formData.loanAmount}</TableCell>
//                   <TableCell>ROI</TableCell>
//                   <TableCell>{formData.roi}</TableCell>
//                 </TableRow>
//                 <TableRow>
//                   <TableCell>Admin Fee (%)</TableCell>
//                   <TableCell>{formData.adminFeePercentage}</TableCell>
//                   <TableCell>Net Admin Fee Amount</TableCell>
//                   <TableCell>{formData.netAdminFeeAmount}</TableCell>
//                 </TableRow>
//                 <TableRow>
//                   <TableCell>GST (%)</TableCell>
//                   <TableCell>{formData.gstPercentage}</TableCell>
//                   <TableCell>Total Admin Fee Amount</TableCell>
//                   <TableCell>{formData.totalAdminFeeAmount}</TableCell>
//                 </TableRow>
//                 <TableRow>
//                   <TableCell>Panel ROI</TableCell>
//                   <TableCell>{formData.panelRoi}</TableCell>
//                   <TableCell>Remarks</TableCell>
//                   <TableCell>{formData.remarks}</TableCell>
//                 </TableRow>
//               </TableBody>
//             </Table>
//           </TableContainer>

//           {/* Edit CAM Button */}
//           <Button variant="contained" onClick={() => setIsEditing(true)} style={{ marginTop: '20px' }}>
//             Edit CAM
//           </Button>
//         </div>
//       ) : (
//         // <form>
//          <form style={{ display: 'flex', flexWrap: 'wrap', gap: '16px' , background : "#808080" , padding : '10px'}}>
//       {/* First Row (4 items) */}
//       <div style={{ flex: '1 1 25%' }}>
//       <TextField
//               label="Lead ID"
//               name="leadId"
//               type="number"
//               fullWidth
//               value={formData.leadId} // Correctly placed value prop
//               onChange={handleChange}
//               InputProps={{
//                 readOnly: true, // This makes the field read-only
//               }}
//             />


//       </div>
//       <div style={{ flex: '1 1 25%' }}>
//         <TextField
//           label="Loan No"
//           name="loanNo"
//           fullWidth
//           value={formData.loanNo}
//           onChange={handleChange}
//         />
//       </div>
//       <div style={{ flex: '1 1 25%' }}>
//         <TextField
//           label="Salary Date 1"
//           name="salaryDate1"
//           type="date"
//           InputLabelProps={{ shrink: true }}
//           fullWidth
//           value={formData.salaryDate1}
//           onChange={handleChange}
//         />
//       </div>
//       <div style={{ flex: '1 1 25%' }}>
//         <TextField
//           label="Salary Amount 1"
//           name="salaryAmount1"
//           type="number"
//           fullWidth
//           value={formData.salaryAmount1}
//           onChange={handleChange}
//         />
//       </div>

//       {/* Second Row (4 items) */}
//       <div style={{ flex: '1 1 25%' }}>
//         <TextField
//           label="Salary Date 2"
//           name="salaryDate2"
//           type="date"
//           InputLabelProps={{ shrink: true }}
//           fullWidth
//           value={formData.salaryDate2}
//           onChange={handleChange}
//         />
//       </div>
//       <div style={{ flex: '1 1 25%' }}>
//         <TextField
//           label="Salary Amount 2"
//           name="salaryAmount2"
//           type="number"
//           fullWidth
//           value={formData.salaryAmount2}
//           onChange={handleChange}
//         />
//       </div>
//       <div style={{ flex: '1 1 25%' }}>
//         <TextField
//           label="Salary Date 3"
//           name="salaryDate3"
//           type="date"
//           InputLabelProps={{ shrink: true }}
//           fullWidth
//           value={formData.salaryDate3}
//           onChange={handleChange}
//         />
//       </div>
//       <div style={{ flex: '1 1 25%' }}>
//         <TextField
//           label="Salary Amount 3"
//           name="salaryAmount3"
//           type="number"
//           fullWidth
//           value={formData.salaryAmount3}
//           onChange={handleChange}
//         />
//       </div>

//       {/* Third Row (4 items) */}
//       <div style={{ flex: '1 1 25%' }}>
//         <TextField
//           label="Next Pay Date"
//           name="nextPayDate"
//           type="date"
//           InputLabelProps={{ shrink: true }}
//           fullWidth
//           value={formData.nextPayDate}
//           onChange={handleChange}
//         />
//       </div>
//       <div style={{ flex: '1 1 25%' }}>
//         <TextField
//           label="Average Salary"
//           name="averageSalary"
//           type="number"
//           fullWidth
//           value={formData.averageSalary}
//           onChange={handleChange}
//         />
//       </div>
//       <div style={{ flex: '1 1 25%' }}>
//         <TextField
//           label="Actual Net Salary"
//           name="actualNetSalary"
//           type="number"
//           fullWidth
//           value={formData.actualNetSalary}
//           onChange={handleChange}
//         />
//       </div>
//       <div style={{ flex: '1 1 25%' }}>
//         <TextField
//           label="Credit Bureau Score"
//           name="creditBureauScore"
//           fullWidth
//           InputProps={{ readOnly: true }} // Makes the TextField read-only
//           value={formData.creditBureauScore}
//           onChange={handleChange}
//         />
//       </div>

//       {/* Fourth Row (4 items) */}
//       <div style={{ flex: '1 1 25%' }}>
//         <TextField
//           label="Customer Type"
//           name="customerType"
//           fullWidth
//           value={formData.customerType}
//           onChange={handleChange}
//         />
//       </div>
//       <div style={{ flex: '1 1 25%' }}>
//         <TextField
//           label="Dedupe Check"
//           name="dedupeCheck"
//           fullWidth
//           value={formData.dedupeCheck}
//           onChange={handleChange}
//         />
//       </div>
//       <div style={{ flex: '1 1 25%' }}>
//         <TextField
//           label="Customer Category"
//           name="customerCategory"
//           fullWidth
//           value={formData.customerCategory}
//           onChange={handleChange}
//         />
//       </div>
//       <div style={{ flex: '1 1 25%' }}>
//         <TextField
//           label="Repeat Times"
//           name="repeatTimes"
//           type="number"
//           fullWidth
//           value={formData.repeatTimes}
//           onChange={handleChange}
//         />
//       </div>

//       {/* Fifth Row (4 items) */}
//       <div style={{ flex: '1 1 25%' }}>
//         <TextField
//           label="Obligations (Rs)"
//           name="obligations"
//           type="number"
//           fullWidth
//           value={formData.obligations}
//           onChange={handleChange}
//         />
//       </div>
//       <div style={{ flex: '1 1 25%' }}>
//         <TextField
//           label="Eligible FOIR Percentage"
//           name="eligibleFoirPercentage"
//           fullWidth
//           value={formData.eligibleFoirPercentage}
//           onChange={handleChange}
//         />
//       </div>
//       <div style={{ flex: '1 1 25%' }}>
//         <TextField
//           label="Eligible Loan"
//           name="eligibleLoan"
//           type="number"
//           fullWidth
//           value={formData.eligibleLoan}
//           onChange={handleChange}
//         />
//       </div>
//       <div style={{ flex: '1 1 25%' }}>
//         <TextField
//           label="Net Disbursal Amount"
//           name="netDisbursalAmount"
//           type="number"
//           fullWidth
//           value={formData.netDisbursalAmount}
//           onChange={handleChange}
//         />
//       </div>





//           {/* Save and Cancel Buttons */}
//           <div style={{ flex: '1 1 75%'  , marginTop: '20px' }}>
//             <Button variant="contained" color="primary" onClick={handleSave}>
//               Save CAM
//             </Button>
//             <Button
//   variant="outlined"
//   color="error"
//   onClick={handleCancel}
//   style={{ marginLeft: '10px' }}
//   sx={{
//     ':hover': {
//       color: 'white', // Change text color to white on hover
//       backgroundColor: 'red' // Change background color to red on hover
//     }
//   }}
// >
//   Cancel
// </Button>

//           </div>
//         </form>
//       )}
//     </div>
//   );
// };

// export default EditableForm;

import React, { useEffect, useState } from 'react';
import { Button, TextField, Table, TableBody, TableCell, TableRow, TableContainer, Paper } from '@mui/material';
import { useGetCamDetailsQuery } from '../../queries/applicationQueries';
import { useParams } from 'react-router-dom';

const EditableForm = () => {
  const { id } = useParams();
  const { data, isLoading, isError } = useGetCamDetailsQuery(id, { skip: !id });

  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({
    leadId: '',
    loanNo: '-',
    salaryDate1: '',
    salaryAmount1: 0,
    // other form fields
  });

  // Update formData when data is fetched
  useEffect(() => {
    if (data && data.details) {
      setFormData((prevFormData) => ({
        ...prevFormData,
        leadId: data.details.leadId || '',  // Ensure leadId is populated
        // Populate other fields as necessary
      }));
    }
  }, [data]);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSave = () => {
    console.log('Form data saved:', formData);
    setIsEditing(false);
  };

  const handleCancel = () => {
    setIsEditing(false);
  };

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (isError) {
    return <div>Error fetching data!</div>;
  }

  return (
    <div>
      {!isEditing ? (
        <div>
          <TableContainer component={Paper}>
            <Table>
              <TableBody>
                <TableRow>
                  <TableCell>Lead Id</TableCell>
                  <TableCell>{formData.leadId || '-'}</TableCell>
                  <TableCell>Loan No</TableCell>
                  <TableCell>{formData.loanNo}</TableCell>
                </TableRow>
              </TableBody>
            </Table>
          </TableContainer>

          <Button variant="contained" onClick={() => setIsEditing(true)} style={{ marginTop: '20px' }}>
            Edit CAM
          </Button>
        </div>
      ) : (
        // <form style={{ display: 'flex', flexWrap: 'wrap', gap: '16px', background: '#808080', padding: '10px' }}>
        //   {/* Lead ID field */}
        //   <div style={{ flex: '1 1 25%' }}>
        //     <TextField
        //       label="Lead ID"
        //       name="leadId"
        //       type="number"
        //       fullWidth
        //       value={formData.leadId || ''}  // Ensure value is never undefined
        //       onChange={handleChange}
        //       InputProps={{
        //         readOnly: true,  // Read-only field
        //       }}
        //     />
        //   </div>

        //   {/* Add other form fields as necessary */}
          
        //   <div style={{ flex: '1 1 75%', marginTop: '20px' }}>
        //     <Button variant="contained" color="primary" onClick={handleSave}>
        //       Save CAM
        //     </Button>
        //     <Button
        //       variant="outlined"
        //       color="error"
        //       onClick={handleCancel}
        //       style={{ marginLeft: '10px' }}
        //       sx={{
        //         ':hover': {
        //           color: 'white',
        //           backgroundColor: 'red',
        //         },
        //       }}
        //     >
        //       Cancel
        //     </Button>
        //   </div>
        // </form>

        <form style={{ display: 'flex', flexWrap: 'wrap', gap: '16px', background: '#808080', padding: '10px' }}>
      {/* First Row (4 items) */}
      <div style={{ flex: '1 1 25%' }}>
      <TextField
              label="Lead ID"
              name="leadId"
              type="number"
              fullWidth
              value={formData.leadId} // Correctly placed value prop
              onChange={handleChange}
              InputProps={{
                readOnly: true, // This makes the field read-only
              }}
            />


      </div>
      <div style={{ flex: '1 1 25%' }}>
        <TextField
          label="Loan No"
          name="loanNo"
          fullWidth
          value={formData.loanNo}
          onChange={handleChange}
        />
      </div>
      <div style={{ flex: '1 1 25%' }}>
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
      <div style={{ flex: '1 1 25%' }}>
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
      <div style={{ flex: '1 1 25%' }}>
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
      <div style={{ flex: '1 1 25%' }}>
        <TextField
          label="Salary Amount 2"
          name="salaryAmount2"
          type="number"
          fullWidth
          value={formData.salaryAmount2}
          onChange={handleChange}
        />
      </div>
      <div style={{ flex: '1 1 25%' }}>
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
      <div style={{ flex: '1 1 25%' }}>
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
      <div style={{ flex: '1 1 25%' }}>
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
      <div style={{ flex: '1 1 25%' }}>
        <TextField
          label="Average Salary"
          name="averageSalary"
          type="number"
          fullWidth
          value={formData.averageSalary}
          onChange={handleChange}
        />
      </div>
      <div style={{ flex: '1 1 25%' }}>
        <TextField
          label="Actual Net Salary"
          name="actualNetSalary"
          type="number"
          fullWidth
          value={formData.actualNetSalary}
          onChange={handleChange}
        />
      </div>
      <div style={{ flex: '1 1 25%' }}>
        <TextField
          label="Credit Bureau Score"
          name="creditBureauScore"
          fullWidth
          InputProps={{ readOnly: true }} // Makes the TextField read-only
          value={formData.creditBureauScore}
          onChange={handleChange}
        />
      </div>

      {/* Fourth Row (4 items) */}
      <div style={{ flex: '1 1 25%' }}>
        <TextField
          label="Customer Type"
          name="customerType"
          fullWidth
          value={formData.customerType}
          onChange={handleChange}
        />
      </div>
      <div style={{ flex: '1 1 25%' }}>
        <TextField
          label="Dedupe Check"
          name="dedupeCheck"
          fullWidth
          value={formData.dedupeCheck}
          onChange={handleChange}
        />
      </div>
      <div style={{ flex: '1 1 25%' }}>
        <TextField
          label="Customer Category"
          name="customerCategory"
          fullWidth
          value={formData.customerCategory}
          onChange={handleChange}
        />
      </div>
      <div style={{ flex: '1 1 25%' }}>
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
      <div style={{ flex: '1 1 25%' }}>
        <TextField
          label="Obligations (Rs)"
          name="obligations"
          type="number"
          fullWidth
          value={formData.obligations}
          onChange={handleChange}
        />
      </div>
      <div style={{ flex: '1 1 25%' }}>
        <TextField
          label="Eligible FOIR Percentage"
          name="eligibleFoirPercentage"
          fullWidth
          value={formData.eligibleFoirPercentage}
          onChange={handleChange}
        />
      </div>
      <div style={{ flex: '1 1 25%' }}>
        <TextField
          label="Eligible Loan"
          name="eligibleLoan"
          type="number"
          fullWidth
          value={formData.eligibleLoan}
          onChange={handleChange}
        />
      </div>
      <div style={{ flex: '1 1 25%' }}>
        <TextField
          label="Net Disbursal Amount"
          name="netDisbursalAmount"
          type="number"
          fullWidth
          value={formData.netDisbursalAmount}
          onChange={handleChange}
        />
      </div>





          {/* Save and Cancel Buttons */}
          <div style={{ flex: '1 1 75%'  , marginTop: '20px' }}>
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
      color: 'white', // Change text color to white on hover
      backgroundColor: 'red' // Change background color to red on hover
    }
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

