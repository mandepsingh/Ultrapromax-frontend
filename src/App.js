import React, { useState } from 'react'
import Login from "./Components/Authentication/Login";
import SignUp from "./Components/Authentication/SignUp";
import LeaderBoard from "./Components/Leaderboard/LeaderBoard";
import { BrowserRouter, Route, Routes} from "react-router-dom";
import Home from "./Components/Home/Home";
import UserProfile from "./Components/UserProfile/UserProfile.js"
import Logout from "./Components/Authentication/Logout";
import Dashboard from "./Components/Dashboard/Dashboard";
import Contests from "./Components/Contests/Contests";
import Compiler from "./Components/CodeEditor/Compiler";
import Error from "./Components/Error/Error";
import ForgotPassword from "./Components/Authentication/ForgotPassword";
import { createContext, useReducer } from "react";
import { inititalState, reducer } from "./reducer/UseReducer";
import Resetpassword from "./Components/Authentication/Resetpassword";
import LoadingBar from "react-top-loading-bar";
import AdminPannel from "./Components/AdminPannel/AdminPannel.js"
import ContestParticipants from './Components/AdminPannel/ContestParticipants.js';
import AdminPannelParticipantsSubmission from './Components/AdminPannel/AdminPannelParticipantsSubmission.js';
import UserContest from './Components/AdminPannel/UserContest.js';
import CreateNewUser from './Components/AdminPannel/CreateNewUser.js';
import QuestionUpdate from './Components/AdminPannel/QuestionUpdate.js';
import QuestionCreate from './Components/AdminPannel/QuestionCreate.js';
 
// contextAPI
export const UserContext = createContext();

const Routing = ()=>{
  const [progress, setProgress] = useState(0);
  // console.log(progress);
  return(
    <BrowserRouter>
      <LoadingBar
          color='#92a49c'
          // progress={progress}
          height={3}
          progress={progress}
        />
      <Routes>
        <Route index element= {<Home setProgress={setProgress}/>}/>
        <Route path="/home" element= {<Home setProgress={setProgress}/>}/>
        <Route path="/Leaderboard" element= {<LeaderBoard/>}/>
        <Route path="/dashboard/:id" element= {<Dashboard/>}/>
        <Route path="/contests" element= {<Contests setProgress={setProgress}/>}/>
        <Route path="/login" element= {<Login setProgress={setProgress}/>}/>
        <Route path="/register" element= {<SignUp setProgress={setProgress}/>}/>
        <Route path="/logout" element= {<Logout/>}/>
        <Route path="/password/forgot" element= {<ForgotPassword/>}/>
        <Route path="/user/password-reset" element= {<Resetpassword/>}/>
        <Route path="/leaderBoard/:id" element= {<LeaderBoard/>}/>
        <Route path="/compiler/:contestid/:questionid" element= {<Compiler/>}/>
        <Route path="/profile/:name" element= {<UserProfile/>}/>
        <Route path="/adminpannel" element= {<AdminPannel/>}/>
        <Route path="/adminpannel/:contestid" element= {<ContestParticipants />}/>
        <Route path="/adminpannel/submissions/:contestid/:userid" element= {<AdminPannelParticipantsSubmission/>}/>
        <Route path="/adminpannel/user/:userid" element= {<UserContest/>}/>
        <Route path="/adminpannel/user/createnewuser" element= {<CreateNewUser/>}/>
        <Route path="/adminpannel/question/update/:questionid" element= {<QuestionUpdate/>}/>
        <Route path="/adminpannel/question/newuser" element= {<QuestionCreate/>}/>
        {/* <Route path="/adminpannel" element= {<AdminPannel/>}/> */}
        <Route path="*" element= {<Error/>}/>
        
      </Routes>
    </BrowserRouter>
  )
}

function App() {
  const [state, dispatch] = useReducer(reducer, inititalState);
  
  return (
    <>
    <UserContext.Provider value={{state, dispatch}}>
      <Routing/>
    </UserContext.Provider>
    
    </>
  );
}

export default App;
