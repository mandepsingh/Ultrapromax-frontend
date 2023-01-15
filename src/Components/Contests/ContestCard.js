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
          const res = fetch(`https://ultrapro1.onrender.com/contest/contest/` + contestid , {
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
            console.log("contest data setting ",data);
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
              console.log(data)
              try {
                const res = fetch("https://ultrapro1.onrender.com/participant_status/update", {
                  method: 'PATCH',
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
                  console.log(data);
                
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
        // <div className=''>
        //     <div className="card mb-5 mx-2 ">
        //       <div className={colorBandClass(record.level)}></div>
        //       <div className="card-body">
        //         <h5 className="card-title">{record.contestname}</h5>
        //       </div>
        //       <ul className="list-group list-group-flush">
        //         <li className="list-group-item">Difficulty Level : {record.level}</li>
        //         <li className="list-group-item">Creator Name : {record.creatorname}</li>
        //         <li className="list-group-item">Amount : {record.amount}</li>
        //         <li className="list-group-item">Start Date : {contest_date}</li>
        //         <li className="list-group-item">Start Time : {contest_time} hr</li>
        //       </ul>
        //       {
        //         props.show !== "hide" &&
        //         <div className="card-body">
        //           <button className='btn btn-success' onClick={()=>joinContest(record)}>Join Contest</button>
        //         </div>
        //       }
              
        //     </div>

        // </div>
      <>
      <div className='contest_card'>
        <div className='card_top'>
          <div className='heading'>
            <p><b>{record.contestname.charAt(0).toUpperCase() + record.contestname.slice(1)}</b></p> 
            {/* <p>Contest Name</p> */}
          </div>
          <div className='d-flex justify-content-between'>
            <p>Admin Name</p>
            <p>{record.creatorname && record.creatorname.charAt(0).toUpperCase() + record.creatorname.slice(1)}</p> 
          </div>
        </div>
        <hr/>
        <div className='card_mid'>
          <div className=''>
            <p className='mb-0'>Level</p>
            <p> {record.level}</p>
            <p className='mb-0'>Amount</p>
            <p> {record.amount}</p>
          </div>
        </div>
        <hr/>
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
