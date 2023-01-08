import React, { useContext } from 'react';
import { NavLink } from 'react-router-dom';
import { UserContext } from "../../App";
import './Navbar.css'

function Navbar() {
  const {state, dispatch} = useContext(UserContext);

  const RenderMenu = () =>{
      if(state.name){
        return(
          <>
              <li className="nav-item">
                <NavLink className="nav-link" to="/contests">Contests</NavLink>
              </li>
              <li className="nav-item nav-link">|</li>
              <li className="nav-item">
                <NavLink className="nav-link" to="/">{state.name}</NavLink>
              </li>
              <li className="nav-item nav-link">|</li>
              <li className="nav-item">
                <NavLink className="nav-link" to="/logout">Logout</NavLink>
              </li>
          </>
        )
      }
      else{
        return(
          <>
              <li className="nav-item">
                <NavLink className="nav-link" to="/contests">Contests</NavLink>
              </li>
              <li className="nav-item nav-link">|</li>
              <li className="nav-item">
                <NavLink className="nav-link" to="/login">Login</NavLink>
              </li>
              <li className="nav-item nav-link">|</li>
              <li className="nav-item">
                <NavLink className="nav-link" to="/register">Register</NavLink>
              </li>
          </>
        )
      }
  }

  return (
    <>
    <nav className="navbar navbar-expand-lg bg-light">
      <div className="container-fluid">
        <a className="navbar-brand brand_name" href="/">Coding Bucks</a>
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