import React, { useState } from "react";
import "./Card.css";
import {CSSTransition} from 'react-transition-group';


function Card({onClick}) {
  const [showFront, setShowFront] = useState(true);
  const [contestname, setContestname] = useState("");
  const [contestnumber, setContestnumber] = useState("");
  const [level, setLevel] = useState("");
  const [amount, setAmount] = useState("");
  const [timestart , setTime] = useState();


  const handleSubmit = async (e) => {
    console.log("hello");
    e.preventDefault();
    let data = {contestname, contestnumber, level, amount, timestart};
    // console.log(data)
    try {
        const res = await fetch(`${process.env.REACT_APP_BACKEND_LOCAL_HOST}/contest/createcontest`, {
            method : 'POST',
            headers:{
                'Accept':'application/json',
                'Content-Type':'application/json'
            },
            body: JSON.stringify(data)
        }).then((result) => {
            return result.json();
        }).then((data) =>{
            console.log(data);
        })
    }
    catch (err) {
        console.log(err);
      }
    }


  return (
    <>
    <CSSTransition in= {showFront} timeout={300} classNames='flip'>

      <div className='flip_card'>
          <div className='card-back'>
            <form onSubmit={handleSubmit}>
                    <div className="mb-1">
                        <label htmlFor="contest_Name" className="form-label mb-1">Contest Name</label>
                        <input type="text" className="form-control form-control-sm" id="contest_Name" value={contestname} onChange = {(e)=>{setContestname(e.target.value)}} placeholder="" required/>
                    </div>
                    <div className="mb-1">
                        <label htmlFor="contest_Number" className="form-label mb-1">Contest Number</label>
                        <input type="text" className="form-control form-control-sm" id="contest_Number" value={contestnumber} onChange = {(e)=>{setContestnumber(e.target.value)}}  placeholder=""/>
                    </div>
                    <div className="mb-1">
                        <label htmlFor="difficulty_level" className="form-label mb-1">Difficulty Level</label>
                        <input type="text" className="form-control form-control-sm" id="difficulty_level" value={level} onChange = {(e)=>{setLevel(e.target.value)}} placeholder=""/>
                    </div>
                    <button type="submit" className="btn btn-success clickIt" >
                        submit
                    </button>
                    <button className="btn btn-success clickIt" 
                        onClick= {()=>{setShowFront((s) => !s);}}> Back
                    </button>
                </form>
          
          </div>
          
          <div className='card-front'>
              <p className="contestHeading">
									Lorem ipsum dolor sit amet, consectetur
									adipiscing elit, sed do eiusmod tempor
									incididunt .
							</p>
            <button className="btn btn-success clickIt"  onClick= {()=>{
                      setShowFront((s) => !s);
                    }}>
              Join contest
            </button>
          </div>      
        </div>
      </CSSTransition>
    </>
  )
}

export default Card;