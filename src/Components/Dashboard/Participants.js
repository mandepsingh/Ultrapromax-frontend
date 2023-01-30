import React from 'react'
import { FiCheck, FiX } from "react-icons/fi";
import './Participants.css';

function Participants(props) {
    var participantNo = 1;

  return (
    <>
    <div className="contest_participants">
        {/* <h4>Participants Status</h4> */}
        <table className="table table-striped table-borderless table-hover">
            <thead className="thead-dark">
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
                    <tr key={record._id} >
                        <th scope="row">{participantNo++}</th>
                        <td>{record.username}</td>
                        <td>{record.userid  && record.userid.slice(18)}</td>
                        
                        {
                            record.permissionstatus === "accept" ? <td><FiCheck size={18}/></td> :
                            (record.permissionstatus === "decline" ? <td><FiX size={18}/></td> :
                            <td>---</td>)
                        }
                        {
                            record.paymentstatus === "accept" ? <td><FiCheck size={18}/></td> :
                            (record.paymentstatus === "decline" ? <td><FiX size={18}/></td> :
                            <td>---</td>)
                        }
                        {
                            ( record.paymentstatus === "accept" && record.permissionstatus === "accept") ? 
                            <td><span className='joined_cls'>Joined</span></td> :
                            ((record.paymentstatus === "decline" || record.permissionstatus === "decline") ? 
                            <td><FiX size={18}/></td> :
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
