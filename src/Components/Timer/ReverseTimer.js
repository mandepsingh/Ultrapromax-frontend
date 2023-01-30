import React from 'react'
import { useState, useEffect , useContext} from 'react';
import { useNavigate } from "react-router-dom";
import { TiStopwatch } from 'react-icons/ti';

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
            remainingTime > 0 && <p className='mb-0'><TiStopwatch size={16} style={{marginBottom:"3px"}}/>{hours > 0 && <span> {hours} :</span> } {minutes > 0 && <span> {minutes} : </span>} {seconds} {props.setShowQuestion(true) }</p> 
        }
        {
            props.page === "problems" &&
            <div className="timer">
                {
                    remainingTime > 0 && <p className='contest_timer mb-0'>Time remaining { days > 0 && <span> {days} Days </span> } { hours > 0 && <span> {hours} Hour </span> } { minutes > 0 && <span> {minutes} Minutes </span> } {seconds} Seconds {props.setShowQuestion(true) }</p> 
                }
                {
                    remainingTime <= 0 &&  <div className='contest_timer mb-0'>Contest is over {props.setShowQuestion(false) }</div>
                }
            </div>
            
        }
        </>
        
    );
}

export default ReverseTimer
