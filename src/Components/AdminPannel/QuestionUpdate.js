import React, {useState, useEffect ,useContext } from 'react'
import SearchContest from '../Search/SearchContest';
import { useNavigate, useParams } from "react-router-dom"

function QuestionUpdate() {

    const [questionData, setQuestionData] = useState();
    const [constraints, setConstraints] = useState();
    const [examples, setExamples] = useState();
    const [expected_output, setExpected_output] = useState();
    const [level, setLevel] = useState();
    const [name, setName] = useState();
    const [sampleinput, setSampleinput] = useState();
    const [sampleoutput, setSampleoutput] = useState();
    const [testcase, setTestcase] = useState();
    const [text, setText] = useState();
    const [topic, setTopic] = useState();
    
    // const [e]

    const params = useParams();
    let navigate = useNavigate();

    const questionid= params.questionid;

    const getQuestionData = async (e) => {
        try {
            const res = await fetch(`${process.env.REACT_APP_BACKEND_LOCAL_HOST}/problems/getfullprobelmbyid/`+questionid)
            .then((result) => {
              return result.json();
            }).then(async (data) => {
              await setQuestionData(data)
              await setName(data.name)
              await setConstraints(data.constraints)
              await setExamples(data.examples)
              await setExpected_output(data.expected_output)
              await setLevel(data.level)
              await setSampleinput(data.sampleinput)
              await setSampleoutput(data.sampleoutput)
              await setTestcase(data.testcase)
              await setText(data.text)
              await setTopic(data.topic);
              console.log("llll",data)
            })
          }
          catch (err) {
            console.log(err);
        }
    }

    const handleSubmit = async (e) => {
        console.log("hello", topic);
        e.preventDefault();
        let data= {
            constraints,
            examples,
            expected_output,
            level,
            name,
            sampleinput,
            sampleoutput,
            testcase,
            text,
            topic,
        }   
        try {
            const res = fetch(`${process.env.REACT_APP_BACKEND_LOCAL_HOST}/problems/update/`+questionid, {
                method: 'PATCH',
                body: JSON.stringify(data),
                headers: {
                    'Content-type': 'application/json; charset=UTF-8',
                },
            }).then((result) => {
                return result.json();
            }).then( async (data1) =>{
                console.log("data1..",data1);
                navigate(`/adminpannel`);
            })
        }
        catch (err) {
            console.log(err);
          }
    }

    useEffect(() => {
        getQuestionData();
    }, []);

    
    

  return (
    <div className='adminpannelcontainer'>
      <div className='adminpannelheading'>
        <h2>Admin Pannel</h2>
      </div>
      <div>
        <b>Question Update</b>
      </div>
        <div class="containerupdatequestion">
            <form onSubmit={handleSubmit}>
                <div class="rowupdatequestion">
                    <div class="col-25">
                        <label for="fname"><b>Question Name</b></label>
                    </div>
                    <div class="col-75">
                    <input className='rowupdatequestioninput' value={name} onChange={e => setName(e.target.value)} type="text" name="name" placeholder={name}/>
                    </div>
                </div>
                <div class="rowupdatequestion">
                    <div class="col-25">
                        <label for="fname"><b>Level</b></label>
                    </div>
                    <div class="col-75">
                    <input className='rowupdatequestioninput' value={level} onChange={e => setLevel(e.target.value)} type="text" name="level" placeholder={level}/>
                    </div>
                </div>
                <div class="rowupdatequestion">
                    <div class="col-25">
                    <label for="text"><b>Problem Statement</b></label>
                    </div>
                    <div class="col-75">
                    <textarea className='rowupdatequestioninput' value={text} name="text" onChange={e => setText(e.target.value)} placeholder={text} style={{"height":"200px"}}></textarea>
                    </div>
                </div>
                <div class="rowupdatequestion">
                    <div class="col-25">
                    <label for="constraints"><b>Constraints</b></label>
                    </div>
                    <div class="col-75">
                    <textarea className='rowupdatequestioninput' value={constraints} name="constraints" onChange={e => setConstraints(e.target.value)} placeholder={constraints} style={{"height":"200px"}}></textarea>
                    </div>
                </div>
                <div class="rowupdatequestion">
                    <div class="col-25">
                    <label for="sampleinput"><b>Sample Input</b></label>
                    </div>
                    <div class="col-75">
                    <textarea className='rowupdatequestioninput' value={sampleinput} name="sampleinput" onChange={e => setSampleinput(e.target.value)} placeholder={sampleinput} style={{"height":"200px"}}></textarea>
                    </div>
                </div>
                <div class="rowupdatequestion">
                    <div class="col-25">
                    <label for="constraints"><b>Sample Output</b></label>
                    </div>
                    <div class="col-75">
                    <textarea className='rowupdatequestioninput' value={sampleoutput} name="sampleoutput" onChange={e => setSampleoutput(e.target.value)} placeholder={sampleoutput} style={{"height":"200px"}}></textarea>
                    </div>
                </div>
                <div class="rowupdatequestion">
                    <div class="col-25">
                    <label for="constraints"><b>Examples</b></label>
                    </div>
                    <div class="col-75">
                    <textarea className='rowupdatequestioninput' value={examples} name="examples" onChange={e => setExamples(e.target.value)} placeholder={examples} style={{"height":"200px"}}></textarea>
                    </div>
                </div>
                <div class="rowupdatequestion">
                    <div class="col-25">
                    <label for="constraints"><b>Testcase</b></label>
                    </div>
                    <div class="col-75">
                    <textarea className='rowupdatequestioninput' value={testcase} name="testcase" onChange={e => setTestcase(e.target.value)} placeholder={testcase} style={{"height":"200px"}}></textarea>
                    </div>
                </div>
                <div class="rowupdatequestion">
                    <div class="col-25">
                    <label for="constraints"><b>Expected Output</b></label>
                    </div>
                    <div class="col-75">
                    <textarea className='rowupdatequestioninput' value={expected_output} name="expected_output" onChange={e => setExpected_output(e.target.value)} placeholder={expected_output} style={{"height":"200px"}}></textarea>
                    </div>
                </div>
                <div class="rowupdatequestion">
                    <div class="col-25">
                        <label for="topic"><b>Problem Topic:</b></label>
                    </div>
                    <div class="col-75">
                        <select className='rowupdatequestioninput' name="topic" onChange={e => setTopic(e.target.value)}>
                            <option value="null">---</option>
                            <option value="Array">Array</option>
                            <option value="String">String</option>
                            <option value="Stack">Stack</option>
                            <option value="Queue">Queue</option>
                            <option value="Linked List">Linked List</option>
                            <option value="Sorting and searching">Sorting and searching</option>
                            <option value="Tree">Tree</option>
                            <option value="Hashing">Hashing</option>
                            <option value="Heap">Heap</option>
                            <option value="Graph">Graph</option>
                        </select>
                    </div>
                </div>
                <br/>
                <div class="rowupdatequestion">
                    <button type="submit"><b>Submit</b></button>
                </div>
            </form>
        </div>
    </div>
  )
}

export default QuestionUpdate