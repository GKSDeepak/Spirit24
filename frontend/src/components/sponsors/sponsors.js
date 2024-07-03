import React from 'react'
import './sponsors.css'

const Sponsors = () => {
    return (
        <div className='sponsorsMain' id="sponsors">
            <div className='sponsorHeader'>
                <h2>Our Partners</h2>
            </div>
            <div className='sponsors'>
                <div>
                    <h3 className='spon'>Presented by</h3>
                
                <a href="https://renaissance.programmingpathshala.com">
                    <img src="Ppathsala.png" alt="Programming Pathshala"></img>
                </a>
                </div>
                <div>
                    <h3 className='spon'>Powered by</h3>
                <a href="https://yhills.com">
                    <img src="yh.png" alt="Yhills"></img>
                </a>
                </div>
                <div>
                    <h3 className='spon'>Assessment Partner</h3>
                <a href="https://www.languify.in/">
                    <img src="lang.png" alt="Languify"></img>
                </a>
                </div>
               
                <div>
                    <h3 className='spon'>Knowledge Partner</h3>
                <a href="https://interviewbuddy.net/">
                    <img src="knowledge.png" alt="Interview Buddy"></img>
                </a>
                </div>
               
                <div>
                    <h3 className='spon'>Education Partner</h3>
                <a href="https://www.swapso.io/">
                    <img src="swap.png" alt="Swapso"></img>
                </a>
                </div>
                <div>
                  <h3 className='spon'>Certificate Partner</h3>   
                <a href="https://givemycertificate.com/">
                    <img src="cert.png" alt="Give My Certificate"></img>
                </a>
                </div>
               
                
                
            </div>
        </div>
    )
}

export default Sponsors;
