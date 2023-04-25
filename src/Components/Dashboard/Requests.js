import React, { useState } from 'react'
import { FiCheck, FiX } from "react-icons/fi";

function Requests(props) {
    var reqNo = 1;
    const [disablebutton, setDisablebutton]= useState(false);

    ////        Accept on decline Request function 

    const updateStatus = async (action, targetuserId) => {
        setDisablebutton(true)
        console.log(action, targetuserId);
        try {
          const res = await fetch(`${process.env.REACT_APP_BACKEND_LOCAL_HOST}/participant_status/permission/`+ props.contestId + `/` + targetuserId + `/` + action, {
            method: 'PATCH',
            credentials: "same-origin",
            headers: {
              'Accept': 'application/json',
              'Content-Type': 'application/json',
            },
            credentials: "include",
          }).then((result) => {
            return result.json();
          }).then((data) => {
            console.log("sadfasdfasd",data);
          })
        }
        catch (err) {
          console.log(err);
        }
      }
  
  
  return (
    <>
      <div className="contest_participants">

        {/* <h4 className='m-2'>Requests </h4> */}
        
            <table className="table table-striped">
            <thead>
                <tr>
                <th scope="col">S.No.</th>
                <th scope="col">Name</th>
                <th scope="col">UserId</th>
                <th scope="col">Accept</th>
                <th scope="col">Decline</th>
                </tr>
            </thead>
            <tbody>
            {
                props.request && props.request.map( record =>{
                    return(
                      
                    <tr key={record._id}>
                    <th scope="row">{reqNo++}</th>
                    <td>{record.username}</td>
                    <td>{record.userid}</td>
                    {
                      disablebutton===false && <td><button className='accept_req mx-2' onClick ={()=>{updateStatus("accept", record.userid)}}><FiCheck size={20}/></button></td>
                    }
                    {
                      disablebutton===false && <td><button className='reject_req mx-2' onClick ={()=>updateStatus("decline", record.userid)}><FiX size={20}/></button></td>
                    }
                    
                    </tr>
                    )
                }
                )
            }
                
            </tbody>
            </table>
        
        </div>

    </>
  )
}

export default Requests
