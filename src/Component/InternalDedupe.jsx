import React, { useEffect, useState } from 'react'
import { useGetInternalDedupeQuery } from '../Service/Query'
import { useParams } from 'react-router-dom'

const InternalDedupe = () => {
    const { id } = useParams()
    const [leadHistory, setLeadHistory] = useState(null)
    const { data, isSuccess, isError } = useGetInternalDedupeQuery(id, { skip: id === null })

    console.log('dddddddd', history, data)

    useEffect(() => {
        if (isSuccess) {
            setLeadHistory(data.leadHistory)

        }

    }, [isSuccess])
    return (
        <>
            {isSuccess &&
                <div className="accordion mt-3" id="accordionExample" style={{ borderRadius: "15px" }}>
                    <div className="accordion-item" data-bs-toggle="collapse" style={{ maxWidth: "700px", margin: "0 auto" }}>
                        <h2 className="accordion-header" id="headingOne">
                            <button
                                className="accordion-button"
                                type="button"
                                data-bs-toggle="collapse"
                                data-bs-target="#collapseOne"
                                aria-expanded="true"
                                aria-controls="collapseOne"
                                style={{ backgroundColor: "#e823eb", borderRadius: "15px" }}
                            >
                                <strong>Internal Dedupe</strong>

                            </button>
                        </h2>
                        <div
                            id="collapseOne"
                            className="accordion-collapse collapse"
                            aria-labelledby="headingOne"
                            data-bs-parent="#accordionExample"
                        >
                            <h1>Internal Dedupe</h1>
                            <table className="table table-striped">
                                <thead>
                                    <tr>
                                        <th scope="col">#</th>
                                        <th scope="col">Name</th>
                                        <th scope="col">Loan Amount</th>
                                        <th scope="col">Salary</th>
                                        <th scope="col">Approved</th>
                                        <th scope="col">Rejected</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {
                                        leadHistory && leadHistory.length && leadHistory.map((lead, index) => 

                                    <tr key={lead._id}>
                                        <th scope="row">{index +1}</th>
                                        <td>{lead?.fName + " " + lead?.mName + " " + lead.lName}</td>
                                        <td>{lead?.loanAmount}</td>
                                        <td>{lead?.salary}</td>
                                        <td>{!lead?.isRejected ? "Approved" : "NA"}</td>
                                        <td>{lead?.isRejected ? "Rejected": "NA"}</td>
                                    </tr>
                                        )}
                                    
                                </tbody>
                            </table>

                        </div>
                    </div>
                </div>

            }

        </>
    )
}

export default InternalDedupe
