import React, { useState } from 'react'
import LiveContests from './LiveContests'
import PastContests from './PastContests'
import UpcomingContest from './UpcomingContest';
import Navbar from '../Navbar/Navbar';
import './Contests.css';

function Contests(props) {
    const [active, setActive] = useState("liveContests");
    const [activeBtn, setActiveBtn] = useState("liveContests")
    
    function activeClass(btn){
        if(btn === active){
            return "active_btn";
        }
        return "";
    }
    

    return (
        
        <>
        <Navbar/>
        <div className='cover_board'>
            <h3 className='cover_brand'>Coding Bucks Contest</h3>
        </div>
        <div className='container'>
            <div className='container_inside'>
                <div className='contest_info'>
                    <div className='d-flex'>
                        <button className={`contest_info-buttons `+ activeClass("liveContests") } onClick={()=> setActive("liveContests")}>Live</button>
                        <button className={`contest_info-buttons `+ activeClass("upcomingContests") } onClick={()=> setActive("upcomingContests")}>Upcoming</button>
                        <button className={`contest_info-buttons `+ activeClass("pastContests") } onClick={()=> setActive("pastContests")}>Past</button>
                    </div>
                    <div className='contests_details'>
                        {active === "liveContests" && <LiveContests setProgress={props.setProgress}/>}
                        {active === "upcomingContests" && <UpcomingContest/>}
                        {active === "pastContests" && <PastContests/>}
                    </div>
                    
                </div>
            </div>
            
        </div>
            
        </>
    )
}

export default Contests