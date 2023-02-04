import React , {useEffect, useState, useContext} from 'react'
import Editor from "@monaco-editor/react";
import Moment from "moment";
import { IoIosArrowUp } from "react-icons/io";
import { IoIosArrowDown } from "react-icons/io";
import { MdPlayArrow } from "react-icons/md";


function EditorIDE(props) {

  console.log("qn", props.questionNumber);


  const [source_code, setSourceCode] = useState("// Write Code here...");
  const [consoleLeft, setconsoleLeft] = useState(true);
  
  // const params = useParams();
  const questionid = props.questionid
  const conteststatus = "running"
  
  let intervalId;
  const userid = props.userid;

  function onChange(newValue) {
    setSourceCode(newValue);
    localStorage.setItem(questionid, source_code);
    localStorage.setItem("timeofcode", Date.now());
  }

  function setconsole(e){
    console.log("sssss")
    props.setShowConsoleTab(!props.showConsoleTab);
    if(e === "left"){
      setconsoleLeft(false);
    }
    if(e === "right"){
      setconsoleLeft(true);
    }
  }

  const runCode = async()=>{
    props.setShowConsoleTab(true);
    setconsoleLeft(false);

    console.log("mycode",source_code)
    const stdin = props.testcase;
    // const testcase2 = '12'
    props.setRunCode(true);

    let data = {source_code, stdin, language_id : "54" };
    console.log(data);
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
      }).then(async(data) => {
        console.log("run_data",data.res.token);
          try {
            const res = await fetch(`https://ultrapro1.onrender.com/submit/run/status/`+ data.res.token, {
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
              if(data.name === "Error"){
                console.log("object")
                props.setCompileTime("error");
                props.setRunCode(false);
              }
              else {
                props.setCompileTime(data.time);
                props.setRunCode(false);
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
  }
    
  const submitCode = async()=>{
    props.setShowConsoleTab(true);
    setconsoleLeft(false);
    
    console.log("mycode",source_code)
    props.setRunCode(true);
    console.log(true);
    const problemnumber = props.questionNumber.toString();
    const contestid = props.contestid;
    const problem = props.questionid;
    const conteststarttime = props.conteststarttime;
    const language = "cpp"
   
    let data = { contestid, problemnumber, userid, source_code, language_id : "54"};
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
      }).then(async (data) => {
        console.log(data);
          try {
            let submitdata = {contestid, userid, problemnumber};
            console.log("ssgadfsd",submitdata);
            const res = await fetch(`https://ultrapro1.onrender.com/submit/status/`+ data.res.token, {
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
              if(data.name === "Error"){
                console.log("object")
                props.setCompileTime("error");
                props.setRunCode(false);
              }
              else if(data.status.description !== "Wrong Answer") {
                props.setCompileTime(data.time);
                props.setRunCode(false);
              }
              else{
                props.setCompileTime("Wrong Answer");
                props.setRunCode(false);
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
      {
        consoleLeft  == true ? 
          <button className='btn' onClick={()=> setconsole("left")}>Console <IoIosArrowUp size={17} style={{marginBottom:"3px"}}/></button> :
          <button className='btn' onClick={()=> setconsole("right")}>Console <IoIosArrowDown size={17} style={{marginBottom:"3px"}}/></button>
      }

        <div className='float_right'>
          <button className='run_code_btn' onClick={runCode}>Run <MdPlayArrow size={18} style={{marginBottom:"3px"}}/></button>
          <button className='submit_code_btn' onClick={submitCode}>Submit</button>
        </div>
        
     </div>
      
    </>
    
  )
}

export default EditorIDE