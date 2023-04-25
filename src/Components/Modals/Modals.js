import React,{ useState, useContext  } from 'react'
import { UserContext } from "../../App";
import { useNavigate } from "react-router-dom";
import './Modal.css'
import { BsArrowRightCircle } from "react-icons/bs";


function Modals(props) {
    const {state, dispatch} = useContext(UserContext);
    // console.log(props.setCreatecontestbuttonclicked())
    const [contestname, setContestname] = useState("");
    const [level, setLevel] = useState("");
    const [amount, setAmount] = useState("");
    const [timestart , setTime] = useState();
    const [limit , setLimit] = useState();
    const [mode , setMode] = useState();
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
        // if(amount < 10){
        //     alert("Contest is not Created. Amount must be greater than or equal to 10!");
        //     return;
        // }
        if(new Date(timestart) - Date.now() < 0){
            alert("Contest is not Created. Time must be greater than or equal to the Current Time");
            return;
        }
        
        let contest_details = {contestname, level, amount, username, userid, timestart};
        console.log(contest_details);
        //getting the number of contest created by the user
        try {
            props.setCreatecontestbuttonclicked(true);
            const res = await fetch(`${process.env.REACT_APP_BACKEND_LOCAL_HOST}/contest/contestcountbyuserid/${userid}`, {
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
                // console.log("nnnnnnnnnn,", `${username}${data.datasize+1}_Contest`)
                contest_details["contestname"]= `${username}${data.datasize+1}_Contest`
                console.log("...",data);
            })
            }
            catch (err) {
            console.log("error")
            console.log(err);
        }
        try {
            const res = await fetch(`${process.env.REACT_APP_BACKEND_LOCAL_HOST}/contest/createcontest`, {
                method : 'POST',
                headers:{
                    'Accept':'application/json',
                    'Content-Type':'application/json'
                },
                body: JSON.stringify(contest_details)
            }).then((result) => {
                return result.json();
            }).then( async (data1) =>{
                console.log("data1..",data1);
                navigate(`/dashboard/`+data1.newContest._id);
                // if(data1){
                //     const contestid = data1.newContest._id;
                //     const userid = state.userId;
                //     const username = state.name;
                
                //     let data2 = { contestid, userid, username};
                //     try {
                //     const res = await fetch(`${process.env.REACT_APP_BACKEND_LOCAL_HOST}/participant_status/createstatus`, {
                //         method: 'POST',
                //         credentials: "same-origin",
                //         headers: {
                //         'Accept': 'application/json',
                //         'Content-Type': 'application/json',
                //         },
                //         credentials: "include",
                //         body: JSON.stringify(data2)
                //     }).then((result) => {
                //         return result.json();
                //     }).then((data) =>{

                //         console.log("second...",data);
                //     })
                //     }
                //     catch (err) {
                //     console.log("error")
                //     console.log(err);
                //     }
                
                //     const data3 = { contestid, userid , username};
                //     try {
                //     const res = await fetch(`${process.env.REACT_APP_BACKEND_LOCAL_HOST}/contest/update/participant`, {
                //         method: 'PATCH',
                //         credentials: "same-origin",
                //         headers: {
                //         'Accept': 'application/json',
                //         'Content-Type': 'application/json',
                //         },
                //         credentials: "include",
                //         body: JSON.stringify(data3)
                //     }).then((datares) => {
                //         console.log("Third..",datares);
                //         navigate(`/dashboard/`+contestid);
                
                //     })
                //     }
                //     catch (err) {
                //     console.log("error")
                //     console.log(err);
                //     }

                // }
            })
        }
        catch (err) {
            console.log(err);
          }
        }

  return (
    <>
    {/* <!-- Button trigger modal --> */}
    <button type="button" className="contest_btn" data-bs-toggle="modal" data-bs-target="#staticBackdrop">
    <BsArrowRightCircle style={{marginBottom:"3px"}}/> Create Contest
    </button>

    {/* <!-- Modal --> */}
    <div className="modal fade" id="staticBackdrop" data-bs-backdrop="static" data-bs-keyboard="false" tabIndex="-1" aria-labelledby="staticBackdropLabel" aria-hidden="true">
    <div className="modal-dialog">
        <div className="modal-content">
            <div className="modal-header">
                <h5 className="modal-title" id="staticBackdropLabel">Create a contest</h5>
                <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div className="modal-body">
                <form onSubmit={handleSubmit}>
                    {/* <div className="mb-3">
                        <label htmlFor="contest_Name" className="form-label mb-1"><b>Contest Name</b></label>
                        <input type="text" className="form-control form-control" id="contest_Name" value={contestname} onChange = {(e)=>{setContestname(e.target.value)}} placeholder="" required/>
                    </div> */}
                    {/* <div className="mb-3">
                        <label htmlFor="noofparticipants" className="form-label mb-1">Number of participants</label>
                        <input type="number" className="form-control form-control" id="noofparticipants" onChange = {(e)=>{setLimit(e.target.value)}} placeholder=""/>
                    </div> */}
                    {/* <div className="mb-3">
                        <label htmlFor="mode" className="form-label mb-1">Mode</label>
                        <select className="form-select " value={mode} onChange = {(e)=>{setMode(e.target.value)}} >
                            <option defaultValue>Select Mode</option>
                            <option value="practice">Practice</option>
                            <option value="fight">Fight</option>
                        </select>
                    </div> */}
                    <div className="mb-3">
                        <label htmlFor="difficulty_level" className="form-label mb-1"><b>Difficulty Level</b></label>
                        <select className="form-select" value={level} onChange = {(e)=>{setLevel(e.target.value)}} >
                            <option defaultValue>Select Dificulty</option>
                            <option value="1">1</option>
                            <option value="2">2</option>
                            <option value="3">3</option>
                            <option value="4">4</option>
                            <option value="5">5</option>
                        </select>
                    </div>
                    <div className="mb-3">
                        <label htmlFor="contest_amount" className="form-label mb-1"><b>Contest Amount</b></label>                        
                        {/* <input type="number" className="form-control form-control" id="contest_amount" value={amount} onChange = {(e)=>{setAmount(e.target.value)}} placeholder="Minimum amount should be 10"/> */}
                        <select className="form-select form-select" value={amount} onChange = {(e)=>{setAmount(e.target.value)}} >
                            <option defaultValue>Select Amount</option>
                            <option value="20">20</option>
                            <option value="30">30</option>
                            <option value="50">50</option>
                            <option value="70">70</option>
                            <option value="80">80</option>
                            <option value="100">100</option>
                            <option value="200">200</option>
                            <option value="250">250</option>
                            <option value="500">500</option>
                            <option value="750">750</option>
                            <option value="1000">1000</option>
                        </select>
                    </div>
                    
                    <div className="mb-3">
                        <label htmlFor="time_start" className="form-label mb-1"><b>Time to start</b></label>
                        <input type="datetime-local" className="form-control form-control" id="time_start" onChange = {(e)=>{setTime(e.target.value)}} placeholder="Time"/>
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
