import React from 'react';
import { useState, useEffect , useContext} from 'react';
import { useNavigate } from "react-router-dom";
import { UserContext } from "../../App"
import "./Timer.css";

function Timer(props) {
  const [days, setDays] = useState(0);
  const [hours, setHours] = useState(0);
  const [minutes, setMinutes] = useState(0);
  const [seconds, setSeconds] = useState(0);
  const [miliSeconds, setMiliseconds] = useState(0);
  const {state, dispatch} = useContext(UserContext);

  const deadline = props.time;
  const contestid = props.contest;
  const userid = state.userId;

  const navigate = useNavigate();
  
  const newTime = deadline !== undefined ? deadline.replace('0Z', '') : Date.now();

  const getTime = () => {
    const time = new Date(newTime) - Date.now();
    
    setMiliseconds(time);

    setDays(Math.floor(time / (1000 * 60 * 60 * 24)));
    setHours(Math.floor((time / (1000 * 60 * 60)) % 24));
    setMinutes(Math.floor((time / 1000 / 60) % 60));
    setSeconds(Math.floor((time / 1000) % 60));
  };

  useEffect(() => {
        const interval = setInterval(() => getTime(deadline), 1000);
        return () => clearInterval(interval);
  }, []);


  return (
    <div className="timer">
        {
          miliSeconds > 0 && <p className='mb-0'>The contest will start in  { days > 0 && <span> {days} Days </span> } { hours > 0 && <span> {hours} Hours </span> } { minutes > 0 && <span> {minutes} Minutes </span> } {seconds} Seconds</p> 
        }
        {
           
           miliSeconds < 0 && <div>{props.setTriggerContest(false)}</div> && <p className='mb-0'>Contest is started</p>
          //  && <div>{console.log("time....",miliSeconds)}</div>
        }
        
    </div>
  );
};

export default Timer;