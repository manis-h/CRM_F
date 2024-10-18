// import React, { useEffect } from 'react';
// import Sidebar from '../Navbar/Sidebar';
// import Navbar  from '../Navbar/NavBar';
// import GlobalBox from './GlobalBox';
// import useStore from '../Store';
// import { useGetEmployeesQuery } from '../Service/Query';
// import DownloadOutlinedIcon from "@mui/icons-material/DownloadOutlined";
// import EmailIcon from "@mui/icons-material/Email";
// // import PointOfSaleIcon from "@mui/icons-material/PointOfSale";
// // import PersonAddIcon from "@mui/icons-material/PersonAdd";
// // import TrafficIcon from "@mui/icons-material/Traffic";
// // import Header from "../../components/Header";
// // import LineChart from "../../components/LineChart";
// // import GeographyChart from "../../components/GeographyChart";
// // import BarChart from "../../components/BarChart";
// // import GlobalBox from "../../components/GlobalBox";
// // import ProgressCircle from "../../components/ProgressCircle";
// import { Box, Button, IconButton, Typography, useTheme } from "@mui/material";
// // import { tokens } from "../../theme";
// import { tokens } from '../theme';
// import ProgressCircle from './ProgressCircle';
// import Header from './Header';
// import NewReleasesIcon from '@mui/icons-material/NewReleases';
// import PlayArrowIcon from '@mui/icons-material/PlayArrow';
// import PauseIcon from '@mui/icons-material/Pause';
// import CancelIcon from '@mui/icons-material/Cancel';
// import useAuthStore from './store/authStore';



// const Dashboard = ({isSidebarOpen}) => {
//   const {login,setEmployeeDetails} = useStore()
//   const {data:employeeDetails,isSuccess:empDetailsSuccess,refetch} = useGetEmployeesQuery()
//   const { empInfo } = useAuthStore();

//   const Employee = {
//     Admin : {

//     },
//     Screener : {
//       leadNew: {
//         icon: <NewReleasesIcon />
//       },
//       leadRejected: {
//         icon: <CancelIcon />
//       },
//       leadHold: {
//         icon: <PauseIcon />
//       },
//       leadProcess: {
//         icon: <PlayArrowIcon />
//       }
//     },
//     CreditManager : {

//     },
//     SanctionHead : {

//     }
//   }

//   useEffect(() => {
//     if(empDetailsSuccess){
//       setEmployeeDetails(employeeDetails)
//     }    
//   },[employeeDetails])
  
//   useEffect(() => {
//     refetch()
//   },[login])

//   const theme = useTheme();
//   const colors = tokens(theme.palette.mode);

// console.log({isSidebarOpen},login)
// console.log("Here is the data",empInfo);
//   return (
//     <div>
//         <Navbar/>
     
//         <Sidebar/>

//         <Box m="70px">
//       {/* HEADER */}
//       <Box display="flex" justifyContent="space-between" alignItems="center">
//         <Header title="DASHBOARD" subtitle="Welcome to your dashboard" />

//         <Box>
//           <Button
//             sx={{
//               backgroundColor: colors.blueAccent[700],
//               color: colors.grey[100],
//               fontSize: "14px",
//               fontWeight: "bold",
//               padding: "10px 20px",
//             }}
//           >
//             <DownloadOutlinedIcon sx={{ mr: "10px" }} />
//             Download Reports
//           </Button>
//         </Box>
//       </Box>


//             {/* GRID & CHARTS */}
//       <Box
//         display="grid"
//         gridTemplateColumns="repeat(12, 1fr)"
//         gridAutoRows="140px"
//         gap="20px"
//       >
//         {/* ROW 1 */}
//         <Box
//           gridColumn="span 3"
//           backgroundColor={colors.primary[400]}
//           display="flex"
//           alignItems="center"
//           justifyContent="center"
//         >
//           <GlobalBox
//             title="12,361"
//             subtitle="Emails Sent"
//             progress="0.75"
//             increase="+14%"
//             icon={
//               <EmailIcon
//                 sx={{ color: colors.greenAccent[600], fontSize: "26px" }}
//               />
//             }
//           />
//         </Box>
//         {/* <Box
//           gridColumn="span 3"
//           backgroundColor={colors.primary[400]}
//           display="flex"
//           alignItems="center"
//           justifyContent="center"
//         >
//           <GlobalBox
//             title="431,225"
//             subtitle="Sales Obtained"
//             progress="0.50"
//             increase="+21%"
//             icon={
//               <PointOfSaleIcon
//                 sx={{ color: colors.greenAccent[600], fontSize: "26px" }}
//               />
//             }
//           />
//         </Box>
//         <Box
//           gridColumn="span 3"
//           backgroundColor={colors.primary[400]}
//           display="flex"
//           alignItems="center"
//           justifyContent="center"
//         >
//           <GlobalBox
//             title="32,441"
//             subtitle="New Clients"
//             progress="0.30"
//             increase="+5%"
//             icon={
//               <PersonAddIcon
//                 sx={{ color: colors.greenAccent[600], fontSize: "26px" }}
//               />
//             }
//           />
//         </Box>
//         <Box
//           gridColumn="span 3"
//           backgroundColor={colors.primary[400]}
//           display="flex"
//           alignItems="center"
//           justifyContent="center"
//         >
//           <GlobalBox
//             title="1,325,134"
//             subtitle="Traffic Received"
//             progress="0.80"
//             increase="+43%"
//             icon={
//               <TrafficIcon
//                 sx={{ color: colors.greenAccent[600], fontSize: "26px" }}
//               />
//             }
//           />
//         </Box> */}

//         {/* ROW 2 */}
//         {/* <Box
//           gridColumn="span 8"
//           gridRow="span 2"
//           backgroundColor={colors.primary[400]}
//         >
//           <Box
//             mt="25px"
//             p="0 30px"
//             display="flex "
//             justifyContent="space-between"
//             alignItems="center"
//           >
//             <Box>
//               <Typography
//                 variant="h5"
//                 fontWeight="600"
//                 color={colors.grey[100]}
//               >
//                 Revenue Generated
//               </Typography>
//               <Typography
//                 variant="h3"
//                 fontWeight="bold"
//                 color={colors.greenAccent[500]}
//               >
//                 $59,342.32
//               </Typography>
//             </Box>
//             <Box>
//               <IconButton>
//                 <DownloadOutlinedIcon
//                   sx={{ fontSize: "26px", color: colors.greenAccent[500] }}
//                 />
//               </IconButton>
//             </Box>
//           </Box>
//           <Box height="250px" m="-20px 0 0 0">
//             <LineChart isDashboard={true} />
//           </Box>
//         </Box>
//         <Box
//           gridColumn="span 4"
//           gridRow="span 2"
//           backgroundColor={colors.primary[400]}
//           overflow="auto"
//         >
//           <Box
//             display="flex"
//             justifyContent="space-between"
//             alignItems="center"
//             borderBottom={`4px solid ${colors.primary[500]}`}
//             colors={colors.grey[100]}
//             p="15px"
//           >
//             <Typography color={colors.grey[100]} variant="h5" fontWeight="600">
//               Recent Transactions
//             </Typography>
//           </Box>
//           {mockTransactions.map((transaction, i) => (
//             <Box
//               key={`${transaction.txId}-${i}`}
//               display="flex"
//               justifyContent="space-between"
//               alignItems="center"
//               borderBottom={`4px solid ${colors.primary[500]}`}
//               p="15px"
//             >
//               <Box>
//                 <Typography
//                   color={colors.greenAccent[500]}
//                   variant="h5"
//                   fontWeight="600"
//                 >
//                   {transaction.txId}
//                 </Typography>
//                 <Typography color={colors.grey[100]}>
//                   {transaction.user}
//                 </Typography>
//               </Box>
//               <Box color={colors.grey[100]}>{transaction.date}</Box>
//               <Box
//                 backgroundColor={colors.greenAccent[500]}
//                 p="5px 10px"
//                 borderRadius="4px"
//               >
//                 ${transaction.cost}
//               </Box>
//             </Box>
//           ))}
//         </Box> */}

//         {/* ROW 3 */}
//         {/* <Box
//           gridColumn="span 4"
//           gridRow="span 2"
//           backgroundColor={colors.primary[400]}
//           p="30px"
//         >
//           <Typography variant="h5" fontWeight="600">
//             Campaign
//           </Typography>
//           <Box
//             display="flex"
//             flexDirection="column"
//             alignItems="center"
//             mt="25px"
//           >
//             <ProgressCircle size="125" />
//             <Typography
//               variant="h5"
//               color={colors.greenAccent[500]}
//               sx={{ mt: "15px" }}
//             >
//               $48,352 revenue generated
//             </Typography>
//             <Typography>Includes extra misc expenditures and costs</Typography>
//           </Box>
//         </Box>
//         <Box
//           gridColumn="span 4"
//           gridRow="span 2"
//           backgroundColor={colors.primary[400]}
//         >
//           <Typography
//             variant="h5"
//             fontWeight="600"
//             sx={{ padding: "30px 30px 0 30px" }}
//           >
//             Sales Quantity
//           </Typography>
//           <Box height="250px" mt="-20px">
//             <BarChart isDashboard={true} />
//           </Box>
//         </Box>
//         <Box
//           gridColumn="span 4"
//           gridRow="span 2"
//           backgroundColor={colors.primary[400]}
//           padding="30px"
//         >
//           <Typography
//             variant="h5"
//             fontWeight="600"
//             sx={{ marginBottom: "15px" }}
//           >
//             Geography Based Traffic
//           </Typography>
//           <Box height="200px">
//             <GeographyChart isDashboard={true} />
//           </Box>
//         </Box>
//          */}
//       </Box>


//       </Box>
//         {/* <GlobalBox /> */}
//     </div>
//   );
// };

// export default Dashboard;


import React, { useEffect } from 'react';
import { Box, Button, IconButton, Typography, useTheme } from "@mui/material";
import { useNavigate } from 'react-router-dom';
// import useAuthStore from './store/authStore';
import Sidebar from '../Navbar/Sidebar';
import Navbar from '../Navbar/NavBar';
import GlobalBox from './GlobalBox';
import { useGetEmployeesQuery } from '../Service/Query';
import DownloadOutlinedIcon from "@mui/icons-material/DownloadOutlined";
import NewReleasesIcon from '@mui/icons-material/NewReleases';
import PlayArrowIcon from '@mui/icons-material/PlayArrow';
import PauseIcon from '@mui/icons-material/Pause';
import CancelIcon from '@mui/icons-material/Cancel';
import { tokens } from '../theme';
import useAuthStore from './store/authStore';
import useStore from '../Store';
import Header from "./Header";
import { useGetLeadTotalRecordsQuery } from '../Service/Query';
const Dashboard = ({ isSidebarOpen }) => {
  const { login, setEmployeeDetails } = useStore();
  const { data: employeeDetails, isSuccess: empDetailsSuccess, refetch } = useGetEmployeesQuery();
  const { empInfo } = useAuthStore();
  const navigate = useNavigate(); // React Router hook for navigation
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

 

  const { data}  = useGetLeadTotalRecordsQuery();


   // Define Employee roles with icons and paths
   const Employee = {
    admin: {
      leadNew: {
        icon: <NewReleasesIcon className='mt-3'
        sx={{ color: '#4caf50', width:'100%', height:'30%' }} />, // Green color
        path: "/lead-new",
        title: 'New Leads',
        no : 10
      },
      leadProcess: {
        icon: <PlayArrowIcon className='mt-3' sx={{ color: '#4caf50', width:'100%', height:'30%' }} />,
        path: "/lead-process",
        title: 'Leads In Process',
        no : 10
      },
      leadHold: {
        icon: <PauseIcon className='mt-3' sx={{ color: '#4caf50', width:'100%', height:'30%' }} />,
        path: "/lead-hold",
        title: 'Leads Held',
        no : 10
      },
      leadRejected: {
        icon: <CancelIcon className='mt-3' sx={{ color: '#4caf50', width:'100%', height:'30%' }} />,
        path: "/rejected-leads",
        title: 'Leads Rejected',
        no : 10
      },
      newApplication: {
        icon: <NewReleasesIcon className='mt-3'
        sx={{ color: '#4caf50', width:'100%', height:'30%' }} />, // Green color
        path: "/new-applications",
        title: 'New Applications',
        no : 10
      },
      applicationProcess: {
        icon: <PlayArrowIcon className='mt-3' sx={{ color: '#4caf50', width:'100%', height:'30%' }} />,
        path: "/application-process",
        title: 'Applications In Process',
        no : 10
      },
      applicationHold: {
        icon: <PauseIcon className='mt-3' sx={{ color: '#4caf50', width:'100%', height:'30%' }} />,
        path: "/applications-held",
        title: 'Applications Held',
        no : 10
      },
      applicationRejected: {
        icon: <CancelIcon className='mt-3' sx={{ color: '#4caf50', width:'100%', height:'30%' }} />,
        path: "/rejected-applications",
        title: 'Applications Rejected',
        no : 10
      },
    },
    screener: {
      leadNew: {
        icon: <NewReleasesIcon className='mt-3'
        sx={{ color: '#4caf50', width:'100%', height:'30%' }} />, // Green color
        path: "/lead-new",
        title: 'New Leads',
        no : data?.leads?.newLeads || 0
      },
      leadProcess: {
        icon: <PlayArrowIcon className='mt-3' sx={{ color: '#4caf50', width:'100%', height:'30%' }} />,
        path: "/lead-process",
        title: 'Leads In Process',
        no : data?.leads?.
        allocatedLeads || 0
      },
      leadHold: {
        icon: <PauseIcon className='mt-3' sx={{ color: '#4caf50', width:'100%', height:'30%' }} />,
        path: "/lead-hold",
        title: 'Leads Held',
        no : data?.leads?.heldLeads || 0
      },
      leadRejected: {
        icon: <CancelIcon className='mt-3' sx={{ color: '#4caf50', width:'100%', height:'30%' }} />,
        path: "/rejected-leads",
        title: 'Leads Rejected',
        no : data?.leads?.
        rejectedLeads || 0
      },
    },
    creditManager: {
      newApplication: {
        icon: <NewReleasesIcon className='mt-3'
        sx={{ color: '#4caf50', width:'100%', height:'30%' }} />, // Green color
        path: "/new-applications",
        title: 'New Applications',
        no : data?.applications?.newApplications || 0

      },
      applicationProcess: {
        icon: <PlayArrowIcon className='mt-3' sx={{ color: '#4caf50', width:'100%', height:'30%' }} />,
        path: "/application-process",
        title: 'Applications In Process',
        no : data?.applications?.allocatedApplications || 0
      },
      applicationHold: {
        icon: <PauseIcon className='mt-3' sx={{ color: '#4caf50', width:'100%', height:'30%' }} />,
        path: "/applications-held",
        title: 'Applications Held',
        no : data?.applications?.
        heldApplications || 0
      },
      applicationRejected: {
        icon: <CancelIcon className='mt-3' sx={{ color: '#4caf50', width:'100%', height:'30%' }} />,
        path: "/rejected-applications",
        title: 'Applications Rejected',
        no : data?.applications?.rejectedApplications || 0
      },
    },
    sanctionHead: {
      leadNew: {
        icon: <NewReleasesIcon className='mt-3'
        sx={{ color: '#4caf50', width:'100%', height:'30%' }} />, // Green color
        path: "/lead-new",
        title: 'New Leads',
        no : data?.leads?.newLeads || 0
      },
      leadProcess: {
        icon: <PlayArrowIcon className='mt-3' sx={{ color: '#4caf50', width:'100%', height:'30%' }} />,
        path: "/lead-process",
        title: 'Leads In Process',
        no : data?.leads?.
        allocatedLeads || 0
      },
      leadHold: {
        icon: <PauseIcon className='mt-3' sx={{ color: '#4caf50', width:'100%', height:'30%' }} />,
        path: "/lead-hold",
        title: 'Leads Held',
        no : data?.leads?.heldLeads  || 0
      },
      leadRejected: {
        icon: <CancelIcon className='mt-3' sx={{ color: '#4caf50', width:'100%', height:'30%' }} />,
        path: "/rejected-leads",
        title: 'Leads Rejected',
        no : data?.leads?.
        rejectedLeads || 0
      },
      newApplication: {
        icon: <NewReleasesIcon className='mt-3'
        sx={{ color: '#4caf50', width:'100%', height:'30%' }} />, // Green color
        path: "/new-applications",
        title: 'New Applications',
        no : data?.applications?.newApplications || 0

      },
      applicationProcess: {
        icon: <PlayArrowIcon className='mt-3' sx={{ color: '#4caf50', width:'100%', height:'30%' }} />,
        path: "/application-process",
        title: 'Applications In Process',
        no : data?.applications?.allocatedApplications || 0
      },
      applicationHold: {
        icon: <PauseIcon className='mt-3' sx={{ color: '#4caf50', width:'100%', height:'30%' }} />,
        path: "/applications-held",
        title: 'Applications Held',
        no : data?.applications?.
        heldApplications || 0
      },
      applicationRejected: {
        icon: <CancelIcon className='mt-3' sx={{ color: '#4caf50', width:'100%', height:'30%' }} />,
        path: "/rejected-applications",
        title: 'Applications Rejected',
        no : data?.applications?.rejectedApplications || 0
      },
    }
  };

  // Fetch and set employee details on component load
  useEffect(() => {
    if (empDetailsSuccess) {
      setEmployeeDetails(employeeDetails);
    }
  }, [employeeDetails]);

  // Refetch employee data when login state changes
  useEffect(() => {
    refetch();
  }, [login]);

  // Function to handle GlobalBox click and navigate
  const handleNavigation = (path) => {
    navigate(path); // Navigate to the desired path
  };

  // Dynamically generate GlobalBox components for the employee's role
  const renderRoleBoxes = () => {
    const role = empInfo?.empRole; // Get role from auth store
    if (!role || !Employee[role]) return null;

    return Object.entries(Employee[role]).map(([key, value], index) => (
      <Box
        key={index}
        gridColumn="span 3"
        backgroundColor={colors.primary[400]}
        display="flex"
        alignItems="center"
        justifyContent="center"
        onClick={() => handleNavigation(value.path)} // Navigate on click
        sx={{ cursor: 'pointer', borderRadius: '5px' }} // Add pointer cursor on hover
      >
        <GlobalBox
        
          title={value.title} // Display key as title
          subtitle={key} // Or a more appropriate subtitle
          icon={value.icon} // Set dynamic icon
          increase={value
            .no
          }
        />
      </Box>
    ));
  };

  return (
    <div>
      {/* <Navbar />
      <Sidebar /> */}
      <Box m="70px">
        {/* HEADER */}
        <Box display="flex" justifyContent="space-between" alignItems="center">
          <Header title="DASHBOARD" subtitle="Welcome to your dashboard" />
          <Box>
            <Button
              sx={{
                backgroundColor: colors.blueAccent[700],
                color: colors.grey[100],
                fontSize: "14px",
                fontWeight: "bold",
                padding: "10px 20px",
              }}
            >
              <DownloadOutlinedIcon sx={{ mr: "10px" }} />
              Download Reports
            </Button>
          </Box>
        </Box>

        {/* GRID & CHARTS */}
        <Box
          display="grid"
          gridTemplateColumns="repeat(12, 1fr)"
          gridAutoRows="140px"
          gap="20px"
          
        >
          {renderRoleBoxes()} {/* Render boxes based on role */}
        </Box>
      </Box>
    </div>
  );
};

export default Dashboard;
