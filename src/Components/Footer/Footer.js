import React from 'react'
import './Footer.css'
import Flag from '../../Images/Flag-India 1.png'

function Footer() {
  return (
    <>
    <footer className="cb_footer">
        <div className="d-flex justify-content-between">
            <div className="p-2">
                Copyright © 2022 | Coding Bucks | Help Center | Jobs | Bug Bounty | Online Interview | Students | Terms Privacy Policy
            </div>
            <div className='p-2'>          
                <img src={Flag} alt="india flag"/> INDIA
            </div>
        </div>      
    </footer>   
    </>
  )
}

export default Footer
