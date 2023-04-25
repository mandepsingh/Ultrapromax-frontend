import React, {useState, useEffect ,useContext } from 'react'
import { UserContext } from "../../App"
import { useParams, useNavigate } from "react-router-dom";
import SearchContest from '../Search/SearchContest';
import "./AdminPannel.css"

function ContestParticipants() {
    const {state, dispatch} = useContext(UserContext);
    const userid = state.userId;
    const username= state.name;
    const [contest_list, setContestlist] = useState();
    const [contestdata, setContestdata]= useState();
    const [filteredContest, setFilteredContest] = useState();
    const [totalPayments, setTotalPayments] = useState(0);

    let navigate = useNavigate(); 
    const params = useParams();
    const contestid = params.contestid;
    // console.log(contestid);
    
    const ContestParticipants = async (e) => {
        try {
            const res = await fetch(`${process.env.REACT_APP_BACKEND_LOCAL_HOST}/participant_status/contest/`+ contestid)
            .then((result) => {
              return result.json();
            }).then(async (data) => {
              // console.log("sadfasdfasd",data);
              await setContestlist(data)
              data.forEach(element => {
                if(element.paymentamount===element.contestamount){
                  setTotalPayments(totalPayments+ 1);
                }
              });
              console.log("hhhh",data)
            })
          }
          catch (err) {
            console.log(err);
        }
    }

    const Contestdata = async (e) => {
      try {
          const res = await fetch(`${process.env.REACT_APP_BACKEND_LOCAL_HOST}/contest/contest/`+ contestid)
          .then((result) => {
            return result.json();
          }).then(async (data) => {
            // console.log("sadfasdfasd",data);
            await setContestdata(data)
            console.log("ffffffffffff",data)
          })
        }
        catch (err) {
          console.log(err);
      }
  }

    useEffect(() => {
      Contestdata();
      ContestParticipants();
        // setLiveTime(Date.now());
        // requestFetch();
        // fetchparticipant();


        // second request to refresh data page load
        // let interval2 = setInterval(()=>{
            
        //     if(contestData && contestData.creatorid === state.userId){
        //         // console.log(" admin")
        //         requestFetch();
        //     }
            
        //     setLiveTime(Date.now());
        //     fetchparticipant();
        // }, 10000);

    }, []);
  
    // function toggleClass(e){
    //     if(activeClass === e){
    //       return "dashboard_active_btn";
    //     }
    //     else return "";
    // }

    
    
    const routeChange = () =>{ 
        let path = `newPath`; 
        navigate(`/adminpannel/submissions/`+contestid+"/"+userid);
    }
    
    var i= 1;

  return (
    <div>
        <div className='adminpannelcontainer'>
          <div className='adminpannelheading'>
            <h2>Admin Pannel</h2>
          </div>
          <div className='contestdata'>
            <div>Contest Name: {contestdata && contestdata.contestname}</div>
            <div>Contest Level: {contestdata && contestdata.level}</div>
            <div>Contest Amount: {contestdata && contestdata.amount}</div>
            <div>Payment done by: {contestdata && totalPayments}</div>
          </div>
          <div className='adminpannel'>
            <div className='topnavbar'>
              <div className='searchbar'>  
                {
                  contest_list && <SearchContest contests={contest_list} setFilteredContest={setFilteredContest}/>
                }
              </div>
            </div>
            <div className='admintable'>
              <table class="table table-striped">
                  <thead>
                    <tr>
                      <th scope="col">#</th>
                      <th scope="col">User Name</th>
                      <th scope="col">ID</th>
                      <th scope="col">Amount Paid</th>
                      <th scope="col">Question Solve</th>
                      <th scope="col">Solve Time</th>
                      <th scope="col">Rank</th>
                      <th scope="col">Amount Win</th>
                      <th scope="col">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {
                      !filteredContest && (contest_list ? contest_list.map( record => {
                          return(
                              <tr>
                                <th scope="row">{i++}</th>
                                <td>{record.username}</td>
                                <td>{record.userid}</td>
                                <td>{record.paymentamount}</td>
                                <td>{record.totalquestionsolved}</td>
                                <td>{record.totalsolvingtime}</td>
                                <td>{record.rank}</td>
                                <td>{record.winningamount}</td>
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
                                <td>{record._id}</td>
                                <td>{record.amount}</td>
                                <td>{record.level}</td>
                                <td>{record.createdat}</td>
                                <td>{record.timestart}</td>
                                <td>{record.creatorname}</td>
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

export default ContestParticipants