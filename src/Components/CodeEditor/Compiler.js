import React, { useEffect, useState } from 'react';
import Navbar from '../Navbar/Navbar';
import { useParams } from 'react-router-dom';
import Editor from './EditorIDE';
import Split from 'react-split'
import Home from '../Home/Home';
import Login from '../Authentication/Login';
// import './style.css';
import './Compiler.css'
import Loader from '../Loader/Loader';

function Compiler(props) {

    const params = useParams();
    const contestId = params.contestid;
    const questionid = params.questionid;
    const [questionData, setQuestionData] = useState();
    const [showtestcase, setShowtestcase] = useState(true);
    const [compileTime, setCompileTime] = useState();
    const [showleft, setShowLeft] = useState("description");
    const [runcode, setRunCode] = useState(false);

    function showConsole(){
      setShowtestcase(!showtestcase);
    }

    function showResult(){
      if(runcode) setShowtestcase(false)
    }

    function showTab(arg){
      setShowLeft(arg);
    }
   
    const fetchQuestionData = async () => {
      const result = await (
        await fetch(
          `https://ultrapro1.onrender.com/problems/` + questionid
        )
      ).json();
  
      // set state when the data received
      console.log(result)
      setQuestionData(result)
     
    };

    useEffect(() => {
      fetchQuestionData();
    }, []);

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
        <Navbar></Navbar>
        
        <div className='inside_container'>
          <Split className="split" sizes={[30,40,30]} minSize={300}>
            <div className='left_container'>
                  <div className="left_navbar">
                    <div className='left_nav_link'>
                      <button className='btn btn-light' onClick={()=>showTab("description")}>Description</button>
                      <button className='btn btn-light' onClick={()=>showTab("submissions")}>Submissions</button>
                    </div>
                   
                    
                  </div> 
                    {
                      showleft === "description" &&
                      questionData &&
                      <div className="problem_statement">
                        <h4 className="problem_title">{questionData.name}</h4>
                        Level : {questionData.level}
                        <hr></hr>
                        <div className="Problem-description">
                          <p> {questionData.text}</p>
                        </div>
                        <p>
                          <b>Sample Input 1 : </b> <br></br>
                          {questionData.sampleinput}
                        </p>
                        <p>
                          <b>Output 1 : </b> <br></br>
                          {questionData.sampleoutput}
                        </p>
                        <p>
                          <b>Constraints : </b> <br></br>
                          {questionData.constraints}
                        </p>
                        <p>
                          <b>Example : </b> <br></br>
                          {questionData.examples}
                        </p>
                      </div> 
                    }
                    {
                      showleft === "submissions" &&
                      <div className='show_submission'>
                        Previous Submissions
                      </div>
                    }
            </div>
            <div className="mid_container">
              <div className="right_navbar">
                  <select className='select-language' aria-label="Default select example">
                    <option defaultValue="1">C++</option>
                    <option value="2">Java</option>
                    <option value="3">Python</option>
                  </select>
              </div> 
              <div className='editor_body_container'>
                <div className='editor-ide'>
                  <Editor setCompileTime = {setCompileTime} setRunCode = {setRunCode}></Editor>
                </div>
              </div>
                
            </div> 

            <div className="right_container">
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
                  <div className='accordian_header mx-3 my-2'>3 Test Cases</div>
                  <div className="accordion accordion-flush" id="accordionFlushExample">
                      <div className="accordion-item testcases">
                        <h2 className="accordion-header" id="flush-headingOne">
                          <button className="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#flush-collapseOne" aria-expanded="false" aria-controls="flush-collapseOne">
                            Testcase 1 
                          </button>
                        </h2>
                        <div id="flush-collapseOne" className="accordion-collapse collapse bg-light bg-gradient" aria-labelledby="flush-headingOne" data-bs-parent="#accordionFlushExample">
                          <div className="accordion-body">
                            <div className='input_testCase'>
                              <p><b>Input test case:</b></p>
                              <textarea rows="4" className='input_test_case_area'/>
                            </div>
                          </div>
                        </div>
                      </div>

                      <div className="accordion-item testcases">
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
                      </div>
                    </div>
                </div>  :
                <div>
                  { 
                    runcode ? <div className='mx-3 my-3'><Loader/></div> : 
                    compileTime ? <p>Compilation Successfull in {compileTime} sec</p> : 
                    <div className='mx-3 my-3'>Click on Run or Submit to see result.</div>
                  }
                </div>
              }
              
            </div> 

          </Split>                
        </div>
      </div> 
    </>
  )
}

export default Compiler