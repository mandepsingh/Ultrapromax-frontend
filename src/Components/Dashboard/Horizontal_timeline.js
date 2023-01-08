import React, { useState } from 'react'
import './Timeline.css'

function Horizontal_timeline(props) {
  const [trace, setTrace] = useState(0);

  function colorclass(i){
    if(props.progress === i){
      return 'circle3'
    }
    else if(props.progress > i){
      return 'circle2'
    }
    else return 'circle'
  }

  function trackcolor(i){
    if(props.progress >= i){
      return 'track2'
    }
    else return 'track'
  }
  return (
    <>
    <div className='d-flex progress_timeline justify-content-center'>
      <div><p className= {colorclass(1)}>1</p> Permission</div>
      <div className={trackcolor(2)}></div>
      <div><p className={colorclass(2)}>2</p> Payment</div>
      <div className={trackcolor(3)}></div>
      <div><p className={colorclass(3)} >3</p> Confirmation</div>
    </div>
      
    </>
  )
}

export default Horizontal_timeline
