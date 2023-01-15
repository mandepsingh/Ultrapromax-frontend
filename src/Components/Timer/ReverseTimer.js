import React from 'react'
import { useState, useEffect , useContext} from 'react';
import { useNavigate } from "react-router-dom";

function ReverseTimer(props) {
    
    const [days, setDays] = useState(0);
    const [hours, setHours] = useState(0);
    const [minutes, setMinutes] = useState(0);
    const [seconds, setSeconds] = useState(0);
    const [remainingTime, setRemainingTime] = useState();
    const miliSeconds = 1.5*60*60*1000;
   
    const startTime = props.time;

    const newTime = startTime !== undefined ? startTime.replace('0Z', '') : Date.now();


    const getTime = () => {
        const time = Date.now() - new Date(newTime);   

        setRemainingTime(miliSeconds - time);

        // setDays(Math.floor(time / (1000 * 60 * 60 * 24)));
        setHours(Math.floor((remainingTime / (1000 * 60 * 60)) % 24));
        setMinutes(Math.floor((remainingTime / 1000 / 60) % 60));
        setSeconds(Math.floor((remainingTime / 1000) % 60));
    };

    useEffect(() => {
            const interval = setInterval(() => getTime(), 1000);
            return () => clearInterval(interval);
    }, [remainingTime]);


    return (
        <>
        {
            props.page === "compiler" &&
            remainingTime > 0 && <p>Time {hours} : {minutes} : {seconds} {props.setShowQuestion(true) }</p> 
        }
        {
            props.page === "problems" &&
            <div className="timer">
                {
                    remainingTime > 0 && <p className='contest_timer'>Time remaining {hours} hours, {minutes} Minutes, {seconds} Seconds {props.setShowQuestion(true) }</p> 
                }
                {
                    remainingTime <= 0 &&  <div className='contest_timer'>Contest is over {props.setShowQuestion(false) }</div>
                }
            </div>
            
        }
        </>
        
    );
}

export default ReverseTimer
