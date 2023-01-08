import React from 'react'
import { FaCheck, FaTimes } from "react-icons/fa";

function Participants(props) {
    var participantNo = 1;

  return (
    <>
    <div className="contest_participants">
        <h4>Participants Status</h4>
        <table className="table table-striped">
        <thead>
            <tr>
            <th scope="col">S.No.</th>
            <th scope="col">Name</th>
            <th scope="col">User Id</th>
            <th scope="col">Permission</th>
            <th scope="col">Payment</th>
            <th scope="col">Overall status</th>
            </tr>
        </thead>
        <tbody>
        {
            props.participants && props.participants.map( record =>{
            return(    
                <tr key={record._id}>
                    <th scope="row">{participantNo++}</th>
                    <td>{record.username}</td>
                    <td>{record.userid  && record.userid.slice(18)}</td>
                    {/* console.log(); */}
                    {
                        record.permissionstatus === "accept" ? <td><FaCheck size={20}/></td> :
                        (record.permissionstatus === "decline" ? <td><FaTimes size={20}/></td> :
                        <td>---</td>)
                    }
                    {
                        record.paymentstatus === "accept" ? <td><FaCheck size={20}/></td> :
                        (record.paymentstatus === "decline" ? <td><FaTimes size={20}/></td> :
                        <td>---</td>)
                    }
                    {
                        ( record.paymentstatus === "accept" && record.permissionstatus === "accept") ? 
                        <td><FaCheck size={20}/></td> :
                        ((record.paymentstatus === "decline" || record.permissionstatus === "decline") ? 
                        <td><FaTimes size={20}/></td> :
                        <td>---</td>)
                    }
                </tr>
                )}
            )
        }
        </tbody>
        </table>
        </div>
    </>
  )
}

export default Participants
