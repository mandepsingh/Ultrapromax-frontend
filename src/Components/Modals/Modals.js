import React,{ useState, useContext  } from 'react'
import { UserContext } from "../../App";
import { useNavigate } from "react-router-dom";
import './Modal.css'

function Modals() {
    const {state, dispatch} = useContext(UserContext);

    const [contestname, setContestname] = useState("");
    const [level, setLevel] = useState("");
    const [amount, setAmount] = useState("");
    const [timestart , setTime] = useState();
    const [newContest, setNewContest] = useState();

    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        console.log("hello");
        e.preventDefault();
        const username = await state.name;
        const userid = await state.userId;
        console.log(userid);
        if(userid === null || username === null){
            alert("login required");
            navigate("/login");
            return;
          }
        if(amount < 10){
            alert("Contest is not Created. Amount must be greater than or equal to 10!");
            return;
        }
        
        let contest_details = {contestname, level, amount, username, userid, timestart};
        console.log(contest_details);
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
    {/* <!-- Button trigger modal --> */}
    <button type="button" className="btn btn-success" data-bs-toggle="modal" data-bs-target="#staticBackdrop">
        Create Contest
    </button>

    {/* <!-- Modal --> */}
    <div className="modal fade" id="staticBackdrop" data-bs-backdrop="static" data-bs-keyboard="false" tabIndex="-1" aria-labelledby="staticBackdropLabel" aria-hidden="true">
    <div className="modal-dialog">
        <div className="modal-content">
            <div className="modal-header">
                <h5 className="modal-title" id="staticBackdropLabel">Contest Details</h5>
                <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div className="modal-body">
                <form onSubmit={handleSubmit}>
                    <div className="mb-4">
                        <label htmlFor="contest_Name" className="form-label mb-2">Contest Name</label>
                        <input type="text" className="form-control form-control" id="contest_Name" value={contestname} onChange = {(e)=>{setContestname(e.target.value)}} placeholder="" required/>
                    </div>
                    <div className="mb-4">
                        <label htmlFor="difficulty_level" className="form-label mb-2">Difficulty Level</label>
                        <select className="form-select form-select" value={level} onChange = {(e)=>{setLevel(e.target.value)}} >
                            <option defaultValue>Select Dificulty</option>
                            <option value="1">1</option>
                            <option value="2">2</option>
                            <option value="3">3</option>
                            <option value="4">4</option>
                            <option value="5">5</option>
                        </select>
                    </div>
                    <div className="mb-4">
                        <label htmlFor="contest_amount" className="form-label mb-2">Contest Amount</label>
                        <input type="number" className="form-control form-control" id="contest_amount" value={amount} onChange = {(e)=>{setAmount(e.target.value)}} placeholder="Minimum amount should be 10"/>
                    </div>
                    <div className="mb-4">
                        <label htmlFor="time_start" className="form-label mb-2">Time to start</label>
                        <input type="datetime-local" className="form-control form-control" id="time_start" value={timestart} onChange = {(e)=>{setTime(e.target.value)}} placeholder="Time in minutes"/>
                    </div>
                    <button type="submit" className="btn btn-success submit_create_contest" data-bs-dismiss="modal" >
                        submit
                    </button>
                </form>
            </div>
        </div>
    </div>
    </div>
    </>
  )
}

export default Modals
