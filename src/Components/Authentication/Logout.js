import React from 'react'
import { useEffect, useContext } from 'react'
import { useHistory } from 'react-router-dom';
import { UserContext } from "../../App";
import { useNavigate } from "react-router-dom";


function Logout() {

  const {state, dispatch} = useContext(UserContext)

  const navigate = useNavigate();


    useEffect(() => {
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
              navigate("/home");
            }
            else{
              console.log("Succesfully logout");
            }
          }).catch((err)=>{
                console.log(err);   
          });
    } );
    
        
  return (
    <> 

    </>
  )
}

export default Logout