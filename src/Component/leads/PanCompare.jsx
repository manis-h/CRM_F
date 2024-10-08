import React, { useEffect } from "react";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Typography,
  Box,
} from "@mui/material";
import CheckCircleOutlineIcon from "@mui/icons-material/CheckCircleOutline";
import HighlightOffIcon from "@mui/icons-material/HighlightOff";
import useStore from "../../Store";
import { useVerifyPanMutation } from "../../Service/Query";

const PanCompare = ({ open, setOpen, panDetails }) => {

  const {lead} = useStore()

  const [verifyPan,{data,isSuccess,isError,error}] = useVerifyPanMutation()



   const compareValues = (value1, value2) => (value1 === value2 ? "Matched" : "Unmatched");

   const getTextColor = (result) => (result === "Matched" ? "#00796b" : "#d32f2f");

   // Fields to be compared
   const comparisonFields = [
    { label: "Name", leadValue: `${lead?.fName} ${lead?.mName} ${lead?.lName}`, panValue: panDetails?.FULLNAME },
    { label: "DOB", leadValue: lead?.dob, panValue: panDetails?.DOB },
  ];
  const handleClose = () => {
    setOpen(false);
  };

  const handleSubmit = () => {
    verifyPan({id:lead._id,data:panDetails})
  };

 

   // Function to render table rows dynamically
   const renderRow = ({ label, leadValue, panValue }) => {
    const result = compareValues(leadValue, panValue);
    const textColor = getTextColor(result);

    useEffect(() => {
      if(isSuccess )
        setOpen(false)
    },[isSuccess,data])

    return (

      <TableRow
        key={label}
        sx={{
          "&:nth-of-type(odd)": {
            backgroundColor: "#f5f5f5",
          },
        }}
      >
        <TableCell
          sx={{
            padding: "16px 24px",
            fontSize: 14,
            textAlign: "center",
            color: "#424242",
            fontWeight: "500",
          }}
        >
          {label}:
        </TableCell>
        <TableCell
          sx={{
            padding: "16px 24px",
            fontSize: 14,
            textAlign: "center",
            color: "#424242",
          }}
        >
          {leadValue}
        </TableCell>
        <TableCell
          sx={{
            padding: "16px 24px",
            fontSize: 14,
            textAlign: "center",
            color: "#424242",
          }}
        >
          {panValue}
        </TableCell>
        <TableCell
          sx={{
            color: textColor,
            fontWeight: "bold",
            textAlign: "center",
            fontSize: 14,
            padding: "16px 24px",
          }}
        >
          {result === "Matched" ? (
            <>
              <CheckCircleOutlineIcon fontSize="small" sx={{ mr: 1, color: "#00796b" }} />
              Matched
            </>
          ) : (
            <>
              <HighlightOffIcon fontSize="small" sx={{ mr: 1 }} />
              Unmatched
            </>
          )}
        </TableCell>
        {/* {isError && <p>{error?.data?.message}</p>} */}
      </TableRow>
    );
  };


  return (
    <Dialog open={open} maxWidth="md" fullWidth>
      <DialogTitle>
        <Typography variant="h6" align="center" sx={{ fontWeight: "bold", mb: 2 }}>
          Compare User Details
        </Typography>
      </DialogTitle>
      <DialogContent>
        <Box sx={{ p: 2 }}>
          <TableContainer
            component={Paper}
            elevation={3}
            sx={{
              borderRadius: 2,
              border: "1px solid #e0e0e0",
              backgroundColor: "#fafafa",
            }}
          >
            <Table>
              <TableHead sx={{ backgroundColor: "#eceff1" }}>
                <TableRow>
                  <TableCell
                    sx={{
                      fontWeight: "bold",
                      fontSize: 15,
                      color: "#37474f",
                      textAlign: "center",
                      padding: "12px",
                    }}
                  >
                    Field
                  </TableCell>
                  <TableCell
                    sx={{
                      fontWeight: "bold",
                      fontSize: 15,
                      color: "#37474f",
                      textAlign: "center",
                      padding: "12px",
                    }}
                  >
                    User 1
                  </TableCell>
                  <TableCell
                    sx={{
                      fontWeight: "bold",
                      fontSize: 15,
                      color: "#37474f",
                      textAlign: "center",
                      padding: "12px",
                    }}
                  >
                    User 2
                  </TableCell>
                  <TableCell
                    sx={{
                      fontWeight: "bold",
                      fontSize: 15,
                      color: "#37474f",
                      textAlign: "center",
                      padding: "12px",
                    }}
                  >
                    Comparison
                  </TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {comparisonFields.map(renderRow)}
              </TableBody>
            </Table>
          </TableContainer>
        </Box>
      {isError && <p>{error?.data?.message}</p> }
      </DialogContent>
      <DialogActions sx={{ justifyContent: "space-between", px: 3, pb: 3 }}>
        <Button
          onClick={handleClose}
          variant="outlined"
          sx={{
            borderColor: "#00796b",
            color: "#00796b",
            fontWeight: "bold",
            textTransform: "none",
            "&:hover": { backgroundColor: "#e0f7fa", borderColor: "#00796b" },
          }}
        >
          Close
        </Button>
        <Button
          onClick={handleSubmit}
          variant="contained"
          color="primary"
          sx={{
            backgroundColor: "#00796b",
            fontWeight: "bold",
            textTransform: "none",
            "&:hover": { backgroundColor: "#004d40" },
          }}
        >
          Verify
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default PanCompare;
