import React,{useState, useEffect, useContext}  from 'react'
import Navbar from '../Navbar/Navbar'
import "./LeaderBoard.css";
import { useNavigate, useParams } from "react-router-dom";
import { UserContext } from "../../App";


function LeaderBoard() {
    const {state, dispatch} = useContext(UserContext);
    const params = useParams();
    const contestId = params.id;
    const userid = state.userId;
    const [contestdata, setContestData] = useState();
    const [showLeaderboard, setShowLeaderboard] = useState();
    const [participants, setParticipants] = useState();
    // const [contestStartTime, setContestStartTime] = useState();

    var count = 1;
    const navigate = useNavigate();


    // on click solve problem
    function solveProblem(questionid){
        navigate(`/compiler/`+ contestId + `/` + questionid)
      }

    // validate url 

    const validateUrl = async() =>{
        // console.log("VALIDATE")
            const result = await fetch(`https://ultrapro1.onrender.com/livecontest/contest/` + contestId)
            .then((request => request.json()))
            .then(async(data1) => {
                setContestData(data1);
                const res = await fetch( `https://ultrapro1.onrender.com/participant_status/contest/` + contestId)
                    .then((request => request.json()))
                    .then((data2) => {
                        data2.forEach(element => {
                            // console.log(element);
                            if(element.userid == userid){
                                if(element.paymentstatus == "accept"){
                                    const newtime = data1.timestart.replace('0Z', '')
                                    const time = Date.now() - new Date(newtime);
                                    if(time > 0 && time <= 2*60*60*1000){  
                                        setShowLeaderboard(true);
                                    }
                                    else{
                                        navigate("/contests")
                                    }
                                }
                                else{
                                    navigate("/contests")
                                } 
                            }
                        });
                    })
                    .catch(err=>console.log(err))
            })
            .catch(err=>console.log(err))
    
      
    }

    // participant list update
    const participantStatus = async() =>{
        // console.log("participant")

       const resultParticipant = await fetch( `https://ultrapro1.onrender.com/participant_status/contest/` + contestId)
        .then((request => request.json()))
        .then((data) => {
            setParticipants(data);
        })
        .catch(err=>console.log(err))
    }

      useEffect(() => {
        validateUrl();
        participantStatus();
        const interval = setInterval(()=>{
            participantStatus()
        }, 30000);
      }, []);

    //   contestdata && console.log(contestdata)
      participants && console.log("Part", participants)
      

  return (
    <>
    <Navbar/>
    {
        showLeaderboard &&
        <>
            <h2 className='contest_name_heading' >{contestdata.contestname}</h2>
            <div className='timer'>
            <p>Time Remaining 1 hr 13 minutes</p>
            </div>
            <div className='row'>
                <div className='col-md-4'>
                    <h3 className='problems_heading'>All problems</h3>
                    {
                        contestdata && contestdata.problems.map(record => {
                            // console.log((record._id))
                            return(
                                <>
                                <div className='problem_card'>
                                    <div className='problem_details'>
                                        <p className='problem_name'>{record[0].name}</p>
                                        <p className='problem_accuracy'>Accuracy: <b>50%</b></p>
                                    </div>
                                    <div className='problem_difficulty_solve'>
                                        <p className='problem_difficulty'>Difficulty: Hard</p>
                                        <button className='btn btn-success problem_solve' onClick={()=>solveProblem(record[0]._id)} >solve</button>
                                    </div>
                                </div>
                                <div className='problem_card'>
                                    <div className='problem_details'>
                                        <p className='problem_name'>{record[1].name}</p>
                                        <p className='problem_accuracy'>Accuracy: <b>50%</b></p>
                                    </div>
                                    <div className='problem_difficulty_solve'>
                                        <p className='problem_difficulty'>Difficulty: Hard</p>
                                        <button className='btn btn-success problem_solve' onClick={()=>solveProblem(record[1]._id)} >solve</button>
                                    </div>
                                </div>
                                <div className='problem_card'>
                                    <div className='problem_details'>
                                        <p className='problem_name'>{record[2].name}</p>
                                        <p className='problem_accuracy'>Accuracy: <b>50%</b></p>
                                    </div>
                                    <div className='problem_difficulty_solve'>
                                        <p className='problem_difficulty'>Difficulty: Hard</p>
                                        <button className='btn btn-success problem_solve' onClick={()=>solveProblem(record[2]._id)} >solve</button>
                                    </div>
                                </div>
                                <div className='problem_card'>
                                    <div className='problem_details'>
                                        <p className='problem_name'>{record[3].name}</p>
                                        <p className='problem_accuracy'>Accuracy: <b>50%</b></p>
                                    </div>
                                    <div className='problem_difficulty_solve'>
                                        <p className='problem_difficulty'>Difficulty: Hard</p>
                                        <button className='btn btn-success problem_solve' onClick={()=>solveProblem(record[3]._id)} >solve</button>
                                    </div>
                                </div>
                                
                                
                                </>
                            )
                        })
                    }          
                </div>
                <div className='col-md-8 liveboard'>
                    <h4 className='ranking_heading'>Ranking for the contestant</h4>
                    <table className="table table-striped">
                        <thead>
                            <tr>
                            <th scope="col">Rank</th>
                            <th scope="col">Name</th>
                            <th scope="col">Score</th>
                            <th scope="col">Q1</th>
                            <th scope="col">Q2</th>
                            <th scope="col">Q3</th>
                            <th scope="col">Q4</th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                participants && participants.map(record =>{
                                    return(
                                        <tr key={record.userid}>
                                            <th scope="row">{count++}</th>
                                            <td>{record.username}</td>
                                            <td>{record.totalsolvingtime}</td>
                                            <td>{record.questionsolvetime1}</td>
                                            <td>{record.questionsolvetime2}</td>
                                            <td>{record.questionsolvetime3}</td>
                                            <td>{record.questionsolvetime4}</td>
                                        </tr>
                                    )
                                })
                                 
                            }
                            
                        </tbody>
                    </table> 
                </div>
            </div> 
        </>
        
    }
    
    </>
  )
}

export default LeaderBoard