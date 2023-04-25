import React, {useState, useEffect ,useContext } from 'react'
import { UserContext } from "../../App"
import { useNavigate } from "react-router-dom";
import SearchContest from '../Search/SearchContest';
import Loader from '../Loader/Loader';
import "./AdminPannel.css"

function Contest() {
    const {state, dispatch} = useContext(UserContext);
    const userid = state.userId;
    const username= state.name;
    const [contest_list, setContestlist] = useState([]);
    const [fetchingstatus, setFethingstatus]= useState(false);
    const [filteredContest, setFilteredContest] = useState();
    const [active, setActive] = useState("liveContests");
    const [prevactive, setPrevactive] = useState("liveContests");
    const [skip, setSkip] = useState(0)
    // const [liveskip, setLiveskip] = useState(0)
    // const [upskip, setUpskip] = useState(0)
    // const [pastskip, setPastskip] = useState(0)

    let navigate = useNavigate(); 

    function activeClass(btn){
        if(btn === active){
            return "active_btn";
        }
        return "";
    }

    useEffect(() => {
      if(active=='liveContests'){
        getLivecontestData();
      }
      else if(active=='pastContests'){
        getPastcontestData();
      }
      else if(active=='upcomingContests'){
        getUpcomingcontestData();
      }
      
    }, [skip]);
  
    const handleScroll = (e) => {
      const { offsetHeight, scrollTop, scrollHeight} = e.target
      // console.log(offsetHeight ,scrollTop, scrollHeight);
      if (offsetHeight + scrollTop + 100 >= scrollHeight) {
        setSkip(contest_list.length)
      }
    }

    const getLivecontestData= async(e) =>{
        setActive("liveContests")
        if(prevactive!= "liveContests"){
          setSkip(0);
        }
        console.log(prevactive, active)
        try {
            const res = await fetch(`${process.env.REACT_APP_BACKEND_LOCAL_HOST}/contest/contestlive/?skip=${skip}`)
            .then((result) => {
              return result.json();
            }).then(async (data) => {
              if(skip==0){
                await setContestlist([...data.data]);
              }
              else{
                await setContestlist([...contest_list, ...data.data]);
              }
            })
          }
          catch (err) {
            console.log(err);
        }
        setFethingstatus(true);
        setPrevactive("liveContests");
    }
    const getPastcontestData= async(e) =>{
        setActive("pastContests")
        if(prevactive!= "pastContests"){
          setSkip(0);
        }
        try {
            const res = await fetch(`${process.env.REACT_APP_BACKEND_LOCAL_HOST}/contest/contestpast/?skip=${skip}`)
            .then((result) => {
              return result.json();
            }).then(async (data) => {
              console.log("past", data)
              if(skip==0){
                await setContestlist([...data.data]);
              }
              else{
                await setContestlist([...contest_list, ...data.data]);
              }
            })
          }
          catch (err) {
            console.log(err);
        }
        setFethingstatus(true);
        setPrevactive("pastContests");
    }
    const getUpcomingcontestData= async(e) =>{
        setActive("upcomingContests")
        if(prevactive!= "upcomingContests"){
          setSkip(0);
        }
        try {
            const res = await fetch(`${process.env.REACT_APP_BACKEND_LOCAL_HOST}/contest/contestupcoming/?skip=${skip}`)
            .then((result) => {
              return result.json();
            }).then(async (data) => {
              if(skip==0){
                await setContestlist([...data.data]);
              }
              else{
                await setContestlist([...contest_list, ...data.data]);
              }
            })
          }
          catch (err) {
            console.log(err);
        }
        setFethingstatus(true);
        setPrevactive("upcomingContests");
    }
    
    
    const routeChange = (e) =>{
        let path = `newPath`; 
        navigate(`/adminpannel/`+e);
    }
    var i= 1;

  return (
    <div>
        <div className='adminpannelcontainer'>
          <div className='adminpannel'>
            <div className='topnavbar'>
              <div className='searchbar'>  
                {
                  contest_list && <SearchContest contests={contest_list} setFilteredContest={setFilteredContest}/>
                }
              </div>
              <div className='internalnavbar'>
              <div className='admincontestnavbar'>
                <div className='container_inside'>
                    <div className=''>
                        <div className='d-flex  row'>
                            <button className={` col-md-4 contesinnernavbarbutton`+ activeClass("liveContests") } onClick={()=> getLivecontestData() }>LIVE CONTEST</button>
                            <button className={` col-md-4 contesinnernavbarbutton`+ activeClass("upcomingContests") } onClick={()=> getUpcomingcontestData()}>UPCOMING CONTEST</button>
                            <button className={` col-md-4 contesinnernavbarbutton`+ activeClass("pastContests") } onClick={()=> getPastcontestData()}>PAST CONTEST</button>
                        </div>
                    </div>
                </div>

                </div>
              </div>
            </div>
            <div className='admintable' onScroll={handleScroll}>
              <table class="table table-striped" >
                  <thead>
                    <tr>
                      <th scope="col">#</th>
                      <th scope="col">Contest Name</th>
                      <th scope="col">ID</th>
                      <th scope="col">Amount</th>
                      <th scope="col">Level</th>
                      <th scope="col">Creation Time</th>
                      <th scope="col">Start Time</th>
                      <th scope="col">Creator Name</th>
                      <th scope="col">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {
                      !filteredContest && fetchingstatus==true ? (contest_list.length>0 ? contest_list.map( record => {
                          return(
                              <tr style={{height:"100px"}}>
                                <th scope="row">{i++}</th>
                                <td>{record.contestname}</td>
                                <td>{record._id}</td>
                                <td>{record.amount}</td>
                                <td>{record.level}</td>
                                <td>{record.createdat}</td>
                                <td>{record.timestart}</td>
                                <td>{record.creatorname}</td>
                                <td>
                                    <button color="primary" className="px-4"
                                        onClick={() => {routeChange(record._id)}}
                                        >
                                        Open
                                    </button>
                                </td>
                              </tr> 
                          )
                      }) 
                      : <div> There is no contest available! </div> ): <div className='mx-3 my-3'><Loader/></div>
                    }
                    {
                      filteredContest && filteredContest !== "no data" && filteredContest.map( record => {
                          return(
                            <tr style={{height:"100px"}}>
                                <th scope="row">{i++}</th>
                                <td>{record.contestname}</td>
                                <td>{record._id}</td>
                                <td>{record.amount}</td>
                                <td>{record.level}</td>
                                <td>{record.createdat}</td>
                                <td>{record.timestart}</td>
                                <td>{record.creatorname}</td>
                                <td>
                                    <button color="primary" className="px-4"
                                        onClick={() => {routeChange(record._id)}}
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

export default Contest