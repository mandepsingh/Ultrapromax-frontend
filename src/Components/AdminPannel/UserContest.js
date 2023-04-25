import React, {useState, useEffect ,useContext } from 'react'
import SearchContest from '../Search/SearchContest';
import { useNavigate, useParams } from "react-router-dom";
import UserContestCreated from './UserContestCreated.js';
import UserContestParticipated from './UserContestParticipated.js';
import "./AdminPannel.css"

function UserContest() {

    const [contest_created, setContestcreated] = useState();
    const [contest_participated, setContestparticipated] = useState();
    const [active, setActive] = useState("allContests");

    const params = useParams();
    let navigate = useNavigate();

    const userid= params.userid;

    const getContestparticipatedData = async (e) => {
        setActive("participated")
        try {
            const res = await fetch(`${process.env.REACT_APP_BACKEND_LOCAL_HOST}/participant_status/user/`+userid)
            .then((result) => {
              return result.json();
            }).then(async (data) => {
              await setContestparticipated(data)
              console.log(data)
            })
          }
          catch (err) {
            console.log(err);
        }
    }

    const getContestcreatedData = async (e) => {
        setActive("created")
        try {
            const res = await fetch(`${process.env.REACT_APP_BACKEND_LOCAL_HOST}/contest/contestcreatedbyuserid/`+userid)
            .then((result) => {
              return result.json();
            }).then(async (data) => {
              await setContestcreated(data)
              console.log(data)
            })
          }
          catch (err) {
            console.log(err);
        }
    }

    function activeClass(btn){
        if(btn === active){
            return "active_btn";
        }
        return "";
    }

    useEffect(() => {
        getContestparticipatedData();
    }, []);

    const routeChange = (e) =>{
        navigate(`/adminpannel/`+e);
    }
    var i= 1;

  return (
    <div className='adminpannelcontainer'>
      <div className='adminpannelheading'>
        <h2>Admin Pannel</h2>
      </div>
      <div className='adminnavbar'>
          <div className='adminnavbarinfo'>
              <div className='d-flex navbar_btn_category row'>
                  <button className={`navbar_info-buttons col-md-2 `+ activeClass("participated") } onClick={()=> getContestparticipatedData()}>Contest Participated</button>
                  <button className={`navbar_info-buttons col-md-2 `+ activeClass("created") } onClick={()=> getContestcreatedData()}>Contest Created</button>
              </div>
              <div className='contests_details'>
                  {active === "participated" && <UserContestParticipated contest_participated={contest_participated}/>}
                  {active === "created" && <UserContestCreated contest_created= {contest_created}/>}
              </div>
              
          </div>
      </div>
    </div>
  )
}

export default UserContest