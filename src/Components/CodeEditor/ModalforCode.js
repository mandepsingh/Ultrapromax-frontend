import React,{ useState, useContext, useEffect } from 'react'
import './Modal.css'
import { BsArrowRightCircle } from "react-icons/bs";


function ModalforCode(props) {
    const [showcode, setShowcode]= useState(false);

  return (
    <>
   
    <button type="button" className="contest_btnforcode" onClick={() => setShowcode(!showcode)} >
    <BsArrowRightCircle style={{marginBottom:"3px"}}/> Show Code
    </button>

    {showcode && 
 
        <pre><code><p className='submission_text submission_code'>{props.code}</p></code></pre>
  
    }
    
    </>
  )
}

export default ModalforCode
