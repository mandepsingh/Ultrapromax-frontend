import React, {useContext } from 'react';
import './Profile.css';
import { UserContext } from "../../App";
import { BsCoin } from "react-icons/bs";
import { GiSwordsEmblem } from "react-icons/gi";
import { NavLink } from 'react-router-dom';
import { FaTrophy } from "react-icons/fa";
import { FaSignOutAlt } from "react-icons/fa";

function Profile() {
  const {state, dispatch} = useContext(UserContext)

    function signout(){
        console.log("sign out");
        fetch(`${process.env.REACT_APP_BACKEND_LOCAL_HOST}/user/signout`,{
            method : 'GET',
            headers:{
                'Accept':'application/json',
                'Content-Type':'application/json'
            },
            credentials: "include"
           
          }).then((res)=>{
            dispatch({ type: "USER", name : null, userid : 0 })
            window.localStorage.clear();
            if(res.status !== 201){
              console.log("logout");
            }
            else{
              console.log("Succesfully logout");
            }
          }).catch((err)=>{
                console.log(err);   
          });
    }
    const username = state.name;
    const userid = state.userId, moneywin= state.moneywin, contestwin= state.contestwin;
    let url = `/profile/${state.name}`;
  return (
    <>
    <div className='profile_card'>
        <div className='d-flex'>
        <img className='profile_img' src='https://cdn.pixabay.com/photo/2014/04/12/14/59/portrait-322470_960_720.jpg'/> 




        <NavLink ><strong>{state.name}</strong></NavLink>
        {/* to={url}  */}




        </div>
        <div className='d-flex justify-content-between mt-3'>
           {/* <p><BsCoin  style={{marginBottom : "3px"}}/> Total Money earned</p>
           <p>{moneywin}</p> */}
        </div>
        
        {/* <div className='d-flex justify-content-between'>
           <p><GiSwordsEmblem size={17} style={{marginBottom : "3px"}}/> Contest Played</p>
           <p>50</p>
        </div> */}
        <div className='d-flex justify-content-between'>
           <p><FaTrophy style={{marginBottom : "3px"}}/> Contest Wins</p>
           <p>{contestwin}</p>
        </div>
        <a className='signOut_link' onClick={signout} ><FaSignOutAlt style={{marginBottom : "3px"}}/> Sign Out </a>
        
    </div>
      
    </>
  )
}

export default Profile
