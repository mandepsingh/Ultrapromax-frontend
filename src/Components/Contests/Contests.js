import React, { useState } from 'react'
import LiveContests from './LiveContests'
import PastContests from './PastContests'
import Navbar from '../Navbar/Navbar';
import './Contests.css';

function Contests() {
    const [active, setActive] = useState("liveContests");
    return (
        <>
        <Navbar/>
        <div className='cover_board'>
            <h3 className='cover_brand'>Coding Bucks</h3>
        </div>
        <div className='container'>
            <div className='container_inside'>
                <div className='contest_info'>
                    <div className='d-flex flex-row'>
                        <button className='contest_info-buttons' onClick={()=> setActive("liveContests")}>Live Contests</button>
                        <button className='contest_info-buttons' onClick={()=> setActive("pastContests")}>Past Contests</button>
                        
                        {/* <input type='text' className='contest_info-buttons ' placeholder='Search here..'/> */}
                       
                    </div>
                    <div className='contests_details'>
                        {active === "liveContests" && <LiveContests/>}
                        {active === "pastContests" && <PastContests/>}
                    </div>
                    
                </div>
            </div>
            
        </div>
            
        </>
    )
}

export default Contests