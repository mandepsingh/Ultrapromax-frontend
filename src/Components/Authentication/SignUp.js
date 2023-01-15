import React, {useState} from "react";
import Navbar from '../Navbar/Navbar'
import { useNavigate } from "react-router-dom";
import "./signup.css"

function SignUp(props) {
    const navigate = useNavigate();
    props.setProgress(0);
	props.setProgress(100);
    const [firstname, setfirstname] = useState("");
    const [lastname, setlastname] = useState("");
    const [email, setEmail] = useState("");
    const [gender, setGender] = useState("");
    const [phone, setPhone] = useState("");
    const [dateofbirth, setDateofbirth] = useState("");
    const [password, setPassword] = useState("");
    const [confirmpassword, setConfirmpassword] = useState("");
    const [msg, setMsg] = useState("");
    
    function submitData(e){
        e.preventDefault();
        let data = {firstname, lastname, email, gender, phone, dateofbirth, password, confirmpassword};
        if(password !== confirmpassword){
            setMsg("Password and Confirm password should be same");
            console.log(msg);
        }
        else{
            try {
                const res = fetch("https://ultrapro1.onrender.com/user/register", {
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
                    console.log(data);
                    if(data){
                        navigate("/login");
                    }
                    else{
                        console.log("Error");
                    }
                  
                })
              }
              catch (err) {
                console.log(err);
              }

            
        }
        
    }
	return (
    <>
    <Navbar></Navbar>
    <div className="container">
        <div className="row my-3 d-flex justify-content-center">
            <div className="col-lg-6">
                <div>
                    <label id="headline" className="headline d-flex justify-content-center"> CodingBucks </label>
                    <label id="tagline" className="tagline d-flex justify-content-center">Do Practise and Earn More</label>
                    <div className="d-grid gap-1 m-2">
                        <button type="submit" className="btn btn-google"> Signup with Google </button>
                    </div>
                </div>
                <hr/>
                <form className="row g-3">
                    <div className="mt-4 mb-2 row">
                        <label htmlFor="staticEmail" className="col-sm-2 col-form-label">Name</label>
                        <div className="col">
                            <input type="text" className="form-control" id="firstname" value={firstname} onChange = {(e)=>{setfirstname(e.target.value)}} placeholder="First Name" autoComplete="firstname" required/>
                        </div>
                        <div className="col">
                            <input type="text" className="form-control" id="lastname" value={lastname} onChange = {(e)=>{setlastname(e.target.value)}} placeholder="Last Name" autoComplete="lastname" required/>
                        </div>
                    </div>
                    <div className="my-2 row">
                        <label htmlFor="email" className="col-sm-2 col-form-label">Email</label>
                        <div className="col">
                            <input type="email" className="form-control" id="email" value={email} onChange = {(e)=>{setEmail(e.target.value)}} placeholder="Email" autoComplete="email" required/>
                        </div>
                    </div>
                    <div className="my-2 row">
                        <label htmlFor="gender" className="col-sm-2 col-form-label">Gender</label>
                        <div className="col">
                            <select className="form-select form-select" aria-label=".form-select-sm gender" value={gender} onChange = {(e)=>{setGender(e.target.value)}} required>
                                <option value="">select</option>  
                                <option value="male">Male</option>
                                <option value="female">Female</option>
                            </select>
                        </div>
                        <label htmlFor="age" className="col-sm-2 col-form-label mx-3">D.O.B.</label>
                        <div className="col">
                            <input type="date" className="form-control" id="age" value={dateofbirth} onChange = {(e)=>{setDateofbirth(e.target.value)}} required/>
                        </div>
                    </div>
                    <div className="my-2 row">
                        <label htmlFor="mobileNumber" className="col-sm-2 col-form-label">Phone</label>
                        <div className="col">
                            <input type="text" className="form-control" id="mobileNumber" value={phone} onChange = {(e)=>{setPhone(e.target.value)}} required/>
                        </div>
                    </div>
                    <div className="my-2 row">
                        <label htmlFor="new-password" className="col-sm-2 col-form-label">Password</label>
                            <div className="col-sm-10">
                        <input type="password" className="form-control" id="new-password" value={password} onChange = {(e)=>{setPassword(e.target.value)}} autoComplete = "password" required/>
                        </div>
                    </div>
                    <div className="my-2 row">
                        <label htmlFor="confirm_password" className="col-sm-2 col-form-label">Confirm Password</label>
                        <div className="col-sm-10">
                            <input type="password" className="form-control" id="confirm_password" value={confirmpassword} onChange = {(e)=>{setConfirmpassword(e.target.value)}} autoComplete="Retype-password" required/>
                        </div>
                        <p className="message">{msg}</p>
                    </div>

                    <div className="d-grid gap-2 mt-2 ">
                        <button type="submit" className="btn btn-success submit" onClick={submitData} >Sign Up</button>
                    </div>

                </form>

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
	);
}

export default SignUp;
