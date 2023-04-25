import React from 'react'
import { useState , useContext} from 'react'
import { Link, useNavigate } from "react-router-dom";
import Navbar from '../Navbar/Navbar'
import { UserContext } from "../../App"
import {BsFillEyeFill, BsFillEyeSlashFill} from 'react-icons/bs'
import './Login.css';

function Login() {

  const {state, dispatch} = useContext(UserContext)

  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [showMessage, setShowMessage] = useState(false);
  const [passwordShown, setPasswordShown] = useState(false);

  const togglePasswordVisiblity = () => {
    setPasswordShown(passwordShown ? false : true);
  };
  
  const navigate = useNavigate();

  const handleSubmit = async (e) => {

    e.preventDefault();
    let data = { email, password };
    try {
      const res = await fetch(`${process.env.REACT_APP_BACKEND_LOCAL_HOST}/user/login`, {
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
          const userid = data.userid, contestwin= data.contestwin, moneywin=data.moneywin;
          window.localStorage.setItem("userName", name);
          window.localStorage.setItem("userId", userid);
          dispatch({ type: "USER", name : name, userid : userid, contestwin: contestwin, moneywin: moneywin })
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
  // console.log(progress);
 

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
                <div className='showpassword'>
                  <input type={passwordShown ? "text" : "password"} className="form-control" placeholder='Password' id="password" value={password} onChange={(e)=>setPassword(e.target.value)} autoComplete="off" required/>
                  {passwordShown===true ? 
                    <i onClick={togglePasswordVisiblity}><BsFillEyeFill size={30} style={{marginBottom:"2px", padding:"6px"}}/></i>:
                    <i onClick={togglePasswordVisiblity}><BsFillEyeSlashFill size={30} style={{marginBottom:"2px", padding:"6px"}}/></i>
                  }
                </div>
              </div>
            </div>
            {showMessage && <div className='text-danger'>Invalid username or password</div>}

            <div className="d-grid mt-3 mb-4">
              <button type="submit" className="btn btn-success submit">Login</button>
            </div>
          </form>
          <div className='d-flex justify-content-between'>
              <Link className='links' to="/password/forgot" style={{color:'#1a73ec'}}> Forgot Password?</Link>
              <Link className='links' to="/register" style={{color:'#1a73ec'}}>Sign Up</Link>
          </div>

            {/* <div className='mt-4 d-flex justify-content-center'>
                <label className='mb-2'>Don't have an account yet? <span style={{color:'#1a73ec'}}>Sign up for free</span></label>
            </div> */}
            <div className=' d-flex justify-content-center'>
                <label>Didn’t receive your confirmation email? Resend</label>
            </div>
        
          </div>
        </div>
      </div>
      
    </>
  )
}

export default Login