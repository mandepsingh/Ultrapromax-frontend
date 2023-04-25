import React, {useState, useEffect ,useContext } from 'react'
import { useNavigate } from "react-router-dom";
import SearchContest from '../Search/SearchContest';
import Loader from '../Loader/Loader';
import "./AdminPannel.css"

function Question() {

    const [questionlist, setQuestionlist] = useState([]);
    const [filteredContest, setFilteredContest] = useState();
    const[fetchingstatus, setFethingstatus]= useState(false);
    const [active, setActive] = useState("allContests");
    const [skip, setSkip] = useState(0)

    let navigate = useNavigate();

    const allQuestionsData = async (e) => {
        setActive("allContests")
        try {
            const res = await fetch(`${process.env.REACT_APP_BACKEND_LOCAL_HOST}/problems/?skip=${skip}`)
            .then((result) => {
              return result.json();
            }).then(async (data) => {
              console.log("questions", data);
              await setQuestionlist([...questionlist, ...data.data]);
              console.log(data)
            })
          }
          catch (err) {
            console.log(err);
        }
        setFethingstatus(true);
    }

    useEffect(() => {
        allQuestionsData();
    }, [skip]);

    const handleScroll = (e) => {
      const { offsetHeight, scrollTop, scrollHeight} = e.target
      console.log(offsetHeight + scrollTop + 100, scrollHeight);
      if (offsetHeight + scrollTop + 100 >= scrollHeight) {
        setSkip(questionlist.length)
      }
    }

    const updateQuestion = (e) =>{
        navigate(`/adminpannel/question/update/`+e);
    }
    const createNewQuestion = (e) =>{
      navigate(`/adminpannel/question/newuser`);
    }
    var i= 1;

  return (
    <div>
        <div className='adminpannelcontainer'>
          <div className='adminpannel'>
            <div className='topnavbar'>
              <div className='searchbar'>  
                {
                  questionlist && <SearchContest contests={questionlist} setFilteredContest={setFilteredContest}/>
                }
              </div>
              <button color="primary" className="px-4 createnewuser"
                  onClick={() => {createNewQuestion()}}
                  >
                  Create New Question
              </button>
            </div>
            <div className='admintable' onScroll={handleScroll}>
              <table class="table table-striped">
                  <thead>
                    <tr>
                      <th scope="col">#</th>
                      <th scope="col">Question Name</th>
                      <th scope="col">ID</th>
                      <th scope="col">Topic</th>
                      <th scope="col">Level</th>
                      <th scope="col">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {
                      !filteredContest && fetchingstatus==true ? (questionlist.length>0 ? questionlist.map( record => {
                          return(
                              <tr>
                                <th scope="row">{i++}</th>
                                <td>{record.name}</td>
                                <td>{record._id}</td>
                                <td>{record.topic}</td>
                                <td>{record.level}</td>
                                <td>
                                    <button color="primary" className="px-4"
                                        onClick={() => {updateQuestion(record._id)}}
                                        >
                                        Update
                                    </button>
                                </td>
                              </tr> 
                          )
                      }) 
                      : <div> There is no contest available! </div> ): <div className='mx-3 my-3'><Loader/></div>
                    }
                    {
                      filteredContest && questionlist !== "no data" && questionlist.data.map( record => {
                          return(
                            <tr>
                                <th scope="row">{i++}</th>
                                <td>{record.name}</td>
                                <td>{record._id}</td>
                                <td>{record.level}</td>
                                <td>
                                    <button color="primary" className="px-4"
                                        onClick={() => {updateQuestion(record._id)}}
                                        >
                                        Open
                                    </button>
                                </td>
                            </tr>  
                          )
                      })
                    }
                </tbody>
              </table>
            </div>
          </div>
        </div>
    </div>
  )
}

export default Question