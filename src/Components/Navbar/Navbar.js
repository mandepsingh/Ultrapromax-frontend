import React, { useContext } from 'react';
import { NavLink } from 'react-router-dom';
import { UserContext } from "../../App";
import Logo from "./../../Images/logo.png"
import './Navbar.css'

function Navbar() {
  const {state, dispatch} = useContext(UserContext);

  const RenderMenu = () =>{
      if(state.name){
        return(
          <>
              <li className="nav-item">
                <NavLink className="nav-link mx-2" to="/contests">Contests</NavLink>
              </li> 
              <li className="nav-item">
                <NavLink className="nav-link mx-2" to="/">{state.name.charAt(0).toUpperCase() + state.name.slice(1)}</NavLink>
              </li>
              <li className="nav-item">
                <NavLink className="nav-link mx-2 navbar_btn" to="/logout">Logout</NavLink>
              </li>
          </>
        )
      }
      else{
        return(
          <>
              <li className="nav-item">
                <NavLink className="nav-link text-white mx-5" to="/contests">Contests</NavLink>
              </li>
              {/* <li className="nav-item">
              <NavLink className="nav-link" to="/contests">Contests</NavLink>
            </li>
            <li className="nav-item">
              <NavLink className="nav-link" to="#">Top Coders</NavLink>
            </li>
            <li className="nav-item">
              <NavLink className="nav-link" to="#">Faq</NavLink>
            </li> */}
              
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
      <nav className="navbar navbar-expand-lg navbar-dark ">
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