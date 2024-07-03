import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import './Form.css';


function OtpForm() {
    const [otp, setOtp] = useState('');
    const navigate = useNavigate();
  
    const handleOtpSubmit = async (e) => {
      e.preventDefault();
      try {
        const response = await axios.post('https://spirit-kvql.onrender.com/signup/verifyOtp', { otp });
        if (response.status === 200) {
          navigate('/ca/login');
        } else {
          alert('Invalid OTP');
        }
      } catch (error) {
        console.error('Error during OTP verification:', error);
        alert('Error during OTP verification:');
      }
    };

    const handleChange = (e) => {
        const { value } = e.target;
        setOtp(value); // Update otp directly with the value
        console.log(`Field changed: otp, Value: ${value}`);
      };
      



  return (
    <div className="App">
      <h1 className='spirit'>SPIRIT</h1>
      <form onSubmit={handleOtpSubmit}>
        <div className="underline-container">
          <p className="underline-text">SignUp</p>
          <hr className="underline" />
        </div>

        <div className="row">
        <div className="col">
            <label>Verify Otp</label>
            <input
              type="tel"
              name="otp"
              value={otp}
              onChange={handleChange}
              required
            />
          </div>
        </div>
        <div className="others">
          <button type="submit" className="Done">Done</button>
          <a className='cancel' href="/ca">cancel</a>
        </div>
      </form>
    </div>
  );
}

export default OtpForm;
