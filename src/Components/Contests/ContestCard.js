import React, {useState, useEffect ,useContext } from 'react'
import { useNavigate } from "react-router-dom";
import { UserContext } from "../../App";
import Moment from "moment";
import './ContestCard.css';

function ContestCard(props) {
    const record = props.contest;
    console.log(record);
    const {state, dispatch} = useContext(UserContext);
    const navigate = useNavigate();
    const [contest_data, setContest_Data] = useState(false);

    const date_format = record.timestart ;

    const contest_date = date_format && new Date(date_format.split('T')[0]).toDateString();
    const contest_time = date_format && new Date(date_format).toUTCString().split(' ')[4];


    const joinContest = async(e) => {
        const contestid = e._id;
        const userid = await state.userId;
        const username = await state.name;
        if(userid == null){
          alert("login required");
          navigate("/login");
          return;
        }
        else{
          navigate(`/dashboard/`+contestid);
        }

        // fetch perticular contest data 
        // try {
        //   const res = fetch(`${process.env.REACT_APP_BACKEND_LOCAL_HOST}/contest/contest/` + contestid , {
        //     method: 'GET',
        //     credentials: "same-origin",
        //     headers: {
        //       'Accept': 'application/json',
        //       'Content-Type': 'application/json',
        //     },
        //     credentials: "include",
        //   }).then((result) => {
        //     return result.json();
        //   }).then((data) =>{
        //     setContest_Data(data);
        //     console.log("contest data setting ",data);
            
        //     let data1 = { contestid, userid, username };
        //     console.log("contest",data1)
            // try {
            //   const res = fetch(`${process.env.REACT_APP_BACKEND_LOCAL_HOST}/participant_status/createstatus`, {
            //     method: 'POST',
            //     credentials: "same-origin",
            //     headers: {
            //       'Accept': 'application/json',
            //       'Content-Type': 'application/json',
            //     },
            //     credentials: "include",
            //     body: JSON.stringify(data1)
            //   }).then((result) => {
            //     return result.json();
            //   }).then((data2) =>{
            //     console.log("created user",data2);
            //   })
            // }
            // catch (err) {
            //   console.log("error")
            //   console.log(err);
            // }
    
        //   })
        // }
        // catch (err) {
        //   console.log("error")
        //   console.log(err);
        // }
      
      }

    return (
      <>
      <div className='contest_card'>
        <div className='card_top'>
          <div className='d-flex justify-content-between heading'>
            <p><b>Contest Name</b></p>
            <p><b>{record.contestname.charAt(0).toUpperCase() + record.contestname.slice(1)}</b></p> 
          </div>
          <div className='d-flex justify-content-between'>
            <p>Contest Id</p>
            <p>{record._id}</p> 
          </div>
          <div className='d-flex justify-content-between'>
            <p>Admin Name</p>
            <p>{record.creatorname && record.creatorname.charAt(0).toUpperCase() + record.creatorname.slice(1)}</p> 
          </div>
          
        </div>
        <hr className='hr'/>
        <div className='card_mid d-flex justify-content-between'>
          <div className=''>
            <p className='mb-0'>Level</p>
            <p> {record.level}</p>
          </div>
          <div>
            <p className='mb-0'>Amount</p>
            <p> {record.amount}</p>
          </div>
        </div>
        <hr className='hr'/>
        <div className='card_bottom'>
          <div className='d-flex justify-content-between'>
            <p>Starting Day</p>
            <p>{contest_date}</p>
          </div>
          <div className='d-flex justify-content-between'>
            <p>Starting Time</p>
            <p>{contest_time}hr</p>
          </div>
        </div>
        {
          props.show !== "hide" && <button className='join_btn' onClick={()=>joinContest(record)}>Join Contest</button>
        }
        
      </div>
      </>

    )
}

export default ContestCard
