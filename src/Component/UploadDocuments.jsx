import React, { useEffect, useState } from 'react';
import { useGetLeadDocsQuery, useUploadDocumentsMutation } from '../Service/Query';
import { useParams } from 'react-router-dom';
import Swal from 'sweetalert2';

const UploadDocuments = ({setUploadedDocs, uploadedDocs }) => {
    const { id } = useParams();
    // const [docs,setDocs] = useState(leadDocuments)
    const [selectedFileType, setSelectedFileType] = useState(null);

    const [uploadDocuments, { data: updateDocs, isSuccess: docSuccess, error: docsError }] = useUploadDocumentsMutation();
    
    const { data: docsData, isSuccess: docsSuccess, isError: docError, refetch } = useGetLeadDocsQuery(
        { id, docType: selectedFileType }, 
        { skip: !selectedFileType || !id } // Only skip if there's no file type selected or no ID
    );
    console.log('uploadede documenst',selectedFileType)

    const [documents, setDocuments] = useState({
        aadhaarFront: null,
        aadhaarBack: null,
        panCard: null,
        salarySlip: null,
        bankStatement: null,
    });

    // Handle file change for document uploads
    const handleChange = (e) => {
        if (e.target.type === 'file') {
            const file = e.target.files[0];
            const name = e.target.name;
            setDocuments({ ...documents, [name]: file });
        }
    };

    // Trigger fetching the document when a file type is selected
    const viewFile = (docType) => {
        setSelectedFileType(docType); // This will trigger the query since the component is re-rendered
        // if(selectedFileType){
        //     refetch()
        // }
    };

    // Handle document upload
    const documentSubmit = (e) => {
        e.preventDefault();
        const docsData = new FormData();

        for (let key of Object.keys(documents)) {
            if (documents[key]) {
                docsData.append(key, documents[key]);
            }
        }

        uploadDocuments({ id, docsData });
        setDocuments({
            aadhaarFront: null,
            aadhaarBack: null,
            panCard: null,
            salarySlip: null,
            bankStatement: null,
        })
    };

    // Success for document upload
    useEffect(() => {
        if (docSuccess) {
            Swal.fire({
                title: 'Documents uploaded successfully!',
                icon: 'success',
            });
        }
        // setUploadedDocs([...uploadedDocs,])
    }, [docSuccess, updateDocs]);

    // Error handling for fetching document
    useEffect(() => {
        if (docsError) {
            Swal.fire({
                title: 'Error!',
                text: 'Unable to fetch the document.',
                icon: 'error',
            });
        }
    }, [docsError]);

    // Handle document display success
    useEffect(() => {
        if (docsSuccess) {
            Swal.fire({
                title: 'Document retrieved successfully!',
                html: `<img src="${docsData?.url}" alt="${selectedFileType}" width="400" />`, // Assuming docsData contains image URL
                showCloseButton: true,
                confirmButtonText: 'Close',
                willClose: () => {
                    setSelectedFileType(null); // Reset state on modal close
                }
            });

        }
    }, [docsSuccess, docsData]);

    return (
        <>
            <div className="accordion mt-3" id="uploadDocumentsAccordion">
                <div className="accordion-item mx-40" style={{ maxWidth: "700px", margin: "0 auto" }}>
                    <h2 className="accordion-header" id="headingUploadDocuments">
                        <button
                            className="accordion-button"
                            type="button"
                            data-bs-toggle="collapse"
                            data-bs-target="#collapseUploadDocuments"
                            aria-expanded="false"
                            aria-controls="collapseUploadDocuments"
                            style={{ backgroundColor: "#0366fc", borderRadius: "15px", color: "#fff", fontWeight: 'bold' }}
                        >
                            Upload Documents
                        </button>
                    </h2>
                    <div
                        id="collapseUploadDocuments"
                        className="accordion-collapse collapse"
                        aria-labelledby="headingUploadDocuments"
                        data-bs-parent="#uploadDocumentsAccordion"
                    >
                        <div className="accordion-body">
                            <form className="m-4" onSubmit={documentSubmit}>
                                <div className="row">
                                    {Object.entries(documents).map(([key]) => (
                                        <div className="col-12 mb-3 d-flex align-items-center" key={key}>
                                            <div className="flex-grow-1"> {/* This div allows the input to grow and take available space */}
                                                <label className="form-label">
                                                    Upload {key.charAt(0).toUpperCase() + key.slice(1).replace(/([A-Z])/g, ' $1').replace('Card', ' Card')}:
                                                </label>
                                                <input
                                                    type="file"
                                                    className="form-control"
                                                    name={key}
                                                    accept=".pdf,.doc,.docx,.jpg"
                                                    onChange={handleChange}
                                                />
                                            </div>
                                            {uploadedDocs?.includes(key) && (
                                                <button
                                                    type="button"
                                                    className="btn btn-secondary ms-2" // Added margin start for spacing
                                                    onClick={() => viewFile(key)} // This triggers the query by setting selectedFileType
                                                    style={{ width: "auto", padding: "0.25rem 0.5rem" }} // Adjust padding for smaller button
                                                >
                                                    View file
                                                </button>
                                            )}
                                        </div>
                                    ))}
                                </div>
                                <div className="d-flex justify-content-end">
                                    <button type="submit" className="btn btn-primary">
                                        Upload
                                    </button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default UploadDocuments;
