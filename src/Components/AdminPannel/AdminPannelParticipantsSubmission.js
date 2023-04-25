import React, {useState, useEffect ,useContext } from 'react'
import { UserContext } from "../../App"
import { useParams, useNavigate } from "react-router-dom";
import AdminPannelParticipantsSubmissionQuestion from './AdminPannelParticipantsSubmissionQuestion.js';
import AdminPannelParticipantsSubmissionPayment from './AdminPannelParticipantsSubmissionPayment.js';

function AdminPannelParticipantsSubmission() {
    const {state, dispatch} = useContext(UserContext);
    // const userid = state.userId;
    // const username= state.name;

    let navigate = useNavigate(); 
    const params = useParams();
    const contestid = params.contestid;
    const userid= params.userid;
    // console.log(contestid);

    const [contestData, setContestData] = useState();
    const [problemnumber, setProblemNumber]= useState(1);
    const [submissionData, setSubmisionData]= useState();
    const [active, setActive] = useState("question1");
    const [transactionData, setTransactionData]= useState();

    const allContestData = async (e) => {
        try {
            const res = await fetch(`${process.env.REACT_APP_BACKEND_LOCAL_HOST}/submit/contestanduser/`+ contestid+ "/"+userid+"/"+e)
            .then((result) => {
              return result.json();
            }).then((data) => {
              // console.log("sadfasdfasd",data);
              setSubmisionData(data)
              // console.log(data)
            })
          }
          catch (err) {
            console.log(err);
        }
    }

    const fetchTransactiondata = async()=>{
      try {
        const res = await fetch(`${process.env.REACT_APP_BACKEND_LOCAL_HOST}/submit/contestanduser/`+ contestid+ "/"+userid)
        .then((result) => {
          return result.json();
        }).then((data) => {
          // console.log("sadfasdfasd",data);
          setTransactionData(data)
          // console.log(data)
        })
      }
      catch (err) {
        console.log(err);
    }
    }

    function activeClass(btn){
      if(btn === active){
          return "active_btn";
      }
      return "";
    }

    useEffect(() => {
        allContestData(1);
    }, []);
  
    
    const routeChange = () =>{ 
        let path = `newPath`; 
        navigate(`/adminpannel/submissions/`+contestid+"/"+userid);
    }
  
    const getQuestionDetails= async (e)=> {
      setActive(`question`+e)
      setProblemNumber(e)
      await allContestData(e);
    }

    const getTransactionDetail= async()=> {
      setActive("transaction")
      await fetchTransactiondata();
    }

  return (
    
    <div className='adminpannelcontainer'>
      <div className='adminpannelheading'>
        <h2>Admin Pannel</h2>
      </div>
      <div className='adminnavbar'>
          <div className='adminnavbarinfo'>
              <div className='d-flex navbar_btn_category row'>
                  <button className={`navbar_info-buttons col-md-2 `+ activeClass("question1") } onClick={()=> getQuestionDetails(1)}>Question1</button>
                  <button className={`navbar_info-buttons col-md-2 `+ activeClass("question2") } onClick={()=> getQuestionDetails(2)}>Question2</button>
                  <button className={`navbar_info-buttons col-md-2 `+ activeClass("question3") } onClick={()=> getQuestionDetails(3)}>Question3</button>
                  <button className={`navbar_info-buttons col-md-2 `+ activeClass("question4") } onClick={()=> getQuestionDetails(4)}>Question4</button>
                  <button className={`navbar_info-buttons col-md-2 `+ activeClass("transaction") } onClick={()=> getTransactionDetail()}>Transaction Details</button>
              </div>
              <div className='contests_details'>
                  {(active === "question1" ||  active === "question2" || active === "question3" || active === "question4") && <AdminPannelParticipantsSubmissionQuestion submissionData= {submissionData} problemnumber= {problemnumber}/>}
                  {active === "transaction" && <AdminPannelParticipantsSubmissionPayment transactionData= {transactionData}/>}
                  {/* {active === "pastContests" && <PastContests/>} */}
              </div>
              
          </div>
      </div>
    </div>
  )
}

export default AdminPannelParticipantsSubmission