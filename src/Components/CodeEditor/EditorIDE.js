import React , {useEffect, useState, useContext} from 'react'
import Editor from "@monaco-editor/react";
import Moment from "moment";
import { IoIosArrowUp } from "react-icons/io";
import { IoIosArrowDown } from "react-icons/io";
import { MdPlayArrow } from "react-icons/md";


function EditorIDE({setCompileTime,
  setRunCode ,
  contestids ,
  questionNumbers ,
  questionids,
  userids ,
  conteststarttimes,
  showConsoleTab,
  setShowConsoleTab ,
  testcases,
  settestcaseresult,
  setcompileStatuss}) {

  console.log("qn", questionids, conteststarttimes);


  const [source_code, setSourceCode] = useState("// Write Code here...");
  const [consoleLeft, setconsoleLeft] = useState(true);
  const [disableallbuttons, setDisableallbuttons]= useState(false);
  
  // const params = useParams();
  const questionid = questionids
  const conteststatus = "running"
  
  let intervalId;
  const userid = userids;
  function onChange(newValue) {
    setSourceCode(newValue);
    localStorage.setItem(questionid, source_code);
    localStorage.setItem("timeofcode", Date.now());
  }

  function setconsole(e){
    console.log("sssss")
    setShowConsoleTab(showConsoleTab);
    if(e === "left"){
      setconsoleLeft(false);
    }
    if(e === "right"){
      setconsoleLeft(true);
    }
  }

  const runCode = async()=>{
    setDisableallbuttons(true);
    setShowConsoleTab(true);
    setconsoleLeft(false);

    console.log("mycode",source_code)
    const stdin = testcases;
    // const testcase2 = '12'
    setRunCode(true);

    let data = {source_code, stdin, language_id : "54" };
    console.log(data);
    try {
        const res = await fetch(`${process.env.REACT_APP_BACKEND_LOCAL_HOST}/submit/run`, {
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
      }).then(async(data) => {
        console.log("run_data",data.res.token);
          try {
            const res = await fetch(`${process.env.REACT_APP_BACKEND_LOCAL_HOST}/submit/run/status/`+ data.res.token, {
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
              if(data.name && data.name === "Error"){
                console.log("object")
                setcompileStatuss("Compilation Error");
                settestcaseresult(data.stack)
                setRunCode(false);
              }
              else if(data.status && data.status.description === "Compilation Error") {
                setcompileStatuss("Compilation Error");
                settestcaseresult(data.stack)
                setCompileTime(data.time);
                setRunCode(false);
              }
              else {
                setcompileStatuss("Run Accepted");
                setCompileTime(data.time);
                settestcaseresult(data.stdout);
                setRunCode(false);
              }
              
            })
          }
          catch (err) {
            console.log(err);
          }
      })
    }
    catch (err) {
      console.log(err);
    }
    setTimeout(function () {
      setDisableallbuttons(false);
    }, 10000);
    
  }
    
  const submitCode = async()=>{
    setDisableallbuttons(true);
    setShowConsoleTab(true);
    setconsoleLeft(false);
    
    console.log("mycode",source_code)
    setRunCode(true);
    console.log(true);
    const problemnumber = questionNumbers.toString();
    const contestid = contestids;
    const problem = questionid;
    const conteststarttime = conteststarttimes;
    const language = "cpp"
   
    let data = { contestid, problemnumber, userid, source_code, language_id : "54"};
    console.log("code data",data);
    try {
      const res = await fetch(`${process.env.REACT_APP_BACKEND_LOCAL_HOST}/submit`, {
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
      }).then(async (data) => {
        console.log(data);
          try {
            let submitdata = {contestid, userid, problemnumber};
            console.log("ssgadfsd",submitdata);
            const res = await fetch(`${process.env.REACT_APP_BACKEND_LOCAL_HOST}/submit/status/`+ data.res.token, {
              method: 'POST',
              credentials: "same-origin",
              headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
              },
              credentials: "include",
              // body: JSON.stringify(submitdata)
            }).then((result) => {
              return result.json();
            }).then((data) => {
              console.log(data);
              if(data.name && data.name === "Error"){
                console.log("object")
                setcompileStatuss("Compilation Error");
                settestcaseresult(data.stack)
                setRunCode(false);
              }
              else if(data.status && data.status.description === "Compilation Error") {
                setcompileStatuss("Compilation Error");
                settestcaseresult(data.stack)
                setCompileTime(data.time);
                setRunCode(false);
              }
              else if(data.status && data.status.description === "Wrong Answer") {
                setcompileStatuss("Wrong Answer");
                settestcaseresult(data.status.description)
                setCompileTime(data.time);
                setRunCode(false);
              }
              else{
                setcompileStatuss("Submit Accepted");
                setCompileTime(data.time);
                setRunCode(false);
              }
            })
          }
          catch (err) {
            console.log(err);
          }
        
        
      })
    }
    catch (err) {
      console.log(err);
    }
    setTimeout(function () {
      setDisableallbuttons(false);
    }, 10000);

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
        setSourceCode(savedCode);
      } 
  }, []);


  return (
    <>
        <Editor
        height="100%"
        padding="10px"
        defaultLanguage="C++"
        value= {source_code}
        onChange={onChange}
        options={{
          wordWrap : 'on'
        }}
      />
     <div className='base_btn'>
      {/* {
        consoleLeft  == true ? 
          <button className='btn' onClick={()=> setconsole("left")}>Console <IoIosArrowUp size={17} style={{marginBottom:"3px"}}/></button> :
          <button className='btn' onClick={()=> setconsole("right")}>Console <IoIosArrowDown size={17} style={{marginBottom:"3px"}}/></button>
      } */}

        <div className='float_right'>
          <button className='run_code_btn' disabled={disableallbuttons} onClick={runCode}>Run <MdPlayArrow size={18} style={{marginBottom:"3px"}}/></button>
          <button className='submit_code_btn' disabled={disableallbuttons} style={{ color: disableallbuttons ? '#c9bebe' : 'white' }} onClick={submitCode}>Submit</button>
        </div>
        
     </div>
      
    </>
    
  )
}

export default EditorIDE