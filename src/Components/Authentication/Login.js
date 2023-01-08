import React from 'react'
import { useState , useContext} from 'react'
import { Link, useNavigate } from "react-router-dom";
import Navbar from '../Navbar/Navbar'
import { UserContext } from "../../App"
import sideImg from '../../Images/logo.png'
import './Login.css';

function SignIn() {

  const {state, dispatch} = useContext(UserContext)

  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [showMessage, setShowMessage] = useState(false);
  
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    let data = { email, password };
    try {
      const res = await fetch("https://ultrapro1.onrender.com/user/login", {
        method: 'POST',
        credentials: "same-origin",
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
        },
        credentials: "include",
        body: JSON.stringify(data)
      }).then((result) => {
        return result.json();
      }).then((data) => {
        // console.log(data);
        if (data.status !== 'Login Successfull' ) {
          console.log("Incorrect email or password");
          setShowMessage(true);
        }
        else {
          // console.log(data);
          const name = data.name;
          const userid = data.userid;
          window.localStorage.setItem("userName", name);
          window.localStorage.setItem("userId", userid);
          dispatch({ type: "USER", name : name, userid : userid })
          // console.log("Succesfully login");
          navigate("/home");
        }
      })
    }
    catch (err) {
      console.log("invalid username or password");
      setShowMessage(true);
      console.log(err);
    }
  }
  
  return (
    <>
    <Navbar></Navbar>
      <div className="container">
        <div className="row my-3 d-flex justify-content-center">

          <div className="col-lg-6">
            <div>
              <label id="headline" className="headline d-flex justify-content-center"> CodingBucks</label>
              <label id="tagline" className="tagline d-flex justify-content-center">Do Practise and Earn More</label>
              <div className="d-grid gap-2 m-4">
                <button type="submit" className="btn btn-google">Signin with Google</button>
              </div>
            </div>
            <hr/>

          <form onSubmit={handleSubmit}>
            <div className='row'>
              <div className="col mb-3">
                <label htmlFor="email" className="form-label">Email address</label>
                <input type="email" className="form-control" placeholder='Email' id="email" value={email} onChange={(e)=>setEmail(e.target.value)} autoComplete="off" required/>
              </div>
            </div>

            <div className="row">
              <div className="col mb-3">
                <label htmlFor="password" className="form-label">Password</label>
                <input type="password" className="form-control" placeholder='Password' id="password" value={password} onChange={(e)=>setPassword(e.target.value)} autoComplete="off" required/>
              </div>
            </div>
            {showMessage && <div className='text-danger'>Invalid username or password</div>}

            <div className="d-grid mt-3 mb-4">
              <button type="submit" className="btn btn-success submit">Login</button>
            </div>
          </form>
          <div className='d-flex justify-content-between'>
              <Link className='links' to="/password/forgot">Forgot Password?</Link>
              <Link className='links' to="/register">Sign Up</Link>
          </div>

            <div className='mt-4 d-flex justify-content-center'>
                <label className='mb-2'>Don't have an account yet? Sign up for free</label>
            </div>
            <div className=' d-flex justify-content-center'>
                <label>Didn’t receive your confirmation email? Resend it</label>
            </div>
        
          </div>
        </div>
      </div>
    </>
  )
}

export default SignIn