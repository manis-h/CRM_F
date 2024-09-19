import React, { useState } from 'react';
import './Sidebar.css'; // Ensure this CSS file is created with the styles below
import Accordion from 'react-bootstrap/Accordion';
import { Link } from 'react-router-dom';


const Sidebar = ({isSidebarOpen, setIsSidebarOpen}) => {
    // const [isSidebarOpen, setIsSidebarOpen] = useState(true);

    const toggleSidebar = () => {
        setIsSidebarOpen(!isSidebarOpen);
    };

    return (
        <>
            {isSidebarOpen&&<div className={`sidebar ${isSidebarOpen ? 'open' : 'closed'}`}>
                
                <div className='sidebar-margin'>
                <ul className="sidebar-links">
                    <Accordion defaultActiveKey="0">
                        <Accordion.Item eventKey="0">
                            <Accordion.Header> <i className="bi bi-person" style={{ marginRight: '8px' }}></i>  Lead</Accordion.Header>
                            <Accordion.Body>
                                <ul className='sidebar-text  '>
                                <li ><Link to="/lead-new">Lead-New</Link>    </li>                          
                                      <li><Link to="/lead-process">Lead-Inprocess</Link></li>
                                    <li> <Link to="/lead-hold">Lead-Hold </Link>   </li>
                                </ul>
                            </Accordion.Body>
                        </Accordion.Item>
                    </Accordion>
                    
                    <Accordion defaultActiveKey="0">
                        <Accordion.Item eventKey="1">
                            <Accordion.Header> <i className="bi bi-app" style={{ marginRight: '8px' }}></i> Application</Accordion.Header>
                            <Accordion.Body>
                                <ul className='sidebar-text'>
                                    <li><Link to="/application-new"> New</Link></li>
                                    <li><Link to="/application-process">Inprocess</Link></li>
                                    <li><Link to="/application-hold">Hold</Link></li>
                                    <li><Link to="/application-sent-back">Sent-Back</Link></li>
                                </ul>
                            </Accordion.Body>
                        </Accordion.Item>
                    </Accordion>
                                     <Accordion defaultActiveKey="0">
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
                    </Accordion>
                   
  
                </ul></div>
            </div>}
            
            <button className="sidebar-toggle-btn"  data-toggle="offcanvas" onClick={toggleSidebar}>
                <i className={`bi ${isSidebarOpen ? ' bi bi-toggle-on' : 'bi bi-toggle-off'}`}></i>
            </button>
        </>
    );
};

export default Sidebar;
