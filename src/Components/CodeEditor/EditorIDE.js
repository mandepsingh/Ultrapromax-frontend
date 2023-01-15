import React , {useEffect, useState, useContext} from 'react'
import Editor from "@monaco-editor/react";
import Moment from "moment";

function EditorIDE(props) {

  console.log("qn", props.questionNumber);


  const [code, setCode] = useState("// Write Code here...");
  // const params = useParams();
  const questionid = props.questionid
  const conteststatus = "running"
  
  let intervalId;
  const userid = props.userid;

  function onChange(newValue) {
    setCode(newValue);
    localStorage.setItem(questionid, code);
    localStorage.setItem("timeofcode", Date.now());
  }

  const runCode = async()=>{
    console.log("mycode",code)
    const testcase1 = '23'
    const testcase2 = '12'
    props.setRunCode(true);

    let data = {userid, code, testcase1, testcase2, conteststatus};
    try {
        const res = await fetch("https://ultrapro1.onrender.com/submit/run", {
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
      }).then((data) => {
        // console.log(data);
        intervalId = setInterval(async()=>{
          try {
            const res = fetch(`https://ultrapro1.onrender.com/submit/run/`+ data.jobId, {
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
              console.log(data);
              if(data.status === "success"){
                const startTime = Moment(data.submittedAt);
                const endTime = Moment(data.completedAt);
                const compiletime = endTime.diff(startTime, 'seconds', true);
                props.setCompileTime(compiletime);
                props.setRunCode(false);
                clearInterval(intervalId);
              }
              else if(data.status !== "pending"){
                clearInterval(intervalId);
                props.setRunCode(false);
              }
              
            })
          }
          catch (err) {
            console.log(err);
          }
        }, 1000);
      })
    }
    catch (err) {
      console.log(err);
    }
  }
    
  const submitCode = async()=>{
    console.log("mycode",code)
    props.setRunCode(true);
    console.log(true);
    const problemnumber = props.questionNumber.toString();
    const contestid = props.contestid;
    const testcase1 = "2 3"
    const testcase2 = "1 2"
    const testcase3 = "1 2"
    const expectedres1 = "23" 
    const expectedres2 = "12"
    const expectedres3 = "12"
    const conteststarttime = props.conteststarttime;
    const language = "cpp"
   
    let data = { problemnumber, contestid, userid, code, language, testcase1, testcase2, testcase3, expectedres1, expectedres2, expectedres3, conteststarttime, conteststatus};
    console.log("code data",data);
    try {
      const res = await fetch("https://ultrapro1.onrender.com/submit", {
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
      }).then((data) => {
        console.log(data);
        intervalId = setInterval(async()=>{
          try {
            const res = fetch(`https://ultrapro1.onrender.com/submit/`+ data.jobId, {
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
              console.log(data);
              if(data.status === "success"){
                const startTime = Moment(data.submittedAt);
                const endTime = Moment(data.completedAt);
                const compiletime = endTime.diff(startTime, 'seconds', true);
                props.setCompileTime(compiletime);
                props.setRunCode(false);
                clearInterval(intervalId);
              }
              else if(data.status !== "pending"){
                props.setRunCode(false);
                clearInterval(intervalId);
              }
            })
          }
          catch (err) {
            console.log(err);
          }
        }, 1000);
        
      })
    }
    catch (err) {
      console.log(err);
    }

  }

  useEffect(() => {
      const now = Date.now();
      const savedtime = localStorage.getItem("timeofcode");
      console.log(now-savedtime);
      if(savedtime && now - savedtime > 1.5*60*60*1000){
        localStorage.removeItem(questionid);
      }
      const savedCode = localStorage.getItem(questionid);
      if(savedCode){
        setCode(savedCode);
      } 
  }, []);


  return (
    <>
        <Editor
        height="100%"
        defaultLanguage="C++"
        value= {code}
        onChange={onChange}
        options={{
          wordWrap : 'on'
        }}
      />
     
      <button className='btn btn-success run_code_btn' onClick={runCode}>Run code</button>
      <button className='btn btn-success submit_code_btn' onClick={submitCode}>submit code</button>
    </>
    
  )
}

export default EditorIDE