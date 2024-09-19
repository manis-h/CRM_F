import './App.css';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import LoginPage from './Component/LoginPage';
import Dashboard from './Component/dashboard';
import DynamicTable from './Component/DynamicTable';
import TableForm from './Component/TableForm'; // Import the new TableForm component

import 'bootstrap-icons/font/bootstrap-icons.css';
import SearchForm from './Component/SearchForm';
import ExportForm from './Component/ExportForm';
import Navbar from './Navbar/Navbar';
import Sidebar from './Navbar/Sidebar';
import { useEffect, useState } from 'react';
import useStore from './Store';
import MISReport from './Component/MisReort';
import ForgotPasswordPage from './Component/ForgotPasswordPage';
import ResetPasswordPage from './Component/ResetPasswordPage';
import Cookies from 'universal-cookie';
import UserProfileForm from './Component/UserProfileForm';
import AddUserForm from './Component/AddUserForm';
import ViewUsersForm from './Component/ViewUsersForm';
import ImportCSV from './Component/ImportCSV';
import AddBankDetails from './Component/AddBankDetails';
import AddHolidayDetails from './Component/AddHolidayDetails';
import LeadNew from './SubComponent/LeadNew';

function App() {

  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const setLogin = useStore((state) => state.setLogin);
  const [login, setLoginState] = useState(false); // Local state to track login

  useEffect(() => {
    const cookies = new Cookies();
    const authToken = cookies.get('authToken');
    
    if (authToken) {
      console.log({authToken})
      // Assume token presence means user is logged in
      setLoginState(true);
      setLogin(true);
    }
  }, [setLogin]);


  return (
    <Router>
     {!login? <Routes>
      <Route path="/login" element={<LoginPage />} />

      {/* <Route path='/logout' element={<LogOutPage/>} /> */}
      <Route path="/forgot-password" element={<ForgotPasswordPage />} />
      <Route path="/reset-password" element={<ResetPasswordPage />} />

      </Routes>
          :<>
              <Navbar />
              
              <Sidebar isSidebarOpen={isSidebarOpen} setIsSidebarOpen={setIsSidebarOpen}/>
              <div style={{marginLeft: isSidebarOpen?'250px':'0px'}} >
              
            <Routes>
            <Route path="/dashboard" element={<Dashboard  />} />

              <Route path='/add-holiday-details' element={<AddHolidayDetails/>}/>
            <Route path="/user-profile" element={<UserProfileForm />} />
            <Route path='/add-bank-details' element={<AddBankDetails />}/>
            <Route path='/import-csv' element={<ImportCSV/>}/>
             <Route path='/view-user' element={<ViewUsersForm/>}/>
              <Route path='add-users' element={<AddUserForm/>}/>
              <Route path="/lead-new" element={<LeadNew 
      header={["Lead Id", "Action", "Applied On", "Source", "Name", "State", "City", "Branch", "Mobile", "Pan", "UserType", "Status"]}
      rows={[
        ["101", "View", "2024-09-09", "Online", "John Doe", "California", "Los Angeles", "Branch A", "1234567890", "ABCDE1234F", "Individual", "Active"],
        ["102", "View", "2024-09-08", "Offline", "Jane Smith", "Texas", "Dallas", "Branch B", "0987654321", "WXYZ9876T", "Business", "Pending"],
        ["103", "View", "2024-09-07", "Referral", "Bob Johnson", "New York", "New York City", "Branch C", "1122334455", "LMNOP5678H", "Individual", "Completed"],
        
      ]}/>}/>
       <Route path="/lead-process" element={<DynamicTable 
      header={["Lead Id", "Action", "Applied On", "Source", "Name", "State", "City", "Branch", "Mobile", "Pan", "UserType", "Status", "Screener"]}
      rows={[
        ["101", "Review", "2024-09-09", "Online", "Emily Davis", "California", "Los Angeles", "Branch A", "555-1111", "XYZ1234567", "Individual", "Active", "Screener 1"],
        ["102", "Approve", "2024-09-08", "Offline", "Michael Brown", "Texas", "Austin", "Branch B", "555-2222", "ABC7654321", "Business", "Pending", "Screener 2"],
        ["103", "Review", "2024-09-07", "Referral", "Sarah Wilson", "New York", "Manhattan", "Branch C", "555-3333", "DEF9876543", "Individual", "Completed", "Screener 3"],
        ["104", "Reject", "2024-09-06", "Online", "James Taylor", "Florida", "Orlando", "Branch D", "555-4444", "GHI6543210", "Business", "Rejected", "Screener 4"]
      ]}/>}/>
      <Route path="/lead-hold"  element={ <DynamicTable 
      header={["Lead Id", "Action", "Applied On", "Source", "Name", "State", "City", "Branch", "Mobile", "Pan", "UserType", "Status", "Hold-On", "Screener"]}
      rows={[
        ["001", "View", "2024-09-09", "Online", "Alice Johnson", "California", "San Francisco", "Branch X", "555-1234", "ABCD1234E", "Individual", "Active", "Yes", "Screener 1"],
        ["002", "Edit", "2024-09-08", "Offline", "Bob Smith", "New York", "Brooklyn", "Branch Y", "555-5678", "EFGH5678I", "Business", "Pending", "No", "Screener 2"],
        ["003", "View", "2024-09-07", "Referral", "Carol Lee", "Texas", "Houston", "Branch Z", "555-8765", "IJKL9012M", "Individual", "Completed", "Yes", "Screener 3"],
        ["004", "Edit", "2024-09-06", "Online", "David Brown", "Florida", "Miami", "Branch W", "555-4321", "MNOP3456Q", "Business", "Rejected", "No", "Screener 4"]
      ]}/>}/>
              
      <Route path="/application-new" element={<DynamicTable 
      header={["Lead Id", "Action", "Applied On", "Source", "Name", "State", "City", "Branch", "Mobile", "Pan", "UserType", "Status", "Screener"]}
      rows={[
        ["201", "Submit", "2024-09-09", "Online", "Laura Martinez", "California", "San Diego", "Branch X", "555-5555", "LMN1234567", "Individual", "Active", "Screener 1"],
        ["202", "Review", "2024-09-08", "Offline", "Daniel Johnson", "New York", "Queens", "Branch Y", "555-6666", "OPQ7654321", "Business", "Pending", "Screener 2"],
        ["203", "Approve", "2024-09-07", "Referral", "Megan White", "Texas", "Dallas", "Branch Z", "555-7777", "RST9876543", "Individual", "Completed", "Screener 3"],
        ["204", "Reject", "2024-09-06", "Online", "Christopher Lee", "Florida", "Tampa", "Branch W", "555-8888", "UVW6543210", "Business", "Rejected", "Screener 4"]
      ]}/>}/>

     <Route  path="/application-process" element={<DynamicTable 
      header={["Lead Id", "Action", "Applied On", "Source", "Name", "State", "City", "Branch", "Mobile", "Pan", "UserType", "Status", "Sanction Manager"]}
      rows={[
        ["301", "Submit", "2024-09-09", "Online", "Alice Brown", "California", "San Jose", "Branch A", "555-1111", "ABC123456X", "Individual", "Active", "Manager 1"],
        ["302", "Review", "2024-09-08", "Offline", "James Green", "Texas", "Austin", "Branch B", "555-2222", "DEF789012Y", "Business", "Pending", "Manager 2"],
        ["303", "Approve", "2024-09-07", "Referral", "Sophia Davis", "New York", "Brooklyn", "Branch C", "555-3333", "GHI345678Z", "Individual", "Completed", "Manager 3"],
        ["304", "Reject", "2024-09-06", "Online", "John Smith", "Florida", "Orlando", "Branch D", "555-4444", "JKL901234W", "Business", "Rejected", "Manager 4"]
      ]}/>}/>

   <Route  path="/application-hold" element={ <DynamicTable 
      header={["Lead Id", "Action", "Applied On", "Source", "Name", "State", "City", "Branch", "Mobile", "Pan", "UserType", "Status", "Hold-On", "Sanction Manager"]}
      rows={[
        ["401", "Review", "2024-09-09", "Online", "Liam Johnson", "California", "Sacramento", "Branch E", "555-5555", "MNO123456P", "Individual", "Active", "Yes", "Manager 1"],
        ["402", "Edit", "2024-09-08", "Offline", "Emma Wilson", "New York", "Bronx", "Branch F", "555-6666", "PQR789012Q", "Business", "Pending", "No", "Manager 2"],
        ["403", "Submit", "2024-09-07", "Referral", "Noah Brown", "Texas", "San Antonio", "Branch G", "555-7777", "STU345678R", "Individual", "Completed", "Yes", "Manager 3"],
        ["404", "Reject", "2024-09-06", "Online", "Olivia Taylor", "Florida", "Jacksonville", "Branch H", "555-8888", "VWX901234S", "Business", "Rejected", "No", "Manager 4"]
      ]}/>}/>

<Route path="/application-sent-back" element={<DynamicTable 
      header={["Lead Id", "Action", "Applied On", "Source", "Name", "State", "City", "Branch", "Mobile", "Pan", "UserType", "Status", "Sanction Manager"]}
      rows={[
        ["501", "Sent Back", "2024-09-09", "Online", "Grace Lee", "California", "San Diego", "Branch I", "555-9999", "XYZ123456A", "Individual", "Pending", "Manager 1"],
        ["502", "Sent Back", "2024-09-08", "Offline", "Ethan King", "New York", "Manhattan", "Branch J", "555-0000", "ABC789012B", "Business", "Review", "Manager 2"],
        ["503", "Sent Back", "2024-09-07", "Referral", "Ava Clark", "Texas", "Austin", "Branch K", "555-1111", "DEF345678C", "Individual", "Active", "Manager 3"],
        ["504", "Sent Back", "2024-09-06", "Online", "Mason Lewis", "Florida", "Miami", "Branch L", "555-2222", "GHI901234D", "Business", "Completed", "Manager 4"]
      ]}/>}/>

     <Route path="/application-recommendation" element={<DynamicTable 
      header={["Lead Id", "Action", "Applied On", "Source", "Name", "State", "City", "Branch", "Mobile", "Pan", "UserType", "Status", "Sanction Manager"]}
      rows={[
        ["601", "Recommend", "2024-09-09", "Online", "Isabella Johnson", "California", "Los Angeles", "Branch M", "555-3333", "JKL123456M", "Individual", "Pending", "Manager 1"],
        ["602", "Recommend", "2024-09-08", "Offline", "Oliver Martinez", "New York", "Brooklyn", "Branch N", "555-4444", "MNO789012N", "Business", "Review", "Manager 2"],
        ["603", "Recommend", "2024-09-07", "Referral", "Liam Davis", "Texas", "Houston", "Branch O", "555-5555", "PQR345678O", "Individual", "Active", "Manager 3"],
        ["604", "Recommend", "2024-09-06", "Online", "Sophia Wilson", "Florida", "Orlando", "Branch P", "555-6666", "STU901234P", "Business", "Completed", "Manager 4"]
      ]}/>}/>
<Route path="/sanction" element={ <DynamicTable 
      header={["Lead Id", "Action", "Applied On", "Source", "Name", "State", "City", "Branch", "Mobile", "Pan", "UserType", "Status", "Sanction Manager", "Sanction-On", "Sanction-Amount"]}
      rows={[
        ["701", "Approved", "2024-09-09", "Online", "Mia Robinson", "California", "San Francisco", "Branch Q", "555-7777", "UVW123456X", "Individual", "Active", "Manager 1", "2024-09-10", "$5000"],
        ["702", "Approved", "2024-09-08", "Offline", "Ethan Clark", "New York", "Staten Island", "Branch R", "555-8888", "XYZ789012Y", "Business", "Pending", "Manager 2", "2024-09-12", "$7500"],
        ["703", "Approved", "2024-09-07", "Referral", "Olivia Martinez", "Texas", "Fort Worth", "Branch S", "555-9999", "ABC345678Z", "Individual", "Completed", "Manager 3", "2024-09-11", "$6000"],
        ["704", "Approved", "2024-09-06", "Online", "Noah Lee", "Florida", "Tampa", "Branch T", "555-0000", "DEF901234A", "Business", "Active", "Manager 4", "2024-09-14", "$5500"]
      ]}/>}/>
     <Route path="/reject" element={<DynamicTable 
      header={["Lead Id", "Action", "Applied On", "Source", "Name", "State", "City", "Branch", "Mobile", "Pan", "UserType", "Status"]}
      rows={[
        ["801", "Rejected", "2024-09-09", "Online", "Zoe Adams", "California", "Los Angeles", "Branch U", "555-1111", "GHI123456J", "Individual", "Rejected"],
        ["802", "Rejected", "2024-09-08", "Offline", "Jacob Taylor", "New York", "Queens", "Branch V", "555-2222", "JKL789012K", "Business", "Rejected"],
        ["803", "Rejected", "2024-09-07", "Referral", "Emily Wilson", "Texas", "Dallas", "Branch W", "555-3333", "MNO345678L", "Individual", "Rejected"],
        ["804", "Rejected", "2024-09-06", "Online", "Michael Brown", "Florida", "Miami", "Branch X", "555-4444", "PQR901234M", "Business", "Rejected"]
      ]}/> }/>
    <Route path="/disbursal-new" element={<DynamicTable 
      header={["Lead Id", "Action", "Applied On", "Source", "Name", "State", "City", "Branch", "Mobile", "Pan", "UserType", "Status", "Sanction Manager", "Sanction-On", "Sanction-Amount"]}
      rows={[
        ["901", "Disbursed", "2024-09-09", "Online", "Liam Jackson", "California", "Los Angeles", "Branch Y", "555-5555", "STU123456N", "Individual", "Active", "Manager 1", "2024-09-10", "$10000"],
        ["902", "Disbursed", "2024-09-08", "Offline", "Emma Wilson", "New York", "Brooklyn", "Branch Z", "555-6666", "VWX789012O", "Business", "Pending", "Manager 2", "2024-09-12", "$12000"],
        ["903", "Disbursed", "2024-09-07", "Referral", "Noah Johnson", "Texas", "Dallas", "Branch AA", "555-7777", "YZA345678P", "Individual", "Completed", "Manager 3", "2024-09-11", "$9500"],
        ["904", "Disbursed", "2024-09-06", "Online", "Olivia Martinez", "Florida", "Orlando", "Branch BB", "555-8888", "BCD901234Q", "Business", "Active", "Manager 4", "2024-09-14", "$11000"]
      ]}/>}/>
    <Route path="/disbursal-inprocess" element={ <DynamicTable 
      header={["Lead Id", "Action", "Applied On", "Source", "Name", "State", "City", "Branch", "Mobile", "Pan", "UserType", "Status", "Sanction Manager", "Sanction-On", "Sanction-Amount", "Disbursal Manager"]}
      rows={[
        ["1001", "In Process", "2024-09-09", "Online", "Ethan Scott", "California", "San Diego", "Branch CC", "555-9999", "XYZ123456A", "Individual", "Pending", "Manager 1", "2024-09-10", "$5000", "Disbursal Manager 1"],
        ["1002", "In Process", "2024-09-08", "Offline", "Ava Mitchell", "New York", "Queens", "Branch DD", "555-0000", "ABC789012B", "Business", "Review", "Manager 2", "2024-09-12", "$7500", "Disbursal Manager 2"],
        ["1003", "In Process", "2024-09-07", "Referral", "Liam Adams", "Texas", "Houston", "Branch EE", "555-1111", "DEF345678C", "Individual", "Active", "Manager 3", "2024-09-11", "$6000", "Disbursal Manager 3"],
        ["1004", "In Process", "2024-09-06", "Online", "Sophia Walker", "Florida", "Tampa", "Branch FF", "555-2222", "GHI901234D", "Business", "Completed", "Manager 4", "2024-09-14", "$5500", "Disbursal Manager 4"]
      ]}/>}/>
<Route path="/disbursal-hold" element={<DynamicTable 
      header={["Lead Id", "Action", "Applied On", "Source", "Name", "State", "City", "Branch", "Mobile", "Pan", "UserType", "Status", "Sanction Manager", "Sanction-On", "Sanction-Amount", "Disbursal Manager"]}
      rows={[
        ["1101", "On Hold", "2024-09-09", "Online", "Isabella Lee", "California", "San Jose", "Branch GG", "555-3333", "JKL123456E", "Individual", "On Hold", "Manager 1", "2024-09-10", "$4000", "Disbursal Manager 1"],
        ["1102", "On Hold", "2024-09-08", "Offline", "Mason Clark", "New York", "Bronx", "Branch HH", "555-4444", "MNO789012F", "Business", "On Hold", "Manager 2", "2024-09-12", "$6500", "Disbursal Manager 2"],
        ["1103", "On Hold", "2024-09-07", "Referral", "Sophia Robinson", "Texas", "Austin", "Branch II", "555-5555", "PQR345678G", "Individual", "On Hold", "Manager 3", "2024-09-11", "$5500", "Disbursal Manager 3"],
        ["1104", "On Hold", "2024-09-06", "Online", "Liam Johnson", "Florida", "Jacksonville", "Branch JJ", "555-6666", "STU901234H", "Business", "On Hold", "Manager 4", "2024-09-14", "$5000", "Disbursal Manager 4"]
      ]}/>}/>
    <Route  path="/disbursal-pending" element={<DynamicTable 
      header={["Lead Id", "Action", "Applied On", "Source", "Name", "State", "City", "Branch", "Mobile", "Pan", "UserType", "Status", "Sanction Manager", "Sanction-On", "Sanction-Amount", "Disbursal Manager", "Disbursal Recommended On"]}
      rows={[
        ["1201", "Pending", "2024-09-09", "Online", "Charlotte Moore", "California", "San Diego", "Branch KK", "555-7777", "UVW123456I", "Individual", "Pending", "Manager 1", "2024-09-10", "$7000", "Disbursal Manager 1", "2024-09-15"],
        ["1202", "Pending", "2024-09-08", "Offline", "Benjamin Adams", "New York", "Brooklyn", "Branch LL", "555-8888", "XYZ789012J", "Business", "Pending", "Manager 2", "2024-09-12", "$8500", "Disbursal Manager 2", "2024-09-16"],
        ["1203", "Pending", "2024-09-07", "Referral", "Ava Garcia", "Texas", "Dallas", "Branch MM", "555-9999", "ABC345678K", "Individual", "Pending", "Manager 3", "2024-09-11", "$6000", "Disbursal Manager 3", "2024-09-17"],
        ["1204", "Pending", "2024-09-06", "Online", "James Wilson", "Florida", "Miami", "Branch NN", "555-0000", "DEF901234L", "Business", "Pending", "Manager 4", "2024-09-14", "$6500", "Disbursal Manager 4", "2024-09-18"]
      ]}/>}/>
     <Route path="/disbursal-send-back" element={ <DynamicTable 
      header={["Lead Id", "Action", "Applied On", "Source", "Name", "State", "City", "Branch", "Mobile", "Pan", "UserType", "Status", "Sanction Manager", "Sanction-On", "Sanction-Amount", "Disbursal Manager"]}
      rows={[
        ["1301", "Sent Back", "2024-09-09", "Online", "Mia Taylor", "California", "San Francisco", "Branch OO", "555-1111", "GHI123456M", "Individual", "Sent Back", "Manager 1", "2024-09-10", "$3000", "Disbursal Manager 1"],
        ["1302", "Sent Back", "2024-09-08", "Offline", "Noah White", "New York", "Manhattan", "Branch PP", "555-2222", "JKL789012N", "Business", "Sent Back", "Manager 2", "2024-09-12", "$4000", "Disbursal Manager 2"],
        ["1303", "Sent Back", "2024-09-07", "Referral", "Olivia Martinez", "Texas", "Austin", "Branch QQ", "555-3333", "MNO345678O", "Individual", "Sent Back", "Manager 3", "2024-09-11", "$3500", "Disbursal Manager 3"],
        ["1304", "Sent Back", "2024-09-06", "Online", "Ethan Lewis", "Florida", "Tampa", "Branch RR", "555-4444", "PQR901234P", "Business", "Sent Back", "Manager 4", "2024-09-14", "$5000", "Disbursal Manager 4"]
      ]}/>}/>
   <Route path="/disbursed" element={ <DynamicTable 
      header={["Lead Id", "Action", "Applied On", "Source", "Name", "State", "City", "Branch", "Mobile", "Pan", "UserType", "Status"]}
      rows={[
        ["1401", "Disbursed", "2024-09-09", "Online", "Emily Johnson", "California", "Los Angeles", "Branch SS", "555-5555", "STU123456Q", "Individual", "Disbursed"],
        ["1402", "Disbursed", "2024-09-08", "Offline", "James Brown", "New York", "Staten Island", "Branch TT", "555-6666", "VWX789012R", "Business", "Disbursed"],
        ["1403", "Disbursed", "2024-09-07", "Referral", "Ava Davis", "Texas", "San Antonio", "Branch UU", "555-7777", "YZA345678S", "Individual", "Disbursed"],
        ["1404", "Disbursed", "2024-09-06", "Online", "William Miller", "Florida", "Orlando", "Branch VV", "555-8888", "BCD901234T", "Business", "Disbursed"]
      ]}/>}/>
      <Route path="/pre-collection" element={<DynamicTable 
      header={["Lead Id", "Action", "Applied On", "Source", "Name", "State", "City", "Branch", "Mobile", "Pan", "UserType", "Status"]}
      rows={[
        ["1501", "Pre-Collection", "2024-09-09", "Online", "Liam Wilson", "California", "Sacramento", "Branch WW", "555-9999", "EFG123456U", "Individual", "Pre-Collection"],
        ["1502", "Pre-Collection", "2024-09-08", "Offline", "Sophia Taylor", "New York", "Queens", "Branch XX", "555-0000", "HIJ789012V", "Business", "Pre-Collection"],
        ["1503", "Pre-Collection", "2024-09-07", "Referral", "Noah Anderson", "Texas", "Houston", "Branch YY", "555-1111", "KLM345678W", "Individual", "Pre-Collection"],
        ["1504", "Pre-Collection", "2024-09-06", "Online", "Emma Thomas", "Florida", "Tampa", "Branch ZZ", "555-2222", "NOP901234X", "Business", "Pre-Collection"]
      ]}/> }/>
     <Route path="/collection-pending" element={<DynamicTable 
      header={["Lead Id", "Action", "Applied On", "Source", "Name", "State", "City", "Branch", "Mobile", "Pan", "UserType", "Status"]}
      rows={[
        ["1601", "Pending Collection", "2024-09-09", "Online", "Oliver Harris", "California", "San Diego", "Branch AAA", "555-3333", "QRS123456Y", "Individual", "Pending Collection"],
        ["1602", "Pending Collection", "2024-09-08", "Offline", "Mia Clark", "New York", "Bronx", "Branch BBB", "555-4444", "TUV789012Z", "Business", "Pending Collection"],
        ["1603", "Pending Collection", "2024-09-07", "Referral", "Elijah Lewis", "Texas", "Dallas", "Branch CCC", "555-5555", "WXY345678A", "Individual", "Pending Collection"],
        ["1604", "Pending Collection", "2024-09-06", "Online", "Isabella Walker", "Florida", "Miami", "Branch DDD", "555-6666", "ZAB901234B", "Business", "Pending Collection"]
      ]}/> }/>
      <Route path="/write-off" element={<DynamicTable 
      header={["Lead Id", "Action", "Applied On", "Source", "Name", "State", "City", "Branch", "Mobile", "Pan", "UserType", "Status"]}
      rows={[
        ["1701", "Write-Off", "2024-09-09", "Online", "Lucas Johnson", "California", "San Jose", "Branch EEE", "555-7777", "CDE123456F", "Individual", "Write-Off"],
        ["1702", "Write-Off", "2024-09-08", "Offline", "Ava Robinson", "New York", "Brooklyn", "Branch FFF", "555-8888", "FGH789012G", "Business", "Write-Off"],
        ["1703", "Write-Off", "2024-09-07", "Referral", "Mason Martinez", "Texas", "Austin", "Branch GGG", "555-9999", "IJK345678H", "Individual", "Write-Off"],
        ["1704", "Write-Off", "2024-09-06", "Online", "Sophia Lopez", "Florida", "Orlando", "Branch HHH", "555-0000", "LMN901234I", "Business", "Write-Off"]
      ]}/>}/>
<Route path="/settlement" element={ <DynamicTable 
      header={["Lead Id", "Action", "Applied On", "Source", "Name", "State", "City", "Branch", "Mobile", "Pan", "UserType", "Status"]}
      rows={[
        ["1801", "Settlement", "2024-09-09", "Online", "Charlotte White", "California", "Santa Clara", "Branch III", "555-1111", "NOP123456J", "Individual", "Settlement"],
        ["1802", "Settlement", "2024-09-08", "Offline", "Ethan King", "New York", "Manhattan", "Branch JJJ", "555-2222", "QRS789012K", "Business", "Settlement"],
        ["1803", "Settlement", "2024-09-07", "Referral", "Amelia Adams", "Texas", "Dallas", "Branch KKK", "555-3333", "TUV345678L", "Individual", "Settlement"],
        ["1804", "Settlement", "2024-09-06", "Online", "James Clark", "Florida", "Orlando", "Branch LLL", "555-4444", "WXY901234M", "Business", "Settlement"]
      ]}/> }/>

    <Route  path="/recovery-pending" element={<DynamicTable 
      header={["Lead Id", "Action", "Applied On", "Source", "Name", "State", "City", "Branch", "Mobile", "Pan", "UserType", "Status"]}
      rows={[
        ["1901", "Pending Recovery", "2024-09-09", "Online", "Olivia Johnson", "California", "Fresno", "Branch MMM", "555-5555", "XYZ123456N", "Individual", "Pending Recovery"],
        ["1902", "Pending Recovery", "2024-09-08", "Offline", "Liam Brown", "New York", "Harlem", "Branch NNN", "555-6666", "ABC789012O", "Business", "Pending Recovery"],
        ["1903", "Pending Recovery", "2024-09-07", "Referral", "Ella Martinez", "Texas", "Austin", "Branch OOO", "555-7777", "DEF345678P", "Individual", "Pending Recovery"],
        ["1904", "Pending Recovery", "2024-09-06", "Online", "Noah Wilson", "Florida", "Miami", "Branch PPP", "555-8888", "GHI901234Q", "Business", "Pending Recovery"]
      ]}/>}/>
<Route path="/closure" element={<DynamicTable 
      header={["Lead Id", "Action", "Applied On", "Source", "Name", "State", "City", "Branch", "Mobile", "Pan", "UserType", "Status"]}
      rows={[
        ["2001", "Closure", "2024-09-09", "Online", "Isabella Moore", "California", "San Francisco", "Branch QQQ", "555-9999", "JKL123456R", "Individual", "Closure"],
        ["2002", "Closure", "2024-09-08", "Offline", "Jacob Lee", "New York", "Staten Island", "Branch RRR", "555-0000", "MNO789012S", "Business", "Closure"],
        ["2003", "Closure", "2024-09-07", "Referral", "Mia Allen", "Texas", "El Paso", "Branch SSS", "555-1111", "PQR345678T", "Individual", "Closure"],
        ["2004", "Closure", "2024-09-06", "Online", "Ethan Young", "Florida", "Tampa", "Branch TTT", "555-2222", "STU901234U", "Business", "Closure"]
      ]}/>}/>
      <Route path="/pre-closure" element={<DynamicTable 
      header={["Lead Id", "Action", "Applied On", "Source", "Name", "State", "City", "Branch", "Mobile", "Pan", "UserType", "Status", "Payment Uploaded By", "Payment Uploaded On"]}
      rows={[
        ["2101", "Pre-Closure", "2024-09-09", "Online", "Sophia Harris", "California", "San Diego", "Branch UUU", "555-3333", "VWX123456Y", "Individual", "Pre-Closure", "John Doe", "2024-09-08"],
        ["2102", "Pre-Closure", "2024-09-08", "Offline", "Liam Clark", "New York", "Brooklyn", "Branch VVV", "555-4444", "YZA789012Z", "Business", "Pre-Closure", "Jane Smith", "2024-09-07"],
        ["2103", "Pre-Closure", "2024-09-07", "Referral", "Emma Lewis", "Texas", "Houston", "Branch WWW", "555-5555", "BCD345678A", "Individual", "Pre-Closure", "Michael Johnson", "2024-09-06"],
        ["2104", "Pre-Closure", "2024-09-06", "Online", "Oliver Walker", "Florida", "Orlando", "Branch XXX", "555-6666", "EFG901234B", "Business", "Pre-Closure", "Emily Davis", "2024-09-05"]
      ]}/>}/>
      <Route path="/legal" element={<DynamicTable 
      header={["Lead Id", "Action", "Applied On", "Source", "Name", "State", "City", "Branch", "Mobile", "Pan", "UserType", "Status"]}
      rows={[
        ["2201", "Legal Review", "2024-09-09", "Online", "Ava Thompson", "California", "Sacramento", "Branch YYY", "555-7777", "GHI123456C", "Individual", "Legal Review"],
        ["2202", "Legal Review", "2024-09-08", "Offline", "Mason Scott", "New York", "Queens", "Branch ZZZ", "555-8888", "JKL789012D", "Business", "Legal Review"],
        ["2203", "Legal Review", "2024-09-07", "Referral", "Isabella Martinez", "Texas", "San Antonio", "Branch AAA", "555-9999", "MNO345678E", "Individual", "Legal Review"],
        ["2204", "Legal Review", "2024-09-06", "Online", "Liam Robinson", "Florida", "Tallahassee", "Branch BBB", "555-0000", "PQR901234F", "Business", "Legal Review"]
      ]}/>}/>
      <Route path="/visit-request" element={<DynamicTable 
      header={["Lead Id", "Action", "Applied On", "Source", "Name", "State", "City", "Branch", "Mobile", "Pan", "UserType", "Status"]}
      rows={[
        ["2301", "Visit Scheduled", "2024-09-09", "Online", "Lucas Green", "California", "Los Angeles", "Branch CCC", "555-1234", "STU567890G", "Individual", "Visit Scheduled"],
        ["2302", "Visit Scheduled", "2024-09-08", "Offline", "Mia Adams", "New York", "Manhattan", "Branch DDD", "555-2345", "VWX678901H", "Business", "Visit Scheduled"],
        ["2303", "Visit Scheduled", "2024-09-07", "Referral", "Ethan Wright", "Texas", "Dallas", "Branch EEE", "555-3456", "YZA789012I", "Individual", "Visit Scheduled"],
        ["2304", "Visit Scheduled", "2024-09-06", "Online", "Olivia Harris", "Florida", "Jacksonville", "Branch FFF", "555-4567", "BCD890123J", "Business", "Visit Scheduled"]
      ]}/>}/>
<Route path="/visit-pending" element={<DynamicTable 
      header={["Lead Id", "Action", "Applied On", "Source", "Name", "State", "City", "Branch", "Mobile", "Pan", "UserType", "Status"]}
      rows={[
        ["2401", "Visit Pending", "2024-09-09", "Online", "Ava Brown", "California", "San Jose", "Branch GGG", "555-5678", "EFG123456K", "Individual", "Visit Pending"],
        ["2402", "Visit Pending", "2024-09-08", "Offline", "Liam Johnson", "New York", "Harlem", "Branch HHH", "555-6789", "HIJ234567L", "Business", "Visit Pending"],
        ["2403", "Visit Pending", "2024-09-07", "Referral", "Sophia Wilson", "Texas", "Austin", "Branch III", "555-7890", "JKL345678M", "Individual", "Visit Pending"],
        ["2404", "Visit Pending", "2024-09-06", "Online", "Noah Davis", "Florida", "Miami", "Branch JJJ", "555-8901", "LMN456789N", "Business", "Visit Pending"]
      ]}/>}/>
      <Route path="/visit-completed" element={<DynamicTable 
      header={["Lead Id", "Action", "Applied On", "Source", "Name", "State", "City", "Branch", "Mobile", "Pan", "UserType", "Status"]}
      rows={[
        ["2501", "Visit Completed", "2024-09-09", "Online", "Emily Clark", "California", "San Francisco", "Branch KKK", "555-9012", "NOP567890O", "Individual", "Visit Completed"],
        ["2502", "Visit Completed", "2024-09-08", "Offline", "James Lee", "New York", "Staten Island", "Branch LLL", "555-0123", "QRS678901P", "Business", "Visit Completed"],
        ["2503", "Visit Completed", "2024-09-07", "Referral", "Olivia Martinez", "Texas", "Houston", "Branch MMM", "555-1234", "TUV789012Q", "Individual", "Visit Completed"],
        ["2504", "Visit Completed", "2024-09-06", "Online", "Benjamin Taylor", "Florida", "Tampa", "Branch NNN", "555-2345", "WXY890123R", "Business", "Visit Completed"]
      ]}/>}/>
      <Route path="/feedback" element={ <DynamicTable 
      header={["Lead Id", "Action", "Feedback On", "Source", "Name", "State", "City", "Mobile", "Pan", "UserType", "Feedback Remark", "Status", "CIF No", "Loan No"]}
      rows={[
        ["2601", "Feedback Received", "2024-09-09", "Online", "Ava Wilson", "California", "Los Angeles", "555-1234", "ABC123456X", "Individual", "Excellent Service", "Completed", "CIF001", "LN001"],
        ["2602", "Feedback Received", "2024-09-08", "Offline", "Mason Johnson", "New York", "Brooklyn", "555-2345", "DEF234567Y", "Business", "Needs Improvement", "Pending", "CIF002", "LN002"],
        ["2603", "Feedback Received", "2024-09-07", "Referral", "Isabella Martinez", "Texas", "Dallas", "555-3456", "GHI345678Z", "Individual", "Good Experience", "Resolved", "CIF003", "LN003"],
        ["2604", "Feedback Received", "2024-09-06", "Online", "Liam Smith", "Florida", "Miami", "555-4567", "JKL456789A", "Business", "Average Service", "Completed", "CIF004", "LN004"]
      ]}/>}/>
      <Route path="/enquiry" element={<DynamicTable 
      header={["Sr No", "Action", "Name", "Email", "Mobile", "Loan Amount", "City", "Initiated On"]}
      rows={[
        ["1", "Viewed", "Emma Johnson", "emma.johnson@example.com", "555-6789", "$15,000", "San Francisco", "2024-09-09"],
        ["2", "Contacted", "Olivia Brown", "olivia.brown@example.com", "555-7890", "$22,000", "Los Angeles", "2024-09-08"],
        ["3", "In Progress", "Liam Smith", "liam.smith@example.com", "555-8901", "$30,000", "New York", "2024-09-07"],
        ["4", "Converted", "Noah Davis", "noah.davis@example.com", "555-9012", "$12,000", "Miami", "2024-09-06"]
      ]}/>}/>

              <Route path="/form" element={<TableForm />} /> {/* Route for TableForm */}
              <Route path="/search" element={<SearchForm/>} />
              <Route path="/export-form" element={<ExportForm />} />
              <Route path="/mis-report" element={<MISReport />} />


            </Routes>
              </div> 
          </>}
       
      
    </Router>
  );
}

export default App;