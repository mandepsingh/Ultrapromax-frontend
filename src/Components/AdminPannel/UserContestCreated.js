import React, {useState, useEffect ,useContext } from 'react'
import SearchContest from '../Search/SearchContest';
import { useNavigate, useParams } from "react-router-dom"
import "./AdminPannel.css"

function UserContestCreated(props) {
    console.log(props.contest_created)
    const [filteredContest, setFilteredContest] = useState();
    let navigate = useNavigate();

    const routeChange = (e) =>{
        navigate(`/adminpannel/`+e);
    }
    var i= 1;
    
  return (
    <div>
        <div className='adminpannelcontainer'>
          <div className='adminpannelheading'>
            <h2>Admin Pannel</h2>
          </div>
          <div className='adminpannel'>
            <div className='topnavbar'>
              <div className='searchbar'>  
                {
                  props.contest_created && <SearchContest contests={props.contest_created.posts} setFilteredContest={setFilteredContest}/>
                }
              </div>
            </div>
            <div className='admintable'>
              <table class="table table-striped">
                  <thead>
                    <tr>
                      <th scope="col">#</th>
                      <th scope="col">Contest Name</th>
                      <th scope="col">Amount</th>
                      <th scope="col">Level</th>
                      <th scope="col">Created Time</th>
                      <th scope="col">Start Time</th>
                      <th scope="col">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {
                      !filteredContest && (props.contest_created ? props.contest_created.posts.map( record => {
                          return(
                              <tr>
                                <th scope="row">{i++}</th>
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
                                <th scope="row">{i++}</th>
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
                                </td>
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

export default UserContestCreated