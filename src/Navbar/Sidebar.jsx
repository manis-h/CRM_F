import React, { useState } from 'react';
import './Sidebar.css'; // Ensure this CSS file is created with the styles below
import Accordion from 'react-bootstrap/Accordion';
import { Link, NavLink } from 'react-router-dom';
import useAuthStore from '../Component/store/authStore';


const Sidebar = ({ isSidebarOpen, setIsSidebarOpen }) => {
    const {empInfo} = useAuthStore()
    // const [isSidebarOpen, setIsSidebarOpen] = useState(true);

    const toggleSidebar = () => {
        setIsSidebarOpen(!isSidebarOpen);
    };

    return (
        <>
            {isSidebarOpen && <div className={`sidebar ${isSidebarOpen ? 'open' : 'closed'}`}>

                <div className='sidebar-margin'>
                    <ul className="sidebar-links">
                        {(empInfo?.empRole === "screener" || empInfo?.empRole === "admin" || empInfo?.empRole === "sanctionHead")&&<Accordion defaultActiveKey="0">
                            <Accordion.Item eventKey="0">
                                <Accordion.Header> <i className="bi bi-person" style={{ marginRight: '8px' }}></i>  Lead</Accordion.Header>
                                <Accordion.Body>
                                    <ul className='sidebar-text  '>
                                        <li ><NavLink to="/lead-new" className={({ isActive }) => (isActive ? 'nav-link active' : 'nav-link')}>New Lead</NavLink>    </li>
                                        <li><NavLink to="/lead-process" className={({ isActive }) => (isActive ? 'nav-link active' : 'nav-link')}>Lead-Inprocess</NavLink></li>
                                        <li> <NavLink to="/lead-hold" className={({ isActive }) => (isActive ? 'nav-link active' : 'nav-link')}>Hold Lead </NavLink>   </li>
                                        <li> <NavLink to="/rejected-leads" className={({ isActive }) => (isActive ? 'nav-link active' : 'nav-link')}>Rejected Lead</NavLink>   </li>
                                    </ul>
                                </Accordion.Body>
                            </Accordion.Item>
                        </Accordion>}

                        {empInfo?.empRole === "creditManager" && 
                        <Accordion defaultActiveKey="0">
                            <Accordion.Item eventKey="1">
                                <Accordion.Header> <i className="bi bi-app" style={{ marginRight: '8px' }}></i> Application</Accordion.Header>
                                <Accordion.Body>
                                    <ul className='sidebar-text'>
                                        <li><Link to="/new-application"> New</Link></li>
                                        <li><Link to="/application-process">Inprocess</Link></li>
                                        <li><Link to="/application-hold">Hold</Link></li>
                                        <li><Link to="/rejected-applications">Rejected Applications</Link></li>
                                    </ul>
                                </Accordion.Body>
                            </Accordion.Item>
                        </Accordion>
                        }


<>
  {empInfo?.empRole === "sanctionHead" && (
    <Accordion defaultActiveKey="0">
      <Accordion.Item eventKey="1">
        <Accordion.Header>
          <i className="bi bi-app" style={{ marginRight: '8px' }}></i> Application
        </Accordion.Header>
        <Accordion.Body>
          <ul className="sidebar-text">
            <li>
              <Link to="/new-application">New</Link>
            </li>
            <li>
              <Link to="/application-process">Inprocess</Link>
            </li>
            <li>
              <Link to="/application-hold">Hold</Link>
            </li>
            <li>
              <Link to="/application-sent-back">Sent-Back</Link>
            </li>
          </ul>
        </Accordion.Body>
      </Accordion.Item>
    </Accordion>
  )}

  <Accordion defaultActiveKey="0">
    <Accordion.Item eventKey="4">
      <Accordion.Header>
        <i className="bi bi-check" style={{ marginRight: '8px' }}></i> Sanction
      </Accordion.Header>
      <Accordion.Body>
        <ul className="sidebar-text">
          <li>
            <Link to="/sanction-approve">Approve</Link>
          </li>
          <li>
            <Link to="/sanction-reject">Reject</Link>
          </li>
          <li>
            <Link to="/sanction-sentback">SentBack</Link>
          </li>
        </ul>
      </Accordion.Body>
    </Accordion.Item>
  </Accordion>
</>


                        {/* {
                            empInfo?.empRole === "sanctionHead" && <Accordion defaultActiveKey="0">
                            <Accordion.Item eventKey="1">
                                <Accordion.Header> <i className="bi bi-app" style={{ marginRight: '8px' }}></i> Application</Accordion.Header>
                                <Accordion.Body>
                                    <ul className='sidebar-text'>
                                        <li><Link to="/new-application"> New</Link></li>
                                        <li><Link to="/application-process">Inprocess</Link></li>
                                        <li><Link to="/application-hold">Hold</Link></li>
                                        <li><Link to="/application-sent-back">Sent-Back</Link></li>
                                    </ul>
                                </Accordion.Body>
                            </Accordion.Item>
                        </Accordion> || <Accordion defaultActiveKey="0">
                            <Accordion.Item eventKey="4">
                                <Accordion.Header> <i className="bi bi-check" style={{ marginRight: '8px' }}></i> Sanction</Accordion.Header>
                                <Accordion.Body>
                                    <ul className='sidebar-text'>
                                        <li><Link to='/sanction'>Sanction</Link></li>
                                    </ul>
                                </Accordion.Body>
                            </Accordion.Item>
                        </Accordion>
                        
                        } */}
                        {/* <Accordion defaultActiveKey="0">
                            <Accordion.Item eventKey="3">
                                <Accordion.Header> <i className="bi bi-x" style={{ marginRight: '8px' }}></i> Reject App</Accordion.Header>
                                <Accordion.Body>
                                    <ul className='sidebar-text'>
                                        <li><Link to="/reject">Reject</Link></li>

                                    </ul>
                                </Accordion.Body>
                            </Accordion.Item>
                        </Accordion>
                        <Accordion defaultActiveKey="0">
                            <Accordion.Item eventKey="4">
                                <Accordion.Header> <i className="bi bi-check" style={{ marginRight: '8px' }}></i> Sanction</Accordion.Header>
                                <Accordion.Body>
                                    <ul className='sidebar-text'>
                                        <li><Link to='/sanction'>Sanction</Link></li>
                                    </ul>
                                </Accordion.Body>
                            </Accordion.Item>
                        </Accordion>
                        <Accordion defaultActiveKey="0">
                            <Accordion.Item eventKey="5">
                                <Accordion.Header> <i className="bi bi-currency-dollar" style={{ marginRight: '8px' }}></i> Disbursal</Accordion.Header>
                                <Accordion.Body>
                                    <ul className='sidebar-text'>
                                        <li><Link to="/disbursal-new">Disbursal-New</Link></li>
                                        <li><Link to="/disbursal-inprocess">Disbursal-Inprocess</Link></li>
                                        <li><Link to="/disbursal-hold">Disbursal-Hold</Link></li>
                                        <li><Link to="/disbursal-send-back">Disbursal-Send-Back</Link></li>

                                        <li><Link to="/disbursal-pending">Disbursal-Pending</Link></li>
                                    </ul>
                                </Accordion.Body>
                            </Accordion.Item>
                        </Accordion>
                        <Accordion defaultActiveKey="0">
                            <Accordion.Item eventKey="6">
                                <Accordion.Header> <i className="bi bi-archive" style={{ marginRight: '8px' }}></i> Disbursed</Accordion.Header>
                                <Accordion.Body>
                                    <ul className='sidebar-text'>
                                        <li><Link to="/disbursed">Disbursed</Link></li>
                                    </ul>
                                </Accordion.Body>
                            </Accordion.Item>
                        </Accordion>
                        <Accordion defaultActiveKey="0">
                            <Accordion.Item eventKey="7">
                                <Accordion.Header> <i className="bi bi-bag" style={{ marginRight: '8px' }}></i> Collection</Accordion.Header>
                                <Accordion.Body>
                                    <ul className='sidebar-text'>
                                        <li><Link to="/write-off">Write-Off</Link></li>
                                        <li><Link to="/settlement">Settlement</Link></li>

                                        <li><Link to="/pre-collection">Pre-Collection</Link></li>
                                        <li><Link to="/collection-pending">Collection-Pending</Link></li>
                                        <li><Link to="/recovery-pending">Recovery-Pending</Link></li>
                                    </ul>
                                </Accordion.Body>
                            </Accordion.Item>
                        </Accordion>
                        <Accordion defaultActiveKey="0">
                            <Accordion.Item eventKey="8">
                                <Accordion.Header> <i className="bi bi-people" style={{ marginRight: '8px' }}></i> Legal</Accordion.Header>
                                <Accordion.Body>
                                    <ul className='sidebar-text'>
                                        <li><Link to="/legal">Legal</Link></li>
                                    </ul>
                                </Accordion.Body>
                            </Accordion.Item>
                        </Accordion>
                        <Accordion defaultActiveKey="0">
                            <Accordion.Item eventKey="9">
                                <Accordion.Header> <i className="bi bi-wallet" style={{ marginRight: '8px' }}></i> Accounts</Accordion.Header>
                                <Accordion.Body>
                                    <ul className='sidebar-text'>
                                        <li><Link to="/pre-closure">Pre-Closure</Link></li>
                                        <li><Link to="/closure">Closure</Link></li>
                                    </ul>
                                </Accordion.Body>
                            </Accordion.Item>
                        </Accordion>
                        <Accordion defaultActiveKey="0">
                            <Accordion.Item eventKey="2">
                                <Accordion.Header> <i className="bi bi-file-earmark-text" style={{ marginRight: '8px' }}></i>Visit</Accordion.Header>
                                <Accordion.Body>
                                    <ul className='sidebar-text'>
                                        <li><Link to="/visit-request">Visit-Request</Link></li>
                                        <li><Link to="/visit-pending">Visit-Pending</Link></li>
                                        <li><Link to="/visit-completed">Visit-Completed</Link></li>
                                    </ul>
                                </Accordion.Body>
                            </Accordion.Item>
                        </Accordion>


                        <Accordion defaultActiveKey="0">
                            <Accordion.Item eventKey="10">
                                <Accordion.Header> <i className="bi bi-app" style={{ marginRight: '8px' }}></i> Others</Accordion.Header>
                                <Accordion.Body>
                                    <div className='sidebar-text'>
                                        <li><Link to="/feedback">Costumer FeadBack</Link></li>
                                        <li><Link to="/export-form">Export</Link></li>
                                        <li><Link to="/mis-report">MIS Report</Link></li>
                                        <li><Link to="/enquiry">Enquiry</Link></li>
                                        <li><Link to="/search">Search</Link></li>

                                    </div>
                                </Accordion.Body>
                            </Accordion.Item>
                        </Accordion> */}


                    </ul></div>
            </div>}

            <button className="sidebar-toggle-btn" data-toggle="offcanvas" onClick={toggleSidebar}>
                <i className={`bi ${isSidebarOpen ? ' bi bi-toggle-on' : 'bi bi-toggle-off'}`}></i>
            </button>
        </>
    );
};

export default Sidebar;
