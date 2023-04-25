import React, {useState} from 'react'
import { useParams } from "react-router-dom";
import "./AdminPannel.css"

function AdminPannelParticipantsSubmissionQuestion(props) {
    console.log("submissiondata",props.submissionData)
    const params = useParams();
    const questionid = params.questionid;
    const [active, setActive] = useState("");

    var i= 1;
    const [problemdetails, setProblemdetails]= useState();
    const [codedetails, setCodedetails]= useState();
    
    const fetchQuestiondata = async (e) => {
        try {
            const res = await fetch(`${process.env.REACT_APP_BACKEND_LOCAL_HOST}/problems/id/`+e)
            .then((result) => {
              return result.json();
            }).then((data) => {
              // console.log("sadfasdfasd",data);
              setProblemdetails(data)
              console.log(data)
            })
          }
          catch (err) {
            console.log(err);
        }
    }

    const showQuestionDetails= async (e)=> {
      setActive(`questiondetails`)
      console.log(e)
      await fetchQuestiondata(e);
    }

    const showCode= async (e)=> {
        setActive(`showcode`)
        console.log("code",e);
        if(props.submissionData){
            props.submissionData.forEach(element => {
                console.log(element)
                if(element._id===e){
                    setCodedetails(element)
                }
            });
        }
        
        
    }

    const markPlagirism= async (e)=> {
        setActive(`question`)
  
        await fetchQuestiondata();
    }
    

  return (
    <div>{props.problemnumber}
        <div className='adminpannel'>
            <>
                {/* <!-- Modal --> */}
                <div className="modal fade" id="staticBackdrop" data-bs-backdrop="static" data-bs-keyboard="false" tabIndex="-1" aria-labelledby="staticBackdropLabel" aria-hidden="true">
                <div className="modal-dialog">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title" id="staticBackdropLabel">Question Details</h5>
                            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div className="modal-body">
                            <form >
                                <div className="mb-3">
                                    <label htmlFor="name" className="form-label mb-1"><b>Name </b> </label>
                                    <p>{problemdetails && problemdetails.name}</p>
                                </div>
                                <div className="mb-3">
                                    <label htmlFor="text" className="form-label mb-1"><b>Problem Statement </b> </label>                        
                                    <p>{problemdetails && problemdetails.text}</p>
                                </div>
                                <div className="mb-3">
                                    <label htmlFor="constraints" className="form-label mb-1"><b>Constraints </b></label>
                                    <p> {problemdetails && problemdetails.constraints}</p>
                                </div>
                                <div className="mb-3">
                                    <label htmlFor="examples" className="form-label mb-1"><b>Examples </b> </label>
                                    <p>{problemdetails && problemdetails.examples}</p>
                                </div>
                                <div className="mb-3">
                                    <label htmlFor="sampleinput" className="form-label mb-1"><b>Sample Input </b> </label>                        
                                    <p>{problemdetails && problemdetails.sampleinput}</p>
                                </div>
                                <div className="mb-3">
                                    <label htmlFor="sampleoutput" className="form-label mb-1"><b>Sample Output </b> </label>
                                    <p>{problemdetails && problemdetails.sampleoutput}</p>
                                </div>
                                <div className="mb-3">
                                    <label htmlFor="testcase" className="form-label mb-1"><b>Testcase </b> </label>                        
                                    <p>{problemdetails && problemdetails.testcase}</p>
                                </div>
                                <div className="mb-3">
                                    <label htmlFor="level" className="form-label mb-1"><b>Level </b></label>
                                    <p> {problemdetails && problemdetails.level}</p>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
                </div>
            </>
            <>
                {/* <!-- Modal --> */}
                <div className="modal fade" id="staticBackdrop2" data-bs-backdrop="static" data-bs-keyboard="false" tabIndex="-1" aria-labelledby="staticBackdrop2Label" aria-hidden="true">
                <div className="modal-dialog">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title" id="staticBackdrop2Label">Code Details</h5>
                            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div className="modal-body">
                            <form >
                                <div className="mb-3">
                                    <label htmlFor="time_start" className="form-label mb-1"><b>Problem Number</b></label>
                                    <p>{codedetails && codedetails.problemnumber}</p>
                                </div>
                                <div className="mb-3">
                                    <label htmlFor="difficulty_level" className="form-label mb-1"><b>Code</b></label>
                                    <p>{codedetails && codedetails.code}</p>
                                </div>
                                <div className="mb-3">
                                    <label htmlFor="contest_amount" className="form-label mb-1"><b>Problem Status</b></label>                        
                                    <p>{codedetails && codedetails.problemstatus}</p>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
                </div>
            </>
            <div className='admintable'>
                <table class="table table-striped">
                    <thead>
                        <tr>
                        <th scope="col">#</th>
                        <th scope="col">Submissions</th>
                        <th scope="col">Language</th>
                        {/* <th scope="col">Solve Time</th> */}
                        {/* <th scope="col">Participant</th> */}
                        <th scope="col">Solve Status</th>
                        <th scope="col">Actions</th>
                        <th scope="col">Actions</th>
                        <th scope="col">Actions</th>
                        {/* <th scope="col">Participant</th> */}
                        </tr>
                    </thead>
                    <tbody>
                        {
                        (props.submissionData ? props.submissionData.map( record => {
                            return(
                                <tr>
                                    <th scope="row">{i++}</th>
                                    <td>{record._id}</td>
                                    <td>{record.language}</td>
                                    {/* <td>{record.amount}</td> */}
                                    <td>{record.problemstatus}</td>
                                    <td>
                                        <button color="primary" className="px-4" type="button" data-bs-toggle="modal" data-bs-target="#staticBackdrop" data-whatever="@question" onClick={()=> showQuestionDetails(record.problemid)}>
                                            Question Details
                                        </button>
                                        
                                    </td>
                                    <td>
                                        <button color="primary" className="px-4" type="button" data-bs-toggle="modal" data-bs-target="#staticBackdrop2" data-whatever="@code" onClick={()=> showCode(record._id)}>
                                            Open Code
                                        </button>
                                    </td>
                                    <td>
                                        <button color="primary" className="px-4" onClick={()=> markPlagirism(1)}>
                                            Mark Plagirism
                                        </button>
                                    </td>
                                </tr> 
                                // </div>  
                            )
                        }) 
                        : <div className='mx-3 my-3'>data loading</div> )
                        }
                    </tbody>
                </table>
            </div>
        </div>
    </div>
  )
}

export default AdminPannelParticipantsSubmissionQuestion