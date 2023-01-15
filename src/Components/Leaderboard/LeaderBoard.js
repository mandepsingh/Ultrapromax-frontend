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
    const [questionNumber, setQuestionNumber] = useState(0);
    
    var count = 1;
    var qn = 1;
    const navigate = useNavigate();

    const map1 = new Map();


    // on click solve problem
    function solveProblem(question){
        // navigate(`/compiler/`+ contestId + `/` + questionid)
        setShowCompiler(true);
        setQuestion(question);
        setQuestionNumber(map1.get(question._id));
    }

    // validate url 
    const validateUrl = async() =>{
            const result = await fetch(`https://ultrapro1.onrender.com/contest/contest/` + contestId)
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
       const resultParticipant = await fetch( `https://ultrapro1.onrender.com/participant_status/paymentcheck/` + contestId +`/accept`)
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

   

  return (
    <>
    <Navbar/>
    {
        showLeaderboard && !showCompiler && 
        <>
            <h2 className='contest_name_heading' >{contestdata.contestname}</h2>
            <div className='timer'>
                {contestdata && <ReverseTimer time = {contestdata.timestart} setShowQuestion={setShowQuestion} page={"problems"}/>}
            </div>
            <div className='row justify-content-center'>
                {
                    showQuestion && 
                    <div className='col-md-4'>
                    <h3 className='problems_heading'>All problems</h3>
                    {
                        contestdata && contestdata.problems[0].map(record => {
                            map1.set(record._id, qn++)
                            return(
                                <>
                                <div className='problem_card' >
                                    <div className='problem_details' key={record._id}>
                                        <p className='problem_name'>{record.name}</p>
                                        <p className='problem_accuracy'>Accuracy: <b>50%</b></p>
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
                                    console.log(record);
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
    
    </>
  )
}

export default LeaderBoard