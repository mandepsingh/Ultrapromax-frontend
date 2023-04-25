import React, { useEffect, useState } from 'react';
import Editor from './EditorIDE';
import Split from 'react-split'
import './Compiler.css'
import Loader from '../Loader/Loader';
import ReverseTimer from '../Timer/ReverseTimer';
import { BsCaretLeftFill } from "react-icons/bs";
import ModalforCode from "./ModalforCode";


function Compiler(props) {
    console.log("compilerporps", props)
    const contestId = props.contestid;
    const question = props.question;
    // const questionid = props.question.id;
    const [showtestcase, setShowtestcase] = useState(true);
    const [compileStatuss, setCompileStatuss] = useState("");
    const [compileTime, setCompileTime] = useState();
    const [showleft, setShowLeft] = useState("description");
    const [showright, setShowRight] = useState("description");
    const [runcode, setRunCode] = useState(false);
    const [testcaseresult, setTestcaseresult] = useState();
    const [showConsoleTab, setShowConsoleTab] = useState(false);
    const [showSubmission, setShowSubmission] = useState();
    

    

    function showConsole(){
      setShowtestcase(!showtestcase);
    }

    function showResult(){
      if(runcode) setShowtestcase(false)
    }

    async function showTab(arg){
      if(arg==="submissions"){
        console.log(arg, props)
        try {
          const res = await fetch(`${process.env.REACT_APP_BACKEND_LOCAL_HOST}/submit/contestanduser/${contestId}/${props.userid}/${props.questionNumber}`, {
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
            console.log("subissionReault",data);
            setShowSubmission(data);
          })
        }
        catch (err) {
          console.log(err);
        }
      }
      setShowLeft(arg);
      
    }

    function showCode(){
      console.log("herer")
    }
   
    function setClass(e){
      if(showleft === e){
        return "leftnav_btn mt-2 activecls"
      }
      return "leftnav_btn mt-2"
    }
    
    useEffect(() => {
      console.log("compile time ", compileTime);
      showResult()
    }, [runcode]);

    // useEffect(() => {
    //   console.log("Successufully submitted ", submissionTime);
    //   submissionTime && showTab("submissions");
    // }, [submissionTime]);

    // compileTime && console.log(compileTime);

  return (
    <>
      <div className='outer_container'>
        <div className='inside_container'>
          <Split className="split" sizes={[50,50]} minSize={300}>
            <div className='left_container'>
                  <div className="left_navbar">
                    <div className='left_nav_link'>
                      <button className={setClass("allproblem")} onClick={()=>props.setShowCompiler(false)}><BsCaretLeftFill size={14} style={{marginBottom:"2px"}}/>All Problems</button>
                      <button className={setClass("description")} onClick={()=>showTab("description")}>Description</button>
                      <button className={setClass("submissions")} onClick={()=>showTab("submissions")}>Submissions</button>
                    </div>
                    </div> 
                    {
                      showleft === "description" &&
                      question &&
                      <div className="problem_statement">
                        <h4 className="problem_title">{question.name}</h4>
                        Level : {question.level}
                        <hr></hr>
                        <div className="Problem-description">
                          <p> {question.text}</p>
                        </div>
                        <p>
                          <b>Sample Input 1 : </b> <br></br>
                          {question.sampleinput}
                        </p>
                        <p>
                          <b>Output 1 : </b> <br></br>
                          {question.sampleoutput}
                        </p>
                        <p>
                          <b>Constraints : </b> <br></br>
                          {question.constraints}
                        </p>
                        <p>
                          <b>Example : </b> <br></br>
                          {question.examples}
                        </p>
                      </div> 
                    }
                    {
                      showleft === "submissions" && showSubmission &&
                      <div className='show_submission'>
                      
                        {showSubmission.map(dat => (  
                
                            <>
                              <p className='submission_text'>language: {dat.language}</p>
                              <p className='submission_text'>Status : {dat.problemstatus}</p>
                              <p className='submission_text'>_id: {dat._id}</p>
                              <ModalforCode code= {dat.code}/>
                              <p>-----------------------------------------------</p>
                              
                              </>

                    
                        ))}  
            
                      </div>
                    }
            </div>

             
            
            <div className="mid_container">
              <div className="right_navbar d-flex justify-content-between">
                  <select className='select_language' aria-label="Default select example">
                    <option defaultValue="1">C++</option>
                    <option value="2">Java</option>
                    <option value="3">Python</option>
                  </select>
                  
                  <div className='compiler_time'>
                    <ReverseTimer time = {props.time} setShowQuestion={props.setShowQuestion} page={"compiler"}/>
                  </div>
                 
              </div> 
              
              <div className='editor_body_container'>
                <div className='editor-ide'>
                  <Editor 
                    setCompileTime = {setCompileTime}
                    setRunCode = {setRunCode}
                    contestids = {contestId}
                    questionNumbers = {props.questionNumber}
                    questionids = {question.questionid}
                    userids = {props.userid}
                    conteststarttimes = {props.time}
                    showConsoleTab = {showConsoleTab}
                    setShowConsoleTab = {setShowConsoleTab}
                    testcases = {question.testcase}
                    settestcaseresult= {setTestcaseresult}
                    setcompileStatuss= {setCompileStatuss}
                  />
                </div>
              </div>
                
            </div> 

            { showConsoleTab === true && 
                <div className="right_container ">
                <div className="right_navbar">
                  <button className='btn'>Console</button>
                </div> 
                <div className='d-flex'>
                  <button className='btn col-md-6 
                  ' onClick={showConsole}>Sample Testcase</button>
                  <button className='btn col-md-6' onClick={showConsole}>Result</button>
                </div>
                <hr/>
                {
                  showtestcase ?
                  <div>
                    <div className='accordian_header mx-3 my-2'>Test Case</div>
                    <div className="accordion accordion-flush" id="accordionFlushExample">
                        <div className="accordion-item testcases">
                          <h2 className="accordion-header" id="flush-headingOne">
                            <button className="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#flush-collapseOne" aria-expanded="false" aria-controls="flush-collapseOne">
                              Testcase
                            </button>
                          </h2>
                          <div id="flush-collapseOne" className="accordion-collapse collapse bg-light bg-gradient" aria-labelledby="flush-headingOne" data-bs-parent="#accordionFlushExample">
                            <div className="accordion-body">
                              <div className='input_testCase'>
                                <p><b>Input test case:</b></p>
                                <textarea rows="4" className='input_test_case_area' value={question.testcase}/>
                              </div>
                            </div>
                          </div>
                        </div>
  
                        {/* <div className="accordion-item testcases">
                          <h2 className="accordion-header" id="flush-headingTwo">
                            <button className="accordion-button collapsed " type="button" data-bs-toggle="collapse" data-bs-target="#flush-collapseTwo" aria-expanded="false" aria-controls="flush-collapseTwo">
                              Testcase 2
                            </button>
                          </h2>
                          <div id="flush-collapseTwo" className="accordion-collapse collapse bg-light bg-gradient" aria-labelledby="flush-headingTwo" data-bs-parent="#accordionFlushExample">
                            <div className="accordion-body">
                              <div className='input_testCase'>
                                <p><b>Input test case:</b></p>
                                <textarea rows="4" className='input_test_case_area'/>
                              </div>
                            </div>
                          </div>
                        </div>
                        <div className="accordion-item testcases">
                          <h2 className="accordion-header" id="flush-headingThree">
                            <button className="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#flush-collapseThree" aria-expanded="false" aria-controls="flush-collapseThree">
                              Testcase 3
                            </button>
                          </h2>
                          <div id="flush-collapseThree" className="accordion-collapse collapse bg-light bg-gradient" aria-labelledby="flush-headingThree" data-bs-parent="#accordionFlushExample">
                            <div className="accordion-body">
                              <div className='input_testCase'>
                                <p><b>Input test case:</b></p>
                                <textarea rows="4" className='input_test_case_area'/>
                              </div>
                            </div>
                          </div>
                        </div> */}
                      </div>
                  </div>  :
                  <div>
                    { 
                      runcode ? <div className='mx-3 my-3'><Loader/>YOUR CODE IS COMPILING..........</div>: 
                        (compileStatuss === "Compilation Error" ?  
                          <>
                          <p style={{color:'red'}}  className='mx-3 my-3'>Compilation Error</p>
                          <p className='mx-3 my-3'>Please check your code for error and try again!</p>
                          </>: 
                            (compileStatuss=== "Run Accepted" ? 
                              <>
                              <p className='mx-3 my-3'>Compilation Successfull in {compileTime*1000} ms</p>
                              <p className='mx-3 my-3'>Input: {question.testcase}</p>
                              <p className='mx-3 my-3'>Output: {testcaseresult}</p>
                              <p className='mx-3 my-3'>Compilation Time: {compileTime}s</p>
                              </>:
                              compileStatuss=== "Wrong Answer" ? 
                              <>
                              <p style={{color:'red'}} className='mx-3 my-3'>{testcaseresult}</p>
                              <p className='mx-3 my-3'>Please check your code for error and try again!</p>
                              </>: 
                                <>
                                <p style={{color:'green'}} className='mx-3 my-3'>Successfull Submitted!</p>
                                <p className='mx-3 my-3'>Compilation Time: {compileTime}s</p>
                                </>
                            )
                        )
                    }
                  </div>
                }
                
              </div> 
            }

            

          </Split>                
        </div>

        {/* <div className={showConsoleClass}>
              <div className="right_navbar"></div>

              <button className='show_console_btn'><p className='show_console'>CONSOLE</p></button>
            </div>

             */}
      </div> 
    </>
  )
}

export default Compiler