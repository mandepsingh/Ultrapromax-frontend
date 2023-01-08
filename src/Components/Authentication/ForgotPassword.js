import React , {useState} from 'react'
import Navbar from '../Navbar/Navbar'
import './ResetPassword.css'

function ForgotPassword() {
    const [email, setEmail] = useState();
    const [showMessage, setShowMessage] = useState();

    function forgotPassword(e){
        e.preventDefault();
        let data = { email};
        try {
        const res = fetch("https://ultrapro1.onrender.com/user/password-forgot", {
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
            // console.log(data.message);
            setShowMessage(data.message);
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
                <h3 className='forget_password_heading'>Forgot Password</h3>
                <hr></hr>
                <p className='reset_message'>Have you forgot your password? Enter your email address below,
                    we'll send you an email with instructions on how to reset it.
                </p>
                <form>
                    <input type="email" className='form-control mb-4' placeholder='E-mail' value={email} onChange={(e)=>setEmail(e.target.value)}></input>
                    {showMessage && <p className='text-danger'>{showMessage}</p>}
                    <button type='submit' className='btn btn-success col-md-12' onClick={forgotPassword}>Send Link</button>
                </form>
                
            </div>

        </div>
      
    </>
  )
}

export default ForgotPassword
