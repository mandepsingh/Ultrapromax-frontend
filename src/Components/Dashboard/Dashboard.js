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
import { GoPrimitiveDot } from "react-icons/go";


function Dashboard() {
    const {state, dispatch} = useContext(UserContext);
    const params = useParams();
    const contestId = params.id;
    const userid = state.userId;
    const username= state.name;
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
    const [contestData, setContestData] = useState();

    let btn_classes = ["dashboard_comp"]
    const navigate = useNavigate();
    let interval2;
   
    // ask for permission to enter contest
    const askPermision = async (e) => {
        setAskStatus("waiting");
        // console.log("ccccccccc",contestData)
        const post_data= {contestid: contestId, userid, username: username, amount: contestData.amount};
        try {
            const res = await fetch(`${process.env.REACT_APP_BACKEND_LOCAL_HOST}/participant_status/createstatus/`, {
              method: 'POST',
              credentials: "same-origin",
              headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
              },
              credentials: "include",
              body: JSON.stringify(post_data)
            }).then((result) => {
              return result.json();
            }).then((data) => {
              // console.log("ask.. ", data);
            })
          }
          catch (err) {
            console.log(err);
          }
        }

    // do the payment process
    const doPayment = async (e) => {
      const post_data= {contestid: contestId, userid, username: username, paymentamount: contestData.amount};
      console.log("ccccccccc",contestData)
      try {
          //do the payment by using payment gateway then update participant status.
          const res = await fetch(`${process.env.REACT_APP_BACKEND_LOCAL_HOST}/participant_status/payment/`+ contestId + `/` + userid + `/accept`, {
            method: 'PATCH',
            credentials: "same-origin",
            headers: {
              'Accept': 'application/json',
              'Content-Type': 'application/json',
            },
            credentials: "include",
            body: JSON.stringify(post_data),
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
        // clearInterval(interval2);
        fetch(`${process.env.REACT_APP_BACKEND_LOCAL_HOST}/participant_status/enterancestatus/`+ contestId + `/` + userid,{
              method : 'GET',
              headers:{
                  'Accept':'application/json',
                  'Content-Type':'application/json'
              }
            }).then((result) => {
              return result.json();
            }).then((data) => {
              // console.log("Enter Contest", data)
              clearInterval(interval2);
              if(data.entercontest === 'false'){
                navigate("/home")
              }
              else{
                window.location.replace(`/leaderboard/` + contestId);
              }
            }).catch((err)=>{
                  // console.log(err);   
            });
      }
          

    // const navigate = useNavigate();

    const dataFetch = async () => {
        const result = await fetch(
            `${process.env.REACT_APP_BACKEND_LOCAL_HOST}/contest/contest/` + contestId
          ).then((data1)=> {
            return data1.json();
          
        }).then(async (res)=>{
          console.log("setContestData", res)
          await setContestData(res);
          
          // console.log("dataarrraaa",res );
          // console.log("afrw",contestData)
        });
    
        // set state when the data received
        
        // console.log("dataaaaa",result)
      };


      // fetch requests to admin

      const requestFetch = async () => {
        const res = await (
          await fetch(
            `${process.env.REACT_APP_BACKEND_LOCAL_HOST}/participant_status/permissioncheck/` + contestId + `/waiting`
          )
        ).json();
    
        // set state when the data received
        if(request != res){
          setRequestData(res);
          // console.log("res",res)
        }
        
      };

      

      ////// participants status ///
      const fetchparticipant = async () => {
        const res = await (
          await fetch(
            `${process.env.REACT_APP_BACKEND_LOCAL_HOST}/participant_status/contest/` + contestId
          )
        ).json();
        
        // set state when the data received
        console.log("participants",res);
        setAskStatus(true)
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
    
      // set active class on click
      function changeClass(classArg){
          setActiveClass(classArg)
          setActiveComp(classArg)
      }

      // return class on buttons
      function toggleClass(e){
        if(activeClass === e){
          return "dashboard_active_btn";
        }
        else return "";
      }


      useEffect(() => {
        dataFetch();
        setLiveTime(Date.now());
        requestFetch();
        fetchparticipant();


        // second request to refresh data page load
        let interval2 = setInterval(()=>{
          dataFetch();
          console.log("contest", contestData)
          // if(contestData && contestData.creatorid === state.userId){
              // console.log(" admin")
              requestFetch();
          // }
          
          setLiveTime(Date.now());
          fetchparticipant();
        }, 12000);

      }, []);

      useEffect(() => {
        if(!triggerContest){
          // console.log("object");
        }
      },[triggerContest]);

      
  return (
    <>
    <Navbar></Navbar>
    <div className="container">
      <div className='dashboard_header'>
        <h2 className="dashboard_heading">{contestData && contestData.contestname}</h2>
        <div className='dashboard_actions'>
            {/* {
              userDetails && userDetails.permissionstatus === "none" && triggerContest && <button className="dashboard_action_btn" disabled = {askStatus} onClick={askPermision}>Ask to Register</button> 
            } */}
            {/* {console.log("userdata",userDetails) } */}
            {
              askStatus===true && userDetails== undefined && <button className="dashboard_action_btn" onClick={askPermision}>Ask for Permission</button> 
            }
            {
              userDetails && userDetails.permissionstatus === "waiting" && <button className="dashboard_action_btn_disabled" disabled={true}>Waiting for Permission</button> 
            }
            {
              userDetails && userDetails.permissionstatus === "accept" && userDetails.paymentstatus === "none" && (!triggerContest ? <button className="dashboard_action_btn_disabled" disabled = {!triggerContest} onClick={doPayment}>Payment</button>: <button className="dashboard_action_btn" disabled = {!triggerContest} onClick={doPayment}>Payment</button> )
            }

            {
              userDetails && userDetails.permissionstatus === "accept" && userDetails.paymentstatus === "accept" && (triggerContest ? (<button className=" dashboard_action_btn_disabled" disabled={triggerContest} onClick={enterContest}>Enter Contest</button> ):<button className=" dashboard_action_btn" disabled={triggerContest} onClick={enterContest}>Enter Contest</button> )
            }
            {/* {
                contestdata && new Date(contestdata.timestart) - liveTime < 0 && <button className="btn btn-success permission_btn" disabled = {triggerContest} onClick={askPermision}>Enter Contest</button> 
            } */}
          </div>
      </div>
        {/* <hr></hr> */}
        {/* <div className='row flex mt-3'>
          <div className='col-md-10 horizontal_timeline'>
            <Horizontal_timeline progress = {progress}/>
          </div>
          
        </div> */}
        {
          askStatus===true && userDetails== undefined && 
          <div className='dashboardnotebutton'>
            <p>Click Ask Persmission buttion to enter into contest.</p>
          </div>
        }
        {
          userDetails && userDetails.permissionstatus === "accept" && userDetails.paymentstatus === "none" && (!triggerContest ?
            <div className='dashboardnotebutton'><p>You Can't Enter into contest because contest has started.</p></div>
          :
          <div className='dashboardnotebutton'>
            <p className='congratulationsnote' >Congratulations your request is Accepted!</p>
            <p>Make an Online Payment to participate in contest.</p>
          </div>)
        }
        {
          userDetails && userDetails.permissionstatus === "accept" && userDetails.paymentstatus === "accept" && 
          <div className='dashboardnotebutton'>
            <p>Enter Contest button is Enable when contest time starts.</p>
          </div>
        }

        {
          contestData && <div className="contest_timer"><Timer time={contestData.timestart} contest = {contestId} setTriggerContest={setTriggerContest}/></div>
        }
        <div className='d-flex justify-content-center'>
            <button className={`dashboard_comp ` + toggleClass("participants")}  onClick={()=>changeClass("participants")}>Participants</button>
            {
            contestData && contestData.creatorid === state.userId && 
            <button className={`dashboard_comp ` + toggleClass("request")} onClick={()=>changeClass("request")}>
              Requests{ request && request.length >= 1 && <span className=''><GoPrimitiveDot style={{marginBottom:"12px"}}/></span> }
            </button> 
            }
            <button className={`dashboard_comp ` + toggleClass("rules")} onClick={()=>changeClass("rules")}>Rules</button>
            <button className={`dashboard_comp ` + toggleClass("prize")}  onClick={()=>changeClass("prize")}>Wining Amount</button>
        </div>

        <div className='search_box my-4 d-flex'>
          <MdManageSearch size={22} color={"grey"}/>
          <input type="text" className="search_participants" id="search_item" placeholder="Search for participants"/>
        </div>
        
      {/* Component to render */}
        <div className='homepagenote'>
          <p>Note: Data is automatically updated in 10 seconds.</p>
        </div>

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