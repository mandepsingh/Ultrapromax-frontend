import React, { useContext, useState } from 'react';
import { NavLink } from 'react-router-dom';
import { UserContext } from "../../App";
import Profile from '../Profile/Profile';
import Logo from "./../../Images/logo.png"
import './Navbar.css'

function Navbar() {
  const {state, dispatch} = useContext(UserContext);
  const [toggleProfile, setToggleProfile] = useState(false);

  function showProfile(){
    console.log("object");
    setToggleProfile(!toggleProfile);
  }
  
  // function hideProfile(){
  //   console.log("object");
  //   setToggleProfile(false);
  // }

  const RenderMenu = () =>{
      
      if(state.name){
        return(
          <>

              <li className="nav-item top_right_navbar">
                <NavLink className="nav-link mx-1" to="/contests">CONTESTS</NavLink>
              </li> 
              <li className="nav-item">
              {/* to={url} */}
                <NavLink className="nav-link mx-1" onClick={showProfile}>
                  
                  
                  {/* {state.name.charAt(0).toUpperCase() + state.name.slice(1)} */}
                  <img className='navBar_profile_img' src='https://cdn.pixabay.com/photo/2014/04/12/14/59/portrait-322470_960_720.jpg'/>

                </NavLink>

                { toggleProfile && <div className='showProfile'><Profile/></div> }

              </li>
              {/* <li className="nav-item">
                <NavLink className="nav-link mx-1 navbar_btn text-black" to="/logout">Logout</NavLink>
              </li> */}
          </>
        )
      }
      else{
        return(
          <>
              <li className="nav-item">
                <NavLink className="nav-link text-white mx-5" to="/contests">Contests</NavLink>
              </li>
              <li className="nav-item">
                {/* <button className='nav-link navbar_btn'>Login</button> */}
                <NavLink className="nav-link navbar_btn mx-1 text-black" to="/login">Login</NavLink>
              </li>
              <li className="nav-item">
                <NavLink className="nav-link navbar_btn mx-1 text-black" to="/register">Register</NavLink>
              </li>
          </>
        )
      }
  }

  return (
    <>
      {/* <div className='navbar'>
        <div className='container'>
          <a className='brand_name'><img src={Logo} height={"40px"}/></a>
        </div>
      </div> */}
      <nav className="navbar navbar-expand-lg navbar-dark">
        <div className="container-fluid container">
          <a className="navbar-brand brand_name" href="/"><img src={Logo} height={"40px"}/></a>
          <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse justify-content-end" id="navbarSupportedContent">
            <ul className="navbar-nav mr-auto ">
                <RenderMenu/>
              </ul>
          </div>
        </div>
      </nav>    
    </>
  )
}

export default Navbar