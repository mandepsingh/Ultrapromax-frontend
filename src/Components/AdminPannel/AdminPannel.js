import React, {useState, useEffect ,useContext } from 'react'
import { UserContext } from "../../App"
import { useNavigate } from "react-router-dom";
import Contest from './Contest';
import User from './User.js';
import Question from './Question.js';
import "./AdminPannel.css"

function AdminPannel() {
    const {state, dispatch} = useContext(UserContext);
    const userid = state.userId;
    const username= state.name;
    const [contestid, setContestid]= useState("63ff7ad6271663f413e487b4");
    const [active, setActive] = useState("contest");

    let navigate = useNavigate(); 

    function activeClass(btn){
        if(btn === active){
            return "active_btn";
        }
        return "";
    }

  return (
    
    <div className='adminpannelcontainer'>
      <div className='adminpannelheading'>
        <h2>Admin Pannel</h2>
      </div>
      <div className='adminnavbar'>
          <div className='adminnavbarinfo'>
              <div className='d-flex navbar_btn_category row'>
                  <button className={`navbar_info-buttons col-md-2 `+ activeClass("contest") } onClick={()=> setActive("contest")}>Contest</button>
                  <button className={`navbar_info-buttons col-md-2 `+ activeClass("user") } onClick={()=> setActive("user")}>User</button>
                  <button className={`navbar_info-buttons col-md-2 `+ activeClass("question") } onClick={()=> setActive("question")}>Question</button>
                  {/* <button className={`navbar_info-buttons col-md-2 `+ activeClass("newUser") } onClick={()=> setActive("newUser")}>Create New User</button> */}
              </div>
              <div className='contests_details'>
                  {active === "contest" && <Contest/>}
                  {active === "user" && <User/>}
                  {active === "question" && <Question/>}
              </div>
              
          </div>
      </div>
    </div>
  )
}

export default AdminPannel