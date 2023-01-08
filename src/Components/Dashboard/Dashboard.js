import React, {useState, useEffect, useContext}  from 'react'
import Navbar from '../Navbar/Navbar';
import "./Dashboard.css";
import { useParams, useNavigate } from 'react-router-dom';
import { UserContext } from "../../App";
import Timer from '../Timer/Timer';
import { MdManageSearch } from "react-icons/md";
import Participants from './Participants';
import Requests from './Requests';
import Horizontal_timeline from './Horizontal_timeline';
import Rules from './Rules';
import Prizes from './Prizes';

function Dashboard() {
    const {state, dispatch} = useContext(UserContext);
    const params = useParams();
    const contestId = params.id;
    const userid = state.userId;
    const [contestdata, setContestData] = useState();
    const [request, setRequestData] = useState();
    const [askStatus, setAskStatus] = useState(false);
    const [participants, setParticipants] = useState();
    const [liveTime, setLiveTime] = useState();
    const [triggerContest, setTriggerContest] = useState(true);
    const [timeDiff, setTimeDiff] = useState();
    const [userDetails, setUserDetails] = useState();
    const [activeClass, setActiveClass] = useState("participants");
    const [activeComp, setActiveComp] = useState("participants");
    const [progress, setProgress] = useState(0);

    let btn_classes = ["dashboard_comp"]
    const navigate = useNavigate();
   
    // ask for permission to enter contest
    const askPermision = async (e) => {
        setAskStatus(true);
        try {
            const res = await fetch(`https://ultrapro1.onrender.com/participant_status/permission/`+ contestId + `/` + userid + `/waiting`, {
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
              // console.log(data);
            })
          }
          catch (err) {
            console.log(err);
          }
        }
        // do the payment process
        const doPayment = async (e) => {
          try {
              const res = await fetch(`https://ultrapro1.onrender.com/participant_status/payment/`+ contestId + `/` + userid + `/accept`, {
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
                // console.log("sadfasdfasd",data);
              })
            }
            catch (err) {
              console.log(err);
            }
          }

          // Enter into the contest
          function enterContest(){
            fetch(`https://ultrapro1.onrender.com/contest/entercontest/`+ contestId + `/` + userid,{
                  method : 'POST',
                  headers:{
                      'Accept':'application/json',
                      'Content-Type':'application/json'
                  }
                }).then((result) => {
                  return result.json();
                }).then((data) => {
                  console.log("Enter Contest", data)
                  if(data.entercontest === 'false'){
                    navigate("/home")
                  }
                  else{
                    navigate(`/leaderboard/` + contestId)
                  }
                }).catch((err)=>{
                      console.log(err);   
                });
          }
          

    // const navigate = useNavigate();

    const dataFetch = async () => {
        const result = await (
          await fetch(
            `https://ultrapro1.onrender.com/livecontest/contest/` + contestId
          )
        ).json();
    
        // set state when the data received
        setContestData(result);
        // console.log(result)
      };


      // fetch requests to admin

      const requestFetch = async () => {
        const res = await (
          await fetch(
            
            `https://ultrapro1.onrender.com/participant_status/permissioncheck/` + contestId + `/waiting`
          )
        ).json();
    
        // set state when the data received
        setRequestData(res);
      };

      

      ////// participants status ///
      const fetchparticipant = async () => {
        const res = await (
          await fetch(
            `https://ultrapro1.onrender.com/participant_status/contest/` + contestId
          )
        ).json();
    
        // set state when the data received
        res.forEach(element => {
          if(element.userid == userid){
            setUserDetails(element);
            if(element.permissionstatus === "waiting"){
              setProgress(1);
            }
            if(element.permissionstatus === "accept"){
              setProgress(2);
            }
            if(element.paymentstatus === "accept"){
              setProgress(4);
            }
          }
        });
        setParticipants(res);
      };
    


      useEffect(() => {
        // first request on page load
        const interval1 = setInterval(()=>{
            
            dataFetch();
            setLiveTime(Date.now());
            requestFetch();
            fetchparticipant();
            clearInterval(interval1);
        }, 1000);


        // second request to refresh data page load
        const interval2 = setInterval(()=>{
          try {
            const res = fetch(`https://ultrapro1.onrender.com/livecontest/contest/` + contestId, {
              method: 'GET',
              credentials: "same-origin",
              headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
              },
              credentials: "include",
            }).then((result) => {
              return result.json();
            }).then((data) => {
              if(data && data.creatorid === state.userId){
                // console.log(" admin")
                requestFetch();
              }
            })
          }
          catch (err) {
            console.log(err);
          }
          setLiveTime(Date.now());
          fetchparticipant();
        }, 10000);
      }, []);


      // set active class on click
      function changeClass(classArg){
          setActiveClass(classArg)
          setActiveComp(classArg)
      }

      // return class on buttons
      function toggleClass(e){
        if(activeClass === e){
          return "active_btn";
        }
        else return "";
      }


  return (
    <>
    <Navbar></Navbar>
    <div className="container">
        <h2 className="dashboard_heading">{contestdata && contestdata.contestname}</h2>
        <hr></hr>
        <div className='row flex'>
          <div className='col-md-10 justify-content-center'>
            <Horizontal_timeline progress = {progress}/>
          </div>
          <div className='col-md-2 justify-content-center'>
            {
              userDetails && userDetails.permissionstatus === "none" && triggerContest && <button className="btn btn-success permission_btn" disabled = {askStatus} onClick={askPermision}>Ask to Register</button> 
            }
            {
              userDetails && userDetails.permissionstatus === "waiting" && <button className="btn btn-success permission_btn" disabled = {true} onClick={askPermision}>Ask to Register</button> 
            }
            {
              userDetails && userDetails.permissionstatus === "accept" && userDetails.paymentstatus === "none" && <button className="btn btn-success permission_btn" disabled = {!triggerContest} onClick={doPayment}>Payment</button> 
            }

            {
              userDetails && userDetails.permissionstatus === "accept" && userDetails.paymentstatus === "accept" && <button className="btn btn-success permission_btn" disabled = {triggerContest} onClick={enterContest}>Enter Contest</button> 
            }
            {/* {
                contestdata && new Date(contestdata.timestart) - liveTime < 0 && <button className="btn btn-success permission_btn" disabled = {triggerContest} onClick={askPermision}>Enter Contest</button> 
            } */}
          </div>

        </div>

        {
          contestdata && <div className="contest_timer"><Timer time={contestdata.timestart} contest = {contestId} setTriggerContest={setTriggerContest}/></div>
        }
        

        <div className='d-flex justify-content-center'>
            <button className={`dashboard_comp ` + toggleClass("participants")}  onClick={()=>changeClass("participants")}>Participants</button>
            {
            contestdata && contestdata.creatorid === state.userId && 
            <button className={`dashboard_comp ` + toggleClass("request")} onClick={()=>changeClass("request")}>
              Requests { request && request.length >= 1 && <span className='text-danger'>*</span> }
            </button> 
            }
            <button className={`dashboard_comp ` + toggleClass("rules")} onClick={()=>changeClass("rules")}>Rules</button>
            <button className={`dashboard_comp ` + toggleClass("prize")}  onClick={()=>changeClass("prize")}>Wining Amount</button>
        </div>
        <div className='search_box my-4 d-flex'>
          <MdManageSearch size={30} color={"grey"}/>
          <input type="text" className="search_participants" id="search_item" placeholder="Search for participants"/>
        </div>
        
      {/* Component to render */}

        <div className='render_comp'>
          {
            activeComp === "participants" && participants && <Participants participants={participants}/>
          }
          {
            activeComp === "request" && request &&  <Requests request={request} contestId = {contestId}/>
          }
          {
            activeComp === "rules" && <Rules/>
          }
          {
            activeComp === "prize" && <Prizes/>
          }
            
        </div>
    </div>
    
    </>
  )
}

export default Dashboard