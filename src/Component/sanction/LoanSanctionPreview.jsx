import React from 'react';
import {
  Container,
  Table,
  TableBody,
  TableCell,
  TableRow,
  TableContainer,
  Paper,
  Typography,
  Box
} from '@mui/material';

const LoanSanctionPreview = ({
  fullname,
  loanAmount,
  roi,
  sanctionDate,
  repaymentAmount,
  tenureDays,
  repaymentDate,
  penalInterest,
  processingFee,
  repaymentCheques,
  bankName,
  bouncingCharges,
  annualPercentageRate,
  camDetails,
}) => {
  return (
    <Container maxWidth="md" sx={{ padding: '20px', border: '1px solid #ddd', mt: 3 }}>
      {/* Header Section */}
      <Box textAlign="center" mb={3}>
        <img
          src="https://publicramlella.s3.ap-south-1.amazonaws.com/public_assets/Header.jpg"
          alt="Sanctionletter-header"
          width="760"
          height="123"
          style={{ maxWidth: '100%' }}
        />
      </Box>

      {/* Date Section */}
      <Box textAlign="right" mb={2}>
        <Typography variant="h6" sx={{ color: '#0363a3' }}>
          Date: {sanctionDate}
        </Typography>
      </Box>

      {/* Recipient Details */}
      <Typography variant="body1" gutterBottom>
        <strong>To,</strong>
      </Typography>
      <Typography variant="body1" gutterBottom>
        <strong>{camDetails?.title}</strong> {fullname}
      </Typography>
      <Typography variant="body1" gutterBottom>
        {camDetails?.residenceAddress}
      </Typography>
      <Typography variant="body1" gutterBottom>
        <strong>Contact No. :</strong> +91-{camDetails?.mobile}
      </Typography>

      {/* Message Section */}
      <Typography variant="body1" mt={2}>
        Thank you for showing your interest in Only1Loan and giving us an opportunity to serve you.
      </Typography>
      <Typography variant="body1" mb={2}>
        We are pleased to inform you that your loan application has been approved as per the below mentioned terms and conditions.
      </Typography>

      {/* Company Info */}
      <Typography variant="body2" fontWeight="bold" mb={2}>
        Only1Loan, a brand name under Naman Finlease Private Limited (RBI approved NBFC – Reg No.14.01466) S-370, Panchsheel Park, Near Panchsheel Park Metro Station Gate NO. 1, New Delhi- 110017.
      </Typography>

      <Typography variant="body1" mb={2}>
        This sanction will be subject to the following Terms and Conditions:
      </Typography>

      {/* Loan Terms Table */}
      <TableContainer component={Paper}>
        <Table>
          <TableBody>
            <TableRow>
              <TableCell sx={{ backgroundColor: '#0363a3', color: '#FFF', fontWeight: 'bold' }}>
                Customer Name
              </TableCell>
              <TableCell>{fullname}</TableCell>
            </TableRow>
            <TableRow>
              <TableCell sx={{ backgroundColor: '#0363a3', color: '#FFF', fontWeight: 'bold' }}>
                Sanctioned Loan Amount (Rs.)
              </TableCell>
              <TableCell sx={{ color: '#d9534f' }}>{new Intl.NumberFormat().format(loanAmount)} /-</TableCell>
            </TableRow>
            <TableRow>
              <TableCell sx={{ backgroundColor: '#0363a3', color: '#FFF', fontWeight: 'bold' }}>
                Rate of Interest (%) per day
              </TableCell>
              <TableCell sx={{ color: '#5bc0de' }}>{roi}</TableCell>
            </TableRow>
            <TableRow>
              <TableCell sx={{ backgroundColor: '#0363a3', color: '#FFF', fontWeight: 'bold' }}>
                Date of Sanction
              </TableCell>
              <TableCell>{sanctionDate}</TableCell>
            </TableRow>
            <TableRow>
              <TableCell sx={{ backgroundColor: '#0363a3', color: '#FFF', fontWeight: 'bold' }}>
                Total Repayment Amount (Rs.)
              </TableCell>
              <TableCell sx={{ color: '#d9534f' }}>
                {new Intl.NumberFormat().format(repaymentAmount)} /-
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell sx={{ backgroundColor: '#0363a3', color: '#FFF', fontWeight: 'bold' }}>
                Tenure in Days
              </TableCell>
              <TableCell>{tenureDays}</TableCell>
            </TableRow>
            <TableRow>
              <TableCell sx={{ backgroundColor: '#0363a3', color: '#FFF', fontWeight: 'bold' }}>
                Repayment Date
              </TableCell>
              <TableCell>{repaymentDate}</TableCell>
            </TableRow>
            <TableRow>
              <TableCell sx={{ backgroundColor: '#0363a3', color: '#FFF', fontWeight: 'bold' }}>
                Penal Interest (%) per day
              </TableCell>
              <TableCell>{penalInterest}</TableCell>
            </TableRow>
            <TableRow>
              <TableCell sx={{ backgroundColor: '#0363a3', color: '#FFF', fontWeight: 'bold' }}>
                Processing Fee (Rs.)
              </TableCell>
              <TableCell>
                {new Intl.NumberFormat().format(processingFee)} /- (Inclusive of GST)
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell sx={{ backgroundColor: '#0363a3', color: '#FFF', fontWeight: 'bold' }}>
                Repayment Cheque(s)
              </TableCell>
              <TableCell>{repaymentCheques || '-'}</TableCell>
            </TableRow>
            <TableRow>
              <TableCell sx={{ backgroundColor: '#0363a3', color: '#FFF', fontWeight: 'bold' }}>
                Cheque drawn on (name of the Bank)
              </TableCell>
              <TableCell>{bankName || '-'}</TableCell>
            </TableRow>
            <TableRow>
              <TableCell sx={{ backgroundColor: '#0363a3', color: '#FFF', fontWeight: 'bold' }}>
                Cheque and NACH Bouncing Charges (Rs.)
              </TableCell>
              <TableCell>{new Intl.NumberFormat().format(bouncingCharges)} /- per bouncing/dishonour</TableCell>
            </TableRow>
            <TableRow>
              <TableCell sx={{ backgroundColor: '#0363a3', color: '#FFF', fontWeight: 'bold' }}>
                Annual Percentage Rate (%)
              </TableCell>
              <TableCell>{annualPercentageRate}</TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </TableContainer>

      {/* Footer */}
      <Box textAlign="center" mt={3}>
        <img
          src="https://publicramlella.s3.ap-south-1.amazonaws.com/public_assets/Footer.jpg"
          alt="Sanctionletter-footer"
          width="760"
          height="104"
          style={{ maxWidth: '100%' }}
        />
      </Box>
    </Container>
  );
};

export default LoanSanctionPreview;
