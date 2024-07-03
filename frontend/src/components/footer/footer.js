import React from "react";
import  { useState } from 'react';
import axios from 'axios';
import './footer.css'
const Footer=()=>{
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        message: ''
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post('https://spirit-kvql.onrender.com/opinion', formData);
            console.log(response.data);
            alert("Message recieved successfully");
        } catch (error) {
            console.error(error);
            alert("Message not recieved due to some error");
        }
    };
    return(
        <div className="footer-cont" id="footer">
            <div className="first">
                <img src="/spirit.png" alt="" className="spirit-logo"/>
                <img src="/Frame 49.png" alt="Copyright"  className="copyright"/>
                <div className="social-media">
                    <a href="https://www.instagram.com/spirit_iitguwahati/" target="_blank"><img src="/insta.png" alt=""  className="media-img"/></a>
                    <a href="https://www.youtube.com/@spiritiitguwahati2541" target="_blank"><img src="/youtube.png" alt="" className="media-img" /></a>
                    <a href="https://www.facebook.com/spiritiitg/" target="_blank"><img src="/fb.png" alt="" className="media-img" /></a>
                    {/* <a href="https://www.facebook.com/spiritiitg/" target="_blank"><img src="in.png" alt="" className="media-img" /></a> */}
                </div>

            </div>
            <div className="big-div"><div className="second1">
                <div className="quick">Quick Links</div>
                <div className="links-div">
                <div className="links"><a href="/ca/#home">Home</a></div>
                <div className="links"><a href="/ca/#aboutus">About Us</a></div>
                <div className="links"><a href="/ca/#sponsors">Sponsors</a></div>
                <div className="links"><a href="/ca/#gallery">Gallery</a></div>
                </div>
            </div>
            <div className="second2">
            <div className="quick">Your Opinion matters</div>
            <form class="opinion" onSubmit={handleSubmit}>
                    <label>Name</label>
                    <input className="inputbox" type="text" name="name" value={formData.name} onChange={handleChange} />
                    <label>Email</label>
                    <input className="inputbox" type="email" name="email" value={formData.email} onChange={handleChange} />
                    <label>Message</label>
                    <textarea className="inputbox" name="message" value={formData.message} onChange={handleChange}></textarea>
                <button type="submit">Submit</button>
            </form>
        </div>
        </div>
        </div>
    )
}

export default Footer;