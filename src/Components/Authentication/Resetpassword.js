import React , {useState} from 'react'
import Navbar from '../Navbar/Navbar'
import { useSearchParams, useNavigate } from 'react-router-dom';
import './ResetPassword.css'

function ResetPassword() {
    const [password, setPassword] = useState();
    const [confirmPassword, setConfirmPassword] = useState();
    const [showMessage, setShowMessage] = useState();
    const navigate = useNavigate();

    const [queryParams] = useSearchParams();
    const token = queryParams.get("token");

    function forgotPassword(e){
        e.preventDefault();
        if(password !== confirmPassword){
            alert("Password and confirm Password should be same.");
            return;
        }
        let data = {password};
        try {
        const res = fetch(`${process.env.REACT_APP_BACKEND_LOCAL_HOST}/user/password-reset?token=` + token, {
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
            // setShowMessage(data.message);
            if(data.success === true){
                alert(data.message);
                navigate("/login");
            }
            else{
                alert("Reset password again");
                navigate("/password/forgot")
            }
        })
        }
        catch (err) {
            console.log(err);
        }
    }
  return (
    <>
        <Navbar/>
        <div className='row'>
            <div className='reset_password_container'>
                <h3 className='forget_password_heading'>Reset Password</h3>
                <hr></hr>
                <form>
                    <input type="password" className='form-control mb-4' placeholder='Enter Password' value={password} onChange={(e)=>setPassword(e.target.value)}></input>
                    <input type="password" className='form-control mb-4' placeholder='confirm password' value={confirmPassword} onChange={(e)=>setConfirmPassword(e.target.value)}></input>  
                    {showMessage && <p className='text-danger'>{showMessage}</p>}
                    <button type='submit' className='btn btn-success col-md-12' onClick={forgotPassword}>Reset Password</button>
                </form>
                
            </div>

        </div>
      
    </>
  )
}

export default ResetPassword
