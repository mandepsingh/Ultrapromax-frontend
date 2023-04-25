import React, {useState, useEffect ,useContext } from 'react'
import SearchContest from '../Search/SearchContest';
import { useNavigate, useParams } from "react-router-dom"
import "./AdminPannel.css"

function UserContestParticipated(props) {
    console.log(props.contest_participated)
    const [filteredContest, setFilteredContest] = useState();
    let navigate = useNavigate();

    const routeChange = (e) =>{
        navigate(`/adminpannel/`+e);
    }
    var i= 1;
    
  return (
    <div>
        <div className='adminpannelcontainer'>
          {/* <div className='adminpannelheading'>
            <h2>Admin Pannel</h2>
          </div> */}
          <div className='adminpannel'>
            <div className='topnavbar'>
              <div className='searchbar'>  
                {
                  props.contest_participated && <SearchContest contests={props.contest_participated} setFilteredContest={setFilteredContest}/>
                }
              </div>
            </div>
            <div className='admintable'>
              <table class="table table-striped">
                  <thead>
                    <tr>
                      <th scope="col">#</th>
                      <th scope="col">Contest ID</th>
                      <th scope="col">Payment Amount</th>
                      <th scope="col">Payment Status</th>
                      <th scope="col">Permission Status</th>
                      <th scope="col">Total Question Solved</th>
                      <th scope="col">Total Solving Time</th>
                      <th scope="col">Winning Amount</th>
                      <th scope="col">Winning Amount Status</th>
                      <th scope="col">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {
                      !filteredContest && (props.contest_participated ? props.contest_participated.map( record => {
                          return(
                              <tr>
                                <th scope="row">{i++}</th>
                                <td>{record.contestid}</td>
                                <td>{record.paymentamount}</td>
                                <td>{record.paymentstatus}</td>
                                <td>{record.permissionstatus}</td>
                                <td>{record.totalquestionsolved}</td>
                                <td>{record.totalsolvingtime}</td>
                                <td>{record.winningamount}</td>
                                <td>{record.winningamountstatus==true? "done": "none"}</td>
                                <td>
                                    <button color="primary" className="px-4"
                                        onClick={() => {routeChange(record.contestid)}}
                                        >
                                        Open
                                    </button>
                                </td>
                              </tr> 
                          )
                      }) 
                      : <div className='mx-3 my-3'>data loading</div> )
                    }
                    {
                      filteredContest && filteredContest !== "no data" && filteredContest.map( record => {
                          return(
                            <tr>
                                {/* <th scope="row">{i++}</th>
                                <td>{record.contestname}</td>
                                <td>{record.amount}</td>
                                <td>{record.level}</td>
                                <td>{record.createdat}</td>
                                <td>{record.timestart}</td>
                                <td>
                                    <button color="primary" className="px-4"
                                        onClick={() => {routeChange(record._id)}}
                                        >
                                        Open
                                    </button>
                                </td> */}
                            </tr>  
                          )
                      })
                    }
                </tbody>
              </table>
            </div>
          </div>
        </div>
    </div>
  )
}

export default UserContestParticipated