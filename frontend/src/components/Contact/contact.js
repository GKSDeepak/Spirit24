import React from "react";
import './contact.css';

 const Widget=()=>{
    return (
        <div className="contactdiv">
          <div className="contactdiv2">
            <div className="heading-need">
              <h2 className="leftest">Need Help?<br/>We got you!</h2>
            </div>
            <div className="rightest">
              <div className="cont">
                <p ><strong>Harshitha</strong></p>
                <p>6305582565</p>
                <p>h.rayi@iitg.ac.in</p>
                <p><a href="http://linkedin.com/in/harshitha-rayi-879756294">Linkedin</a></p>
              </div>
              <div className="cont">
                <p ><strong>Yuvraj</strong></p>
                <p>7300505333</p>
                <p>yuvrajsingh@iitg.ac.in</p>
                <p><a href="https://shorturl.at/tXlDj">Instagram</a></p>
                <p><a href="https://www.linkedin.com/in/yuvraj-singh-49418b262?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=android_app">Linkedin</a></p>
                
              </div>
            </div>
          </div>
        </div>
    )
}
export default Widget;