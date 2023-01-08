import React, {useState, useEffect ,useContext } from 'react'
import { useNavigate } from "react-router-dom";
import { UserContext } from "../../App";
import Moment from "moment";
import './ContestCard.css';

function ContestCard(props) {
    const record = props.contest;
    const {state, dispatch} = useContext(UserContext);
    const navigate = useNavigate();
    const [contest_data, setContest_Data] = useState(false);

    const date_format = record.startingtime ;

    const contest_date = date_format && new Date(date_format.split('T')[0]).toDateString();
    const contest_time = date_format && new Date(date_format).toUTCString().split(' ')[4];


    function colorBandClass(level){
      if(level === '1'){
        return "color_band_easy";
      }
      if(level === '2'){
        return "color_band_medium";
      }
      if(level === '3'){
        return "color_band_hard";
      }
      if(level === '4'){
        return "color_band_hard";
      }
      if(level === '5'){
        return "color_band_hard";
      }
    }

    const joinContest = async(e) => {
        const contestid = e.contestid;
        const userid = await state.userId;
        const username = await state.name;
        if(userid == null){
          alert("login required");
          navigate("/login");
          return;
        }
        // fetch perticular contest data 

        try {
          const res = fetch(`https://ultrapro1.onrender.com/livecontest/contest/` + contestid , {
            method: 'GET',
            credentials: "same-origin",
            headers: {
              'Accept': 'application/json',
              'Content-Type': 'application/json',
            },
            credentials: "include",
          }).then((result) => {
            return result.json();
          }).then((data) =>{
            setContest_Data(data);
            // console.log("contest data setting ",data.participants);
            let alreadyExist = false;
            data.participants.forEach(element => {
              if(element.userid === userid){
                alreadyExist = true;
              }
            });
            if(alreadyExist === true){
              navigate(`/dashboard/`+contestid);
            }
            else{
          
              let data = { contestid, userid, username };
              try {
                const res = fetch("https://ultrapro1.onrender.com/participant_status/create", {
                  method: 'POST',
                  credentials: "same-origin",
                  headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                  },
                  credentials: "include",
                  body: JSON.stringify(data)
                }).then((result) => {
                  return result.json();
                }).then((data) =>{
                  // console.log(data);
                
                })
              }
              catch (err) {
                console.log("error")
                console.log(err);
              }
          
              const data2 = { contestid, userid , username};
              try {
                const res = fetch("https://ultrapro1.onrender.com/contest/update", {
                  method: 'POST',
                  credentials: "same-origin",
                  headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                  },
                  credentials: "include",
                  body: JSON.stringify(data2)
                }).then((datares) => {
                  console.log(datares);
                  navigate(`/dashboard/`+contestid);
          
                })
              }
              catch (err) {
                console.log("error")
                console.log(err);
              }
    
            } 
          })
        }
        catch (err) {
          console.log("error")
          console.log(err);
        }
      
      }

    return (
        <div className=''>
            <div className="card mb-5 mx-2 ">
              <div className={colorBandClass(record.level)}></div>
              <div className="card-body">
                <h5 className="card-title">{record.contestname}</h5>
              </div>
              <ul className="list-group list-group-flush">
                <li className="list-group-item">Difficulty Level : {record.level}</li>
                <li className="list-group-item">Creator Name : {record.creatorname}</li>
                <li className="list-group-item">Amount : {record.amount}</li>
                <li className="list-group-item">Start Date : {contest_date}</li>
                <li className="list-group-item">Start Time : {contest_time} hr</li>
              </ul>
              <div className="card-body">
                <button className='btn btn-success' onClick={()=>joinContest(record)}>Join Contest</button>
              </div>
            </div>

        </div>


    )
}

export default ContestCard
