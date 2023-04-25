import React,{useState, useEffect, useContext}  from 'react'
import Navbar from '../Navbar/Navbar'
import "./LeaderBoard.css";
import { useNavigate, useParams } from "react-router-dom";
import { UserContext } from "../../App";
import ReverseTimer from '../Timer/ReverseTimer';
import Compiler from '../CodeEditor/Compiler';


function LeaderBoard() {
    const {state, dispatch} = useContext(UserContext);
    const params = useParams();
    const contestId = params.id;
    const userid = state.userId;
    const [contestdata, setContestData] = useState();
    const [showLeaderboard, setShowLeaderboard] = useState();
    const [participants, setParticipants] = useState();
    const [showQuestion, setShowQuestion] = useState(false);
    const [showCompiler, setShowCompiler] = useState(false);
    
    const [question, setQuestion] = useState();
    const [question1_solvestatus, setQuestion1_solvestatus] = useState(false);
    const [question2_solvestatus, setQuestion2_solvestatus] = useState(false);
    const [question3_solvestatus, setQuestion3_solvestatus] = useState(false);
    const [question4_solvestatus, setQuestion4_solvestatus] = useState(false);
    const [questionNumber, setQuestionNumber] = useState(0);
    const [winningAmount, setWinningAmount] = useState([]);
    
    var count = 1;
    var qn = 1;
    const navigate = useNavigate();

    const map1 = new Map();

    // const PrizeDistribution = async()=>{
    //     try {
    //         const res = await fetch(`https://ultrapro1.onrender.com/participant_status/winningamount/` + contestId, {
    //           method: 'GET',
    //           credentials: "same-origin",
    //           headers: {
    //             'Accept': 'application/json',
    //             'Content-Type': 'application/json',
    //           },
    //           credentials: "include",
    //         }).then((result) => {
    //           return result.json();
    //         }).then((data) => {
    //           console.log("winnigamount",data);
    //         //   setQuestion(data);
    //         })
    //       }
    //       catch (err) {
    //         console.log(err);
    //       }
    // }

    // on click solve problem
    const solveProblem = async(question) => {
        // navigate(`/compiler/`+ contestId + `/` + questionid)
        try {
            const res = await fetch(`${process.env.REACT_APP_BACKEND_LOCAL_HOST}/problems/id/`+ question.id, {
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
              console.log("sadfasdfasd",data);
              setQuestion(data);
            })
          }
          catch (err) {
            console.log(err);
          }
        
        setShowCompiler(true); 
        setQuestionNumber(map1.get(question.id));
        participantStatus()
        console.log(questionNumber);
    }

    // const showSubmissions = async(question) => {
    //     // navigate(`/compiler/`+ contestId + `/` + questionid)
    //     try {
    //         const res = await fetch(`${process.env.REACT_APP_BACKEND_LOCAL_HOST}/problems/id/`+ question.id, {
    //           method: 'GET',
    //           credentials: "same-origin",
    //           headers: {
    //             'Accept': 'application/json',
    //             'Content-Type': 'application/json',
    //           },
    //           credentials: "include",
    //         }).then((result) => {
    //           return result.json();
    //         }).then((data) => {
    //           console.log("sadfasdfasd",data);
    //           setQuestion(data);
    //         })
    //       }
    //       catch (err) {
    //         console.log(err);
    //       }
        
    //     setShowSubmission(true); 
    //     // setQuestionNumber(map1.get(question.id));
    //     // console.log(questionNumber);
    // }


    // validate url 
    const validateUrl = async() =>{
            const result = await fetch(`${process.env.REACT_APP_BACKEND_LOCAL_HOST}/contest/contest/` + contestId)
            .then((request => request.json()))
            .then(async(data1) => {
                setContestData(data1);
                console.log("contest", data1);
                const res = await fetch( `${process.env.REACT_APP_BACKEND_LOCAL_HOST}/participant_status/contest/` + contestId)
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

                
                
                const res2 = await fetch(`${process.env.REACT_APP_BACKEND_LOCAL_HOST}/participant_status/winningamount/` + contestId, {
                    method: 'GET',
                    credentials: "same-origin",
                    headers: {
                        'Accept': 'application/json',
                        'Content-Type': 'application/json',
                    },
                    credentials: "include"
                    }).then((result) => {
                        return result.json();
                    }).then((data) => {
                        console.log("winnigamount",data.winningAmount.length);
                        setWinningAmount(data.winningAmount);
                        // console.log(winn)
                    })
                
                
                
            })
            .catch(err=>console.log(err))
    
      
    }

    // participant list update
    const participantStatus = async() =>{
       const resultParticipant = await fetch( `${process.env.REACT_APP_BACKEND_LOCAL_HOST}/participant_status/paymentcheck/` + contestId +`/accept`)
        .then((request => request.json()))
        .then((data) => {
            setParticipants(data);
            if(data){
                console.log("ppppppppppppp", data)
                data.map((dat)=>{
                    if(dat.userid === userid){
                        setQuestion1_solvestatus(dat.questionsolvestatus1);
                        setQuestion2_solvestatus(dat.questionsolvestatus2);
                        setQuestion3_solvestatus(dat.questionsolvestatus3);
                        setQuestion4_solvestatus(dat.questionsolvestatus4);
                        console.log("llllllllll", dat.questionsolvestatus1)
                    }
                })
            }
        })
        .catch(err=>console.log(err))
    }

    function convertStoMs(seconds) {
        let minutes = Math.floor(seconds / 60);
        let extraSeconds = seconds % 60;
        minutes = minutes < 10 ? "0" + minutes : minutes;
        extraSeconds = extraSeconds< 10 ? "0" + extraSeconds : extraSeconds;
        return {minutes, extraSeconds};
    }

    useEffect(() => {
        validateUrl();
        participantStatus();
        // PrizeDistribution();
        const interval = setInterval(()=>{
            participantStatus()
        }, 30000);
    }, []);
    
   

  return (
    <div className='leaderboardbody'>
    <Navbar/>
    {
        showLeaderboard && !showCompiler && 
        <>
            <h2 className='contest_name_heading' >{contestdata.contestname}</h2>
            <div className='mx-3'>
                {contestdata && <ReverseTimer time = {contestdata.timestart} setShowQuestion={setShowQuestion} page={"problems"}/>}
            </div>
            <div className='row justify-content-center'>
                {
                    showQuestion && 
                    <div className='col-md-4'>
                    <h3 className='problems_heading'>All problems</h3>
                    {
                        contestdata && contestdata.problems[0].map(record => {
                            console.log(record, "records");
                            map1.set(record.id, qn++)
                            return(
                                <>
                                <div className='problem_card' >
                                    <div className='problem_details' key={record.id}>
                                        <p className='problem_name'>{record.name} {record.number}</p>
                                        {record.number===1 && question1_solvestatus===true && <p className='problem_accuracy solved'><b>SOLVED</b></p>}
                                        {record.number===1 &&  question1_solvestatus===false && <p className='problem_accuracy unsolved'><b>NOT SOLVED </b></p>}
                                        {record.number===2 &&  question2_solvestatus===true && <p className='problem_accuracy solved'><b>SOLVED</b></p>}
                                        {record.number===2 &&  question2_solvestatus===false && <p className='problem_accuracy unsolved'><b>NOT SOLVED</b></p>}
                                        {record.number===3 &&  question3_solvestatus===true && <p className='problem_accuracy solved'><b>SOLVED</b></p>}
                                        {record.number===3 &&  question3_solvestatus===false && <p className='problem_accuracy unsolved'><b>NOT SOLVED</b></p>}
                                        {record.number===4 &&  question4_solvestatus===true && <p className='problem_accuracy solved'><b>SOLVED</b></p>}
                                        {record.number===4 &&  question4_solvestatus===false && <p className='problem_accuracy unsolved'><b>NOT SOLVED</b></p>}
                                    </div>
                                    <div className='problem_difficulty_solve'>
                                        <p className='problem_difficulty'>Difficulty Level: {record.level}</p>
                                        <button className='btn btn-success problem_solve' onClick={()=>solveProblem(record)} >solve</button>
                                    </div>
                                </div> 
                                
                                </>
                            )
                        })
                    }          
                    </div>
                }
                
                <div className='col-md-8 liveboard '>
                    <h4 className='ranking_heading'>Ranking</h4>
                    <table className="table table-striped">
                        <thead>
                            <tr>
                            <th scope="col">Rank</th>
                            <th scope="col">Name</th>
                            <th scope="col">Total Time</th>
                            <th scope="col">Q1</th>
                            <th scope="col">Q2</th>
                            <th scope="col">Q3</th>
                            <th scope="col">Q4</th>
                            <th scope="col">Winnings</th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                participants && winningAmount.length && participants.map(record =>{
                                    let timer1= convertStoMs(record.questionsolvetime1);
                                    let timer2= convertStoMs(record.questionsolvetime2);
                                    let timer3= convertStoMs(record.questionsolvetime3);
                                    let timer4= convertStoMs(record.questionsolvetime4);
                                    let totaltime= convertStoMs(record.totalsolvingtime);
                                    return(
                                        <tr key={record.userid}>
                                            <td scope="row">{count++}</td>
                                            <td>{record.username}</td>
                                            <td>{totaltime.minutes + "." + totaltime.extraSeconds + 's'}</td>
                                            <td>{record.questionsolvetime1 === 0 ? "--" : timer1.minutes + "." + timer1.extraSeconds + 's'}</td>
                                            <td>{record.questionsolvetime2 === 0 ? "--" : timer2.minutes + "." + timer2.extraSeconds + 's'}</td>
                                            <td>{record.questionsolvetime3 === 0 ? "--" : timer3.minutes + "." + timer3.extraSeconds + 's'}</td>
                                            <td>{record.questionsolvetime4 === 0 ? "--" : timer4.minutes + "." + timer4.extraSeconds + 's'}</td>
                                            <td>₹ {(count-1 <= winningAmount.length) ? winningAmount[count-2] : 0}</td>
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
    {
        showCompiler && 
        <Compiler
            setShowCompiler = {setShowCompiler}
            question = {question}
            contestid = {contestId}
            time = {contestdata.timestart}
            setShowQuestion = {setShowQuestion}
            questionNumber = {questionNumber}
            userid = {userid}
        />
    }
    
    </div>
  )
}

export default LeaderBoard