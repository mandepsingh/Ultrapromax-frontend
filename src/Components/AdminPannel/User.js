import React, {useState, useEffect ,useContext } from 'react'
import { useNavigate } from "react-router-dom";
import SearchContest from '../Search/SearchContest';
import "./AdminPannel.css"

function User() {

    const [userlist, setUserlist] = useState();
    const [filteredContest, setFilteredContest] = useState();
    const [active, setActive] = useState("allContests");

    let navigate = useNavigate();

    const allContestData = async (e) => {
        setActive("allContests")
        try {
            const res = await fetch(`${process.env.REACT_APP_BACKEND_LOCAL_HOST}/user/alluser`)
            .then((result) => {
              return result.json();
            }).then(async (data) => {
              await setUserlist(data)
              console.log(data)
            })
          }
          catch (err) {
            console.log(err);
        }
    }

    useEffect(() => {
        allContestData();
    }, []);

    const routeChange = (e) =>{
        navigate(`/adminpannel/user/`+e);
    }
    const createNewUser = (e) =>{
      navigate(`/adminpannel/user/createnewuser`);
  }
    var i= 1;

  return (
    <div>
        <div className='adminpannelcontainer'>
          <div className='adminpannel'>
            <div className='topnavbar'>
              <div className='searchbar'>  
                {
                  userlist && <SearchContest contests={userlist} setFilteredContest={setFilteredContest}/>
                }
              </div>
              <button color="primary" className="px-4 createnewuser"
                  onClick={() => {createNewUser()}}
                  >
                  Create New User
              </button>
            </div>
            <div className='admintable'>
              <table class="table table-striped">
                  <thead>
                    <tr>
                      <th scope="col">#</th>
                      <th scope="col">User Name</th>
                      <th scope="col">ID</th>
                      <th scope="col">Amount Win</th>
                      {/* <th scope="col">Question Solved</th> */}
                      <th scope="col">Amount Loose</th>
                      <th scope="col">Contest Participated</th>
                      <th scope="col">Contest Created</th>
                      <th scope="col">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {
                      !filteredContest && userlist && (userlist ? userlist.response.map( record => {
                          return(
                              <tr>
                                <th scope="row">{i++}</th>
                                <td>{record.firstname}</td>
                                <td>{record._id}</td>
                                <td>{record.moneywin}</td>
                                <td>{record.moneyloose}</td>
                                <td>{record.contestparticipated}</td>
                                <td>{record.contestcreated}</td>
                                {/* <td>{record.creatorname}</td> */}
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
                      filteredContest && userlist !== "no data" && userlist.response.map( record => {
                          return(
                            <tr>
                                <th scope="row">{i++}</th>
                                <td>{record.firstname}</td>
                                <td>{record._id}</td>
                                <td>{record.moneywin}</td>
                                <td>{record.moneyloose}</td>
                                <td>{record.contestparticipated}</td>
                                <td>{record.contestcreated}</td>
                                {/* <td>{record.creatorname}</td> */}
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

export default User