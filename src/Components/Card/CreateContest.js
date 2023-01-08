import React, { useState, useContext  } from 'react'
import "./Card.css";
import { UserContext } from "../../App";
import {CSSTransition} from 'react-transition-group';
import { useNavigate } from "react-router-dom";
import HomeImage from "../../Images/Pair_programming.gif"

function CreateContest({onClick}) {
    const {state, dispatch} = useContext(UserContext);
    const [showFront, setShowFront] = useState(true);
    const [contestname, setContestname] = useState("");
    const [contestnumber, setContestnumber] = useState("");
    const [level, setLevel] = useState("");
    const [amount, setAmount] = useState("");
    const [timestart , setTime] = useState();
    const [newContest, setNewContest] = useState();

    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        console.log("hello");
        e.preventDefault();
        const username = state.name;
        const userid = state.userId;
        let contest_details = {contestname, contestnumber, level, amount, username, userid, timestart};
        // console.log(data)
        try {
            const res = await fetch("https://ultrapro1.onrender.com/contest/createcontest", {
                method : 'POST',
                headers:{
                    'Accept':'application/json',
                    'Content-Type':'application/json'
                },
                body: JSON.stringify(contest_details)
            }).then((result) => {
                return result.json();
            }).then( async (data1) =>{
                console.log("data1..",data1.newContest._id);
                if(data1){
                    const contestid = data1.newContest._id;
                    const userid = state.userId;
                    const username = state.name;
                
                    let data2 = { contestid, userid, username };
                    try {
                    const res = await fetch("https://ultrapro1.onrender.com/participant_status/create", {
                        method: 'POST',
                        credentials: "same-origin",
                        headers: {
                        'Accept': 'application/json',
                        'Content-Type': 'application/json',
                        },
                        credentials: "include",
                        body: JSON.stringify(data2)
                    }).then((result) => {
                        return result.json();
                    }).then((data) =>{

                        console.log("second...",data);
                    })
                    }
                    catch (err) {
                    console.log("error")
                    console.log(err);
                    }
                
                    const data3 = { contestid, userid , username};
                    try {
                    const res = await fetch("https://ultrapro1.onrender.com/contest/update", {
                        method: 'POST',
                        credentials: "same-origin",
                        headers: {
                        'Accept': 'application/json',
                        'Content-Type': 'application/json',
                        },
                        credentials: "include",
                        body: JSON.stringify(data3)
                    }).then((datares) => {
                        console.log("Third..",datares);
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
            console.log(err);
          }
        }

        

    return (
      <>
      <CSSTransition in= {showFront} timeout={300} classNames='flip'>
  
        <div className='flip_card'>
            <div className='card-back'>
                <form onSubmit={handleSubmit}>
                    <div className="mb-1">
                        <label htmlFor="contest_Name" className="form-label mb-1">Contest Name</label>
                        <input type="text" className="form-control form-control-sm" id="contest_Name" value={contestname} onChange = {(e)=>{setContestname(e.target.value)}} placeholder="" required/>
                    </div>
                    <div className="mb-1">
                        <label htmlFor="contest_Number" className="form-label mb-1">Contest Number</label>
                        <input type="text" className="form-control form-control-sm" id="contest_Number" value={contestnumber} onChange = {(e)=>{setContestnumber(e.target.value)}}  placeholder=""/>
                    </div>
                    <div className="mb-1">
                        <label htmlFor="difficulty_level" className="form-label mb-1">Difficulty Level</label>
                        <input type="text" className="form-control form-control-sm" id="difficulty_level" value={level} onChange = {(e)=>{setLevel(e.target.value)}} placeholder=""/>
                    </div>
                    <div className="mb-1">
                        <label htmlFor="contest_amount" className="form-label mb-1">Contest Amount</label>
                        <input type="text" className="form-control form-control-sm" id="contest_amount" value={amount} onChange = {(e)=>{setAmount(e.target.value)}} placeholder=""/>
                    </div>
                    <div className="mb-2">
                        <label htmlFor="time_start" className="form-label mb-1">Time to start</label>
                        <input type="datetime-local" className="form-control form-control-sm" id="time_start" value={timestart} onChange = {(e)=>{setTime(e.target.value)}} placeholder="Time in minutes"/>
                    </div>
                    <button type="submit" className="btn btn-success clickIt" >
                        submit
                    </button>
                    {/* <button className="btn btn-success clickIt" 
                        onClick= {()=>{setShowFront((s) => !s);}}> Back
                    </button> */}
                </form>
                
            </div>
            
            <div className='card-front'>
                {/* <p className="contestHeading">
                        Create a Contest
                </p> */}
              <img id="homeImage" src={HomeImage} alt="programmercd"/>

              <button className="btn btn-success create_contest_btn"  onClick= {()=>{
                        setShowFront((s) => !s);
                      }}>
                Create contest
              </button>
            </div>      
          </div>
        </CSSTransition>
      </>
    )
}

export default CreateContest
